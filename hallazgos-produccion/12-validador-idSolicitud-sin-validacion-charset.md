# HP-013 — `idSolicitud` sin validación de charset → pasa y revienta en 509 (debe ser 431)

| Campo | Valor |
|-------|--------|
| **ID** | HP-013 |
| **Fecha** | 2026-07-13 |
| **Estado** | **corregido-en-dev** (2026-07-13, `validador.js`; verificado 24/24) — pendiente deploy + re-run |
| **Severidad** | media-alta |
| **Componente** | `tld-validador-api` / `lambdas/validar` (`validarParametroSolicitudes`) |
| **Ámbito** | transversal (validador) — observado en VCN |
| **Veredicto** | **PROD-MAL** (el esperado del test, 431, es el correcto) |

---

## Resumen

El campo `idSolicitud` tiene un charset documentado en el Marketplace: **solo alfanuméricos (A-Z, a-z,
0-9) y guiones (-), de 1 a 64 caracteres**. Producción **no valida ese charset**:
`validarParametroSolicitudes` solo comprueba presencia, tipo string, no-vacío tras trim, largo ≤ 64 y
unicidad. Por eso un `idSolicitud` con símbolos/espacios (`id_001`, `id@001`, `id 001`, `id.001`,
`id¿001`, `id/001`, `id"001`) **pasa la validación** y falla más adelante devolviendo **`codigoError
509` "Error inesperado en validador"** — un error genérico que **no** le dice al cliente que su
`idSolicitud` está mal formado. Lo correcto es rechazar con **431 "Campo idSolicitud no cumple con los
criterios"** (esquema nuevo).

---

## Comportamiento en producción (observado)

- **Recibido:** `codigoError 509` "Error inesperado en validador" (HTTP 200).
- **Condición:** `idSolicitud` con caracteres fuera del charset documentado.
- Estos valores son strings no vacíos ≤ 64 → **pasan** `validarParametroSolicitudes` (no hay chequeo de
  charset), siguen a la ruta del servicio interno y terminan en 509.

---

## Comportamiento esperado

- **431 "Campo idSolicitud no cumple con los criterios"** (código nuevo dedicado), para violaciones de
  charset del `idSolicitud`.
- Justificación documental: la doc de prod (`produccion_real/telered_content_mktpl/tech_doc/api_4.json`,
  descripción de `idSolicitud`) ya exige alfanumérico + guiones, 1–64.

---

## Caso especial — `idSolicitud` de solo guiones (`-`, `---`)

Escenarios **1.5.23** (`---`) y **1.5.24** (`-`). Estos valores **cumplen** el charset documentado
(los guiones están permitidos) y el largo mínimo (≥ 1). Es decir, **la doc actual NO los prohíbe**, pero
**no tienen sentido**: `idSolicitud` es un **identificador** y un valor de puros guiones no identifica
nada.

- **Doble hallazgo:** (a) **gap de documentación** — la doc no exige "al menos un carácter
  alfanumérico"; (b) **gap de validación** — prod no los rechaza.
- **Se corrige en dev:** la validación debe exigir que `idSolicitud` contenga al menos un alfanumérico
  y rechazar `-`/`---` con **431**. La regla correspondiente debería reflejarse también en la doc del
  Marketplace (no se edita `api_4.json` aquí; queda anotado para esa gestión).

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` (1.5.10–1.5.18, 1.5.23, 1.5.24 → 509) |
| Código prod | `prod_adactado_a_dev/tld-validador-api/lambdas/validar/lib/validador.js` — `validarParametroSolicitudes` (51-91): **no** valida charset; `app.js` 509 en 93-96 |
| Doc charset | `produccion_real/telered_content_mktpl/tech_doc/api_4.json` — `idSolicitud`: "solo alfanuméricos (A-Z, a-z, 0-9) y guiones (-), 1–64" |
| Diseño 431 | `second-brain/codigosRespuesta/nueva-tabla-codigo-respuesta.html` (fila 431) |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 1.5-B |

---

## Causa raíz

`validarParametroSolicitudes` no incluye validación de charset de `idSolicitud`. Un valor con caracteres
no permitidos atraviesa la validación y "falla" recién en la llamada al servicio interno, produciendo un
509 genérico que enmascara la causa real (input mal formado del cliente).

---

## Impacto

- **Diagnóstico erróneo:** el cliente recibe "Error inesperado en validador" (suena a fallo de la
  plataforma) cuando el problema es su `idSolicitud`. No hay forma de que sepa qué corregir.
- **Enmascaramiento:** un error de input del cliente se reporta como error interno (509).

---

## Mejora propuesta (en dev — ajuste de prod, NO ajuste de prueba)

Agregar validación de charset de `idSolicitud` (alfanumérico + guiones, 1–64, **al menos un
alfanumérico**) en `validarParametroSolicitudes`, devolviendo **431**. El test **no** cambia: 1.5.10–1.5.18,
1.5.23, 1.5.24 siguen esperando **431**. La corrida contra `prod_adactado_a_dev` seguirá dando 509 hasta
aplicar el fix en dev.

---

## Referencias

- Diseño de códigos: `second-brain/codigosRespuesta/nueva-tabla-codigo-respuesta.html` / `.md`
- Relacionados: [HP-012](11-validador-idSolicitud-usa-404-en-vez-de-431.md) (idSolicitud → 404 reusado), [HP-011](10-matriz-peticion-sin-validacion-formato.md) (peticion → 405 engañoso).
