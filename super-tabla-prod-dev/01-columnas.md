# Columnas de la super tabla

Objetivo: **escenario a escenario**, ver diferencias **esperado vs prod vs dev** para discutir con QA. Sin filas “todo igual” (no aportan).

Esquema:

| Información del escenario | Esperado | Captura de Prod | Captura de Dev | Observaciones documentada |
|---------------------------|----------|-----------------|----------------|---------------------------|

---

## Decisiones de filas (cerradas)

### Solo diferencias

Incluir fila si **alguna** de estas es cierta (tras colapsar variantes):

1. `esperado ≠ prod` (negocio y/o forma de presentación relevante)
2. `esperado ≠ dev`
3. `prod ≠ dev`

Si prod y dev y esperado alinean → **no** aparece en la tabla.


### Vista filtrada: solo prod ≠ dig

Además de la vista completa, el generador escribe `bloques-diferencias-prod-vs-dev.md`: mismos bloques, pero **solo** si hay tag `prod≠dev`, `forma≠`, `texto≠` o `http≠`.

Sirve para revisar “qué cambió dig respecto a prod”, excluyendo casos en que **ambos** se apartan del esperado **igual**.

Criterio de igualdad (v1), en este orden de peso:

| Dimensión | Campos | ¿Cuenta para **incluir** la fila? | ¿Se **muestra** en la fila? |
|-----------|--------|-----------------------------------|-----------------------------|
| Negocio | `recibidoNegocio` / `presentacionCodigo` vs `codigoErrorEsperado` | **Sí** (principal) | Sí |
| Forma | `presentacionForma` | **Sí** | Sí |
| Texto | `presentacionDescripcion` (norm) | **Sí** si negocio igual pero texto distinto | Sí |
| HTTP protocolo | `httpRealLambda` vs esperado / entre prod y dev | Ver § HTTP abajo | **Siempre** (columna visible) |
| Solo cifrado request | `algoritmoCifrado` entre variantes | **No** | Solo conteo `variantes: N` |

### HTTP: aclaración (cerrado 2026-07-14)

**Qué se preguntaba antes:** no era “¿ocultamos el HTTP?”. Era: ¿una diferencia **solo** de HTTP (sin cambio de negocio/forma/texto) **abre una fila** en la tabla de “solo diferencias”?

**Hecho conocido (doc 10 + experiencia):** con `NIVEL_EJECUCION=MATRIZ`, la lambda **tld-matriz** responde casi siempre **HTTP 200**. El error de negocio va en el **body** (`codigoError` / `resultado`). HTTP ≠ 200 suele ser fallo de infra/servidor (API GW, timeout, 5xx fuera del contrato de negocio) — eso sí importa y se destaca.

Muchos escenarios del plan tienen `expectedHttpStatus` 400, pero en MATRIZ el real es 200. Si eso **abriera fila por sí solo**, la tabla se llenaría de “diferencias HTTP” ruidosas y perdería el foco en **qué cambia el código prod vs dev**.

**Decisión:**

| Caso | ¿Incluye fila? | Cómo se ve |
|------|----------------|------------|
| Negocio / forma / texto difieren (esp↔prod, esp↔dev, o prod↔dev) | **Sí** | Columnas HTTP visibles en la misma fila (vista completa) |
| Solo `httpEsperado ≠ httpReal` en MATRIZ, ambos lados 200, negocio igual | **No** | No abre fila; es el comportamiento conocido de matriz |
| `httpReal` prod **≠** dev (raro) | **Sí** | Diferencia de protocolo entre versiones — sí hay que verla |
| `httpReal` ≠ 200 (5xx, red, etc.) en prod o dev | **Sí** | Error fuera del “siempre 200” de matriz — contundente para QA |

Así: **sí damos vista al HTTP** en todo escenario que ya entra por diferencia de negocio/contrato o por HTTP anómalo / prod≠dev; **no** usamos el “esperado 400 vs real 200 en MATRIZ” como motor de la tabla.

**Uso narrativo (QA):** en corridas MATRIZ prod y dev, lo habitual es HTTP **200 en ambos**. La columna sirve para afirmar con evidencia: “mirá, el status es 200 de los dos lados; la diferencia relevante está en el payload / forma.” No genera filas extra.

