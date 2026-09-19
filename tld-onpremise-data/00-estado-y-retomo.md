# tld-onpremise-data — estado y retomo

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-09-19 |
| **Repo** | `tld-onpremise-data` |
| **Punta `origin/main`** | `c8f5413` — Merge PR **#49** (`qa` → `main`, 2026-09-16, `rbozav`) |
| **Árbol main = qa = sandbox = develop = feature** | Sí (ARQ-256 completo, punta de contenido `79631e3`) |

## Producción AWS (2026-09-19) — deploy fallido

Se intentó desplegar `main` @ `c8f5413` a **prod** (`tld-alias-replica`, cuenta `893506747683`) con `deployNewVersion.ps1`. **Falló.**

**Causa:** `[prod]` y `[prod-oregon]` en `samconfig.toml` aún tienen `DynamoDBStreamIDP2m*` = `.../stream/REEMPLAZAR`. Lambda: *Stream not found*.

El stack Virginia quedó (intento 1, confirmado) en **`UPDATE_ROLLBACK_COMPLETE`**, con log groups ACH huérfanos que el SCP **no deja borrar**. El log se corta en el reintento 2/4; Oregon no aparece en el dump.

Análisis: [`../investigacion/deploy_tld-onpremise-data - produccion/00-que-paso-2026-09-19.md`](../investigacion/deploy_tld-onpremise-data%20-%20produccion/00-que-paso-2026-09-19.md). Log crudo: [`DESPLIIEGUE API onpremise 18SEP2026.txt`](../investigacion/deploy_tld-onpremise-data%20-%20produccion/DESPLIIEGUE%20API%20onpremise%2018SEP2026.txt).

**No reintentar el mismo `sam deploy`** hasta tener ARNs reales y revisar huérfanos. Comandos para el compañero: [`../investigacion/deploy_tld-onpremise-data - produccion/comandos-diagnostico-prod.ps1`](../investigacion/deploy_tld-onpremise-data%20-%20produccion/comandos-diagnostico-prod.ps1).

## Git (corregido vs 2026-09-16)

El 16-sep `origin/main` se documentó en `afd53f7` (PR #35). El 16-sep tarde se mergeó **#49** (`qa` → `main`). El fetch del servidor de plataforma el 19-sep confirma `afd53f7..c8f5413`.

Traza de ramas: [`09-camino-ramas-develop-sandbox-qa.md`](./09-camino-ramas-develop-sandbox-qa.md) (el párrafo «main no tiene este trabajo» quedó **obsoleto** el 16-sep; el merge #49 lo corrige).

## Snapshot operacional julio (Sandbox / QA premisa)

No se revalidó contra AWS Sandbox/QA ni premisa en esta sesión. Sigue en [`ESTADO-ACTUAL.md`](./ESTADO-ACTUAL.md) (consolidación 2026-07-10), con la salvedad de que **prod ya se intentó desplegar y falló** por `REEMPLAZAR`.
