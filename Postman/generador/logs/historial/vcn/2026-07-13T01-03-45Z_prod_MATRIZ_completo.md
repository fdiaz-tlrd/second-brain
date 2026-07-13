# Resumen de fallos — VCN

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-13T01:03:45.223Z |
| Código fuente | prod |
| Nivel ejecución | MATRIZ |
| Carpeta | `(completo)` |
| Nota | captura fortalecida MATRIZ |
| Requests | 1263 (failed: 0) |
| Tests | 4573 (failed: 227) |
| JSON completo | `logs\ultimo-run-vcn.json` |

## 1. 0_jsonEntrada / 0.1. body — JSON HTTP inválido (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 2. 0_jsonEntrada / 0.1. body — JSON HTTP inválido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 550 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 3. 0_jsonEntrada / 0.1. body — JSON HTTP inválido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 4. 1_idCanal / 1.1.1. idCanal — propiedad ausente (undefined) (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo canal"}
```

## 5. 1_idCanal / 1.1.1. idCanal — propiedad ausente (undefined) (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo canal"}
```

## 6. 1_idCanal / 1.1.2. idCanal — null (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 7. 1_idCanal / 1.1.2. idCanal — null (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 550 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 8. 1_idCanal / 1.1.2. idCanal — null (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 9. 1_idCanal / 1.1.3. idCanal — string vacío "" (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 10. 1_idCanal / 1.1.3. idCanal — string vacío "" (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 550 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 11. 1_idCanal / 1.1.3. idCanal — string vacío "" (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 12. 1_idCanal / 1.1.4. idCanal — tipo number (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 13. 1_idCanal / 1.1.4. idCanal — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 550 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 14. 1_idCanal / 1.1.4. idCanal — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 15. 1_idCanal / 1.1.5. idCanal — tipo boolean (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 16. 1_idCanal / 1.1.5. idCanal — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 550 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 17. 1_idCanal / 1.1.5. idCanal — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 18. 1_idCanal / 1.1.6. idCanal — tipo object (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 19. 1_idCanal / 1.1.6. idCanal — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 550 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 20. 1_idCanal / 1.1.6. idCanal — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":550,"descripcionError":"Error inesperado"}
```

## 21. 1_idCanal / 1.1.7. idCanal — solo espacios, trim vacío (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 22. 1_idCanal / 1.1.7. idCanal — solo espacios, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 23. 1_idCanal / 1.1.7. idCanal — solo espacios, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 24. 1_idCanal / 1.1.8. idCanal — solo tab, trim vacío (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 25. 1_idCanal / 1.1.8. idCanal — solo tab, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 26. 1_idCanal / 1.1.8. idCanal — solo tab, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 27. 1_idCanal / 1.1.9. idCanal — longitud 5, máximo 4 (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo canal"}
```

## 28. 1_idCanal / 1.1.9. idCanal — longitud 5, máximo 4 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo canal"}
```

## 29. 1_idCanal / 1.1.10. idCanal — espacio interno, post-trim (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 30. 1_idCanal / 1.1.10. idCanal — espacio interno, post-trim (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 31. 1_idCanal / 1.1.10. idCanal — espacio interno, post-trim (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 32. 1_idCanal / 1.1.11. idCanal — símbolo @ no permitido (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 33. 1_idCanal / 1.1.11. idCanal — símbolo @ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 34. 1_idCanal / 1.1.11. idCanal — símbolo @ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 35. 1_idCanal / 1.1.12. idCanal — paréntesis ( no permitido (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 36. 1_idCanal / 1.1.12. idCanal — paréntesis ( no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 37. 1_idCanal / 1.1.12. idCanal — paréntesis ( no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 38. 1_idCanal / 1.1.13. idCanal — ¿ no permitido (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 39. 1_idCanal / 1.1.13. idCanal — ¿ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 40. 1_idCanal / 1.1.13. idCanal — ¿ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 41. 1_idCanal / 1.1.14. idCanal — comillas " no permitidas (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 42. 1_idCanal / 1.1.14. idCanal — comillas " no permitidas (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 43. 1_idCanal / 1.1.14. idCanal — comillas " no permitidas (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 44. 2_validador / 1.2.1. validador — propiedad ausente (undefined) (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo validador"}
```

## 45. 2_validador / 1.2.1. validador — propiedad ausente (undefined) (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo validador"}
```

## 46. 2_validador / 1.2.2. validador — null (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo validador"}
```

## 47. 2_validador / 1.2.2. validador — null (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo validador"}
```

## 48. 2_validador / 1.2.3. validador — string vacío "" (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo validador"}
```

