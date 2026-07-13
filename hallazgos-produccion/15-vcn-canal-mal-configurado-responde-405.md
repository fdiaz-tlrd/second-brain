# HP-016 — Canal emisor mal configurado en BD → 405 descifrado (debe ser 500)

| Campo | Valor |
|-------|--------|
| **ID** | HP-016 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código + Newman) — **se corrige en dev** |
| **Severidad** | media-alta |
| **Componente** | `tld-validador-api` / `validar` (y mismo patrón en `tld-api-cuenta-nombre`) |
| **Ámbito** | transversal — observado en VCN |
| **Veredicto** | **PROD-MAL** (el esperado del test, 500, es el correcto) |

---

## Resumen

Cuando el canal emisor **existe en BD pero está mal configurado** (p. ej. sin `llaveCifrado` /
`llaveDescifrado` válidos — canal prueba **1017** `CANAL_EMISOR_MAL_CONFIGURADO`), producción
intenta descifrar `peticion` con llaves inválidas o ausentes. El fallo se reporta como **405**
"Error en descifrado canal emisor", igual que si el **cliente** hubiera cifrado mal. Lo correcto es
**500** "Error interno": es un problema de **configuración de plataforma**, no del integrador.

---

## Comportamiento en producción (observado)

- **Recibido:** `codigoError 405` "Error en descifrado canal emisor".
- **Condición:** `idCanal` con fila en `tld-validador-canal` pero configuración incompleta (1017 sin
  `llaveCifrado`).
- **Ruta:** Matriz → Validador (`validar`) — falla al descifrar antes de llegar a VCN.

---

## Comportamiento esperado

- **500** "Error interno" (escenario 2.1.3; `nueva-tabla-codigo-respuesta.md`).
- Diferencia concreta: esperado **500** vs recibido **405**.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` (2.1.3 → 405) |
| Código prod | `prod_adactado_a_dev/tld-validador-api/lambdas/validar/app.js` líneas 54–57 (`descifrar` falla → 405 sin distinguir causa) |
| Canal prueba | `Postman/canalesPruebas-dev` — 1017 TEYVGATO, `CANAL_EMISOR_MAL_CONFIGURADO` |
| Escenario | `VCN Escenarios error/General/2_reglaNegocio/1_idCanal/1.3_idCanal_error_interno_getCanal.json` |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 2.1-B |

---

## Causa raíz

`getCanal` devuelve el canal aunque las llaves estén mal o ausentes. `llave.descifrar` falla y el
handler mapea **cualquier** fallo de descifrado a **405**, sin distinguir:

- **405** → petición bien formada pero el cliente cifró con llave incorrecta o datos corruptos.
- **500** → la plataforma no puede descifrar porque el canal emisor está mal configurado en BD.

Mismo patrón engañoso que HP-011 (formato `peticion` → 405): el cliente recibe un código que le dice
revisar su cifrado cuando el problema es interno.

---

## Impacto

- **Diagnóstico erróneo:** soporte e integrador investigan llaves/cifrado del cliente en un caso que
  solo operaciones puede corregir (config del canal en BD).
- **Tiempo perdido:** escenario real en sandbox/QA cuando un canal de prueba está incompleto.

---

## Mejora propuesta (en dev — ajuste de prod, NO ajuste de prueba)

Tras `getCanal`, validar que el canal emisor tenga llaves y configuración mínima operativa; si no,
devolver **500** antes de intentar descifrar. Si el canal está bien configurado y `descifrar` falla,
mantener **405**. El test **2.1.3** mantiene **500**.

---

## Referencias

- Código 500: [`../codigosRespuesta/nueva-tabla-codigo-respuesta.md`](../codigosRespuesta/nueva-tabla-codigo-respuesta.md)
- Relacionados: [HP-011](10-matriz-peticion-sin-validacion-formato.md) (405 engañoso por falta de validación previa), [HP-015](14-vcn-sin-plan-suscripcion-enmascara-509.md) (509 enmascara otro error de canal)
