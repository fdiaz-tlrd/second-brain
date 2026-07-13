# Cumplimiento HTTP Code de la cadena — matriz `tld-validador-validar` + `tld-validador-api/validar` (2026-07-13)

> ## ✅ VEREDICTO RÁPIDO (léelo primero, no re-analices)
>
> **¿El invoke de dev devuelve bien el HTTP Code? → SÍ (matriz) y SÍ (validador-api, tras el fix HD-007).**
>
> - **matriz `tld-validador-validar` (dev):** las **5** rutas `return` devuelven `statusCode: 200`. El cliente SIEMPRE ve HTTP 200 (el error va en `codigoError` del body). Igual contrato que prod.
> - **`tld-validador-api/validar` (dev):** emite **solo HTTP 200 o 400** (0 rutas HTTP 500). Igual que prod → matriz nunca lo enmascara a 550.
> - **Regla de la cadena:** matriz pasa `200`→body, `400`→body, **cualquier otro → `codigoError 550`**. Por eso el validador-api debe quedarse en 200/400 (y así está).
> - **Fix clave (HD-007):** la única ruta que emitía HTTP 500 (fallo al resolver servicio interno) se cambió a **HTTP 200 + `codigoError 509`** (`app.js` L159), como prod. Sin el fix, matriz lo enmascaraba a 550 y el cliente perdía el 509.
> - **Único 550 legítimo:** catch-all de matriz para excepción real / timeout / crash de infra (como prod, HP-004). No es ruta de negocio.
> - **Fuentes verificadas (2026-07-13):** `produccion_real/tld-matriz/.../index.js`, `produccion_real/tld-validador-api/.../app.js`, `tld-validador-api/.../app.js`, `tld-matriz/.../index.js`, ambos `lib/util.js` (`lambdaResult(httpStatus,…)` → 1er arg = HTTP status).
> - **Pendiente (no en esta máquina):** re-run Newman `NIVEL_EJECUCION=MATRIZ` confirma en runtime que el fallo de servicio interno da `codigoError 509` (no 550).
>
> El resto del doc es la evidencia línea-a-línea que respalda este veredicto.

---

Pregunta del usuario: **¿matriz `tld-validador-validar` y `tld-validador-api/validar` cumplen con lo que
vimos que producción siempre devuelve como HTTP Code?**

Referencia de prod: [HP-003](../hallazgos-produccion/02-matriz-http-200-siempre.md) (matriz siempre HTTP 200),
[HD-001](../hallazgos-desarrollo/01-matriz-validador-validar-http-code.md) (dev también 200),
[10-http-vs-codigoerror.md](../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md).

**Aclaración:** *HTTP Code* = status del protocolo (capa transporte). Es distinto de `codigoError` del
payload aunque compartan números (un HTTP 200 puede llevar `codigoError: 550`).

---

## Regla de la cadena (verificada en código)

```
Cliente ──HTTP──▶ matriz (tld-validador-validar) ──invoke──▶ validador-api (validar) ──invoke──▶ producto
                       │                                          │
             SIEMPRE HTTP 200 al cliente          matriz absorbe el statusCode del invoke:
             (error va en el body)                  200 → pasa body   |  400 → pasa body   |  otro → 550
```

Para que el `codigoError` real del validador-api llegue al cliente, **el validador-api debe responder
HTTP 200 o 400**. Si responde cualquier otro status, matriz lo colapsa a `codigoError 550` (enmascara).

---

## 1. matriz `tld-validador-validar` (dev) — ✅ CUMPLE

`tld-matriz/lambdas/tld-validador-validar/index.js`: **las 5 rutas `return` del handler devuelven
`statusCode: 200`**.

| Línea | Caso | HTTP |
|-------|------|------|
| 76-85 | `isValid` falla | **200** (body `codigoError:400`) |
| 100-104 | validador-api status 400 | **200** (passthrough) |
| 117-121 | validador-api status 200 | **200** (passthrough) |
| 137-141 | catch, downstream 400 | **200** (passthrough) |
| 143-151 | catch, cualquier otro | **200** (body `codigoError:550`) |

Idéntico contrato que prod (4 rutas, todas 200). El cliente **siempre** ve HTTP 200. Un HTTP ≠ 200 solo
podría venir de infra (502 init, 504 timeout, 429 throttle), no del handler.

> Los bugs heredados (`error()` indefinida, `X-Forwarded-For`, `validatePlan`, `isValid` sin tipo) afectan
> QUÉ `codigoError` sale (body), **no** el HTTP Code. Están en HD-003 / HP-001..007, fuera de esta tarea.

---

> **Prod usa axios (HTTP), dev usa invoke.** Prod matriz llama `axios.post(url)`: axios *lanza* en 4xx/5xx,
> por eso su catch atrapa el 400 y lo pasa, y colapsa el resto a 550. Dev matriz llama `LambdaClient.InvokeCommand`:
> invoke **no** lanza por statusCode, así que el handler dev inspecciona `parsed.statusCode` a mano
> (200 pasa, 400 pasa, otro → `throw` → 550). Distinta mecánica, **mismo contrato HTTP**.

