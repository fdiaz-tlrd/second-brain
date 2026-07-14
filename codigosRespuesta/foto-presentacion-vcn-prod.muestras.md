# Muestras request/response por patrón — VCN (prod)

Una muestra completa por **patrón estructural único** (el primer escenario que lo definió). Foto (matriz): [`foto-presentacion-vcn-prod.md`](foto-presentacion-vcn-prod.md).

| Campo | Valor |
|-------|-------|
| Servicio | VCN |
| Código fuente | prod |
| Fecha corrida | 2026-07-14T09:09:27.962Z |
| Nivel ejecución | MATRIZ |
| Patrones con muestra | 24 |
| Nota | foto presentacion contratos post deploy prod-a-dev |

Por muestra: **Request** = `reqClaro` (legible). **Response cliente** = `body` post-`/descifrar`. Si hubo cifrado en cable, también `respLambdaRaw` (truncado si es largo).

## 1. Forma `A.descripcionError` · código 400

| Campo | Valor |
|-------|-------|
| Escenario | 1.2.1. validador — propiedad ausente (undefined) (400) |
| Ruta | `General/1_validaciones_js/2_validador` |
| Escenarios con este patrón | 16 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | descripcionError |
| Claves | `codigoError,descripcionError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.descripcionError\|http=200\|cifrado=no\|campo=descripcionError\|keys=codigoError,descripcionError\|codigo=400\|desc=Error de formato en campo validador` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019593",
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
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | descripcionError |
| Claves | `codigoError,descripcionError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.descripcionError\|http=200\|cifrado=no\|campo=descripcionError\|keys=codigoError,descripcionError\|codigo=400\|desc=Error de formato en campo canal` |

### Request (`reqClaro`)

```json
{
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019566",
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
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | descripcionError |
| Claves | `codigoError,descripcionError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.descripcionError\|http=200\|cifrado=no\|campo=descripcionError\|keys=codigoError,descripcionError\|codigo=550\|desc=Error inesperado` |

### Request (`reqClaro`)

```json
{idCanal:
```

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
| Escenario | 1.3.1. peticion — propiedad ausente (undefined) (400) |
| Ruta | `General/1_validaciones_js/3_peticion` |
| Escenarios con este patrón | 48 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=400\|desc=Error en la petición original` |

### Request (`reqClaro`)

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
    "idPeticion": "CELEGATO1784019619"
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 400,
  "mensajeError": "Error en la petición original"
}
```

## 5. Forma `A.mensajeError` · código 401

| Campo | Valor |
|-------|-------|
| Escenario | 1.1.7. idCanal — solo espacios, trim vacío (400) |
| Ruta | `General/1_validaciones_js/1_idCanal` |
| Escenarios con este patrón | 32 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=401\|desc=Canal emisor no existe` |

### Request (`reqClaro`)

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

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 401,
  "mensajeError": "Canal emisor no existe"
}
```

## 6. Forma `A.mensajeError` · código 402

| Campo | Valor |
|-------|-------|
| Escenario | 2.2.2. validador — deshabilitado (402) [CANAL_VALIDADOR_DESHABILITADO] |
| Ruta | `General/2_reglaNegocio/2_validador` |
| Escenarios con este patrón | 4 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=402\|desc=Canal validador no disponible` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "1021",
  "peticion": {
    "idPeticion": "CELEGATO1784019701",
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

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 402,
  "mensajeError": "Canal validador no disponible"
}
```

## 7. Forma `A.mensajeError` · código 404

| Campo | Valor |
|-------|-------|
| Escenario | 1.2.4. validador — tipo number (400) |
| Ruta | `General/1_validaciones_js/2_validador` |
| Escenarios con este patrón | 44 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=404\|desc=Validador no existe` |

### Request (`reqClaro`)

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

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

