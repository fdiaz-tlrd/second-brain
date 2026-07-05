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


# Select — exportar canales desde DynamoDB (dev)

Ejecutar en **tu máquina** (AWS CLI + credenciales dev). Genera un JSON con datos de las tres tablas para actualizar `canalesPruebas-dev.json` / `canalesPruebas-dev.md`.

**Tablas:**

| Tabla | Acceso por `idCanal` |
|-------|----------------------|
| `tld-validador-canal` | `get-item` (PK `idCanal`) |
| `tld-validador-canal-operacion` | `query` (PK `idCanal`, SK `operacion`) |
| `tld-matriz-planes-canales` | `scan` + `FilterExpression idCanal = :v` (PK es `idPlanCanal`) |

**Canales incluidos:** validadores GATO (1008–1016 sin 1010), escenarios de error Postman (1017–1021), validador central VCN (`0001`).

```powershell
$Region = "us-east-1"
$OutputFile = "canales-dev-dynamo-export.json"
$utf8 = New-Object System.Text.UTF8Encoding $false

# Validadores 510-515 + escenarios error VCN/Postman + validador dummy central
$Canales = @(
    "0001",
    "1008",
    "1009",
    "1011",
    "1012",
    "1013",
    "1014",
    "1015",
    "1016",
    "1017",
    "1018",
    "1019",
    "1020",
    "1021"
)

function Write-AwsJsonFile {
    param([string]$Path, [string]$Json)
    [System.IO.File]::WriteAllText($Path, $Json, $utf8)
}

function Get-AttrValueFile {
    param([string]$Canal)
    $tmp = Join-Path $env:TEMP "dynamo-attr-$Canal.json"
    Write-AwsJsonFile -Path $tmp -Json (@{ ":v" = @{ S = $Canal } } | ConvertTo-Json -Compress)
    return $tmp
}

function Get-CanalKeyFile {
    param([string]$Canal)
    $tmp = Join-Path $env:TEMP "dynamo-key-$Canal.json"
    Write-AwsJsonFile -Path $tmp -Json (@{ idCanal = @{ S = $Canal } } | ConvertTo-Json -Compress)
    return $tmp
}

$validadorCanal = @()
$validadorOperacion = @()
$matrizPlanesCanales = @()
$sinRegistro = @()

foreach ($Canal in $Canales) {
    Write-Host "Consultando idCanal $Canal ..."

    $keyFile = Get-CanalKeyFile -Canal $Canal
    $attrFile = Get-AttrValueFile -Canal $Canal
    $attrPath = ($attrFile -replace '\\', '/')

    $canalItem = aws dynamodb get-item `
        --region $Region `
        --table-name tld-validador-canal `
        --key "file://$($keyFile -replace '\\', '/')" `
        --output json | ConvertFrom-Json

    if ($canalItem.Item) {
        $validadorCanal += ,@{
            idCanal = $Canal
            item    = $canalItem.Item
        }
    } else {
        $sinRegistro += ,@{
            idCanal = $Canal
            tabla   = "tld-validador-canal"
        }
    }

    $operItems = aws dynamodb query `
        --region $Region `
        --table-name tld-validador-canal-operacion `
        --key-condition-expression "idCanal = :v" `
        --expression-attribute-values "file://$attrPath" `
        --output json | ConvertFrom-Json

    if ($operItems.Items -and $operItems.Items.Count -gt 0) {
        foreach ($op in $operItems.Items) {
            $validadorOperacion += ,@{
                idCanal = $Canal
                item    = $op
            }
        }
    } else {
        $sinRegistro += ,@{
            idCanal = $Canal
            tabla   = "tld-validador-canal-operacion"
        }
    }

    $planItems = aws dynamodb scan `
        --region $Region `
        --table-name tld-matriz-planes-canales `
        --filter-expression "idCanal = :v" `
        --expression-attribute-values "file://$attrPath" `
        --output json | ConvertFrom-Json

    if ($planItems.Items -and $planItems.Items.Count -gt 0) {
        foreach ($pl in $planItems.Items) {
            $matrizPlanesCanales += ,@{
                idCanal = $Canal
                item    = $pl
            }
        }
    } else {
        $sinRegistro += ,@{
            idCanal = $Canal
            tabla   = "tld-matriz-planes-canales"
        }
    }
}

$export = [ordered]@{
    meta = [ordered]@{
        region           = $Region
        generadoEn       = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
        canalesConsultados = $Canales
        tablas           = @(
            "tld-validador-canal",
            "tld-validador-canal-operacion",
            "tld-matriz-planes-canales"
        )
    }
    resumen = [ordered]@{
        "tld-validador-canal"           = $validadorCanal.Count
        "tld-validador-canal-operacion" = $validadorOperacion.Count
        "tld-matriz-planes-canales"     = $matrizPlanesCanales.Count
        sinRegistro                     = $sinRegistro.Count
    }
    "tld-validador-canal"           = $validadorCanal
    "tld-validador-canal-operacion" = $validadorOperacion
    "tld-matriz-planes-canales"     = $matrizPlanesCanales
    sinRegistro                     = $sinRegistro
}

Write-AwsJsonFile -Path (Join-Path (Get-Location) $OutputFile) -Json ($export | ConvertTo-Json -Depth 30)

Write-Host ""
Write-Host "Archivo generado: $OutputFile"
Write-Host "tld-validador-canal:           $($validadorCanal.Count)"
Write-Host "tld-validador-canal-operacion: $($validadorOperacion.Count)"
Write-Host "tld-matriz-planes-canales:     $($matrizPlanesCanales.Count)"
Write-Host "sinRegistro (avisos):            $($sinRegistro.Count)"
```

Pega aquí el contenido de `canales-dev-dynamo-export.json` (o súbelo al repo) para actualizar la documentación de canales.
