# Triage #7 — getCanal: HTTP vs codigoError (emisor / validador)

**Subfase:** A5 (gap descubierto en Newman `2_reglaNegocio/1_idCanal`)  
**Fecha:** 2026-07-05  
**Orden en handler:** tras `validarParametroIdCanal`; bloque emisor antes de plan; bloque validador tras `validarParametroValidador`.

## Qué valida Postman

Escenario **2.1.3** (`CANAL_EMISOR_MAL_CONFIGURADO`): cuando `canal.getCanal(idCanal)` devuelve fallo interno (`statusCode` 500 desde `lib/canal.js`):

| Campo | Contrato |
|-------|----------|
| HTTP Lambda | **500** |
| `codigoError` | **500** |
| `mensajeError` | **`Error interno`** (`MSG_CATALOGO[500]`) |
| Cifrado | **No** — respuesta en claro (sin `getCanal` OK no hay llave emisor) |

## P2M / base (referencia)

`resolverCanalEmisor` en `tld-api-p2m/lambdas/p2m/app.js`:

```javascript
const httpStatus = canalEmisorRes.statusCode === 500 ? 500 : 400;
const codigoFuncional = canalEmisorRes.statusCode === 401 ? 401 : canalEmisorRes.statusCode;
const mensajeCatalogoCliente = mensajeErrorCanal({ statusCode: codigoFuncional, message: canalEmisorRes.message });
// responderErrorSinCifrado(httpStatus, codigoFuncional, mensajeCatalogoCliente, …)
```

Para **validador** con `getCanal` 500: `responderValidacionConCifrado(..., httpStatus: 500)` + catálogo vía `mensajeErrorCanal`.

## VCN antes (post-A5, pre-fix)

`app.js` rama emisor ~L144–147:

- 401 → HTTP **400**, mensaje hardcodeado (OK para 2.1.1).
- 500 → HTTP **400**, `codigoError` 500, **`canalEmisorRes.message` crudo** (texto de `canal.js`).

Newman run **2026-07-05T09:08Z** (`resumen-fallos-vcn.md`): **2.1.3** — 2 assertions fallidas (HTTP 400 vs 500; mensaje crudo vs catálogo). **2.1.1, 2.1.2, 2.1.4** en verde.

## Gap

| # | Gap |
|---|-----|
| G1 | HTTP 500 de `canal.js` mapeado a HTTP **400** en Lambda |
| G2 | Cliente recibe mensaje interno de `canal.js`, no `MSG_CATALOGO[500]` |
| G3 | Validador `getCanal` 500: mismo patrón (HTTP 400 + mensaje crudo) — alineado en el mismo fix |

## Acción

| ID | Cambio | Repo | Estado |
|----|--------|------|--------|
| A7a | Emisor: patrón P2M (`httpStatus`, `codigoFuncional`, `mensajeErrorCanal`) | `app.js` | **Hecho** |
| A7b | Validador 500: `responderValidacionConCifrado(..., httpStatus: 500)` + catálogo | `app.js` | **Hecho** |

**No** cambiar `lib/canal.js`: el mensaje crudo queda en logs; al cliente solo catálogo.

**Verificación Newman:** run **2026-07-05T09:28Z** — **2.1.3** OK (HTTP 500 + `Error interno`). **A7 cerrada.**

## Relación con otras subfases

- Descubierto durante Newman A5 (`06-plan-env.md`); **no** es regresión de `plan.js`.
- TDZ `subscriptionValue` (commit `aed4f10`) era prerequisito: sin él, 2.1.1/2.1.3 devolvían 999.

## Siguiente

Newman **`2_reglaNegocio/4_metodo`** (2.4.1, 2.4.2). Si falla: revisar validación método post-descifrado en `app.js` (418 + catálogo cifrado).
