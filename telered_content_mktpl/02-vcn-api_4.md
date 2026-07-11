# VCN — `api_4.json`

**Título:** MARKETPLACE TELERED - API PARA VALIDACIÓN CUENTA NOMBRE  
**Repo producto:** `tld-api-cuenta-nombre`  
**Fuente:** `telered_content_mktpl/tech_doc/api_4.json`

## Integridad del archivo — JSON inválido

`api_4.json` **no parsea** con `JSON.parse` estricto. Documentación completa del hallazgo:
**[06-hallazgo-api_4-json-invalido.md](./06-hallazgo-api_4-json-invalido.md)**

Resumen: string HTML en tag línea ~60 con CR/LF/TAB crudos; roto desde commit `8574246` (2025-07-14).
`api_6.json` y `api_7.json` no tienen este problema. Para extraer datos de api_4 usar grep o parser tolerante.

## Operaciones OpenAPI

| Path doc | operationId | Resumen |
|----------|-------------|---------|
| `/auth/token` | `generar-token` | Token OAuth |
| `/validador/validar` | `validar` | Servicio validador (cifrado) |
| `/validador/validar ` | `0001` | Método cuenta nombre (ejemplo en claro) |

## Método `0001` — Validación cuenta nombre

**Descripción:** Obtener información de una cuenta bancaria en el canal validador.

### Request — `parametros` (por solicitud)

| Campo | Req | Observación |
|-------|-----|-------------|
| `cuenta` | S | Número de cuenta a validar |

### Response — `datos` (si `resultado === 0`)

| Campo | Valores / notas |
|-------|-----------------|
| `banco` | Código Swift |
| `cuenta` | Número de cuenta |
| `producto` | `PACA` (ahorro), `PACC` (corriente) |
| `estadoCuenta` | `"0"` = cuenta válida; otro = inválida |
| `titulares` | Arreglo de strings **enmascarados** (`*` por algoritmo doc) |

### Enmascaramiento titulares

Por palabra (sin espacios): `largo_mascara = floor(largo_palabra / 2)` asteriscos al **final** de cada palabra. Telered aplica este algoritmo al devolver al canal emisor.

## Códigos — Autopista (interno)

| Código | Descripción breve |
|--------|-------------------|
| 0 | Operación exitosa |
| 400 | Formato validador / canal / petición |
| 401 | Canal emisor no existe |
| 402 | Canal validador no disponible |
| 404 | Validador no existe |
| 405 | Error cifrado/descifrado canal emisor |
| 406 | Error cifrado/descifrado canal validador |
| 412 | Banco no corresponde al canal |
| 413 | Cuenta no cumple criterios (1–34 numérico) |
| 418 | Método no soportado (esperado `0001`) |
| 500 | Petición de validación no válida |
| 504 | Petición no existe / cuenta no existe |
| 509 | Timeout validador |
| 550 | Error inesperado |
| 599 | Error inesperado validador |
| 999 | Error inesperado validación |

## Códigos — Canal validador (cuenta nombre)

| Código | Descripción |
|--------|-------------|
| 0 | Éxito |
| 510 | Número de cuenta incorrecta |
| 511 | Cuenta cerrada |
| 512 | Cuenta bloqueada |
| 513 | Transacción no permitida |
| 514 | Falta información obligatoria |
| 515 | Razón regulatoria |

## Tags útiles en el JSON

| Tag | Contenido |
|-----|-----------|
| Validación cuenta nombre | Flujo general + cifrado |
| Cifrado y Descifrado de datos | AES-CBC + RSA (ejemplo Node) |
| Especificación para CANAL VALIDADOR | Anexo método 0001 completo |
| Razones de Respuestas: Interno… | Tabla Autopista |
| Razones de Respuestas: Canal Validador | Tabla 510–515 |

## Relación con trabajo TLD

- Newman VCN: carpeta `5_solicitudes` + método `0001` en `tld-api-cuenta-nombre`.
- Regex `idSolicitud` alineada con doc (alfanumérico + guiones, 1–64).
- Enmascaramiento y códigos 510–515: escenarios en `Metodo/0001/2_respuestaCanalValidador`.
