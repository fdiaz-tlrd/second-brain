# HP-010 — Marketplace `api_4.json` no indica la longitud de `idCanal` y `validador`

| Campo | Valor |
|-------|--------|
| **ID** | HP-010 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código fuente prod) — **no se resuelve en nuestra versión** (decisión fuera de alcance) |
| **Severidad** | media |
| **Componente** | `telered_content_mktpl` / `tech_doc/api_4.json` (doc Marketplace VCN) |
| **Ámbito** | documentación pública |
| **Tipo** | hallazgo de documentación (falta especificación de longitud) |

---

## Resumen

La documentación del Marketplace (`api_4.json`) define `idCanal` y `validador` como `type: string`
**sin longitud** ni indicación de rango. El código fuente de producción **sí** impone límites de longitud
(rango, **no** valor fijo):

| Campo | Rango de longitud válido (`isValid` en matriz) |
|-------|------------------------------------------------|
| `idCanal` | **1 a 4** caracteres (`length > 4 \|\| length < 1` → rechaza) |
| `validador` | **1 a 8** caracteres (`length > 8 \|\| length < 1` → rechaza) |

Es un hallazgo de documentación: el contrato público no expresa una restricción que el backend sí aplica.

> **Corrección de un error previo (2026-07-13):** en una primera pasada se documentó `idCanal` como
> "exactamente 4 caracteres" (`minLength: 4, maxLength: 4`). **Es falso:** el código valida **1 a 4**,
> no exactamente 4. Ese cambio se **revirtió** en `api_4.json` (los fragmentos vuelven a `type: string`
> sin longitud). No se debe afirmar en la doc pública algo que el código fuente no respalda.

---

## Por qué `validador` permite 8 (intencional)

- `validador` es, semánticamente, el **`idCanalValidador`**: el id del canal contra el cual se valida.
- El canal que consume el servicio **conoce su propio `idCanal`** (4 caracteres; Telered se lo asignó).
- Pero **no** necesariamente conoce el `idCanal` del canal a validar (caso del método `0001`).
- Por eso `validador` acepta hasta **8 caracteres**: admite el **SWIFT code** (8), que **sí** es de
  conocimiento común entre canales. El backend resuelve por `idCanal` y, si no, por `alias` (SWIFT).

**IMPORTANTE — no es hallazgo:** que la documentación **no mencione** que `validador` acepta el SWIFT
code es **intencional**. No se documenta como error. Solo se deja constancia de que el backend lo permite.

---

## Estado: NO se resuelve en nuestra versión

**Decisión (2026-07-13):** este hallazgo **no** se corrige en `api_4.json`. La definición de lo que
declara la documentación técnica del Marketplace **se escapa de las manos** del equipo (es una decisión
mayor, fuera de este alcance). Por eso:

- **No** se agrega longitud a `idCanal` ni a `validador` en `api_4.json` (se revirtió el intento previo).
- Queda **documentado como hallazgo abierto** de la documentación técnica del Marketplace, para el informe final.

### Lo que SÍ es cierto (para el informe)

| Campo | Doc Marketplace hoy (`api_4.json`) | Código fuente prod (`isValid`) |
|-------|------------------------------------|--------------------------------|
| `idCanal` | `type: string`, sin longitud | 1 a 4 caracteres |
| `validador` | `type: string`, sin longitud | 1 a 8 caracteres (admite SWIFT) |

El backend permite `validador` de 8 (SWIFT code); la doc pública no lo declara. Igual con el rango 1–4
de `idCanal`. Ambos son gaps de documentación que **no** se resuelven en nuestra versión.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Código prod | `produccion_real/tld-matriz/lambdas/tld-validador-validar/index.js` líneas 135-142 (`isValid`) |
| Lookup por alias/SWIFT | `tld-validador-api/lambdas/validar/lib/canal.js` (`getCanalByIdCanal` → fallback `getCanalBySwift`) |
| Doc Marketplace | `produccion_real/telered_content_mktpl/tech_doc/api_4.json` (`RequestCifrado`: `idCanal`, `validador` sin `maxLength`) |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 1.2 |

---

## Relación

| ID | Relación |
|----|----------|
| HP-008 | Otro hallazgo de doc Marketplace (HTTP 400 documentado vs 200 real) |
| HD-006 | Escenario de prueba `1.2.9` asume `validador` máx 4 (incorrecto); se corrige a máx 8 |
