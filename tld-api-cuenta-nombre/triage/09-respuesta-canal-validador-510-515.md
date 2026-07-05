# Triage #9 — Metodo/0001/2_respuestaCanalValidador (510–515)

**Estado:** **cerrado** — Newman **48/48** escenarios; VCN completo **1008/1008** (2026-07-05T23:19Z).

## Qué valida

Respuestas de **negocio del Canal Validador** en método **0001**: códigos **510–515** dentro de `respuestas[0].resultado` (HTTP **200**, `datos: null`). El validador-proxy devuelve el código según cuenta dummy en Dynamo (`tld-validador-dummy`).

| Código | Cuenta dummy | Significado (catálogo) |
|--------|--------------|------------------------|
| 510 | `5000000510` | Número de cuenta incorrecta |
| 511 | `5000000511` | Cuenta cerrada |
| 512 | `5000000512` | Cuenta bloqueada |
| 513 | `5000000513` | Transacción no permitida |
| 514 | `5000000514` | Falta información en la consulta |
| 515 | `5000000515` | Razón regulatoria |

## Diseño de escenarios (acordado)

| Decisión | Valor |
|----------|-------|
| Total | **48** = 8 validadores × 6 códigos |
| Validadores | **1008, 1009, 1011, 1012, 1013, 1014, 1015, 1016** (no existe 1010) |
| Emisor | `{{CANAL_EMISOR}}` → **1008** fijo; solo cambia `validador` en body |
| `expectedTipo` | **`metodo`** (assert sobre `respuestas[0].resultado`) |
| Carpeta fuente | `Postman/generador/VCN Escenarios error/Metodo/0001/2_respuestaCanalValidador/{validador}/` |
| Generador | `Postman/generador/ensamblador/generar-escenarios-0001-respuesta-canal-validador.js` |
| Canales dev | `Postman/canalesPruebas-dev/` — operaciones 0001 por validador |

**No** matriz 8×8 emisores (384 escenarios).

## Newman verificado

| Run | Carpeta | Requests | Tests | Log |
|-----|---------|----------|-------|-----|
| 2026-07-05T23:01Z | `Metodo` | 174 (0 fail) | **522** (0 fail) | [`2026-07-05T23-01-33Z_Metodo.json`](../../Postman/generador/logs/historial/vcn/2026-07-05T23-01-33Z_Metodo.json) |
| 2026-07-05T23:19Z | `(completo)` | **416** (0 fail) | **1008** (0 fail) | [`2026-07-05T23-19-11Z_completo.json`](../../Postman/generador/logs/historial/vcn/2026-07-05T23-19-11Z_completo.json) |

Bloque nuevo: **+48 requests**, **+432 tests** (~9 asserts por escenario) respecto al run completo previo (576 tests).

## Código VCN

Sin cambios en `tld-api-cuenta-nombre` para este bloque — escenarios validan flujo existente validador-proxy + dummy.

## Regenerar escenarios / colección

Desde `Postman/generador/ensamblador/`:

```powershell
node generar-escenarios-0001-respuesta-canal-validador.js
node armar-coleccion.js config-vcn.json
```

Newman por carpeta: ver [`Postman/generador/README.md`](../../Postman/generador/README.md) — `Metodo/0001/2_respuestaCanalValidador` y subcarpetas por validador.

## Runner

`run-newman.js`: timeout global del run **1800000** ms (30 min). El tope anterior (120 s) cortaba el suite completo tras añadir los 48 escenarios.

## Acción

| ID | Acción | Estado |
|----|--------|--------|
| A9a | Generador + 48 JSON fuente | **Hecho** — commit `b4c400c` |
| A9b | Newman `Metodo` | **Hecho** — 522/522 |
| A9c | Newman VCN completo | **Hecho** — 1008/1008 — commit log `aee0972` |
| A9d | Doc + README generador | **Hecho** — commit `8df6084` |

## Pruebas

Checklist detallado: [02-checklist-errores-vcn-general.md](../02-checklist-errores-vcn-general.md) — sección `Metodo/0001/2_respuestaCanalValidador`.
