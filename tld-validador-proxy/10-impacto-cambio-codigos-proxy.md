# Impacto del cambio de códigos en `tld-validador-proxy/lambdas/proxy`

Migración de los valores de `statusCode` y `message` al catálogo definido en `08-catalogo-codigos-respuesta.md`.

El contrato `{ statusCode, message, datos }` no cambia. Solo cambian los valores.

---

## Valores hoy vs objetivo

| Hoy | Escenario (`app.js`) | Objetivo | `message` objetivo |
|-----|----------------------|----------|-------------------|
| `400` | JSON inválido (línea 71) | `500` | Error interno |
| `400` | Validación de entrada (línea 96) | `500` | Error interno |
| `404` | Canal no configurado (línea 138) | `500` | Error interno |
| `st` (variable) | Error servidor Dynamo (línea 150) | `500` | Error interno |
| `500` | Cifrado falla (línea 186) | `502` | Error en cifrado para el canal validador |
| `502` | Rechazo HTTP del validador — excepción (línea 265) | `509` | Error inesperado en el Canal Validador |
| `502` | Rechazo HTTP del validador — httpStatus ≥ 400 (línea 292) | `509` | Error inesperado en el Canal Validador |
| `502` | Cuerpo no utilizable (línea 309) | `509` | Error inesperado en el Canal Validador |
| `502` | Falta campo `respuesta` (línea 330) | `509` | Error inesperado en el Canal Validador |
| `502` | Descifrado falla (línea 349) | `406` | Error en descifrado canal validador |
| `502` | Respuesta descifrada no es JSON (línea 370) | `509` | Error inesperado en el Canal Validador |
| `500` | Excepción no controlada (línea 425) | `500` | Error interno |
| `0` | Éxito (línea 401) | `0` | Operación exitosa |

---

## Puntos de cambio en `app.js`

| Línea | Cambio |
|-------|--------|
| 71 | `responderError(…, 400)` → `500` |
| 96 | `responderError(…, 400)` → `500` |
| 138 | `responderError(…, 404)` → `500` |
| 150 | `responderError(…, st)` → `500` |
| 186 | `responderError(…, 500)` → `502` |
| 265 | `proxySalidaStatusCode: 502` → `509`, `responderError(…)` → `509` |
| 275, 292 | `proxySalidaStatusCode: 502` → `509`, `responderError(…, 502)` → `509` |
| 299–309 | `proxySalidaStatusCode: 502` → `509`, `responderError(…, 502)` → `509` |
| 319–330 | `proxySalidaStatusCode: 502` → `509`, `responderError(…, 502)` → `509` |
| 338–349 | `proxySalidaStatusCode: 502` → `406`, `responderError(…, 502)` → `406` |
| 359–370 | `proxySalidaStatusCode: 502` → `509`, `responderError(…, 502)` → `509` |

---

## `canal.js`

Línea 22 devuelve `statusCode: 401` cuando el canal no se encuentra. Hoy `app.js` lo sobreescribe a `404`; con el cambio pasa a `500`. Puede limpiarse para coherencia (devolver `500` directo) o dejarlo y que `app.js` lo convierta.

---

## `response.js` — `mapearHttpStatusDesdeHomologado`

Mapea `statusCode` al HTTP de API Gateway: `0→200`, `400–599→mismo`. Con el catálogo nuevo solo llegan `0`, `406`, `500`, `502`, `509`, `599` — todos caen en el rango válido. No requiere cambio.

---

## `proxySalidaError.js`

Hoy `mensajeErrorParaCliente` resuelve `message` con el texto diagnóstico detallado. Para que `message` sea el texto fijo del catálogo (ej. "Error interno"), se debe cambiar `responderError` para que pase el `message` del catálogo directamente a `response.homologar` en vez de usar `mensajeErrorParaCliente`. El detalle diagnóstico queda en `datos`.

---

## Resumen

- **Archivos a tocar:** `app.js` (principal), opcionalmente `canal.js`.
- **~12 líneas** donde se cambia el valor numérico del código.
- **El contrato no cambia.** Solo los valores de `statusCode` y `message`.
