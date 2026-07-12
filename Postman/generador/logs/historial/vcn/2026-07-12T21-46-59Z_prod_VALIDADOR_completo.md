# Resumen de fallos — VCN

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-12T21:46:59.760Z |
| Código fuente | prod |
| Nivel ejecución | VALIDADOR |
| Carpeta | `(completo)` |
| Nota | prod-a-dev rama prod-a-dev |
| Requests | 947 (failed: 0) |
| Tests | 4257 (failed: 161) |
| JSON completo | `logs\ultimo-run-vcn.json` |

## 1. 0_jsonEntrada / 0.1. body — JSON HTTP inválido (400)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 502)
- **Mensaje:** expected 502 to equal 400
- **HTTP descifrar:** 200

```json
{"message":"Internal server error"}
```

## 2. 0_jsonEntrada / 0.1. body — JSON HTTP inválido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected undefined to equal 400
- **HTTP descifrar:** 200

```json
{"message":"Internal server error"}
```

## 3. 0_jsonEntrada / 0.1. body — JSON HTTP inválido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected undefined to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"message":"Internal server error"}
```

## 4. 1_idCanal / 1.1.4. idCanal — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 5. 1_idCanal / 1.1.4. idCanal — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 6. 1_idCanal / 1.1.5. idCanal — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 7. 1_idCanal / 1.1.5. idCanal — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 8. 1_idCanal / 1.1.6. idCanal — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 9. 1_idCanal / 1.1.6. idCanal — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 10. 1_idCanal / 1.1.7. idCanal — solo espacios, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 11. 1_idCanal / 1.1.7. idCanal — solo espacios, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 12. 1_idCanal / 1.1.8. idCanal — solo tab, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 13. 1_idCanal / 1.1.8. idCanal — solo tab, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 14. 1_idCanal / 1.1.9. idCanal — longitud 5, máximo 4 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 15. 1_idCanal / 1.1.9. idCanal — longitud 5, máximo 4 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 16. 1_idCanal / 1.1.10. idCanal — espacio interno, post-trim (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 17. 1_idCanal / 1.1.10. idCanal — espacio interno, post-trim (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 18. 1_idCanal / 1.1.11. idCanal — símbolo @ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 19. 1_idCanal / 1.1.11. idCanal — símbolo @ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 20. 1_idCanal / 1.1.12. idCanal — paréntesis ( no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 21. 1_idCanal / 1.1.12. idCanal — paréntesis ( no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 22. 1_idCanal / 1.1.13. idCanal — ¿ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 23. 1_idCanal / 1.1.13. idCanal — ¿ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 24. 1_idCanal / 1.1.14. idCanal — comillas " no permitidas (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 401 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 25. 1_idCanal / 1.1.14. idCanal — comillas " no permitidas (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Canal emisor no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":401,"mensajeError":"Canal emisor no existe"}
```

