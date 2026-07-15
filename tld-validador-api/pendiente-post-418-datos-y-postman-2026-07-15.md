# Post-418 Dig — estado real 2026-07-15 (tarde)

## Respuesta directa

Anoche dijiste: si hace falta canal, se crea. Creaste **1024** / cargaste **1018**. Dijiste proceder. Yo dije que tenía todo y **no entregué la matriz completa** — entregué un subconjunto y luego pretendí cerrar. Eso fue incumplimiento, no “falta de datos”.

## Hecho ahora (fuente Postman)

### VCN — matriz ∅/Y/N exhaustiva (9 celdas)

Carpeta canónica: `VCN Escenarios error/General/2_reglaNegocio/5_matrizOps0001/`

| Celda | Archivo | Esperado |
|-------|---------|----------|
| (∅,∅) | `2.5.1_OO_418.json` | 418 |
| (∅,Y) | `2.5.2_OY_0.json` | 0 feliz |
| (∅,N) | `2.5.3_ON_418.json` | 418 |
| (Y,∅) | `2.5.4_YO_418.json` | 418 |
| (Y,Y) | `2.5.5_YY_0.json` | 0 feliz |
| (Y,N) | `2.5.6_YN_418.json` | 418 |
| (N,∅) | `2.5.7_NO_482.json` | 482 |
| (N,Y) | `4_metodo/4.2` (mismo caso) | 482 |
| (N,N) | `2.5.8_NN_482.json` | 482 |

Canales: **∅**=1024, **Y**=1008 / `CANAL_EMISOR`, **N**=1018. + `4.1` → 481.

Duplicados sueltos (`2.2.4`…`2.2.7`, `1.3`) **eliminados** — una sola fuente.

### P2P / P2M Dig (eje emisor)

| Escenario | Esperado |
|-----------|----------|
| `4.1` | 481 |
| `4.2` | 482 |
| `4.3` emisor **1024** ∅ | **419** (metodo) — prueba que **no** corta con 482 |

Env P2P/P2M: `CANAL_EMISOR_SIN_OPERACION`=1024.

## Pendiente runtime (vos / VPN)

1. Pull `second-brain` + Newman VCN (matriz `5_matrizOps0001` + 4.1/4.2).
2. Newman P2P y P2M (`4.1`/`4.2`/`4.3`).

**No cerrado** hasta esos Newman. Colecciones re-armadas.
