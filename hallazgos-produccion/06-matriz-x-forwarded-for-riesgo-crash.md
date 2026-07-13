# HP-007 — Riesgo de crash si falta header `X-Forwarded-For`

| Campo | Valor |
|-------|--------|
| **ID** | HP-007 |
| **Fecha** | 2026-07-12 |
| **Estado** | confirmado (código estático) |
| **Severidad** | media |
| **Componente** | `tld-matriz` → `tld-validador-validar` |
| **Ámbito** | transversal |

---

## Resumen

Línea 22 accede a `event.headers["X-Forwarded-For"].replace(...)` sin comprobar que el header exista. Si falta → `TypeError` → `catch` → **550**. Además el valor calculado se **sobrescribe** en la línea siguiente (`ipn = between(...)`), por lo que la línea 22 es código muerto que solo aporta riesgo.

---

## Evidencia

- `produccion_real/tld-matriz/lambdas/tld-validador-validar/index.js` líneas 22-23.
- [`../produccion_real/01-tld-matriz-validador-validar.md`](../produccion_real/01-tld-matriz-validador-validar.md) §3.3

---

## Mejora propuesta

- Eliminar línea 22 o proteger con optional chaining / default.
- Documentar en informe como hardening de producción.
