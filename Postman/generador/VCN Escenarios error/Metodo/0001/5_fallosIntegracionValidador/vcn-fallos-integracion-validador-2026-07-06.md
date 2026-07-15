# VCN — fallos integración validador (run 2026-07-06)

Comando: `node run-newman.js vcn --folder "Metodo/0001/5_fallosIntegracionValidador"`  
Log: `Postman/generador/logs/historial/vcn/2026-07-06T06-11-02Z_Metodo-0001-5_fallosIntegracionValidador.json`

Solo escenarios con fallo (42 assertions, 13 fallos). **1022.2** (406) pasó.

| Escenario | Newman espera | Recibido | Código fuente VCN (`tld-api-cuenta-nombre/lambdas/cuenta-nombre`) | Qué simula |
|-----------|---------------|----------|-------------------------------------------------------------------|------------|
| **1022.1** demora (599) | HTTP 200 · `599` · `"Error inesperado en validador"` | HTTP **502** · sin `codigoError` · `{"message":"Internal server error"}` | Si proxy responde 599: HTTP **200**, `codigoError` = código proxy, `mensajeError` = texto del proxy (`app.js` L513–528). `MSG_CATALOGO` no define 599. | Cuenta `5000000516`: dummy espera ~16 s (`validar-fallos`). |
| **1022.3** sin `respuesta` (509) | HTTP 200 · `509` · `"Error inesperado en validador"` | HTTP 200 · `509` · `"Error inesperado en el Canal Validador"` | Error vía proxy: HTTP **200**, código proxy, **mensaje del proxy** (`app.js` L518–521). El texto `"Error inesperado en validador"` de L537–549 es otra rama (datos nulos/parse), no esta. | Cuenta `5000000518`: dummy HTTP 200 sin campo `respuesta`. |
| **1023.1** demora (599) | HTTP 200 · `599` · `"Error inesperado en validador"` | HTTP **500** · `500` · `"Error interno"` | `lambdaResult(500, 500, …)` p. ej. fallo `cerrarPaquete` (`app.js` L61–70). No rama proxy→599. | Igual 1022.1, canal **1023** auth token. |
| **1023.2** cifrado invertido (406) | HTTP 200 · `406` · `"Error en descifrado canal validador"` | HTTP **500** · `500` · `"Error interno"` | Idem. | Cuenta `5000000517`: cifrado invertido CBC↔GCM. |
| **1023.3** sin `respuesta` (509) | HTTP 200 · `509` · `"Error inesperado en validador"` | HTTP **500** · `500` · `"Error interno"` | Idem. | Igual 1022.3, canal **1023** auth token. |

---

## 1022.3 — revisión `tld-validador-proxy/lambdas/proxy`

### Cadena del escenario

1. **Dummy** (`validar-fallos`, cuenta `5000000518`): HTTP 200 con JSON sin `respuesta` cifrada (`app.js` L135–143).
2. **Proxy** recibe ese cuerpo tras HTTP 200 del validador.
3. **Proxy** L320–338 (`app.js`): si `respuesta` no es string no vacía → `responderError(..., 509)` con `resultado: "error_validador_campo_respuesta"`.
4. **Proxy** `responderError` L24–37: `message = CATALOGO_MESSAGE[509]` → **`"Error inesperado en el Canal Validador"`** (`CATALOGO_MESSAGE` L15–22). Ese `message` va en `response.homologar` (`lib/response.js` L3–5): `{ statusCode: 509, message, datos }`.
5. **VCN** invoca proxy por Lambda; con `respProxy.statusCode !== 0` (`cuenta-nombre/app.js` L513–528) devuelve HTTP **200**, `codigoError: 509`, `mensajeError: respProxy.message` (el texto del proxy, sin pasar por `mensajeErrorCanal`).
6. **Newman** aserta `catalogoGeneral.json` código **509**: **`"Error inesperado en validador"`** (sin “el Canal”).

### Qué falló en el run

- `codigoError = 509` → **pasó**.
- `mensajeError` → **falló**: recibido `"Error inesperado en el Canal Validador"`, Newman esperaba `"Error inesperado en validador"`.

### Tres textos distintos en juego (solo documentación)

| Origen | Texto para 509 |
|--------|----------------|
| Proxy `CATALOGO_MESSAGE[509]` | Error inesperado en **el Canal Validador** |
| Newman `catalogoGeneral.json` | Error inesperado en **validador** |
| VCN ramas L537–549 (no usadas en este flujo) | Error inesperado en **validador** |

En este escenario el proxy y el dummy hicieron lo previsto; el único fallo Newman fue la aserción de **mensaje**, por desalineación de catálogos / reenvío del texto del proxy en VCN L518–521.
