# Esperado vs recibido — prod-a-dev (código prod, asserts alineados a dev)

**Qué mide esto:** cruza cada ejecución Newman con lo **esperado** por el JSON fuente
(`Postman/generador/VCN Escenarios error/`) y lo compara con lo **recibido** en el cuerpo descifrado.
Se comparan **dos dimensiones distintas**, que NO son lo mismo (ver [`10-http-vs-codigoerror.md`](./10-http-vs-codigoerror.md)):

- **NEGOCIO** = código de negocio del payload. Para `general` es `codigoError`; para `parametro`/`metodo`/`exito`
  es `respuestas[0].resultado`. Este es el campo correcto para juzgar el resultado de negocio.
- **HTTP** = status de protocolo devuelto por la lambda.

**Script:** [`recopilacion/comparar-esperado-vs-recibido.js`](./recopilacion/comparar-esperado-vs-recibido.js)
(usa `recibidoNegocio` de los runs enriquecidos).

---

## ⚠ CORRECCIÓN respecto a la versión anterior de este doc

La versión previa reportaba **≈43 % de ejecuciones divergentes (539/1263)** y pares como `413→null` y
`510–515→null`. **Eso estaba MAL**: comparaba solo `codigoError` (que es `null` en los escenarios
`parametro`/`metodo`/`exito`, cuyo resultado va en `respuestas[0].resultado`). Al leer el campo correcto:

- El bloque **510–515 SÍ coincide** con lo esperado (prod devuelve `resultado: 510..515` en `respuestas[0]`).
- El bloque **413** en su mayoría coincide; solo difiere en variantes puntuales (413→999, 413→509).
- Las diferencias reales de negocio bajan de **539 a 279 ejecuciones** en MATRIZ, y `Metodo/0001` pasa de
  **288 a 28** ejecuciones divergentes.

Corregido en `comparar-esperado-vs-recibido.js` (campo `recibidoNegocio`) y en `run-newman.js`
(ahora captura `respuestas[0].resultado`). Runs regenerados con `regenerar-por-escenario.js`.

---

## RESPUESTAS RÁPIDAS (no re-estudiar) — dimensión NEGOCIO

| Pregunta | MATRIZ (iter 02) | VALIDADOR directo (iter 03) |
|----------|------------------|----------------------------|
| Ejecuciones que **coinciden** con lo esperado | **984 / 1263** (77,9 %) | **741 / 947** (78,2 %) |
| Ejecuciones que **difieren** | **279** (**22,1 %**) | **206** (**21,8 %**) |
| **Escenarios únicos** con al menos un run distinto | **70 / 316** | **69 / 316** |
| ¿Caminos felices (150 exec) coinciden? | **Sí** | **Sí** |
| ¿El desvío es solo de matriz? | **No** — VALIDADOR directo difiere en orden similar | Mismo orden |

**Artefactos:** [`esperado-vs-recibido-02-MATRIZ.md`](./recopilacion/esperado-vs-recibido-02-MATRIZ.md) ·
[`esperado-vs-recibido-03-VALIDADOR.md`](./recopilacion/esperado-vs-recibido-03-VALIDADOR.md) ·
tabla escenario a escenario: [`TABLA-diferencias-esperado-matriz-validador.md`](./recopilacion/TABLA-diferencias-esperado-matriz-validador.md).

---

## RESPUESTAS RÁPIDAS — dimensión HTTP (protocolo)

| Pregunta | MATRIZ | VALIDADOR directo |
|----------|--------|-------------------|
| ¿La lambda devuelve el HTTP esperado? | **NO**: aplana **todo a HTTP 200** | Parcial: devuelve 400/502 en varios casos |
| Ejecuciones con HTTP real ≠ esperado | **367 / 1263** (29,1 %) | **98 / 947** (10,3 %) |
| ¿HTTP refleja el error? | **No** — el error va en el body (`codigoError`), no en el status | Más fiel al plan |

**Implicación:** por MATRIZ **nunca** verás un HTTP 4xx/5xx aunque el negocio falle. Las pruebas que
asertan `expectedHttpStatus != 200` fallan por diseño de la capa matriz, no por el negocio. Detalle en
[`10-http-vs-codigoerror.md`](./10-http-vs-codigoerror.md).

---

## Por bloque de ruta — NEGOCIO (ejecuciones que difieren)

### MATRIZ (iter 02)

| Bloque | Total ejec. | Coinciden | **Difieren** | % difiere |
|--------|-------------|-----------|--------------|-----------|
| `General/0_jsonEntrada` | 3 | 0 | **3** | 100 % |
| `General/1_validaciones_js` | 304 | 80 | **224** | 73,7 % |
| `General/2_reglaNegocio` | 60 | 36 | **24** | 40 % |
| `Metodo/0001` | 896 | 868 | **28** | 3,1 % |

**Lectura:** el desvío de negocio se concentra en **`General/`** (validaciones de entrada `idCanal`/`validador`
y reglas JS). `Metodo/0001` (integración) casi todo coincide (868/896).

---

## Patrones recurrentes NEGOCIO (top pares esperado → recibido, solo diferencias) — MATRIZ

| Esperado → Recibido | Ejec. | Interpretación breve |
|---------------------|-------|----------------------|
| 400 → 404 | 44 | Se esperaba 400 (formato); prod devuelve **404** |
| 431 → 509 | 44 | Se esperaba 431; prod devuelve **509** |
| 400 → 405 | 40 | Se esperaba 400; prod devuelve **405** |
| 431 → 404 | 40 | Se esperaba 431; prod devuelve **404** |
| 400 → 401 | 28 | Se esperaba 400; prod devuelve **401** |
| 400 → 550 | 23 | **Solo matriz** — la capa matriz enmascara como 550 (ver doc 07) |
| 403 → 509 | 8 | |
| 418 → 509 | 8 | |
| 413 → 999 | 8 | Se esperaba 413; prod devuelve **999** |
| 599 → null | 8 | Se esperaba timeout 599; prod no timeoutea |
| 509 → 406 | 8 | |

En **VALIDADOR directo** dominan los mismos pares (400→401/404/405, 431→509/404); **desaparece** el
par 400→550 (0 en iter 03, es exclusivo de la capa matriz).

---

## Qué implica para la comparación prod vs dev

1. El desvío real de **negocio** es ~**22 %** (no 43 %), concentrado en validaciones `General/`.
2. Hay **dos capas** de desvío que no hay que mezclar:
   - **HTTP**: matriz aplana a 200 (problema de contrato de protocolo).
   - **NEGOCIO**: códigos de error distintos a lo planificado en dev.
3. **No tocar los esperados** todavía. Primero se corre `--codigo-fuente dev` (mismo nivel) y se compara
   **prod recibido vs dev recibido** con `comparar-runs.js` / la tabla de 3 columnas, revisando uno a uno.
4. Falta capturar **VCN directo** (aísla la capa matriz) y contrastar contra **Marketplace** si aplica.

---

## Reproducir

```powershell
cd Postman\comparar-prod-vs-dev\recopilacion
# 1) (runs viejos) enriquecer desde el completo.json con HTTP real:
node regenerar-por-escenario.js ..\..\generador\logs\historial\vcn\<run>_completo.json prod MATRIZ enriquecido-<id>_por-escenario.json
# 2) esperado vs recibido (negocio):
node comparar-esperado-vs-recibido.js enriquecido-<id>_por-escenario.json --salida esperado-vs-recibido-<id>.json
```

Los runs **nuevos** ya salen enriquecidos directamente de `run-newman.js` (paso 1 innecesario).
El JSON de salida incluye `escenariosConDiferencias[]` por escenario único para consultas puntuales.
