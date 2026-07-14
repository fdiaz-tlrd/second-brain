# Foto de presentación al cliente — P2P

Solo observación de corrida Newman. **No** incluye catálogo / “Nueva descripción”.

| Campo | Valor |
|-------|-------|
| Servicio | P2P |
| Fecha corrida | 2026-07-13T12:30:36.194Z |
| Código fuente | prod |
| Nivel ejecución | MATRIZ |
| Escenarios analizados | 2159 |
| Filas foto (código+descripción) | 33 |
| Contratos (columnas) | A.mensajeError, A.descripcionError, B, C |
| Patrones estructurales únicos | 33 |
| Nota | MATRIZ P2P re-run tras fix [CAPTURA] |

## Contratos (referencia)

`A.mensajeError` ≠ `A.descripcionError` (claves distintas). Detalle: [`formas-presentacion-cliente.md`](formas-presentacion-cliente.md).

## Foto por código

Un renglón = código + descripción observada. Columnas = contratos vistos en la corrida (`x`/`-`).

| Código | Descripción | A.mensajeError | A.descripcionError | B | C | Escenarios | HTTP vistos | Cifrado |
|--------|-------------|---|---|---|---|------------|-------------|---------|
| 0 | *(sin texto; solo resultado)* | - | - | x | - | 36 | 200 | — |
| 400 | Error de formato en campo canal | - | x | - | - | 8 | 200 | — |
| 400 | Error de formato en campo validador | - | x | - | - | 16 | 200 | — |
| 400 | Error en la petición original | x | - | - | - | 76 | 200 | — |
| 401 | Canal emisor no existe | x | - | - | - | 32 | 200 | — |
| 404 | Campo idSolicitud no cumple con los criterios | x | - | - | - | 44 | 200 | — |
| 404 | Validador no existe | x | - | - | - | 40 | 200 | — |
| 405 | Error en descifrado canal emisor | x | - | - | - | 68 | 200 | — |
| 407 | *(sin texto; solo resultado)* | - | - | x | - | 52 | 200 | — |
| 408 | *(sin texto; solo resultado)* | - | - | x | - | 84 | 200 | — |
| 409 | *(sin texto; solo resultado)* | - | - | x | - | 288 | 200 | — |
| 410 | *(sin texto; solo resultado)* | - | - | x | - | 168 | 200 | — |
| 412 | *(sin texto; solo resultado)* | - | - | x | - | 24 | 200 | — |
| 413 | *(sin texto; solo resultado)* | - | - | x | - | 132 | 200 | — |
| 414 | *(sin texto; solo resultado)* | - | - | x | - | 312 | 200 | — |
| 419 | *(sin texto; solo resultado)* | - | - | x | - | 216 | 200 | — |
| 421 | *(sin texto; solo resultado)* | - | - | x | - | 108 | 200 | — |
| 425 | Cantidad de solicitudes no permitidas. | x | - | - | - | 12 | 200 | — |
| 426 | *(sin texto; solo resultado)* | - | - | x | - | 36 | 200 | — |
| 427 | *(sin texto; solo resultado)* | - | - | x | - | 76 | 200 | — |
| 428 | *(sin texto; solo resultado)* | - | - | x | - | 36 | 200 | — |
| 429 | *(sin texto; solo resultado)* | - | - | x | - | 28 | 200 | — |
| 430 | *(sin texto; solo resultado)* | - | - | x | - | 68 | 200 | — |
| 436 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | — |
| 464 | *(sin texto; solo resultado)* | - | - | x | - | 24 | 200 | — |
| 468 | *(sin texto; solo resultado)* | - | - | x | - | 28 | 200 | — |
| 472 | *(sin texto; solo resultado)* | - | - | x | - | 28 | 200 | — |
| 473 | *(sin texto; solo resultado)* | - | - | x | - | 12 | 200 | — |
| 474 | *(sin texto; solo resultado)* | - | - | x | - | 28 | 200 | — |
| 509 | Error inesperado al llamar servicio interno | x | - | - | - | 4 | 200 | — |
| 550 | Error inesperado | - | x | - | - | 23 | 200 | — |
| 999 | Error en la solicitud | x | - | - | - | 4 | 200 | — |
| — | *(sin texto; solo resultado)* | - | - | - | x | 16 | 200 | — |

## Patrones estructurales únicos

Primera `presentacionPatternKey` = patrón; misma clave se agrega; distinta = nuevo.

