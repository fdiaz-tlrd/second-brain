# Foto de presentación al cliente — P2P (prod)

Solo observación de corrida Newman. **No** incluye catálogo / “Nueva descripción”. Archivo por **código fuente** (`prod`/`dev`): no se sobrescriben entre sí.

| Campo | Valor |
|-------|-------|
| Servicio | P2P |
| Código fuente | prod |
| Fecha corrida | 2026-07-14T14:15:16.356Z |
| Nivel ejecución | MATRIZ |
| Escenarios analizados | 2159 |
| Filas foto (código+descripción) | 33 |
| Contratos (columnas) | A.mensajeError, A.descripcionError, B, C |
| Patrones estructurales únicos | 34 |
| Nota | foto presentacion P2P prod + fix reqClaro captura |

## Contratos (referencia)

`A.mensajeError` ≠ `A.descripcionError` (claves distintas). Detalle: [`formas-presentacion-cliente.md`](formas-presentacion-cliente.md).

## Foto por código

Un renglón = código + descripción observada. Columnas = contratos vistos en la corrida (`x`/`-`).

| Código | Descripción | A.mensajeError | A.descripcionError | B | C | Escenarios | HTTP vistos | Cifrado |
|--------|-------------|---|---|---|---|------------|-------------|---------|
| 0 | *(sin texto; solo resultado)* | - | - | x | - | 36 | 200 | sí |
| 400 | Error de formato en campo canal | - | x | - | - | 8 | 200 | no |
| 400 | Error de formato en campo validador | - | x | - | - | 16 | 200 | no |
| 400 | Error en la petición original | x | - | - | - | 76 | 200 | sí y no |
| 401 | Canal emisor no existe | x | - | - | - | 32 | 200 | no |
| 404 | Campo idSolicitud no cumple con los criterios | x | - | - | - | 44 | 200 | sí |
| 404 | Validador no existe | x | - | - | - | 40 | 200 | no |
| 405 | Error en descifrado canal emisor | x | - | - | - | 68 | 200 | no |
| 407 | *(sin texto; solo resultado)* | - | - | x | - | 52 | 200 | sí |
| 408 | *(sin texto; solo resultado)* | - | - | x | - | 84 | 200 | sí |
| 409 | *(sin texto; solo resultado)* | - | - | x | - | 288 | 200 | sí |
| 410 | *(sin texto; solo resultado)* | - | - | x | - | 168 | 200 | sí |
| 412 | *(sin texto; solo resultado)* | - | - | x | - | 24 | 200 | sí |
| 413 | *(sin texto; solo resultado)* | - | - | x | - | 132 | 200 | sí |
| 414 | *(sin texto; solo resultado)* | - | - | x | - | 312 | 200 | sí |
| 419 | *(sin texto; solo resultado)* | - | - | x | - | 216 | 200 | sí |
| 421 | *(sin texto; solo resultado)* | - | - | x | - | 108 | 200 | sí |
| 425 | Cantidad de solicitudes no permitidas. | x | - | - | - | 12 | 200 | sí |
| 426 | *(sin texto; solo resultado)* | - | - | x | - | 36 | 200 | sí |
| 427 | *(sin texto; solo resultado)* | - | - | x | - | 76 | 200 | sí |
| 428 | *(sin texto; solo resultado)* | - | - | x | - | 36 | 200 | sí |
| 429 | *(sin texto; solo resultado)* | - | - | x | - | 28 | 200 | sí |
| 430 | *(sin texto; solo resultado)* | - | - | x | - | 68 | 200 | sí |
| 436 | *(sin texto; solo resultado)* | - | - | x | - | 32 | 200 | sí |
| 464 | *(sin texto; solo resultado)* | - | - | x | - | 24 | 200 | sí |
| 468 | *(sin texto; solo resultado)* | - | - | x | - | 28 | 200 | sí |
| 472 | *(sin texto; solo resultado)* | - | - | x | - | 28 | 200 | sí |
| 473 | *(sin texto; solo resultado)* | - | - | x | - | 12 | 200 | sí |
| 474 | *(sin texto; solo resultado)* | - | - | x | - | 28 | 200 | sí |
| 509 | Error inesperado al llamar servicio interno | x | - | - | - | 4 | 200 | no |
| 550 | Error inesperado | - | x | - | - | 23 | 200 | no |
| 999 | Error en la solicitud | x | - | - | - | 4 | 200 | no |
| — | *(sin texto; solo resultado)* | - | - | - | x | 16 | 200 | no |

## Patrones estructurales únicos

Primera `presentacionPatternKey` = patrón; misma clave se agrega; distinta = nuevo. Muestras request/response: [`foto-presentacion-p2p-prod.muestras.md`](foto-presentacion-p2p-prod.muestras.md).