## 49. 2_validador / 1.2.3. validador — string vacío "" (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":400,"descripcionError":"Error de formato en campo validador"}
```

## 50. 2_validador / 1.2.4. validador — tipo number (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 51. 2_validador / 1.2.4. validador — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 52. 2_validador / 1.2.4. validador — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 53. 2_validador / 1.2.5. validador — tipo boolean (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 54. 2_validador / 1.2.5. validador — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 55. 2_validador / 1.2.5. validador — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 56. 2_validador / 1.2.6. validador — tipo object (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 57. 2_validador / 1.2.6. validador — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 58. 2_validador / 1.2.6. validador — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 59. 2_validador / 1.2.7. validador — solo espacios, trim vacío (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 60. 2_validador / 1.2.7. validador — solo espacios, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 61. 2_validador / 1.2.7. validador — solo espacios, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 62. 2_validador / 1.2.8. validador — solo tab, trim vacío (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 63. 2_validador / 1.2.8. validador — solo tab, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 64. 2_validador / 1.2.8. validador — solo tab, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 65. 2_validador / 1.2.9. validador — longitud 5, máximo 4 (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 66. 2_validador / 1.2.9. validador — longitud 5, máximo 4 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 67. 2_validador / 1.2.9. validador — longitud 5, máximo 4 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 68. 2_validador / 1.2.10. validador — espacio interno, post-trim (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 69. 2_validador / 1.2.10. validador — espacio interno, post-trim (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 70. 2_validador / 1.2.10. validador — espacio interno, post-trim (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 71. 2_validador / 1.2.11. validador — símbolo @ no permitido (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 72. 2_validador / 1.2.11. validador — símbolo @ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 73. 2_validador / 1.2.11. validador — símbolo @ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 74. 2_validador / 1.2.12. validador — paréntesis ( no permitido (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 75. 2_validador / 1.2.12. validador — paréntesis ( no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 76. 2_validador / 1.2.12. validador — paréntesis ( no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 77. 2_validador / 1.2.13. validador — ¿ no permitido (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 78. 2_validador / 1.2.13. validador — ¿ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 79. 2_validador / 1.2.13. validador — ¿ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 80. 2_validador / 1.2.14. validador — comillas " no permitidas (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 81. 2_validador / 1.2.14. validador — comillas " no permitidas (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 82. 2_validador / 1.2.14. validador — comillas " no permitidas (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 83. 3_peticion / 1.3.1. peticion — propiedad ausente (undefined) (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error en la petición original"}
```

## 84. 3_peticion / 1.3.2. peticion — null (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error en la petición original"}
```

## 85. 3_peticion / 1.3.3. peticion — string vacío (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error en la petición original"}
```

## 86. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 87. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 88. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 89. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 90. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 91. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 92. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 93. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 94. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 95. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 96. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 97. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 98. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 99. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 100. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 101. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 102. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 103. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 104. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 105. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 106. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 107. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 108. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 109. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 110. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 111. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 112. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 113. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 114. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 115. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 116. 4_idPeticion / 1.4.1. idPeticion — propiedad ausente (undefined) (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error en la petición original"}
```

## 117. 4_idPeticion / 1.4.2. idPeticion — null (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error en la petición original"}
```

## 118. 4_idPeticion / 1.4.3. idPeticion — string vacío (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error en la petición original"}
```

## 119. 4_idPeticion / 1.4.4. idPeticion — tipo number (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error en la petición original"}
```

## 120. 4_idPeticion / 1.4.5. idPeticion — tipo boolean (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error en la petición original"}
```

## 121. 4_idPeticion / 1.4.6. idPeticion — tipo object (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error en la petición original"}
```

## 122. 4_idPeticion / 1.4.7. idPeticion — solo espacios (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error en la petición original"}
```

## 123. 4_idPeticion / 1.4.8. idPeticion — solo tab (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error en la petición original"}
```

