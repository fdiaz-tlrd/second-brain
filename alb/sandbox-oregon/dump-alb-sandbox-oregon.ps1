#Requires -Version 5.1
<#
.SYNOPSIS
  Dump ALB sandbox Oregon (us-west-2) via AWS CLI.

.DESCRIPTION
  Escribe JSON en una carpeta local. Después copiá esa carpeta a:
  second-brain/alb/sandbox-oregon/raw/

.EXAMPLE
  .\dump-alb-sandbox-oregon.ps1
  .\dump-alb-sandbox-oregon.ps1 -OutDir C:\temp\alb-sandbox-oregon-raw
#>
[CmdletBinding()]
param(
  [string]$OutDir = (Join-Path (Get-Location) 'alb-sandbox-oregon-raw')
)

$ErrorActionPreference = 'Stop'

$Region = 'us-west-2'
$AlbArn = 'arn:aws:elasticloadbalancing:us-west-2:807262913923:loadbalancer/app/alb-sandbox-oregon/bc8e26a049c22e57'
$TgName = 'vpc-endpoint-apis-oregon'

$env:AWS_DEFAULT_REGION = $Region

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
Set-Location $OutDir
Write-Host "Salida: $OutDir" -ForegroundColor Cyan

function Invoke-AwsJson {
  param(
    [Parameter(Mandatory)][string]$OutFile,
    [Parameter(Mandatory)][string[]]$AwsArgs
  )
  Write-Host "→ $OutFile" -ForegroundColor DarkGray
  $json = & aws @AwsArgs --output json 2>&1
  if ($LASTEXITCODE -ne 0) {
    $json | Set-Content -Encoding utf8 ($OutFile + '.error.txt')
    throw "aws falló ($OutFile). Ver $($OutFile).error.txt"
  }
  $json | Set-Content -Encoding utf8 $OutFile
}

function Invoke-AwsText {
  param([Parameter(Mandatory)][string[]]$AwsArgs)
  $text = & aws @AwsArgs --output text 2>&1
  if ($LASTEXITCODE -ne 0) {
    throw "aws falló: $($AwsArgs -join ' ') → $text"
  }
  return ($text | Out-String).Trim()
}

# 1. ALB
Invoke-AwsJson '01-load-balancer.json' @(
  'elbv2', 'describe-load-balancers', '--load-balancer-arns', $AlbArn
)
Invoke-AwsJson '02-load-balancer-attributes.json' @(
  'elbv2', 'describe-load-balancer-attributes', '--load-balancer-arn', $AlbArn
)

# 2. Listeners y reglas (todos los listeners)
Invoke-AwsJson '03-listeners.json' @(
  'elbv2', 'describe-listeners', '--load-balancer-arn', $AlbArn
)

# Leer ARNs desde el JSON ya bajado (no re-llamar AWS).
# Ojo: `Invoke-AwsText ... -split` sin paréntesis trata -split como parámetro del cmdlet.
$listenersDoc = Get-Content -Raw '03-listeners.json' | ConvertFrom-Json
$listenerArns = @($listenersDoc.Listeners | ForEach-Object { $_.ListenerArn })

$i = 0
foreach ($listenerArn in $listenerArns) {
  Invoke-AwsJson ("04-rules-listener-{0}.json" -f $i) @(
    'elbv2', 'describe-rules', '--listener-arn', $listenerArn
  )
  $i++
}

# 3. Target groups
Invoke-AwsJson '05-target-groups-del-alb.json' @(
  'elbv2', 'describe-target-groups', '--load-balancer-arn', $AlbArn
)

try {
  Invoke-AwsJson '06-target-group-vpc-endpoint-apis-oregon.json' @(
    'elbv2', 'describe-target-groups', '--names', $TgName
  )
  $tgArn = Invoke-AwsText @(
    'elbv2', 'describe-target-groups',
    '--names', $TgName,
    '--query', 'TargetGroups[0].TargetGroupArn'
  )
  Set-Content -Encoding utf8 '06-target-group-arn.txt' $tgArn

  Invoke-AwsJson '07-target-group-attributes.json' @(
    'elbv2', 'describe-target-group-attributes', '--target-group-arn', $tgArn
  )
  Invoke-AwsJson '08-target-health.json' @(
    'elbv2', 'describe-target-health', '--target-group-arn', $tgArn
  )
}
catch {
  Write-Warning "TG por nombre '$TgName' falló: $_. Traé igual 05 y el .error.txt si existe."
}

# 4. Security groups del ALB (desde 01)
$lb = Get-Content -Raw '01-load-balancer.json' | ConvertFrom-Json
$sgIds = @($lb.LoadBalancers[0].SecurityGroups)
if ($sgIds.Count -gt 0) {
  $sgArgs = @('ec2', 'describe-security-groups', '--group-ids') + $sgIds
  Invoke-AwsJson '09-security-groups-alb.json' $sgArgs
}
else {
  Write-Warning 'ALB sin SecurityGroups en 01-load-balancer.json'
}

# 5. Subnets de la VPC del ALB
$vpcId = $lb.LoadBalancers[0].VpcId
Invoke-AwsJson '10-subnets-vpc.json' @(
  'ec2', 'describe-subnets',
  '--filters', "Name=vpc-id,Values=$vpcId",
  '--query', 'Subnets[].{SubnetId:SubnetId,Az:AvailabilityZone,Cidr:CidrBlock,Name:Tags[?Key==`Name`]|[0].Value}'
)

Write-Host ''
Write-Host "Listo. Copiá el contenido de:" -ForegroundColor Green
Write-Host "  $OutDir"
Write-Host "a:"
Write-Host "  second-brain/alb/sandbox-oregon/raw/"
Write-Host ''
Write-Host 'Mínimo útil: 01, 03, 05, 06, 08. Ideal: todos.'
Get-ChildItem | Sort-Object Name | Format-Table Name, Length -AutoSize