## 26. 2_validador / 1.2.4. validador — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 27. 2_validador / 1.2.4. validador — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 28. 2_validador / 1.2.5. validador — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 29. 2_validador / 1.2.5. validador — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 30. 2_validador / 1.2.6. validador — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 31. 2_validador / 1.2.6. validador — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 32. 2_validador / 1.2.7. validador — solo espacios, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 33. 2_validador / 1.2.7. validador — solo espacios, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 34. 2_validador / 1.2.8. validador — solo tab, trim vacío (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 35. 2_validador / 1.2.8. validador — solo tab, trim vacío (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 36. 2_validador / 1.2.9. validador — longitud 5, máximo 4 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 37. 2_validador / 1.2.9. validador — longitud 5, máximo 4 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 38. 2_validador / 1.2.10. validador — espacio interno, post-trim (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 39. 2_validador / 1.2.10. validador — espacio interno, post-trim (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 40. 2_validador / 1.2.11. validador — símbolo @ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 41. 2_validador / 1.2.11. validador — símbolo @ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 42. 2_validador / 1.2.12. validador — paréntesis ( no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 43. 2_validador / 1.2.12. validador — paréntesis ( no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 44. 2_validador / 1.2.13. validador — ¿ no permitido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 45. 2_validador / 1.2.13. validador — ¿ no permitido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 46. 2_validador / 1.2.14. validador — comillas " no permitidas (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 404 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 47. 2_validador / 1.2.14. validador — comillas " no permitidas (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Validador no existe' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":404,"mensajeError":"Validador no existe"}
```

## 48. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 49. 3_peticion / 1.3.4. peticion — tipo number (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 50. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 51. 3_peticion / 1.3.5. peticion — tipo boolean (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 52. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 53. 3_peticion / 1.3.6. peticion — tipo object (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 54. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 55. 3_peticion / 1.3.7. peticion — formato hex inválido (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 56. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 57. 3_peticion / 1.3.8. peticion — IV en base64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 58. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 59. 3_peticion / 1.3.9. peticion — IV truncado (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 60. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 61. 3_peticion / 1.3.10. peticion — segmento AES en base64 (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 62. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 63. 3_peticion / 1.3.11. peticion — segmento AES faltante (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 64. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 65. 3_peticion / 1.3.12. peticion — segmento extra (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 66. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [General] codigoError = 400
- **Mensaje:** expected 405 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 67. 3_peticion / 1.3.13. peticion — caracter no hex (400)

- **Test:** [General] mensajeError = "Error en la petición original"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error en la petición original'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 68. 5_solicitudes / 1.5.1. solicitudes — tipo string (425)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 69. 5_solicitudes / 1.5.1. solicitudes — tipo string (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 70. 5_solicitudes / 1.5.2. solicitudes — arreglo vacío (425)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 71. 5_solicitudes / 1.5.2. solicitudes — arreglo vacío (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 72. 5_solicitudes / 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 73. 5_solicitudes / 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)

- **Test:** [General] mensajeError = "Cantidad de solicitudes no permitidas"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Cantidad de solicitudes no permitidas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 74. 5_solicitudes / 1.5.4. solicitudes — sin propiedad idSolicitud (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 75. 5_solicitudes / 1.5.4. solicitudes — sin propiedad idSolicitud (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 76. 5_solicitudes / 1.5.5. solicitudes — idSolicitud vacío (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 77. 5_solicitudes / 1.5.5. solicitudes — idSolicitud vacío (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 78. 5_solicitudes / 1.5.6. solicitudes — idSolicitud tipo number (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
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

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
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

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 83. 5_solicitudes / 1.5.8. solicitudes — idSolicitud longitud 65 (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 84. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 85. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 425 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 86. 5_solicitudes / 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Cantidad de solicitudes no permitidas.' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}
```

