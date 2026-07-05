# Triage #8 — `2_reglaNegocio/2_validador` (VCN — en pulido)

**Fecha análisis:** 2026-07-05  
**Estado:** **debate en curso** — Newman 0/3; carpeta **no pulida**; **sin cambio de código** hasta acuerdo.

## Principio rector (acordado 2026-07-05 — tener siempre presente)

**Mejoramos el código fuente de VCN; no cambiamos las reglas de negocio que ya existen con clientes productivos.**

| Qué sí | Qué no |
|--------|--------|
| Estructura, catálogo, calidad, deuda técnica mal portada | Comportamiento nuevo para clientes en prod |
| Alinear **implementación** con contrato prod + Postman VCN verificado | Tratar P2M/P2P como contrato VCN |
| Pulir escenarios/env para reflejar **prod** | Asumir cifrado P2M donde prod responde **en claro** |

**Alcance cambios:** solo **`tld-api-cuenta-nombre`** (desarrollo). **`prod/` — NUNCA modificar.**

## Contexto producto (acordado en debate)

| API | `validador` en petición | Carpeta Postman `2_reglaNegocio/2_validador` |
|-----|-------------------------|-----------------------------------------------|
| **P2M / P2P** | Debe ser **`0001`** (`CFG_CANAL_VALIDADOR` fijo) | Vive en **`P2M Escenarios error especiales/`** — no cabe en General porque los ids de prueba (9999, 1007, …) chocan con la regla JS |
| **VCN** | El validador **puede cambiar** (no está atado solo a `0001` en regla de negocio) | Debe vivir en **`VCN Escenarios error/General/`** y probar **getCanal / estado** del canal validador |

**Importante:** `General/2_reglaNegocio/2_validador` **no está pulido**. La copia desde P2M + adaptación 0001/cuenta fue un borrador; el run Newman confirma gaps de diseño/env/código. Eso debió asumirse desde el inicio del hilo.

**No mezclar con `1_validaciones_js/2_validador`:** ese bloque (A2) cubre **sintaxis/tipo/formato** del campo. Aquí solo **reglas de negocio** tras emisor+plan+petición cifrada.

## Origen técnico del borrador

| Fuente | Destino |
|--------|---------|
| `P2M Escenarios error especiales/General/2_reglaNegocio/2_validador/` | `VCN Escenarios error/General/2_reglaNegocio/2_validador/` |

Commit escenarios: `second-brain` `3f9c52a`. Bootstrap: `bootstrap-general-vcn.js` copia esta carpeta al regenerar General VCN.

---

## Newman (2026-07-05T17:38:25Z)

| Campo | Valor |
|-------|-------|
| Carpeta | `General/2_reglaNegocio/2_validador` |
| Assertions | 18 (failed: **7**) |
| Log | [`Postman/generador/logs/resumen-fallos-vcn.md`](../../Postman/generador/logs/resumen-fallos-vcn.md) |

---

## Escenarios — estado acordado / pendiente

### 2.2.1 — no existe en BD (404) `[CANAL_VALIDADOR_NO_EXISTE]`

| Ítem | Estado |
|------|--------|
| JSON `2.1_validador_no_existe_en_bd.json` | Usa `{{CANAL_VALIDADOR_NO_EXISTE}}` — **OK** |
| Env `CANAL_VALIDADOR_NO_EXISTE` = **`9999`** | **OK** — no existe canal 9999 en BD dev |
| Contrato Postman (borrador P2M) | HTTP 400, **404** cifrado — **revisar vs prod** (prod: **en claro**) |
| Newman | Falló: recibió **400** / *Error en la petición original* |

**Interpretación (sin fix):** el handler VCN aún aplica regla copiada de P2M (`validador === CFG_CANAL_VALIDADOR`) **antes** de `getCanal`, bloqueando `9999`. En VCN eso **no debería** impedir probar “validador inexistente” si el producto permite validador variable.

