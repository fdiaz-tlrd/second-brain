<#
.SYNOPSIS
    Despliegue AWS SAM robusto (Node.js / Python) con politica Git remote-first,
    build con parche manual de layer y deploy tolerante a locks en Windows.

.DESCRIPTION
    Script production-ready para entornos Windows con requisitos estrictos:
    - Perfil deducido por usuario Windows (sin -perfil manual)
    - hashCommit obligatorio para trazabilidad
    - Modo full / build / deploy
    - Flujo build innegociable para layer
    - Mitigaciones avanzadas para WinError 5 durante sam deploy
    - Sin -Diagnostico: resumen operativo por fase (repo, Git, herramientas clave).
    - Con -Diagnostico: detalle extendido (versiones, PATH, py --list).
    - Layer con sharp: siempre SHARP VEREDICTO (comando npm, salida npm, @img, APTO/NO APTO para Lambda).
    - Dependencias de Lambdas Python 3.14: pip con py -3.14 -m pip + ruedas manylinux cuando corresponde.
    - sam build / sam deploy usan el Python embebido de AWS SAM CLI (samcli); hace falta Python 3.14 en PATH (py -3.14) para que SAM valide Runtime python3.14.
#>

[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'Medium')]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string] $repositorio,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string] $ramaGit,

    [Parameter(Mandatory = $true)]
    [ValidateSet('dev', 'sandbox', 'qa', 'prod')]
    [string] $ambiente,

    [Parameter(Mandatory = $false)]
    [ValidateSet('full', 'build', 'deploy')]
    [string] $modo = 'full',

    [Parameter(Mandatory = $true)]
    [ValidateSet('no', 'si')]
    [string] $esReversa = 'no',

    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[0-9a-fA-F]{7,40}$')]
    [string] $hashCommit,

    [Parameter(Mandatory = $false)]
    [string] $LogFilePath,

    [Parameter(Mandatory = $false)]
    [switch] $NoColor,

    [Parameter(Mandatory = $false, HelpMessage = 'Activa bloque DIAGNOSTICO extendido (versiones, PATH, py --list). Por defecto desactivado.')]
    [switch] $Diagnostico
)

# Codificacion UTF-8 para consola/salida.
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false
$script:UnhandledTrapArmed = $true
$script:Diagnostico = [bool]$Diagnostico
# Lambda linux-x64 (glibc) desde Windows. NO reinstalar metapaquete sharp (npm 11 lo deja en colour).
$script:SharpNpmCrossPlatformFlags = @(
    '--cpu=x64', '--os=linux', '--libc=glibc', '--include=optional', '--no-save', '--foreground-scripts'
)
$script:SharpLambdaNpmCommandHelp = 'npm install --cpu=x64 --os=linux --libc=glibc --include=optional --no-save --foreground-scripts sharp@<version>'

# ---------------------------------------------------------------------------
# 1) Estado global y utilidades
# ---------------------------------------------------------------------------

$script:StartTime = Get-Date
$script:LogLevels = @{
    INFO    = [ConsoleColor]::Gray
    WARN    = [ConsoleColor]::Yellow
    ERROR   = [ConsoleColor]::Red
    SUCCESS = [ConsoleColor]::Green
    DEBUG   = [ConsoleColor]::DarkGray
    STEP    = [ConsoleColor]::Cyan
}

function Get-Color {
    param([string] $Level)
    if ($NoColor) { return [ConsoleColor]::Gray }
    if ($script:LogLevels.ContainsKey($Level)) { return $script:LogLevels[$Level] }
    return [ConsoleColor]::Gray
}

function Write-Log {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)][AllowEmptyString()][string] $Message,
        [Parameter(Mandatory = $false)][ValidateSet('INFO','WARN','ERROR','SUCCESS','DEBUG','STEP')][string] $Level = 'INFO',
        [Parameter(Mandatory = $false)][switch] $WithTimestamp
    )

    $line = if ($WithTimestamp) {
        "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] [$Level] $Message"
    } else {
        "[$Level] $Message"
    }

    Write-Host $line -ForegroundColor (Get-Color -Level $Level)
    try {
        Add-Content -LiteralPath $script:LogFile -Value $line -Encoding utf8
    }
    catch {
        # Ultima linea de defensa: no romper el deploy por un lock en archivo de log.
        Write-Host "[WARN] No se pudo escribir en log file: $($script:LogFile) :: $_" -ForegroundColor Yellow
    }
}

function Write-Milestone {
    param(
        [Parameter(Mandatory = $true)][string] $Message,
        [Parameter(Mandatory = $false)][ValidateSet('INFO','WARN','ERROR','SUCCESS','DEBUG','STEP')][string] $Level = 'STEP'
    )
    Write-Log -Message $Message -Level $Level -WithTimestamp
}

function Assert-LastExitCode {
    param(
        [Parameter(Mandatory = $true)][string] $Context
    )
    if ($LASTEXITCODE -ne 0) {
        throw "$Context fallo con codigo $LASTEXITCODE"
    }
}

function Invoke-External {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)][string] $FilePath,
        [Parameter(Mandatory = $false)][string[]] $Arguments = @(),
        [Parameter(Mandatory = $true)][string] $Context
    )

    & $FilePath @Arguments
    Assert-LastExitCode -Context $Context
}

function Invoke-GitQuiet {
    <#
    Ejecuta git capturando stderr sin que PowerShell 5.1 lo trate como error terminante
    (evita mensajes crudos tipo "fatal: git cat-file: could not get object info").
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)][string[]] $Arguments
    )

    $prevEap = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $raw = & git @Arguments 2>&1
        $exitCode = $LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $prevEap
    }

    $stdout = [System.Collections.Generic.List[string]]::new()
    $stderr = [System.Collections.Generic.List[string]]::new()
    foreach ($item in @($raw)) {
        if ($null -eq $item) { continue }
        if ($item -is [System.Management.Automation.ErrorRecord]) {
            $stderr.Add($item.ToString().Trim())
        }
        else {
            $stdout.Add([string]$item)
        }
    }

    return [pscustomobject]@{
        ExitCode = $exitCode
        Output   = ($stdout -join [Environment]::NewLine).Trim()
        Error    = ($stderr -join [Environment]::NewLine).Trim()
    }
}

function Ensure-Directory {
    param([Parameter(Mandatory = $true)][string] $Path)
    if (!(Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Test-CommandExists {
    param([Parameter(Mandatory = $true)][string] $CommandName)
    $cmd = Get-Command -Name $CommandName -ErrorAction SilentlyContinue
    return ($null -ne $cmd)
}

function Get-CommandVersionLine {
    param(
        [Parameter(Mandatory = $true)][string] $Executable,
        [Parameter(Mandatory = $false)][string[]] $Arguments = @('--version')
    )
    try {
        $text = (& $Executable @Arguments 2>&1 | Out-String).Trim()
        if ([string]::IsNullOrWhiteSpace($text)) { return '(sin version)' }
        return ($text -split "`r?`n" | Select-Object -First 1)
    }
    catch {
        return "(no legible: $($_.Exception.Message))"
    }
}

function Get-Python314Facts {
    $flag = $script:LambdaPythonLauncherFlag
    $facts = [ordered]@{
        LauncherEnPath = (Test-CommandExists -CommandName 'py')
        Es314          = $false
        Version        = $null
        Executable     = $null
        PipVersion     = $null
    }
    if (-not $facts.LauncherEnPath) {
        return [pscustomobject]$facts
    }
    $prevEap = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        & py $flag -c 'import sys; raise SystemExit(0 if sys.version_info[:2] == (3, 14) else 2)' 2>$null | Out-Null
        $facts.Es314 = ($LASTEXITCODE -eq 0)
        $facts.Version = (& py $flag --version 2>&1 | Out-String).Trim()
        $facts.Executable = (& py $flag -c 'import sys; print(sys.executable)' 2>&1 | Out-String).Trim()
        $facts.PipVersion = (& py $flag -m pip --version 2>&1 | Out-String).Trim()
    }
    finally {
        $ErrorActionPreference = $prevEap
    }
    return [pscustomobject]$facts
}

function Get-RepoRelativePath {
    param([Parameter(Mandatory = $true)][string] $FullPath)
    if ($FullPath.StartsWith($script:RutaRepo, [System.StringComparison]::OrdinalIgnoreCase)) {
        return $FullPath.Substring($script:RutaRepo.Length).TrimStart('\')
    }
    return $FullPath
}

function Test-SharpLinuxLambdaReady {
    <#
    Tras npm install --cpu=x64 --os=linux --libc=glibc --include=optional sharp en Windows, los paquetes @img
    o anidados bajo node_modules/sharp. Busqueda recursiva por nombre (PS 5.1).
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)][string] $NodeJsDir
    )

    $nodeModules = Join-Path $NodeJsDir 'node_modules'
    if (!(Test-Path -LiteralPath $nodeModules)) {
        return [pscustomobject]@{ IsReady = $false; MarkerPath = '' }
    }

    $linuxDir = Get-ChildItem -LiteralPath $nodeModules -Recurse -Directory -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -eq 'sharp-linux-x64' -or $_.Name -eq 'sharp-libvips-linux-x64' } |
        Select-Object -First 1

    if ($null -ne $linuxDir) {
        $rel = $linuxDir.FullName.Substring($NodeJsDir.Length).TrimStart('\')
        return [pscustomobject]@{ IsReady = $true; MarkerPath = $rel }
    }

    return [pscustomobject]@{ IsReady = $false; MarkerPath = '' }
}

