# HP-006 — `validatePlan()` y `respEventBus` no definidos (código muerto hoy, mina mañana)

| Campo | Valor |
|-------|--------|
| **ID** | HP-006 |
| **Fecha** | 2026-07-12 |
| **Estado** | confirmado (código estático) |
| **Severidad** | media |
| **Componente** | `tld-matriz` → `tld-validador-validar` |
| **Ámbito** | transversal |

---

## Resumen

En el `catch` del handler hay un bloque que llama a `validatePlan(...)` y asigna `respEventBus` sin declarar. Hoy **no se ejecuta** porque `subscriptionValue` nunca se asigna. Si en el futuro se activa esa rama, la lambda lanzaría `ReferenceError` **dentro del catch** → respuesta **HTTP 502** no controlada.

---

## Evidencia

- `produccion_real/tld-matriz/lambdas/tld-validador-validar/index.js` ~líneas 16, 76-78.
- [`../produccion_real/01-tld-matriz-validador-validar.md`](../produccion_real/01-tld-matriz-validador-validar.md) §3.2

---

## Mejora propuesta

- Eliminar bloque muerto o implementar `validatePlan` correctamente antes de usar `subscriptionValue`.
- Incluir en informe como deuda técnica / riesgo latente.
