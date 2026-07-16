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

### G4 — **R/T** Forma `util.lambdaResult` — **CERRADO (3.4, solo auditoría)**

| | |
|--|--|
| Evidencia | [`13-auditoria-g4-lambdaResult.md`](./13-auditoria-g4-lambdaResult.md) |
| Hallazgo | Dig `app.js` ya pasa objetos `{codigoError,mensajeError}` / `{respuesta}`; `util` = prod (stringify mensaje); no reescribir a VCN |
| Fix código | **Ninguno** |

### G5 — **N** Checklist negocio prod (candado) — **FIRMADO (3.5)**

Ver detalle: [`14-cierre-3-5-g5-g7.md`](./14-cierre-3-5-g5-g7.md). Remap 0011/0013, Dynamo, crypto emisor, getResultado: presentes y no tocados por 3.1–3.4.

### G7 — **R** caller Dig validador-api — **DOCUMENTADO (3.5)**

Dig mapa `0011`/`0013` → `LAMBDA_R2P`; R2P asume Invoke (`response.js`). Fallos de apunta → repo validador-api, no reintroducir HTTP en R2P. Ver [`14`](./14-cierre-3-5-g5-g7.md).

---

## Fuera de alcance (sigue)

- Portar 481/482/418 u otras mejoras Dig de VCN/P2P no pedidas.
- Reintroducir `tld-telered-lib` en layer R2P “por si acaso”.
- Cambiar reglas de negocio prod.

## Salida

G1–G7 tratados (3.1–3.5). Transporte G1–G4/G6 cerrados con código o auditoría; G5 firmado; G7 documentado. Cierre: [`14`](./14-cierre-3-5-g5-g7.md). Orden: [`11`](./11-fase2-orden-fixes.md).
