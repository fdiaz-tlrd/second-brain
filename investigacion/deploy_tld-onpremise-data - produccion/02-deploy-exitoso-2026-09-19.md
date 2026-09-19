# Deploy prod exitoso — 2026-09-19 ~03:25

Fuente: [`2026-09-19_tld-onpremise-data_prod.txt`](./2026-09-19_tld-onpremise-data_prod.txt).

Comando (sin rebuild; `samconfig` ya con ARN en disco del servidor):

```powershell
.\deployNewVersion.ps1 -modo deploy -repositorio tld-onpremise-data -ramaGit main -ambiente prod -esReversa no -hashCommit c8f54132cddc2b82a6b66b1bb13d9e155fb8ca9b
```

| Campo | Valor |
|-------|--------|
| Script | `C:\AWSdeploy\deployNewVersion.ps1` `-modo deploy` |
| HEAD / hash | `c8f5413` (`main`, PR #49) — **no** el commit de samconfig `d01128d` |
| Duración | 00:03:23 (03:25:28–03:28:52 hora servidor) |
| Log script | `C:\AWSdeploy\logs\pbmaplataforma\deploy-tld-onpremise-data-prod-20260919-032528.log` |

`-modo deploy` no hace git sync. Los ARN P2M del 2026-09-05 estaban en el `samconfig.toml` **del servidor**. En GitHub, `origin/main` sigue con `REEMPLAZAR`; los ARN versionados están en `feature/ARQ-256_Bajar_a_premisa_P2M` (`d01128d`).

## Resultado CloudFormation

| Región | Stack | Fin |
|--------|--------|-----|
| `us-east-1` | `tld-alias-replica` | **`UPDATE_COMPLETE`** — *Successfully created/updated stack* |
| `us-west-2` | `tld-alias-replica` | **`UPDATE_COMPLETE`** — igual |

Virginia: 6 lambdas ACH + mappings a streams P2M (ARN 2026-09-05) + `TablaAchReplicacion` + `SecretAchReplica` + log groups. Las 4 lambdas MAC **`UPDATE_COMPLETE`** (código de `#49` queda en prod; ya no es el rollback de las 07:10Z).

Oregon: mismo set ACH **salvo** `TablaAchReplicacion` (condición Virginia-only del template). Lambdas MAC también `UPDATE_COMPLETE`.

Los EventSourceMapping P2M salieron `CREATE_COMPLETE` (ya no *Stream not found*).

## Log groups

Todos `CREATE_COMPLETE` en ambas regiones (`P2m*`, `AchReintento`, `CanalAch`, `BitacoraAch`). El `DELETE_FAILED` + SCP del intento fallido **no** impidió el create: los grupos físicos no estaban (el `describe-log-groups` vacío del diagnóstico era eso).

## Secreto ACH

`SecretAchReplica` (`ach-directo-v2/oracle`) se creó vacío en el deploy. **Cargado en prod** (Virginia y Oregon) el mismo 2026-09-19 — confirmación del usuario.

## Git vs AWS

| Dónde | samconfig prod P2M |
|-------|---------------------|
| AWS (lo que se desplegó) | ARN 2026-09-05 |
| Servidor, archivo local | ARN (por eso este deploy) |
| `origin/main` | aún `REEMPLAZAR` |
| `origin/feature/...` `d01128d` | ARN 2026-09-05 |
| PR | **[#50](https://github.com/Telered-Autopista/tld-onpremise-data/pull/50)** `feature` → `develop` — **abierto, sin merge** |

Un `deployNewVersion` **`-modo full`** a `main` reinstala `REEMPLAZAR` hasta que #50 se promueva a `main`.

Antecedentes: [`00-que-paso-2026-09-19.md`](./00-que-paso-2026-09-19.md), [`01-lectura-diagnostico-2026-09-19.md`](./01-lectura-diagnostico-2026-09-19.md).