function Get-LayerSharpVersionSpec {
    param([Parameter(Mandatory = $true)][string] $NodeJsDir)
    $pkgPath = Join-Path $NodeJsDir 'package.json'
    if (!(Test-Path -LiteralPath $pkgPath)) { return $null }
    try {
        $pkg = Get-Content -LiteralPath $pkgPath -Raw | ConvertFrom-Json
        if ($null -eq $pkg.dependencies) { return $null }
        return $pkg.dependencies.sharp
    }
    catch {
        return $null
    }
}

function Invoke-NpmCaptureInDir {
    param(
        [Parameter(Mandatory = $true)][string] $NodeJsDir,
        [Parameter(Mandatory = $true)][string[]] $NpmArguments
    )
    Push-Location $NodeJsDir
    $prevEap = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $lines = & npm @NpmArguments 2>&1
        return (($lines | Out-String).Trim())
    }
    finally {
        $ErrorActionPreference = $prevEap
        Pop-Location
    }
}

function Write-SharpVeredicto {
    <#
    Bloque unico SIEMPRE tras instalar sharp (con o sin -Diagnostico).
    Buscar en el log: "SHARP VEREDICTO: APTO" o "SHARP VEREDICTO: NO APTO".
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)][string] $NodeJsDir,
        [Parameter(Mandatory = $true)][string] $RelLabel,
        [Parameter(Mandatory = $true)][string] $ComandoEjecutado,
        [Parameter(Mandatory = $false)][string[]] $SalidaNpm = @(),
        [Parameter(Mandatory = $false)][switch] $ReintentoForce
    )

    if ([string]::IsNullOrWhiteSpace($ComandoEjecutado)) {
        $ComandoEjecutado = '(ningun comando npm exitoso registrado)'
    }

    $ready = Test-SharpLinuxLambdaReady -NodeJsDir $NodeJsDir
    $sharpSpec = Get-LayerSharpVersionSpec -NodeJsDir $NodeJsDir
    $tieneLinux = $ready.IsReady
    $tieneLibvips = $false
    $tieneWin32 = $false
    $imgDir = Join-Path $NodeJsDir 'node_modules\@img'

    Write-Log -Level STEP -Message "========== SHARP VEREDICTO INICIO | $RelLabel =========="

    if (Test-CommandExists -CommandName 'node') {
        Write-Log -Level INFO -Message "[SHARP] node $(Get-CommandVersionLine -Executable (Get-Command -Name 'node').Source)"
    }
    if (Test-CommandExists -CommandName 'npm') {
        Write-Log -Level INFO -Message "[SHARP] npm $(Get-CommandVersionLine -Executable (Get-Command -Name 'npm').Source)"
    }

    Write-Log -Level INFO -Message "[SHARP] package.json sharp=$(if ($sharpSpec) { $sharpSpec } else { '(no)' })"
    Write-Log -Level INFO -Message "[SHARP] comando=$ComandoEjecutado$(if ($ReintentoForce) { ' (hubo reintento --force)' })"
    Write-Log -Level INFO -Message "[SHARP] cwd=$NodeJsDir"
    Write-Log -Level INFO -Message "[SHARP] package-lock.json=$(Test-Path -LiteralPath (Join-Path $NodeJsDir 'package-lock.json'))"

    if ($SalidaNpm.Count -gt 0) {
        Write-Log -Level INFO -Message '[SHARP] salida npm install (completa):'
        foreach ($line in $SalidaNpm) {
            if (-not [string]::IsNullOrWhiteSpace($line)) {
                Write-Log -Level INFO -Message "[SHARP]   $line"
            }
        }
    }

    if (Test-Path -LiteralPath $imgDir) {
        $imgEntries = Get-ChildItem -LiteralPath $imgDir -Directory -ErrorAction SilentlyContinue
        $imgNames = ($imgEntries | ForEach-Object { $_.Name }) -join ', '
        Write-Log -Level INFO -Message "[SHARP] node_modules/@img = $(if ($imgNames) { $imgNames } else { '(vacio)' })"
        foreach ($d in $imgEntries) {
            $mb = [math]::Round((Get-ChildItem -LiteralPath $d.FullName -Recurse -File -ErrorAction SilentlyContinue |
                Measure-Object -Property Length -Sum).Sum / 1MB, 2)
            Write-Log -Level INFO -Message "[SHARP]   @img/$($d.Name) ~${mb} MB"
            if ($d.Name -eq 'sharp-linux-x64') { $tieneLinux = $true }
            if ($d.Name -eq 'sharp-libvips-linux-x64') { $tieneLibvips = $true }
            if ($d.Name -match 'sharp-win32') { $tieneWin32 = $true }
        }
    }
    else {
        Write-Log -Level WARN -Message '[SHARP] no existe node_modules/@img'
    }

    $nodeModules = Join-Path $NodeJsDir 'node_modules'
    if (Test-Path -LiteralPath $nodeModules) {
        foreach ($nombre in @('sharp-linux-x64', 'sharp-libvips-linux-x64')) {
            $hits = @(Get-ChildItem -LiteralPath $nodeModules -Recurse -Directory -ErrorAction SilentlyContinue |
                Where-Object { $_.Name -eq $nombre })
            foreach ($h in $hits) {
                $rel = $h.FullName.Substring($NodeJsDir.Length).TrimStart('\')
                Write-Log -Level INFO -Message "[SHARP] ruta $nombre -> $rel"
            }
        }
    }

    $npmLsSharp = Invoke-NpmCaptureInDir -NodeJsDir $NodeJsDir -NpmArguments @('ls', 'sharp', '--omit=dev')
    if ($npmLsSharp) {
        foreach ($line in ($npmLsSharp -split "`r?`n" | Select-Object -First 15)) {
            if (-not [string]::IsNullOrWhiteSpace($line)) {
                Write-Log -Level INFO -Message "[SHARP] npm ls sharp: $line"
            }
        }
    }

    $apto = $tieneLinux -and $tieneLibvips
    $razon = if ($apto) {
        "binarios linux-x64 presentes (sharp-linux-x64 + sharp-libvips-linux-x64)"
    }
    elseif (-not $tieneLinux -and -not $tieneLibvips) {
        if ($tieneWin32) {
            'solo binarios win32 en @img; Lambda necesita linux-x64'
        }
        else {
            'faltan sharp-linux-x64 y sharp-libvips-linux-x64 en @img'
        }
    }
    elseif (-not $tieneLinux) { 'falta @img/sharp-linux-x64' }
    else { 'falta @img/sharp-libvips-linux-x64' }

    $veredictoLinea = if ($apto) { 'SHARP VEREDICTO: APTO PARA LAMBDA linux-x64' } else { 'SHARP VEREDICTO: NO APTO PARA LAMBDA' }
    Write-Log -Level $(if ($apto) { 'SUCCESS' } else { 'ERROR' }) -Message "$veredictoLinea | $RelLabel | $razon"

    if (-not $apto) {
        Write-Log -Level INFO -Message "[SHARP] manual en servidor: $($script:SharpLambdaNpmCommandHelp)"
        Write-Log -Level INFO -Message '[SHARP] si npm falla igual: revisar package-lock.json (npm/cli#4828)'
    }

    Write-Log -Level STEP -Message "========== SHARP VEREDICTO FIN | $RelLabel =========="

    return [pscustomobject]@{
        AptoLambda     = $apto
        TieneLinuxX64  = $tieneLinux
        TieneLibvips   = $tieneLibvips
        TieneWin32     = $tieneWin32
        MarkerPath     = $ready.MarkerPath
        Razon          = $razon
    }
}

