# Hallazgos — repo dev `tld-validador-api`

Última revisión: **2026-07-06**

---

## Resueltos en repo (pendiente deploy)

| Tema | Solución |
|------|----------|
| `@aws-sdk/client-lambda` faltante | Layer `3.1079.0`; `axios` retirado |
| Timeout `validar` 24 s | **28 s** |

Ver [timeouts-y-dependencias.md](./timeouts-y-dependencias.md)

---

## Diferencia `statusCode` en `respuesta` — **resuelto en repo**

Documento: [diferencia-prod-vs-dev-respuesta-producto.md](./diferencia-prod-vs-dev-respuesta-producto.md)

**Fix:** `tld-validador-api/lambdas/validar/lib/validador.js` — `comoAxiosData()` quita `statusCode` del payload invoke antes del wrap (equivalente a `axios.data` en prod).

Verificación local: `node second-brain/tld-validador-api/verificar-como-axios-data.js`

**Pendiente:** deploy del validador-api con el cambio.

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
