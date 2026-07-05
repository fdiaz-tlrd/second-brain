# Checklist de errores VCN — General

Fuente de verdad para corrección en `tld-api-cuenta-nombre`. Marcar `[x]` al resolver y verificar con Newman.

| Run | Valor |
|-----|-------|
| Fecha (General completo) | 2026-07-05T05:13:10.017Z |
| Fecha (1_idCanal verificado) | 2026-07-05T07:12:06.803Z |
| Fecha (2_validador verificado) | 2026-07-05T07:38:17.594Z |
| Fecha (3_peticion verificado) | 2026-07-05T07:53:27.900Z |
| Fecha (1_validaciones_js verificado) | 2026-07-05T08:17:07.621Z |
| Carpeta Postman | `General` / `1_validaciones_js` (A1–A4) |
| Tests fallidos (General) | 468 (failed: 153) |
| Tests fallidos (1_idCanal) | 84 (failed: **0**) |
| Tests fallidos (2_validador) | 90 (failed: **0**) |
| Tests fallidos (3_peticion) | 78 (failed: **0**) |
| Tests fallidos (1_validaciones_js) | 396 (failed: **0**) |
| Resumen Newman | [`Postman/generador/logs/resumen-fallos-vcn.md`](../Postman/generador/logs/resumen-fallos-vcn.md) |
| Enfoque | [`01-enfoque-correccion.md`](./01-enfoque-correccion.md) |

| Escenarios General | 78 |
| Fallan (run General 05:13) | 63 → **5** tras A1–A4 (solo `2_reglaNegocio`) |
| Pasan (run General 05:13) | 15 → **73** tras A1–A4 |

**Convención:** *Debe* = contrato Postman. Bloque **`1_validaciones_js` completo** verificado (run 08:17, 66/66); pendiente **`2_reglaNegocio`** (5 escenarios).

Referencia transversal: P2M/P2P (`validaciones.js`, `catalogoRespuestas.js`, orden en `app.js`).

## 1_validaciones_js/1_idCanal

**Estado A1 (2026-07-05T07:12Z):** 14/14 en verde — ver sección *Escenarios que pasan* al final.

## 1_validaciones_js/2_validador

**Estado A2 (2026-07-05T07:38Z):** 15/15 en verde — ver sección *Escenarios que pasan* al final.

## 1_validaciones_js/3_peticion

**Estado A3 (2026-07-05T07:53Z):** 13/13 en verde — ver sección *Escenarios que pasan* al final.

## 1_validaciones_js/4_idPeticion

**Estado A4 (2026-07-05T08:17Z):** 15/15 en verde — ver sección *Escenarios que pasan* al final.

## 1_validaciones_js/5_solicitudes

**Estado A4 (2026-07-05T08:17Z):** 9/9 en verde — ver sección *Escenarios que pasan* al final.

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

