# Despliegue AWS — tld-onpremise-data

## Orden general

1. **Premisa** (scripts ARQ-256 + grant manual si aplica)
2. **tld-api-p2m** — asegurar streams en tablas P2M (especialmente `tld-p2m-mcc`)
3. **Obtener ARNs** de streams P2M y actualizar `samconfig.toml`
4. **Secreto** `ach-directo-v2/oracle` en Secrets Manager
5. **Desplegar** stack `tld-onpremise-data`

PA_MAC y PA_ACH son independientes en premisa; en AWS comparten el mismo stack SAM.

## Rama

`feature/ARQ-256_Bajar_a_premisa_P2M`

## Parámetros stream en samconfig.toml

**Bloqueante para lambdas P2M.** Cada perfil (`sandbox`, `qa`, `dev`, `tlrd-highway`, etc.) y región tiene sus propios ARNs.

Parámetros a completar (reemplazar `REEMPLAZAR`):

| Parámetro | Tabla DynamoDB |
|-----------|----------------|
| DynamoDBStreamIDP2m | tld-p2m |
| DynamoDBStreamIDP2mCuenta | tld-p2m-cuenta |
| DynamoDBStreamIDP2mMcc | tld-p2m-mcc |

Parámetros MAC (ya suelen tener valor en perfiles maduros):

| Parámetro | Tabla |
|-----------|-------|
| DynamoDBStreamIDCanal | tld-validador-canal |
| DynamoDBStreamIDBitacora | tld-validador-bitacora |
| DynamoDBStreamIDAliasCuenta | tld-alias-cuenta |

Canal/bitácora ACH **reutilizan** `DynamoDBStreamIDCanal` y `DynamoDBStreamIDBitacora` — no hay parámetros separados.

### Comandos para obtener ARN

```bash
aws dynamodb describe-table --table-name tld-p2m --query "Table.LatestStreamArn" --output text
aws dynamodb describe-table --table-name tld-p2m-cuenta --query "Table.LatestStreamArn" --output text
aws dynamodb describe-table --table-name tld-p2m-mcc --query "Table.LatestStreamArn" --output text
```

Ejecutar con credenciales de la **cuenta y región** del perfil que se va a desplegar.

**Archivo a editar:** `tld-onpremise-data/samconfig.toml` (no el samconfig del API P2M).

Si se desactiva/reactiva un stream, el sufijo del ARN cambia → actualizar de nuevo.

## Secretos (template.yaml)

| Parámetro | Default | Uso |
|-----------|---------|-----|
| SecretManagerName | alias-replica/oracle | Lambdas MAC |
| SecretManagerNameAch | ach-directo-v2/oracle | Lambdas ACH |

El template puede crear secretos vacíos en algunos ambientes (`CreateSecret` condition). Completar JSON con host, usuario AWSDATA, password, etc.

## Recursos nuevos en stack (P2M)

- 6 lambdas ACH (`tld-replica-canal-ach`, `bitacora-ach`, `p2m`, `p2m-cuenta`, `p2m-mcc`, `ach-reintento`)
- Tabla DynamoDB `tld-ach-replicacion` con GSI `idTablaIdx`
- Log groups asociados
- Políticas Secrets Manager para secreto ACH

Lambdas MAC existentes: filtros actualizados, mismo secreto y cola.

## tld-api-p2m — prerequisito stream mcc

Cambio en repo `tld-api-p2m`: `StreamSpecification` habilitado en tabla `tld-p2m-mcc`.

Si la tabla ya existía sin stream: activar en consola DynamoDB **antes** de obtener el ARN.

## Comprobaciones post-despliegue

| Caso | Acción | Esperado |
|------|--------|----------|
| Canal P2P | Insert/update canal con serviciosAsociados=P2P | Fila en PA_MAC.TLRD_VALIDADOR_CANAL; no ACH |
| Canal P2M | serviciosAsociados=P2M | Fila en PA_ACH.TLRD_VALIDADOR_CANAL; no MAC |
| Canal ambos | serviciosAsociados=ambos | Filas en **ambos** esquemas |
| Pago P2M | Cambio en tld-p2m | PA_ACH.TLRD_P2M |
| Comercio | Cambio tld-p2m-cuenta sin logo | PA_ACH.TLRD_ALIAS_P2M |
| MCC | Cambio tld-p2m-mcc | PA_ACH.TLRD_MCC (solo mcc + descripcion) |
| Fallo Oracle | Error en carga | Ítem en cola reintento correcta |

Logs: CloudWatch grupos `tld-replica-*`, `tld-*-reintento`.

Premisa: `TLRD_MENSAJE_RECIBIDO`, mensajes de error vía `gv_error` del package.

## Despliegue observado (sandbox)

Registro en julio 2026: deploy vía `deployNewVersion.ps1` con rama `feature/ARQ-256_Bajar_a_premisa_P2M`, hash `bf50a342...`, ambiente sandbox, perfiles Desarrolladores.

Verificar que el perfil SAM usado tenga ARNs P2M reales antes de considerar P2M operativo.

## Newman / VPN

Este repo **no** usa Newman para validar réplica. Las lambdas requieren conectividad VPC a Oracle premisa.

En máquina Lenovo del usuario (sin VPN dev): **no ejecutar** lambdas contra ambientes internos; solo revisión de código y scripts premisa.

## Qué no hace el despliegue

- No hace backfill histórico DynamoDB → premisa.
- No crea esquema/usuario PA_ACH en Oracle (solo objetos dentro del esquema).
- No crea las 4 tablas prerrequisito PA_ACH (mensaje_recibido, rtp_sql, alias_p2m, mcc).
