# Resumen de fallos — P2P

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-13T12:30:36.153Z |
| Código fuente | prod |
| Nivel ejecución | MATRIZ |
| Carpeta | `(completo)` |
| Nota | MATRIZ P2P re-run tras fix [CAPTURA] |
| Requests | 2159 (failed: 0) |
| Tests | 5031 (failed: 244) |
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

## 53. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 54. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 55. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 56. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 57. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 58. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 59. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 60. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 61. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 62. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 63. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 64. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 65. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 66. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 67. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 68. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 69. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 70. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 71. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 72. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 73. 4_idPeticion / 1.4.15. idPeticion — prefijo SWIFT ajeno (445)

- **Test:** [General] codigoError = 445
- **Mensaje:** expected 400 to equal 445
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":400,"mensajeError":"Error en la petición original"}}
```

## 74. 4_idPeticion / 1.4.15. idPeticion — prefijo SWIFT ajeno (445)

- **Test:** [General] mensajeError = "El prefijo Código SWIFT del idPeticion no coincide con el canal emisor"
- **Mensaje:** expected 'Error en la petición original' to equal 'El prefijo Código SWIFT del idPeticio…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":400,"mensajeError":"Error en la petición original"}}
```

## 75. 5_solicitudes / 1.5.1. solicitudes — tipo string (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 76. 5_solicitudes / 1.5.2. solicitudes — arreglo vacío (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 77. 5_solicitudes / 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 78. 5_solicitudes / 1.5.4. solicitudes — sin propiedad idSolicitud (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 79. 5_solicitudes / 1.5.5. solicitudes — idSolicitud vacío (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 80. 5_solicitudes / 1.5.6. solicitudes — idSolicitud tipo number (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 81. 5_solicitudes / 1.5.7. solicitudes — idSolicitud solo espacios (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 82. 5_solicitudes / 1.5.8. solicitudes — idSolicitud longitud 65 (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 83. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 84. 5_solicitudes / 1.5.10. solicitudes — guion bajo (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected undefined to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945096","respuestas":[{"idSolicitud":"id_001","resultado":419,"datos":null}]}}
```

## 85. 5_solicitudes / 1.5.10. solicitudes — guion bajo (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected undefined to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945096","respuestas":[{"idSolicitud":"id_001","resultado":419,"datos":null}]}}
```

## 86. 5_solicitudes / 1.5.11. solicitudes — espacio interno (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected undefined to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945098","respuestas":[{"idSolicitud":"id 001","resultado":419,"datos":null}]}}
```

## 87. 5_solicitudes / 1.5.11. solicitudes — espacio interno (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected undefined to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945098","respuestas":[{"idSolicitud":"id 001","resultado":419,"datos":null}]}}
```

## 88. 5_solicitudes / 1.5.12. solicitudes — espacio al inicio (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected undefined to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945100","respuestas":[{"idSolicitud":" abc","resultado":419,"datos":null}]}}
```

## 89. 5_solicitudes / 1.5.12. solicitudes — espacio al inicio (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected undefined to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945100","respuestas":[{"idSolicitud":" abc","resultado":419,"datos":null}]}}
```

## 90. 5_solicitudes / 1.5.13. solicitudes — espacio al final (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected undefined to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945102","respuestas":[{"idSolicitud":"abc ","resultado":419,"datos":null}]}}
```

## 91. 5_solicitudes / 1.5.13. solicitudes — espacio al final (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected undefined to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945102","respuestas":[{"idSolicitud":"abc ","resultado":419,"datos":null}]}}
```

## 92. 5_solicitudes / 1.5.14. solicitudes — arroba (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected undefined to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945104","respuestas":[{"idSolicitud":"id@001","resultado":419,"datos":null}]}}
```

## 93. 5_solicitudes / 1.5.14. solicitudes — arroba (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected undefined to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945104","respuestas":[{"idSolicitud":"id@001","resultado":419,"datos":null}]}}
```

## 94. 5_solicitudes / 1.5.15. solicitudes — punto (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected undefined to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945105","respuestas":[{"idSolicitud":"id.001","resultado":419,"datos":null}]}}
```

## 95. 5_solicitudes / 1.5.15. solicitudes — punto (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected undefined to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945105","respuestas":[{"idSolicitud":"id.001","resultado":419,"datos":null}]}}
```

