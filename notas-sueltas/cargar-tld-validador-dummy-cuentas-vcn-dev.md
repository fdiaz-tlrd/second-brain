# Carga `tld-validador-dummy` — dev

Pegar en el servidor el contenido de **`tld-validador-dummy-cuentas-vcn-dev.json`** (commit **`d9799c6`** o posterior).

El archivo debe empezar así ( **no** `batchWriteLotes` ):

```json
{
  "tld-validador-dummy": [
```

Debe contener `\u00f1` (ASCII). Ejemplo: `"Ni\u00f1o Mu\u00f1oz Larra\u00f1aga"`.

Comprobar antes de cargar:

```powershell
$SeedFile = Join-Path (Get-Location) "tld-validador-dummy-cuentas-vcn-dev.json"
if (-not (Select-String -Path $SeedFile -Pattern '"tld-validador-dummy"' -Quiet)) { throw "JSON viejo o incompleto (falta tld-validador-dummy)" }
if (-not (Select-String -Path $SeedFile -Pattern '\\u00f1' -Quiet)) { throw "Faltan escapes \\u00f1 — pegar JSON del repo d9799c6+" }
"OK estructura"
```

Carga:

```powershell
$Region = "us-east-1"
$SeedFile = Join-Path (Get-Location) "tld-validador-dummy-cuentas-vcn-dev.json"
aws dynamodb batch-write-item --region $Region --request-items "file://$($SeedFile -replace '\\','/')"
```

Verificar **ñ** (cuenta `1100015294`):

```powershell
$keyFile = Join-Path $env:TEMP "dynamo-key-1100015294.json"
'{"cuenta":{"S":"1100015294"}}' | Set-Content -Path $keyFile -Encoding ascii -NoNewline
aws dynamodb get-item --region us-east-1 --table-name tld-validador-dummy --key "file://$($keyFile -replace '\\','/')"
```

Esperado: `Niño Muñoz Larrañaga`.