## 8. Forma `A.mensajeError` · código 404

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.4. solicitudes — sin propiedad idSolicitud (431) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 40 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=si\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=404\|desc=Campo idSolicitud no cumple con los criterios` |

### Request (`reqClaro`)

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

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "codigoError": 404,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "aba0651eb917bd0905064fabe01c4280.642b74938eed93caa82d2f59c43defb9ea991a762faaf0fcb98b529a9c920609a48009b546b1ab7b6a8af4e1fa0385d037c772824c5891c882b2d61ba0902b7d0c4022279a702a0b4eea22e509f871231109717ff5e353fc667832e5231c4fe22cfd3ef535bd79904b380cfd2fb2b235202e9539386bdd6a5fcecd2372102e261bfbe45bf70a8838118f9b2618966ba72c9d1de461ede62f315e2935d38e743fac9312b4650750382361f330f159a65a327f3a580f85be2dbf250e728d0919b58367335598217f6b741a2cf80da2beda016b8a89b3d64380f5bdbcd0be396621ee003d43fdc732b597be1c8abf73254ace4d615f26108bc0378b1395691330ecc270c07f411df0d38a0598fddd91d41620a5dea20430739b4eeb3af2f4c526053d7a3571df3df0c28c0234f2f32865b9d4408970fb50d9d7cadef8accc7b7349a4705b63930f7e9e9a842a2734b17db5a124f59c335bc23e720841eca916a34f110f24b3f53c2a45935071f3e261670723986061c3d00c3c63147b02de94be4e09b84a6e5edea5c57eb2b2662de160af6a0f3ca3eb27b5b56bc4a3bb0bd080cce7a16e3924313e00c1135b01ac6c02a23cff6822c71a26122ba3273d53d6e907f47865393ba179532577713b126c965f9a75c4a2ed2292859a8e4cf7df332dd5ee9f0f34ba26ca00ed4c64842e2929f7a3b2da9471b7b519f70523831d71861a.8b966f8aa5d1d3f573bfef27cd4b044b219b51c731a5d7875ad3f899e47fa0caf4b09be38f71238eb11c2721aa088067f43833d5ef3a8843240a45a40cf464e5b8b782c09b4c182fc2d64f2bdf619e6cfd7b5c99f2c139cf4820e27bcb11b08e"
}
```

## 9. Forma `A.mensajeError` · código 405

| Campo | Valor |
|-------|-------|
| Escenario | 1.3.4. peticion — tipo number (400) |
| Ruta | `General/1_validaciones_js/3_peticion` |
| Escenarios con este patrón | 68 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=405\|desc=Error en descifrado canal emisor` |

### Request (`reqClaro`)

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

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 405,
  "mensajeError": "Error en descifrado canal emisor"
}
```

## 10. Forma `A.mensajeError` · código 406

| Campo | Valor |
|-------|-------|
| Escenario | 0001.5.1022.2. validador PROXGATO auth fijo — cifrado invertido (406) |
| Ruta | `Metodo/0001/5_fallosIntegracionValidador/1022_fijo` |
| Escenarios con este patrón | 16 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano_en_respuesta |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=406\|desc=Error en descifrado canal validador` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "1022",
  "peticion": {
    "idPeticion": "CELEGATO1784020143",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "5000000517"
        }
      }
    ]
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "codigoError": 406,
    "mensajeError": "Error en descifrado canal validador"
  }
}
```

## 11. Forma `A.mensajeError` · código 418

| Campo | Valor |
|-------|-------|
| Escenario | 2.2.3. validador — error interno getCanal (500) [CANAL_VALIDADOR_MAL_CONFIGURADO] |
| Ruta | `General/2_reglaNegocio/2_validador` |
| Escenarios con este patrón | 4 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano_en_respuesta |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=418\|desc=Metodo no soportado por el validador` |

### Request (`reqClaro`)

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

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "codigoError": 418,
    "mensajeError": "Metodo no soportado por el validador"
  }
}
```

