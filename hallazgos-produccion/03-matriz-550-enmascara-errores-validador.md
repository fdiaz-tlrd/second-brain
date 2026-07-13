# HP-004 — Matriz colapsa errores del validador a `550 "Error inesperado"`

| Campo | Valor |
|-------|--------|
| **ID** | HP-004 |
| **Fecha** | 2026-07-12 |
| **Estado** | confirmado |
| **Severidad** | media |
| **Componente** | `tld-matriz` → `tld-validador-validar` |
| **Ámbito** | transversal |

---

## Resumen

Cuando el validador downstream responde con HTTP distinto de 2xx y distinto de 400, matriz **no** reenvía el body del validador: responde **`codigoError 550 "Error inesperado"`**. Errores distintos (401, 502, timeout, etc.) quedan **indistinguibles** en la ruta MATRIZ. En ruta VALIDADOR directa sí se ven los códigos reales.

---

## Comportamiento en producción (observado)

- Comparación 3 columnas: **8 escenarios** donde el **conjunto** de códigos recibidos difiere entre MATRIZ y VALIDADOR (mismo input).
- Ejemplo típico: VALIDADOR → 401/502; MATRIZ → 550.

---

## Comportamiento esperado

- Depende del contrato con el cliente de matriz. Si el cliente solo ve matriz, pierde granularidad del validador.
- Para pruebas: la ruta cliente real es **Matriz → Validador → VCN**; hay escenarios donde matriz **altera** el resultado respecto a validador solo.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Código | `index.js` catch: no-400 → `{ codigoError: 550, descripcionError: "Error inesperado" }` |
| Newman | Runs `prod_MATRIZ` vs `prod_VALIDADOR` |
| Tabla | [`../Postman/comparar-prod-vs-dev/recopilacion/TABLA-diferencias-esperado-matriz-validador.md`](../Postman/comparar-prod-vs-dev/recopilacion/TABLA-diferencias-esperado-matriz-validador.md) |
| Nota arquitectura | [`../Postman/comparar-prod-vs-dev/07-matriz-validacion-cuerpo-json.md`](../Postman/comparar-prod-vs-dev/07-matriz-validacion-cuerpo-json.md) |

---

## Causa raíz

Lógica del `catch` en handler matriz: solo hace passthrough explícito cuando `e.response.status === 400`.

---

## Impacto

- Diagnóstico y soporte más difícil vía matriz.
- Pruebas que comparan VALIDADOR vs MATRIZ deben documentar que la diferencia puede ser **por diseño de matriz**, no bug del validador.

---

## Mejora propuesta

- Para informe: distinguir “enmascaramiento por diseño” vs “bug”.
- Posible mejora futura: passthrough de más códigos HTTP del validador o mapeo explícito (decisión de producto).

---

## Referencias

- [`../produccion_real/01-tld-matriz-validador-validar.md`](../produccion_real/01-tld-matriz-validador-validar.md) §2
