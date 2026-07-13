# HP-028 — P2P alias: entrada malformada en 0006/0008 crashea (HTTP 500 "Internal server error")

| Campo | Valor |
|-------|--------|
| **ID** | HP-028 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código fuente prod + run Newman) — se corrige en dev |
| **Severidad** | **alta** (crash no controlado, 500) |
| **Componente** | `tld-api-alias` / `alias` (`validaciones.js`, `app.js`) |
| **Ámbito** | P2P, métodos **0006** (respuestas seguridad) y **0008** (modificar cuenta alias) |
| **Veredicto** | **PROD-MAL** (crash; debe devolver código de validación de negocio) |

---

## Resumen

Cuatro escenarios con entrada malformada hacen que la lambda de alias **reviente con HTTP 500
"Internal server error"** en vez de devolver un código de validación. El crash es **determinista**
(4 de 4 repeticiones en el run). Como la respuesta no es la estructura esperada, el barrido los marcó
`negocioCoincide = null` y **no entraban** en los 141 divergentes (punto ciego). Se detectaron al
auditar los `null`.

| Escenario | Método | Entrada | Resultado prod |
|-----------|--------|---------|----------------|
| 0006.1.3.1 respuestas — propiedad ausente | 0006 | `respuestas` ausente | **500** |
| 0006.1.3.2 respuestas — null | 0006 | `respuestas: null` | **500** |
| 0006.1.3.33 respuestas — elemento null en arreglo | 0006 | `respuestas: [null]` | **500** |
| 0008.1.1.1 id — propiedad ausente | 0008 | `id` (UUID) ausente | **500** |

---

## Causa raíz

### Método 0006 — `validarRespuestas` accede a `.length` / `.id` antes de validar tipo

```541:558:prod_adactado_a_dev\tld-api-alias\lambdas\alias\lib\validaciones.js
function validarRespuestas(respuestas) {
  logger.imprimirLogs(JSON.stringify({ nombreFuncion: "validaciones.js.validarRespuestas", estado: "iniciada", argumentos: { respuestas }, constante: { MAX_RESPUESTA_USUARIOS } }));
  let respuesta;

  logger.imprimirLogs(Array.isArray(respuestas));
  logger.imprimirLogs(respuestas.length);

  if (!Array.isArray(respuestas) || respuestas.length !== MAX_RESPUESTA_USUARIOS) {
    respuesta = {
      statusCode: 427,
      mensaje: "Arreglo de respuestas ausente o su contenido es invalido.",
    };

  } else if (respuestas.some(respuesta => !respuesta.id || !respuesta.texto || typeof respuesta.id !== 'string' || typeof respuesta.texto !== 'string' || respuesta.id.trim().length === 0 || respuesta.texto.trim().length === 0 || Object.keys(respuesta).length !== 2)) {
```

- **L546** `respuestas.length` se ejecuta **antes** del chequeo `Array.isArray` de L548. Con `respuestas`
  ausente (`undefined`) o `null` → `TypeError: Cannot read properties of undefined/null (reading 'length')`
  → excepción no controlada → 500.
- **L554** `.some(respuesta => !respuesta.id ...)` con `respuestas: [null]` → `respuesta` es `null` →
  `null.id` → `TypeError` → 500.

Correcto: devolver **427** (o **455** en dev) sin acceder a propiedades de un valor no validado.

### Método 0008 — `getAliasById(id)` sin validar el UUID `id`

```381:389:prod_adactado_a_dev\tld-api-alias\lambdas\alias\app.js
        for (const element of parametrosSolicitudes) {
          const resValSoli = await validaciones.validarSolicitud(metodo, element, canalEmisor.alias);
          dashBoardCode = resValSoli.statusCode;
          if (resValSoli.statusCode !== 0) {
            respuestas.push({ idSolicitud: element.idSolicitud, resultado: resValSoli.statusCode, datos: null });
            continue;
          }
          const item = await getAliasById(element.parametros.id);
```

`validarSolicitud` para 0008 valida `identificador`, `tipoIdentificador`, `banco`, `cuenta`, `producto`,
pero **no** el campo `id` (UUID). Con `id` ausente, `getAliasById(undefined)` (query DynamoDB con clave
`undefined`) truena → 500.

Correcto: validar `id` (UUID) antes de usarlo y devolver **444** si es inválido/ausente.

---

## Comportamiento

- **Recibido (prod):** HTTP 500, body `{"respuesta":{"message":"Internal server error"}}`.
- **Esperado (test/dev):** código de validación de negocio — **455** (respuestas, 0006) / **444** (id, 0008).
- **Determinismo:** 4/4 repeticiones por escenario en el run `09-47-19Z`.

---

## Impacto

- **Crash no controlado:** una petición con campo ausente/null tumba la ejecución; el cliente recibe un
  500 opaco en lugar de un rechazo de negocio.
- **Diagnóstico y operación:** un 500 dispara alarmas de infraestructura y oculta que el problema es un
  dato de entrada del canal.
- **Robustez:** validar tipo antes de acceder a propiedades es defensa básica; su ausencia sugiere que
  otros métodos con el mismo patrón podrían crashear igual (revisar).

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/resultados-por-escenario-p2p.json` run `09-47-19Z` (`c1de7ef`) |
| Código 0006 | `prod_adactado_a_dev/tld-api-alias/lambdas/alias/lib/validaciones.js` L541–578 (`validarRespuestas`) |
| Código 0008 | `prod_adactado_a_dev/tld-api-alias/lambdas/alias/app.js` L379–405 (`case "0008"`, `getAliasById`) |
| Detección | Auditoría de `negocioCoincide = null` (17 escenarios sin evaluar por el barrido) |
| Revisión | [`../Postman/comparar-prod-vs-dev/13-revision-codigos-respuesta-p2p.md`](../Postman/comparar-prod-vs-dev/13-revision-codigos-respuesta-p2p.md) §Bloque E |

---

## Mejora propuesta (en dev)

- `validarRespuestas`: chequear `Array.isArray` y elementos no-null **antes** de acceder a `.length` /
  `.id` / `.texto`. Quitar los `logger.imprimirLogs(respuestas.length)` que fuerzan el acceso.
- Método 0008: validar `id` (UUID) en `validarSolicitud` antes de `getAliasById`; devolver 444 si inválido.

---

## Relación

| ID | Relación |
|----|----------|
| HP-014 | Elemento `null` en `solicitudes[]` crashea la validación (validador) → misma clase de bug (acceso sin validar tipo) |
| HP-024 | 0002 identificador inválido ejecuta negocio → misma familia (validación de entrada deficiente en alias) |
