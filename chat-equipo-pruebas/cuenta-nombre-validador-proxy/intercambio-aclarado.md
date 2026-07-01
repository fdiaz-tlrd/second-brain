# Chat equipo pruebas

Transcripción aclarada del intercambio entre Jonatan Concepción (equipo pruebas) y Felix.

---

## Lo que necesita el equipo de pruebas

### 1. Listado de códigos de error (cuenta nombre)

Los bancos reciben esta lista de errores que **deben permitir que la transacción continúe**:

| Código | Descripción |
|--------|-------------|
| 404 | Validador no existe |
| 402 | Canal validador no disponible |
| 405 | Error en cifrado/descifrado canal emisor |
| 406 | Error en cifrado/descifrado canal validador |
| 418 | Método no soportado |
| 509 | Error inesperado en validador |
| 550 | Error inesperado |
| 599 | Error inesperado en validador |
| 999 | Error inesperado validación |
| — | `Message: "Endpoint Request Timeout"` (sin código de error) |

**Preguntas:**
- ¿Existe un listado actualizado para cuenta nombre?
- ¿Hay códigos nuevos o se reestructuraron?
- El **509** ya no lo pueden recrear como antes. ¿El servicio seguirá respondiendo 509?

**Para el script de pruebas:** necesitan saber qué errores sí pueden reproducir y cuáles no.

| Código | ¿Se puede reproducir? |
|--------|----------------------|
| 550, 599, 999 | No |
| 509 | Antes sí; ahora tampoco parece posible |

### 2. `NODE_TLS_REJECT_UNAUTHORIZED = 0`

Esa variable estaba en la lambda `tld-validador-validar`.

**Pregunta:** ¿cómo quedó planteado técnicamente ahora? ¿Deben seguir pendientes en pruebas y despliegues para cuando esto llegue a producción?

### 3. Impacto en bancos en producción

**Pregunta:** ¿Los cambios son transparentes para los bancos que ya están en producción? ¿Los bancos lo notarán?

*(También mencionan ajustes pendientes en el esquema de afiliación de cuenta nombre y xpress.)*

---

## Acuerdos del chat

### ¿Es bloqueante?

- **Felix** necesita tiempo para responder y pidió saber si algo bloquea el día a día del equipo.
- **Jonatan:** por ahora **no hay bloqueante**. Lo urgente es ajustar el script (tema del 509). Lo demás puede esperar.

### Timeouts

**Pregunta de Jonatan:** ¿Todos los timeouts se mapean al 509?

| Origen del timeout | Comportamiento actual (según el chat) |
|--------------------|---------------------------------------|
| Lambda — read timeout | Responde **509** |
| API Gateway | Sigue respondiendo `"Endpoint request timed out"` **sin código de error** |

**Posición de Felix:** los 5xx son para errores graves. El timeout debería tener un código específico, no mezclarse con un 509 genérico. Los 500 son los que aún están sin pulir.

**Foco acordado:** Felix se concentrará primero en el tema de **timeout en `tld-validador-proxy`** y luego comenta al equipo.

---

## Cómo probaban antes vs ahora

### Read timeout (lambda)

**Antes (cuenta nombre):**
- Referencia: variable `READTIMEOUT` en la lambda Cuenta Nombre.
- Procedimiento: cambiar algo en el endpoint del validador y revisar en logs cuánto esperaba antes del error.

**Pregunta abierta:** ¿`tld-validador-proxy` hereda ese comportamiento? ¿Esas variables siguen haciendo algo?

### Timeout de API Gateway

**Antes:** lo cambiaban en cuenta nombre o en `validador-validar` y obtenían el error esperado.

**Ahora:** lo cambian en **Matriz** y la respuesta es la esperada, pero **no aparece en los logs de Matriz**. Sí se ve al consumir directo desde Postman:

```json
{
    "message": "Endpoint request timed out"
}
```

---

## Flujos donde participa `tld-validador-proxy`

```
Canal => [ tld-matriz -> tld-api-cuenta-nombre -> tld-validador-proxy ] => Canal Validador
Canal => [ tld-matriz -> tld-api-r2p -> tld-validador-proxy ] => Canal Validador
Canal => [ tld-matriz -> tld-api-p2m -> tld-validador-proxy ] => Canal Validador
Amazon EventBridge -> [ inactividad -> tld-validador-proxy ] => Canal Validador
```

**Riesgos del canal validador (según Felix):**
- Responde algo no mapeado.
- No responde dentro del tiempo definido (timeout).

---

## Pendiente de Felix

- Revisar y responder el tema de **códigos de error** (homologación incompleta que dejó Cibernética).
- Preparar y comentar el tema de **timeout en `tld-validador-proxy`**.
- Tener presentes el resto de puntos (TLS, transparencia bancos, afiliación cuenta nombre/xpress).
