# Iteración 03 — prod-a-dev vía VALIDADOR directo (VCN completo)

**Fecha del run:** 2026-07-12T21:46:59Z (UTC)
**Commit logs:** `second-brain` `c102333` — `node run-newman.js vcn --codigo-fuente prod --nota "prod-a-dev rama prod-a-dev"`
**Cambio respecto a iteración 02:** `NIVEL_EJECUCION=VALIDADOR` (commit `0955988`). La colección resuelve
`END_POINT_TLD` → `END_POINT_TLD_VALIDADOR` (`https://tld-api-validador.dev.telered.internal/validar`).
**No pasa por matriz** (sin token/auth matriz).

**Artefactos en historial (commiteados en `c102333`, no se sobrescriben):**

- `logs/historial/vcn/2026-07-12T21-46-59Z_prod_VALIDADOR_completo_por-escenario.json`
- `logs/historial/vcn/2026-07-12T21-46-59Z_prod_VALIDADOR_completo_por-escenario.md`
- (+ `completo.json` / `.md` hermanos)

---

## RESPUESTAS RÁPIDAS (no re-estudiar)

Fuente: [`resumen-2026-07-12c-prod-VALIDADOR.md`](./resumen-2026-07-12c-prod-VALIDADOR.md).

| Pregunta | Respuesta |
|----------|-----------|
| ¿Algún camino feliz dio respuesta positiva? | **SÍ (150 de 150)** |
| ¿Alguna respuesta positiva en todo el run? | **SÍ (735 de 947)** |
| ¿Algún assert en verde? | **SÍ (732)** |
| codigoError dominante | **`null`** (68,6 %) |
| ¿HTTP siempre 200? | **SÍ** |
| Escenarios únicos con **550** | **0** |
| Veredicto | **Sin anomalías críticas** |

Banderas automáticas: **ninguna**.

---

## Números vs iteración 02 (MATRIZ, mismo día post-fix)

| Métrica | Iter 02 MATRIZ (`21-08`) | Iter 03 VALIDADOR (`21-46`) |
|---------|--------------------------|-----------------------------|
| Ejecuciones | 1263 | **947** (menos: sin pasos token/auth matriz) |
| Caminos felices positivos | 150 / 150 | **150 / 150** |
| Respuestas positivas | 876 | **735** |
| Asserts verdes | 868 | **732** |
| Escenarios únicos con **550** | **6** | **0** |
| `Metodo/0001` con 550 | 0 | 0 |

---

## Hallazgo cruzado con iteración 02 (los 6 escenarios)

Los **6 escenarios únicos con 550** que aparecían solo en la ruta **MATRIZ** (iter 02) **desaparecen**
en VALIDADOR directo (0×550). Comparación escenario a escenario (mismo input, distinta ruta):

| Escenario (nombre en colección) | MATRIZ (`21-08`) | VALIDADOR directo (`21-46`) |
|--------------------------------|------------------|----------------------------|
| `0.1. body — JSON HTTP inválido (400)` | **550** | `null` |
| `1.1.2. idCanal — null (400)` | **550** | **400** |
| `1.1.3. idCanal — string vacío "" (400)` | **550** | **400** |
| `1.1.4. idCanal — tipo number (400)` | **550** | 401 |
| `1.1.5. idCanal — tipo boolean (400)` | **550** | 401 |
| `1.1.6. idCanal — tipo object (400)` | **550** | 401 |

**Conclusión factual:** en el flujo real del cliente (**Matriz → Validador → VCN**), esos 6 escenarios
**no se comportan como las pruebas planificaron** (esperaban códigos de validación; matriz devuelve **550**
`Error inesperado`). La discrepancia está en la **capa Matriz**, no en validador ni VCN para estos casos.

**Precisión honesta:** VALIDADOR directo tampoco reproduce el 400 planificado en los 6 de forma uniforme
(solo `null` y `vacío` dan 400; tipos incorrectos dan 401; JSON inválido da `null`). Eso es dato del
validador, no de matriz. Ver análisis ampliado en
[`07-matriz-validacion-cuerpo-json.md`](../07-matriz-validacion-cuerpo-json.md).

---

## Reproducir análisis

```powershell
cd Postman\comparar-prod-vs-dev\recopilacion
node analizar-por-escenario.js ..\..\generador\logs\historial\vcn\2026-07-12T21-46-59Z_prod_VALIDADOR_completo_por-escenario.json --salida resumen-2026-07-12c-prod-VALIDADOR.json
```
