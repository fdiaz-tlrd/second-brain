# Iteración 02 — prod-a-dev vía MATRIZ tras fix `ValidadorUrl` (VCN completo)

**Fecha del run:** 2026-07-12T21:08:09Z (UTC)
**Commit logs:** `second-brain` `c9e0171` — `node run-newman.js vcn --codigo-fuente prod --nota "prod-a-dev rama prod-a-dev"`
**Cambio respecto a iteración 01:** despliegue de `tld-matriz` `prod-a-dev` con `ValidadorUrl` corregido (`3f072d6`): de API Gateway (`txjhoqn5k3.execute-api...`) a URL interna dev (`tld-api-validador.dev.telered.internal`).

---

## RESPUESTAS RÁPIDAS (no re-estudiar)

Precomputadas por `analizar-por-escenario.js`. Fuente: [`resumen-2026-07-12b-prod-MATRIZ-postfix.md`](./resumen-2026-07-12b-prod-MATRIZ-postfix.md).

| Pregunta | Respuesta |
|----------|-----------|
| ¿Algún camino feliz dio respuesta positiva? | **SÍ (150 de 150)** |
| ¿Alguna respuesta positiva en todo el run? | **SÍ (876 de 1263)** |
| ¿Algún assert en verde? | **SÍ (868)** |
| codigoError dominante | **`null`** (sin error, 68,7 %) |
| ¿HTTP siempre 200? | **SÍ** |
| Veredicto | **Sin anomalías críticas** |

Banderas automáticas: **ninguna**.

---

## Antes vs después del fix `ValidadorUrl`

| Métrica | Iteración 01 (`17-20`, URL mala) | Iteración 02 (`21-08`, URL corregida) |
|---------|----------------------------------|----------------------------------------|
| Caminos felices positivos | **0 / 150** | **150 / 150** |
| Respuestas positivas (total) | **0 / 1263** | **876 / 1263** |
| Asserts en verde | **0** | **868** |
| codigoError dominante | **550** (98,4 %) | **`null`** (68,7 %) |
| `Metodo/0001` con 550 | **896 / 896** | **0 / 896** |
| Escenarios únicos con 550 | **311 / 316** | **6 / 316** |
| Banderas críticas | 6 | 0 |

**Causa confirmada (por el usuario):** `tld-matriz` llamaba al validador por la URL del **API Gateway** en vez de la **URL interna dev**. La llamada fallaba y la cadena devolvía `550 "Error inesperado"` de forma masiva. Corregida la URL base (`tld-api-validador.dev.telered.internal`, la lambda le añade `/validar`), la cadena matriz → validador → VCN responde negocio y los caminos felices pasan.

---

## Distribución de `codigoError` (variedad esperada)

Ya no domina el 550 comodín; aparecen los códigos por escenario de error:

`null×868, 404×88, 400×68, 405×68, 509×64, 401×32, 550×23, 406×16, 425×16, 999×12`

### Por bloque de ruta

| Bloque | Total | 550 | 400 | otro |
|--------|-------|-----|-----|------|
| `Metodo/0001` | 896 | 0 | 0 | 896 |
| `General/1_validaciones_js` | 304 | 20 | 68 | 216 |
| `General/2_reglaNegocio` | 60 | 0 | 0 | 60 |
| `General/0_jsonEntrada` | 3 | 3 | 0 | 0 |

---

## Residual (dato, no diagnóstico)

Quedan **6 escenarios únicos con 550** (23 ejecuciones). Ya **no es sistémico**. Patrón: todos son
escenarios que **esperaban 400** (input mal formado) pero la cadena devolvió **550**:

1. `General/0_jsonEntrada` → `0.1. body — JSON HTTP inválido (400)`
2. `General/1_validaciones_js/1_idCanal` → `1.1.2. idCanal — null (400)`
3. `General/1_validaciones_js/1_idCanal` → `1.1.3. idCanal — string vacío "" (400)`
4. `General/1_validaciones_js/1_idCanal` → `1.1.4. idCanal — tipo number (400)`
5. `General/1_validaciones_js/1_idCanal` → `1.1.5. idCanal — tipo boolean (400)`
6. `General/1_validaciones_js/1_idCanal` → `1.1.6. idCanal — tipo object (400)`

No se investiga aquí (el usuario maneja la causa); se deja enumerado por si se retoma.

---

## Reproducir análisis

```powershell
cd Postman\comparar-prod-vs-dev\recopilacion
node analizar-por-escenario.js ..\..\generador\logs\historial\vcn\2026-07-12T21-08-09Z_prod_MATRIZ_completo_por-escenario.json --salida resumen-2026-07-12b-prod-MATRIZ-postfix.json
```

Artefactos: [`resumen-2026-07-12b-prod-MATRIZ-postfix.json`](./resumen-2026-07-12b-prod-MATRIZ-postfix.json) / [`.md`](./resumen-2026-07-12b-prod-MATRIZ-postfix.md).