## 12. Forma `A.mensajeError` · código 425

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.1. solicitudes — tipo string (425) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 16 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=si\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=425\|desc=Cantidad de solicitudes no permitidas.` |

### Request (`reqClaro`)

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

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "codigoError": 425,
    "mensajeError": "Cantidad de solicitudes no permitidas."
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "4bf029c8f9804169d903735b2e509d54.3175ec3594012dc51810ff36027d3c6746ba91092a387550acc3b02a3308d5d36af1cd42234aee00c60126100de137dabed16da513e1ae72b9e570029ebb1d76a1390586cf153476f3057570d1ad4105c399616ff47220b83c0374b8098960edec94d498b481362de163247f7f19d639ad138d580af37a309bf8270ffd7e433b15f13e467f811650ffbbb7db6bca2b5edd113d805f22c471e2ee218b4fdfe861c78df2f642d8c1da1d98934f86211a73afc8ddf29ec2eae36f9ebe42f39ac94497543e082cef53414cb3d24323e02e31da38901e3a0520b98af02c8f2acfc427f08df18fe2a151ca3a1540dac5d4c33178cdf6fe661533694dd568b1bc78c8e07218b8b4bd15d926eefab332cbe16f32ef1a6ebd87d1977fceefea2fc68e2e1d882a6c0fc91733d62df2e744df500f79d0043391e958b14523f69b1d81bb8a83a00f1deba08a435da028edd17e243b15202ce1155cd7095a3ad456e5dd25456bf4d9528cb2127ed1ac3061f08a81564f5a8acfda0af68e1997e14081a0cbca9113c52f1ed99ec33b03e3b5b9d8d13753fa0862f34ede7d8e81679d9fca1e02c6945fc411653f4c1713221caa20c65bf90cab9f4ba089089a76a5110d05b29edf23732042abb97697d868ac7dda25a87b565afdfdfef5f45601b42ac18278d15f5230a2270c80bb88884f89a831e1e04c7c0810037caa9887ac3a942a61d109b8.933c37cd7ad7b8ffde7b56179a943cd0bae73cd2794a1a45f6f8533c4ad90049946bc7d13c941ca72368ccf75ae6b56a6c86761f3629fff33a07549538f8181f80fd588428cfa60bcd0fb56687d3b780"
}
```

## 13. Forma `A.mensajeError` · código 509

| Campo | Valor |
|-------|-------|
| Escenario | 1.4.9. idPeticion — longitud 7, mínimo 8 (400) |
| Ruta | `General/1_validaciones_js/4_idPeticion` |
| Escenarios con este patrón | 84 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano_en_respuesta |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=509\|desc=Error inesperado en validador` |

### Request (`reqClaro`)

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

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "codigoError": 509,
    "mensajeError": "Error inesperado en validador"
  }
}
```

## 14. Forma `A.mensajeError` · código 509

| Campo | Valor |
|-------|-------|
| Escenario | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) |
| Ruta | `General/2_reglaNegocio/4_metodo` |
| Escenarios con este patrón | 4 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=509\|desc=Error inesperado al llamar servicio interno` |

### Request (`reqClaro`)

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

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 509,
  "mensajeError": "Error inesperado al llamar servicio interno"
}
```

## 15. Forma `A.mensajeError` · código 999

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.19. solicitudes — elemento null en arreglo (431) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 12 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=999\|desc=Error en la solicitud` |

### Request (`reqClaro`)

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

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 999,
  "mensajeError": "Error en la solicitud"
}
```

## 16. Forma `B` · código 0

