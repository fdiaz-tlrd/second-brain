# Diferencia real prod vs dev — respuesta del producto al validador-api

Revisión en código: `prod/tld-validador-api-main`, `prod/tld-api-cuenta-nombre-master`, `tld-validador-api`, `tld-api-cuenta-nombre`.

---

## Mismo en ambos (validador-api `app.js`)

Prod y dev comparten la misma línea:

```javascript
const r = respuesta?.respuesta ?? respuesta;
const resp = { respuesta: r };
return await util.lambdaResult(200, 0, resp);
```

Matriz recibe el `body` parseado de esa respuesta.

---

## Qué recibe validador-api del producto

### Producción — axios al API del producto

`prod/.../validador.js`:

```javascript
const resp = await axios.post(canal.url, request, { timeout: readTimeout });
return resp.data;
```

API Gateway del producto devuelve HTTP con cuerpo = **solo el JSON interno** del `lambdaResult.body`.

**Prod cuenta-nombre no tiene `salidaLambda`.** Devuelve `util.lambdaResult(...)` directo al API GW.

| Caso | `axios.data` (lo que ve validador-api) |
|------|----------------------------------------|
| Éxito | `{ "respuesta": "<cifrado>" }` |
| Error 509/406/… | `{ "codigoError": 509, "mensajeError": "…" }` |

**No hay `statusCode` dentro del JSON.** El HTTP status va en `response.status`, no en `data`.

### Desarrollo — invoke a lambda producto

Dev cuenta-nombre usa `response.salidaLambda(event, lambdaResult)`.

En invoke (`esInvocacionApiGateway` = false):

```javascript
// cuerpoParseadoConHttp
return { statusCode, ...inner };  // inner = JSON.parse(lambdaResult.body)
```

Payload que devuelve la lambda producto al invoke:

| Caso | Payload invoke (lo que parsea validador-api) |
|------|-----------------------------------------------|
| Éxito | `{ "statusCode": 200, "respuesta": "<cifrado>" }` |
| Error 509/599/… | `{ "statusCode": 200, "codigoError": 509, "mensajeError": "…" }` |

`normalizarRespuestaInvokeAlias` en dev validador-api **no quita** ese `statusCode` si no viene envoltorio `{ body: "..." }`.

---

## Qué llega a matriz (después del wrap)

### Éxito

| | Objeto en `body` hacia matriz |
|---|------------------------------|
| **Prod** | `{ "respuesta": "<cifrado>" }` |
| **Dev** | `{ "respuesta": "<cifrado>" }` |

`r = respuesta.respuesta` → **igual**.

### Error plano del producto (509, 599, 406 vía `lambdaResult(200, codigo, mensaje)`)

| | Objeto en `body` hacia matriz |
|---|------------------------------|
| **Prod** | `{ "respuesta": { "codigoError": 509, "mensajeError": "…" } }` |
| **Dev** | `{ "respuesta": { "statusCode": 200, "codigoError": 509, "mensajeError": "…" } }` |

**Aquí está la diferencia.** Desarrollo mete **`statusCode` dentro de `respuesta`**. Producción no.

No es “menor”. Cualquier consumidor que compare JSON prod vs dev, o que no espere `statusCode` anidado en `respuesta`, falla.

### Newman directo al API cuenta-nombre

El cliente ve el **body HTTP** = mismo JSON interno que prod `axios.data`:

```json
{ "codigoError": 599, "mensajeError": "…" }
```

Eso **no** es lo que matriz recibe en prod ni en dev (ambos pasan por validador-api y el wrap `{ respuesta: r }`). Newman además **no incluye** el wrap.

Tres formas distintas:

1. Newman → producto API: `{ codigoError, mensajeError }` en raíz  
2. Prod matriz → validador → producto: `{ respuesta: { codigoError, mensajeError } }`  
3. Dev matriz → validador → producto: `{ respuesta: { statusCode, codigoError, mensajeError } }` ← **distinto de prod**

---

## Causa raíz

| Capa | Prod | Dev |
|------|------|-----|
| Producto → transporte | API GW: body sin `statusCode` en JSON | Invoke: `salidaLambda` → `cuerpoParseadoConHttp` **añade `statusCode`** al payload |
| Validador-api | `resp.data` ya sin `statusCode` | Recibe objeto con `statusCode` y no lo elimina antes del wrap |

---

## ¿Desarrollo está mal respecto a producción?

**En éxito: no** (mismo resultado hacia matriz).

**En errores planos del producto: sí, hay diferencia** — dev no replica prod; añade `statusCode` dentro de `respuesta`.

**No es que producción esté mal.** Producción es la referencia.

---

## Dirección de arreglo

**Implementado** en `tld-validador-api/lambdas/validar/lib/validador.js`: `comoAxiosData()` elimina `statusCode` del payload invoke antes de que `app.js` haga el wrap `{ respuesta: r }`.

Verificación: `node second-brain/tld-validador-api/verificar-como-axios-data.js`

---

## Otros puntos (no confundir con esta diferencia)

- Falta `client-lambda` en layer: invoke ni siquiera funcionaba → arreglado en repo, falta deploy.
- Timeout 28 s vs 24 s: configuración, no forma del JSON.
- Prod cuenta-nombre llamaba al validador bancario por HTTP; dev usa `validador-proxy` invoke — otro cambio de arquitectura **dentro** del producto; la diferencia documentada aquí es la forma del JSON **producto → validador-api**.
