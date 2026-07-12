# Esperado vs recibido — prod-a-dev (código prod, asserts alineados a dev)

**Qué mide esto:** cruza cada ejecución Newman con el **`expectedCodigoError`** del JSON fuente
(`Postman/generador/VCN Escenarios error/`) y compara con el **`codigoError` recibido** en el cuerpo
descifrado. Los escenarios y asserts fueron **diseñados para dev**; correr **código prod** en dev
produce un volumen grande de diferencias — eso es el dato central, no solo los 6×550 de matriz.

**Script:** [`recopilacion/comparar-esperado-vs-recibido.js`](./recopilacion/comparar-esperado-vs-recibido.js)

**Runs analizados (prod-a-dev, jul-2026):**

| Run | Nivel | Archivo historial | Resumen |
|-----|-------|-------------------|---------|
| Iter 02 | MATRIZ | `2026-07-12T21-08-09Z_prod_MATRIZ_completo_por-escenario.json` | [`esperado-vs-recibido-02-MATRIZ.md`](./recopilacion/esperado-vs-recibido-02-MATRIZ.md) |
| Iter 03 | VALIDADOR | `2026-07-12T21-46-59Z_prod_VALIDADOR_completo_por-escenario.json` | [`esperado-vs-recibido-03-VALIDADOR.md`](./recopilacion/esperado-vs-recibido-03-VALIDADOR.md) |

---

## RESPUESTAS RÁPIDAS (no re-estudiar)

| Pregunta | MATRIZ (iter 02) | VALIDADOR directo (iter 03) |
|----------|------------------|----------------------------|
| ¿Cuántas **ejecuciones** coinciden con lo esperado? | **724 / 1263** (57,3 %) | **546 / 947** (57,7 %) |
| ¿Cuántas **ejecuciones** difieren? | **539** (**42,7 %**) | **401** (**42,3 %**) |
| ¿Cuántos **escenarios únicos** tienen al menos un run distinto? | **135 / 316** (42,7 %) | **134 / 316** (42,4 %) |
| ¿Caminos felices (150) coinciden con lo esperado? | **Sí** (150/150 positivos) | **Sí** (150/150) |
| ¿El problema es solo matriz? | **No** — ~43 % difiere también en VALIDADOR directo | Mismo orden de magnitud |

**Conclusión:** hay un **montón de diferencias** entre lo planificado en pruebas (dev) y lo que devuelve
**código prod**, aun con la infra respondiendo bien. Los 6 escenarios 550 de matriz son **una fracción**
(23 ejecuciones de 539 que difieren en MATRIZ). Ver [`07-matriz-validacion-cuerpo-json.md`](./07-matriz-validacion-cuerpo-json.md) solo para ese subconjunto.

---

## Por bloque de ruta (ejecuciones que difieren)

### MATRIZ (iter 02)

| Bloque | Total ejec. | Coinciden | **Difieren** | % difiere |
|--------|-------------|-----------|--------------|-----------|
| `General/0_jsonEntrada` | 3 | 0 | **3** | 100 % |
| `General/1_validaciones_js` | 304 | 80 | **224** | 73,7 % |
| `General/2_reglaNegocio` | 60 | 36 | **24** | 40 % |
| `Metodo/0001` | 896 | 608 | **288** | 32,1 % |

### VALIDADOR directo (iter 03)

| Bloque | Total ejec. | Coinciden | **Difieren** |
|--------|-------------|-----------|--------------|
| `General/0_jsonEntrada` | 2 | 0 | **2** |
| `General/1_validaciones_js` | 228 | 56 | **172** |
| `General/2_reglaNegocio` | 45 | 27 | **18** |
| `Metodo/0001` | 672 | 463 | **209** |

**Lectura:** las mayores tasas de desvío están en **`General/`** (validaciones de entrada y reglas JS),
no solo en integración. `Metodo/0001` también tiene cientos de ejecuciones distintas al plan.

---

## Patrones recurrentes (top pares esperado → recibido)

Solo ejecuciones que **no** coinciden. Los más frecuentes en **MATRIZ**:

| Esperado → Recibido | Ejecuciones | Interpretación breve |
|---------------------|-------------|----------------------|
| **413 → null** | 68 | Se esperaba error 413; prod respondió **éxito** (sin codigoError) |
| **400 → 404** | 44 | Se esperaba 400 formato; prod devuelve **404** |
| **431 → 509** | 44 | Se esperaba 431; prod devuelve **509** |
| **400 → 405** | 40 | Se esperaba 400; prod devuelve **405** |
| **431 → 404** | 40 | Se esperaba 431; prod devuelve **404** |
| **510–515 → null** | 32 c/u | Se esperaban errores de integración QA; prod devuelve **éxito** |
| **400 → 401** | 28 | Se esperaba 400; prod devuelve **401** |
| **400 → 550** | 23 | Solo matriz — capa matriz enmascara como 550 (ver doc 07) |
| **599 → null** | 8 | Se esperaba timeout 599; prod **no** timeoutea (éxito) |
| **509 → 406** | 8 | Se esperaba 509; prod devuelve **406** |

En **VALIDADOR directo** los mismos patrones dominan (413→null, 400→401/404/405, 431→509/404,
510–515→null); **desaparece** el par 400→550 (0 en iter 03).

---

## Qué implica para la comparación prod vs dev

1. **Recopilar prod ya mostró divergencia masiva** respecto al plan de pruebas (≈43 % de ejecuciones).
   Eso es **esperable** si dev cambió contratos, códigos de error, mensajes o reglas — justo lo que
   esta herramienta debe dejar escrito.
2. **No confundir** “infra rota” (iter 01, 550 sistémico) con “prod ≠ dev en negocio” (iter 02/03).
3. **Matriz añade** un subconjunto propio (550 en 6 escenarios, validación `isValid`) encima del
   desvío prod/dev general.
4. **Siguiente paso acordado:** run `--codigo-fuente dev` con mismo `NIVEL_EJECUCION` y
   `comparar-runs.js` — ahí se verá escenario a escenario **prod recibido vs dev recibido**, no solo
   vs esperado.

---

## Reproducir

```powershell
cd Postman\comparar-prod-vs-dev\recopilacion
node comparar-esperado-vs-recibido.js ..\..\generador\logs\historial\vcn\<run>_por-escenario.json --salida esperado-vs-recibido-<id>.json
```

El JSON incluye `escenariosConDiferencias[]` (por escenario único: cuántas ejecuciones difieren y
distribución de `codigoError` recibidos) para consultas puntuales sin re-parsear el historial.
