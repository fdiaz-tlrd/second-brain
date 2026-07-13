# Índice de hallazgos — desarrollo

| ID | Título | Severidad | Componente | Estado | Doc |
|----|--------|-----------|------------|--------|-----|
| HD-001 | Matriz `tld-validador-validar`: HTTP 200 siempre (igual que prod) — regla intocable | crítica | `tld-matriz` / `tld-validador-validar` | confirmado (código) | [01-matriz-validador-validar-http-code.md](01-matriz-validador-validar-http-code.md) |
| HD-002 | Dev invoca validador por Lambda; lee `statusCode` downstream pero no lo expone al cliente | informativo | `tld-matriz` / `tld-validador-validar` | confirmado (código) | [01-matriz-validador-validar-http-code.md](01-matriz-validador-validar-http-code.md) §Dev vs prod |
| HD-003 | Mismos bugs heredados que prod (`error()`, `validatePlan`, `X-Forwarded-For`, `isValid`) | alta | `tld-matriz` / `tld-validador-validar` | confirmado (código) | [02-matriz-bugs-heredados-pendientes.md](02-matriz-bugs-heredados-pendientes.md) |
| HD-004 | Marketplace VCN: corrección HTTP 200 en doc vía generador OpenAPI | alta | `telered_content_mktpl` / `api_4` | implementado | [03-marketplace-api4-correccion-http-generador.md](03-marketplace-api4-correccion-http-generador.md) |
| HD-005 | Newman: HTTP Code esperado = 200 en `NIVEL_EJECUCION=MATRIZ` (VCN/P2P/P2M) | alta | `Postman/generador` | implementado | [04-newman-http-code-matriz-200.md](04-newman-http-code-matriz-200.md) |
| HD-006 | Escenario `1.2.9 validador` asumía máx 4; prod es máx 8 (TEST-MAL) + caminos SWIFT | media | `Postman/generador` (escenarios) | **corregido** | [05-escenario-validador-longitud-max8.md](05-escenario-validador-longitud-max8.md) |

---

## Pendiente de registrar

| Tema | Repo / área |
|------|-------------|
| HTTP / `codigoError` en `tld-validador-api` dev | `tld-validador-api` |
| HTTP / negocio en VCN directo | `tld-api-cuenta-nombre` |
| Run Newman `--codigo-fuente dev` vs prod (cuando exista) | Postman |

---

## Contraste con producción

| Tema | Prod (HP) | Dev (HD) |
|------|-----------|----------|
| Matriz HTTP siempre 200 | HP-003 | HD-001 |
| `idCanal` null → 550 | HP-001 | HD-003 (mismo bug hasta corregir) |
