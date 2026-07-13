# HP-015 — Canal emisor sin plan de suscripción no se rechaza → 509 (debe ser 403)

| Campo | Valor |
|-------|--------|
| **ID** | HP-015 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código + Newman) — **se corrige en dev** |
| **Severidad** | media-alta |
| **Componente** | `tld-api-cuenta-nombre` / `cuenta-nombre`; **`tld-api-alias` / `alias`** (misma regla de negocio) |
| **Ámbito** | VCN y P2P (Matriz → Validador → producto) |
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

### VCN — escenarios 2.1.2 / 2.1.4

- **Recibido:** `codigoError 509` "Error inesperado en validador" (HTTP 200, payload cifrado).
- **Condición:** `idCanal` sin fila en `tld-matriz-planes-canales` (canales prueba 1020, 1019).
- **Ruta:** Matriz → Validador → VCN (`cuenta-nombre`).

### P2P (alias) — mismos escenarios 2.1.2 / 2.1.4

- **Recibido:** `resultado 419` en `respuestas[0]` (flujo sigue hasta negocio; no hay rechazo por plan).
- **Condición:** mismos canales 1020 / 1019.
- **Ruta:** Matriz → Validador → alias (`tld-api-alias`).
- **Causa en prod:** `VALIDAR_PLAN_ID_CANAL: 0` en `template.yaml` — la validación de plan está
  **desactivada**; si `subscription` falla, prod **no rechaza** y continúa.
- **Run Newman P2P:** `2026-07-13T09-47-19Z` (`c1de7ef`).

---

## Comportamiento esperado

- **403** "Canal emisor no tiene un plan de suscripción".
- VCN: esperado **403** vs recibido **509**.
- P2P: esperado **403** vs recibido **419** (síntoma distinto; mismo hallazgo de negocio).

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman VCN | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` (2.1.2, 2.1.4 → 509) |
| Run Newman P2P | `Postman/generador/logs/resultados-por-escenario-p2p.json` run `09-47-19Z` (2.1.2, 2.1.4 → 419) |
| Código prod VCN | `prod_adactado_a_dev/tld-api-cuenta-nombre/lambdas/cuenta-nombre/app.js` líneas 32–49 (no valida `subscription === false`) |
| Código prod alias | `prod_adactado_a_dev/tld-api-alias/lambdas/alias/app.js` L145–148 (`VALIDAR_PLAN_ID_CANAL === 1` único gate); `template.yaml` L272: `VALIDAR_PLAN_ID_CANAL: 0` |
| Control-plan | `prod_adactado_a_dev/tld-matriz/lambdas/tld-matriz-control-plan/index.js` líneas 173–177 (`subscription: false` con `statusCode: 200`) |
| Escenarios | `2.1.2` (`CANAL_EMISOR_SIN_PLAN` / 1020), `2.1.4` (`CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS` / 1019) |
| Canales prueba | `Postman/canalesPruebas-dev/canalesPruebas-dev.json` + `.md` |
| Código dev VCN | `tld-api-cuenta-nombre/lambdas/cuenta-nombre/lib/plan.js` + `app.js` (rechazo 403) |
| Código dev alias | `tld-api-alias/lambdas/alias/lib/plan.js` + `app.js` L279–298 (`CFG_VALIDAR_PLAN_POR_CANAL`; rechazo 403) |
| Revisión VCN | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 2.1-A |
| Revisión P2P | [`../Postman/comparar-prod-vs-dev/13-revision-codigos-respuesta-p2p.md`](../Postman/comparar-prod-vs-dev/13-revision-codigos-respuesta-p2p.md) §Bloque D |

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

Tras `validatePlan`, rechazar si el plan es inválido o ausente con **403** y mensaje de catálogo.

- **VCN:** implementado en `tld-api-cuenta-nombre` (refactor dev).
- **Alias (P2P):** implementado en `tld-api-alias` (`resolverCanalEmisor`, rechazo 403). Variable
  **`CFG_VALIDAR_PLAN_POR_CANAL`** (`1` = validar, `0` = no validar) — en dev template va en `1`; en
  prod real y en `prod_adactado_a_dev` va en `0` (**rollout**: activar cuando los canales sin plan estén
  corregidos en producción; el flag no invalida el hallazgo).

Los tests **2.1.2** y **2.1.4** mantienen **403** en VCN y P2P. La corrida contra `prod_adactado_a_dev`
seguirá divergiendo (509 en VCN, 419 en P2P) mientras prod tenga la validación desactivada o sin el fix
de código.

---

## Referencias

- Código 403: [`../codigosRespuesta/nueva-tabla-codigo-respuesta.md`](../codigosRespuesta/nueva-tabla-codigo-respuesta.md)
- Relacionados: [HP-004](03-matriz-550-enmascara-errores-validador.md) (509 enmascara errores), [HP-006](05-matriz-validatePlan-codigo-muerto.md) (código muerto plan en matriz)
