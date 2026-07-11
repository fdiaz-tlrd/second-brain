# P2P (Alias / Xpress) — `api_6.json`

**Título:** MARKETPLACE TELERED - API PARA ALIAS  
**Repo producto:** `tld-api-alias`  
**Fuente:** `telered_content_mktpl/tech_doc/api_6.json`

## Servicios documentados

| Bloque | Métodos | Notas |
|--------|---------|-------|
| **Xpress P2P** (alias) | `0002`–`0009` | Directorio alias ↔ cuenta |
| **Xpress P2P QR** | `0022`, `0023` | Requiere P2P base; mismo endpoint |
| **Notificación canal validador** | `0010` | Baja por inactividad / vencimiento (anexo CANAL VALIDADOR) |

**Validador Xpress:** en consumo como canal, `validador` suele ser **`0001`** (nota en schemas).

## Métodos — resumen

| Método | Nombre doc | Descripción |
|--------|------------|-------------|
| `0002` | Verificar identificador | ¿Alias registrado en directorio? |
| `0003` | Obtener preguntas registradas | Preguntas que el usuario registró para un alias |
| `0004` | Alta Validar | Registrar alias ya en otro banco; valida pregunta/respuesta |
| `0005` | Obtener listado de preguntas | Catálogo Telered para elegir preguntas |
| `0006` | Alta Registrar | Primer registro con preguntas y respuestas |
| `0007` | Baja alias | Desactiva en directorio |
| `0008` | Modificar alias | Cambia cuenta y producto del identificador |
| `0009` | Validar alias | Busca alias y devuelve cuentas/IF relacionadas |
| `0022` | Generar QR | Genera QR para transferencia ACH Xpress |
| `0023` | Leer QR | Interpreta QR escaneado |
| `0010` | Notificación | Autopista notifica baja de alias (inactividad, etc.) |

## Parámetros típicos por método

Campos recurrentes en `parametros`:

| Campo | Uso |
|-------|-----|
| `identificador` | Teléfono/alias — doc: **8 dígitos** (error 409 si no cumple) |
| `tipoIdentificador` | `CELULAR` (valor válido documentado) |
| `banco` | Swift 8 caracteres |
| `cuenta` | 1–34 numérico |
| `producto` | 4 caracteres (`PACA`, `PACC`, …) |
| `idPregunta` | Método `0004` — validación respuesta seguridad |
| `respuesta` / `respuestas[]` | Métodos `0004`, `0006` — `{ id, texto }` en `0006` |
| `tipoBaja` | `0007` — ej. `INDIVIDUAL` |
| `qrTipo`, `glosa`, `canal`, `monto`, … | `0022` generar QR |
| `qrCode` | `0023` — string EMVCo del QR escaneado |

### Respuesta `0002`

`datos` incluye estado del identificador: `SI` | `NO` | `INVALIDO`.

## Cifrado

- Tag **Guía GCM**: esquema actual (RSA 1024 hex fijo + payload AES).
- Tag **CBC Obsoleto**: `iv.secreto.cifrado` — no usar en implementación nueva.

## Códigos — Razones Xpress (campo `resultado`)

| Rango | Ejemplos |
|-------|----------|
| 0 | Éxito |
| 400–426 | Formato, alias, banco, cuenta, método, baja, solicitudes |
| 407 | Alias no existe |
| 408 | Alias ya registrado |
| 409 | Formato `identificador` |
| 410 | `tipoIdentificador` incorrecto |
| 411 | Alias dado de baja |
| 412–414 | Banco / cuenta / swift |
| 415–417 | Alias requerido / no registrado / error actualizar |
| 418 | Método no soportado |
| 419 | Faltan identificador + tipoIdentificador |
| 420 | Respuestas inválidas (pregunta seguridad) |
| 421–426 | Producto, baja, bancos máximos, solicitudes, tipo baja |
| 427 | Arreglo `respuestas` inválido |
| 428 | `idPregunta` no cumple criterios |
| 429 | `respuesta` no cumple criterios |
| 430 | Bloqueo por intentos preguntas |
| 477 | QR leído: acreedor no disponible (`0023`) |
| 480 | QR: tipo identificador ≠ `CELULAR` (`0023`) |
| 500, 504, 509, 599, 999 | Errores transversales |

## Método `0010` — Notificación (canal validador recibe)

`parametros`: `identificador`, `tipoIdentificador`, `tipoNotificacion` (`01` inactividad, `03` vencimiento), `fechaHora`.

`resultado` en respuesta del notificado: **0** éxito, **1** error (según doc anexo).

## Tags / diagramas

- `Diagramas de Flujo de Xpress P2P` — SVG FlujoMetodos_XPRESS
- `Diagramas de Flujo de Xpress P2P QR` — generación y lectura QR

## Relación con trabajo TLD

- Escenarios Newman P2P: métodos `0004`/`0005`/`0006`, carpetas `3_idPregunta`, `3_respuestas`.
- Regex `idPregunta` / `respuestas[].id`: `^[0-9]{2}$` — doc 428 menciona «alfanumérico» pero catálogo es numérico 2 dígitos.
- Código **420** = regla de negocio preguntas (no confundir con validación JS 428).
