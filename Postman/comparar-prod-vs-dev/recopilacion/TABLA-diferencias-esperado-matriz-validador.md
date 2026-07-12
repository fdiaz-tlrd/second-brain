# Comparación por escenario — esperado vs MATRIZ vs VALIDADOR (solo diferencias)

**Runs:**

- MATRIZ: `enriquecido-02-MATRIZ_por-escenario.json`
- VALIDADOR: `enriquecido-03-VALIDADOR_por-escenario.json`

**Leyenda:** `codigo×N` = ese `codigoError` en N ejecuciones (variantes de cifrado). `null` = respuesta sin `codigoError` (éxito de negocio). `(ausente)` = escenario no presente en ese run.

## Resumen de diferencias

| Métrica | Valor |
|---------|-------|
| Escenarios con alguna diferencia | **71** |
| Difiere **solo en MATRIZ** (validador ok) | 2 |
| Difiere **solo en VALIDADOR** (matriz ok) | 1 |
| Difiere en **ambos** | 68 |
| MATRIZ y VALIDADOR devuelven **distinto** entre sí | 8 |

## Tabla A — NEGOCIO (codigoError del payload), solo diferencias

| Ruta | Escenario | Esperado | MATRIZ recibido | VALIDADOR recibido | M vs V |
|------|-----------|----------|-----------------|--------------------|--------|
| `General/0_jsonEntrada` | 0.1. body — JSON HTTP inválido (400) | 400 | 550×3 | null×2 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.10. idCanal — espacio interno, post-trim (400) | 400 | 401×4 | 401×3 | = |
| `General/1_validaciones_js/1_idCanal` | 1.1.11. idCanal — símbolo @ no permitido (400) | 400 | 401×4 | 401×3 | = |
| `General/1_validaciones_js/1_idCanal` | 1.1.12. idCanal — paréntesis ( no permitido (400) | 400 | 401×4 | 401×3 | = |
| `General/1_validaciones_js/1_idCanal` | 1.1.13. idCanal — ¿ no permitido (400) | 400 | 401×4 | 401×3 | = |
| `General/1_validaciones_js/1_idCanal` | 1.1.14. idCanal — comillas " no permitidas (400) | 400 | 401×4 | 401×3 | = |
| `General/1_validaciones_js/1_idCanal` | 1.1.2. idCanal — null (400) | 400 | 550×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.3. idCanal — string vacío "" (400) | 400 | 550×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.4. idCanal — tipo number (400) | 400 | 550×4 | 401×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.5. idCanal — tipo boolean (400) | 400 | 550×4 | 401×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.6. idCanal — tipo object (400) | 400 | 550×4 | 401×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.7. idCanal — solo espacios, trim vacío (400) | 400 | 401×4 | 401×3 | = |
| `General/1_validaciones_js/1_idCanal` | 1.1.8. idCanal — solo tab, trim vacío (400) | 400 | 401×4 | 401×3 | = |
| `General/1_validaciones_js/1_idCanal` | 1.1.9. idCanal — longitud 5, máximo 4 (400) | 400 | 400×4 | 401×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.10. validador — espacio interno, post-trim (400) | 400 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/2_validador` | 1.2.11. validador — símbolo @ no permitido (400) | 400 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/2_validador` | 1.2.12. validador — paréntesis ( no permitido (400) | 400 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/2_validador` | 1.2.13. validador — ¿ no permitido (400) | 400 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/2_validador` | 1.2.14. validador — comillas " no permitidas (400) | 400 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/2_validador` | 1.2.4. validador — tipo number (400) | 400 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/2_validador` | 1.2.5. validador — tipo boolean (400) | 400 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/2_validador` | 1.2.6. validador — tipo object (400) | 400 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/2_validador` | 1.2.7. validador — solo espacios, trim vacío (400) | 400 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/2_validador` | 1.2.8. validador — solo tab, trim vacío (400) | 400 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/2_validador` | 1.2.9. validador — longitud 5, máximo 4 (400) | 400 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/3_peticion` | 1.3.10. peticion — segmento AES en base64 (400) | 400 | 405×4 | 405×3 | = |
| `General/1_validaciones_js/3_peticion` | 1.3.11. peticion — segmento AES faltante (400) | 400 | 405×4 | 405×3 | = |
| `General/1_validaciones_js/3_peticion` | 1.3.12. peticion — segmento extra (400) | 400 | 405×4 | 405×3 | = |
| `General/1_validaciones_js/3_peticion` | 1.3.13. peticion — caracter no hex (400) | 400 | 405×4 | 405×3 | = |
| `General/1_validaciones_js/3_peticion` | 1.3.4. peticion — tipo number (400) | 400 | 405×4 | 405×3 | = |
| `General/1_validaciones_js/3_peticion` | 1.3.5. peticion — tipo boolean (400) | 400 | 405×4 | 405×3 | = |
| `General/1_validaciones_js/3_peticion` | 1.3.6. peticion — tipo object (400) | 400 | 405×4 | 405×3 | = |
| `General/1_validaciones_js/3_peticion` | 1.3.7. peticion — formato hex inválido (400) | 400 | 405×4 | 405×3 | = |
| `General/1_validaciones_js/3_peticion` | 1.3.8. peticion — IV en base64 (400) | 400 | 405×4 | 405×3 | = |
| `General/1_validaciones_js/3_peticion` | 1.3.9. peticion — IV truncado (400) | 400 | 405×4 | 405×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.10. solicitudes — guion bajo (431) | 431 | 509×4 | 509×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.11. solicitudes — espacio interno (431) | 431 | 509×4 | 509×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.12. solicitudes — espacio al inicio (431) | 431 | 509×4 | 509×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.13. solicitudes — espacio al final (431) | 431 | 509×4 | 509×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.14. solicitudes — arroba (431) | 431 | 509×4 | 509×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.15. solicitudes — punto (431) | 431 | 509×4 | 509×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.16. solicitudes — unicode (431) | 431 | 509×4 | 509×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.17. solicitudes — barra (431) | 431 | 509×4 | 509×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.18. solicitudes — comillas (431) | 431 | 509×4 | 509×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.19. solicitudes — elemento null en arreglo (431) | 431 | 999×4 | 999×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.20. solicitudes — idSolicitud null (431) | 431 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.21. solicitudes — idSolicitud tipo boolean true (431) | 431 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.22. solicitudes — idSolicitud tipo boolean false (431) | 431 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.23. solicitudes — solo guiones (431) | 431 | 509×4 | 509×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.24. solicitudes — un solo guion (431) | 431 | 509×4 | 509×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.25. solicitudes — idSolicitud tipo object (431) | 431 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.26. solicitudes — idSolicitud tipo array (431) | 431 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.4. solicitudes — sin propiedad idSolicitud (431) | 431 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.5. solicitudes — idSolicitud vacío (431) | 431 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.6. solicitudes — idSolicitud tipo number (431) | 431 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.7. solicitudes — idSolicitud solo espacios (431) | 431 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.8. solicitudes — idSolicitud longitud 65 (431) | 431 | 404×4 | 404×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2] | 431 | 425×4 | 425×3 | = |
| `General/2_reglaNegocio/1_idCanal` | 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN] | 403 | 509×4 | 509×3 | = |
| `General/2_reglaNegocio/1_idCanal` | 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO] | 500 | 405×4 | 405×3 | = |
| `General/2_reglaNegocio/1_idCanal` | 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS] | 403 | 509×4 | 509×3 | = |
| `General/2_reglaNegocio/2_validador` | 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO] | 500 | 418×4 | 418×3 | = |
| `General/2_reglaNegocio/4_metodo` | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) | 418 | 509×4 | 509×3 | = |
| `General/2_reglaNegocio/4_metodo` | 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO] | 418 | 509×4 | 509×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.1. cuenta — propiedad ausente (413) | 413 | 999×4 | 999×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.18. cuenta — tipo array (413) | 413 | 509×4 | 509×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.2. cuenta — null (413) | 413 | 999×4 | 999×3 | = |
| `Metodo/0001/5_fallosIntegracionValidador/1022_fijo` | 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599) | 599 | null×4 | null×3 | = |
| `Metodo/0001/5_fallosIntegracionValidador/1022_fijo` | 0001.5.1022.3. validador PROXGATO auth fijo — respuesta sin campo cifrado (509) | 509 | 406×4 | 406×3 | = |
| `Metodo/0001/5_fallosIntegracionValidador/1023_token` | 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599) | 599 | null×4 | 509×3 | **≠** |
| `Metodo/0001/5_fallosIntegracionValidador/1023_token` | 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509) | 509 | 406×4 | 406×3 | = |