| # | Forma | Código | Campo texto | Claves | HTTP | Cifrado | Escenarios | Ejemplo |
|---|-------|--------|-------------|--------|------|---------|------------|---------|
| 1 | A.descripcionError | 400 | descripcionError | `codigoError,descripcionError` | 200 | no | 16 | 1.2.1. validador — propiedad ausente (undefined) (400) |
| 2 | A.descripcionError | 400 | descripcionError | `codigoError,descripcionError` | 200 | no | 8 | 1.1.1. idCanal — propiedad ausente (undefined) (400) |
| 3 | A.descripcionError | 550 | descripcionError | `codigoError,descripcionError` | 200 | no | 23 | 0.1. body — JSON HTTP inválido (400) |
| 4 | A.mensajeError | 400 | mensajeError | `codigoError,mensajeError` | 200 | no | 48 | 1.3.1. peticion — propiedad ausente (undefined) (400) |
| 5 | A.mensajeError | 400 | mensajeError | `codigoError,mensajeError` | 200 | sí | 28 | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) |
| 6 | A.mensajeError | 401 | mensajeError | `codigoError,mensajeError` | 200 | no | 32 | 1.1.7. idCanal — solo espacios, trim vacío (400) |
| 7 | A.mensajeError | 404 | mensajeError | `codigoError,mensajeError` | 200 | sí | 44 | 1.5.4. solicitudes — sin propiedad idSolicitud (431) |
| 8 | A.mensajeError | 404 | mensajeError | `codigoError,mensajeError` | 200 | no | 40 | 1.2.4. validador — tipo number (400) |
| 9 | A.mensajeError | 405 | mensajeError | `codigoError,mensajeError` | 200 | no | 68 | 1.3.4. peticion — tipo number (400) |
| 10 | A.mensajeError | 425 | mensajeError | `codigoError,mensajeError` | 200 | sí | 12 | 1.5.1. solicitudes — tipo string (425) |
| 11 | A.mensajeError | 509 | mensajeError | `codigoError,mensajeError` | 200 | no | 4 | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) |
| 12 | A.mensajeError | 999 | mensajeError | `codigoError,mensajeError` | 200 | no | 4 | 1.5.19. solicitudes — elemento null en arreglo (431) |
| 13 | B | 0 | — | `idPeticion,respuestas` | 200 | sí | 36 | 0002.1.2.4. identificador — tipo number (409) |
| 14 | B | 407 | — | `idPeticion,respuestas` | 200 | sí | 52 | 0007.1.1.1. identificador — propiedad ausente (419) |
| 15 | B | 408 | — | `idPeticion,respuestas` | 200 | sí | 84 | 0006.1.1.1. identificador — propiedad ausente (419) |
| 16 | B | 409 | — | `idPeticion,respuestas` | 200 | sí | 288 | 0003.1.1.4. identificador — tipo number (409) |
| 17 | B | 410 | — | `idPeticion,respuestas` | 200 | sí | 168 | 0002.1.1.4. tipoIdentificador — tipo number (410) |
| 18 | B | 412 | — | `idPeticion,respuestas` | 200 | sí | 24 | 0004.1.5.14. banco — SWIFT no coincide con emisor (412) |
| 19 | B | 413 | — | `idPeticion,respuestas` | 200 | sí | 132 | 0004.1.6.1. cuenta — propiedad ausente (413) |
| 20 | B | 414 | — | `idPeticion,respuestas` | 200 | sí | 312 | 0004.1.5.1. banco — propiedad ausente (414) |
| 21 | B | 419 | — | `idPeticion,respuestas` | 200 | sí | 216 | 1.5.10. solicitudes — guion bajo (431) |
| 22 | B | 421 | — | `idPeticion,respuestas` | 200 | sí | 108 | 0004.1.7.1. producto — propiedad ausente (421) |
| 23 | B | 426 | — | `idPeticion,respuestas` | 200 | sí | 36 | 0007.1.4.1. tipoBaja — propiedad ausente (426) |
| 24 | B | 427 | — | `idPeticion,respuestas` | 200 | sí | 76 | 0006.1.3.3. respuestas — tipo string (455) |
| 25 | B | 428 | — | `idPeticion,respuestas` | 200 | sí | 36 | 0004.1.3.1. idPregunta — propiedad ausente (428) |
| 26 | B | 429 | — | `idPeticion,respuestas` | 200 | sí | 28 | 0004.1.4.1. respuesta — propiedad ausente (429) |
| 27 | B | 430 | — | `idPeticion,respuestas` | 200 | sí | 68 | 0004.1.1.1. identificador — propiedad ausente (419) |
| 28 | B | 436 | — | `idPeticion,respuestas` | 200 | sí | 32 | 0022.1.2.1. nombreAcreedor — propiedad ausente (436) |
| 29 | B | 464 | — | `idPeticion,respuestas` | 200 | sí | 24 | 0022.1.5.1. qrTipo — propiedad ausente (464) |
| 30 | B | 468 | — | `idPeticion,respuestas` | 200 | sí | 28 | 0022.1.7.1. tipo — propiedad ausente (468) |
| 31 | B | 472 | — | `idPeticion,respuestas` | 200 | sí | 28 | 0022.1.6.1. canalPago — propiedad ausente (472) |
| 32 | B | 473 | — | `idPeticion,respuestas` | 200 | sí | 12 | 0023.1.2.1. qrCode — propiedad ausente (473) |
| 33 | B | 474 | — | `idPeticion,respuestas` | 200 | sí | 28 | 0022.1.4.1. moneda — propiedad ausente (474) |
| 34 | C | — | — | `message` | 200 | no | 16 | 0006.1.3.1. respuestas — propiedad ausente (455) |
