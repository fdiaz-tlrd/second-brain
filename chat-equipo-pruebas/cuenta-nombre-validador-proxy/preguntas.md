# Preguntas — respuestas de Felix

Solo preguntas del equipo de pruebas.

---

## Códigos de error

### 1. ¿Existe un listado actualizado de errores para cuenta nombre (los que permiten continuar la transacción)?

**Respuesta:**

No hay códigos de error nuevos para cuenta nombre respecto al listado que ya usan con los bancos.

### 2. ¿Hay códigos nuevos o se reestructuraron respecto al listado que usan con los bancos?

**Respuesta:**

No hay códigos nuevos. Sí se está trabajando en un listado global de códigos de respuesta para homologar entre servicios; eso puede ajustar cómo quedan documentados, no necesariamente agregar códigos nuevos para cuenta nombre.

### 3. El 509 ya no lo pueden recrear como antes. ¿El servicio seguirá respondiendo 509? ¿En qué casos?

**Respuesta:**

Lo revisaré al cerrar la homologación de códigos en el rango 5xx. Hoy no puedo confirmar si el 509 seguirá aplicando en los mismos casos ni cuáles serán; es parte de esa revisión.

### 4. ¿Qué códigos pueden seguir reproduciendo en el script de pruebas y cuáles no?

**Respuesta:**

Misma revisión que la pregunta 3. Cuando tenga el listado del rango 5xx definido, les indico qué códigos siguen siendo reproducibles en el script y cuáles no.

---

## TLS

### 5. La variable `NODE_TLS_REJECT_UNAUTHORIZED = 0` estaba en `tld-validador-validar`. ¿Cómo quedó planteado técnicamente ahora?

**Respuesta:**

`tld-validador-validar` ya no llamará directamente a los API Gateway con certificado autofirmado de Telered. Por eso no debería hacer falta `NODE_TLS_REJECT_UNAUTHORIZED = 0` en esa lambda.

### 6. ¿El equipo de pruebas debe seguir pendiente de esto en pruebas y despliegues hacia producción?

**Respuesta:**

Sí, por ahora. Mientras certificamos en QA y antes de llevar esto a producción, iré revisando cómo queda en cada componente y les confirmo el estado final.

---

## Producción y bancos

### 7. ¿Los cambios son transparentes para los bancos que ya están en producción? ¿Los bancos lo notarán?

**Respuesta:**

La idea es que los bancos no se vean afectados. La referencia es la documentación del Marketplace.

Hoy las lambdas pueden comportarse distinto a lo documentado; es un error heredado. Con la homologación que estamos haciendo lo corregimos para ceñirnos a esa documentación. Si el código en producción venía tolerando algo que no coincide con el Marketplace, al alinearlo el comportamiento puede cambiar respecto a lo que veían en la práctica, pero quedará acorde a lo documentado.

---

## Timeouts

### 8. ¿Todos los timeouts se mapean al 509?

**Respuesta:**

No. Lo estoy revisando. No todos los timeouts son el mismo escenario y no deberían compartir un solo código de error.

### 9. Read timeout de lambda: ¿`tld-validador-proxy` hereda el comportamiento de `READTIMEOUT`? ¿Esas variables siguen haciendo algo?

**Respuesta:**

Pendiente de revisar en `tld-validador-proxy`. Les respondo cuando tenga el detalle.

### 10. Timeout de API Gateway: al cambiarlo en Matriz, la respuesta es la esperada pero no aparece en los logs de Matriz. ¿Por qué? ¿Es esperado?

**Respuesta:**

Pendiente de revisar. Les respondo cuando tenga el detalle.

### 11. ¿Qué código de error específico debería usarse para timeout (en lugar de un 509 genérico)?

**Respuesta:**

Parte de la misma revisión de timeouts (preguntas 8–10). Cada tipo de timeout debería tener su código; lo definiré junto con esa revisión.

---

## Otros

### 12. Ajustes pendientes en el esquema de afiliación de cuenta nombre y xpress. ¿Qué aplica a esta versión?

**Respuesta:**

Necesito que me aclaren qué entienden por "esquema de afiliación de cuenta nombre y xpress" para poder responder qué aplica a esta versión.
