# Triage #8 — `2_reglaNegocio/2_validador` (VCN)

**Fecha análisis:** 2026-07-05  
**Debate cerrado:** 2026-07-05  
**Estado ejecución:** **cerrado** — Newman **3/3** (18 assertions); VCN completo **570/570** al cierre A8 (2026-07-05T19:51Z). Regresión post-A9: **1008/1008** (2026-07-05T23:19Z) — [09-respuesta-canal-validador-510-515.md](./09-respuesta-canal-validador-510-515.md).

## Principio rector (acordado 2026-07-05)

**Mejoramos el código fuente de VCN; no cambiamos las reglas de negocio que ya existen con clientes productivos.**

| Qué sí | Qué no |
|--------|--------|
| Estructura, catálogo, calidad, deuda técnica mal portada | Comportamiento nuevo para clientes en prod |
| Alinear **implementación** con contrato prod + Postman VCN verificado | Tratar P2M/P2P como contrato VCN |
| Pulir escenarios/env para reflejar **prod** | Asumir cifrado P2M donde prod responde **en claro** |

**Alcance cambios:** solo **`tld-api-cuenta-nombre`** (desarrollo). **`prod/` — NUNCA modificar.**

## Contexto producto

| API | `validador` en petición | Carpeta Postman `2_reglaNegocio/2_validador` |
|-----|-------------------------|-----------------------------------------------|
| **P2M / P2P** | Debe ser **`0001`** (`CFG_CANAL_VALIDADOR` fijo) | **`P2M Escenarios error especiales/`** |
| **VCN** | Validador **variable** (canal consultado) | **`VCN Escenarios error/General/`** — getCanal + estado |

**No mezclar con `1_validaciones_js/2_validador`:** sintaxis/tipo/formato del campo vs **reglas de negocio** tras emisor + plan + `peticion` cifrada.

Origen borrador: copia P2M especiales → VCN General (`second-brain` `3f9c52a`).

---

## Newman

| Run | Carpeta | Resultado |
|-----|---------|-----------|
| 2026-07-05T19:02Z (aprox.) | `General/2_reglaNegocio/2_validador` | **18/18** assertions, 0 fallos (post-deploy A8a) |
| 2026-07-05T19:51:09Z | VCN completo | **570/570** tests, 270 requests — log [`ultimo-run-vcn.json`](../../Postman/generador/logs/ultimo-run-vcn.json) |

---

## Debate — respuestas registradas (cerrado)

### P1 — Alcance `2_reglaNegocio/2_validador` (2026-07-05)

- Regla de negocio; validador **variable** en VCN.
- **2.2.1:** env `9999` — canal inexistente — **OK**.
- **2.2.2:** canal deshabilitado — ver **P5**.
- Carpeta Postman: pulida; assertions alineadas con contrato prod/dev acordado.

### P2 — Regla `validador === CFG_CANAL_VALIDADOR` en VCN (2026-07-05)

**No aplica en VCN.** **Hecho en dev** (`37a5e06`): eliminada rama en `lib/validaciones.js`. `CFG_CANAL_VALIDADOR` permanece en SAM; no valida en JS.

**Regresión Postman:** escenario **`1.2.15`** (regla P2M) **eliminado** en VCN (2026-07-05).

### P3 — `CANAL_VALIDADOR_MAL_CONFIGURADO` (2026-07-05)

Canal mal configurado en dev: **`1017`** (TEYVGATO, sin `llaveCifrado`).

**Env VCN actualizado:** `CANAL_VALIDADOR_MAL_CONFIGURADO` = **`1017`**.

Escenario `2.3_validador_error_interno_getCanal.json`: emisor `CANAL_EMISOR`; `validador` → **1017**.

### P4 — 404/402: cifrado vs en claro (2026-07-05)

**Prod** (solo lectura):

| Caso | Contrato |
|------|----------|
| Validador no existe | HTTP **400**, `{ codigoError: 404, mensajeError: "Validador no existe" }` — **en claro** |
| Validador deshabilitado | HTTP **400**, `{ codigoError: 402, mensajeError: "Canal validador no disponible" }` — **en claro** |
| Canal mal configurado en Dynamo | `getCanal` → **`null`** → **404**, no HTTP 500 dedicado |

