# Carga `tld-validador-dummy` — dev

Pegar **`tld-validador-dummy-cuentas-vcn-dev.json`** en el servidor. Debe empezar con `"tld-validador-dummy"` y contener `\u00f1`.

**En Windows usar `fileb://`** (no `file://`) — evita que AWS CLI corrompa `ñ` → `±`.

Comprobar:

```powershell
$SeedFile = Join-Path (Get-Location) "tld-validador-dummy-cuentas-vcn-dev.json"
if (-not (Select-String -Path $SeedFile -Pattern '"tld-validador-dummy"' -Quiet)) { throw "JSON viejo (falta tld-validador-dummy)" }
if (-not (Select-String -Path $SeedFile -Pattern '\\u00f1' -Quiet)) { throw "Faltan \\u00f1 en el JSON" }
"OK estructura"
```

Carga:

```powershell
$Region = "us-east-1"
$SeedFile = (Resolve-Path "tld-validador-dummy-cuentas-vcn-dev.json").Path
aws dynamodb batch-write-item --region $Region --request-items "fileb://$($SeedFile -replace '\\','/')"
```

Verificar **ñ** (`1100015294`):

```powershell
$keyFile = Join-Path $env:TEMP "dynamo-key-1100015294.json"
'{"cuenta":{"S":"1100015294"}}' | Set-Content -Path $keyFile -Encoding ascii -NoNewline
aws dynamodb get-item --region us-east-1 --table-name tld-validador-dummy --key "fileb://$($keyFile -replace '\\','/')"
```

Esperado: `Niño Muñoz Larrañaga` (no `Ni±o`).
