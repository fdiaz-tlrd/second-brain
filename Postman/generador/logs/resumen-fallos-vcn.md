# Resumen de fallos — VCN

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-05T05:13:10.017Z |
| Carpeta | `General` |
| Requests | 234 (failed: 0) |
| Tests | 468 (failed: 153) |
| JSON completo | `logs\ultimo-run-vcn.json` |

## 1. 1_idCanal / 1.1.1. idCanal — propiedad ausente (undefined) (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error al consultar canal-plan por idC…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error al consultar canal-plan por idCanal"}
```

## 2. 1_idCanal / 1.1.4. idCanal — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 3. 1_idCanal / 1.1.4. idCanal — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'ERROR: Excepción no controlada al mom…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 4. 1_idCanal / 1.1.5. idCanal — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 5. 1_idCanal / 1.1.5. idCanal — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'ERROR: Excepción no controlada al mom…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 6. 1_idCanal / 1.1.6. idCanal — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 7. 1_idCanal / 1.1.6. idCanal — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'ERROR: Excepción no controlada al mom…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 8. 1_idCanal / 1.1.7. idCanal — solo espacios, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 9. 1_idCanal / 1.1.7. idCanal — solo espacios, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 10. 1_idCanal / 1.1.8. idCanal — solo tab, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 11. 1_idCanal / 1.1.8. idCanal — solo tab, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 12. 1_idCanal / 1.1.9. idCanal — longitud 5, máximo 4 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 13. 1_idCanal / 1.1.9. idCanal — longitud 5, máximo 4 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 14. 1_idCanal / 1.1.10. idCanal — espacio interno, post-trim (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 15. 1_idCanal / 1.1.10. idCanal — espacio interno, post-trim (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 16. 1_idCanal / 1.1.11. idCanal — símbolo @ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 17. 1_idCanal / 1.1.11. idCanal — símbolo @ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 18. 1_idCanal / 1.1.12. idCanal — paréntesis ( no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 19. 1_idCanal / 1.1.12. idCanal — paréntesis ( no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 20. 1_idCanal / 1.1.13. idCanal — ¿ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 21. 1_idCanal / 1.1.13. idCanal — ¿ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 22. 1_idCanal / 1.1.14. idCanal — comillas " no permitidas (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 23. 1_idCanal / 1.1.14. idCanal — comillas " no permitidas (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 24. 2_validador / 1.2.4. validador — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 25. 2_validador / 1.2.4. validador — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'ERROR: Excepción no controlada al mom…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 26. 2_validador / 1.2.5. validador — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 27. 2_validador / 1.2.5. validador — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'ERROR: Excepción no controlada al mom…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 28. 2_validador / 1.2.6. validador — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 29. 2_validador / 1.2.6. validador — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'ERROR: Excepción no controlada al mom…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 30. 2_validador / 1.2.7. validador — solo espacios, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 31. 2_validador / 1.2.7. validador — solo espacios, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 32. 2_validador / 1.2.8. validador — solo tab, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 33. 2_validador / 1.2.8. validador — solo tab, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 34. 2_validador / 1.2.9. validador — longitud 5, máximo 4 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 35. 2_validador / 1.2.9. validador — longitud 5, máximo 4 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 36. 2_validador / 1.2.10. validador — espacio interno, post-trim (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 37. 2_validador / 1.2.10. validador — espacio interno, post-trim (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 38. 2_validador / 1.2.11. validador — símbolo @ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 39. 2_validador / 1.2.11. validador — símbolo @ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 40. 2_validador / 1.2.12. validador — paréntesis ( no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 41. 2_validador / 1.2.12. validador — paréntesis ( no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 42. 2_validador / 1.2.13. validador — ¿ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 43. 2_validador / 1.2.13. validador — ¿ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 44. 2_validador / 1.2.14. validador — comillas " no permitidas (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 45. 2_validador / 1.2.14. validador — comillas " no permitidas (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 46. 2_validador / 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783228336","respuestas":[{"idSolicitud":"1","resultado":510,"datos":null}]}}
```

## 47. 2_validador / 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected undefined to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783228336","respuestas":[{"idSolicitud":"1","resultado":510,"datos":null}]}}
```

## 48. 2_validador / 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783228336","respuestas":[{"idSolicitud":"1","resultado":510,"datos":null}]}}
```

