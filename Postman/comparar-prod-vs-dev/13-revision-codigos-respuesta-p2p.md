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
| Únicos con divergencia de código | **141** |
| `negocioCoincide` OK | 1528 / 2159 (71 %) |
| Tests fallidos | 244 / 4491 |

**Veredictos en los 141 únicos:**

| Veredicto | # escenarios únicos | Acción |
|-----------|--------------------:|--------|
| **PROD-MAL** (transversal VCN, reutilizar HP-001…018) | **46** | Informe; no re-discutir |
| **PROD-MAL** (nuevo en alias P2P, HP-023…026) | **28** | Fichar; fix en dev |
| **N/A — mejora dev** (preguntas/respuestas seguridad, etc.) | **62** | No entrar al informe prod |
| **DECISIÓN-CONFIG** (`VALIDAR_PLAN_ID_CANAL=0`) | **2** | Producto: ¿activar plan en prod? |
| **PENDIENTE** | **3** | Ver abajo |

Run anterior `08-53-01Z` **invalidado** (509 masivo por URLs en `tld-validador-config-servicios`;
corregido por usuario). Ver sección histórica al final.

## Veredictos posibles

- **PROD-MAL** → producción responde mal; el esperado del test es correcto; hallazgo.
- **N/A — mejora dev** → el test refleja validaciones que **ya mejoramos en dev**; no es bug de prod a
  corregir en el informe.
- **DECISIÓN-CONFIG** → comportamiento explicado por config prod (`env`), no por código roto.
- **PENDIENTE** → falta evidencia o decisión de producto.

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

**Subtotal B: 28 PROD-MAL nuevos** (9 + 11 + 8 + 1 + 1; HP-016 reutilizado).

**Total PROD-MAL seguro: 74 escenarios únicos** (46 + 28).

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

## Bloque D — DECISIÓN-CONFIG / PENDIENTE — 5 escenarios

| Escenario | Esp | Recib | Veredicto | Notas |
|-----------|-----|-------|-----------|-------|
| 2.1.2 / 2.1.4 sin plan suscripción | 403 | 419 | **DECISIÓN-CONFIG** | Prod: `VALIDAR_PLAN_ID_CANAL: 0` en template alias — plan **desactivado** por diseño prod |
| 1.4.15 idPeticion prefijo SWIFT ajeno | 445 | 400 | **PENDIENTE** | Validador/transversal; comparar con regla idPeticion en dev |
| 2.1.1 sin plan (si diverge) | 403 | — | Revisar si OK en run | — |

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
