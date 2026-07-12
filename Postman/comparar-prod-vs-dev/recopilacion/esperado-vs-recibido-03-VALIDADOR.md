# Esperado vs recibido — VALIDADOR

| Campo | Valor |
|-------|-------|
| Archivo run | `2026-07-12T21-46-59Z_prod_VALIDADOR_completo_por-escenario.json` |
| Código fuente | prod |
| Nivel | VALIDADOR |

## Resumen

- **Ejecuciones** con fuente: **947** → coinciden **546** (57.7%) | difieren **401** (42.3%)
- **Escenarios únicos**: **316** → todos sus runs coinciden: **182** | con al menos un run distinto: **134** | todos los runs distintos: **134**

### Por bloque de ruta

| Bloque | Total | Coinciden | Difieren |
|--------|-------|-----------|----------|
| `General/0_jsonEntrada` | 2 | 0 | 2 |
| `General/1_validaciones_js` | 228 | 63 | 165 |
| `General/2_reglaNegocio` | 45 | 27 | 18 |
| `Metodo/0001` | 672 | 456 | 216 |

### Top pares esperado → recibido (solo diferencias)

| Esperado → Recibido | Cantidad |
|---------------------|----------|
| 413→null | 51 |
| 400→401 | 33 |
| 400→404 | 33 |
| 431→509 | 33 |
| 400→405 | 30 |
| 431→404 | 30 |
| 510→null | 24 |
| 511→null | 24 |
| 512→null | 24 |
| 513→null | 24 |
| 514→null | 24 |
| 515→null | 24 |
| 403→509 | 6 |
| 418→509 | 6 |
| 413→999 | 6 |
| 509→406 | 6 |
| 431→425 | 3 |
| 431→999 | 3 |
| 500→405 | 3 |
| 500→418 | 3 |
| 413→509 | 3 |
| 599→null | 3 |
| 599→509 | 3 |
| 400→null | 2 |
