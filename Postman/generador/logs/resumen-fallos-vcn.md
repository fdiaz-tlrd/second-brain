# Resumen de fallos — VCN

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-05T07:00:22.138Z |
| Carpeta | `General/1_validaciones_js/1_idCanal` |
| Requests | 42 (failed: 0) |
| Tests | 84 (failed: 2) |
| JSON completo | `logs\ultimo-run-vcn.json` |

## 1. 1_idCanal / 1.1.13. idCanal — ¿ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 2. 1_idCanal / 1.1.13. idCanal — ¿ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```
