# Lambdas y filtros de réplica

## Estructura lambdas en repo

```
lambdas/
├── replica-canal/          → tld-replica-canal (MAC)
├── replica-bitacora/       → tld-replica-bitacora (MAC)
├── replica-cuenta/         → tld-replica-alias-cuenta (MAC)
├── alias-reintento/        → tld-alias-reintento (MAC)
├── replica-canal-ach/      → tld-replica-canal-ach (ACH)
├── replica-bitacora-ach/   → tld-replica-bitacora-ach (ACH)
├── replica-p2m/            → tld-replica-p2m (ACH)
├── replica-p2m-cuenta/     → tld-replica-p2m-cuenta (ACH)
├── replica-p2m-mcc/        → tld-replica-p2m-mcc (ACH)
├── ach-reintento/          → tld-ach-reintento (ACH)
└── layer/nodejs/           → dependencias compartidas
```

Cada lambda tiene su copia de `lib/util.js` y, donde aplica, `lib/filtrosReplica.js`.

## Llamada Oracle (común)

En `util.js` de cada lambda:

```javascript
sql = `BEGIN
        PCK_PA_MAC_AWS.PRC_DOWNDATA_AWS_TLRD(:input_data, :output);
       END;`;
// o PCK_PA_ACH_AWS para lambdas ACH
```

- Conexión con credenciales del secreto (`alias-replica/oracle` o `ach-directo-v2/oracle`).
- Usuario Oracle en runtime: **AWSDATA**.
- Payload JSON incluye `tablaOrigen` para que el package resuelva el RTP.

Respuestas esperadas del SP:

- Éxito: `{"respuesta":"200","mensaje":"OK"}`
- Error validación/carga: `{"respuesta":"400","mensaje":"..."}`

## Filtros PA_MAC (`filtrosReplica.js`)

Archivos: `replica-canal`, `replica-bitacora`, `alias-reintento`.

### Canal

```javascript
function debeReplicarCanal(datos) {
  return datos?.serviciosAsociados !== "P2M";
}
```

Bajan: sin campo, `P2P`, `ambos`. No baja: `P2M`.

### Bitácora

Operaciones permitidas:

```
0001, 0002, 0003, 0004, 0005, 0006, 0007, 0008, 0009, 0010, 0011, 0013, 0022, 0023
```

```javascript
function debeReplicarBitacora(datos) {
  const operacion = datos?.operacion;
  if (!operacionIdentificable(operacion)) {
    return true;  // op ausente/vacía → sí baja a MAC
  }
  return OPERACIONES_PERMITIDAS.has(operacion);
}
```

### Cuenta

```javascript
function debeReplicarCuenta() { return true; }
```

### Comportamiento si no replica

- No llama `saveOnPremise`.
- Llama `deleteRetryByIdTabla(id)` para limpiar reintento previo si existía.
- Log: `[SKIP] Excluido de premisa (motivo) | id...`

## Filtros PA_ACH (`filtrosReplica.js`)

Archivos: `replica-canal-ach`, `replica-bitacora-ach`, `ach-reintento`.

### Canal

```javascript
function debeReplicarCanal(datos) {
  const v = datos?.serviciosAsociados;
  return v === "P2M" || v === "ambos";
}
```

**Corrección aplicada:** inicialmente solo `P2M`; `ambos` debe bajar también a ACH.

### Bitácora

Operaciones permitidas:

```
0015, 0016, 0017, 0018, 0019, 0020, 0021, 0024, 0025
```

```javascript
function debeReplicarBitacora(datos) {
  const operacion = datos?.operacion;
  if (!operacionIdentificable(operacion)) {
    return false;  // op ausente → NO baja a ACH (distinto a MAC)
  }
  return OPERACIONES_PERMITIDAS.has(operacion);
}
```

### P2M, cuenta, mcc

Todos los registros pasan (`return true`).

### Default en `debeReplicar`

ACH: `default: return false` (tablas no listadas no replican).

MAC: `default: return true`.

## Strip de logo (replica-p2m-cuenta)

En `app.js`, tras `unmarshall`:

```javascript
const bodyRequest = unmarshall(record.dynamodb.NewImage);
delete bodyRequest.logo;
```

El campo `logo` en DynamoDB es CLOB grande; no tiene columna en `TLRD_ALIAS_P2M`.

## Colas de reintento

| Cola | Lambdas que escriben | Lambda reintento |
|------|---------------------|------------------|
| tld-alias-replicacion | replica-canal, bitacora, cuenta MAC | tld-alias-reintento |
| tld-ach-replicacion | todas ACH | tld-ach-reintento |

GSI `idTablaIdx` para borrar por id de registro origen.

Al guardar fallo: `saveToRetry`. Al éxito o skip por filtro: `deleteRetryByIdTabla`.

## Variables de entorno relevantes (template)

- `SECRET_NAME` — nombre secreto Oracle
- `TABLA_REPLICA` — cola DynamoDB reintento
- `TABLA_P2M`, `TABLA_P2M_CUENTA`, `TABLA_P2M_MCC` — nombres tabla origen para logs/env

## Streams DynamoDB (parámetros CloudFormation)

| Parámetro | Tabla |
|-----------|-------|
| DynamoDBStreamIDCanal | tld-validador-canal |
| DynamoDBStreamIDBitacora | tld-validador-bitacora |
| DynamoDBStreamIDAliasCuenta | tld-alias-cuenta |
| DynamoDBStreamIDP2m | tld-p2m |
| DynamoDBStreamIDP2mCuenta | tld-p2m-cuenta |
| DynamoDBStreamIDP2mMcc | tld-p2m-mcc |

Canal y bitácora: **mismo ARN** para lambda MAC y lambda ACH del mismo ambiente.

## Event source mapping

Cada lambda stream tiene su propio mapping al ARN del perfil en `samconfig.toml`. Dos mappings distintos pueden apuntar al mismo stream ARN (canal MAC + canal ACH).
