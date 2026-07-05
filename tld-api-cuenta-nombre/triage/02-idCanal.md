# Triage #2 — idCanal (`validarParametroIdCanal` + orden)

**Subfase:** A1 (+ A0 mensaje JSON)  
**Fecha:** 2026-07-05  
**Orden en handler:** tras parseo JSON, **antes** de plan y descifrado.

## Qué valida

Parámetro **`idCanal`** en el cuerpo sin cifrar (reglas JS de Postman `1_validaciones_js/1_idCanal`):

| Condición | Código |
|-----------|--------|
| ausente / null / `""` | 400 |
| tipo ≠ string | 400 |
| solo espacios (trim vacío) | 400 |
| longitud > 4 | 400 |
| caracteres prohibidos (`@`, `(`, `"`, etc.) | 400 |

Respuesta esperada: HTTP **400**, `codigoError` **400**, `mensajeError` **`Error en la petición original`** (sin cifrar).

## P2M / P2P / base

- `validaciones.validarParametroIdCanal(cuerpo.idCanal)` en `resolverCanalEmisor`, **antes** de `getCanal` y **antes** de plan.
- Error → `responderErrorSinCifrado(400, 400, mensajeErrorCanal(...), bitacora)`.
- Fuente copiada: `tld-api-base/lambdas/base/lib/validaciones.js`.

## VCN antes (A1)

1. `validatePlan` con `body?.idCanal` **primero** → 1.1.1 devolvía error de plan.
2. Sin `validaciones.js` → tipos inválidos llegaban a `getCanal` (401/500).
3. Caracteres inválidos pasaban a Dynamo → 401 *Canal emisor no existe*.

## Gap

| # | Gap |
|---|-----|
| G1 | Plan antes de validación JS idCanal |
| G2 | Sin módulo `validaciones.js` |
| G3 | `getCanal` antes de reglas JS en la práctica |

## Acción (implementado 2026-07-05)

| ID | Cambio | Repo | Estado |
|----|--------|------|--------|
| A0 | `BAD_JSON` → `MSG_CATALOGO[400]` | `app.js` | **Hecho** |
| A1a | Añadir `lib/validaciones.js` (desde base) | `lambdas/cuenta-nombre/lib/` | **Hecho** |
| A1b | `CFG_CANAL_VALIDADOR` en `variablesEntorno.js` + `template.yaml` | env/SAM | **Hecho** (requerido al cargar `validaciones.js`) |
| A1c | Orden: `validarParametroIdCanal` → `getCanal emisor` → `validatePlan` → resto | `app.js` | **Hecho** |
| A1d | Early return 400 con `mensajeCatalogoCliente` | `app.js` | **Hecho** |
| A1e | Faltantes `peticion`/`validador` usan `MSG_CATALOGO[400]` | `app.js` | **Hecho** |

**Verificación Newman** (máquina con VPN, 2026-07-05T07:12:06Z):

| Carpeta | Requests | Assertions | Fallos |
|---------|----------|------------|--------|
| `General/1_validaciones_js/1_idCanal` | 42 | 84 | **0** |

Log: [`Postman/generador/logs/resumen-fallos-vcn.md`](../../Postman/generador/logs/resumen-fallos-vcn.md) — *Sin fallos.*

**1.1.13 (generador):** el único fallo previo al run final no era handler — escenario VCN tenía U+FFFD en `"idCanal": "10�0"`. Corregido con `bootstrap-general-vcn.js` (commit `20c960c`); payload `"10¿0"` → 400/`Error en la petición original`.

**Estado A1:** **cerrada** (bloque 1.1 checklist en verde). Pendiente regresión `Metodo/0001` cuando toque Fase C.

## Pruebas

- Checklist: [02-checklist-errores-vcn-general.md](../02-checklist-errores-vcn-general.md) § `1_idCanal`
- Escenario ancla: **1.1.1** propiedad ausente

## Siguiente

**A2 validador** — `triage/03-validador.md` (pendiente).
