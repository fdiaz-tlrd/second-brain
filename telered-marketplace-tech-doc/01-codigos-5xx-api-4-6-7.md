# Códigos 5xx en documentación marketplace — `api_4`, `api_6`, `api_7`

**Fuentes:** `telered_content_mktpl/tech_doc/api_4.json`, `api_6.json`, `api_7.json`

**Alcance:** códigos **500–599** en catálogos (`resultado` / tablas HTML) y respuestas HTTP documentadas en OpenAPI. Al final se incluye **999** porque aparece en las mismas tablas de error grave (no es 5xx numéricamente).

---

## Resumen por archivo

| Código | api_4 | api_6 | api_7 | Rol en la doc |
|--------|:-----:|:-----:|:-----:|----------------|
| **500** | ✓ | ✓ | ✓ | Catálogo `resultado` + HTTP auth |
| **504** | ✓ | ✓ | ✓ | Catálogo `resultado` |
| **506** | ✓ | ✓ | — | Solo HTTP auth |
| **509** | ✓ | ✓ | ✓ | Catálogo + escenario R2P |
| **510–515** | ✓ | — | — | Solo catálogo Canal Validador |
| **550** | ✓ | — | — | Solo catálogo Interno autopista |
| **599** | ✓ | ✓ | ✓ | Catálogo `resultado` |
| **999** | ✓ | ✓ | ✓ | Catálogo `resultado` |

---

## `api_4.json`

### Catálogo — tag `Razones de Respuestas: Interno de la autopista (Telered)`

Campo: **`resultado`** (o equivalente en respuesta cifrada).

| Código | Descripción | Observación |
|--------|-------------|-------------|
| **500** | Petición de validación no es válida | Inconvenientes en la validación del mensaje |
| **504** | Petición de validación no existe | Cuenta no existe |
| **509** | Error inesperado en validador | Time-out o tiempo de espera agotado |
| **550** | Error inesperado | Error inesperado |
| **599** | Error inesperado en validador | Canal Validador no pudo enviar respuesta |
| **999** | Error inesperado validación | Error inesperado validación |

### Catálogo — tag `Razones de Respuestas: Canal Validador`

Códigos de negocio del banco (validación cuenta, método 0001).

| Código | Descripción | Observación |
|--------|-------------|-------------|
| **510** | Número de cuenta incorrecta | Formato inválido o cantidad de dígitos incorrecta |
| **511** | Número de cuenta cerrado | Cuenta del Recibidor cerrada |
| **512** | Número de cuenta bloqueado | Cuenta restringida en la IF Recibidora |
| **513** | Transacción no permitida | Restricción de participantes de la red |
| **514** | Falta información obligatoria de consulta | No se proporcionó info obligatoria |
| **515** | Razón regulatoria | Motivos legales o de cumplimiento |

### OpenAPI — `POST /auth/token`

Respuestas HTTP documentadas (no van en `resultado`):

| HTTP | Descripción |
|------|-------------|
| **500** | La firma del token no es válida |
| **506** | Acceso no autorizado |

`POST /validador/validar` solo documenta **200** y **400**; no hay HTTP 5xx en ese endpoint.

---

## `api_6.json`

### Catálogo — tag `Razones de Respuestas: Xpress`

Campo: **`resultado`**.

| Código | Descripción | Observación |
|--------|-------------|-------------|
| **500** | Error interno; error consultando/actualizando/creando alias; error validando alias/cuenta nombre; error consultando operaciones; **error al consumir api-validador**; consultando id alias; etc. | Errores posibles en **todos los métodos** |
| **504** | Petición de validación no existe | `idPeticion` no coincide con lo registrado en la autopista |
| **509** | Error inesperado en validador | Time-out o tiempo de espera agotado |
| **599** | Error inesperado en validador | Error inesperado |
| **999** | Error inesperado validación | Error inesperado |

No aparecen **510–515** ni **550** en este archivo.

En schemas de métodos Xpress, `resultado` remite a *Razones de Respuestas: Xpress* (incluye los 5xx de la tabla).

### OpenAPI — `POST /auth/token`

| HTTP | Descripción |
|------|-------------|
| **500** | La firma del token no es válida |
| **506** | Acceso no autorizado |

---

## `api_7.json`

### Catálogo — tag `RAZONES DE RESPUESTAS – R2P`

Misma estructura que Xpress en api_6 (campo **`resultado`**):

| Código | Descripción | Observación |
|--------|-------------|-------------|
| **500** | Misma lista que Xpress (error interno, alias, api-validador, etc.) | Todos los métodos |
| **504** | Petición de validación no existe | `idPeticion` no coincide |
| **509** | Error inesperado en validador | Time-out |
| **599** | Error inesperado en validador | Error inesperado |
| **999** | Error inesperado validación | Error inesperado |

No hay **510–515**, **550** ni HTTP **500/506** en paths (no documenta `/auth/token` con esos códigos).

### Escenario — tag `ESCENARIOS DE ERROR – R2P`

Único uso explícito de un 5xx fuera del catálogo:

| Escenario | Código | Forma de respuesta |
|-----------|--------|-------------------|
| Falta `notaAcreedor` (método 0011; se esperan todos los parámetros) | **509** | `codigoError: 509`, `mensajeError: "Error inesperado al crear la solicitud"` |

---

## Cruce útil

**Solo en api_4**

- **550** (interno autopista)
- **510–515** (canal validador / negocio banco)
- **506** como HTTP de auth (api_7 no lo documenta)

**En api_6 y api_7** (Xpress / R2P)

- **500, 504, 509, 599, 999** en catálogo `resultado`
- **509** además en escenario R2P como `codigoError` en claro

**506** en api_4 y api_6 es **status HTTP de OAuth**, no código de catálogo `resultado`.

**999** está en las tres APIs en tablas de error grave; numéricamente no es 5xx, pero va en el mismo bloque que 599.

---

## Catálogo adoptado (significado acordado)

Investigación marketplace arriba; abajo el uso que damos a cada código. **500 = error interno** es la regla base.

| Código | Significado | Uso |
|--------|-------------|-----|
| **500** | Error interno | Activo |
| **501** | — | No usado |
| **502** | — | No usado |
| **503** | — | No usado |
| **504** | Petición de validación no existe | Activo |
| **505** | — | No usado |
| **506** | OAuth 2.0 (`/auth/token`) | No usado |
| **507** | — | No usado |
| **508** | — | No usado |
| **509** | Timeout del Canal Validador | Activo (descripción más usada en marketplace) |
| **510** | Número de cuenta incorrecta | Activo |
| **511** | Número de cuenta cerrado | Activo |
| **512** | Número de cuenta bloqueado | Activo |
| **513** | Transacción no permitida | Activo |
| **514** | Falta información obligatoria de consulta | Activo |
| **515** | Razón regulatoria | Activo |
| **550** | — | Reservado; no usar (sobra frente a 500) |
| **599** | Error inesperado en validador | Activo |
| **999** | — | Reservado; no usar (sobra frente a 500) |
