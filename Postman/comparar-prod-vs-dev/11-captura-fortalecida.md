# Captura fortalecida — qué guarda Newman en cada ejecución (100 %)

**Objetivo:** con producción desplegada en dev, capturar **TODO** de cada ejecución de forma **determinista y confiable**, para luego revisar escenario por escenario (esperado vs recibido) y decidir si se corrige lo esperado o si producción está mal. **No se tocan las expectativas ni la lógica de asserts.**

**Aplica a:** suite **VCN** (niveles `NIVEL_EJECUCION` = MATRIZ / VALIDADOR / VCN). P2P/P2M no se tocaron (fuera del tema actual).

---

## Problema que resuelve

La llamada real al lambda (matriz/validador/VCN) se hace **dentro del Pre-request** con `pm.sendRequest`. Newman **no** guarda esa request/response en su summary por-ejecución, ni las variables de colección. Antes solo se recuperaba el HTTP real parseando el **texto** de un assert (`[Lambda VCN] HTTP status = E (real: R)`) — frágil — y el resto (cuerpo enviado, URL, tiempo) se perdía o no era confiable.

## Solución: canal determinista `[CAPTURA]`

1. **Pre-request** (`VCN Escenarios error/Pre-request.js`) ahora guarda en variables de colección, en los dos flujos (normal y body-raw-inválido):
   - `PROCESAR_URL` — URL del lambda según nivel.
   - `PROCESAR_REQUEST_BODY_CLARO` — payload **claro** (antes de cifrar). Es lo que el lambda descifra.
   - `PROCESAR_REQUEST_BODY_CIFRADO` — cuerpo **cifrado** realmente enviado.
   - `PROCESAR_RESPONSE_HEADERS` — headers de la respuesta del lambda.
   - (ya existían: `PROCESAR_STATUS_CODE`, `PROCESAR_RESPONSE_BODY`, `PROCESAR_RESPONSE_TIME_MS`, `PAYLOAD_*`, `FLOW_*`.)

2. **Post-response** (`VCN Escenarios error/Post-response.js`) emite, como **primer** test y envuelto en try/catch (siempre pasa, nunca rompe otros asserts), un assert:
   ```
   [CAPTURA] {json con todo}
   ```
   Campos del JSON: `nivel, url, httpRealLambda, httpEsperado, codigoErrorEsperado, tipo, tiempoMs, idPeticion, metodo, idSolicitud, flowFailed, flowError, reqClaro, reqCifrado, respLambdaRaw, respLambdaHeaders, descifradoCode, descifradoBody`. Los cuerpos grandes se recortan a 6000 chars (con marca `…[+N]`).

3. **run-newman.js** (`extractCaptura`) lee ese assert como **fuente autoritativa** (JSON, no parseo de texto), con **fallback** al método viejo si faltara. Cada escenario en `resultados-por-escenario-<suite>.json` incluye ahora:

| Campo | Significado |
|-------|-------------|
| `httpRealLambda` / `httpEsperado` / `httpCoincide` | HTTP protocolo real vs esperado |
| `recibidoNegocio` / `codigoErrorEsperado` / `negocioCoincide` | Negocio (payload) recibido vs esperado |
| `expectedTipo` | general / parametro / metodo / exito |
| `urlLambda` | endpoint real invocado |
| `reqClaro` | payload claro enviado (antes de cifrar) |
| `reqCifrado` | cuerpo cifrado enviado |
| `respLambdaRaw` | respuesta cruda del lambda (antes de descifrar) |
| `respLambdaHeaders` | headers de respuesta del lambda |
| `descifradoCode` | HTTP del dummy /descifrar |
| `body` | cuerpo descifrado (legible) |
| `tiempoRealMs` | tiempo de respuesta del lambda |
| `flowFailed` / `flowError` | diagnóstico si el flujo pre-request falló |
| `assertsReales` / `assertsFallidos` | asserts de negocio (excluye `[CAPTURA]`) |
| `capturaOk` | true si la captura determinista se leyó bien |

> El assert `[CAPTURA]` **no** cuenta como assert de negocio (se excluye de `assertsReales`/`assertsFallidos`). Siempre pasa; no altera el veredicto de los escenarios.

---

## Verificación hecha (en esta máquina, sin VPN)

- Sintaxis OK: `run-newman.js`, `Pre-request.js`, `Post-response.js`.
- Colección re-ensamblada (`node armar-coleccion.js config-vcn.json`) y validada: contiene el código de captura embebido; 322 requests.
- Prueba extremo a extremo de `buildResultadosPorEscenario` con un `[CAPTURA]` simulado: todos los campos se leen bien (`httpRealLambda`, `reqClaro`, `respLambdaRaw`, `tiempoRealMs`, `capturaOk=true`, `[CAPTURA]` excluido del conteo).

**No verificable aquí (requiere VPN):** la ejecución real de Newman contra dev. Eso lo corre el usuario.

---

## Cómo re-ejecutar (máquina VPN) — olvidar runs previos

Cambiar `NIVEL_EJECUCION` en `entornos/VCN Escenarios error - desarrollo.postman_environment.json` y correr, una vez por nivel:

```powershell
cd Postman\generador
# MATRIZ
# (NIVEL_EJECUCION=MATRIZ en el environment)
node run-newman.js vcn --codigo-fuente prod --nota "captura fortalecida MATRIZ"
# VALIDADOR
# (NIVEL_EJECUCION=VALIDADOR)
node run-newman.js vcn --codigo-fuente prod --nota "captura fortalecida VALIDADOR"
# VCN
# (NIVEL_EJECUCION=VCN)
node run-newman.js vcn --codigo-fuente prod --nota "captura fortalecida VCN"
```

Cada corrida deja `logs/resultados-por-escenario-vcn.json/.md` y copia a `logs/historial/vcn/`. Commitear/pushear `logs/` completo desde la máquina VPN.

> **Importante:** la colección debe ser la re-ensamblada (con `[CAPTURA]`). Ya está generada en `ensamblador/salida/`. Si se regenera, correr de nuevo `armar-coleccion.js config-vcn.json`.

---

## Qué NO se cambió

- Expectativas de los escenarios (`expected*`) — intactas.
- Lógica de asserts de negocio — intacta.
- P2P / P2M — no tocados.
- Nada en `produccion_real/` ni `prod_adactado_a_dev/`.

## Siguiente paso (tras las 3 corridas)

Comparar escenario por escenario con `comparar-3-columnas.js` (negocio + HTTP) y, con `reqClaro`/`respLambdaRaw` ahora disponibles, cerrar anomalías como el `idCanal null/"" → 550` (ver [`../../produccion_real/01-tld-matriz-validador-validar.md`](../../produccion_real/01-tld-matriz-validador-validar.md) §4) **sin depender de CloudWatch**.
