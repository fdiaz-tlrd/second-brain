# HP-015 — Canal emisor sin plan de suscripción no se rechaza → 509 (debe ser 403)

| Campo | Valor |
|-------|--------|
| **ID** | HP-015 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código + Newman) — **se corrige en dev** |
| **Severidad** | media-alta |
| **Componente** | `tld-api-cuenta-nombre` / `cuenta-nombre` (`validatePlan`) |
| **Ámbito** | VCN (observable en flujo Matriz → Validador → VCN) |
| **Veredicto** | **PROD-MAL** (el esperado del test, 403, es el correcto) |

---

## Resumen

Cuando el canal emisor **no tiene plan de suscripción** (sin fila en `tld-matriz-planes-canales`),
producción **no rechaza** la petición. VCN invoca `tld-matriz-control-plan`, que devuelve
`statusCode: 200, subscription: false`, pero `cuenta-nombre` solo comprueba `statusCode !== 200` y
**ignora** el flag `subscription`. La petición continúa, falla downstream al llamar al validador
interno y el cliente recibe **509** "Error inesperado en validador", enmascarando que el canal no
tiene plan. Lo correcto es rechazar con **403** "Canal emisor no tiene un plan de suscripción"
(código nuevo en `nueva-tabla-codigo-respuesta.md`, sin ref. Marketplace).

---

## Comportamiento en producción (observado)

- **Recibido:** `codigoError 509` "Error inesperado en validador" (HTTP 200, payload cifrado).
- **Condición:** `idCanal` sin fila en `tld-matriz-planes-canales` (canales prueba 1020, 1019).
- **Ruta:** Matriz → Validador → VCN (`cuenta-nombre`).

---

## Comportamiento esperado

- **403** "Canal emisor no tiene un plan de suscripción".
- Diferencia concreta: esperado **403** vs recibido **509**.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` (2.1.2, 2.1.4 → 509) |
| Código prod | `prod_adactado_a_dev/tld-api-cuenta-nombre/lambdas/cuenta-nombre/app.js` líneas 32–49 (no valida `subscription === false`) |
| Control-plan | `prod_adactado_a_dev/tld-matriz/lambdas/tld-matriz-control-plan/index.js` líneas 173–177 (`subscription: false` con `statusCode: 200`) |
| Escenarios | `2.1.2` (`CANAL_EMISOR_SIN_PLAN` / 1020), `2.1.4` (`CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS` / 1019) |
| Canales prueba | `Postman/canalesPruebas-dev/canalesPruebas-dev.json` + `.md` |
| Código dev (referencia) | `tld-api-cuenta-nombre/lambdas/cuenta-nombre/lib/plan.js` + `app.js` (rechazo 403) |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 2.1-A |

---

## Causa raíz

1. `validatePlan('validar', idCanal)` invoca `tld-matriz-control-plan`.
2. Sin suscripción, control-plan responde `{ statusCode: 200, subscription: false, message: 'Canal no posee suscripción' }`.
3. VCN solo evalúa `validaPlanRespDecode.statusCode !== 200` → pasa (es 200).
4. No hay chequeo de `subscription === true` antes de continuar.
5. La petición avanza (descifrado, validación cuenta, llamada al validador downstream).
6. Fallo en el llamado interno → **509** genérico en lugar de **403** de negocio.

---

## Impacto

- **Diagnóstico erróneo:** el integrador cree que hay un fallo del validador, no que su canal no tiene plan.
- **Operación:** soporte investiga 509 en vez de un rechazo claro de suscripción.
- **Seguridad/comercial:** un canal sin plan no debería procesar transacciones.

---

## Mejora propuesta (en dev — ajuste de prod, NO ajuste de prueba)

Tras `validatePlan`, rechazar si `subscription !== true` (o `statusCode !== 0` según homologación P2M/base)
con **403** y mensaje de catálogo. Ya implementado en `tld-api-cuenta-nombre` (refactor dev). Los tests
**2.1.2** y **2.1.4** mantienen **403**. La corrida contra `prod_adactado_a_dev` seguirá dando 509 hasta
aplicar el fix.

---

## Referencias

- Código 403: [`../codigosRespuesta/nueva-tabla-codigo-respuesta.md`](../codigosRespuesta/nueva-tabla-codigo-respuesta.md)
- Relacionados: [HP-004](03-matriz-550-enmascara-errores-validador.md) (509 enmascara errores), [HP-006](05-matriz-validatePlan-codigo-muerto.md) (código muerto plan en matriz)
