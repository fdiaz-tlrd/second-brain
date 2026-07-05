# Checklist de errores VCN — General

Fuente de verdad para corrección en `tld-api-cuenta-nombre`. Marcar `[x]` al resolver y verificar con Newman.

| Run | Valor |
|-----|-------|
| Fecha | 2026-07-05T05:13:10.017Z |
| Carpeta Postman | `General` |
| Tests fallidos | 468 (failed: 153) |
| Resumen Newman | [`Postman/generador/logs/resumen-fallos-vcn.md`](../Postman/generador/logs/resumen-fallos-vcn.md) |
| Enfoque | [`01-enfoque-correccion.md`](./01-enfoque-correccion.md) |

| Escenarios General | 78 |
| Fallan | 63 |
| Pasan | 15 |

**Convención:** *Debe* = contrato Postman (escenario JSON). *Está* = VCN dev, run 2026-07-05.

Referencia transversal: P2M/P2P (`validaciones.js`, `catalogoRespuestas.js`, orden en `app.js`).

## 1_validaciones_js/1_idCanal

- [ ] **1.1.1. idCanal — propiedad ausente (undefined) (400)**
  - Postman: `General/1_validaciones_js/1_idCanal`
  - Escenario: [`1_validaciones_js/1_idCanal/1.1_idCanal_propiedad_ausente.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.1_idCanal_propiedad_ausente.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 400, "mensajeError": "Error al consultar canal-plan por idCanal" }` (HTTP descifrar 200)
  - **Gap:** mensaje no coincide con catálogo

- [ ] **1.1.10. idCanal — espacio interno, post-trim (400)**
  - Postman: `General/1_validaciones_js/1_idCanal`
  - Escenario: [`1_validaciones_js/1_idCanal/1.10_idCanal_espacio_interno.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.10_idCanal_espacio_interno.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 401, "mensajeError": "Canal emisor no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 401 vs 400; mensaje no coincide con catálogo

- [ ] **1.1.11. idCanal — símbolo @ no permitido (400)**
  - Postman: `General/1_validaciones_js/1_idCanal`
  - Escenario: [`1_validaciones_js/1_idCanal/1.11_idCanal_simbolo_arroba.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.11_idCanal_simbolo_arroba.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 401, "mensajeError": "Canal emisor no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 401 vs 400; mensaje no coincide con catálogo

- [ ] **1.1.12. idCanal — paréntesis ( no permitido (400)**
  - Postman: `General/1_validaciones_js/1_idCanal`
  - Escenario: [`1_validaciones_js/1_idCanal/1.12_idCanal_parentesis.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.12_idCanal_parentesis.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 401, "mensajeError": "Canal emisor no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 401 vs 400; mensaje no coincide con catálogo

- [ ] **1.1.13. idCanal — ¿ no permitido (400)**
  - Postman: `General/1_validaciones_js/1_idCanal`
  - Escenario: [`1_validaciones_js/1_idCanal/1.13_idCanal_unicode_interrogacion_apertura.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.13_idCanal_unicode_interrogacion_apertura.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 401, "mensajeError": "Canal emisor no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 401 vs 400; mensaje no coincide con catálogo

- [ ] **1.1.14. idCanal — comillas " no permitidas (400)**
  - Postman: `General/1_validaciones_js/1_idCanal`
  - Escenario: [`1_validaciones_js/1_idCanal/1.14_idCanal_comillas.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.14_idCanal_comillas.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 401, "mensajeError": "Canal emisor no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 401 vs 400; mensaje no coincide con catálogo

- [ ] **1.1.4. idCanal — tipo number (400)**
  - Postman: `General/1_validaciones_js/1_idCanal`
  - Escenario: [`1_validaciones_js/1_idCanal/1.4_idCanal_tipo_number.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.4_idCanal_tipo_number.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 500, "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal" }` (HTTP descifrar 200)
  - **Gap:** codigoError 500 vs 400; mensaje no coincide con catálogo

- [ ] **1.1.5. idCanal — tipo boolean (400)**
  - Postman: `General/1_validaciones_js/1_idCanal`
  - Escenario: [`1_validaciones_js/1_idCanal/1.5_idCanal_tipo_boolean.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.5_idCanal_tipo_boolean.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 500, "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal" }` (HTTP descifrar 200)
  - **Gap:** codigoError 500 vs 400; mensaje no coincide con catálogo

- [ ] **1.1.6. idCanal — tipo object (400)**
  - Postman: `General/1_validaciones_js/1_idCanal`
  - Escenario: [`1_validaciones_js/1_idCanal/1.6_idCanal_tipo_object.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.6_idCanal_tipo_object.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 500, "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal" }` (HTTP descifrar 200)
  - **Gap:** codigoError 500 vs 400; mensaje no coincide con catálogo

- [ ] **1.1.7. idCanal — solo espacios, trim vacío (400)**
  - Postman: `General/1_validaciones_js/1_idCanal`
  - Escenario: [`1_validaciones_js/1_idCanal/1.7_idCanal_solo_espacios.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.7_idCanal_solo_espacios.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 401, "mensajeError": "Canal emisor no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 401 vs 400; mensaje no coincide con catálogo

- [ ] **1.1.8. idCanal — solo tab, trim vacío (400)**
  - Postman: `General/1_validaciones_js/1_idCanal`
  - Escenario: [`1_validaciones_js/1_idCanal/1.8_idCanal_solo_tab.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.8_idCanal_solo_tab.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 401, "mensajeError": "Canal emisor no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 401 vs 400; mensaje no coincide con catálogo

- [ ] **1.1.9. idCanal — longitud 5, máximo 4 (400)**
  - Postman: `General/1_validaciones_js/1_idCanal`
  - Escenario: [`1_validaciones_js/1_idCanal/1.9_idCanal_longitud_5.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.9_idCanal_longitud_5.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 401, "mensajeError": "Canal emisor no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 401 vs 400; mensaje no coincide con catálogo

## 1_validaciones_js/2_validador

- [ ] **1.2.10. validador — espacio interno, post-trim (400)**
  - Postman: `General/1_validaciones_js/2_validador`
  - Escenario: [`1_validaciones_js/2_validador/2.10_validador_espacio_interno.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/2_validador/2.10_validador_espacio_interno.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 404, "mensajeError": "Validador no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 404 vs 400; mensaje no coincide con catálogo

- [ ] **1.2.11. validador — símbolo @ no permitido (400)**
  - Postman: `General/1_validaciones_js/2_validador`
  - Escenario: [`1_validaciones_js/2_validador/2.11_validador_simbolo_arroba.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/2_validador/2.11_validador_simbolo_arroba.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 404, "mensajeError": "Validador no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 404 vs 400; mensaje no coincide con catálogo

- [ ] **1.2.12. validador — paréntesis ( no permitido (400)**
  - Postman: `General/1_validaciones_js/2_validador`
  - Escenario: [`1_validaciones_js/2_validador/2.12_validador_parentesis.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/2_validador/2.12_validador_parentesis.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 404, "mensajeError": "Validador no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 404 vs 400; mensaje no coincide con catálogo

- [ ] **1.2.13. validador — ¿ no permitido (400)**
  - Postman: `General/1_validaciones_js/2_validador`
  - Escenario: [`1_validaciones_js/2_validador/2.13_validador_unicode_interrogacion_apertura.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/2_validador/2.13_validador_unicode_interrogacion_apertura.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 404, "mensajeError": "Validador no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 404 vs 400; mensaje no coincide con catálogo

- [ ] **1.2.14. validador — comillas " no permitidas (400)**
  - Postman: `General/1_validaciones_js/2_validador`
  - Escenario: [`1_validaciones_js/2_validador/2.14_validador_comillas.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/2_validador/2.14_validador_comillas.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 404, "mensajeError": "Validador no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 404 vs 400; mensaje no coincide con catálogo

- [ ] **1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)**
  - Postman: `General/1_validaciones_js/2_validador`
  - Escenario: [`1_validaciones_js/2_validador/2.15_validador_distinto_canal_configurado.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/2_validador/2.15_validador_distinto_canal_configurado.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{"respuesta":{"idPeticion":"CELEGATO1783228336","respuestas":[{"idSolicitud":"1","resultado":510,"datos":null}]}}` (HTTP descifrar 200)
  - **Gap:** sin codigoError/mensajeError en body descifrado; mensaje no coincide con catálogo

- [ ] **1.2.4. validador — tipo number (400)**
  - Postman: `General/1_validaciones_js/2_validador`
  - Escenario: [`1_validaciones_js/2_validador/2.4_validador_tipo_number.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/2_validador/2.4_validador_tipo_number.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 500, "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal" }` (HTTP descifrar 200)
  - **Gap:** codigoError 500 vs 400; mensaje no coincide con catálogo

- [ ] **1.2.5. validador — tipo boolean (400)**
  - Postman: `General/1_validaciones_js/2_validador`
  - Escenario: [`1_validaciones_js/2_validador/2.5_validador_tipo_boolean.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/2_validador/2.5_validador_tipo_boolean.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 500, "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal" }` (HTTP descifrar 200)
  - **Gap:** codigoError 500 vs 400; mensaje no coincide con catálogo

- [ ] **1.2.6. validador — tipo object (400)**
  - Postman: `General/1_validaciones_js/2_validador`
  - Escenario: [`1_validaciones_js/2_validador/2.6_validador_tipo_object.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/2_validador/2.6_validador_tipo_object.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 500, "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal" }` (HTTP descifrar 200)
  - **Gap:** codigoError 500 vs 400; mensaje no coincide con catálogo

- [ ] **1.2.7. validador — solo espacios, trim vacío (400)**
  - Postman: `General/1_validaciones_js/2_validador`
  - Escenario: [`1_validaciones_js/2_validador/2.7_validador_solo_espacios.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/2_validador/2.7_validador_solo_espacios.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 404, "mensajeError": "Validador no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 404 vs 400; mensaje no coincide con catálogo

- [ ] **1.2.8. validador — solo tab, trim vacío (400)**
  - Postman: `General/1_validaciones_js/2_validador`
  - Escenario: [`1_validaciones_js/2_validador/2.8_validador_solo_tab.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/2_validador/2.8_validador_solo_tab.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 404, "mensajeError": "Validador no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 404 vs 400; mensaje no coincide con catálogo

- [ ] **1.2.9. validador — longitud 5, máximo 4 (400)**
  - Postman: `General/1_validaciones_js/2_validador`
  - Escenario: [`1_validaciones_js/2_validador/2.9_validador_longitud_5.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/2_validador/2.9_validador_longitud_5.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 404, "mensajeError": "Validador no existe" }` (HTTP descifrar 200)
  - **Gap:** codigoError 404 vs 400; mensaje no coincide con catálogo

## 1_validaciones_js/3_peticion

- [ ] **1.3.10. peticion — segmento AES en base64 (400)**
  - Postman: `General/1_validaciones_js/3_peticion`
  - Escenario: [`1_validaciones_js/3_peticion/3.10_peticion_aes_base64.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/3_peticion/3.10_peticion_aes_base64.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 405, "mensajeError": "Error en descifrado canal emisor" }` (HTTP descifrar 200)
  - **Gap:** codigoError 405 vs 400; mensaje no coincide con catálogo

- [ ] **1.3.11. peticion — segmento AES faltante (400)**
  - Postman: `General/1_validaciones_js/3_peticion`
  - Escenario: [`1_validaciones_js/3_peticion/3.11_peticion_segmento_aes_faltante.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/3_peticion/3.11_peticion_segmento_aes_faltante.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 405, "mensajeError": "Error en descifrado canal emisor" }` (HTTP descifrar 200)
  - **Gap:** codigoError 405 vs 400; mensaje no coincide con catálogo

- [ ] **1.3.12. peticion — segmento extra (400)**
  - Postman: `General/1_validaciones_js/3_peticion`
  - Escenario: [`1_validaciones_js/3_peticion/3.12_peticion_segmento_extra.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/3_peticion/3.12_peticion_segmento_extra.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 405, "mensajeError": "Error en descifrado canal emisor" }` (HTTP descifrar 200)
  - **Gap:** codigoError 405 vs 400; mensaje no coincide con catálogo

- [ ] **1.3.13. peticion — caracter no hex (400)**
  - Postman: `General/1_validaciones_js/3_peticion`
  - Escenario: [`1_validaciones_js/3_peticion/3.13_peticion_caracter_no_hex.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/3_peticion/3.13_peticion_caracter_no_hex.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 405, "mensajeError": "Error en descifrado canal emisor" }` (HTTP descifrar 200)
  - **Gap:** codigoError 405 vs 400; mensaje no coincide con catálogo

- [ ] **1.3.4. peticion — tipo number (400)**
  - Postman: `General/1_validaciones_js/3_peticion`
  - Escenario: [`1_validaciones_js/3_peticion/3.4_peticion_tipo_number.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/3_peticion/3.4_peticion_tipo_number.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 405, "mensajeError": "Error en descifrado canal emisor" }` (HTTP descifrar 200)
  - **Gap:** codigoError 405 vs 400; mensaje no coincide con catálogo

- [ ] **1.3.5. peticion — tipo boolean (400)**
  - Postman: `General/1_validaciones_js/3_peticion`
  - Escenario: [`1_validaciones_js/3_peticion/3.5_peticion_tipo_boolean.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/3_peticion/3.5_peticion_tipo_boolean.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 405, "mensajeError": "Error en descifrado canal emisor" }` (HTTP descifrar 200)
  - **Gap:** codigoError 405 vs 400; mensaje no coincide con catálogo

- [ ] **1.3.6. peticion — tipo object (400)**
  - Postman: `General/1_validaciones_js/3_peticion`
  - Escenario: [`1_validaciones_js/3_peticion/3.6_peticion_tipo_object.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/3_peticion/3.6_peticion_tipo_object.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 405, "mensajeError": "Error en descifrado canal emisor" }` (HTTP descifrar 200)
  - **Gap:** codigoError 405 vs 400; mensaje no coincide con catálogo

- [ ] **1.3.7. peticion — formato hex inválido (400)**
  - Postman: `General/1_validaciones_js/3_peticion`
  - Escenario: [`1_validaciones_js/3_peticion/3.7_peticion_formato_hex_invalido.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/3_peticion/3.7_peticion_formato_hex_invalido.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 405, "mensajeError": "Error en descifrado canal emisor" }` (HTTP descifrar 200)
  - **Gap:** codigoError 405 vs 400; mensaje no coincide con catálogo

- [ ] **1.3.8. peticion — IV en base64 (400)**
  - Postman: `General/1_validaciones_js/3_peticion`
  - Escenario: [`1_validaciones_js/3_peticion/3.8_peticion_iv_base64.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/3_peticion/3.8_peticion_iv_base64.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 405, "mensajeError": "Error en descifrado canal emisor" }` (HTTP descifrar 200)
  - **Gap:** codigoError 405 vs 400; mensaje no coincide con catálogo

- [ ] **1.3.9. peticion — IV truncado (400)**
  - Postman: `General/1_validaciones_js/3_peticion`
  - Escenario: [`1_validaciones_js/3_peticion/3.9_peticion_iv_truncado.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/3_peticion/3.9_peticion_iv_truncado.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 405, "mensajeError": "Error en descifrado canal emisor" }` (HTTP descifrar 200)
  - **Gap:** codigoError 405 vs 400; mensaje no coincide con catálogo

## 1_validaciones_js/4_idPeticion

- [ ] **1.4.1. idPeticion — propiedad ausente (undefined) (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.1_idPeticion_propiedad_ausente.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.1_idPeticion_propiedad_ausente.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 500, "mensajeError": "Error interno" }` (HTTP descifrar 200)
  - **Gap:** codigoError 500 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.10. idPeticion — longitud 65, máximo 64 (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.10_idPeticion_longitud_65.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.10_idPeticion_longitud_65.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.11. idPeticion — espacio interno (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.11_idPeticion_espacio_interno.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.11_idPeticion_espacio_interno.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.12. idPeticion — símbolo @ (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.12_idPeticion_simbolo_arroba.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.12_idPeticion_simbolo_arroba.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.13. idPeticion — unicode interrogación apertura (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.13_idPeticion_unicode_interrogacion_apertura.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.13_idPeticion_unicode_interrogacion_apertura.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.14. idPeticion — comillas (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.14_idPeticion_comillas.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.14_idPeticion_comillas.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.15. idPeticion — prefijo SWIFT ajeno (445)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.15_idPeticion_prefijo_swift_ajeno.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.15_idPeticion_prefijo_swift_ajeno.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `445`, tipo `general`
  - **Debe mensaje:** `El prefijo Código SWIFT del idPeticio…`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 445; mensaje no coincide con catálogo

- [ ] **1.4.2. idPeticion — null (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.2_idPeticion_null.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.2_idPeticion_null.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 500, "mensajeError": "Error interno" }` (HTTP descifrar 200)
  - **Gap:** codigoError 500 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.3. idPeticion — string vacío (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.3_idPeticion_string_vacio.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.3_idPeticion_string_vacio.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 500, "mensajeError": "Error interno" }` (HTTP descifrar 200)
  - **Gap:** codigoError 500 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.4. idPeticion — tipo number (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.4_idPeticion_tipo_number.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.4_idPeticion_tipo_number.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.5. idPeticion — tipo boolean (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.5_idPeticion_tipo_boolean.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.5_idPeticion_tipo_boolean.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.6. idPeticion — tipo object (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.6_idPeticion_tipo_object.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.6_idPeticion_tipo_object.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.7. idPeticion — solo espacios (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.7_idPeticion_solo_espacios.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.7_idPeticion_solo_espacios.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 500, "mensajeError": "Error interno" }` (HTTP descifrar 200)
  - **Gap:** codigoError 500 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.8. idPeticion — solo tab (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.8_idPeticion_solo_tab.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.8_idPeticion_solo_tab.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 500, "mensajeError": "Error interno" }` (HTTP descifrar 200)
  - **Gap:** codigoError 500 vs 400; mensaje no coincide con catálogo

- [ ] **1.4.9. idPeticion — longitud 7, mínimo 8 (400)**
  - Postman: `General/1_validaciones_js/4_idPeticion`
  - Escenario: [`1_validaciones_js/4_idPeticion/4.9_idPeticion_longitud_7.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/4_idPeticion/4.9_idPeticion_longitud_7.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `400`, tipo `general`
  - **Debe mensaje:** `Error en la petición original`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 400; mensaje no coincide con catálogo

## 1_validaciones_js/5_solicitudes

- [ ] **1.5.1. solicitudes — tipo string (425)**
  - Postman: `General/1_validaciones_js/5_solicitudes`
  - Escenario: [`1_validaciones_js/5_solicitudes/5.1_solicitudes_tipo_string.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/5_solicitudes/5.1_solicitudes_tipo_string.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `425`, tipo `general`
  - **Debe mensaje:** `Cantidad de solicitudes no permitidas`
  - **Está:** `{"respuesta":{"idPeticion":"CELEGATO1783228369","respuestas":[{"resultado":413,"datos":null}]}}` (HTTP descifrar 200)
  - **Gap:** sin codigoError/mensajeError en body descifrado; mensaje no coincide con catálogo

- [ ] **1.5.2. solicitudes — arreglo vacío (425)**
  - Postman: `General/1_validaciones_js/5_solicitudes`
  - Escenario: [`1_validaciones_js/5_solicitudes/5.2_solicitudes_arreglo_vacio.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/5_solicitudes/5.2_solicitudes_arreglo_vacio.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `425`, tipo `general`
  - **Debe mensaje:** `Cantidad de solicitudes no permitidas`
  - **Está:** `{"respuesta":{"idPeticion":"CELEGATO1783228370","respuestas":[{"resultado":413,"datos":null}]}}` (HTTP descifrar 200)
  - **Gap:** sin codigoError/mensajeError en body descifrado; mensaje no coincide con catálogo

- [ ] **1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)**
  - Postman: `General/1_validaciones_js/5_solicitudes`
  - Escenario: [`1_validaciones_js/5_solicitudes/5.3_solicitudes_excede_limite.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/5_solicitudes/5.3_solicitudes_excede_limite.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `425`, tipo `general`
  - **Debe mensaje:** `Cantidad de solicitudes no permitidas`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 425; mensaje no coincide con catálogo

- [ ] **1.5.4. solicitudes — sin propiedad idSolicitud (431)**
  - Postman: `General/1_validaciones_js/5_solicitudes`
  - Escenario: [`1_validaciones_js/5_solicitudes/5.4_solicitudes_sin_idSolicitud.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/5_solicitudes/5.4_solicitudes_sin_idSolicitud.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `431`, tipo `general`
  - **Debe mensaje:** `Campo idSolicitud no cumple con los c…`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 431; mensaje no coincide con catálogo

- [ ] **1.5.5. solicitudes — idSolicitud vacío (431)**
  - Postman: `General/1_validaciones_js/5_solicitudes`
  - Escenario: [`1_validaciones_js/5_solicitudes/5.5_solicitudes_idSolicitud_vacio.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/5_solicitudes/5.5_solicitudes_idSolicitud_vacio.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `431`, tipo `general`
  - **Debe mensaje:** `Campo idSolicitud no cumple con los c…`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 431; mensaje no coincide con catálogo

- [ ] **1.5.6. solicitudes — idSolicitud tipo number (431)**
  - Postman: `General/1_validaciones_js/5_solicitudes`
  - Escenario: [`1_validaciones_js/5_solicitudes/5.6_solicitudes_idSolicitud_tipo_number.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/5_solicitudes/5.6_solicitudes_idSolicitud_tipo_number.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `431`, tipo `general`
  - **Debe mensaje:** `Campo idSolicitud no cumple con los c…`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 431; mensaje no coincide con catálogo

- [ ] **1.5.7. solicitudes — idSolicitud solo espacios (431)**
  - Postman: `General/1_validaciones_js/5_solicitudes`
  - Escenario: [`1_validaciones_js/5_solicitudes/5.7_solicitudes_idSolicitud_solo_espacios.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/5_solicitudes/5.7_solicitudes_idSolicitud_solo_espacios.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `431`, tipo `general`
  - **Debe mensaje:** `Campo idSolicitud no cumple con los c…`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 431; mensaje no coincide con catálogo

- [ ] **1.5.8. solicitudes — idSolicitud longitud 65 (431)**
  - Postman: `General/1_validaciones_js/5_solicitudes`
  - Escenario: [`1_validaciones_js/5_solicitudes/5.8_solicitudes_idSolicitud_longitud_65.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/5_solicitudes/5.8_solicitudes_idSolicitud_longitud_65.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `431`, tipo `general`
  - **Debe mensaje:** `Campo idSolicitud no cumple con los c…`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 431; mensaje no coincide con catálogo

- [ ] **1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]**
  - Postman: `General/1_validaciones_js/5_solicitudes`
  - Escenario: [`1_validaciones_js/5_solicitudes/5.9_solicitudes_idSolicitud_duplicado.json`](../Postman/generador/VCN Escenarios error/General/1_validaciones_js/5_solicitudes/5.9_solicitudes_idSolicitud_duplicado.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `431`, tipo `general`
  - **Debe mensaje:** `Campo idSolicitud no cumple con los c…`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 431; mensaje no coincide con catálogo

## 2_reglaNegocio/1_idCanal

- [ ] **2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]**
  - Postman: `General/2_reglaNegocio/1_idCanal`
  - Escenario: [`2_reglaNegocio/1_idCanal/1.2_idCanal_sin_plan_suscripcion.json`](../Postman/generador/VCN Escenarios error/General/2_reglaNegocio/1_idCanal/1.2_idCanal_sin_plan_suscripcion.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `403`, tipo `general`
  - **Debe mensaje:** `Canal emisor no tiene un plan de susc…`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 403; mensaje no coincide con catálogo

- [ ] **2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]**
  - Postman: `General/2_reglaNegocio/1_idCanal`
  - Escenario: [`2_reglaNegocio/1_idCanal/1.3_idCanal_error_interno_getCanal.json`](../Postman/generador/VCN Escenarios error/General/2_reglaNegocio/1_idCanal/1.3_idCanal_error_interno_getCanal.json)
  - **Debe:** HTTP Lambda `500`, `codigoError` `500`, tipo `general`
  - **Debe mensaje:** `Error interno`
  - **Está:** `{ "codigoError": 500, "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal" }` (HTTP descifrar 200)
  - **Gap:** mensaje no coincide con catálogo

- [ ] **2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]**
  - Postman: `General/2_reglaNegocio/1_idCanal`
  - Escenario: [`2_reglaNegocio/1_idCanal/1.4_idCanal_sin_plan_suscripcion_sin_grupos.json`](../Postman/generador/VCN Escenarios error/General/2_reglaNegocio/1_idCanal/1.4_idCanal_sin_plan_suscripcion_sin_grupos.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `403`, tipo `general`
  - **Debe mensaje:** `Canal emisor no tiene un plan de susc…`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 403; mensaje no coincide con catálogo

## 2_reglaNegocio/4_metodo

- [ ] **2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)**
  - Postman: `General/2_reglaNegocio/4_metodo`
  - Escenario: [`2_reglaNegocio/4_metodo/4.1_metodo_fuera_cfg.json`](../Postman/generador/VCN Escenarios error/General/2_reglaNegocio/4_metodo/4.1_metodo_fuera_cfg.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `418`, tipo `general`
  - **Debe mensaje:** `Método no soportado`
  - **Está:** `{ "codigoError": 509, "mensajeError": "Error inesperado en el Canal Validador" }` (HTTP descifrar 200)
  - **Gap:** codigoError 509 vs 418; mensaje no coincide con catálogo

- [ ] **2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]**
  - Postman: `General/2_reglaNegocio/4_metodo`
  - Escenario: [`2_reglaNegocio/4_metodo/4.2_metodo_no_asociado_emisor.json`](../Postman/generador/VCN Escenarios error/General/2_reglaNegocio/4_metodo/4.2_metodo_no_asociado_emisor.json)
  - **Debe:** HTTP Lambda `400`, `codigoError` `418`, tipo `general`
  - **Debe mensaje:** `Método no soportado`
  - **Está:** `{ "codigoError": 405, "mensajeError": "Error en descifrado canal emisor" }` (HTTP descifrar 200)
  - **Gap:** codigoError 405 vs 418; mensaje no coincide con catálogo

---

## Escenarios que pasan (no requieren acción ahora)

### 1_validaciones_js/1_idCanal
- [x] 1.1.2. idCanal — null (400)
- [x] 1.1.3. idCanal — string vacío "" (400)

### 1_validaciones_js/2_validador
- [x] 1.2.1. validador — propiedad ausente (undefined) (400)
- [x] 1.2.2. validador — null (400)
- [x] 1.2.3. validador — string vacío "" (400)

### 1_validaciones_js/3_peticion
- [x] 1.3.1. peticion — propiedad ausente (undefined) (400)
- [x] 1.3.2. peticion — null (400)
- [x] 1.3.3. peticion — string vacío (400)

### 2_reglaNegocio/1_idCanal
- [x] 2.1.1. idCanal — no existe en BD (401)

### 2_reglaNegocio/3_peticion
- [x] 2.3.1. peticion — cifrada con otra llave RSA (405)
- [x] 2.3.2. peticion — clave AES-128 en RSA (405)
- [x] 2.3.3. peticion — RSA material no hex (405)
- [x] 2.3.4. peticion — hex corrupto (405)
- [x] 2.3.5. peticion — cifrado truncado (405)
- [x] 2.3.6. peticion — tag GCM corrupto (405)
