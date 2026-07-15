# P2P / P2M Dig — poda de canal validador del body (2026-07-14)

| Repo | Cambio |
|------|--------|
| `tld-api-alias` / `tld-api-p2m` `app.js` | `resolverCanalValidador` **queda**: solo `validarParametroValidador`. **Podado:** `getCanal(validador)`, chequeo `estadoValidador`, uso de `canalValidador` en contexto |

## Motivo

Envelope `{ idCanal, validador, peticion }` (contrato VCN). El campo `validador` se valida contra `CFG_CANAL_VALIDADOR`; no se carga el canal en Dynamo porque P2P/P2M no lo usan operativamente del body (P2M `0020` resuelve el del comercio).

## VCN

Sin cambios: ahí el validador sí se resuelve y usa.
