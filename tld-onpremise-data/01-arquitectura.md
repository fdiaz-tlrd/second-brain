# Arquitectura — réplica AWS → Premisa

## Propósito

Replicar cambios de tablas DynamoDB (nube) hacia Oracle on‑premise (premisa), tabla por tabla, con validación JSON y scripts SQL configurables en `TLRD_RTP_SQL`.

## Evolución del diseño

### Antes (legacy)

- Lambdas llamaban `PCK_TLRD_INTEROPERABILIDAD` (acoplado a `PCK_TLRD_UTILS`, utilidades APEX).
- Scripts Oracle no versionados junto a las lambdas.

### Ahora (objetivo en repo)

- Carpeta `premisa/` dentro de `tld-onpremise-data` con DDL, packages, RTP y `install.sql`.
- Flujo P2P: `PCK_PA_MAC_AWS.PRC_DOWNDATA_AWS_TLRD`.
- Flujo P2M: `PCK_PA_ACH_AWS.PRC_DOWNDATA_AWS_TLRD` (mismo contrato, otro esquema).

### Flujo de un mensaje

```
DynamoDB Stream event
    → Lambda (filtro premisa)
    → JSON { id, fechaCreacion, fechaActualizacion, tablaOrigen, datos }
    → AWSDATA conecta a Oracle
    → BEGIN PCK_PA_*_AWS.PRC_DOWNDATA_AWS_TLRD(:input, :output); END;
    → Package valida JSON (P2P_MSN_VALIDATE / P2M_MSN_VALIDATE)
    → Inserta en TLRD_MENSAJE_RECIBIDO
    → Ejecuta sql_query del RTP según tablaOrigen
    → Devuelve 200 u 400 a la lambda
```

Si falla: lambda guarda en cola DynamoDB de reintento (`tld-alias-replicacion` o `tld-ach-replicacion`); lambda de reintento reintenta con mismos filtros.

## Separación P2P vs P2M

No es solo filtrado: son **destinos distintos**:

| Aspecto | P2P | P2M |
|---------|-----|-----|
| Esquema | PA_MAC | PA_ACH |
| Package | PCK_PA_MAC_AWS | PCK_PA_ACH_AWS |
| Secreto | alias-replica/oracle | ach-directo-v2/oracle |
| Cola reintento | tld-alias-replicacion | tld-ach-replicacion |
| Kindred RTP | P2P_UP_DATA_PRM | P2M_UP_DATA_PRM |

## Por qué dos lambdas en el mismo stream (no una sola)

P2P y P2M no comparten Oracle ni credenciales. Una lambda única tendría que, en cada evento, decidir esquema, secreto y cola; un fallo o despliegue en un camino arrastraría al otro.

Con dos lambdas sobre el **mismo** stream DynamoDB:

- Cada una aplica su filtro y descarta lo que no le corresponde.
- Pipelines independientes: se puede activar o corregir P2M sin tocar P2P en producción.
- Mantiene el patrón existente: una lambda por flujo de réplica.

## Canal: reparto de eventos `tld-validador-canal`

Campo `serviciosAsociados`: string `P2P` | `P2M` | `ambos`.

```
DynamoDB tld-validador-canal (un stream)
        │
        ├── tld-replica-canal      → PA_MAC  si serviciosAsociados ≠ "P2M"
        │
        └── tld-replica-canal-ach  → PA_ACH  si serviciosAsociados = "P2M" o "ambos"
```

`ambos` → el registro baja a **PA_MAC y PA_ACH**.

## Bitácora: reparto por operación

Misma tabla `tld-validador-bitacora`, dos lambdas, operaciones disjuntas:

- **P2P (PA_MAC):** 0001–0011, 0013, 0022, 0023; si operación no identificable → **sí baja** (MAC).
- **P2M (PA_ACH):** 0015–0021, 0024, 0025; si operación no identificable → **no baja** (ACH).

## Tablas DynamoDB involucradas

| Tabla | Flujo MAC | Flujo ACH |
|-------|-----------|-----------|
| tld-validador-canal | Sí (filtrado) | Sí (filtrado) |
| tld-validador-bitacora | Sí (filtrado) | Sí (filtrado) |
| tld-alias-cuenta | Sí (todos) | No |
| tld-p2m | No | Sí (todos) |
| tld-p2m-cuenta | No | Sí (todos) |
| tld-p2m-mcc | No | Sí (todos) |
| tld-alias-replicacion | Cola reintento MAC | No |
| tld-ach-replicacion | No | Cola reintento ACH |

Tablas P2M (`tld-p2m`, `tld-p2m-cuenta`, `tld-p2m-mcc`) viven en el stack del API P2M (repo separado `tld-api-p2m`); este repo solo consume sus streams.

## Package Oracle — responsabilidades

`PRC_DOWNDATA_AWS_TLRD(P_MESSAGE_IN CLOB, P_MEESAGE_OUT OUT VARCHAR2)`:

1. Parsea JSON entrante.
2. Valida header y body según `P2P_MSN_VALIDATE` o `P2M_MSN_VALIDATE` en `TLRD_RTP_SQL`.
3. Registra mensaje en `TLRD_MENSAJE_RECIBIDO`.
4. Resuelve RTP por `tablaOrigen` (coincide con `file_name` en RTP, ej. `tld-validador-canal`).
5. Ejecuta `sql_query` del RTP con bind `:P_MESSAGE_RECEIVED`.
6. Respuesta JSON en salida: `{"respuesta":"200","mensaje":"OK"}` o 400 con detalle.

Variable global `gv_error` usada dentro de los scripts RTP embebidos.

## AWSDATA y sinónimo público

Las lambdas conectan como **AWSDATA** (no como PA_MAC ni PA_ACH). El código llama:

```sql
BEGIN
  PCK_PA_MAC_AWS.PRC_DOWNDATA_AWS_TLRD(:input_data, :output);
END;
```

Sin prefijo de esquema. Por eso hace falta:

- `GRANT EXECUTE ON PA_*.PCK_PA_*_AWS TO AWSDATA`
- `CREATE OR REPLACE PUBLIC SYNONYM PCK_PA_*_AWS FOR PA_*.PCK_PA_*_AWS`

El usuario que **ejecuta los scripts install** normalmente no es AWSDATA; es un admin que crea objetos en PA_MAC/PA_ACH y luego otorga a AWSDATA (si tiene privilegio).

## Qué no cambió / fuera de alcance

- `tld-alias-cuenta` solo replica a PA_MAC; no hay réplica ACH de alias cuenta.
- Packages legacy (`PCK_TLRD_INTEROPERABILIDAD`, etc.) no forman parte del install nuevo.
- Backfill histórico DynamoDB no está en estos scripts.
