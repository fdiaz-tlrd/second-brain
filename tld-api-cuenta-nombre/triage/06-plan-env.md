# Triage #6 — plan + env (`lib/plan.js`)

**Subfase:** A5  
**Fecha:** 2026-07-05  
**Orden en handler:** tras `getCanal` emisor OK; antes de validaciones de `peticion` / descifrado.

## Qué valida

Integración con **`tld-matriz-control-plan`** (marketplace / suscripción):

| Momento | Acción |
|---------|--------|
| Entrada | `validatePlan("validar", idCanal, fechaInicio)` — bloquea si plan inválido |
| Salida | `validatePlan("exitoso"\|"fallido", …)` desde `util.lambdaResult` si hay `subscriptionValue` |

Postman **`2_reglaNegocio/1_idCanal`** (escenarios plan):

| Escenario | Código esperado |
|-----------|-----------------|
| 2.1.2 sin plan | **403** + catálogo |
| 2.1.4 sin plan sin grupos | **403** + catálogo |

## P2M / base

- `lib/plan.js` homologa respuesta Lambda (`statusCode`, `message`, `datos`).
- Env: `CFG_CONTROL_PLAN_FUNCTION_NAME`, `CFG_ALIAS_API_NAME`, `CFG_VALIDAR_PLAN_POR_CANAL`.
- Plan inválido → HTTP **400**, `codigoError` **403**, `MSG_CATALOGO[403]` (sin cifrar).
- Tracking post-respuesta en módulo `response` / `lambdaResult` vía `plan.validatePlan`.

## VCN antes (A5)

1. `validatePlan` embebido en `util.js` — parse manual de `Payload` con `String.fromCharCode`.
2. Plan inválido devolvía **400/400** con mensaje crudo de matriz, no **403** catálogo.
3. Nombre API y función hardcodeados; sin `CFG_VALIDAR_PLAN_POR_CANAL`.

## Gap

| # | Gap |
|---|-----|
| G1 | Plan legacy en `util.js` |
| G2 | Contrato 403 vs 400 en escenarios 2.1.2 / 2.1.4 |
| G3 | Env plan no centralizados en `variablesEntorno.js` |

## Acción (implementación A5)

| ID | Cambio | Repo | Estado |
|----|--------|------|--------|
| A5a | Crear `lib/plan.js` (patrón P2M/base) | VCN | **Hecho** |
| A5b | Env plan en `variablesEntorno.js` + `template.yaml` | VCN | **Hecho** |
| A5c | `app.js`: `plan.validatePlan` + **403** catálogo | VCN | **Hecho** |
| A5d | `util.lambdaResult`: tracking vía `plan.js`; quitar `validatePlan` de util | VCN | **Hecho** |

**Verificación Newman:** pendiente — carpetas `2_reglaNegocio/1_idCanal` (2.1.2, 2.1.4) y regresión `1_validaciones_js` + **Metodo/0001**.

## Pruebas

```powershell
node run-newman.js vcn --folder "General/2_reglaNegocio/1_idCanal"
node run-newman.js vcn --folder "General/2_reglaNegocio/4_metodo"
node run-newman.js vcn --folder "General/1_validaciones_js"
```

Escenarios ancla: **2.1.2** (403 plan), **2.1.3** (500 getCanal — sin cambio esperado en A5).

## Siguiente

Tras cerrar A5: **Fase B** — extraer funciones en `app.js` (`resolverCanalEmisor`, …). **Fase C** — `lib/metodos.js` 0001.
