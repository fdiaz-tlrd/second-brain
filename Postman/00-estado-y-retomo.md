# Postman + Newman — estado y retomo

**Punto de entrada del agente** cuando el usuario retome este hilo tras una pausa o cambio de tema.

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-07-13 |
| **Estado** | VCN revisión `codigoError` **cerrada** (doc 12). P2P revisión **cerrada** (doc 13): 74 PROD-MAL, 62 N/A mejora dev. Hallazgos HP-023…026 |
| **Rama producto** | `feature/ARQ-225_Refactory` (P2P, P2M, VCN, validador-api) |
| **Repo docs** | `second-brain` rama `main` |

---

## Cómo retomar (orden)

1. Leer este archivo.
2. Newman/VPN: [`../tld-api-cuenta-nombre/05-newman-vpn-reglas-agente.md`](../tld-api-cuenta-nombre/05-newman-vpn-reglas-agente.md) — **no** correr Newman en Lenovo.
3. Ir a la carpeta del tema activo (tabla abajo) y abrir la última `ITERACION-NN-....md` → sección **Pendiente / Próxima iteración**.
4. Si el usuario subió logs: leer [`generador/logs/registro-vcn.md`](generador/logs/registro-vcn.md) (o `p2m` / `p2p`) y [`resumen-fallos-*.md`](generador/logs/).

---

## Mapa de documentación

| Tema | Dónde | Estado doc |
|------|-------|------------|
| **Índice Postman** | [`README.md`](./README.md) | OK |
| **Generador + Newman (uso)** | [`generador/README.md`](generador/README.md) | OK |
| **Logs Newman** | [`generador/logs/README.md`](generador/logs/README.md) | OK |
| **Reglas agente VPN** | [`../tld-api-cuenta-nombre/05-newman-vpn-reglas-agente.md`](../tld-api-cuenta-nombre/05-newman-vpn-reglas-agente.md) | OK |
| **Comparar prod vs dev** | [`comparar-prod-vs-dev/`](comparar-prod-vs-dev/) (README + 01–04) | Diseño + código implementado |
| **`idSolicitud` (P2P/P2M/VCN)** | [`generador/validacion-idSolicitud/`](generador/validacion-idSolicitud/) | Iteración 01 cerrada en doc |
| **`idPregunta` / `respuestas[].id` (P2P)** | [`generador/validacion-preguntas-seguridad/`](generador/validacion-preguntas-seguridad/) | Iteración 01 cerrada en doc |
| **Validador-api prod vs dev** | [`../tld-validador-api/`](../tld-validador-api/) — ver `diferencia-prod-vs-dev-respuesta-producto.md` | Fix en repo; deploy pendiente |
| **VCN checklist / triage** | [`../tld-api-cuenta-nombre/`](../tld-api-cuenta-nombre/) — hilo anterior A0–A11 | **Distinto** a la pausa de jul-11; ver su `ESTADO-ACTUAL.md` |

**Patrón acordado:** cada iteración → carpeta propia + `ITERACION-NN-....md` + generador en `generador/ensamblador/` cuando aplica.

---

## Qué quedó hecho (código + escenarios)

### Herramientas Newman

| Pieza | Ubicación |
|-------|-----------|
| Flag `--codigo-fuente prod\|dev` | `Postman/generador/run-newman.js` |
| Campo `nivelEjecucion` (desde `NIVEL_EJECUCION` en environment) | `run-newman.js` → todos los informes |
| Salida por escenario **enriquecida** (jul-2026) | `httpRealLambda`, `httpEsperado`, `recibidoNegocio`, `codigoErrorEsperado`, `negocioCoincide`, `httpCoincide`, `assertsFallidos`, `tiempoRealMs` |
| Helpers exportados (scripts de estudio) | `run-newman.js` → `module.exports` (importar, no duplicar) |
| Salida por escenario | `logs/resultados-por-escenario-<suite>.json` y `.md` |
| Diff entre runs | `Postman/generador/comparar-runs.js` |
| Scripts de estudio | `comparar-prod-vs-dev/recopilacion/` (`analizar-por-escenario.js`, `comparar-3-columnas.js`, `comparar-esperado-vs-recibido.js`, `regenerar-por-escenario.js`) |

Diseño: [`comparar-prod-vs-dev/`](comparar-prod-vs-dev/).

### `idSolicitud` — iteración 01 (2026-07-11)