## 96. 5_solicitudes / 1.5.16. solicitudes — unicode (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected undefined to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945107","respuestas":[{"idSolicitud":"id¿001","resultado":419,"datos":null}]}}
```

## 97. 5_solicitudes / 1.5.16. solicitudes — unicode (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected undefined to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945107","respuestas":[{"idSolicitud":"id¿001","resultado":419,"datos":null}]}}
```

## 98. 5_solicitudes / 1.5.17. solicitudes — barra (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected undefined to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945109","respuestas":[{"idSolicitud":"id/001","resultado":419,"datos":null}]}}
```

## 99. 5_solicitudes / 1.5.17. solicitudes — barra (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected undefined to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945109","respuestas":[{"idSolicitud":"id/001","resultado":419,"datos":null}]}}
```

## 100. 5_solicitudes / 1.5.18. solicitudes — comillas (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected undefined to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945110","respuestas":[{"idSolicitud":"id\"001","resultado":419,"datos":null}]}}
```

## 101. 5_solicitudes / 1.5.18. solicitudes — comillas (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected undefined to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945110","respuestas":[{"idSolicitud":"id\"001","resultado":419,"datos":null}]}}
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
- **Mensaje:** expected undefined to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945118","respuestas":[{"idSolicitud":"---","resultado":419,"datos":null}]}}
```

## 108. 5_solicitudes / 1.5.23. solicitudes — solo guiones (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected undefined to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945118","respuestas":[{"idSolicitud":"---","resultado":419,"datos":null}]}}
```

## 109. 5_solicitudes / 1.5.24. solicitudes — un solo guion (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected undefined to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945119","respuestas":[{"idSolicitud":"-","resultado":419,"datos":null}]}}
```

## 110. 5_solicitudes / 1.5.24. solicitudes — un solo guion (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected undefined to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945119","respuestas":[{"idSolicitud":"-","resultado":419,"datos":null}]}}
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
- **Mensaje:** expected undefined to equal 403
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"NAMEGATO1783945125","respuestas":[{"idSolicitud":"1","resultado":419,"datos":null}]}}
```

## 114. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [General] mensajeError = "Canal emisor no tiene un plan de suscripción"
- **Mensaje:** expected undefined to equal 'Canal emisor no tiene un plan de susc…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"NAMEGATO1783945125","respuestas":[{"idSolicitud":"1","resultado":419,"datos":null}]}}
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
- **Mensaje:** expected undefined to equal 403
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"STELGATO1783945127","respuestas":[{"idSolicitud":"1","resultado":419,"datos":null}]}}
```

## 118. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [General] mensajeError = "Canal emisor no tiene un plan de suscripción"
- **Mensaje:** expected undefined to equal 'Canal emisor no tiene un plan de susc…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"STELGATO1783945127","respuestas":[{"idSolicitud":"1","resultado":419,"datos":null}]}}
```

## 119. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [General] codigoError = 418
- **Mensaje:** expected 509 to equal 418
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 120. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [General] mensajeError = "Método no soportado"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Método no soportado'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 121. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [General] codigoError = 418
- **Mensaje:** expected undefined to equal 418
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"ARCHGATO1783945138","respuestas":[{"idSolicitud":"1","resultado":419,"datos":null}]}}
```

## 122. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [General] mensajeError = "Método no soportado"
- **Mensaje:** expected undefined to equal 'Método no soportado'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"ARCHGATO1783945138","respuestas":[{"idSolicitud":"1","resultado":419,"datos":null}]}}
```

## 123. 2_identificador / 0002.1.2.4. identificador — tipo number (409)

- **Test:** [metodo] respuestas[0].resultado = 409
- **Mensaje:** expected +0 to equal 409
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945161","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":69852374}}]}}
```

## 124. 2_identificador / 0002.1.2.4. identificador — tipo number (409)

- **Test:** [metodo] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945161","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":69852374}}]}}
```

## 125. 2_identificador / 0002.1.2.5. identificador — tipo boolean (409)

- **Test:** [metodo] respuestas[0].resultado = 409
- **Mensaje:** expected +0 to equal 409
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945162","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":true}}]}}
```

## 126. 2_identificador / 0002.1.2.5. identificador — tipo boolean (409)

- **Test:** [metodo] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945162","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":true}}]}}
```

## 127. 2_identificador / 0002.1.2.6. identificador — tipo object (409)

- **Test:** [metodo] respuestas[0].resultado = 409
- **Mensaje:** expected +0 to equal 409
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945164","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":{}}}]}}
```

