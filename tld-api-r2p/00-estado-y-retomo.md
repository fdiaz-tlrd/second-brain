# R2P (`tld-api-r2p`) — estado y retomo

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-07-16 |
| **Código Dig** | `6fece92` pusheado — Fase 3 cerrada |
| **Smoke MATRIZ** | **OK** — [`19`](./19-smoke-matriz-0011-evidencia.md) (`61009001`, 1008→1009) |
| **Suite Newman** | **OK mínima** — `node run-newman.js r2p --codigo-fuente prod\|dev` (VPN); fuente `Postman/generador/R2P Escenarios error/` |
| **Datos Dig R2P** | [`../Postman/canalesPruebas-dev/datos-r2p-prueba-dev.md`](../Postman/canalesPruebas-dev/datos-r2p-prueba-dev.md) |
| **Pendiente** | Paridad Dig: deploy prod-source + run `prod`, deploy cambios + run `dev`, `comparar-runs.js` |

## Cómo retomar

1. Suite: armar `node armar-coleccion.js config-r2p.json` si se editan JSON; Newman solo en VPN.
2. Estrategia paridad: [`17`](./17-estrategia-newman-r2p-paridad-dig.md) / gates [`18`](./18-gates-canales-matriz-r2p.md).
3. Dynamo Dig: pedir al usuario con PartiQL de [`../Postman/canalesPruebas-dev/partiql-dev.md`](../Postman/canalesPruebas-dev/partiql-dev.md) — no versionar dumps grandes en `notas-sueltas`.
