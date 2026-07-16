# Resultados por escenario — R2P

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-16T17:10:14.314Z |
| Código fuente | dev |
| Nivel ejecución | MATRIZ |
| Carpeta | `(completo)` |
| Escenarios | 4 |
| Con captura determinista `[CAPTURA]` | 4 / 4 |
| Negocio OK / divergente / **sin evaluar** | 4 / 0 / **0** |
| Respuesta lambda **cifrada / en claro / sin dato** | 4 / 0 / 0 |
| Desglose formatoRespuestaLambda | cifrado=4 |
| Presentación (contratos) | B=4 |
| Patrones de presentación únicos | 1 |

Columnas HTTP = protocolo (real de la lambda vs esperado). Columnas negocio = `codigoError`/`resultado` del payload (recibido efectivo vs esperado). Columna **Formato** = si la lambda devolvió el cuerpo cifrado o en claro. Columna **Forma** = contrato de payload (`A.mensajeError`, `A.descripcionError`, `B`, `C`, …). Foto por código fuente: `codigosRespuesta/foto-presentacion-<suite>-<prod|dev>.md` (la genera Newman al terminar, o `node extraer-foto-presentacion.js logs/resultados-por-escenario-<suite>.json`).

| # | Escenario | HTTP esp | HTTP real | HTTP ok | Negocio esp | Negocio recib | Negocio ok | Formato | Cifrada? | Forma | Cod.cli | Desc.cliente | assert | Cuerpo (resumen) |
|---|-----------|----------|-----------|---------|-------------|---------------|------------|---------|----------|-------|---------|--------------|--------|------------------|
| 1 | 0011.3.1009.1.1. validador ASTRGATO — R2P feliz (exito) | 200 | 200 | OK | 0 | 0 | OK | cifrado | sí | B | 0 | — | OK | `{"respuesta":{"idPeticion":"CELEGATO1784221787","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"identificador":"61009001","monto":"100.00","bancoAcreedor":"CELEGATO","cuentaDeudor":"1234567890","cuentaAcreedor":"0987654321","nombre … [truncado]` |
| 2 | 0011.3.1009.1.1. validador ASTRGATO — R2P feliz (exito) | 200 | 200 | OK | 0 | 0 | OK | cifrado | sí | B | 0 | — | OK | `{"respuesta":{"idPeticion":"CELEGATO1784221787","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"identificador":"61009001","monto":"100.00","bancoAcreedor":"CELEGATO","cuentaDeudor":"1234567890","cuentaAcreedor":"0987654321","nombre … [truncado]` |
| 3 | 0011.3.1009.1.1. validador ASTRGATO — R2P feliz (exito) | 200 | 200 | OK | 0 | 0 | OK | cifrado | sí | B | 0 | — | OK | `{"respuesta":{"idPeticion":"CELEGATO1784221787","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"identificador":"61009001","monto":"100.00","bancoAcreedor":"CELEGATO","cuentaDeudor":"1234567890","cuentaAcreedor":"0987654321","nombre … [truncado]` |
| 4 | 0011.3.1009.1.1. validador ASTRGATO — R2P feliz (exito) | 200 | 200 | OK | 0 | 0 | OK | cifrado | sí | B | 0 | — | OK | `{"respuesta":{"idPeticion":"CELEGATO1784221787","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"identificador":"61009001","monto":"100.00","bancoAcreedor":"CELEGATO","cuentaDeudor":"1234567890","cuentaAcreedor":"0987654321","nombre … [truncado]` |