## 128. 2_identificador / 0002.1.2.6. identificador — tipo object (409)

- **Test:** [metodo] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945164","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":{}}}]}}
```

## 129. 2_identificador / 0002.1.2.7. identificador — no inicia con 6 (409)

- **Test:** [metodo] respuestas[0].resultado = 409
- **Mensaje:** expected +0 to equal 409
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945165","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":"71234567"}}]}}
```

## 130. 2_identificador / 0002.1.2.7. identificador — no inicia con 6 (409)

- **Test:** [metodo] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945165","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":"71234567"}}]}}
```

## 131. 2_identificador / 0002.1.2.8. identificador — longitud 7 (409)

- **Test:** [metodo] respuestas[0].resultado = 409
- **Mensaje:** expected +0 to equal 409
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945167","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":"6123456"}}]}}
```

## 132. 2_identificador / 0002.1.2.8. identificador — longitud 7 (409)

- **Test:** [metodo] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945167","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":"6123456"}}]}}
```

## 133. 2_identificador / 0002.1.2.9. identificador — longitud 9 (409)

- **Test:** [metodo] respuestas[0].resultado = 409
- **Mensaje:** expected +0 to equal 409
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945169","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":"612345678"}}]}}
```

## 134. 2_identificador / 0002.1.2.9. identificador — longitud 9 (409)

- **Test:** [metodo] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945169","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":"612345678"}}]}}
```

## 135. 2_identificador / 0002.1.2.10. identificador — con letras (409)

- **Test:** [metodo] respuestas[0].resultado = 409
- **Mensaje:** expected +0 to equal 409
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945170","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":"6123456a"}}]}}
```

## 136. 2_identificador / 0002.1.2.10. identificador — con letras (409)

- **Test:** [metodo] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945170","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":"6123456a"}}]}}
```

## 137. 2_identificador / 0002.1.2.11. identificador — solo espacios (409)

- **Test:** [metodo] respuestas[0].resultado = 409
- **Mensaje:** expected +0 to equal 409
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945172","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":"        "}}]}}
```

## 138. 2_identificador / 0002.1.2.11. identificador — solo espacios (409)

- **Test:** [metodo] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945172","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":"        "}}]}}
```

## 139. 2_identificador / 0002.1.2.12. identificador — espacio interno (409)

- **Test:** [metodo] respuestas[0].resultado = 409
- **Mensaje:** expected +0 to equal 409
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945174","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":"61 23456"}}]}}
```

## 140. 2_identificador / 0002.1.2.12. identificador — espacio interno (409)

