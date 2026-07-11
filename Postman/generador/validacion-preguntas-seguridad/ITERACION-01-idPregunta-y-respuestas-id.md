# Iteración 01 — `idPregunta` y `respuestas[].id`

**Fecha:** 2026-07-11

---

## Respuesta a la pregunta: ¿solo alfanumérico?

**Antes de esta iteración: no.**  
`validarIdPreguntasUsuario` y el `id` dentro de `validarRespuestas` solo comprobaban:

- requerido (no `null` / `undefined` / `""`)
- tipo `string`
- no vacío tras `.trim()` (solo espacios → error)

**No había regex.** Cualquier string no vacío — incluido `preg@unta`, `0_1`, `pregunta01` — pasaba la capa JS.

Los escenarios **3.7** y **3.8** (`@`, espacio interno) esperaban **428**, pero con el código anterior **no fallaban en validaciones.js**; seguían hacia la API de preguntas (posible **420**).

---

## Modelo de negocio (coherente)

Tu explicación es **coherente**:

1. **0005** devuelve el catálogo fijo del sistema (`id` `01` … `15`, extensible).
2. **0006** el usuario elige preguntas de ese catálogo y envía `respuestas: [{ id, texto }, …]` (2 elementos por CFG).
3. **0004** valida una respuesta contra un `idPregunta` ya asociado al usuario.

Hay **dos capas** de validación:

| Capa | Qué valida | Código típico |
|------|------------|---------------|
| **JS** (`validaciones.js`) | Formato del `id` | **428** (`idPregunta`) / **455** (`respuestas[].id`) |
| **Negocio** (API preguntas) | `id` existe en catálogo, respuesta correcta | **420** |

Los escenarios en `1_validaciones_js` cubren la **capa JS**. Un `id` con formato `99` (válido como `01` pero inexistente) sería **420** en carpeta de regla de negocio, no aquí.

---

## Decisión: formato del `id`

Catálogo actual: **dos dígitos numéricos** (`01`–`15`).

Regex acordada:

```javascript
/^[0-9]{2}$/
```

- Rechaza caracteres especiales, letras, un solo dígito `1`, tres dígitos `001`, espacios al inicio/fin (sin trim en regex).
- **No** valida que el número esté en el rango 01–15 (eso es negocio / API).

Implementado en `tld-api-alias` → `validarIdPreguntasUsuario` y `validarRespuestas` (campo `id`).

---

## Escenarios nuevos

Generador: `ensamblador/generar-escenarios-preguntas-seguridad.js`

### `0004` / `3_idPregunta` (3.10–3.22)

Guion bajo, punto, barra, comillas, unicode, espacios, un dígito, tres dígitos, letras, tipos no string (array, boolean false).

### `0006` / `3_respuestas` (3.17–3.34)

Mismos casos sobre `respuestas[].id`; además `elemento null` en arreglo, `texto` solo espacios.

### Ajuste

**3.15** duplicado: ids cambiados a `01` / `01` (antes `pregunta01` / `PREGUNTA01`, incompatible con regex numérica).

---

## Pendiente

- Escenarios de **éxito** con ids `01`, `15` y borde `16` cuando exista en catálogo.
- Escenario **regla de negocio**: `idPregunta` `99` → **420** (fuera de `1_validaciones_js`).
