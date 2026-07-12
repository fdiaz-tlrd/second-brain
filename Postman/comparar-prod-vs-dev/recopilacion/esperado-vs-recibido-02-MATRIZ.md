# Esperado vs recibido — MATRIZ

| Campo | Valor |
|-------|-------|
| Archivo run | `2026-07-12T21-08-09Z_prod_MATRIZ_completo_por-escenario.json` |
| Código fuente | prod |
| Nivel | MATRIZ |

## Resumen

- **Ejecuciones** con fuente: **1263** → coinciden **724** (57.3%) | difieren **539** (42.7%)
- **Escenarios únicos**: **316** → todos sus runs coinciden: **181** | con al menos un run distinto: **135** | todos los runs distintos: **135**

### Por bloque de ruta

| Bloque | Total | Coinciden | Difieren |
|--------|-------|-----------|----------|
| `General/0_jsonEntrada` | 3 | 0 | 3 |
| `General/1_validaciones_js` | 304 | 80 | 224 |
| `General/2_reglaNegocio` | 60 | 36 | 24 |
| `Metodo/0001` | 896 | 608 | 288 |

### Top pares esperado → recibido (solo diferencias)

| Esperado → Recibido | Cantidad |
|---------------------|----------|
| 413→null | 68 |
| 400→404 | 44 |
| 431→509 | 44 |
| 400→405 | 40 |
| 431→404 | 40 |
| 510→null | 32 |
| 511→null | 32 |
| 512→null | 32 |
| 513→null | 32 |
| 514→null | 32 |
| 515→null | 32 |
| 400→401 | 28 |
| 400→550 | 23 |
| 403→509 | 8 |
| 418→509 | 8 |
| 413→999 | 8 |
| 599→null | 8 |
| 509→406 | 8 |
| 431→425 | 4 |
| 431→999 | 4 |
| 500→405 | 4 |
| 500→418 | 4 |
| 413→509 | 4 |
