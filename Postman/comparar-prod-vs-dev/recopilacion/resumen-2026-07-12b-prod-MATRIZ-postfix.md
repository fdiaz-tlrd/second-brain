# Análisis por escenario — VCN

| Campo | Valor |
|-------|-------|
| Archivo | `2026-07-12T21-08-09Z_prod_MATRIZ_completo_por-escenario.json` |
| Código fuente | prod |
| Nivel ejecución | MATRIZ |
| Fecha | 2026-07-12T21:08:09.869Z |

## Preguntas obvias (precomputadas)

| Pregunta | Respuesta |
|----------|-----------|
| ¿algun camino feliz dio respuesta positiva? | **SI (150)** |
| ¿alguna respuesta positiva en todo el run? | **SI (876)** |
| ¿algun assert en verde? | **SI (868)** |
| codigoError dominante | **null (68.7% ejecuciones)** |
| ¿HTTP siempre 200? | **SI** |
| veredicto | **Sin anomalias criticas detectadas.** |

## Banderas / señales automáticas

Sin banderas.

## Números

- Ejecuciones: **1263** | positivas: **876** | assert OK: **868**
- Escenarios únicos: **316** | positivos: **217** | 550: **6** | 400: **17**
- Caminos felices (éxito): grupos **150**, positivos **150**
- Top codigoError: null×868, 404×88, 400×68, 405×68, 509×64, 401×32, 550×23, 406×16, 425×16, 999×12

### Por bloque de ruta

| Bloque | Total | 550 | 400 | otro |
|--------|-------|-----|-----|------|
| `General/0_jsonEntrada` | 3 | 3 | 0 | 0 |
| `General/1_validaciones_js` | 304 | 20 | 68 | 216 |
| `General/2_reglaNegocio` | 60 | 0 | 0 | 60 |
| `Metodo/0001` | 896 | 0 | 0 | 896 |
