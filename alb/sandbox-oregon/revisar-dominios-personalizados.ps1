#Requires -Version 5.1
<#
.SYNOPSIS
  Lista nombres de dominio personalizados de API Gateway y sus mappings.

.DESCRIPTION
  Cubre API Gateway REST (apigateway) y HTTP/WebSocket (apigatewayv2).
  Escribe JSON + un resumen CSV. Si pasás el dump de reglas del ALB, marca
  Hosts del listener que no tienen dominio o que no tienen mapping.

  Después copiá la carpeta de salida a:
  second-brain/alb/sandbox-oregon/dominios-personalizados-raw/

.EXAMPLE
  .\revisar-dominios-personalizados.ps1

.EXAMPLE
  .\revisar-dominios-personalizados.ps1 -Region us-west-2 `
    -AlbRulesJson .\alb-sandbox-oregon-raw\04-rules-listener-0.json
#>
[CmdletBinding()]
param(
  [string]$Region = 'us-west-2',
  [string]$OutDir = (Join-Path (Get-Location) 'dominios-personalizados-raw'),
  [string]$AlbRulesJson = ''
)

$ErrorActionPreference = 'Stop'
$env:AWS_DEFAULT_REGION = $Region

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
Set-Location $OutDir
Write-Host "Región: $Region" -ForegroundColor Cyan
Write-Host "Salida: $OutDir" -ForegroundColor Cyan

function Invoke-AwsJson {
  param(
    [Parameter(Mandatory)][string]$OutFile,
    [Parameter(Mandatory)][string[]]$AwsArgs
  )
  Write-Host "→ $OutFile" -ForegroundColor DarkGray
  $json = & aws @AwsArgs --region $Region --output json 2>&1
  if ($LASTEXITCODE -ne 0) {
    $json | Set-Content -Encoding utf8 ($OutFile + '.error.txt')
    throw "aws falló ($OutFile). Ver $($OutFile).error.txt"
  }
  # aws a veces devuelve varios objetos String; unir
  if ($json -is [System.Array]) {
    $json = $json -join "`n"
  }
  $json | Set-Content -Encoding utf8 $OutFile
  return $json
}

function Get-SafeFileName {
  param([string]$Name)
  ($Name -replace '[^a-zA-Z0-9._-]', '_')
}

# --- REST API Gateway (v1) ---
$restDomainsRaw = Invoke-AwsJson '01-apigateway-domain-names.json' @(
  'apigateway', 'get-domain-names'
)
$restDomains = $restDomainsRaw | ConvertFrom-Json
$restItems = @($restDomains.items)
if (-not $restItems) { $restItems = @() }

$i = 0
foreach ($d in $restItems) {
  $name = $d.domainName
  $safe = Get-SafeFileName $name
  $file = ('02-rest-mappings-{0:D2}-{1}.json' -f $i, $safe)
  try {
    Invoke-AwsJson $file @(
      'apigateway', 'get-base-path-mappings',
      '--domain-name', $name
    ) | Out-Null
  }
  catch {
    Write-Warning "REST mappings falló para ${name}: $_"
  }
  $i++
}

# --- API Gateway v2 (HTTP / WebSocket) ---
try {
  $v2DomainsRaw = Invoke-AwsJson '03-apigatewayv2-domain-names.json' @(
    'apigatewayv2', 'get-domain-names'
  )
  $v2Domains = $v2DomainsRaw | ConvertFrom-Json
  $v2Items = @($v2Domains.Items)
  if (-not $v2Items) { $v2Items = @() }
}
catch {
  Write-Warning "apigatewayv2 get-domain-names falló (¿sin HTTP APIs o sin permiso?): $_"
  $v2Items = @()
}

$j = 0
foreach ($d in $v2Items) {
  $name = $d.DomainName
  if (-not $name) { $name = $d.domainName }
  $safe = Get-SafeFileName $name
  $file = ('04-v2-mappings-{0:D2}-{1}.json' -f $j, $safe)
  try {
    Invoke-AwsJson $file @(
      'apigatewayv2', 'get-api-mappings',
      '--domain-name', $name
    ) | Out-Null
  }
  catch {
    Write-Warning "v2 mappings falló para ${name}: $_"
  }
  $j++
}

# --- Resumen ---
$rows = New-Object System.Collections.Generic.List[object]

foreach ($d in $restItems) {
  $name = $d.domainName
  $safe = Get-SafeFileName $name
  $mapFile = Get-ChildItem -Filter ("02-rest-mappings-*-{0}.json" -f $safe) -ErrorAction SilentlyContinue |
    Select-Object -First 1
  $mappings = @()
  $sinMapping = $true
  if ($mapFile) {
    $mapDoc = Get-Content -Raw $mapFile.FullName | ConvertFrom-Json
    $mappings = @($mapDoc.items)
    if (-not $mappings) { $mappings = @() }
    $sinMapping = ($mappings.Count -eq 0)
  }
  $mapSummary = ($mappings | ForEach-Object {
      $bp = if ($_.basePath) { $_.basePath } else { '(none)' }
      '{0} → {1}/{2}' -f $bp, $_.restApiId, $_.stage
    }) -join '; '
  $rows.Add([pscustomobject]@{
      ApiKind       = 'REST'
      DomainName    = $name
      DomainStatus  = $d.domainNameStatus
      EndpointType  = (@($d.endpointConfiguration.types) -join ',')
      MappingCount  = $mappings.Count
      SinMapping    = $sinMapping
      Mappings      = $mapSummary
      RegionalDomainName = $d.regionalDomainName
    })
}

