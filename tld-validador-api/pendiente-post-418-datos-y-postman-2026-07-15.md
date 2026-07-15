# Pendiente post-418 Dig (datos + Postman) — 2026-07-15

## Escenarios VCN matriz ops — hechos en fuente + colección

| Escenario | Esperado | Archivo |
|-----------|----------|---------|
| Emisor **1008** → validador **1024** (∅) | **418** | `2_reglaNegocio/2_validador/2.4_validador_sin_operacion.json` |
| Emisor **1008** → validador **1018** (`N`) | **418** | `2_reglaNegocio/2_validador/2.5_validador_operacion_negada.json` |
| Emisor **1024** (∅) → validador **1008** (`Y`) | feliz **0** | `Metodo/0001/3_respuestaExitosa/1008/1.3_emisor_sin_operacion_feliz.json` |
| Emisor **1018** (`N`) → validador **0001** | **482** | `4_metodo/4.2` (ya existía) |
| Método fuera de mapa | **481** | `4_metodo/4.1` (ya existía) |

Colección re-armada: `ensamblador/salida/VCN Escenarios error.postman_collection.json` (334 items). Env: `CANAL_VALIDADOR_OPERACION_NEGADA`=1018.

## Código fuente Dig

**Nada pendiente** del modelo 481/482/418/500.

## Falta para cerrar en runtime

Newman en máquina con VPN + Dig desplegado (usuario). No correr Newman desde Lenovo.
