# Revisión escenario por escenario — CÓDIGO DE RESPUESTA (payload JSON) — P2P

> **Alcance:** SOLO `codigoError` / `resultado` dentro del JSON de respuesta. **NO** HTTP Code.
> **Fuente válida:** run `prod / MATRIZ` **`2026-07-13T09-47-19Z`** (`c1de7ef`). Código prod en dev
> (`prod_adactado_a_dev`, `tld-api-alias` `prod-a-dev`).

## Cómo se genera / regenera

```powershell
cd second-brain/Postman/comparar-prod-vs-dev/recopilacion
node listar-divergencias-negocio.js ../../generador/logs/resultados-por-escenario-p2p.json
node listar-divergencias-negocio.js ../../generador/logs/resultados-por-escenario-p2p.json --md
```

## Resumen

| Métrica | Valor |
|---------|------:|
| Escenarios totales (filas) | 2159 |
| Escenarios **únicos** en colección | 540 |
| Únicos OK (negocio coincide) | **382** |
| Únicos con veredicto de problema | **158** |

> **Corrección importante (2026-07-13):** el barrido inicial reportaba «141 divergentes + 399 OK». Al
> auditar `negocioCoincide = null` aparecieron **17 escenarios sin evaluar** (punto ciego del script):
> **4 crashes 500** (HP-028) + **13** bancoAcreedor (N/A mejora dev). El total real de escenarios con
> problema es **158**, no 141; y los OK reales son **382**, no 399. Ver Bloque E.

**Veredictos (158 escenarios con problema):**

| Veredicto | # | Acción |
|-----------|--:|--------|
| **PROD-MAL** (transversal VCN, reutilizar HP-001…018) | **46** | Informe; no re-discutir |
| **PROD-MAL** (nuevo en alias P2P, HP-023…026) | **30** | Fichar; fix en dev |
| **PROD-MAL** (plan canal, HP-015 — alias P2P) | **2** | Cerrado (2.1.2, 2.1.4) |
| **PROD-MAL** (crash 500, HP-028 — alias P2P) | **4** | Cerrado (Bloque E) |
| **HP-027** (doc `idPeticion` + granularidad 445) | **1** | Cerrado (1.4.15) |
| **N/A — mejora dev** (preguntas/respuestas seguridad, etc.) | **62** | No entrar al informe prod |
| **N/A — mejora dev** (bancoAcreedor 414→435, HP-028 doc) | **13** | No entrar al informe prod (Bloque E) |
| **TOTAL** | **158** | 46+30+2+4+1+62+13; PROD-MAL = 82 |

Run anterior `08-53-01Z` **invalidado** (509 masivo por URLs en `tld-validador-config-servicios`;
corregido por usuario). Ver sección histórica al final.

## Veredictos posibles

- **PROD-MAL** → producción responde mal; el esperado del test es correcto; hallazgo.
- **N/A — mejora dev** → el test refleja validaciones que **ya mejoramos en dev**; no es bug de prod a
  corregir en el informe.
- **PENDIENTE** → falta evidencia o decisión de producto.

**Nota plan canal (HP-015):** prod ignora fallo de plan y sigue procesando. En dev el fix devuelve **403**;
el flag `VALIDAR_PLAN_ID_CANAL` / `CFG_VALIDAR_PLAN_POR_CANAL` solo controla el **rollout** en cada
ambiente (prod hoy en `0` hasta arreglar canales sin plan). **Sigue siendo PROD-MAL**, no excepción de
informe.

---

## Bloque A — Transversal VCN (reutilizar hallazgos HP-001…018)

Mismos escenarios y veredictos que [`12-revision-codigos-respuesta-vcn.md`](12-revision-codigos-respuesta-vcn.md).
En P2P la ruta es MATRIZ → validador → alias; la capa transversal es la misma.

| Bloque P2P | Esp → Recib | # únicos | Hallazgo |
|------------|-------------|--------:|----------|
| 0.1 JSON inválido | 400 → 550 | 1 | **PROD-MAL** HP-001 |
| 1.1 idCanal null/tipos | 400 → 550 | 5 | **PROD-MAL** HP-001 |
| 1.1 idCanal formato (espacios, @, etc.) | 400 → 401 | 7 | **PROD-MAL** HP-009 |
| 1.2 validador formato/tipo | 400 → 404 | 10 | **PROD-MAL** HP-005/009 |
| 1.3 peticion formato | 400 → 405 | 10 | **PROD-MAL** HP-011 |
| 1.5 idSolicitud inválido (null, tipo, vacío…) | 431 → 404 | 11 | **PROD-MAL** HP-012 |
| 1.5 null en array solicitudes | 431 → 999 | 1 | **PROD-MAL** HP-014 |
| 2.4.1 método fuera CFG | 418 → 509 | 1 | **PROD-MAL** HP-018 |

**Subtotal A: 46 PROD-MAL** (ya documentados en `hallazgos-produccion/`).

---

## Bloque B — PROD-MAL nuevo en `tld-api-alias` (HP-023…026)

