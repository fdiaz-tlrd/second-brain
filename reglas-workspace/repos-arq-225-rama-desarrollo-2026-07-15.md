# Repos ARQ-225 — rama feature y rama desarrollo

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Tema Cognito dummy | **Pausado** — retoma cuando el usuario confirme redeploy sandbox |
| Tema activo | PRs creados (solo apertura, **nunca merge** por el agente) |

## PRs abiertos 2026-07-15 (sin merge)

| Repo | Base | PR |
|------|------|-----|
| tld-matriz | develop | https://github.com/Telered-Autopista/tld-matriz/pull/110 |
| tld-validador-api | develop | https://github.com/Telered-Autopista/tld-validador-api/pull/79 |
| tld-api-cuenta-nombre | develop | https://github.com/Telered-Autopista/tld-api-cuenta-nombre/pull/87 |
| tld-api-alias | dev | https://github.com/Telered-Autopista/tld-api-alias/pull/149 |
| tld-api-r2p | develop | https://github.com/Telered-Autopista/tld-api-r2p/pull/44 |
| tld-api-p2m | develop | https://github.com/Telered-Autopista/tld-api-p2m/pull/53 |
| tld-preg-seguridad | dev | https://github.com/Telered-Autopista/tld-preg-seguridad/pull/48 |
| tld-api-qrpayment | develop | https://github.com/Telered-Autopista/tld-api-qrpayment/pull/9 |
| tld-validador-proxy | develop | https://github.com/Telered-Autopista/tld-validador-proxy/pull/10 |
| tld-validador-dummy | dev | https://github.com/Telered-Autopista/tld-validador-dummy/pull/90 |

Head en todos: `feature/ARQ-225_Refactory`. El agente **no** hace merge.

## Rama actual (local, Lenovo)

Los **10** están en `feature/ARQ-225_Refactory` (verificado 2026-07-15).

| Repo | En `feature/ARQ-225_Refactory` |
|------|-------------------------------|
| tld-matriz | Sí |
| tld-validador-api | Sí |
| tld-api-cuenta-nombre | Sí |
| tld-api-alias | Sí |
| tld-api-r2p | Sí |
| tld-api-p2m | Sí |
| tld-preg-seguridad | Sí |
| tld-api-qrpayment | Sí |
| tld-validador-proxy | Sí |
| tld-validador-dummy | Sí |

## Rama desarrollo (`origin`)

| Repo | Rama desarrollo | Notas |
|------|-----------------|-------|
| tld-matriz | `develop` | También existe `prod-a-dev` (otro uso) |
| tld-validador-api | `develop` | También `prod-a-dev` |
| tld-api-cuenta-nombre | `develop` | También `prod-a-dev` |
| tld-api-alias | `dev` | También `prod-a-dev` |
| tld-api-r2p | `develop` | |
| tld-api-p2m | `develop` | |
| tld-preg-seguridad | `dev` | |
| tld-api-qrpayment | `develop` | |
| tld-validador-proxy | `develop` | |
| tld-validador-dummy | `dev` | `origin/HEAD` → `origin/dev` |

### Resumen

- **`develop`:** matriz, validador-api, cuenta-nombre, r2p, p2m, qrpayment, proxy (7)
- **`dev`:** alias, preg-seguridad, dummy (3)
