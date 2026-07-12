# Recopilación — comparar prod vs dev

Carpeta de **iteraciones de recopilación Newman**: cada run etiquetado (`codigoFuente` + `nivelEjecucion`) que alimenta el informe humano posterior.

## Iteraciones documentadas

| Archivo | Contenido |
|---------|-----------|
| [`ITERACION-01-prod-a-dev-MATRIZ-2026-07-12.md`](./ITERACION-01-prod-a-dev-MATRIZ-2026-07-12.md) | Run 01 (URL validador **mala**): 550 sistémico, 0 caminos felices |
| [`ITERACION-02-prod-a-dev-MATRIZ-postfix-2026-07-12.md`](./ITERACION-02-prod-a-dev-MATRIZ-postfix-2026-07-12.md) | Run 02 (URL validador **corregida** `3f072d6`): 150/150 caminos felices, 6×550 residual |
| [`ITERACION-03-prod-VALIDADOR-2026-07-12.md`](./ITERACION-03-prod-VALIDADOR-2026-07-12.md) | Run 03 (`NIVEL_EJECUCION=VALIDADOR`, `c102333`): 0×550; tabla cruzada de los 6 vs MATRIZ |

## Documentos interpretados (índice)

| Doc | Contenido |
|-----|-----------|
| [`../07-matriz-validacion-cuerpo-json.md`](../07-matriz-validacion-cuerpo-json.md) | 6 escenarios fuera de plan en flujo cliente; `isValid` en matriz |
| [`../08-esperado-vs-recibido-prod.md`](../08-esperado-vs-recibido-prod.md) | **~22 %** ejecuciones prod ≠ esperado (negocio); HTTP aparte |
| [`../09-tabla-comparacion-escenarios.md`](../09-tabla-comparacion-escenarios.md) | Índice: **71** escenarios negocio + **92** HTTP; 8 donde MATRIZ≠VALIDADOR |
| [`../10-http-vs-codigoerror.md`](../10-http-vs-codigoerror.md) | **HTTP (protocolo) vs codigoError (payload)** — qué captura Newman |

## Scripts de estudio (reutilizables — no borrar)

| Script | Qué hace |
|--------|----------|
| [`analizar-por-escenario.js`](./analizar-por-escenario.js) | Estadísticas + `banderas` + `preguntasObvias` + sección HTTP protocolo |
| [`comparar-esperado-vs-recibido.js`](./comparar-esperado-vs-recibido.js) | Cruza run con JSON fuente (`expectedCodigoError` vs `recibidoNegocio`) |
| [`comparar-3-columnas.js`](./comparar-3-columnas.js) | Tabla esperado + MATRIZ + VALIDADOR (Tabla A negocio + Tabla B HTTP) |
| [`regenerar-por-escenario.js`](./regenerar-por-escenario.js) | Reconstruye `*_por-escenario.json` enriquecido desde `*_completo.json` (runs viejos) |

**Helpers compartidos:** importados de [`../../generador/run-newman.js`](../../generador/run-newman.js) (`extractNegocio`, `extractAssertData`, `buildResultadosPorEscenario`, etc.). No duplicar lógica en scripts nuevos.

## Artefactos generados (iter 02/03, jul-2026)

