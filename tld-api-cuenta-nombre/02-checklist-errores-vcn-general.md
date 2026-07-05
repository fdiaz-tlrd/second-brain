# Checklist de errores VCN — General

Fuente de verdad para corrección en `tld-api-cuenta-nombre`. Marcar `[x]` al resolver y verificar con Newman.

| Run | Valor |
|-----|-------|
| Fecha (General completo) | 2026-07-05T05:13:10.017Z |
| Fecha (1_idCanal verificado) | 2026-07-05T07:12:06.803Z |
| Fecha (2_validador verificado) | 2026-07-05T07:38:17.594Z |
| Fecha (3_peticion verificado) | 2026-07-05T07:53:27.900Z |
| Fecha (1_validaciones_js verificado) | 2026-07-05T08:17:07.621Z |
| Fecha (2_reglaNegocio/1_idCanal verificado) | 2026-07-05T09:28:35.067Z |
| Fecha (2_reglaNegocio/4_metodo verificado) | 2026-07-05T09:37Z (aprox.) |
| Fecha (1_validaciones_js regresión) | 2026-07-05T09:36:09.865Z |
| Carpeta Postman | `General` / `1_validaciones_js` (A1–A4) |
| Tests fallidos (General) | 468 (failed: 153) |
| Tests fallidos (1_idCanal) | 84 (failed: **0**) |
| Tests fallidos (2_validador) | 90 (failed: **0**) |
| Tests fallidos (3_peticion) | 78 (failed: **0**) |
| Tests fallidos (1_validaciones_js) | 396 (failed: **0**) |
| Resumen Newman | [`Postman/generador/logs/resumen-fallos-vcn.md`](../Postman/generador/logs/resumen-fallos-vcn.md) |
| Enfoque | [`01-enfoque-correccion.md`](./01-enfoque-correccion.md) |

| Escenarios General (baseline 2026-07-05) | 78 |
| Escenarios General (+ `2_reglaNegocio/2_validador`) | **81** (3 nuevos, sin Newman aún) |
| Fallan (baseline) | 63 → **0** tras A0–A5 + `4_metodo` |
| Pasan (baseline) | 15 → **78/78** |

**Convención:** *Debe* = contrato Postman. **Baseline General cerrado** (78/78): `1_validaciones_js` + `2_reglaNegocio` original. Regresión `1_validaciones_js` OK (396/396, run 09:36). **Nuevo:** `2_reglaNegocio/2_validador` (2.2.1–2.2.3) — escenarios añadidos; pendiente Newman y posible código (404/402 cifrado).

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

**Estado A5 (2026-07-05T09:28Z):** 4/4 en verde — ver sección *Escenarios que pasan*.

## 2_reglaNegocio/4_metodo

**Estado (2026-07-05T09:37Z):** 2/2 en verde — ver sección *Escenarios que pasan*.

## 2_reglaNegocio/2_validador (nuevo — regla de negocio)

**Debate cerrado 2026-07-05.** Detalle: [triage/08-2_validador-reglaNegocio.md](./triage/08-2_validador-reglaNegocio.md).

**Newman 2026-07-05T17:38Z:** 0/3 OK (pre-deploy A8a). **Re-run pendiente** tras deploy.

- [x] **Datos/env** — `CANAL_VALIDADOR_DESHABILITADO` = **1021**; `CANAL_VALIDADOR_MAL_CONFIGURADO` = **1017**; canal 1021 en `canalesPruebas-dev`
- [x] **Código A8a** — regla `CFG_CANAL_VALIDADOR` eliminada en dev (`37a5e06`)
- [ ] **2.2.1** — 404, env `9999`; Newman pendiente
- [ ] **2.2.2** — 402, env **1021**; Newman pendiente
- [ ] **2.2.3** — **decisión P6:** prod 404 vs dev 500 cifrado; Newman pendiente
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

### 2_reglaNegocio/3_peticion
- [x] 2.3.1. peticion — cifrada con otra llave RSA (405)
- [x] 2.3.2. peticion — clave AES-128 en RSA (405)
- [x] 2.3.3. peticion — RSA material no hex (405)
- [x] 2.3.4. peticion — hex corrupto (405)
- [x] 2.3.5. peticion — cifrado truncado (405)
- [x] 2.3.6. peticion — tag GCM corrupto (405)
