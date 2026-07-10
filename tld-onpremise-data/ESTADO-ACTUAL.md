# Estado actual — tld-onpremise-data (ARQ-256 / P2M a premisa)

Última consolidación: julio 2026. Actualizar este archivo cuando cambie el estado de premisa, AWS o decisiones de diseño.

## Resumen en una frase

El código del repo está listo en rama `feature/ARQ-256_Bajar_a_premisa_P2M`; premisa PA_ACH se instaló parcialmente en un ambiente; **faltan GRANT y sinónimo público** (usuario ejecutor sin privilegios); streams P2M en `samconfig.toml` siguen con placeholder `REEMPLAZAR` en la mayoría de perfiles.

## Qué ya está hecho en código

### PA_MAC (P2P)

- Package `PCK_PA_MAC_AWS` reemplaza flujo legacy `PCK_TLRD_INTEROPERABILIDAD`.
- Filtros en lambdas: canal excluye `serviciosAsociados = "P2M"`; bitácora solo operaciones P2P.
- Columna `SERVICIOSASOCIADOS` en `TLRD_VALIDADOR_CANAL` (ALTER idempotente en ARQ-256).
- Inserts RTP P2P con literal grande: patrón `DECLARE v_clob CLOB` + bind (evita ORA-01704).

### PA_ACH (P2M)

- Nuevo esquema `premisa/PA_ACH/`: package `PCK_PA_ACH_AWS`, tablas `TLRD_VALIDADOR_CANAL`, `TLRD_VALIDADOR_BITACORA`, `TLRD_P2M`.
- **No** se crean `TLRD_P2M_CUENTA` ni `TLRD_P2M_MCC`: se escribe en tablas existentes `TLRD_ALIAS_P2M` y `TLRD_MCC` (IPEDA-3142).
- Lambda `replica-p2m-cuenta` hace `delete bodyRequest.logo` antes de Oracle (IPEDA-3139).
- `P2M_MSN_VALIDATE` para `tld-p2m-mcc` valida solo `["mcc","descripcion"]` (no porcentajes).
- Fechas cuenta: `TO_TIMESTAMP(valor,'YYYY-MM-DD HH24:MI:SS.FF3')`.
- Upsert cuenta/mcc: `INSERT ... EXCEPTION WHEN DUP_VAL_ON_INDEX THEN UPDATE` (PK en `TLRD_ALIAS_P2M.ID` y `TLRD_MCC.CODIGOMCC`).
- 6 lambdas ACH + tabla `tld-ach-replicacion`.
- Stream habilitado en `tld-p2m-mcc` (cambio en repo `tld-api-p2m`, stack separado).

### Scripts premisa (calidad)

- Instalación **idempotente**: tablas y ALTER solo si no existen (`ALL_TABLES` / `ALL_TAB_COLUMNS` con `OWNER` explícito).
- PA_ACH verifica **4 tablas prerrequisito** antes de instalar; aborta con mensaje si falta alguna.
- Includes con `@@` para rutas relativas al script.
- Inserts RTP grandes: variable `CLOB` + bind (no literal inline en INSERT SQL).
- `GRANT/AWSDATA.sql`: verifica privilegios; si no puede, imprime AVISO con SQL manual (no aborta).

## Última ejecución premisa (log conocido)

### `ARQ-256/install.sql` (PA_MAC)

- Package: OK.
- Columna `SERVICIOSASOCIADOS`: ya existía, omitida.
- Inserts RTP P2P: OK (bloques PL/SQL).
- **GRANT EXECUTE a AWSDATA:** ORA-01031 (privilegios insuficientes).
- **CREATE PUBLIC SYNONYM:** ORA-01031.

### `ARQ-256/install_PA_ACH.sql` (PA_ACH)

- Prerrequisitos (4 tablas): OK.
- Tablas propias: ya existían, omitidas.
- Inserts RTP P2M: OK (tras fix CLOB).
- Package: OK.
- **GRANT EXECUTE a AWSDATA:** ORA-01031 (antes del fix de avisos; con script nuevo debería mostrar AVISO, no error crudo).

## Pendiente operativo (bloqueantes o post-install)

1. **Ejecutar manualmente** (como dueño PA_MAC/PA_ACH o DBA):
   ```sql
   GRANT EXECUTE ON PA_MAC.PCK_PA_MAC_AWS TO AWSDATA;
   CREATE OR REPLACE PUBLIC SYNONYM PCK_PA_MAC_AWS FOR PA_MAC.PCK_PA_MAC_AWS;

   GRANT EXECUTE ON PA_ACH.PCK_PA_ACH_AWS TO AWSDATA;
   CREATE OR REPLACE PUBLIC SYNONYM PCK_PA_ACH_AWS FOR PA_ACH.PCK_PA_ACH_AWS;
   ```
   Sin esto, lambdas conectadas como AWSDATA fallan con `PLS-00201` al llamar el package sin prefijo de esquema.

