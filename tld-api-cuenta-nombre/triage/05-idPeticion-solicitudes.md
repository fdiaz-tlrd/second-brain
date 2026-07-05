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
- `CFG_METODOS_LIMITES_JSON` — contrato VCN `{ "0001": 1 }` (ver *Override temporal* abajo).
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
| A4c | `CFG_METODOS_LIMITES_JSON` en `variablesEntorno.js` + `template.yaml` | VCN | **Hecho** — ver override temporal abajo |
| A4d | Mantener `metodoDisponible(canalValidador)` en `case "0001"` (regla negocio validador) | `app.js` | Sin cambio |

**Verificación Newman:** **cumplida** — run `2026-07-05T08:17:07Z`, carpeta `1_validaciones_js` **66/66** (198 requests, 396 assertions, 0 fallos). Log: commit `c74ef05`.

### Override temporal — `CFG_METODOS_LIMITES_JSON` (revertir obligatorio)

**Estado:** activo en `tld-api-cuenta-nombre/template.yaml` → `'{"0001":2}'` (2026-07-05).

**Motivo:** escenario Newman **1.5.9** (duplicado `idSolicitud`, espera **431**) envía 2 solicitudes; con límite **1** la API responde **425** antes de evaluar duplicados. P2M usa método 0015 con límite 2; el escenario VCN heredado no encaja con límite 1.

**Cuándo revertir:** cuando **VCN esté finalizado** — todas las pruebas Newman cerradas (Fase A completa, reglas de negocio 2.x, Metodo/0001, checklist General en verde o lo acordado como “done” del proyecto VCN). **No** revertir solo tras A4/A5 si aún quedan bloques por verificar.

**Pasos al cerrar VCN:**

1. En `template.yaml`, línea `CFG_METODOS_LIMITES_JSON`, **regresar** a:
   ```yaml
   CFG_METODOS_LIMITES_JSON: '{"0001":1}'
   ```
2. Quitar el comentario `# TEMP Newman 5.9...` de esa línea.
3. Redeploy dev (y cualquier stack ya desplegado con el valor 2).
4. Marcar este apartado como cerrado en este triage.

**Riesgo mientras esté en 2:** en el entorno desplegado, peticiones 0001 con **2 solicitudes** pasan la validación transversal (no prod). No confundir con contrato final.

### Riesgo escenario 5.9 (duplicado idSolicitud)

Resuelto **temporalmente** con límite 2 en `template.yaml` (ver arriba). Tras revertir a 1, 5.9 volverá a exigir escenario VCN específico o límite ≥ 2 solo en dev vía parámetro CFN + `samconfig`.

## Pruebas

```powershell
node run-newman.js vcn --folder "General/1_validaciones_js/4_idPeticion"
node run-newman.js vcn --folder "General/1_validaciones_js/5_solicitudes"
```

Regresión: `1_idCanal`, `2_validador`, `3_peticion`, **Metodo/0001** (cuenta 413).

Escenarios ancla: **4.1** (idPeticion ausente), **4.15** (445 SWIFT), **5.1** (tipo string → 425), **5.3** (excede límite).

## Siguiente

Tras cerrar A4: **A5 plan + env** — [triage/06-plan-env.md](./06-plan-env.md) (**código listo**; pendiente deploy/Newman).
