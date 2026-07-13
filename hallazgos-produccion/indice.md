# Índice de hallazgos — producción

Actualizar cada vez que se agregue o cierre un hallazgo en esta carpeta.

**Leyenda estado:** `confirmado` = evidencia runtime o código; `identificado` = detectado en análisis, falta evidencia; `corregido-en-dev` = fix en rama dev o `prod_adactado_a_dev` (no prod real).

| ID | Título | Severidad | Componente | Estado | Doc |
|----|--------|-----------|------------|--------|-----|
| HP-001 | `idCanal` null / `""` → 550 en vez de 400 (matriz) | alta | `tld-matriz` / `tld-validador-validar` | confirmado | [01-matriz-idCanal-null-vacio-responde-550.md](01-matriz-idCanal-null-vacio-responde-550.md) |
| HP-002 | Función `error()` no definida — convierte fallo de trace en 550 | alta | `tld-matriz` / `tld-validador-validar` | confirmado | [01-matriz-idCanal-null-vacio-responde-550.md](01-matriz-idCanal-null-vacio-responde-550.md) §Causa |
| HP-003 | Matriz siempre HTTP 200; error solo en body (`codigoError`) | informativo | `tld-matriz` / `tld-validador-validar` | confirmado | [02-matriz-http-200-siempre.md](02-matriz-http-200-siempre.md) |
| HP-004 | `550` enmascara errores distintos del validador | media | `tld-matriz` / `tld-validador-validar` | confirmado | [03-matriz-550-enmascara-errores-validador.md](03-matriz-550-enmascara-errores-validador.md) |
| HP-005 | `isValid` no valida tipo de `idCanal` (number/boolean/object pasan) | media | `tld-matriz` / `tld-validador-validar` | confirmado (código + Newman) | [04-matriz-isValid-sin-chequeo-tipo.md](04-matriz-isValid-sin-chequeo-tipo.md) |
| HP-006 | `validatePlan()` / `respEventBus` indefinidos — mina si se activa `subscriptionValue` | media | `tld-matriz` / `tld-validador-validar` | confirmado (código) | [05-matriz-validatePlan-codigo-muerto.md](05-matriz-validatePlan-codigo-muerto.md) |
| HP-007 | Riesgo crash por `X-Forwarded-For` ausente (línea 22) | media | `tld-matriz` / `tld-validador-validar` | confirmado (código) | [06-matriz-x-forwarded-for-riesgo-crash.md](06-matriz-x-forwarded-for-riesgo-crash.md) |
| HP-008 | Marketplace `api_4.json` documenta HTTP 400; prod matriz siempre HTTP 200 | alta | `telered_content_mktpl` / `api_4.json` | confirmado | [07-marketplace-api4-http-documentado-vs-real.md](07-marketplace-api4-http-documentado-vs-real.md) |
| HP-009 | `idCanal` formato inválido → 401 "no existe" en vez de 400 (sin validación preventiva) | media-alta | `tld-matriz` / `tld-validador-validar` | confirmado | [08-matriz-idCanal-formato-invalido-responde-401.md](08-matriz-idCanal-formato-invalido-responde-401.md) |
| HP-010 | Marketplace `api_4.json` no declara longitud; código valida `idCanal` 1–4 y `validador` 1–8 | media | `telered_content_mktpl` / `api_4.json` | confirmado — **no se resuelve en nuestra versión** | [09-marketplace-api4-longitud-idcanal-validador.md](09-marketplace-api4-longitud-idcanal-validador.md) |
| HP-011 | Campo `peticion` sin validación de formato → cliente recibe 405 "descifrado" en vez de 400 | media-alta | `tld-matriz` / `tld-validador-validar` | confirmado (código + Newman) | [10-matriz-peticion-sin-validacion-formato.md](10-matriz-peticion-sin-validacion-formato.md) |
| HP-012 | Validación de `idSolicitud` responde 404 (reusado, colisiona con "Validador no existe") en vez de 431 | media-alta | `tld-validador-api` / `validar` | **corregido-en-dev** (validador.js; verificado 24/24) | [11-validador-idSolicitud-usa-404-en-vez-de-431.md](11-validador-idSolicitud-usa-404-en-vez-de-431.md) |
| HP-013 | `idSolicitud` sin validación de charset → pasa y revienta en 509 (debe ser 431); incl. solo-guiones | media-alta | `tld-validador-api` / `validar` | **corregido-en-dev** (validador.js; verificado 24/24) | [12-validador-idSolicitud-sin-validacion-charset.md](12-validador-idSolicitud-sin-validacion-charset.md) |
| HP-014 | Elemento `null` en `solicitudes[]` crashea la validación → 999 (debe ser 431) | alta | `tld-validador-api` / `validar` | **corregido-en-dev** (validador.js; verificado 24/24) | [13-validador-solicitud-null-crashea-999.md](13-validador-solicitud-null-crashea-999.md) |
| HP-015 | Canal emisor sin plan de suscripción no se rechaza (VCN → 509; P2P alias → 419; debe ser 403) | media-alta | `tld-api-cuenta-nombre`, `tld-api-alias` | confirmado — se corrige en dev | [14-vcn-sin-plan-suscripcion-enmascara-509.md](14-vcn-sin-plan-suscripcion-enmascara-509.md) |
| HP-016 | Canal emisor mal configurado en BD → 405 descifrado (debe ser 500) | media-alta | `tld-validador-api` / `validar` | **corregido-en-dev** (ya por refactor invoke: `getCanal` lanza → 500) | [15-vcn-canal-mal-configurado-responde-405.md](15-vcn-canal-mal-configurado-responde-405.md) |
| HP-017 | Canal validador mal configurado → 418 método (debe ser 500); granularidad operaciones por canal | media-alta | `tld-api-cuenta-nombre` / `cuenta-nombre` | confirmado — se corrige en dev | [16-validador-mal-configurado-responde-418.md](16-validador-mal-configurado-responde-418.md) |
| HP-018 | Método fuera de `CFG_METODOS_LIMITES_JSON` → 509 (debe ser 418); regla operativa métodos por canal | media-alta | `tld-validador-api` / `validar` | **corregido-en-dev** (ya por refactor invoke: `resolverServicioInterno` → 418) | [17-metodo-fuera-cfg-enmascara-509.md](17-metodo-fuera-cfg-enmascara-509.md) |
| HP-019 | Método no asociado al canal emisor → 509 (debe ser 418) | media-alta | `tld-api-cuenta-nombre` / `cuenta-nombre` | confirmado — se corrige en dev | [18-metodo-no-asociado-emisor-enmascara-509.md](18-metodo-no-asociado-emisor-enmascara-509.md) |
| HP-020 | Parámetro `cuenta` inválido en 0001 → 999/509 (debe ser 413) | alta | `tld-api-cuenta-nombre` / `cuenta-nombre` | confirmado — se corrige en dev | [19-vcn-cuenta-ausente-crashea-999.md](19-vcn-cuenta-ausente-crashea-999.md) |
| HP-021 | Timeouts desalineados: demora validador → 509/Internal error (debe ser 599) | **crítica** | `tld-api-cuenta-nombre` + cadena | confirmado — se corrige en dev | [20-timeouts-desalineados-demora-no-599.md](20-timeouts-desalineados-demora-no-599.md) |
| HP-022 | Respuesta validador sin campo cifrado → 406 (debe ser 509) | media-alta | `tld-api-cuenta-nombre` / `cuenta-nombre` | confirmado — se corrige en dev | [21-validador-respuesta-sin-campo-cifrado-406.md](21-validador-respuesta-sin-campo-cifrado-406.md) |
| HP-023 | P2P alias: `idSolicitud` charset → 419 en vez de 431 | media-alta | `tld-api-alias` / `alias` | confirmado — se corrige en dev | [23-p2p-alias-idsolicitud-charset-responde-419.md](23-p2p-alias-idsolicitud-charset-responde-419.md) |
| HP-024 | P2P alias 0002: identificador inválido ejecuta negocio (409 → 0) | alta | `tld-api-alias` / `validaciones.js` | confirmado — se corrige en dev | [24-p2p-alias-identificador-invalido-ejecuta-negocio.md](24-p2p-alias-identificador-invalido-ejecuta-negocio.md) |
| HP-025 | P2P alias: campo requerido ausente → código catálogo en vez de 419 | media | `tld-api-alias` / validaciones método | confirmado — se corrige en dev | [25-p2p-alias-campo-requerido-ausente-codigo-catalogo.md](25-p2p-alias-campo-requerido-ausente-codigo-catalogo.md) |
| HP-026 | P2P: método no asociado emisor → 419 en vez de 418 | media-alta | `tld-api-alias` / regla negocio | confirmado — se corrige en dev | [26-p2p-metodo-no-asociado-emisor-responde-419.md](26-p2p-metodo-no-asociado-emisor-responde-419.md) |
| HP-027 | `idPeticion`: doc no declara prefijo SWIFT (prod sí valida → 400; dev da 445) | media | `tech_doc/api_4.json`, `api_6.json` + `tld-api-alias` | confirmado — doc a homologar; 445 en dev | [27-idpeticion-doc-incompleta-prefijo-swift.md](27-idpeticion-doc-incompleta-prefijo-swift.md) |
| HP-028 | P2P alias: entrada malformada en 0006/0008 crashea → HTTP 500 (debe ser 455/444) | alta | `tld-api-alias` / `alias` | confirmado — se corrige en dev | [28-p2p-alias-crash-500-respuestas-id-ausentes.md](28-p2p-alias-crash-500-respuestas-id-ausentes.md) |

