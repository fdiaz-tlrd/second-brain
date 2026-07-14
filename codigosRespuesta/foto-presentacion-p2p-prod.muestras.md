# Muestras request/response por patrón — P2P (prod)

Una muestra completa por **patrón estructural único** (el primer escenario que lo definió). Foto (matriz): [`foto-presentacion-p2p-prod.md`](foto-presentacion-p2p-prod.md).

| Campo | Valor |
|-------|-------|
| Servicio | P2P |
| Código fuente | prod |
| Fecha corrida | 2026-07-13T12:30:36.194Z |
| Nivel ejecución | MATRIZ |
| Patrones con muestra | 33 |
| Nota | MATRIZ P2P re-run tras fix [CAPTURA] |

Por muestra: **Request** = `reqClaro` (legible). **Response cliente** = `body` post-`/descifrar`. Si hubo cifrado en cable, también `respLambdaRaw` (truncado si es largo).

## 1. Forma `A.descripcionError` · código 400

| Campo | Valor |
|-------|-------|
| Escenario | 1.2.1. validador — propiedad ausente (undefined) (400) |
| Ruta | `General/1_validaciones_js/2_validador` |
| Escenarios con este patrón | 16 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | descripcionError |
| Claves | `codigoError,descripcionError` |
| Pattern key | `A.descripcionError\|http=200\|cifrado=?\|campo=descripcionError\|campos=descripcionError\|keys=codigoError,descripcionError\|codigo=400\|desc=Error de formato en campo validador` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 400,
  "descripcionError": "Error de formato en campo validador"
}
```

## 2. Forma `A.descripcionError` · código 400

| Campo | Valor |
|-------|-------|
| Escenario | 1.1.1. idCanal — propiedad ausente (undefined) (400) |
| Ruta | `General/1_validaciones_js/1_idCanal` |
| Escenarios con este patrón | 8 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | descripcionError |
| Claves | `codigoError,descripcionError` |
| Pattern key | `A.descripcionError\|http=200\|cifrado=?\|campo=descripcionError\|campos=descripcionError\|keys=codigoError,descripcionError\|codigo=400\|desc=Error de formato en campo canal` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 400,
  "descripcionError": "Error de formato en campo canal"
}
```

## 3. Forma `A.descripcionError` · código 550

| Campo | Valor |
|-------|-------|
| Escenario | 0.1. body — JSON HTTP inválido (400) |
| Ruta | `General/0_jsonEntrada` |
| Escenarios con este patrón | 23 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | descripcionError |
| Claves | `codigoError,descripcionError` |
| Pattern key | `A.descripcionError\|http=200\|cifrado=?\|campo=descripcionError\|campos=descripcionError\|keys=codigoError,descripcionError\|codigo=550\|desc=Error inesperado` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 550,
  "descripcionError": "Error inesperado"
}
```

## 4. Forma `A.mensajeError` · código 400

| Campo | Valor |
|-------|-------|
| Escenario | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) |
| Ruta | `General/1_validaciones_js/2_validador` |
| Escenarios con este patrón | 76 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=?\|campo=mensajeError\|campos=mensajeError\|keys=codigoError,mensajeError\|codigo=400\|desc=Error en la petición original` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

## 5. Forma `A.mensajeError` · código 401

| Campo | Valor |
|-------|-------|
| Escenario | 1.1.7. idCanal — solo espacios, trim vacío (400) |
| Ruta | `General/1_validaciones_js/1_idCanal` |
| Escenarios con este patrón | 32 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=?\|campo=mensajeError\|campos=mensajeError\|keys=codigoError,mensajeError\|codigo=401\|desc=Canal emisor no existe` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

## 6. Forma `A.mensajeError` · código 404

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.4. solicitudes — sin propiedad idSolicitud (431) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 44 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=?\|campo=mensajeError\|campos=mensajeError\|keys=codigoError,mensajeError\|codigo=404\|desc=Campo idSolicitud no cumple con los criterios` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "codigoError": 404,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

## 7. Forma `A.mensajeError` · código 404

| Campo | Valor |
|-------|-------|
| Escenario | 1.2.4. validador — tipo number (400) |
| Ruta | `General/1_validaciones_js/2_validador` |
| Escenarios con este patrón | 40 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=?\|campo=mensajeError\|campos=mensajeError\|keys=codigoError,mensajeError\|codigo=404\|desc=Validador no existe` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

## 8. Forma `A.mensajeError` · código 405

| Campo | Valor |
|-------|-------|
| Escenario | 1.3.4. peticion — tipo number (400) |
| Ruta | `General/1_validaciones_js/3_peticion` |
| Escenarios con este patrón | 68 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=?\|campo=mensajeError\|campos=mensajeError\|keys=codigoError,mensajeError\|codigo=405\|desc=Error en descifrado canal emisor` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