| # | Forma | Código | Campo texto | Claves | HTTP | Cifrado | Escenarios | Ejemplo |
|---|-------|--------|-------------|--------|------|---------|------------|---------|
| 1 | A.descripcionError | 400 | descripcionError | `codigoError,descripcionError` | 200 | — | 16 | 1.2.1. validador — propiedad ausente (undefined) (400) |
| 2 | A.descripcionError | 400 | descripcionError | `codigoError,descripcionError` | 200 | — | 8 | 1.1.1. idCanal — propiedad ausente (undefined) (400) |
| 3 | A.descripcionError | 550 | descripcionError | `codigoError,descripcionError` | 200 | — | 23 | 0.1. body — JSON HTTP inválido (400) |
| 4 | A.mensajeError | 400 | mensajeError | `codigoError,mensajeError` | 200 | — | 76 | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) |
| 5 | A.mensajeError | 401 | mensajeError | `codigoError,mensajeError` | 200 | — | 32 | 1.1.7. idCanal — solo espacios, trim vacío (400) |
| 6 | A.mensajeError | 404 | mensajeError | `codigoError,mensajeError` | 200 | — | 44 | 1.5.4. solicitudes — sin propiedad idSolicitud (431) |
| 7 | A.mensajeError | 404 | mensajeError | `codigoError,mensajeError` | 200 | — | 40 | 1.2.4. validador — tipo number (400) |
| 8 | A.mensajeError | 405 | mensajeError | `codigoError,mensajeError` | 200 | — | 68 | 1.3.4. peticion — tipo number (400) |
| 9 | A.mensajeError | 425 | mensajeError | `codigoError,mensajeError` | 200 | — | 12 | 1.5.1. solicitudes — tipo string (425) |
| 10 | A.mensajeError | 509 | mensajeError | `codigoError,mensajeError` | 200 | — | 4 | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) |
| 11 | A.mensajeError | 999 | mensajeError | `codigoError,mensajeError` | 200 | — | 4 | 1.5.19. solicitudes — elemento null en arreglo (431) |
| 12 | B | 0 | — | `idPeticion,respuestas` | 200 | — | 36 | 0002.1.2.4. identificador — tipo number (409) |
| 13 | B | 407 | — | `idPeticion,respuestas` | 200 | — | 52 | 0007.1.1.1. identificador — propiedad ausente (419) |
| 14 | B | 408 | — | `idPeticion,respuestas` | 200 | — | 84 | 0006.1.1.1. identificador — propiedad ausente (419) |
| 15 | B | 409 | — | `idPeticion,respuestas` | 200 | — | 288 | 0003.1.1.4. identificador — tipo number (409) |
| 16 | B | 410 | — | `idPeticion,respuestas` | 200 | — | 168 | 0002.1.1.4. tipoIdentificador — tipo number (410) |
| 17 | B | 412 | — | `idPeticion,respuestas` | 200 | — | 24 | 0004.1.5.14. banco — SWIFT no coincide con emisor (412) |
| 18 | B | 413 | — | `idPeticion,respuestas` | 200 | — | 132 | 0004.1.6.1. cuenta — propiedad ausente (413) |
| 19 | B | 414 | — | `idPeticion,respuestas` | 200 | — | 312 | 0004.1.5.1. banco — propiedad ausente (414) |
| 20 | B | 419 | — | `idPeticion,respuestas` | 200 | — | 216 | 1.5.10. solicitudes — guion bajo (431) |
| 21 | B | 421 | — | `idPeticion,respuestas` | 200 | — | 108 | 0004.1.7.1. producto — propiedad ausente (421) |
| 22 | B | 426 | — | `idPeticion,respuestas` | 200 | — | 36 | 0007.1.4.1. tipoBaja — propiedad ausente (426) |
| 23 | B | 427 | — | `idPeticion,respuestas` | 200 | — | 76 | 0006.1.3.3. respuestas — tipo string (455) |
| 24 | B | 428 | — | `idPeticion,respuestas` | 200 | — | 36 | 0004.1.3.1. idPregunta — propiedad ausente (428) |
| 25 | B | 429 | — | `idPeticion,respuestas` | 200 | — | 28 | 0004.1.4.1. respuesta — propiedad ausente (429) |
| 26 | B | 430 | — | `idPeticion,respuestas` | 200 | — | 68 | 0004.1.1.1. identificador — propiedad ausente (419) |
| 27 | B | 436 | — | `idPeticion,respuestas` | 200 | — | 32 | 0022.1.2.1. nombreAcreedor — propiedad ausente (436) |
| 28 | B | 464 | — | `idPeticion,respuestas` | 200 | — | 24 | 0022.1.5.1. qrTipo — propiedad ausente (464) |
| 29 | B | 468 | — | `idPeticion,respuestas` | 200 | — | 28 | 0022.1.7.1. tipo — propiedad ausente (468) |
| 30 | B | 472 | — | `idPeticion,respuestas` | 200 | — | 28 | 0022.1.6.1. canalPago — propiedad ausente (472) |
| 31 | B | 473 | — | `idPeticion,respuestas` | 200 | — | 12 | 0023.1.2.1. qrCode — propiedad ausente (473) |
| 32 | B | 474 | — | `idPeticion,respuestas` | 200 | — | 28 | 0022.1.4.1. moneda — propiedad ausente (474) |
| 33 | C | — | — | `message` | 200 | — | 16 | 0006.1.3.1. respuestas — propiedad ausente (455) |
