# Foto de presentación al cliente — VCN (prod)

Solo observación de corrida Newman. **No** incluye catálogo / “Nueva descripción”. Archivo por **código fuente** (`prod`/`dev`): no se sobrescriben entre sí.

| Campo | Valor |
|-------|-------|
| Servicio | VCN |
| Código fuente | prod |
| Fecha corrida | 2026-07-14T09:09:27.962Z |
| Nivel ejecución | MATRIZ |
| Escenarios analizados | 1323 |
| Filas foto (código+descripción) | 24 |
| Contratos (columnas) | A.mensajeError, A.descripcionError, B, C |
| Patrones estructurales únicos | 24 |
| Nota | foto presentacion contratos post deploy prod-a-dev |

## Contratos (referencia)

`A.mensajeError` ≠ `A.descripcionError` (claves distintas). Detalle: [`formas-presentacion-cliente.md`](formas-presentacion-cliente.md).

## Foto por código

Un renglón = código + descripción observada. Columnas = contratos vistos en la corrida (`x`/`-`).

| Código | Descripción | A.mensajeError | A.descripcionError | B | C | Escenarios | HTTP vistos | Cifrado |
|--------|-------------|---|---|---|---|------------|-------------|---------|
| 0 | *(sin texto; solo resultado)* | - | - | x | - | 636 | 200 | sí |
| 400 | Error de formato en campo canal | - | x | - | - | 8 | 200 | no |
| 400 | Error de formato en campo validador | - | x | - | - | 16 | 200 | no |
| 400 | Error en la petición original | x | - | - | - | 48 | 200 | no |
| 401 | Canal emisor no existe | x | - | - | - | 32 | 200 | no |
| 402 | Canal validador no disponible | x | - | - | - | 4 | 200 | no |
| 404 | Campo idSolicitud no cumple con los criterios | x | - | - | - | 40 | 200 | sí |
| 404 | Validador no existe | x | - | - | - | 44 | 200 | no |
| 405 | Error en descifrado canal emisor | x | - | - | - | 68 | 200 | no |
| 406 | Error en descifrado canal validador | x | - | - | - | 16 | 200 | no |
| 413 | *(sin texto; solo resultado)* | - | - | x | - | 68 | 200 | sí |
| 418 | Metodo no soportado por el validador | x | - | - | - | 4 | 200 | no |
| 425 | Cantidad de solicitudes no permitidas. | x | - | - | - | 16 | 200 | sí |
| 509 | Error inesperado al llamar servicio interno | x | - | - | - | 4 | 200 | no |
| 509 | Error inesperado en validador | x | - | - | - | 84 | 200 | no |
| 510 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | sí |
| 511 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | sí |
| 512 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | sí |
| 513 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | sí |
| 514 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | sí |
| 515 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | sí |
| 550 | Error inesperado | - | x | - | - | 23 | 200 | no |
| 999 | Error en la solicitud | x | - | - | - | 12 | 200 | no |
| — | *(sin texto; solo resultado)* | - | - | - | x | 8 | 200 | no |

## Patrones estructurales únicos

Primera `presentacionPatternKey` = patrón; misma clave se agrega; distinta = nuevo. Muestras request/response: [`foto-presentacion-vcn-prod.muestras.md`](foto-presentacion-vcn-prod.muestras.md).

| # | Forma | Código | Campo texto | Claves | HTTP | Cifrado | Escenarios | Ejemplo |
|---|-------|--------|-------------|--------|------|---------|------------|---------|
| 1 | A.descripcionError | 400 | descripcionError | `codigoError,descripcionError` | 200 | no | 16 | 1.2.1. validador — propiedad ausente (undefined) (400) |
| 2 | A.descripcionError | 400 | descripcionError | `codigoError,descripcionError` | 200 | no | 8 | 1.1.1. idCanal — propiedad ausente (undefined) (400) |
| 3 | A.descripcionError | 550 | descripcionError | `codigoError,descripcionError` | 200 | no | 23 | 0.1. body — JSON HTTP inválido (400) |
| 4 | A.mensajeError | 400 | mensajeError | `codigoError,mensajeError` | 200 | no | 48 | 1.3.1. peticion — propiedad ausente (undefined) (400) |
| 5 | A.mensajeError | 401 | mensajeError | `codigoError,mensajeError` | 200 | no | 32 | 1.1.7. idCanal — solo espacios, trim vacío (400) |
| 6 | A.mensajeError | 402 | mensajeError | `codigoError,mensajeError` | 200 | no | 4 | 2.2.2. validador — deshabilitado (402) [CANAL_VALIDADOR_DESHABILITADO] |
| 7 | A.mensajeError | 404 | mensajeError | `codigoError,mensajeError` | 200 | no | 44 | 1.2.4. validador — tipo number (400) |
| 8 | A.mensajeError | 404 | mensajeError | `codigoError,mensajeError` | 200 | sí | 40 | 1.5.4. solicitudes — sin propiedad idSolicitud (431) |
| 9 | A.mensajeError | 405 | mensajeError | `codigoError,mensajeError` | 200 | no | 68 | 1.3.4. peticion — tipo number (400) |
| 10 | A.mensajeError | 406 | mensajeError | `codigoError,mensajeError` | 200 | no | 16 | 0001.5.1022.2. validador PROXGATO auth fijo — cifrado invertido (406) |
| 11 | A.mensajeError | 418 | mensajeError | `codigoError,mensajeError` | 200 | no | 4 | 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO] |
| 12 | A.mensajeError | 425 | mensajeError | `codigoError,mensajeError` | 200 | sí | 16 | 1.5.1. solicitudes — tipo string (425) |
| 13 | A.mensajeError | 509 | mensajeError | `codigoError,mensajeError` | 200 | no | 84 | 1.4.9. idPeticion — longitud 7, mínimo 8 (400) |
| 14 | A.mensajeError | 509 | mensajeError | `codigoError,mensajeError` | 200 | no | 4 | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) |
| 15 | A.mensajeError | 999 | mensajeError | `codigoError,mensajeError` | 200 | no | 12 | 1.5.19. solicitudes — elemento null en arreglo (431) |
| 16 | B | 0 | — | `idPeticion,respuestas` | 200 | sí | 636 | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) |
| 17 | B | 413 | — | `idPeticion,respuestas` | 200 | sí | 68 | 0001.1.1.3. cuenta — string vacío (413) |
| 18 | B | 510 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0001.2.1008.510. validador CELEGATO — Número de cuenta incorrecta (510) |
| 19 | B | 511 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0001.2.1008.511. validador CELEGATO — Número de cuenta cerrado (511) |
| 20 | B | 512 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0001.2.1008.512. validador CELEGATO — Número de cuenta bloqueado (512) |
| 21 | B | 513 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0001.2.1008.513. validador CELEGATO — Transacción no permitida (513) |
| 22 | B | 514 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0001.2.1008.514. validador CELEGATO — Falta información obligatoria de consulta (514) |
| 23 | B | 515 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0001.2.1008.515. validador CELEGATO — Razón regulatoria (515) |
| 24 | C | — | — | `message` | 200 | no | 8 | 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599) |