- **Test:** [metodo] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945174","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"existe":"INVALIDO","identificador":"61 23456"}}]}}
```

## 141. 1_identificador / 0004.1.1.1. identificador — propiedad ausente (419)

- **Test:** [parametro] respuestas[0].resultado = 419
- **Mensaje:** expected 430 to equal 419
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945209","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 142. 1_identificador / 0004.1.1.1. identificador — propiedad ausente (419)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945209","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 143. 2_tipoIdentificador / 0004.1.2.1. tipoIdentificador — propiedad ausente (419)

- **Test:** [parametro] respuestas[0].resultado = 419
- **Mensaje:** expected 430 to equal 419
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945231","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 144. 2_tipoIdentificador / 0004.1.2.1. tipoIdentificador — propiedad ausente (419)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945231","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 145. 3_idPregunta / 0004.1.3.7. idPregunta — símbolo arroba (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945254","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 146. 3_idPregunta / 0004.1.3.7. idPregunta — símbolo arroba (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945254","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 147. 3_idPregunta / 0004.1.3.8. idPregunta — espacio interno (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945256","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 148. 3_idPregunta / 0004.1.3.8. idPregunta — espacio interno (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945256","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 149. 3_idPregunta / 0004.1.3.10. idPregunta — guion bajo (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945259","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 150. 3_idPregunta / 0004.1.3.10. idPregunta — guion bajo (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945259","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 151. 3_idPregunta / 0004.1.3.11. idPregunta — punto (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945261","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 152. 3_idPregunta / 0004.1.3.11. idPregunta — punto (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945261","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 153. 3_idPregunta / 0004.1.3.12. idPregunta — barra (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945262","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 154. 3_idPregunta / 0004.1.3.12. idPregunta — barra (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945262","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 155. 3_idPregunta / 0004.1.3.13. idPregunta — comillas (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945264","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 156. 3_idPregunta / 0004.1.3.13. idPregunta — comillas (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945264","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 157. 3_idPregunta / 0004.1.3.14. idPregunta — unicode (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945266","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 158. 3_idPregunta / 0004.1.3.14. idPregunta — unicode (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945266","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 159. 3_idPregunta / 0004.1.3.15. idPregunta — espacio al inicio (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945267","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 160. 3_idPregunta / 0004.1.3.15. idPregunta — espacio al inicio (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945267","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 161. 3_idPregunta / 0004.1.3.16. idPregunta — espacio al final (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945269","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 162. 3_idPregunta / 0004.1.3.16. idPregunta — espacio al final (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945269","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 163. 3_idPregunta / 0004.1.3.17. idPregunta — un solo dígito (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945270","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 164. 3_idPregunta / 0004.1.3.17. idPregunta — un solo dígito (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945270","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 165. 3_idPregunta / 0004.1.3.18. idPregunta — tres dígitos (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945272","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 166. 3_idPregunta / 0004.1.3.18. idPregunta — tres dígitos (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945272","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 167. 3_idPregunta / 0004.1.3.19. idPregunta — solo letras (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945273","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 168. 3_idPregunta / 0004.1.3.19. idPregunta — solo letras (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945273","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 169. 3_idPregunta / 0004.1.3.22. idPregunta — un solo guion (428)

- **Test:** [parametro] respuestas[0].resultado = 428
- **Mensaje:** expected 430 to equal 428
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945278","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 170. 3_idPregunta / 0004.1.3.22. idPregunta — un solo guion (428)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945278","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 171. 4_respuesta / 0004.1.4.7. respuesta — símbolo arroba (429)

- **Test:** [parametro] respuestas[0].resultado = 429
- **Mensaje:** expected 430 to equal 429
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945289","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 172. 4_respuesta / 0004.1.4.7. respuesta — símbolo arroba (429)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945289","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 173. 4_respuesta / 0004.1.4.8. respuesta — espacio interno (429)

- **Test:** [parametro] respuestas[0].resultado = 429
- **Mensaje:** expected 430 to equal 429
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945291","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 174. 4_respuesta / 0004.1.4.8. respuesta — espacio interno (429)

- **Test:** [parametro] respuestas[0].datos es null o ausente
- **Mensaje:** expected false to be true
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945291","respuestas":[{"idSolicitud":"1","resultado":430,"datos":{"intentosFallidos":3}}]}}
```

## 175. 1_identificador / 0006.1.1.1. identificador — propiedad ausente (419)

- **Test:** [parametro] respuestas[0].resultado = 419
- **Mensaje:** expected 408 to equal 419
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945368","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 176. 2_tipoIdentificador / 0006.1.2.1. tipoIdentificador — propiedad ausente (419)

- **Test:** [parametro] respuestas[0].resultado = 419
- **Mensaje:** expected 408 to equal 419
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945387","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 177. 3_respuestas / 0006.1.3.1. respuestas — propiedad ausente (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { message: 'Internal server error' } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"message":"Internal server error"}}
```

## 178. 3_respuestas / 0006.1.3.2. respuestas — null (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { message: 'Internal server error' } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"message":"Internal server error"}}
```

