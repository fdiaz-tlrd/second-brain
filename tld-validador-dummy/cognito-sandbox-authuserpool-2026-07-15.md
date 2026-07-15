# tld-validador-dummy — Cognito AuthUserPool sandbox (us-east-1)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Estado | Fix en `samconfig.toml` aplicado 2026-07-15; **pendiente** redeploy sandbox para que la lambda tome el pool |
| Repo | `tld-validador-dummy` |
| Archivo | `samconfig.toml` perfil `[sandbox]` |

## Problema

En **sandbox us-east-1**, la lambda `tld-dummy-authorize` tiene `COGNITO_USER_POOL_ID` = `us-east-1_RhPfC9nXM`, pero el app client `5vt3afsffb9igv79qts7jddhqc` pertenece al pool **`us-east-1_8kkM93LlR`** (`tld-matriz-usuarios`).

Eso desaline pool ↔ client (issuer / claims).

## Evidencia consola (captura 2026-07-15)

### Dev — OK

| Fuente | Valor |
|--------|-------|
| Lambda `tld-dummy-authorize` env | `COGNITO_USER_POOL_ID=us-east-1_d0IcP4EV2` · `COGNITO_APP_CLIENT_ID=7cg4g8vorirlhelebcriqnj95a` |
| Cognito app client | `AuthUserPoolClient-A4FMEMDRKOdc` → `7cg4g8vorirlhelebcriqnj95a` |
| Pool `tld-matriz-usuarios` | `us-east-1_d0IcP4EV2` |

`samconfig` `[dev]`: solo override `AuthUserPoolClient`; el pool usa default del `template.yaml` (`us-east-1_d0IcP4EV2`) — coherente.

### Sandbox us-east-1 — mal

| Fuente | Valor |
|--------|-------|
| Lambda env (desplegado) | `COGNITO_APP_CLIENT_ID=5vt3afsffb9igv79qts7jddhqc` · **`COGNITO_USER_POOL_ID=us-east-1_RhPfC9nXM`** (incorrecto) |
| Cognito app client | `AuthUserPoolClient-uHEQX7o8iCeK` → `5vt3afsffb9igv79qts7jddhqc` en pool **`us-east-1_8kkM93LlR`** |
| Pool `tld-matriz-usuarios` (east-1) | `us-east-1_8kkM93LlR` |

### Sandbox Oregon (us-west-2) — OK con lo visto

| Fuente | Valor |
|--------|-------|
| Lambda env | client `4dv36k4icokkdles9ppprfgb1t` · pool `us-west-2_31e4dr9E0` |
| Cognito | mismo client en pool `us-west-2_31e4dr9E0` |
| `samconfig` `[sandbox-oregon]` | `AuthUserPool=\"us-west-2_31e4dr9E0\"` — coincide |

## Fix aplicado (repo)

En `samconfig.toml` perfil `[sandbox]`:

`AuthUserPool` = `us-east-1_8kkM93LlR` (antes `us-east-1_RhPfC9nXM`).

## Pendiente runtime

1. Redeploy sandbox para que la lambda tome el pool nuevo.
2. Verificar env de `tld-dummy-authorize` en us-east-1: pool = `us-east-1_8kkM93LlR` y client = `5vt3afsffb9igv79qts7jddhqc`.

**No** tocar `[dev]` ni `[sandbox-oregon]` por este hallazgo.
