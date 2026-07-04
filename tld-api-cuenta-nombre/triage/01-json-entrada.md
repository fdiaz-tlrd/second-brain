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

**Flujo:**

1. `try { body = response.obtenerCuerpo(event) }`
2. `catch` **solo** si `e.code === 'BAD_JSON'` (no incluye `SyntaxError` genérico en este bloque):

```javascript
return response.salidaLambda(event,
  await util.lambdaResult(
    400, 400,
    'Solicitud mal formada: el cuerpo no es JSON válido.',
    bitacoraJson
  )
);
```

3. `bitacoraJson` mínima: `idCanal: ''`, `idCanalValidador: ''`, fecha manual con `moment`.

**Respuesta al cliente (error):**

| Campo | Valor |
|-------|-------|
| HTTP | `400` |
| `codigoError` | `400` |
| `mensajeError` | `"Solicitud mal formada: el cuerpo no es JSON válido."` |

**`util.lambdaResult` (error):** `body: JSON.stringify({ codigoError, mensajeError })` — misma **forma** envelope que P2M.

**Log:** no usa el mensaje P2M; usa `cuentaNombre.app.inicio` solo si parse OK.

**Post-parse:** no hay fase `parsear_entrada` ni `inicializarBitacora` unificada; la bitácora “real” se crea después en el `try` principal.

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

| # | Gap | Severidad | Notas |
|---|-----|-----------|-------|
| G1 | **`mensajeError` distinto** | Media (contrato) | P2M/P2P: catálogo *"Error en la petición original"*. VCN: literal técnico distinto. Postman General con `expectedTipo: general` compararía texto y **fallaría** si existiera escenario de body JSON inválido. |
| G2 | **Mensaje no pasa por `MSG_CATALOGO`** | Baja | VCN debería usar `MSG_CATALOGO[400]` o `mensajeErrorCanal` como P2M. |
| G3 | **`catch` no incluye `SyntaxError`** | Baja | En la práctica solo `obtenerCuerpo` lanza `BAD_JSON`; P2M/P2P defensivamente incluyen `SyntaxError`. |
| G4 | **Sin `faseActual` / handler unificado** | Organizacional | No cambia respuesta JSON inválido hoy, pero dificulta alinear el resto de validaciones. |
| G5 | **Bitácora distinta en error JSON** | Baja | P2M: `inicializarBitacora` con `idTransaccion`. VCN: bitácora reducida sin `idTransaccion`. |

**No hay gap en:** HTTP 400, `codigoError` 400, detección de JSON inválido.

---

## Relación con `resultado_prueba.md`

Ningún fallo listado corresponde **directamente** a body JSON inválido (no hay escenario General explícito en esa corrida). Los fallos empiezan en **1.1.1 idCanal** (cuerpo JSON válido pero sin `idCanal`).

Este triage igualmente importa: es la **primera validación** del contrato y debe quedar alineada antes de seguir con idCanal.

---

## Acción propuesta en `tld-api-cuenta-nombre`

| ID | Cambio | Estado |
|----|--------|--------|
| A1 | En rama `BAD_JSON`, usar `MSG_CATALOGO[400]` → *"Error en la petición original"* en lugar del literal actual | **Pendiente** |
| A2 | Alinear bitácora de error con `inicializarBitacora` (o equivalente) cuando se refactorice el handler | **Pendiente** (puede ir con refactor global) |
| A3 | Unificar estructura `parsearYValidarEntrada` + `faseActual` como P2M | **Pendiente** (refactor transversal) |

**Cambio mínimo inmediato (solo G1):** una línea de mensaje en `app.js` ~línea 35.

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

**#2 — idCanal:** `validarParametroIdCanal` y orden respecto a `validatePlan` (fallo **1.1.1** y **1.1.7–1.1.14** en `resultado_prueba.md`).