**Dev refactor** (`app.js` ~L219–247): 404/402 validador **en claro** (alineado prod).

**Acuerdo:** Postman VCN espera **en claro** para 404/402 — **verificado Newman**.

### P4b — Orden `getCanal(validador)` vs descifrado (2026-07-05)

**Respuesta:** **Sí — y dev ya lo hace.** Prod y dev: `getCanal(validador)` → 404/402 **antes** de `abrirPaquete` / descifrado.

### P5 — Canal validador deshabilitado (2026-07-05)

Canal **1021** (HOLLGATO, Hollow Ether Reserve):

| Fuente | Detalle |
|--------|---------|
| [`canalesPruebas-dev.json`](../../Postman/canalesPruebas-dev/canalesPruebas-dev.json) | `estadoValidador: "N"`, escenario `CANAL_VALIDADOR_DESHABILITADO` |
| Env VCN | `CANAL_VALIDADOR_DESHABILITADO` = **`1021`** |

### P6 — Validador mal configurado: 500 dev vs 404 prod (2026-07-05, **cerrado**)

**Decisión:** dev mantiene **HTTP 500** / `codigoError` **500** / mensaje catálogo **"Error interno"**, respuesta **cifrada al emisor** (`responderValidacionConCifrado`). Operativamente correcto: el emisor recibe error interno; Telered investiga la config del validador.

Prod histórico: mal config → **404** "Validador no existe". **No se replica en dev** — mejora acordada vía A7.

Postman **2.2.3** documenta contrato **dev** — **Newman OK**.

---

## Escenarios — estado final

| Escenario | Contrato Postman | Newman |
|-----------|------------------|--------|
| **2.2.1** — no existe (`9999`) | HTTP 400, `404` en claro | **OK** |
| **2.2.2** — deshabilitado (`1021`) | HTTP 400, `402` en claro | **OK** |
| **2.2.3** — getCanal error (`1017`) | HTTP 500, `500` *Error interno*, cifrado | **OK** |

---

## Handler VCN dev (referencia post-A8a)

Orden **antes** de descifrar `peticion`:

1. `validarParametroIdCanal` → en claro  
2. `getCanal(idCanal)` emisor  
3. `validatePlan` (si activo)  
4. `validarParametroValidador` (formato; **sin** regla `0001`) → cifrado al emisor si falla  
5. **`getCanal(validador)`** → **404/402 en claro**; **500 cifrado** (A7)  
6. `validarParametroPeticion` → cifrado si falla  
7. Descifrado `peticion` → validaciones posteriores  

---

## Gaps — resueltos

| # | Gap | Estado |
|---|-----|--------|
| G1 | Carpeta Postman borrador P2M | **Cerrado** |
| G2 | Regla `CFG_CANAL_VALIDADOR` JS | **Cerrado** (A8a) |
| G3 | Datos canal deshabilitado | **Cerrado** (1021 + env) |
| G4 | Env mal configurado `1017` | **Cerrado** |
| G5 | Assertions 404/402 en claro | **Cerrado** (Newman) |
| G6 | Contrato **2.2.3** (500 dev vs 404 prod) | **Cerrado** (P6 → dev 500) |
| G7 | Escenario **`1.2.15`** post-A8a | **Eliminado** VCN 2026-07-05 |

---

## Acción

| ID | Cambio | Repo | Estado |
|----|--------|------|--------|
| A8a | Quitar regla `CFG_CANAL_VALIDADOR` | `tld-api-cuenta-nombre` | **Hecho** (`37a5e06`) |
| A8b | Env VCN `1021` / `1017` + canales dev | `second-brain` | **Hecho** |
| A8c | Pulir escenarios Postman + regenerar colección | `second-brain` | **Hecho** |
| A8d | Deploy dev + Newman `2_validador` | — | **Hecho** (570/570 al cierre A8; regresión **1008/1008** post-A9) |
| A8e | P6 + `1.2.15` | — | **Hecho** — 500 dev; **1.2.15 eliminado** |

## Pruebas

```powershell
node run-newman.js vcn --folder "General/2_reglaNegocio/2_validador"
node run-newman.js vcn
```

## Siguiente

Bloque **`2_reglaNegocio/2_validador` cerrado.** El usuario propone **nuevos escenarios VCN** cuando corresponda.
