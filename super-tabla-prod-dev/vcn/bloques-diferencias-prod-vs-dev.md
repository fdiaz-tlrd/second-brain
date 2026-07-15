# Super tabla — bloques de diferencias — VCN (solo prod vs dev)

| Campo | Valor |
|-------|-------|
| Generado | 2026-07-15T19:40:37.164Z |
| Suite | `vcn` |
| Filtro | **Solo prod ≠ dev** (negocio / forma / texto / http). Excluye casos donde prod y dev coinciden aunque ambos ≠ esperado. |
| Prod | `../Postman/generador/logs/historial/vcn/2026-07-14T09-09-28Z_prod_MATRIZ_completo_por-escenario.json` · codigoFuente `prod` · nivel `MATRIZ` |
| Dev | `../Postman/generador/logs/historial/vcn/2026-07-15T18-49-44Z_dev_MATRIZ_completo_por-escenario.json` · codigoFuente `dev` · nivel `MATRIZ` |
| Escenarios unicos (union) | 341 |
| Bloques en esta vista | **46** |
| Anotaciones | [`anotaciones.json`](./anotaciones.json) |

Vista en **bloques** (no mega-tabla). HTTP 200=200 en MATRIZ es visual. Criterio: [`../01-columnas.md`](../01-columnas.md).

Vista completa (sin este filtro): [`bloques-diferencias.md`](./bloques-diferencias.md).

## Indice

