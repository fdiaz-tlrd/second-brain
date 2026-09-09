# Sonda prod tld-preg-seguridad — Windows DENTRO de la VPC prod.
# El EC2 de este incidente es Linux (SSH desde la consola AWS): usar sonda-403-ec2.sh.
# No corre en la máquina de despliegue (no es la red de Alias).
$ErrorActionPreference = "Continue"
$HostName = "tld-preg-seguridad.prod.telered.internal"
$Qs = "/preguntas-sistema?idSistema=ALIA"
$VpceVa = "vpce-05fd27576a4f363ff"
$VpceOr = "vpce-060f0db9e16d13ea3"

function Sep($t) { Write-Output ""; Write-Output "======== $t ========" }

Sep "0 fecha"
Write-Output ((Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ"))

Sep "1 instancia / region"
try {
  $tok = Invoke-RestMethod -Method Put -Uri "http://169.254.169.254/latest/api/token" -Headers @{ "X-aws-ec2-metadata-token-ttl-seconds" = "60" } -TimeoutSec 2
  $h = @{ "X-aws-ec2-metadata-token" = $tok }
  $Region = Invoke-RestMethod -Uri "http://169.254.169.254/latest/meta-data/placement/region" -Headers $h -TimeoutSec 2
  $Az = Invoke-RestMethod -Uri "http://169.254.169.254/latest/meta-data/placement/availability-zone" -Headers $h -TimeoutSec 2
  $Iid = Invoke-RestMethod -Uri "http://169.254.169.254/latest/meta-data/instance-id" -Headers $h -TimeoutSec 2
  $Mac = Invoke-RestMethod -Uri "http://169.254.169.254/latest/meta-data/mac" -Headers $h -TimeoutSec 2
  $Vpc = Invoke-RestMethod -Uri "http://169.254.169.254/latest/meta-data/network/interfaces/macs/$Mac/vpc-id" -Headers $h -TimeoutSec 2
  $Subnet = Invoke-RestMethod -Uri "http://169.254.169.254/latest/meta-data/network/interfaces/macs/$Mac/subnet-id" -Headers $h -TimeoutSec 2
} catch {
  Write-Output "IMDS fallo: $_"
  Write-Output "No es un EC2 (o IMDS bloqueado). Esta sonda no aplica aquí."
  exit 1
}
Write-Output "region=$Region"
Write-Output "az=$Az"
Write-Output "instance=$Iid"
Write-Output "vpc=$Vpc"
Write-Output "subnet=$Subnet"
$ExpectVpce = if ($Region -eq "us-west-2") { $VpceOr } else { $VpceVa }
Write-Output "vpce_esperado_repo=$ExpectVpce"

Sep "2 DNS custom domain"
Resolve-DnsName $HostName -ErrorAction Continue | Format-List | Out-String

Sep "3 curl custom domain (igual que Alias)"
$Url = "https://${HostName}${Qs}"
Write-Output "URL=$Url"
curl.exe -sS -k --max-time 20 -D - -w "`n---curl_writeout---`nhttp_code:%{http_code}`nremote_ip:%{remote_ip}`ntime_total:%{time_total}`nssl_verify_result:%{ssl_verify_result}`n" -v $Url

Sep "4 AWS identidad"
aws sts get-caller-identity --output json 2>&1 | Out-String

Sep "5 domain name + mappings"
if ($Region) {
  aws apigateway get-domain-name --domain-name $HostName --region $Region --output json 2>&1 | Out-String
  aws apigateway get-base-path-mappings --domain-name $HostName --region $Region --output json 2>&1 | Out-String
}

Sep "6 REST API tld-preg-seguridad (id + policy)"
$ApiId = ""
if ($Region) {
  aws apigateway get-rest-apis --region $Region --output json --query "items[?name=='tld-preg-seguridad'].{id:id,name:name,createdDate:createdDate,endpoint:endpointConfiguration}" 2>&1 | Out-String
  $ApiId = (aws apigateway get-rest-apis --region $Region --query "items[?name=='tld-preg-seguridad'].id | [0]" --output text 2>$null)
  Write-Output "API_ID=$ApiId"
  if ($ApiId -and $ApiId -ne "None") {
    aws apigateway get-rest-api --rest-api-id $ApiId --region $Region --output json 2>&1 | Out-String
    aws apigateway get-stages --rest-api-id $ApiId --region $Region --output json --query "item[].{stage:stageName,lastUpdated:lastUpdatedDate}" 2>&1 | Out-String
  }
}

Sep "7 VPC endpoints execute-api"
if ($Region) {
  aws ec2 describe-vpc-endpoints --region $Region --output json --filters "Name=service-name,Values=com.amazonaws.${Region}.execute-api" --query "VpcEndpoints[].{Id:VpcEndpointId,State:State,PrivateDns:PrivateDnsEnabled,VpcId:VpcId,Dns:DnsEntries,Sgs:Groups[].GroupId,Subnets:SubnetIds}" 2>&1 | Out-String
}

Sep "8 IPs ENI del VPCE esperado"
if ($Region) {
  aws ec2 describe-network-interfaces --region $Region --output json --filters "Name=vpc-endpoint-id,Values=$ExpectVpce" --query "NetworkInterfaces[].{eni:NetworkInterfaceId,ip:PrivateIpAddress,az:AvailabilityZone,sg:Groups[].GroupId,status:Status}" 2>&1 | Out-String
}

Sep "9 curl URL VPCE (api-id + vpce + stage tlrd-highway)"
if ($ApiId -and $ApiId -ne "None") {
  $VpceUrl = "https://${ApiId}-${ExpectVpce}.execute-api.${Region}.amazonaws.com/tlrd-highway${Qs}"
  Write-Output "URL=$VpceUrl"
  curl.exe -sS -k --max-time 20 -D - -w "`n---curl_writeout---`nhttp_code:%{http_code}`nremote_ip:%{remote_ip}`ntime_total:%{time_total}`n" $VpceUrl
  Write-Output "--- mismo VPCE con Host custom domain ---"
  curl.exe -sS -k --max-time 20 -D - -H "Host: $HostName" -w "`n---curl_writeout---`nhttp_code:%{http_code}`nremote_ip:%{remote_ip}`ntime_total:%{time_total}`n" $VpceUrl
} else {
  Write-Output "SKIP: no se obtuvo API_ID"
}

Sep "FIN"
Write-Output "Pegar este output completo."
