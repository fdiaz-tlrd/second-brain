# Hallazgos — repo dev `tld-validador-api`

Última revisión: **2026-07-13**

---

## Resueltos en repo (pendiente deploy)

| Tema | Solución |
|------|----------|
| `@aws-sdk/client-lambda` faltante | Layer `3.1079.0`; `axios` retirado |
| Timeout `validar` 24 s | **28 s** |
| **HP-012** `idSolicitud` inválido → 404 | **431** en `validarParametroSolicitudes` (validador.js) |
| **HP-013** `idSolicitud` sin charset → 509 | validación charset (alfanum+guion, ≥1 alfanum) → **431** |
| **HP-014** elemento `null` crashea → 999 | guard objeto no-nulo → **431** (sin crash) |
| **HP-016** canal mal configurado → 405 | **ya daba 500** (refactor invoke: `getCanal` lanza) |
| **HP-018** método fuera de config → 509 | **ya daba 418** (`resolverServicioInterno`) |

Detalle + verificación (24/24): [correccion-validar-hallazgos-2026-07-13.md](./correccion-validar-hallazgos-2026-07-13.md)
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