function Invoke-SharpNpmCrossPlatformInstall {
    param(
        [Parameter(Mandatory = $true)][string] $NodeJsDir,
        [Parameter(Mandatory = $true)][string] $RelLabel,
        [Parameter(Mandatory = $true)][string] $Estrategia,
        [Parameter(Mandatory = $true)][string[]] $Paquetes,
        [Parameter(Mandatory = $false)][switch] $UseForce,
        [Parameter(Mandatory = $false)][switch] $SinPackageLock
    )

    $npmArgs = @('install') + $script:SharpNpmCrossPlatformFlags + $Paquetes
    if ($UseForce) { $npmArgs += '--force' }
    $cmdPreview = "npm $($npmArgs -join ' ')"
    Write-Log -Level INFO -Message "sharp Lambda [$Estrategia]: $cmdPreview : $RelLabel"

    $lockPath = Join-Path $NodeJsDir 'package-lock.json'
    $lockBak = Join-Path $NodeJsDir 'package-lock.json.sharp-deploy-bak'
    $lockMoved = $false

    Push-Location $NodeJsDir
    $prevEap = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    $envBackup = @{
        os   = $env:npm_config_os
        cpu  = $env:npm_config_cpu
        libc = $env:npm_config_libc
    }
    $env:npm_config_os = 'linux'
    $env:npm_config_cpu = 'x64'
    $env:npm_config_libc = 'glibc'
    try {
        if ($SinPackageLock -and (Test-Path -LiteralPath $lockPath)) {
            if (Test-Path -LiteralPath $lockBak) { Remove-Item -LiteralPath $lockBak -Force }
            Move-Item -LiteralPath $lockPath -Destination $lockBak -Force
            $lockMoved = $true
            Write-Log -Level WARN -Message "sharp [$Estrategia]: package-lock.json apartado temporalmente"
        }

        $output = @(& npm @npmArgs 2>&1)
        $exit = $LASTEXITCODE
        if ($exit -ne 0) {
            $text = ($output | Out-String).Trim()
            throw "npm [$Estrategia] codigo $exit ($RelLabel). $text"
        }
        return [pscustomobject]@{
            Comando    = $cmdPreview
            Estrategia = $Estrategia
            Lineas     = @($output | ForEach-Object { "$_" })
        }
    }
    finally {
        if ($lockMoved -and (Test-Path -LiteralPath $lockBak)) {
            if (Test-Path -LiteralPath $lockPath) { Remove-Item -LiteralPath $lockPath -Force }
            Move-Item -LiteralPath $lockBak -Destination $lockPath -Force
        }
        foreach ($key in @('os', 'cpu', 'libc')) {
            $envName = "npm_config_$key"
            if ($null -eq $envBackup[$key]) { Remove-Item -Path "Env:$envName" -ErrorAction SilentlyContinue }
            else { Set-Item -Path "Env:$envName" -Value $envBackup[$key] }
        }
        $ErrorActionPreference = $prevEap
        Pop-Location
    }
}

function Test-LayerHasSharpDependency {
    param([Parameter(Mandatory = $true)][string] $NodeJsDir)
    $pkgPath = Join-Path $NodeJsDir 'package.json'
    if (!(Test-Path -LiteralPath $pkgPath)) { return $false }
    try {
        $pkg = Get-Content -LiteralPath $pkgPath -Raw | ConvertFrom-Json
        return ($null -ne $pkg.dependencies) -and ($pkg.dependencies.PSObject.Properties.Name -contains 'sharp')
    }
    catch {
        return $false
    }
}