## 124. 4_idPeticion / 1.4.10. idPeticion — longitud 65, máximo 64 (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":400,"mensajeError":"Error en la petición original"}
```

## 125. 5_solicitudes / 1.5.1. solicitudes — tipo string (425)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 126. 5_solicitudes / 1.5.1. solicitudes — tipo string (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 127. 5_solicitudes / 1.5.2. solicitudes — arreglo vacío (425)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 128. 5_solicitudes / 1.5.2. solicitudes — arreglo vacío (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 129. 5_solicitudes / 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 130. 5_solicitudes / 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 131. 5_solicitudes / 1.5.4. solicitudes — sin propiedad idSolicitud (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 132. 5_solicitudes / 1.5.4. solicitudes — sin propiedad idSolicitud (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 133. 5_solicitudes / 1.5.5. solicitudes — idSolicitud vacío (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 134. 5_solicitudes / 1.5.5. solicitudes — idSolicitud vacío (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 135. 5_solicitudes / 1.5.6. solicitudes — idSolicitud tipo number (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 136. 5_solicitudes / 1.5.6. solicitudes — idSolicitud tipo number (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 137. 5_solicitudes / 1.5.7. solicitudes — idSolicitud solo espacios (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 138. 5_solicitudes / 1.5.7. solicitudes — idSolicitud solo espacios (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 139. 5_solicitudes / 1.5.8. solicitudes — idSolicitud longitud 65 (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 140. 5_solicitudes / 1.5.8. solicitudes — idSolicitud longitud 65 (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 141. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 142. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 425 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 143. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 144. 5_solicitudes / 1.5.10. solicitudes — guion bajo (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 145. 5_solicitudes / 1.5.10. solicitudes — guion bajo (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 146. 5_solicitudes / 1.5.10. solicitudes — guion bajo (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 147. 5_solicitudes / 1.5.11. solicitudes — espacio interno (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 148. 5_solicitudes / 1.5.11. solicitudes — espacio interno (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 149. 5_solicitudes / 1.5.11. solicitudes — espacio interno (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 150. 5_solicitudes / 1.5.12. solicitudes — espacio al inicio (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 151. 5_solicitudes / 1.5.12. solicitudes — espacio al inicio (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 152. 5_solicitudes / 1.5.12. solicitudes — espacio al inicio (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 153. 5_solicitudes / 1.5.13. solicitudes — espacio al final (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 154. 5_solicitudes / 1.5.13. solicitudes — espacio al final (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 155. 5_solicitudes / 1.5.13. solicitudes — espacio al final (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 156. 5_solicitudes / 1.5.14. solicitudes — arroba (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 157. 5_solicitudes / 1.5.14. solicitudes — arroba (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 158. 5_solicitudes / 1.5.14. solicitudes — arroba (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 159. 5_solicitudes / 1.5.15. solicitudes — punto (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 160. 5_solicitudes / 1.5.15. solicitudes — punto (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 161. 5_solicitudes / 1.5.15. solicitudes — punto (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 162. 5_solicitudes / 1.5.16. solicitudes — unicode (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 163. 5_solicitudes / 1.5.16. solicitudes — unicode (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 164. 5_solicitudes / 1.5.16. solicitudes — unicode (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 165. 5_solicitudes / 1.5.17. solicitudes — barra (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 166. 5_solicitudes / 1.5.17. solicitudes — barra (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 167. 5_solicitudes / 1.5.17. solicitudes — barra (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 168. 5_solicitudes / 1.5.18. solicitudes — comillas (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 169. 5_solicitudes / 1.5.18. solicitudes — comillas (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 170. 5_solicitudes / 1.5.18. solicitudes — comillas (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 171. 5_solicitudes / 1.5.19. solicitudes — elemento null en arreglo (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 172. 5_solicitudes / 1.5.19. solicitudes — elemento null en arreglo (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 999 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 173. 5_solicitudes / 1.5.19. solicitudes — elemento null en arreglo (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error en la solicitud' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 174. 5_solicitudes / 1.5.20. solicitudes — idSolicitud null (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 175. 5_solicitudes / 1.5.20. solicitudes — idSolicitud null (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 176. 5_solicitudes / 1.5.21. solicitudes — idSolicitud tipo boolean true (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 177. 5_solicitudes / 1.5.21. solicitudes — idSolicitud tipo boolean true (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 178. 5_solicitudes / 1.5.22. solicitudes — idSolicitud tipo boolean false (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 179. 5_solicitudes / 1.5.22. solicitudes — idSolicitud tipo boolean false (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 180. 5_solicitudes / 1.5.23. solicitudes — solo guiones (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 181. 5_solicitudes / 1.5.23. solicitudes — solo guiones (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 182. 5_solicitudes / 1.5.23. solicitudes — solo guiones (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 183. 5_solicitudes / 1.5.24. solicitudes — un solo guion (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 184. 5_solicitudes / 1.5.24. solicitudes — un solo guion (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 185. 5_solicitudes / 1.5.24. solicitudes — un solo guion (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 186. 5_solicitudes / 1.5.25. solicitudes — idSolicitud tipo object (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 187. 5_solicitudes / 1.5.25. solicitudes — idSolicitud tipo object (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 188. 5_solicitudes / 1.5.26. solicitudes — idSolicitud tipo array (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 189. 5_solicitudes / 1.5.26. solicitudes — idSolicitud tipo array (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 190. 1_idCanal / 2.1.1. idCanal — no existe en BD (401)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 191. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 192. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [General] codigoError = 403
- **Mensaje:** expected 509 to equal 403
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 193. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [General] mensajeError = "Canal emisor no tiene un plan de suscripción"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Canal emisor no tiene un plan de susc…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 194. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [Lambda VCN] HTTP status = 500 (real: 200)
- **Mensaje:** expected 200 to equal 500
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 195. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [General] codigoError = 500
- **Mensaje:** expected 405 to equal 500
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 196. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [General] mensajeError = "Error interno"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error interno'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 197. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 198. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [General] codigoError = 403
- **Mensaje:** expected 509 to equal 403
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 199. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [General] mensajeError = "Canal emisor no tiene un plan de suscripción"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Canal emisor no tiene un plan de susc…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 200. 2_validador / 2.2.1. validador — no existe en BD (404) [CANAL_VALIDADOR_NO_EXISTE]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 201. 2_validador / 2.2.2. validador — deshabilitado (402) [CANAL_VALIDADOR_DESHABILITADO]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":402,"mensajeError":"Canal validador no disponible"}
```

