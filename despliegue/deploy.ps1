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
    - Tras preparar log y raiz Git escribe en el log un bloque ENTORNO (Node/npm/Python SAM) para diagnosticar fallos.
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
    [switch] $NoColor
)

# Codificacion UTF-8 para consola/salida.
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false
$script:UnhandledTrapArmed = $true

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

function Write-DeployRuntimeSnapshot {
    <#
    Registra en consola y en el archivo de log las versiones y rutas de Node/npm y del Python de SAM
    (el que usa este script para pip y sam), mas datos minimos del host. Sirve para investigar fallos
    sin asumir la configuracion de la maquina donde se ejecuta el deploy.
    #>
    Write-Milestone -Message 'ENTORNO - Node.js, npm y Python/pip/sam usados por este script (diagnostico)'

    Write-Log -Level INFO -Message "ENTORNO PowerShell: $($PSVersionTable.PSVersion) | PSEdition: $($PSVersionTable.PSEdition)"
    Write-Log -Level INFO -Message "ENTORNO host: COMPUTERNAME=$env:COMPUTERNAME | USERNAME=$env:USERNAME | OSVersion=$([System.Environment]::OSVersion.VersionString) | Is64BitOS=$([Environment]::Is64BitOperatingSystem)"

    if (Test-CommandExists -CommandName 'node') {
        try {
            $nodeCmd = Get-Command -Name 'node' -ErrorAction Stop
            $nodeVer = (& $nodeCmd.Source --version 2>&1 | Out-String).Trim()
            Write-Log -Level INFO -Message "ENTORNO node: version=$nodeVer | ejecutable=$($nodeCmd.Source)"
        }
        catch {
            Write-Log -Level WARN -Message "ENTORNO node: error al consultar: $_"
        }
    }
    else {
        Write-Log -Level INFO -Message 'ENTORNO node: no encontrado en PATH'
    }

    if (Test-CommandExists -CommandName 'npm') {
        try {
            $npmCmd = Get-Command -Name 'npm' -ErrorAction Stop
            $npmVer = (& $npmCmd.Source --version 2>&1 | Out-String).Trim()
            Write-Log -Level INFO -Message "ENTORNO npm: version=$npmVer | ejecutable=$($npmCmd.Source)"
            $npmReg = (& $npmCmd.Source config get registry 2>&1 | Out-String).Trim()
            Write-Log -Level INFO -Message "ENTORNO npm config registry: $npmReg"
        }
        catch {
            Write-Log -Level WARN -Message "ENTORNO npm: error al consultar: $_"
        }
    }
    else {
        Write-Log -Level INFO -Message 'ENTORNO npm: no encontrado en PATH'
    }

    if (Test-Path -LiteralPath $script:SamPython) {
        try {
            $samPyVer = (& $script:SamPython --version 2>&1 | Out-String).Trim()
            Write-Log -Level INFO -Message "ENTORNO Python (runtime SAM CLI, usado por pip/sam en este script): $samPyVer | ejecutable=$script:SamPython"
        }
        catch {
            Write-Log -Level WARN -Message "ENTORNO Python SAM: error al --version: $_"
        }
        try {
            $pyDetail = (& $script:SamPython -c "import sys; print(sys.version.replace(chr(10), ' '))" 2>&1 | Out-String).Trim()
            Write-Log -Level INFO -Message "ENTORNO Python SAM sys.version: $pyDetail"
        }
        catch {
            Write-Log -Level WARN -Message "ENTORNO Python SAM sys.version: $_"
        }
        try {
            $pipVer = (& $script:SamPython -m pip --version 2>&1 | Out-String).Trim()
            Write-Log -Level INFO -Message "ENTORNO pip (modulo del Python SAM): $pipVer"
        }
        catch {
            Write-Log -Level WARN -Message "ENTORNO pip (Python SAM): $_"
        }
        try {
            $samVer = (& $script:SamPython -m samcli --version 2>&1 | Out-String).Trim()
            Write-Log -Level INFO -Message "ENTORNO AWS SAM CLI (samcli via Python SAM): $samVer"
        }
        catch {
            Write-Log -Level WARN -Message "ENTORNO AWS SAM CLI: no se pudo leer version (sam build/deploy podria fallar despues): $_"
        }
    }
    else {
        Write-Log -Level WARN -Message "ENTORNO Python SAM: ruta no existe ($script:SamPython) - no se consultaron pip/sam."
    }

    $pythonPathCmd = Get-Command -Name 'python' -ErrorAction SilentlyContinue
    if ($null -ne $pythonPathCmd) {
        try {
            $pathPyVer = (& $pythonPathCmd.Source --version 2>&1 | Out-String).Trim()
            Write-Log -Level INFO -Message "ENTORNO python (primer 'python' en PATH, no es el usado por este script para pip si difiere del SAM): $pathPyVer | ejecutable=$($pythonPathCmd.Source)"
        }
        catch {
            Write-Log -Level WARN -Message "ENTORNO python PATH: $_"
        }
    }
    else {
        Write-Log -Level INFO -Message 'ENTORNO python: ningun ejecutable ''python'' en PATH (solo informativo; el script usa el Python embebido en SAM para pip/sam).'
    }

    Write-Log -Level INFO -Message 'ENTORNO fin del bloque diagnostico.'
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
$script:UrlRepo = "git@github.com:Telered-Autopista/$repositorio.git"
$script:SamPython = 'C:\Program Files\Amazon\AWSSAMCLI\runtime\python.exe'

# Log file
$logDir = Join-Path $PSScriptRoot 'logs'
Ensure-Directory -Path $logDir
$script:LogFile = if ([string]::IsNullOrWhiteSpace($LogFilePath)) {
    Join-Path $logDir "deploy-$repositorio-$ambiente-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
} else {
    $LogFilePath
}

trap {
    if ($script:UnhandledTrapArmed) {
        Write-Log -Level ERROR -WithTimestamp -Message "FATAL (no controlado): $($_.Exception.Message)"
    }
    exit 1
}

# ---------------------------------------------------------------------------
# 3) Validaciones de precondiciones
# ---------------------------------------------------------------------------

try {
    Write-Milestone -Message "INICIO - modo=$modo | usuario=$usuarioActual | Perfil: $script:PerfilEtiqueta | repo=$repositorio | rama=$ramaGit | ambiente=$ambiente"
    Write-Log -Level INFO -Message "Raiz Git: $script:RaizGit"
    Write-Log -Level INFO -Message "Ruta repo: $script:RutaRepo"
    Write-Log -Level INFO -Message "Entornos SAM: $($script:EntornosSam -join ', ')"
    Write-Log -Level INFO -Message "Archivo log: $script:LogFile"

    Ensure-Directory -Path $script:RaizGit

    # Antes de fallar por SAM/Python ausente: dejar versiones de Node/npm (y lo que exista de Python) en el log.
    Write-DeployRuntimeSnapshot

    if (!(Test-Path -LiteralPath $script:SamPython)) {
        throw "No se encontro runtime Python de SAM: $script:SamPython"
    }
    if (-not (Test-CommandExists -CommandName 'git')) { throw 'No se encontro comando git en PATH.' }
    if ($modo -in @('full','build') -and -not (Test-CommandExists -CommandName 'npm')) { throw 'No se encontro comando npm en PATH.' }

    if ($modo -eq 'deploy') {
        if (!(Test-Path -LiteralPath $script:RutaRepo)) {
            throw "Modo deploy: no existe la ruta del repositorio $script:RutaRepo"
        }
        $templateDeployCheck = Join-Path $script:RutaRepo '.aws-sam\build\template.patched.yaml'
        if (!(Test-Path -LiteralPath $templateDeployCheck)) {
            throw "Modo deploy: falta $templateDeployCheck"
        }
    }
}
catch {
    Write-Milestone -Level ERROR -Message "Fallo en validaciones iniciales: $_"
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

function Invoke-GitRemoteFirstSync {
    Write-Log -Level STEP -Message 'Fase Git: fetch, reset --hard (descarta cambios locales en archivos rastreados), clean -fdx, checkout -B, reset --hard origin'

    if (!(Test-Path -LiteralPath $script:RutaRepo)) {
        if (-not $PSCmdlet.ShouldProcess($script:RutaRepo, "Clonar repo desde $script:UrlRepo")) {
            throw 'Operacion cancelada por ShouldProcess durante clone.'
        }
        Set-Location -LiteralPath $script:RaizGit
        git clone $script:UrlRepo $repositorio
        Assert-LastExitCode -Context 'git clone'
    }

    Set-Location -LiteralPath $script:RutaRepo

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

    Write-Log -Level INFO -Message "Git - rama actual: $(git branch --show-current)"
    git show --no-patch --pretty=fuller -n 1 2>$null | ForEach-Object {
        if (-not [string]::IsNullOrWhiteSpace($_)) {
            Write-Log -Level INFO -Message $_
        }
    }
}

function Test-HashCommitMatchesHead {
    [CmdletBinding()]
    param([Parameter(Mandatory = $true)][string] $Commitish)

    $provided = $Commitish.Trim().ToLowerInvariant()
    $objType = git cat-file -t $provided 2>$null
    if (-not $objType) { throw "hashCommit no existe: $Commitish" }
    if ($objType -ne 'commit') { throw "hashCommit no es commit (tipo: $objType)" }

    $head = (git rev-parse HEAD 2>$null).Trim().ToLowerInvariant()
    if (-not $head) { throw 'No se pudo resolver HEAD' }

    $ok = if ($provided.Length -lt 40) { $head.StartsWith($provided) } else { $head -eq $provided }
    if (-not $ok) {
        throw "HEAD ($head) no coincide con hashCommit ($Commitish)"
    }
    Write-Log -Level SUCCESS -Message "Validacion hashCommit OK: coincide con HEAD."
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
    Write-Milestone -Level ERROR -Message "Error en fase Git/hashCommit: $_"
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
        Set-Location -LiteralPath $script:RutaRepo
        Ensure-VerdaccioRunning

        Get-ChildItem -Recurse -Filter 'package-lock.json' -ErrorAction SilentlyContinue |
            Remove-Item -Force -ErrorAction SilentlyContinue

        Get-ChildItem -Directory -Recurse -Filter 'nodejs' -ErrorAction SilentlyContinue | ForEach-Object {
            Push-Location $_.FullName
            try {
                npm cache clean --force
                Assert-LastExitCode -Context "npm cache clean ($($_.FullName))"

                # if ($_.FullName -match 'tld-api-cuenta-nombre|tld-api-p2m|tld-api-r2p') {
                if ($_.FullName -match 'tld-api-cuenta-nombre|tld-api-r2p') {
                    npm install @telered/tld-telered-lib --registry=http://localhost:4873
                    Assert-LastExitCode -Context "npm install @telered/tld-telered-lib ($($_.FullName))"
                }

                npm i --production
                Assert-LastExitCode -Context "npm i --production ($($_.FullName))"

                if ($_.FullName -match 'tld-api-p2m') {
                    npm install --os=linux --cpu=x64 sharp
                    Assert-LastExitCode -Context "npm install sharp ($($_.FullName))"
                }
            }
            finally {
                Pop-Location
            }
        }

        # pip en Windows descarga ruedas win_amd64; Lambda (Amazon Linux) necesita ruedas Linux x86_64.
        # Sin --platform manylinux*, imports nativos (p. ej. cryptography / jose) fallan al arrancar la Lambda en AWS.
        # Ruedas manylinux cp38: Lambdas Python 3.8 + deps nativas (p. ej. cryptography) desplegadas desde Windows.
        # - tld-matriz: tld-auth-autorizador
        # - tld-validador-dummy: auth-authorize
        # Anadir el nombre de carpeta (ultimo segmento) si agregas otra Lambda igual y sigue en python3.8 x86_64.
        $isWindowsHost = ($env:OS -eq 'Windows_NT')
        $pipLinuxPy38LeafNames = @('tld-auth-autorizador', 'auth-authorize')
        Get-ChildItem -Recurse -Filter 'requirements.txt' -File -ErrorAction SilentlyContinue | ForEach-Object {
            $reqDir = $_.DirectoryName
            $skipLocalPip = Join-Path $reqDir '.sam-no-local-pip'
            if (Test-Path -LiteralPath $skipLocalPip) {
                Write-Log -Level INFO -Message "Omitiendo pip local (marcador .sam-no-local-pip): $reqDir"
            }
            else {
                Push-Location $reqDir
                try {
                    $pipArgs = @('-m', 'pip', 'install', '--target', '.', '-r', 'requirements.txt')
                    $reqLeaf = Split-Path -Path $reqDir -Leaf
                    $useLinuxLambdaWheelsPy38 = $isWindowsHost -and ($pipLinuxPy38LeafNames -contains $reqLeaf)
                    if ($useLinuxLambdaWheelsPy38) {
                        Write-Log -Level INFO -Message "pip install con ruedas manylinux2014_x86_64 cp38 (Windows -> Lambda Linux): $reqDir"
                        # pip 25+: con --platform/--abi exige --only-binary=:all: o --no-deps.
                        $pipArgs += @(
                            '--platform', 'manylinux2014_x86_64',
                            '--implementation', 'cp',
                            '--python-version', '3.8',
                            '--abi', 'cp38',
                            '--only-binary=:all:'
                        )
                    }
                    Invoke-External -FilePath $script:SamPython -Arguments $pipArgs -Context "pip install ($reqDir)"
                }
                finally {
                    Pop-Location
                }
            }
        }

        Write-Milestone -Level SUCCESS -Message 'FIN DEPENDENCIAS - Node y Python instalados'
    }
}
catch {
    Write-Milestone -Level ERROR -Message "Error en dependencias: $_"
    exit 1
}

# ---------------------------------------------------------------------------
# 7) Build SAM + ZIP layer + template.patched.yaml (INNEGOCIABLE)
# ---------------------------------------------------------------------------

if ($modo -in @('full','build')) {
    try {
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
        Invoke-External -FilePath $script:SamPython -Arguments @('-m','samcli','build') -Context 'sam build'

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

        Write-Milestone -Level SUCCESS -Message 'FIN BUILD - sam build, layer ZIP y template.patched.yaml listos'
    }
    catch {
        Write-Milestone -Level ERROR -Message "Error en build: $_"
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
                Write-Log -Level DEBUG -Message "sam deploy con --s3-prefix '$prefix' y --force-upload"

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
        Write-Milestone -Level ERROR -Message "Error en deploy: $_"
        exit 1
    }
}

$elapsed = (Get-Date) - $script:StartTime
$elapsedText = $elapsed.ToString('hh\:mm\:ss')
Write-Milestone -Level SUCCESS -Message "FIN TOTAL - ejecucion completada en $elapsedText"
exit 0
