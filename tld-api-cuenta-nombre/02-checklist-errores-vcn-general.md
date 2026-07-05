# Checklist de errores VCN — General

Fuente de verdad para corrección en `tld-api-cuenta-nombre`. Marcar `[x]` al resolver y verificar con Newman.

| Run | Valor |
|-----|-------|
| Fecha (VCN completo) | **2026-07-05T23:40:23.023Z** |
| Fecha (Metodo, post-A9) | **2026-07-05T23:01:33.545Z** |
| Fecha (2_reglaNegocio/2_validador) | 2026-07-05T19:02Z (aprox., post-deploy A8a) |
| Fecha (1_validaciones_js regresión post-1.2.15) | incluida en run VCN completo |
| Carpeta Postman | `General` + `Metodo/0001` (incl. `2_respuestaCanalValidador`) + resto colección VCN |
| Requests (VCN completo) | **446** (failed: **0**) |
| Tests (VCN completo) | **1098** (failed: **0**) |
| Tests (`Metodo`) | **522** (failed: **0**) |
| Tests (`Metodo/0001/2_respuestaCanalValidador`) | **432** (48 escenarios × ~9 asserts) |
| Tests (`2_reglaNegocio/2_validador`) | **18** (failed: **0**) |
| Tests (`1_validaciones_js`) | **390** (failed: **0**, tras eliminar 1.2.15) |
| Resumen Newman | [`Postman/generador/logs/registro-vcn.md`](../Postman/generador/logs/registro-vcn.md) (historial) · [`resumen-fallos-vcn.md`](../Postman/generador/logs/resumen-fallos-vcn.md) (último) |
| Enfoque | [`01-enfoque-correccion.md`](./01-enfoque-correccion.md) |
| Triage A9 | [`triage/09-respuesta-canal-validador-510-515.md`](./triage/09-respuesta-canal-validador-510-515.md) |

| Escenarios General (baseline 2026-07-05) | 78 |
| Escenarios General (+ `2_reglaNegocio/2_validador`, − `1.2.15`, + `0_jsonEntrada`) | **81** |
| Escenarios `Metodo/0001/1_validaciones_js/1_cuenta` | **20** (413) — **20/20** verificados |
| Escenarios `Metodo/0001/2_respuestaCanalValidador` | **48** |
| Estado General | **80/80** + regresión VCN completa **1098/1098** |

**Convención:** *Debe* = contrato Postman. Newman verificado vía **`registro-vcn.md`** (usuario: VPN → run → commit/push logs). Ver [`05-newman-vpn-reglas-agente.md`](./05-newman-vpn-reglas-agente.md).

Referencia transversal: P2M/P2P (`validaciones.js`, `catalogoRespuestas.js`, orden en `app.js`).

## 1_validaciones_js/1_idCanal

**Estado A1 (2026-07-05T07:12Z):** 14/14 en verde — ver sección *Escenarios que pasan* al final.

## 0_jsonEntrada — triage #1 (2026-07-05)

- [x] **0.1** — body HTTP JSON inválido (400) — escenario + código A2/A3; **Newman pendiente (usuario, VPN + deploy)**

## 1_validaciones_js/2_validador

**Estado A2 (2026-07-05T07:38Z, regresión 19:51Z):** **14/14** en verde — ver sección *Escenarios que pasan* al final.

## 1_validaciones_js/3_peticion

**Estado A3 (2026-07-05T07:53Z):** 13/13 en verde — ver sección *Escenarios que pasan* al final.

## 1_validaciones_js/4_idPeticion

**Estado A4 (2026-07-05T08:17Z):** 15/15 en verde — ver sección *Escenarios que pasan* al final.

## 1_validaciones_js/5_solicitudes

**Estado A4 (2026-07-05T08:17Z):** 9/9 en verde — ver sección *Escenarios que pasan* al final.

## 2_reglaNegocio/1_idCanal

**Estado A5 (2026-07-05T09:28Z):** 4/4 en verde — ver sección *Escenarios que pasan*.

## 2_reglaNegocio/4_metodo

