# Tareas pendientes — `tld-validador-proxy`

---

## 1. Timeout de Lambda — qué recibe el invocador

**Objetivo:** Recrear el escenario en que AWS corta la ejecución por el `Timeout` de la función (hoy **11 s** en `template.yaml`, `ValidadorProxyLambda`) y registrar **exactamente** qué devuelve quien invoca la Lambda (no API Gateway).

**Por qué:** Ese caso **no** entra en el catálogo homologado del proxy (`08-catalogo-codigos-respuesta.md`). Hay que documentar el contrato real de error de AWS.

### Hecho cuando

- [ ] Escenario reproducido en un ambiente (anotar cuál: sandbox / qa / dev).
- [ ] Captura guardada de la respuesta completa del invocador (payload, códigos, mensajes).
- [ ] Resultado documentado (nuevo apartado en este archivo o archivo dedicado).

### Pasos

1. **Confirmar timeout configurado** en el ambiente donde se prueba (`template.yaml` → `Timeout: 11`; verificar que el despliegue lo tenga).
2. **Provocar que la Lambda supere 11 s** sin que el handler termine. Opciones posibles:
   - Endpoint del Canal Validador (o auth) que no responda antes de 11 s **y** que el flujo haga más de una espera, o una sola espera que, sumada a Dynamo/cifrado/telemetría, pase 11 s.
   - Ajuste temporal solo en ambiente de prueba: subir `HTTP_READ_TIME_OUT` o bajar `Timeout` de Lambda para forzar el corte (documentar valores usados).
3. **Invocar como en producción:** invoke directo a `tld-validador-proxy` (mismo cliente/SDK que usa quien consume el servicio).
4. **Registrar tal cual** lo que devuelve la invocación:
   - ¿`FunctionError`?
   - Contenido de `Payload` (`errorType`, `errorMessage`, etc.).
   - Cualquier otro campo del SDK o wrapper del invocador.
5. **Separar** en la documentación:
   - Timeout de **Lambda** (este escenario).
   - Timeout **HTTP al Canal Validador** (catálogo propuesto `504` — otro escenario).

### Captura (rellenar tras la prueba)

**Ambiente:**

**Fecha:**

**Cómo se forzó el timeout de Lambda:**

**Respuesta del invocador (pegar JSON o texto crudo):**

```
(pendiente)
```

**Notas:**

---

## 2. Corregir `telered_content_mktpl/tech_doc/api_4.json` — método 0001 canal validador

**Objetivo:** Eliminar ambigüedades del contrato del **método 0001** que debe implementar el **canal validador** (validación cuenta nombre).

**Archivo:** `telered_content_mktpl/tech_doc/api_4.json`

**Contexto (revisión del doc actual):**

- El **anexo C** define el wire format: respuesta `{ "respuesta": "<cifrado>" }`, dentro `resultado` **0** o **510–515**, `datos` null si error de negocio. **No** define HTTP status que el banco debe devolver.
- El **OpenAPI** (`paths`, `operationId: "0001"`) documenta HTTP **200** / **400** y `Response0001` en claro — capa distinta, servidores Telered, no el endpoint del banco.
- Tabla *Razones de Respuestas: Interno de la autopista* (400, 401, 509, …) mezclada con *Razones de Respuestas: Canal Validador* (510–515) sin dejar claro cuál aplica al banco en el 0001.
- `ResponseHTTPCode400` (`codigoError`, `mensajeError` en claro) no es lo mismo que error de negocio dentro de `respuesta` cifrada con `resultado` 510–515.

### Hecho cuando

- [ ] Queda explícito qué debe implementar el **canal validador** en el 0001 (cuerpo, cifrado, `resultado`).
- [ ] Queda explícito si el banco debe, puede o no usar HTTP distintos de 200 y en qué casos.
- [ ] Separadas o referenciadas sin ambigüedad las tablas autopista vs canal validador.
- [ ] El flujo normal (cuenta inválida → `resultado` 510–515, `datos: null`) documentado como caso esperado, no como fallo de protocolo.

### Puntos a corregir / aclarar en el JSON

1. **Anexo C — método 0001:** añadir sección de respuesta HTTP (o declarar que solo aplica contrato de mensaje y referenciar OpenAPI si aplica).
2. **OpenAPI `/validador/validar ` (0001):** dejar claro si describe el endpoint del banco o la vista en claro del servicio Telered; no mezclar obligaciones del canal validador con la autopista.
3. **`resultado`:** catálogo cerrado **0, 510–515** para el canal; no usar códigos de la tabla autopista (401, 509, …) dentro de `resultado` del 0001.
4. **HTTP 400:** distinguir *error de petición* (`codigoError` / `mensajeError` en claro) de *error de validación de cuenta* (`resultado` 510–515 en `respuesta` cifrada).
5. **Auth:** si aplica al POST del canal, documentar HTTP de rechazo en el anexo del 0001 o remitir a anexo aparte; hoy los 401/403/500/506 están en `/auth/token`, no en el 0001 del canal.

### Notas para la redacción

- Lo exigible al banco en día a día del 0001: **forma del mensaje** (`respuesta` + `resultado`), no inferir HTTP 200 como cláusula del anexo C sin escribirla.
- Evitar que un implementador lea solo el anexo o solo el OpenAPI y llegue a conclusiones distintas.

---

## Otras tareas

- (agregar aquí)