## 49. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 50. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 51. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 52. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 53. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 54. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 55. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 56. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 57. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 58. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 59. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 60. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 61. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 62. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 63. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 64. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 65. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 66. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 67. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 68. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 69. 4_idPeticion / 1.4.1. idPeticion — propiedad ausente (undefined) (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 70. 4_idPeticion / 1.4.1. idPeticion — propiedad ausente (undefined) (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 71. 4_idPeticion / 1.4.1. idPeticion — propiedad ausente (undefined) (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error interno' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 72. 4_idPeticion / 1.4.2. idPeticion — null (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 73. 4_idPeticion / 1.4.2. idPeticion — null (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 74. 4_idPeticion / 1.4.2. idPeticion — null (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error interno' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 75. 4_idPeticion / 1.4.3. idPeticion — string vacío (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 76. 4_idPeticion / 1.4.3. idPeticion — string vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 77. 4_idPeticion / 1.4.3. idPeticion — string vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error interno' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 78. 4_idPeticion / 1.4.4. idPeticion — tipo number (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 79. 4_idPeticion / 1.4.4. idPeticion — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 80. 4_idPeticion / 1.4.4. idPeticion — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 81. 4_idPeticion / 1.4.5. idPeticion — tipo boolean (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 82. 4_idPeticion / 1.4.5. idPeticion — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 83. 4_idPeticion / 1.4.5. idPeticion — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 84. 4_idPeticion / 1.4.6. idPeticion — tipo object (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 85. 4_idPeticion / 1.4.6. idPeticion — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 86. 4_idPeticion / 1.4.6. idPeticion — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 87. 4_idPeticion / 1.4.7. idPeticion — solo espacios (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 88. 4_idPeticion / 1.4.7. idPeticion — solo espacios (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 89. 4_idPeticion / 1.4.7. idPeticion — solo espacios (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error interno' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 90. 4_idPeticion / 1.4.8. idPeticion — solo tab (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 91. 4_idPeticion / 1.4.8. idPeticion — solo tab (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 92. 4_idPeticion / 1.4.8. idPeticion — solo tab (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error interno' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 93. 4_idPeticion / 1.4.9. idPeticion — longitud 7, mínimo 8 (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 94. 4_idPeticion / 1.4.9. idPeticion — longitud 7, mínimo 8 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 95. 4_idPeticion / 1.4.9. idPeticion — longitud 7, mínimo 8 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 96. 4_idPeticion / 1.4.10. idPeticion — longitud 65, máximo 64 (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 97. 4_idPeticion / 1.4.10. idPeticion — longitud 65, máximo 64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 98. 4_idPeticion / 1.4.10. idPeticion — longitud 65, máximo 64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 99. 4_idPeticion / 1.4.11. idPeticion — espacio interno (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 100. 4_idPeticion / 1.4.11. idPeticion — espacio interno (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 101. 4_idPeticion / 1.4.11. idPeticion — espacio interno (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 102. 4_idPeticion / 1.4.12. idPeticion — símbolo @ (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 103. 4_idPeticion / 1.4.12. idPeticion — símbolo @ (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 104. 4_idPeticion / 1.4.12. idPeticion — símbolo @ (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 105. 4_idPeticion / 1.4.13. idPeticion — unicode interrogación apertura (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 106. 4_idPeticion / 1.4.13. idPeticion — unicode interrogación apertura (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 107. 4_idPeticion / 1.4.13. idPeticion — unicode interrogación apertura (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 108. 4_idPeticion / 1.4.14. idPeticion — comillas (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 109. 4_idPeticion / 1.4.14. idPeticion — comillas (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 110. 4_idPeticion / 1.4.14. idPeticion — comillas (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 111. 4_idPeticion / 1.4.15. idPeticion — prefijo SWIFT ajeno (445)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 112. 4_idPeticion / 1.4.15. idPeticion — prefijo SWIFT ajeno (445)

- **Test:** [General] codigoError = 445
- **Mensaje:** expected 509 to equal 445
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 113. 4_idPeticion / 1.4.15. idPeticion — prefijo SWIFT ajeno (445)