### Una fila = un escenario (no variante de cifrado)

En Newman, el mismo `nombre` se ejecuta **varias veces** (CBC/GCM / variantes; en VCN MATRIZ típico ~4). Apuntes previos:

- Doc 09 / `comparar-3-columnas.js`: `codigo×N` = mismo código en N ejecuciones.
- Docs 12–13 y `listar-divergencias-negocio.js`: trabajan con **escenarios únicos** por `nombre`.
- Check VCN dev 2026-07-14: **331** nombres únicos, hasta **4** variantes; **0** discordancias `negocio|forma|cifradoRespuesta` entre variantes del mismo nombre.

**Regla de colapso**

1. Clave de escenario: `nombre` (si hubiera colisión entre carpetas: `ruta|nombre`, como en `comparar-esperado-vs-recibido.js`).
2. Por cada `codigoFuente` (prod / dev), agregar las ejecuciones del mismo `nombre`.
3. Valor mostrado = el de las variantes **si todas coinciden** en (negocio, forma, texto norm).
4. Celda auxiliar `variantes: N` (informativo).
5. Si **dentro** de prod (o dev) las variantes **discrepan** → fila igual, marca **`⚠ variantes discordantes`** y listar el conjunto de valores (excepción rara; no silenciar).

Así se cumple: “este escenario en prod es de esta forma vs cómo es en dev”.

---

## 1. Información del escenario

| Subcolumna | Origen | Notas |
|------------|--------|--------|
| Servicio | `suite` | Fija por archivo (`vcn.md`, etc.) |
| Nombre | `nombre` | Identidad de la fila |
| Ruta | carpeta Postman si está en capture | Apoyo |
| Tipo | `expectedTipo` | general / parametro / metodo / exito |
| Nivel | `nivelEjecucion` | Debe coincidir en el par prod/dev |
| Variantes (N) | conteo tras colapso | Ej. `4` |

---

## 2. Esperado

| Subcolumna | Origen | Notas |
|------------|--------|--------|
| HTTP esperado | `httpEsperado` | |
| Código negocio esperado | `codigoErrorEsperado` | |
| (ref.) mensaje catálogo | opcional | No bloquear la fila si falta |

---

## 3–4. Captura Prod / Captura Dev

Misma plantilla en ambos:

| Subcolumna | Origen | Notas |
|------------|--------|--------|
| Código negocio | `recibidoNegocio` / `presentacionCodigo` | |
| Texto al cliente | `presentacionDescripcion` + campo | |
| Forma / contrato | `presentacionForma` | A.mensajeError, A.descripcionError, B, C… |
| Cifrado respuesta | `presentacionCifrado` / formato | claro vs cifrado en wire |
| HTTP real | `httpRealLambda` | |
| ¿= esperado? | derivado | sí / no |

Detalle de body (`reqClaro`, `body`) → sección expandida bajo la fila en MD/HTML, no saturar la celda.

Si falta corrida de un lado: `— (sin corrida)` y la fila **sí** entra si el otro lado diverge del esperado (o se marca par incompleto).

---

## 5. Observaciones documentada

Columna **humana**; fuente = sidecar de anotaciones (ver [`02-flujo-trabajo-y-anotaciones.md`](02-flujo-trabajo-y-anotaciones.md)), **no** se inventa al regenerar.

| Subcolumna | Contenido |
|------------|-----------|
| Diferencia | Etiqueta automática: `esp≠prod` / `esp≠dev` / `prod≠dev` (combinables) |
| Veredicto | TEST-MAL / PROD-MAL / DEV-OK / etc. (reusar docs 12–13) |
| Notas | Texto libre acordado en la revisión |
| Refs | HP-xxx, enlaces a hallazgos |

Al regenerar la tabla MD/HTML se **reinyectan** las notas del sidecar por clave `suite + nombre`.

---

## Fuera de alcance

- Sustituir `foto-presentacion-*` (vista por código).
- Estadísticas como argumento principal (solo valor agregado opcional al final).
- Sustituir el informe narrativo humano: la tabla lo alimenta.
