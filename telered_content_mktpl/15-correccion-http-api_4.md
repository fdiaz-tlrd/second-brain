# 15 — Corrección HTTP en `api_4.json` (VCN) vía generador

**Fecha:** 2026-07-13  
**Hallazgo:** [HP-008](../hallazgos-produccion/07-marketplace-api4-http-documentado-vs-real.md)  
**Implementación dev:** [HD-004](../hallazgos-desarrollo/03-marketplace-api4-correccion-http-generador.md)

---

## Problema

El OpenAPI de Marketplace (`tech_doc/api_4.json`) documentaba **HTTP 400** para errores en
`POST /validador/validar`. Producción (matriz) entrega **siempre HTTP 200** y el error va en el
body (`codigoError` / `resultado`). La tabla «Razones de Respuestas» usa números tipo 400, 404,
550 que son **códigos de negocio**, no HTTP — la doc no lo dejaba claro.

---

## Solución (generador OpenAPI)

Todo el cambio vive en **`telered_content_mktpl/generador-openapi/`** (no editar a mano el JSON
final salvo emergencia):

1. **Fragmentos** `fragmentos/vcn/paths.json` y `components.json`
2. **Plantillas HTML** en `plantillas/vcn/tags/`
3. Regenerar: `node generador-openapi/scripts/armar-vcn.js` → `tech_doc/api_4.json`

### Cambios contractuales documentales (intencionales)

| Antes (prod Marketplace main) | Después (generador) |
|------------------------------|---------------------|
| `responses.400` en validar | Solo `responses.200` |
| Schema `ResponseHTTPCode400` | `ErrorNegocioMatriz` con `descripcionError` |
| Tabla Razones sin aclarar | Nota: códigos ≠ HTTP |
| — | `oneOf`: `ResponseCifrado` \| `ErrorNegocioMatriz` en 200 |

---

## Relación con «preserve-contract»

La regla general del refactory es no romper lo que el cliente implementó. **Esta corrección alinea
la doc con el comportamiento real ya desplegado** (HTTP 200). No pide al cliente cambiar de 200 a
400; corrige documentación que sugería lo contrario. Ver
[`10-decisiones-reglas-refactory.md`](10-decisiones-reglas-refactory.md) §HTTP transporte.

`comparar-vcn.js` vs `tech_doc_baseline/` mostrará diferencias en `responses` — **esperado** tras
esta corrección.

---

## Retomo

- Repo: `telered_content_mktpl`, rama de trabajo del refactory (p. ej. `feature/Refactory`)
- Tras merge a `main` del marketplace, actualizar `produccion_real/telered_content_mktpl` si se
  necesita nueva fotografía prod.
- Pendiente futuro: misma clarificación HTTP en `api_6` / `api_7` si aplica (fuera de VCN).