function Install-SharpForLambdaLayer {
    <#
    Tras npm ci --ignore-scripts: sharp@version con --cpu --os --libc=glibc --include=optional (doc sharp).
    No instalar @img/* por nombre en win32 (EBADPLATFORM en npm 11).
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)][string] $NodeJsDir,
        [Parameter(Mandatory = $true)][string] $RelLabel
    )

    if (-not (Test-LayerHasSharpDependency -NodeJsDir $NodeJsDir)) { return }

    $salidaNpm = [System.Collections.Generic.List[string]]::new()
    $comandos = [System.Collections.Generic.List[string]]::new()
    $sharpSpec = Get-LayerSharpVersionSpec -NodeJsDir $NodeJsDir
    $sharpMeta = if ($sharpSpec) { "sharp@$sharpSpec" } else { 'sharp' }

    $intentos = @(
        @{ Nombre = 'sharp-linux-x64'; Force = $false },
        @{ Nombre = 'sharp-linux-x64-force'; Force = $true }
    )

    $veredicto = $null
    foreach ($intento in $intentos) {
        $cmdTry = 'npm install ' + ($script:SharpNpmCrossPlatformFlags -join ' ') + " $sharpMeta"
        if ($intento.Force) { $cmdTry += ' --force' }
        try {
            $run = Invoke-SharpNpmCrossPlatformInstall -NodeJsDir $NodeJsDir -RelLabel $RelLabel `
                -Estrategia $intento.Nombre -Paquetes @($sharpMeta) `
                -UseForce:([bool]$intento.Force)
            $comandos.Add($run.Comando)
            foreach ($l in $run.Lineas) { $salidaNpm.Add($l) }
        }
        catch {
            $comandos.Add("$cmdTry (fallo)")
            $salidaNpm.Add("ERROR: $_")
            Write-Log -Level WARN -Message "sharp [$($intento.Nombre)] fallo: $_"
        }

        $veredicto = Write-SharpVeredicto -NodeJsDir $NodeJsDir -RelLabel $RelLabel `
            -ComandoEjecutado (($comandos -join ' | ')) -SalidaNpm $salidaNpm.ToArray()
        if ($veredicto.AptoLambda) { break }
    }

    if ($veredicto.AptoLambda) {
        Write-Log -Level SUCCESS -Message "sharp listo para Lambda ($($veredicto.MarkerPath)): $RelLabel"
        return
    }

    throw "SHARP VEREDICTO: NO APTO ($RelLabel). Busque esa linea en: $script:LogFile"
}

function Invoke-NpmInstallNodeLayer {
    <#
    npm ci --ignore-scripts; luego sharp linux-x64 con --libc=glibc --include=optional (doc sharp).
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)][string] $NodeJsDir,
        [Parameter(Mandatory = $true)][string] $RelLabel
    )

    $lockFile = Join-Path $NodeJsDir 'package-lock.json'
    $layerTieneSharp = Test-LayerHasSharpDependency -NodeJsDir $NodeJsDir
    Push-Location $NodeJsDir
    try {
        if ($layerTieneSharp) {
            Write-Log -Level INFO -Message "Layer con sharp: Lambda linux-x64 (glibc) desde Windows. Veredicto al final: SHARP VEREDICTO: APTO/NO APTO"
        }

        if (Test-Path -LiteralPath $lockFile) {
            Write-Log -Level INFO -Message "npm ci --omit=dev --ignore-scripts: $RelLabel"
            npm ci --omit=dev --ignore-scripts
            Assert-LastExitCode -Context "npm ci --omit=dev ($RelLabel)"
        }
        else {
            Write-Log -Level WARN -Message "Sin package-lock.json; npm i --omit=dev --ignore-scripts: $RelLabel"
            npm i --omit=dev --ignore-scripts
            Assert-LastExitCode -Context "npm i --omit=dev ($RelLabel)"
        }

        Install-SharpForLambdaLayer -NodeJsDir $NodeJsDir -RelLabel $RelLabel
    }
    finally {
        Pop-Location
    }
}

function Get-DiagnosticoAyuda {
    if ($script:Diagnostico) {
        return " Revise el bloque DIAGNOSTICO en: $script:LogFile"
    }
    return " Vuelva a ejecutar con -Diagnostico (entorno + sharp por paso). Log: $script:LogFile"
}

function Write-DeployResumenEjecucion {
    Write-Milestone -Message "RESUMEN - repo=$repositorio | rama=$ramaGit | ambiente=$ambiente | modo=$modo | reversa=$esReversa"
    Write-Log -Level INFO -Message "Perfil: $script:PerfilEtiqueta | Usuario: $usuarioActual"
    Write-Log -Level INFO -Message "hashCommit: $hashCommit"
    Write-Log -Level INFO -Message "Ruta repo: $script:RutaRepo"
    Write-Log -Level INFO -Message "Entornos SAM: $($script:EntornosSam -join ', ')"
    Write-Log -Level INFO -Message "Log: $script:LogFile"

    $herramientas = [System.Collections.Generic.List[string]]::new()
    if (Test-CommandExists -CommandName 'git') { $herramientas.Add('git OK') } else { $herramientas.Add('git FALTA') }
    if (Test-Path -LiteralPath $script:SamPython) {
        $herramientas.Add("SAM $(Get-CommandVersionLine -Executable $script:SamPython)")
    }
    else {
        $herramientas.Add('SAM FALTA')
    }
    if ($modo -in @('full', 'build')) {
        if (Test-CommandExists -CommandName 'npm') { $herramientas.Add('npm OK') } else { $herramientas.Add('npm FALTA') }
        $pyFacts = Get-Python314Facts
        if ($pyFacts.Es314) {
            $herramientas.Add("py $($script:LambdaPythonLauncherFlag) OK ($($pyFacts.Version))")
        }
        elseif ($pyFacts.LauncherEnPath) {
            $herramientas.Add("py $($script:LambdaPythonLauncherFlag) INCORRECTO (no es 3.14)")
        }
        else {
            $herramientas.Add('py FALTA')
        }
    }
    Write-Log -Level INFO -Message "Herramientas: $($herramientas -join ' | ')"
    if ($script:Diagnostico) {
        Write-Log -Level INFO -Message 'Diagnostico extendido: ACTIVADO (-Diagnostico)'
    }
}

function Write-DeployDiagnosticoExtendido {
    param(
        [Parameter(Mandatory = $true)][string] $Contexto
    )
    if (-not $script:Diagnostico) { return }

    $inicio = "---------- DIAGNOSTICO INICIO ($Contexto) $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ----------"
    $fin = "---------- DIAGNOSTICO FIN ($Contexto) ----------"
    Write-Log -Level WARN -Message $inicio

    Write-Log -Level INFO -Message "[HOST] PowerShell=$($PSVersionTable.PSVersion) | $($PSVersionTable.PSEdition)"
    Write-Log -Level INFO -Message "[HOST] $env:COMPUTERNAME | $env:USERNAME | $($env:OS) | 64bit=$([Environment]::Is64BitOperatingSystem)"

    if (Test-CommandExists -CommandName 'node') {
        $nodeCmd = Get-Command -Name 'node' -ErrorAction Stop
        Write-Log -Level INFO -Message "[NODE] $(Get-CommandVersionLine -Executable $nodeCmd.Source) | $($nodeCmd.Source)"
    }
    if (Test-CommandExists -CommandName 'npm') {
        $npmCmd = Get-Command -Name 'npm' -ErrorAction Stop
        Write-Log -Level INFO -Message "[NPM] $(Get-CommandVersionLine -Executable $npmCmd.Source) | $($npmCmd.Source)"
        $npmReg = (& $npmCmd.Source config get registry 2>&1 | Out-String).Trim()
        Write-Log -Level INFO -Message "[NPM] registry=$npmReg"
        foreach ($cfgKey in @('os', 'cpu', 'libc', 'optional')) {
            $cfgVal = (& $npmCmd.Source config get $cfgKey 2>&1 | Out-String).Trim()
            Write-Log -Level INFO -Message "[NPM] config $cfgKey=$cfgVal"
        }
    }

    if (Test-Path -LiteralPath $script:SamPython) {
        Write-Log -Level INFO -Message "[SAM] $(Get-CommandVersionLine -Executable $script:SamPython) | $script:SamPython"
        Write-Log -Level INFO -Message "[SAM] samcli $(Get-CommandVersionLine -Executable $script:SamPython -Arguments @('-m', 'samcli', '--version'))"
        $pyDetail = (& $script:SamPython -c "import sys; print(sys.version.replace(chr(10), ' '))" 2>&1 | Out-String).Trim()
        Write-Log -Level INFO -Message "[SAM] sys.version=$pyDetail"
        Write-Log -Level INFO -Message "[SAM] pip $(Get-CommandVersionLine -Executable $script:SamPython -Arguments @('-m', 'pip', '--version'))"
    }
    else {
        Write-Log -Level WARN -Message "[SAM] No existe: $script:SamPython"
    }

    $flag = $script:LambdaPythonLauncherFlag
    $pyFacts = Get-Python314Facts
    if ($pyFacts.LauncherEnPath) {
        Write-Log -Level INFO -Message "[LAMBDA] py launcher: $((Get-Command -Name 'py' -ErrorAction Stop).Source)"
        $pyList = (& py --list 2>&1 | Out-String).Trim()
        foreach ($line in ($pyList -split "`r?`n")) {
            if (-not [string]::IsNullOrWhiteSpace($line)) {
                Write-Log -Level INFO -Message "[LAMBDA] py --list: $line"
            }
        }
        Write-Log -Level INFO -Message "[LAMBDA] py $flag version=$($pyFacts.Version) | exe=$($pyFacts.Executable) | es314=$($pyFacts.Es314)"
        if (-not [string]::IsNullOrWhiteSpace($pyFacts.Executable)) {
            Write-Log -Level INFO -Message "[LAMBDA] exe existe en disco: $(Test-Path -LiteralPath $pyFacts.Executable)"
        }
        Write-Log -Level INFO -Message "[LAMBDA] pip $($pyFacts.PipVersion)"
    }
    else {
        Write-Log -Level WARN -Message '[LAMBDA] py NO esta en PATH'
    }

    if (Test-CommandExists -CommandName 'where.exe') {
        $wherePy = (& where.exe py 2>&1 | Out-String).Trim()
        Write-Log -Level INFO -Message "[PATH] where py: $(if ($wherePy) { $wherePy } else { '(ninguno)' })"
        foreach ($line in ((& where.exe python 2>&1 | Out-String).Trim() -split "`r?`n")) {
            if (-not [string]::IsNullOrWhiteSpace($line)) {
                Write-Log -Level INFO -Message "[PATH] where python: $line"
            }
        }
    }
    foreach ($hit in @(Get-Command -Name 'python' -All -ErrorAction SilentlyContinue)) {
        Write-Log -Level INFO -Message "[PATH] python en PATH: $($hit.Source) -> $(Get-CommandVersionLine -Executable $hit.Source)"
    }
    $pathHead = ($env:PATH -split ';' | Select-Object -First 8) -join ' | '
    Write-Log -Level INFO -Message "[PATH] primeros segmentos: $pathHead"

    Write-Log -Level WARN -Message $fin
    Write-Log -Level INFO -Message 'Copie el bloque DIAGNOSTICO INICIO..FIN de este log para investigacion.'
}

function Write-GitConnectivityDiagnostico {
    <#
    Diagnostico autocontenido para fallos de Git (clone/fetch/ssh). Escribe en log y consola un bloque
    delimitado INICIO..FIN que el operador puede copiar entero, para no depender de comandos manuales.
    Todo es no interactivo y tolerante a fallos: ningun comando puede colgar ni romper el reporte.
    #>

    Write-Log -Level WARN -Message '===== DIAGNOSTICO GIT INICIO (copie desde aqui hasta FIN) ====='
    Write-Log -Level INFO -Message "Usuario Windows: $env:USERNAME | Equipo: $env:COMPUTERNAME"

    try { $gitVer = (& git --version 2>&1 | Out-String).Trim() } catch { $gitVer = "(error: $($_.Exception.Message))" }
    Write-Log -Level INFO -Message "git version: $gitVer"

    Write-Log -Level INFO -Message "URL remoto que usa el script: $script:UrlRepo"
    Write-Log -Level INFO -Message "GIT_TERMINAL_PROMPT: $env:GIT_TERMINAL_PROMPT"

    try { $gName = (& git config --global user.name 2>&1 | Out-String).Trim() } catch { $gName = '(error)' }
    try { $gMail = (& git config --global user.email 2>&1 | Out-String).Trim() } catch { $gMail = '(error)' }
    Write-Log -Level INFO -Message "git config global: user.name='$gName' user.email='$gMail'"

    try { $credHelper = (& git config --show-origin --get-all credential.helper 2>&1 | Out-String).Trim() } catch { $credHelper = "(error: $($_.Exception.Message))" }
    if ([string]::IsNullOrWhiteSpace($credHelper)) { $credHelper = '(ninguno configurado)' }
    foreach ($l in ($credHelper -split "`r?`n")) {
        if (-not [string]::IsNullOrWhiteSpace($l)) { Write-Log -Level INFO -Message "credential.helper: $l" }
    }

    if (Test-Path -LiteralPath $script:RutaRepo) {
        try {
            $remotes = (& git -C $script:RutaRepo remote -v 2>&1 | Out-String).Trim()
        } catch { $remotes = "(error: $($_.Exception.Message))" }
        foreach ($l in ($remotes -split "`r?`n")) {
            if (-not [string]::IsNullOrWhiteSpace($l)) { Write-Log -Level INFO -Message "remote configurado en disco: $l" }
        }
    }
    else {
        Write-Log -Level INFO -Message "Repo aun no clonado en disco: $script:RutaRepo"
    }

    foreach ($t in @(
            @{ H = 'github.com'; P = 443 },
            @{ H = 'github.com'; P = 22 }
        )) {
        $h = $t.H; $p = $t.P
        $linea = try {
            $r = Test-NetConnection -ComputerName $h -Port $p -WarningAction SilentlyContinue -ErrorAction Stop
            "TcpTestSucceeded=$($r.TcpTestSucceeded) | RemoteAddress=$($r.RemoteAddress) | PingSucceeded=$($r.PingSucceeded)"
        } catch { "(error: $($_.Exception.Message))" }
        Write-Log -Level INFO -Message "TCP ${h}:${p} -> $linea"
    }

    # Credenciales HTTPS guardadas para github.com en el Administrador de credenciales de Windows.
    try {
        $cmdkey = (& cmdkey /list 2>&1 | Out-String)
        $githubCreds = @($cmdkey -split "`r?`n" | Where-Object { $_ -match '(?i)github' } | ForEach-Object { $_.Trim() })
    } catch { $githubCreds = @("(error: $($_.Exception.Message))") }
    if ($githubCreds.Count -eq 0) {
        Write-Log -Level WARN -Message "Credenciales Windows para github: (ninguna encontrada con 'cmdkey /list')"
    }
    else {
        foreach ($c in $githubCreds) { Write-Log -Level INFO -Message "Credencial Windows: $c" }
    }

    # Prueba real de autenticacion HTTPS: ls-remote no clona, solo consulta. Con GIT_TERMINAL_PROMPT=0
    # no se cuelga pidiendo usuario/clave: si faltan credenciales, falla rapido con mensaje claro.
    try {
        $lsRemote = (& git ls-remote $script:UrlRepo HEAD 2>&1 | Out-String).Trim()
    } catch { $lsRemote = "(error: $($_.Exception.Message))" }
    if ([string]::IsNullOrWhiteSpace($lsRemote)) { $lsRemote = '(sin salida)' }
    foreach ($l in ($lsRemote -split "`r?`n")) {
        if (-not [string]::IsNullOrWhiteSpace($l)) { Write-Log -Level INFO -Message "git ls-remote (HTTPS) -> $l" }
    }

    Write-Log -Level INFO -Message 'Interpretacion rapida:'
    Write-Log -Level INFO -Message "  - ls-remote devuelve un hash + HEAD -> credenciales OK; el fallo del deploy es otra cosa."
    Write-Log -Level INFO -Message "  - 'Authentication failed' o 'could not read Username' -> faltan/expiraron las credenciales HTTPS de este usuario Windows."
    Write-Log -Level INFO -Message "  - 'repository not found' con credenciales validas -> la cuenta no tiene acceso al repo en Telered-Autopista (o falta SSO)."
    Write-Log -Level INFO -Message "  - TCP github.com:443 False -> red/firewall bloquea tambien el 443 (problema de red)."
    Write-Log -Level WARN -Message '===== DIAGNOSTICO GIT FIN (copie hasta aqui) ====='
}

function Write-DeployContextoFallo {
    param(
        [Parameter(Mandatory = $true)][string] $Fase,
        [Parameter(Mandatory = $false)][string] $ContextoDiagnostico = ''
    )

    Write-Log -Level WARN -Message "Contexto del fallo | fase=$Fase"
    Write-Log -Level INFO -Message "Deploy: repo=$repositorio | rama=$ramaGit | modo=$modo | hashCommit pedido=$hashCommit"

    if ($Fase -match '(?i)git' -or $ContextoDiagnostico -eq 'git_hashcommit') {
        try {
            Write-GitConnectivityDiagnostico
        }
        catch {
            Write-Log -Level WARN -Message "No se pudo completar el DIAGNOSTICO GIT: $_"
        }
    }

    if (Test-Path -LiteralPath $script:RutaRepo) {
        Push-Location -LiteralPath $script:RutaRepo
        try {
            $head = Invoke-GitQuiet -Arguments @('rev-parse', 'HEAD')
            if ($head.ExitCode -eq 0 -and -not [string]::IsNullOrWhiteSpace($head.Output)) {
                $short = Invoke-GitQuiet -Arguments @('rev-parse', '--short', 'HEAD')
                $subject = Invoke-GitQuiet -Arguments @('log', '-1', '--pretty=%s')
                $headLine = $head.Output.Trim()
                if ($short.ExitCode -eq 0) { $headLine = $short.Output.Trim() }
                $subj = if ($subject.ExitCode -eq 0) { $subject.Output.Trim() } else { '' }
                Write-Log -Level INFO -Message "Git en disco: HEAD=$headLine$(if ($subj) { " | $subj" })"
            }
        }
        finally {
            Pop-Location
        }
    }

    if ($modo -in @('full', 'build')) {
        $pyFacts = Get-Python314Facts
        if ($pyFacts.Es314) {
            Write-Log -Level INFO -Message "Python Lambda: py $($script:LambdaPythonLauncherFlag) OK ($($pyFacts.Version))"
        }
        else {
            Write-Log -Level WARN -Message "Python Lambda: py $($script:LambdaPythonLauncherFlag) no disponible o no es 3.14"
        }
    }

    $ctx = if ([string]::IsNullOrWhiteSpace($ContextoDiagnostico)) { $Fase } else { $ContextoDiagnostico }
    if ($Fase -eq 'Dependencias' -and (Test-Path -LiteralPath $script:RutaRepo)) {
        Push-Location -LiteralPath $script:RutaRepo
        try {
            $nodeDirsSharp = @(Get-ChildItem -Directory -Recurse -Filter 'nodejs' -ErrorAction SilentlyContinue |
                Where-Object { Test-LayerHasSharpDependency -NodeJsDir $_.FullName })
            foreach ($nd in $nodeDirsSharp) {
                Write-SharpVeredicto -NodeJsDir $nd.FullName -RelLabel (Get-RepoRelativePath -FullPath $nd.FullName) `
                    -ComandoEjecutado '(estado en disco tras fallo de dependencias)' -SalidaNpm @()
            }
        }
        catch {
            Write-Log -Level WARN -Message "No se pudo ejecutar SHARP DIAGNOSTICO tras fallo: $_"
        }
        finally {
            Pop-Location
        }
    }
    if ($script:Diagnostico) {
        Write-DeployDiagnosticoExtendido -Contexto $ctx
    }
    else {
        Write-Log -Level INFO -Message 'Para entorno (PATH, py): -Diagnostico. Si fallo sharp: busque SHARP VEREDICTO: NO APTO en este log.'
    }
}

function Write-DeployError {
    param(
        [Parameter(Mandatory = $true)][string] $Fase,
        [Parameter(Mandatory = $true)][string] $Mensaje,
        [Parameter(Mandatory = $false)][string] $ContextoDiagnostico = ''
    )

    Write-Milestone -Level ERROR -Message "$Fase : $Mensaje"
    Write-DeployContextoFallo -Fase $Fase -ContextoDiagnostico $ContextoDiagnostico
    Write-Log -Level ERROR -Message "Log completo: $script:LogFile"
}

function Initialize-Python314PathForSamBuild {
    <#
    SAM CLI valida Runtime python3.14 contra un Python 3.14 en PATH durante sam build.
    Si existe py -3.14, anteponemos el directorio de ese python.exe a PATH en esta sesion.
    #>
    $flag = $script:LambdaPythonLauncherFlag
    if (-not (Test-CommandExists -CommandName 'py')) {
        Write-Log -Level WARN -Message "sam build PATH: no hay comando py en PATH"
        return $false
    }
    try {
        $raw = & py $flag -c "import sys; print(sys.executable)" 2>&1
        $rawText = ($raw | Out-String).Trim()
        if ($script:Diagnostico) {
            if ($raw -is [System.Array]) {
                foreach ($line in $raw) {
                    Write-Log -Level DEBUG -Message "sam build py $flag -c sys.executable salida: $line"
                }
            }
            elseif (-not [string]::IsNullOrWhiteSpace($rawText)) {
                Write-Log -Level DEBUG -Message "sam build py $flag -c sys.executable salida: $rawText"
            }
        }
        if (-not $rawText) {
            Write-Log -Level WARN -Message "sam build: py $flag no devolvio ruta de ejecutable (exit=$LASTEXITCODE)"
            return $false
        }
        $exe = $rawText
        if ([string]::IsNullOrWhiteSpace($exe) -or -not (Test-Path -LiteralPath $exe)) {
            Write-Log -Level WARN -Message "sam build: ejecutable no existe en disco: '$exe'"
            return $false
        }
        # PS 5.1: Split-Path solo admite -Path, no -LiteralPath (provoca "Parameter set cannot be resolved").
        $binDir = Split-Path -Path $exe -Parent
        $env:PATH = "$binDir;$env:PATH"
        if ($script:Diagnostico) {
            Write-Log -Level INFO -Message "sam build: PATH antepuesto con Python 3.14: $binDir"
            try {
                $firstPython = (Get-Command -Name 'python' -ErrorAction Stop).Source
                $firstVer = (& $firstPython --version 2>&1 | Out-String).Trim()
                Write-Log -Level INFO -Message "sam build: primer python en PATH: $firstPython ($firstVer)"
            }
            catch {
                Write-Log -Level WARN -Message 'sam build: no se pudo leer primer python en PATH tras anteponer 3.14'
            }
        }
        else {
            Write-Log -Level INFO -Message 'sam build: Python 3.14 listo en PATH'
        }
        return $true
    }
    catch {
        Write-Log -Level WARN -Message "sam build: excepcion al resolver py $flag : $_"
        return $false
    }
}

# ---------------------------------------------------------------------------
# 2) Perfil automatico y rutas
# ---------------------------------------------------------------------------

$usuarioActual = $env:USERNAME
switch ($usuarioActual) {
    'pbmadesarrollo' {
        $script:PerfilEtiqueta = 'Desarrolladores'
        $script:RaizGit = 'C:\Users\pbmadesarrollo\Documents\GitHub'
    }
    'pbmaplataforma' {
        $script:PerfilEtiqueta = 'Administradores de Plataforma'
        $script:RaizGit = 'C:\Users\pbmaplataforma\Desktop\GitHub'
    }
    default {
        Write-Error "Usuario no autorizado: '$usuarioActual'. Permitidos: pbmadesarrollo, pbmaplataforma."
        exit 1
    }
}

$script:EntornosSam = switch ($ambiente) {
    'dev'     { @('dev') }
    'sandbox' { @('sandbox', 'sandbox-oregon') }
    'qa'      { @('qa', 'qa-oregon') }
    'prod'    { @('prod', 'prod-oregon') }
    default   { throw "Ambiente no soportado: $ambiente" }
}

$script:RutaRepo = Join-Path -Path $script:RaizGit -ChildPath $repositorio
# Transporte HTTPS (puerto 443): el puerto 22 (SSH) esta bloqueado en la red del servidor.
# Usa las credenciales HTTPS de la maquina (Git Credential Manager / Windows Credential Manager),
# sin depender de llaves SSH por usuario.
$script:UrlRepo = "https://github.com/Telered-Autopista/$repositorio.git"

# GIT_TERMINAL_PROMPT=0 evita que git se cuelgue pidiendo usuario/clave en un prompt interactivo:
# si faltan o son invalidas las credenciales, falla rapido y se dispara el DIAGNOSTICO GIT.
$env:GIT_TERMINAL_PROMPT = '0'
$script:SamPython = 'C:\Program Files\Amazon\AWSSAMCLI\runtime\python.exe'

# Lambdas Python 3.14: instalar dependencias con el MISMO Python que en tu entorno (py -3.14 -m pip).
# Para ese paso no se usa el pip del runtime embebido de SAM (otra version de CPython / ruedas).
$script:LambdaPythonLauncherFlag = '-3.14'
$script:LambdaPythonVersionPip = '3.14'
$script:LambdaPythonAbi = 'cp314'

# Log file
$logDir = Join-Path (Join-Path $PSScriptRoot 'logs') $usuarioActual
Ensure-Directory -Path $logDir
$script:LogFile = if ([string]::IsNullOrWhiteSpace($LogFilePath)) {
    Join-Path $logDir "deploy-$repositorio-$ambiente-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
} else {
    $LogFilePath
}

trap {
    if ($script:UnhandledTrapArmed) {
        Write-DeployError -Fase 'Error no controlado' -Mensaje $_.Exception.Message -ContextoDiagnostico 'trap'
    }
    exit 1
}

# ---------------------------------------------------------------------------
# 3) Validaciones de precondiciones
# ---------------------------------------------------------------------------

try {
    Write-Milestone -Message "INICIO deployNewVersion.ps1"
    Ensure-Directory -Path $script:RaizGit
    Write-DeployResumenEjecucion
    Write-DeployDiagnosticoExtendido -Contexto 'inicio'

    if (!(Test-Path -LiteralPath $script:SamPython)) {
        throw "No se encontro runtime Python de SAM: $script:SamPython"
    }
    if (-not (Test-CommandExists -CommandName 'git')) { throw 'No se encontro comando git en PATH.' }
    if ($modo -in @('full','build') -and -not (Test-CommandExists -CommandName 'npm')) { throw 'No se encontro comando npm en PATH.' }

    if ($modo -in @('full','build')) {
        $flag = $script:LambdaPythonLauncherFlag
        if (-not (Test-CommandExists -CommandName 'py')) {
            throw 'Modo full/build: hace falta el launcher py en PATH. Instale Python 3.14 y py launcher.'
        }
        $pyFacts = Get-Python314Facts
        if (-not $pyFacts.Es314) {
            throw "Modo full/build: py $flag no es Python 3.14.$(Get-DiagnosticoAyuda)"
        }
    }

    if ($modo -eq 'deploy') {
        if (!(Test-Path -LiteralPath $script:RutaRepo)) {
            throw "Modo deploy: no existe la ruta del repositorio $script:RutaRepo"
        }
        $templateDeployCheck = Join-Path $script:RutaRepo '.aws-sam\build\template.patched.yaml'
        if (!(Test-Path -LiteralPath $templateDeployCheck)) {
            throw "Modo deploy: falta $templateDeployCheck"
        }
    }

    Write-Log -Level SUCCESS -Message 'Precondiciones OK.'
}
catch {
    Write-DeployError -Fase 'Validaciones iniciales' -Mensaje "$_" -ContextoDiagnostico 'validaciones_iniciales'
    exit 1
}

# ---------------------------------------------------------------------------
# 4) TEMP aislado por ejecucion + utilidades zip
# ---------------------------------------------------------------------------

function Initialize-SamTempWorkspace {
    [CmdletBinding()]
    param([Parameter(Mandatory = $true)][string] $RepositoryName)

    $baseTemp = 'C:\sam-temp'
    Ensure-Directory -Path $baseTemp

    $safeRepo = ($RepositoryName -replace '[^a-zA-Z0-9._-]', '_')
    $runTemp = Join-Path $baseTemp "$safeRepo-$(Get-Date -Format 'yyyyMMdd-HHmmss')-$PID"
    Ensure-Directory -Path $runTemp

    $env:TEMP = $runTemp
    $env:TMP = $runTemp
    $env:TMPDIR = $runTemp

    Write-Log -Level INFO -Message "Workspace temporal SAM: $runTemp"
    return $runTemp
}

function New-RobustZip {
    <#
    Usa .NET ZipFile para evitar errores recurrentes de Dispose en Compress-Archive.
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)][string] $SourcePath,
        [Parameter(Mandatory = $true)][string] $DestinationZip,
        [Parameter(Mandatory = $false)][int] $MaxAttempts = 4
    )

    Add-Type -AssemblyName System.IO.Compression.FileSystem

    $sourceItem = Get-Item -LiteralPath $SourcePath
    $attempt = 0
    while ($attempt -lt $MaxAttempts) {
        $attempt++
        try {
            if (Test-Path -LiteralPath $DestinationZip) {
                Remove-Item -LiteralPath $DestinationZip -Force -ErrorAction SilentlyContinue
            }

            if ($sourceItem.PSIsContainer) {
                [System.IO.Compression.ZipFile]::CreateFromDirectory($sourceItem.FullName, $DestinationZip)
            }
            else {
                $tempDir = Join-Path ([System.IO.Path]::GetTempPath()) "zip-single-$([guid]::NewGuid().ToString('N'))"
                Ensure-Directory -Path $tempDir
                Copy-Item -LiteralPath $sourceItem.FullName -Destination (Join-Path $tempDir $sourceItem.Name) -Force
                [System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $DestinationZip)
                Remove-Item -LiteralPath $tempDir -Recurse -Force -ErrorAction SilentlyContinue
            }

            if (!(Test-Path -LiteralPath $DestinationZip)) {
                throw "ZIP no creado: $DestinationZip"
            }
            return
        }
        catch {
            if ($attempt -ge $MaxAttempts) {
                throw "No se pudo crear zip '$DestinationZip' desde '$SourcePath': $_"
            }
            Start-Sleep -Seconds ([Math]::Min(10, 2 * $attempt))
        }
    }
}

function New-ArtifactZipName {
    param([Parameter(Mandatory = $true)][string] $KeyName, [Parameter(Mandatory = $true)][string] $SourcePath)
    $safeKey = ($KeyName -replace '[^a-zA-Z0-9._-]', '_')
    $hash = [Math]::Abs($SourcePath.ToLowerInvariant().GetHashCode())
    return "$safeKey-$hash.zip"
}

function New-DeployReadyTemplate {
    [CmdletBinding()]
    param([Parameter(Mandatory = $true)][string] $TemplatePath)

    $templateDir = Split-Path -Path $TemplatePath -Parent
    $artifactDir = Join-Path $templateDir 'artifacts'
    Ensure-Directory -Path $artifactDir

    $cache = @{}
    $outLines = New-Object System.Collections.Generic.List[string]
    $lines = Get-Content -LiteralPath $TemplatePath

    foreach ($line in $lines) {
        $m = [regex]::Match($line, '^(?<indent>\s*)(?<key>CodeUri|ContentUri):\s*(?<value>.+?)\s*$')
        if (-not $m.Success) {
            $outLines.Add($line)
            continue
        }

        $indent = $m.Groups['indent'].Value
        $key = $m.Groups['key'].Value
        $valueRaw = $m.Groups['value'].Value.Trim()
        $value = $valueRaw.Trim("'`"")

        if ($value -match '^(s3://|https?://|!Ref|!Sub|!GetAtt|arn:|null)$') {
            $outLines.Add($line)
            continue
        }

        $resolved = if ([System.IO.Path]::IsPathRooted($value)) { $value } else { Join-Path $templateDir $value }
        if (!(Test-Path -LiteralPath $resolved)) {
            $outLines.Add($line)
            continue
        }

        $zipName = $null
        $ext = [System.IO.Path]::GetExtension($resolved)
        if ($ext -ieq '.zip') {
            $zipName = Split-Path -Path $resolved -Leaf
            Copy-Item -LiteralPath $resolved -Destination (Join-Path $artifactDir $zipName) -Force
        }
        else {
            if ($cache.ContainsKey($resolved)) {
                $zipName = $cache[$resolved]
            }
            else {
                $zipName = New-ArtifactZipName -KeyName $key -SourcePath $resolved
                $zipPath = Join-Path $artifactDir $zipName
                New-RobustZip -SourcePath $resolved -DestinationZip $zipPath -MaxAttempts 4
                $cache[$resolved] = $zipName
            }
        }

        $outLines.Add("$indent${key}: artifacts/$zipName")
    }

    $deployTemplate = Join-Path $templateDir 'template.deploy-ready.yaml'
    $utf8NoBom = [System.Text.UTF8Encoding]::new($false)
    [System.IO.File]::WriteAllLines($deployTemplate, $outLines, $utf8NoBom)
    Write-Log -Level SUCCESS -Message "Template deploy-ready generado: $deployTemplate"
    return $deployTemplate
}

# ---------------------------------------------------------------------------
# 5) Git remote-first + validacion hash
# ---------------------------------------------------------------------------

function Write-GitCommitResumen {
    $head = (Invoke-GitQuiet -Arguments @('rev-parse', '--short', 'HEAD')).Output.Trim()
    $subject = (Invoke-GitQuiet -Arguments @('log', '-1', '--pretty=%s')).Output.Trim()
    $author = (Invoke-GitQuiet -Arguments @('log', '-1', '--pretty=%an')).Output.Trim()
    if ([string]::IsNullOrWhiteSpace($head)) { return }
    Write-Log -Level SUCCESS -Message "Git sincronizado: $head - $subject ($author)"
    if ($script:Diagnostico) {
        git show --no-patch --pretty=fuller -n 1 2>$null | ForEach-Object {
            if (-not [string]::IsNullOrWhiteSpace($_)) {
                Write-Log -Level INFO -Message $_
            }
        }
    }
}

function Invoke-GitRemoteFirstSync {
    Write-Milestone -Message 'GIT - sincronizar repositorio con origin (remote-first)'
    if ($script:Diagnostico) {
        Write-Log -Level INFO -Message 'Git: fetch, reset --hard, clean -fdx, checkout -B, reset --hard origin'
    }

    if (!(Test-Path -LiteralPath $script:RutaRepo)) {
        if (-not $PSCmdlet.ShouldProcess($script:RutaRepo, "Clonar repo desde $script:UrlRepo")) {
            throw 'Operacion cancelada por ShouldProcess durante clone.'
        }
        Set-Location -LiteralPath $script:RaizGit
        git clone $script:UrlRepo $repositorio
        Assert-LastExitCode -Context 'git clone'
    }

    Set-Location -LiteralPath $script:RutaRepo

    # Repo ya clonado con la URL anterior (puerto 22): realinear origin al transporte SSH/443.
    git remote set-url origin $script:UrlRepo
    Assert-LastExitCode -Context 'git remote set-url origin'

    git fetch origin
    Assert-LastExitCode -Context 'git fetch origin'
    # Obligatorio: git clean NO elimina modificaciones en archivos ya versionados (ej. package-lock.json).
    # Sin esto, git checkout -B puede abortar con "would be overwritten by checkout".
    git reset --hard HEAD
    Assert-LastExitCode -Context 'git reset --hard HEAD (descartar cambios locales en tracked)'
    git clean -fdx
    Assert-LastExitCode -Context 'git clean -fdx (1)'

    $remoteExists = git ls-remote --heads origin $ramaGit
    if (-not $remoteExists) {
        throw "Rama remota inexistente o inaccesible: origin/$ramaGit"
    }

    git checkout -B $ramaGit "origin/$ramaGit"
    Assert-LastExitCode -Context 'git checkout -B'

    if ($esReversa -eq 'si') {
        $target = git rev-parse --verify "origin/$ramaGit^" 2>$null
        if (-not $target) {
            throw "No se pudo resolver commit padre de origin/$ramaGit"
        }
        git reset --hard $target
        Assert-LastExitCode -Context 'git reset --hard (reversa)'
    }
    else {
        git reset --hard "origin/$ramaGit"
        Assert-LastExitCode -Context 'git reset --hard'
    }

    git clean -fdx
    Assert-LastExitCode -Context 'git clean -fdx (2)'

    Write-Log -Level INFO -Message "Git rama: $(git branch --show-current)"
    Write-GitCommitResumen
}

function Test-HashCommitMatchesHead {
    [CmdletBinding()]
    param([Parameter(Mandatory = $true)][string] $Commitish)

    $provided = $Commitish.Trim().ToLowerInvariant()
    $repoLabel = Split-Path -Leaf $script:RutaRepo

    $cat = Invoke-GitQuiet -Arguments @('cat-file', '-t', $provided)
    if ($cat.ExitCode -ne 0 -or [string]::IsNullOrWhiteSpace($cat.Output)) {
        throw "hashCommit incorrecto: '$Commitish' no existe en el repositorio '$repoLabel'. Verifique -hashCommit (debe ser: git rev-parse HEAD en '$repoLabel' en la rama desplegada)."
    }

    $objType = $cat.Output.Trim().ToLowerInvariant()
    if ($objType -ne 'commit') {
        throw "hashCommit incorrecto: '$Commitish' no es un commit (tipo detectado: $objType)."
    }

    $headResult = Invoke-GitQuiet -Arguments @('rev-parse', 'HEAD')
    if ($headResult.ExitCode -ne 0 -or [string]::IsNullOrWhiteSpace($headResult.Output)) {
        throw "hashCommit incorrecto: no se pudo obtener HEAD del repositorio '$repoLabel' tras la sincronizacion Git."
    }

    $head = $headResult.Output.Trim().ToLowerInvariant()
    $ok = if ($provided.Length -lt 40) { $head.StartsWith($provided) } else { $head -eq $provided }
    if (-not $ok) {
        throw "hashCommit incorrecto: '$Commitish' no coincide con HEAD del repositorio '$repoLabel'. HEAD actual: $head. Use el commit al que quedo la rama tras el sync."
    }

    Write-Log -Level SUCCESS -Message "hashCommit OK (coincide con HEAD)."
}

try {
    if ($modo -in @('full','build')) {
        Invoke-GitRemoteFirstSync
    }
    elseif ($modo -eq 'deploy') {
        Set-Location -LiteralPath $script:RutaRepo
    }
    Test-HashCommitMatchesHead -Commitish $hashCommit
}
catch {
    $detail = if ($_.Exception.Message) { $_.Exception.Message } else { "$_" }
    if ($detail -match '(?i)fatal:\s*git cat-file') {
        $repoLabel = Split-Path -Leaf $script:RutaRepo
        $detail = "hashCommit incorrecto: '$hashCommit' no existe en el repositorio '$repoLabel'. Verifique -hashCommit."
    }
    Write-DeployError -Fase 'Git / hashCommit' -Mensaje $detail -ContextoDiagnostico 'git_hashcommit'
    exit 1
}

# ---------------------------------------------------------------------------
# 6) Verdaccio + dependencias (solo full/build)
# ---------------------------------------------------------------------------

function Test-VerdaccioListening {
    try {
        $listeners = @(Get-NetTCPConnection -LocalPort 4873 -State Listen -ErrorAction SilentlyContinue)
        if ($listeners.Count -gt 0) { return $true }
    }
    catch { }
    try {
        $probe = Test-NetConnection -ComputerName '127.0.0.1' -Port 4873 -WarningAction SilentlyContinue
        return [bool]$probe.TcpTestSucceeded
    }
    catch {
        return $false
    }
}

function Ensure-VerdaccioRunning {
    if (Test-VerdaccioListening) {
        Write-Log -Level SUCCESS -Message 'Registry npm local disponible en puerto 4873.'
        return
    }

    Write-Log -Level WARN -Message 'Verdaccio no disponible. Iniciando cmd /c verdaccio en hidden...'
    Start-Process -FilePath $env:ComSpec -ArgumentList '/c', 'verdaccio' -WindowStyle Hidden

    for ($i = 1; $i -le 15; $i++) {
        Start-Sleep -Seconds 1
        if (Test-VerdaccioListening) {
            Write-Log -Level SUCCESS -Message "Verdaccio disponible tras ${i}s."
            return
        }
    }
    throw 'Verdaccio no quedo disponible en puerto 4873'
}

try {
    if ($modo -in @('full','build')) {
        Write-Milestone -Message 'DEPENDENCIAS - npm (layer Node) y pip (Lambdas Python)'
        Set-Location -LiteralPath $script:RutaRepo
        Ensure-VerdaccioRunning

        $nodeDirs = @(Get-ChildItem -Directory -Recurse -Filter 'nodejs' -ErrorAction SilentlyContinue)
        Write-Log -Level INFO -Message "npm: $($nodeDirs.Count) carpeta(s) nodejs"
        foreach ($nodeDir in $nodeDirs) {
            $relNode = Get-RepoRelativePath -FullPath $nodeDir.FullName
            Invoke-NpmInstallNodeLayer -NodeJsDir $nodeDir.FullName -RelLabel $relNode

                # if ($nodeDir.FullName -match 'tld-api-cuenta-nombre|tld-api-p2m|tld-api-r2p') {
                #     Push-Location $nodeDir.FullName
                #     try {
                #         npm install @telered/tld-telered-lib --registry=http://localhost:4873
                #         Assert-LastExitCode -Context "npm install @telered/tld-telered-lib ($relNode)"
                #     } finally { Pop-Location }
                # }
        }

        # pip: Lambdas Python 3.14 con py -3.14 -m pip (no el pip del runtime SAM).
        # Ruedas manylinux cp314 para carpetas de autorizador (nativas en Linux Lambda).
        # - tld-matriz: tld-auth-autorizador
        # - tld-validador-dummy: auth-authorize
        # Anadir el nombre de carpeta (ultimo segmento) si agregas otra Lambda igual y sigue en python3.14 x86_64.
        $isWindowsHost = ($env:OS -eq 'Windows_NT')
        $pipLinuxPy314LeafNames = @('tld-auth-autorizador', 'auth-authorize')
        $pyCmd = (Get-Command -Name 'py' -ErrorAction Stop).Source
        $flag = $script:LambdaPythonLauncherFlag
        $reqFiles = @(Get-ChildItem -Recurse -Filter 'requirements.txt' -File -ErrorAction SilentlyContinue)
        Write-Log -Level INFO -Message "pip: $($reqFiles.Count) requirements.txt"
        foreach ($reqFile in $reqFiles) {
            $reqDir = $reqFile.DirectoryName
            $relReq = Get-RepoRelativePath -FullPath $reqDir
            $skipLocalPip = Join-Path $reqDir '.sam-no-local-pip'
            if (Test-Path -LiteralPath $skipLocalPip) {
                Write-Log -Level INFO -Message "pip omitido (.sam-no-local-pip): $relReq"
                continue
            }
            Push-Location $reqDir
            try {
                $pipArgs = @($flag, '-m', 'pip', 'install', '--target', '.', '-r', 'requirements.txt')
                $reqLeaf = Split-Path -Path $reqDir -Leaf
                $useLinuxLambdaWheelsPy314 = $isWindowsHost -and ($pipLinuxPy314LeafNames -contains $reqLeaf)
                if ($useLinuxLambdaWheelsPy314) {
                    Write-Log -Level INFO -Message "pip Lambda (manylinux $script:LambdaPythonAbi): $relReq"
                    $pipArgs += @(
                        '--platform', 'manylinux2014_x86_64',
                        '--implementation', 'cp',
                        '--python-version', $script:LambdaPythonVersionPip,
                        '--abi', $script:LambdaPythonAbi,
                        '--only-binary=:all:'
                    )
                }
                else {
                    Write-Log -Level INFO -Message "pip: $relReq"
                }
                if ($script:Diagnostico) {
                    $cmdPreview = "py $flag -m pip install --target . -r requirements.txt"
                    if ($useLinuxLambdaWheelsPy314) {
                        $cmdPreview += " --platform manylinux2014_x86_64 --python-version $script:LambdaPythonVersionPip --abi $script:LambdaPythonAbi --only-binary=:all:"
                    }
                    Write-Log -Level DEBUG -Message "comando: $cmdPreview | cwd=$reqDir"
                }
                Invoke-External -FilePath $pyCmd -Arguments $pipArgs -Context "py $flag -m pip ($relReq)"
            }
            finally {
                Pop-Location
            }
        }

        Write-Milestone -Level SUCCESS -Message 'DEPENDENCIAS OK'
    }
}
catch {
    Write-DeployError -Fase 'Dependencias' -Mensaje "$_" -ContextoDiagnostico 'dependencias'
    exit 1
}

# ---------------------------------------------------------------------------
# 7) Build SAM + ZIP layer + template.patched.yaml (INNEGOCIABLE)
# ---------------------------------------------------------------------------

if ($modo -in @('full','build')) {
    try {
        Write-Milestone -Message 'BUILD - sam build, layer ZIP y template'
        Initialize-SamTempWorkspace -RepositoryName $repositorio | Out-Null

        $dirAwsSam = Join-Path $script:RutaRepo '.aws-sam'
        $dirBuild = Join-Path $dirAwsSam 'build'
        $templateYaml = Join-Path $dirBuild 'template.yaml'
        $templatePatched = Join-Path $dirBuild 'template.patched.yaml'
        $layerDir = Join-Path $script:RutaRepo 'lambdas\layer'
        $zipLayerName = "$repositorio-layer.zip"
        $zipLayerRoot = Join-Path $dirAwsSam $zipLayerName
        $zipLayerBuild = Join-Path $dirBuild $zipLayerName

        Set-Location -LiteralPath $script:RutaRepo

        $samBuildArgs = @('-m', 'samcli', 'build')
        $py314Ok = Initialize-Python314PathForSamBuild
        if (-not $py314Ok) {
            $f = $script:LambdaPythonLauncherFlag
            throw "sam build: no se pudo anteponer Python 3.14 al PATH (py $f).$(Get-DiagnosticoAyuda)"
        }

        Write-DeployDiagnosticoExtendido -Contexto 'antes_sam_build'
        Write-Log -Level INFO -Message 'Ejecutando sam build...'
        Invoke-External -FilePath $script:SamPython -Arguments $samBuildArgs -Context 'sam build'

        # 1) sam build (ya ejecutado)
        # 2) zip manual layer
        New-RobustZip -SourcePath $layerDir -DestinationZip $zipLayerRoot -MaxAttempts 4
        # 3) copiar zip a .aws-sam/build
        Ensure-Directory -Path $dirBuild
        Copy-Item -LiteralPath $zipLayerRoot -Destination $zipLayerBuild -Force
        # 4) copiar template y parchear ContentUri
        Copy-Item -LiteralPath $templateYaml -Destination $templatePatched -Force
        $patched = (Get-Content -LiteralPath $templatePatched -Raw) -replace 'ContentUri:\s*.*lambdas[\\/]+layer.*', "ContentUri: $zipLayerName"
        $utf8NoBom = [System.Text.UTF8Encoding]::new($false)
        [System.IO.File]::WriteAllText($templatePatched, $patched, $utf8NoBom)

        Write-Milestone -Level SUCCESS -Message 'BUILD OK'
    }
    catch {
        Write-DeployError -Fase 'Build' -Mensaje "$_" -ContextoDiagnostico 'sam_build'
        exit 1
    }
}

# ---------------------------------------------------------------------------
# 8) Deploy con mitigaciones de lock (full/deploy)
# ---------------------------------------------------------------------------

if ($modo -in @('full','deploy')) {
    try {
        $templatePatched = Join-Path $script:RutaRepo '.aws-sam\build\template.patched.yaml'
        $samConfig = Join-Path $script:RutaRepo 'samconfig.toml'
        if (!(Test-Path -LiteralPath $templatePatched)) { throw "No existe $templatePatched" }
        if (!(Test-Path -LiteralPath $samConfig)) { throw "No existe $samConfig" }

        Set-Location -LiteralPath $script:RutaRepo
        Initialize-SamTempWorkspace -RepositoryName $repositorio | Out-Null

        $templateDeployReady = New-DeployReadyTemplate -TemplatePath $templatePatched
        $maxDeployAttempts = 4

        foreach ($entorno in $script:EntornosSam) {
            Write-Milestone -Message "DEPLOY - inicio entorno '$entorno'"
            $ok = $false

            for ($attempt = 1; $attempt -le $maxDeployAttempts; $attempt++) {
                if ($attempt -gt 1) {
                    $sleepSec = [Math]::Min(20, 3 * $attempt)
                    Write-Log -Level WARN -Message "Reintento deploy $attempt/$maxDeployAttempts para entorno $entorno. Espera ${sleepSec}s."
                    Start-Sleep -Seconds $sleepSec
                    Initialize-SamTempWorkspace -RepositoryName $repositorio | Out-Null
                }

                $prefix = "$repositorio/$entorno/$((Get-Date -Format 'yyyyMMdd-HHmmss'))/$attempt"
                if ($script:Diagnostico) {
                    Write-Log -Level DEBUG -Message "sam deploy con --s3-prefix '$prefix' y --force-upload"
                }

                & $script:SamPython -m samcli deploy `
                    --config-file $samConfig `
                    --config-env $entorno `
                    --template-file $templateDeployReady `
                    --s3-prefix $prefix `
                    --force-upload `
                    --no-confirm-changeset

                if ($LASTEXITCODE -eq 0) {
                    $ok = $true
                    break
                }
            }

            if (-not $ok) {
                throw "sam deploy fallo en entorno $entorno tras $maxDeployAttempts intentos"
            }

            Write-Milestone -Level SUCCESS -Message "DEPLOY - fin entorno '$entorno' (exito)"
        }
    }
    catch {
        Write-DeployError -Fase 'Deploy' -Mensaje "$_" -ContextoDiagnostico 'sam_deploy'
        exit 1
    }
}

$elapsed = (Get-Date) - $script:StartTime
$elapsedText = $elapsed.ToString('hh\:mm\:ss')
Write-Milestone -Level SUCCESS -Message "FIN TOTAL - deploy completado en $elapsedText | log=$script:LogFile"
exit 0
