# Triage #4 — petición (`validarParametroPeticion` + orden)

**Subfase:** A3  
**Fecha:** 2026-07-05  
**Orden en handler:** tras validador resuelto (`estadoValidador === "Y"`); **antes** de `abrirPaquete`.

## Qué valida

Campo **`peticion`** cifrado (hex/RSA según algoritmo del emisor). Postman `1_validaciones_js/3_peticion`:

| Condición | Código |
|-----------|--------|
| ausente / null / `""` | 400 (camino early `!body?.peticion` — ya OK) |
| tipo ≠ string | 400 |
| formato hex/RSA inválido (segmentos, base64, truncado, etc.) | 400 |

Respuesta esperada: HTTP **400**, `codigoError` **400**, `mensajeError` **`Error en la petición original`**, cifrada al emisor cuando emisor+validador ya resolvieron.

## P2M / P2P / base

- `validaciones.validarParametroPeticion(cuerpo.peticion, canalEmisor.algoritmoCifrado)` en `resolverPeticion`, **antes** de `abrirPaquete`.
- Error de formato → `responderValidacionConCifrado` (400 + catálogo).
- Errores reales de descifrado (llave/material) en `abrirPaquete` pueden seguir siendo **405** — no confundir con validación JS de formato.

## VCN antes (A3)

1. `validaciones.js` ya tiene `validarParametroPeticion` pero **`app.js` no la invoca**.
2. Cualquier `peticion` mal formada llega a `abrirPaquete` → **405** *Error en descifrado canal emisor*.
3. Escenarios **1.3.1–1.3.3** ya pasaban (check ausente antes de validador).

## Gap

| # | Gap |
|---|-----|
| G1 | Sin llamada a `validarParametroPeticion` |
| G2 | Confusión contrato: 405 descifrado vs 400 validación JS |
| G3 | `abrirPaquete` como única barrera de formato |

## Acción (implementación A3)

| ID | Cambio | Repo | Estado |
|----|--------|------|--------|
| A3a | `validarParametroPeticion` tras validador OK, antes de `abrirPaquete` | `app.js` | **Hecho** |
| A3b | Error → `responderValidacionConCifrado` (reutiliza A2) | `app.js` | **Hecho** |
| A3c | Mantener early `!body?.peticion` sin cifrar (1.3.1–1.3.3) | `app.js` | Sin cambio |

**Verificación Newman:** **cumplida** — run `2026-07-05T07:53:27Z`, carpeta `3_peticion` **13/13** (39 requests, 78 assertions, 0 fallos). Log: commit `6b6b844` en `second-brain`.

## Pruebas

- Newman: `General/1_validaciones_js/3_peticion`
- Regresión: `1_idCanal`, `2_validador`
- Escenarios ancla: **1.3.4** (tipo number), **1.3.10** (AES base64)

## Siguiente

Tras cerrar A3: **A4 idPeticion + solicitudes** — [triage/05-idPeticion-solicitudes.md](./05-idPeticion-solicitudes.md) (**código listo**; pendiente deploy/Newman).
