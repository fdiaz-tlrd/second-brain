# HP-008 — Marketplace `api_4.json` documenta HTTP 400; producción entrega siempre HTTP 200

| Campo | Valor |
|-------|--------|
| **ID** | HP-008 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (OpenAPI prod + código/runtime matriz) |
| **Severidad** | **alta** (documentación engañosa para integradores) |
| **Componente** | Marketplace VCN — `telered_content_mktpl/tech_doc/api_4.json` |
| **Ámbito** | VCN |

---

## Resumen

La documentación publicada en el Marketplace para VCN (`api_4.json`, rama `main` en
`produccion_real/telered_content_mktpl`) declara en OpenAPI que `POST /validador/validar` puede
responder **HTTP 400** ante error. **Producción real (matriz) siempre responde HTTP 200** y pone
el error en el body (`codigoError` / `descripcionError`, o `resultado` dentro del payload
cifrado). No es una “mentira” intencional, pero **sí es un hallazgo**: la doc mezcla **códigos de
negocio** (400, 401, 404 en la tabla “Razones de Respuestas”) con **códigos HTTP** del bloque
`responses` de OpenAPI. Un integrador que implemente según el status HTTP quedará mal integrado.

**Regla acordada:** no cambiar HTTP 200 en producción; sí se pueden mejorar los códigos **dentro
del JSON** con sustento en Marketplace. La doc debe alinearse a eso, no al revés.

---

## Qué dice el Marketplace (`api_4.json`)

### OpenAPI — `POST /validador/validar` (cifrado)

```json
"responses": {
  "200": { "description": "Petición procesada correctamente", ... },
  "400": { "description": "Error en la petición", ... }
}
```

Líneas ~155-176.

### OpenAPI — método lógico `0001` (`/validador/validar ` con espacio)

- **200:** *"Debe de evaluar el campo `resultado` para si el resultado fue satisfactorio o no."*
  (correcto en espíritu: el éxito/error va en el body).
- **400:** schema `ResponseHTTPCode400` con `codigoError` y `mensajeError`.

Líneas ~199-219.

### Schema `ResponseHTTPCode400` (líneas ~290-303)

- Nombre implica **HTTP 400**.
- `codigoError`: *"Código de respuesta generado por el servicio… (ver Razones de Respuestas)"* —
  en la práctica es **código de negocio**, no HTTP.
- Campo documentado `mensajeError`; producción matriz usa **`descripcionError`** (otra discrepancia menor).

### Tabla “Razones de Respuestas: Interno de la autopista (Telered)”

Lista códigos **0, 400, 401, 402, 404, 405, 406, 412, 413, 418, 500, 504, 509, 550, 599, 999**
en columna **“CÓDIGO”** sin aclarar que son códigos de **aplicación** (`codigoError` / `resultado`),
no status HTTP de la respuesta API.

---

## Qué hace producción real

| Capa | Comportamiento | Evidencia |
|------|----------------|-----------|
| HTTP hacia cliente (matriz) | **Siempre 200** en handler de negocio | Código `produccion_real/tld-matriz/.../index.js`; Newman 1263/1263 |
| Error de formato canal/validador | HTTP **200** + `{ codigoError: 400, descripcionError: "…" }` | Run MATRIZ, CloudWatch |
| Error validador / interno | HTTP **200** + `{ codigoError: 550, … }` o passthrough body | HP-003, HP-004 |
| Éxito VCN (tras descifrado) | HTTP **200** + `respuestas[].resultado` (0 = ok) | Schema `Response0001` alinea **negocio**; HTTP sigue 200 |

Hallazgo código matriz: [HP-003](02-matriz-http-200-siempre.md).

---

## Contradicción concreta

| Integrador lee… | Espera | Recibe en prod |
|-----------------|--------|----------------|
| OpenAPI `responses.400` | HTTP **400** en error | HTTP **200** + error en JSON |
| Tabla “CÓDIGO” 404 | Puede interpretar HTTP 404 | HTTP **200** + `codigoError`/`resultado` **404** en body |
| Descripción 200 del `0001` | Evaluar `resultado` en body | **Coincide** con prod |

La doc es **parcialmente coherente** (nota sobre `resultado` en 200) y **parcialmente incorrecta**
(bloque HTTP 400 y nombre `ResponseHTTPCode400`).

---

## Impacto

- Clientes que branch-ean por `response.status === 400` **no detectan errores** (siempre reciben 200).
- Riesgo reputacional y de soporte: “la doc dice 400 y yo recibo 200”.
- **No** justifica cambiar prod a HTTP 400 — eso sería ruptura de contrato (ver
  [HD-001](../hallazgos-desarrollo/01-matriz-validador-validar-http-code.md)).
- **Sí** justifica corregir la **documentación** del Marketplace (presentación/contrato documental),
  sin alterar el HTTP real del servicio.

---

## Mejora propuesta (documentación, no código prod)

1. En `responses` de `/validador/validar`: dejar **solo 200** (y códigos HTTP de infra si aplica:
   502/504 de gateway — documentar aparte si existen).
2. Renombrar o eliminar `ResponseHTTPCode400`; usar p. ej. `ErrorNegocioMatriz` con `codigoError` +
   `descripcionError`.
3. En “Razones de Respuestas”: titular explícitamente **“Código de negocio (no HTTP)”** o
   **“`codigoError` / `resultado`”**.
4. Añadir párrafo fijo: *“Todas las respuestas de negocio de este endpoint se entregan con HTTP 200;
   evalúe `codigoError` (respuesta en claro en matriz) o descifre `respuesta` y evalúe `resultado`.”*
5. Alinear nombre de campo: `descripcionError` vs `mensajeError` según lo que prod envía hoy.

Trabajo relacionado en curso: `second-brain/telered_content_mktpl/` (generador OpenAPI, modo
preserve-contract). Esta ficha alimenta el informe de mejoras.

---

## Qué NO es este hallazgo

- **No** pedir cambiar producción a HTTP 4xx.
- **No** confundir con mejorar el **valor** de `codigoError`/`resultado` (p. ej. 404 = “Validador no
  existe”) — eso es mejora legítima **dentro del JSON** con sustento en la misma tabla de razones.

---

## Referencias

| Recurso | Ruta |
|---------|------|
| OpenAPI Marketplace prod | `produccion_real/telered_content_mktpl/tech_doc/api_4.json` |
| Matriz prod HTTP 200 | [02-matriz-http-200-siempre.md](02-matriz-http-200-siempre.md) |
| Newman HTTP vs negocio | [../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md](../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md) |
| Estudio previo api_4 | [../telered_content_mktpl/02-vcn-api_4.md](../telered_content_mktpl/02-vcn-api_4.md) |
| Regla dev HTTP intocable | [../hallazgos-desarrollo/01-matriz-validador-validar-http-code.md](../hallazgos-desarrollo/01-matriz-validador-validar-http-code.md) |
