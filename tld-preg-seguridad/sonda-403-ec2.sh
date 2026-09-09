#!/bin/bash
# Sonda prod tld-preg-seguridad — correr en EC2 DENTRO de la VPC prod.
# Pegar TODO el stdout. No corre en Lenovo (no resuelve *.prod.telered.internal).
set +e

HOST="tld-preg-seguridad.prod.telered.internal"
QS="/preguntas-sistema?idSistema=ALIA"
VPCE_VA="vpce-05fd27576a4f363ff"
VPCE_OR="vpce-060f0db9e16d13ea3"

sep() { printf '\n======== %s ========\n' "$1"; }

sep "0 fecha"
date -u +"%Y-%m-%dT%H:%M:%SZ"

sep "1 instancia / region"
TOKEN=$(curl -sS --max-time 2 -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 60")
HMETA="X-aws-ec2-metadata-token: ${TOKEN}"
REGION=$(curl -sS --max-time 2 -H "$HMETA" http://169.254.169.254/latest/meta-data/placement/region)
AZ=$(curl -sS --max-time 2 -H "$HMETA" http://169.254.169.254/latest/meta-data/placement/availability-zone)
IID=$(curl -sS --max-time 2 -H "$HMETA" http://169.254.169.254/latest/meta-data/instance-id)
MAC=$(curl -sS --max-time 2 -H "$HMETA" http://169.254.169.254/latest/meta-data/mac)
VPC=$(curl -sS --max-time 2 -H "$HMETA" "http://169.254.169.254/latest/meta-data/network/interfaces/macs/${MAC}/vpc-id")
SUBNET=$(curl -sS --max-time 2 -H "$HMETA" "http://169.254.169.254/latest/meta-data/network/interfaces/macs/${MAC}/subnet-id")
printf 'region=%s\naz=%s\ninstance=%s\nvpc=%s\nsubnet=%s\n' "$REGION" "$AZ" "$IID" "$VPC" "$SUBNET"
if [ "$REGION" = "us-west-2" ]; then EXPECT_VPCE="$VPCE_OR"; else EXPECT_VPCE="$VPCE_VA"; fi
printf 'vpce_esperado_repo=%s\n' "$EXPECT_VPCE"

sep "2 DNS custom domain"
getent ahostsv4 "$HOST" 2>&1
echo "--- nslookup ---"
nslookup "$HOST" 2>&1
echo "--- dig ---"
dig +short "$HOST" A 2>&1
dig +short "$HOST" CNAME 2>&1

sep "3 curl custom domain (igual que Alias)"
echo "URL=https://${HOST}${QS}"
curl -sS -k --max-time 20 \
  -D - \
  -o /tmp/preg-body.txt \
  -w "\n---curl_writeout---\nhttp_code:%{http_code}\nremote_ip:%{remote_ip}\nnum_connect:%{num_connects}\ntime_namelookup:%{time_namelookup}\ntime_connect:%{time_connect}\ntime_appconnect:%{time_appconnect}\ntime_total:%{time_total}\nssl_verify_result:%{ssl_verify_result}\n" \
  -v \
  "https://${HOST}${QS}" \
  2>/tmp/preg-verbose.txt
echo "--- body ---"
cat /tmp/preg-body.txt
echo
echo "--- verbose (conexión/TLS/HTTP) ---"
grep -E 'Trying|Connected to|ALPN|SSL connection|subject:|issuer:|expire date|HTTP/|error:|CONNECT' /tmp/preg-verbose.txt

sep "4 AWS identidad"
aws sts get-caller-identity --output json 2>&1
echo "aws_region_cli=${AWS_DEFAULT_REGION:-} AWS_REGION=${AWS_REGION:-}"

sep "5 domain name + mappings"
aws apigateway get-domain-name --domain-name "$HOST" --region "$REGION" --output json 2>&1
aws apigateway get-base-path-mappings --domain-name "$HOST" --region "$REGION" --output json 2>&1

sep "6 REST API tld-preg-seguridad (id + policy)"
aws apigateway get-rest-apis --region "$REGION" --output json \
  --query "items[?name=='tld-preg-seguridad'].{id:id,name:name,createdDate:createdDate,endpoint:endpointConfiguration}" 2>&1
API_ID=$(aws apigateway get-rest-apis --region "$REGION" --query "items[?name=='tld-preg-seguridad'].id | [0]" --output text 2>/dev/null)
echo "API_ID=${API_ID}"
if [ -n "$API_ID" ] && [ "$API_ID" != "None" ]; then
  aws apigateway get-rest-api --rest-api-id "$API_ID" --region "$REGION" --output json 2>&1
  echo "--- stages ---"
  aws apigateway get-stages --rest-api-id "$API_ID" --region "$REGION" --output json --query "item[].{stage:stageName,lastUpdated:lastUpdatedDate}" 2>&1
fi

sep "7 VPC endpoints execute-api"
aws ec2 describe-vpc-endpoints --region "$REGION" --output json \
  --filters "Name=service-name,Values=com.amazonaws.${REGION}.execute-api" \
  --query "VpcEndpoints[].{Id:VpcEndpointId,State:State,PrivateDns:PrivateDnsEnabled,VpcId:VpcId,Dns:DnsEntries,Sgs:Groups[].GroupId,Subnets:SubnetIds}" 2>&1

sep "8 IPs ENI del VPCE esperado vs DNS"
aws ec2 describe-network-interfaces --region "$REGION" --output json \
  --filters "Name=vpc-endpoint-id,Values=${EXPECT_VPCE}" \
  --query "NetworkInterfaces[].{eni:NetworkInterfaceId,ip:PrivateIpAddress,az:AvailabilityZone,sg:Groups[].GroupId,status:Status}" 2>&1

sep "9 curl URL VPCE (api-id + vpce + stage tlrd-highway)"
if [ -n "$API_ID" ] && [ "$API_ID" != "None" ]; then
  VPCE_URL="https://${API_ID}-${EXPECT_VPCE}.execute-api.${REGION}.amazonaws.com/tlrd-highway${QS}"
  echo "URL=${VPCE_URL}"
  curl -sS -k --max-time 20 -D - -o /tmp/preg-vpce-body.txt \
    -w "\n---curl_writeout---\nhttp_code:%{http_code}\nremote_ip:%{remote_ip}\ntime_total:%{time_total}\n" \
    "$VPCE_URL"
  echo "--- body VPCE ---"
  cat /tmp/preg-vpce-body.txt
  echo
  echo "--- mismo VPCE con Host custom domain ---"
  curl -sS -k --max-time 20 -D - -o /tmp/preg-vpce-host-body.txt \
    -H "Host: ${HOST}" \
    -w "\n---curl_writeout---\nhttp_code:%{http_code}\nremote_ip:%{remote_ip}\ntime_total:%{time_total}\n" \
    "$VPCE_URL"
  echo "--- body VPCE+Host ---"
  cat /tmp/preg-vpce-host-body.txt
  echo
else
  echo "SKIP: no se obtuvo API_ID (IAM o nombre de API distinto)"
fi

sep "FIN"
echo "Pegar este output completo."
