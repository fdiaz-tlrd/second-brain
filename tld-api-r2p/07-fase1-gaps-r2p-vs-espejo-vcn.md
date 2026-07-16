# Gaps R2P Dig — vivos (Fase 1 afianzada)

| Campo | Valor |
|-------|-------|
| Actualizado | 2026-07-15 |
| Cruce | [`10-cruce-vcn-dig-x-prod-r2p.md`](./10-cruce-vcn-dig-x-prod-r2p.md) |
| Dig | `tld-api-r2p/lambdas/r2p` |

**Leyenda:** **I** = init/bloqueante · **T** = transporte Dig (espejo VCN) · **N** = no romper negocio prod · **R** = revisar

---

## Alineado (no es gap)

| Ítem | Evidencia |
|------|-----------|
| Dual consume entrada/salida | `response.js` ≈ VCN |
| Template + IAM proxy | `PROX_VAL_LAMBDA_NAME` |
| Tramo EF vía proxy + mapeo `statusCode≠0` → 200+codigoError | `app.js` |
| Chequeo `datos` / `respuestas[]` | `app.js` |
| Crypto emisor `operacionesPaquete` | reemplazo de `llave.js` (misma familia) |
| Remap negocio `0011`→`0012` / `0013`→`0014` en body hacia EF | Lógica prod presente en Dig (N — no “arreglar” quitándola) |

---

## Gaps vivos (para Fase 2 / 3)

### G1 — **I** BLOQUEANTE — cold start `tld-telered-lib` — **CERRADO (3.1)**

| | |
|--|--|
| Hecho Dig (antes) | `require(validador.js)` → `tld-telered-lib` + `jsonpath`; layer Dig **sin** esas deps |
| Fix aplicado | `lib/getResultadoValidador.js`; `app.js` ya no carga `validador.js`; **borrado** `lib/validador.js` |
| Evidencia | Mesa Node: módulo carga sin resolver `tld-telered-lib`/`jsonpath`; ver [`11`](./11-fase2-orden-fixes.md) |

### G6 — **R** — `getResultado` vs prod — **CERRADO (3.1)**

| | |
|--|--|
| Fix | Misma lógica 0 / 500 / 501 + `?? 0` en resumen; Dig conserva `logger.infoSafe` en el loop |
| Evidencia | Mesa: all0→0, allErr→500, parcial→501, missing resultado→0 |

### G2 — **T** Dig pierde pass-through de `idTransaccionAutopista` / `fechaHora` — **CERRADO (3.2)**

| | |
|--|--|
| Estudio | [`12`](./12-estudio-idTransaccionAutopista-fechaHora-flujo-prod.md) |
| Fix aplicado | `validador-proxy-lambda.js` + call site en `app.js`: reenvío solo si vienen (`!= null`); no se inventan |
| Evidencia | Mesa stub Invoke: con/sin/null — ver [`11`](./11-fase2-orden-fixes.md) |

### G3 — **T** Mensaje fallback error proxy — **CERRADO (3.3)**

| | |
|--|--|
| Fix | Fallback `message` vacío → `"Error en validador-proxy"` (paridad VCN Dig) |
| No tocado | 509 locales EF (`datos`/JSON) con texto prod `"Error inesperado en validador EF!"` |

### G4 — **R/T** Forma `util.lambdaResult`

| | |
|--|--|
| Dig R2P | Siempre `JSON.stringify(mensaje)` |
| VCN | Ramas string vs objeto |
| Criterio asegurado | Todos los returns del tramo Dig (proxy/Invoke) producen body parseable a `{codigoError,mensajeError}` o `{respuesta}` para `salidaLambda` + validador-api |
| Fix | Auditoría de call sites; solo corregir si hay string suelto o forma incompatible — **no** reescribir bitácora/negocio |

### G5 — **N** Checklist negocio prod (no “fix de gap”, **candado**)

Antes/después de cada fix T/I, no regresar:

- Semántica `0011`/`0013` y remap notify `0012`/`0014`
- Validaciones / límites / ops notify / códigos 435, 438, 440–442, 509 de dominio
- Dynamo R2P create/update/get
- Cifrado **emisor** entrada y salida
- Agregación de resultados hacia bitácora/dashboard

Si un pulido de transporte toca `app.js` cerca de ese código → diff mínimo y verificación contra prod (lectura).

### G7 — **R** (nuevo) — caller Dig validador-api

| | |
|--|--|
| Nota | Prod caller→R2P es HTTP; Dig caller es Invoke. Asegurar R2P Dig **asume** Invoke (ya dual consume). |
| Fuera de este repo si falla | Si Dig `tld-validador-api` no apunta `LAMBDA_R2P` / mapa `0011`/`0013`, no se “arregla” inventando HTTP en R2P |
| Criterio | Documentar dependencia; no meter axios-url otra vez en R2P Dig |

---

## Fuera de alcance (sigue)

- Portar 481/482/418 u otras mejoras Dig de VCN/P2P no pedidas.
- Reintroducir `tld-telered-lib` en layer R2P “por si acaso”.
- Cambiar reglas de negocio prod.

## Salida

G1–G3/G6 cerrados (3.1–3.3). Vivos: G4–G5, G7. Orden: [`11`](./11-fase2-orden-fixes.md).
