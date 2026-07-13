# Resumen de fallos — P2P

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-13T08:53:01.512Z |
| Código fuente | prod |
| Nivel ejecución | MATRIZ |
| Carpeta | `(completo)` |
| Nota | MATRIZ P2P prod-a-dev alias revision codigoError |
| Requests | 2159 (failed: 0) |
| Tests | 2783 (failed: 578) |
| JSON completo | `logs\ultimo-run-p2p.json` |

## 1. 0_jsonEntrada / 0.1. body — JSON HTTP inválido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 550 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 2. 0_jsonEntrada / 0.1. body — JSON HTTP inválido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 3. 1_idCanal / 1.1.1. idCanal — propiedad ausente (undefined) (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo canal"}
```

## 4. 1_idCanal / 1.1.2. idCanal — null (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 550 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 5. 1_idCanal / 1.1.2. idCanal — null (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 6. 1_idCanal / 1.1.3. idCanal — string vacío "" (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 550 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 7. 1_idCanal / 1.1.3. idCanal — string vacío "" (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 8. 1_idCanal / 1.1.4. idCanal — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 550 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 9. 1_idCanal / 1.1.4. idCanal — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 10. 1_idCanal / 1.1.5. idCanal — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 550 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 11. 1_idCanal / 1.1.5. idCanal — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 12. 1_idCanal / 1.1.6. idCanal — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 550 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 13. 1_idCanal / 1.1.6. idCanal — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 14. 1_idCanal / 1.1.7. idCanal — solo espacios, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 15. 1_idCanal / 1.1.7. idCanal — solo espacios, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 16. 1_idCanal / 1.1.8. idCanal — solo tab, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 17. 1_idCanal / 1.1.8. idCanal — solo tab, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 18. 1_idCanal / 1.1.9. idCanal — longitud 5, máximo 4 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo canal"}
```

## 19. 1_idCanal / 1.1.10. idCanal — espacio interno, post-trim (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 20. 1_idCanal / 1.1.10. idCanal — espacio interno, post-trim (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 21. 1_idCanal / 1.1.11. idCanal — símbolo @ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 22. 1_idCanal / 1.1.11. idCanal — símbolo @ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 23. 1_idCanal / 1.1.12. idCanal — paréntesis ( no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 24. 1_idCanal / 1.1.12. idCanal — paréntesis ( no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 25. 1_idCanal / 1.1.13. idCanal — ¿ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 26. 1_idCanal / 1.1.13. idCanal — ¿ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 27. 1_idCanal / 1.1.14. idCanal — comillas " no permitidas (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 28. 1_idCanal / 1.1.14. idCanal — comillas " no permitidas (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 29. 2_validador / 1.2.1. validador — propiedad ausente (undefined) (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo validador"}
```

## 30. 2_validador / 1.2.2. validador — null (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo validador"}
```

## 31. 2_validador / 1.2.3. validador — string vacío "" (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo validador"}
```

## 32. 2_validador / 1.2.4. validador — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 33. 2_validador / 1.2.4. validador — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 34. 2_validador / 1.2.5. validador — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 35. 2_validador / 1.2.5. validador — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 36. 2_validador / 1.2.6. validador — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 37. 2_validador / 1.2.6. validador — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 38. 2_validador / 1.2.7. validador — solo espacios, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 39. 2_validador / 1.2.7. validador — solo espacios, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 40. 2_validador / 1.2.8. validador — solo tab, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 41. 2_validador / 1.2.8. validador — solo tab, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 42. 2_validador / 1.2.9. validador — longitud 9, máximo 8 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo validador"}
```

## 43. 2_validador / 1.2.10. validador — espacio interno, post-trim (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 44. 2_validador / 1.2.10. validador — espacio interno, post-trim (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 45. 2_validador / 1.2.11. validador — símbolo @ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 46. 2_validador / 1.2.11. validador — símbolo @ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 47. 2_validador / 1.2.12. validador — paréntesis ( no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 48. 2_validador / 1.2.12. validador — paréntesis ( no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 49. 2_validador / 1.2.13. validador — ¿ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 50. 2_validador / 1.2.13. validador — ¿ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 51. 2_validador / 1.2.14. validador — comillas " no permitidas (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 52. 2_validador / 1.2.14. validador — comillas " no permitidas (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 53. 2_validador / 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 54. 2_validador / 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 55. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 56. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 57. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 58. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 59. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 60. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 61. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 62. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 63. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 64. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 65. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 66. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 67. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 68. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 69. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 70. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 71. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 72. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 73. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 74. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 75. 4_idPeticion / 1.4.9. idPeticion — longitud 7, mínimo 8 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 76. 4_idPeticion / 1.4.9. idPeticion — longitud 7, mínimo 8 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 77. 4_idPeticion / 1.4.11. idPeticion — espacio interno (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 78. 4_idPeticion / 1.4.11. idPeticion — espacio interno (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 79. 4_idPeticion / 1.4.12. idPeticion — símbolo @ (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 80. 4_idPeticion / 1.4.12. idPeticion — símbolo @ (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 81. 4_idPeticion / 1.4.13. idPeticion — unicode interrogación apertura (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 82. 4_idPeticion / 1.4.13. idPeticion — unicode interrogación apertura (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 83. 4_idPeticion / 1.4.14. idPeticion — comillas (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 84. 4_idPeticion / 1.4.14. idPeticion — comillas (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 85. 4_idPeticion / 1.4.15. idPeticion — prefijo SWIFT ajeno (445)

- **Test:** [General] codigoError = 445
- **Mensaje:** expected 509 to equal 445
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 86. 4_idPeticion / 1.4.15. idPeticion — prefijo SWIFT ajeno (445)