2. **Completar ARNs de stream P2M** en `samconfig.toml` por perfil/ambiente:
   - `DynamoDBStreamIDP2m`
   - `DynamoDBStreamIDP2mCuenta`
   - `DynamoDBStreamIDP2mMcc`
   Obtener con `aws dynamodb describe-table --table-name <tabla> --query "Table.LatestStreamArn"`.


**EJECUTADO** **INICIO** Revisión

- Sandbox
Comandos a ejecutar
```powershell
 $env:AWS_REGION="us-east-1"
aws dynamodb describe-table --table-name tld-alias-cuenta --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-alias-replicacion --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-validador-bitacora --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-validador-canal --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-p2m --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-p2m-cuenta --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-p2m-mcc --query "Table.LatestStreamArn"
 $env:AWS_REGION="us-west-2"
aws dynamodb describe-table --table-name tld-alias-cuenta --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-alias-replicacion --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-validador-bitacora --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-validador-canal --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-p2m --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-p2m-cuenta --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-p2m-mcc --query "Table.LatestStreamArn"
```

Ejecución
```powershell
PS C:\Users\pbmadesarrollo>  $env:AWS_REGION="us-east-1"
PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-alias-cuenta --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-east-1:807262913923:table/tld-alias-cuenta/stream/2023-01-19T00:22:38.070"

PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-alias-replicacion --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-east-1:807262913923:table/tld-alias-replicacion/stream/2026-02-23T18:07:06.645"

PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-validador-bitacora --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-east-1:807262913923:table/tld-validador-bitacora/stream/2022-08-23T23:38:57.929"

PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-validador-canal --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-east-1:807262913923:table/tld-validador-canal/stream/2022-08-23T23:38:57.839"

PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-p2m --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m/stream/2026-04-27T21:28:18.815"

PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-p2m-cuenta --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m-cuenta/stream/2026-04-27T21:28:18.804"

PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-p2m-mcc --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m-mcc/stream/2026-06-20T22:28:43.215"

PS C:\Users\pbmadesarrollo>  $env:AWS_REGION="us-west-2"
PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-alias-cuenta --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-west-2:807262913923:table/tld-alias-cuenta/stream/2023-02-24T18:05:29.871"

PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-alias-replicacion --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-west-2:807262913923:table/tld-alias-replicacion/stream/2026-02-23T19:15:24.472"

PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-validador-bitacora --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-west-2:807262913923:table/tld-validador-bitacora/stream/2022-10-18T20:59:44.829"

PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-validador-canal --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-west-2:807262913923:table/tld-validador-canal/stream/2022-10-18T21:01:58.270"

PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-p2m --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-west-2:807262913923:table/tld-p2m/stream/2026-07-10T09:43:09.626"

PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-p2m-cuenta --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-west-2:807262913923:table/tld-p2m-cuenta/stream/2026-07-10T10:01:09.027"

PS C:\Users\pbmadesarrollo> aws dynamodb describe-table --table-name tld-p2m-mcc --query "Table.LatestStreamArn"
"arn:aws:dynamodb:us-west-2:807262913923:table/tld-p2m-mcc/stream/2026-07-10T10:03:42.343"

PS C:\Users\pbmadesarrollo>
```


**EJECUTADO** **FIN** Revisión



3. **Desplegar** stack `tld-api-p2m` (si `tld-p2m-mcc` no tiene stream activo).

4. **Crear/completar secreto** `ach-directo-v2/oracle` en Secrets Manager del ambiente.

5. **Desplegar** stack `tld-onpremise-data` en el ambiente objetivo.

## Decisiones cerradas (no reabrir sin pedido explícito)

| Tema | Decisión |
|------|----------|
| Una vs dos lambdas por stream | **Dos lambdas** (MAC y ACH): distinto esquema, secreto, package, cola reintento |
| `serviciosAsociados = "ambos"` | Baja a **PA_MAC y PA_ACH** (canal compartido) |
| Tablas cuenta/mcc P2M | **No** crear `TLRD_P2M_CUENTA` / `TLRD_P2M_MCC`; usar `TLRD_ALIAS_P2M` / `TLRD_MCC` |
| Campo `logo` | **No** baja a premisa (strip en lambda) |
| Validación `tld-p2m-mcc` | Solo campos que bajan: `mcc`, `descripcion` |
| Columna `CONTROL` en alias/mcc | **No** existe en tablas destino; no se llena |
| Tablas prerrequisito PA_ACH | `TLRD_MENSAJE_RECIBIDO`, `TLRD_RTP_SQL`, `TLRD_ALIAS_P2M`, `TLRD_MCC` — responsabilidad externa, no las crea nuestro install |

## Riesgos a recordar

- Desplegar `tld-onpremise-data` con streams `REEMPLAZAR` → lambdas P2M no procesan o deploy falla.
- Re-ejecutar install sin backup de `TLRD_RTP_SQL`: los inserts hacen DELETE+INSERT por `code` (aceptable, pero pierde fila anterior de ese code).
- Usuario admin sin `SELECT` en catálogo (`ALL_TABLES`): verificaciones de prerrequisito fallan aunque las tablas existan.
