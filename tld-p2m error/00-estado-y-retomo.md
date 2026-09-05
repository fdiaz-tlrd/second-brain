# tld-api-p2m — fallo de deploy (2026-09-05)

Fuente: [`hoy.txt`](hoy.txt) (eventos CloudFormation del stack `tld-api-p2m`).

## Estado al cierre del dump

Stack **`tld-api-p2m`** (cuenta `893506747683`, `us-east-1`): **`UPDATE_ROLLBACK_COMPLETE`**.

Dos intentos el mismo día, mismo error, ~20 min de diferencia:

| Intento | Inicio (UTC) | Artifact SAM |
|---|---|---|
| 1 | 2026-09-05T04:07:50 | `tld-api-p2m/prod/20260904-230653/...` |
| 2 | 2026-09-05T04:28:24 | `tld-api-p2m/prod/20260904-232729/...` |

Redeployar el mismo `template.yaml` vuelve a fallar igual.

## Causa (única que no es cancelación)

**`TablePaymentToMerchant` (`tld-p2m`) — `UPDATE_FAILED`:**

> CloudFormation cannot update a stack when a custom-named resource requires replacing. Rename tld-p2m and update the stack again.

CloudFormation intentó **reemplazar** la tabla porque cambió el **hash key**:

| | En el stack (prod hoy) | En el template que se desplegó (`tld-api-p2m/template.yaml`) |
|---|---|---|
| PK | `id` | `p2mPagoId` |
| Nombre físico | `tld-p2m` (fijo) | `tld-p2m` (fijo) |

DynamoDB **no permite** cambiar el KeySchema in-place. CF tiene que borrar y crear. Con `TableName: tld-p2m` no puede: el nombre ya está ocupado por la tabla vieja.

El código nuevo (`lambdas/p2m/lib/p2m.js`) ya hace `GetItem`/`UpdateItem` con `Key: { p2mPagoId }`. Prod hoy usa `Key: { id }`. El cambio de PK es real; no es un desajuste de template.

## Lo que NO falló por sí mismo

Estos recursos salen como `CREATE_FAILED` / `UPDATE_FAILED` con **«cancelled»**. CloudFormation los abortó **después** del fallo de `tld-p2m`:

- `P2mCuentaTable` (`tld-p2m-cuenta`) — create cancelado; en el rollback quedó `DELETE_COMPLETE`
- `P2mMccTable` (`tld-p2m-mcc`) — igual
- `PaymentToMerchantLayer*` (`tld-p2m-layer`, `nodejs24.x`) — create cancelado; `DELETE_SKIPPED` (RetentionPolicy Retain)
- `BucketP2M` — update de cifrado KMS cancelado; el rollback revirtió el update

No diagnosticar layer, bucket ni las tablas nuevas como causa de este dump.

## Decisión (usuario, 2026-09-05 noche)

Lo que hay en prod es el desarrollo del proveedor: **llegó a producción y nunca se usó**. No importa. Importa la versión trabajada después.

Misma premisa que QA (2026-06-24): tirar el stack viejo y **CREATE** el de ustedes. No hay migración `id` → `p2mPagoId`.

## Por qué un `sam deploy` encima sigue fallando

Aunque `tld-p2m` ya se borró en consola, el stack **sigue**. CF tiene `TablePaymentToMerchant` con PK `id`. El YAML nuevo pide `p2mPagoId` y el mismo `TableName` → **reemplazo de recurso con nombre fijo** → el mismo error. Recrear la tabla a mano **antes** del deploy empeora (nombre ocupado).

Hay que **eliminar el stack** (como QA) o, si se quisiera conservar el stack, sacar primero el LogicalId `TablePaymentToMerchant` y recién después desplegar el template completo. Con la decisión de arriba, borrar el stack es el camino que ya funcionó.

## QA vs este prod

Script prod: `refactoria/Deploy/limpiar-stack-p2m-prod.ps1` (no usar el de QA). Aborta si STS no es `893506747683`. Descubre el custom domain `*p2m*` o se lo escribes arriba. No retiene el stage si los mappings siguen. Retiene solo `PaymentToMerchantLogGroup`. Corre en la máquina de despliegue con credenciales prod.

Mismos bloqueos que en QA al `delete-stack`:

- SCP niega `logs:DeleteLogGroup` (`/aws/lambda/tld-p2m`) → `--retain-resources`. El template **ya no** declara ese LogGroup (ajuste de QA).
- Custom domain **fuera** del stack: hay que quitar base path mappings **del dominio de prod** (no el de QA) o el stage no borra.
- Buckets versionados: vaciar antes o el stack no borra.
- Tablas: Virginia only (`IsVirginiaRegion`); Oregon también tiene stack (Lambda). Borrar **ambas** regiones, como QA.
- Tras el CREATE: en QA cargaron MCC `7299` en `tld-p2m-mcc`.

Si `tld-p2m-cuenta` / `tld-p2m-mcc` existen fuera del stack (hoy el rollback las dejó `DELETE_COMPLETE` en el dump), son el mismo tipo de huérfana que en QA: borrarlas para que el CREATE no choque con «already exists».

Doc QA: `refactoria/Deploy/contexto-agente-despliegue-qa.md`.
