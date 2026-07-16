# Diseño Newman R2P — alcance mínimo (vivo)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-16 |
| Estrategia | [`17`](./17-estrategia-newman-r2p-paridad-dig.md) |
| Gates / canales | [`18`](./18-gates-canales-matriz-r2p.md) |
| Nivel | **MATRIZ** únicamente |
| Path | `…/dev/validador/validar` (env VCN) |

## Meta

Paridad Dig prod-source vs cambios, set **mínimo**, entrada como canal REST vía matriz.

## Par canales propuesto

`1008` (CELEGATO) → `1009` (ASTRGATO, dummy `/r2p`). Alternativa validador: `1012`.

## Bloqueante a confirmar

¿Hay en Dig un **identificador deudor** (`6xxxxxxx`) activo en alias con `banco = ASTRGATO` (o TERAGATO)?  
Sin eso el `0011` feliz cae en **434** antes de ejercitar el proxy Dig.

## No hacer

Suite tipo VCN; arreglar api_7; otros niveles; Newman en Lenovo.
