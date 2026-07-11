# 03 — Plan de implementación

Cambios en [`../generador/run-newman.js`](../generador/run-newman.js). Todo **aditivo**: no romper el flujo actual.

> **Estado: IMPLEMENTADO** (2026-07-10). Pasos 1–3 en `run-newman.js` y paso 4 en `../generador/comparar-runs.js`. Falta un run real en la máquina VPN (una corrida prod, una dev) para validar de punta a punta. Chequeo de sintaxis (`node --check`) y prueba del diff con datos de ejemplo: OK. Este documento queda como referencia de qué se hizo.

---

## Paso 1 — Leer la etiqueta de código

En `parseArgs`:

- Añadir `--codigo-fuente <valor>` (igual que se lee `--nota`).
- Si no viene el flag, leer `process.env.NEWMAN_CODIGO_FUENTE`.
- Si ninguno: `codigoFuente = "desconocido"` + `console.warn` avisando que el informe no podrá distinguir prod/dev.

Propagar `codigoFuente` por la misma cadena que ya lleva `nota`: `runSuite` → `buildResumenMarkdown` / `archiveRun` / `updateRegistro`.

---

## Paso 2 — Construir el registro por escenario

Función nueva, ej. `buildResultadosPorEscenario(suiteKey, folder, summary, codigoFuente, nota)`:

- Recorrer `summary.run.executions[]`.
- Por ejecución:
  - `nombre = execution.item.name`
  - `httpDescifrar = execution.response?.code`
  - `body = readStreamBody(execution.response?.stream)` (ya existe)
  - Intentar `JSON.parse(body)` → extraer `codigoError`, `mensajeError`, o `respuesta`/`resultado` si es éxito.
  - `assertPaso = !(execution.assertions || []).some(a => a.error)`
  - `bodyTruncado = truncate(body, MAX_BODY)` (ya existe)
- Devolver objeto con `suite`, `fecha`, `codigoFuente`, `folder`, `nota`, `escenarios[]`.

Escribir:

- `logs/resultados-por-escenario-<suite>.json` (JSON.stringify del objeto).
- `logs/resultados-por-escenario-<suite>.md` (tabla + encabezado con `codigoFuente`).

Reutilizar helpers existentes: `readStreamBody`, `truncate`, `MAX_BODY`.

---

## Paso 3 — Etiquetar salidas existentes

- `buildResumenMarkdown`: añadir fila `| Código fuente | <codigoFuente> |` en la tabla de cabecera.
- `updateRegistro`: añadir columna **Código** (ajustar header y la fila; hoy las columnas son Fecha/Carpeta/Requests/Tests/Resultado/Historial/Nota).
- `archiveRun`: incluir `codigoFuente` en el `base` del nombre archivado y **también** copiar los nuevos `resultados-por-escenario-*` al historial.

Nota: al cambiar el header de `registro-<suite>.md`, las filas viejas quedan con una columna menos. Opciones: (a) dejarlas (se ven, solo sin dato de código), o (b) regenerar. Recomiendo **dejarlas**; no vale la pena reescribir historial.

---

## Paso 4 (fase 2, opcional) — Comparar dos runs

Script aparte, ej. `comparar-runs.js`:

```
node comparar-runs.js <resultados-prod.json> <resultados-dev.json>
```

- Emparejar escenarios por `nombre`.
- Marcar filas donde difieran `httpDescifrar`, `codigoError` o el cuerpo.
- **Normalizar/ignorar campos volátiles** (`{{$timestamp}}`, tokens, fechas, `x-amzn-*`): si no, aparecen "diferencias" que no lo son. Ver [`04-informe-y-recopilacion.md`](04-informe-y-recopilacion.md).
- Salida: `logs/comparacion-<suite>-prod-vs-dev.md` con solo las diferencias (y conteo de iguales).

Este script produce una lista de **diferencias candidatas** — es **insumo** para el informe, **no** el informe. Qué diferencia es relevante y cómo se justifica es criterio humano (fase 2). Responde a "¿dónde miro?", no a "¿qué significa?".

---

## Orden sugerido

1. Pasos 1–3 (etiqueta + salida por escenario). Ya deja evidencia comparable manualmente.
2. Validar con un run real en la máquina VPN (una corrida prod, una dev).
3. Paso 4 (script de diff) cuando haya dos JSON reales que comparar.

---

## Checklist de "no romper"

- [ ] `node run-newman.js vcn` sin flags nuevos sigue funcionando igual (código = `desconocido`, con aviso).
- [ ] `resumen-fallos-*` y `ultimo-run-*` conservan su formato.
- [ ] Exit code de Newman sin cambios (fallos de assert con código prod son esperados, no deben "arreglarse").
- [ ] Nada de esto ejecuta Newman desde Lenovo; lo corre el usuario con VPN y commitea `logs/`.