## Tabla B — HTTP (status de protocolo de la lambda), solo diferencias

HTTP real de la lambda vs `expectedHttpStatus` del plan. Recuerda: por MATRIZ la lambda suele aplanar todo a 200.

| Ruta | Escenario | HTTP esperado | MATRIZ HTTP real | VALIDADOR HTTP real | M vs V |
|------|-----------|---------------|------------------|---------------------|--------|
| `General/0_jsonEntrada` | 0.1. body — JSON HTTP inválido (400) | 400 | 200×3 | 502×2 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.1. idCanal — propiedad ausente (undefined) (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.10. idCanal — espacio interno, post-trim (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.11. idCanal — símbolo @ no permitido (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.12. idCanal — paréntesis ( no permitido (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.13. idCanal — ¿ no permitido (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.14. idCanal — comillas " no permitidas (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.2. idCanal — null (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.3. idCanal — string vacío "" (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.4. idCanal — tipo number (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.5. idCanal — tipo boolean (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.6. idCanal — tipo object (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.7. idCanal — solo espacios, trim vacío (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.8. idCanal — solo tab, trim vacío (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/1_idCanal` | 1.1.9. idCanal — longitud 5, máximo 4 (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.1. validador — propiedad ausente (undefined) (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.10. validador — espacio interno, post-trim (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.11. validador — símbolo @ no permitido (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.12. validador — paréntesis ( no permitido (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.13. validador — ¿ no permitido (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.14. validador — comillas " no permitidas (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.2. validador — null (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.3. validador — string vacío "" (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.4. validador — tipo number (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.5. validador — tipo boolean (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.6. validador — tipo object (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.7. validador — solo espacios, trim vacío (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.8. validador — solo tab, trim vacío (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/2_validador` | 1.2.9. validador — longitud 5, máximo 4 (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.1. peticion — propiedad ausente (undefined) (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.10. peticion — segmento AES en base64 (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.11. peticion — segmento AES faltante (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.12. peticion — segmento extra (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.13. peticion — caracter no hex (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.2. peticion — null (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.3. peticion — string vacío (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.4. peticion — tipo number (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.5. peticion — tipo boolean (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.6. peticion — tipo object (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.7. peticion — formato hex inválido (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.8. peticion — IV en base64 (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/3_peticion` | 1.3.9. peticion — IV truncado (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/4_idPeticion` | 1.4.1. idPeticion — propiedad ausente (undefined) (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/4_idPeticion` | 1.4.10. idPeticion — longitud 65, máximo 64 (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/4_idPeticion` | 1.4.2. idPeticion — null (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/4_idPeticion` | 1.4.3. idPeticion — string vacío (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/4_idPeticion` | 1.4.4. idPeticion — tipo number (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/4_idPeticion` | 1.4.5. idPeticion — tipo boolean (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/4_idPeticion` | 1.4.6. idPeticion — tipo object (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/4_idPeticion` | 1.4.7. idPeticion — solo espacios (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/4_idPeticion` | 1.4.8. idPeticion — solo tab (400) | 400 | 200×4 | 400×3 | **≠** |
| `General/1_validaciones_js/5_solicitudes` | 1.5.1. solicitudes — tipo string (425) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.10. solicitudes — guion bajo (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.11. solicitudes — espacio interno (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.12. solicitudes — espacio al inicio (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.13. solicitudes — espacio al final (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.14. solicitudes — arroba (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.15. solicitudes — punto (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.16. solicitudes — unicode (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.17. solicitudes — barra (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.18. solicitudes — comillas (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.19. solicitudes — elemento null en arreglo (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.2. solicitudes — arreglo vacío (425) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.20. solicitudes — idSolicitud null (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.21. solicitudes — idSolicitud tipo boolean true (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.22. solicitudes — idSolicitud tipo boolean false (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.23. solicitudes — solo guiones (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.24. solicitudes — un solo guion (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.25. solicitudes — idSolicitud tipo object (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.26. solicitudes — idSolicitud tipo array (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.4. solicitudes — sin propiedad idSolicitud (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.5. solicitudes — idSolicitud vacío (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.6. solicitudes — idSolicitud tipo number (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.7. solicitudes — idSolicitud solo espacios (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.8. solicitudes — idSolicitud longitud 65 (431) | 400 | 200×4 | 200×3 | = |
| `General/1_validaciones_js/5_solicitudes` | 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2] | 400 | 200×4 | 200×3 | = |
| `General/2_reglaNegocio/1_idCanal` | 2.1.1. idCanal — no existe en BD (401) | 400 | 200×4 | 400×3 | **≠** |
| `General/2_reglaNegocio/1_idCanal` | 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN] | 400 | 200×4 | 200×3 | = |
| `General/2_reglaNegocio/1_idCanal` | 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO] | 500 | 200×4 | 400×3 | **≠** |
| `General/2_reglaNegocio/1_idCanal` | 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS] | 400 | 200×4 | 200×3 | = |
| `General/2_reglaNegocio/2_validador` | 2.2.1. validador — no existe en BD (404) [CANAL_VALIDADOR_NO_EXISTE] | 400 | 200×4 | 400×3 | **≠** |
| `General/2_reglaNegocio/2_validador` | 2.2.2. validador — deshabilitado (402) [CANAL_VALIDADOR_DESHABILITADO] | 400 | 200×4 | 400×3 | **≠** |
| `General/2_reglaNegocio/2_validador` | 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO] | 500 | 200×4 | 200×3 | = |
| `General/2_reglaNegocio/3_peticion` | 2.3.1. peticion — cifrada con otra llave RSA (405) | 400 | 200×4 | 400×3 | **≠** |
| `General/2_reglaNegocio/3_peticion` | 2.3.2. peticion — clave AES-128 en RSA (405) | 400 | 200×4 | 400×3 | **≠** |
| `General/2_reglaNegocio/3_peticion` | 2.3.3. peticion — RSA material no hex (405) | 400 | 200×4 | 400×3 | **≠** |
| `General/2_reglaNegocio/3_peticion` | 2.3.4. peticion — hex corrupto (405) | 400 | 200×4 | 400×3 | **≠** |
| `General/2_reglaNegocio/3_peticion` | 2.3.5. peticion — cifrado truncado (405) | 400 | 200×4 | 400×3 | **≠** |
| `General/2_reglaNegocio/3_peticion` | 2.3.6. peticion — tag GCM corrupto (405) | 400 | 200×4 | 400×3 | **≠** |
| `General/2_reglaNegocio/4_metodo` | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) | 400 | 200×4 | 200×3 | = |
| `General/2_reglaNegocio/4_metodo` | 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO] | 400 | 200×4 | 200×3 | = |
