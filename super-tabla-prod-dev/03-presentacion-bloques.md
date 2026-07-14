# Presentación: bloques por escenario (no una mega-tabla)

## Opinión / decisión (2026-07-14)

Una sola tabla con todas las diferencias es **abrumadora** para el uso real: revisar y explicar **caso a caso**, comparando **payloads**.

**Formato de vista:** secuencia de **bloques**, uno por escenario (solo los que tienen diferencia). Cada bloque es una “ficha” para hablar con QA.

La “super tabla” sigue siendo el **modelo de datos** (columnas/campos de `01-columnas.md`); la **UI** no tiene por qué ser una `<table>` gigante.

---

## Estructura de un bloque (borrador)

```text
### N. <nombre del escenario>
Meta: tipo | nivel | variantes: N | etiquetas esp≠prod / prod≠dev / …
HTTP: esperado … | prod 200 | dev 200   ← visual; en MATRIZ suele ser 200=200

|          | Esperado     | Prod              | Dev               |
| Negocio  | código Y     | código / forma    | código / forma    |
| Texto    | (catálogo)   | presentacion…     | presentacion…     |

Payload request (claro) — opcional / colapsable
Payload respuesta prod          | Payload respuesta dev
<pre><code class="language-json">…</code></pre>   (Prism)

Observaciones (sidecar): veredicto | notas | conforme | refs
```

En **HTML**: dos columnas lado a lado (prod | dev) con JSON resaltado; en **MD**: secciones apiladas o tablas cortas + fences `json`.

Índice al inicio del documento (lista de nombres / anclas) para saltar de un escenario a otro — sin perder el ritmo “uno por uno”.

---

## Prism (vendor local)

Descargado en `vendor/prism/` (sin CDN en runtime):

| Archivo | Uso |
|---------|-----|
| `prism.min.js` | core |
| `prism-json.min.js` | lenguaje JSON |
| `prism.min.css` | tema claro |

El HTML generado enlaza rutas relativas a esos archivos para que Lenovo y VPN vean igual sin red.

---

## Qué no cambia

- Solo **diferencias**.
- Una ficha = un **escenario** (`nombre`), variantes de cifrado colapsadas.
- Anotaciones en sidecar reinyectables.
- MD primero; HTML después (donde Prism aporta).
