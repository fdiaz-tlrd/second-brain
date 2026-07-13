# Resumen de fallos — VCN

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-13T03:16:36.939Z |
| Código fuente | prod |
| Nivel ejecución | MATRIZ |
| Carpeta | `(completo)` |
| Nota | MATRIZ HTTP Code 200 HD-005 captura fortalecida |
| Requests | 1263 (failed: 0) |
| Tests | 4573 (failed: 135) |
| JSON completo | `logs\ultimo-run-vcn.json` |

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

## 42. 2_validador / 1.2.9. validador — longitud 5, máximo 4 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 43. 2_validador / 1.2.9. validador — longitud 5, máximo 4 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 44. 2_validador / 1.2.10. validador — espacio interno, post-trim (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 45. 2_validador / 1.2.10. validador — espacio interno, post-trim (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 46. 2_validador / 1.2.11. validador — símbolo @ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 47. 2_validador / 1.2.11. validador — símbolo @ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 48. 2_validador / 1.2.12. validador — paréntesis ( no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 49. 2_validador / 1.2.12. validador — paréntesis ( no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 50. 2_validador / 1.2.13. validador — ¿ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 51. 2_validador / 1.2.13. validador — ¿ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 52. 2_validador / 1.2.14. validador — comillas " no permitidas (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 53. 2_validador / 1.2.14. validador — comillas " no permitidas (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 54. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 55. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 56. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 57. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 58. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 59. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 60. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 61. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 62. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 63. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 64. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 65. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 66. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 67. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 68. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 69. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 70. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 71. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 72. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 73. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 74. 5_solicitudes / 1.5.1. solicitudes — tipo string (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 75. 5_solicitudes / 1.5.2. solicitudes — arreglo vacío (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 76. 5_solicitudes / 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 77. 5_solicitudes / 1.5.4. solicitudes — sin propiedad idSolicitud (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 78. 5_solicitudes / 1.5.5. solicitudes — idSolicitud vacío (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 79. 5_solicitudes / 1.5.6. solicitudes — idSolicitud tipo number (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 80. 5_solicitudes / 1.5.7. solicitudes — idSolicitud solo espacios (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 81. 5_solicitudes / 1.5.8. solicitudes — idSolicitud longitud 65 (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 82. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 425 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 83. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 84. 5_solicitudes / 1.5.10. solicitudes — guion bajo (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 85. 5_solicitudes / 1.5.10. solicitudes — guion bajo (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 86. 5_solicitudes / 1.5.11. solicitudes — espacio interno (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 87. 5_solicitudes / 1.5.11. solicitudes — espacio interno (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 88. 5_solicitudes / 1.5.12. solicitudes — espacio al inicio (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 89. 5_solicitudes / 1.5.12. solicitudes — espacio al inicio (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 90. 5_solicitudes / 1.5.13. solicitudes — espacio al final (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 91. 5_solicitudes / 1.5.13. solicitudes — espacio al final (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 92. 5_solicitudes / 1.5.14. solicitudes — arroba (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 93. 5_solicitudes / 1.5.14. solicitudes — arroba (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 94. 5_solicitudes / 1.5.15. solicitudes — punto (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 95. 5_solicitudes / 1.5.15. solicitudes — punto (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 96. 5_solicitudes / 1.5.16. solicitudes — unicode (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 97. 5_solicitudes / 1.5.16. solicitudes — unicode (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 98. 5_solicitudes / 1.5.17. solicitudes — barra (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 99. 5_solicitudes / 1.5.17. solicitudes — barra (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 100. 5_solicitudes / 1.5.18. solicitudes — comillas (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 101. 5_solicitudes / 1.5.18. solicitudes — comillas (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 102. 5_solicitudes / 1.5.19. solicitudes — elemento null en arreglo (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 999 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 103. 5_solicitudes / 1.5.19. solicitudes — elemento null en arreglo (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error en la solicitud' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 104. 5_solicitudes / 1.5.20. solicitudes — idSolicitud null (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 105. 5_solicitudes / 1.5.21. solicitudes — idSolicitud tipo boolean true (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 106. 5_solicitudes / 1.5.22. solicitudes — idSolicitud tipo boolean false (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 107. 5_solicitudes / 1.5.23. solicitudes — solo guiones (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 108. 5_solicitudes / 1.5.23. solicitudes — solo guiones (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 109. 5_solicitudes / 1.5.24. solicitudes — un solo guion (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 110. 5_solicitudes / 1.5.24. solicitudes — un solo guion (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 111. 5_solicitudes / 1.5.25. solicitudes — idSolicitud tipo object (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 112. 5_solicitudes / 1.5.26. solicitudes — idSolicitud tipo array (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 113. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [General] codigoError = 403
- **Mensaje:** expected 509 to equal 403
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 114. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [General] mensajeError = "Canal emisor no tiene un plan de suscripción"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Canal emisor no tiene un plan de susc…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 115. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [General] codigoError = 500
- **Mensaje:** expected 405 to equal 500
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 116. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [General] mensajeError = "Error interno"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error interno'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 117. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [General] codigoError = 403
- **Mensaje:** expected 509 to equal 403
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 118. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [General] mensajeError = "Canal emisor no tiene un plan de suscripción"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Canal emisor no tiene un plan de susc…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 119. 2_validador / 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Test:** [General] codigoError = 500
- **Mensaje:** expected 418 to equal 500
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":418,"mensajeError":"Metodo no soportado por el validador"}}
```

## 120. 2_validador / 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Test:** [General] mensajeError = "Error interno"
- **Mensaje:** expected 'Metodo no soportado por el validador' to equal 'Error interno'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":418,"mensajeError":"Metodo no soportado por el validador"}}
```

