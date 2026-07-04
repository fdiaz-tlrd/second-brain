# `lib/plan.js` — validación de suscripción por canal

**Fecha:** 2026-07-04

## Rol

Invoca **`tld-matriz-control-plan`** (`CFG_CONTROL_PLAN_FUNCTION_NAME`) y homologa la respuesta para el peaje en `app.js`.

Identico en P2M, P2P y base:

```
tld-api-base/lambdas/base/lib/plan.js
tld-api-p2m/lambdas/p2m/lib/plan.js
tld-api-alias/lambdas/alias/lib/plan.js
```

## Contrato `validatePlan(estado, idCanal, fechaInicio)`

| `estado` | InvocationType | Comportamiento |
|----------|----------------|----------------|
| `validar` | `RequestResponse` | Evalúa suscripción; puede devolver 403 |
| `exitoso` | `Event` | Tracking post-respuesta OK |
| `fallido` | `Event` | Tracking post-respuesta error |

Retorno homologado:

```javascript
{ statusCode, message, datos }  // datos = payload decodificado de control-plan
```

## Bug corregido (2026-07-04)

**Antes:** tras invocar control-plan, `statusCode` del retorno homologado era **siempre `0`**.

**Ahora:** con `estado === "validar"`, `statusCode` del retorno es `0` solo si:

```javascript
decodedPayload?.statusCode === 200 && decodedPayload?.subscription === true
```

Si no, `statusCode: 403` y mensaje desde `description` / `message` del payload o texto por defecto.

Esto alinea `plan.js` con la intención de `app.js`:

```javascript
if (resValPlan.statusCode !== 0 || planPayload?.statusCode !== 200) {
  // 403 Plan inválido
}
```

Tras el fix, un rechazo por `subscription: false` entra por `resValPlan.statusCode !== 0` (403 desde `plan.js`).

## Cableado en `app.js`

Solo si `CFG_VALIDAR_PLAN_POR_CANAL === 1`:

1. `plan.validatePlan("validar", cuerpo.idCanal, fechaInicio)`
2. Si falla → `responderErrorSinCifrado(400, 403, ...)`
3. Si OK → `subscriptionValue = planPayload?.subscription ?? 0`

`response.js` usa `subscriptionValue` para invocar `validatePlan("exitoso"|"fallido")` al cerrar la transacción.

## Despliegue P2M / P2P

Ambas APIs tienen `CFG_VALIDAR_PLAN_POR_CANAL: "1"` en `template.yaml` (validación activa por defecto en SAM).

Ver flujo matriz completo: [../tld-matriz/02-validacion-plan-runtime.md](../tld-matriz/02-validacion-plan-runtime.md).
