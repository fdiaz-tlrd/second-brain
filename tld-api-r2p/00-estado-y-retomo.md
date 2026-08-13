# R2P (`tld-api-r2p`) — estado y retomo

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-08-13 |
| **Código Dig** | `6fece92` (Fase 3) + suite Newman mínima + códigos catálogo (§1–§15) |
| **Smoke MATRIZ** | **OK** — [`19`](./19-smoke-matriz-0011-evidencia.md) |
| **Suite Newman** | Mínima `r2p` — run `dev` OK (`3483629` logs) |
| **Inventario resultados** | [`20-inventario-resultados-lambda-r2p.md`](./20-inventario-resultados-lambda-r2p.md) — Dig × prod × catálogo; **15 cambios aplicados** en `lambdas/r2p`; §9 también valida charset ISO en `nombreAcreedor` |
| **Datos Dig R2P** | [`../Postman/canalesPruebas-dev/datos-r2p-prueba-dev.md`](../Postman/canalesPruebas-dev/datos-r2p-prueba-dev.md) |
| **Pendiente (otros hilos)** | Paridad Dig prod-source vs cambios; **501** bitácora vs catálogo cifrado |

## Cómo retomar

1. Inventario de códigos: [`20`](./20-inventario-resultados-lambda-r2p.md).
2. Newman: [`17`](./17-estrategia-newman-r2p-paridad-dig.md) / [`18`](./18-gates-canales-matriz-r2p.md).
3. Dynamo Dig: PartiQL en [`../Postman/canalesPruebas-dev/partiql-dev.md`](../Postman/canalesPruebas-dev/partiql-dev.md).