### 2.2.2 — deshabilitado (402) `[CANAL_VALIDADOR_DESHABILITADO]`

| Ítem | Estado |
|------|--------|
| JSON `2.2_validador_deshabilitado.json` | Usa `{{CANAL_VALIDADOR_DESHABILITADO}}` |
| Env `CANAL_VALIDADOR_DESHABILITADO` = **`1007`** | **PENDIENTE USUARIO** — revisar datos reales en canales dev (`canalesPruebas-dev.json` / Dynamo). **No confirmado** que 1007 exista con `estadoValidador ≠ Y` |
| Newman | Falló igual que 2.2.1 (400 genérico) — puede mezclar bloqueo JS + dato incorrecto |

### 2.2.3 — error interno getCanal (500) `[CANAL_VALIDADOR_MAL_CONFIGURADO]`

| Ítem | Estado |
|------|--------|
| Env `CANAL_VALIDADOR_MAL_CONFIGURADO` = **`0001`** | **Debe ser `1017`** (acordado P3) — pendiente actualizar env |
| Newman | HTTP **200**, **509** validador — no 500 getCanal |

**Sin decisión** sobre id correcto del canal mal configurado.

---

## Handler VCN hoy (referencia para debate)

Orden tras descifrado:

1. `validarParametroValidador` — incluye **`validador.trim() !== CFG_CANAL_VALIDADOR` → 400** (`validaciones.js` ~L57).
2. `getCanal(validador)` — 404/402/500 (`app.js` ~L219–247); 404/402 hoy **sin cifrar**; 500 con cifrado (A7).

## Modelo VCN (regla producto — acordado 2026-07-05)

El canal **emisor** (`idCanal`) envía una **cuenta** (método `0001`). VCN consulta al **canal validador** indicado en el campo **`validador`** el nombre de esa cuenta. El validador **no es un constante de despliegue**: es **parte del negocio** de cada petición.

En código, `body.validador` se usa de verdad:

| Uso | Archivo |
|-----|---------|
| `canal.getCanal(body.validador)` | `app.js` ~L219 |
| `canalValidador.estadoValidador` | `app.js` ~L247 |
| `validadorProxyLambda.invocarValidadorProxy({ idCanal, validador, peticion })` | `app.js` ~L483, `validador-proxy-lambda.js` |

Exigir siempre `validador === CFG_CANAL_VALIDADOR` (regla copiada de P2M en `validaciones.js` ~L57) **contradice** ese modelo: bloquearía consultar distintos validadores por cuenta.

**Error de origen:** una instancia previa portó `validaciones.js` desde base/P2M **sin preguntar** si VCN compartía la restricción P2M/P2P (`0001` fijo). P2M/P2P la necesitan; **VCN no**.

---

## Gaps

| # | Gap |
|---|-----|
| G1 | Carpeta **no pulida** — borrador P2M en General VCN |
| G2 | ~~Regla `CFG_CANAL_VALIDADOR` en JS~~ | **Corregido** en dev (A8a) |
| G3 | Env **`1007`** deshabilitado — **pendiente revisión datos** (usuario) |
| G4 | Env `CANAL_VALIDADOR_MAL_CONFIGURADO` = `0001` → debe **`1017`** (P3); pendiente cambio env | Acordado |
| G5 | 404/402 post-getCanal: respuesta plana vs cifrada (relevante cuando G2 esté resuelto) |

---

## Debate — respuestas registradas

### P1 — Alcance `2_reglaNegocio/2_validador` (2026-07-05)

- **No** es `1_validaciones_js`; es regla de negocio con validador **variable** en VCN.
- P2M/P2P: casos en **especiales** porque `CFG_CANAL_VALIDADOR` = `0001` es obligatorio.
- **2.2.1:** escenario + env `9999` **correctos** (canal que no existe).
- **2.2.2:** env `1007` **por confirmar** contra datos de canales — **pendiente usuario**.
- Carpeta entera: **sin pulir** — obvio en retrospectiva.

