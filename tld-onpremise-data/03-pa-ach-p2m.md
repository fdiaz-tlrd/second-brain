# PA_ACH — flujo P2M / ACH directo

## Ubicación en repo

```
premisa/PA_ACH/
├── TABLE/           DDL tablas (7 tablas, idempotentes)
├── PACKAGE/         PCK_PA_ACH_AWS.pks / .pkb
├── DATA/TLRD_RTP_SQL/
├── GRANT/AWSDATA.sql
└── install.sql
```

Punto de entrada ARQ-256:

```
premisa/ARQ-256_Bajar_a_premisa_P2M/install_PA_ACH.sql  →  llama @@../PA_ACH/install.sql
```

## Package

- **Nombre:** `PA_ACH.PCK_PA_ACH_AWS`
- **Contrato:** idéntico a PA_MAC (`PRC_DOWNDATA_AWS_TLRD`)
- **Kindred RTP:** `P2M_UP_DATA_PRM`

## Tablas que crea el install (todas idempotentes)

Si la tabla **ya existe** (ej. QA premisa) → se omite. Si **no existe** (ej. Sandbox premisa vacío) → se crea con DDL alineado a premisa PA_ACH.

| Tabla | PK | Origen / notas |
|-------|-----|----------------|
| TLRD_MENSAJE_RECIBIDO | (ID, CODE) | Infra auditoría; índices + LOB SECUREFILE |
| TLRD_RTP_SQL | SQL_ID | Infra scripts; trigger `TRG_TLRD_RTP_SQL` |
| TLRD_ALIAS_P2M | ID | Destino `tld-p2m-cuenta` |
| TLRD_MCC | CODIGOMCC | Destino `tld-p2m-mcc` |
| TLRD_VALIDADOR_CANAL | IDCANAL | SERVICIOSASOCIADOS, CONTROL (JSON) |
| TLRD_VALIDADOR_BITACORA | IDTRANSACCION | CONTROL (JSON) |
| TLRD_P2M | P2MPAGOID | Pagos P2M |

Creación: `ALL_TABLES WHERE owner='PA_ACH'`; si `COUNT=0` → `EXECUTE IMMEDIATE`.

### Contexto QA vs Sandbox premisa

- **QA:** las 4 tablas infra/datos (`MENSAJE_RECIBIDO`, `RTP_SQL`, `ALIAS_P2M`, `MCC`) ya existían → install las omite y solo actualiza package/RTP/tablas propias del cambio.
- **Sandbox premisa:** esas 4 **no existían** → el install las crea; permite probar nube→premisa sin depender de otro equipo.


**TLRD_ALIAS_P2M** — PK en `ID`:

```sql
CREATE TABLE PA_ACH.TLRD_ALIAS_P2M (
  ID                 VARCHAR2(255 CHAR) NOT NULL,
  CUENTA             VARCHAR2(50 CHAR),
  BANCO              VARCHAR2(50 CHAR),
  NOMBRECOMERCIO     VARCHAR2(255 CHAR),
  CREADO             TIMESTAMP(6),
  CORREO             VARCHAR2(100 CHAR),
  IDENTIFICADOR      VARCHAR2(50 CHAR),
  ULTIMACONSULTA     TIMESTAMP(6),
  CODIGOMCC          VARCHAR2(15 CHAR),
  PLATAFORMA         VARCHAR2(2 CHAR),
  PRODUCTO           VARCHAR2(255 CHAR),
  ESTADO             VARCHAR2(5 CHAR),
  TIPOIDENTIFICADOR  VARCHAR2(50 CHAR),
  ACTUALIZADO        TIMESTAMP(6)
);
-- PRIMARY KEY (ID)
```

**TLRD_MCC** — PK en `CODIGOMCC`:

```sql
CREATE TABLE PA_ACH.TLRD_MCC (
  CODIGOMCC       VARCHAR2(15 CHAR) NOT NULL,
  DESCRIPCIONMCC  VARCHAR2(255 CHAR)
);
-- PRIMARY KEY (CODIGOMCC)
```

## Decisión IPEDA-3142: no crear tablas propias cuenta/mcc

- **No** existen `TLRD_P2M_CUENTA` ni `TLRD_P2M_MCC` en el install.
- Los RTP `P2M_TLD-P2M-CUENTA` y `P2M_TLD-P2M-MCC` escriben directamente en `TLRD_ALIAS_P2M` y `TLRD_MCC`.
- `code` y `file_name` del RTP siguen siendo `tld-p2m-cuenta` / `tld-p2m-mcc` (el package enruta por `tablaOrigen`).
- Tablas propias serían duplicados que nadie consume.

## Mapeo tld-p2m-cuenta → TLRD_ALIAS_P2M

