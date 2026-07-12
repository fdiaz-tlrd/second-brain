# Comparación por escenario — esperado vs MATRIZ vs VALIDADOR (solo diferencias)

**Runs:**

- MATRIZ: `2026-07-12T21-08-09Z_prod_MATRIZ_completo_por-escenario.json`
- VALIDADOR: `2026-07-12T21-46-59Z_prod_VALIDADOR_completo_por-escenario.json`

**Leyenda:** `codigo×N` = ese `codigoError` en N ejecuciones (variantes de cifrado). `null` = respuesta sin `codigoError` (éxito de negocio). `(ausente)` = escenario no presente en ese run.

## Resumen de diferencias

| Métrica | Valor |
|---------|-------|
| Escenarios con alguna diferencia | **136** |
| Difiere **solo en MATRIZ** (validador ok) | 2 |
| Difiere **solo en VALIDADOR** (matriz ok) | 1 |
| Difiere en **ambos** | 133 |
| MATRIZ y VALIDADOR devuelven **distinto** entre sí | 8 |

## Tabla (solo diferencias)

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
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.10. cuenta — longitud 35 (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.11. cuenta — solo tab (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.12. cuenta — símbolo @ (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.13. cuenta — paréntesis ( (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.14. cuenta — unicode ¿ (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.15. cuenta — comillas " (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.16. cuenta — guión (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.17. cuenta — decimal (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.18. cuenta — tipo array (413) | 413 | 509×4 | 509×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.19. cuenta — espacio al inicio (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.2. cuenta — null (413) | 413 | 999×4 | 999×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.20. cuenta — espacio al final (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.3. cuenta — string vacío (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.4. cuenta — tipo number (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.5. cuenta — tipo boolean (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.6. cuenta — tipo object (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.7. cuenta — con letras (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.8. cuenta — solo espacios (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/1_validaciones_js/1_cuenta` | 0001.1.1.9. cuenta — espacio interno (413) | 413 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1008` | 0001.2.1008.510. validador CELEGATO — Número de cuenta incorrecta (510) | 510 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1008` | 0001.2.1008.511. validador CELEGATO — Número de cuenta cerrado (511) | 511 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1008` | 0001.2.1008.512. validador CELEGATO — Número de cuenta bloqueado (512) | 512 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1008` | 0001.2.1008.513. validador CELEGATO — Transacción no permitida (513) | 513 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1008` | 0001.2.1008.514. validador CELEGATO — Falta información obligatoria de consulta (514) | 514 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1008` | 0001.2.1008.515. validador CELEGATO — Razón regulatoria (515) | 515 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1009` | 0001.2.1009.510. validador ASTRGATO — Número de cuenta incorrecta (510) | 510 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1009` | 0001.2.1009.511. validador ASTRGATO — Número de cuenta cerrado (511) | 511 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1009` | 0001.2.1009.512. validador ASTRGATO — Número de cuenta bloqueado (512) | 512 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1009` | 0001.2.1009.513. validador ASTRGATO — Transacción no permitida (513) | 513 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1009` | 0001.2.1009.514. validador ASTRGATO — Falta información obligatoria de consulta (514) | 514 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1009` | 0001.2.1009.515. validador ASTRGATO — Razón regulatoria (515) | 515 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1011` | 0001.2.1011.510. validador MIRAGATO — Número de cuenta incorrecta (510) | 510 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1011` | 0001.2.1011.511. validador MIRAGATO — Número de cuenta cerrado (511) | 511 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1011` | 0001.2.1011.512. validador MIRAGATO — Número de cuenta bloqueado (512) | 512 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1011` | 0001.2.1011.513. validador MIRAGATO — Transacción no permitida (513) | 513 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1011` | 0001.2.1011.514. validador MIRAGATO — Falta información obligatoria de consulta (514) | 514 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1011` | 0001.2.1011.515. validador MIRAGATO — Razón regulatoria (515) | 515 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1012` | 0001.2.1012.510. validador TERAGATO — Número de cuenta incorrecta (510) | 510 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1012` | 0001.2.1012.511. validador TERAGATO — Número de cuenta cerrado (511) | 511 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1012` | 0001.2.1012.512. validador TERAGATO — Número de cuenta bloqueado (512) | 512 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1012` | 0001.2.1012.513. validador TERAGATO — Transacción no permitida (513) | 513 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1012` | 0001.2.1012.514. validador TERAGATO — Falta información obligatoria de consulta (514) | 514 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1012` | 0001.2.1012.515. validador TERAGATO — Razón regulatoria (515) | 515 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1013` | 0001.2.1013.510. validador AMIYGATO — Número de cuenta incorrecta (510) | 510 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1013` | 0001.2.1013.511. validador AMIYGATO — Número de cuenta cerrado (511) | 511 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1013` | 0001.2.1013.512. validador AMIYGATO — Número de cuenta bloqueado (512) | 512 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1013` | 0001.2.1013.513. validador AMIYGATO — Transacción no permitida (513) | 513 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1013` | 0001.2.1013.514. validador AMIYGATO — Falta información obligatoria de consulta (514) | 514 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1013` | 0001.2.1013.515. validador AMIYGATO — Razón regulatoria (515) | 515 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1014` | 0001.2.1014.510. validador CORNGATO — Número de cuenta incorrecta (510) | 510 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1014` | 0001.2.1014.511. validador CORNGATO — Número de cuenta cerrado (511) | 511 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1014` | 0001.2.1014.512. validador CORNGATO — Número de cuenta bloqueado (512) | 512 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1014` | 0001.2.1014.513. validador CORNGATO — Transacción no permitida (513) | 513 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1014` | 0001.2.1014.514. validador CORNGATO — Falta información obligatoria de consulta (514) | 514 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1014` | 0001.2.1014.515. validador CORNGATO — Razón regulatoria (515) | 515 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1015` | 0001.2.1015.510. validador ZONAGATO — Número de cuenta incorrecta (510) | 510 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1015` | 0001.2.1015.511. validador ZONAGATO — Número de cuenta cerrado (511) | 511 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1015` | 0001.2.1015.512. validador ZONAGATO — Número de cuenta bloqueado (512) | 512 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1015` | 0001.2.1015.513. validador ZONAGATO — Transacción no permitida (513) | 513 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1015` | 0001.2.1015.514. validador ZONAGATO — Falta información obligatoria de consulta (514) | 514 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1015` | 0001.2.1015.515. validador ZONAGATO — Razón regulatoria (515) | 515 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1016` | 0001.2.1016.510. validador BELLGATO — Número de cuenta incorrecta (510) | 510 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1016` | 0001.2.1016.511. validador BELLGATO — Número de cuenta cerrado (511) | 511 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1016` | 0001.2.1016.512. validador BELLGATO — Número de cuenta bloqueado (512) | 512 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1016` | 0001.2.1016.513. validador BELLGATO — Transacción no permitida (513) | 513 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1016` | 0001.2.1016.514. validador BELLGATO — Falta información obligatoria de consulta (514) | 514 | null×4 | null×3 | = |
| `Metodo/0001/2_respuestaCanalValidador/1016` | 0001.2.1016.515. validador BELLGATO — Razón regulatoria (515) | 515 | null×4 | null×3 | = |
| `Metodo/0001/5_fallosIntegracionValidador/1022_fijo` | 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599) | 599 | null×4 | null×3 | = |
| `Metodo/0001/5_fallosIntegracionValidador/1022_fijo` | 0001.5.1022.3. validador PROXGATO auth fijo — respuesta sin campo cifrado (509) | 509 | 406×4 | 406×3 | = |
| `Metodo/0001/5_fallosIntegracionValidador/1023_token` | 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599) | 599 | null×4 | 509×3 | **≠** |
| `Metodo/0001/5_fallosIntegracionValidador/1023_token` | 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509) | 509 | 406×4 | 406×3 | = |
