# tld-onpremise-data — estado y retomo

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-09-16 |
| **Repo** | `tld-onpremise-data` (solo lectura en esta sesión; **no** se hizo pull, commit ni edit) |
| **Rama de trabajo** | `feature/ARQ-256_Bajar_a_premisa_P2M` |
| **Tip origin (trabajo)** | `79631e3` — *Ajusta carga P2M para conversión de fechas TIMESTAMP desde JSON* |
| **Tip origin/qa** | `160faf3` — Merge PR **#48** (`sandbox` → `qa`) |
| **Árbol trabajo = develop = sandbox = qa** | Sí (`fb36095`) |
| **PRs abiertos** | Ninguno |

## Conclusión (2026-09-16)

El cambio que está en **QA** es el del **último PR de la rama de trabajo**: [#46](https://github.com/Telered-Autopista/tld-onpremise-data/pull/46) (Felix Diaz, 2026-07-17/20). Ese PR se promovió el mismo día:

`feature` → `develop` (**#46**) → `sandbox` (**#47**) → `qa` (**#48**).

`git diff` entre `origin/feature/ARQ-256_Bajar_a_premisa_P2M`, `origin/develop`, `origin/sandbox` y `origin/qa` está **vacío**. QA no tiene archivos distintos a la punta de la rama de trabajo.

Traza completa: [`09-camino-ramas-develop-sandbox-qa.md`](./09-camino-ramas-develop-sandbox-qa.md).

## Checkout local (Lenovo)

`HEAD` local de la feature está en `4a2138f` (**2 commits atrás** de `origin/feature`): faltan `139be98` (PR #43, `template.yaml`) y `79631e3` (PR #46, RTP P2M cuenta). El working tree está limpio. No se hizo `git pull`.

## `main` no tiene este trabajo

`origin/main` sigue en `afd53f7` (PR **#35** `qa` → `main`, 2026-07-03). Las promociones ARQ-256 a QA de julio 10–20 **no** bajaron a `main`.

## Operación Sandbox / premisa (julio 2026)

El snapshot de deploy y scripts Oracle **no** se revalidó en esta sesión. Sigue en [`ESTADO-ACTUAL.md`](./ESTADO-ACTUAL.md) (consolidación 2026-07-10).