## 9. Forma `A.mensajeError` · código 425

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.1. solicitudes — tipo string (425) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 12 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=?\|campo=mensajeError\|campos=mensajeError\|keys=codigoError,mensajeError\|codigo=425\|desc=Cantidad de solicitudes no permitidas.` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "codigoError": 425,
    "mensajeError": "Cantidad de solicitudes no permitidas."
  }
}
```

## 10. Forma `A.mensajeError` · código 509

| Campo | Valor |
|-------|-------|
| Escenario | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) |
| Ruta | `General/2_reglaNegocio/4_metodo` |
| Escenarios con este patrón | 4 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=?\|campo=mensajeError\|campos=mensajeError\|keys=codigoError,mensajeError\|codigo=509\|desc=Error inesperado al llamar servicio interno` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 509,
  "mensajeError": "Error inesperado al llamar servicio interno"
}
```

## 11. Forma `A.mensajeError` · código 999

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.19. solicitudes — elemento null en arreglo (431) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 4 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=?\|campo=mensajeError\|campos=mensajeError\|keys=codigoError,mensajeError\|codigo=999\|desc=Error en la solicitud` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 999,
  "mensajeError": "Error en la solicitud"
}
```

## 12. Forma `B` · código 0

| Campo | Valor |
|-------|-------|
| Escenario | 0002.1.2.4. identificador — tipo number (409) |
| Ruta | `Metodo/0002/1_validaciones_js/2_identificador` |
| Escenarios con este patrón | 36 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=0\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945161",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "existe": "INVALIDO",
          "identificador": 69852374
        }
      }
    ]
  }
}
```

## 13. Forma `B` · código 407

| Campo | Valor |
|-------|-------|
| Escenario | 0007.1.1.1. identificador — propiedad ausente (419) |
| Ruta | `Metodo/0007/1_validaciones_js/1_identificador` |
| Escenarios con este patrón | 52 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=407\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945506",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 407,
        "datos": null
      }
    ]
  }
}
```

## 14. Forma `B` · código 408

| Campo | Valor |
|-------|-------|
| Escenario | 0006.1.1.1. identificador — propiedad ausente (419) |
| Ruta | `Metodo/0006/1_validaciones_js/1_identificador` |
| Escenarios con este patrón | 84 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=408\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945368",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 408,
        "datos": null
      }
    ]
  }
}
```

## 15. Forma `B` · código 409

| Campo | Valor |
|-------|-------|
| Escenario | 0003.1.1.4. identificador — tipo number (409) |
| Ruta | `Metodo/0003/1_validaciones_js/1_identificador` |
| Escenarios con este patrón | 288 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=409\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945180",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 409,
        "datos": null
      }
    ]
  }
}
```

## 16. Forma `B` · código 410

| Campo | Valor |
|-------|-------|
| Escenario | 0002.1.1.4. tipoIdentificador — tipo number (410) |
| Ruta | `Metodo/0002/1_validaciones_js/1_tipoIdentificador` |
| Escenarios con este patrón | 168 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=410\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945145",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 410,
        "datos": null
      }
    ]
  }
}
```

## 17. Forma `B` · código 412

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.5.14. banco — SWIFT no coincide con emisor (412) |
| Ruta | `Metodo/0004/1_validaciones_js/5_banco` |
| Escenarios con este patrón | 24 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=412\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945314",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 412,
        "datos": null
      }
    ]
  }
}
```

## 18. Forma `B` · código 413

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.6.1. cuenta — propiedad ausente (413) |
| Ruta | `Metodo/0004/1_validaciones_js/6_cuenta` |
| Escenarios con este patrón | 132 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=413\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945316",
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

## 19. Forma `B` · código 414

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.5.1. banco — propiedad ausente (414) |
| Ruta | `Metodo/0004/1_validaciones_js/5_banco` |
| Escenarios con este patrón | 312 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=414\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945294",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 414,
        "datos": null
      }
    ]
  }
}
```

## 20. Forma `B` · código 419

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.10. solicitudes — guion bajo (431) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 216 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=419\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945096",
    "respuestas": [
      {
        "idSolicitud": "id_001",
        "resultado": 419,
        "datos": null
      }
    ]
  }
}
```

