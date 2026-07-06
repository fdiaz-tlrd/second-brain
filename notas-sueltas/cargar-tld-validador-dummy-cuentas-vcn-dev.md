# Carga `tld-validador-dummy` — dev

Recrear **`tld-validador-dummy-cuentas-vcn-dev.json`** en el servidor (copiar/pegar contenido del repo).

El JSON es **solo ASCII** (`\u00f1` = ñ). Sobrevive Notepad y copy-paste. **No uses** `ConvertTo-Json` en PowerShell.

Comprobar encoding del archivo **que vas a cargar** (cambiar la ruta):

```powershell
$SeedFile = Join-Path (Get-Location) "tld-validador-dummy-cuentas-vcn-dev.json"
$bytes = [System.IO.File]::ReadAllBytes($SeedFile)
switch -regex ([System.BitConverter]::ToString($bytes[0..3])) {
    '^EF-BB-BF' { 'UTF-8 BOM' }
    default { 'Sin BOM' }
}
try {
    [System.Text.UTF8Encoding]::new($false, $true).GetString($bytes) | Out-Null
    'UTF-8 valido'
} catch { 'NO es UTF-8 valido' }
Select-String -Path $SeedFile -Pattern '\\u00f1' -Quiet; if ($?) { 'Escapes \\u00f1 presentes (OK)' }
```

Carga directa (AWS CLI lee el archivo; PowerShell no toca el JSON):

```powershell
$Region = "us-east-1"
$SeedFile = Join-Path (Get-Location) "tld-validador-dummy-cuentas-vcn-dev.json"
aws dynamodb batch-write-item --region $Region --request-items "file://$($SeedFile -replace '\\','/')"
```

Verificar titular con **ñ** (cuenta `1100015294`):

```powershell
$keyFile = Join-Path $env:TEMP "dynamo-key-1100015294.json"
'{"cuenta":{"S":"1100015294"}}' | Set-Content -Path $keyFile -Encoding ascii -NoNewline
aws dynamodb get-item --region us-east-1 --table-name tld-validador-dummy --key "file://$($keyFile -replace '\\','/')"
```

Esperado en titulares: `Niño Muñoz Larrañaga`.
