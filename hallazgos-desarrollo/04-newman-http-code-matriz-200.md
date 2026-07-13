# HD-005 — Newman/Postman: HTTP Code esperado = 200 en `NIVEL_EJECUCION=MATRIZ`

| Campo | Valor |
|-------|--------|
| **ID** | HD-005 |
| **Fecha** | 2026-07-13 |
| **Estado** | implementado (Post-response + colecciones reensambladas) |
| **Severidad** | alta |
| **Componente** | `second-brain/Postman/generador` — suites VCN, P2P, P2M |
| **Hallazgo origen** | [HP-003](../hallazgos-produccion/02-matriz-http-200-siempre.md) (matriz siempre HTTP 200) |

---

## Alcance: SOLO HTTP Code

Este cambio afecta **exclusivamente la aserción del HTTP Code** (código de estado del protocolo
HTTP). **No** toca el código de respuesta del payload (`codigoError` / `resultado`), que se verifica
en asserts aparte y **no se modificó**. Que un código de respuesta tenga el mismo número que un HTTP
Code no los hace equivalentes.

---

## Problema

Producción (matriz `tld-validador-validar`) **siempre responde HTTP 200**. Las pruebas Newman tomaban
`expectedHttpStatus` crudo del escenario (p. ej. 400/500) y lo comparaban contra el HTTP real,
**sin** distinguir la ruta de ejecución. Para `NIVEL_EJECUCION=MATRIZ` eso es incorrecto: el HTTP real
es 200 y la prueba fallaba en la capa de transporte aunque el escenario fuese válido.

---

## Solución (general, en Post-response.js)

En el `Post-response.js` raíz de cada suite (VCN, P2P, P2M), la aserción de HTTP Code ahora deriva el
valor esperado según `NIVEL_EJECUCION`:

```js
const nivelEjecucion = String(pm.environment.get('NIVEL_EJECUCION') || 'VCN').trim().toUpperCase();
const httpEsperadoTransporte = nivelEjecucion === 'MATRIZ' ? 200 : httpEsperado;
pm.expect(httpReal).to.equal(httpEsperadoTransporte);
```

- **MATRIZ** → HTTP Code esperado = **200** (fijo).
- **VALIDADOR / VCN directo** → usa `expectedHttpStatus` del escenario (sin cambio).

**No se editó ningún escenario JSON** (322 VCN + 540 P2P + 612 P2M). El `expectedHttpStatus` de los
JSON se conserva intacto para las otras rutas.

### Suite "P2M Escenarios error especiales"

No tiene `Post-response.js` propio: sus 3 escenarios se integran a la colección VCN vía
`ensamblador/bootstrap-general-vcn.js`, por lo que quedan cubiertos por el `Post-response.js` de VCN.

---

## Archivos tocados

| Archivo | Cambio |
|---------|--------|
| `Postman/generador/VCN Escenarios error/Post-response.js` | HTTP Code según nivel |
| `Postman/generador/P2P Escenarios error/Post-response.js` | HTTP Code según nivel |
| `Postman/generador/P2M Escenarios error/Post-response.js` | HTTP Code según nivel |
| `ensamblador/salida/VCN Escenarios error.postman_collection.json` | reensamblado |
| `ensamblador/salida/P2P Escenarios error.postman_collection.json` | reensamblado |
| `ensamblador/salida/P2M Escenarios error.postman_collection.json` | reensamblado |

Reensamblar: `node ensamblador/armar-coleccion.js config-vcn.json` (y `config-p2p.json`, `config.json`).

---

## Verificación

- Las 3 colecciones parsean y embeben `httpEsperadoTransporte` con `=== 'MATRIZ' ? 200`.
- Pendiente: correr Newman `NIVEL_EJECUCION=MATRIZ` y confirmar que la aserción de HTTP Code pasa a 200.

---

## Qué queda fuera de este hallazgo

- Revisión de `codigoError` / `resultado` (código de respuesta del payload) uno a uno — tarea aparte.
- Comportamiento de HTTP en VALIDADOR directo — se mantiene según `expectedHttpStatus`.

---

## Referencias

- [HP-003](../hallazgos-produccion/02-matriz-http-200-siempre.md)
- [HD-001](01-matriz-validador-validar-http-code.md) — HTTP 200 intocable en prod/dev
- [10-http-vs-codigoerror.md](../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md)
