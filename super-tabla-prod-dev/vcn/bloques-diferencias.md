# Super tabla — bloques de diferencias — VCN

| Campo | Valor |
|-------|-------|
| Generado | 2026-07-14T17:56:40.287Z |
| Suite | `vcn` |
| Prod | `../Postman/generador/logs/historial/vcn/2026-07-14T09-09-28Z_prod_MATRIZ_completo_por-escenario.json` · codigoFuente `prod` · nivel `MATRIZ` |
| Dev | `../Postman/generador/logs/historial/vcn/2026-07-14T16-03-14Z_dev_MATRIZ_completo_por-escenario.json` · codigoFuente `dev` · nivel `MATRIZ` |
| Escenarios unicos (union) | 331 |
| Bloques (solo diferencias) | **84** |
| Anotaciones | [`anotaciones.json`](./anotaciones.json) |

Vista en **bloques** (no mega-tabla). HTTP 200=200 en MATRIZ es visual. Criterio: [`../01-columnas.md`](../01-columnas.md).

## Indice

- [1. 0.1. body — JSON HTTP inválido (400)](#esc-0001) — `esp≠prod` `esp≠dev`
- [2. 0001.1.1.1. cuenta — propiedad ausente (413)](#esc-0002) — `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- [3. 0001.1.1.18. cuenta — tipo array (413)](#esc-0003) — `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- [4. 0001.1.1.2. cuenta — null (413)](#esc-0004) — `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- [5. 0001.3.1008.1.2. validador por SWIFT CELEGATO — cuenta feliz (exito)](#esc-0005) — `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- [6. 0001.3.1009.1.2. validador por SWIFT ASTRGATO — cuenta feliz (exito)](#esc-0006) — `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- [7. 0001.3.1011.1.2. validador por SWIFT MIRAGATO — cuenta feliz (exito)](#esc-0007) — `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- [8. 0001.3.1012.1.2. validador por SWIFT TERAGATO — cuenta feliz (exito)](#esc-0008) — `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- [9. 0001.3.1013.1.2. validador por SWIFT AMIYGATO — cuenta feliz (exito)](#esc-0009) — `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- [10. 0001.3.1014.1.2. validador por SWIFT CORNGATO — cuenta feliz (exito)](#esc-0010) — `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- [11. 0001.3.1015.1.2. validador por SWIFT ZONAGATO — cuenta feliz (exito)](#esc-0011) — `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- [12. 0001.3.1016.1.2. validador por SWIFT BELLGATO — cuenta feliz (exito) — sin enmascaramiento](#esc-0012) — `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- [13. 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)](#esc-0013) — `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- [14. 0001.5.1022.3. validador PROXGATO auth fijo — respuesta sin campo cifrado (509)](#esc-0014) — `esp≠prod` `prod≠dev` `texto≠`
- [15. 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)](#esc-0015) — `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- [16. 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)](#esc-0016) — `esp≠prod` `prod≠dev` `texto≠`
- [17. 1.1.10. idCanal — espacio interno, post-trim (400)](#esc-0017) — `esp≠prod` `esp≠dev`
- [18. 1.1.11. idCanal — símbolo @ no permitido (400)](#esc-0018) — `esp≠prod` `esp≠dev`
- [19. 1.1.12. idCanal — paréntesis ( no permitido (400)](#esc-0019) — `esp≠prod` `esp≠dev`
- [20. 1.1.13. idCanal — ¿ no permitido (400)](#esc-0020) — `esp≠prod` `esp≠dev`
- [21. 1.1.14. idCanal — comillas " no permitidas (400)](#esc-0021) — `esp≠prod` `esp≠dev`
- [22. 1.1.2. idCanal — null (400)](#esc-0022) — `esp≠prod` `esp≠dev`
- [23. 1.1.3. idCanal — string vacío "" (400)](#esc-0023) — `esp≠prod` `esp≠dev`
- [24. 1.1.4. idCanal — tipo number (400)](#esc-0024) — `esp≠prod` `esp≠dev`
- [25. 1.1.5. idCanal — tipo boolean (400)](#esc-0025) — `esp≠prod` `esp≠dev`
- [26. 1.1.6. idCanal — tipo object (400)](#esc-0026) — `esp≠prod` `esp≠dev`
- [27. 1.1.7. idCanal — solo espacios, trim vacío (400)](#esc-0027) — `esp≠prod` `esp≠dev`
- [28. 1.1.8. idCanal — solo tab, trim vacío (400)](#esc-0028) — `esp≠prod` `esp≠dev`
- [29. 1.2.10. validador — espacio interno, post-trim (400)](#esc-0029) — `esp≠prod` `esp≠dev`
- [30. 1.2.11. validador — símbolo @ no permitido (400)](#esc-0030) — `esp≠prod` `esp≠dev`
- [31. 1.2.12. validador — paréntesis ( no permitido (400)](#esc-0031) — `esp≠prod` `esp≠dev`
- [32. 1.2.13. validador — ¿ no permitido (400)](#esc-0032) — `esp≠prod` `esp≠dev`
- [33. 1.2.14. validador — comillas " no permitidas (400)](#esc-0033) — `esp≠prod` `esp≠dev`
- [34. 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)](#esc-0034) — `esp≠prod` `esp≠dev`
- [35. 1.2.4. validador — tipo number (400)](#esc-0035) — `esp≠prod` `esp≠dev` `prod≠dev` `texto≠`
- [36. 1.2.5. validador — tipo boolean (400)](#esc-0036) — `esp≠prod` `esp≠dev` `prod≠dev` `texto≠`
- [37. 1.2.6. validador — tipo object (400)](#esc-0037) — `esp≠prod` `esp≠dev` `prod≠dev` `texto≠`
- [38. 1.2.7. validador — solo espacios, trim vacío (400)](#esc-0038) — `esp≠prod` `esp≠dev`
- [39. 1.2.8. validador — solo tab, trim vacío (400)](#esc-0039) — `esp≠prod` `esp≠dev`
- [40. 1.3.10. peticion — segmento AES en base64 (400)](#esc-0040) — `esp≠prod` `esp≠dev`
- [41. 1.3.11. peticion — segmento AES faltante (400)](#esc-0041) — `esp≠prod` `esp≠dev`
- [42. 1.3.12. peticion — segmento extra (400)](#esc-0042) — `esp≠prod` `esp≠dev`
- [43. 1.3.13. peticion — caracter no hex (400)](#esc-0043) — `esp≠prod` `esp≠dev`
- [44. 1.3.4. peticion — tipo number (400)](#esc-0044) — `esp≠prod` `esp≠dev`
- [45. 1.3.5. peticion — tipo boolean (400)](#esc-0045) — `esp≠prod` `esp≠dev`
- [46. 1.3.6. peticion — tipo object (400)](#esc-0046) — `esp≠prod` `esp≠dev`
- [47. 1.3.7. peticion — formato hex inválido (400)](#esc-0047) — `esp≠prod` `esp≠dev`
- [48. 1.3.8. peticion — IV en base64 (400)](#esc-0048) — `esp≠prod` `esp≠dev`
- [49. 1.3.9. peticion — IV truncado (400)](#esc-0049) — `esp≠prod` `esp≠dev`
- [50. 1.4.11. idPeticion — espacio interno (400)](#esc-0050) — `esp≠prod` `esp≠dev` `texto≠`
- [51. 1.4.12. idPeticion — símbolo @ (400)](#esc-0051) — `esp≠prod` `esp≠dev` `texto≠`
- [52. 1.4.13. idPeticion — unicode interrogación apertura (400)](#esc-0052) — `esp≠prod` `esp≠dev` `texto≠`
- [53. 1.4.14. idPeticion — comillas (400)](#esc-0053) — `esp≠prod` `esp≠dev` `texto≠`
- [54. 1.4.15. idPeticion — prefijo SWIFT ajeno (445)](#esc-0054) — `esp≠prod` `esp≠dev` `texto≠`
- [55. 1.4.9. idPeticion — longitud 7, mínimo 8 (400)](#esc-0055) — `esp≠prod` `esp≠dev` `texto≠`
- [56. 1.5.10. solicitudes — guion bajo (431)](#esc-0056) — `esp≠prod` `prod≠dev` `texto≠`
- [57. 1.5.11. solicitudes — espacio interno (431)](#esc-0057) — `esp≠prod` `prod≠dev` `texto≠`
- [58. 1.5.12. solicitudes — espacio al inicio (431)](#esc-0058) — `esp≠prod` `prod≠dev` `texto≠`
- [59. 1.5.13. solicitudes — espacio al final (431)](#esc-0059) — `esp≠prod` `prod≠dev` `texto≠`
- [60. 1.5.14. solicitudes — arroba (431)](#esc-0060) — `esp≠prod` `prod≠dev` `texto≠`
- [61. 1.5.15. solicitudes — punto (431)](#esc-0061) — `esp≠prod` `prod≠dev` `texto≠`
- [62. 1.5.16. solicitudes — unicode (431)](#esc-0062) — `esp≠prod` `prod≠dev` `texto≠`
- [63. 1.5.17. solicitudes — barra (431)](#esc-0063) — `esp≠prod` `prod≠dev` `texto≠`
- [64. 1.5.18. solicitudes — comillas (431)](#esc-0064) — `esp≠prod` `prod≠dev` `texto≠`
- [65. 1.5.19. solicitudes — elemento null en arreglo (431)](#esc-0065) — `esp≠prod` `prod≠dev` `texto≠`
- [66. 1.5.20. solicitudes — idSolicitud null (431)](#esc-0066) — `esp≠prod` `prod≠dev`
- [67. 1.5.21. solicitudes — idSolicitud tipo boolean true (431)](#esc-0067) — `esp≠prod` `prod≠dev`
- [68. 1.5.22. solicitudes — idSolicitud tipo boolean false (431)](#esc-0068) — `esp≠prod` `prod≠dev`
- [69. 1.5.23. solicitudes — solo guiones (431)](#esc-0069) — `esp≠prod` `prod≠dev` `texto≠`
- [70. 1.5.24. solicitudes — un solo guion (431)](#esc-0070) — `esp≠prod` `prod≠dev` `texto≠`
- [71. 1.5.25. solicitudes — idSolicitud tipo object (431)](#esc-0071) — `esp≠prod` `prod≠dev`
- [72. 1.5.26. solicitudes — idSolicitud tipo array (431)](#esc-0072) — `esp≠prod` `prod≠dev`
- [73. 1.5.4. solicitudes — sin propiedad idSolicitud (431)](#esc-0073) — `esp≠prod` `prod≠dev`
- [74. 1.5.5. solicitudes — idSolicitud vacío (431)](#esc-0074) — `esp≠prod` `prod≠dev`
- [75. 1.5.6. solicitudes — idSolicitud tipo number (431)](#esc-0075) — `esp≠prod` `prod≠dev`
- [76. 1.5.7. solicitudes — idSolicitud solo espacios (431)](#esc-0076) — `esp≠prod` `prod≠dev`
- [77. 1.5.8. solicitudes — idSolicitud longitud 65 (431)](#esc-0077) — `esp≠prod` `prod≠dev`
- [78. 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) CFG 0015≥2](#esc-0078) — `esp≠prod` `esp≠dev`
- [79. 2.1.2. idCanal — sin plan de suscripción (403) CANAL_EMISOR_SIN_PLAN](#esc-0079) — `esp≠prod` `prod≠dev` `texto≠`
- [80. 2.1.3. idCanal — error interno getCanal (500) CANAL_EMISOR_MAL_CONFIGURADO](#esc-0080) — `esp≠prod` `prod≠dev` `texto≠`
- [81. 2.1.4. idCanal — sin plan de suscripción sin grupos (403) CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS](#esc-0081) — `esp≠prod` `prod≠dev` `texto≠`
- [82. 2.2.3. validador — error interno getCanal (500) CANAL_VALIDADOR_MAL_CONFIGURADO](#esc-0082) — `esp≠prod` `prod≠dev` `texto≠`
- [83. 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)](#esc-0083) — `esp≠prod` `prod≠dev` `texto≠`
- [84. 2.4.2. metodo — no asociado al canal emisor (418) CANAL_EMISOR_SIN_METODO](#esc-0084) — `esp≠prod` `prod≠dev` `texto≠`

---
<a id="esc-0001"></a>

## 1. 0.1. body — JSON HTTP inválido (400)

- **Ruta:** `General/0_jsonEntrada` · **Tipo:** `general` · **Variantes cifrado:** prod 3 / dev 3
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 550 | 550 |
| Forma | — | A.descripcionError | A.descripcionError |
| Texto | — | Error inesperado | Error inesperado |

### Request (claro) — referencia prod

```json
{idCanal:
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

#### Dev

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0002"></a>

## 2. 0001.1.1.1. cuenta — propiedad ausente (413)

- **Ruta:** `Metodo/0001/1_validaciones_js/1_cuenta` · **Tipo:** `parametro` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 413 | 999 | 413 |
| Forma | — | A.mensajeError | B |
| Texto | — | Error en la solicitud |  |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019714",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {}
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 999,
    "mensajeError": "Error en la solicitud"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784044440",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 413,
        "datos": null
      }
    ]
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0003"></a>

## 3. 0001.1.1.18. cuenta — tipo array (413)

- **Ruta:** `Metodo/0001/1_validaciones_js/1_cuenta` · **Tipo:** `parametro` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 413 | 509 | 413 |
| Forma | — | A.mensajeError | B |
| Texto | — | Error inesperado en validador |  |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019741",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": [
            "1100001328"
          ]
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784044472",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 413,
        "datos": null
      }
    ]
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0004"></a>

## 4. 0001.1.1.2. cuenta — null (413)

- **Ruta:** `Metodo/0001/1_validaciones_js/1_cuenta` · **Tipo:** `parametro` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 413 | 999 | 413 |
| Forma | — | A.mensajeError | B |
| Texto | — | Error en la solicitud |  |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019716",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": null
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 999,
    "mensajeError": "Error en la solicitud"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784044442",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 413,
        "datos": null
      }
    ]
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0005"></a>

## 5. 0001.3.1008.1.2. validador por SWIFT CELEGATO — cuenta feliz (exito)

- **Ruta:** `Metodo/0001/3_respuestaExitosa/1008` · **Tipo:** `exito` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 0 | 0 | 400 |
| Forma | — | B | A.mensajeError |
| Texto | — |  | Error en la petición original |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "CELEGATO",
  "peticion": {
    "idPeticion": "CELEGATO1784019846",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019846",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "banco": "TLRDPAPA",
          "cuenta": "1100001328",
          "producto": "PACA",
          "estadoCuenta": "0",
          "titulares": [
            "Fis*** vo* Luftsc***** Narfi****"
          ]
        }
      }
    ]
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0006"></a>

## 6. 0001.3.1009.1.2. validador por SWIFT ASTRGATO — cuenta feliz (exito)

- **Ruta:** `Metodo/0001/3_respuestaExitosa/1009` · **Tipo:** `exito` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 0 | 0 | 400 |
| Forma | — | B | A.mensajeError |
| Texto | — |  | Error en la petición original |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "ASTRGATO",
  "peticion": {
    "idPeticion": "CELEGATO1784019873",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019873",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "banco": "TLRDPAPA",
          "cuenta": "1100001328",
          "producto": "PACA",
          "estadoCuenta": "0",
          "titulares": [
            "Fis*** vo* Luftsc***** Narfi****"
          ]
        }
      }
    ]
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0007"></a>

## 7. 0001.3.1011.1.2. validador por SWIFT MIRAGATO — cuenta feliz (exito)

- **Ruta:** `Metodo/0001/3_respuestaExitosa/1011` · **Tipo:** `exito` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 0 | 0 | 400 |
| Forma | — | B | A.mensajeError |
| Texto | — |  | Error en la petición original |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "MIRAGATO",
  "peticion": {
    "idPeticion": "CELEGATO1784019902",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019902",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "banco": "TLRDPAPA",
          "cuenta": "1100001328",
          "producto": "PACA",
          "estadoCuenta": "0",
          "titulares": [
            "Fis*** vo* Luftsc***** Narfi****"
          ]
        }
      }
    ]
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0008"></a>

## 8. 0001.3.1012.1.2. validador por SWIFT TERAGATO — cuenta feliz (exito)

- **Ruta:** `Metodo/0001/3_respuestaExitosa/1012` · **Tipo:** `exito` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 0 | 0 | 400 |
| Forma | — | B | A.mensajeError |
| Texto | — |  | Error en la petición original |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "TERAGATO",
  "peticion": {
    "idPeticion": "CELEGATO1784019929",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019929",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "banco": "TLRDPAPA",
          "cuenta": "1100001328",
          "producto": "PACA",
          "estadoCuenta": "0",
          "titulares": [
            "Fis*** vo* Luftsc***** Narfi****"
          ]
        }
      }
    ]
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0009"></a>

## 9. 0001.3.1013.1.2. validador por SWIFT AMIYGATO — cuenta feliz (exito)

- **Ruta:** `Metodo/0001/3_respuestaExitosa/1013` · **Tipo:** `exito` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 0 | 0 | 400 |
| Forma | — | B | A.mensajeError |
| Texto | — |  | Error en la petición original |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "AMIYGATO",
  "peticion": {
    "idPeticion": "CELEGATO1784019958",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019958",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "banco": "TLRDPAPA",
          "cuenta": "1100001328",
          "producto": "PACA",
          "estadoCuenta": "0",
          "titulares": [
            "Fis*** vo* Luftsc***** Narfi****"
          ]
        }
      }
    ]
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0010"></a>

## 10. 0001.3.1014.1.2. validador por SWIFT CORNGATO — cuenta feliz (exito)

- **Ruta:** `Metodo/0001/3_respuestaExitosa/1014` · **Tipo:** `exito` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 0 | 0 | 400 |
| Forma | — | B | A.mensajeError |
| Texto | — |  | Error en la petición original |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "CORNGATO",
  "peticion": {
    "idPeticion": "CELEGATO1784019984",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019984",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "banco": "TLRDPAPA",
          "cuenta": "1100001328",
          "producto": "PACA",
          "estadoCuenta": "0",
          "titulares": [
            "Fis*** vo* Luftsc***** Narfi****"
          ]
        }
      }
    ]
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0011"></a>

## 11. 0001.3.1015.1.2. validador por SWIFT ZONAGATO — cuenta feliz (exito)

- **Ruta:** `Metodo/0001/3_respuestaExitosa/1015` · **Tipo:** `exito` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 0 | 0 | 400 |
| Forma | — | B | A.mensajeError |
| Texto | — |  | Error en la petición original |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "ZONAGATO",
  "peticion": {
    "idPeticion": "CELEGATO1784020011",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784020011",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "banco": "TLRDPAPA",
          "cuenta": "1100001328",
          "producto": "PACA",
          "estadoCuenta": "0",
          "titulares": [
            "Fis*** vo* Luftsc***** Narfi****"
          ]
        }
      }
    ]
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0012"></a>

## 12. 0001.3.1016.1.2. validador por SWIFT BELLGATO — cuenta feliz (exito) — sin enmascaramiento

- **Ruta:** `Metodo/0001/3_respuestaExitosa/1016` · **Tipo:** `exito` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠dev` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 0 | 0 | 400 |
| Forma | — | B | A.mensajeError |
| Texto | — |  | Error en la petición original |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "BELLGATO",
  "peticion": {
    "idPeticion": "CELEGATO1784020037",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784020037",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "banco": "TLRDPAPA",
          "cuenta": "1100001328",
          "producto": "PACA",
          "estadoCuenta": "0",
          "titulares": [
            "Fischl von Luftschloss Narfidort"
          ]
        }
      }
    ]
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0013"></a>

## 13. 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)

- **Ruta:** `Metodo/0001/5_fallosIntegracionValidador/1022_fijo` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 599 |  | 599 |
| Forma | — | C | A.mensajeError |
| Texto | — |  | Tiempo de espera agotado al llamar al Canal Validador |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "1022",
  "peticion": {
    "idPeticion": "CELEGATO1784020130",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "5000000516"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "message": "Internal server error"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 599,
    "mensajeError": "Tiempo de espera agotado al llamar al Canal Validador"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0014"></a>

## 14. 0001.5.1022.3. validador PROXGATO auth fijo — respuesta sin campo cifrado (509)

- **Ruta:** `Metodo/0001/5_fallosIntegracionValidador/1022_fijo` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 509 | 406 | 509 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal validador | Error inesperado en el Canal Validador |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "1022",
  "peticion": {
    "idPeticion": "CELEGATO1784020148",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "5000000518"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 406,
    "mensajeError": "Error en descifrado canal validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en el Canal Validador"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0015"></a>

## 15. 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)

- **Ruta:** `Metodo/0001/5_fallosIntegracionValidador/1023_token` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 599 |  | 599 |
| Forma | — | C | A.mensajeError |
| Texto | — |  | Tiempo de espera agotado al llamar al Canal Validador |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "1023",
  "peticion": {
    "idPeticion": "CELEGATO1784020150",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "5000000516"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "message": "Internal server error"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 599,
    "mensajeError": "Tiempo de espera agotado al llamar al Canal Validador"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0016"></a>

## 16. 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)

- **Ruta:** `Metodo/0001/5_fallosIntegracionValidador/1023_token` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `200` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 509 | 406 | 509 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal validador | Error inesperado en el Canal Validador |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "1023",
  "peticion": {
    "idPeticion": "CELEGATO1784020166",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "5000000518"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 406,
    "mensajeError": "Error en descifrado canal validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en el Canal Validador"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0017"></a>

## 17. 1.1.10. idCanal — espacio interno, post-trim (400)

- **Ruta:** `General/1_validaciones_js/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 401 | 401 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Canal emisor no existe | Canal emisor no existe |

### Request (claro) — referencia prod

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019586",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "idCanal": "10 0"
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

#### Dev

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0018"></a>

## 18. 1.1.11. idCanal — símbolo @ no permitido (400)

- **Ruta:** `General/1_validaciones_js/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 401 | 401 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Canal emisor no existe | Canal emisor no existe |

### Request (claro) — referencia prod

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019588",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "idCanal": "10@0"
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

#### Dev

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0019"></a>

## 19. 1.1.12. idCanal — paréntesis ( no permitido (400)

- **Ruta:** `General/1_validaciones_js/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 401 | 401 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Canal emisor no existe | Canal emisor no existe |

### Request (claro) — referencia prod

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019589",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "idCanal": "1(00"
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

#### Dev

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0020"></a>

## 20. 1.1.13. idCanal — ¿ no permitido (400)

- **Ruta:** `General/1_validaciones_js/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 401 | 401 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Canal emisor no existe | Canal emisor no existe |

### Request (claro) — referencia prod

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019591",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "idCanal": "10¿0"
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

#### Dev

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0021"></a>

## 21. 1.1.14. idCanal — comillas " no permitidas (400)

- **Ruta:** `General/1_validaciones_js/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 401 | 401 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Canal emisor no existe | Canal emisor no existe |

### Request (claro) — referencia prod

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019592",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "idCanal": "1\"0"
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

#### Dev

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0022"></a>

## 22. 1.1.2. idCanal — null (400)

- **Ruta:** `General/1_validaciones_js/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 550 | 550 |
| Forma | — | A.descripcionError | A.descripcionError |
| Texto | — | Error inesperado | Error inesperado |

### Request (claro) — referencia prod

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019571",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "idCanal": null
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

#### Dev

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0023"></a>

## 23. 1.1.3. idCanal — string vacío "" (400)

- **Ruta:** `General/1_validaciones_js/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 550 | 550 |
| Forma | — | A.descripcionError | A.descripcionError |
| Texto | — | Error inesperado | Error inesperado |

### Request (claro) — referencia prod

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019573",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "idCanal": ""
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

#### Dev

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0024"></a>

## 24. 1.1.4. idCanal — tipo number (400)

- **Ruta:** `General/1_validaciones_js/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 550 | 550 |
| Forma | — | A.descripcionError | A.descripcionError |
| Texto | — | Error inesperado | Error inesperado |

### Request (claro) — referencia prod

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019575",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "idCanal": 1000
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

#### Dev

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0025"></a>

## 25. 1.1.5. idCanal — tipo boolean (400)

- **Ruta:** `General/1_validaciones_js/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 550 | 550 |
| Forma | — | A.descripcionError | A.descripcionError |
| Texto | — | Error inesperado | Error inesperado |

### Request (claro) — referencia prod

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019576",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "idCanal": true
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

#### Dev

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0026"></a>

## 26. 1.1.6. idCanal — tipo object (400)

- **Ruta:** `General/1_validaciones_js/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 550 | 550 |
| Forma | — | A.descripcionError | A.descripcionError |
| Texto | — | Error inesperado | Error inesperado |

### Request (claro) — referencia prod

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019578",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "idCanal": {}
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

#### Dev

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0027"></a>

## 27. 1.1.7. idCanal — solo espacios, trim vacío (400)

- **Ruta:** `General/1_validaciones_js/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 401 | 401 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Canal emisor no existe | Canal emisor no existe |

### Request (claro) — referencia prod

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019579",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "idCanal": "   "
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

#### Dev

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0028"></a>

## 28. 1.1.8. idCanal — solo tab, trim vacío (400)

- **Ruta:** `General/1_validaciones_js/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 401 | 401 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Canal emisor no existe | Canal emisor no existe |

### Request (claro) — referencia prod

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019583",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "idCanal": "\t\t"
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

#### Dev

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0029"></a>

## 29. 1.2.10. validador — espacio interno, post-trim (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 404 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | Validador no existe |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019604",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "validador": "10 0"
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

#### Dev

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0030"></a>

## 30. 1.2.11. validador — símbolo @ no permitido (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 404 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | Validador no existe |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019605",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "validador": "10@0"
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

#### Dev

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0031"></a>

## 31. 1.2.12. validador — paréntesis ( no permitido (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 404 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | Validador no existe |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019606",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "validador": "1(00"
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

#### Dev

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0032"></a>

## 32. 1.2.13. validador — ¿ no permitido (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 404 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | Validador no existe |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019607",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "validador": "10¿0"
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

#### Dev

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0033"></a>

## 33. 1.2.14. validador — comillas " no permitidas (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 404 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | Validador no existe |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019608",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "validador": "1\"0"
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

#### Dev

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0034"></a>

## 34. 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 0 | 0 |
| Forma | — | B | B |
| Texto | — |  |  |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019610",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "validador": "1008"
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019610",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "banco": "TLRDPAPA",
          "cuenta": "1100001328",
          "producto": "PACA",
          "estadoCuenta": "0",
          "titulares": [
            "Fis*** vo* Luftsc***** Narfi****"
          ]
        }
      }
    ]
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784044315",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "banco": "TLRDPAPA",
          "cuenta": "1100001328",
          "producto": "PACA",
          "estadoCuenta": "0",
          "titulares": [
            "Fis*** vo* Luftsc***** Narfi****"
          ]
        }
      }
    ]
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0035"></a>

## 35. 1.2.4. validador — tipo number (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 500 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | ERROR: Excepción no controlada al momento de buscar la información del canal |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019596",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "validador": 1000
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

#### Dev

```json
{
  "codigoError": 500,
  "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0036"></a>

## 36. 1.2.5. validador — tipo boolean (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 500 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | ERROR: Excepción no controlada al momento de buscar la información del canal |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019598",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "validador": true
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

#### Dev

```json
{
  "codigoError": 500,
  "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0037"></a>

## 37. 1.2.6. validador — tipo object (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 500 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | ERROR: Excepción no controlada al momento de buscar la información del canal |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019599",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "validador": {}
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

#### Dev

```json
{
  "codigoError": 500,
  "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0038"></a>

## 38. 1.2.7. validador — solo espacios, trim vacío (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 404 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | Validador no existe |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019600",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "validador": "   "
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

#### Dev

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0039"></a>

## 39. 1.2.8. validador — solo tab, trim vacío (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 404 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | Validador no existe |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019601",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  },
  "validador": "\t\t"
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

#### Dev

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0040"></a>

## 40. 1.3.10. peticion — segmento AES en base64 (400)

- **Ruta:** `General/1_validaciones_js/3_peticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 405 | 405 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal emisor | Error en descifrado canal emisor |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019630"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

#### Dev

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0041"></a>

## 41. 1.3.11. peticion — segmento AES faltante (400)

- **Ruta:** `General/1_validaciones_js/3_peticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 405 | 405 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal emisor | Error en descifrado canal emisor |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019631"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

#### Dev

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0042"></a>

## 42. 1.3.12. peticion — segmento extra (400)

- **Ruta:** `General/1_validaciones_js/3_peticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 405 | 405 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal emisor | Error en descifrado canal emisor |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019632"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

#### Dev

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0043"></a>

## 43. 1.3.13. peticion — caracter no hex (400)

- **Ruta:** `General/1_validaciones_js/3_peticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 405 | 405 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal emisor | Error en descifrado canal emisor |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019633"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

#### Dev

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0044"></a>

## 44. 1.3.4. peticion — tipo number (400)

- **Ruta:** `General/1_validaciones_js/3_peticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 405 | 405 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal emisor | Error en descifrado canal emisor |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019622"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

#### Dev

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0045"></a>

## 45. 1.3.5. peticion — tipo boolean (400)

- **Ruta:** `General/1_validaciones_js/3_peticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 405 | 405 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal emisor | Error en descifrado canal emisor |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019623"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

#### Dev

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0046"></a>

## 46. 1.3.6. peticion — tipo object (400)

- **Ruta:** `General/1_validaciones_js/3_peticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 405 | 405 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal emisor | Error en descifrado canal emisor |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019625"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

#### Dev

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0047"></a>

## 47. 1.3.7. peticion — formato hex inválido (400)

- **Ruta:** `General/1_validaciones_js/3_peticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 405 | 405 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal emisor | Error en descifrado canal emisor |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019626"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

#### Dev

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0048"></a>

## 48. 1.3.8. peticion — IV en base64 (400)

- **Ruta:** `General/1_validaciones_js/3_peticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 405 | 405 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal emisor | Error en descifrado canal emisor |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019627"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

#### Dev

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0049"></a>

## 49. 1.3.9. peticion — IV truncado (400)

- **Ruta:** `General/1_validaciones_js/3_peticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 405 | 405 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal emisor | Error en descifrado canal emisor |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019628"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

#### Dev

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0050"></a>

## 50. 1.4.11. idPeticion — espacio interno (400)

- **Ruta:** `General/1_validaciones_js/4_idPeticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 509 | 509 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Error inesperado en el Canal Validador |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO 001"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en el Canal Validador"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0051"></a>

## 51. 1.4.12. idPeticion — símbolo @ (400)

- **Ruta:** `General/1_validaciones_js/4_idPeticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 509 | 509 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Error inesperado en el Canal Validador |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO@001"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en el Canal Validador"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0052"></a>

## 52. 1.4.13. idPeticion — unicode interrogación apertura (400)

- **Ruta:** `General/1_validaciones_js/4_idPeticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 509 | 509 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Error inesperado en el Canal Validador |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO¿001"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en el Canal Validador"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0053"></a>

## 53. 1.4.14. idPeticion — comillas (400)

- **Ruta:** `General/1_validaciones_js/4_idPeticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 509 | 509 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Error inesperado en el Canal Validador |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO\"001"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en el Canal Validador"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0054"></a>

## 54. 1.4.15. idPeticion — prefijo SWIFT ajeno (445)

- **Ruta:** `General/1_validaciones_js/4_idPeticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 445 | 509 | 509 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Error inesperado en el Canal Validador |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "INVAPAPA00001784019655"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en el Canal Validador"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0055"></a>

## 55. 1.4.9. idPeticion — longitud 7, mínimo 8 (400)

- **Ruta:** `General/1_validaciones_js/4_idPeticion` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 509 | 509 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Error inesperado en el Canal Validador |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "ABC1234"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en el Canal Validador"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0056"></a>

## 56. 1.5.10. solicitudes — guion bajo (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 509 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "id_001",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019668"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0057"></a>

## 57. 1.5.11. solicitudes — espacio interno (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 509 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "id 001",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019670"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0058"></a>

## 58. 1.5.12. solicitudes — espacio al inicio (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 509 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": " abc",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019672"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0059"></a>

## 59. 1.5.13. solicitudes — espacio al final (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 509 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "abc ",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019674"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0060"></a>

## 60. 1.5.14. solicitudes — arroba (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 509 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "id@001",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019675"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0061"></a>

## 61. 1.5.15. solicitudes — punto (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 509 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "id.001",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019677"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0062"></a>

## 62. 1.5.16. solicitudes — unicode (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 509 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "id¿001",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019678"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0063"></a>

## 63. 1.5.17. solicitudes — barra (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 509 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "id/001",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019680"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0064"></a>

## 64. 1.5.18. solicitudes — comillas (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 509 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "id\"001",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019682"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0065"></a>

## 65. 1.5.19. solicitudes — elemento null en arreglo (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 999 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en la solicitud | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      null
    ],
    "idPeticion": "CELEGATO1784019683"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 999,
  "mensajeError": "Error en la solicitud"
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0066"></a>

## 66. 1.5.20. solicitudes — idSolicitud null (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 404 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Campo idSolicitud no cumple con los criterios | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": null,
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019684"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 404,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0067"></a>

## 67. 1.5.21. solicitudes — idSolicitud tipo boolean true (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 404 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Campo idSolicitud no cumple con los criterios | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": true,
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019686"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 404,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0068"></a>

## 68. 1.5.22. solicitudes — idSolicitud tipo boolean false (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 404 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Campo idSolicitud no cumple con los criterios | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": false,
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019687"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 404,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0069"></a>

## 69. 1.5.23. solicitudes — solo guiones (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 509 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "---",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019688"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0070"></a>

## 70. 1.5.24. solicitudes — un solo guion (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 509 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "-",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019690"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0071"></a>

## 71. 1.5.25. solicitudes — idSolicitud tipo object (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 404 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Campo idSolicitud no cumple con los criterios | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": {
          "x": 1
        },
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019692"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 404,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0072"></a>

## 72. 1.5.26. solicitudes — idSolicitud tipo array (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 404 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Campo idSolicitud no cumple con los criterios | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": [
          "1"
        ],
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019693"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 404,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0073"></a>

## 73. 1.5.4. solicitudes — sin propiedad idSolicitud (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 404 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Campo idSolicitud no cumple con los criterios | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019661"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 404,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0074"></a>

## 74. 1.5.5. solicitudes — idSolicitud vacío (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 404 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Campo idSolicitud no cumple con los criterios | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019662"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 404,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0075"></a>

## 75. 1.5.6. solicitudes — idSolicitud tipo number (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 404 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Campo idSolicitud no cumple con los criterios | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": 1,
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019663"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 404,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0076"></a>

## 76. 1.5.7. solicitudes — idSolicitud solo espacios (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 404 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Campo idSolicitud no cumple con los criterios | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "   ",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019664"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 404,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0077"></a>

## 77. 1.5.8. solicitudes — idSolicitud longitud 65 (431)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 404 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Campo idSolicitud no cumple con los criterios | Campo idSolicitud no cumple con los criterios |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019666"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 404,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0078"></a>

## 78. 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 425 | 425 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Cantidad de solicitudes no permitidas. | Cantidad de solicitudes no permitidas. |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "id-001",
        "parametros": {
          "cuenta": "1100001328"
        }
      },
      {
        "idSolicitud": "ID-001",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019667"
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 425,
    "mensajeError": "Cantidad de solicitudes no permitidas."
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 425,
    "mensajeError": "Cantidad de solicitudes no permitidas."
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0079"></a>

## 79. 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

- **Ruta:** `General/2_reglaNegocio/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 403 | 509 | 403 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Canal emisor no tiene un plan de suscripción |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1020",
  "validador": "0001",
  "peticion": {
    "idPeticion": "NAMEGATO1784019695",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 403,
    "mensajeError": "Canal emisor no tiene un plan de suscripción"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0080"></a>

## 80. 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Ruta:** `General/2_reglaNegocio/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `500` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 500 | 405 | 500 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal emisor | ERROR: Excepción no controlada al momento de buscar la información del canal |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1017",
  "validador": "0001",
  "peticion": {
    "idPeticion": "TEYVGATO1784019697",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

#### Dev

```json
{
  "codigoError": 500,
  "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0081"></a>

## 81. 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

- **Ruta:** `General/2_reglaNegocio/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 403 | 509 | 403 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Canal emisor no tiene un plan de suscripción |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1019",
  "validador": "0001",
  "peticion": {
    "idPeticion": "STELGATO1784019698",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 403,
    "mensajeError": "Canal emisor no tiene un plan de suscripción"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0082"></a>

## 82. 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Ruta:** `General/2_reglaNegocio/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `500` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 500 | 418 | 500 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Metodo no soportado por el validador | ERROR: Excepción no controlada al momento de buscar la información del canal |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "1017",
  "peticion": {
    "idPeticion": "CELEGATO1784019702",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 418,
    "mensajeError": "Metodo no soportado por el validador"
  }
}
```

#### Dev

```json
{
  "codigoError": 500,
  "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0083"></a>

## 83. 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418)

- **Ruta:** `General/2_reglaNegocio/4_metodo` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 418 | 509 | 418 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado al llamar servicio interno | Metodo no soportado por el validador |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019711",
    "metodo": "0099",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "codigoError": 509,
  "mensajeError": "Error inesperado al llamar servicio interno"
}
```

#### Dev

```json
{
  "codigoError": 418,
  "mensajeError": "Metodo no soportado por el validador"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0084"></a>

## 84. 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]

- **Ruta:** `General/2_reglaNegocio/4_metodo` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 418 | 509 | 418 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error inesperado en validador | Método no soportado |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1018",
  "validador": "0001",
  "peticion": {
    "idPeticion": "ARCHGATO1784019712",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ]
  }
}
```

### Payload respuesta

#### Prod

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

#### Dev

```json
{
  "respuesta": {
    "codigoError": 418,
    "mensajeError": "Método no soportado"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---