| Campo | Valor |
|-------|-------|
| Escenario | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) |
| Ruta | `General/1_validaciones_js/2_validador` |
| Escenarios con este patrón | 636 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=0\|desc=` |

### Request (`reqClaro`)

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

### Response cliente (`body` post-descifrar)

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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "80e1045834b2b4ac1d6c17110d5f4b51.81f19c531365ca823575a47e5013c4ef1c36b4fcb91da41e15520235cc541cce4d8deffed53583cc7185d5f1283b76e9e1e2bae9ac97e9bd7b2b6f91a97c190599f4e3c6bac8c041a8a882e4cf16ed64920bd7debacf7538b8caa64bcd33f61d5d24485a9289324c480887ac97721b598857f4616c86c8925ce55ca6096cd07f9494f2c6d41642508f27c70e649e4f29f2ce560b887cb79ec8c00571883ffbf190c989aba40535d9490070f1b63367fe1cb06bde58bdf8a1c19bdbad32cb65b470dad372d8084f62ca8ade3f554480848172650e0d5117a6437e5081c9aa391a0331d647fecb6fb36e2216877373d1ffcc3edd578acd496859f922fee9d191b2ecf21b7053a0d84bd846b70fc70be94a4092c3becda8b611332fd18137dd84795ecd41bbf89072d532c724e836e5b1df369019e5690dd14f6f00ecc42cb9190051c503b6a0fc7dd4a8db97eced22db55052da9fee91cb0049e0e8849aba4e67e6f4ed4291863dcd7a80a68c6dd03c79fceef962e8a9b7c7e6b117f3d4cac55df489de54d179216180ddfde557ffa8b8ae4dbf2f56315301bf40869caafc657d8807bfdca564b1014c19a4ea9dc43ca48ad7976738269097a8a142797756b4d108bd162ed17bd902964b96fb500b6466fd49eb46c07dcf99a2639657e024825a27f52b5c84a60bf04d2f71fa6ffc6670f41e47f705f84104c4639407ab516bd38.822e8563218234c31bc671b156e26b8f4511b023e86fa0be2cd000d4087b8fc7dd0a53c88de75771584afa57e3246d49b52bf5c8b573d55987bf9da8d293013a87e979453a34cbfe156b28692312b92c2f3caf251ae230121b5849dfdf0e957c0135cf97aed0f73f5bd9eb79047cbf3cad59cc029ec026f9b6b581a452c734c73abd51d71df0c132fad20397b6b48edf2434af6352bbac176dd51fff50839dc2922684eb8b42469af1e30cf1fd7480fc03d30fae4bf446845d1f48b77b639d87303ce7206f33528d490b2410c2f0e654b3a13f189e9f2b3dbc546855f03414af"
}
```

## 17. Forma `B` · código 413

