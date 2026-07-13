# HD-001 / HD-002 — `tld-validador-validar` (dev): HTTP Code siempre 200

| Campo | Valor |
|-------|--------|
| **ID** | HD-001 (HTTP), HD-002 (invoke vs axios) |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (revisión de código) |
| **Severidad** | **crítica** (HD-001 — contrato cliente) |
| **Componente** | `tld-matriz` → `lambdas/tld-validador-validar` |
| **Repo dev** | `tld-matriz/lambdas/tld-validador-validar/index.js` (203 líneas) |

---

## Resumen

En **nuestro desarrollo**, la lambda `tld-validador-validar` de matriz **sigue devolviendo siempre HTTP 200** al cliente en todas las rutas de negocio del handler. Es el **mismo contrato que producción**. El HTTP del validador downstream se **lee** (`validarResponse.status`) pero **no se reenvía** como HTTP de la respuesta de matriz. **No hay que cambiar el HTTP Code** en mejoras futuras; solo el contenido del JSON (`codigoError`, mensajes) cuando haya sustento (Marketplace).

---

## Regla para el equipo (decisión documentada)

| Qué | Acción permitida |
|-----|------------------|
| HTTP Code hacia el cliente de matriz | **Mantener 200** en éxito y error de negocio |
| `codigoError` / campos en el body | **Mejorar** si Marketplace o pruebas lo justifican |
| HTTP del validador interno (invoke) | Puede ser 400, 401, 502, etc.; matriz lo **absorbe** y responde 200 + body |

Cambiar matriz de HTTP 200 → 400/404/431 sería **regresión de contrato** con el cliente final, independientemente de que el código de negocio en JSON sea más correcto.

---

## Comportamiento en desarrollo — mapa de `statusCode`

Todas las rutas `return` del handler usan **`statusCode: 200`**:

| Líneas | Caso | HTTP al cliente | Body |
|--------|------|-----------------|------|
| 76-85 | `isValid` falla | **200** | `{ codigoError: 400, descripcionError: "Error de formato en campo …" }` |
| 99-105 | validador downstream respondió **400** | **200** | passthrough `validarResponse.data` |
| 117-121 | validador downstream **200** | **200** | passthrough `validarResponse.data` |
| 135-141 | `catch`, downstream **400** | **200** | passthrough `e.response.data` |
| 143-151 | `catch`, cualquier otro error | **200** | `{ codigoError: 550, descripcionError: "Error inesperado" }` |

**No existe** ningún `return` con `statusCode` distinto de 200 en el handler de negocio.

### Flujo cuando el validador devuelve HTTP ≠ 200

```text
invocarValidadorLambda → lee parsed.statusCode del payload Lambda
  ├─ status == 400  → return 200 + body validador
  ├─ status == 200  → return 200 + body validador
  └─ status ≠ 200   → throw → catch → return 200 + { codigoError: 550, ... }
```

El cliente de matriz **nunca** ve el HTTP del validador; solo el body (o 550 genérico).

---

## Comparación con producción

| Aspecto | Prod (`produccion_real`) | Dev (`tld-matriz`) |
|---------|--------------------------|---------------------|
| Llamada al validador | `axios.post(VALIDADOR_URL+"/validar")` | `Lambda Invoke` (`VALIDADOR_LAMBDA_NAME`) |
| HTTP al cliente | Siempre **200** (4 rutas return) | Siempre **200** (5 rutas return) |
| Validador HTTP 400 | catch → 200 + body | Explícito líneas 99-105 y catch 135-141 → 200 + body |
| Validador HTTP ≠ 200, ≠ 400 | catch → 200 + 550 | throw líneas 107-110 → catch → 200 + 550 |
| `isValid` / trace / bugs | Igual estructura | Igual estructura |

**Conclusión:** el refactor dev (axios → invoke) **no cambió** el contrato HTTP hacia el cliente. Sigue siendo 200 siempre.

Hallazgo prod equivalente: [HP-003](../hallazgos-produccion/02-matriz-http-200-siempre.md).

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Código dev | `tld-matriz/lambdas/tld-validador-validar/index.js` — `statusCode: 200` en líneas 77, 101, 118, 138, 144 |
| Código prod | `produccion_real/tld-matriz/lambdas/tld-validador-validar/index.js` — líneas 41, 65, 85, 91 |
| Newman prod MATRIZ | 1263/1263 `httpRealLambda: 200` (run `2026-07-13T01-03-45Z_prod_MATRIZ`) |
| Newman dev MATRIZ | **Pendiente** run `--codigo-fuente dev` con captura fortalecida |

---

## Qué sí se puede mejorar (sin tocar HTTP)

Ejemplos alineados con lo acordado:

- Corregir `codigoError` en el JSON cuando prod/dev devuelve 550 pero el Marketplace documenta otro código para ese caso.
- Alinear mensajes `descripcionError` con documentación.
- Arreglar bugs que **distorsionan** el `codigoError` (p. ej. `idCanal` null → 550 en vez de 400) — mejora el **body**, el HTTP sigue en 200.

---

## Qué NO hacer

- Introducir `statusCode: 400` (u otro) en matriz “porque el error es de validación”.
- Propagar el HTTP del validador Lambda al cliente de matriz.
- Cambiar expectativas de prueba de HTTP en matriz sin acuerdo explícito de cambio de contrato (no recomendado).

---

## Riesgo residual (fuera del handler de negocio)

Un HTTP ≠ 200 al cliente solo podría venir de **infra/runtime** (502 init, 504 timeout API GW, 429 throttle), igual que en prod — no del diseño intencional del handler.

---

## Referencias

- [HP-003](../hallazgos-produccion/02-matriz-http-200-siempre.md)
- [10-http-vs-codigoerror.md](../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md)
- [01-tld-matriz-validador-validar.md](../produccion_real/01-tld-matriz-validador-validar.md)
