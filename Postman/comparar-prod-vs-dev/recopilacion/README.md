# Recopilación — comparar prod vs dev

Carpeta de **iteraciones de recopilación Newman**: cada run etiquetado (`codigoFuente` + `nivelEjecucion`) que alimenta el informe humano posterior.

| Archivo | Contenido |
|---------|-----------|
| [`ITERACION-01-prod-a-dev-MATRIZ-2026-07-12.md`](./ITERACION-01-prod-a-dev-MATRIZ-2026-07-12.md) | Primer run real: prod-a-dev, VCN completo, `NIVEL_EJECUCION=MATRIZ`. Empieza con **RESPUESTAS RÁPIDAS + banderas** |
| [`resumen-2026-07-12-prod-MATRIZ.json`](./resumen-2026-07-12-prod-MATRIZ.json) | Estadísticas machine-readable del run 01 (incluye `banderas` y `preguntasObvias`) |
| [`resumen-2026-07-12-prod-MATRIZ.md`](./resumen-2026-07-12-prod-MATRIZ.md) | Misma info en tabla legible (generada por el script) |
| [`analizar-por-escenario.js`](./analizar-por-escenario.js) | Script para repetir el análisis sobre cualquier `*_por-escenario.json` |

**Fuente de logs:** `Postman/generador/logs/historial/vcn/` (commiteados desde máquina VPN).

**Diseño general:** [`../README.md`](../README.md).

---

## Metodología del estudio (obligatoria en cada iteración)

El estudio **debe arrojar y dejar escritas** las respuestas obvias, para no re-estudiar ante preguntas básicas. `analizar-por-escenario.js` computa automáticamente:

- **`banderas`** — señales críticas/anomalías detectadas solas (0 positivas, 0 asserts verdes, dominancia de un `codigoError`, señal de despliegue, pista infra vs negocio).
- **`preguntasObvias`** — respuestas precomputadas a preguntas típicas (¿algún camino feliz positivo?, ¿HTTP siempre 200?, codigoError dominante, veredicto).

Ambas se imprimen en consola **antes** que cualquier volcado, van al `.json` y al `.md`, y se copian al inicio del documento de iteración bajo **"RESPUESTAS RÁPIDAS"**.

Uso:

```powershell
cd Postman\comparar-prod-vs-dev\recopilacion
node analizar-por-escenario.js <ruta-por-escenario.json> --salida resumen-<fecha>-<fuente>-<nivel>.json
```

Genera `.json` + `.md` hermanos. La regla: **si una pregunta es básica/obvia, la respuesta ya debe estar en `banderas`/`preguntasObvias`**; si falta, se agrega al script, no se responde ad-hoc.