| Campo | Valor |
|-------|-------|
| Escenario | 0001.1.1.3. cuenta — string vacío (413) |
| Ruta | `Metodo/0001/1_validaciones_js/1_cuenta` |
| Escenarios con este patrón | 68 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=413\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784019717",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": ""
        }
      }
    ]
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019717",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "ef0138a1be4e865f213f5370ead71ee4.0acf1c611e84d8f076286b026d6410749d2e166ab8b1843ce21bd1da4aecddc3aac058a03a62c0085266268aa2f08dfdcdb69b5d86823d3dea4fa1f20f70fcd822e40a8d2761e06feb783dcc2a980ef31cb1c67457a3d32ea6a7f91053d66da1765b9935f6df7c35d3965c78c6ba9db8460b75ca6a59fa62d73f2a4784cdd8724ebb2398e6bbde2da6d416272badedf5d3ca3184233a8fe2dc0b246bdeba397691b5a3e75305a8d8da2b165f684c134b6527cfe89db113345809c2e71930790f65e598c2069a33430c33514582c02f156a7e8bda282ee4d6a19387786114165eefe7c2e60be6eb3395306cb032159315e7a7e212c8d301ff00037573d11765e0cbf561c614da68622e63179bde88fae3cbe019803d35c10444362ff4d308a652aed6487b9449b97c4671f21c3a2bc97a1178222fdcc1051a05f8ac4e5bc972432fc5b25922d2777491de53608a5ced6554acbb9647760f21f4dc75fee4e4472c27d5dadbbde9d95a1cdb371c74a21b17f921d0a154c274cef663e79e33c62615545cad000913e5d4e4b654d4798691130ba7874fce7d8146741f0053a945085be604dfcaa41f7a95527c7b57eac772b5b764c377e800d6b15b5928e07832252bee366fac156400d616592316c9f8beb3da68edccb0950306c0d5f125711f9d8b420ae0131401505b530a7d74064e19d90cc4c6e26e5c86fa578988d4cf8194c2.ed7926b5b20fb1af10ee240a9f1c5ae46fd8faabaf52eca0810ff036e92205e153e920417cf85529dfca0f8c3f37a50a3904fbf9a04d8149f863b33c9905da093b94110cefc60cc3022756c1120b59c2cb6967d073dce00852f6e49103c0833c35428a4380694753d0dd140cd4a117c5"
}
```

## 18. Forma `B` · código 510

| Campo | Valor |
|-------|-------|
| Escenario | 0001.2.1008.510. validador CELEGATO — Número de cuenta incorrecta (510) |
| Ruta | `Metodo/0001/2_respuestaCanalValidador/1008` |
| Escenarios con este patrón | 32 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=510\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019746",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "5000000510"
        }
      }
    ]
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019746",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 510,
        "datos": null
      }
    ]
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "baafcffc2ef966ba8c8500d7889897f8.8b4a77a775fdf556ab72e21047dfbccbd70cb27609f3bf0233caa5cf961890a4aea419a0d92a021fad27121e13cddb9c4e2dda03f64109a7f4175b1807920fa0e27edf743ab53c6525d89ca1612b9be0937148fc036024d14d08fc60cab3e1d4fba7ff8cf4653a8dacfb7c828fb51ae96700db72468e44526489f7c0d515eb7f9ecbe110a86dfda9fc76c0ac2662c70e0b111ba279071aa44239488ef11a3840023c550e14153e13e76d0de88bc6ffb591168d126593a88f9eb7e247e91a3304d217b23801f7aee14bc91bbf0f49da402f3b2d01dd03664b040106e1b1e4a634994bf73c2080a9a1205d2232f98b3de028e9a2f3070c00e83050d76713e6a1414d55bb295ad2594a35ac3b33c1c96b8eee1f8b7da97547e7303b4be32bf00dfaa966fa7e09d58acc6e3823031525e9054c329724c90464ee4fa7661f19bd6907037e02e372e4328143f2789a551158176af2069cfc65e6b56dbaf2522dac12cf173939c263340488ca635f21bbc41b6a5d677cb71d0706f3edf6ce1605df7eca688469373309d768011d5aba66bfb29fd760ded6c917acd4d036e069290cda066bc6a031fa4ea6f857af6fd6e7afac0c0acd766024badb748143fb36d842b59294c0effd399e86d3fd9b6630311ca178513742e5ad27673afa8baa3c6f4132e8db7f999db797f3efcb74dcaaa2c69599db11722f378455a71193de58f5158ecf.9907e6b722158383d907e46646a2bcc4ba0b9779c8aafdcff5f75d9b9c96d4f2f9cb261696d925e1a929aa0fc3698cffe9dea073bf9846ad446ce911110c27d04a661cf35d0fefb2bf8d6f3c0a9f80aedd03f9a3c64838fa426e28bbe685eb4cb4f721981f192df3263c61f99d9f1b84"
}
```

## 19. Forma `B` · código 511