## 21. Forma `B` · código 421

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.7.1. producto — propiedad ausente (421) |
| Ruta | `Metodo/0004/1_validaciones_js/7_producto` |
| Escenarios con este patrón | 108 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=421\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945333",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 421,
        "datos": null
      }
    ]
  }
}
```

## 22. Forma `B` · código 426

| Campo | Valor |
|-------|-------|
| Escenario | 0007.1.4.1. tipoBaja — propiedad ausente (426) |
| Ruta | `Metodo/0007/1_validaciones_js/4_tipoBaja` |
| Escenarios con este patrón | 36 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=426\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945559",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 426,
        "datos": null
      }
    ]
  }
}
```

## 23. Forma `B` · código 427

| Campo | Valor |
|-------|-------|
| Escenario | 0006.1.3.3. respuestas — tipo string (455) |
| Ruta | `Metodo/0006/1_validaciones_js/3_respuestas` |
| Escenarios con este patrón | 76 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=427\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945404",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 427,
        "datos": null
      }
    ]
  }
}
```

## 24. Forma `B` · código 428

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.3.1. idPregunta — propiedad ausente (428) |
| Ruta | `Metodo/0004/1_validaciones_js/3_idPregunta` |
| Escenarios con este patrón | 36 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=428\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945245",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 428,
        "datos": null
      }
    ]
  }
}
```

## 25. Forma `B` · código 429

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.4.1. respuesta — propiedad ausente (429) |
| Ruta | `Metodo/0004/1_validaciones_js/4_respuesta` |
| Escenarios con este patrón | 28 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=429\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945280",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 429,
        "datos": null
      }
    ]
  }
}
```

## 26. Forma `B` · código 430

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.1.1. identificador — propiedad ausente (419) |
| Ruta | `Metodo/0004/1_validaciones_js/1_identificador` |
| Escenarios con este patrón | 68 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=430\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945209",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 430,
        "datos": {
          "intentosFallidos": 3
        }
      }
    ]
  }
}
```

## 27. Forma `B` · código 436

| Campo | Valor |
|-------|-------|
| Escenario | 0022.1.2.1. nombreAcreedor — propiedad ausente (436) |
| Ruta | `Metodo/0022/1_validaciones_js/2_nombreAcreedor` |
| Escenarios con este patrón | 32 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=436\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945722",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 436,
        "datos": null
      }
    ]
  }
}
```

## 28. Forma `B` · código 464

| Campo | Valor |
|-------|-------|
| Escenario | 0022.1.5.1. qrTipo — propiedad ausente (464) |
| Ruta | `Metodo/0022/1_validaciones_js/5_qrTipo` |
| Escenarios con este patrón | 24 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=464\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945769",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 464,
        "datos": null
      }
    ]
  }
}
```

## 29. Forma `B` · código 468

| Campo | Valor |
|-------|-------|
| Escenario | 0022.1.7.1. tipo — propiedad ausente (468) |
| Ruta | `Metodo/0022/1_validaciones_js/7_tipo` |
| Escenarios con este patrón | 28 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=468\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945790",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 468,
        "datos": null
      }
    ]
  }
}
```

## 30. Forma `B` · código 472

| Campo | Valor |
|-------|-------|
| Escenario | 0022.1.6.1. canalPago — propiedad ausente (472) |
| Ruta | `Metodo/0022/1_validaciones_js/6_canalPago` |
| Escenarios con este patrón | 28 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=472\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945779",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 472,
        "datos": null
      }
    ]
  }
}
```

## 31. Forma `B` · código 473

| Campo | Valor |
|-------|-------|
| Escenario | 0023.1.2.1. qrCode — propiedad ausente (473) |
| Ruta | `Metodo/0023/1_validaciones_js/2_qrCode` |
| Escenarios con este patrón | 12 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=473\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945826",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 473,
        "datos": null
      }
    ]
  }
}
```

## 32. Forma `B` · código 474

| Campo | Valor |
|-------|-------|
| Escenario | 0022.1.4.1. moneda — propiedad ausente (474) |
| Ruta | `Metodo/0022/1_validaciones_js/4_moneda` |
| Escenarios con este patrón | 28 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| Pattern key | `B\|http=200\|cifrado=?\|keys=idPeticion,respuestas\|codigo=474\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1783945758",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 474,
        "datos": null
      }
    ]
  }
}
```

## 33. Forma `C` · código —

| Campo | Valor |
|-------|-------|
| Escenario | 0006.1.3.1. respuestas — propiedad ausente (455) |
| Ruta | `Metodo/0006/1_validaciones_js/3_respuestas` |
| Escenarios con este patrón | 16 |
| HTTP | 200 |
| Cifrado (cable) | — |
| Formato lambda | — |
| Campo texto | — |
| Claves | `message` |
| Pattern key | `C\|http=200\|cifrado=?\|keys=message\|codigo=\|desc=` |

### Request (`reqClaro`)

_(reqClaro vacío / no capturado)_

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "message": "Internal server error"
  }
}
```
