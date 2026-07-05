# Triage #8 — `2_reglaNegocio/2_validador` (VCN)

**Fecha análisis:** 2026-07-05  
**Debate cerrado:** 2026-07-05  
**Estado ejecución:** env + canales **hechos**; escenarios Postman **sin pulir**; Newman **0/3** (run 17:38Z, **pre-A8a deploy**); **1 decisión abierta** (2.2.3 contrato 500 vs prod 404).

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

## Newman (último — 2026-07-05T17:38:25Z)

| Campo | Valor |
|-------|-------|
| Carpeta | `General/2_reglaNegocio/2_validador` |
| Tests | 18 (failed: **7**) |
| Log | [`Postman/generador/logs/resumen-fallos-vcn.md`](../../Postman/generador/logs/resumen-fallos-vcn.md) |

**Nota:** run anterior a deploy de **A8a** (regla `CFG_CANAL_VALIDADOR` aún activa en API desplegada). Fallos 2.2.1/2.2.2: respuesta cifrada genérica *Error en la petición original* en lugar de 404/402 en claro.

---

## Debate — respuestas registradas (cerrado)

### P1 — Alcance `2_reglaNegocio/2_validador` (2026-07-05)

- Regla de negocio; validador **variable** en VCN.
- **2.2.1:** env `9999` — canal inexistente — **OK**.
- **2.2.2:** canal deshabilitado — ver **P5**.
- Carpeta Postman: borrador P2M; **pendiente pulido** (assertions / contrato).

### P2 — Regla `validador === CFG_CANAL_VALIDADOR` en VCN (2026-07-05)

**No aplica en VCN.** **Hecho en dev** (`37a5e06`): eliminada rama en `lib/validaciones.js`. `CFG_CANAL_VALIDADOR` permanece en SAM; no valida en JS.

**Regresión posible:** escenario **`1.2.15`** (validador distinto a `CANAL_VALIDADOR`) probaba regla P2M eliminada — **revisar aparte**.

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

**Acuerdo:** Postman VCN debe esperar **en claro** para 404/402; no cifrado P2M. JSON escenarios ya tienen `expectedTipo: "general"` — verificar ensamblador/assertions tras deploy A8a.

### P4b — Orden `getCanal(validador)` vs descifrado (2026-07-05)

**Pregunta:** ¿Dev debe consultar el validador en Dynamo **antes** de descifrar `peticion`, como prod?

**Respuesta:** **Sí — y dev ya lo hace.** Prod y dev: `getCanal(validador)` → 404/402 **antes** de `abrirPaquete` / descifrado. **Sin cambio de código requerido.**

### P5 — Canal validador deshabilitado (2026-07-05)

**1007 no existe** en canales dev. Creado canal **1021** (HOLLGATO, Hollow Ether Reserve):

| Fuente | Detalle |
|--------|---------|
| [`canalesPruebas-dev.json`](../../Postman/canalesPruebas-dev.json) | `estadoValidador: "N"`, escenario `CANAL_VALIDADOR_DESHABILITADO` |
| Env VCN | `CANAL_VALIDADOR_DESHABILITADO` = **`1021`** |

---

## Escenarios — estado actual

### 2.2.1 — no existe (404) `[CANAL_VALIDADOR_NO_EXISTE=9999]`

| Ítem | Estado |
|------|--------|
| JSON + env | **OK** |
| Código dev | **OK** (post-A8a) — 404 en claro |
| Newman | **Pendiente** re-run tras deploy |

### 2.2.2 — deshabilitado (402) `[CANAL_VALIDADOR_DESHABILITADO=1021]`

| Ítem | Estado |
|------|--------|
| Canal 1021 + env | **Hecho** |
| Código dev | **OK** — 402 en claro |
| Newman | **Pendiente** re-run tras deploy |

### 2.2.3 — error getCanal (500) `[CANAL_VALIDADOR_MAL_CONFIGURADO=1017]`

| Ítem | Estado |
|------|--------|
| Env + canal 1017 | **Hecho** |
| **Decisión abierta P6** | Prod: mal config → **404**. Dev (A7): **500 cifrado** al emisor. ¿Postman sigue dev 500 o prod 404? |
| Newman previo | HTTP 200 / **509** validador (validador `0001` + flujo proxy) |

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

## Gaps (post-debate)

| # | Gap | Estado |
|---|-----|--------|
| G1 | Carpeta Postman borrador P2M | Pendiente pulido + Newman |
| G2 | Regla `CFG_CANAL_VALIDADOR` JS | **Cerrado** (A8a) |
| G3 | Datos canal deshabilitado | **Cerrado** (1021 + env) |
| G4 | Env mal configurado `1017` | **Cerrado** |
| G5 | Assertions 404/402 en claro | Pendiente verificar tras deploy |
| G6 | Contrato **2.2.3** (500 dev vs 404 prod) | **Decisión usuario pendiente** |
| G7 | Escenario **`1.2.15`** post-A8a | Pendiente revisar |

---

## Acción

| ID | Cambio | Repo | Estado |
|----|--------|------|--------|
| A8a | Quitar regla `CFG_CANAL_VALIDADOR` | `tld-api-cuenta-nombre` | **Hecho** (commit `37a5e06`) |
| A8b | Env VCN `1021` / `1017` + canales dev | `second-brain` | **Hecho** |
| A8c | Pulir escenarios Postman + regenerar colección si aplica | `second-brain` | Pendiente |
| A8d | Deploy dev + Newman `2_validador` | — | Pendiente |
| A8e | Decidir P6 (2.2.3) + revisar `1.2.15` | — | Pendiente |

## Pruebas

```powershell
node run-newman.js vcn --folder "General/2_reglaNegocio/2_validador"
node run-newman.js vcn --folder "Metodo/0001"
```

## Siguiente

1. **Usuario:** P6 — ¿2.2.3 espera **500 cifrado** (dev A7) o **404 en claro** (prod)?  
2. Deploy A8a si no está en dev desplegado.  
3. Newman `2_validador`; pulir lo que falle.  
4. Regresión `Metodo/0001`.
