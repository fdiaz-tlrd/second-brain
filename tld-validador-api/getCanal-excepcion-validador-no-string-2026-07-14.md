# Hallazgo: excepciones en `tld-validador-api` /validar — prod vs dig y mensaje 500

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-14 |
| Evidencia | Super-tabla `1.2.4` / `1.2.5` / `1.2.6` (validador tipo number/boolean/object) |
| Repo tocado | **Solo** `tld-validador-api` (`lambdas/validar`) |

## Decisiones (cerradas 2026-07-14)

| Tema | Decisión |
|------|----------|
| Validar tipo/formato de `validador` en validador-api | **No** (desarrollo mínimo ahora) |
| Aspiración de contrato | Esperado Postman **400** «Error en la petición original» — **aspiración**; no se cambia el escenario ahora |
| `getCanal` + catch global en **validador-api** | **500** / **«Error interno»** (catálogo) |
| Criterio para tocar otros repos | **Solo si el string largo llega al cliente.** Si el cliente ya ve catálogo → **no tocar** |
| `tld-api-alias` (Aviso 01) | **No tocar** |
| `tld-validador-proxy` (Aviso 02) | **No tocar** `canal.js` ni catch global |
| `tld-api-cuenta-nombre` | **No tocar** — mismo patrón producto (`mensajeErrorCanal` / `MSG_CATALOGO[500]`) |

## Matiz 01 — ≠ prod en `1.2.4`–`1.2.6`

| Fuente | Negocio | Texto |
|--------|---------|--------|
| Esperado Postman | 400 | Error en la petición original |
| Prod | 404 | Validador no existe (excepción en `getCanal` → `null` → “no existe”) |
| Dig (tras fix) | 500 | Error interno |

No forzamos el disfraz prod (404). Reportamos excepción con **500 Error interno**. El 400 esperado queda como meta, no como fix inmediato.

## Matiz 02 — dos capas; unificación solo en validador-api

| Capa | Prod | Dig (validador-api) |
|------|------|---------------------|
| Catch `getCanal` | `null` → 404/401 | **500** / «Error interno» (HTTP 400 al cliente) |
| Catch global `app.js` | **999** / «Error en la solicitud» | **500** / «Error interno» (HTTP 200) |

## Aviso 01 — `tld-api-alias`: no devolvemos el mensaje largo → no tocar

| Campo | Rol |
|-------|-----|
| `message` | Diagnóstico (return + log); puede seguir siendo el string largo |
| `mensajeCatalogoCliente` / `MSG_CATALOGO[500]` | Texto **cliente** = ya **«Error interno»** |

`app.js` usa `mensajeErrorCanal` → el emisor **no** ve el string largo. **Decisión: no modificar `alias/.../canal.js`.**

Misma lógica en **cuenta-nombre** (triage A7): crudo en logs; cliente solo catálogo. **No modificar.**

## Aviso 02 — `tld-validador-proxy`: catálogo en salida → no tocar

`CATALOGO_MESSAGE[500] = "Error interno"`. `responderError` homologa siempre con el catálogo. El cliente del proxy **ya** recibe «Error interno».

`canalBD.message` / textos del catch global van a **telemetría** (`proxySalidaMensaje`), no a la salida homologada. **Decisión: no modificar proxy por este hallazgo.**

## Por qué sí tocamos validador-api

Ahí el catch de `getCanal` **sí** alimentaba al cliente:

`lambdaResult(400, 500, canalValidadorRes.message)`

Newman dig mostraba el string largo. Ahí el cambio de mensaje es el desarrollo mínimo correcto.

## Cambios de código (solo dig validador-api)

| Archivo | Antes | Después |
|---------|-------|---------|
| `lib/canal.js` catch `getCanal` | 500 + texto largo | **500** + **«Error interno»** |
| `app.js` catch global | 200 + **999** + «Error en la solicitud» | 200 + **500** + **«Error interno»** |

## Producción (referencia, sin tocar)

Prod: catch `getCanal` → `null` → 404/401; catch global → 999 «Error en la solicitud».

## Refs

- Catálogo: [`../codigosRespuesta/nueva-tabla-codigo-respuesta.md`](../codigosRespuesta/nueva-tabla-codigo-respuesta.md) fila **500**
- Super-tabla: `vcn/bloques-diferencias-prod-vs-dev.md` bloques `1.2.4`–`1.2.6`
- Contratos: [respuesta-a-matriz.md](./respuesta-a-matriz.md)
- Triage A7 (cliente = catálogo): [`../tld-api-cuenta-nombre/triage/07-getCanal-contrato-http.md`](../tld-api-cuenta-nombre/triage/07-getCanal-contrato-http.md)
