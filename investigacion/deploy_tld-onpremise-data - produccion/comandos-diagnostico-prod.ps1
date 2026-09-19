# Consulta solo. No crea, no modifica, no borra, no hace sam deploy.
# Maquina de despliegue Windows, credenciales cuenta prod (893506747683).
# Pegar TODO el output y devolverlo.
#
# Contexto: deploy tld-onpremise-data prod 2026-09-19 fallo porque
# DynamoDBStreamIDP2m* en samconfig vale .../stream/REEMPLAZAR.
# No relanzar deployNewVersion.ps1 hasta tener estos datos.

$ErrorActionPreference = "Continue"
$cuentaProd = "893506747683"
$stack = "tld-alias-replica"
$regiones = @("us-east-1", "us-west-2")
$tablasP2m = @("tld-p2m", "tld-p2m-cuenta", "tld-p2m-mcc")
$lambdasMac = @(
    "tld-replica-canal",
    "tld-replica-bitacora",
    "tld-replica-alias-cuenta",
    "tld-alias-reintento"
)
$lambdasAch = @(
    "tld-replica-p2m",
    "tld-replica-p2m-cuenta",
    "tld-replica-p2m-mcc",
    "tld-replica-canal-ach",
    "tld-replica-bitacora-ach",
    "tld-ach-reintento"
)
$prefijosLogs = @(
    "/aws/lambda/tld-replica-p2m",
    "/aws/lambda/tld-ach-",
    "/aws/lambda/tld-replica-canal-ach",
    "/aws/lambda/tld-replica-bitacora-ach"
)

Write-Output "===== STS ====="
aws sts get-caller-identity --output json
$cuenta = aws sts get-caller-identity --query Account --output text
if ($cuenta -ne $cuentaProd) {
    Write-Output "ABORTADO: cuenta=$cuenta ; se espera $cuentaProd (prod). No seguir."
    return
}

foreach ($r in $regiones) {
    Write-Output ""
    Write-Output "===== REGION $r ====="
    $env:AWS_REGION = $r

    Write-Output "----- stack $stack -----"
    aws cloudformation describe-stacks --stack-name $stack --region $r `
        --query "Stacks[0].{Status:StackStatus,Reason:StackStatusReason,Updated:LastUpdatedTime}" --output json

    Write-Output "----- eventos recientes -----"
    aws cloudformation describe-stack-events --stack-name $stack --region $r --max-items 40 `
        --query "StackEvents[].{t:Timestamp,s:ResourceStatus,id:LogicalResourceId,r:ResourceStatusReason}" --output json

    foreach ($t in $tablasP2m) {
        Write-Output "----- tabla $t -----"
        aws dynamodb describe-table --table-name $t --region $r `
            --query "{Status:Table.TableStatus,Stream:Table.StreamSpecification,LatestStreamArn:Table.LatestStreamArn}" --output json
    }

    Write-Output "----- log groups huérfanos (ACH / P2M) -----"
    foreach ($p in $prefijosLogs) {
        aws logs describe-log-groups --log-group-name-prefix $p --region $r `
            --query "logGroups[].logGroupName" --output text
    }

    Write-Output "----- secreto ach-directo-v2/oracle -----"
    aws secretsmanager describe-secret --secret-id "ach-directo-v2/oracle" --region $r --output json

    Write-Output "----- lambdas MAC (deben existir) -----"
    foreach ($fn in $lambdasMac) {
        aws lambda get-function --function-name $fn --region $r `
            --query "Configuration.{Name:FunctionName,Modified:LastModified,State:State}" --output json
    }

    Write-Output "----- lambdas ACH (si el rollback termino, no deberian existir) -----"
    foreach ($fn in $lambdasAch) {
        aws lambda get-function --function-name $fn --region $r `
            --query "Configuration.{Name:FunctionName,Modified:LastModified,State:State}" --output json
    }
}

Write-Output ""
Write-Output "===== FIN ====="
Write-Output "Pegar todo el output desde STS hasta FIN."
