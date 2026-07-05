# Resumen de fallos — VCN

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-05T09:08:05.437Z |
| Carpeta | `General/2_reglaNegocio/1_idCanal` |
| Requests | 12 (failed: 0) |
| Tests | 24 (failed: 2) |
| JSON completo | `logs\ultimo-run-vcn.json` |

## 1. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [Lambda VCN] HTTP status = 500 (real: 400)
- **Mensaje:** expected 400 to equal 500
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 2. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [General] mensajeError = "Error interno"
- **Mensaje:** expected 'ERROR: Excepción no controlada al mom…' to equal 'Error interno'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```
