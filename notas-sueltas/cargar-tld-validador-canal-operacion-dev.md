# Cargar `tld-validador-canal-operacion` (dev)

Ejecutar en **tu máquina** (con AWS CLI). No es SAM — es `aws dynamodb batch-write-item`.

DynamoDB acepta **máx. 25 ítems por llamada**; el bloque de abajo hace **8 llamadas** en un solo paste (200 registros).

Desde `second-brain\notas-sueltas`:

```powershell
$Region = "us-east-1"; $SeedFile = "$PSScriptRoot\tld-validador-canal-operaciones-1008-1016.json"; $seed = Get-Content $SeedFile -Raw | ConvertFrom-Json -Depth 50; $i = 0; foreach ($lote in $seed.batchWriteLotes) { $i++; $tmp = "$env:TEMP\validador-operacion-lote-$i.json"; $lote | ConvertTo-Json -Depth 50 | Set-Content $tmp -Encoding utf8NoBOM; aws dynamodb batch-write-item --region $Region --request-items "file://$tmp" }; Write-Host "OK - $i lotes"
```



PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-api-alias> $Env:AWS_ACCESS_KEY_ID=""
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-api-alias> $Env:AWS_SECRET_ACCESS_KEY=""
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-api-alias> $Env:AWS_SESSION_TOKEN=""
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-api-alias>
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-api-alias> Set-Location C:\AWSdeploy
PS C:\AWSdeploy> $Region = "us-east-1"; $SeedFile = "$PSScriptRoot\tld-validador-canal-operaciones-1008-1016.json"; $seed = Get-Content $SeedFile -Raw | ConvertFrom-Json -Depth 50; $i = 0; foreach ($lote in $seed.batchWriteLotes) { $i++; $tmp = "$env:TEMP\validador-operacion-lote-$i.json"; $lote | ConvertTo-Json -Depth 50 | Set-Content $tmp -Encoding utf8NoBOM; aws dynamodb batch-write-item --region $Region --request-items "file://$tmp" }; Write-Host "OK - $i lotes"
ConvertFrom-Json : A parameter cannot be found that matches parameter name 'Depth'.
At line:1 char:154
+ ...  $seed = Get-Content $SeedFile -Raw | ConvertFrom-Json -Depth 50; $i  ...
+                                                            ~~~~~~
    + CategoryInfo          : InvalidArgument: (:) [ConvertFrom-Json], ParameterBindingException
    + FullyQualifiedErrorId : NamedParameterNotFound,Microsoft.PowerShell.Commands.ConvertFromJsonCommand

OK - 0 lotes
PS C:\AWSdeploy> ls


    Directory: C:\AWSdeploy


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         6/23/2026   5:39 PM                logs
-a----          5/7/2026   1:10 AM          18467 actualizar python,md
-a----         5/13/2026   3:48 PM          31366 deploy - Copy (2).ps1
-a----         3/18/2026   3:07 PM           8984 deploy - Copy.ps1
-a----         6/24/2026   5:08 PM          66087 deploy.ps1
-a----         3/19/2026   9:11 AM           9755 deployExperimentar01.ps1
-a----         3/19/2026   5:36 PM           9907 deployExperimentar02.ps1
-a----         6/17/2026   4:48 PM          11666 deployFdiaz - Copy.ps1
-a----         6/17/2026   4:48 PM          11666 deployFdiaz.ps1
-a----         5/22/2026   6:55 AM          60389 deployNewVersion.ps1
-a----         6/24/2026   9:41 PM           8410 limpiar-stack-p2m-qa.ps1
-a----         4/13/2026   9:04 AM           2019 prueba.ps1
-a----          7/4/2026   9:02 PM         134054 tld-validador-canal-operaciones-1008-1016.json


PS C:\AWSdeploy>