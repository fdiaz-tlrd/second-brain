# Estudio código real — `tld-matriz/lambdas/tld-validador-validar`

**Repo:** `produccion_real/tld-matriz` (clon de `https://github.com/Telered-Autopista/tld-matriz`, rama `main`, commit `352adb1`).
**Archivo:** `lambdas/tld-validador-validar/index.js` (150 líneas). `package.json` sin dependencias declaradas (usa `moment`, `axios`, `@aws-sdk/*` del layer/runtime).

**Verificado:** `produccion_real/tld-matriz/.../index.js` es **idéntico** a `prod_adactado_a_dev/tld-matriz/.../index.js` (byte a byte, 150 líneas). Es decir, **lo desplegado en dev es exactamente el código de producción**. Los datos Newman reflejan este código.

---

## 1. Confirmación: producción SIEMPRE devuelve HTTP 200

**Sí, confirmado.** Las **4** rutas de `return` del handler devuelven `statusCode: 200`:

| Línea | Caso | HTTP | Body |
|-------|------|------|------|
| 40-49 | `isValid` falla (formato idCanal/validador) | **200** | `{codigoError: 400, descripcionError: "Error de formato en campo <x>"}` |
| 64-68 | validador responde 2xx | **200** | passthrough de `validarResponse.data` |
| 84-88 | catch, validador respondió **400** | **200** | passthrough de `e.response.data` |
| 90-98 | catch, cualquier otro error | **200** | `{codigoError: 550, descripcionError: "Error inesperado"}` |

No existe **ninguna** ruta que devuelva un HTTP distinto de 200 desde el handler. Coincide con el dato duro: **1263/1263 ejecuciones → HTTP 200** en el run MATRIZ.

> El HTTP 200 es de diseño. El resultado real va SIEMPRE en el body (`codigoError` / `respuestas[0].resultado`), nunca en el status. Ver [`../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md`](../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md).

**Salvedad honesta:** un HTTP ≠ 200 solo puede venir de **fuera** del handler (timeout Lambda → 504, error de init/runtime → 502, throttling API GW → 429, o los bugs de la sección 3). El código de negocio nunca lo produce.

---

## 2. Mapa de comportamiento (qué codigoError sale según el caso)

```
JSON.parse(body) ─▶ X-Forwarded-For (línea 22) ─▶ guardarTrace ─▶ isValid ─▶ axios a validador
                                                                    │              │
                                                         "canal"/"validador"    2xx  │ no-2xx
                                                                    │              │  ├─ 400 → passthrough body validador (codigoError de validador)
                                                            codigoError 400       passthrough └─ otro → codigoError 550 "Error inesperado"
```

- **Formato idCanal/validador inválido (string mal)** → matriz responde `codigoError 400` **sin llamar** a validador.
- **validador 2xx** → matriz reenvía tal cual el body del validador.
- **validador HTTP 400** → matriz reenvía el body del validador (con su `codigoError`).
- **validador cualquier otro no-2xx (401, 404, 409, 500, 502, timeout…)** → matriz lo colapsa a `codigoError 550 "Error inesperado"`.

**Consecuencia importante:** el `550` de matriz **enmascara muchos errores distintos del validador** bajo un único "Error inesperado". Por eso, cuando el validador directo (VALIDADOR) devuelve 401/509/502, por MATRIZ se ve 550.

---

## 3. Bugs / riesgos encontrados en el código de producción

### 3.1 `error(...)` no está definida (línea 33) — **BUG ACTIVO**

```js
if (! await guardarTrace(ipn, body.idCanal, "validador-validar", "request", body)) {
  error("::::::: ERROR almacenando trace [request]")   // ← error() NO existe
}
```

Solo está definida `log`. **No hay función `error`.** Si `guardarTrace` devuelve `false`, la línea 33 lanza `ReferenceError: error is not defined` → cae al `catch` → **`codigoError 550`**.

**CONFIRMADO en runtime** (CloudWatch, RequestId `db2952d2-...`): `ReferenceError: error is not defined at exports.handler (/var/task/index.js:33:7)`. Es la causa **probada** de la anomalía de la sección 4 (idCanal `null`/`""` → 550 en vez del 400 que `isValid` produciría). Ver [`../investigacion/matriz-produccion_en_dev.md`](../investigacion/matriz-produccion_en_dev.md).

### 3.2 `validatePlan(...)` y `respEventBus` no definidos (línea 78) — **LANDMINE (código muerto hoy)**

```js
if (subscriptionValue) {                       // subscriptionValue nunca se asigna (siempre undefined)
  respEventBus = await validatePlan('fallido', idCanalValue)   // validatePlan NO existe; respEventBus sin declarar
  ...
}
```

`subscriptionValue` se declara en línea 16 y **nunca** se asigna → el bloque nunca corre. Pero si algún día se asignara, `validatePlan` no existe → `ReferenceError` **dentro del catch** → excepción **no capturada** → Lambda responde **HTTP 502**. Mina enterrada.

### 3.3 `event.headers["X-Forwarded-For"].replace(...)` (línea 22) — **riesgo + código muerto**

```js
let ipn=event.headers["X-Forwarded-For"].replace('.', "")   // crashea si el header no viene
ipn=between(10000,99999).toString() + moment().unix().toString()  // sobrescribe ipn de inmediato
```