---

## 2. `tld-validador-api/validar` — divergencia encontrada y corregida

### Prod (`produccion_real/.../validar/app.js`, rama `main`) — solo emite HTTP 200 y 400

| Caso | HTTP / cE |
|------|-----------|
| parámetros faltantes | 400 / 400 |
| canal emisor no existe | 400 / 401 |
| validador no existe | 400 / 404 |
| validador no disponible | 400 / 402 |
| descifrado emisor | 400 / 405 |
| idPeticion inválido | 400 / 400 |
| solicitudes rechazo | 200 / (cifrado) |
| **servicio interno no disponible** | **200 / 509** |
| éxito | 200 / 0 |
| catch | 200 / 999 |

Nunca HTTP 500 → matriz nunca enmascara business codes de prod a 550.

### Dev (`tld-validador-api/lambdas/validar/app.js`) — tenía UNA ruta HTTP 500

Todas las ramas coincidían en 200/400 **excepto** el fallo de resolución de servicio interno
(`resolverServicioInterno` con `statusCode` ≠ 0 y ≠ 418, p. ej. env `LAMBDA_XXX` ausente):

```js
// ANTES
const httpStatus = servicioInterno.statusCode === 418 ? 400 : 500;  // ← 500 se enmascara a 550
```

Con HTTP 500, matriz (status ≠ 200/400) → `throw` → catch → **`codigoError 550`**. El cliente perdía el
**509** que prod sí entrega.

### Fix aplicado

```js
// DESPUÉS
const httpStatus = servicioInterno.statusCode === 418 ? 400 : 200;  // 509 llega como en prod
```

- **418** (método no soportado, HP-018) → **HTTP 400** → matriz pasa → cliente recibe **418** (mejora dev).
- **otro fallo** de servicio interno → **HTTP 200 + cE 509** → igual que prod (L95) y que la rama de
  invoke fallido de dev (L175). Sin enmascarar.

`codigoError` se mantiene (418 / 509); solo cambió el HTTP para respetar el contrato con matriz.

**Tradeoff honesto:** con HTTP 200 este fallo de config **no** disparará alarmas por status 5xx; la señal
queda en `codigoError 509` en el body (igual que prod). Si se quisiera alarmar por 5xx habría que hacerlo
en otra capa; cambiar a 500 aquí re-rompería el contrato con matriz (volvería a 550). Prod eligió 200/509.

### Nota: body JSON inválido — dev es MEJOR que prod (no es regresión)

Prod hace `JSON.parse(event.body)` **fuera** del try → crashea → matriz `FunctionError` → 502 → 550.
Dev lo envuelve en try/catch → **HTTP 400 + cE 400** (matriz pasa). Mejora, mismo HTTP-contract (400).

---

## Conclusión

| Componente | ¿Cumple el HTTP Code de prod? |
|------------|-------------------------------|
| matriz `tld-validador-validar` (dev) | **Sí** — siempre HTTP 200 al cliente (5/5 rutas) |
| `tld-validador-api/validar` (dev) | **Sí, tras el fix** — solo 200/400, igual que prod; el 509 llega en vez de enmascararse a 550 |

**El cliente siempre recibe HTTP 200** (contrato de matriz) y, en todas las rutas de negocio, el
`codigoError` real pasa sin enmascarar. El único 550 posible es el catch-all de matriz para excepciones
reales / timeouts (igual que prod, HP-004), no una ruta de negocio.

---

## Verificación

| Qué | Cómo | Resultado |
|-----|------|-----------|
| Sintaxis app.js dev | `node --check` | OK |
| Lint | editor | sin errores |
| idSolicitud (fix previo) | `node verificar-validarParametroSolicitudes.js` | 24/24 |
| HTTP map | lectura de código dev vs prod (matriz + validador-api) | documentado arriba |
| Re-verificación 2026-07-13 | lectura de las 4 fuentes reales: `produccion_real/tld-matriz/.../index.js`, `produccion_real/tld-validador-api/.../app.js`, `tld-validador-api/.../app.js`, `tld-matriz/.../index.js` + ambos `lib/util.js` (`lambdaResult(httpStatus,...)` → 1er arg = statusCode) | **Confirmado**: dev matriz 5/5 rutas HTTP 200; dev validador-api solo emite HTTP 200/400 (0 rutas HTTP 500) |

---

## Pendiente (fuera de esta máquina)

- Deploy `tld-validador-api` dev + `tld-matriz` dev.
- Re-run Newman `NIVEL_EJECUCION=MATRIZ`: HTTP Code = 200 en todos; confirmar que el fallo de servicio
  interno da `codigoError 509` (no 550) por matriz.
