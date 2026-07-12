# 01 — Salida por escenario

## Qué hay hoy

`run-newman.js` genera, tras cada run:

| Archivo | Contenido | Limitación para esta idea |
|---------|-----------|---------------------------|
| `logs/ultimo-run-<suite>.json` | Reporte JSON completo de Newman | Tiene **todo**, pero es enorme y no legible a simple vista |
| `logs/resumen-fallos-<suite>.md` | Markdown **solo de fallos** | No lista los escenarios que pasaron; no sirve para comparar todo |
| `logs/registro-<suite>.md` | Tabla de últimas 8 ejecuciones | Nivel run, no nivel escenario |
| `logs/historial/<suite>/` | Copia archivada por run | Igual: solo fallos en el `.md` |

**La respuesta de cada escenario ya está** en `ultimo-run-<suite>.json`, dentro de `run.executions[]`. Lo que falta es **extraerla a una salida por escenario** (todos, no solo fallos) y **etiquetarla** con la versión de código.

---

## De dónde sale cada dato

Por cada escenario, Newman deja en `run.executions[]` (esto ya lo usa `buildResumenMarkdown`):

| Dato | Fuente en el JSON de Newman |
|------|-----------------------------|
| Nombre del escenario | `execution.item.name` |
| Carpeta / ruta | `execution.item` + jerarquía (o `failure.parent.name` en fallos) |
| HTTP de la respuesta final (descifrar) | `execution.response.code` |
| Cuerpo de la respuesta | `execution.response.stream` (Buffer → texto; ya hay `readStreamBody`) |
| ¿Pasó el assert? | `execution.assertions[]` (cada uno con `.error` si falló) |

Del **cuerpo descifrado** se extrae, cuando exista:

- `codigoError` y `mensajeError` (camino de error)
- `respuesta` / `resultado` (camino de éxito)

> Nota de flujo: cada escenario es **un request** en Postman, pero el pre-request de raíz orquesta cifrar → matriz → descifrar. La respuesta que se captura es la **final (descifrar)**, que es la que trae el cuerpo de negocio. Ver [`../generador/estudio-generador.md`](../generador/estudio-generador.md).

### Valor esperado (opcional)

Los escenarios fuente traen `expectedHttpStatus`, `expectedCodigoError`, `expectedTipo` (ej. `VCN Escenarios error/.../1.599_demora_validador.json`). Es **opcional** cruzarlos:

- Para **comparar prod vs dev**, lo central es la **respuesta recibida**, no el esperado (el esperado está alineado a dev y "fallará" con código prod, que es justo lo que queremos ver).
- Si se quiere mostrar esperado vs recibido, se cruza por nombre de escenario contra el archivo fuente. Secundario, no bloqueante.

---

## Salidas nuevas (propuesta)

Additivo. Junto a los archivos actuales:

### 1. `logs/resultados-por-escenario-<suite>.json`

Una fila por escenario, apto para diff automático:

```json
{
  "suite": "vcn",
  "fecha": "2026-07-10T...Z",
  "codigoFuente": "prod",
  "nivelEjecucion": "MATRIZ",
  "folder": "Metodo/0001/5_fallosIntegracionValidador",
  "nota": "post-deploy prod tld-validador-api-main",
  "escenarios": [
    {
      "nombre": "0001.5.1022.1. validador ... demora validador (599)",
      "ruta": "Metodo/0001/5_fallosIntegracionValidador/1022_fijo",
      "httpDescifrar": 200,
      "codigoError": 599,
      "mensajeError": "…",
      "assertPaso": false,
      "body": "{ … cuerpo completo, sin truncar … }"
    }
  ]
}
```

> **Truncado:** el JSON por escenario guarda el **cuerpo completo** (es la evidencia del informe futuro). El truncado a `MAX_BODY` (4000) queda solo para el `.md` legible. Ver [`04-informe-y-recopilacion.md`](04-informe-y-recopilacion.md).

### 2. `logs/resultados-por-escenario-<suite>.md`

La misma información en tabla legible:

| Escenario | HTTP | codigoError | assert | Cuerpo (resumen) |
|-----------|------|-------------|--------|------------------|
| …599 demora | 200 | 599 | ✗ | `{codigoError:599,…}` |

Encabezado con: suite, fecha, **código fuente (prod/dev)**, carpeta, nota.

### 3. Historial y registro

- Archivar `resultados-por-escenario-<suite>.json/.md` en `historial/<suite>/` con el mismo timestamp del run **y la etiqueta de código** en el nombre (ver doc 02).
- Añadir columna **Código** a `registro-<suite>.md`.

---

## Qué NO cambiar

- No quitar ni alterar `resumen-fallos-*` ni `ultimo-run-*`; se suman salidas, no se reemplazan.
- No cambiar el criterio de éxito/fallo de Newman ni el exit code (los escenarios que "fallan" con código prod son parte del experimento, no un bug del script).
- No tocar los escenarios fuente ni el ensamblador para esto.
