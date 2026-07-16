# Prod real — flujo validador-api → R2P → Canal Validador + `tld-util`

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Alcance | Solo lectura `produccion_real/` |
| Por qué | Evitar visión sesgada solo con Dig VCN; **prod define reglas de negocio**; Dig mejora transporte/orquestación |

## Cadena PROD

```
Cliente → API GW → tld-validador-api (validar)
  → DynamoDB tld-validador-config-servicios[metodo] → { url }
  → axios.post(url, { idCanal, validador, peticion })   ← HTTP, NO Invoke
       → API GW POST /r2p → lambda tld-request-to-pay (tld-api-r2p)
            → negocio 0011 / 0013
            → llave: descifrar emisor → cifrar para validador
            → validador.validar → HTTP al Canal Validador Experto
                 (axios  -o-  tldlib.sendRequest si URL en URL_CA_TELERED)
            → llave: descifrar banco → cifrar respuesta al emisor
  ← axios.data → rewrap { respuesta } → cliente
```

## Hop 1 — validador-api → R2P (PROD)

| Tema | Prod |
|------|------|
| Transporte | **HTTP axios** a URL en DynamoDB (`getUrlServicioInterno(metodo)`) |
| Invoke | **No** |
| Payload | `{ idCanal, validador, peticion }` (`peticion` cifrada emisor) |
| Respuesta tipica | `{ respuesta: "<cifrado>" }` o `{ codigoError, mensajeError }` |

Dig (validador-api refactor): `0011`/`0013` → Invoke `LAMBDA_R2P` — eso es cambio del **caller**, no de las reglas R2P.

## Hop 2 — R2P → Canal Validador Experto (PROD)

| Tema | Prod |
|------|------|
| Entrada R2P | `JSON.parse(event.body)` (solo API GW) |
| Crypto | `llave.descifrar` / `llave.cifrar` |
| Negocio | switch `0011` / `0013` (remap notify `0012` / `0014` hacia el banco) |
| Transporte banco | `validador.validar` → axios **o** `@telered/tld-telered-lib` `sendRequest` |
| Envelope al banco | `{ idCanal, validador, peticion: <cifrado canal validador> }` |
| Respuesta banco | `{ respuesta: "<cifrado>" }` → descifrar → `{ respuestas: [...] }` |

## `@telered/tld-telered-lib` = `produccion_real/tld-util`

| Hecho | Detalle |
|-------|---------|
| Qué es | Paquete npm interno (`tld-util` → `@telered/tld-telered-lib`) |
| Qué usa R2P prod | Sobre todo `sendRequest` vía `@telered/tld-telered-lib/tld-util-http` |
| Para qué | HTTPS con CA Telered / CRL hacia URLs de banco en `URL_CA_TELERED` |
| También | `jsonpath` en login auth dinámico del `validador.js` prod |
| **No** es | Reglas de negocio R2P (`0011`/`0013`, Dynamo R2P, códigos 435/438/440…) |

En Dig R2P ese tramo HTTP+lib se **sustituye** por Invoke a `tld-validador-proxy` (el proxy concentra crypto banco + HTTP). Por eso el layer Dig puede vivir sin la lib — **si** no se carga `validador.js` HTTP al init.

## Separación obligatoria

| Debe preservarse (negocio prod) | Puede refactorizarse (transporte / Dig) |
|---------------------------------|----------------------------------------|
| Semántica `0011` / `0013` → notify `0012` / `0014` | Cómo llega el caller (HTTP URL vs Invoke) |
| Validaciones, límites, ops notify, Dynamo R2P, códigos de ese dominio | Cómo se habla al banco (HTTP+lib vs proxy) |
| Cifrado **emisor** entrada/salida | Dónde vive cifrado **banco** (R2P vs proxy) |
| Agregación de resultados (`getResultado` o equivalente) | Dual consume API GW + Invoke |
| | Dependencia layer a `tld-telered-lib` en el producto |

## Relación con el espejo Dig VCN

- **VCN Dig** = plano de *cómo* quedó el refactor Invoke + proxy (patrón a terminar bien).
- **Prod R2P** = plano de *qué* debe seguir haciendo el negocio R2P.
- Trabajar solo con VCN Dig sesga hacia “cómo se ve Dig”; omitir prod sesga a romper reglas al “limpiar” transporte.

## Enlaces

- Gaps Dig: [`07-fase1-gaps-r2p-vs-espejo-vcn.md`](./07-fase1-gaps-r2p-vs-espejo-vcn.md)
- Contratos Dig: [`05`](./05-contrato-invoke-validador-api-producto.md), [`06`](./06-contrato-producto-validador-proxy.md)
