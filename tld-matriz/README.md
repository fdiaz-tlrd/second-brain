# tld-matriz

Documentación viva del estudio de **`tld-matriz`** (autenticación, planes, políticas de la plataforma TLD).

## Alcance de este espacio

Repo separado de VCN, P2P, P2M, R2P y `tld-api-base`. Aquí documentamos **matriz** — no mezclar con `second-brain/tld-api-base/` ni con triage VCN.

## Relación con las APIs TLD

Las APIs (P2M, P2P, VCN, R2P) en runtime invocan **`tld-matriz-control-plan`** (`CFG_CONTROL_PLAN_FUNCTION_NAME`) para validar cupo de suscripción por canal.

**Este estudio empieza por otra lambda:** **`tld-auth-matriz-planes`** — la API de **administración** de planes (crear plan, asignar plan a canal, consultas). Es el “catálogo y altas”, no el portero de cada transacción.

**Onboarding de canal en dev:** crear canal → generar apiKey/secret → asignar grupos — ver [03-auth-canal-api-key-grupos.md](./03-auth-canal-api-key-grupos.md).

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [README.md](./README.md) | Este índice |
| [01-auth-matriz-planes-index.md](./01-auth-matriz-planes-index.md) | Qué hace `lambdas/tld-auth-matriz-planes/index.js` |
| [02-validacion-plan-runtime.md](./02-validacion-plan-runtime.md) | Bug `plan.js`, fix, `CFG_VALIDAR_PLAN_POR_CANAL`, flujo P2M/P2P ↔ control-plan |
| [03-auth-canal-api-key-grupos.md](./03-auth-canal-api-key-grupos.md) | `crear-canal`, `generar-api-key`, `grupos-api-key` — onboarding canal + credenciales + permisos |
| [04-control-plan-index.md](./04-control-plan-index.md) | Qué hace `lambdas/tld-matriz-control-plan/index.js` — portero de cupo por transacción |

## Referencias código

- Lambda planes: [`../../tld-matriz/lambdas/tld-auth-matriz-planes/index.js`](../../tld-matriz/lambdas/tld-auth-matriz-planes/index.js)
- Lambdas canal/apiKey: [`../../tld-matriz/lambdas/tld-auth-crear-canal/index.js`](../../tld-matriz/lambdas/tld-auth-crear-canal/index.js), [`generar-api-key`](../../tld-matriz/lambdas/tld-auth-generar-api-key/index.js), [`grupos-api-key`](../../tld-matriz/lambdas/tld-auth-grupos-api-key/index.js)
- Lambda control-plan: [`../../tld-matriz/lambdas/tld-matriz-control-plan/index.js`](../../tld-matriz/lambdas/tld-matriz-control-plan/index.js)
