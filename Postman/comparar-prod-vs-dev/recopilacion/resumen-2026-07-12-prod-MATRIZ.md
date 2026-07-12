# Análisis por escenario — VCN

| Campo | Valor |
|-------|-------|
| Archivo | `2026-07-12T17-20-06Z_prod_MATRIZ_completo_por-escenario.json` |
| Código fuente | prod |
| Nivel ejecución | MATRIZ |
| Fecha | 2026-07-12T17:20:06.165Z |

## Preguntas obvias (precomputadas)

| Pregunta | Respuesta |
|----------|-----------|
| ¿algun camino feliz dio respuesta positiva? | **NO** |
| ¿alguna respuesta positiva en todo el run? | **NO** |
| ¿algun assert en verde? | **NO** |
| codigoError dominante | **550 (98.4% ejecuciones)** |
| ¿HTTP siempre 200? | **SI** |
| veredicto | **Comportamiento anomalo: apunta a problema en lo desplegado (codigo/config).** |

## Banderas / señales automáticas

- CRITICO: 0 respuestas positivas en TODO el run (1263 ejecuciones). Ningun camino feliz respondio negocio.
- CRITICO: los 150 escenarios de EXITO (camino feliz) no devolvieron respuesta positiva (todos error).
- CRITICO: 0 asserts en verde en todo el run.
- ANOMALIA: codigoError 550 domina el 98.4% de las ejecuciones (esperado: variedad por escenario).
- SEÑAL DE DESPLIEGUE: 550 'Error inesperado' sistematico apunta a problema de CODIGO o CONFIGURACION en lo desplegado, no a validacion de negocio. Un servicio ya liberado en produccion no deberia errar asi de forma masiva.
- PISTA: HTTP siempre 200 pero negocio siempre error -> la infra responde; el fallo esta en la logica/payload de negocio tras descifrar, no en red/conectividad.

## Números

- Ejecuciones: **1263** | positivas: **0** | assert OK: **0**
- Escenarios únicos: **316** | positivos: **0** | 550: **311** | 400: **5**
- Caminos felices (éxito): grupos **150**, positivos **0**
- Top codigoError: 550×1243, 400×20

### Por bloque de ruta

| Bloque | Total | 550 | 400 | otro |
|--------|-------|-----|-----|------|
| `General/0_jsonEntrada` | 3 | 3 | 0 | 0 |
| `General/1_validaciones_js` | 304 | 284 | 20 | 0 |
| `General/2_reglaNegocio` | 60 | 60 | 0 | 0 |
| `Metodo/0001` | 896 | 896 | 0 | 0 |