| Campo | Valor |
|-------|-------|
| Escenario | 0001.2.1008.511. validador CELEGATO — Número de cuenta cerrado (511) |
| Ruta | `Metodo/0001/2_respuestaCanalValidador/1008` |
| Escenarios con este patrón | 32 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=511\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019748",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "5000000511"
        }
      }
    ]
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019748",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 511,
        "datos": null
      }
    ]
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "6b7fb6b64b112aefd81b2bb3b0f46ca4.9c259503dbf60651213b467f3d24a7ceb80176179e91299d37740c8c4af2fcf540b2761f257816ef873cfa7b00f9754f77d6985732da65e1deaf1d6703684a0607e64988a41824d7fe5ae51369502fb66982d93d5719ba094f7308985de0cbf2f8ca7bfc8c8dab5c4a27f01cbc5d009e8b8ed1301e00ecc3afab75cc58d37ec04ae93df5aa6a13b0f0f3f3e0cea112a54e8c409e9a12caebdc3c1e78ffdb863aa7a346f285472953be9074ee760a2775eedf5f6aecf03d7144cd88c90812594275e1b45fa6a9c13bb5ee27a880d5211dc39dac1f9d08b0804de355dd411369120200af319a0a407adfd53de029f725051b79be08e5c2f13f1eeda2472d0dc9de25ff00d619bc1cf3258b00e9e9be6c0240bb2eed05e26874f006ac567ecda9cf6e60025af7a38e56dc1ae7fc63e8a698393bf9e1297cc8179e07a47ce1c0e25f6c1eb6716c218861f8d80b55cd7da6096d5b8cdbf408bd2955e8fdf7a1c1ba252250f2c4958bfc9c20f76e7de6166b6dc105d8d26b2e47d30c610524da0a0bc3c32924b4fc4c9d4a608a556f9bddf4c7fb734853753cdd4a2f14488cd9cc312bb7ef8c03c1d9f72c50f80c116b36b190da6335640160549bbeeacb220490c3ff34c4fd5f8bce50ee706bc91767ca7597594a704a7f8da8c01c15ce4aa106200f2d916f4643e2cf5f257c41c2ad4f372fbbb19213c9541e4cb17952780dac419f.9e233838e271bcd194a0d31bbd7cfb144af2060225a2cc9e1c9d9d3efbe31f17f549201c20467955083d3d041f9f1edff02405ceed376b5040b6a42b13fcf477f55cda040600c4f792eb6f807861caec076bcb8ab1b4bd202a03f1217ce6a4f891a231d6bfcdcb9232f3829133548cf5"
}
```

## 20. Forma `B` · código 512

| Campo | Valor |
|-------|-------|
| Escenario | 0001.2.1008.512. validador CELEGATO — Número de cuenta bloqueado (512) |
| Ruta | `Metodo/0001/2_respuestaCanalValidador/1008` |
| Escenarios con este patrón | 32 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=512\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019750",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "5000000512"
        }
      }
    ]
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019750",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 512,
        "datos": null
      }
    ]
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "f2872ad26ceafa01ac226268bd3ed432.a8df9a1d5ff902703c9d2e37ec66953f5fc959cb22239e61d4b96eded4f23a49aaa85b3d4aa7a5285b2bcb38902b1e6af53509e84266212f20a8e7c2caa128ae61182616fd3128dc21d556b6e3b5741e3e5f8270a0d8b4f0769d8f59342666309262d8ea8ef5ffef24b0136148527da3e91d69acaa582640c2c0c14060c9129c69b222e84eeec1f8765b02a4d09ad865e7e64078c738e1d334f2e9ed0682ed81d8ca1915e5736d817f67a62f4d07869358f348f0b0d956621ff685845bd31f978f086593bd00eeb1760f118e29e02a99e56cc8ae2ea9c856b73a06fc9429f11c181665a201e13f5554372b53f85eaa14ae4c3d2652ac898bf7c23087c792cf0e45807d0bb58913e77441aeeef918303397eab0930fa224f08cdba78ca9f12dd23dcb2fccd7585e37419d410446e1688f2a2549b55890f7903b7ff668c2154b325d2fab8abe19890d49ff3ebceabeebee7833ec9250399d9f3dd7f63e57db82ebc3871d66b5229b889c90ee4aefd3eedb6b484eb1e3b40ce2018b9bc4883d80c12c3426a48294108aef8828a76ca577d78554bc292d20e5c4f0f56224f2a478e3681aea03d09ca0b9027d122ba1424fa6e79f5903cb95b40b628cc697186d3ef69ca8f688438b8c9aa43686e9675d0e4cff7706f8fb0942c616ded7dc6cf731379f20549c9c7ace4a730b291fff8b2c6acc50b011a2e3d7a5e85bbb6c7e51606f.38b20b676b81aec20ab89adff8d631231e626be2f898212f9484a18ec1331fbd0c3cf11142b300d8cd7fc6bfd2896217061941bd893953cc8d8b00ed6dc8f3d6300acf60ad7b008027b52d24ecbb819ade4d4e72510b3690650690461f8fa77ef061f9a0d6ebe475cfd2edab20ad55f7"
}
```

## 21. Forma `B` · código 513

