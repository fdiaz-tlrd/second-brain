# R2P — `api_7.json`

**Título:** MARKETPLACE TELERED - API PARA REQUEST TO PAY (R2P)  
**Repo producto:** `tld-api-r2p`  
**Fuente:** `telered_content_mktpl/tech_doc/api_7.json`  
**Versión doc:** 1.13.0

## Flujo R2P (4 métodos)

| Método | Rol | Quién inicia (doc) |
|--------|-----|-------------------|
| `0011` | Solicitar acreedor R2P | Acreedor genera intención de pago hacia deudor |
| `0012` | Solicitar deudor R2P | Informa estado final de solicitud al deudor |
| `0013` | Estado aprobar/rechazar/cancelar | Deudor aprueba/rechaza; acreedor cancela |
| `0014` | Estado aprobar/rechazar/cancelar | Variante notificación (mismo resumen en doc) |

**Endpoint real:** `POST /validador/validar` con `metodo` correspondiente.

Paths `/0011`, `/0012`, … en OpenAPI = **solo documentación**.

## Parámetros por método

### `0011` — Solicitar acreedor

| Campo | Descripción |
|-------|-------------|
| `identificador` | Celular o alias del deudor |
| `monto` | Monto transacción (string, ej. `"20.00"`) |
| `bancoAcreedor` | Swift del acreedor |
| `cuentaDeudor` | Cuenta asociada al identificador deudor |
| `cuentaAcreedor` | Cuenta del cliente acreedor |
| `nombreDeudor` | Nombre usuario que genera R2P (doc schema; ejemplos usan `nombreAcreedor`) |
| `notaAcreedor` | Comentario opcional acreedor |

Respuesta éxito: incluye **`codigoR2P`** — hash Autopista, prefijo `R2P` + hash, máx. 32 caracteres.

### `0012` — Solicitar deudor

Mismos campos de solicitud que `0011` más:

| Campo | Descripción |
|-------|-------------|
| `codigoR2P` | El devuelto en response de `0011` |

### `0013` / `0014` — Cambio de estado

| Campo | Descripción |
|-------|-------------|
| `identificador` | Celular o alias |
| `codigoR2P` | Hash de la operación |
| `estado` | `A` aprobado, `R` rechazado, `C` cancelado (acreedor cancela) |

## Reglas de formato (escenarios error doc)

| Tema | Regla / código |
|------|----------------|
| `identificador` | 8 dígitos, empieza con **6** (Panamá móvil) → 409 si no |
| `monto` | Límites ACH Xpress → **432** vacío o fuera de rango |
| `bancoAcreedor` | Requerido, swift válido, debe corresponder a `idCanal` → **433** |
| `cuentaDeudor` / `cuentaAcreedor` | 5–34 numérico (doc R2P; P2P dice 1–34) → **413** |
| `nombreAcreedor` / nombre | Requerido en flujo completo → **437** |
| `codigoR2P` | Requerido en 0013/0014 → **439**; erróneo → **442** |
| Alias inexistente / baja | **434** |
| Método no configurado en validador | **418** (`codigoError` nivel Autopista) |
| Estado inválido | **439** |
| Re-procesar `codigoR2P` ya cerrado | **441** |
| Solo acreedor puede ciertos cambios estado | **440** |
| Banco sin servicio notificación (`0014`) | **435** |
| Múltiples solicitudes cuando no permitido | **425** |

## Códigos — catálogo RAZONES R2P

Comparte muchos códigos con Xpress (407–430, 500, 504, 509, 599, 999).  
**R2P añade en escenarios:** 432, 433, 434, 435, 437, 439, 440, 441, 442.

Cuenta en R2P catálogo: longitud **5–34** (distinto a P2P 1–34 en tag Xpress).

## Estructura mensajes

- Tag **ESTRUCTURA GENERAL DE LOS MENSAJES P2P Y P2M** — envelope y cifrado.
- Diagrama: `api_7_proceso_validacion.svg`, `api_7_servicio_01_solicitar.svg`, etc.

## Inconsistencias en el JSON (para no perder tiempo)

| Tema | Detalle |
|------|---------|
| `Request0012` / `Request0014` | Schema a nivel raíz sin `idCanal`/`validador`/`peticion` cifrada — solo doc «en claro» |
| `nombreDeudor` vs `nombreAcreedor` | Schema 0011 dice `nombreDeudor`; ejemplos en ESCENARIOS usan `nombreAcreedor` |
| Errores | Mezcla `codigoError` en envelope vs `resultado` en `respuestas[]` según capa |

## Relación con repos TLD

- Implementación: `tld-api-r2p` (rama producto).
- No hay carpeta Newman dedicada en `second-brain/Postman` al pausar jul-2026 — este doc cubre contrato marketplace.
