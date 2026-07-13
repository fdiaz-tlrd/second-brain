# HD-003 — Bugs heredados en dev `tld-validador-validar` (misma base que prod)

| Campo | Valor |
|-------|--------|
| **ID** | HD-003 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código) |
| **Severidad** | alta |
| **Componente** | `tld-matriz` / `tld-validador-validar` |
| **Repo dev** | `tld-matriz/lambdas/tld-validador-validar/index.js` |

---

## Resumen

El código dev **conserva los mismos bugs** que producción en validación/trace, salvo el cambio arquitectónico axios → Lambda invoke. Las correcciones de negocio (`codigoError`) pueden hacerse en dev; el HTTP debe permanecer 200.

---

## Bugs presentes en dev (igual que prod)

| Bug | Línea dev | Efecto |
|-----|-----------|--------|
| `error()` no definida | 69, 114 | Si `guardarTrace` falla → `ReferenceError` → catch → **550** (HTTP sigue 200) |
| `validatePlan()` / `respEventBus` | 131 | Mina latente si `subscriptionValue` se activa |
| `X-Forwarded-For` sin guard | 58 | `TypeError` posible → 550 |
| `isValid` sin tipo | 188-197 | number/boolean/object pasan validación matriz |

---

## Mejora en dev (sin romper HTTP)

1. Sustituir `error()` por `log()` o eliminar la llamada que lanza.
2. Ejecutar `isValid` **antes** de `guardarTrace`, o no indexar `canal` null en trace.
3. **HP-009 (acordado jul-2026):** validación preventiva de formato `idCanal` → 400 antes de lookup BD (espacios, caracteres prohibidos, trim vacío). Test Newman mantiene 400; corrida prod diverge hasta fix en dev.

---

## Hallazgos prod enlazados (bloque 1.1 idCanal — acordado)

| Sub-bloque | Hallazgo | Test |
|------------|----------|------|
| 1.1-A (null, vacío, tipos) | [HP-001/002](../hallazgos-produccion/01-matriz-idCanal-null-vacio-responde-550.md), [HP-005](../hallazgos-produccion/04-matriz-isValid-sin-chequeo-tipo.md) | Esperado **400** fijo |
| 1.1-B (formato inválido) | [HP-009](../hallazgos-produccion/08-matriz-idCanal-formato-invalido-responde-401.md) | Esperado **400** fijo |

Revisión: [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 1.1.

---

3. Endurecer `isValid` con chequeo de tipo (HP-005).
4. Cualquier fix de `codigoError` → validar con Newman `--codigo-fuente dev` y comparar body, **no** HTTP de matriz.

---

## Referencias

- [../produccion_real/01-tld-matriz-validador-validar.md](../produccion_real/01-tld-matriz-validador-validar.md)
