# HP-003 — Matriz siempre responde HTTP 200; el resultado va en el body

| Campo | Valor |
|-------|--------|
| **ID** | HP-003 |
| **Fecha** | 2026-07-12 |
| **Estado** | confirmado |
| **Severidad** | informativo (diseño; relevante para pruebas e informe) |
| **Componente** | `tld-matriz` → `tld-validador-validar` |
| **Ámbito** | transversal |

---

## Resumen

La lambda `tld-validador-validar` en producción **nunca** devuelve un HTTP distinto de **200** desde el handler de negocio. Éxito y error se expresan en el JSON (`codigoError`, `descripcionError`, o body del validador). Esto no es un bug; es comportamiento de diseño que **debe** reflejarse en las pruebas y en el informe (no confundir HTTP 400 con `codigoError: 400`).

---

## Comportamiento en producción (observado)

- Run MATRIZ prod: **1263/1263** escenarios → `httpRealLambda = 200`.
- Validador directo (VALIDADOR): sí devuelve HTTP 4xx/5xx según caso.

---

## Comportamiento esperado

- Pruebas deben validar **HTTP del lambda objetivo** y **`codigoError` / negocio** por separado.
- Documentado en [`../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md`](../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md).

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Código | `produccion_real/tld-matriz/lambdas/tld-validador-validar/index.js` — todas las rutas `return` usan `statusCode: 200` |
| Newman | `2026-07-13T01-03-45Z_prod_MATRIZ_completo_por-escenario.json` — campo `httpRealLambda` |
| Estudio | [`../produccion_real/01-tld-matriz-validador-validar.md`](../produccion_real/01-tld-matriz-validador-validar.md) §1 |

---

## Causa raíz

Diseño intencional del handler: matización de respuestas al cliente de matriz.

---

## Impacto

- Clientes que solo miran HTTP status pueden interpretar errores de negocio como éxito.
- Comparar MATRIZ vs VALIDADOR requiere dos columnas (HTTP + negocio).

---

## Mejora / decisión para el informe

- Dejar documentado para stakeholders.
- Newman ya captura ambos (`httpRealLambda`, `recibidoNegocio`).
- **No** exigir HTTP 4xx en matriz salvo que se decida cambiar el contrato (cambio de producto, no solo dev).

---

## Referencias

- [`../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md`](../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md)
