# Consulta solo. No crea, no modifica, no borra.
# Maquina de despliegue Windows, credenciales cuenta prod.
# Pegar todo el output.

$r = "us-east-1"
$h = "tld-preg-seguridad.prod.telered.internal"
aws sts get-caller-identity
aws apigateway get-domain-name --domain-name $h --region $r
aws apigateway get-base-path-mappings --domain-name $h --region $r
$id = aws apigateway get-rest-apis --region $r --query "items[?name=='tld-preg-seguridad'].id | [0]" --output text
Write-Output "API_ID=$id"
aws apigateway get-rest-api --rest-api-id $id --region $r
aws apigateway get-stages --rest-api-id $id --region $r
aws ec2 describe-vpc-endpoints --region $r --filters "Name=service-name,Values=com.amazonaws.us-east-1.execute-api" --query "VpcEndpoints[].{Id:VpcEndpointId,State:State,PrivateDns:PrivateDnsEnabled}"