## 202. 2_validador / 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Test:** [Lambda VCN] HTTP status = 500 (real: 200)
- **Mensaje:** expected 200 to equal 500
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":418,"mensajeError":"Metodo no soportado por el validador"}}
```

## 203. 2_validador / 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Test:** [General] codigoError = 500
- **Mensaje:** expected 418 to equal 500
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":418,"mensajeError":"Metodo no soportado por el validador"}}
```

## 204. 2_validador / 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Test:** [General] mensajeError = "Error interno"
- **Mensaje:** expected 'Metodo no soportado por el validador' to equal 'Error interno'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":418,"mensajeError":"Metodo no soportado por el validador"}}
```

## 205. 3_peticion / 2.3.1. peticion — cifrada con otra llave RSA (405)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 206. 3_peticion / 2.3.2. peticion — clave AES-128 en RSA (405)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 207. 3_peticion / 2.3.3. peticion — RSA material no hex (405)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 208. 3_peticion / 2.3.4. peticion — hex corrupto (405)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 209. 3_peticion / 2.3.5. peticion — cifrado truncado (405)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 210. 3_peticion / 2.3.6. peticion — tag GCM corrupto (405)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 211. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 212. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [General] codigoError = 418
- **Mensaje:** expected 509 to equal 418
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 213. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [General] mensajeError = "Método no soportado"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Método no soportado'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 214. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 215. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [General] codigoError = 418
- **Mensaje:** expected 509 to equal 418
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 216. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [General] mensajeError = "Método no soportado"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Método no soportado'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 217. 1_cuenta / 0001.1.1.1. cuenta — propiedad ausente (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 999, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":999,"mensajeError":"Error en la solicitud"}}
```

## 218. 1_cuenta / 0001.1.1.2. cuenta — null (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 999, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":999,"mensajeError":"Error en la solicitud"}}
```

## 219. 1_cuenta / 0001.1.1.18. cuenta — tipo array (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 220. 1022_fijo / 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)

- **Test:** [General] codigoError = 599
- **Mensaje:** expected undefined to equal 599
- **HTTP descifrar:** 200

```json
{"respuesta":{"message":"Internal server error"}}
```

## 221. 1022_fijo / 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)

- **Test:** [General] mensajeError = "Tiempo de espera agotado al llamar al Canal Validador"
- **Mensaje:** expected undefined to equal 'Tiempo de espera agotado al llamar al…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"message":"Internal server error"}}
```

## 222. 1022_fijo / 0001.5.1022.3. validador PROXGATO auth fijo — respuesta sin campo cifrado (509)

- **Test:** [General] codigoError = 509
- **Mensaje:** expected 406 to equal 509
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":406,"mensajeError":"Error en descifrado canal validador"}}
```

## 223. 1022_fijo / 0001.5.1022.3. validador PROXGATO auth fijo — respuesta sin campo cifrado (509)

- **Test:** [General] mensajeError = "Error inesperado en el Canal Validador"
- **Mensaje:** expected 'Error en descifrado canal validador' to equal 'Error inesperado en el Canal Validador'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":406,"mensajeError":"Error en descifrado canal validador"}}
```

## 224. 1023_token / 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)

- **Test:** [General] codigoError = 599
- **Mensaje:** expected undefined to equal 599
- **HTTP descifrar:** 200

```json
{"respuesta":{"message":"Internal server error"}}
```

## 225. 1023_token / 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)

- **Test:** [General] mensajeError = "Tiempo de espera agotado al llamar al Canal Validador"
- **Mensaje:** expected undefined to equal 'Tiempo de espera agotado al llamar al…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"message":"Internal server error"}}
```

## 226. 1023_token / 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)

- **Test:** [General] codigoError = 509
- **Mensaje:** expected 406 to equal 509
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":406,"mensajeError":"Error en descifrado canal validador"}}
```

## 227. 1023_token / 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)

- **Test:** [General] mensajeError = "Error inesperado en el Canal Validador"
- **Mensaje:** expected 'Error en descifrado canal validador' to equal 'Error inesperado en el Canal Validador'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":406,"mensajeError":"Error en descifrado canal validador"}}
```
