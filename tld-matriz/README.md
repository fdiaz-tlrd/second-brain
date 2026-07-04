# tld-matriz

Documentación viva del estudio de **`tld-matriz`** (autenticación, planes, políticas de la plataforma TLD).

## Alcance de este espacio

Repo separado de VCN, P2P, P2M, R2P y `tld-api-base`. Aquí documentamos **matriz** — no mezclar con `second-brain/tld-api-base/` ni con triage VCN.

## Relación con las APIs TLD

Las APIs (P2M, P2P, VCN, R2P) en runtime invocan **`tld-matriz-control-plan`** (`CFG_CONTROL_PLAN_FUNCTION_NAME`) para validar cupo de suscripción por canal.

**Este estudio empieza por otra lambda:** **`tld-auth-matriz-planes`** — la API de **administración** de planes (crear plan, asignar plan a canal, consultas). Es el “catálogo y altas”, no el portero de cada transacción.

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [README.md](./README.md) | Este índice |
| [01-auth-matriz-planes-index.md](./01-auth-matriz-planes-index.md) | Qué hace `lambdas/tld-auth-matriz-planes/index.js` (para dummies + diagrama) |
| [02-validacion-plan-runtime.md](./02-validacion-plan-runtime.md) | Bug `plan.js`, fix, `CFG_VALIDAR_PLAN_POR_CANAL`, flujo P2M/P2P ↔ control-plan |

## Referencias código

- Lambda: [`../../tld-matriz/lambdas/tld-auth-matriz-planes/index.js`](../../tld-matriz/lambdas/tld-auth-matriz-planes/index.js)
- Doc repo: `tld-matriz/docs/architecture/tld-auth-matriz/lambdas-tld-auth.md` §8
