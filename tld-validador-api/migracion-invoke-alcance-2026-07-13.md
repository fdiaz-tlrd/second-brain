# Migración axios/API Gateway → Lambda Invoke — alcance real (2026-07-13)

> **Pregunta que responde:** ¿qué tan grande era pasar de axios a invoke? ¿Qué es "la migración" y qué se
> agregó de más? Comparación directa `produccion_real/tld-validador-api` (axios, `main`) vs
> `tld-validador-api` dev (invoke, `feature/ARQ-225_Refactory`).

## Respuesta corta

La migración en sí es **chica**: cambiar el transporte en **una** función (`lib/validador.js`) y adaptar el
parseo de la respuesta en `app.js`. Lo **único inevitable** además es que invoke necesita un **nombre de
función** en vez de una **URL**, así que había que cambiar la resolución del servicio interno.

Todo lo demás que está en el repo dev (logging estructurado, refactor de cifrado, contrato de `getCanal`,
validación de env, arreglos de hallazgos) **NO es la migración** — son cambios aparte que se agruparon en la
misma rama. Por eso `app.js` pasó de **122 → 202 líneas**.

## El cambio que SÍ es la migración

Prod (axios):

```9:21:produccion_real/tld-validador-api/lambdas/validar/lib/validador.js
  validar: async function (canal, request) {
    try {
      const resp= await axios.post(canal.url, request ,{ timeout: readTimeout })
      return resp.data
    } catch (error) {
      return error?.response?.data
    }
  },
```

Dev (invoke): `lambdaClient.send(new InvokeCommand({ FunctionName, Payload }))` + desempaquetar
`{ statusCode, body }` (invoke devuelve el objeto de retorno de la lambda; API Gateway devolvía el body
directo). Ese es el núcleo. Consecuencia obligada: resolver un **function name** (antes
`canal.getUrlServicioInterno` → URL en Dynamo; ahora `lib/servicioInterno.js` → nombre de Lambda).

## Comparación de `lib/`

| Archivo dev | ¿En prod? | ¿Lo exige el invoke? | Nota |
|-------------|-----------|----------------------|------|
| `validador.js` | sí (axios) | **Sí — es el cambio** | axios.post → InvokeCommand |
| `servicioInterno.js` | no (era `getUrlServicioInterno` en `canal.js`) | **Parcial** | invoke necesita nombre; el mapa en código fue decisión de diseño ("opción B") |
| `canal.js` (`getCanal` → `{statusCode,datos}`) | devolvía el objeto | **No** | cambio de contrato interno |
| `logger.js` | no | **No** | logging estructurado |
| `operacionesPaquete.js` | no (era `llave.js`) | **No** | refactor de cifrado/descifrado |
| `variablesEntorno.js` | no | **No** | validación de variables de entorno |

Prod `lib/`: `bitacora, canal, dashboard, llave, util, validador`.
Dev `lib/`: `bitacora, canal, dashboard, logger, operacionesPaquete, servicioInterno, util, validador, variablesEntorno`.

## Cambios de comportamiento que se colaron en la misma rama (no son transporte)

- **HP-012 / HP-013 / HP-014** — `idSolicitud` → 431 (charset, null-guard). Verificado 24/24.
- **HP-016** — canal emisor mal configurado → 500 (efecto del nuevo `getCanal`).
- **HP-018** — método fuera de catálogo → 418 (`resolverServicioInterno`).
- **HD-007** — fallo al resolver servicio interno → HTTP 200 + cE 509 (commit `b2878f3`).

Son mejoras legítimas y están documentadas por separado, pero **inflan el diff** y hacen que la migración
parezca más grande y más riesgosa de lo que es. Si se quisiera, se podría aislar un PR de "solo transporte"
y otros PRs por cada hallazgo.

## Conclusión honesta

- El **núcleo invoke** es pequeño y está **verificado** (respeta el contrato HTTP con matriz: ver
  [http-code-cadena-cumplimiento-2026-07-13.md](./http-code-cadena-cumplimiento-2026-07-13.md)).
- El tamaño del cambio no viene de la migración, sino de todo lo que se le sumó en la misma rama.
- Nada de esto está "dañado"; está **mezclado**. Separarlo es opcional y ayudaría a revisarlo.

## Referencias

- [comunicacion-prod-vs-dev.md](./comunicacion-prod-vs-dev.md) — axios vs invoke, routing, IAM.
- [arquitectura-invoke-y-contratos.md](./arquitectura-invoke-y-contratos.md) — decisión "opción B".
- `tld-validador-api/docs/architecture/migracion-llamado-api-gateway-a-invoke.md` (en el repo dev).
