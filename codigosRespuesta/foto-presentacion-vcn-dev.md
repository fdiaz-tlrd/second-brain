# Foto de presentación al cliente — VCN (dev)

Solo observación de corrida Newman. **No** incluye catálogo / “Nueva descripción”. Archivo por **código fuente** (`prod`/`dev`): no se sobrescriben entre sí.

| Campo | Valor |
|-------|-------|
| Servicio | VCN |
| Código fuente | dev |
| Fecha corrida | 2026-07-15T17:02:19.033Z |
| Nivel ejecución | MATRIZ |
| Escenarios analizados | 1335 |
| Filas foto (código+descripción) | 26 |
| Contratos (columnas) | A.mensajeError, A.descripcionError, B |
| Patrones estructurales únicos | 27 |
| Nota | post-deploy Dig 481/482/418 canales 1018-1024 |

## Contratos (referencia)

`A.mensajeError` ≠ `A.descripcionError` (claves distintas). Detalle: [`formas-presentacion-cliente.md`](formas-presentacion-cliente.md).

## Foto por código

Un renglón = código + descripción observada. Columnas = contratos vistos en la corrida (`x`/`-`).

| Código | Descripción | A.mensajeError | A.descripcionError | B | Escenarios | HTTP vistos | Cifrado |
|--------|-------------|---|---|---|------------|-------------|---------|
| 0 | *(sin texto; solo resultado)* | - | - | x | 640 | 200 | sí |
| 400 | Error de formato en campo canal | - | x | - | 8 | 200 | no |
| 400 | Error de formato en campo validador | - | x | - | 16 | 200 | no |
| 400 | Error en la petición original | x | - | - | 52 | 200 | sí y no |
| 401 | Canal emisor no existe | x | - | - | 32 | 200 | no |
| 402 | Canal validador no disponible | x | - | - | 4 | 200 | no |
| 403 | Canal emisor no tiene un plan de suscripción | x | - | - | 8 | 200 | no |
| 404 | Validador no existe | x | - | - | 32 | 200 | no |
| 405 | Error en descifrado canal emisor | x | - | - | 64 | 200 | no |
| 406 | Error en descifrado canal validador | x | - | - | 8 | 200 | no |
| 413 | *(sin texto; solo resultado)* | - | - | x | 80 | 200 | sí |
| 418 | Método no soportado por el validador | x | - | - | 8 | 200 | no |
| 425 | Cantidad de solicitudes no permitidas | x | - | - | 8 | 200 | sí |
| 431 | Campo idSolicitud no cumple con los criterios | x | - | - | 92 | 200 | sí |
| 481 | Método inválido | x | - | - | 4 | 200 | no |
| 482 | Método no disponible para el Canal Emisor | x | - | - | 4 | 200 | sí |
| 500 | Error interno | x | - | - | 20 | 200 | no |
| 509 | Error inesperado en el Canal Validador | x | - | - | 32 | 200 | no |
| 510 | *(sin texto; solo resultado)* | - | - | x | 32 | 200 | sí |
| 511 | *(sin texto; solo resultado)* | - | - | x | 32 | 200 | sí |
| 512 | *(sin texto; solo resultado)* | - | - | x | 32 | 200 | sí |
| 513 | *(sin texto; solo resultado)* | - | - | x | 32 | 200 | sí |
| 514 | *(sin texto; solo resultado)* | - | - | x | 32 | 200 | sí |
| 515 | *(sin texto; solo resultado)* | - | - | x | 32 | 200 | sí |
| 550 | Error inesperado | - | x | - | 23 | 200 | no |
| 599 | Tiempo de espera agotado al llamar al Canal Validador | x | - | - | 8 | 200 | no |

## Patrones estructurales únicos

Primera `presentacionPatternKey` = patrón; misma clave se agrega; distinta = nuevo. Muestras request/response: [`foto-presentacion-vcn-dev.muestras.md`](foto-presentacion-vcn-dev.muestras.md).

