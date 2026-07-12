# Análisis por escenario — VCN

| Campo | Valor |
|-------|-------|
| Archivo | `2026-07-12T21-46-59Z_prod_VALIDADOR_completo_por-escenario.json` |
| Código fuente | prod |
| Nivel ejecución | VALIDADOR |
| Fecha | 2026-07-12T21:46:59.773Z |

## Preguntas obvias (precomputadas)

| Pregunta | Respuesta |
|----------|-----------|
| ¿algun camino feliz dio respuesta positiva? | **SI (150)** |
| ¿alguna respuesta positiva en todo el run? | **SI (735)** |
| ¿algun assert en verde? | **SI (732)** |
| codigoError dominante | **null (68.6% ejecuciones)** |
| ¿HTTP siempre 200? | **SI** |
| veredicto | **Sin anomalias criticas detectadas.** |

## Banderas / señales automáticas

Sin banderas.

## Números

- Ejecuciones: **947** | positivas: **735** | assert OK: **732**
- Escenarios únicos: **316** | positivos: **244** | 550: **0** | 400: **18**
- Caminos felices (éxito): grupos **150**, positivos **150**
- Top codigoError: null×650, 404×66, 400×54, 405×51, 509×51, 401×36, 406×12, 425×12, 999×9, 402×3

### Por bloque de ruta

| Bloque | Total | 550 | 400 | otro |
|--------|-------|-----|-----|------|
| `General/0_jsonEntrada` | 2 | 0 | 0 | 2 |
| `General/1_validaciones_js` | 228 | 0 | 54 | 174 |
| `General/2_reglaNegocio` | 45 | 0 | 0 | 45 |
| `Metodo/0001` | 672 | 0 | 0 | 672 |
