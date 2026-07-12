# Recopilación — comparar prod vs dev

Carpeta de **iteraciones de recopilación Newman**: cada run etiquetado (`codigoFuente` + `nivelEjecucion`) que alimenta el informe humano posterior.

| Archivo | Contenido |
|---------|-----------|
| [`ITERACION-01-prod-a-dev-MATRIZ-2026-07-12.md`](./ITERACION-01-prod-a-dev-MATRIZ-2026-07-12.md) | Primer run real: prod-a-dev, VCN completo, `NIVEL_EJECUCION=MATRIZ` |
| [`resumen-2026-07-12-prod-MATRIZ.json`](./resumen-2026-07-12-prod-MATRIZ.json) | Estadísticas machine-readable del run 01 |
| [`analizar-por-escenario.js`](./analizar-por-escenario.js) | Script para repetir el análisis sobre cualquier `*_por-escenario.json` |

**Fuente de logs:** `Postman/generador/logs/historial/vcn/` (commiteados desde máquina VPN).

**Diseño general:** [`../README.md`](../README.md).