| Archivo | Contenido |
|---------|-----------|
| [`enriquecido-02-MATRIZ_por-escenario.json`](./enriquecido-02-MATRIZ_por-escenario.json) | Run 02 con HTTP real + `recibidoNegocio` (1263 ejec.) |
| [`enriquecido-03-VALIDADOR_por-escenario.json`](./enriquecido-03-VALIDADOR_por-escenario.json) | Run 03 enriquecido (947 ejec.) |
| [`resumen-2026-07-12b-prod-MATRIZ-postfix.json`](./resumen-2026-07-12b-prod-MATRIZ-postfix.json) / [`.md`](./resumen-2026-07-12b-prod-MATRIZ-postfix.md) | Análisis run 02 (incluye HTTP) |
| [`resumen-2026-07-12c-prod-VALIDADOR.json`](./resumen-2026-07-12c-prod-VALIDADOR.json) / [`.md`](./resumen-2026-07-12c-prod-VALIDADOR.md) | Análisis run 03 |
| [`esperado-vs-recibido-02-MATRIZ.json`](./esperado-vs-recibido-02-MATRIZ.json) / [`.md`](./esperado-vs-recibido-02-MATRIZ.md) | Negocio: 984/1263 coinciden (77,9 %) |
| [`esperado-vs-recibido-03-VALIDADOR.json`](./esperado-vs-recibido-03-VALIDADOR.json) / [`.md`](./esperado-vs-recibido-03-VALIDADOR.md) | Negocio: 741/947 coinciden (78,2 %) |
| [`TABLA-diferencias-esperado-matriz-validador.md`](./TABLA-diferencias-esperado-matriz-validador.md) | Tabla A (71 negocio) + Tabla B (92 HTTP) |

**Fuente de logs:** `Postman/generador/logs/historial/vcn/` (commiteados desde máquina VPN).

**Diseño general:** [`../README.md`](../README.md).

---

## Metodología del estudio (obligatoria en cada iteración)

El estudio **debe arrojar y dejar escritas** las respuestas obvias, para no re-estudiar ante preguntas básicas.

### Dos dimensiones (no mezclar)

1. **NEGOCIO** = `recibidoNegocio` (codigoError o respuestas[0].resultado) vs `codigoErrorEsperado`.
2. **HTTP** = `httpRealLambda` vs `httpEsperado` (protocolo, no payload).

Ver [`../10-http-vs-codigoerror.md`](../10-http-vs-codigoerror.md).

### Banderas y preguntas obvias

`analizar-por-escenario.js` computa automáticamente:

- **`banderas`** — señales críticas (0 positivas, 0 asserts verdes, dominancia de codigoError, HTTP aplana a 200, señal de despliegue).
- **`preguntasObvias`** — respuestas precomputadas (¿camino feliz?, ¿HTTP real siempre 200?, ¿HTTP coincide?, veredicto).

Ambas se imprimen en consola **antes** que cualquier volcado, van al `.json` y al `.md`.

### Flujo completo

```powershell
# 1) Correr Newman (máquina VPN):
node run-newman.js vcn --codigo-fuente prod
# → genera logs/resultados-por-escenario-vcn.json ENRIQUECIDO (HTTP real incluido)

# 2) Analizar:
cd Postman\comparar-prod-vs-dev\recopilacion
node analizar-por-escenario.js ..\..\generador\logs\resultados-por-escenario-vcn.json --salida resumen-<id>.json

# 3) Esperado vs recibido (negocio):
node comparar-esperado-vs-recibido.js <por-escenario.json> --salida esperado-vs-recibido-<id>.json

# 4) Tabla 3 columnas (si hay runs MATRIZ + VALIDADOR):
node comparar-3-columnas.js <matriz.json> <validador.json> --salida TABLA-diferencias.md
```

### Runs viejos (sin HTTP real)

```powershell
node regenerar-por-escenario.js ..\..\generador\logs\historial\vcn\<run>_completo.json prod MATRIZ enriquecido-<id>.json
```

La regla: **si una pregunta es básica/obvia, la respuesta ya debe estar en `banderas`/`preguntasObvias`**; si falta, se agrega al script, no se responde ad-hoc.

### ⚠ Error corregido (jul-2026)

Estudios previos comparaban solo `codigoError` (null en parametro/metodo/exito). Eso inflaba diferencias
(136→71 escenarios, 43%→22% ejecuciones) y generó falsos positivos (`510–515→null`, `413→null`).
Corregido: usar `recibidoNegocio`. Ver nota en [`../08-esperado-vs-recibido-prod.md`](../08-esperado-vs-recibido-prod.md).