| Campo | Valor |
|-------|-------|
| Escenario | 0001.2.1008.513. validador CELEGATO — Transacción no permitida (513) |
| Ruta | `Metodo/0001/2_respuestaCanalValidador/1008` |
| Escenarios con este patrón | 32 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=513\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019752",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "5000000513"
        }
      }
    ]
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019752",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 513,
        "datos": null
      }
    ]
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "1a84d68c538b033cbc95aff33ae8fd4d.9d3b96ab1ff23988c9f10dba9a1499fdf7bd0c2ce39add1440e12edbe7ab32bbb64ad5db17e63c838a226d75c1e702b40098e40bc36cfb7aa7d83e8c7db0f6c0de589c4e5e227ba091a0127b36900720403b9eef77f6c5dd2afca39b8b4eea040693fe75f8542d21c6318b8a7d7f4b19683fdd07273a143b998fe5e37d49ef98e978cee1bfde84bf9f1db25f2a90533775b6ed0a005abf24535438f422165eba79e4a33195810bb51ad1a19d8a9cafe82256ce3bdc39c8ce52e49de071d8a5dc7d28db993294fcb6ba7f3b4666892dde02b9dfa9b4032724d7636e8e534a1221dfcbf06a121287d1579f02d405dce139a80f75acc95984475fd081a9883ad50dcbc51c19cd4eb688fb5584be9c21d5cee9c182628b266bfb85ef1fd27087f0351f33a6e11b343d4e1bd6be57b320fb7767539cd3a69c90334627bdb71385470f3bae50ce39129da032ddf1a77d6e4d6bbb29132d27859544c841efdb9dba862efbd69b83fa0148f19936f4e8596e53904273af60eb5b6119f7fc1c4270c0e9c1341cce381c4dbc27f2f336b6c80d3f57351c6ff9af22283d441d9bfe49c275d3fe1d43d64cf0312f736ab6d06033e77b243a206accb2fe7a304280aa0847b91fd4ca27903f66b7c730c27d2dde61de10ae681ad95db79371a0fd612f7ab5c5adecaf1f8451f19d65d73fd03c0c41e7b8523e384fc4a73a668c2b8b0fbd0b53e5.a3c5336b49e091dea00e4ccd9fca53be165c71b6475fd214622e1e03a446eb379edf87c3df0d07c9bddb15a2cd4fb20b26904db7b8f879574d2749c9e2ec97107b6cfb491412e3e7b78d9291035143980700d890ec0fc5f8b1bb50d691967b8f366d797bd1d523d4a7fdb888582771dc"
}
```

## 22. Forma `B` · código 514

| Campo | Valor |
|-------|-------|
| Escenario | 0001.2.1008.514. validador CELEGATO — Falta información obligatoria de consulta (514) |
| Ruta | `Metodo/0001/2_respuestaCanalValidador/1008` |
| Escenarios con este patrón | 32 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=514\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019754",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "5000000514"
        }
      }
    ]
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019754",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 514,
        "datos": null
      }
    ]
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "88335fef9683702f37f94343c2517104.0dc4697bcf0f95442bdf97c9fa0b4ee26f0196317b26f3a9946d3aad7323fc9b292eda74e1c1d2e5fc8579c8ca4bf16a21033508e751ed5ea5d24d0128655e4cdbae4f473a687220b7a304277dbc884dc1afe47250a98bbc86e0856963776b5aa022cbbbcf580373be28ab7e1c74dd4242bef82624c2e4c6c7401a56667452cc4c41b0046be740211949156a8dd5db76325490c3a249c50c7660eae96e986665ba52459ed965acf6ea94a1500aea6bbfc3aeda0960ecf7e296df65764e8445e9d437bfdb3b889d23143f26805f442811200b800c9f6be077b3175d7251050cd6718b15419d6555289b16c13e24739a875bdc36384eb0ee9768250cbea9645098134d10ce99d91c0c2ef0c6eb022a6a775a2b5f5e37d2fddcd8d26470a398c2bf34806f3e5e2e3c8e4fbdc836909b0105f48b8688d1ab9241c09cdca8513e9c0ffbe99ba91ba4a64727b69e15f5f7792a44a9aa5927581dc66a60c1a001370dd0823f02de05ccfcda626bec902c5f15a8875ee44d43b6556ee0f6601495d01e189123660179cf62e0b55000f36d9bacbcaa46570007ea6466d255d209a083aa3b3c55d1c6824fe4c0d3e91b294bfdfbd08f1a4ecd4b6f7644651a9fc91fcfe0cb33ef62549d00e94b9a2cd4cf1b5b0520b243d25898c90ba9018557d76824c0eb262330ca086dc08a8b8b3983db6bf48d5b50cd616587a19f940402caba019cda.e200007e7397bdd67cb5dd5309dfe5247f099224d325af1edd3be5688cbfda9d4f6c7efaef39ba07e09bd55bf731250e1523c09039631b87f15b4265ffa42a26ee5a16ae7a3ff2fbee7605a16d16eaeb7ff0fcf1fddb6f18afcda73bed6d73b4e5293006cf47ec05643a014eda51e901"
}
```

