# Cargar `tld-validador-canal-operacion` (dev)

Ejecutar en **tu máquina** (con AWS CLI). No es SAM — es `aws dynamodb batch-write-item`.

DynamoDB acepta **máx. 25 ítems por llamada**; el bloque de abajo hace **8 llamadas** en un solo paste (200 registros).

Desde `second-brain\notas-sueltas`:

```powershell
$Region = "us-east-1"; $SeedFile = "$PSScriptRoot\tld-validador-canal-operaciones-1008-1016.json"; $seed = Get-Content $SeedFile -Raw | ConvertFrom-Json -Depth 50; $i = 0; foreach ($lote in $seed.batchWriteLotes) { $i++; $tmp = "$env:TEMP\validador-operacion-lote-$i.json"; $lote | ConvertTo-Json -Depth 50 | Set-Content $tmp -Encoding utf8NoBOM; aws dynamodb batch-write-item --region $Region --request-items "file://$tmp" }; Write-Host "OK - $i lotes"
```
