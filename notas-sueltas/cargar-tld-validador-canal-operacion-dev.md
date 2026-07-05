# Cargar `tld-validador-canal-operacion` (dev)

Ejecutar en **tu máquina** (con AWS CLI). No es SAM — es `aws dynamodb batch-write-item`.

DynamoDB acepta **máx. 25 ítems por llamada**; el bloque de abajo hace **8 llamadas** en un solo paste (200 registros).

Desde la carpeta donde está el JSON (p. ej. `second-brain\notas-sueltas` o una copia como `C:\AWSdeploy`):

```powershell
$Region = "us-east-1"; $SeedFile = Join-Path (Get-Location) "tld-validador-canal-operaciones-1008-1016.json"; if (-not (Test-Path $SeedFile)) { throw "No existe: $SeedFile" }; $seed = Get-Content $SeedFile -Raw | ConvertFrom-Json; $utf8 = New-Object System.Text.UTF8Encoding $false; $i = 0; foreach ($lote in $seed.batchWriteLotes) { $i++; $tmp = Join-Path $env:TEMP "validador-operacion-lote-$i.json"; [System.IO.File]::WriteAllText($tmp, ($lote | ConvertTo-Json -Depth 50 -Compress), $utf8); aws dynamodb batch-write-item --region $Region --request-items "file://$($tmp -replace '\\','/')" }; Write-Host "OK - $i lotes"
```

Compatible con **Windows PowerShell 5.1** (sin `-Depth` en `ConvertFrom-Json`, sin `utf8NoBOM`).


# Resultado
```powershell
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

PS C:\Users\pbmadesarrollo> Set-Location C:\AWSdeploy
PS C:\AWSdeploy> $Env:AWS_ACCESS_KEY_ID=""
PS C:\AWSdeploy> $Env:AWS_SECRET_ACCESS_KEY=""
PS C:\AWSdeploy> $Env:AWS_SESSION_TOKEN="
PS C:\AWSdeploy> $bytes = [System.IO.File]::ReadAllBytes("C:\AWSdeploy\tld-validador-canal-operaciones-1008-1016.json")
PS C:\AWSdeploy>
PS C:\AWSdeploy> switch -regex ([System.BitConverter]::ToString($bytes[0..3])) {
>>     '^EF-BB-BF' { 'UTF-8 BOM' }
>>     '^FF-FE-00-00' { 'UTF-32 LE' }
>>     '^00-00-FE-FF' { 'UTF-32 BE' }
>>     '^FF-FE' { 'UTF-16 LE' }
>>     '^FE-FF' { 'UTF-16 BE' }
>>     default { 'Sin BOM (puede ser UTF-8 sin BOM, ANSI, ASCII, etc.)' }
>> }
Sin BOM (puede ser UTF-8 sin BOM, ANSI, ASCII, etc.)
PS C:\AWSdeploy> try {
>>     [System.Text.UTF8Encoding]::new($false, $true).GetString(
>>         [System.IO.File]::ReadAllBytes("C:\AWSdeploy\tld-validador-canal-operaciones-1008-1016.json")
>>     ) > $null
>>
>>     "El archivo es UTF-8 válido"
>> }
>> catch {
>>     "El archivo NO es UTF-8 válido"
>> }
El archivo es UTF-8 válido
PS C:\AWSdeploy> $Region = "us-east-1"; $SeedFile = Join-Path (Get-Location) "tld-validador-canal-operaciones-1008-1016.json"; if (-not (Test-Path $SeedFile)) { throw "No existe: $SeedFile" }; $seed = Get-Content $SeedFile -Raw | ConvertFrom-Json; $utf8 = New-Object System.Text.UTF8Encoding $false; $i = 0; foreach ($lote in $seed.batchWriteLotes) { $i++; $tmp = Join-Path $env:TEMP "validador-operacion-lote-$i.json"; [System.IO.File]::WriteAllText($tmp, ($lote | ConvertTo-Json -Depth 50 -Compress), $utf8); aws dynamodb batch-write-item --region $Region --request-items "file://$($tmp -replace '\\','/')" }; Write-Host "OK - $i lotes"
{
    "UnprocessedItems": {}
}

{
    "UnprocessedItems": {}
}

{
    "UnprocessedItems": {}
}

{
    "UnprocessedItems": {}
}

{
    "UnprocessedItems": {}
}

{
    "UnprocessedItems": {}
}

{
    "UnprocessedItems": {}
}

{
    "UnprocessedItems": {}
}

OK - 8 lotes
PS C:\AWSdeploy>
```


# Select

```powershell
$Region = "us-east-1"
$OutputFile = "tld-validador-canal-operacion.json"

$Resultados = @()

$Canales = @(
    "1008",
    "1009",
    "1011",
    "1012",
    "1013",
    "1014",
    "1015",
    "1016"
)

foreach ($Canal in $Canales) {

    $tmp = Join-Path $env:TEMP "query-$Canal.json"

@"
{
  ":v": {
    "S": "$Canal"
  }
}
"@ | Out-File $tmp -Encoding ascii

    $Items = aws dynamodb query `
        --region $Region `
        --table-name tld-validador-canal-operacion `
        --key-condition-expression "idCanal = :v" `
        --expression-attribute-values file://$tmp `
        --query Items `
        --output json | ConvertFrom-Json

    $Resultados += $Items
}

$Resultados | ConvertTo-Json -Depth 20 | Out-File $OutputFile -Encoding utf8

Write-Host "Archivo generado: $OutputFile"
Write-Host "Total registros: $($Resultados.Count)"
```
