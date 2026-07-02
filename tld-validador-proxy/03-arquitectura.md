# Arquitectura

## Confirmado (código + `template.yaml`)

- Una Lambda `tld-validador-proxy`, handler `app.lambdaHandler`, ruta `POST /procesar`.
- Invocación al Canal Validador: `app.js` → `validar()` en `lib/validador.js`.
- HTTP saliente: `enviarPostRuteado()` → axios o `requestHandler.sendRequest` según `URL_CA_TELERED`.
- Timeouts: ver `06-timeout-canal-validador.md`.

## No confirmado

- (vacío)