## 87. 5_solicitudes / 1.5.10. solicitudes — guion bajo (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 88. 5_solicitudes / 1.5.10. solicitudes — guion bajo (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 89. 5_solicitudes / 1.5.10. solicitudes — guion bajo (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 90. 5_solicitudes / 1.5.11. solicitudes — espacio interno (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 91. 5_solicitudes / 1.5.11. solicitudes — espacio interno (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 92. 5_solicitudes / 1.5.11. solicitudes — espacio interno (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 93. 5_solicitudes / 1.5.12. solicitudes — espacio al inicio (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 94. 5_solicitudes / 1.5.12. solicitudes — espacio al inicio (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 95. 5_solicitudes / 1.5.12. solicitudes — espacio al inicio (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 96. 5_solicitudes / 1.5.13. solicitudes — espacio al final (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 97. 5_solicitudes / 1.5.13. solicitudes — espacio al final (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 98. 5_solicitudes / 1.5.13. solicitudes — espacio al final (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 99. 5_solicitudes / 1.5.14. solicitudes — arroba (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 100. 5_solicitudes / 1.5.14. solicitudes — arroba (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 101. 5_solicitudes / 1.5.14. solicitudes — arroba (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 102. 5_solicitudes / 1.5.15. solicitudes — punto (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 103. 5_solicitudes / 1.5.15. solicitudes — punto (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 104. 5_solicitudes / 1.5.15. solicitudes — punto (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 105. 5_solicitudes / 1.5.16. solicitudes — unicode (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 106. 5_solicitudes / 1.5.16. solicitudes — unicode (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 107. 5_solicitudes / 1.5.16. solicitudes — unicode (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 108. 5_solicitudes / 1.5.17. solicitudes — barra (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 109. 5_solicitudes / 1.5.17. solicitudes — barra (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 110. 5_solicitudes / 1.5.17. solicitudes — barra (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 111. 5_solicitudes / 1.5.18. solicitudes — comillas (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 112. 5_solicitudes / 1.5.18. solicitudes — comillas (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 113. 5_solicitudes / 1.5.18. solicitudes — comillas (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 114. 5_solicitudes / 1.5.19. solicitudes — elemento null en arreglo (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 115. 5_solicitudes / 1.5.19. solicitudes — elemento null en arreglo (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 999 to equal 431
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 116. 5_solicitudes / 1.5.19. solicitudes — elemento null en arreglo (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error en la solicitud' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"codigoError":999,"mensajeError":"Error en la solicitud"}
```

## 117. 5_solicitudes / 1.5.20. solicitudes — idSolicitud null (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 118. 5_solicitudes / 1.5.20. solicitudes — idSolicitud null (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 119. 5_solicitudes / 1.5.21. solicitudes — idSolicitud tipo boolean true (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 120. 5_solicitudes / 1.5.21. solicitudes — idSolicitud tipo boolean true (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 121. 5_solicitudes / 1.5.22. solicitudes — idSolicitud tipo boolean false (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 122. 5_solicitudes / 1.5.22. solicitudes — idSolicitud tipo boolean false (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 123. 5_solicitudes / 1.5.23. solicitudes — solo guiones (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 124. 5_solicitudes / 1.5.23. solicitudes — solo guiones (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 125. 5_solicitudes / 1.5.23. solicitudes — solo guiones (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 126. 5_solicitudes / 1.5.24. solicitudes — un solo guion (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 127. 5_solicitudes / 1.5.24. solicitudes — un solo guion (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 509 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 128. 5_solicitudes / 1.5.24. solicitudes — un solo guion (431)

- **Test:** [General] mensajeError = "Campo idSolicitud no cumple con los criterios"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Campo idSolicitud no cumple con los c…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 129. 5_solicitudes / 1.5.25. solicitudes — idSolicitud tipo object (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 130. 5_solicitudes / 1.5.25. solicitudes — idSolicitud tipo object (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 131. 5_solicitudes / 1.5.26. solicitudes — idSolicitud tipo array (431)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 132. 5_solicitudes / 1.5.26. solicitudes — idSolicitud tipo array (431)

- **Test:** [General] codigoError = 431
- **Mensaje:** expected 404 to equal 431
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}
```

## 133. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 134. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [General] codigoError = 403
- **Mensaje:** expected 509 to equal 403
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 135. 1_idCanal / 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Test:** [General] mensajeError = "Canal emisor no tiene un plan de suscripción"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Canal emisor no tiene un plan de susc…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 136. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [Lambda VCN] HTTP status = 500 (real: 400)
- **Mensaje:** expected 400 to equal 500
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 137. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [General] codigoError = 500
- **Mensaje:** expected 405 to equal 500
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 138. 1_idCanal / 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Test:** [General] mensajeError = "Error interno"
- **Mensaje:** expected 'Error en descifrado canal emisor' to equal 'Error interno'
- **HTTP descifrar:** 200

```json
{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}
```

## 139. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 140. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [General] codigoError = 403
- **Mensaje:** expected 509 to equal 403
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 141. 1_idCanal / 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Test:** [General] mensajeError = "Canal emisor no tiene un plan de suscripción"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Canal emisor no tiene un plan de susc…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 142. 2_validador / 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Test:** [Lambda VCN] HTTP status = 500 (real: 200)
- **Mensaje:** expected 200 to equal 500
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":418,"mensajeError":"Metodo no soportado por el validador"}}
```

## 143. 2_validador / 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Test:** [General] codigoError = 500
- **Mensaje:** expected 418 to equal 500
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":418,"mensajeError":"Metodo no soportado por el validador"}}
```

## 144. 2_validador / 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Test:** [General] mensajeError = "Error interno"
- **Mensaje:** expected 'Metodo no soportado por el validador' to equal 'Error interno'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":418,"mensajeError":"Metodo no soportado por el validador"}}
```

## 145. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 146. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [General] codigoError = 418
- **Mensaje:** expected 509 to equal 418
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 147. 4_metodo / 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Test:** [General] mensajeError = "Método no soportado"
- **Mensaje:** expected 'Error inesperado al llamar servicio i…' to equal 'Método no soportado'
- **HTTP descifrar:** 200

```json
{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}
```

## 148. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [Lambda VCN] HTTP status = 400 (real: 200)
- **Mensaje:** expected 200 to equal 400
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 149. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [General] codigoError = 418
- **Mensaje:** expected 509 to equal 418
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 150. 4_metodo / 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Test:** [General] mensajeError = "Método no soportado"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Método no soportado'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 151. 1_cuenta / 0001.1.1.1. cuenta — propiedad ausente (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 999, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":999,"mensajeError":"Error en la solicitud"}}
```

## 152. 1_cuenta / 0001.1.1.2. cuenta — null (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 999, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":999,"mensajeError":"Error en la solicitud"}}
```

## 153. 1_cuenta / 0001.1.1.18. cuenta — tipo array (413)

- **Test:** [Dummy /descifrar] estructura inner.respuestas[0] presente
- **Mensaje:** expected { codigoError: 509, …(1) } to have property 'respuestas'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 154. 1022_fijo / 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)

- **Test:** [General] codigoError = 599
- **Mensaje:** expected undefined to equal 599
- **HTTP descifrar:** 200

```json
{"respuesta":{"message":"Internal server error"}}
```

## 155. 1022_fijo / 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)

- **Test:** [General] mensajeError = "Tiempo de espera agotado al llamar al Canal Validador"
- **Mensaje:** expected undefined to equal 'Tiempo de espera agotado al llamar al…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"message":"Internal server error"}}
```

## 156. 1022_fijo / 0001.5.1022.3. validador PROXGATO auth fijo — respuesta sin campo cifrado (509)

- **Test:** [General] codigoError = 509
- **Mensaje:** expected 406 to equal 509
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":406,"mensajeError":"Error en descifrado canal validador"}}
```

## 157. 1022_fijo / 0001.5.1022.3. validador PROXGATO auth fijo — respuesta sin campo cifrado (509)

- **Test:** [General] mensajeError = "Error inesperado en el Canal Validador"
- **Mensaje:** expected 'Error en descifrado canal validador' to equal 'Error inesperado en el Canal Validador'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":406,"mensajeError":"Error en descifrado canal validador"}}
```

## 158. 1023_token / 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)

- **Test:** [General] codigoError = 599
- **Mensaje:** expected 509 to equal 599
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 159. 1023_token / 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)

- **Test:** [General] mensajeError = "Tiempo de espera agotado al llamar al Canal Validador"
- **Mensaje:** expected 'Error inesperado en validador' to equal 'Tiempo de espera agotado al llamar al…'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}
```

## 160. 1023_token / 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)

- **Test:** [General] codigoError = 509
- **Mensaje:** expected 406 to equal 509
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":406,"mensajeError":"Error en descifrado canal validador"}}
```

## 161. 1023_token / 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)

- **Test:** [General] mensajeError = "Error inesperado en el Canal Validador"
- **Mensaje:** expected 'Error en descifrado canal validador' to equal 'Error inesperado en el Canal Validador'
- **HTTP descifrar:** 200

```json
{"respuesta":{"codigoError":406,"mensajeError":"Error en descifrado canal validador"}}
```
