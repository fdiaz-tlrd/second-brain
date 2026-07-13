# Revisión escenario por escenario — CÓDIGO DE RESPUESTA (payload JSON) — VCN

> **Alcance:** SOLO el código dentro del JSON de respuesta (`codigoError` / `resultado`).
> **NO** es HTTP Code (eso es transporte, resuelto en HD-005). Un `400` en el JSON ≠ `HTTP 400`.

## Objetivo

Determinar, escenario por escenario, si el **esperado** de nuestro Newman/Postman está bien, o si
**producción está mal** (bug / falta validación). Fuente de verdad de "lo recibido": corrida
`prod / MATRIZ` `2026-07-13T03-16-37Z` sobre `prod_adactado_a_dev` (código de producción desplegado
en dev).

## Cómo se genera / regenera

```powershell
cd second-brain/Postman/comparar-prod-vs-dev/recopilacion
node listar-divergencias-negocio.js        # patrones esperado->recibido
node listar-divergencias-negocio.js --md   # tabla completa con body recibido
```

## Resumen

- Escenarios únicos VCN: **316**
- Con divergencia de código de respuesta: **70** — **revisión cerrada jul-2026**
- Caminos felices (`exito`): **600/600 OK** (no divergen)

**Veredictos en los 70:** predominio **PROD-MAL** (tests mantienen el esperado; fixes en dev). Excepciones: **1.2.9** TEST-MAL → corregido (HD-006); **1.5.9** N/A en ruta VCN/0001.

## Veredictos posibles

- **TEST-MAL** → corregir el esperado del escenario Newman (producción es aceptable).
- **PROD-MAL** → producción tiene bug/falta validación (el esperado del test es correcto); hallazgo.
- **PENDIENTE** → aún sin discutir.

---

## Bloque 0 — body / JSON de entrada

| Escenario | Esp | Recib | Body recibido | Veredicto |
|---|---|---|---|---|
| 0.1. body — JSON HTTP inválido | 400 | 550 | `{"codigoError":550,"descripcionError":"Error inesperado"}` | **PROD-MAL** (HP-001) |

## Bloque 1.1 — idCanal