- **Test:** [General] mensajeError = "El prefijo Código SWIFT del idPeticion no coincide con el canal emisor"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'El prefijo Código SWIFT del idPeticio…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 114. 5_solicitudes / 1.5.1. solicitudes — tipo string (425)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783228369","respuestas":[{"resultado":413,"datos":null}]}}
```

## 115. 5_solicitudes / 1.5.1. solicitudes — tipo string (425)

- **Test:** [General] codigoError = 425
- **Mensaje:** expected undefined to equal 425
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783228369","respuestas":[{"resultado":413,"datos":null}]}}
```

## 116. 5_solicitudes / 1.5.1. solicitudes — tipo string (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected undefined to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783228369","respuestas":[{"resultado":413,"datos":null}]}}
```

## 117. 5_solicitudes / 1.5.2. solicitudes — arreglo vacío (425)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783228370","respuestas":[{"resultado":413,"datos":null}]}}
```

## 118. 5_solicitudes / 1.5.2. solicitudes — arreglo vacío (425)

- **Test:** [General] codigoError = 425
- **Mensaje:** expected undefined to equal 425
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783228370","respuestas":[{"resultado":413,"datos":null}]}}
```

## 119. 5_solicitudes / 1.5.2. solicitudes — arreglo vacío (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected undefined to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783228370","respuestas":[{"resultado":413,"datos":null}]}}
```

## 120. 5_solicitudes / 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 121. 5_solicitudes / 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)

- **Test:** [General] codigoError = 425
- **Mensaje:** expected 509 to equal 425
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 122. 5_solicitudes / 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 123. 5_solicitudes / 1.5.4. solicitudes — sin propiedad idSolicitud (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 124. 5_solicitudes / 1.5.4. solicitudes — sin propiedad idSolicitud (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 125. 5_solicitudes / 1.5.4. solicitudes — sin propiedad idSolicitud (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 126. 5_solicitudes / 1.5.5. solicitudes — idSolicitud vacío (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 127. 5_solicitudes / 1.5.5. solicitudes — idSolicitud vacío (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 128. 5_solicitudes / 1.5.5. solicitudes — idSolicitud vacío (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 129. 5_solicitudes / 1.5.6. solicitudes — idSolicitud tipo number (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 130. 5_solicitudes / 1.5.6. solicitudes — idSolicitud tipo number (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 131. 5_solicitudes / 1.5.6. solicitudes — idSolicitud tipo number (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 132. 5_solicitudes / 1.5.7. solicitudes — idSolicitud solo espacios (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 133. 5_solicitudes / 1.5.7. solicitudes — idSolicitud solo espacios (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 134. 5_solicitudes / 1.5.7. solicitudes — idSolicitud solo espacios (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 135. 5_solicitudes / 1.5.8. solicitudes — idSolicitud longitud 65 (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 136. 5_solicitudes / 1.5.8. solicitudes — idSolicitud longitud 65 (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 137. 5_solicitudes / 1.5.8. solicitudes — idSolicitud longitud 65 (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 138. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 139. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 140. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 141. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 142. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [General] codigoError = 403
- **Mensaje:** expected 509 to equal 403
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 143. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [General] mensajeError = "Canal emisor no tiene un plan de suscripción"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Canal emisor no tiene un plan de susc…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 144. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [Lambda VCN] HTTP status = 500 (real: 400)
- **Mensaje:** expected 400 to equal 500
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 145. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [General] mensajeError = "Error interno"
- **Mensaje:** expected 'ERROR: Excepción no controlada al mom…' to equal 'Error interno'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"ERROR: Excepción no controlada al momento de buscar la información del canal"}
```

## 146. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 147. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [General] codigoError = 403
- **Mensaje:** expected 509 to equal 403
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 148. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [General] mensajeError = "Canal emisor no tiene un plan de suscripción"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Canal emisor no tiene un plan de susc…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 149. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 150. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [General] codigoError = 418
- **Mensaje:** expected 509 to equal 418
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 151. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [General] mensajeError = "Método no soportado"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Método no soportado'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}
```

## 152. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [General] codigoError = 418
- **Mensaje:** expected 405 to equal 418
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 153. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [General] mensajeError = "Método no soportado"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Método no soportado'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```
