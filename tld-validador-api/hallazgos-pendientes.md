# Hallazgos — repo dev `tld-validador-api`

Última revisión: **2026-07-13**

---

## Abierto / cerrado — mensaje excepción `validar` (2026-07-14)

Documento: [getCanal-excepcion-validador-no-string-2026-07-14.md](./getCanal-excepcion-validador-no-string-2026-07-14.md)

| Tema | Estado |
|------|--------|
| Validación de tipo `validador` en API | **No** (mínimo) |
| `getCanal` + catch global validador-api → **500 Error interno** | **Hecho en repo** (pend. deploy) |
| Criterio | Solo tocar si el string largo **llega al cliente** |
| Aviso 01 alias / cuenta-nombre / Aviso 02 proxy | **No tocar** (cliente ya ve catálogo) |

---

## Resueltos en repo (pendiente deploy)

| Tema | Solución |
|------|----------|
| `@aws-sdk/client-lambda` faltante | Layer `3.1079.0`; `axios` retirado |
| Timeout `validar` 24 s | **28 s** |
| **HP-012** `idSolicitud` inválido → 404 | **431** en `validarParametroSolicitudes` (validador.js) |
| **HP-013** `idSolicitud` sin charset → 509 | validación charset (alfanum+guion, ≥1 alfanum) → **431** |
| **HP-014** elemento `null` crashea → 999 | guard objeto no-nulo → **431** (sin crash) |
| Tope `METHOD_LIMIT` / `SOLICITUDES_MASIVAS_MAXIMO` en validador-api | **Eliminado 2026-07-14** — cantidad la decide cada producto; orquestador solo forma/`idSolicitud` |
| **HP-016** canal mal configurado → 405 | **ya daba 500** (refactor invoke: `getCanal` lanza) |
| **HP-018** método fuera de config → 509 | **Dig:** **481** Método inválido (`resolverServicioInterno`; ya no 418) — pend. deploy + Newman |
| **HD-007** `validar` emitía HTTP 500 (servicio interno) → matriz enmascara a 550 | **app.js: 500→200** (509 llega al cliente como en prod) |

Detalle + verificación (24/24): [correccion-validar-hallazgos-2026-07-13.md](./correccion-validar-hallazgos-2026-07-13.md)
Cumplimiento HTTP Code de la cadena (matriz + validador-api): [http-code-cadena-cumplimiento-2026-07-13.md](./http-code-cadena-cumplimiento-2026-07-13.md)
Verificador reutilizable: `node verificar-validarParametroSolicitudes.js`

Ver [timeouts-y-dependencias.md](./timeouts-y-dependencias.md)

---

## Diferencia `statusCode` en `respuesta` — **resuelto en repo**

Documento: [diferencia-prod-vs-dev-respuesta-producto.md](./diferencia-prod-vs-dev-respuesta-producto.md)

**Fix:** `tld-validador-api/lambdas/validar/lib/validador.js` — `comoAxiosData()` quita `statusCode` del payload invoke antes del wrap (equivalente a `axios.data` en prod).

Verificación local: `node second-brain/tld-validador-api/verificar-como-axios-data.js`

**Pendiente:** deploy del validador-api con el cambio.

**Checkpoint Postman + Newman (deploy, runs prod/dev, comparación):** [`../Postman/00-estado-y-retomo.md`](../Postman/00-estado-y-retomo.md)

---

## Contexto arquitectura

[arquitectura-invoke-y-contratos.md](./arquitectura-invoke-y-contratos.md)

---

## Otros

| Tema | Nota |
|------|------|
| `config-servicios` Dynamo | Sin uso en routing dev |
| Prueba E2E matriz → validador → producto | Pendiente |
| Newman directo a producto | No es referencia del camino matriz |
