# Triage #3 — validador (`validarParametroValidador` + respuesta cifrada)

**Subfase:** A2  
**Fecha:** 2026-07-05  
**Orden en handler:** tras `idCanal` + `getCanal emisor` + plan; **antes** de `getCanal(validador)` y descifrado de `peticion`.

## Qué valida

Parámetro **`validador`** en el cuerpo sin cifrar (Postman `1_validaciones_js/2_validador`):

| Condición | Código |
|-----------|--------|
| ausente / null / `""` | 400 |
| tipo ≠ string | 400 |
| solo espacios (trim vacío) | 400 |
| longitud > 4 | 400 |
| caracteres prohibidos (`@`, `(`, `¿`, `"`, etc.) | 400 |
| valor ≠ `CFG_CANAL_VALIDADOR` (trim) | 400 |

Respuesta esperada (Postman tipo `general`): HTTP **400**, `codigoError` **400**, `mensajeError` **`Error en la petición original`**.

Cuando el emisor ya está resuelto, el error va **cifrado** al canal (`{ respuesta: … }` en Lambda), igual que P2M/P2P/base — no en claro como `idCanal` ausente en algunos caminos legacy.

## P2M / P2P / base

- `validaciones.validarParametroValidador(cuerpo.validador)` en `resolverCanalValidador`, **después** de emisor + plan.
- Incluye comparación con `CFG_CANAL_VALIDADOR` (escenario **1.2.15**).
- Error → `responderValidacionConCifrado(canalEmisor, …)` → `cerrarPaquete` → body `{ respuesta: hex }`, HTTP 400.
- Fuente: `tld-api-base/lambdas/base/lib/validaciones.js` (ya copiado en A1).

## VCN antes (A2)

1. `validaciones.js` ya tiene `validarParametroValidador` pero **`app.js` no la invoca**.
2. Tras plan: solo comprueba `!peticion || !validador` → 400 **sin cifrar** (1.2.1–1.2.3 pasan así).
3. Con `validador` inválido pero sintácticamente “buscable”, va directo a `getCanal(validador)` → **404** *Validador no existe* o **500** (tipos no string).
4. **1.2.15** (`validador = CANAL_EMISOR`): pasa validación Dynamo y llega a negocio → **510**, no 400.

## Gap

| # | Gap |
|---|-----|
| G1 | Sin llamada a `validarParametroValidador` en `app.js` |
| G2 | Sin `responderValidacionConCifrado` (VCN solo cifra éxito/rechazo post-descifrado) |
| G3 | `util.lambdaResult` envolvía cualquier error como `{ codigoError, mensajeError }` plano — incompatible con `{ respuesta }` cifrada |
| G4 | Orden: `getCanal(validador)` antes de reglas JS |

## Acción (implementación A2)

| ID | Cambio | Repo | Estado |
|----|--------|------|--------|
| A2a | Invocar `validarParametroValidador` tras plan y antes de `getCanal(validador)` | `app.js` | **Hecho** |
| A2b | Añadir `responderValidacionConCifrado` + `mensajeErrorCanal` | `app.js` | **Hecho** |
| A2c | `util.lambdaResult`: si `mensaje` trae `respuesta`, serializar body tal cual (como P2M) | `lib/util.js` | **Hecho** |
| A2d | Petición ausente sigue 400 sin cifrar; validador ausente pasa por JS + cifrado (alineado a base) | `app.js` | **Hecho** |

**Commit código (repo `tld-api-cuenta-nombre`):** pendiente push/deploy por el usuario.

**Verificación Newman:** pendiente máquina VPN — carpeta `2_validador` + regresión `1_idCanal`.

**No tocar aún:** `validarParametroPeticion` (A3), proxy 0001, regla negocio 2.x.

## Pruebas

- Newman: `General/1_validaciones_js/2_validador` (17 escenarios; 3 ya pasaban, 14 fallaban run General 05:13).
- Regresión: `General/1_validaciones_js/1_idCanal` (14/14, run 07:12).
- Regresión: `Metodo/0001` cuando haya deploy conjunto.
- Checklist: [02-checklist-errores-vcn-general.md](../02-checklist-errores-vcn-general.md) § `2_validador`.
- Escenarios ancla: **1.2.10** (404→400), **1.2.15** (510→400), **1.2.4** (500→400).

## Generador

Escenarios unicode `¿` en `2.13` corregidos con `bootstrap-general-vcn.js` (commit `20c960c`). Regenerar VCN General desde P2M si cambia la matriz.

## Verificación

Pendiente Newman en máquina con VPN tras deploy. El agente **no** ejecuta Newman en Lenovo.

## Siguiente

Tras cerrar A2: **A3 petición** — `triage/04-peticion.md` (pendiente).
