# Recopilación — comparar prod vs dev

Carpeta de **iteraciones de recopilación Newman**: cada run etiquetado (`codigoFuente` + `nivelEjecucion`) que alimenta el informe humano posterior.

| Archivo | Contenido |
|---------|-----------|
| [`ITERACION-01-prod-a-dev-MATRIZ-2026-07-12.md`](./ITERACION-01-prod-a-dev-MATRIZ-2026-07-12.md) | Run 01 (URL validador **mala**): 550 sistémico, 0 caminos felices. Empieza con **RESPUESTAS RÁPIDAS + banderas** |
| [`ITERACION-02-prod-a-dev-MATRIZ-postfix-2026-07-12.md`](./ITERACION-02-prod-a-dev-MATRIZ-postfix-2026-07-12.md) | Run 02 (URL validador **corregida** `3f072d6`): 150/150 caminos felices, 6×550 residual. Incluye **antes vs después** |
| [`ITERACION-03-prod-VALIDADOR-2026-07-12.md`](./ITERACION-03-prod-VALIDADOR-2026-07-12.md) | Run 03 (`NIVEL_EJECUCION=VALIDADOR`, `c102333`): 0×550; tabla cruzada de los 6 vs MATRIZ |
| [`../07-matriz-validacion-cuerpo-json.md`](../07-matriz-validacion-cuerpo-json.md) | **Conclusión:** 6 escenarios fuera de plan en flujo cliente; `isValid` en matriz; pregunta abierta |
| [`resumen-2026-07-12-prod-MATRIZ.json`](./resumen-2026-07-12-prod-MATRIZ.json) | Estadísticas machine-readable del run 01 (incluye `banderas` y `preguntasObvias`) |
| [`resumen-2026-07-12-prod-MATRIZ.md`](./resumen-2026-07-12-prod-MATRIZ.md) | Misma info en tabla legible (generada por el script) |
| [`resumen-2026-07-12b-prod-MATRIZ-postfix.json`](./resumen-2026-07-12b-prod-MATRIZ-postfix.json) / [`.md`](./resumen-2026-07-12b-prod-MATRIZ-postfix.md) | Estadísticas del run 02 (post-fix) |
| [`resumen-2026-07-12c-prod-VALIDADOR.json`](./resumen-2026-07-12c-prod-VALIDADOR.json) / [`.md`](./resumen-2026-07-12c-prod-VALIDADOR.md) | Estadísticas del run 03 (VALIDADOR directo) |
| [`../08-esperado-vs-recibido-prod.md`](../08-esperado-vs-recibido-prod.md) | **~43 %** ejecuciones prod ≠ esperado (plan dev); patrones por par codigoError |
| [`comparar-esperado-vs-recibido.js`](./comparar-esperado-vs-recibido.js) | Cruza run con JSON fuente (`expectedCodigoError` vs recibido) |
| [`esperado-vs-recibido-02-MATRIZ.json`](./esperado-vs-recibido-02-MATRIZ.json) / [`.md`](./esperado-vs-recibido-02-MATRIZ.md) | Iter 02 MATRIZ |
| [`esperado-vs-recibido-03-VALIDADOR.json`](./esperado-vs-recibido-03-VALIDADOR.json) / [`.md`](./esperado-vs-recibido-03-VALIDADOR.md) | Iter 03 VALIDADOR |
| [`comparar-3-columnas.js`](./comparar-3-columnas.js) | Une esperado + MATRIZ + VALIDADOR por escenario; tabla solo-diferencias |
| [`TABLA-diferencias-esperado-matriz-validador.md`](./TABLA-diferencias-esperado-matriz-validador.md) | **Tabla completa** (136 escenarios) — ver índice interpretado en [`../09-tabla-comparacion-escenarios.md`](../09-tabla-comparacion-escenarios.md) |

**Fuente de logs:** `Postman/generador/logs/historial/vcn/` (commiteados desde máquina VPN).

**Diseño general:** [`../README.md`](../README.md).

---

## Metodología del estudio (obligatoria en cada iteración)

El estudio **debe arrojar y dejar escritas** las respuestas obvias, para no re-estudiar ante preguntas básicas. `analizar-por-escenario.js` computa automáticamente:

- **`banderas`** — señales críticas/anomalías detectadas solas (0 positivas, 0 asserts verdes, dominancia de un `codigoError`, señal de despliegue, pista infra vs negocio).
- **`preguntasObvias`** — respuestas precomputadas a preguntas típicas (¿algún camino feliz positivo?, ¿HTTP siempre 200?, codigoError dominante, veredicto).

Ambas se imprimen en consola **antes** que cualquier volcado, van al `.json` y al `.md`, y se copian al inicio del documento de iteración bajo **"RESPUESTAS RÁPIDAS"**.

Uso:

```powershell
cd Postman\comparar-prod-vs-dev\recopilacion
node analizar-por-escenario.js <ruta-por-escenario.json> --salida resumen-<fecha>-<fuente>-<nivel>.json
```

Genera `.json` + `.md` hermanos. La regla: **si una pregunta es básica/obvia, la respuesta ya debe estar en `banderas`/`preguntasObvias`**; si falta, se agrega al script, no se responde ad-hoc.