## 23. Forma `B` · código 515

| Campo | Valor |
|-------|-------|
| Escenario | 0001.2.1008.515. validador CELEGATO — Razón regulatoria (515) |
| Ruta | `Metodo/0001/2_respuestaCanalValidador/1008` |
| Escenarios con este patrón | 32 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=515\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784019756",
    "metodo": "0001",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "cuenta": "5000000515"
        }
      }
    ]
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784019756",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 515,
        "datos": null
      }
    ]
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "22194a1429f48b30aa080e2b087c1989.d494f0b7b690bccde71888b551d68bdc5f92cd33e50a63d2ba787516b0b1fd6bb9bd426cfa7090214dc36b0d9e7d441667e28edfedbecb834245463c3577fad7259ee4deacab3ee5be81e080fd0cc0ed236a1729328f1fa74c5eb3b3e1af0f6368d451ea8105b106496da8049faa0353c6907918290531d5b6d204e31f783c41b58cc2258a80e0943c74a56594ce15256a05a0faba2fd99a9357c98c4ff5d1820155fd6a584caa85b84b75b4629c44ea14b9a0fa4367b5164d0ad15135239aa9997baf84010a3d48a5d6816c872bf54cb5907b362be4b6e0beceaa6e9cb040e151aa40fdeac5d5e7bf3a143d6d4a3329ad4005b085d81e2babd0c3eae96efad6e27eed0e81e742cc263b138ee57eb4520d9a0afa0e160070f01190e83581b3f7bca0b733d72da21c7ce98f99cfa7f3916d1fae70785db005a53c23f945f05beb41ddd3cf86b76136877ca2417881d18592adda23f7a9f3802b50f1eae55df2dc63c1082ac9d258512227d96f617af6d2bd713e2f763d1e46c697c213ffa335a765efe0399c9004ac9d0cb908d555b76a4f6bebe51d6ede8d409698e52d2ae3a93e7bf078cb74e544a794d0ee47b4d047d6ba19dbadb6ca4c4617967c37105714d92f22f3cb2d4ee8fd288b44a174b27b41482842d59d415c064c963ff70c801cada7636c38d6da01388d5a88110a36451ed59371c66c087c153ac3cba9c69518.f346be4240a587770e075325f02441aef0bfcd41afbd574c1e5c6c9d86e3b039decbe1190f8ae49ab5bda81ee385101a0993b9cbb90c986bd1cd1b9c15e6ae1cde156b3e5cb39f7f4e6d9db82e61cd6b893ba0241241e9e6fe83e9b5e590ee112b857ac4cd963effe9c0091738059cd2"
}
```

## 24. Forma `C` · código —

| Campo | Valor |
|-------|-------|
| Escenario | 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599) |
| Ruta | `Metodo/0001/5_fallosIntegracionValidador/1022_fijo` |
| Escenarios con este patrón | 8 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano_en_respuesta |
| Campo texto | — |
| Claves | `message` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `C\|http=200\|cifrado=no\|keys=message\|codigo=\|desc=` |

### Request (`reqClaro`)

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

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "message": "Internal server error"
  }
}
```
