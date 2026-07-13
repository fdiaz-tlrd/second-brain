# HD-004 — Corrección Marketplace VCN: HTTP 200 documentado (generador OpenAPI)

| Campo | Valor |
|-------|--------|
| **ID** | HD-004 |
| **Fecha** | 2026-07-13 |
| **Estado** | implementado (generador + `tech_doc/api_4.json` regenerado) |
| **Severidad** | alta |
| **Componente** | `telered_content_mktpl` / `generador-openapi` / VCN |
| **Hallazgo prod origen** | [HP-008](../hallazgos-produccion/07-marketplace-api4-http-documentado-vs-real.md) |

---

## Resumen

Se corrigió la documentación técnica VCN en el repo **`telered_content_mktpl`** mediante el
**generador OpenAPI** (`generador-openapi/`): se eliminó el HTTP **400** engañoso en
`POST /validador/validar`, se documentó **HTTP 200 siempre** y se separó transporte vs códigos de
negocio. Cambios en **fragmentos y plantillas**; salida regenerada con `armar-vcn.js` →
`tech_doc/api_4.json`.

---

## Qué se cambió (fuente del generador)

| Archivo | Cambio |
|---------|--------|
| `generador-openapi/fragmentos/vcn/paths.json` | Quitado `responses.400` en `/validador/validar` y método `0001`; `200` con `oneOf` (cifrado \| error negocio) y descripciones explícitas |
| `generador-openapi/fragmentos/vcn/components.json` | `ResponseHTTPCode400` → **`ErrorNegocioMatriz`** (`codigoError` + `descripcionError`, alineado a prod) |
| `plantillas/vcn/tags/validacion-cuenta-nombre.html` | Sección «HTTP de transporte vs códigos de negocio» |
| `plantillas/vcn/tags/razones-de-respuestas-interno-de-la-autopista-telered.html` | Nota: códigos de tabla ≠ HTTP |

**No se tocó** LADO B (Canal Validador) en esta iteración — HP-008 era la API matriz / Canal→Telered.

---

## Cómo regenerar

```bash
cd telered_content_mktpl
node generador-openapi/scripts/armar-vcn.js
```

Salida: `tech_doc/api_4.json`, `tech_doc_html/api_4.html`, preview en `_generated/`.

`comparar-vcn.js` contra `tech_doc_baseline/` **fallará** en paths/responses (cambio intencional de
documentación alineada a prod). No es regresión de contrato runtime — es corrección doc HP-008.

---

## Regla preservada

- **HTTP Code en prod:** sigue siendo 200 (intocable).
- **Códigos en tabla Razones:** siguen siendo códigos de **negocio**; la doc ahora lo dice claro.

---

## Referencias

- Generador: [`../../telered_content_mktpl/generador-openapi/README.md`](../../telered_content_mktpl/generador-openapi/README.md)
- Estudio agente: [`../telered_content_mktpl/15-correccion-http-api_4.md`](../telered_content_mktpl/15-correccion-http-api_4.md)
- HP-008: [07-marketplace-api4-http-documentado-vs-real.md](../hallazgos-produccion/07-marketplace-api4-http-documentado-vs-real.md)
