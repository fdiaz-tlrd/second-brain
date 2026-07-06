# Carga `tld-validador-dummy` — dev

Copiar **`tld-validador-dummy-cuentas-vcn-dev.json`** a la máquina VPN (ej. `C:\AWSdeploy`). Ejecutar:

```powershell
$Region = "us-east-1"; $SeedFile = Join-Path (Get-Location) "tld-validador-dummy-cuentas-vcn-dev.json"; if (-not (Test-Path $SeedFile)) { throw "No existe: $SeedFile" }; $seed = Get-Content $SeedFile -Raw | ConvertFrom-Json; $utf8 = New-Object System.Text.UTF8Encoding $false; $i = 0; foreach ($lote in $seed.batchWriteLotes) { $i++; $tmp = Join-Path $env:TEMP "validador-dummy-cuentas-lote-$i.json"; [System.IO.File]::WriteAllText($tmp, ($lote | ConvertTo-Json -Depth 50 -Compress), $utf8); aws dynamodb batch-write-item --region $Region --request-items "file://$($tmp -replace '\\','/')" }; Write-Host "OK - $i lotes"
```

```powershell
aws dynamodb get-item --region us-east-1 --table-name tld-validador-dummy --key '{"cuenta":{"S":"1100001328"}}'
```

Esperado: `Fischl von Luftschloss Narfidort`, `resultado` 0.
