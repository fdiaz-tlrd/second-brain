# Resumen de fallos — VCN

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15T14:15:14.338Z |
| Código fuente | dev |
| Nivel ejecución | MATRIZ |
| Carpeta | `(completo)` |
| Nota | post-deploy Dig 481/482/418 canales 1018-1024 |
| Requests | 1335 (failed: 0) |
| Tests | 4836 (failed: 88) |
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
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 33. 2_validador / 1.2.4. validador — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error interno' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 34. 2_validador / 1.2.5. validador — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 35. 2_validador / 1.2.5. validador — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error interno' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 36. 2_validador / 1.2.6. validador — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 500 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
```

## 37. 2_validador / 1.2.6. validador — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error interno' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":500,"mensajeError":"Error interno"}
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
- **Mensaje:** expected undefined to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1784124240","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"banco":"TLRDPAPA","cuenta":"1100001328","producto":"PACA","estadoCuenta":"0","titulares":["Fis*** vo* Luftsc***** Narfi****"]}}]}}
```

## 54. 2_validador / 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"respuesta":{"idPeticion":"CELEGATO1784124240","respuestas":[{"idSolicitud":"1","resultado":0,"datos":{"banco":"TLRDPAPA","cuenta":"1100001328","producto":"PACA","estadoCuenta":"0","titulares":["Fis*** vo* Luftsc***** Narfi****"]}}]}}
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
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}}
```

## 76. 4_idPeticion / 1.4.9. idPeticion — longitud 7, mínimo 8 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}}
```

## 77. 4_idPeticion / 1.4.11. idPeticion — espacio interno (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}}
```

## 78. 4_idPeticion / 1.4.11. idPeticion — espacio interno (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}}
```

## 79. 4_idPeticion / 1.4.12. idPeticion — símbolo @ (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}}
```

## 80. 4_idPeticion / 1.4.12. idPeticion — símbolo @ (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}}
```

## 81. 4_idPeticion / 1.4.13. idPeticion — unicode interrogación apertura (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}}
```

## 82. 4_idPeticion / 1.4.13. idPeticion — unicode interrogación apertura (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}}
```

## 83. 4_idPeticion / 1.4.14. idPeticion — comillas (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 509 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}}
```

## 84. 4_idPeticion / 1.4.14. idPeticion — comillas (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}}
```

## 85. 4_idPeticion / 1.4.15. idPeticion — prefijo SWIFT ajeno (445)

- **Test:** [General] codigoError = 445
- **Mensaje:** expected 509 to equal 445
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}}
```

## 86. 4_idPeticion / 1.4.15. idPeticion — prefijo SWIFT ajeno (445)

- **Test:** [General] mensajeError = "El prefijo Código SWIFT del idPeticion no coincide con el canal emisor"
- **Mensaje:** expected 'Error inesperado en el Canal Validador' to equal 'El prefijo Código SWIFT del idPeticio…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en el Canal Validador"}}
```

## 87. 5_solicitudes / 1.5.1. solicitudes — tipo string (425)

- **Test:** [General] codigoError = 425
- **Mensaje:** expected 400 to equal 425
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":400,"mensajeError":"Error en la petición original"}}
```

## 88. 5_solicitudes / 1.5.1. solicitudes — tipo string (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Error en la petición original' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":400,"mensajeError":"Error en la petición original"}}
```