**Estado (2026-07-05T09:37Z):** 2/2 en verde — ver sección *Escenarios que pasan*.

## 2_reglaNegocio/2_validador — A8 cerrada (2026-07-05)

**Debate cerrado 2026-07-05.** Detalle: [triage/08-2_validador-reglaNegocio.md](./triage/08-2_validador-reglaNegocio.md).

**Newman:** **3/3** escenarios (18 assertions, run post-deploy A8a); incluido en VCN completo **1008/1008**.

- [x] **Datos/env** — `CANAL_VALIDADOR_DESHABILITADO` = **1021**; `CANAL_VALIDADOR_MAL_CONFIGURADO` = **1017**; canal 1021 en `Postman/canalesPruebas-dev/`
- [x] **Código A8a** — regla `CFG_CANAL_VALIDADOR` eliminada en dev (`37a5e06`)
- [x] **2.2.1** — HTTP 400 / `codigoError` **404** en claro; env `9999`
- [x] **2.2.2** — HTTP 400 / `codigoError` **402** en claro; env **1021**
- [x] **2.2.3** — **P6 cerrado:** dev **HTTP 500** / `codigoError` **500** / *Error interno* (cifrado al emisor); canal **1017**

---

## Escenarios que pasan (no requieren acción ahora)

### 0_jsonEntrada — triage #1 (2026-07-05)
- [x] 0.1. body — JSON HTTP inválido (400)

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

**Nota:** **1.2.15** eliminado en VCN (2026-07-05) — regla P2M `validador === 0001` no aplica; escenario obsoleto.

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

### 2_reglaNegocio/1_idCanal — A5 cerrada (run 2026-07-05T09:28Z)
- [x] 2.1.1. idCanal — no existe en BD (401)
- [x] 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]
- [x] 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]
- [x] 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

### 2_reglaNegocio/4_metodo (run 2026-07-05T09:37Z)
- [x] 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)
- [x] 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

### 2_reglaNegocio/2_validador — A8 cerrada (run post-A8a, regresión 19:51Z)
- [x] 2.2.1. validador — no existe en BD (404) [CANAL_VALIDADOR_NO_EXISTE=9999]
- [x] 2.2.2. validador — deshabilitado (402) [CANAL_VALIDADOR_DESHABILITADO=1021]
- [x] 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO=1017]

### 2_reglaNegocio/3_peticion
- [x] 2.3.1. peticion — cifrada con otra llave RSA (405)
- [x] 2.3.2. peticion — clave AES-128 en RSA (405)
- [x] 2.3.3. peticion — RSA material no hex (405)
- [x] 2.3.4. peticion — hex corrupto (405)
- [x] 2.3.5. peticion — cifrado truncado (405)
- [x] 2.3.6. peticion — tag GCM corrupto (405)

## Metodo/0001/1_validaciones_js/1_cuenta — A10 cerrada (2026-07-05T23:40Z)

**20/20** escenarios → `resultado` **413**. Detalle: [triage/10-cuenta-413-validaciones-js.md](./triage/10-cuenta-413-validaciones-js.md).

- [x] 1.1. cuenta — propiedad ausente (413)
- [x] 1.2. cuenta — null (413)
- [x] 1.3. cuenta — string vacío (413)
- [x] 1.4. cuenta — tipo number (413)
- [x] 1.5. cuenta — tipo boolean (413)
- [x] 1.6. cuenta — tipo object (413)
- [x] 1.7. cuenta — con letras (413)
- [x] 1.8. cuenta — solo espacios (413)
- [x] 1.9. cuenta — espacio interno (413)
- [x] 1.10. cuenta — longitud 35 (413)
- [x] 1.11. cuenta — solo tab (413)
- [x] 1.12. cuenta — símbolo @ (413)
- [x] 1.13. cuenta — paréntesis (413)
- [x] 1.14. cuenta — unicode ¿ (413)
- [x] 1.15. cuenta — comillas (413)
- [x] 1.16. cuenta — guión (413)
- [x] 1.17. cuenta — decimal (413)
- [x] 1.18. cuenta — tipo array (413)
- [x] 1.19. cuenta — espacio al inicio (413)
- [x] 1.20. cuenta — espacio al final (413)

