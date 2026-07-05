# Resumen de fallos — VCN

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-05T19:34:25.691Z |
| Carpeta | `General/1_validaciones_js/2_validador` |
| Requests | 45 (failed: 0) |
| Tests | 90 (failed: 3) |
| JSON completo | `logs\ultimo-run-vcn.json` |

## 1. 2_validador / 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783280063","respuestas":[{"idSolicitud":"1","resultado":510,"datos":null}]}}
```

## 2. 2_validador / 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected undefined to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783280063","respuestas":[{"idSolicitud":"1","resultado":510,"datos":null}]}}
```

## 3. 2_validador / 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783280063","respuestas":[{"idSolicitud":"1","resultado":510,"datos":null}]}}
```