## 121. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [General] codigoError = 418
- **Mensaje:** expected 509 to equal 418
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 122. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [General] mensajeError = "Método no soportado"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Método no soportado'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 123. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [General] codigoError = 418
- **Mensaje:** expected 509 to equal 418
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 124. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [General] mensajeError = "Método no soportado"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Método no soportado'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 125. 1_cuenta / 0001.1.1.1. cuenta — propiedad ausente (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 999, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":999,"mensajeError":"Error en la solicitud"}}
```

## 126. 1_cuenta / 0001.1.1.2. cuenta — null (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 999, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":999,"mensajeError":"Error en la solicitud"}}
```

## 127. 1_cuenta / 0001.1.1.18. cuenta — tipo array (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 128. 1022_fijo / 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)

- **Test:** [General] codigoError = 599
- **Mensaje:** expected undefined to equal 599
- **HTTP descifrar:** 200

```json
{"respuesta":{"message":"Internal server error"}}
```

## 129. 1022_fijo / 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)

- **Test:** [General] mensajeError = "Tiempo de espera agotado al llamar al Canal Validador"
- **Mensaje:** expected undefined to equal 'Tiempo de espera agotado al llamar al…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"message":"Internal server error"}}
```

## 130. 1022_fijo / 0001.5.1022.3. validador PROXGATO auth fijo — respuesta sin campo cifrado (509)

- **Test:** [General] codigoError = 509
- **Mensaje:** expected 406 to equal 509
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":406,"mensajeError":"Error en descifrado canal validador"}}
```

## 131. 1022_fijo / 0001.5.1022.3. validador PROXGATO auth fijo — respuesta sin campo cifrado (509)

- **Test:** [General] mensajeError = "Error inesperado en el Canal Validador"
- **Mensaje:** expected 'Error en descifrado canal validador' to equal 'Error inesperado en el Canal Validador'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":406,"mensajeError":"Error en descifrado canal validador"}}
```

## 132. 1023_token / 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)

- **Test:** [General] codigoError = 599
- **Mensaje:** expected 509 to equal 599
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 133. 1023_token / 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)

- **Test:** [General] mensajeError = "Tiempo de espera agotado al llamar al Canal Validador"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Tiempo de espera agotado al llamar al…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 134. 1023_token / 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)

- **Test:** [General] codigoError = 509
- **Mensaje:** expected 406 to equal 509
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":406,"mensajeError":"Error en descifrado canal validador"}}
```

## 135. 1023_token / 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)

- **Test:** [General] mensajeError = "Error inesperado en el Canal Validador"
- **Mensaje:** expected 'Error en descifrado canal validador' to equal 'Error inesperado en el Canal Validador'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":406,"mensajeError":"Error en descifrado canal validador"}}
```
