# HP-014 — Elemento `null` en `solicitudes[]` crashea la validación → 999 (debe ser 431)

| Campo | Valor |
|-------|--------|
| **ID** | HP-014 |
| **Fecha** | 2026-07-13 |
| **Estado** | **corregido-en-dev** (2026-07-13, `validador.js`; verificado 24/24) — pendiente deploy + re-run |
| **Severidad** | alta |
| **Componente** | `tld-validador-api` / `lambdas/validar` (`validarParametroSolicitudes`) |
| **Ámbito** | transversal (validador) — observado en VCN |
| **Veredicto** | **PROD-MAL** (el esperado del test, 431, es el correcto) |

---

## Resumen

Cuando el arreglo `solicitudes` contiene un elemento `null` (`"solicitudes": [null]`), producción
**crashea** en vez de rechazar limpiamente. En `validarParametroSolicitudes` la línea
`solicitudes.filter(solicitud => solicitud.hasOwnProperty('idSolicitud'))` ejecuta
`null.hasOwnProperty(...)`, que lanza **TypeError: Cannot read properties of null**. La excepción cae al
`catch` genérico del `app.js` y se devuelve **`codigoError 999` "Error en la solicitud"** (error de crash
no controlado). Lo correcto es rechazar con **431 "Campo idSolicitud no cumple con los criterios"**.

---

## Comportamiento en producción (observado)

- **Recibido:** `codigoError 999` "Error en la solicitud" (HTTP 200).
- **Condición:** un elemento `null` (o cualquier no-objeto) dentro del arreglo `solicitudes`.
- **Ruta del crash:** `validarParametroSolicitudes` pasa el chequeo de cantidad (array de largo 1) y
  luego llama `null.hasOwnProperty('idSolicitud')` → TypeError → `catch` de `app.js` → 999.

---

## Comportamiento esperado

- **431 "Campo idSolicitud no cumple con los criterios"** (rechazo limpio), sin crash.
- Diferencia concreta: esperado **431** vs recibido **999** (crash).

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` (1.5.19 → 999) |
| Código prod | `prod_adactado_a_dev/tld-validador-api/lambdas/validar/lib/validador.js` línea 60 (`solicitud.hasOwnProperty` sobre elemento `null`); `app.js` catch → 999 (líneas 111-115) |
| Escenario | `VCN Escenarios error/General/1_validaciones_js/5_solicitudes/5.19_solicitudes_idSolicitud_elemento_null.json` |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 1.5-C |

---

## Causa raíz

`validarParametroSolicitudes` no protege contra elementos que no sean objeto antes de invocar
`.hasOwnProperty`. Un `null` en el arreglo dispara un TypeError no controlado, que el `catch` global
convierte en 999 genérico, enmascarando que el problema es un input mal formado del cliente.

---

## Impacto

- **Crash no controlado:** input del cliente derriba la función de validación; se reporta como error
  interno (999) en lugar de un rechazo de campo.
- **Diagnóstico erróneo:** el cliente no sabe que su arreglo `solicitudes` trae un elemento inválido.
- **Riesgo:** patrón repetido de crash-por-input (cf. HP-007 `X-Forwarded-For`).

---

## Mejora propuesta (en dev — ajuste de prod, NO ajuste de prueba)

En `validarParametroSolicitudes`, validar que cada elemento de `solicitudes` sea un objeto no nulo antes
de inspeccionarlo (p. ej. `typeof solicitud === 'object' && solicitud !== null`), devolviendo **431** si
no lo es. El test **no** cambia: 1.5.19 sigue esperando **431**. La corrida contra `prod_adactado_a_dev`
seguirá dando 999 hasta aplicar el fix en dev.

---

## Referencias

- Relacionados: [HP-013](12-validador-idSolicitud-sin-validacion-charset.md) (charset sin validar → 509), [HP-012](11-validador-idSolicitud-usa-404-en-vez-de-431.md) (idSolicitud → 404 reusado), [HP-007](06-matriz-x-forwarded-for-riesgo-crash.md) (crash por input).