### B.1 — idSolicitud charset (General 1.5.10–1.5.18)

| Escenario (patrón) | Esp | Recib | Veredicto |
|--------------------|-----|-------|-----------|
| guion bajo, espacios, @, punto, unicode, barra, comillas, solo-guiones… | 431 | **419** | **PROD-MAL** HP-023 |

Body típico: `resultado:419` en `respuestas[0]` — alias no valida charset de `idSolicitud` y devuelve
419 («campos requeridos») en lugar de 431. Relacionado con HP-013 (validador) pero manifestación en
**producto alias**.

### B.2 — identificador celular método 0002 (Metodo/0002/…/2_identificador)

| Escenario (patrón) | Esp | Recib | Veredicto |
|--------------------|-----|-------|-----------|
| tipo number/boolean/object, longitud 7/9, letras, espacios, no inicia con 6… | 409 | **0** | **PROD-MAL** HP-024 |

Body típico: `resultado:0` con `datos` — **pasó validación y ejecutó negocio** con identificador
inválido. Prod solo chequea `!identificador` y regex en string; tipos incorrectos o valores inválidos
llegan al flujo feliz.

### B.3 — Campo requerido ausente (métodos 0004, 0006, 0007, 0008)

| Escenario (patrón) | Esp | Recib | Veredicto |
|--------------------|-----|-------|-----------|
| identificador / tipoIdentificador propiedad ausente | 419 | **430 / 407 / 408** | **PROD-MAL** HP-025 |

Prod salta a código de catálogo («no existe») sin devolver 419 («campo requerido») primero.

### B.4 — Método no asociado al canal emisor (2.4.2)

| Escenario | Esp | Recib | Veredicto |
|-----------|-----|-------|-----------|
| 2.4.2 metodo — no asociado [CANAL_EMISOR_SIN_METODO] | 418 | **419** | **PROD-MAL** HP-026 |

### B.5 — Canal emisor mal configurado (2.1.3)

| Escenario | Esp | Recib | Veredicto |
|-----------|-----|-------|-----------|
| 2.1.3 error interno getCanal [CANAL_EMISOR_MAL_CONFIGURADO] | 500 | **405** | **PROD-MAL** HP-016 (mismo que VCN) |

**Subtotal B: 30 PROD-MAL nuevos** (11 + 9 + 8 + 1 + 1; HP-016 reutilizado).

**Total PROD-MAL: 82 escenarios únicos** = 46 (A transversal) + 30 (B alias) + 2 (plan HP-015) +
4 (crash HP-028, Bloque E).
(Verificado contra el run: la suma anterior de 74/76 provenía de un error de suma en el Subtotal B
—decía 28 cuando 11+9+8+1+1 da 30— y de no contar los 4 crashes del Bloque E.)

---

## Bloque C — N/A mejora dev (no informe prod) — 62 escenarios

Validaciones de **preguntas de seguridad** y campos afines **ya mejoradas en dev** (`feature/ARQ-225`):
regex `idPregunta` dos dígitos, `respuestas[].id`, UUID en 0008, etc. Prod solo valida «no vacío» y
luego responde códigos de catálogo (430, 407, 408, 427).

| Patrón esperado → recibido | # | Bloque |
|----------------------------|--:|--------|
| 455 → 427 / 408 | 31 | `0006` respuestas seguridad |
| 428 → 430 | 13 | `0004` idPregunta |
| 429 → 430 | 2 | `0004` respuesta |
| 444 → 407 | 9 | `0008` id UUID |
| 437 → 408 | 4 | `0022` descripcion QR |
| 473 → 408 | 3 | `0023` qrCode |

**Veredicto: N/A — mejora dev.** Los tests mantienen el comportamiento **objetivo de dev**; no se
documentan como bugs de producción.

---

## Bloque D — Revisión 1 a 1 — **CERRADO** (3 escenarios, no 5)

El barrido original contaba **5** (2 DECISIÓN-CONFIG + 3 PENDIENTE), pero en el run solo hay
**3 escenarios únicos** con divergencia fuera de los bloques A/B/C. Los 3 están cerrados.

| # | Escenario | Esp | Recib | Veredicto | Estado |
|---|-----------|-----|-------|-----------|--------|
| 1 | **2.1.2** sin plan `[CANAL_EMISOR_SIN_PLAN]` / 1020 | 403 | 419 | **PROD-MAL** HP-015 | **cerrado** 2026-07-13 |
| 2 | **2.1.4** sin plan sin grupos `[CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]` / 1019 | 403 | 419 | **PROD-MAL** HP-015 | **cerrado** 2026-07-13 |
| 3 | **1.4.15** idPeticion prefijo SWIFT ajeno | 445 | 400 | **HP-027** (doc + granularidad) | **cerrado** 2026-07-13 |

> **Corrección:** no existen puntos 4 ni 5. `2.1.1` (no existe en BD) **coincide** en el run (401).
> El conteo «5» del barrido inicial era erróneo.

### Punto 1 cerrado — 2.1.2

