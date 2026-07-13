# Resultados por escenario — P2P

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-13T08:53:01.548Z |
| Código fuente | prod |
| Nivel ejecución | MATRIZ |
| Carpeta | `(completo)` |
| Nota | MATRIZ P2P prod-a-dev alias revision codigoError |
| Escenarios | 2159 |
| Con captura determinista `[CAPTURA]` | 0 / 2159 |

Columnas HTTP = protocolo (real de la lambda vs esperado). Columnas negocio = `codigoError`/`resultado` del payload (recibido efectivo vs esperado). El JSON hermano guarda además: `urlLambda`, `reqClaro`, `reqCifrado`, `respLambdaRaw`, `respLambdaHeaders`, `tiempoRealMs`, `flowError`.

| # | Escenario | HTTP esp | HTTP real | HTTP ok | Negocio esp | Negocio recib | Negocio ok | assert | Cuerpo (resumen) |
|---|-----------|----------|-----------|---------|-------------|---------------|------------|--------|------------------|
| 1 | 0.1. body — JSON HTTP inválido (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 2 | 0.1. body — JSON HTTP inválido (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 3 | 0.1. body — JSON HTTP inválido (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 4 | 1.1.1. idCanal — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo canal"}` |
| 5 | 1.1.1. idCanal — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo canal"}` |
| 6 | 1.1.1. idCanal — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo canal"}` |
| 7 | 1.1.1. idCanal — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo canal"}` |
| 8 | 1.1.2. idCanal — null (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 9 | 1.1.2. idCanal — null (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 10 | 1.1.2. idCanal — null (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 11 | 1.1.2. idCanal — null (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 12 | 1.1.3. idCanal — string vacío "" (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 13 | 1.1.3. idCanal — string vacío "" (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 14 | 1.1.3. idCanal — string vacío "" (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 15 | 1.1.3. idCanal — string vacío "" (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 16 | 1.1.4. idCanal — tipo number (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 17 | 1.1.4. idCanal — tipo number (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 18 | 1.1.4. idCanal — tipo number (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 19 | 1.1.4. idCanal — tipo number (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 20 | 1.1.5. idCanal — tipo boolean (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 21 | 1.1.5. idCanal — tipo boolean (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 22 | 1.1.5. idCanal — tipo boolean (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 23 | 1.1.5. idCanal — tipo boolean (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 24 | 1.1.6. idCanal — tipo object (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 25 | 1.1.6. idCanal — tipo object (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 26 | 1.1.6. idCanal — tipo object (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 27 | 1.1.6. idCanal — tipo object (400) | — | — | — | 400 | 550 | ✗ | ✗ | `{"codigoError":550,"descripcionError":"Error inesperado"}` |
| 28 | 1.1.7. idCanal — solo espacios, trim vacío (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 29 | 1.1.7. idCanal — solo espacios, trim vacío (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 30 | 1.1.7. idCanal — solo espacios, trim vacío (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 31 | 1.1.7. idCanal — solo espacios, trim vacío (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 32 | 1.1.8. idCanal — solo tab, trim vacío (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 33 | 1.1.8. idCanal — solo tab, trim vacío (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 34 | 1.1.8. idCanal — solo tab, trim vacío (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 35 | 1.1.8. idCanal — solo tab, trim vacío (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 36 | 1.1.9. idCanal — longitud 5, máximo 4 (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo canal"}` |
| 37 | 1.1.9. idCanal — longitud 5, máximo 4 (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo canal"}` |
| 38 | 1.1.9. idCanal — longitud 5, máximo 4 (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo canal"}` |
| 39 | 1.1.9. idCanal — longitud 5, máximo 4 (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo canal"}` |
| 40 | 1.1.10. idCanal — espacio interno, post-trim (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 41 | 1.1.10. idCanal — espacio interno, post-trim (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 42 | 1.1.10. idCanal — espacio interno, post-trim (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 43 | 1.1.10. idCanal — espacio interno, post-trim (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 44 | 1.1.11. idCanal — símbolo @ no permitido (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 45 | 1.1.11. idCanal — símbolo @ no permitido (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 46 | 1.1.11. idCanal — símbolo @ no permitido (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 47 | 1.1.11. idCanal — símbolo @ no permitido (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 48 | 1.1.12. idCanal — paréntesis ( no permitido (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 49 | 1.1.12. idCanal — paréntesis ( no permitido (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 50 | 1.1.12. idCanal — paréntesis ( no permitido (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 51 | 1.1.12. idCanal — paréntesis ( no permitido (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 52 | 1.1.13. idCanal — ¿ no permitido (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 53 | 1.1.13. idCanal — ¿ no permitido (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 54 | 1.1.13. idCanal — ¿ no permitido (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 55 | 1.1.13. idCanal — ¿ no permitido (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 56 | 1.1.14. idCanal — comillas " no permitidas (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 57 | 1.1.14. idCanal — comillas " no permitidas (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 58 | 1.1.14. idCanal — comillas " no permitidas (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 59 | 1.1.14. idCanal — comillas " no permitidas (400) | — | — | — | 400 | 401 | ✗ | ✗ | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 60 | 1.2.1. validador — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 61 | 1.2.1. validador — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 62 | 1.2.1. validador — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 63 | 1.2.1. validador — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 64 | 1.2.2. validador — null (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 65 | 1.2.2. validador — null (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 66 | 1.2.2. validador — null (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 67 | 1.2.2. validador — null (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 68 | 1.2.3. validador — string vacío "" (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 69 | 1.2.3. validador — string vacío "" (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 70 | 1.2.3. validador — string vacío "" (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 71 | 1.2.3. validador — string vacío "" (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 72 | 1.2.4. validador — tipo number (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 73 | 1.2.4. validador — tipo number (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 74 | 1.2.4. validador — tipo number (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 75 | 1.2.4. validador — tipo number (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 76 | 1.2.5. validador — tipo boolean (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 77 | 1.2.5. validador — tipo boolean (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 78 | 1.2.5. validador — tipo boolean (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 79 | 1.2.5. validador — tipo boolean (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 80 | 1.2.6. validador — tipo object (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 81 | 1.2.6. validador — tipo object (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 82 | 1.2.6. validador — tipo object (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 83 | 1.2.6. validador — tipo object (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 84 | 1.2.7. validador — solo espacios, trim vacío (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 85 | 1.2.7. validador — solo espacios, trim vacío (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 86 | 1.2.7. validador — solo espacios, trim vacío (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 87 | 1.2.7. validador — solo espacios, trim vacío (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 88 | 1.2.8. validador — solo tab, trim vacío (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 89 | 1.2.8. validador — solo tab, trim vacío (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 90 | 1.2.8. validador — solo tab, trim vacío (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 91 | 1.2.8. validador — solo tab, trim vacío (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 92 | 1.2.9. validador — longitud 9, máximo 8 (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 93 | 1.2.9. validador — longitud 9, máximo 8 (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 94 | 1.2.9. validador — longitud 9, máximo 8 (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 95 | 1.2.9. validador — longitud 9, máximo 8 (400) | — | — | — | 400 | 400 | OK | ✗ | `{"codigoError":400,"descripcionError":"Error de formato en campo validador"}` |
| 96 | 1.2.10. validador — espacio interno, post-trim (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 97 | 1.2.10. validador — espacio interno, post-trim (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 98 | 1.2.10. validador — espacio interno, post-trim (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 99 | 1.2.10. validador — espacio interno, post-trim (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 100 | 1.2.11. validador — símbolo @ no permitido (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 101 | 1.2.11. validador — símbolo @ no permitido (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 102 | 1.2.11. validador — símbolo @ no permitido (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 103 | 1.2.11. validador — símbolo @ no permitido (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 104 | 1.2.12. validador — paréntesis ( no permitido (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 105 | 1.2.12. validador — paréntesis ( no permitido (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 106 | 1.2.12. validador — paréntesis ( no permitido (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 107 | 1.2.12. validador — paréntesis ( no permitido (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 108 | 1.2.13. validador — ¿ no permitido (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 109 | 1.2.13. validador — ¿ no permitido (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 110 | 1.2.13. validador — ¿ no permitido (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 111 | 1.2.13. validador — ¿ no permitido (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 112 | 1.2.14. validador — comillas " no permitidas (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 113 | 1.2.14. validador — comillas " no permitidas (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 114 | 1.2.14. validador — comillas " no permitidas (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 115 | 1.2.14. validador — comillas " no permitidas (400) | — | — | — | 400 | 404 | ✗ | ✗ | `{"codigoError":404,"mensajeError":"Validador no existe"}` |
| 116 | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 117 | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 118 | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 119 | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 120 | 1.3.1. peticion — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 121 | 1.3.1. peticion — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 122 | 1.3.1. peticion — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 123 | 1.3.1. peticion — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 124 | 1.3.2. peticion — null (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 125 | 1.3.2. peticion — null (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 126 | 1.3.2. peticion — null (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 127 | 1.3.2. peticion — null (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 128 | 1.3.3. peticion — string vacío (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 129 | 1.3.3. peticion — string vacío (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 130 | 1.3.3. peticion — string vacío (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 131 | 1.3.3. peticion — string vacío (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 132 | 1.3.4. peticion — tipo number (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 133 | 1.3.4. peticion — tipo number (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 134 | 1.3.4. peticion — tipo number (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 135 | 1.3.4. peticion — tipo number (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 136 | 1.3.5. peticion — tipo boolean (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 137 | 1.3.5. peticion — tipo boolean (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 138 | 1.3.5. peticion — tipo boolean (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 139 | 1.3.5. peticion — tipo boolean (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 140 | 1.3.6. peticion — tipo object (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 141 | 1.3.6. peticion — tipo object (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 142 | 1.3.6. peticion — tipo object (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 143 | 1.3.6. peticion — tipo object (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 144 | 1.3.7. peticion — formato hex inválido (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 145 | 1.3.7. peticion — formato hex inválido (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 146 | 1.3.7. peticion — formato hex inválido (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 147 | 1.3.7. peticion — formato hex inválido (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 148 | 1.3.8. peticion — IV en base64 (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 149 | 1.3.8. peticion — IV en base64 (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 150 | 1.3.8. peticion — IV en base64 (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 151 | 1.3.8. peticion — IV en base64 (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 152 | 1.3.9. peticion — IV truncado (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 153 | 1.3.9. peticion — IV truncado (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 154 | 1.3.9. peticion — IV truncado (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 155 | 1.3.9. peticion — IV truncado (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 156 | 1.3.10. peticion — segmento AES en base64 (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 157 | 1.3.10. peticion — segmento AES en base64 (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 158 | 1.3.10. peticion — segmento AES en base64 (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 159 | 1.3.10. peticion — segmento AES en base64 (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 160 | 1.3.11. peticion — segmento AES faltante (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 161 | 1.3.11. peticion — segmento AES faltante (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 162 | 1.3.11. peticion — segmento AES faltante (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 163 | 1.3.11. peticion — segmento AES faltante (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 164 | 1.3.12. peticion — segmento extra (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 165 | 1.3.12. peticion — segmento extra (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 166 | 1.3.12. peticion — segmento extra (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 167 | 1.3.12. peticion — segmento extra (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 168 | 1.3.13. peticion — caracter no hex (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 169 | 1.3.13. peticion — caracter no hex (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 170 | 1.3.13. peticion — caracter no hex (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 171 | 1.3.13. peticion — caracter no hex (400) | — | — | — | 400 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 172 | 1.4.1. idPeticion — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 173 | 1.4.1. idPeticion — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 174 | 1.4.1. idPeticion — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 175 | 1.4.1. idPeticion — propiedad ausente (undefined) (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 176 | 1.4.2. idPeticion — null (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 177 | 1.4.2. idPeticion — null (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 178 | 1.4.2. idPeticion — null (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 179 | 1.4.2. idPeticion — null (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 180 | 1.4.3. idPeticion — string vacío (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 181 | 1.4.3. idPeticion — string vacío (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 182 | 1.4.3. idPeticion — string vacío (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 183 | 1.4.3. idPeticion — string vacío (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 184 | 1.4.4. idPeticion — tipo number (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 185 | 1.4.4. idPeticion — tipo number (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 186 | 1.4.4. idPeticion — tipo number (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 187 | 1.4.4. idPeticion — tipo number (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 188 | 1.4.5. idPeticion — tipo boolean (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 189 | 1.4.5. idPeticion — tipo boolean (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 190 | 1.4.5. idPeticion — tipo boolean (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 191 | 1.4.5. idPeticion — tipo boolean (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 192 | 1.4.6. idPeticion — tipo object (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 193 | 1.4.6. idPeticion — tipo object (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 194 | 1.4.6. idPeticion — tipo object (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 195 | 1.4.6. idPeticion — tipo object (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 196 | 1.4.7. idPeticion — solo espacios (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 197 | 1.4.7. idPeticion — solo espacios (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 198 | 1.4.7. idPeticion — solo espacios (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 199 | 1.4.7. idPeticion — solo espacios (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 200 | 1.4.8. idPeticion — solo tab (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 201 | 1.4.8. idPeticion — solo tab (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 202 | 1.4.8. idPeticion — solo tab (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 203 | 1.4.8. idPeticion — solo tab (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 204 | 1.4.9. idPeticion — longitud 7, mínimo 8 (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 205 | 1.4.9. idPeticion — longitud 7, mínimo 8 (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 206 | 1.4.9. idPeticion — longitud 7, mínimo 8 (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 207 | 1.4.9. idPeticion — longitud 7, mínimo 8 (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 208 | 1.4.10. idPeticion — longitud 65, máximo 64 (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 209 | 1.4.10. idPeticion — longitud 65, máximo 64 (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 210 | 1.4.10. idPeticion — longitud 65, máximo 64 (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 211 | 1.4.10. idPeticion — longitud 65, máximo 64 (400) | — | — | — | 400 | 400 | OK | OK | `{"codigoError":400,"mensajeError":"Error en la petición original"}` |
| 212 | 1.4.11. idPeticion — espacio interno (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 213 | 1.4.11. idPeticion — espacio interno (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 214 | 1.4.11. idPeticion — espacio interno (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 215 | 1.4.11. idPeticion — espacio interno (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 216 | 1.4.12. idPeticion — símbolo @ (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 217 | 1.4.12. idPeticion — símbolo @ (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 218 | 1.4.12. idPeticion — símbolo @ (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 219 | 1.4.12. idPeticion — símbolo @ (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 220 | 1.4.13. idPeticion — unicode interrogación apertura (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 221 | 1.4.13. idPeticion — unicode interrogación apertura (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 222 | 1.4.13. idPeticion — unicode interrogación apertura (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 223 | 1.4.13. idPeticion — unicode interrogación apertura (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 224 | 1.4.14. idPeticion — comillas (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 225 | 1.4.14. idPeticion — comillas (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 226 | 1.4.14. idPeticion — comillas (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 227 | 1.4.14. idPeticion — comillas (400) | — | — | — | 400 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 228 | 1.4.15. idPeticion — prefijo SWIFT ajeno (445) | — | — | — | 445 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 229 | 1.4.15. idPeticion — prefijo SWIFT ajeno (445) | — | — | — | 445 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 230 | 1.4.15. idPeticion — prefijo SWIFT ajeno (445) | — | — | — | 445 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 231 | 1.4.15. idPeticion — prefijo SWIFT ajeno (445) | — | — | — | 445 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 232 | 1.5.1. solicitudes — tipo string (425) | — | — | — | 425 | 425 | OK | ✗ | `{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}` |
| 233 | 1.5.1. solicitudes — tipo string (425) | — | — | — | 425 | 425 | OK | ✗ | `{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}` |
| 234 | 1.5.1. solicitudes — tipo string (425) | — | — | — | 425 | 425 | OK | ✗ | `{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}` |
| 235 | 1.5.1. solicitudes — tipo string (425) | — | — | — | 425 | 425 | OK | ✗ | `{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}` |
| 236 | 1.5.2. solicitudes — arreglo vacío (425) | — | — | — | 425 | 425 | OK | ✗ | `{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}` |
| 237 | 1.5.2. solicitudes — arreglo vacío (425) | — | — | — | 425 | 425 | OK | ✗ | `{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}` |
| 238 | 1.5.2. solicitudes — arreglo vacío (425) | — | — | — | 425 | 425 | OK | ✗ | `{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}` |
| 239 | 1.5.2. solicitudes — arreglo vacío (425) | — | — | — | 425 | 425 | OK | ✗ | `{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}` |
| 240 | 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425) | — | — | — | 425 | 425 | OK | ✗ | `{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}` |
| 241 | 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425) | — | — | — | 425 | 425 | OK | ✗ | `{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}` |
| 242 | 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425) | — | — | — | 425 | 425 | OK | ✗ | `{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}` |
| 243 | 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425) | — | — | — | 425 | 425 | OK | ✗ | `{"respuesta":{"codigoError":425,"mensajeError":"Cantidad de solicitudes no permitidas."}}` |
| 244 | 1.5.4. solicitudes — sin propiedad idSolicitud (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 245 | 1.5.4. solicitudes — sin propiedad idSolicitud (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 246 | 1.5.4. solicitudes — sin propiedad idSolicitud (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 247 | 1.5.4. solicitudes — sin propiedad idSolicitud (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 248 | 1.5.5. solicitudes — idSolicitud vacío (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 249 | 1.5.5. solicitudes — idSolicitud vacío (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 250 | 1.5.5. solicitudes — idSolicitud vacío (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 251 | 1.5.5. solicitudes — idSolicitud vacío (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 252 | 1.5.6. solicitudes — idSolicitud tipo number (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 253 | 1.5.6. solicitudes — idSolicitud tipo number (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 254 | 1.5.6. solicitudes — idSolicitud tipo number (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 255 | 1.5.6. solicitudes — idSolicitud tipo number (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 256 | 1.5.7. solicitudes — idSolicitud solo espacios (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 257 | 1.5.7. solicitudes — idSolicitud solo espacios (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 258 | 1.5.7. solicitudes — idSolicitud solo espacios (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 259 | 1.5.7. solicitudes — idSolicitud solo espacios (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 260 | 1.5.8. solicitudes — idSolicitud longitud 65 (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 261 | 1.5.8. solicitudes — idSolicitud longitud 65 (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 262 | 1.5.8. solicitudes — idSolicitud longitud 65 (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 263 | 1.5.8. solicitudes — idSolicitud longitud 65 (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 264 | 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2] | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 265 | 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2] | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 266 | 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2] | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 267 | 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2] | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 268 | 1.5.10. solicitudes — guion bajo (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 269 | 1.5.10. solicitudes — guion bajo (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 270 | 1.5.10. solicitudes — guion bajo (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 271 | 1.5.10. solicitudes — guion bajo (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 272 | 1.5.11. solicitudes — espacio interno (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 273 | 1.5.11. solicitudes — espacio interno (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 274 | 1.5.11. solicitudes — espacio interno (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 275 | 1.5.11. solicitudes — espacio interno (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 276 | 1.5.12. solicitudes — espacio al inicio (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 277 | 1.5.12. solicitudes — espacio al inicio (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 278 | 1.5.12. solicitudes — espacio al inicio (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 279 | 1.5.12. solicitudes — espacio al inicio (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 280 | 1.5.13. solicitudes — espacio al final (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 281 | 1.5.13. solicitudes — espacio al final (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 282 | 1.5.13. solicitudes — espacio al final (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 283 | 1.5.13. solicitudes — espacio al final (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 284 | 1.5.14. solicitudes — arroba (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 285 | 1.5.14. solicitudes — arroba (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 286 | 1.5.14. solicitudes — arroba (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 287 | 1.5.14. solicitudes — arroba (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 288 | 1.5.15. solicitudes — punto (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 289 | 1.5.15. solicitudes — punto (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 290 | 1.5.15. solicitudes — punto (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 291 | 1.5.15. solicitudes — punto (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 292 | 1.5.16. solicitudes — unicode (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 293 | 1.5.16. solicitudes — unicode (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 294 | 1.5.16. solicitudes — unicode (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 295 | 1.5.16. solicitudes — unicode (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 296 | 1.5.17. solicitudes — barra (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 297 | 1.5.17. solicitudes — barra (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 298 | 1.5.17. solicitudes — barra (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 299 | 1.5.17. solicitudes — barra (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 300 | 1.5.18. solicitudes — comillas (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 301 | 1.5.18. solicitudes — comillas (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 302 | 1.5.18. solicitudes — comillas (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 303 | 1.5.18. solicitudes — comillas (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 304 | 1.5.19. solicitudes — elemento null en arreglo (431) | — | — | — | 431 | 999 | ✗ | ✗ | `{"codigoError":999,"mensajeError":"Error en la solicitud"}` |
| 305 | 1.5.19. solicitudes — elemento null en arreglo (431) | — | — | — | 431 | 999 | ✗ | ✗ | `{"codigoError":999,"mensajeError":"Error en la solicitud"}` |
| 306 | 1.5.19. solicitudes — elemento null en arreglo (431) | — | — | — | 431 | 999 | ✗ | ✗ | `{"codigoError":999,"mensajeError":"Error en la solicitud"}` |
| 307 | 1.5.19. solicitudes — elemento null en arreglo (431) | — | — | — | 431 | 999 | ✗ | ✗ | `{"codigoError":999,"mensajeError":"Error en la solicitud"}` |
| 308 | 1.5.20. solicitudes — idSolicitud null (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 309 | 1.5.20. solicitudes — idSolicitud null (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 310 | 1.5.20. solicitudes — idSolicitud null (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 311 | 1.5.20. solicitudes — idSolicitud null (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 312 | 1.5.21. solicitudes — idSolicitud tipo boolean true (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 313 | 1.5.21. solicitudes — idSolicitud tipo boolean true (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 314 | 1.5.21. solicitudes — idSolicitud tipo boolean true (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 315 | 1.5.21. solicitudes — idSolicitud tipo boolean true (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 316 | 1.5.22. solicitudes — idSolicitud tipo boolean false (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 317 | 1.5.22. solicitudes — idSolicitud tipo boolean false (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 318 | 1.5.22. solicitudes — idSolicitud tipo boolean false (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 319 | 1.5.22. solicitudes — idSolicitud tipo boolean false (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 320 | 1.5.23. solicitudes — solo guiones (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 321 | 1.5.23. solicitudes — solo guiones (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 322 | 1.5.23. solicitudes — solo guiones (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 323 | 1.5.23. solicitudes — solo guiones (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 324 | 1.5.24. solicitudes — un solo guion (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 325 | 1.5.24. solicitudes — un solo guion (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 326 | 1.5.24. solicitudes — un solo guion (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 327 | 1.5.24. solicitudes — un solo guion (431) | — | — | — | 431 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 328 | 1.5.25. solicitudes — idSolicitud tipo object (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 329 | 1.5.25. solicitudes — idSolicitud tipo object (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 330 | 1.5.25. solicitudes — idSolicitud tipo object (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 331 | 1.5.25. solicitudes — idSolicitud tipo object (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 332 | 1.5.26. solicitudes — idSolicitud tipo array (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 333 | 1.5.26. solicitudes — idSolicitud tipo array (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 334 | 1.5.26. solicitudes — idSolicitud tipo array (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 335 | 1.5.26. solicitudes — idSolicitud tipo array (431) | — | — | — | 431 | 404 | ✗ | ✗ | `{"respuesta":{"codigoError":404,"mensajeError":"Campo idSolicitud no cumple con los criterios"}}` |
| 336 | 2.1.1. idCanal — no existe en BD (401) | — | — | — | 401 | 401 | OK | OK | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 337 | 2.1.1. idCanal — no existe en BD (401) | — | — | — | 401 | 401 | OK | OK | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 338 | 2.1.1. idCanal — no existe en BD (401) | — | — | — | 401 | 401 | OK | OK | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 339 | 2.1.1. idCanal — no existe en BD (401) | — | — | — | 401 | 401 | OK | OK | `{"codigoError":401,"mensajeError":"Canal emisor no existe"}` |
| 340 | 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN] | — | — | — | 403 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 341 | 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN] | — | — | — | 403 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 342 | 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN] | — | — | — | 403 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 343 | 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN] | — | — | — | 403 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 344 | 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO] | — | — | — | 500 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 345 | 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO] | — | — | — | 500 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 346 | 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO] | — | — | — | 500 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 347 | 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO] | — | — | — | 500 | 405 | ✗ | ✗ | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 348 | 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS] | — | — | — | 403 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 349 | 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS] | — | — | — | 403 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 350 | 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS] | — | — | — | 403 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 351 | 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS] | — | — | — | 403 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 352 | 2.3.1. peticion — cifrada con otra llave RSA (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 353 | 2.3.1. peticion — cifrada con otra llave RSA (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 354 | 2.3.1. peticion — cifrada con otra llave RSA (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 355 | 2.3.1. peticion — cifrada con otra llave RSA (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 356 | 2.3.2. peticion — clave AES-128 en RSA (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 357 | 2.3.2. peticion — clave AES-128 en RSA (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 358 | 2.3.2. peticion — clave AES-128 en RSA (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 359 | 2.3.2. peticion — clave AES-128 en RSA (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 360 | 2.3.3. peticion — RSA material no hex (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 361 | 2.3.3. peticion — RSA material no hex (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 362 | 2.3.3. peticion — RSA material no hex (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 363 | 2.3.3. peticion — RSA material no hex (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 364 | 2.3.4. peticion — hex corrupto (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 365 | 2.3.4. peticion — hex corrupto (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 366 | 2.3.4. peticion — hex corrupto (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 367 | 2.3.4. peticion — hex corrupto (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 368 | 2.3.5. peticion — cifrado truncado (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 369 | 2.3.5. peticion — cifrado truncado (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 370 | 2.3.5. peticion — cifrado truncado (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 371 | 2.3.5. peticion — cifrado truncado (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 372 | 2.3.6. peticion — tag GCM corrupto (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 373 | 2.3.6. peticion — tag GCM corrupto (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 374 | 2.3.6. peticion — tag GCM corrupto (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 375 | 2.3.6. peticion — tag GCM corrupto (405) | — | — | — | 405 | 405 | OK | OK | `{"codigoError":405,"mensajeError":"Error en descifrado canal emisor"}` |
| 376 | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) | — | — | — | 418 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 377 | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) | — | — | — | 418 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 378 | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) | — | — | — | 418 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 379 | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) | — | — | — | 418 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 380 | 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO] | — | — | — | 418 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 381 | 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO] | — | — | — | 418 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 382 | 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO] | — | — | — | 418 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 383 | 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO] | — | — | — | 418 | 509 | ✗ | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 384 | 0002.1.1.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 385 | 0002.1.1.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 386 | 0002.1.1.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 387 | 0002.1.1.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 388 | 0002.1.1.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 389 | 0002.1.1.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 390 | 0002.1.1.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 391 | 0002.1.1.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 392 | 0002.1.1.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 393 | 0002.1.1.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 394 | 0002.1.1.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 395 | 0002.1.1.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 396 | 0002.1.1.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 397 | 0002.1.1.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 398 | 0002.1.1.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 399 | 0002.1.1.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 400 | 0002.1.1.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 401 | 0002.1.1.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 402 | 0002.1.1.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 403 | 0002.1.1.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 404 | 0002.1.1.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 405 | 0002.1.1.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 406 | 0002.1.1.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 407 | 0002.1.1.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 408 | 0002.1.1.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 409 | 0002.1.1.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 410 | 0002.1.1.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 411 | 0002.1.1.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 412 | 0002.1.1.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 413 | 0002.1.1.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 414 | 0002.1.1.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 415 | 0002.1.1.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 416 | 0002.1.1.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 417 | 0002.1.1.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 418 | 0002.1.1.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 419 | 0002.1.1.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 420 | 0002.1.2.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 421 | 0002.1.2.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 422 | 0002.1.2.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 423 | 0002.1.2.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 424 | 0002.1.2.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 425 | 0002.1.2.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 426 | 0002.1.2.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 427 | 0002.1.2.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 428 | 0002.1.2.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 429 | 0002.1.2.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 430 | 0002.1.2.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 431 | 0002.1.2.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 432 | 0002.1.2.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 433 | 0002.1.2.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 434 | 0002.1.2.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 435 | 0002.1.2.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 436 | 0002.1.2.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 437 | 0002.1.2.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 438 | 0002.1.2.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 439 | 0002.1.2.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 440 | 0002.1.2.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 441 | 0002.1.2.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 442 | 0002.1.2.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 443 | 0002.1.2.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 444 | 0002.1.2.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 445 | 0002.1.2.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 446 | 0002.1.2.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 447 | 0002.1.2.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 448 | 0002.1.2.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 449 | 0002.1.2.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 450 | 0002.1.2.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 451 | 0002.1.2.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 452 | 0002.1.2.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 453 | 0002.1.2.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 454 | 0002.1.2.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 455 | 0002.1.2.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 456 | 0002.1.2.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 457 | 0002.1.2.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 458 | 0002.1.2.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 459 | 0002.1.2.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 460 | 0002.1.2.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 461 | 0002.1.2.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 462 | 0002.1.2.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 463 | 0002.1.2.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 464 | 0002.1.2.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 465 | 0002.1.2.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 466 | 0002.1.2.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 467 | 0002.1.2.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 468 | 0003.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 469 | 0003.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 470 | 0003.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 471 | 0003.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 472 | 0003.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 473 | 0003.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 474 | 0003.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 475 | 0003.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 476 | 0003.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 477 | 0003.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 478 | 0003.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 479 | 0003.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 480 | 0003.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 481 | 0003.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 482 | 0003.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 483 | 0003.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 484 | 0003.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 485 | 0003.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 486 | 0003.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 487 | 0003.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 488 | 0003.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 489 | 0003.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 490 | 0003.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 491 | 0003.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 492 | 0003.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 493 | 0003.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 494 | 0003.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 495 | 0003.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 496 | 0003.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 497 | 0003.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 498 | 0003.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 499 | 0003.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 500 | 0003.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 501 | 0003.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 502 | 0003.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 503 | 0003.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 504 | 0003.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 505 | 0003.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 506 | 0003.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 507 | 0003.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 508 | 0003.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 509 | 0003.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 510 | 0003.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 511 | 0003.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 512 | 0003.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 513 | 0003.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 514 | 0003.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 515 | 0003.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 516 | 0003.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 517 | 0003.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 518 | 0003.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 519 | 0003.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 520 | 0003.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 521 | 0003.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 522 | 0003.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 523 | 0003.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 524 | 0003.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 525 | 0003.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 526 | 0003.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 527 | 0003.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 528 | 0003.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 529 | 0003.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 530 | 0003.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 531 | 0003.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 532 | 0003.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 533 | 0003.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 534 | 0003.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 535 | 0003.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 536 | 0003.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 537 | 0003.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 538 | 0003.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 539 | 0003.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 540 | 0003.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 541 | 0003.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 542 | 0003.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 543 | 0003.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 544 | 0003.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 545 | 0003.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 546 | 0003.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 547 | 0003.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 548 | 0003.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 549 | 0003.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 550 | 0003.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 551 | 0003.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 552 | 0004.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 553 | 0004.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 554 | 0004.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 555 | 0004.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 556 | 0004.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 557 | 0004.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 558 | 0004.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 559 | 0004.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 560 | 0004.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 561 | 0004.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 562 | 0004.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 563 | 0004.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 564 | 0004.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 565 | 0004.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 566 | 0004.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 567 | 0004.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 568 | 0004.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 569 | 0004.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 570 | 0004.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 571 | 0004.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 572 | 0004.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 573 | 0004.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 574 | 0004.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 575 | 0004.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 576 | 0004.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 577 | 0004.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 578 | 0004.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 579 | 0004.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 580 | 0004.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 581 | 0004.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 582 | 0004.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 583 | 0004.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 584 | 0004.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 585 | 0004.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 586 | 0004.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 587 | 0004.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 588 | 0004.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 589 | 0004.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 590 | 0004.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 591 | 0004.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 592 | 0004.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 593 | 0004.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 594 | 0004.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 595 | 0004.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 596 | 0004.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 597 | 0004.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 598 | 0004.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 599 | 0004.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 600 | 0004.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 601 | 0004.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 602 | 0004.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 603 | 0004.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 604 | 0004.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 605 | 0004.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 606 | 0004.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 607 | 0004.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 608 | 0004.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 609 | 0004.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 610 | 0004.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 611 | 0004.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 612 | 0004.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 613 | 0004.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 614 | 0004.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 615 | 0004.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 616 | 0004.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 617 | 0004.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 618 | 0004.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 619 | 0004.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 620 | 0004.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 621 | 0004.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 622 | 0004.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 623 | 0004.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 624 | 0004.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 625 | 0004.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 626 | 0004.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 627 | 0004.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 628 | 0004.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 629 | 0004.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 630 | 0004.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 631 | 0004.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 632 | 0004.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 633 | 0004.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 634 | 0004.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 635 | 0004.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 636 | 0004.1.3.1. idPregunta — propiedad ausente (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 637 | 0004.1.3.1. idPregunta — propiedad ausente (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 638 | 0004.1.3.1. idPregunta — propiedad ausente (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 639 | 0004.1.3.1. idPregunta — propiedad ausente (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 640 | 0004.1.3.2. idPregunta — null (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 641 | 0004.1.3.2. idPregunta — null (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 642 | 0004.1.3.2. idPregunta — null (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 643 | 0004.1.3.2. idPregunta — null (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 644 | 0004.1.3.3. idPregunta — string vacío (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 645 | 0004.1.3.3. idPregunta — string vacío (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 646 | 0004.1.3.3. idPregunta — string vacío (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 647 | 0004.1.3.3. idPregunta — string vacío (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 648 | 0004.1.3.4. idPregunta — tipo number (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 649 | 0004.1.3.4. idPregunta — tipo number (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 650 | 0004.1.3.4. idPregunta — tipo number (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 651 | 0004.1.3.4. idPregunta — tipo number (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 652 | 0004.1.3.5. idPregunta — tipo boolean (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 653 | 0004.1.3.5. idPregunta — tipo boolean (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 654 | 0004.1.3.5. idPregunta — tipo boolean (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 655 | 0004.1.3.5. idPregunta — tipo boolean (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 656 | 0004.1.3.6. idPregunta — tipo object (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 657 | 0004.1.3.6. idPregunta — tipo object (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 658 | 0004.1.3.6. idPregunta — tipo object (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 659 | 0004.1.3.6. idPregunta — tipo object (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 660 | 0004.1.3.7. idPregunta — símbolo arroba (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 661 | 0004.1.3.7. idPregunta — símbolo arroba (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 662 | 0004.1.3.7. idPregunta — símbolo arroba (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 663 | 0004.1.3.7. idPregunta — símbolo arroba (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 664 | 0004.1.3.8. idPregunta — espacio interno (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 665 | 0004.1.3.8. idPregunta — espacio interno (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 666 | 0004.1.3.8. idPregunta — espacio interno (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 667 | 0004.1.3.8. idPregunta — espacio interno (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 668 | 0004.1.3.9. idPregunta — solo espacios (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 669 | 0004.1.3.9. idPregunta — solo espacios (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 670 | 0004.1.3.9. idPregunta — solo espacios (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 671 | 0004.1.3.9. idPregunta — solo espacios (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 672 | 0004.1.3.10. idPregunta — guion bajo (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 673 | 0004.1.3.10. idPregunta — guion bajo (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 674 | 0004.1.3.10. idPregunta — guion bajo (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 675 | 0004.1.3.10. idPregunta — guion bajo (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 676 | 0004.1.3.11. idPregunta — punto (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 677 | 0004.1.3.11. idPregunta — punto (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 678 | 0004.1.3.11. idPregunta — punto (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 679 | 0004.1.3.11. idPregunta — punto (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 680 | 0004.1.3.12. idPregunta — barra (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 681 | 0004.1.3.12. idPregunta — barra (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 682 | 0004.1.3.12. idPregunta — barra (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 683 | 0004.1.3.12. idPregunta — barra (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 684 | 0004.1.3.13. idPregunta — comillas (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 685 | 0004.1.3.13. idPregunta — comillas (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 686 | 0004.1.3.13. idPregunta — comillas (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 687 | 0004.1.3.13. idPregunta — comillas (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 688 | 0004.1.3.14. idPregunta — unicode (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 689 | 0004.1.3.14. idPregunta — unicode (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 690 | 0004.1.3.14. idPregunta — unicode (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 691 | 0004.1.3.14. idPregunta — unicode (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 692 | 0004.1.3.15. idPregunta — espacio al inicio (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 693 | 0004.1.3.15. idPregunta — espacio al inicio (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 694 | 0004.1.3.15. idPregunta — espacio al inicio (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 695 | 0004.1.3.15. idPregunta — espacio al inicio (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 696 | 0004.1.3.16. idPregunta — espacio al final (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 697 | 0004.1.3.16. idPregunta — espacio al final (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 698 | 0004.1.3.16. idPregunta — espacio al final (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 699 | 0004.1.3.16. idPregunta — espacio al final (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 700 | 0004.1.3.17. idPregunta — un solo dígito (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 701 | 0004.1.3.17. idPregunta — un solo dígito (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 702 | 0004.1.3.17. idPregunta — un solo dígito (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 703 | 0004.1.3.17. idPregunta — un solo dígito (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 704 | 0004.1.3.18. idPregunta — tres dígitos (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 705 | 0004.1.3.18. idPregunta — tres dígitos (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 706 | 0004.1.3.18. idPregunta — tres dígitos (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 707 | 0004.1.3.18. idPregunta — tres dígitos (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 708 | 0004.1.3.19. idPregunta — solo letras (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 709 | 0004.1.3.19. idPregunta — solo letras (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 710 | 0004.1.3.19. idPregunta — solo letras (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 711 | 0004.1.3.19. idPregunta — solo letras (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 712 | 0004.1.3.20. idPregunta — tipo array (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 713 | 0004.1.3.20. idPregunta — tipo array (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 714 | 0004.1.3.20. idPregunta — tipo array (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 715 | 0004.1.3.20. idPregunta — tipo array (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 716 | 0004.1.3.21. idPregunta — tipo boolean false (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 717 | 0004.1.3.21. idPregunta — tipo boolean false (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 718 | 0004.1.3.21. idPregunta — tipo boolean false (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 719 | 0004.1.3.21. idPregunta — tipo boolean false (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 720 | 0004.1.3.22. idPregunta — un solo guion (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 721 | 0004.1.3.22. idPregunta — un solo guion (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 722 | 0004.1.3.22. idPregunta — un solo guion (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 723 | 0004.1.3.22. idPregunta — un solo guion (428) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 724 | 0004.1.4.1. respuesta — propiedad ausente (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 725 | 0004.1.4.1. respuesta — propiedad ausente (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 726 | 0004.1.4.1. respuesta — propiedad ausente (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 727 | 0004.1.4.1. respuesta — propiedad ausente (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 728 | 0004.1.4.2. respuesta — null (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 729 | 0004.1.4.2. respuesta — null (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 730 | 0004.1.4.2. respuesta — null (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 731 | 0004.1.4.2. respuesta — null (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 732 | 0004.1.4.3. respuesta — string vacío (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 733 | 0004.1.4.3. respuesta — string vacío (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 734 | 0004.1.4.3. respuesta — string vacío (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 735 | 0004.1.4.3. respuesta — string vacío (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 736 | 0004.1.4.4. respuesta — tipo number (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 737 | 0004.1.4.4. respuesta — tipo number (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 738 | 0004.1.4.4. respuesta — tipo number (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 739 | 0004.1.4.4. respuesta — tipo number (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 740 | 0004.1.4.5. respuesta — tipo boolean (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 741 | 0004.1.4.5. respuesta — tipo boolean (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 742 | 0004.1.4.5. respuesta — tipo boolean (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 743 | 0004.1.4.5. respuesta — tipo boolean (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 744 | 0004.1.4.6. respuesta — tipo object (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 745 | 0004.1.4.6. respuesta — tipo object (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 746 | 0004.1.4.6. respuesta — tipo object (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 747 | 0004.1.4.6. respuesta — tipo object (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 748 | 0004.1.4.7. respuesta — símbolo arroba (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 749 | 0004.1.4.7. respuesta — símbolo arroba (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 750 | 0004.1.4.7. respuesta — símbolo arroba (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 751 | 0004.1.4.7. respuesta — símbolo arroba (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 752 | 0004.1.4.8. respuesta — espacio interno (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 753 | 0004.1.4.8. respuesta — espacio interno (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 754 | 0004.1.4.8. respuesta — espacio interno (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 755 | 0004.1.4.8. respuesta — espacio interno (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 756 | 0004.1.4.9. respuesta — solo espacios (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 757 | 0004.1.4.9. respuesta — solo espacios (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 758 | 0004.1.4.9. respuesta — solo espacios (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 759 | 0004.1.4.9. respuesta — solo espacios (429) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 760 | 0004.1.5.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 761 | 0004.1.5.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 762 | 0004.1.5.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 763 | 0004.1.5.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 764 | 0004.1.5.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 765 | 0004.1.5.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 766 | 0004.1.5.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 767 | 0004.1.5.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 768 | 0004.1.5.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 769 | 0004.1.5.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 770 | 0004.1.5.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 771 | 0004.1.5.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 772 | 0004.1.5.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 773 | 0004.1.5.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 774 | 0004.1.5.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 775 | 0004.1.5.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 776 | 0004.1.5.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 777 | 0004.1.5.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 778 | 0004.1.5.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 779 | 0004.1.5.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 780 | 0004.1.5.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 781 | 0004.1.5.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 782 | 0004.1.5.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 783 | 0004.1.5.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 784 | 0004.1.5.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 785 | 0004.1.5.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 786 | 0004.1.5.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 787 | 0004.1.5.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 788 | 0004.1.5.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 789 | 0004.1.5.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 790 | 0004.1.5.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 791 | 0004.1.5.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 792 | 0004.1.5.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 793 | 0004.1.5.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 794 | 0004.1.5.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 795 | 0004.1.5.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 796 | 0004.1.5.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 797 | 0004.1.5.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 798 | 0004.1.5.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 799 | 0004.1.5.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 800 | 0004.1.5.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 801 | 0004.1.5.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 802 | 0004.1.5.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 803 | 0004.1.5.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 804 | 0004.1.5.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 805 | 0004.1.5.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 806 | 0004.1.5.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 807 | 0004.1.5.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 808 | 0004.1.5.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 809 | 0004.1.5.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 810 | 0004.1.5.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 811 | 0004.1.5.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 812 | 0004.1.5.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 813 | 0004.1.5.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 814 | 0004.1.5.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 815 | 0004.1.5.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 816 | 0004.1.6.1. cuenta — propiedad ausente (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 817 | 0004.1.6.1. cuenta — propiedad ausente (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 818 | 0004.1.6.1. cuenta — propiedad ausente (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 819 | 0004.1.6.1. cuenta — propiedad ausente (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 820 | 0004.1.6.2. cuenta — null (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 821 | 0004.1.6.2. cuenta — null (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 822 | 0004.1.6.2. cuenta — null (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 823 | 0004.1.6.2. cuenta — null (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 824 | 0004.1.6.3. cuenta — string vacío (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 825 | 0004.1.6.3. cuenta — string vacío (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 826 | 0004.1.6.3. cuenta — string vacío (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 827 | 0004.1.6.3. cuenta — string vacío (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 828 | 0004.1.6.5. cuenta — tipo number (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 829 | 0004.1.6.5. cuenta — tipo number (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 830 | 0004.1.6.5. cuenta — tipo number (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 831 | 0004.1.6.5. cuenta — tipo number (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 832 | 0004.1.6.6. cuenta — tipo boolean (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 833 | 0004.1.6.6. cuenta — tipo boolean (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 834 | 0004.1.6.6. cuenta — tipo boolean (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 835 | 0004.1.6.6. cuenta — tipo boolean (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 836 | 0004.1.6.7. cuenta — tipo object (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 837 | 0004.1.6.7. cuenta — tipo object (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 838 | 0004.1.6.7. cuenta — tipo object (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 839 | 0004.1.6.7. cuenta — tipo object (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 840 | 0004.1.6.8. cuenta — no solo dígitos (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 841 | 0004.1.6.8. cuenta — no solo dígitos (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 842 | 0004.1.6.8. cuenta — no solo dígitos (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 843 | 0004.1.6.8. cuenta — no solo dígitos (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 844 | 0004.1.6.9. cuenta — longitud 35 (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 845 | 0004.1.6.9. cuenta — longitud 35 (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 846 | 0004.1.6.9. cuenta — longitud 35 (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 847 | 0004.1.6.9. cuenta — longitud 35 (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 848 | 0004.1.6.10. cuenta — espacio interno (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 849 | 0004.1.6.10. cuenta — espacio interno (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 850 | 0004.1.6.10. cuenta — espacio interno (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 851 | 0004.1.6.10. cuenta — espacio interno (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 852 | 0004.1.6.11. cuenta — guión (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 853 | 0004.1.6.11. cuenta — guión (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 854 | 0004.1.6.11. cuenta — guión (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 855 | 0004.1.6.11. cuenta — guión (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 856 | 0004.1.6.12. cuenta — espacio al inicio (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 857 | 0004.1.6.12. cuenta — espacio al inicio (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 858 | 0004.1.6.12. cuenta — espacio al inicio (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 859 | 0004.1.6.12. cuenta — espacio al inicio (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 860 | 0004.1.7.1. producto — propiedad ausente (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 861 | 0004.1.7.1. producto — propiedad ausente (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 862 | 0004.1.7.1. producto — propiedad ausente (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 863 | 0004.1.7.1. producto — propiedad ausente (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 864 | 0004.1.7.2. producto — null (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 865 | 0004.1.7.2. producto — null (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 866 | 0004.1.7.2. producto — null (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 867 | 0004.1.7.2. producto — null (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 868 | 0004.1.7.3. producto — string vacío (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 869 | 0004.1.7.3. producto — string vacío (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 870 | 0004.1.7.3. producto — string vacío (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 871 | 0004.1.7.3. producto — string vacío (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 872 | 0004.1.7.5. producto — tipo number (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 873 | 0004.1.7.5. producto — tipo number (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 874 | 0004.1.7.5. producto — tipo number (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 875 | 0004.1.7.5. producto — tipo number (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 876 | 0004.1.7.6. producto — tipo boolean (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 877 | 0004.1.7.6. producto — tipo boolean (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 878 | 0004.1.7.6. producto — tipo boolean (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 879 | 0004.1.7.6. producto — tipo boolean (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 880 | 0004.1.7.7. producto — tipo object (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 881 | 0004.1.7.7. producto — tipo object (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 882 | 0004.1.7.7. producto — tipo object (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 883 | 0004.1.7.7. producto — tipo object (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 884 | 0004.1.7.8. producto — valor inválido PACX (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 885 | 0004.1.7.8. producto — valor inválido PACX (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 886 | 0004.1.7.8. producto — valor inválido PACX (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 887 | 0004.1.7.8. producto — valor inválido PACX (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 888 | 0004.1.7.9. producto — valor minúsculas (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 889 | 0004.1.7.9. producto — valor minúsculas (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 890 | 0004.1.7.9. producto — valor minúsculas (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 891 | 0004.1.7.9. producto — valor minúsculas (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 892 | 0004.1.7.10. producto — espacio al final (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 893 | 0004.1.7.10. producto — espacio al final (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 894 | 0004.1.7.10. producto — espacio al final (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 895 | 0004.1.7.10. producto — espacio al final (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 896 | 0005.1.1.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 897 | 0005.1.1.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 898 | 0005.1.1.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 899 | 0005.1.1.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 900 | 0005.1.1.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 901 | 0005.1.1.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 902 | 0005.1.1.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 903 | 0005.1.1.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 904 | 0005.1.1.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 905 | 0005.1.1.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 906 | 0005.1.1.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 907 | 0005.1.1.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 908 | 0005.1.1.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 909 | 0005.1.1.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 910 | 0005.1.1.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 911 | 0005.1.1.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 912 | 0005.1.1.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 913 | 0005.1.1.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 914 | 0005.1.1.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 915 | 0005.1.1.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 916 | 0005.1.1.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 917 | 0005.1.1.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 918 | 0005.1.1.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 919 | 0005.1.1.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 920 | 0005.1.1.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 921 | 0005.1.1.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 922 | 0005.1.1.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 923 | 0005.1.1.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 924 | 0005.1.1.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 925 | 0005.1.1.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 926 | 0005.1.1.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 927 | 0005.1.1.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 928 | 0005.1.1.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 929 | 0005.1.1.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 930 | 0005.1.1.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 931 | 0005.1.1.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 932 | 0005.1.1.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 933 | 0005.1.1.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 934 | 0005.1.1.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 935 | 0005.1.1.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 936 | 0005.1.1.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 937 | 0005.1.1.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 938 | 0005.1.1.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 939 | 0005.1.1.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 940 | 0005.1.1.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 941 | 0005.1.1.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 942 | 0005.1.1.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 943 | 0005.1.1.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 944 | 0005.1.1.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 945 | 0005.1.1.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 946 | 0005.1.1.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 947 | 0005.1.1.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 948 | 0005.1.1.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 949 | 0005.1.1.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 950 | 0005.1.1.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 951 | 0005.1.1.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 952 | 0006.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 953 | 0006.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 954 | 0006.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 955 | 0006.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 956 | 0006.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 957 | 0006.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 958 | 0006.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 959 | 0006.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 960 | 0006.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 961 | 0006.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 962 | 0006.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 963 | 0006.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 964 | 0006.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 965 | 0006.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 966 | 0006.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 967 | 0006.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 968 | 0006.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 969 | 0006.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 970 | 0006.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 971 | 0006.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 972 | 0006.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 973 | 0006.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 974 | 0006.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 975 | 0006.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 976 | 0006.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 977 | 0006.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 978 | 0006.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 979 | 0006.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 980 | 0006.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 981 | 0006.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 982 | 0006.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 983 | 0006.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 984 | 0006.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 985 | 0006.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 986 | 0006.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 987 | 0006.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 988 | 0006.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 989 | 0006.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 990 | 0006.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 991 | 0006.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 992 | 0006.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 993 | 0006.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 994 | 0006.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 995 | 0006.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 996 | 0006.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 997 | 0006.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 998 | 0006.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 999 | 0006.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1000 | 0006.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1001 | 0006.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1002 | 0006.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1003 | 0006.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1004 | 0006.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1005 | 0006.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1006 | 0006.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1007 | 0006.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1008 | 0006.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1009 | 0006.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1010 | 0006.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1011 | 0006.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1012 | 0006.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1013 | 0006.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1014 | 0006.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1015 | 0006.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1016 | 0006.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1017 | 0006.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1018 | 0006.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1019 | 0006.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1020 | 0006.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1021 | 0006.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1022 | 0006.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1023 | 0006.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1024 | 0006.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1025 | 0006.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1026 | 0006.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1027 | 0006.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1028 | 0006.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1029 | 0006.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1030 | 0006.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1031 | 0006.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1032 | 0006.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1033 | 0006.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1034 | 0006.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1035 | 0006.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1036 | 0006.1.3.1. respuestas — propiedad ausente (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1037 | 0006.1.3.1. respuestas — propiedad ausente (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1038 | 0006.1.3.1. respuestas — propiedad ausente (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1039 | 0006.1.3.1. respuestas — propiedad ausente (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1040 | 0006.1.3.2. respuestas — null (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1041 | 0006.1.3.2. respuestas — null (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1042 | 0006.1.3.2. respuestas — null (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1043 | 0006.1.3.2. respuestas — null (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1044 | 0006.1.3.3. respuestas — tipo string (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1045 | 0006.1.3.3. respuestas — tipo string (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1046 | 0006.1.3.3. respuestas — tipo string (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1047 | 0006.1.3.3. respuestas — tipo string (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1048 | 0006.1.3.4. respuestas — tipo number (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1049 | 0006.1.3.4. respuestas — tipo number (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1050 | 0006.1.3.4. respuestas — tipo number (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1051 | 0006.1.3.4. respuestas — tipo number (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1052 | 0006.1.3.5. respuestas — arreglo vacío (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1053 | 0006.1.3.5. respuestas — arreglo vacío (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1054 | 0006.1.3.5. respuestas — arreglo vacío (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1055 | 0006.1.3.5. respuestas — arreglo vacío (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1056 | 0006.1.3.6. respuestas — un solo elemento (esperados 2) (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1057 | 0006.1.3.6. respuestas — un solo elemento (esperados 2) (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1058 | 0006.1.3.6. respuestas — un solo elemento (esperados 2) (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1059 | 0006.1.3.6. respuestas — un solo elemento (esperados 2) (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1060 | 0006.1.3.7. respuestas — tres elementos (esperados 2) (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1061 | 0006.1.3.7. respuestas — tres elementos (esperados 2) (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1062 | 0006.1.3.7. respuestas — tres elementos (esperados 2) (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1063 | 0006.1.3.7. respuestas — tres elementos (esperados 2) (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1064 | 0006.1.3.8. respuestas — elemento no objeto (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1065 | 0006.1.3.8. respuestas — elemento no objeto (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1066 | 0006.1.3.8. respuestas — elemento no objeto (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1067 | 0006.1.3.8. respuestas — elemento no objeto (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1068 | 0006.1.3.9. respuestas — item sin propiedad texto (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1069 | 0006.1.3.9. respuestas — item sin propiedad texto (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1070 | 0006.1.3.9. respuestas — item sin propiedad texto (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1071 | 0006.1.3.9. respuestas — item sin propiedad texto (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1072 | 0006.1.3.10. respuestas — item sin propiedad id (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1073 | 0006.1.3.10. respuestas — item sin propiedad id (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1074 | 0006.1.3.10. respuestas — item sin propiedad id (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1075 | 0006.1.3.10. respuestas — item sin propiedad id (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1076 | 0006.1.3.11. respuestas — id tipo number (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1077 | 0006.1.3.11. respuestas — id tipo number (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1078 | 0006.1.3.11. respuestas — id tipo number (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1079 | 0006.1.3.11. respuestas — id tipo number (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1080 | 0006.1.3.12. respuestas — texto tipo number (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1081 | 0006.1.3.12. respuestas — texto tipo number (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1082 | 0006.1.3.12. respuestas — texto tipo number (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1083 | 0006.1.3.12. respuestas — texto tipo number (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1084 | 0006.1.3.13. respuestas — id vacío (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1085 | 0006.1.3.13. respuestas — id vacío (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1086 | 0006.1.3.13. respuestas — id vacío (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1087 | 0006.1.3.13. respuestas — id vacío (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1088 | 0006.1.3.14. respuestas — texto vacío (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1089 | 0006.1.3.14. respuestas — texto vacío (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1090 | 0006.1.3.14. respuestas — texto vacío (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1091 | 0006.1.3.14. respuestas — texto vacío (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1092 | 0006.1.3.15. respuestas — id duplicado (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1093 | 0006.1.3.15. respuestas — id duplicado (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1094 | 0006.1.3.15. respuestas — id duplicado (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1095 | 0006.1.3.15. respuestas — id duplicado (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1096 | 0006.1.3.16. respuestas — propiedad extra en item (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1097 | 0006.1.3.16. respuestas — propiedad extra en item (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1098 | 0006.1.3.16. respuestas — propiedad extra en item (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1099 | 0006.1.3.16. respuestas — propiedad extra en item (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1100 | 0006.1.3.17. respuestas — id guion bajo (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1101 | 0006.1.3.17. respuestas — id guion bajo (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1102 | 0006.1.3.17. respuestas — id guion bajo (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1103 | 0006.1.3.17. respuestas — id guion bajo (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1104 | 0006.1.3.18. respuestas — id arroba (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1105 | 0006.1.3.18. respuestas — id arroba (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1106 | 0006.1.3.18. respuestas — id arroba (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1107 | 0006.1.3.18. respuestas — id arroba (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1108 | 0006.1.3.19. respuestas — id espacio interno (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1109 | 0006.1.3.19. respuestas — id espacio interno (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1110 | 0006.1.3.19. respuestas — id espacio interno (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1111 | 0006.1.3.19. respuestas — id espacio interno (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1112 | 0006.1.3.20. respuestas — id espacio al inicio (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1113 | 0006.1.3.20. respuestas — id espacio al inicio (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1114 | 0006.1.3.20. respuestas — id espacio al inicio (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1115 | 0006.1.3.20. respuestas — id espacio al inicio (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1116 | 0006.1.3.21. respuestas — id espacio al final (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1117 | 0006.1.3.21. respuestas — id espacio al final (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1118 | 0006.1.3.21. respuestas — id espacio al final (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1119 | 0006.1.3.21. respuestas — id espacio al final (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1120 | 0006.1.3.22. respuestas — id unicode (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1121 | 0006.1.3.22. respuestas — id unicode (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1122 | 0006.1.3.22. respuestas — id unicode (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1123 | 0006.1.3.22. respuestas — id unicode (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1124 | 0006.1.3.23. respuestas — id punto (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1125 | 0006.1.3.23. respuestas — id punto (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1126 | 0006.1.3.23. respuestas — id punto (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1127 | 0006.1.3.23. respuestas — id punto (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1128 | 0006.1.3.24. respuestas — id barra (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1129 | 0006.1.3.24. respuestas — id barra (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1130 | 0006.1.3.24. respuestas — id barra (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1131 | 0006.1.3.24. respuestas — id barra (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1132 | 0006.1.3.25. respuestas — id comillas (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1133 | 0006.1.3.25. respuestas — id comillas (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1134 | 0006.1.3.25. respuestas — id comillas (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1135 | 0006.1.3.25. respuestas — id comillas (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1136 | 0006.1.3.26. respuestas — id un solo dígito (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1137 | 0006.1.3.26. respuestas — id un solo dígito (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1138 | 0006.1.3.26. respuestas — id un solo dígito (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1139 | 0006.1.3.26. respuestas — id un solo dígito (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1140 | 0006.1.3.27. respuestas — id tres dígitos (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1141 | 0006.1.3.27. respuestas — id tres dígitos (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1142 | 0006.1.3.27. respuestas — id tres dígitos (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1143 | 0006.1.3.27. respuestas — id tres dígitos (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1144 | 0006.1.3.28. respuestas — id solo letras (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1145 | 0006.1.3.28. respuestas — id solo letras (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1146 | 0006.1.3.28. respuestas — id solo letras (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1147 | 0006.1.3.28. respuestas — id solo letras (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1148 | 0006.1.3.29. respuestas — id tipo boolean true (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1149 | 0006.1.3.29. respuestas — id tipo boolean true (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1150 | 0006.1.3.29. respuestas — id tipo boolean true (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1151 | 0006.1.3.29. respuestas — id tipo boolean true (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1152 | 0006.1.3.30. respuestas — id tipo boolean false (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1153 | 0006.1.3.30. respuestas — id tipo boolean false (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1154 | 0006.1.3.30. respuestas — id tipo boolean false (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1155 | 0006.1.3.30. respuestas — id tipo boolean false (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1156 | 0006.1.3.31. respuestas — id tipo object (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1157 | 0006.1.3.31. respuestas — id tipo object (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1158 | 0006.1.3.31. respuestas — id tipo object (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1159 | 0006.1.3.31. respuestas — id tipo object (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1160 | 0006.1.3.32. respuestas — id tipo array (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1161 | 0006.1.3.32. respuestas — id tipo array (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1162 | 0006.1.3.32. respuestas — id tipo array (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1163 | 0006.1.3.32. respuestas — id tipo array (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1164 | 0006.1.3.33. respuestas — elemento null en arreglo (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1165 | 0006.1.3.33. respuestas — elemento null en arreglo (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1166 | 0006.1.3.33. respuestas — elemento null en arreglo (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1167 | 0006.1.3.33. respuestas — elemento null en arreglo (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1168 | 0006.1.3.34. respuestas — texto solo espacios (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1169 | 0006.1.3.34. respuestas — texto solo espacios (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1170 | 0006.1.3.34. respuestas — texto solo espacios (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1171 | 0006.1.3.34. respuestas — texto solo espacios (455) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1172 | 0006.1.4.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1173 | 0006.1.4.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1174 | 0006.1.4.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1175 | 0006.1.4.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1176 | 0006.1.4.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1177 | 0006.1.4.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1178 | 0006.1.4.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1179 | 0006.1.4.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1180 | 0006.1.4.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1181 | 0006.1.4.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1182 | 0006.1.4.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1183 | 0006.1.4.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1184 | 0006.1.4.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1185 | 0006.1.4.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1186 | 0006.1.4.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1187 | 0006.1.4.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1188 | 0006.1.4.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1189 | 0006.1.4.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1190 | 0006.1.4.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1191 | 0006.1.4.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1192 | 0006.1.4.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1193 | 0006.1.4.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1194 | 0006.1.4.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1195 | 0006.1.4.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1196 | 0006.1.4.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1197 | 0006.1.4.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1198 | 0006.1.4.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1199 | 0006.1.4.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1200 | 0006.1.4.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1201 | 0006.1.4.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1202 | 0006.1.4.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1203 | 0006.1.4.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1204 | 0006.1.4.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1205 | 0006.1.4.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1206 | 0006.1.4.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1207 | 0006.1.4.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1208 | 0006.1.4.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1209 | 0006.1.4.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1210 | 0006.1.4.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1211 | 0006.1.4.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1212 | 0006.1.4.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1213 | 0006.1.4.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1214 | 0006.1.4.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1215 | 0006.1.4.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1216 | 0006.1.4.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1217 | 0006.1.4.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1218 | 0006.1.4.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1219 | 0006.1.4.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1220 | 0006.1.4.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1221 | 0006.1.4.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1222 | 0006.1.4.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1223 | 0006.1.4.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1224 | 0006.1.4.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1225 | 0006.1.4.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1226 | 0006.1.4.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1227 | 0006.1.4.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1228 | 0006.1.5.1. cuenta — propiedad ausente (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1229 | 0006.1.5.1. cuenta — propiedad ausente (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1230 | 0006.1.5.1. cuenta — propiedad ausente (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1231 | 0006.1.5.1. cuenta — propiedad ausente (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1232 | 0006.1.5.2. cuenta — null (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1233 | 0006.1.5.2. cuenta — null (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1234 | 0006.1.5.2. cuenta — null (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1235 | 0006.1.5.2. cuenta — null (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1236 | 0006.1.5.3. cuenta — string vacío (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1237 | 0006.1.5.3. cuenta — string vacío (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1238 | 0006.1.5.3. cuenta — string vacío (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1239 | 0006.1.5.3. cuenta — string vacío (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1240 | 0006.1.5.5. cuenta — tipo number (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1241 | 0006.1.5.5. cuenta — tipo number (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1242 | 0006.1.5.5. cuenta — tipo number (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1243 | 0006.1.5.5. cuenta — tipo number (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1244 | 0006.1.5.6. cuenta — tipo boolean (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1245 | 0006.1.5.6. cuenta — tipo boolean (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1246 | 0006.1.5.6. cuenta — tipo boolean (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1247 | 0006.1.5.6. cuenta — tipo boolean (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1248 | 0006.1.5.7. cuenta — tipo object (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1249 | 0006.1.5.7. cuenta — tipo object (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1250 | 0006.1.5.7. cuenta — tipo object (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1251 | 0006.1.5.7. cuenta — tipo object (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1252 | 0006.1.5.8. cuenta — no solo dígitos (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1253 | 0006.1.5.8. cuenta — no solo dígitos (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1254 | 0006.1.5.8. cuenta — no solo dígitos (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1255 | 0006.1.5.8. cuenta — no solo dígitos (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1256 | 0006.1.5.9. cuenta — longitud 35 (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1257 | 0006.1.5.9. cuenta — longitud 35 (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1258 | 0006.1.5.9. cuenta — longitud 35 (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1259 | 0006.1.5.9. cuenta — longitud 35 (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1260 | 0006.1.5.10. cuenta — espacio interno (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1261 | 0006.1.5.10. cuenta — espacio interno (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1262 | 0006.1.5.10. cuenta — espacio interno (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1263 | 0006.1.5.10. cuenta — espacio interno (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1264 | 0006.1.5.11. cuenta — guión (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1265 | 0006.1.5.11. cuenta — guión (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1266 | 0006.1.5.11. cuenta — guión (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1267 | 0006.1.5.11. cuenta — guión (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1268 | 0006.1.5.12. cuenta — espacio al inicio (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1269 | 0006.1.5.12. cuenta — espacio al inicio (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1270 | 0006.1.5.12. cuenta — espacio al inicio (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1271 | 0006.1.5.12. cuenta — espacio al inicio (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1272 | 0006.1.6.1. producto — propiedad ausente (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1273 | 0006.1.6.1. producto — propiedad ausente (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1274 | 0006.1.6.1. producto — propiedad ausente (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1275 | 0006.1.6.1. producto — propiedad ausente (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1276 | 0006.1.6.2. producto — null (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1277 | 0006.1.6.2. producto — null (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1278 | 0006.1.6.2. producto — null (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1279 | 0006.1.6.2. producto — null (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1280 | 0006.1.6.3. producto — string vacío (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1281 | 0006.1.6.3. producto — string vacío (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1282 | 0006.1.6.3. producto — string vacío (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1283 | 0006.1.6.3. producto — string vacío (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1284 | 0006.1.6.5. producto — tipo number (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1285 | 0006.1.6.5. producto — tipo number (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1286 | 0006.1.6.5. producto — tipo number (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1287 | 0006.1.6.5. producto — tipo number (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1288 | 0006.1.6.6. producto — tipo boolean (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1289 | 0006.1.6.6. producto — tipo boolean (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1290 | 0006.1.6.6. producto — tipo boolean (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1291 | 0006.1.6.6. producto — tipo boolean (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1292 | 0006.1.6.7. producto — tipo object (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1293 | 0006.1.6.7. producto — tipo object (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1294 | 0006.1.6.7. producto — tipo object (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1295 | 0006.1.6.7. producto — tipo object (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1296 | 0006.1.6.8. producto — valor inválido PACX (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1297 | 0006.1.6.8. producto — valor inválido PACX (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1298 | 0006.1.6.8. producto — valor inválido PACX (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1299 | 0006.1.6.8. producto — valor inválido PACX (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1300 | 0006.1.6.9. producto — valor minúsculas (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1301 | 0006.1.6.9. producto — valor minúsculas (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1302 | 0006.1.6.9. producto — valor minúsculas (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1303 | 0006.1.6.9. producto — valor minúsculas (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1304 | 0006.1.6.10. producto — espacio al final (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1305 | 0006.1.6.10. producto — espacio al final (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1306 | 0006.1.6.10. producto — espacio al final (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1307 | 0006.1.6.10. producto — espacio al final (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1308 | 0007.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1309 | 0007.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1310 | 0007.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1311 | 0007.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1312 | 0007.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1313 | 0007.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1314 | 0007.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1315 | 0007.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1316 | 0007.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1317 | 0007.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1318 | 0007.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1319 | 0007.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1320 | 0007.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1321 | 0007.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1322 | 0007.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1323 | 0007.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1324 | 0007.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1325 | 0007.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1326 | 0007.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1327 | 0007.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1328 | 0007.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1329 | 0007.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1330 | 0007.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1331 | 0007.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1332 | 0007.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1333 | 0007.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1334 | 0007.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1335 | 0007.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1336 | 0007.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1337 | 0007.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1338 | 0007.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1339 | 0007.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1340 | 0007.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1341 | 0007.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1342 | 0007.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1343 | 0007.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1344 | 0007.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1345 | 0007.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1346 | 0007.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1347 | 0007.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1348 | 0007.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1349 | 0007.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1350 | 0007.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1351 | 0007.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1352 | 0007.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1353 | 0007.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1354 | 0007.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1355 | 0007.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1356 | 0007.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1357 | 0007.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1358 | 0007.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1359 | 0007.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1360 | 0007.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1361 | 0007.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1362 | 0007.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1363 | 0007.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1364 | 0007.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1365 | 0007.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1366 | 0007.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1367 | 0007.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1368 | 0007.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1369 | 0007.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1370 | 0007.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1371 | 0007.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1372 | 0007.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1373 | 0007.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1374 | 0007.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1375 | 0007.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1376 | 0007.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1377 | 0007.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1378 | 0007.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1379 | 0007.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1380 | 0007.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1381 | 0007.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1382 | 0007.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1383 | 0007.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1384 | 0007.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1385 | 0007.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1386 | 0007.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1387 | 0007.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1388 | 0007.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1389 | 0007.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1390 | 0007.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1391 | 0007.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1392 | 0007.1.3.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1393 | 0007.1.3.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1394 | 0007.1.3.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1395 | 0007.1.3.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1396 | 0007.1.3.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1397 | 0007.1.3.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1398 | 0007.1.3.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1399 | 0007.1.3.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1400 | 0007.1.3.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1401 | 0007.1.3.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1402 | 0007.1.3.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1403 | 0007.1.3.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1404 | 0007.1.3.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1405 | 0007.1.3.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1406 | 0007.1.3.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1407 | 0007.1.3.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1408 | 0007.1.3.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1409 | 0007.1.3.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1410 | 0007.1.3.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1411 | 0007.1.3.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1412 | 0007.1.3.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1413 | 0007.1.3.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1414 | 0007.1.3.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1415 | 0007.1.3.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1416 | 0007.1.3.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1417 | 0007.1.3.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1418 | 0007.1.3.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1419 | 0007.1.3.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1420 | 0007.1.3.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1421 | 0007.1.3.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1422 | 0007.1.3.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1423 | 0007.1.3.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1424 | 0007.1.3.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1425 | 0007.1.3.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1426 | 0007.1.3.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1427 | 0007.1.3.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1428 | 0007.1.3.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1429 | 0007.1.3.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1430 | 0007.1.3.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1431 | 0007.1.3.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1432 | 0007.1.3.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1433 | 0007.1.3.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1434 | 0007.1.3.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1435 | 0007.1.3.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1436 | 0007.1.3.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1437 | 0007.1.3.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1438 | 0007.1.3.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1439 | 0007.1.3.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1440 | 0007.1.3.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1441 | 0007.1.3.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1442 | 0007.1.3.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1443 | 0007.1.3.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1444 | 0007.1.3.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1445 | 0007.1.3.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1446 | 0007.1.3.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1447 | 0007.1.3.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1448 | 0007.1.4.1. tipoBaja — propiedad ausente (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1449 | 0007.1.4.1. tipoBaja — propiedad ausente (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1450 | 0007.1.4.1. tipoBaja — propiedad ausente (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1451 | 0007.1.4.1. tipoBaja — propiedad ausente (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1452 | 0007.1.4.2. tipoBaja — null (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1453 | 0007.1.4.2. tipoBaja — null (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1454 | 0007.1.4.2. tipoBaja — null (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1455 | 0007.1.4.2. tipoBaja — null (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1456 | 0007.1.4.3. tipoBaja — string vacío (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1457 | 0007.1.4.3. tipoBaja — string vacío (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1458 | 0007.1.4.3. tipoBaja — string vacío (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1459 | 0007.1.4.3. tipoBaja — string vacío (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1460 | 0007.1.4.4. tipoBaja — solo espacios (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1461 | 0007.1.4.4. tipoBaja — solo espacios (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1462 | 0007.1.4.4. tipoBaja — solo espacios (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1463 | 0007.1.4.4. tipoBaja — solo espacios (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1464 | 0007.1.4.5. tipoBaja — tipo number (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1465 | 0007.1.4.5. tipoBaja — tipo number (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1466 | 0007.1.4.5. tipoBaja — tipo number (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1467 | 0007.1.4.5. tipoBaja — tipo number (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1468 | 0007.1.4.6. tipoBaja — tipo boolean (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1469 | 0007.1.4.6. tipoBaja — tipo boolean (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1470 | 0007.1.4.6. tipoBaja — tipo boolean (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1471 | 0007.1.4.6. tipoBaja — tipo boolean (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1472 | 0007.1.4.7. tipoBaja — tipo object (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1473 | 0007.1.4.7. tipoBaja — tipo object (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1474 | 0007.1.4.7. tipoBaja — tipo object (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1475 | 0007.1.4.7. tipoBaja — tipo object (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1476 | 0007.1.4.8. tipoBaja — valor COMPLETA (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1477 | 0007.1.4.8. tipoBaja — valor COMPLETA (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1478 | 0007.1.4.8. tipoBaja — valor COMPLETA (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1479 | 0007.1.4.8. tipoBaja — valor COMPLETA (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1480 | 0007.1.4.9. tipoBaja — valor no soportado (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1481 | 0007.1.4.9. tipoBaja — valor no soportado (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1482 | 0007.1.4.9. tipoBaja — valor no soportado (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1483 | 0007.1.4.9. tipoBaja — valor no soportado (426) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1484 | 0008.1.1.1. id — propiedad ausente (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1485 | 0008.1.1.1. id — propiedad ausente (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1486 | 0008.1.1.1. id — propiedad ausente (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1487 | 0008.1.1.1. id — propiedad ausente (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1488 | 0008.1.1.2. id — null (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1489 | 0008.1.1.2. id — null (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1490 | 0008.1.1.2. id — null (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1491 | 0008.1.1.2. id — null (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1492 | 0008.1.1.3. id — string vacío (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1493 | 0008.1.1.3. id — string vacío (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1494 | 0008.1.1.3. id — string vacío (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1495 | 0008.1.1.3. id — string vacío (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1496 | 0008.1.1.4. id — solo espacios (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1497 | 0008.1.1.4. id — solo espacios (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1498 | 0008.1.1.4. id — solo espacios (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1499 | 0008.1.1.4. id — solo espacios (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1500 | 0008.1.1.5. id — tipo number (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1501 | 0008.1.1.5. id — tipo number (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1502 | 0008.1.1.5. id — tipo number (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1503 | 0008.1.1.5. id — tipo number (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1504 | 0008.1.1.6. id — tipo boolean (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1505 | 0008.1.1.6. id — tipo boolean (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1506 | 0008.1.1.6. id — tipo boolean (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1507 | 0008.1.1.6. id — tipo boolean (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1508 | 0008.1.1.7. id — tipo object (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1509 | 0008.1.1.7. id — tipo object (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1510 | 0008.1.1.7. id — tipo object (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1511 | 0008.1.1.7. id — tipo object (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1512 | 0008.1.1.8. id — longitud incorrecta (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1513 | 0008.1.1.8. id — longitud incorrecta (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1514 | 0008.1.1.8. id — longitud incorrecta (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1515 | 0008.1.1.8. id — longitud incorrecta (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1516 | 0008.1.1.9. id — formato no UUID (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1517 | 0008.1.1.9. id — formato no UUID (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1518 | 0008.1.1.9. id — formato no UUID (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1519 | 0008.1.1.9. id — formato no UUID (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1520 | 0008.1.1.10. id — sin guiones (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1521 | 0008.1.1.10. id — sin guiones (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1522 | 0008.1.1.10. id — sin guiones (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1523 | 0008.1.1.10. id — sin guiones (444) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1524 | 0008.1.2.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1525 | 0008.1.2.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1526 | 0008.1.2.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1527 | 0008.1.2.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1528 | 0008.1.2.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1529 | 0008.1.2.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1530 | 0008.1.2.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1531 | 0008.1.2.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1532 | 0008.1.2.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1533 | 0008.1.2.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1534 | 0008.1.2.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1535 | 0008.1.2.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1536 | 0008.1.2.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1537 | 0008.1.2.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1538 | 0008.1.2.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1539 | 0008.1.2.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1540 | 0008.1.2.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1541 | 0008.1.2.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1542 | 0008.1.2.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1543 | 0008.1.2.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1544 | 0008.1.2.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1545 | 0008.1.2.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1546 | 0008.1.2.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1547 | 0008.1.2.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1548 | 0008.1.2.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1549 | 0008.1.2.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1550 | 0008.1.2.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1551 | 0008.1.2.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1552 | 0008.1.2.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1553 | 0008.1.2.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1554 | 0008.1.2.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1555 | 0008.1.2.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1556 | 0008.1.2.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1557 | 0008.1.2.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1558 | 0008.1.2.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1559 | 0008.1.2.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1560 | 0008.1.2.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1561 | 0008.1.2.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1562 | 0008.1.2.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1563 | 0008.1.2.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1564 | 0008.1.2.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1565 | 0008.1.2.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1566 | 0008.1.2.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1567 | 0008.1.2.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1568 | 0008.1.2.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1569 | 0008.1.2.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1570 | 0008.1.2.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1571 | 0008.1.2.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1572 | 0008.1.3.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1573 | 0008.1.3.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1574 | 0008.1.3.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1575 | 0008.1.3.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1576 | 0008.1.3.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1577 | 0008.1.3.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1578 | 0008.1.3.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1579 | 0008.1.3.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1580 | 0008.1.3.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1581 | 0008.1.3.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1582 | 0008.1.3.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1583 | 0008.1.3.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1584 | 0008.1.3.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1585 | 0008.1.3.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1586 | 0008.1.3.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1587 | 0008.1.3.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1588 | 0008.1.3.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1589 | 0008.1.3.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1590 | 0008.1.3.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1591 | 0008.1.3.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1592 | 0008.1.3.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1593 | 0008.1.3.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1594 | 0008.1.3.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1595 | 0008.1.3.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1596 | 0008.1.3.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1597 | 0008.1.3.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1598 | 0008.1.3.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1599 | 0008.1.3.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1600 | 0008.1.3.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1601 | 0008.1.3.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1602 | 0008.1.3.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1603 | 0008.1.3.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1604 | 0008.1.3.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1605 | 0008.1.3.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1606 | 0008.1.3.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1607 | 0008.1.3.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1608 | 0008.1.4.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1609 | 0008.1.4.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1610 | 0008.1.4.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1611 | 0008.1.4.1. banco — propiedad ausente (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1612 | 0008.1.4.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1613 | 0008.1.4.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1614 | 0008.1.4.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1615 | 0008.1.4.2. banco — null (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1616 | 0008.1.4.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1617 | 0008.1.4.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1618 | 0008.1.4.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1619 | 0008.1.4.3. banco — string vacío (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1620 | 0008.1.4.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1621 | 0008.1.4.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1622 | 0008.1.4.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1623 | 0008.1.4.4. banco — tipo number (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1624 | 0008.1.4.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1625 | 0008.1.4.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1626 | 0008.1.4.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1627 | 0008.1.4.5. banco — tipo boolean (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1628 | 0008.1.4.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1629 | 0008.1.4.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1630 | 0008.1.4.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1631 | 0008.1.4.6. banco — tipo object (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1632 | 0008.1.4.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1633 | 0008.1.4.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1634 | 0008.1.4.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1635 | 0008.1.4.7. banco — longitud 3 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1636 | 0008.1.4.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1637 | 0008.1.4.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1638 | 0008.1.4.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1639 | 0008.1.4.8. banco — longitud 13 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1640 | 0008.1.4.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1641 | 0008.1.4.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1642 | 0008.1.4.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1643 | 0008.1.4.9. banco — longitud 7 (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1644 | 0008.1.4.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1645 | 0008.1.4.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1646 | 0008.1.4.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1647 | 0008.1.4.10. banco — solo espacios (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1648 | 0008.1.4.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1649 | 0008.1.4.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1650 | 0008.1.4.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1651 | 0008.1.4.11. banco — símbolo arroba (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1652 | 0008.1.4.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1653 | 0008.1.4.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1654 | 0008.1.4.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1655 | 0008.1.4.12. banco — espacio interno (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1656 | 0008.1.4.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1657 | 0008.1.4.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1658 | 0008.1.4.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1659 | 0008.1.4.13. banco — paréntesis (414) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1660 | 0008.1.4.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1661 | 0008.1.4.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1662 | 0008.1.4.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1663 | 0008.1.4.14. banco — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1664 | 0008.1.5.1. cuenta — propiedad ausente (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1665 | 0008.1.5.1. cuenta — propiedad ausente (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1666 | 0008.1.5.1. cuenta — propiedad ausente (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1667 | 0008.1.5.1. cuenta — propiedad ausente (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1668 | 0008.1.5.2. cuenta — null (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1669 | 0008.1.5.2. cuenta — null (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1670 | 0008.1.5.2. cuenta — null (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1671 | 0008.1.5.2. cuenta — null (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1672 | 0008.1.5.3. cuenta — string vacío (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1673 | 0008.1.5.3. cuenta — string vacío (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1674 | 0008.1.5.3. cuenta — string vacío (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1675 | 0008.1.5.3. cuenta — string vacío (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1676 | 0008.1.5.5. cuenta — tipo number (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1677 | 0008.1.5.5. cuenta — tipo number (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1678 | 0008.1.5.5. cuenta — tipo number (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1679 | 0008.1.5.5. cuenta — tipo number (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1680 | 0008.1.5.6. cuenta — tipo boolean (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1681 | 0008.1.5.6. cuenta — tipo boolean (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1682 | 0008.1.5.6. cuenta — tipo boolean (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1683 | 0008.1.5.6. cuenta — tipo boolean (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1684 | 0008.1.5.7. cuenta — tipo object (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1685 | 0008.1.5.7. cuenta — tipo object (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1686 | 0008.1.5.7. cuenta — tipo object (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1687 | 0008.1.5.7. cuenta — tipo object (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1688 | 0008.1.5.8. cuenta — no solo dígitos (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1689 | 0008.1.5.8. cuenta — no solo dígitos (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1690 | 0008.1.5.8. cuenta — no solo dígitos (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1691 | 0008.1.5.8. cuenta — no solo dígitos (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1692 | 0008.1.5.9. cuenta — longitud 35 (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1693 | 0008.1.5.9. cuenta — longitud 35 (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1694 | 0008.1.5.9. cuenta — longitud 35 (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1695 | 0008.1.5.9. cuenta — longitud 35 (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1696 | 0008.1.5.10. cuenta — espacio interno (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1697 | 0008.1.5.10. cuenta — espacio interno (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1698 | 0008.1.5.10. cuenta — espacio interno (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1699 | 0008.1.5.10. cuenta — espacio interno (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1700 | 0008.1.5.11. cuenta — guión (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1701 | 0008.1.5.11. cuenta — guión (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1702 | 0008.1.5.11. cuenta — guión (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1703 | 0008.1.5.11. cuenta — guión (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1704 | 0008.1.5.12. cuenta — espacio al inicio (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1705 | 0008.1.5.12. cuenta — espacio al inicio (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1706 | 0008.1.5.12. cuenta — espacio al inicio (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1707 | 0008.1.5.12. cuenta — espacio al inicio (413) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1708 | 0008.1.6.1. producto — propiedad ausente (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1709 | 0008.1.6.1. producto — propiedad ausente (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1710 | 0008.1.6.1. producto — propiedad ausente (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1711 | 0008.1.6.1. producto — propiedad ausente (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1712 | 0008.1.6.2. producto — null (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1713 | 0008.1.6.2. producto — null (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1714 | 0008.1.6.2. producto — null (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1715 | 0008.1.6.2. producto — null (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1716 | 0008.1.6.3. producto — string vacío (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1717 | 0008.1.6.3. producto — string vacío (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1718 | 0008.1.6.3. producto — string vacío (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1719 | 0008.1.6.3. producto — string vacío (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1720 | 0008.1.6.5. producto — tipo number (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1721 | 0008.1.6.5. producto — tipo number (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1722 | 0008.1.6.5. producto — tipo number (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1723 | 0008.1.6.5. producto — tipo number (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1724 | 0008.1.6.6. producto — tipo boolean (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1725 | 0008.1.6.6. producto — tipo boolean (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1726 | 0008.1.6.6. producto — tipo boolean (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1727 | 0008.1.6.6. producto — tipo boolean (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1728 | 0008.1.6.7. producto — tipo object (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1729 | 0008.1.6.7. producto — tipo object (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1730 | 0008.1.6.7. producto — tipo object (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1731 | 0008.1.6.7. producto — tipo object (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1732 | 0008.1.6.8. producto — valor inválido PACX (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1733 | 0008.1.6.8. producto — valor inválido PACX (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1734 | 0008.1.6.8. producto — valor inválido PACX (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1735 | 0008.1.6.8. producto — valor inválido PACX (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1736 | 0008.1.6.9. producto — valor minúsculas (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1737 | 0008.1.6.9. producto — valor minúsculas (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1738 | 0008.1.6.9. producto — valor minúsculas (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1739 | 0008.1.6.9. producto — valor minúsculas (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1740 | 0008.1.6.10. producto — espacio al final (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1741 | 0008.1.6.10. producto — espacio al final (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1742 | 0008.1.6.10. producto — espacio al final (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1743 | 0008.1.6.10. producto — espacio al final (421) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1744 | 0009.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1745 | 0009.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1746 | 0009.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1747 | 0009.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1748 | 0009.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1749 | 0009.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1750 | 0009.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1751 | 0009.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1752 | 0009.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1753 | 0009.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1754 | 0009.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1755 | 0009.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1756 | 0009.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1757 | 0009.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1758 | 0009.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1759 | 0009.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1760 | 0009.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1761 | 0009.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1762 | 0009.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1763 | 0009.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1764 | 0009.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1765 | 0009.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1766 | 0009.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1767 | 0009.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1768 | 0009.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1769 | 0009.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1770 | 0009.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1771 | 0009.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1772 | 0009.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1773 | 0009.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1774 | 0009.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1775 | 0009.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1776 | 0009.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1777 | 0009.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1778 | 0009.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1779 | 0009.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1780 | 0009.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1781 | 0009.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1782 | 0009.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1783 | 0009.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1784 | 0009.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1785 | 0009.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1786 | 0009.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1787 | 0009.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1788 | 0009.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1789 | 0009.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1790 | 0009.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1791 | 0009.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1792 | 0009.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1793 | 0009.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1794 | 0009.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1795 | 0009.1.2.1. tipoIdentificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1796 | 0009.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1797 | 0009.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1798 | 0009.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1799 | 0009.1.2.2. tipoIdentificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1800 | 0009.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1801 | 0009.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1802 | 0009.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1803 | 0009.1.2.3. tipoIdentificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1804 | 0009.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1805 | 0009.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1806 | 0009.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1807 | 0009.1.2.4. tipoIdentificador — tipo number (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1808 | 0009.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1809 | 0009.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1810 | 0009.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1811 | 0009.1.2.5. tipoIdentificador — tipo boolean (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1812 | 0009.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1813 | 0009.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1814 | 0009.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1815 | 0009.1.2.6. tipoIdentificador — tipo object (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1816 | 0009.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1817 | 0009.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1818 | 0009.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1819 | 0009.1.2.7. tipoIdentificador — valor incorrecto COMERCIO (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1820 | 0009.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1821 | 0009.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1822 | 0009.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1823 | 0009.1.2.8. tipoIdentificador — valor minúsculas (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1824 | 0009.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1825 | 0009.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1826 | 0009.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1827 | 0009.1.2.9. tipoIdentificador — solo espacios (410) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1828 | 0022.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1829 | 0022.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1830 | 0022.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1831 | 0022.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1832 | 0022.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1833 | 0022.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1834 | 0022.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1835 | 0022.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1836 | 0022.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1837 | 0022.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1838 | 0022.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1839 | 0022.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1840 | 0022.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1841 | 0022.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1842 | 0022.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1843 | 0022.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1844 | 0022.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1845 | 0022.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1846 | 0022.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1847 | 0022.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1848 | 0022.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1849 | 0022.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1850 | 0022.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1851 | 0022.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1852 | 0022.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1853 | 0022.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1854 | 0022.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1855 | 0022.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1856 | 0022.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1857 | 0022.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1858 | 0022.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1859 | 0022.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1860 | 0022.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1861 | 0022.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1862 | 0022.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1863 | 0022.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1864 | 0022.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1865 | 0022.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1866 | 0022.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1867 | 0022.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1868 | 0022.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1869 | 0022.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1870 | 0022.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1871 | 0022.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1872 | 0022.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1873 | 0022.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1874 | 0022.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1875 | 0022.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1876 | 0022.1.2.1. nombreAcreedor — propiedad ausente (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1877 | 0022.1.2.1. nombreAcreedor — propiedad ausente (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1878 | 0022.1.2.1. nombreAcreedor — propiedad ausente (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1879 | 0022.1.2.1. nombreAcreedor — propiedad ausente (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1880 | 0022.1.2.2. nombreAcreedor — null (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1881 | 0022.1.2.2. nombreAcreedor — null (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1882 | 0022.1.2.2. nombreAcreedor — null (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1883 | 0022.1.2.2. nombreAcreedor — null (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1884 | 0022.1.2.3. nombreAcreedor — string vacío (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1885 | 0022.1.2.3. nombreAcreedor — string vacío (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1886 | 0022.1.2.3. nombreAcreedor — string vacío (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1887 | 0022.1.2.3. nombreAcreedor — string vacío (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1888 | 0022.1.2.4. nombreAcreedor — tipo number (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1889 | 0022.1.2.4. nombreAcreedor — tipo number (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1890 | 0022.1.2.4. nombreAcreedor — tipo number (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1891 | 0022.1.2.4. nombreAcreedor — tipo number (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1892 | 0022.1.2.5. nombreAcreedor — tipo boolean (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1893 | 0022.1.2.5. nombreAcreedor — tipo boolean (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1894 | 0022.1.2.5. nombreAcreedor — tipo boolean (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1895 | 0022.1.2.5. nombreAcreedor — tipo boolean (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1896 | 0022.1.2.6. nombreAcreedor — longitud 81 (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1897 | 0022.1.2.6. nombreAcreedor — longitud 81 (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1898 | 0022.1.2.6. nombreAcreedor — longitud 81 (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1899 | 0022.1.2.6. nombreAcreedor — longitud 81 (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1900 | 0022.1.2.7. nombreAcreedor — caracteres no permitidos (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1901 | 0022.1.2.7. nombreAcreedor — caracteres no permitidos (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1902 | 0022.1.2.7. nombreAcreedor — caracteres no permitidos (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1903 | 0022.1.2.7. nombreAcreedor — caracteres no permitidos (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1904 | 0022.1.2.8. nombreAcreedor — símbolo arroba (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1905 | 0022.1.2.8. nombreAcreedor — símbolo arroba (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1906 | 0022.1.2.8. nombreAcreedor — símbolo arroba (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1907 | 0022.1.2.8. nombreAcreedor — símbolo arroba (436) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1908 | 0022.1.3.1. bancoAcreedor — propiedad ausente (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1909 | 0022.1.3.1. bancoAcreedor — propiedad ausente (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1910 | 0022.1.3.1. bancoAcreedor — propiedad ausente (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1911 | 0022.1.3.1. bancoAcreedor — propiedad ausente (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1912 | 0022.1.3.2. bancoAcreedor — null (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1913 | 0022.1.3.2. bancoAcreedor — null (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1914 | 0022.1.3.2. bancoAcreedor — null (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1915 | 0022.1.3.2. bancoAcreedor — null (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1916 | 0022.1.3.3. bancoAcreedor — string vacío (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1917 | 0022.1.3.3. bancoAcreedor — string vacío (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1918 | 0022.1.3.3. bancoAcreedor — string vacío (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1919 | 0022.1.3.3. bancoAcreedor — string vacío (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1920 | 0022.1.3.4. bancoAcreedor — tipo number (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1921 | 0022.1.3.4. bancoAcreedor — tipo number (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1922 | 0022.1.3.4. bancoAcreedor — tipo number (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1923 | 0022.1.3.4. bancoAcreedor — tipo number (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1924 | 0022.1.3.5. bancoAcreedor — tipo boolean (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1925 | 0022.1.3.5. bancoAcreedor — tipo boolean (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1926 | 0022.1.3.5. bancoAcreedor — tipo boolean (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1927 | 0022.1.3.5. bancoAcreedor — tipo boolean (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1928 | 0022.1.3.6. bancoAcreedor — tipo object (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1929 | 0022.1.3.6. bancoAcreedor — tipo object (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1930 | 0022.1.3.6. bancoAcreedor — tipo object (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1931 | 0022.1.3.6. bancoAcreedor — tipo object (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1932 | 0022.1.3.7. bancoAcreedor — longitud 3 (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1933 | 0022.1.3.7. bancoAcreedor — longitud 3 (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1934 | 0022.1.3.7. bancoAcreedor — longitud 3 (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1935 | 0022.1.3.7. bancoAcreedor — longitud 3 (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1936 | 0022.1.3.8. bancoAcreedor — longitud 13 (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1937 | 0022.1.3.8. bancoAcreedor — longitud 13 (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1938 | 0022.1.3.8. bancoAcreedor — longitud 13 (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1939 | 0022.1.3.8. bancoAcreedor — longitud 13 (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1940 | 0022.1.3.9. bancoAcreedor — longitud 7 (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1941 | 0022.1.3.9. bancoAcreedor — longitud 7 (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1942 | 0022.1.3.9. bancoAcreedor — longitud 7 (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1943 | 0022.1.3.9. bancoAcreedor — longitud 7 (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1944 | 0022.1.3.10. bancoAcreedor — solo espacios (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1945 | 0022.1.3.10. bancoAcreedor — solo espacios (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1946 | 0022.1.3.10. bancoAcreedor — solo espacios (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1947 | 0022.1.3.10. bancoAcreedor — solo espacios (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1948 | 0022.1.3.11. bancoAcreedor — símbolo arroba (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1949 | 0022.1.3.11. bancoAcreedor — símbolo arroba (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1950 | 0022.1.3.11. bancoAcreedor — símbolo arroba (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1951 | 0022.1.3.11. bancoAcreedor — símbolo arroba (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1952 | 0022.1.3.12. bancoAcreedor — espacio interno (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1953 | 0022.1.3.12. bancoAcreedor — espacio interno (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1954 | 0022.1.3.12. bancoAcreedor — espacio interno (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1955 | 0022.1.3.12. bancoAcreedor — espacio interno (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1956 | 0022.1.3.13. bancoAcreedor — paréntesis (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1957 | 0022.1.3.13. bancoAcreedor — paréntesis (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1958 | 0022.1.3.13. bancoAcreedor — paréntesis (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1959 | 0022.1.3.13. bancoAcreedor — paréntesis (435) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1960 | 0022.1.3.14. bancoAcreedor — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1961 | 0022.1.3.14. bancoAcreedor — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1962 | 0022.1.3.14. bancoAcreedor — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1963 | 0022.1.3.14. bancoAcreedor — SWIFT no coincide con emisor (412) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1964 | 0022.1.4.1. moneda — propiedad ausente (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1965 | 0022.1.4.1. moneda — propiedad ausente (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1966 | 0022.1.4.1. moneda — propiedad ausente (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1967 | 0022.1.4.1. moneda — propiedad ausente (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1968 | 0022.1.4.2. moneda — null (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1969 | 0022.1.4.2. moneda — null (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1970 | 0022.1.4.2. moneda — null (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1971 | 0022.1.4.2. moneda — null (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1972 | 0022.1.4.3. moneda — string vacío (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1973 | 0022.1.4.3. moneda — string vacío (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1974 | 0022.1.4.3. moneda — string vacío (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1975 | 0022.1.4.3. moneda — string vacío (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1976 | 0022.1.4.4. moneda — tipo number (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1977 | 0022.1.4.4. moneda — tipo number (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1978 | 0022.1.4.4. moneda — tipo number (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1979 | 0022.1.4.4. moneda — tipo number (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1980 | 0022.1.4.5. moneda — tipo boolean (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1981 | 0022.1.4.5. moneda — tipo boolean (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1982 | 0022.1.4.5. moneda — tipo boolean (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1983 | 0022.1.4.5. moneda — tipo boolean (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1984 | 0022.1.4.6. moneda — valor incorrecto (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1985 | 0022.1.4.6. moneda — valor incorrecto (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1986 | 0022.1.4.6. moneda — valor incorrecto (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1987 | 0022.1.4.6. moneda — valor incorrecto (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1988 | 0022.1.4.7. moneda — solo espacios (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1989 | 0022.1.4.7. moneda — solo espacios (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1990 | 0022.1.4.7. moneda — solo espacios (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1991 | 0022.1.4.7. moneda — solo espacios (474) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1992 | 0022.1.5.1. qrTipo — propiedad ausente (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1993 | 0022.1.5.1. qrTipo — propiedad ausente (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1994 | 0022.1.5.1. qrTipo — propiedad ausente (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1995 | 0022.1.5.1. qrTipo — propiedad ausente (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1996 | 0022.1.5.2. qrTipo — null (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1997 | 0022.1.5.2. qrTipo — null (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1998 | 0022.1.5.2. qrTipo — null (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 1999 | 0022.1.5.2. qrTipo — null (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2000 | 0022.1.5.3. qrTipo — tipo string (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2001 | 0022.1.5.3. qrTipo — tipo string (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2002 | 0022.1.5.3. qrTipo — tipo string (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2003 | 0022.1.5.3. qrTipo — tipo string (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2004 | 0022.1.5.4. qrTipo — tipo boolean (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2005 | 0022.1.5.4. qrTipo — tipo boolean (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2006 | 0022.1.5.4. qrTipo — tipo boolean (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2007 | 0022.1.5.4. qrTipo — tipo boolean (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2008 | 0022.1.5.5. qrTipo — valor inválido (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2009 | 0022.1.5.5. qrTipo — valor inválido (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2010 | 0022.1.5.5. qrTipo — valor inválido (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2011 | 0022.1.5.5. qrTipo — valor inválido (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2012 | 0022.1.5.6. qrTipo — valor cero (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2013 | 0022.1.5.6. qrTipo — valor cero (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2014 | 0022.1.5.6. qrTipo — valor cero (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2015 | 0022.1.5.6. qrTipo — valor cero (464) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2016 | 0022.1.6.1. canalPago — propiedad ausente (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2017 | 0022.1.6.1. canalPago — propiedad ausente (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2018 | 0022.1.6.1. canalPago — propiedad ausente (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2019 | 0022.1.6.1. canalPago — propiedad ausente (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2020 | 0022.1.6.2. canalPago — null (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2021 | 0022.1.6.2. canalPago — null (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2022 | 0022.1.6.2. canalPago — null (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2023 | 0022.1.6.2. canalPago — null (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2024 | 0022.1.6.3. canalPago — string vacío (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2025 | 0022.1.6.3. canalPago — string vacío (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2026 | 0022.1.6.3. canalPago — string vacío (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2027 | 0022.1.6.3. canalPago — string vacío (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2028 | 0022.1.6.4. canalPago — tipo number (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2029 | 0022.1.6.4. canalPago — tipo number (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2030 | 0022.1.6.4. canalPago — tipo number (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2031 | 0022.1.6.4. canalPago — tipo number (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2032 | 0022.1.6.5. canalPago — tipo boolean (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2033 | 0022.1.6.5. canalPago — tipo boolean (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2034 | 0022.1.6.5. canalPago — tipo boolean (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2035 | 0022.1.6.5. canalPago — tipo boolean (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2036 | 0022.1.6.6. canalPago — valor inválido (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2037 | 0022.1.6.6. canalPago — valor inválido (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2038 | 0022.1.6.6. canalPago — valor inválido (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2039 | 0022.1.6.6. canalPago — valor inválido (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2040 | 0022.1.6.7. canalPago — valor minúsculas (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2041 | 0022.1.6.7. canalPago — valor minúsculas (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2042 | 0022.1.6.7. canalPago — valor minúsculas (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2043 | 0022.1.6.7. canalPago — valor minúsculas (472) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2044 | 0022.1.7.1. tipo — propiedad ausente (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2045 | 0022.1.7.1. tipo — propiedad ausente (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2046 | 0022.1.7.1. tipo — propiedad ausente (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2047 | 0022.1.7.1. tipo — propiedad ausente (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2048 | 0022.1.7.2. tipo — null (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2049 | 0022.1.7.2. tipo — null (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2050 | 0022.1.7.2. tipo — null (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2051 | 0022.1.7.2. tipo — null (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2052 | 0022.1.7.3. tipo — string vacío (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2053 | 0022.1.7.3. tipo — string vacío (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2054 | 0022.1.7.3. tipo — string vacío (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2055 | 0022.1.7.3. tipo — string vacío (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2056 | 0022.1.7.4. tipo — tipo number (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2057 | 0022.1.7.4. tipo — tipo number (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2058 | 0022.1.7.4. tipo — tipo number (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2059 | 0022.1.7.4. tipo — tipo number (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2060 | 0022.1.7.5. tipo — tipo boolean (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2061 | 0022.1.7.5. tipo — tipo boolean (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2062 | 0022.1.7.5. tipo — tipo boolean (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2063 | 0022.1.7.5. tipo — tipo boolean (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2064 | 0022.1.7.6. tipo — valor inválido (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2065 | 0022.1.7.6. tipo — valor inválido (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2066 | 0022.1.7.6. tipo — valor inválido (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2067 | 0022.1.7.6. tipo — valor inválido (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2068 | 0022.1.7.7. tipo — valor minúsculas (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2069 | 0022.1.7.7. tipo — valor minúsculas (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2070 | 0022.1.7.7. tipo — valor minúsculas (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2071 | 0022.1.7.7. tipo — valor minúsculas (468) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2072 | 0022.1.8.1. descripcion — tipo number (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2073 | 0022.1.8.1. descripcion — tipo number (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2074 | 0022.1.8.1. descripcion — tipo number (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2075 | 0022.1.8.1. descripcion — tipo number (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2076 | 0022.1.8.2. descripcion — longitud 81 (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2077 | 0022.1.8.2. descripcion — longitud 81 (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2078 | 0022.1.8.2. descripcion — longitud 81 (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2079 | 0022.1.8.2. descripcion — longitud 81 (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2080 | 0022.1.8.3. descripcion — caracteres no permitidos (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2081 | 0022.1.8.3. descripcion — caracteres no permitidos (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2082 | 0022.1.8.3. descripcion — caracteres no permitidos (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2083 | 0022.1.8.3. descripcion — caracteres no permitidos (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2084 | 0022.1.8.4. descripcion — símbolo arroba (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2085 | 0022.1.8.4. descripcion — símbolo arroba (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2086 | 0022.1.8.4. descripcion — símbolo arroba (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2087 | 0022.1.8.4. descripcion — símbolo arroba (437) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2088 | 0023.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2089 | 0023.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2090 | 0023.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2091 | 0023.1.1.1. identificador — propiedad ausente (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2092 | 0023.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2093 | 0023.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2094 | 0023.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2095 | 0023.1.1.2. identificador — null (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2096 | 0023.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2097 | 0023.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2098 | 0023.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2099 | 0023.1.1.3. identificador — string vacío (419) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2100 | 0023.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2101 | 0023.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2102 | 0023.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2103 | 0023.1.1.4. identificador — tipo number (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2104 | 0023.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2105 | 0023.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2106 | 0023.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2107 | 0023.1.1.5. identificador — tipo boolean (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2108 | 0023.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2109 | 0023.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2110 | 0023.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2111 | 0023.1.1.6. identificador — tipo object (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2112 | 0023.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2113 | 0023.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2114 | 0023.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2115 | 0023.1.1.7. identificador — no inicia con 6 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2116 | 0023.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2117 | 0023.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2118 | 0023.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2119 | 0023.1.1.8. identificador — longitud 7 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2120 | 0023.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2121 | 0023.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2122 | 0023.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2123 | 0023.1.1.9. identificador — longitud 9 (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2124 | 0023.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2125 | 0023.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2126 | 0023.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2127 | 0023.1.1.10. identificador — con letras (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2128 | 0023.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2129 | 0023.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2130 | 0023.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2131 | 0023.1.1.11. identificador — solo espacios (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2132 | 0023.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2133 | 0023.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2134 | 0023.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2135 | 0023.1.1.12. identificador — espacio interno (409) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2136 | 0023.1.2.1. qrCode — propiedad ausente (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2137 | 0023.1.2.1. qrCode — propiedad ausente (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2138 | 0023.1.2.1. qrCode — propiedad ausente (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2139 | 0023.1.2.1. qrCode — propiedad ausente (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2140 | 0023.1.2.2. qrCode — null (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2141 | 0023.1.2.2. qrCode — null (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2142 | 0023.1.2.2. qrCode — null (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2143 | 0023.1.2.2. qrCode — null (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2144 | 0023.1.2.3. qrCode — string vacío (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2145 | 0023.1.2.3. qrCode — string vacío (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2146 | 0023.1.2.3. qrCode — string vacío (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2147 | 0023.1.2.3. qrCode — string vacío (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2148 | 0023.1.2.4. qrCode — tipo number (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2149 | 0023.1.2.4. qrCode — tipo number (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2150 | 0023.1.2.4. qrCode — tipo number (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2151 | 0023.1.2.4. qrCode — tipo number (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2152 | 0023.1.2.5. qrCode — tipo boolean (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2153 | 0023.1.2.5. qrCode — tipo boolean (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2154 | 0023.1.2.5. qrCode — tipo boolean (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2155 | 0023.1.2.5. qrCode — tipo boolean (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2156 | 0023.1.2.6. qrCode — tipo object (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2157 | 0023.1.2.6. qrCode — tipo object (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2158 | 0023.1.2.6. qrCode — tipo object (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
| 2159 | 0023.1.2.6. qrCode — tipo object (473) | — | — | — | — | 509 | — | ✗ | `{"codigoError":509,"mensajeError":"Error inesperado al llamar servicio interno"}` |
