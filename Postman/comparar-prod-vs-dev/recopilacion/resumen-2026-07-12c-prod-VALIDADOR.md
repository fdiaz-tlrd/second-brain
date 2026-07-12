# Análisis por escenario — VCN

| Campo | Valor |
|-------|-------|
| Archivo | `enriquecido-03-VALIDADOR_por-escenario.json` |
| Código fuente | prod |
| Nivel ejecución | VALIDADOR |
| Fecha | 2026-07-12T23:10:30.053Z |

## Preguntas obvias (precomputadas)

| Pregunta | Respuesta |
|----------|-----------|
| ¿algun camino feliz dio respuesta positiva? | **SI (150)** |
| ¿alguna respuesta positiva en todo el run? | **SI (735)** |
| ¿algun assert en verde? | **SI (732)** |
| codigoError dominante | **null (68.6% ejecuciones)** |
| ¿HTTP (dummy descifrar) siempre 200? | **SI** |
| ¿HTTP REAL de la lambda siempre 200? | **NO** |
| ¿HTTP real coincide con lo esperado? | **NO en 98 (10.3%)** |
| veredicto | **Comportamiento anomalo: apunta a problema en lo desplegado (codigo/config).** |

## Banderas / señales automáticas

- HTTP: 98 ejecuciones (10.3%) con HTTP real != esperado. Revisar tabla de comparacion.

## Números

- Ejecuciones: **947** | positivas: **735** | assert OK: **732**
- Escenarios únicos: **316** | positivos: **244** | 550: **0** | 400: **18**
- Caminos felices (éxito): grupos **150**, positivos **150**
- Top codigoError: null×650, 404×66, 400×54, 405×51, 509×51, 401×36, 406×12, 425×12, 999×9, 402×3

### HTTP (protocolo) — real de la lambda vs esperado

- Ejecuciones con HTTP real: **947** | coincide con esperado: **849** | difiere: **98** (10.3%)
- HTTP real de la lambda: 200×765, 400×180, 502×2
- HTTP esperado por el plan: 200×672, 400×269, 500×6
- ¿La lambda aplana todo a HTTP 200?: **NO**

### Por bloque de ruta

| Bloque | Total | 550 | 400 | otro |
|--------|-------|-----|-----|------|
| `?` | 947 | 0 | 54 | 893 |