- Si `X-Forwarded-For` **no** viene en headers → `TypeError` → catch → **550**.
- Además el valor de la línea 22 se **descarta** en la 23. La línea 22 no aporta nada; solo puede romper.

### 3.4 `isValid` no valida por tipo (líneas 135-144) — **agujero de validación**

```js
if (!body.idCanal || (body.idCanal.length > 4 || body.idCanal.length < 1)) return "canal";
```

Para `idCanal` **number/boolean/object** (truthy y sin `.length` string): `!body.idCanal` es `false` y `.length` es `undefined` → las comparaciones dan `false` → **no** se detecta como inválido → matriz lo reenvía al validador → normalmente termina en **550**. Coincide con los datos: `idCanal` number/boolean/object → 550 por MATRIZ, 401 por VALIDADOR directo.

---

## 4. CERRADA (confirmada con CloudWatch): idCanal `null` / `""` → 550 en vez de 400

**Estado: RESUELTA.** Confirmada con evidencia runtime real de CloudWatch en
[`../investigacion/matriz-produccion_en_dev.md`](../investigacion/matriz-produccion_en_dev.md)
(RequestId `db2952d2-...`, escenario 1.1.2 idCanal `null`, run del 2026-07-13).

**Dato observado (run MATRIZ):**

| Escenario | idCanal enviado | Recibido MATRIZ | Lo que el código sugiere |
|-----------|-----------------|-----------------|--------------------------|
| 1.1.1 idCanal ausente | *(sin campo)* | **400** ✓ | `isValid`→`!undefined`=true→"canal"→400 ✓ |
| 1.1.2 idCanal null | `null` | **550** | `isValid` daría 400, pero cae al catch |
| 1.1.3 idCanal vacío | `""` | **550** | `isValid` daría 400, pero cae al catch |
| 1.1.9 idCanal len 5 | `"10000"` | **400** ✓ | `isValid`→len 5>4→"canal"→400 ✓ |

**Cadena de fallo exacta (probada por CloudWatch), para `idCanal: null`:**

1. matriz recibe `{validador:'0001', peticion:'<cifrado>', idCanal: null}` (verificado en el request body capturado, no inferido).
2. Llama `guardarTrace(...)` con `canal: null`.
3. **DynamoDB `PutItem` FALLA** con `ValidationException`:
   > `One or more parameter values were invalid: Type mismatch for Index Key canal Expected: S Actual: NULL IndexName: matriz-trace-canal`
   
   La tabla de trace tiene un **GSI `matriz-trace-canal`** cuya clave `canal` es tipo **String (S)**. Con `idCanal=null`, `canal` se marshalla como `NULL` → tipo incompatible con la clave del índice → rechazo.
4. `guardarTrace` devuelve `false` → matriz ejecuta la línea 33: `error("::::::: ERROR almacenando trace [request]")`.
5. **`ReferenceError: error is not defined at exports.handler (/var/task/index.js:33:7)`** — el bug 3.1, disparado en producción real.
6. El `ReferenceError` cae al `catch` externo → matriz responde **`codigoError 550 "Error inesperado"`**.

**Por qué `null`/`""` fallan pero *ausente* no:**

- **Ausente (undefined):** `marshall(..., {removeUndefinedValues:true})` **elimina** el atributo `canal` → el ítem no toca el GSI `matriz-trace-canal` (índice disperso) → `PutItem` OK → `guardarTrace` true → sigue a `isValid` → **400** limpio.
- **`null`:** se marshalla como `NULL` (no lo quita `removeUndefinedValues`) → GSI espera `S` → ValidationException → 550.
- **`""`:** DynamoDB no admite string vacío como valor de clave de índice → mismo rechazo → 550.

**Conclusión:** es un **bug real de producción** con doble causa encadenada — (a) el GSI `matriz-trace-canal` rechaza `null`/`""`, y (b) el bug 3.1 (`error()` indefinida) convierte ese fallo de trace en una excepción y colapsa la respuesta a `550`. El resultado esperado del propio `isValid` era `400 "Error de formato en campo canal"`. La expectativa de la prueba (400) es la correcta; **producción está mal** para estos dos casos.

---

## 5. Qué NO se tocó

- No modifiqué `produccion_real/` (es fotografía de producción, solo lectura de estudio).
- No cambié escenarios de prueba ni expectativas.
- No ejecuté Newman (esta máquina no tiene VPN).

---

## 6. Resumen para retomar

1. Producción (matriz `tld-validador-validar`) **siempre HTTP 200**; el error va en el body. Confirmado por código y por 1263/1263.
2. `550 "Error inesperado"` es un **catch-all** que enmascara errores diversos del validador y excepciones internas.
3. Bugs reales en prod: `error()` indefinida (3.1, activa), `validatePlan()` indefinida (3.2, mina), crash por `X-Forwarded-For` (3.3), `isValid` sin chequeo de tipo (3.4).
4. Anomalía **CERRADA** (§4): `idCanal null/""` → 550 (se esperaría 400). Causa **probada por CloudWatch**: GSI `matriz-trace-canal` (clave `canal` tipo S) rechaza `null`/`""` → `guardarTrace` falla → `error()` indefinida (bug 3.1) → `ReferenceError` → catch → 550. Producción está mal en estos casos; la expectativa 400 de la prueba es la correcta.
