# Modelo documental para APIs cifradas y métodos lógicos

Fecha: 2026-07-11.

## Problema real

Estas APIs no son REST puras por método. Son un protocolo HTTP + JSON cifrado + multiplexación interna:

1. Existe un endpoint HTTP real.
2. Ese endpoint recibe un envelope cifrado (`peticion`) y devuelve un envelope cifrado (`respuesta`).
3. Dentro del contenido descifrado vive el campo `metodo`.
4. El valor de `metodo` decide qué estructura tienen `parametros` y `datos`.

Eso significa que los "métodos" (`0001`, `0002`, etc.) **no son endpoints HTTP reales**. Son
operaciones lógicas dentro del payload descifrado.

OpenAPI documenta muy bien endpoints HTTP. Documenta mal este patrón porque intenta asociar cada
operación a un `path`. Por eso aparecen hacks como:

- `/validador/validar` = endpoint real cifrado.
- `/validador/validar ` = operación documental para explicar el payload descifrado de un método.
- `/0001` = operación documental para explicar un método que debería procesar el Canal Validador,
  aunque la URL real la define cada institución.

La respuesta correcta no es negar el problema. La respuesta correcta es **nombrar las capas**.

## Regla de modelado

La documentación debe separar cuatro capas:

| Capa | Qué representa | Dónde vive |
|---|---|---|
| Endpoint HTTP real | URL invocable, headers, auth, envelope cifrado | `paths` reales |
| Envelope cifrado | `idCanal`, `validador`, `peticion` / `respuesta` como string cifrado | schemas públicos del endpoint |
| Payload descifrado | JSON interno una vez aplicado cifrado/descifrado | schemas de referencia |
| Método lógico | combinación `metodo` + `parametros` + `datos` + códigos de resultado | catálogo/documentación de métodos |

Un método lógico **no debe presentarse como URL real** si no lo es. Si por limitación de ReDoc/OpenAPI
se usa un `path` sintético para renderizarlo, debe quedar marcado como operación documental.

## Modelo recomendado para Telered

### 1. Endpoint real cifrado

Mantener una operación real por endpoint:

- `POST /validador/validar` para lo que expone Telered al canal.
- Para Canal Validador: documentar "POST URL definida por la institución" como contrato de integración,
  no como `POST /0001` real.

El schema del endpoint real debe ser el envelope cifrado:

- Request: `RequestCifrado` o equivalente.
- Response: `ResponseCifrado` o equivalente.

Este es el contrato que viaja por HTTP.

### 2. Catálogo de métodos lógicos

Cada método (`0001`, etc.) debe documentarse como "Método lógico" o "Payload descifrado para método".

Debe mostrar:

- Valor de `metodo`.
- Estructura descifrada de `peticion`.
- `parametros` esperados.
- Estructura descifrada de `respuesta`.
- `datos` esperados.
- Códigos `resultado` aplicables.
- Referencia al esquema de cifrado vigente y al obsoleto si coexisten.

No debe prometer que existe un endpoint `/0001`.

### 3. Canal Validador

El Canal Validador tiene el mismo problema que los métodos que expone Telered:

- La institución puede exponer un único path.
- Telered le envía un envelope cifrado.
- El Canal Validador descifra.
- Lee `metodo`.
- Procesa.
- Devuelve envelope cifrado.

Por tanto, documentarlo como `POST /0001` es una simplificación peligrosa si se lee como URL real.
`/0001` solo sirve como path sintético para poder renderizar una operación en ReDoc.

La documentación correcta debe decir explícitamente:

> La ruta HTTP del Canal Validador es definida por la institución financiera. Los métodos descritos en
> esta sección son métodos lógicos dentro del payload descifrado, seleccionados por el campo `metodo`.

### 4. Cifrado

La guía de cifrado debe estar aislada como módulo propio:

- GCM vigente.
- CBC obsoleto, si debe coexistir por compatibilidad/documentación histórica.

