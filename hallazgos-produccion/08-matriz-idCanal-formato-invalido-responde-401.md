# HP-009 — `idCanal` con formato inválido responde 401 "Canal emisor no existe" en vez de 400

| Campo | Valor |
|-------|--------|
| **ID** | HP-009 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (Newman prod en dev, revisión escenario a escenario) |
| **Severidad** | media-alta |
| **Componente** | `tld-matriz` → lambda `tld-validador-validar` |
| **Ámbito** | transversal (validador vía matriz) |
| **Tipo de mejora** | validación preventiva en frontera (no error de negocio en runtime) |

---

## Resumen

Cuando `idCanal` tiene **caracteres o formato inválido** (espacios, tab, `@`, `(`, `¿`, `"`, espacio interno post-trim), producción **no rechaza por formato**. Hace trim, busca el canal en base de datos, no lo encuentra y responde **`401 "Canal emisor no existe"`** en lugar de **`400 "Error de formato en campo canal"`**.

La expectativa del test (**400**) es correcta. Es un **hallazgo de producción**: falta validación preventiva antes de ir contra la BD.

---

## Comportamiento en producción (observado)

Run: `2026-07-13T03-16-37Z_prod_MATRIZ`, `codigo-fuente prod`, `NIVEL_EJECUCION=MATRIZ`.

| Escenario | Entrada `idCanal` | Recibido | HTTP |
|-----------|-------------------|----------|------|
| 1.1.7 | solo espacios (trim vacío) | **401** "Canal emisor no existe" | 200 |
| 1.1.8 | solo tab | **401** | 200 |
| 1.1.10 | espacio interno post-trim | **401** | 200 |
| 1.1.11 | símbolo `@` | **401** | 200 |
| 1.1.12 | paréntesis `(` | **401** | 200 |
| 1.1.13 | `¿` | **401** | 200 |
| 1.1.14 | comillas `"` | **401** | 200 |

**Contraste:** escenarios con formato válido pero canal inexistente (p. ej. `1.1.15` canal no existe) también dan 401 — el mismo código para **dos causas distintas** (formato inválido vs canal realmente ausente en catálogo).

---

## Comportamiento esperado

- **400** con mensaje de formato de canal cuando el valor no cumple reglas de formato (antes de consultar BD).
- **401** solo cuando el formato es válido pero el canal no está registrado.

---

## Por qué es hallazgo de producción (no ajuste de test)

1. **Validación preventiva** es mejor que consultar BD con valores mal formados.
2. **Contexto real:** ocurre cuando un cliente integra contra **Sandbox** o durante **certificación QA** — errores de desarrollo, no condiciones de negocio en producción (como "cuenta bloqueada").
3. **Diagnóstico:** 401 "no existe" confunde al integrador: parece que el canal no está dado de alta, cuando el problema es **formato inválido**.
4. **No es equivalente** a un error de negocio que sí puede ocurrir en prod en consultas reales.

---

## Decisión acordada (revisión escenario a escenario, jul-2026)

| Veredicto | Acción |
|-----------|--------|
| **PROD-MAL** | Documentar como mejora importante |
| **Test Newman** | Mantener esperado **400** — no alinear al 401 de prod |
| **Dev** | Corregir: validar formato de `idCanal` antes de lookup en BD |
| **Corrida prod** | Seguirá divergir hasta que prod real se corrija; es esperado |

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Newman por escenario | `Postman/generador/logs/historial/2026-07-13T03-16-37Z_prod_MATRIZ_completo_por-escenario.json` |
| Revisión acordada | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 1.1-B |
| Código prod | `produccion_real/tld-matriz/lambdas/tld-validador-validar/index.js` — `isValid` no cubre caracteres prohibidos / trim vacío con 400 |

---

## Mejora propuesta (dev → informe de mejoras)

- Endurecer `isValid` (o validación previa): rechazar caracteres no permitidos, trim vacío, espacios internos → **400** antes de `guardarTrace` y antes de lookup de canal.
- Mensaje claro de formato vs mensaje de canal inexistente (401).

---

## Relación con otros hallazgos

| ID | Relación |
|----|----------|
| HP-001 / HP-002 | Mismo campo `idCanal`; casos null/`""` → **550** (crash), no 401 |
| HP-005 | Tipos incorrectos (number/boolean/object) → **550**; también falta validación preventiva |
| HP-009 (este) | Formato inválido string → **401** en vez de 400 |

Los tres son la misma **línea de mejora**: validación de `idCanal` en frontera matriz.

---

## Referencias

- [`01-matriz-idCanal-null-vacio-responde-550.md`](01-matriz-idCanal-null-vacio-responde-550.md)
- [`04-matriz-isValid-sin-chequeo-tipo.md`](04-matriz-isValid-sin-chequeo-tipo.md)
- [`../hallazgos-desarrollo/02-matriz-bugs-heredados-pendientes.md`](../hallazgos-desarrollo/02-matriz-bugs-heredados-pendientes.md)