| DynamoDB | Premisa | Notas |
|----------|---------|-------|
| id | ID | PK upsert |
| cuenta | CUENTA | |
| banco | BANCO | |
| nombreComercio | NOMBRECOMERCIO | |
| creado | CREADO | TO_TIMESTAMP(..., 'YYYY-MM-DD HH24:MI:SS.FF3') |
| correo | CORREO | |
| identificador | IDENTIFICADOR | |
| ultimaConsulta | ULTIMACONSULTA | TO_TIMESTAMP |
| mcc | CODIGOMCC | |
| plataforma | PLATAFORMA | |
| producto | PRODUCTO | |
| estado | ESTADO | |
| tipoIdentificador | TIPOIDENTIFICADOR | |
| actualizado | ACTUALIZADO | TO_TIMESTAMP |
| logo | — | **No baja** (IPEDA-3139; strip en lambda) |

Upsert: `INSERT ... EXCEPTION WHEN DUP_VAL_ON_INDEX THEN UPDATE` por PK `ID`.

Sin columna `CONTROL` en destino (a diferencia de canal/bitácora/p2m propios).

## Mapeo tld-p2m-mcc → TLRD_MCC

| DynamoDB | Premisa | Notas |
|----------|---------|-------|
| mcc | CODIGOMCC | PK upsert |
| descripcion | DESCRIPCIONMCC | |
| porcentajeComision | — | No baja |
| porcentajeMdrEmisor | — | No baja |
| porcentajeMdrAdquirente | — | No baja |
| porcentajeMdrTelered | — | No baja |

Upsert por PK `CODIGOMCC`.

## Scripts TLRD_RTP_SQL (prefijo P2M_)

| code | tablaOrigen | Tabla destino real |
|------|-------------|-------------------|
| P2M_MSN_VALIDATE | — | Validación JSON |
| P2M_TLD-VALIDADOR-CANAL | tld-validador-canal | TLRD_VALIDADOR_CANAL |
| P2M_TLD-VALIDADOR-BITACORA | tld-validador-bitacora | TLRD_VALIDADOR_BITACORA |
| P2M_TLD-P2M | tld-p2m | TLRD_P2M |
| P2M_TLD-P2M-CUENTA | tld-p2m-cuenta | **TLRD_ALIAS_P2M** |
| P2M_TLD-P2M-MCC | tld-p2m-mcc | **TLRD_MCC** |

## P2M_MSN_VALIDATE — campos obligatorios

Registro en `TLRD_RTP_SQL` con `code = 'P2M_MSN_VALIDATE'`. No es tabla; es JSON en `json_script`.

Validación por tabla AWS:

| tablas_aws | json_validate |
|------------|---------------|
| ALL (header) | id, fechaCreacion, fechaActualizacion, tablaOrigen, datos |
| tld-validador-canal | idCanal, alias, estadoValidador, nombre |
| tld-validador-bitacora | idTransaccion, fecha, fechaRespuesta, idCanal, idCanalValidador, resultado |
| tld-p2m | p2mPagoId, identificador, monto, estadoCargo, estadoRecibido |
| tld-p2m-cuenta | id, identificador, banco, estado, tipoIdentificador |
| tld-p2m-mcc | **mcc, descripcion** | Solo lo que baja a premisa (no porcentajes) |

## Lambdas P2M (stack tld-onpremise-data)

| Lambda | DynamoDB | Tabla Oracle efectiva | Filtro |
|--------|----------|----------------------|--------|
| tld-replica-canal-ach | tld-validador-canal | TLRD_VALIDADOR_CANAL | P2M o ambos |
| tld-replica-bitacora-ach | tld-validador-bitacora | TLRD_VALIDADOR_BITACORA | 0015–0021, 0024, 0025 |
| tld-replica-p2m | tld-p2m | TLRD_P2M | todos |
| tld-replica-p2m-cuenta | tld-p2m-cuenta | TLRD_ALIAS_P2M | todos; sin logo |
| tld-replica-p2m-mcc | tld-p2m-mcc | TLRD_MCC | todos |
| tld-ach-reintento | tld-ach-replicacion | — | mismos filtros |

## Secreto y cola

- Secreto: `ach-directo-v2/oracle` (parámetro `SecretManagerNameAch` en template.yaml)
- Cola reintento: `tld-ach-replicacion`

## Grant AWSDATA

Archivo: `premisa/PA_ACH/GRANT/AWSDATA.sql` — misma lógica de verificación que PA_MAC.

Manual si admin sin privilegios:

```sql
GRANT EXECUTE ON PA_ACH.PCK_PA_ACH_AWS TO AWSDATA;
CREATE OR REPLACE PUBLIC SYNONYM PCK_PA_ACH_AWS FOR PA_ACH.PCK_PA_ACH_AWS;
```

## Columna CONTROL

Patrón heredado de PA_MAC en tablas **que sí creamos** (canal, bitácora, p2m): JSON con fechas de registro/actualización premisa y AWS.

`TLRD_ALIAS_P2M` y `TLRD_MCC` **no tienen** `CONTROL`; el package no la exige para esos RTP.
