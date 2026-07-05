# Resumen de fallos — VCN

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-05T08:50:44.753Z |
| Carpeta | `General/2_reglaNegocio/1_idCanal` |
| Requests | 12 (failed: 0) |
| Tests | 24 (failed: 6) |
| JSON completo | `logs\ultimo-run-vcn.json` |

## 1. 1_idCanal / 2.1.1. idCanal — no existe en BD (401)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 2. 1_idCanal / 2.1.1. idCanal — no existe en BD (401)

- **Test:** [General] codigoError = 401
- **Mensaje:** expected 999 to equal 401
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 3. 1_idCanal / 2.1.1. idCanal — no existe en BD (401)

- **Test:** [General] mensajeError = "Canal emisor no existe"
- **Mensaje:** expected 'Error en la solicitud' to equal 'Canal emisor no existe'
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 4. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [Lambda VCN] HTTP status = 500 (real: 200)
- **Mensaje:** expected 200 to equal 500
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 5. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [General] codigoError = 500
- **Mensaje:** expected 999 to equal 500
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 6. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [General] mensajeError = "Error interno"
- **Mensaje:** expected 'Error en la solicitud' to equal 'Error interno'
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```
