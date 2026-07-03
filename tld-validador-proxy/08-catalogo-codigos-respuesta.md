# Catálogo de códigos de respuesta — `tld-validador-proxy/lambdas/proxy`

**Estado:** propuesta. Un solo catálogo; reemplaza los códigos genéricos actuales.

**Contrato:**

```json
{
  "statusCode": <código del catálogo>,
  "message": "<mensaje fijo del catálogo>",
  "datos": <objeto | null>
}
```

**Quien invoca (Lambda directo):** lee `statusCode` en la raíz.

**API Gateway (solo pruebas):** HTTP `200` si `statusCode` es `0`; HTTP `400` si el código es 400–499; HTTP `500` si el código es 500–599. El código fino va en el `body`.

---

## Escenarios

| `statusCode` | `message` | Escenario | Texto en log |
|--------------|-----------|-----------|--------------|
| `0` | Operación exitosa | El Canal Validador respondió y el proxy entregó la respuesta descifrada. | Solicitud procesada correctamente. |
| `406` | Error en descifrado canal validador | No se pudo descifrar el campo `respuesta`. | No se pudo descifrar la respuesta del Canal Validador. |
| `500` | Error interno | El cuerpo de la petición no es JSON válido. | El cuerpo de la solicitud no es JSON válido. |
| `500` | Error interno | La petición no cumple el contrato de entrada (`idCanal`, `validador`, `peticion`, etc.). | La solicitud no cumple el contrato de entrada del proxy. |
| `500` | Error interno | No hay canal configurado en Dynamo para el `validador` indicado. | Canal Validador no configurado. |
| `500` | Error interno | Fallo al leer o enriquecer el canal en Dynamo. | No se pudo obtener la configuración del canal. |
| `500` | Error interno | El servicio de autenticación del canal respondió con error HTTP. | Error HTTP al obtener credenciales del canal. |
| `500` | Error interno | Excepción no controlada en el proxy. | Error interno no controlado en el proxy. |
| `502` | Error en cifrado para el canal validador | No se pudo cifrar la petición hacia el Canal Validador. | No se pudo cifrar la petición para el Canal Validador. |
| `509` | Tiempo de espera agotado al llamar al Canal Validador | Timeout al llamar al Canal Validador (POST al método). Compartido con catálogo marketplace adoptado. | Tiempo de espera agotado al llamar al Canal Validador. |
| `599` | Error inesperado en el Canal Validador | Error de red o TLS al llamar al Canal Validador (sin timeout). | Error de red o TLS al llamar al Canal Validador. |
| `599` | Error inesperado en el Canal Validador | El Canal Validador respondió con error HTTP en el método. | El Canal Validador respondió con error HTTP. |
| `599` | Error inesperado en el Canal Validador | El Canal respondió pero el cuerpo no es un objeto utilizable. | La respuesta del Canal Validador no tiene un cuerpo utilizable. |
| `599` | Error inesperado en el Canal Validador | Falta o está vacío el campo cifrado `respuesta` en la respuesta del Canal. | La respuesta del Canal Validador no incluye el campo cifrado esperado. |
| `599` | Error inesperado en el Canal Validador | El texto descifrado no es JSON válido. | La respuesta descifrada del Canal Validador no es JSON válido. |

Alineado con catálogo general en `second-brain/codigosRespuesta/nueva-tabla-codigo-respuesta.md`.

---

## Sin código de catálogo

| Situación |
|-----------|
| La ejecución de Lambda es cortada por timeout de AWS. No hay respuesta homologada. |

---

## `datos` en error

Sigue llevando diagnóstico (`validadorHttpStatus`, `errorCodigoTransporte`, URLs, etc.). La lógica del consumidor va por `statusCode` de la raíz, no por `message`.
