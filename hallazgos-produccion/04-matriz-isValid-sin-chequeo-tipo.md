# HP-005 — `isValid` no valida el tipo de `idCanal`

| Campo | Valor |
|-------|--------|
| **ID** | HP-005 |
| **Fecha** | 2026-07-12 |
| **Estado** | confirmado (código + Newman) |
| **Severidad** | media |
| **Componente** | `tld-matriz` → `tld-validador-validar` |
| **Ámbito** | transversal |

---

## Resumen

`isValid` asume que `idCanal` es string y usa `.length`. Valores **number, boolean u object** truthy **no** se detectan como inválidos en matriz; el request se reenvía al validador y suele terminar en **550** (matriz) vs **401** u otro (validador directo).

---

## Comportamiento en producción (observado)

- Escenarios con `idCanal` number/boolean/object: MATRIZ → 550; VALIDADOR → códigos distintos (p. ej. 401).
- Coherente con la lógica de `isValid` en código.

---

## Comportamiento esperado

- Validación de formato de canal debería rechazar tipos no string con **400** antes de llamar al validador (alineado con espíritu de `isValid`).

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Código | `index.js` líneas 135-144 — `!body.idCanal \|\| (body.idCanal.length > 4 \|\| ...)` |
| Newman | Comparación MATRIZ/VALIDADOR en `comparar-prod-vs-dev` |
| Estudio | [`../produccion_real/01-tld-matriz-validador-validar.md`](../produccion_real/01-tld-matriz-validador-validar.md) §3.4 |

---

## Causa raíz

Falta `typeof body.idCanal === 'string'` (o equivalente) en `isValid`.

---

## Impacto

- Agujero de validación en frontera matriz.
- Comportamiento distinto según ruta de integración.

---

## Mejora propuesta

- Añadir chequeo de tipo en `isValid` (en dev / propuesta para prod).
- Mantener escenarios de prueba que cubran tipos incorrectos.

---

## Referencias

- Pregunta abierta en [`../Postman/comparar-prod-vs-dev/07-matriz-validacion-cuerpo-json.md`](../Postman/comparar-prod-vs-dev/07-matriz-validacion-cuerpo-json.md): ¿matriz debe validar JSON body?