| # | Forma | Código | Campo texto | Claves | HTTP | Cifrado | Escenarios | Ejemplo |
|---|-------|--------|-------------|--------|------|---------|------------|---------|
| 1 | A.descripcionError | 400 | descripcionError | `codigoError,descripcionError` | 200 | no | 16 | 1.2.1. validador — propiedad ausente (undefined) (400) |
| 2 | A.descripcionError | 400 | descripcionError | `codigoError,descripcionError` | 200 | no | 8 | 1.1.1. idCanal — propiedad ausente (undefined) (400) |
| 3 | A.descripcionError | 550 | descripcionError | `codigoError,descripcionError` | 200 | no | 23 | 0.1. body — JSON HTTP inválido (400) |
| 4 | A.mensajeError | 400 | mensajeError | `codigoError,mensajeError` | 200 | no | 48 | 1.3.1. peticion — propiedad ausente (undefined) (400) |
| 5 | A.mensajeError | 400 | mensajeError | `codigoError,mensajeError` | 200 | sí | 4 | 1.5.1. solicitudes — tipo string (425) |
| 6 | A.mensajeError | 401 | mensajeError | `codigoError,mensajeError` | 200 | no | 32 | 1.1.7. idCanal — solo espacios, trim vacío (400) |
| 7 | A.mensajeError | 402 | mensajeError | `codigoError,mensajeError` | 200 | no | 4 | 2.2.2. validador — deshabilitado (402) [CANAL_VALIDADOR_DESHABILITADO] |
| 8 | A.mensajeError | 403 | mensajeError | `codigoError,mensajeError` | 200 | no | 8 | 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN] |
| 9 | A.mensajeError | 404 | mensajeError | `codigoError,mensajeError` | 200 | no | 32 | 1.2.7. validador — solo espacios, trim vacío (400) |
| 10 | A.mensajeError | 405 | mensajeError | `codigoError,mensajeError` | 200 | no | 64 | 1.3.4. peticion — tipo number (400) |
| 11 | A.mensajeError | 406 | mensajeError | `codigoError,mensajeError` | 200 | no | 8 | 0001.5.1022.2. validador PROXGATO auth fijo — cifrado invertido (406) |
| 12 | A.mensajeError | 418 | mensajeError | `codigoError,mensajeError` | 200 | no | 8 | 2.2.4. validador — sin renglón operación 0001 (418) [CANAL_VALIDADOR_SIN_OPERACION] |
| 13 | A.mensajeError | 425 | mensajeError | `codigoError,mensajeError` | 200 | sí | 8 | 1.5.2. solicitudes — arreglo vacío (425) |
| 14 | A.mensajeError | 431 | mensajeError | `codigoError,mensajeError` | 200 | sí | 92 | 1.5.4. solicitudes — sin propiedad idSolicitud (431) |
| 15 | A.mensajeError | 481 | mensajeError | `codigoError,mensajeError` | 200 | no | 4 | 2.4.1. metodo — no está en MAPA_METODO_SERVICIO (481) |
| 16 | A.mensajeError | 482 | mensajeError | `codigoError,mensajeError` | 200 | sí | 4 | 2.4.2. metodo — negado explícitamente para el canal emisor (482) [CANAL_EMISOR_SIN_METODO] |
| 17 | A.mensajeError | 500 | mensajeError | `codigoError,mensajeError` | 200 | no | 20 | 1.2.4. validador — tipo number (400) |
| 18 | A.mensajeError | 509 | mensajeError | `codigoError,mensajeError` | 200 | no | 32 | 1.4.9. idPeticion — longitud 7, mínimo 8 (400) |
| 19 | A.mensajeError | 599 | mensajeError | `codigoError,mensajeError` | 200 | no | 8 | 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599) |
| 20 | B | 0 | — | `idPeticion,respuestas` | 200 | sí | 640 | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) |
| 21 | B | 413 | — | `idPeticion,respuestas` | 200 | sí | 80 | 0001.1.1.1. cuenta — propiedad ausente (413) |
| 22 | B | 510 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0001.2.1008.510. validador CELEGATO — Número de cuenta incorrecta (510) |
| 23 | B | 511 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0001.2.1008.511. validador CELEGATO — Número de cuenta cerrado (511) |
| 24 | B | 512 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0001.2.1008.512. validador CELEGATO — Número de cuenta bloqueado (512) |
| 25 | B | 513 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0001.2.1008.513. validador CELEGATO — Transacción no permitida (513) |
| 26 | B | 514 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0001.2.1008.514. validador CELEGATO — Falta información obligatoria de consulta (514) |
| 27 | B | 515 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0001.2.1008.515. validador CELEGATO — Razón regulatoria (515) |
