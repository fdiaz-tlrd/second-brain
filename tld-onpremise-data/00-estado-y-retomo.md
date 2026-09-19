# tld-onpremise-data — estado y retomo

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-09-19 (diagnóstico AWS prod) |
| **Repo** | `tld-onpremise-data` |
| **Punta `origin/main`** | `c8f5413` — Merge PR **#49** (`qa` → `main`, 2026-09-16, `rbozav`) |
| **Árbol main = qa = sandbox = develop = feature** | Sí (ARQ-256 completo, punta de contenido `79631e3`) |

## Producción AWS (2026-09-19)

Deploy `main` @ `c8f5413` a prod **falló**. Diagnóstico posterior (`DIAGNOSTICO ONPREMISE.txt`) confirma:

| | Virginia | Oregon |
|--|--|--|
| Stack `tld-alias-replica` | `UPDATE_ROLLBACK_COMPLETE` (reintento 2 terminó 07:19Z) | `UPDATE_COMPLETE` **2026-07-04** — esta noche **no se tocó** |
| Lambdas ACH | no existen | no existen |
| Lambdas MAC | Active (rollback reescribió a las 07:10Z) | Active, sin tocar desde julio |
| Secreto `ach-directo-v2/oracle` | no existe | no existe |
| Streams P2M | **sí**, ARNs 2026-09-05 | **sí**, ARNs 2026-09-05 |

Causa del fallo: `samconfig.toml` `[prod]` / `[prod-oregon]` tenían `.../stream/REEMPLAZAR`. **2026-09-19:** ARNs reales escritos y pusheados en `feature/ARQ-256_Bajar_a_premisa_P2M` (`d01128d`). **`main` aún no los tiene** — el `deployNewVersion` a prod con rama `main` sigue viendo `REEMPLAZAR`.

El update de Virginia puede chocar con log groups en `DELETE_FAILED` (SCP). El secreto ACH se crea vacío.

Análisis del log de deploy: [`00-que-paso-2026-09-19.md`](../investigacion/deploy_tld-onpremise-data%20-%20produccion/00-que-paso-2026-09-19.md). Dump diagnóstico: [`DIAGNOSTICO ONPREMISE.txt`](../investigacion/deploy_tld-onpremise-data%20-%20produccion/DIAGNOSTICO%20ONPREMISE.txt).

## Git

El 16-sep `origin/main` se documentó en `afd53f7` (PR #35). El 16-sep tarde se mergeó **#49** (`qa` → `main`). Traza: [`09-camino-ramas-develop-sandbox-qa.md`](./09-camino-ramas-develop-sandbox-qa.md).

## Snapshot operacional julio (Sandbox / QA premisa)

No se revalidó contra AWS Sandbox/QA ni premisa. Sigue en [`ESTADO-ACTUAL.md`](./ESTADO-ACTUAL.md).
