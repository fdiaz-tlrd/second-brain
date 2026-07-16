# R2P Dig — meta de pulido (sin nuevas mejoras)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Estado | Plan escrito — **siguiente:** Fase 1 estudio de campo (cuando el usuario diga arrancar) |
| Repo | `tld-api-r2p` (`feature/ARQ-225_Refactory`) |
| Situación | Se modificó R2P **más allá** del dual consume. **No está probado.** |

## Meta

**Asegurar** que los cambios **ya aplicados** en Dig estén **correctos** (pulir lo necesario). Producto acabado respecto a esos cambios; el trabajo va por **iteraciones** definidas en el plan.

- Sí: plan/orden + estudio + fixes acotados.
- **No:** mejoras nuevas de otros repos.

## Base de arquitectura (no es “verificar después”)

El estudio de campo **es la base** antes de tocar código:

| Rol | Pieza probada / análoga |
|-----|-------------------------|
| Caller Invoke | `tld-validador-api/validar` → VCN (comprobado) — mismo caller hacia R2P |
| Producto → proxy | VCN → `tld-validador-proxy` (comprobado) — R2P Dig también → proxy |
| Prod R2P | `produccion_real/tld-api-r2p` solo lectura, anclar “antes” |

Tema layer/`tld-telered-lib`: se cierra **después** de estudiar VCN→proxy (ver plan Fase 2).

## Plan

[`04-plan-asegurar-dig.md`](./04-plan-asegurar-dig.md)

## Enlaces

- Retomo: [`00-estado-y-retomo.md`](./00-estado-y-retomo.md)
- Diffs previos: [`01-dig-vs-prod-invocacion-y-diferencias.md`](./01-dig-vs-prod-invocacion-y-diferencias.md)
- Import layer: [`02-import-tld-telered-lib-layer.md`](./02-import-tld-telered-lib-layer.md)