### 1_validaciones_js/1_idCanal — A1 cerrada (run 2026-07-05T07:12Z)
- [x] 1.1.1. idCanal — propiedad ausente (undefined) (400)
- [x] 1.1.2. idCanal — null (400)
- [x] 1.1.3. idCanal — string vacío "" (400)
- [x] 1.1.4. idCanal — tipo number (400)
- [x] 1.1.5. idCanal — tipo boolean (400)
- [x] 1.1.6. idCanal — tipo object (400)
- [x] 1.1.7. idCanal — solo espacios, trim vacío (400)
- [x] 1.1.8. idCanal — solo tab, trim vacío (400)
- [x] 1.1.9. idCanal — longitud 5, máximo 4 (400)
- [x] 1.1.10. idCanal — espacio interno, post-trim (400)
- [x] 1.1.11. idCanal — símbolo @ no permitido (400)
- [x] 1.1.12. idCanal — paréntesis ( no permitido (400)
- [x] 1.1.13. idCanal — ¿ no permitido (400)
- [x] 1.1.14. idCanal — comillas " no permitidas (400)

### 1_validaciones_js/2_validador — A2 cerrada (run 2026-07-05T07:38Z)
- [x] 1.2.1. validador — propiedad ausente (undefined) (400)
- [x] 1.2.2. validador — null (400)
- [x] 1.2.3. validador — string vacío "" (400)
- [x] 1.2.4. validador — tipo number (400)
- [x] 1.2.5. validador — tipo boolean (400)
- [x] 1.2.6. validador — tipo object (400)
- [x] 1.2.7. validador — solo espacios, trim vacío (400)
- [x] 1.2.8. validador — solo tab, trim vacío (400)
- [x] 1.2.9. validador — longitud 5, máximo 4 (400)
- [x] 1.2.10. validador — espacio interno, post-trim (400)
- [x] 1.2.11. validador — símbolo @ no permitido (400)
- [x] 1.2.12. validador — paréntesis ( no permitido (400)
- [x] 1.2.13. validador — ¿ no permitido (400)
- [x] 1.2.14. validador — comillas " no permitidas (400)
- [x] 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)

### 1_validaciones_js/3_peticion — A3 cerrada (run 2026-07-05T07:53Z)
- [x] 1.3.1. peticion — propiedad ausente (undefined) (400)
- [x] 1.3.2. peticion — null (400)
- [x] 1.3.3. peticion — string vacío (400)
- [x] 1.3.4. peticion — tipo number (400)
- [x] 1.3.5. peticion — tipo boolean (400)
- [x] 1.3.6. peticion — tipo object (400)
- [x] 1.3.7. peticion — formato hex inválido (400)
- [x] 1.3.8. peticion — IV en base64 (400)
- [x] 1.3.9. peticion — IV truncado (400)
- [x] 1.3.10. peticion — segmento AES en base64 (400)
- [x] 1.3.11. peticion — segmento AES faltante (400)
- [x] 1.3.12. peticion — segmento extra (400)
- [x] 1.3.13. peticion — caracter no hex (400)

### 1_validaciones_js/4_idPeticion — A4 cerrada (run 2026-07-05T08:17Z)
- [x] 1.4.1. idPeticion — propiedad ausente (undefined) (400)
- [x] 1.4.2. idPeticion — null (400)
- [x] 1.4.3. idPeticion — string vacío (400)
- [x] 1.4.4. idPeticion — tipo number (400)
- [x] 1.4.5. idPeticion — tipo boolean (400)
- [x] 1.4.6. idPeticion — tipo object (400)
- [x] 1.4.7. idPeticion — solo espacios (400)
- [x] 1.4.8. idPeticion — solo tab (400)
- [x] 1.4.9. idPeticion — longitud 7, mínimo 8 (400)
- [x] 1.4.10. idPeticion — longitud 65, máximo 64 (400)
- [x] 1.4.11. idPeticion — espacio interno (400)
- [x] 1.4.12. idPeticion — símbolo @ (400)
- [x] 1.4.13. idPeticion — unicode interrogación apertura (400)
- [x] 1.4.14. idPeticion — comillas (400)
- [x] 1.4.15. idPeticion — prefijo SWIFT ajeno (445)

### 1_validaciones_js/5_solicitudes — A4 cerrada (run 2026-07-05T08:17Z)
- [x] 1.5.1. solicitudes — tipo string (425)
- [x] 1.5.2. solicitudes — arreglo vacío (425)
- [x] 1.5.3. solicitudes — excede límite (425)
- [x] 1.5.4. solicitudes — sin propiedad idSolicitud (431)
- [x] 1.5.5. solicitudes — idSolicitud vacío (431)
- [x] 1.5.6. solicitudes — idSolicitud tipo number (431)
- [x] 1.5.7. solicitudes — idSolicitud solo espacios (431)
- [x] 1.5.8. solicitudes — idSolicitud longitud 65 (431)
- [x] 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431)

### 2_reglaNegocio/1_idCanal
- [x] 2.1.1. idCanal — no existe en BD (401)

### 2_reglaNegocio/3_peticion
- [x] 2.3.1. peticion — cifrada con otra llave RSA (405)
- [x] 2.3.2. peticion — clave AES-128 en RSA (405)
- [x] 2.3.3. peticion — RSA material no hex (405)
- [x] 2.3.4. peticion — hex corrupto (405)
- [x] 2.3.5. peticion — cifrado truncado (405)
- [x] 2.3.6. peticion — tag GCM corrupto (405)
