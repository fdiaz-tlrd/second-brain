# Carga `tld-validador-dummy` — dev

Copiar **`tld-validador-dummy-cuentas-vcn-dev.json`** a la máquina VPN (ej. `C:\AWSdeploy`).

**Importante:** leer el seed con **UTF-8**. Sin eso, `ñ`/`á` quedan corruptos en Dynamo (`NiÃƒÂ±o…`).

```powershell
$Region = "us-east-1"; $SeedFile = Join-Path (Get-Location) "tld-validador-dummy-cuentas-vcn-dev.json"; if (-not (Test-Path $SeedFile)) { throw "No existe: $SeedFile" }; $utf8 = New-Object System.Text.UTF8Encoding $false; $seed = [System.IO.File]::ReadAllText($SeedFile, $utf8) | ConvertFrom-Json; $i = 0; foreach ($lote in $seed.batchWriteLotes) { $i++; $tmp = Join-Path $env:TEMP "validador-dummy-cuentas-lote-$i.json"; [System.IO.File]::WriteAllText($tmp, ($lote | ConvertTo-Json -Depth 50 -Compress), $utf8); aws dynamodb batch-write-item --region $Region --request-items "file://$($tmp -replace '\\','/')" }; Write-Host "OK - $i lotes"
```

Verificar titular con **ñ** (cuenta `1100015294`):

```powershell
aws dynamodb get-item --region us-east-1 --table-name tld-validador-dummy --key "{\"cuenta\":{\"S\":\"1100015294\"}}"
```

Esperado: `Niño Muñoz Larrañaga` (no `NiÃ…`).
