# Flujo de trabajo y anotaciones

## Propósito del flujo

1. Generar la tabla (MD → luego HTML) **solo con diferencias**, una fila por **escenario**.
2. Revisar **caso a caso** (humano): esperado / prod / dev.
3. Dejar **veredicto + notas** por escenario (lo que se va a decirle a QA).
4. Poder **volver a generar** la tabla cuando lleguen nuevos Newman **sin perder** esas notas.

---

## Artefactos (propuesta)

| Archivo | Rol | Quién escribe |
|---------|-----|----------------|
| `vcn/tabla-diferencias.md` (luego `.html`) | Vista generada | Script |
| `vcn/anotaciones.json` | Sidecar durable | Humano (y/o script al editar) |
| Insumos Newman | `historial/..._prod_..._por-escenario.json` + `..._dev_...` | Máquina VPN |

Clave de anotación:

```text
{ "suite": "vcn", "nombre": "<nombre exacto Postman>" }
```

Campos sugeridos del sidecar:

```json
{
  "suite": "vcn",
  "nivelEjecucion": "MATRIZ",
  "actualizado": "2026-07-14",
  "items": {
    "1.1.1. idCanal — propiedad ausente (undefined) (400)": {
      "veredicto": "PROD-MAL",
      "notas": "Texto que explicamos a QA…",
      "refs": ["HP-016"],
      "conforme": false
    }
  }
}
```

`conforme: true` = ya cerramos ese escenario para el relato del cambio (no implica que “no hay diferencia”; implica “ya lo entendimos y documentamos”).

---

## Ciclo

```text
Newman prod + Newman dev (mismo nivel)
        │
        ▼
  Generador super-tabla (solo diferencias, colapso por nombre)
        │
        ├─► tabla-diferencias.md  ←─ inyecta anotaciones.json si existe
        │
        ▼
  Revisión humana (este escenario / este mensaje a QA)
        │
        ▼
  Actualizar anotaciones.json (veredicto, notas, conforme)
        │
        ▼
  Regenerar tabla (mismas o nuevas capturas) → notas se reinyectan
```

---

## Qué se le dice a QA (patrón de fila)

Para cada diferencia:

1. **Escenario:** nombre.
2. **Esperado (plan de pruebas):** código / mensaje.
3. **Prod hoy:** código + forma + texto observados.
4. **Dev con el cambio:** código + forma + texto observados.
5. **Qué implica el cambio:** una frase (de `notas` / veredicto).

Eso es el “valor contundente”. Un % de coincidencia es **opcional** al pie; no es el argumento.

---

## Markdown primero, HTML después

| Fase | Formato | Motivo |
|------|---------|--------|
| v1 | Markdown | Diff en git, review en PR, agente y scripts cómodos |
| v2 | HTML | Lectura humana / QA: **un bloque por escenario**, payloads con Prism (`vendor/prism/`), índice con anclas |

El HTML se genera **desde los mismos datos + mismo sidecar**; no es una segunda fuente de verdad.

---

## Relación con docs 12 / 13

Las revisiones VCN/P2P ya tienen veredictos por escenario único. Al anotar:

- Reutilizar **TEST-MAL / PROD-MAL / N/A mejora dev** cuando apliquen.
- Enlazar HP-xxx en `refs`.
- No duplicar el análisis largo en la celda: un resumen + link.
