# Análisis por escenario — VCN

| Campo | Valor |
|-------|-------|
| Archivo | `enriquecido-02-MATRIZ_por-escenario.json` |
| Código fuente | prod |
| Nivel ejecución | MATRIZ |
| Fecha | 2026-07-12T23:10:29.686Z |

## Preguntas obvias (precomputadas)

| Pregunta | Respuesta |
|----------|-----------|
| ¿algun camino feliz dio respuesta positiva? | **SI (150)** |
| ¿alguna respuesta positiva en todo el run? | **SI (876)** |
| ¿algun assert en verde? | **SI (868)** |
| codigoError dominante | **null (68.7% ejecuciones)** |
| ¿HTTP (dummy descifrar) siempre 200? | **SI** |
| ¿HTTP REAL de la lambda siempre 200? | **SI (aplana todo a 200)** |
| ¿HTTP real coincide con lo esperado? | **NO en 367 (29.1%)** |
| veredicto | **Comportamiento anomalo: apunta a problema en lo desplegado (codigo/config).** |

## Banderas / señales automáticas

- HTTP: la lambda devuelve HTTP 200 en TODAS las 1263 ejecuciones, pero el plan esperaba HTTP != 200 en 367 (29.1%). El status HTTP no refleja el error de negocio (todo va 200 + codigoError en el body).

## Números

- Ejecuciones: **1263** | positivas: **876** | assert OK: **868**
- Escenarios únicos: **316** | positivos: **217** | 550: **6** | 400: **17**
- Caminos felices (éxito): grupos **150**, positivos **150**
- Top codigoError: null×868, 404×88, 400×68, 405×68, 509×64, 401×32, 550×23, 406×16, 425×16, 999×12

### HTTP (protocolo) — real de la lambda vs esperado

- Ejecuciones con HTTP real: **1263** | coincide con esperado: **896** | difiere: **367** (29.1%)
- HTTP real de la lambda: 200×1263
- HTTP esperado por el plan: 200×896, 400×359, 500×8
- ¿La lambda aplana todo a HTTP 200?: **SÍ**

### Por bloque de ruta

| Bloque | Total | 550 | 400 | otro |
|--------|-------|-----|-----|------|
| `?` | 1263 | 23 | 68 | 1172 |