| Escenario | Esp | Recib | Body recibido | Veredicto |
|---|---|---|---|---|
| 1.1.2. idCanal — null | 400 | 550 | `{"codigoError":550,"Error inesperado"}` | **PROD-MAL** (1.1-A) |
| 1.1.3. idCanal — string vacío "" | 400 | 550 | `{"codigoError":550,"Error inesperado"}` | **PROD-MAL** (1.1-A) |
| 1.1.4. idCanal — tipo number | 400 | 550 | `{"codigoError":550,"Error inesperado"}` | **PROD-MAL** (1.1-A) |
| 1.1.5. idCanal — tipo boolean | 400 | 550 | `{"codigoError":550,"Error inesperado"}` | **PROD-MAL** (1.1-A) |
| 1.1.6. idCanal — tipo object | 400 | 550 | `{"codigoError":550,"Error inesperado"}` | **PROD-MAL** (1.1-A) |
| 1.1.7. idCanal — solo espacios, trim vacío | 400 | 401 | `{"codigoError":401,"Canal emisor no existe"}` | **PROD-MAL** (1.1-B) |
| 1.1.8. idCanal — solo tab, trim vacío | 400 | 401 | `{"codigoError":401,"Canal emisor no existe"}` | **PROD-MAL** (1.1-B) |
| 1.1.10. idCanal — espacio interno, post-trim | 400 | 401 | `{"codigoError":401,"Canal emisor no existe"}` | **PROD-MAL** (1.1-B) |
| 1.1.11. idCanal — símbolo @ no permitido | 400 | 401 | `{"codigoError":401,"Canal emisor no existe"}` | **PROD-MAL** (1.1-B) |
| 1.1.12. idCanal — paréntesis ( no permitido | 400 | 401 | `{"codigoError":401,"Canal emisor no existe"}` | **PROD-MAL** (1.1-B) |
| 1.1.13. idCanal — ¿ no permitido | 400 | 401 | `{"codigoError":401,"Canal emisor no existe"}` | **PROD-MAL** (1.1-B) |
| 1.1.14. idCanal — comillas " no permitidas | 400 | 401 | `{"codigoError":401,"Canal emisor no existe"}` | **PROD-MAL** (1.1-B) |

## Bloque 1.2 — validador (todos 400 → 404 "Validador no existe")

| Escenario | Esp | Recib | Veredicto |
|---|---|---|---|
| 1.2.4. validador — tipo number | 400 | 404 | **PROD-MAL** (1.2-A, sin chequeo tipo) |
| 1.2.5. validador — tipo boolean | 400 | 404 | **PROD-MAL** (1.2-A) |
| 1.2.6. validador — tipo object | 400 | 404 | **PROD-MAL** (1.2-A) |
| 1.2.7. validador — solo espacios, trim vacío | 400 | 404 | **PROD-MAL** (1.2-B, formato) |
| 1.2.8. validador — solo tab, trim vacío | 400 | 404 | **PROD-MAL** (1.2-B) |
| 1.2.9. validador — longitud 5, máximo 4 | 400 | 404 | **TEST-MAL → CORREGIDO** (ahora "longitud 9, máximo 8"; 9 chars → 400, HD-006) |
| 1.2.10. validador — espacio interno, post-trim | 400 | 404 | **PROD-MAL** (1.2-B) |
| 1.2.11. validador — símbolo @ no permitido | 400 | 404 | **PROD-MAL** (1.2-B) |
| 1.2.12. validador — paréntesis ( no permitido | 400 | 404 | **PROD-MAL** (1.2-B) |
| 1.2.13. validador — ¿ no permitido | 400 | 404 | **PROD-MAL** (1.2-B) |
| 1.2.14. validador — comillas " no permitidas | 400 | 404 | **PROD-MAL** (1.2-B) |

## Bloque 1.3 — peticion (todos 400 → 405 "Error en descifrado canal emisor")

Estos son errores de **formato** del campo `peticion`; el esperado **400** es correcto. Prod devuelve
405 engañoso por **no validar el formato** del campo (HP-011). **PROD-MAL.**

| Escenario | Esp | Recib | Veredicto |
|---|---|---|---|
| 1.3.4. peticion — tipo number | 400 | 405 | **PROD-MAL** (HP-011) |
| 1.3.5. peticion — tipo boolean | 400 | 405 | **PROD-MAL** (HP-011) |
| 1.3.6. peticion — tipo object | 400 | 405 | **PROD-MAL** (HP-011) |
| 1.3.7. peticion — formato hex inválido | 400 | 405 | **PROD-MAL** (HP-011) |
| 1.3.8. peticion — IV en base64 | 400 | 405 | **PROD-MAL** (HP-011) |
| 1.3.9. peticion — IV truncado | 400 | 405 | **PROD-MAL** (HP-011) |
| 1.3.10. peticion — segmento AES en base64 | 400 | 405 | **PROD-MAL** (HP-011) |
| 1.3.11. peticion — segmento AES faltante | 400 | 405 | **PROD-MAL** (HP-011) |
| 1.3.12. peticion — segmento extra | 400 | 405 | **PROD-MAL** (HP-011) |
| 1.3.13. peticion — caracter no hex | 400 | 405 | **PROD-MAL** (HP-011) |

## Bloque 1.5 — solicitudes / idSolicitud

| Escenario | Esp | Recib | Body recibido | Veredicto |
|---|---|---|---|---|
| 1.5.4. sin propiedad idSolicitud | 431 | 404 | `Campo idSolicitud no cumple con los criterios` | **PROD-MAL** (HP-012) |
| 1.5.5. idSolicitud vacío | 431 | 404 | idem | **PROD-MAL** (HP-012) |
| 1.5.6. idSolicitud tipo number | 431 | 404 | idem | **PROD-MAL** (HP-012) |
| 1.5.7. idSolicitud solo espacios | 431 | 404 | idem | **PROD-MAL** (HP-012) |
| 1.5.8. idSolicitud longitud 65 | 431 | 404 | idem | **PROD-MAL** (HP-012) |
| 1.5.20. idSolicitud null | 431 | 404 | idem | **PROD-MAL** (HP-012) |
| 1.5.21. idSolicitud boolean true | 431 | 404 | idem | **PROD-MAL** (HP-012) |
| 1.5.22. idSolicitud boolean false | 431 | 404 | idem | **PROD-MAL** (HP-012) |
| 1.5.25. idSolicitud tipo object | 431 | 404 | idem | **PROD-MAL** (HP-012) |
| 1.5.26. idSolicitud tipo array | 431 | 404 | idem | **PROD-MAL** (HP-012) |
| 1.5.10. guion bajo | 431 | 509 | `Error inesperado en validador` | **PROD-MAL** (HP-013, charset) |
| 1.5.11. espacio interno | 431 | 509 | idem | **PROD-MAL** (HP-013, charset) |
| 1.5.12. espacio al inicio | 431 | 509 | idem | **PROD-MAL** (HP-013, charset) |
| 1.5.13. espacio al final | 431 | 509 | idem | **PROD-MAL** (HP-013, charset) |
| 1.5.14. arroba | 431 | 509 | idem | **PROD-MAL** (HP-013, charset) |
| 1.5.15. punto | 431 | 509 | idem | **PROD-MAL** (HP-013, charset) |
| 1.5.16. unicode | 431 | 509 | idem | **PROD-MAL** (HP-013, charset) |
| 1.5.17. barra | 431 | 509 | idem | **PROD-MAL** (HP-013, charset) |
| 1.5.18. comillas | 431 | 509 | idem | **PROD-MAL** (HP-013, charset) |
| 1.5.23. solo guiones | 431 | 509 | idem | **PROD-MAL** (HP-013, doc+val: id debe tener ≥1 alfanumérico) |
| 1.5.24. un solo guion | 431 | 509 | idem | **PROD-MAL** (HP-013, doc+val: id debe tener ≥1 alfanumérico) |
| 1.5.19. elemento null en arreglo | 431 | 999 | `Error en la solicitud` | **PROD-MAL** (HP-014, crash `null.hasOwnProperty`) |
| 1.5.9. idSolicitud duplicado case-insensitive `[CFG 0015≥2]` | 431 | 425 | `Cantidad de solicitudes no permitidas.` | **N/A ruta VCN/0001** (requiere ejec. directa, método ≥2) |

## Bloque 2 — reglaNegocio

| Escenario | Esp | Recib | Body recibido | Veredicto |
|---|---|---|---|---|
| 2.1.2. idCanal sin plan de suscripción | 403 | 509 | `Error inesperado en validador` | **PROD-MAL** (HP-015) |
| 2.1.4. idCanal sin plan sin grupos | 403 | 509 | `Error inesperado en validador` | **PROD-MAL** (HP-015) |
| 2.1.3. idCanal error interno getCanal | 500 | 405 | `Error en descifrado canal emisor` | **PROD-MAL** (HP-016) |
| 2.2.3. validador error interno getCanal | 500 | 418 | `Metodo no soportado por el validador` | **PROD-MAL** (HP-017) |
| 2.4.1. metodo no está en CFG_METODOS_LIMITES_JSON | 418 | 509 | `Error inesperado al llamar servicio interno` | **PROD-MAL** (HP-018) |
| 2.4.2. metodo no asociado al canal emisor | 418 | 509 | `Error inesperado en validador` | **PROD-MAL** (HP-019) |

## Bloque 0001 — método (cuenta / fallos integración validador)

| Escenario | Esp | Recib | Body recibido | Veredicto |
|---|---|---|---|---|
| 0001.1.1.1. cuenta — propiedad ausente | 413 | 999 | `Error en la solicitud` | **PROD-MAL** (HP-020) |
| 0001.1.1.2. cuenta — null | 413 | 999 | `Error en la solicitud` | **PROD-MAL** (HP-020) |
| 0001.1.1.18. cuenta — tipo array | 413 | 509 | `Error inesperado en validador` | **PROD-MAL** (HP-020) |
| 0001.5.1022.1. validador demora (auth fijo) | 599 | (vacío) | `{"message":"Internal server error"}` | **PROD-MAL** (HP-021) |
| 0001.5.1023.1. validador demora (auth token) | 599 | 509 | `Error inesperado en validador` | **PROD-MAL** (HP-021) |
| 0001.5.1022.3. validador sin campo cifrado (fijo) | 509 | 406 | `Error en descifrado canal validador` | **PROD-MAL** (HP-022) |
| 0001.5.1023.3. validador sin campo cifrado (token) | 509 | 406 | `Error en descifrado canal validador` | **PROD-MAL** (HP-022) |

---

## Bitácora de decisiones

### Bloque 1.1 — `idCanal` (acordado jul-2026)

| Sub-bloque | Escenarios | Veredicto | Test Newman | Dev |
|------------|------------|-----------|-------------|-----|
| **1.1-A** | 1.1.2–1.1.6 (null, `""`, number, boolean, object) | **PROD-MAL** | Mantener **400** | Corregir (HP-001, HP-002, HP-005) |
| **1.1-B** | 1.1.7, 1.1.8, 1.1.10–1.1.14 (formato inválido) | **PROD-MAL** | Mantener **400** | Validación preventiva antes de BD (HP-009) |

**Criterio acordado:** no alinear tests a lo que hace prod hoy. Corrida contra `prod_adactado_a_dev` seguirá divergiendo; corrida contra dev corregido debe pasar. Ambos son mejoras importantes documentadas en hallazgos de producción.

**Hallazgos:** [HP-001/002](../../hallazgos-produccion/01-matriz-idCanal-null-vacio-responde-550.md), [HP-005](../../hallazgos-produccion/04-matriz-isValid-sin-chequeo-tipo.md), [HP-009](../../hallazgos-produccion/08-matriz-idCanal-formato-invalido-responde-401.md).

### Bloque 1.2 — `validador` (acordado jul-2026)

Producción **correcta** en longitud: `idCanal` máx 4, `validador` máx **8** (intencional: `validador` = `idCanalValidador`, acepta SWIFT de 8 chars).

| Sub-bloque | Escenarios | Veredicto | Test |
|------------|------------|-----------|------|
| **1.2-A** | 1.2.4–1.2.6 (tipos number/boolean/object) | **PROD-MAL** | Mantener **400** (HP-005) |
| **1.2-B** | 1.2.7, 1.2.8, 1.2.10–1.2.14 (formato inválido) | **PROD-MAL** | Mantener **400** (paralelo HP-009) |
| **1.2-C** | 1.2.9 (longitud) | **TEST-MAL → CORREGIDO** | Ya ajustado a **máx 8** (9 chars → 400), HD-006 |

**OK (no divergen):** 1.2.1 ausente, 1.2.2 null, 1.2.3 vacío → todos 400 (a diferencia de `idCanal`, aquí no hay crash a 550 porque `validador` no se indexa en trace).

**Cambios aplicados (2026-07-13):**

- **1.2.9 corregido** en la fuente P2M (`2.9_validador_longitud_9.json`) y propagado a VCN + P2P (regla de longitud es transversal de matriz). Colecciones re-ensambladas y validadas.
- **8 caminos felices por SWIFT** agregados (solo VCN, `Metodo/0001/3_respuestaExitosa/<val>/1.2_cuenta_feliz_swift.json`) para 1008/1009/1011/1012/1013/1014/1015/1016 → ejercitan el lookup por `alias` (SWIFT 8 chars en `validador`). Ver HD-006.
- **api_4.json:** intento previo de fijar `idCanal` a "exactamente 4" **revertido** — era falso (código valida **1 a 4**, no exactamente 4). No se toca `api_4.json`; queda como hallazgo abierto de doc Marketplace, **no resuelto en nuestra versión** (HP-010).

**Hallazgos:** [HP-005](../../hallazgos-produccion/04-matriz-isValid-sin-chequeo-tipo.md), [HP-010](../../hallazgos-produccion/09-marketplace-api4-longitud-idcanal-validador.md), [HD-006](../../hallazgos-desarrollo/05-escenario-validador-longitud-max8.md).

### Bloque 1.3 — `peticion` (acordado jul-2026)

**Criterio clave:** el veredicto se define por lo que recibe el **cliente end-to-end**, no por lo que
hace matriz como tramo interno. Se distingue **formato del campo** vs **contenido indescifrable**:

| Sub-bloque | Escenarios | Qué envían | Veredicto | Esperado correcto |
|------------|-----------|------------|-----------|-------------------|
| **1.3** (formato) | 1.3.4–1.3.13 | `peticion` mal formado (tipo, hex, IV, segmento AES) | **PROD-MAL** | **400** "Error en la petición original" |
| **2.3** (indescifrable) | 2.3.1–2.3.6 | `peticion` bien formado pero **no se puede descifrar** (otra llave, tag GCM corrupto…) | **OK** (ya esperan 405) | **405** "Error en descifrado canal emisor" |

**Por qué PROD-MAL en 1.3:** prod no valida el formato de `peticion` y lo reenvía; el fallo aparece como
405 "descifrado", que manda al integrador a revisar **llaves/cifrado** en vez de su **petición**. Lo
correcto es 400 (error de formato del campo). Fix en dev: validar formato de `peticion` en matriz y
devolver 400 antes de reenviar. El test **no** cambia (sigue esperando 400).

**Diseño de códigos (3 causas separadas):** 400 = formato del campo malo · 405 = bien formado pero
indescifrable · 501 = fallo al cifrar (lado plataforma). Ver `second-brain/codigosRespuesta/nueva-tabla-codigo-respuesta.md`.

**No divergen:** 1.3.1/1.3.2/1.3.3 (peticion ausente/null/vacío) — su esperado ya coincide.

**Hallazgo:** [HP-011](../../hallazgos-produccion/10-matriz-peticion-sin-validacion-formato.md).

### Bloque 1.5 — `solicitudes` / `idSolicitud` (en progreso jul-2026)

Tres sub-bloques según lo que recibe el cliente:

| Sub-bloque | Escenarios | Recib | Veredicto | Esperado correcto |
|------------|-----------|-------|-----------|-------------------|
| **1.5-A** (idSolicitud inválido) | 1.5.4–1.5.8, 1.5.20–1.5.22, 1.5.25, 1.5.26 | **404** | **PROD-MAL** | **431** (HP-012) |
| **1.5-B** (charset / símbolos / espacios) | 1.5.10–1.5.18, 1.5.23, 1.5.24 | **509** | **PROD-MAL** | **431** (HP-013) |
| **1.5-C** (arreglo / duplicado) | 1.5.19 (elemento null → 999) | 999 | **PROD-MAL** (HP-014) | **431** |
| **1.5-C** (arreglo / duplicado) | 1.5.9 (duplicado → 425) `[CFG 0015≥2]` | 425 | **N/A en ruta VCN/0001** | 425 legítimo aquí; 431 solo directo/método ≥2 |

**1.5-A — PROD-MAL (resuelto):** la validación de `idSolicitud` responde **404**, código que la doc del
Marketplace (`produccion_real/telered_content_mktpl/tech_doc/api_4.json`) tiene asignado a "Validador no
existe". No se puede usar 404 para dos temas → por eso se introdujo **431**. Test mantiene 431. Fix en
dev: devolver 431 en `validarParametroSolicitudes`. Ver [HP-012](../../hallazgos-produccion/11-validador-idSolicitud-usa-404-en-vez-de-431.md).

**1.5-B — PROD-MAL (resuelto):** prod **no valida el charset** de `idSolicitud` (que el Marketplace sí
documenta: alfanumérico + guiones, 1–64). Los valores con símbolos/espacios pasan la validación y
revientan downstream como **509** "Error inesperado en validador" (enmascara input malo del cliente).
Debe ser **431**. Los casos de solo-guiones (1.5.23 `---`, 1.5.24 `-`) cumplen el charset actual pero no
tienen sentido como *id*: doble gap (doc + validación) que se corrige exigiendo ≥1 alfanumérico. Test
mantiene 431; fix en dev. Ver [HP-013](../../hallazgos-produccion/12-validador-idSolicitud-sin-validacion-charset.md).

**1.5-C — resuelto:**

- **1.5.19 (elemento `null` en el arreglo) → PROD-MAL.** El `null` crashea `validarParametroSolicitudes`
  (`null.hasOwnProperty`), la excepción cae al `catch` global de `app.js` y devuelve **999** "Error en la
  solicitud" en vez de rechazar limpio con **431**. Es un crash por input del cliente (patrón repetido, cf.
  HP-007). El test mantiene **431**; fix en dev (validar que cada elemento sea objeto no nulo). Ver
  [HP-014](../../hallazgos-produccion/13-validador-solicitud-null-crashea-999.md).

- **1.5.9 (duplicado case-insensitive) → N/A en la ruta VCN/0001, NO es divergencia.** El chequeo de
  duplicados (línea 76 del validador, que daría 431) es **inalcanzable** en método **0001**: como 0001
  permite **1 sola solicitud**, mandar 2 (necesario para tener un duplicado) dispara primero el chequeo de
  cantidad → **425** "Cantidad de solicitudes no permitidas", que aquí es **comportamiento correcto** (ni
  PROD-MAL ni TEST-MAL). El escenario **se deja tal cual**, marcado `[CFG 0015≥2]`: el assert de duplicado
  (431) solo se verifica **ejecutando directo** contra un método que permita **≥2** solicitudes (0015). No
  se cambia el esperado ni se elimina.

**No divergen:** 1.5.1–1.5.3 (tipo string / arreglo vacío / excede límite) — su esperado ya coincide (1.5.3 → 425).

### Bloque 2.1 — `idCanal` regla de negocio (en progreso jul-2026)

| Sub-bloque | Escenarios | Recib | Veredicto | Esperado correcto |
|------------|-----------|-------|-----------|-------------------|
| **2.1-A** (sin plan suscripción) | 2.1.2, 2.1.4 | **509** | **PROD-MAL** | **403** (HP-015) |
| **2.1-B** (error interno getCanal) | 2.1.3 | **405** | **PROD-MAL** | **500** (HP-016) |

**2.1-A — PROD-MAL (resuelto):** VCN invoca `validatePlan` pero no valida `subscription === false`; la
petición continúa y revienta downstream como **509** "Error inesperado en validador", enmascarando que el
canal emisor no tiene plan. Debe ser **403** "Canal emisor no tiene un plan de suscripción" (código nuevo,
`nueva-tabla-codigo-respuesta.md`). Test mantiene 403; fix en dev. Ver
[HP-015](../../hallazgos-produccion/14-vcn-sin-plan-suscripcion-enmascara-509.md).

**2.1-B — PROD-MAL (resuelto):** canal emisor existe en BD pero mal configurado (1017, sin llaves
válidas). `descifrar` falla y prod responde **405** "Error en descifrado canal emisor", igual que si el
cliente hubiera cifrado mal. Es error de **configuración de plataforma** → debe ser **500** "Error
interno". Test mantiene 500; fix en dev (validar config del canal antes de descifrar). Ver
[HP-016](../../hallazgos-produccion/15-vcn-canal-mal-configurado-responde-405.md).

### Bloque 2.2 — `validador` regla de negocio (jul-2026)

| Sub-bloque | Escenarios | Recib | Veredicto | Esperado correcto |
|------------|-----------|-------|-----------|-------------------|
| **2.2** (validador mal configurado) | 2.2.3 | **418** | **PROD-MAL** | **500** (HP-017) |

**2.2 — PROD-MAL (resuelto):** canal validador existe pero mal configurado (1017, sin operaciones en
`tld-validador-canal-operacion`). `metodoDisponible` devuelve false y prod responde **418** "Método no
soportado", como si fuera rechazo de negocio. Es error de **configuración de plataforma** → **500**.
Test mantiene 500. Fix en dev: distinguir config incompleta (500) de método no permitido en canal bien
configurado (418). **Criterio operativo:** registrar métodos soportados **por cada canal**, también
cuando actúa solo como Canal Validador — granularidad en `tld-validador-canal-operacion`. Ver
[HP-017](../../hallazgos-produccion/16-validador-mal-configurado-responde-418.md).

### Bloque 2.4 — `metodo` regla de negocio (jul-2026)

| Sub-bloque | Escenarios | Recib | Veredicto | Esperado correcto |
|------------|-----------|-------|-----------|-------------------|
| **2.4-A** (método fuera de CFG global) | 2.4.1 | **509** | **PROD-MAL** | **418** (HP-018) |
| **2.4-B** (método no asociado al emisor) | 2.4.2 | **509** | **PROD-MAL** | **418** (HP-019) |

**2.4-A — PROD-MAL (resuelto):** método no existe en `CFG_METODOS_LIMITES_JSON`; prod no valida y
revienta en **509**. Debe ser **418**. Test mantiene 418.

**2.4-B — PROD-MAL (resuelto):** canal emisor (1018) sin el método en `tld-validador-canal-operacion`;
prod no valida `metodoDisponible` sobre el emisor y revienta en **509**. Debe ser **418**. Test
mantiene 418. Regla operativa: al configurar el canal emisor, cargar solo los métodos permitidos (ver
HP-018 §Regla operativa). Ver [HP-019](../../hallazgos-produccion/18-metodo-no-asociado-emisor-enmascara-509.md).

**Regla operativa (obligatoria en nuestra versión):** al configurar un canal hay que registrar en
`tld-validador-canal-operacion` **solo** los métodos permitidos para ese canal (emisor y validador).
Las mejoras en dev **hacen cumplir** esta regla. Ver [HP-018](../../hallazgos-produccion/17-metodo-fuera-cfg-enmascara-509.md) §Regla operativa.

### Bloque 0001 — `cuenta` / integración validador (jul-2026)

| Sub-bloque | Escenarios | Recib | Veredicto | Esperado correcto |
|------------|-----------|-------|-----------|-------------------|
| **0001-A** (`cuenta` ausente / null / tipo inválido) | 0001.1.1.1, 0001.1.1.2, 0001.1.1.18 | **999** / **509** | **PROD-MAL** | **413** (HP-020) |
| **0001-C** (demora validador) | 0001.5.1022.1, 0001.5.1023.1 | **509** / Internal error | **PROD-MAL** | **599** (HP-021) |
| **0001-C** (sin campo cifrado) | 0001.5.1022.3, 0001.5.1023.3 | **406** | **PROD-MAL** | **509** (HP-022) |

**0001-A — PROD-MAL (resuelto):** en método **0001**, `cuenta` es el **único parámetro de negocio**
y el más importante. Prod no valida presencia/tipo antes de `validaFormatCta`:

- **0001.1.1.1** (`parametros: {}`) y **0001.1.1.2** (`cuenta: null`) → crash → **999**.
- **0001.1.1.18** (`cuenta` array) → pasa validación superficial → **509** downstream.

En todos los casos debe ser **413** explícito en el parámetro **`cuenta`**. Tests mantienen 413; fix
en dev. Ver [HP-020](../../hallazgos-produccion/19-vcn-cuenta-ausente-crashea-999.md).

**0001-C demora — PROD-MAL (resuelto):** dummy demora **16 s**; VCN espera HTTP **10 s** en lambda de
**11 s** (timeouts desalineados). Prod no mapea timeout a **599**: devuelve **509** o
`Internal server error`. Tests **1022.1** y **1023.1** mantienen **599**; fix en dev (alinear timeouts +
mapear axios timeout → 599). Ver [HP-021](../../hallazgos-produccion/20-timeouts-desalineados-demora-no-599.md).

**Nota:** **0001.5.1022.2** (cifrado invertido → **406**) **OK** en prod — no diverge.

**0001-C sin campo cifrado — PROD-MAL (resuelto):** validador responde sin campo `respuesta` cifrado;
prod intenta descifrar y devuelve **406** en vez de **509** (respuesta inesperada del validador). Tests
**1022.3** y **1023.3** mantienen **509**; fix en dev (validar estructura antes de descifrar). Ver
[HP-022](../../hallazgos-produccion/21-validador-respuesta-sin-campo-cifrado-406.md).

### Bloque 0 — JSON de entrada (jul-2026)

| Escenario | Veredicto |
|-----------|-----------|
| **0.1** JSON HTTP inválido | **PROD-MAL** (HP-001) — mismo criterio que 1.1-A; matriz `JSON.parse` → 550 |

---

## Revisión cerrada (jul-2026)

Los **70** escenarios con divergencia de `codigoError` tienen veredicto. **Ningún test Newman se
alinea a prod defectuoso** salvo el fix ya aplicado **1.2.9** (TEST-MAL → corregido, HD-006). Todos
los **PROD-MAL** quedan en `hallazgos-produccion/` HP-001–HP-022 (este bloque de revisión añadió
HP-011–HP-022). Fixes en dev; corrida contra `prod_adactado_a_dev` seguirá divergiendo hasta
desplegar correcciones.
