# Triage #1 — Validar que la entrada sea JSON

**Orden en handler:** primero (fase `parsear_entrada` en P2M/P2P).  
**Fecha triage:** 2026-07-04.

## Qué valida

Antes de cualquier regla de negocio: el `event` de Lambda debe poder convertirse en un **objeto JSON** (cuerpo HTTP en API Gateway o evento directo en Invoke).

Casos en `obtenerCuerpo`:

| Entrada | Comportamiento |
|---------|----------------|
| `event.body` string con JSON válido | `JSON.parse` → objeto |
| `event.body` string vacío / solo espacios | `{}` (no error) |
| `event.body` string con JSON inválido | lanza error `code: 'BAD_JSON'` |
| `event.body` ya objeto | se devuelve tal cual |
| Sin `body` (Invoke directo) | se devuelve `event` completo |

---

## P2M

**Archivos:** `lambdas/p2m/app.js`, `lambdas/p2m/lib/response.js`

**Flujo:**

1. `faseActual = "parsear_entrada"`
2. `parsearYValidarEntrada(event, bitacora)` → llama `responseBuilder.obtenerCuerpo(event)`
3. Si `JSON.parse` falla → excepción `BAD_JSON`
4. `catch` del handler, solo si `faseActual === "parsear_entrada"` y (`e.code === "BAD_JSON"` **o** `e instanceof SyntaxError`):

```javascript
return out(await responderErrorSinCifrado(
  400, 400,
  "Error en la petición original",
  bitacora || inicializarBitacora(contextoEjecucion)
));
```

5. `responderErrorSinCifrado` → `lambdaResult(400, 400, { codigoError: 400, mensajeError: "Error en la petición original" }, bitacora)`

**Respuesta al cliente (error):**

| Campo | Valor |
|-------|-------|
| HTTP | `400` |
| `codigoError` | `400` |
| `mensajeError` | `"Error en la petición original"` (texto de `MSG_CATALOGO[400]`) |

**Log:** `"El valor del campo event.body no es un JSON apropiado"`

**Bitácora:** `inicializarBitacora` si aún no existía (`idCanal` / `idCanalValidador` = `"undefined"`, `idTransaccion` = `awsRequestId` o UUID).

**Post-parse:** actualiza `bitacora.idCanal` y `bitacora.idCanalValidador` desde cuerpo; log `metadataEntradaLookup(cuerpo.peticion)`.

---

## P2P

**Archivos:** `lambdas/alias/app.js`, `lambdas/alias/lib/response.js`

**Resultado:** **Idéntico a P2M** en esta validación (mismo `parsearYValidarEntrada`, mismo `catch`, mismo mensaje, mismo `obtenerCuerpo` en `response.js`).

---

## VCN hoy

**Archivos:** `lambdas/cuenta-nombre/app.js`, `lambdas/cuenta-nombre/lib/response.js`

**Flujo (post A2/A3, 2026-07-05):**

1. `faseActual = "parsear_entrada"`
2. `parsearYValidarEntrada(event, bitacora)` → `response.obtenerCuerpo(event)`
3. Si `JSON.parse` falla → excepción `BAD_JSON`
4. `catch` del handler, si `faseActual === "parsear_entrada"` y (`BAD_JSON` o `SyntaxError`):

```javascript
return responderErrorSinCifrado(event, 400, 400, MSG_CATALOGO[400], bitacora || inicializarBitacora(contextoEjecucion), ...);
```

5. Bitácora inicial: `inicializarBitacora` con `idCanal` / `idCanalValidador` = `"undefined"`, `idTransaccion` = `awsRequestId` o UUID.

**Respuesta al cliente (error JSON inválido):**

| Campo | Valor |
|-------|-------|
| HTTP | `400` |
| `codigoError` | `400` |
| `mensajeError` | `"Error en la petición original"` |

**Postman:** escenario **`General/0_jsonEntrada/0.1_body_json_http_invalido.json`** (VCN, P2M, P2P).

---

## Comparación `obtenerCuerpo` (response.js)

| Aspecto | P2M | P2P | VCN |
|---------|-----|-----|-----|
| Lógica parse | Igual | Igual | Igual |
| Error parse | `BAD_JSON` | `BAD_JSON` | `BAD_JSON` |
| Body vacío → `{}` | Sí | Sí | Sí |

**Conclusión:** el **detector** de JSON inválido es el mismo en los tres repos.

---

## Gap VCN vs P2M/P2P

| # | Gap | Estado |
|---|-----|--------|
| G1 | **`mensajeError` distinto** | **Cerrado** (A1) |
| G2 | **Mensaje no pasa por `MSG_CATALOGO`** | **Cerrado** (A1) |
| G3 | **`catch` no incluye `SyntaxError`** | **Cerrado** (A3) |
| G4 | **Sin `faseActual` / handler unificado** | **Cerrado** (A3) |
| G5 | **Bitácora distinta en error JSON** | **Cerrado** (A2) |
| G6 | **Sin escenario Postman** | **Cerrado** (A4) |

**No hay gap en:** HTTP 400, `codigoError` 400, detección de JSON inválido.

---

## Relación con `resultado_prueba.md`

Ningún fallo listado corresponde **directamente** a body JSON inválido (no hay escenario General explícito en esa corrida). Los fallos empiezan en **1.1.1 idCanal** (cuerpo JSON válido pero sin `idCanal`).

Este triage igualmente importa: es la **primera validación** del contrato y debe quedar alineada antes de seguir con idCanal.

---

## Acción propuesta en `tld-api-cuenta-nombre`

| ID | Cambio | Estado |
|----|--------|--------|
| A1 | En rama `BAD_JSON`, usar `MSG_CATALOGO[400]` → *"Error en la petición original"* | **Hecho** (2026-07-05, subfase A0) |
| A2 | Alinear bitácora de error con `inicializarBitacora` | **Hecho** (2026-07-05) |
| A3 | Unificar estructura `parsearYValidarEntrada` + `faseActual` como P2M | **Hecho** (2026-07-05) |
| A4 | Escenario Postman `0_jsonEntrada/0.1` (VCN, P2M, P2P) | **Hecho** (2026-07-05) |

---

## Prueba sugerida

Request HTTP con body raw inválido, p. ej. `{idCanal:` (sin cerrar).

**Esperado (P2M/P2P / contrato):**

```json
{
  "codigoError": 400,
  "mensajeError": "Error en la petición original"
}
```

HTTP `400`.

**VCN hoy:** mismo HTTP/código, distinto `mensajeError` (ver G1).

---

## Siguiente triage

**#2 — idCanal:** [triage/02-idCanal.md](./02-idCanal.md) — **cerrada**.  
**#3 — validador (A2):** **cerrada** (14/14). Regla negocio validador: [triage/08](./08-2_validador-reglaNegocio.md) — **cerrada**.
