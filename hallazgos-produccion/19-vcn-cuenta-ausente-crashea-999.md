# HP-020 — Parámetro `cuenta` inválido en método 0001 → 999/509 (debe ser 413)

| Campo | Valor |
|-------|--------|
| **ID** | HP-020 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código + Newman) — **se corrige en dev** |
| **Severidad** | alta |
| **Componente** | `tld-api-cuenta-nombre` / `cuenta-nombre` (`validaFormatCta`) |
| **Ámbito** | VCN — método **0001** |
| **Veredicto** | **PROD-MAL** (el esperado del test, 413, es el correcto) |

---

## Resumen

En el método **0001** (validación cuenta nombre), **`cuenta` es el único parámetro de negocio** y el
más importante: sin él la petición no tiene sentido. Cuando el cliente **no envía** la propiedad
`cuenta` (`parametros: {}`), como **`null`**, o con **tipo incorrecto** (p. ej. array), producción
no rechaza limpio con **413** "Error al validar el parámetro cuenta". Según el caso: crash en
`validaFormatCta` (`undefined`/`null` → `.length`) → **999**, o el valor inválido pasa la validación
superficial y revienta downstream → **509**. El integrador no recibe un rechazo explícito en
**`cuenta`**.

---

## Comportamiento en producción (observado)

| Escenario | Condición | Recibido |
|-----------|-----------|----------|
| **0001.1.1.1** | `parametros: {}` (propiedad ausente) | **999** "Error en la solicitud" |
| **0001.1.1.2** | `cuenta: null` | **999** "Error en la solicitud" |
| **0001.1.1.18** | `cuenta: ["1100001328"]` (tipo array) | **509** "Error inesperado en validador" |

- **Ruta:** Matriz → Validador → VCN (`cuenta-nombre`, case `0001`).

---

## Comportamiento esperado

- **413** en `respuestas[].resultado` — "Error al validar el parámetro cuenta"
  (`expectedTipo: parametro`, escenarios **0001.1.1.1**, **0001.1.1.2**, **0001.1.1.18**).
- Diferencia concreta: esperado **413** (específico al parámetro) vs recibido **999** (genérico de crash).

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` (0001.1.1.1, 0001.1.1.2 → 999; 0001.1.1.18 → 509) |
| Código prod | `prod_adactado_a_dev/tld-api-cuenta-nombre/lambdas/cuenta-nombre/app.js` línea 93 (`validaFormatCta` sin guard de tipo); líneas 216–219; `catch` → 999; tipo array puede pasar y fallar en llamada validador → 509 |
| Escenarios | `1.1_cuenta_propiedad_ausente.json`, `1.2_cuenta_null.json`, `1.18_cuenta_tipo_array.json` |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 0001 |

---

## Causa raíz

`validaFormatCta` no exige que `cuenta` sea **string** antes de validar formato. Ausente/`null`
crashea (`.length`); tipos incorrectos (array) pueden pasar la regex por coerción JS y fallar más
adelante como **509**. En todos los casos falta un rechazo limpio **413** en el parámetro `cuenta`.

---

## Impacto

- **Diagnóstico inaceptable:** omitir `cuenta` en 0001 es un error grave del llamador; responder 999
  no dice qué corregir. Debe ser explícito: el problema está en el parámetro **`cuenta`**.
- **Patrón repetido:** crash por input → 999 (cf. HP-014).

---

## Mejora propuesta (en dev — ajuste de prod, NO ajuste de prueba)

Validar presencia y que `cuenta` sea **string** **antes** de `validaFormatCta`; si falta, es `null`,
no es string o no cumple formato → **413** en `respuestas[].resultado`. Tests **0001.1.1.1**,
**0001.1.1.2** y **0001.1.1.18** mantienen **413**.

---

## Referencias

- Código 413: [`../codigosRespuesta/nueva-tabla-codigo-respuesta.md`](../codigosRespuesta/nueva-tabla-codigo-respuesta.md)
- Relacionados: [HP-014](13-validador-solicitud-null-crashea-999.md) (crash input → 999)
