# Dig vs prod — ¿solo dual consume (API GW + Invoke)?

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Dig | `tld-api-r2p/lambdas/r2p` (`feature/ARQ-225_Refactory`) |
| Prod | `produccion_real/tld-api-r2p/lambdas/r2p` (**única** referencia de producción; solo lectura) |

## Veredicto

**No.** Dig **sí** puede ser consumido por API Gateway **y** por Invoke Lambda (adaptador `lib/response.js`), pero **no** es el único cambio respecto a producción.

---

## 1. Dual consume (sí existe en Dig; no en prod)

| | Prod | Dig |
|--|------|-----|
| Entrada | `JSON.parse(event.body)` — solo forma API GW | `responseAdapter.obtenerCuerpo(event)` |
| Salida | `util.lambdaResult(...)` crudo (`{ statusCode, body }`) | `responseAdapter.salidaLambda(event, ...)` en todos los returns |

Archivo Dig: `lambdas/r2p/lib/response.js`

- Detecta API GW (`version === '2.0'` o `requestContext` con `apiId` / `http` / `domainName`).
- Si hay `body` string → parse JSON (API GW).
- Si **no** hay `body` → el **event entero** es el payload de negocio (Invoke).
- Salida Invoke: aplana `{ statusCode, ...inner }` en vez de `{ statusCode, body: "..." }`.

Prod: `app.js` L22 `body = JSON.parse(event.body)` — sin adaptador.

El `template.yaml` sigue exponiendo `POST /r2p` por API GW en ambos; el dual consume es **a nivel de código**, no un nuevo event SAM de entrada.

---

## 2. Otros cambios Dig vs prod (además del dual consume)

### A. Camino a entidad financiera: HTTP directo → `tld-validador-proxy`

| Prod | Dig |
|------|-----|
| Cifra para validador → `validador.validar` (HTTP) → descifra respuesta | `validadorProxyLambda.invocarValidadorProxy({ idCanal, validador, peticion })` con petición en claro |

Nuevo: `lambdas/r2p/lib/validador-proxy-lambda.js`  
Doc en repo Dig: `docs/architecture/integracion-tld-validador-proxy.md`  
Template Dig: param/env `PROX_VAL_LAMBDA_NAME` + IAM `LambdaInvokePolicy` hacia el proxy. Prod no tiene eso.

### B. Cifrado emisor: `llave.js` → `operacionesPaquete.js`

Prod usa `llave.cifrar` / `llave.descifrar`.  
Dig usa `abrirPaquete` / `cerrarPaquete` en `operacionesPaquete.js` (misma familia AES+RSA/KMS/EFS; módulo reescrito). Dig **no** tiene `llave.js`.

### C. Logging

Prod: `util.Print(...)`.  
Dig: `lib/logger.js` (`infoSafe` / `errorSafe`) + `PRINT_LOGS` en `variablesEntorno.js`. `Print` eliminado de Dig `util.js`.

### D. Runtime / layer

| | Prod | Dig |
|--|------|-----|
| Runtime (template) | `nodejs24.x` | `nodejs20.x` |
| Layer `@telered/tld-telered-lib` | **Sí** | **No** |
| Layer `jsonpath` | **Sí** | **No** |

### E. `validador.js` sigue en Dig (riesgo)

Dig `app.js` aún hace `require("./lib/validador")` y usa `validador.getResultado(...)`.  
Dig `validador.js` **sigue** con:

```js
const tldlib = require('@telered/tld-telered-lib/tld-util-http');
const jp = require('jsonpath');
```

Esas dependencias **no** están en el layer Dig → cold start puede fallar con `Runtime.ImportModuleError`. Ver [`02-import-tld-telered-lib-layer.md`](./02-import-tld-telered-lib-layer.md).

En prod el layer **sí** incluye la lib y el happy path **usa** `validador.validar` HTTP.

---

## 3. Inventario rápido de archivos

| Solo Dig | Solo prod | Ambos |
|----------|-----------|-------|
| `response.js`, `validador-proxy-lambda.js`, `operacionesPaquete.js`, `logger.js`, `variablesEntorno.js` | `llave.js` | `app.js`, `util.js`, `canal.js`, `r2p.js`, `dashboard.js`, `bitacora.js`, `validador.js` |

---

## Conclusión

Pregunta del usuario: ¿Dig en `lambdas/r2p` **únicamente** tiene el cambio de ser consumido además por API GW / Invoke?

**Respuesta: no.** Dual consume es **uno** de varios cambios. El refactor grande funcional es la integración con `tld-validador-proxy`, más crypto renombrado, logging, template/IAM, runtime/layer, y el require muerto/vivo de `tld-telered-lib` en `validador.js`.
