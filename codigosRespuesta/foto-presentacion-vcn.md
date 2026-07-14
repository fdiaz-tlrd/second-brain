# Foto de presentación al cliente — VCN

Solo observación de corrida Newman. **No** incluye catálogo / “Nueva descripción”.

| Campo | Valor |
|-------|-------|
| Servicio | VCN |
| Fecha corrida | 2026-07-13T03:16:37.003Z |
| Código fuente | prod |
| Nivel ejecución | MATRIZ |
| Escenarios analizados | 1263 |
| Filas foto (código+descripción) | 24 |
| Contratos (columnas) | A.mensajeError, A.descripcionError, B, C |
| Patrones estructurales únicos | 24 |
| Nota | MATRIZ HTTP Code 200 HD-005 captura fortalecida |

## Contratos (referencia)

`A.mensajeError` ≠ `A.descripcionError` (claves distintas). Detalle: [`formas-presentacion-cliente.md`](formas-presentacion-cliente.md).

## Foto por código

Un renglón = código + descripción observada. Columnas = contratos vistos en la corrida (`x`/`-`).

| Código | Descripción | A.mensajeError | A.descripcionError | B | C | Escenarios | HTTP vistos | Cifrado |
|--------|-------------|---|---|---|---|------------|-------------|---------|
| 0 | *(sin texto; solo resultado)* | - | - | x | - | 600 | 200 | — |
| 400 | Error de formato en campo canal | - | x | - | - | 8 | 200 | — |
| 400 | Error de formato en campo validador | - | x | - | - | 12 | 200 | — |
| 400 | Error en la petición original | x | - | - | - | 48 | 200 | — |
| 401 | Canal emisor no existe | x | - | - | - | 32 | 200 | — |
| 402 | Canal validador no disponible | x | - | - | - | 4 | 200 | — |
| 404 | Campo idSolicitud no cumple con los criterios | x | - | - | - | 40 | 200 | — |
| 404 | Validador no existe | x | - | - | - | 48 | 200 | — |
| 405 | Error en descifrado canal emisor | x | - | - | - | 68 | 200 | — |
| 406 | Error en descifrado canal validador | x | - | - | - | 16 | 200 | — |
| 413 | *(sin texto; solo resultado)* | - | - | x | - | 68 | 200 | — |
| 418 | Metodo no soportado por el validador | x | - | - | - | 4 | 200 | — |
| 425 | Cantidad de solicitudes no permitidas. | x | - | - | - | 16 | 200 | — |
| 509 | Error inesperado al llamar servicio interno | x | - | - | - | 4 | 200 | — |
| 509 | Error inesperado en validador | x | - | - | - | 64 | 200 | — |
| 510 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | — |
| 511 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | — |
| 512 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | — |
| 513 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | — |
| 514 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | — |
| 515 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | — |
| 550 | Error inesperado | - | x | - | - | 23 | 200 | — |
| 999 | Error en la solicitud | x | - | - | - | 12 | 200 | — |
| — | *(sin texto; solo resultado)* | - | - | - | x | 4 | 200 | — |

## Patrones estructurales únicos

Primera `presentacionPatternKey` = patrón; misma clave se agrega; distinta = nuevo.

| # | Forma | Código | Campo texto | Claves | HTTP | Cifrado | Escenarios | Ejemplo |
|---|-------|--------|-------------|--------|------|---------|------------|---------|
| 1 | A.descripcionError | 400 | descripcionError | `codigoError,descripcionError` | 200 | — | 12 | 1.2.1. validador — propiedad ausente (undefined) (400) |
| 2 | A.descripcionError | 400 | descripcionError | `codigoError,descripcionError` | 200 | — | 8 | 1.1.1. idCanal — propiedad ausente (undefined) (400) |
| 3 | A.descripcionError | 550 | descripcionError | `codigoError,descripcionError` | 200 | — | 23 | 0.1. body — JSON HTTP inválido (400) |
| 4 | A.mensajeError | 400 | mensajeError | `codigoError,mensajeError` | 200 | — | 48 | 1.3.1. peticion — propiedad ausente (undefined) (400) |
| 5 | A.mensajeError | 401 | mensajeError | `codigoError,mensajeError` | 200 | — | 32 | 1.1.7. idCanal — solo espacios, trim vacío (400) |
| 6 | A.mensajeError | 402 | mensajeError | `codigoError,mensajeError` | 200 | — | 4 | 2.2.2. validador — deshabilitado (402) [CANAL_VALIDADOR_DESHABILITADO] |
| 7 | A.mensajeError | 404 | mensajeError | `codigoError,mensajeError` | 200 | — | 48 | 1.2.4. validador — tipo number (400) |
| 8 | A.mensajeError | 404 | mensajeError | `codigoError,mensajeError` | 200 | — | 40 | 1.5.4. solicitudes — sin propiedad idSolicitud (431) |
| 9 | A.mensajeError | 405 | mensajeError | `codigoError,mensajeError` | 200 | — | 68 | 1.3.4. peticion — tipo number (400) |
| 10 | A.mensajeError | 406 | mensajeError | `codigoError,mensajeError` | 200 | — | 16 | 0001.5.1022.2. validador PROXGATO auth fijo — cifrado invertido (406) |
| 11 | A.mensajeError | 418 | mensajeError | `codigoError,mensajeError` | 200 | — | 4 | 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO] |
| 12 | A.mensajeError | 425 | mensajeError | `codigoError,mensajeError` | 200 | — | 16 | 1.5.1. solicitudes — tipo string (425) |
| 13 | A.mensajeError | 509 | mensajeError | `codigoError,mensajeError` | 200 | — | 64 | 1.5.10. solicitudes — guion bajo (431) |
| 14 | A.mensajeError | 509 | mensajeError | `codigoError,mensajeError` | 200 | — | 4 | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) |
| 15 | A.mensajeError | 999 | mensajeError | `codigoError,mensajeError` | 200 | — | 12 | 1.5.19. solicitudes — elemento null en arreglo (431) |
| 16 | B | 0 | — | `idPeticion,respuestas` | 200 | — | 600 | 0001.3.1008.1.1. validador CELEGATO — cuenta feliz (exito) |
| 17 | B | 413 | — | `idPeticion,respuestas` | 200 | — | 68 | 0001.1.1.3. cuenta — string vacío (413) |
| 18 | B | 510 | — | `idPeticion,respuestas` | 200 | — | 32 | 0001.2.1008.510. validador CELEGATO — Número de cuenta incorrecta (510) |
| 19 | B | 511 | — | `idPeticion,respuestas` | 200 | — | 32 | 0001.2.1008.511. validador CELEGATO — Número de cuenta cerrado (511) |
| 20 | B | 512 | — | `idPeticion,respuestas` | 200 | — | 32 | 0001.2.1008.512. validador CELEGATO — Número de cuenta bloqueado (512) |
| 21 | B | 513 | — | `idPeticion,respuestas` | 200 | — | 32 | 0001.2.1008.513. validador CELEGATO — Transacción no permitida (513) |
| 22 | B | 514 | — | `idPeticion,respuestas` | 200 | — | 32 | 0001.2.1008.514. validador CELEGATO — Falta información obligatoria de consulta (514) |
| 23 | B | 515 | — | `idPeticion,respuestas` | 200 | — | 32 | 0001.2.1008.515. validador CELEGATO — Razón regulatoria (515) |
| 24 | C | — | — | `message` | 200 | — | 4 | 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599) |