## 179. 3_respuestas / 0006.1.3.3. respuestas — tipo string (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945404","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 180. 3_respuestas / 0006.1.3.4. respuestas — tipo number (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945406","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 181. 3_respuestas / 0006.1.3.5. respuestas — arreglo vacío (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945407","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 182. 3_respuestas / 0006.1.3.6. respuestas — un solo elemento (esperados 2) (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945409","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 183. 3_respuestas / 0006.1.3.7. respuestas — tres elementos (esperados 2) (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945410","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 184. 3_respuestas / 0006.1.3.8. respuestas — elemento no objeto (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945412","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 185. 3_respuestas / 0006.1.3.9. respuestas — item sin propiedad texto (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945413","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 186. 3_respuestas / 0006.1.3.10. respuestas — item sin propiedad id (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945415","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 187. 3_respuestas / 0006.1.3.11. respuestas — id tipo number (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945416","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 188. 3_respuestas / 0006.1.3.12. respuestas — texto tipo number (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945418","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 189. 3_respuestas / 0006.1.3.13. respuestas — id vacío (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945420","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 190. 3_respuestas / 0006.1.3.14. respuestas — texto vacío (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945421","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 191. 3_respuestas / 0006.1.3.15. respuestas — id duplicado (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945423","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 192. 3_respuestas / 0006.1.3.16. respuestas — propiedad extra en item (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945424","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 193. 3_respuestas / 0006.1.3.17. respuestas — id guion bajo (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 408 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945426","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 194. 3_respuestas / 0006.1.3.18. respuestas — id arroba (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 408 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945427","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 195. 3_respuestas / 0006.1.3.19. respuestas — id espacio interno (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 408 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945429","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 196. 3_respuestas / 0006.1.3.20. respuestas — id espacio al inicio (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 408 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945430","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 197. 3_respuestas / 0006.1.3.21. respuestas — id espacio al final (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 408 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945432","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 198. 3_respuestas / 0006.1.3.22. respuestas — id unicode (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 408 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945433","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 199. 3_respuestas / 0006.1.3.23. respuestas — id punto (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 408 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945435","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 200. 3_respuestas / 0006.1.3.24. respuestas — id barra (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 408 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945436","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 201. 3_respuestas / 0006.1.3.25. respuestas — id comillas (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 408 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945438","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 202. 3_respuestas / 0006.1.3.26. respuestas — id un solo dígito (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 408 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945439","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 203. 3_respuestas / 0006.1.3.27. respuestas — id tres dígitos (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 408 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945441","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 204. 3_respuestas / 0006.1.3.28. respuestas — id solo letras (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 408 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945443","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 205. 3_respuestas / 0006.1.3.29. respuestas — id tipo boolean true (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945444","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 206. 3_respuestas / 0006.1.3.30. respuestas — id tipo boolean false (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945446","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 207. 3_respuestas / 0006.1.3.31. respuestas — id tipo object (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945447","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 208. 3_respuestas / 0006.1.3.32. respuestas — id tipo array (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945449","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 209. 3_respuestas / 0006.1.3.33. respuestas — elemento null en arreglo (455)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { message: 'Internal server error' } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"message":"Internal server error"}}
```

## 210. 3_respuestas / 0006.1.3.34. respuestas — texto solo espacios (455)

- **Test:** [parametro] respuestas[0].resultado = 455
- **Mensaje:** expected 427 to equal 455
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945452","respuestas":[{"idSolicitud":"1","resultado":427,"datos":null}]}}
```

## 211. 1_identificador / 0007.1.1.1. identificador — propiedad ausente (419)

- **Test:** [parametro] respuestas[0].resultado = 419
- **Mensaje:** expected 407 to equal 419
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945506","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 212. 2_tipoIdentificador / 0007.1.2.1. tipoIdentificador — propiedad ausente (419)

- **Test:** [parametro] respuestas[0].resultado = 419
- **Mensaje:** expected 407 to equal 419
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945524","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 213. 1_id / 0008.1.1.1. id — propiedad ausente (444)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { message: 'Internal server error' } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"message":"Internal server error"}}
```

## 214. 1_id / 0008.1.1.2. id — null (444)

- **Test:** [parametro] respuestas[0].resultado = 444
- **Mensaje:** expected 407 to equal 444
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945573","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 215. 1_id / 0008.1.1.3. id — string vacío (444)

- **Test:** [parametro] respuestas[0].resultado = 444
- **Mensaje:** expected 407 to equal 444
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945575","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 216. 1_id / 0008.1.1.4. id — solo espacios (444)

- **Test:** [parametro] respuestas[0].resultado = 444
- **Mensaje:** expected 407 to equal 444
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945576","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 217. 1_id / 0008.1.1.5. id — tipo number (444)

- **Test:** [parametro] respuestas[0].resultado = 444
- **Mensaje:** expected 407 to equal 444
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945578","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 218. 1_id / 0008.1.1.6. id — tipo boolean (444)

- **Test:** [parametro] respuestas[0].resultado = 444
- **Mensaje:** expected 407 to equal 444
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945579","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 219. 1_id / 0008.1.1.7. id — tipo object (444)

- **Test:** [parametro] respuestas[0].resultado = 444
- **Mensaje:** expected 407 to equal 444
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945581","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 220. 1_id / 0008.1.1.8. id — longitud incorrecta (444)

- **Test:** [parametro] respuestas[0].resultado = 444
- **Mensaje:** expected 407 to equal 444
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945583","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 221. 1_id / 0008.1.1.9. id — formato no UUID (444)

- **Test:** [parametro] respuestas[0].resultado = 444
- **Mensaje:** expected 407 to equal 444
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945585","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 222. 1_id / 0008.1.1.10. id — sin guiones (444)

- **Test:** [parametro] respuestas[0].resultado = 444
- **Mensaje:** expected 407 to equal 444
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945586","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 223. 2_identificador / 0008.1.2.1. identificador — propiedad ausente (419)

- **Test:** [parametro] respuestas[0].resultado = 419
- **Mensaje:** expected 407 to equal 419
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945588","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 224. 3_tipoIdentificador / 0008.1.3.1. tipoIdentificador — propiedad ausente (419)

- **Test:** [parametro] respuestas[0].resultado = 419
- **Mensaje:** expected 407 to equal 419
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945606","respuestas":[{"idSolicitud":"1","resultado":407,"datos":null}]}}
```

