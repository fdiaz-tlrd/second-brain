# tld-onpremise-data — estado y retomo

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-09-19 (PR #50 ARN prod) |
| **Repo** | `tld-onpremise-data` |
| **Punta `origin/main`** | `c8f5413` — Merge PR **#49** (`qa` → `main`, 2026-09-16) |
| **samconfig prod en git** | ARN en `feature/ARQ-256_Bajar_a_premisa_P2M` `d01128d`. PR **[#50](https://github.com/Telered-Autopista/tld-onpremise-data/pull/50)** → `develop` (**abierto, sin merge**). `main` sigue con `REEMPLAZAR`. |

## Producción AWS (2026-09-19 03:25)

Segundo intento: `-modo deploy` (sin rebuild). **Virginia y Oregon `UPDATE_COMPLETE`.**

Log: [`../investigacion/deploy_tld-onpremise-data - produccion/2026-09-19_tld-onpremise-data_prod.txt`](../investigacion/deploy_tld-onpremise-data%20-%20produccion/2026-09-19_tld-onpremise-data_prod.txt). Lectura: [`02-deploy-exitoso-2026-09-19.md`](../investigacion/deploy_tld-onpremise-data%20-%20produccion/02-deploy-exitoso-2026-09-19.md).

| | Virginia | Oregon |
|--|--|--|
| Stack `tld-alias-replica` | `UPDATE_COMPLETE` | `UPDATE_COMPLETE` |
| Lambdas ACH + mappings P2M | creadas | creadas (sin tabla `tld-ach-replicacion`; esa es Virginia-only) |
| Lambdas MAC | actualizadas al código de `#49` | actualizadas al código de `#49` |
| Log groups ACH | `CREATE_COMPLETE` | `CREATE_COMPLETE` |
| Secreto `ach-directo-v2/oracle` | **cargado** (confirmado usuario 2026-09-19) | **cargado** (confirmado usuario 2026-09-19) |

Los log groups del rollback **no** bloquearon.

**Git:** PR **[#50](https://github.com/Telered-Autopista/tld-onpremise-data/pull/50)** (`feature` → `develop`) lleva los ARN. Sin merge. `origin/main` sigue con `REEMPLAZAR`.

Fallo de la madrugada (mismo día): [`00-que-paso-2026-09-19.md`](../investigacion/deploy_tld-onpremise-data%20-%20produccion/00-que-paso-2026-09-19.md). Diagnóstico: [`01-lectura-diagnostico-2026-09-19.md`](../investigacion/deploy_tld-onpremise-data%20-%20produccion/01-lectura-diagnostico-2026-09-19.md).

## Git

PR **#49** trajo ARQ-256 a `main`. ARN prod: commit `d01128d`; PR **[#50](https://github.com/Telered-Autopista/tld-onpremise-data/pull/50)** a `develop` (abierto, sin merge). Traza: [`09-camino-ramas-develop-sandbox-qa.md`](./09-camino-ramas-develop-sandbox-qa.md).

## Snapshot operacional julio (Sandbox / QA premisa)

No se revalidó. [`ESTADO-ACTUAL.md`](./ESTADO-ACTUAL.md).
