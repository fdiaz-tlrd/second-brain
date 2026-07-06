# Timeouts y dependencias — `tld-validador-api` (2026-07-06)

Cambios aplicados en repo dev `tld-validador-api` (`feature/ARQ-225_Refactory`) y cadena con matriz / productos / proxy.

---

## Cadena de timeouts (invoke)

| Orden | Componente | Timeout | Rol |
|-------|------------|---------|-----|
| 1 | Cliente → **tld-matriz** `validador-validar` | API GW (29 s cliente matriz) | `TIMEOUT_VALUE=29` en invoke al validador |
| 2 | Matriz → **tld-validador-validar** | **28 s** (antes 24 s) | Orquestador; debe vivir más que el producto pero menos que matriz |
| 3 | Validador → **tld-cuenta-nombre** (ej.) | **20 s** | Invoke proxy + validaciones |
| 4 | Producto → **tld-validador-proxy** | **15 s** | HTTP read 10 s + margen |
| 5 | Proxy → Canal Validador | **10 s** (`HTTP_READ_TIME_OUT`) | Espera HTTP al banco/dummy |

### Regla

```
matriz (29 s) > validador-api (28 s) > cuenta-nombre (20 s) > proxy (15 s) > HTTP read (10 s)
```

Cada eslabón debe poder **esperar la respuesta del siguiente** sin morir antes, dejando margen para trabajo propio (descifrado, Dynamo, telemetría).

### Por qué 24 s no alcanzaba

Peor caso razonable en método `0001` con demora:

- `validar`: descifrado + Dynamo ~2–4 s  
- `cuenta-nombre`: hasta ~20 s (timeout propio)  
- **Total ~22–24 s** → el orquestador a **24 s** quedaba al límite o hacía timeout → matriz veía **550** / `FunctionError`, no el **599** del producto.

### Cambio aplicado

`template.yaml` → `ValidarEndPoint.Timeout`: **24 → 28** s.

Matriz sigue en **29 s** (`tld-matriz` `TIMEOUT_VALUE`); queda **1 s** de holgura matriz→validador (aceptable: el cuello es el validador esperando al producto).

---

## Dependencia `@aws-sdk/client-lambda`

### Problema

`lambdas/validar/lib/validador.js` hace:

```javascript
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
```

El layer (`lambdas/layer/nodejs/package.json`) **no** incluía ese paquete → riesgo de fallo en cold start o primer invoke a producto.

### Cambio aplicado

En `lambdas/layer/nodejs/package.json`:

- **Añadido:** `@aws-sdk/client-lambda": "3.1079.0"` (misma línea que Dynamo/KMS)
- **Eliminado:** `axios` (ya no lo importa ningún `.js` del repo tras migración a invoke)

Ejecutar tras pull:

```powershell
cd lambdas\layer\nodejs
npm install
```

Luego `sam build` / deploy del stack.

---

## Archivos tocados (código)

| Archivo | Cambio |
|---------|--------|
| `tld-validador-api/template.yaml` | `ValidarEndPoint.Timeout` 28 s |
| `tld-validador-api/lambdas/layer/nodejs/package.json` | +client-lambda, −axios |
| `tld-validador-api/lambdas/layer/nodejs/package-lock.json` | Regenerado con `npm install` |

---

## Deploy

1. `sam build` en `tld-validador-api`
2. Deploy stack (misma rama/feature que el resto ARQ-225)
3. Verificar en CloudWatch que `tld-validador-validar` arranca sin `Cannot find module '@aws-sdk/client-lambda'`

---

## Prueba recomendada (no ejecutada en este entorno)

Flujo **matriz → validador → cuenta-nombre** (no solo Newman directo a cuenta-nombre):

1. Método `0001`, cuenta demora `5000000516`, canal `1022`
2. Esperar ~11 s y comprobar que matriz recibe `{ respuesta: "<cifrado>" }` o error de negocio coherente, **no** `{ codigoError: 550 }`

---

## Hallazgos que siguen abiertos

Ver [hallazgos-pendientes.md](./hallazgos-pendientes.md):

- Reenvío de **errores de negocio del producto** (`codigoError` 599/509) — `app.js` puede envolver el error dentro de `respuesta` con `codigoError: 0` en el orquestador
- Tabla Dynamo `config-servicios` sin uso en dev
- `bitacora.js` / `dashboard.js` sin cablear
