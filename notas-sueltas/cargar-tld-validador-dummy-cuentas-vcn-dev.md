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

Resultado
```powershell
PS C:\AWSdeploy\X> $Env:AWS_ACCESS_KEY_ID=""
PS C:\AWSdeploy\X> $Env:AWS_SECRET_ACCESS_KEY=""
PS C:\AWSdeploy\X> $Env:AWS_SESSION_TOKEN=""
PS C:\AWSdeploy\X>
PS C:\AWSdeploy\X> $bytes = [System.IO.File]::ReadAllBytes("C:\AWSdeploy\X\canales-dev-dynamo-export.json")
PS C:\AWSdeploy\X>
PS C:\AWSdeploy\X> switch -regex ([System.BitConverter]::ToString($bytes[0..3])) {
>>     '^EF-BB-BF' { 'UTF-8 BOM' }
>>     '^FF-FE-00-00' { 'UTF-32 LE' }
>>     '^00-00-FE-FF' { 'UTF-32 BE' }
>>     '^FF-FE' { 'UTF-16 LE' }
>>     '^FE-FF' { 'UTF-16 BE' }
>>     default { 'Sin BOM (puede ser UTF-8 sin BOM, ANSI, ASCII, etc.)' }
>> }
Sin BOM (puede ser UTF-8 sin BOM, ANSI, ASCII, etc.)
PS C:\AWSdeploy\X> try {
>>     [System.Text.UTF8Encoding]::new($false, $true).GetString(
>>         [System.IO.File]::ReadAllBytes("C:\AWSdeploy\X\canales-dev-dynamo-export.json")
>>     ) > $null
>>
>>     "El archivo es UTF-8 válido"
>> }
>> catch {
>>     "El archivo NO es UTF-8 válido"
>> }
El archivo es UTF-8 válido
PS C:\AWSdeploy\X>
PS C:\AWSdeploy\X>
PS C:\AWSdeploy\X> $Region = "us-east-1"; $SeedFile = Join-Path (Get-Location) "tld-validador-dummy-cuentas-vcn-dev.json"; if (-not (Test-Path $SeedFile)) { throw "No existe: $SeedFile" }; $utf8 = New-Object System.Text.UTF8Encoding $false; $seed = [System.IO.File]::ReadAllText($SeedFile, $utf8) | ConvertFrom-Json; $i = 0; foreach ($lote in $seed.batchWriteLotes) { $i++; $tmp = Join-Path $env:TEMP "validador-dummy-cuentas-lote-$i.json"; [System.IO.File]::WriteAllText($tmp, ($lote | ConvertTo-Json -Depth 50 -Compress), $utf8); aws dynamodb batch-write-item --region $Region --request-items "file://$($tmp -replace '\\','/')" }; Write-Host "OK - $i lotes"
{
    "UnprocessedItems": {}
}

OK - 1 lotes
PS C:\AWSdeploy\X>
PS C:\AWSdeploy\X>
PS C:\AWSdeploy\X> aws dynamodb get-item --region us-east-1 --table-name tld-validador-dummy --key "{\"cuenta\":{\"S\":\"1100015294\"}}"

usage: aws [options] <command> <subcommand> [<subcommand> ...] [parameters]
To see help text, you can run:

  aws help
  aws <command> help
  aws <command> <subcommand> help


aws: [ERROR]: Unknown options: cuenta\:{\S\:\1100015294\}}
PS C:\AWSdeploy\X>
PS C:\AWSdeploy\X>
PS C:\AWSdeploy\X>
PS C:\AWSdeploy\X> $Region = "us-east-1"; $SeedFile = Join-Path (Get-Location) "tld-validador-dummy-cuentas-vcn-dev.json"; if (-not (Test-Path $SeedFile)) { throw "No existe: $SeedFile" }; $utf8 = New-Object System.Text.UTF8Encoding $false; $seed = [System.IO.File]::ReadAllText($SeedFile, $utf8) | ConvertFrom-Json; $i = 0; foreach ($lote in $seed.batchWriteLotes) { $i++; $tmp = Join-Path $env:TEMP "validador-dummy-cuentas-lote-$i.json"; [System.IO.File]::WriteAllText($tmp, ($lote | ConvertTo-Json -Depth 50 -Compress), $utf8); aws dynamodb batch-write-item --region $Region --request-items "file://$($tmp -replace '\\','/')" }; Write-Host "OK - $i lotes"
{
    "UnprocessedItems": {}
}

OK - 1 lotes
PS C:\AWSdeploy\X>
```