---

## Pendiente de registrar como ficha

Temas ya estudiados en otras carpetas; convertir en `HP-00N` cuando se prioricen para el informe:

| Tema | Dónde está hoy |
|------|----------------|
| 6 escenarios MATRIZ ≠ VALIDADOR (ruta cliente real) | [`../Postman/comparar-prod-vs-dev/07-matriz-validacion-cuerpo-json.md`](../Postman/comparar-prod-vs-dev/07-matriz-validacion-cuerpo-json.md) |
| Divergencia esperado vs recibido (~22% negocio) | [`../Postman/comparar-prod-vs-dev/08-esperado-vs-recibido-prod.md`](../Postman/comparar-prod-vs-dev/08-esperado-vs-recibido-prod.md) |
| HTTP protocolo vs `codigoError` | [`../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md`](../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md) — **Marketplace:** ver HP-008 |
| Config `ValidadorUrl` incorrecta en despliegue prod-en-dev (550 masivo) | [`../Postman/comparar-prod-vs-dev/recopilacion/ITERACION-02-prod-a-dev-MATRIZ-postfix-2026-07-12.md`](../Postman/comparar-prod-vs-dev/recopilacion/ITERACION-02-prod-a-dev-MATRIZ-postfix-2026-07-12.md) |

---

## Para el informe final

Cuando haya suficientes fichas cerradas, generar un único documento (p. ej. `INFORME-CONSOLIDADO.md` o export HTML) que:

1. Agrupe por componente (matriz, validador, VCN).
2. Separe **bugs de prod** vs **ajustes de prueba** vs **mejoras de arquitectura en dev**.
3. Incluya tabla resumen + anexos de evidencia (runs, CloudWatch).
