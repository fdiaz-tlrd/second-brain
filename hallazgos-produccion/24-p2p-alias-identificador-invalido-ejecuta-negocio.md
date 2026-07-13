# HP-024 — P2P alias método 0002: identificador inválido pasa validación y ejecuta negocio (409 → 0)

| Campo | Valor |
|-------|--------|
| **ID** | HP-024 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (Newman prod MATRIZ) — **se corrige en dev** |
| **Severidad** | alta |
| **Componente** | `tld-api-alias` / `lambdas/alias/lib/validaciones.js` (`validarIdentificador`) |
| **Ámbito** | P2P — método 0002 |
| **Veredicto** | **PROD-MAL** |

---

## Resumen

`validarIdentificador` en prod exige `typeof === 'string'` y regex `/^6\d{7}$/`. Escenarios con tipo
**number**, **boolean**, **object**, longitud incorrecta, letras o espacios deberían devolver **409**.
En el run prod, la respuesta es **`resultado: 0`** con `datos` poblados — la validación **no rechazó**
la entrada y el flujo de negocio se ejecutó (p. ej. consulta con identificador inválido o coerción).

**9 escenarios únicos** en `Metodo/0002/1_validaciones_js/2_identificador`.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `2026-07-13T09-47-19Z` — `c1de7ef` |
| Ejemplo | `0002.1.2.4. identificador — tipo number (409)` → body con `resultado:0`, `datos.existe` |
| Código prod | `prod_adactado_a_dev/tld-api-alias/lambdas/alias/lib/validaciones.js` `validarIdentificador` |

---

## Mejora en dev

Guards de tipo estrictos antes de regex; rechazo **409** sin ejecutar lógica de negocio.
