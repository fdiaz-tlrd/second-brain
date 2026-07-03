# Contrato de salida — `tld-validador-proxy/lambdas/proxy`

Estudio del contrato que devuelve el handler `app.lambdaHandler`.

**Fuente:** solo `tld-validador-proxy/lambdas/proxy/` (`app.js`, `lib/response.js`, `lib/proxySalidaError.js`, `lib/canal.js`).

---

## 1. Forma del contrato (homologado)

Toda salida controlada pasa por `response.homologar(statusCode, message, datos)`:

```json
{
  "statusCode": <número>,
  "message": "<string>",
  "datos": <objeto | null>
}
```

| Campo | Rol |
|-------|-----|
| `statusCode` | Código de resultado del proxy. `0` = éxito. Otros valores = error. |
| `message` | Texto para el invocador. En error prioriza `errorInterpretacionProxy` (`proxySalidaError.js` L24–39). |
| `datos` | En **éxito**: respuesta de negocio descifrada del Canal Validador. En **error**: diagnóstico (`datosErrorDesdeFilaTelemetria`). |

---

## 2. Cómo llega al invocador

`response.salidaLambda(event, homologado)` (`response.js`):

| Entrada | Salida |
|---------|--------|
| **Invoke directo** (evento sin API Gateway) | El objeto homologado tal cual. |
| **API Gateway** (`requestContext` con `apiId`, `http` o `domainName`; o `version === "2.0"`) | `{ statusCode: HTTP, headers, body: JSON.stringify(homologado) }`. |

Mapeo HTTP ← homologado (`mapearHttpStatusDesdeHomologado`):

| `statusCode` homologado | HTTP status |
|-------------------------|-------------|
| `0` | `200` |
| `400`–`599` | mismo número |
| otro | `200` |

El invocador por API Gateway debe leer **`statusCode` dentro del `body` JSON**, no solo el HTTP status de la línea (coinciden cuando el homologado es 0 o 400–599).

---

## 3. Campo principal para el consumidor

**`statusCode` en la raíz del homologado.**

- `0` → proxy terminó bien; negocio en `datos`.
- `≠ 0` → fallo del proxy; detalle en `datos` (si hay).

En errores, `datos.resultado` discrimina el tipo de fallo. Hoy **no** es un catálogo numérico formal; es un string interno que ya usa `app.js`.

---

## 4. Catálogo de salidas (todas las ramas de `app.js`)

### 4.1 Éxito

| `statusCode` | `resultado` (solo telemetría; no va en `datos` de éxito) | Fase | Disparador |
|--------------|----------------------------------------------------------|------|------------|
| `0` | `exito` | `completo` | Canal respondió HTTP &lt; 400, cuerpo con `respuesta` cifrada, descifrado y JSON válido (`app.js` L373–401). |

**`datos` en éxito:** objeto JSON parseado de la respuesta descifrada del Canal Validador (contenido de negocio; forma depende del validador).

---

### 4.2 Errores de entrada — `statusCode` 400

| `resultado` | `ultimaFase` | Disparador |
|-------------|--------------|------------|
| `error_json_body` | `parse_body` | Cuerpo no es JSON válido (`app.js` L58–71). |
| `error_validacion_entrada` | `validacion` | Falta `idCanal`, `validador`, `peticion`, `idPeticion`, `metodo` o `solicitudes[]` (`app.js` L76–96, `mensajeValidacionEntrada`). |

`datos` puede incluir: `idCanalOrigen`, `validadorDestino`, `metodo`, `idPeticion`, `resultado`, `ultimaFase`, `proxySalidaStatusCode`, `proxySalidaMensaje`, `errorInterpretacionProxy`.

---

### 4.3 Errores de canal (DynamoDB) — `statusCode` 404 o 500

Origen: `getCanal()` (`canal.js`). El proxy traduce antes de responder.

| `statusCode` homologado | `resultado` | `ultimaFase` | Origen en `canal.js` |
|-------------------------|-------------|--------------|----------------------|
| `404` | `error_canal_no_configurado` | `dynamo_canal` | Canal no encontrado (`statusCode: 401` interno → proxy responde **404**; `app.js` L128–140). |
| `500` | `error_canal_servidor` | `dynamo_canal` | Excepción al consultar/enriquecer canal (`canal.js` L42–48; `app.js` L142–152). |

`datos` puede incluir `detalleOrigen` si `canalBD.datos` es objeto (spread en `datosExtra`).

---

### 4.4 Error de cifrado de petición — `statusCode` 500

| `resultado` | `ultimaFase` | Disparador |
|-------------|--------------|------------|
| `error_cifrado_peticion` | `cifrado` | `operacionesPaquete.cerrarPaquete` devuelve `null` (`app.js` L177–186). |

---

### 4.5 Errores al invocar al Canal Validador (`validar()` lanza)

| `statusCode` | `resultado` | `ultimaFase` | Cuándo |
|--------------|-------------|--------------|--------|
| `500` | `error_validador_http` | `validador_http` | Fallo de transporte o excepción sin HTTP ≥ 400 del validador: timeout (`ETIMEDOUT`), DNS, TLS, URL no resuelta, token vacío, etc. (`app.js` L231–265). |
| `502` | `error_validador_rechazo_http` | `auth_proveedor` | Misma rama `catch`, pero `validadorHttpStatus ≥ 400` (p. ej. auth dinámica rechazada con HTTP de error). |

**Timeout en el POST al Canal Validador** (`urlValidador`): entra en `error_validador_http` / `500`. Típicamente `datos.errorCodigoTransporte` = `"ETIMEDOUT"`.