### P2 — Regla `validador === CFG_CANAL_VALIDADOR` en VCN (2026-07-05)

**No aplica en VCN** (confirmado por usuario). **Implementado en dev** (`tld-api-cuenta-nombre`, rama refactor):

- Eliminada rama `validador.trim() !== CFG_CANAL_VALIDADOR` en `lib/validaciones.js`.
- **`prod/` no tocado.** `CFG_CANAL_VALIDADOR` sigue en `variablesEntorno.js` / `template.yaml` (SAM); ya no participa en validación JS del campo.

**Regresión Postman posible:** `1.2.15` validador distinto a `CANAL_VALIDADOR` — escenario probaba la regla P2M eliminada; **revisar/pulir** escenario aparte (no bloquea deploy de este cambio).

**Implicación:** `9999`, `1007`, etc. pueden pasar validación JS y llegar a `getCanal`.

### P3 — `CANAL_VALIDADOR_MAL_CONFIGURADO` (2026-07-05)

Canal mal configurado en dev: **`1017`** (TEYVGATO).

| Fuente | Detalle |
|--------|---------|
| Usuario | id **1017** |
| [`canalesPruebas-dev.md`](../../Postman/canalesPruebas-dev.md) | **1017** TEYVGATO — fila validador **sin `llaveCifrado`** → getCanal **500** (hoy usado como `CANAL_EMISOR_MAL_CONFIGURADO`) |

**Env hoy:** `CANAL_VALIDADOR_MAL_CONFIGURADO` = **`0001`** (incorrecto para el escenario). **Pendiente actualizar a `1017`** al pulir env/escenario (no hecho en este debate).

Escenario `2.3_validador_error_interno_getCanal.json`: emisor sigue `CANAL_EMISOR` (1008); solo `validador` debe apuntar a **1017**. Revisar si hace falta variable SWIFT dedicada (hoy usa `SWIFT_CANAL_EMISOR` del emisor).

### P4 — 404/402: cifrado vs en claro (2026-07-05)

**Referencia prod** (`prod/tld-api-cuenta-nombre-master`, solo lectura):

| Caso | Prod |
|------|------|
| Validador no existe | HTTP **400**, body **`{ codigoError: 404, mensajeError: "Validador no existe" }`** — **en claro** |
| Validador deshabilitado | HTTP **400**, body **`{ codigoError: 402, mensajeError: "Canal validador no disponible" }`** — **en claro** |
| `getCanal` excepción / mal dato | Devuelve **`null`** → trata como **404**, no HTTP 500 dedicado |

Escenarios Postman `2.2.1`/`2.2.2` (herencia P2M) piden respuesta **cifrada** — **no coincide con prod VCN**.

**Acuerdo usuario:** el refactor **no cambia reglas de negocio productivas**. Al pulir escenarios y dev, **404/402 en claro** es la referencia; ajustar Postman/generador, no imponer cifrado P2M.

**Pendiente:** confirmar si dev refactor debe replicar prod también en **orden** (getCanal validador **antes** de descifrar petición) — no decidido aún.

---

## Acción

| ID | Cambio | Repo | Estado |
|----|--------|------|--------|
| A8a | Quitar regla `validador === CFG_CANAL_VALIDADOR` en `validaciones.js` | `tld-api-cuenta-nombre` (dev) | **Hecho** |
| A8b | Pulir escenarios Postman `2_validador` (en claro vs P2M, env `1017`) | `second-brain` | Pendiente |
| A8c | Revisar env `1007` deshabilitado + escenario `1.2.15` | — | Pendiente usuario / pulido |

**Alcance:** solo **desarrollo** (`tld-api-cuenta-nombre` feature branch). **`prod/` prohibido.**

## Pruebas

```powershell
node run-newman.js vcn --folder "General/2_reglaNegocio/2_validador"
```

## Siguiente

Cerrar P2+ en **Decisión**; luego escenarios/env/código según acuerdo; re-run Newman.
