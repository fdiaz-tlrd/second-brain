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

## Hallazgo prod enlazado

- [HP-001 / HP-002](../hallazgos-produccion/01-matriz-idCanal-null-vacio-responde-550.md) — `idCanal` null/`""` → 550 (confirmado CloudWatch en prod; dev tiene el mismo código de trace + `error()`).

---

## Mejora en dev (sin romper HTTP)

1. Sustituir `error()` por `log()` o eliminar la llamada que lanza.
2. Ejecutar `isValid` **antes** de `guardarTrace`, o no indexar `canal` null en trace.
3. Endurecer `isValid` con chequeo de tipo.
4. Cualquier fix de `codigoError` → validar con Newman `--codigo-fuente dev` y comparar body, **no** HTTP de matriz.

---

## Referencias

- [../produccion_real/01-tld-matriz-validador-validar.md](../produccion_real/01-tld-matriz-validador-validar.md)