- **Hallazgo:** prod no rechaza canal sin plan; con flag `VALIDAR_PLAN_ID_CANAL=0` la petición llega a
  negocio → **419** en lugar de **403**.
- **Acuerdo:** es **PROD-MAL** (HP-015); el flag es rollout, no excusa. Fix en dev en `tld-api-alias`.
- **Doc:** [`../../hallazgos-produccion/14-vcn-sin-plan-suscripcion-enmascara-509.md`](../../hallazgos-produccion/14-vcn-sin-plan-suscripcion-enmascara-509.md) (ampliado P2P).

### Punto 2 cerrado — 2.1.4

Mismo hallazgo HP-015; canal **1019** (sin plan, sin grupos). Recibido **419**; esperado **403**.

### Punto 3 cerrado — 1.4.15 (idPeticion prefijo SWIFT ajeno)

- **Recibido:** 400 "Error en la petición original". **Esperado:** 445.
- **Verificado:** el código prod (`tld-api-alias`) **ya valida** el prefijo SWIFT (regex `^alias\d+$`,
  `validaciones.js` L145) y **rechaza** el prefijo ajeno; solo responde 400 genérico.
- **Doc técnica incompleta:** `api_4` (VCN) y `api_6` métodos 0002–0009 no declaran el prefijo; sí está
  en `api_6` 0022/0023 (con `pattern`). El escenario corre sobre **0002** (campo transversal).
- **Veredicto:** **no** es PROD-MAL duro (prod rechaza bien). Es **hallazgo de doc** + **mejora de
  granularidad** (445 explícito). Ficha: **HP-027**.
- **Doc:** [`../../hallazgos-produccion/27-idpeticion-doc-incompleta-prefijo-swift.md`](../../hallazgos-produccion/27-idpeticion-doc-incompleta-prefijo-swift.md).

---

## Bloque E — Escenarios sin evaluar por el barrido (`negocioCoincide=null`) — 17

Punto ciego: el script marcó `null` (no comparó) cuando la respuesta no tenía la estructura esperada.
No entraban en los 141 ni en los OK. Auditados uno por uno con el código fuente prod.

### E.1 — Crash 500 (PROD-MAL, HP-028) — 4 escenarios

| Escenario | Método | Entrada | Recibido | Veredicto |
|-----------|--------|---------|----------|-----------|
| 0006.1.3.1 respuestas — propiedad ausente | 0006 | ausente | **HTTP 500** | **PROD-MAL** HP-028 |
| 0006.1.3.2 respuestas — null | 0006 | `null` | **HTTP 500** | **PROD-MAL** HP-028 |
| 0006.1.3.33 respuestas — elemento null en arreglo | 0006 | `[null]` | **HTTP 500** | **PROD-MAL** HP-028 |
| 0008.1.1.1 id — propiedad ausente | 0008 | `id` ausente | **HTTP 500** | **PROD-MAL** HP-028 |

Crash determinista (4/4 reps). Causa: `validarRespuestas` accede a `.length`/`.id` antes de validar
tipo (`validaciones.js` L546/L554); método 0008 llama `getAliasById(id)` sin validar el UUID
(`app.js` L388). Debe devolver 455 (0006) / 444 (0008). Ficha:
[`../../hallazgos-produccion/28-p2p-alias-crash-500-respuestas-id-ausentes.md`](../../hallazgos-produccion/28-p2p-alias-crash-500-respuestas-id-ausentes.md).

### E.2 — bancoAcreedor 414 → 435 (N/A mejora dev) — 13 escenarios

`0022.1.3.1` … `0022.1.3.13` (bancoAcreedor, método QR 0022). Prod **rechaza correctamente** con
`resultado 414` ("Código de bancoAcreedor no cumple con los criterios", `validarBancoAcreedor` L640–648).
Dev asigna un código específico **435**. No es bug de prod (rechaza bien); es granularidad de catálogo.

**Veredicto: N/A — mejora dev** (misma naturaleza que Bloque C). El script no lo evaluó porque no
resolvió la referencia de catálogo del código esperado 435.

---

## Histórico — run bloqueado `08-53-01Z` (solo referencia)

- **1864 / 2159** escenarios con `509` «Error inesperado al llamar servicio interno».
- **Causa:** URLs faltantes/incorrectas en `tld-validador-config-servicios` (dev).
- **Corregido** por usuario; re-run `09-47-19Z` válido.
- **No era cifrado** ni deploy de alias (ver análisis en commit `7b2048a`).

---

## Referencias

- VCN cerrada: [`12-revision-codigos-respuesta-vcn.md`](12-revision-codigos-respuesta-vcn.md)
- Hallazgos: [`../../hallazgos-produccion/indice.md`](../../hallazgos-produccion/indice.md) HP-023…026
- Repo prod P2P: [`../../prod_adactado_a_dev/06-tld-api-alias.md`](../../prod_adactado_a_dev/06-tld-api-alias.md)
- Preguntas seguridad dev: [`../generador/validacion-preguntas-seguridad/`](../generador/validacion-preguntas-seguridad/)