foreach ($d in $v2Items) {
  $name = $d.DomainName
  if (-not $name) { $name = $d.domainName }
  $safe = Get-SafeFileName $name
  $mapFile = Get-ChildItem -Filter ("04-v2-mappings-*-{0}.json" -f $safe) -ErrorAction SilentlyContinue |
    Select-Object -First 1
  $mappings = @()
  $sinMapping = $true
  if ($mapFile) {
    $mapDoc = Get-Content -Raw $mapFile.FullName | ConvertFrom-Json
    $mappings = @($mapDoc.Items)
    if (-not $mappings) { $mappings = @($mapDoc.items) }
    if (-not $mappings) { $mappings = @() }
    $sinMapping = ($mappings.Count -eq 0)
  }
  $mapSummary = ($mappings | ForEach-Object {
      $bp = if ($_.ApiMappingKey) { $_.ApiMappingKey } elseif ($_.apiMappingKey) { $_.apiMappingKey } else { '(none)' }
      $api = if ($_.ApiId) { $_.ApiId } else { $_.apiId }
      $stage = if ($_.Stage) { $_.Stage } else { $_.stage }
      '{0} → {1}/{2}' -f $bp, $api, $stage
    }) -join '; '
  $regional = ''
  if ($d.DomainNameConfigurations -and $d.DomainNameConfigurations.Count -gt 0) {
    $regional = $d.DomainNameConfigurations[0].ApiGatewayDomainName
  }
  $rows.Add([pscustomobject]@{
      ApiKind       = 'HTTP/v2'
      DomainName    = $name
      DomainStatus  = $d.DomainNameStatus
      EndpointType  = ''
      MappingCount  = $mappings.Count
      SinMapping    = $sinMapping
      Mappings      = $mapSummary
      RegionalDomainName = $regional
    })
}

$summaryPath = Join-Path $OutDir '05-resumen-dominios.json'
($rows | ConvertTo-Json -Depth 6) | Set-Content -Encoding utf8 $summaryPath

$csvPath = Join-Path $OutDir '05-resumen-dominios.csv'
$rows | Export-Csv -Path $csvPath -NoTypeInformation -Encoding UTF8

# --- Cruce con Hosts del ALB (opcional) ---
$albHosts = @()
if ($AlbRulesJson -and (Test-Path -LiteralPath $AlbRulesJson)) {
  Write-Host "Cruce con reglas ALB: $AlbRulesJson" -ForegroundColor Cyan
  $rulesDoc = Get-Content -Raw -LiteralPath $AlbRulesJson | ConvertFrom-Json
  foreach ($rule in @($rulesDoc.Rules)) {
    foreach ($cond in @($rule.Conditions)) {
      if ($cond.Field -eq 'host-header') {
        $vals = @($cond.Values)
        if ($cond.HostHeaderConfig -and $cond.HostHeaderConfig.Values) {
          $vals = @($cond.HostHeaderConfig.Values)
        }
        foreach ($h in $vals) { $albHosts += $h }
      }
    }
  }
  $albHosts = $albHosts | Select-Object -Unique | Sort-Object
  $albHosts | Set-Content -Encoding utf8 (Join-Path $OutDir '06-alb-hosts.txt')

  $domainSet = @{}
  foreach ($r in $rows) { $domainSet[$r.DomainName] = $r }

  $cruce = foreach ($h in $albHosts) {
    if (-not $domainSet.ContainsKey($h)) {
      [pscustomobject]@{
        AlbHost = $h
        EnApigw = $false
        SinMapping = $true
        Mappings = ''
        Nota = 'Host en ALB; no aparece en get-domain-names de esta región'
      }
    }
    else {
      $r = $domainSet[$h]
      [pscustomobject]@{
        AlbHost = $h
        EnApigw = $true
        SinMapping = [bool]$r.SinMapping
        Mappings = $r.Mappings
        Nota = $(if ($r.SinMapping) { 'Dominio existe SIN mapping' } else { 'OK' })
      }
    }
  }

  $crucePath = Join-Path $OutDir '07-cruce-alb-vs-dominios.json'
  ($cruce | ConvertTo-Json -Depth 5) | Set-Content -Encoding utf8 $crucePath
  $cruce | Export-Csv -Path (Join-Path $OutDir '07-cruce-alb-vs-dominios.csv') -NoTypeInformation -Encoding UTF8

  Write-Host ''
  Write-Host 'Hosts ALB sin mapping o sin dominio APIGW:' -ForegroundColor Yellow
  $cruce | Where-Object { $_.SinMapping -or -not $_.EnApigw } | Format-Table -AutoSize
}
elseif ($AlbRulesJson) {
  Write-Warning "No se encontró AlbRulesJson: $AlbRulesJson"
}

Write-Host ''
Write-Host 'Dominios APIGW SIN mapping:' -ForegroundColor Yellow
$rows | Where-Object { $_.SinMapping } | Format-Table DomainName, ApiKind, MappingCount -AutoSize

Write-Host ''
Write-Host "Listo. Copiá el contenido de:" -ForegroundColor Green
Write-Host "  $OutDir"
Write-Host "a:"
Write-Host "  second-brain/alb/sandbox-oregon/dominios-personalizados-raw/"
Write-Host ''
Write-Host 'Abrí 05-resumen-dominios.csv (y 07-cruce-*.csv si usaste -AlbRulesJson).'
Get-ChildItem | Sort-Object Name | Format-Table Name, Length -AutoSize