- Escenarios **5.10–5.26** en P2P, P2M, VCN (`General/1_validaciones_js/5_solicitudes/`).
- Regex alineada en los tres repos: `/^(?=.*[A-Za-z0-9])[A-Za-z0-9-]{1,64}$/` (rechaza solo guiones).
- Generador: `ensamblador/generar-escenarios-idSolicitud-5.10.js`.
- Doc: [`validacion-idSolicitud/ITERACION-01-escenarios-error-regex.md`](generador/validacion-idSolicitud/ITERACION-01-escenarios-error-regex.md).

### `idPregunta` / `respuestas[].id` — iteración 01 (2026-07-11)

- Catálogo método **0005** documentado (`01`–`15`).
- Escenarios **0004** `3_idPregunta` (3.10–3.22) y **0006** `3_respuestas` (3.17–3.34) en P2P.
- Regex en `tld-api-alias`: `/^[0-9]{2}$/` en `validarIdPreguntasUsuario` y `validarRespuestas` (campo `id`).
- Ajuste **3.15**: ids `01` / `01` (antes `pregunta01` / `PREGUNTA01`).
- Generador: `ensamblador/generar-escenarios-preguntas-seguridad.js`.
- Doc: [`validacion-preguntas-seguridad/ITERACION-01-idPregunta-y-respuestas-id.md`](generador/validacion-preguntas-seguridad/ITERACION-01-idPregunta-y-respuestas-id.md).

### `tld-validador-api` — paridad prod en errores

- **Problema:** en dev, errores planos del producto incluían `statusCode` dentro de `respuesta`; prod no.
- **Fix:** `comoAxiosData()` en `lambdas/validar/lib/validador.js`.
- Verificación local: `node second-brain/tld-validador-api/verificar-como-axios-data.js`.
- Doc: [`../tld-validador-api/diferencia-prod-vs-dev-respuesta-producto.md`](../tld-validador-api/diferencia-prod-vs-dev-respuesta-producto.md).

### Commits de referencia

| Repo | Nota |
|------|------|
| `second-brain` | Escenarios, generadores, docs Postman — `main` |
| `tld-api-alias` | Regex `idSolicitud` + preguntas seguridad — `feature/ARQ-225_Refactory` |
| `tld-api-p2m` | Port `idSolicitud` desde alias — misma rama |
| `tld-api-cuenta-nombre` | Port `idSolicitud` — misma rama |
| `tld-validador-api` | `comoAxiosData` — misma rama |

Origen regex P2P `idSolicitud`: commit `5f1eb0461c44197a8053dd5ab96ce8d3e8301987`.

---

## Qué NO está cerrado (al retomar)

### Comparar prod vs dev — `prod_adactado_a_dev` (jul-2026)

**Hecho:**

- [x] `prod_adactado_a_dev` desplegado en AWS dev; marca CFN confirmada.
- [x] VCN environment `NIVEL_EJECUCION=MATRIZ`; `nivelEjecucion` en informes Newman.
- [x] **Primera recopilación** (`96656b5`): `node run-newman.js vcn --codigo-fuente prod --nota "prod-a-dev rama prod-a-dev"`.
- [x] Análisis documentado: [`comparar-prod-vs-dev/recopilacion/ITERACION-01-prod-a-dev-MATRIZ-2026-07-12.md`](comparar-prod-vs-dev/recopilacion/ITERACION-01-prod-a-dev-MATRIZ-2026-07-12.md).
- [x] **Iter 02** MATRIZ post-fix ValidadorUrl (`3f072d6`): 150/150 caminos felices.
- [x] **Iter 03** VALIDADOR directo (`c102333`): 0×550; 8 escenarios MATRIZ≠VALIDADOR.
- [x] **`run-newman.js` enriquecido** (jul-2026): captura HTTP real + negocio efectivo + esperados. Ver [`comparar-prod-vs-dev/10-http-vs-codigoerror.md`](comparar-prod-vs-dev/10-http-vs-codigoerror.md).
- [x] Estudio corregido: negocio ~22 % diverge (no 43 %); 510–515 SÍ coincide. Ver [`comparar-prod-vs-dev/08-esperado-vs-recibido-prod.md`](comparar-prod-vs-dev/08-esperado-vs-recibido-prod.md).

**Hallazgo run 01:** 98,4 % escenarios únicos → `codigoError: 550` (`Error inesperado`); causa: URL validador mala. Corregido en iter 02.

**Hallazgo HTTP (iter 02/03):** MATRIZ aplana todo a HTTP 200; VALIDADOR devuelve 400/502. Ver doc 10.

