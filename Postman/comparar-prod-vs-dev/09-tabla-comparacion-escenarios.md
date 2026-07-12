# Comparación por escenario — esperado vs MATRIZ vs VALIDADOR

**Objetivo:** dejar escrita, escenario por escenario, la diferencia entre lo que el plan de pruebas
**esperaba** y lo que devolvió **código prod** por las dos rutas: `NIVEL_EJECUCION=MATRIZ` (flujo real
del cliente: Matriz→Validador→VCN) y `NIVEL_EJECUCION=VALIDADOR` (validador directo). **Solo diferencias.**

- **Tabla completa:** [`recopilacion/TABLA-diferencias-esperado-matriz-validador.md`](./recopilacion/TABLA-diferencias-esperado-matriz-validador.md) — ahora con **Tabla A (NEGOCIO)** y **Tabla B (HTTP)**.
- **Script:** [`recopilacion/comparar-3-columnas.js`](./recopilacion/comparar-3-columnas.js)
- **Runs:** MATRIZ `2026-07-12T21-08-09Z`, VALIDADOR `2026-07-12T21-46-59Z` (ambos prod-a-dev), enriquecidos con HTTP real.

**Leyenda:** `codigo×N` = ese código en N ejecuciones (variantes de cifrado por escenario).
`null` = respuesta sin error (éxito de negocio). MATRIZ corre 4 variantes, VALIDADOR 3.

---

## ⚠ CORRECCIÓN respecto a la versión anterior

La versión previa decía **136 escenarios divergentes** y un bloque **`510–515 → null` (~90 escenarios)**.
**Estaba MAL:** comparaba solo `codigoError` (null en `parametro`/`metodo`/`exito`, donde el resultado va
en `respuestas[0].resultado`). Con el campo correcto (`recibidoNegocio`):

- **510–515 SÍ coinciden** con lo esperado. No son diferencias.
- Las diferencias de **negocio** reales son **71 escenarios**, no 136.
- Se separó la dimensión **HTTP** (protocolo) de la dimensión **NEGOCIO** (payload).

---

## RESPUESTAS RÁPIDAS — NEGOCIO (payload)

| Pregunta | Respuesta |
|----------|-----------|
| Escenarios que difieren del plan (MATRIZ o VALIDADOR) | **71 / 316** |
| Difieren **MATRIZ ≠ VALIDADOR** entre sí | **8** |
| Difiere solo MATRIZ (validador ok) | 2 |
| Difiere solo VALIDADOR (matriz ok) | 1 |
| Difieren en ambos (mismo código erróneo) | 68 |

**Clave:** de 71 diferencias, **63 se comportan igual por matriz y por validador** (el desvío viene de
VCN/validador, no de la capa matriz). Solo en **8** la ruta importa.

## RESPUESTAS RÁPIDAS — HTTP (protocolo)

| Pregunta | Respuesta |
|----------|-----------|
| Escenarios con HTTP real ≠ esperado (alguna ruta) | **92** |
| ¿MATRIZ devuelve el HTTP esperado? | **NO** — aplana todo a 200 |
| ¿VALIDADOR devuelve el HTTP esperado? | Parcial (400/502 en varios) |

---

## Los 8 escenarios donde MATRIZ ≠ VALIDADOR (NEGOCIO — dependen de la ruta)

| Escenario | Esperado | MATRIZ | VALIDADOR | Lectura |
|-----------|----------|--------|-----------|---------|
| `General/0_jsonEntrada` · 0.1 body JSON HTTP inválido | 400 | **550** | **null** | Matriz revienta a 550; validador directo lo acepta (null) |
| `1_idCanal` · 1.1.2 idCanal null | 400 | **550** | **400** | Validador da el 400 esperado; matriz lo enmascara 550 |
| `1_idCanal` · 1.1.3 idCanal vacío `""` | 400 | **550** | **400** | Igual: validador acierta, matriz 550 |
| `1_idCanal` · 1.1.4 idCanal number | 400 | **550** | **401** | Matriz 550; validador 401 (no 400) |
| `1_idCanal` · 1.1.5 idCanal boolean | 400 | **550** | **401** | idem |
| `1_idCanal` · 1.1.6 idCanal object | 400 | **550** | **401** | idem |
| `1_idCanal` · 1.1.9 idCanal longitud 5 (>máx 4) | 400 | **400** | **401** | Único donde **matriz acierta** (400) y validador no (401) |
| `5_fallosIntegracionValidador/1023_token` · 0001.5.1023.1 demora validador (599) | 599 | **null** | **509** | Matriz no propaga timeout (null/éxito); validador da 509 |

**Relación con `isValid` de matriz** (ver [`07-matriz-validacion-cuerpo-json.md`](./07-matriz-validacion-cuerpo-json.md)):
los casos `idCanal` null/vacío/number/boolean/object caen en el `catch` de matriz → **550**, mientras el
validador sí evalúa formato. Este es el subconjunto donde quitar la validación de matriz cambiaría el
resultado hacia el del validador.

---

## Las otras 63 diferencias de NEGOCIO (MATRIZ = VALIDADOR)

Ambas rutas devuelven **el mismo** código, distinto del esperado. El desvío **no** lo introduce matriz;
viene de VCN/validador (código prod ≠ contrato dev). Grupos grandes (top pares MATRIZ):

| Esperado → recibido (ambas rutas) | Ejec. | Nota |
|-----------------------------------|-------|------|
| 400 → 404 | 44 | Validaciones `validador`: prod da 404 en vez de 400 |
| 431 → 509 | 44 | Bloque `5_solicitudes`: prod da 509 |
| 400 → 405 | 40 | Validaciones `peticion`: prod da 405 |
| 431 → 404 | 40 | `5_solicitudes`: prod da 404 |
| 400 → 401 | 28 | `idCanal` (formato): prod da 401 |
| 403 / 418 → 509 | 8 + 8 | Reglas de negocio |
| 413 → 999 / 509 | 8 + 4 | `1_cuenta`: variantes puntuales (la mayoría del bloque 413 SÍ coincide) |
| 599 → null | 8 | Timeout esperado no ocurre |
| 509 → 406 | 8 | |

> **Ya no aplica** el antiguo "510–515 → null". Ese bloque **coincide** con lo esperado.

---

## Cómo reproducir / consultar

```powershell
cd Postman\comparar-prod-vs-dev\recopilacion
node comparar-3-columnas.js enriquecido-02-MATRIZ_por-escenario.json enriquecido-03-VALIDADOR_por-escenario.json --salida TABLA-diferencias-esperado-matriz-validador.md
```

La tabla `.md` completa queda en `recopilacion/` (Tabla A negocio + Tabla B HTTP). Este documento es el
**índice interpretado**; para el detalle fila a fila, abrir la tabla.

---

## Pendiente (para cerrar la comparación real prod vs dev)

Esto compara **prod vs plan-dev (esperado)**. Falta el run **`--codigo-fuente dev`** con el **mismo**
`NIVEL_EJECUCION` para comparar **prod recibido vs dev recibido** escenario a escenario (ahí se confirma
cuáles de estas diferencias son "dev cambió el contrato" y cuáles son defecto real). También falta
**VCN directo** (aísla matriz) y contraste con **Marketplace** si aplica.