- **Test:** [General] mensajeError = "El prefijo Código SWIFT del idPeticion no coincide con el canal emisor"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'El prefijo Código SWIFT del idPeticio…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 87. 5_solicitudes / 1.5.1. solicitudes — tipo string (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 88. 5_solicitudes / 1.5.2. solicitudes — arreglo vacío (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 89. 5_solicitudes / 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 90. 5_solicitudes / 1.5.4. solicitudes — sin propiedad idSolicitud (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 91. 5_solicitudes / 1.5.5. solicitudes — idSolicitud vacío (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 92. 5_solicitudes / 1.5.6. solicitudes — idSolicitud tipo number (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 93. 5_solicitudes / 1.5.7. solicitudes — idSolicitud solo espacios (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 94. 5_solicitudes / 1.5.8. solicitudes — idSolicitud longitud 65 (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 95. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 96. 5_solicitudes / 1.5.10. solicitudes — guion bajo (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 97. 5_solicitudes / 1.5.10. solicitudes — guion bajo (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 98. 5_solicitudes / 1.5.11. solicitudes — espacio interno (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 99. 5_solicitudes / 1.5.11. solicitudes — espacio interno (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 100. 5_solicitudes / 1.5.12. solicitudes — espacio al inicio (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 101. 5_solicitudes / 1.5.12. solicitudes — espacio al inicio (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 102. 5_solicitudes / 1.5.13. solicitudes — espacio al final (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 103. 5_solicitudes / 1.5.13. solicitudes — espacio al final (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 104. 5_solicitudes / 1.5.14. solicitudes — arroba (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 105. 5_solicitudes / 1.5.14. solicitudes — arroba (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 106. 5_solicitudes / 1.5.15. solicitudes — punto (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 107. 5_solicitudes / 1.5.15. solicitudes — punto (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 108. 5_solicitudes / 1.5.16. solicitudes — unicode (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 109. 5_solicitudes / 1.5.16. solicitudes — unicode (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 110. 5_solicitudes / 1.5.17. solicitudes — barra (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 111. 5_solicitudes / 1.5.17. solicitudes — barra (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 112. 5_solicitudes / 1.5.18. solicitudes — comillas (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 113. 5_solicitudes / 1.5.18. solicitudes — comillas (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 114. 5_solicitudes / 1.5.19. solicitudes — elemento null en arreglo (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 999 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 115. 5_solicitudes / 1.5.19. solicitudes — elemento null en arreglo (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error en la solicitud' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 116. 5_solicitudes / 1.5.20. solicitudes — idSolicitud null (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 117. 5_solicitudes / 1.5.21. solicitudes — idSolicitud tipo boolean true (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 118. 5_solicitudes / 1.5.22. solicitudes — idSolicitud tipo boolean false (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 119. 5_solicitudes / 1.5.23. solicitudes — solo guiones (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 120. 5_solicitudes / 1.5.23. solicitudes — solo guiones (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 121. 5_solicitudes / 1.5.24. solicitudes — un solo guion (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 122. 5_solicitudes / 1.5.24. solicitudes — un solo guion (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 123. 5_solicitudes / 1.5.25. solicitudes — idSolicitud tipo object (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 124. 5_solicitudes / 1.5.26. solicitudes — idSolicitud tipo array (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 125. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [General] codigoError = 403
- **Mensaje:** expected 509 to equal 403
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 126. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [General] mensajeError = "Canal emisor no tiene un plan de suscripción"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Canal emisor no tiene un plan de susc…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 127. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [General] codigoError = 500
- **Mensaje:** expected 405 to equal 500
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 128. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [General] mensajeError = "Error interno"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error interno'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 129. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [General] codigoError = 403
- **Mensaje:** expected 509 to equal 403
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 130. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [General] mensajeError = "Canal emisor no tiene un plan de suscripción"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Canal emisor no tiene un plan de susc…'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 131. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [General] codigoError = 418
- **Mensaje:** expected 509 to equal 418
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 132. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [General] mensajeError = "Método no soportado"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Método no soportado'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 133. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [General] codigoError = 418
- **Mensaje:** expected 509 to equal 418
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 134. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [General] mensajeError = "Método no soportado"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Método no soportado'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 135. 1_tipoIdentificador / 0002.1.1.1. tipoIdentificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 136. 1_tipoIdentificador / 0002.1.1.2. tipoIdentificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 137. 1_tipoIdentificador / 0002.1.1.3. tipoIdentificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 138. 1_tipoIdentificador / 0002.1.1.4. tipoIdentificador — tipo number (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 139. 1_tipoIdentificador / 0002.1.1.5. tipoIdentificador — tipo boolean (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 140. 1_tipoIdentificador / 0002.1.1.6. tipoIdentificador — tipo object (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 141. 1_tipoIdentificador / 0002.1.1.7. tipoIdentificador — valor incorrecto COMERCIO (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 142. 1_tipoIdentificador / 0002.1.1.8. tipoIdentificador — valor minúsculas (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 143. 1_tipoIdentificador / 0002.1.1.9. tipoIdentificador — solo espacios (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 144. 2_identificador / 0002.1.2.1. identificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 145. 2_identificador / 0002.1.2.2. identificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 146. 2_identificador / 0002.1.2.3. identificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 147. 2_identificador / 0002.1.2.4. identificador — tipo number (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 148. 2_identificador / 0002.1.2.5. identificador — tipo boolean (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 149. 2_identificador / 0002.1.2.6. identificador — tipo object (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 150. 2_identificador / 0002.1.2.7. identificador — no inicia con 6 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 151. 2_identificador / 0002.1.2.8. identificador — longitud 7 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 152. 2_identificador / 0002.1.2.9. identificador — longitud 9 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 153. 2_identificador / 0002.1.2.10. identificador — con letras (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 154. 2_identificador / 0002.1.2.11. identificador — solo espacios (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 155. 2_identificador / 0002.1.2.12. identificador — espacio interno (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 156. 1_identificador / 0003.1.1.1. identificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 157. 1_identificador / 0003.1.1.2. identificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 158. 1_identificador / 0003.1.1.3. identificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 159. 1_identificador / 0003.1.1.4. identificador — tipo number (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 160. 1_identificador / 0003.1.1.5. identificador — tipo boolean (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 161. 1_identificador / 0003.1.1.6. identificador — tipo object (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 162. 1_identificador / 0003.1.1.7. identificador — no inicia con 6 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 163. 1_identificador / 0003.1.1.8. identificador — longitud 7 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 164. 1_identificador / 0003.1.1.9. identificador — longitud 9 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 165. 1_identificador / 0003.1.1.10. identificador — con letras (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 166. 1_identificador / 0003.1.1.11. identificador — solo espacios (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 167. 1_identificador / 0003.1.1.12. identificador — espacio interno (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 168. 2_tipoIdentificador / 0003.1.2.1. tipoIdentificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 169. 2_tipoIdentificador / 0003.1.2.2. tipoIdentificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 170. 2_tipoIdentificador / 0003.1.2.3. tipoIdentificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 171. 2_tipoIdentificador / 0003.1.2.4. tipoIdentificador — tipo number (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 172. 2_tipoIdentificador / 0003.1.2.5. tipoIdentificador — tipo boolean (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 173. 2_tipoIdentificador / 0003.1.2.6. tipoIdentificador — tipo object (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 174. 2_tipoIdentificador / 0003.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 175. 2_tipoIdentificador / 0003.1.2.8. tipoIdentificador — valor minúsculas (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 176. 2_tipoIdentificador / 0003.1.2.9. tipoIdentificador — solo espacios (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 177. 1_identificador / 0004.1.1.1. identificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 178. 1_identificador / 0004.1.1.2. identificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 179. 1_identificador / 0004.1.1.3. identificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 180. 1_identificador / 0004.1.1.4. identificador — tipo number (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 181. 1_identificador / 0004.1.1.5. identificador — tipo boolean (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 182. 1_identificador / 0004.1.1.6. identificador — tipo object (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 183. 1_identificador / 0004.1.1.7. identificador — no inicia con 6 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 184. 1_identificador / 0004.1.1.8. identificador — longitud 7 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 185. 1_identificador / 0004.1.1.9. identificador — longitud 9 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 186. 1_identificador / 0004.1.1.10. identificador — con letras (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 187. 1_identificador / 0004.1.1.11. identificador — solo espacios (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 188. 1_identificador / 0004.1.1.12. identificador — espacio interno (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 189. 2_tipoIdentificador / 0004.1.2.1. tipoIdentificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 190. 2_tipoIdentificador / 0004.1.2.2. tipoIdentificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 191. 2_tipoIdentificador / 0004.1.2.3. tipoIdentificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 192. 2_tipoIdentificador / 0004.1.2.4. tipoIdentificador — tipo number (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 193. 2_tipoIdentificador / 0004.1.2.5. tipoIdentificador — tipo boolean (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 194. 2_tipoIdentificador / 0004.1.2.6. tipoIdentificador — tipo object (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 195. 2_tipoIdentificador / 0004.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 196. 2_tipoIdentificador / 0004.1.2.8. tipoIdentificador — valor minúsculas (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 197. 2_tipoIdentificador / 0004.1.2.9. tipoIdentificador — solo espacios (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 198. 3_idPregunta / 0004.1.3.1. idPregunta — propiedad ausente (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 199. 3_idPregunta / 0004.1.3.2. idPregunta — null (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 200. 3_idPregunta / 0004.1.3.3. idPregunta — string vacío (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 201. 3_idPregunta / 0004.1.3.4. idPregunta — tipo number (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 202. 3_idPregunta / 0004.1.3.5. idPregunta — tipo boolean (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 203. 3_idPregunta / 0004.1.3.6. idPregunta — tipo object (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 204. 3_idPregunta / 0004.1.3.7. idPregunta — símbolo arroba (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 205. 3_idPregunta / 0004.1.3.8. idPregunta — espacio interno (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 206. 3_idPregunta / 0004.1.3.9. idPregunta — solo espacios (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 207. 3_idPregunta / 0004.1.3.10. idPregunta — guion bajo (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 208. 3_idPregunta / 0004.1.3.11. idPregunta — punto (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 209. 3_idPregunta / 0004.1.3.12. idPregunta — barra (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 210. 3_idPregunta / 0004.1.3.13. idPregunta — comillas (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 211. 3_idPregunta / 0004.1.3.14. idPregunta — unicode (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 212. 3_idPregunta / 0004.1.3.15. idPregunta — espacio al inicio (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 213. 3_idPregunta / 0004.1.3.16. idPregunta — espacio al final (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 214. 3_idPregunta / 0004.1.3.17. idPregunta — un solo dígito (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 215. 3_idPregunta / 0004.1.3.18. idPregunta — tres dígitos (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 216. 3_idPregunta / 0004.1.3.19. idPregunta — solo letras (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 217. 3_idPregunta / 0004.1.3.20. idPregunta — tipo array (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 218. 3_idPregunta / 0004.1.3.21. idPregunta — tipo boolean false (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 219. 3_idPregunta / 0004.1.3.22. idPregunta — un solo guion (428)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 220. 4_respuesta / 0004.1.4.1. respuesta — propiedad ausente (429)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 221. 4_respuesta / 0004.1.4.2. respuesta — null (429)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 222. 4_respuesta / 0004.1.4.3. respuesta — string vacío (429)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 223. 4_respuesta / 0004.1.4.4. respuesta — tipo number (429)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 224. 4_respuesta / 0004.1.4.5. respuesta — tipo boolean (429)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 225. 4_respuesta / 0004.1.4.6. respuesta — tipo object (429)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 226. 4_respuesta / 0004.1.4.7. respuesta — símbolo arroba (429)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 227. 4_respuesta / 0004.1.4.8. respuesta — espacio interno (429)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 228. 4_respuesta / 0004.1.4.9. respuesta — solo espacios (429)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 229. 5_banco / 0004.1.5.1. banco — propiedad ausente (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 230. 5_banco / 0004.1.5.2. banco — null (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 231. 5_banco / 0004.1.5.3. banco — string vacío (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 232. 5_banco / 0004.1.5.4. banco — tipo number (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 233. 5_banco / 0004.1.5.5. banco — tipo boolean (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 234. 5_banco / 0004.1.5.6. banco — tipo object (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 235. 5_banco / 0004.1.5.7. banco — longitud 3 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 236. 5_banco / 0004.1.5.8. banco — longitud 13 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 237. 5_banco / 0004.1.5.9. banco — longitud 7 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 238. 5_banco / 0004.1.5.10. banco — solo espacios (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 239. 5_banco / 0004.1.5.11. banco — símbolo arroba (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 240. 5_banco / 0004.1.5.12. banco — espacio interno (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 241. 5_banco / 0004.1.5.13. banco — paréntesis (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 242. 5_banco / 0004.1.5.14. banco — SWIFT no coincide con emisor (412)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 243. 6_cuenta / 0004.1.6.1. cuenta — propiedad ausente (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 244. 6_cuenta / 0004.1.6.2. cuenta — null (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 245. 6_cuenta / 0004.1.6.3. cuenta — string vacío (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 246. 6_cuenta / 0004.1.6.5. cuenta — tipo number (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 247. 6_cuenta / 0004.1.6.6. cuenta — tipo boolean (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 248. 6_cuenta / 0004.1.6.7. cuenta — tipo object (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 249. 6_cuenta / 0004.1.6.8. cuenta — no solo dígitos (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 250. 6_cuenta / 0004.1.6.9. cuenta — longitud 35 (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 251. 6_cuenta / 0004.1.6.10. cuenta — espacio interno (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 252. 6_cuenta / 0004.1.6.11. cuenta — guión (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 253. 6_cuenta / 0004.1.6.12. cuenta — espacio al inicio (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 254. 7_producto / 0004.1.7.1. producto — propiedad ausente (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 255. 7_producto / 0004.1.7.2. producto — null (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 256. 7_producto / 0004.1.7.3. producto — string vacío (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 257. 7_producto / 0004.1.7.5. producto — tipo number (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 258. 7_producto / 0004.1.7.6. producto — tipo boolean (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 259. 7_producto / 0004.1.7.7. producto — tipo object (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 260. 7_producto / 0004.1.7.8. producto — valor inválido PACX (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 261. 7_producto / 0004.1.7.9. producto — valor minúsculas (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 262. 7_producto / 0004.1.7.10. producto — espacio al final (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 263. 1_banco / 0005.1.1.1. banco — propiedad ausente (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 264. 1_banco / 0005.1.1.2. banco — null (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 265. 1_banco / 0005.1.1.3. banco — string vacío (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 266. 1_banco / 0005.1.1.4. banco — tipo number (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 267. 1_banco / 0005.1.1.5. banco — tipo boolean (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 268. 1_banco / 0005.1.1.6. banco — tipo object (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 269. 1_banco / 0005.1.1.7. banco — longitud 3 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 270. 1_banco / 0005.1.1.8. banco — longitud 13 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 271. 1_banco / 0005.1.1.9. banco — longitud 7 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 272. 1_banco / 0005.1.1.10. banco — solo espacios (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 273. 1_banco / 0005.1.1.11. banco — símbolo arroba (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 274. 1_banco / 0005.1.1.12. banco — espacio interno (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 275. 1_banco / 0005.1.1.13. banco — paréntesis (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 276. 1_banco / 0005.1.1.14. banco — SWIFT no coincide con emisor (412)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 277. 1_identificador / 0006.1.1.1. identificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 278. 1_identificador / 0006.1.1.2. identificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 279. 1_identificador / 0006.1.1.3. identificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 280. 1_identificador / 0006.1.1.4. identificador — tipo number (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 281. 1_identificador / 0006.1.1.5. identificador — tipo boolean (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 282. 1_identificador / 0006.1.1.6. identificador — tipo object (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 283. 1_identificador / 0006.1.1.7. identificador — no inicia con 6 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 284. 1_identificador / 0006.1.1.8. identificador — longitud 7 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 285. 1_identificador / 0006.1.1.9. identificador — longitud 9 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 286. 1_identificador / 0006.1.1.10. identificador — con letras (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 287. 1_identificador / 0006.1.1.11. identificador — solo espacios (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 288. 1_identificador / 0006.1.1.12. identificador — espacio interno (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 289. 2_tipoIdentificador / 0006.1.2.1. tipoIdentificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 290. 2_tipoIdentificador / 0006.1.2.2. tipoIdentificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 291. 2_tipoIdentificador / 0006.1.2.3. tipoIdentificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 292. 2_tipoIdentificador / 0006.1.2.4. tipoIdentificador — tipo number (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 293. 2_tipoIdentificador / 0006.1.2.5. tipoIdentificador — tipo boolean (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 294. 2_tipoIdentificador / 0006.1.2.6. tipoIdentificador — tipo object (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 295. 2_tipoIdentificador / 0006.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 296. 2_tipoIdentificador / 0006.1.2.8. tipoIdentificador — valor minúsculas (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 297. 2_tipoIdentificador / 0006.1.2.9. tipoIdentificador — solo espacios (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 298. 3_respuestas / 0006.1.3.1. respuestas — propiedad ausente (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 299. 3_respuestas / 0006.1.3.2. respuestas — null (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 300. 3_respuestas / 0006.1.3.3. respuestas — tipo string (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 301. 3_respuestas / 0006.1.3.4. respuestas — tipo number (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 302. 3_respuestas / 0006.1.3.5. respuestas — arreglo vacío (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 303. 3_respuestas / 0006.1.3.6. respuestas — un solo elemento (esperados 2) (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 304. 3_respuestas / 0006.1.3.7. respuestas — tres elementos (esperados 2) (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 305. 3_respuestas / 0006.1.3.8. respuestas — elemento no objeto (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 306. 3_respuestas / 0006.1.3.9. respuestas — item sin propiedad texto (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 307. 3_respuestas / 0006.1.3.10. respuestas — item sin propiedad id (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 308. 3_respuestas / 0006.1.3.11. respuestas — id tipo number (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 309. 3_respuestas / 0006.1.3.12. respuestas — texto tipo number (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 310. 3_respuestas / 0006.1.3.13. respuestas — id vacío (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 311. 3_respuestas / 0006.1.3.14. respuestas — texto vacío (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 312. 3_respuestas / 0006.1.3.15. respuestas — id duplicado (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 313. 3_respuestas / 0006.1.3.16. respuestas — propiedad extra en item (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 314. 3_respuestas / 0006.1.3.17. respuestas — id guion bajo (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 315. 3_respuestas / 0006.1.3.18. respuestas — id arroba (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 316. 3_respuestas / 0006.1.3.19. respuestas — id espacio interno (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 317. 3_respuestas / 0006.1.3.20. respuestas — id espacio al inicio (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 318. 3_respuestas / 0006.1.3.21. respuestas — id espacio al final (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 319. 3_respuestas / 0006.1.3.22. respuestas — id unicode (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 320. 3_respuestas / 0006.1.3.23. respuestas — id punto (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 321. 3_respuestas / 0006.1.3.24. respuestas — id barra (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 322. 3_respuestas / 0006.1.3.25. respuestas — id comillas (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 323. 3_respuestas / 0006.1.3.26. respuestas — id un solo dígito (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 324. 3_respuestas / 0006.1.3.27. respuestas — id tres dígitos (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 325. 3_respuestas / 0006.1.3.28. respuestas — id solo letras (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 326. 3_respuestas / 0006.1.3.29. respuestas — id tipo boolean true (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 327. 3_respuestas / 0006.1.3.30. respuestas — id tipo boolean false (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 328. 3_respuestas / 0006.1.3.31. respuestas — id tipo object (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 329. 3_respuestas / 0006.1.3.32. respuestas — id tipo array (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 330. 3_respuestas / 0006.1.3.33. respuestas — elemento null en arreglo (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 331. 3_respuestas / 0006.1.3.34. respuestas — texto solo espacios (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 332. 4_banco / 0006.1.4.1. banco — propiedad ausente (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 333. 4_banco / 0006.1.4.2. banco — null (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 334. 4_banco / 0006.1.4.3. banco — string vacío (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 335. 4_banco / 0006.1.4.4. banco — tipo number (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 336. 4_banco / 0006.1.4.5. banco — tipo boolean (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 337. 4_banco / 0006.1.4.6. banco — tipo object (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 338. 4_banco / 0006.1.4.7. banco — longitud 3 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 339. 4_banco / 0006.1.4.8. banco — longitud 13 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 340. 4_banco / 0006.1.4.9. banco — longitud 7 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 341. 4_banco / 0006.1.4.10. banco — solo espacios (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 342. 4_banco / 0006.1.4.11. banco — símbolo arroba (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 343. 4_banco / 0006.1.4.12. banco — espacio interno (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 344. 4_banco / 0006.1.4.13. banco — paréntesis (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 345. 4_banco / 0006.1.4.14. banco — SWIFT no coincide con emisor (412)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 346. 5_cuenta / 0006.1.5.1. cuenta — propiedad ausente (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 347. 5_cuenta / 0006.1.5.2. cuenta — null (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 348. 5_cuenta / 0006.1.5.3. cuenta — string vacío (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 349. 5_cuenta / 0006.1.5.5. cuenta — tipo number (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 350. 5_cuenta / 0006.1.5.6. cuenta — tipo boolean (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 351. 5_cuenta / 0006.1.5.7. cuenta — tipo object (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 352. 5_cuenta / 0006.1.5.8. cuenta — no solo dígitos (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 353. 5_cuenta / 0006.1.5.9. cuenta — longitud 35 (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 354. 5_cuenta / 0006.1.5.10. cuenta — espacio interno (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 355. 5_cuenta / 0006.1.5.11. cuenta — guión (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 356. 5_cuenta / 0006.1.5.12. cuenta — espacio al inicio (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 357. 6_producto / 0006.1.6.1. producto — propiedad ausente (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 358. 6_producto / 0006.1.6.2. producto — null (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 359. 6_producto / 0006.1.6.3. producto — string vacío (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 360. 6_producto / 0006.1.6.5. producto — tipo number (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 361. 6_producto / 0006.1.6.6. producto — tipo boolean (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 362. 6_producto / 0006.1.6.7. producto — tipo object (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 363. 6_producto / 0006.1.6.8. producto — valor inválido PACX (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 364. 6_producto / 0006.1.6.9. producto — valor minúsculas (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 365. 6_producto / 0006.1.6.10. producto — espacio al final (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 366. 1_identificador / 0007.1.1.1. identificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 367. 1_identificador / 0007.1.1.2. identificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 368. 1_identificador / 0007.1.1.3. identificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 369. 1_identificador / 0007.1.1.4. identificador — tipo number (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 370. 1_identificador / 0007.1.1.5. identificador — tipo boolean (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 371. 1_identificador / 0007.1.1.6. identificador — tipo object (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 372. 1_identificador / 0007.1.1.7. identificador — no inicia con 6 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 373. 1_identificador / 0007.1.1.8. identificador — longitud 7 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 374. 1_identificador / 0007.1.1.9. identificador — longitud 9 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 375. 1_identificador / 0007.1.1.10. identificador — con letras (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 376. 1_identificador / 0007.1.1.11. identificador — solo espacios (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 377. 1_identificador / 0007.1.1.12. identificador — espacio interno (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 378. 2_tipoIdentificador / 0007.1.2.1. tipoIdentificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 379. 2_tipoIdentificador / 0007.1.2.2. tipoIdentificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 380. 2_tipoIdentificador / 0007.1.2.3. tipoIdentificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 381. 2_tipoIdentificador / 0007.1.2.4. tipoIdentificador — tipo number (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 382. 2_tipoIdentificador / 0007.1.2.5. tipoIdentificador — tipo boolean (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 383. 2_tipoIdentificador / 0007.1.2.6. tipoIdentificador — tipo object (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 384. 2_tipoIdentificador / 0007.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 385. 2_tipoIdentificador / 0007.1.2.8. tipoIdentificador — valor minúsculas (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 386. 2_tipoIdentificador / 0007.1.2.9. tipoIdentificador — solo espacios (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 387. 3_banco / 0007.1.3.1. banco — propiedad ausente (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 388. 3_banco / 0007.1.3.2. banco — null (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 389. 3_banco / 0007.1.3.3. banco — string vacío (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 390. 3_banco / 0007.1.3.4. banco — tipo number (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 391. 3_banco / 0007.1.3.5. banco — tipo boolean (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 392. 3_banco / 0007.1.3.6. banco — tipo object (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 393. 3_banco / 0007.1.3.7. banco — longitud 3 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 394. 3_banco / 0007.1.3.8. banco — longitud 13 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 395. 3_banco / 0007.1.3.9. banco — longitud 7 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 396. 3_banco / 0007.1.3.10. banco — solo espacios (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 397. 3_banco / 0007.1.3.11. banco — símbolo arroba (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 398. 3_banco / 0007.1.3.12. banco — espacio interno (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 399. 3_banco / 0007.1.3.13. banco — paréntesis (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 400. 3_banco / 0007.1.3.14. banco — SWIFT no coincide con emisor (412)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 401. 4_tipoBaja / 0007.1.4.1. tipoBaja — propiedad ausente (426)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 402. 4_tipoBaja / 0007.1.4.2. tipoBaja — null (426)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 403. 4_tipoBaja / 0007.1.4.3. tipoBaja — string vacío (426)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 404. 4_tipoBaja / 0007.1.4.4. tipoBaja — solo espacios (426)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 405. 4_tipoBaja / 0007.1.4.5. tipoBaja — tipo number (426)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 406. 4_tipoBaja / 0007.1.4.6. tipoBaja — tipo boolean (426)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 407. 4_tipoBaja / 0007.1.4.7. tipoBaja — tipo object (426)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 408. 4_tipoBaja / 0007.1.4.8. tipoBaja — valor COMPLETA (426)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 409. 4_tipoBaja / 0007.1.4.9. tipoBaja — valor no soportado (426)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 410. 1_id / 0008.1.1.1. id — propiedad ausente (444)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 411. 1_id / 0008.1.1.2. id — null (444)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 412. 1_id / 0008.1.1.3. id — string vacío (444)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 413. 1_id / 0008.1.1.4. id — solo espacios (444)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 414. 1_id / 0008.1.1.5. id — tipo number (444)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 415. 1_id / 0008.1.1.6. id — tipo boolean (444)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 416. 1_id / 0008.1.1.7. id — tipo object (444)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 417. 1_id / 0008.1.1.8. id — longitud incorrecta (444)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 418. 1_id / 0008.1.1.9. id — formato no UUID (444)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 419. 1_id / 0008.1.1.10. id — sin guiones (444)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 420. 2_identificador / 0008.1.2.1. identificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 421. 2_identificador / 0008.1.2.2. identificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 422. 2_identificador / 0008.1.2.3. identificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 423. 2_identificador / 0008.1.2.4. identificador — tipo number (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 424. 2_identificador / 0008.1.2.5. identificador — tipo boolean (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 425. 2_identificador / 0008.1.2.6. identificador — tipo object (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 426. 2_identificador / 0008.1.2.7. identificador — no inicia con 6 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 427. 2_identificador / 0008.1.2.8. identificador — longitud 7 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 428. 2_identificador / 0008.1.2.9. identificador — longitud 9 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 429. 2_identificador / 0008.1.2.10. identificador — con letras (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 430. 2_identificador / 0008.1.2.11. identificador — solo espacios (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 431. 2_identificador / 0008.1.2.12. identificador — espacio interno (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 432. 3_tipoIdentificador / 0008.1.3.1. tipoIdentificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 433. 3_tipoIdentificador / 0008.1.3.2. tipoIdentificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 434. 3_tipoIdentificador / 0008.1.3.3. tipoIdentificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 435. 3_tipoIdentificador / 0008.1.3.4. tipoIdentificador — tipo number (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 436. 3_tipoIdentificador / 0008.1.3.5. tipoIdentificador — tipo boolean (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 437. 3_tipoIdentificador / 0008.1.3.6. tipoIdentificador — tipo object (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 438. 3_tipoIdentificador / 0008.1.3.7. tipoIdentificador — valor incorrecto COMERCIO (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 439. 3_tipoIdentificador / 0008.1.3.8. tipoIdentificador — valor minúsculas (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 440. 3_tipoIdentificador / 0008.1.3.9. tipoIdentificador — solo espacios (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 441. 4_banco / 0008.1.4.1. banco — propiedad ausente (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 442. 4_banco / 0008.1.4.2. banco — null (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 443. 4_banco / 0008.1.4.3. banco — string vacío (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 444. 4_banco / 0008.1.4.4. banco — tipo number (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 445. 4_banco / 0008.1.4.5. banco — tipo boolean (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 446. 4_banco / 0008.1.4.6. banco — tipo object (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 447. 4_banco / 0008.1.4.7. banco — longitud 3 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 448. 4_banco / 0008.1.4.8. banco — longitud 13 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 449. 4_banco / 0008.1.4.9. banco — longitud 7 (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 450. 4_banco / 0008.1.4.10. banco — solo espacios (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 451. 4_banco / 0008.1.4.11. banco — símbolo arroba (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 452. 4_banco / 0008.1.4.12. banco — espacio interno (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 453. 4_banco / 0008.1.4.13. banco — paréntesis (414)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 454. 4_banco / 0008.1.4.14. banco — SWIFT no coincide con emisor (412)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 455. 5_cuenta / 0008.1.5.1. cuenta — propiedad ausente (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 456. 5_cuenta / 0008.1.5.2. cuenta — null (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 457. 5_cuenta / 0008.1.5.3. cuenta — string vacío (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 458. 5_cuenta / 0008.1.5.5. cuenta — tipo number (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 459. 5_cuenta / 0008.1.5.6. cuenta — tipo boolean (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 460. 5_cuenta / 0008.1.5.7. cuenta — tipo object (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 461. 5_cuenta / 0008.1.5.8. cuenta — no solo dígitos (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 462. 5_cuenta / 0008.1.5.9. cuenta — longitud 35 (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 463. 5_cuenta / 0008.1.5.10. cuenta — espacio interno (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 464. 5_cuenta / 0008.1.5.11. cuenta — guión (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 465. 5_cuenta / 0008.1.5.12. cuenta — espacio al inicio (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 466. 6_producto / 0008.1.6.1. producto — propiedad ausente (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 467. 6_producto / 0008.1.6.2. producto — null (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 468. 6_producto / 0008.1.6.3. producto — string vacío (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 469. 6_producto / 0008.1.6.5. producto — tipo number (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 470. 6_producto / 0008.1.6.6. producto — tipo boolean (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 471. 6_producto / 0008.1.6.7. producto — tipo object (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 472. 6_producto / 0008.1.6.8. producto — valor inválido PACX (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 473. 6_producto / 0008.1.6.9. producto — valor minúsculas (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 474. 6_producto / 0008.1.6.10. producto — espacio al final (421)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 475. 1_identificador / 0009.1.1.1. identificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 476. 1_identificador / 0009.1.1.2. identificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 477. 1_identificador / 0009.1.1.3. identificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 478. 1_identificador / 0009.1.1.4. identificador — tipo number (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 479. 1_identificador / 0009.1.1.5. identificador — tipo boolean (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 480. 1_identificador / 0009.1.1.6. identificador — tipo object (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 481. 1_identificador / 0009.1.1.7. identificador — no inicia con 6 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 482. 1_identificador / 0009.1.1.8. identificador — longitud 7 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 483. 1_identificador / 0009.1.1.9. identificador — longitud 9 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 484. 1_identificador / 0009.1.1.10. identificador — con letras (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 485. 1_identificador / 0009.1.1.11. identificador — solo espacios (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 486. 1_identificador / 0009.1.1.12. identificador — espacio interno (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 487. 2_tipoIdentificador / 0009.1.2.1. tipoIdentificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 488. 2_tipoIdentificador / 0009.1.2.2. tipoIdentificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 489. 2_tipoIdentificador / 0009.1.2.3. tipoIdentificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 490. 2_tipoIdentificador / 0009.1.2.4. tipoIdentificador — tipo number (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 491. 2_tipoIdentificador / 0009.1.2.5. tipoIdentificador — tipo boolean (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 492. 2_tipoIdentificador / 0009.1.2.6. tipoIdentificador — tipo object (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 493. 2_tipoIdentificador / 0009.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 494. 2_tipoIdentificador / 0009.1.2.8. tipoIdentificador — valor minúsculas (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 495. 2_tipoIdentificador / 0009.1.2.9. tipoIdentificador — solo espacios (410)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 496. 1_identificador / 0022.1.1.1. identificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 497. 1_identificador / 0022.1.1.2. identificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 498. 1_identificador / 0022.1.1.3. identificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 499. 1_identificador / 0022.1.1.4. identificador — tipo number (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 500. 1_identificador / 0022.1.1.5. identificador — tipo boolean (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 501. 1_identificador / 0022.1.1.6. identificador — tipo object (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 502. 1_identificador / 0022.1.1.7. identificador — no inicia con 6 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 503. 1_identificador / 0022.1.1.8. identificador — longitud 7 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 504. 1_identificador / 0022.1.1.9. identificador — longitud 9 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 505. 1_identificador / 0022.1.1.10. identificador — con letras (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 506. 1_identificador / 0022.1.1.11. identificador — solo espacios (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 507. 1_identificador / 0022.1.1.12. identificador — espacio interno (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 508. 2_nombreAcreedor / 0022.1.2.1. nombreAcreedor — propiedad ausente (436)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 509. 2_nombreAcreedor / 0022.1.2.2. nombreAcreedor — null (436)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 510. 2_nombreAcreedor / 0022.1.2.3. nombreAcreedor — string vacío (436)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 511. 2_nombreAcreedor / 0022.1.2.4. nombreAcreedor — tipo number (436)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 512. 2_nombreAcreedor / 0022.1.2.5. nombreAcreedor — tipo boolean (436)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 513. 2_nombreAcreedor / 0022.1.2.6. nombreAcreedor — longitud 81 (436)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 514. 2_nombreAcreedor / 0022.1.2.7. nombreAcreedor — caracteres no permitidos (436)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 515. 2_nombreAcreedor / 0022.1.2.8. nombreAcreedor — símbolo arroba (436)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 516. 3_bancoAcreedor / 0022.1.3.1. bancoAcreedor — propiedad ausente (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 517. 3_bancoAcreedor / 0022.1.3.2. bancoAcreedor — null (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 518. 3_bancoAcreedor / 0022.1.3.3. bancoAcreedor — string vacío (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 519. 3_bancoAcreedor / 0022.1.3.4. bancoAcreedor — tipo number (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 520. 3_bancoAcreedor / 0022.1.3.5. bancoAcreedor — tipo boolean (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 521. 3_bancoAcreedor / 0022.1.3.6. bancoAcreedor — tipo object (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 522. 3_bancoAcreedor / 0022.1.3.7. bancoAcreedor — longitud 3 (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 523. 3_bancoAcreedor / 0022.1.3.8. bancoAcreedor — longitud 13 (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 524. 3_bancoAcreedor / 0022.1.3.9. bancoAcreedor — longitud 7 (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 525. 3_bancoAcreedor / 0022.1.3.10. bancoAcreedor — solo espacios (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 526. 3_bancoAcreedor / 0022.1.3.11. bancoAcreedor — símbolo arroba (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 527. 3_bancoAcreedor / 0022.1.3.12. bancoAcreedor — espacio interno (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 528. 3_bancoAcreedor / 0022.1.3.13. bancoAcreedor — paréntesis (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 529. 3_bancoAcreedor / 0022.1.3.14. bancoAcreedor — SWIFT no coincide con emisor (412)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 530. 4_moneda / 0022.1.4.1. moneda — propiedad ausente (474)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 531. 4_moneda / 0022.1.4.2. moneda — null (474)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 532. 4_moneda / 0022.1.4.3. moneda — string vacío (474)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 533. 4_moneda / 0022.1.4.4. moneda — tipo number (474)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 534. 4_moneda / 0022.1.4.5. moneda — tipo boolean (474)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 535. 4_moneda / 0022.1.4.6. moneda — valor incorrecto (474)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 536. 4_moneda / 0022.1.4.7. moneda — solo espacios (474)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 537. 5_qrTipo / 0022.1.5.1. qrTipo — propiedad ausente (464)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 538. 5_qrTipo / 0022.1.5.2. qrTipo — null (464)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 539. 5_qrTipo / 0022.1.5.3. qrTipo — tipo string (464)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 540. 5_qrTipo / 0022.1.5.4. qrTipo — tipo boolean (464)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 541. 5_qrTipo / 0022.1.5.5. qrTipo — valor inválido (464)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 542. 5_qrTipo / 0022.1.5.6. qrTipo — valor cero (464)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 543. 6_canalPago / 0022.1.6.1. canalPago — propiedad ausente (472)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 544. 6_canalPago / 0022.1.6.2. canalPago — null (472)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 545. 6_canalPago / 0022.1.6.3. canalPago — string vacío (472)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 546. 6_canalPago / 0022.1.6.4. canalPago — tipo number (472)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 547. 6_canalPago / 0022.1.6.5. canalPago — tipo boolean (472)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 548. 6_canalPago / 0022.1.6.6. canalPago — valor inválido (472)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 549. 6_canalPago / 0022.1.6.7. canalPago — valor minúsculas (472)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 550. 7_tipo / 0022.1.7.1. tipo — propiedad ausente (468)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 551. 7_tipo / 0022.1.7.2. tipo — null (468)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 552. 7_tipo / 0022.1.7.3. tipo — string vacío (468)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 553. 7_tipo / 0022.1.7.4. tipo — tipo number (468)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 554. 7_tipo / 0022.1.7.5. tipo — tipo boolean (468)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 555. 7_tipo / 0022.1.7.6. tipo — valor inválido (468)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 556. 7_tipo / 0022.1.7.7. tipo — valor minúsculas (468)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 557. 8_descripcion / 0022.1.8.1. descripcion — tipo number (437)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 558. 8_descripcion / 0022.1.8.2. descripcion — longitud 81 (437)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 559. 8_descripcion / 0022.1.8.3. descripcion — caracteres no permitidos (437)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 560. 8_descripcion / 0022.1.8.4. descripcion — símbolo arroba (437)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 561. 1_identificador / 0023.1.1.1. identificador — propiedad ausente (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 562. 1_identificador / 0023.1.1.2. identificador — null (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 563. 1_identificador / 0023.1.1.3. identificador — string vacío (419)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 564. 1_identificador / 0023.1.1.4. identificador — tipo number (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 565. 1_identificador / 0023.1.1.5. identificador — tipo boolean (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 566. 1_identificador / 0023.1.1.6. identificador — tipo object (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 567. 1_identificador / 0023.1.1.7. identificador — no inicia con 6 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 568. 1_identificador / 0023.1.1.8. identificador — longitud 7 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 569. 1_identificador / 0023.1.1.9. identificador — longitud 9 (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 570. 1_identificador / 0023.1.1.10. identificador — con letras (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 571. 1_identificador / 0023.1.1.11. identificador — solo espacios (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 572. 1_identificador / 0023.1.1.12. identificador — espacio interno (409)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 573. 2_qrCode / 0023.1.2.1. qrCode — propiedad ausente (473)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 574. 2_qrCode / 0023.1.2.2. qrCode — null (473)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 575. 2_qrCode / 0023.1.2.3. qrCode — string vacío (473)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 576. 2_qrCode / 0023.1.2.4. qrCode — tipo number (473)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 577. 2_qrCode / 0023.1.2.5. qrCode — tipo boolean (473)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 578. 2_qrCode / 0023.1.2.6. qrCode — tipo object (473)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```
