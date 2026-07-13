# HP-022 — Respuesta validador sin campo cifrado → 406 (debe ser 509)

| Campo | Valor |
|-------|--------|
| **ID** | HP-022 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código + Newman) — **se corrige en dev** |
| **Severidad** | media-alta |
| **Componente** | `tld-api-cuenta-nombre` / `cuenta-nombre` (descifrado respuesta validador) |
| **Ámbito** | VCN — integración Canal Validador (dummy 1022/1023) |
| **Veredicto** | **PROD-MAL** (el esperado del test, **509**, es el correcto) |

---

## Resumen

Cuando el **Canal Validador** responde con una estructura **inválida** — sin el campo `respuesta`
cifrado esperado (cuenta trampa `5000000518`, dummy `validar-fallos`) — producción intenta descifrar
igual y devuelve **406** "Error en descifrado canal validador". Eso culpa al cifrado/descifrado; en
realidad el **validador respondió mal**. Lo correcto es **509** "Error inesperado en el Canal
Validador".

---

## Comportamiento en producción (observado)

| Escenario | Condición | Recibido |
|-----------|-----------|----------|
| **0001.5.1022.3** (PROXGATO auth fijo) | Respuesta sin campo `respuesta` cifrado | **406** descifrado validador |
| **0001.5.1023.3** (OUTFGATO auth token) | idem | **406** descifrado validador |

- **Esperado:** **509**.
- **Ruta:** Matriz → Validador → VCN → dummy validador → VCN descifra respuesta.

---

## Comportamiento esperado

- **509** "Error inesperado en el Canal Validador" (`nueva-tabla-codigo-respuesta.md`).
- Tests `3.509_respuesta_sin_campo.json` (1022 y 1023) **mantienen 509**.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` (1022.3, 1023.3 → 406) |
| Código prod | `prod_adactado_a_dev/tld-api-cuenta-nombre/lambdas/cuenta-nombre/app.js` líneas 143–146 (`descifrar` falla → 406 sin validar estructura previa) |
| Dummy | `tld-validador-dummy/lambdas/validar-fallos` — cuenta `5000000518` respuesta inválida |
| Escenarios | `Metodo/0001/5_fallosIntegracionValidador/1022_fijo/3.509_respuesta_sin_campo.json`, `1023_token/3.509_respuesta_sin_campo.json` |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §0001-C |

---

## Causa raíz

VCN no valida que la respuesta HTTP del validador traiga el campo `respuesta` con blob cifrado antes
de llamar a `descifrar`. Si falta o es inválido, el fallo de descifrado se reporta como **406** (error
de cifrado/descifrado) en lugar de **509** (respuesta inesperada del validador). Mismo patrón engañoso
que HP-016 (406/405 cuando el problema no es del cliente).

**Contraste:** **0001.5.1022.2** (cifrado invertido, blob presente pero mal cifrado) → **406** es
**correcto** y **OK** en prod.

---

## Impacto

- **Diagnóstico erróneo:** se investiga descifrado cuando el validador devolvió payload mal formado.
- **Operación:** fallos del canal validador externo se mezclan con errores de cifrado del integrador.

---

## Mejora propuesta (en dev — ajuste de prod, NO ajuste de prueba)

Tras recibir respuesta del validador, validar estructura (`respuesta` presente y tipo esperado). Si no
cumple → **509** antes de intentar descifrar. Si cumple estructura pero `descifrar` falla → **406**
(como 1022.2). Tests **1022.3** y **1023.3** mantienen **509**.

---

## Referencias

- Relacionados: [HP-016](15-vcn-canal-mal-configurado-responde-405.md) (406/405 engañoso), [HP-021](20-timeouts-desalineados-demora-no-599.md) (otros fallos integración validador)
