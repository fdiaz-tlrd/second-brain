# Contrato — producto → tld-validador-proxy (espejo VCN)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Caso probado | `cuenta-nombre` → `tld-validador-proxy` |
| Transporte | Invoke `RequestResponse` a `PROX_VAL_LAMBDA_NAME` |

## TO proxy

```json
{
  "idCanal": "<string>",
  "validador": "<string>",
  "peticion": { "idPeticion", "metodo", "solicitudes": [ ... ] },
  "idTransaccionAutopista": <opcional>,
  "fechaHora": "<opcional>"
}
```

- `peticion` en **claro** (objeto). El proxy cifra hacia el banco.
- `idTransaccionAutopista` / `fechaHora` (**opcionales**): pass-through prod (estudio [`12`](./12-estudio-idTransaccionAutopista-fechaHora-flujo-prod.md)). Dig R2P **3.2**: los reenvía si vienen.

Proxy exige: `idCanal`, `validador`, `peticion` objeto con `idPeticion`, `metodo`, `solicitudes[]`.

## FROM proxy (homologado)

```json
{ "statusCode": <0|406|500|502|509|599>, "message": "<catálogo>", "datos": <objeto|null> }
```

| statusCode | message (catálogo proxy) |
|------------|--------------------------|
| 0 | Operación exitosa — `datos` = negocio descifrado |
| 406 | Error en descifrado canal validador |
| 500 | Error interno |
| 502 | Error en cifrado para el canal validador |
| 509 | Error inesperado en el Canal Validador |
| 599 | Tiempo de espera agotado… |

## Mapeo VCN (probado)

Si `statusCode !== 0`: HTTP **200** + `codigoError` = status proxy (si 400–599) o **509**; `mensajeError` = `message` del proxy.

Si éxito pero `datos` null / no JSON / sin `respuestas[]`: **509** local (`"Error inesperado en validador"`).

## Layer / telered-lib

VCN Dig **no** requiere `@telered/tld-telered-lib` en el happy path al proxy: no hay `lib/validador.js` HTTP; layer sin esa dep.
