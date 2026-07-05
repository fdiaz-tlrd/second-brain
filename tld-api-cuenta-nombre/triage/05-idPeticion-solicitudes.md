# Triage #5 — idPeticion + solicitudes (post-descifrado)

**Subfase:** A4  
**Fecha:** 2026-07-05  
**Orden en handler:** tras `JSON.parse` de petición descifrada; **antes** de `switch (peticion.metodo)`.

## Qué valida

Postman `1_validaciones_js/4_idPeticion` y `5_solicitudes`:

| Campo / regla | Código |
|---------------|--------|
| `idPeticion` ausente, tipo, longitud, alfanumérico | 400 |
| prefijo SWIFT ≠ `canalEmisor.alias` | 445 |
| `metodo` ausente del mapa `CFG_METODOS_LIMITES_JSON` | 418 |
| `metodo` no en operaciones del emisor | 418 |
| `solicitudes` tipo, vacío, excede límite | 425 |
| `idSolicitud` ausente, tipo, vacío, longitud, duplicado | 431 |

Respuesta: HTTP **400**, cifrada al emisor vía `responderValidacionConCifrado`.

## P2M / P2P / base

- Bloque en `resolverPeticionDescifrada` (`tld-api-p2m/lambdas/p2m/app.js` ~452–536).
- `validarParametroIdPeticion(idPeticion, canalEmisor.alias)`.
- `CFG_METODOS_LIMITES_JSON` — en VCN `{ "0001": 1 }`.
- `canal.metodoDisponible(canalEmisor, metodo)` — emisor, no validador.
- `validarParametroSolicitudes(solicitudes, limite)`.

## VCN antes (A4)

1. `validaciones.js` ya tiene `validarParametroIdPeticion` y `validarParametroSolicitudes`.
2. **`app.js` no las invocaba** — petición inválida llegaba al proxy → **509** o **500**.
3. Sin `CFG_METODOS_LIMITES_JSON` en env ni `template.yaml`.
4. `metodoDisponible` solo dentro de `case "0001"` sobre **validador** (camino distinto al transversal P2M).

## Gap

| # | Gap |
|---|-----|
| G1 | Sin validación post-descifrado de `idPeticion` / `solicitudes` |
| G2 | Errores 400/425/431/445/418 no cifrados al emisor |
| G3 | Falta env `CFG_METODOS_LIMITES_JSON` |
| G4 | Escenarios 5.x devolvían 413 (cuenta) en lugar de 425/431 |

## Acción (implementación A4)

| ID | Cambio | Repo | Estado |
|----|--------|------|--------|
| A4a | Bloque idPeticion → método → solicitudes antes del `switch` | `app.js` | **Hecho** |
| A4b | Errores → `responderValidacionConCifrado` | `app.js` | **Hecho** |
| A4c | `CFG_METODOS_LIMITES_JSON` en `variablesEntorno.js` + `template.yaml` | VCN | **Hecho** (`{"0001":1}`) |
| A4d | Mantener `metodoDisponible(canalValidador)` en `case "0001"` (regla negocio validador) | `app.js` | Sin cambio |

**Verificación Newman:** pendiente máquina VPN — carpetas `4_idPeticion` (15) y `5_solicitudes` (9).

### Riesgo escenario 5.9 (duplicado idSolicitud)

El escenario **1.5.9** envía **2 solicitudes** con ids duplicados (case-insensitive) y espera **431**. Con `CFG_METODOS_LIMITES_JSON = {"0001":1}`, `validarParametroSolicitudes` rechaza antes por exceso de cantidad (**425**), no por duplicado.

- En P2M el escenario usa método **0015** con límite **2** en CFG.
- Opciones: (a) escenario VCN específico con límite ≥ 2 solo para 5.9, o (b) subir límite a 2 en CFG (permitiría 2 solicitudes en prod). **Decisión A4:** límite **1**; si Newman falla solo en 5.9, tratar como desalineación escenario↔CFG, no como bug de validación.

## Pruebas

```powershell
node run-newman.js vcn --folder "General/1_validaciones_js/4_idPeticion"
node run-newman.js vcn --folder "General/1_validaciones_js/5_solicitudes"
```

Regresión: `1_idCanal`, `2_validador`, `3_peticion`, **Metodo/0001** (cuenta 413).

Escenarios ancla: **4.1** (idPeticion ausente), **4.15** (445 SWIFT), **5.1** (tipo string → 425), **5.3** (excede límite).

## Siguiente

Tras cerrar A4: **A5 plan + env** — `triage/06-plan-env.md` (pendiente).
