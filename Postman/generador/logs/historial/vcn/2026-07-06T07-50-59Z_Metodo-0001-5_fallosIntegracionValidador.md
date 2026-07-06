# Resumen de fallos — VCN

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-06T07:50:59.983Z |
| Carpeta | `Metodo/0001/5_fallosIntegracionValidador` |
| Requests | 18 (failed: 0) |
| Tests | 42 (failed: 12) |
| JSON completo | `logs\ultimo-run-vcn.json` |

## 1. 1022_fijo / 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)

- **Test:** [Lambda VCN] HTTP status = 200 (real: 502)
- **Mensaje:** expected 502 to equal 200
- **HTTP descifrar:** 200

```json
{"message":"Internal server error"}
```

## 2. 1022_fijo / 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)

- **Test:** [General] codigoError = 599
- **Mensaje:** expected undefined to equal 599
- **HTTP descifrar:** 200

```json
{"message":"Internal server error"}
```

## 3. 1022_fijo / 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)

- **Test:** [General] mensajeError = "Tiempo de espera agotado al llamar al Canal Validador"
- **Mensaje:** expected undefined to equal 'Tiempo de espera agotado al llamar al…'
- **HTTP descifrar:** 200

```json
{"message":"Internal server error"}
```

## 4. 1023_token / 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)

- **Test:** [Lambda VCN] HTTP status = 200 (real: 500)
- **Mensaje:** expected 500 to equal 200
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":500,"mensajeError":"Error interno"}}
```

## 5. 1023_token / 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)

- **Test:** [General] codigoError = 599
- **Mensaje:** expected 500 to equal 599
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":500,"mensajeError":"Error interno"}}
```

## 6. 1023_token / 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)

- **Test:** [General] mensajeError = "Tiempo de espera agotado al llamar al Canal Validador"
- **Mensaje:** expected 'Error interno' to equal 'Tiempo de espera agotado al llamar al…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":500,"mensajeError":"Error interno"}}
```

## 7. 1023_token / 0001.5.1023.2. validador OUTFGATO auth token — cifrado invertido (406)

- **Test:** [Lambda VCN] HTTP status = 200 (real: 500)
- **Mensaje:** expected 500 to equal 200
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":500,"mensajeError":"Error interno"}}
```

## 8. 1023_token / 0001.5.1023.2. validador OUTFGATO auth token — cifrado invertido (406)

- **Test:** [General] codigoError = 406
- **Mensaje:** expected 500 to equal 406
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":500,"mensajeError":"Error interno"}}
```

## 9. 1023_token / 0001.5.1023.2. validador OUTFGATO auth token — cifrado invertido (406)

- **Test:** [General] mensajeError = "Error en descifrado canal validador"
- **Mensaje:** expected 'Error interno' to equal 'Error en descifrado canal validador'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":500,"mensajeError":"Error interno"}}
```

## 10. 1023_token / 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)

- **Test:** [Lambda VCN] HTTP status = 200 (real: 500)
- **Mensaje:** expected 500 to equal 200
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":500,"mensajeError":"Error interno"}}
```

## 11. 1023_token / 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)

- **Test:** [General] codigoError = 509
- **Mensaje:** expected 500 to equal 509
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":500,"mensajeError":"Error interno"}}
```

## 12. 1023_token / 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)

- **Test:** [General] mensajeError = "Error inesperado en el Canal Validador"
- **Mensaje:** expected 'Error interno' to equal 'Error inesperado en el Canal Validador'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":500,"mensajeError":"Error interno"}}
```
