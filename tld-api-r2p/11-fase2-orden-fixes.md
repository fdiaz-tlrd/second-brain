# Fase 2 — orden de fixes (vivo)

| Campo | Valor |
|-------|-------|
| Actualizado | 2026-07-15 |
| Estado | Fase 3 · **3.1–3.3 hechas** · siguiente **3.4** |
| Entrada | [`10-cruce-…`](./10-cruce-vcn-dig-x-prod-r2p.md) + [`07-gaps`](./07-fase1-gaps-r2p-vs-espejo-vcn.md) |

## Principio

Cada fix: **transporte Dig (VCN)** sin alterar **negocio prod (R2P)**. Candado G5 en cada iteración.

## Orden de ejecución (Fase 3)

| Iter | Gap | Cambio acotado | Criterio “asegurado” | No tocar |
|------|-----|----------------|----------------------|----------|
| **3.1** ✅ | G1 + G6 | Extraer `getResultado` a módulo sin HTTP; `app.js` deja de `require` `validador.js` de transporte; borrar HTTP muerto | Init OK sin telered-lib; `getResultado` comportamiento igual | Reglas 0011/0013, Dynamo, validaciones |
| **3.2** ✅ | G2 | Reenviar `idTransaccionAutopista` / `fechaHora` **si vienen en body** (pass-through envelope **prod R2P**; patrón Dig = VCN solo como cómo) | Si llegan, el proxy/banco los ven (paridad prod) | Inventarlos en R2P; remap métodos; “copiar negocio VCN” |
| **3.3** ✅ | G3 | Unificar mensaje fallback proxy | Mismo default que VCN si `message` vacío | Catálogo prod HTTP; otros 509 locales EF |
| **3.4** | G4 | Auditar `lambdaResult` call sites del tramo Dig | Solo objetos `{codigoError,mensajeError}` / `{respuesta}` en esos returns | Reescritura general de `util.js` |
| **3.5** | G5 + G7 | Barrido: checklist negocio prod + nota dependencia caller Invoke | Doc cierre + lista G5 OK | Mejoras nuevas |

## Evidencia 3.1 (2026-07-15)

- Añadido `tld-api-r2p/lambdas/r2p/lib/getResultadoValidador.js` (misma agregación 0/500/501; `logger.infoSafe` en el loop como Dig previo).
- `app.js`: `require("./lib/getResultadoValidador")`; call sites `getResultadoValidador(...)`.
- **Borrado** `lambdas/r2p/lib/validador.js` (HTTP + `@telered/tld-telered-lib`).
- Mesa Node: casos all0→0, allErr→500, parcial→501, missing→0; `validador.js` ausente; carga de `getResultadoValidador` bloqueando resolve de `tld-telered-lib`/`jsonpath` → OK.

## Estudio G2 / 3.2 (2026-07-15)

Veredicto en [`12`](./12-estudio-idTransaccionAutopista-fechaHora-flujo-prod.md): pass-through prod, no negocio VCN. Redacción del plan corregida.

## Evidencia 3.2 (2026-07-15)

- `lib/validador-proxy-lambda.js`: incluye opcionales en `eventoNegocio` solo si `!= null`.
- `app.js` call site: pasa `body.idTransaccionAutopista` / `body.fechaHora` (no los inventa).
- Mesa (Lambda stub): con campos → Payload los lleva; sin / null / undefined → omitidos.
- Candado G5: sin tocar remap `0011`→`0012` / `0013`→`0014`.

## Evidencia 3.3 (2026-07-15)

- Fallback cuando `respProxy.message` vacío: `"Error en validador-proxy"` (igual VCN).
- **No** tocados los 509 locales (`datos` null / JSON inválido) que siguen con `"Error inesperado en validador EF!"` (texto prod HTTP, no fallback de message proxy).

## Fase 4 — cierre

- [ ] Checklist G5 firmado en doc
- [x] G1–G3/G6 cerrados con evidencia (G4 pendiente)
- [ ] Retomo: pendiente solo deploy/Newman si el usuario lo pide (Lenovo no corre Newman)

## Qué sigue siendo “no”

- Meter `tld-telered-lib` otra vez en el layer R2P Dig.
- Volver al HTTP directo al banco desde R2P Dig.
- Portar matriz Dig 481/482/418 u otras mejoras ajenas.

## Iteración del plan

Si al ejecutar 3.1 aparece otro gap de transporte Dig vs VCN → añadir G8+ aquí y en `07`, **sin** saltar a mejoras de negocio.
