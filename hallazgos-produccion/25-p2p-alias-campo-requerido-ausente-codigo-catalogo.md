# HP-025 — P2P alias: campo requerido ausente devuelve código de catálogo en vez de 419

| Campo | Valor |
|-------|--------|
| **ID** | HP-025 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (Newman prod MATRIZ) — **se corrige en dev** |
| **Severidad** | media |
| **Componente** | `tld-api-alias` / `lambdas/alias` (validaciones por método) |
| **Ámbito** | P2P — métodos 0004, 0006, 0007, 0008 |
| **Veredicto** | **PROD-MAL** |

---

## Resumen

Cuando falta `identificador` o `tipoIdentificador` en parámetros de método, el esperado es **419**
(«campos requeridos»). Producción devuelve códigos de **catálogo / negocio** — **430**, **407** u
**408** («no existe», etc.) — porque valida existencia en catálogo **antes** de detectar ausencia del
campo.

**8 escenarios únicos** (propiedad ausente en identificador / tipoIdentificador por método).

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `2026-07-13T09-47-19Z` — `c1de7ef` |
| Patrones | 419 → 430 (0004), 419 → 408 (0006), 419 → 407 (0007/0008) |
| Doc | [`13-revision-codigos-respuesta-p2p.md`](../Postman/comparar-prod-vs-dev/13-revision-codigos-respuesta-p2p.md) Bloque B.3 |

---

## Mejora en dev

Orden de validación: **requerido / tipo** (419) antes de lookup en catálogo.
