# Esperado vs recibido — VALIDADOR

| Campo | Valor |
|-------|-------|
| Archivo run | `enriquecido-03-VALIDADOR_por-escenario.json` |
| Código fuente | prod |
| Nivel | VALIDADOR |

## Resumen

- **Ejecuciones** con fuente: **947** → coinciden **741** (78.2%) | difieren **206** (21.8%)
- **Escenarios únicos**: **316** → todos sus runs coinciden: **247** | con al menos un run distinto: **69** | todos los runs distintos: **69**

### Por bloque de ruta

| Bloque | Total | Coinciden | Difieren |
|--------|-------|-----------|----------|
| `General/0_jsonEntrada` | 2 | 0 | 2 |
| `General/1_validaciones_js` | 228 | 63 | 165 |
| `General/2_reglaNegocio` | 45 | 27 | 18 |
| `Metodo/0001` | 672 | 651 | 21 |

### Top pares esperado → recibido (solo diferencias)

| Esperado → Recibido | Cantidad |
|---------------------|----------|
| 400→401 | 33 |
| 400→404 | 33 |
| 431→509 | 33 |
| 400→405 | 30 |
| 431→404 | 30 |
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
