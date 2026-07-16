# Contrato — validador-api Invoke → producto (espejo VCN)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Caso probado | `tld-validador-api` → `tld-api-cuenta-nombre` (método `0001`) |
| R2P en mapa | métodos `0011` / `0013` → servicio `R2P` → env `LAMBDA_R2P` (`servicioInterno.js`) |

## Cadena

```
matriz → Invoke { body: JSON.stringify(...) } → validador-api
  → Invoke JSON.stringify(bodyNegocio)  [plano, SIN wrap {body}] → producto
  → producto: flat { statusCode, …campos }
  → validador: normalizar + comoAxiosData (quita statusCode) → { respuesta: … } → matriz
```

## TO producto (Payload Invoke)

Objeto plano (mismo body de negocio que recibió el validador):

```json
{
  "idCanal": "<string>",
  "validador": "<string>",
  "peticion": "<cifrado emisor>",
  "idTransaccionAutopista": <opcional>,
  "fechaHora": "<opcional>"
}
```

**No** es `{ "body": "..." }`. Evidencia: `tld-validador-api/.../lib/validador.js` `JSON.stringify(request)`.

Producto Dig: `obtenerCuerpo(event)` — si no hay `body`, el event **es** el payload.

## FROM producto (retorno Invoke)

Tras `salidaLambda` (no API GW): **flat**

| Caso | Forma |
|------|--------|
| Éxito | `{ statusCode: 200, respuesta: "<cifrado>" }` |
| Error negocio | `{ statusCode: 200\|400\|500, codigoError, mensajeError }` |

Validador: `comoAxiosData` elimina `statusCode`; usa `respuesta ?? data` y reenvuelve para matriz.

## Evidencia clave

| Tema | Dónde |
|------|--------|
| Invoke plano | `tld-validador-api/lambdas/validar/lib/validador.js` |
| Dual consume VCN | `tld-api-cuenta-nombre/.../lib/response.js` |
| Ruta R2P | `servicioInterno.js` `"0011"|"0013"` → `LAMBDA_R2P` |
