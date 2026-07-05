# Paso 2 — `lib/` transversal y `app.js` cableado

**Fecha:** 2026-07-04  
**Repo:** [`tld-api-base`](../../tld-api-base)

## Estado final `lambdas/base/`

```
lambdas/base/
├── app.js                 ← orquestación completa (P2M/P2P), sin switch de dominio
├── package.json
└── lib/
    ├── variablesEntorno.js   ← transversal (no copia P2M/P2P)
    ├── logger.js             ← idéntico P2M/P2P
    ├── bitacora.js             ← idéntico P2M/P2P
    ├── date-utils.js           ← P2M (superset; bitácora + dashboard)
    ├── catalogoRespuestas.js   ← idéntico P2M/P2P
    ├── response.js             ← idéntico P2M/P2P
    ├── plan.js                 ← idéntico P2M/P2P
    ├── operacionesPaquete.js   ← idéntico P2M/P2P
    ├── dashboard.js            ← idéntico P2M/P2P
    ├── canal.js                ← P2P (transversal; sin `validarCanalValidadorComercio` P2M)
    ├── validaciones.js         ← solo 5 validadores globales del handler
    └── metodos.js              ← stub: 418 por solicitud (punto de extensión dominio)
```

## Criterios de extracción

| Módulo | Origen | Motivo |
|--------|--------|--------|
| Idénticos P2M/P2P | copia directa | Sin divergencia |
| `canal.js` | P2P | `getCanal` + `metodoDisponible`; P2M añade lógica comercio/0020 |
| `validaciones.js` | recorte | Handler solo usa validadores de entrada global; el resto es dominio |
| `metodos.js` | nuevo | Sustituye el `switch (metodo)` de cada API |
| `variablesEntorno.js` | diseño base | Ver [05-lib-variablesEntorno.md](./05-lib-variablesEntorno.md) |

## `app.js`

- Misma secuencia y resolvers que P2M/P2P (ver [02-comparacion-p2m-p2p-app-js.md](./02-comparacion-p2m-p2p-app-js.md)).
- Única diferencia estructural: `metodos.procesarMetodo(contextoConsulta)` en lugar del `switch` por método.
- Flujo feliz llega hasta cifrado de respuesta, bitácora y dashboard (requiere AWS/env reales).

## Extensión por API de dominio

Cada repo (P2M, P2P, VCN) reemplaza **`lib/metodos.js`** con su implementación (`switch` + validadores por solicitud). Opcionalmente amplía **`lib/validaciones.js`** y **`variablesEntorno.js`** con env de dominio.

## Pendiente (fuera de este paso)

- `template.yaml` / SAM — ver [07-sam-deploy.md](./07-sam-deploy.md)
- `.gitignore` / CI
- Tests locales con mocks DynamoDB/KMS

**Repos autónomos:** cada API TLD de producto y `tld-api-base` **NUNCA se ven entre sí** en runtime; copian/adaptan el patrón en su propio repo (ver [README.md](./README.md)). `tld-api-base` **solo estudio**, nunca productivo.