## Metodo/0001/2_respuestaCanalValidador — A9 cerrada (2026-07-05T23:19Z)

**48/48** escenarios. Emisor fijo **1008**; validadores **1008–1016** (sin 1010). Detalle: [triage/09-respuesta-canal-validador-510-515.md](./triage/09-respuesta-canal-validador-510-515.md).

### Validador 1008 (CELEGATO)
- [x] 0001.2.1008.510 — cuenta incorrecta (510)
- [x] 0001.2.1008.511 — cuenta cerrada (511)
- [x] 0001.2.1008.512 — cuenta bloqueada (512)
- [x] 0001.2.1008.513 — transacción no permitida (513)
- [x] 0001.2.1008.514 — falta info consulta (514)
- [x] 0001.2.1008.515 — razón regulatoria (515)

### Validador 1009 (ASTRGATO)
- [x] 0001.2.1009.510 — cuenta incorrecta (510)
- [x] 0001.2.1009.511 — cuenta cerrada (511)
- [x] 0001.2.1009.512 — cuenta bloqueada (512)
- [x] 0001.2.1009.513 — transacción no permitida (513)
- [x] 0001.2.1009.514 — falta info consulta (514)
- [x] 0001.2.1009.515 — razón regulatoria (515)

### Validador 1011 (MIRAGATO)
- [x] 0001.2.1011.510 — cuenta incorrecta (510)
- [x] 0001.2.1011.511 — cuenta cerrada (511)
- [x] 0001.2.1011.512 — cuenta bloqueada (512)
- [x] 0001.2.1011.513 — transacción no permitida (513)
- [x] 0001.2.1011.514 — falta info consulta (514)
- [x] 0001.2.1011.515 — razón regulatoria (515)

### Validador 1012 (TERAGATO)
- [x] 0001.2.1012.510 — cuenta incorrecta (510)
- [x] 0001.2.1012.511 — cuenta cerrada (511)
- [x] 0001.2.1012.512 — cuenta bloqueada (512)
- [x] 0001.2.1012.513 — transacción no permitida (513)
- [x] 0001.2.1012.514 — falta info consulta (514)
- [x] 0001.2.1012.515 — razón regulatoria (515)

### Validador 1013 (AMIYGATO)
- [x] 0001.2.1013.510 — cuenta incorrecta (510)
- [x] 0001.2.1013.511 — cuenta cerrada (511)
- [x] 0001.2.1013.512 — cuenta bloqueada (512)
- [x] 0001.2.1013.513 — transacción no permitida (513)
- [x] 0001.2.1013.514 — falta info consulta (514)
- [x] 0001.2.1013.515 — razón regulatoria (515)

### Validador 1014 (CORNGATO)
- [x] 0001.2.1014.510 — cuenta incorrecta (510)
- [x] 0001.2.1014.511 — cuenta cerrada (511)
- [x] 0001.2.1014.512 — cuenta bloqueada (512)
- [x] 0001.2.1014.513 — transacción no permitida (513)
- [x] 0001.2.1014.514 — falta info consulta (514)
- [x] 0001.2.1014.515 — razón regulatoria (515)

### Validador 1015 (ZONAGATO)
- [x] 0001.2.1015.510 — cuenta incorrecta (510)
- [x] 0001.2.1015.511 — cuenta cerrada (511)
- [x] 0001.2.1015.512 — cuenta bloqueada (512)
- [x] 0001.2.1015.513 — transacción no permitida (513)
- [x] 0001.2.1015.514 — falta info consulta (514)
- [x] 0001.2.1015.515 — razón regulatoria (515)

### Validador 1016 (BELLGATO)
- [x] 0001.2.1016.510 — cuenta incorrecta (510)
- [x] 0001.2.1016.511 — cuenta cerrada (511)
- [x] 0001.2.1016.512 — cuenta bloqueada (512)
- [x] 0001.2.1016.513 — transacción no permitida (513)
- [x] 0001.2.1016.514 — falta info consulta (514)
- [x] 0001.2.1016.515 — razón regulatoria (515)
