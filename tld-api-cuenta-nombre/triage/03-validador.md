# Triage #3 — validador (`validarParametroValidador` + respuesta cifrada)

**Subfase:** A2 — **cerrada** (Newman **14/14**, 2026-07-05)  
**Nota VCN 2026-07-05:** escenario **1.2.15** (regla P2M `validador === CFG_CANAL_VALIDADOR`) **eliminado** de la colección VCN; sigue en P2M/P2P. Regla de negocio validador variable: [triage/08](./08-2_validador-reglaNegocio.md).

**Fecha:** 2026-07-05  
**Orden en handler:** tras `idCanal` + `getCanal emisor` + plan; **antes** de `getCanal(validador)` y descifrado de `peticion`.

## Qué valida

Parámetro **`validador`** en el cuerpo sin cifrar (Postman `1_validaciones_js/2_validador`):

| Condición | Código |
|-----------|--------|
| ausente / null / `""` | 400 |
| tipo ≠ string | 400 |
| solo espacios (trim vacío) | 400 |
| longitud > **8** | 400 |
| caracteres prohibidos (`@`, `(`, `¿`, `"`, etc.) | 400 |

**2026-07-14:** tope de `validador` subió de 4 → **8** (alineado a matriz + BIC/SWIFT). Postman ya tenía `1.2.9` como longitud 9 / máximo 8; el código aún tenía 4. Sin tope 8 fallaba el feliz MATRIZ con `validador` SWIFT. La igualdad a `CFG_CANAL_VALIDADOR` ya no aplica en VCN (commit `37a5e06`).

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

**Verificación Newman** (2026-07-05T07:38Z; regresión **14/14** tras eliminar `1.2.15`, run VCN 19:51Z):

| Carpeta | Escenarios | Fallos |
|---------|------------|--------|
| `General/1_validaciones_js/2_validador` | **14** | **0** |

**Estado A2:** **cerrada** (bloque 1.2 checklist en verde; 14 escenarios VCN).