`datos` adicional posible: `errorCategoriaTls`, `errorCodigoTransporte`, `errorInterpretacionProxy`, `errorMensajeResumen`, `validadorUrl`, `validadorUrlHost`, `validadorDuracionMs`, `transporteCliente`, `urlCaTeleredConfigurada`, `urlCoincidePrefijoCa`, campos de resolución de URL, etc. (lista completa en `CLAVES_DATOS_ERROR`, `proxySalidaError.js` L60–93).

---

### 4.6 Errores con respuesta HTTP del Canal Validador — `statusCode` 502

`validar()` no lanzó; `httpStatus ≥ 400` o fallo al procesar el cuerpo.

| `resultado` | `ultimaFase` | Disparador |
|-------------|--------------|------------|
| `error_validador_rechazo_http` | `validador_respuesta` | HTTP ≥ 400 del Canal (`app.js` L270–292). |
| `error_validador_cuerpo` | `validador_respuesta` | Cuerpo no es objeto utilizable (`app.js` L295–309). |
| `error_validador_campo_respuesta` | `validador_respuesta` | Falta o vacío el campo string `respuesta` (`app.js` L314–330). |
| `error_descifrado_respuesta` | `descifrado` | `abrirPaquete` devuelve `null` (`app.js` L333–349). |
| `error_parse_respuesta` | `parse_respuesta_validador` | Texto descifrado no es JSON (`app.js` L352–370). |

`datos` suele incluir `validadorHttpStatus` (HTTP real del Canal) y campos de diagnóstico de rechazo (`validadorRechazoMensaje`, `validadorRechazoCodigo`, `validadorRechazoCuerpo`, …).

---

### 4.7 Error interno del orquestador — `statusCode` 500

| `resultado` | `ultimaFase` | Disparador |
|-------------|--------------|------------|
| `error_interno` | `desconocida` | Excepción no capturada en el `try` principal (`app.js` L402–425). |

---

### 4.8 Sin contrato homologado

| Situación | Qué recibe el invocador |
|-----------|-------------------------|
| Timeout de **Lambda** (corte AWS) | Error de invocación; **no** hay `{ statusCode, message, datos }` del proxy. `app.js` no tiene rama para este caso. |

---

## 5. Resumen por `statusCode` homologado

| `statusCode` | Significado grueso | Valores `datos.resultado` posibles |
|--------------|-------------------|-----------------------------------|
| `0` | Éxito | (no aplica; `datos` es negocio) |
| `400` | Entrada inválida | `error_json_body`, `error_validacion_entrada` |
| `404` | Canal no configurado | `error_canal_no_configurado` |
| `500` | Fallo proxy / transporte / cifrado / canal Dynamo / interno | `error_cifrado_peticion`, `error_validador_http`, `error_canal_servidor`, `error_interno` |
| `502` | Canal respondió o el proxy no pudo usar la respuesta | `error_validador_rechazo_http`, `error_validador_cuerpo`, `error_validador_campo_respuesta`, `error_descifrado_respuesta`, `error_parse_respuesta` |

Varios escenarios distintos comparten **`500`**. Para distinguirlos el consumidor debe usar **`datos.resultado`** (y en timeout al Canal Validador, `datos.errorCodigoTransporte`).

---

## 6. Campos de `datos` en error

Whitelist en `proxySalidaError.js` (`CLAVES_DATOS_ERROR`). Solo se incluyen claves con valor incluible; strings largos se truncan.

| Campo | Uso |
|-------|-----|
| `resultado` | Categoría de fallo (string). |
| `ultimaFase` | Fase del pipeline donde ocurrió. |
| `proxySalidaStatusCode` | Copia del `statusCode` homologado. |
| `proxySalidaMensaje` | Mensaje técnico interno (truncado 450). |
| `errorInterpretacionProxy` | Texto que suele ir a `message` (truncado 900 en `datos`). |
| `errorCodigoTransporte` | Código de error de red (`ETIMEDOUT`, `ECONNREFUSED`, …). |
| `errorCategoriaTls` | Clasificación TLS/red (`transportError.js`). |
| `validadorHttpStatus` | HTTP que devolvió el Canal (cuando hubo respuesta). |
| `validadorRechazoMensaje` / `validadorRechazoCodigo` / `validadorRechazoCuerpo` | Detalle del rechazo HTTP del Canal. |
| `validadorUrl`, `validadorUrlHost`, `validadorDuracionMs`, `transporteCliente`, … | Diagnóstico de la llamada HTTP. |
| `idCanalOrigen`, `validadorDestino`, `idPeticion`, `metodo`, `idCanalValidador` | Contexto de la petición (cuando está disponible). |

`detalleOrigen` y `statusCode` del canal **no** están en la whitelist; `detalleOrigen` solo entra vía `datosExtra` en errores de canal.

---

## 7. Nota para catálogo futuro

Hoy el contrato usa:

- **`statusCode` raíz** — pocos valores (0, 400, 404, 500, 502) y en API Gateway se reflejan como HTTP status.
- **`datos.resultado`** — catálogo implícito por string.
- **`datos.errorCodigoTransporte`** — subtipo en fallos de red (p. ej. timeout).

Un catálogo numérico fino (p. ej. código distinto para timeout vs cifrado) requeriría un campo nuevo o formalizar `resultado`, sin reutilizar el `statusCode` raíz si no se quiere cambiar el HTTP status de API Gateway.

---

## 8. Referencia rápida de archivos

| Archivo | Responsabilidad |
|---------|-----------------|
| `app.js` | Orquestación; define `resultado` / `ultimaFase` por rama; llama `responderError` o `homologar(0, …)`. |
| `lib/response.js` | Forma homologada y empaquetado API Gateway. |
| `lib/proxySalidaError.js` | `message` al cliente y filtrado de `datos` en error. |
| `lib/canal.js` | Códigos internos 0 / 401 / 500 antes de traducción en `app.js`. |