- [1. 0001.1.1.1. cuenta — propiedad ausente (413)](#esc-0001) — `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- [2. 0001.1.1.18. cuenta — tipo array (413)](#esc-0002) — `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- [3. 0001.1.1.2. cuenta — null (413)](#esc-0003) — `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- [4. 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)](#esc-0004) — `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- [5. 0001.5.1022.3. validador PROXGATO auth fijo — respuesta sin campo cifrado (509)](#esc-0005) — `esp≠prod` `prod≠dev` `texto≠`
- [6. 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)](#esc-0006) — `esp≠prod` `prod≠dev` `forma≠` `texto≠`
- [7. 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)](#esc-0007) — `esp≠prod` `prod≠dev` `texto≠`
- [8. 1.2.4. validador — tipo number (400)](#esc-0008) — `esp≠prod` `esp≠dev` `prod≠dev` `texto≠`
- [9. 1.2.5. validador — tipo boolean (400)](#esc-0009) — `esp≠prod` `esp≠dev` `prod≠dev` `texto≠`
- [10. 1.2.6. validador — tipo object (400)](#esc-0010) — `esp≠prod` `esp≠dev` `prod≠dev` `texto≠`
- [11. 1.4.11. idPeticion — espacio interno (400)](#esc-0011) — `esp≠prod` `esp≠dev` `texto≠`
- [12. 1.4.12. idPeticion — símbolo @ (400)](#esc-0012) — `esp≠prod` `esp≠dev` `texto≠`
- [13. 1.4.13. idPeticion — unicode interrogación apertura (400)](#esc-0013) — `esp≠prod` `esp≠dev` `texto≠`
- [14. 1.4.14. idPeticion — comillas (400)](#esc-0014) — `esp≠prod` `esp≠dev` `texto≠`
- [15. 1.4.15. idPeticion — prefijo SWIFT ajeno (445)](#esc-0015) — `esp≠prod` `esp≠dev` `texto≠`
- [16. 1.4.9. idPeticion — longitud 7, mínimo 8 (400)](#esc-0016) — `esp≠prod` `esp≠dev` `texto≠`
- [17. 1.5.1. solicitudes — tipo string (425)](#esc-0017) — `esp≠dev` `prod≠dev` `texto≠`
- [18. 1.5.10. solicitudes — guion bajo (431)](#esc-0018) — `esp≠prod` `prod≠dev` `texto≠`
- [19. 1.5.11. solicitudes — espacio interno (431)](#esc-0019) — `esp≠prod` `prod≠dev` `texto≠`
- [20. 1.5.12. solicitudes — espacio al inicio (431)](#esc-0020) — `esp≠prod` `prod≠dev` `texto≠`
- [21. 1.5.13. solicitudes — espacio al final (431)](#esc-0021) — `esp≠prod` `prod≠dev` `texto≠`
- [22. 1.5.14. solicitudes — arroba (431)](#esc-0022) — `esp≠prod` `prod≠dev` `texto≠`
- [23. 1.5.15. solicitudes — punto (431)](#esc-0023) — `esp≠prod` `prod≠dev` `texto≠`
- [24. 1.5.16. solicitudes — unicode (431)](#esc-0024) — `esp≠prod` `prod≠dev` `texto≠`
- [25. 1.5.17. solicitudes — barra (431)](#esc-0025) — `esp≠prod` `prod≠dev` `texto≠`
- [26. 1.5.18. solicitudes — comillas (431)](#esc-0026) — `esp≠prod` `prod≠dev` `texto≠`
- [27. 1.5.19. solicitudes — elemento null en arreglo (431)](#esc-0027) — `esp≠prod` `prod≠dev` `texto≠`
- [28. 1.5.2. solicitudes — arreglo vacío (425)](#esc-0028) — `texto≠`
- [29. 1.5.20. solicitudes — idSolicitud null (431)](#esc-0029) — `esp≠prod` `prod≠dev`
- [30. 1.5.21. solicitudes — idSolicitud tipo boolean true (431)](#esc-0030) — `esp≠prod` `prod≠dev`
- [31. 1.5.22. solicitudes — idSolicitud tipo boolean false (431)](#esc-0031) — `esp≠prod` `prod≠dev`
- [32. 1.5.23. solicitudes — solo guiones (431)](#esc-0032) — `esp≠prod` `prod≠dev` `texto≠`
- [33. 1.5.24. solicitudes — un solo guion (431)](#esc-0033) — `esp≠prod` `prod≠dev` `texto≠`
- [34. 1.5.25. solicitudes — idSolicitud tipo object (431)](#esc-0034) — `esp≠prod` `prod≠dev`
- [35. 1.5.26. solicitudes — idSolicitud tipo array (431)](#esc-0035) — `esp≠prod` `prod≠dev`
- [36. 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)](#esc-0036) — `texto≠`
- [37. 1.5.4. solicitudes — sin propiedad idSolicitud (431)](#esc-0037) — `esp≠prod` `prod≠dev`
- [38. 1.5.5. solicitudes — idSolicitud vacío (431)](#esc-0038) — `esp≠prod` `prod≠dev`
- [39. 1.5.6. solicitudes — idSolicitud tipo number (431)](#esc-0039) — `esp≠prod` `prod≠dev`
- [40. 1.5.7. solicitudes — idSolicitud solo espacios (431)](#esc-0040) — `esp≠prod` `prod≠dev`
- [41. 1.5.8. solicitudes — idSolicitud longitud 65 (431)](#esc-0041) — `esp≠prod` `prod≠dev`
- [42. 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) CFG 0015≥2](#esc-0042) — `esp≠prod` `prod≠dev` `texto≠`
- [43. 2.1.2. idCanal — sin plan de suscripción (403) CANAL_EMISOR_SIN_PLAN](#esc-0043) — `esp≠prod` `prod≠dev` `texto≠`
- [44. 2.1.3. idCanal — error interno getCanal (500) CANAL_EMISOR_MAL_CONFIGURADO](#esc-0044) — `esp≠prod` `prod≠dev` `texto≠`
- [45. 2.1.4. idCanal — sin plan de suscripción sin grupos (403) CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS](#esc-0045) — `esp≠prod` `prod≠dev` `texto≠`
- [46. 2.2.3. validador — error interno getCanal (500) CANAL_VALIDADOR_MAL_CONFIGURADO](#esc-0046) — `esp≠prod` `prod≠dev` `texto≠`

---
<a id="esc-0001"></a>

## 1. 0001.1.1.1. cuenta — propiedad ausente (413)

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
    "idPeticion": "CELEGATO1784140847",
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

<a id="esc-0002"></a>

## 2. 0001.1.1.18. cuenta — tipo array (413)

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
    "idPeticion": "CELEGATO1784140879",
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

## 3. 0001.1.1.2. cuenta — null (413)

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
    "idPeticion": "CELEGATO1784140849",
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

## 4. 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599)

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

<a id="esc-0005"></a>

## 5. 0001.5.1022.3. validador PROXGATO auth fijo — respuesta sin campo cifrado (509)

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

<a id="esc-0006"></a>

## 6. 0001.5.1023.1. validador OUTFGATO auth token — demora validador (599)

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

<a id="esc-0007"></a>

## 7. 0001.5.1023.3. validador OUTFGATO auth token — respuesta sin campo cifrado (509)

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

<a id="esc-0008"></a>

## 8. 1.2.4. validador — tipo number (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 500 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | Error interno |

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
  "mensajeError": "Error interno"
}
```

### Observaciones

- **Veredicto:** PENDIENTE-REVISION
- **Conforme:** no
- **Refs:** `getCanal-excepcion-validador-no-string`, `500-Error-interno`, `vcn/00-estado-y-retomo.md`

Aún en vista prod≠Dig. Histórico: prod getCanal catch→404; dig a menudo 500 Error interno. Justificación humana pendiente (pausa 2026-07-15).

---

<a id="esc-0009"></a>

## 9. 1.2.5. validador — tipo boolean (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 500 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | Error interno |

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
  "mensajeError": "Error interno"
}
```

### Observaciones

- **Veredicto:** PENDIENTE-REVISION
- **Conforme:** no
- **Refs:** `getCanal-excepcion-validador-no-string`, `500-Error-interno`, `vcn/00-estado-y-retomo.md`

Misma familia 1.2.4 — justificación humana pendiente.

---

<a id="esc-0010"></a>

## 10. 1.2.6. validador — tipo object (400)

- **Ruta:** `General/1_validaciones_js/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `esp≠dev` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 400 | 404 | 500 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Validador no existe | Error interno |

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
  "mensajeError": "Error interno"
}
```

### Observaciones

- **Veredicto:** PENDIENTE-REVISION
- **Conforme:** no
- **Refs:** `getCanal-excepcion-validador-no-string`, `500-Error-interno`, `vcn/00-estado-y-retomo.md`

Misma familia 1.2.4 — justificación humana pendiente.

---

<a id="esc-0011"></a>

## 11. 1.4.11. idPeticion — espacio interno (400)

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

<a id="esc-0012"></a>

## 12. 1.4.12. idPeticion — símbolo @ (400)

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

<a id="esc-0013"></a>

## 13. 1.4.13. idPeticion — unicode interrogación apertura (400)

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

<a id="esc-0014"></a>

## 14. 1.4.14. idPeticion — comillas (400)

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

<a id="esc-0015"></a>

## 15. 1.4.15. idPeticion — prefijo SWIFT ajeno (445)

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

<a id="esc-0016"></a>

## 16. 1.4.9. idPeticion — longitud 7, mínimo 8 (400)

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

<a id="esc-0017"></a>

## 17. 1.5.1. solicitudes — tipo string (425)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠dev` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 425 | 425 | 400 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Cantidad de solicitudes no permitidas. | Error en la petición original |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": "no-soy-arreglo",
    "idPeticion": "CELEGATO1784019657"
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
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0018"></a>

## 18. 1.5.10. solicitudes — guion bajo (431)

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

<a id="esc-0019"></a>

## 19. 1.5.11. solicitudes — espacio interno (431)

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

<a id="esc-0020"></a>

## 20. 1.5.12. solicitudes — espacio al inicio (431)

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

<a id="esc-0021"></a>

## 21. 1.5.13. solicitudes — espacio al final (431)

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

<a id="esc-0022"></a>

## 22. 1.5.14. solicitudes — arroba (431)

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

<a id="esc-0023"></a>

## 23. 1.5.15. solicitudes — punto (431)

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

<a id="esc-0024"></a>

## 24. 1.5.16. solicitudes — unicode (431)

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

<a id="esc-0025"></a>

## 25. 1.5.17. solicitudes — barra (431)

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

<a id="esc-0026"></a>

## 26. 1.5.18. solicitudes — comillas (431)

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

<a id="esc-0027"></a>

## 27. 1.5.19. solicitudes — elemento null en arreglo (431)

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

<a id="esc-0028"></a>

## 28. 1.5.2. solicitudes — arreglo vacío (425)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 425 | 425 | 425 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Cantidad de solicitudes no permitidas. | Cantidad de solicitudes no permitidas |

### Request (claro) — referencia prod

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [],
    "idPeticion": "CELEGATO1784019658"
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
    "mensajeError": "Cantidad de solicitudes no permitidas"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0029"></a>

## 29. 1.5.20. solicitudes — idSolicitud null (431)

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

<a id="esc-0030"></a>

## 30. 1.5.21. solicitudes — idSolicitud tipo boolean true (431)

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

<a id="esc-0031"></a>

## 31. 1.5.22. solicitudes — idSolicitud tipo boolean false (431)

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

<a id="esc-0032"></a>

## 32. 1.5.23. solicitudes — solo guiones (431)

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

<a id="esc-0033"></a>

## 33. 1.5.24. solicitudes — un solo guion (431)

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

<a id="esc-0034"></a>

## 34. 1.5.25. solicitudes — idSolicitud tipo object (431)

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

<a id="esc-0035"></a>

## 35. 1.5.26. solicitudes — idSolicitud tipo array (431)

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

<a id="esc-0036"></a>

## 36. 1.5.3. solicitudes — excede límite 0015, 5 solicitudes (425)

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 425 | 425 | 425 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Cantidad de solicitudes no permitidas. | Cantidad de solicitudes no permitidas |

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
      },
      {
        "idSolicitud": "2",
        "parametros": {
          "cuenta": "1100001328"
        }
      },
      {
        "idSolicitud": "3",
        "parametros": {
          "cuenta": "1100001328"
        }
      },
      {
        "idSolicitud": "4",
        "parametros": {
          "cuenta": "1100001328"
        }
      },
      {
        "idSolicitud": "5",
        "parametros": {
          "cuenta": "1100001328"
        }
      }
    ],
    "idPeticion": "CELEGATO1784019659"
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
    "mensajeError": "Cantidad de solicitudes no permitidas"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0037"></a>

## 37. 1.5.4. solicitudes — sin propiedad idSolicitud (431)

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

<a id="esc-0038"></a>

## 38. 1.5.5. solicitudes — idSolicitud vacío (431)

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

<a id="esc-0039"></a>

## 39. 1.5.6. solicitudes — idSolicitud tipo number (431)

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

<a id="esc-0040"></a>

## 40. 1.5.7. solicitudes — idSolicitud solo espacios (431)

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

<a id="esc-0041"></a>

## 41. 1.5.8. solicitudes — idSolicitud longitud 65 (431)

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

<a id="esc-0042"></a>

## 42. 1.5.9. solicitudes — idSolicitud duplicado case-insensitive (431) [CFG 0015≥2]

- **Ruta:** `General/1_validaciones_js/5_solicitudes` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `400` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 431 | 425 | 431 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Cantidad de solicitudes no permitidas. | Campo idSolicitud no cumple con los criterios |

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
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0043"></a>

## 43. 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN]

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

<a id="esc-0044"></a>

## 44. 2.1.3. idCanal — error interno getCanal (500) [CANAL_EMISOR_MAL_CONFIGURADO]

- **Ruta:** `General/2_reglaNegocio/1_idCanal` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `500` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 500 | 405 | 500 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Error en descifrado canal emisor | Error interno |

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
  "mensajeError": "Error interno"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---

<a id="esc-0045"></a>

## 45. 2.1.4. idCanal — sin plan de suscripción sin grupos (403) [CANAL_EMISOR_SIN_PLAN_SIN_GRUPOS]

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

<a id="esc-0046"></a>

## 46. 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO]

- **Ruta:** `General/2_reglaNegocio/2_validador` · **Tipo:** `general` · **Variantes cifrado:** prod 4 / dev 4
- **Etiquetas:** `esp≠prod` `prod≠dev` `texto≠`
- **HTTP:** esperado `500` · prod `200` · dev `200`

| | Esperado | Prod | Dev |
|---|----------|------|------|
| Negocio | 500 | 418 | 500 |
| Forma | — | A.mensajeError | A.mensajeError |
| Texto | — | Metodo no soportado por el validador | Error interno |

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
  "mensajeError": "Error interno"
}
```

### Observaciones

*(sin anotacion en `anotaciones.json` — completar al revisar)*

---
