# Cruce Fase 1 — VCN Dig × Prod R2P × Dig R2P

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Ancla A | VCN Dig — patrón Invoke + proxy (probado) |
| Ancla B | Prod R2P — reglas de negocio + transporte HTTP+lib |
| Sujeto | Dig R2P — cambios ya aplicados (sin probar) |

## Matriz de hops

| Hop | Prod R2P (negocio + transporte prod) | VCN Dig (patrón) | Dig R2P (hoy) | Lectura |
|-----|--------------------------------------|------------------|---------------|---------|
| Caller → producto | HTTP axios + URL DynamoDB | Invoke plano `{idCanal,validador,peticion,…}` | Debe soportar Invoke (dual consume) | Dig OK si `response.js` alinea con VCN; **no** reintroducir solo-API-GW como prod |
| Entrada producto | `JSON.parse(event.body)` | `obtenerCuerpo` (event plano o body) | `obtenerCuerpo` presente | Alineado a VCN; **cambio vs prod entrada** es intencional Dig |
| Crypto emisor | `llave.js` | `operacionesPaquete` | `operacionesPaquete` | Renombre/refactor transporte crypto; **misma familia** — no cambiar reglas de cuándo cifrar/descifrar emisor |
| Negocio métodos | `0011`/`0013` → notify banco `0012`/`0014`, Dynamo, validaciones | (otro dominio 0001) | Debe **preservar** lógica prod R2P | **No tocar** al pulir transporte |
| Producto → Canal Validador | HTTP `validador.validar` + cifrar banco en R2P; `peticionValidador=body` (pass-through envelope, incl. campos matriz si vienen); `tldlib` si CA | Invoke proxy; `peticion` **claro**; reenvía opcionales envelope | Invoke proxy; peticion claro; **3.2** reenvía opcionales si vienen | Transporte Dig = VCN; envelope: [`12`](./12-estudio-idTransaccionAutopista-fechaHora-flujo-prod.md) |
| Respuesta banco → producto | Descifra en R2P; usa `respuestas[]` + `getResultado` | Proxy `datos` + chequeos; sin `validador.js` HTTP | Proxy `datos` + `getResultado` vía `require(validador.js)` | Agregación **sí** (negocio); cliente HTTP **no** |
| Layer | `tld-telered-lib` + `jsonpath` | Sin lib | Sin lib **pero** require muerto | G1 |
| Salida → caller | `{statusCode, body}` API GW | Flat Invoke / envelope AGW | `salidaLambda` | Alineado a VCN |

## Qué es “correcto” en el cruce

| Dimensión | Fuente de verdad | Dig R2P debe… |
|-----------|------------------|---------------|
| Negocio R2P | **Prod R2P** | Conservar semántica y códigos de dominio |
| Cómo lo invoca Dig validador-api | **VCN Dig / contrato Invoke** | Hablar flat Invoke |
| Cómo habla al banco en Dig | **VCN Dig / contrato proxy** | Proxy homologado; no HTTP propio |
| Init / deps | **VCN Dig** (layer limpio) + hecho prod (lib era solo HTTP banco) | No cargar `tld-telered-lib` al init |

## Gaps actualizados → ver [`07-…`](./07-fase1-gaps-r2p-vs-espejo-vcn.md)

Clasificados: **T** transporte Dig · **N** negocio prod (no romper) · **I** init.

## Docs de anclas

- VCN Invoke: [`05`](./05-contrato-invoke-validador-api-producto.md)
- VCN→proxy: [`06`](./06-contrato-producto-validador-proxy.md)
- Prod flujo + tld-util: [`08`](./08-prod-real-flujo-r2p-y-tld-util.md)
- Opinión: [`09`](./09-opinion-doble-ancla-prod-y-vcn.md)
