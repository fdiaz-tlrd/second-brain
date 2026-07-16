# R2P Dig — `ImportModuleError` `@telered/tld-telered-lib`

| Campo | Valor |
|-------|-------|
| Fecha evidencia CloudWatch | 2026-06-24 |
| Lambda | `tld-request-to-pay` |
| Error | `Cannot find module '@telered/tld-telered-lib/tld-util-http'` |
| Stack (histórico) | `lib/validador.js` → `app.js` |
| Estado | **Mitigado en código Dig (iter 3.1, 2026-07-15)** — falta deploy para confirmar en CloudWatch |

## Causa (histórico)

1. `lambdas/r2p/lib/validador.js` hacía `require('@telered/tld-telered-lib/tld-util-http')`.
2. `app.js` hacía `require("./lib/validador")` al init (aunque el happy path ya usaba proxy).
3. Layer Dig **sin** `@telered/tld-telered-lib` ni `jsonpath` (prod sí las tiene porque el HTTP al banco vive en R2P).

## Fix 3.1

1. `lambdas/r2p/lib/getResultadoValidador.js` — solo agregación (sin HTTP).
2. `app.js` → `require("./lib/getResultadoValidador")`.
3. **Eliminado** `lambdas/r2p/lib/validador.js`.

Detalle y mesa: [`11-fase2-orden-fixes.md`](./11-fase2-orden-fixes.md).
