# Carga `tld-validador-dummy` — dev

Pegar **`tld-validador-dummy-cuentas-vcn-dev.json`** en el servidor.

El archivo debe empezar con `"tld-validador-dummy"` (**no** `batchWriteLotes`).

Carga (esto es lo que ya te funcionó):

```powershell
$Region = "us-east-1"
$SeedFile = Join-Path (Get-Location) "tld-validador-dummy-cuentas-vcn-dev.json"
aws dynamodb batch-write-item --region $Region --request-items "file://$($SeedFile -replace '\\','/')"
```

Esperado: `"UnprocessedItems": {}`.

Verificar en **consola AWS** (tabla `tld-validador-dummy`, cuenta `1100015294`) o:

```powershell
$keyFile = Join-Path $env:TEMP "dynamo-key-1100015294.json"
'{"cuenta":{"S":"1100015294"}}' | Set-Content -Path $keyFile -Encoding ascii -NoNewline
aws dynamodb get-item --region us-east-1 --table-name tld-validador-dummy --key "file://$($keyFile -replace '\\','/')"
```

No uses `fileb://` — en este entorno da error de validación. Los `Select-String` de comprobación previos no eran fiables; confía en la consola web o en `get-item`.
