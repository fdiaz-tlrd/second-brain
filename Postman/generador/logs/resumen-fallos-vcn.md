# Resumen de fallos — VCN

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-05T17:33:31.586Z |
| Carpeta | `General/2_reglaNegocio/2_validador` |
| Requests | 9 (failed: 0) |
| Tests | 18 (failed: 7) |
| JSON completo | `logs\ultimo-run-vcn.json` |

## 1. 2_validador / 2.2.1. validador — no existe en BD (404) [CANAL_VALIDADOR_NO_EXISTE]

- **Test:** [General] codigoError = 404
- **Mensaje:** expected 400 to equal 404
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":400,"mensajeError":"Error en la petición original"}}
```

## 2. 2_validador / 2.2.1. validador — no existe en BD (404) [CANAL_VALIDADOR_NO_EXISTE]

- **Test:** [General] mensajeError = "Validador no existe"
- **Mensaje:** expected 'Error en la petición original' to equal 'Validador no existe'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":400,"mensajeError":"Error en la petición original"}}
```

## 3. 2_validador / 2.2.2. validador — deshabilitado (402) [CANAL_VALIDADOR_DESHABILITADO]

- **Test:** [General] codigoError = 402
- **Mensaje:** expected 400 to equal 402
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":400,"mensajeError":"Error en la petición original"}}
```

## 4. 2_validador / 2.2.2. validador — deshabilitado (402) [CANAL_VALIDADOR_DESHABILITADO]

- **Test:** [General] mensajeError = "Canal validador no disponible"
- **Mensaje:** expected 'Error en la petición original' to equal 'Canal validador no disponible'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":400,"mensajeError":"Error en la petición original"}}
```

## 5. 2_validador / 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Test:** [Lambda VCN] HTTP status = 500 (real: 200)
- **Mensaje:** expected 200 to equal 500
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 6. 2_validador / 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Test:** [General] codigoError = 500
- **Mensaje:** expected 509 to equal 500
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 7. 2_validador / 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Test:** [General] mensajeError = "Error interno"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error interno'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```