**Pendiente (máquina VPN):**

- [ ] Run `--codigo-fuente dev` (mismo `NIVEL_EJECUCION=MATRIZ`) para `comparar-runs.js`
- [ ] (Opcional) Run prod con `NIVEL_EJECUCION=VCN` para aislar capa matriz
- [ ] CloudWatch en un escenario feliz aislado (`Metodo/0001/3_respuestaExitosa/1008`)

Ver [`comparar-prod-vs-dev/README.md`](comparar-prod-vs-dev/README.md) y [`../prod_adactado_a_dev/00-estado-y-retomo.md`](../prod_adactado_a_dev/00-estado-y-retomo.md).

### Deploy AWS dev — rama refactor (distinto a prod-a-dev)

Desplegar en dev el código de la rama `feature/ARQ-225_Refactory` (solo si se compara contra dev refactor):

- [ ] `tld-validador-api` (incluye `comoAxiosData`)
- [ ] `tld-api-alias` (regex `idSolicitud` + preguntas)
- [ ] `tld-api-p2m` (`idSolicitud`)
- [ ] `tld-api-cuenta-nombre` (`idSolicitud`)

### Newman — escenarios idSolicitud / preguntas (jul-2026 anterior)

- [ ] Run con `--codigo-fuente dev` tras deploy — carpetas nuevas (`5_solicitudes`, `3_idPregunta`, `3_respuestas`).
- [ ] Run con `--codigo-fuente prod` en mismo AWS dev (comparación prod vs dev).
- [ ] Commit + push completo de [`generador/logs/`](generador/logs/).

Comandos ejemplo:

```powershell
cd Postman\generador
node run-newman.js p2p --folder "General/1_validaciones_js/5_solicitudes" --codigo-fuente dev --nota "post-deploy idSolicitud"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/3_idPregunta" --codigo-fuente dev
node run-newman.js vcn --codigo-fuente prod --nota "prod-a-dev prod-a-dev"
node comparar-runs.js logs/historial/vcn/<runProd>_por-escenario.json logs/historial/vcn/<runDev>_por-escenario.json
```

### Escenarios de éxito (solo documentados)

| Tema | Pendiente | Carpeta futura |
|------|-----------|----------------|
| `idSolicitud` límites válidos | `a`, 64 chars, `abc-123`, `id001` | Fuera de `5_solicitudes` (éxito) |
| `idPregunta` / `respuestas.id` | `01`, `15`, borde `16` | Fuera de `1_validaciones_js` (éxito) |

### Regla de negocio (no es `validaciones_js`)

- [ ] P2P: `idPregunta` `99` → **420** — carpeta `2_reglaNegocio` o equivalente, no `1_validaciones_js`.

### Otras pendientes transversales

- [ ] Prueba **E2E** matriz → validador-api → producto (ver [`../tld-validador-api/hallazgos-pendientes.md`](../tld-validador-api/hallazgos-pendientes.md)).
- [ ] **Informe humano** prod vs dev (fase 2): la herramienta solo recopila; ver [`comparar-prod-vs-dev/04-informe-y-recopilacion.md`](comparar-prod-vs-dev/04-informe-y-recopilacion.md).
- [ ] Validar en VPN el flujo `--codigo-fuente` + `comparar-runs.js` con runs reales (marcado pendiente en [`comparar-prod-vs-dev/README.md`](comparar-prod-vs-dev/README.md)).

---

## Próxima iteración sugerida (cuando retomen)

Orden lógico tras deploy:

1. Newman dev en carpetas de error nuevas → asserts en verde.
2. Newman prod vs dev con `--codigo-fuente` → commit logs.
3. `comparar-runs.js` como insumo.
4. Escenarios de **éxito** (`idSolicitud` 5.27+, preguntas `01`/`15`).
5. Escenario negocio `idPregunta` `99` → 420.

---

## Relación con el hilo VCN (A0–A11)

El checklist VCN en [`../tld-api-cuenta-nombre/`](../tld-api-cuenta-nombre/) cubre otro bloque (General, método 0001, baseline **1098/1098**). La pausa de **2026-07-11** es trabajo **transversal** Postman (regex compartida, comparar prod/dev, validador-api). Ambos conviven; no mezclar pendientes sin leer la carpeta correcta.

---

## Historial de este checkpoint

| Fecha | Nota |
|-------|------|
| 2026-07-11 | Creado al pausar Postman + Newman; consolida iteraciones `idSolicitud`, preguntas seguridad, comparar prod/dev y fix validador-api |
