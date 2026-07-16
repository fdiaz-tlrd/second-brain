# Gates Dig — canales, path MATRIZ y mínimo R2P

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-16 (actualizado post-smoke VPN) |
| Fuentes | [`../Postman/canalesPruebas-dev/`](../Postman/canalesPruebas-dev/), env VCN |
| Datos R2P | [`../Postman/canalesPruebas-dev/datos-r2p-prueba-dev.md`](../Postman/canalesPruebas-dev/datos-r2p-prueba-dev.md) |
| Evidencia | [`19-smoke-matriz-0011-evidencia.md`](./19-smoke-matriz-0011-evidencia.md) |
| Estrategia | [`17-estrategia-newman-r2p-paridad-dig.md`](./17-estrategia-newman-r2p-paridad-dig.md) |

## Decisiones fijadas

| Tema | Valor |
|------|--------|
| Nivel | **Solo `MATRIZ`** |
| Path | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Par | **1008 CELEGATO → 1009 ASTRGATO** |
| Deudor | **`61009001`** (activo, banco ASTRGATO) — **confirmado** |
| Smoke `0011` | **OK** Dig (resultado 0 + codigoR2P) |

HD-005: HTTP MATRIZ = **200**; negocio en payload.

## Canales (resumen)

| idCanal | Rol feliz | 0012/0014 |
|---------|-----------|-----------|
| 1008 | Emisor | También tiene dummy `/r2p` en Dig (2026-07-16) |
| 1009 | Validador | dummy `/r2p` |
| 1012 | Validador alt. | dummy `/r2p` |
| 1013 / 1015 | Evitar como banco | URL producto `/dev/r2p` |

## Gates

| Gate | Estado |
|------|--------|
| Path MATRIZ + nivel | OK |
| Dummy `/r2p` en validador GATO | OK (1009; verificado en smoke) |
| Alias deudor Dig | **OK** — `61009001` |
| Smoke manual `0011` | **OK** — [`19`](./19-smoke-matriz-0011-evidencia.md) |
| Suite Newman R2P en generador | **Pendiente** (no existe aún) |
| Paridad `--codigo-fuente prod` vs `dev` | **Pendiente** |
| Deploy explícito prod-source vs cambios para comparar | **Pendiente** (depende del usuario) |

## Próximo

OK usuario → implementar **1** escenario feliz MATRIZ en `Postman/generador` (mínimo) → runs VPN etiquetados prod/dev.