Los schemas de envelope no deben incrustar demasiado detalle de formato si eso obliga a repetirlo en
cada método. Deben apuntar a la guía de cifrado.

Si se muestra un ejemplo CBC (`iv.secreto.cifrado`) dentro de un método, hay que marcar si ese ejemplo
corresponde al esquema obsoleto. Si la documentación declara GCM como vigente, no puede dejar todos los
ejemplos operativos en CBC sin decirlo.

## Alternativas evaluadas

### A. Seguir con un path por método

Ventaja:
- ReDoc renderiza cada método como una operación navegable.

Riesgo:
- Miente visualmente: hace parecer que `/0001` o `/validador/validar ` son URLs reales.
- El path con espacios es técnicamente válido en JSON pero conceptualmente frágil.

Solo es aceptable si se etiqueta explícitamente como **operación documental / método lógico**.

### B. Un único endpoint real + métodos en tags HTML

Ventaja:
- No miente sobre URLs.
- Refleja el protocolo real.

Riesgo:
- Pierde parte de las ventajas de OpenAPI/ReDoc para schemas por operación.
- Puede volver a crecer como HTML monolítico si no se genera desde fragmentos estructurados.

Es el modelo semánticamente más correcto.

### C. Modelo híbrido recomendado

Usar OpenAPI para lo que OpenAPI sí modela bien y usar documentación generada para lo demás:

- `paths` reales para endpoints HTTP.
- `components.schemas` para envelopes y payloads descifrados.
- Tags/secciones generadas para el catálogo de métodos lógicos.
- Si se necesitan operaciones navegables en ReDoc, permitir paths sintéticos, pero con:
  - `x-telered-operationKind: logical-method`
  - descripción visible: "No es una URL HTTP real".
  - summary que diga "Método lógico 0001", no solo "POST /0001".

Este modelo conserva la utilidad de ReDoc sin ocultar la verdad del protocolo.

## Decisión propuesta para api_4

Para VCN, el estado actual debe corregirse en dos pasos:

1. **Marcar explícitamente `/0001` como operación documental**, no como endpoint real.
2. Cambiar el texto del tag `CANAL VALIDADOR` y de la operación para explicar:
   - la IF define la URL real;
   - el método se selecciona por `metodo`;
   - `RequestCV0001` / `ResponseCV0001` son envelopes cifrados;
   - `PeticionDescifradaCV0001` / `RespuestaDescifradaCV0001` son referencias del payload claro.

No hace falta borrar de inmediato el path sintético si se usa para renderizar. Pero sí hay que impedir
que el lector lo entienda como endpoint productivo.

## Convención para el generador

Agregar metadatos propios en fragmentos de paths documentales:

```json
{
  "x-telered-operationKind": "logical-method",
  "x-telered-realTransport": "encrypted-envelope",
  "x-telered-realEndpoint": "defined-by-integrating-institution"
}
```

Para los métodos que expone Telered dentro de `/validador/validar`, usar:

```json
{
  "x-telered-operationKind": "logical-method",
  "x-telered-realTransport": "encrypted-envelope",
  "x-telered-realEndpoint": "/validador/validar"
}
```

Estas extensiones no rompen OpenAPI y dejan una fuente de verdad para helpers, validaciones y futuras
plantillas.

## Evidencia actual api_4

Helper: `helper-inventario-openapi-multiplexado.js`.

Resultado actual:

```text
POST "/auth/token"           endpoint-real-auth
POST "/validador/validar"    endpoint-real-multiplexado-cifrado
POST "/validador/validar "   operacion-documental-metodo-descifrado
POST "/0001"                 operacion-documental-canal-validador
```

Schemas actuales:

```text
RequestCifrado / ResponseCifrado       envelope-cifrado
Request0001 / Response0001             payload-descifrado
RequestCV0001 / ResponseCV0001         envelope-cifrado
PeticionDescifradaCV0001 / Respuesta... payload-descifrado
```

Esta clasificación es la base para dejar de tratar los métodos lógicos como endpoints reales.