## 225. 3_bancoAcreedor / 0022.1.3.1. bancoAcreedor — propiedad ausente (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945737","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 226. 3_bancoAcreedor / 0022.1.3.2. bancoAcreedor — null (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945738","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 227. 3_bancoAcreedor / 0022.1.3.3. bancoAcreedor — string vacío (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945740","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 228. 3_bancoAcreedor / 0022.1.3.4. bancoAcreedor — tipo number (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945741","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 229. 3_bancoAcreedor / 0022.1.3.5. bancoAcreedor — tipo boolean (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945743","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 230. 3_bancoAcreedor / 0022.1.3.6. bancoAcreedor — tipo object (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945745","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 231. 3_bancoAcreedor / 0022.1.3.7. bancoAcreedor — longitud 3 (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945746","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 232. 3_bancoAcreedor / 0022.1.3.8. bancoAcreedor — longitud 13 (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945748","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 233. 3_bancoAcreedor / 0022.1.3.9. bancoAcreedor — longitud 7 (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945749","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 234. 3_bancoAcreedor / 0022.1.3.10. bancoAcreedor — solo espacios (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945751","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 235. 3_bancoAcreedor / 0022.1.3.11. bancoAcreedor — símbolo arroba (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945752","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 236. 3_bancoAcreedor / 0022.1.3.12. bancoAcreedor — espacio interno (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945754","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 237. 3_bancoAcreedor / 0022.1.3.13. bancoAcreedor — paréntesis (435)

- **Test:** [parametro] catalogo resuelve referencia CloudWatch para codigo 435
- **Mensaje:** Codigo 435 no esta en CATALOGO_GENERAL
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945755","respuestas":[{"idSolicitud":"1","resultado":414,"datos":null}]}}
```

## 238. 8_descripcion / 0022.1.8.1. descripcion — tipo number (437)

- **Test:** [parametro] respuestas[0].resultado = 437
- **Mensaje:** expected 408 to equal 437
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945801","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 239. 8_descripcion / 0022.1.8.2. descripcion — longitud 81 (437)

- **Test:** [parametro] respuestas[0].resultado = 437
- **Mensaje:** expected 408 to equal 437
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945802","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 240. 8_descripcion / 0022.1.8.3. descripcion — caracteres no permitidos (437)

- **Test:** [parametro] respuestas[0].resultado = 437
- **Mensaje:** expected 408 to equal 437
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945804","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 241. 8_descripcion / 0022.1.8.4. descripcion — símbolo arroba (437)

- **Test:** [parametro] respuestas[0].resultado = 437
- **Mensaje:** expected 408 to equal 437
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945805","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 242. 2_qrCode / 0023.1.2.4. qrCode — tipo number (473)

- **Test:** [parametro] respuestas[0].resultado = 473
- **Mensaje:** expected 408 to equal 473
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945831","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 243. 2_qrCode / 0023.1.2.5. qrCode — tipo boolean (473)

- **Test:** [parametro] respuestas[0].resultado = 473
- **Mensaje:** expected 408 to equal 473
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945832","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```

## 244. 2_qrCode / 0023.1.2.6. qrCode — tipo object (473)

- **Test:** [parametro] respuestas[0].resultado = 473
- **Mensaje:** expected 408 to equal 473
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1783945834","respuestas":[{"idSolicitud":"1","resultado":408,"datos":null}]}}
```
