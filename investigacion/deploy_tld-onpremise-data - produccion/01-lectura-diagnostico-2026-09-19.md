# Lectura del diagnóstico prod — 2026-09-19

Fuente: [`DIAGNOSTICO ONPREMISE.txt`](./DIAGNOSTICO%20ONPREMISE.txt) (`.\diagnostico-onpremise.ps1` en `C:\AWSdeploy`, cuenta `893506747683`, rol `dbarrera@telered.com.pa`).

El script de consulta es [`comandos-diagnostico-prod.ps1`](./comandos-diagnostico-prod.ps1). El dump del deploy: [`00-que-paso-2026-09-19.md`](./00-que-paso-2026-09-19.md).

## Qué queda cerrado

Cuenta **prod** correcta. El stack Virginia **ya no está a mitad de deploy**. Oregon **no se tocó** esta noche.

| | Virginia `us-east-1` | Oregon `us-west-2` |
|--|--|--|
| Stack `tld-alias-replica` | **`UPDATE_ROLLBACK_COMPLETE`** (2026-09-19 07:19 UTC) | **`UPDATE_COMPLETE`** desde **2026-07-04** |
| Motivo stack | *One or more resources could not be deleted* | — |
| Lambdas MAC | Active; `LastModified` **2026-09-19 07:10 UTC** (toque del rollback del reintento 2) | Active; `LastModified` **2026-07-04** |
| Lambdas ACH (6) | **no existen** | **no existen** |
| Secreto `ach-directo-v2/oracle` | **no existe** | **no existe** |
| Tablas P2M + stream | ACTIVE, `NEW_AND_OLD_IMAGES` | ACTIVE, `NEW_AND_OLD_IMAGES` |

El `LastUpdated` Virginia `2026-09-19T07:09:37Z` coincide con el **reintento 2** del log de deploy (~02:09 hora servidor). El rollback de ese reintento **sí terminó** (07:19Z). No hay eventos de intento 3/4 ni de Oregon.

Las lambdas MAC Virginia están Active. El `LastModified` de esta noche es el rollback reescribiendo el código **anterior** a `#49`, no evidencia de que el código nuevo haya quedado.

## Causa del fallo — confirmada, y ya hay ARNs reales

Las tres tablas P2M existen en **ambas** regiones, con stream habilitado. Los `LatestStreamArn` son del **2026-09-05** (recreación post incidente PK de `tld-api-p2m`). Eso es lo que hay que poner en `samconfig.toml` en lugar de `REEMPLAZAR`.

### `[prod]` Virginia

```
DynamoDBStreamIDP2m       = arn:aws:dynamodb:us-east-1:893506747683:table/tld-p2m/stream/2026-09-05T07:56:14.086
DynamoDBStreamIDP2mCuenta = arn:aws:dynamodb:us-east-1:893506747683:table/tld-p2m-cuenta/stream/2026-09-05T07:56:14.110
DynamoDBStreamIDP2mMcc    = arn:aws:dynamodb:us-east-1:893506747683:table/tld-p2m-mcc/stream/2026-09-05T07:56:14.062
```

### `[prod-oregon]` Oregon

```
DynamoDBStreamIDP2m       = arn:aws:dynamodb:us-west-2:893506747683:table/tld-p2m/stream/2026-09-05T08:08:58.008
DynamoDBStreamIDP2mCuenta = arn:aws:dynamodb:us-west-2:893506747683:table/tld-p2m-cuenta/stream/2026-09-05T08:17:20.663
DynamoDBStreamIDP2mMcc    = arn:aws:dynamodb:us-west-2:893506747683:table/tld-p2m-mcc/stream/2026-09-05T08:19:53.821
```

Hasta que esos valores no estén en `samconfig.toml` (repo `tld-onpremise-data`, perfiles prod), **cualquier** `deployNewVersion` a prod vuelve a fallar igual.

## Lo que el próximo deploy sigue chocando

### 1. Log groups + SCP

Últimos eventos Virginia: `DELETE_FAILED` por SCP `p-agpaki3o` (`logs:DeleteLogGroup`) en:

| LogicalId | Nombre |
|-----------|--------|
| `P2mLogGroup` | `/aws/lambda/tld-replica-p2m` |
| `P2mMccLogGroup` | `/aws/lambda/tld-replica-p2m-mcc` |
| `AchReintentoLogGroup` | `/aws/lambda/tld-ach-reintento` |
| `BitacoraAchLogGroup` | `/aws/lambda/tld-replica-bitacora-ach` |

El intento 1 también falló borrar `P2mCuentaLogGroup` (`/aws/lambda/tld-replica-p2m-cuenta`); no sale en los últimos 40 eventos.

`describe-log-groups` del script **no imprimió ningún nombre** (salida vacía bajo el encabezado). Eso no anula el `DELETE_FAILED`: CloudFormation sigue considerando que no pudo limpiarlos. El próximo changeset vuelve a **+ Add** esos LogGroups. Si el físico existe → `already exists`. Si CF aún los tiene en `DELETE_FAILED` → el update se enreda. La plataforma **no puede** borrarlos (SCP). Mismo patrón que `tld-api-p2m` prod: el template de QA dejó de declarar el LogGroup y se usa `--retain-resources`.

### 2. Secreto ACH

`ach-directo-v2/oracle` no está en ninguna región. El rollback lo borró (`DELETE_COMPLETE` 07:13Z). El siguiente deploy **vuelve a crearlo vacío** (`SecretAchReplica` no tiene `Condition: CreateSecret`). Sin JSON real de Oracle ACH, las lambdas P2M no cargan premisa aunque el stack salga `UPDATE_COMPLETE`.

### 3. Oregon

El stack Oregon sigue el de **julio 2024/2026 MAC-only**. Un deploy `prod-oregon` con ARNs ya rellenados **sí** va a intentar crear las 6 lambdas ACH ahí. Los streams Oregon existen; el secreto Oregon no.

## Qué no dice este dump

- Contenido del código de las lambdas MAC Virginia (solo `LastModified` + `State`).
- Si los log groups físicos existen (hace falta `describe-log-groups --output json` o consola).
- Recursos `DELETE_FAILED` aún listados en el stack (`describe-stack-resources`).
- Premisa Oracle.
