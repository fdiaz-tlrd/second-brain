# Cargar `tld-validador-canal-operacion` (dev)

Ejecutar en **tu máquina** (con AWS CLI). No es SAM — es `aws dynamodb batch-write-item`.

DynamoDB acepta **máx. 25 ítems por llamada**; el bloque de abajo hace **8 llamadas** en un solo paste (200 registros).

Desde la carpeta donde está el JSON (p. ej. `second-brain\notas-sueltas` o una copia como `C:\AWSdeploy`):

```powershell
$Region = "us-east-1"; $SeedFile = Join-Path (Get-Location) "tld-validador-canal-operaciones-1008-1016.json"; if (-not (Test-Path $SeedFile)) { throw "No existe: $SeedFile" }; $seed = Get-Content $SeedFile -Raw | ConvertFrom-Json; $utf8 = New-Object System.Text.UTF8Encoding $false; $i = 0; foreach ($lote in $seed.batchWriteLotes) { $i++; $tmp = Join-Path $env:TEMP "validador-operacion-lote-$i.json"; [System.IO.File]::WriteAllText($tmp, ($lote | ConvertTo-Json -Depth 50 -Compress), $utf8); aws dynamodb batch-write-item --region $Region --request-items "file://$($tmp -replace '\\','/')" }; Write-Host "OK - $i lotes"
```

Compatible con **Windows PowerShell 5.1** (sin `-Depth` en `ConvertFrom-Json`, sin `utf8NoBOM`).
