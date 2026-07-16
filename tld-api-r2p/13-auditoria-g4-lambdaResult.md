# Auditoría G4 — `lambdaResult` / salida Dig R2P (iter 3.4)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Criterio | Returns del tramo Dig → body parseable a `{codigoError,mensajeError}` o `{respuesta}` tras `salidaLambda` + consumo validador-api |
| Fix código | **Ninguno** (call sites ya conformes; no reescribir `util.js`) |

## Cómo se arma la respuesta Dig

1. `util.lambdaResult` Dig = **igual prod R2P**: siempre `body: JSON.stringify(mensaje)` (ramas VCN string/objeto **no** aplican; en Dig/prod R2P están comentadas a propósito).
2. `response.salidaLambda` (Invoke, no AGW): parsea `body` y aplana → `{ statusCode, ...inner }`.
3. Dig validador-api: `normalizarRespuestaInvokeAlias` + `comoAxiosData` (quita `statusCode`) → espera `respuesta` o `codigoError`.

Si `mensaje` fuera un **string**, `salidaLambda` rompe la forma (spread de chars). Mesa confirmada.

## Call sites `app.js` (todos los returns al caller)

| # | Código | 3er arg `mensaje` | Forma OK |
|---|--------|-------------------|----------|
| BAD_JSON / params | objetos `{ codigoError, mensajeError }` | sí |
| plan / canales / descifrado / 418 | objetos | sí |
| idPeticion inválido | `{ respuesta: <cifrado> }` | sí |
| 509 create/update R2P | objetos | sí |
| proxy `statusCode≠0` | objeto `{ codigoError, mensajeError }` | sí |
| proxy datos/JSON/`respuestas` | objetos | sí |
| cifrado emisor salida / catch 999 | objetos | sí |
| éxito | `{ respuesta: <cifrado> }` | sí |

**Cero** literales string como 3er arg en Dig `app.js`.

Nota prod: había un return string suelto (`"Error en la petición no puede ser el mismo banco"`) — **no está** en Dig `app.js` (rama ausente). No se reintroduce.

## Fuera del tramo return al caller (no G4-fix)

| Sitio | Qué | Acción |
|-------|-----|--------|
| `lib/dashboard.js` | `lambdaResult(..., "Error…")` string | Return no va al Invoke caller; no tocar |
| `lib/util.js` enmascaramiento | string | Camino no activo en Dig happy path; no reescribir util |

## Diferencia VCN Dig (no portar)

VCN `util.lambdaResult` envuelve string → `{codigoError, mensajeError}` si `codigoError≠0`. R2P Dig/prod **no**: el contrato se cumple **en los call sites** pasando objetos. Portar ramas VCN = reescritura general de util → **fuera de alcance** G4.

## Veredicto

**G4 cerrado por auditoría.** Criterio asegurado sin cambio de código.
