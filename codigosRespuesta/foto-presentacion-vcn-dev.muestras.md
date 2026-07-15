# Muestras request/response por patrón — VCN (dev)

Una muestra completa por **patrón estructural único** (el primer escenario que lo definió). Foto (matriz): [`foto-presentacion-vcn-dev.md`](foto-presentacion-vcn-dev.md).

| Campo | Valor |
|-------|-------|
| Servicio | VCN |
| Código fuente | dev |
| Fecha corrida | 2026-07-15T17:02:19.033Z |
| Nivel ejecución | MATRIZ |
| Patrones con muestra | 27 |
| Nota | post-deploy Dig 481/482/418 canales 1018-1024 |

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
    "idPeticion": "CELEGATO1784134266",
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
    "idPeticion": "CELEGATO1784134235",
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
    "idPeticion": "CELEGATO1784134298"
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

## 5. Forma `A.mensajeError` · código 400

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.1. solicitudes — tipo string (425) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 4 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=si\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=400\|desc=Error en la petición original` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": "no-soy-arreglo",
    "idPeticion": "CELEGATO1784134344"
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "baaf077564b22c52c70358907751b7b1.b22ad18e7796a04c6b37894db7a90509c2c8a7cfe5d154ddab2fd0bedb4786e106c220508f93275b6186bc2926b1ee07fec2f5e29c02bccfb0f54ecb6798adaf2b61747641e32fae905ce601a2a7ba151b80409aef229445223509cca1920484859503f755814e8b1d3209a74737f7044752d4a5dd81c2fccebe166285c6f61cfd276f04321c9fcf678ca0d5e989da9b077705b3cda9009d6659f3538fc006cac4df200f68d653bd1eba94bed6f0bbd62719f2143fbfbc616e9b635a555418c4b1332bf8d3663d23524f185d6698d375b2b7bcf1a0aeaad57c9c2f049464316f2ab7993b955f913afa965950a78795bf0c8d9239a905406797fd18b003028e5b21876cd7a668f97784a1147cd2e7a27da084070a0e40e34431c2d27a0b2ab2b51efad3cff0c5eb6d3affa2961b3b8a477e3425e05f18e8fbbef96271a95e0bb9611e51eb811295bce700edf7d07ade04b1ce2a14834700aa9ccd480a70668c57124d7eb5d0918f2833175831d83021dc71c912733b400ea2404f8416856a5987da0640d06d1962e59c3899e23867c9539986c9f9c840eb3c759b56fd7b1551ba019eb97c13847ab35148804f7f00bb008cdee4a26e39f8ac2db9a22b9456ad95515bbba652a2baeaf3ae266494fc242acbf4d48c7d51e09f65f5440811f1671a8d41ba851066d687d712ebd69f9825a0deb1c5c0012b707c0df78e6f6f855d24.5f0f4cc81350fb0b4f69dff1cb134928e4836cf5fdaf31734a398c5b18d9cf427f9fe48f0a90a1405bf8661d9641f9e1cdae396f14273bcae06c68464d1d410e0f892247b37c4851633482da1528d0f2"
}
```

## 6. Forma `A.mensajeError` · código 401

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
    "idPeticion": "CELEGATO1784134249",
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

## 7. Forma `A.mensajeError` · código 402

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
    "idPeticion": "CELEGATO1784134393",
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

## 8. Forma `A.mensajeError` · código 403

| Campo | Valor |
|-------|-------|
| Escenario | 2.1.2. idCanal — sin plan de suscripción (403) [CANAL_EMISOR_SIN_PLAN] |
| Ruta | `General/2_reglaNegocio/1_idCanal` |
| Escenarios con este patrón | 8 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano_en_respuesta |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=403\|desc=Canal emisor no tiene un plan de suscripción` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1020",
  "validador": "0001",
  "peticion": {
    "idPeticion": "NAMEGATO1784134387",
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
    "codigoError": 403,
    "mensajeError": "Canal emisor no tiene un plan de suscripción"
  }
}
```

## 9. Forma `A.mensajeError` · código 404

| Campo | Valor |
|-------|-------|
| Escenario | 1.2.7. validador — solo espacios, trim vacío (400) |
| Ruta | `General/1_validaciones_js/2_validador` |
| Escenarios con este patrón | 32 |
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
    "idPeticion": "CELEGATO1784134276",
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

### Response cliente (`body` post-descifrar)

```json
{
  "codigoError": 404,
  "mensajeError": "Validador no existe"
}
```

## 10. Forma `A.mensajeError` · código 405

| Campo | Valor |
|-------|-------|
| Escenario | 1.3.4. peticion — tipo number (400) |
| Ruta | `General/1_validaciones_js/3_peticion` |
| Escenarios con este patrón | 64 |
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
    "idPeticion": "CELEGATO1784134303"
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

## 11. Forma `A.mensajeError` · código 406

| Campo | Valor |
|-------|-------|
| Escenario | 0001.5.1022.2. validador PROXGATO auth fijo — cifrado invertido (406) |
| Ruta | `Metodo/0001/5_fallosIntegracionValidador/1022_fijo` |
| Escenarios con este patrón | 8 |
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
    "idPeticion": "CELEGATO1784134915",
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

## 12. Forma `A.mensajeError` · código 418

| Campo | Valor |
|-------|-------|
| Escenario | 2.2.4. validador — sin renglón operación 0001 (418) [CANAL_VALIDADOR_SIN_OPERACION] |
| Ruta | `General/2_reglaNegocio/2_validador` |
| Escenarios con este patrón | 8 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano_en_respuesta |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=418\|desc=Método no soportado por el validador` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "1024",
  "peticion": {
    "idPeticion": "CELEGATO1784134396",
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
    "mensajeError": "Método no soportado por el validador"
  }
}
```

## 13. Forma `A.mensajeError` · código 425

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.2. solicitudes — arreglo vacío (425) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 8 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=si\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=425\|desc=Cantidad de solicitudes no permitidas` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0001",
    "solicitudes": [],
    "idPeticion": "CELEGATO1784134346"
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "codigoError": 425,
    "mensajeError": "Cantidad de solicitudes no permitidas"
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "427678ba899105cc1e93546ee7b79beb.3c761554f82182bd544c716898147fd158d38fb8ce7bded0cd60eaf73a507e18678626f14dd3014a0204e67f8019f3c2338b49afc60ed51c764d0f3635d09bf771804635386f4bdbac576a4638fc966fcf5b01522dac9314264bd37439d7c972bc99eabcbc334f3ee9b3ee571a93d89d006c3dbb17a0df9a6f476e08aa9e1dc90c46d715846dcf1f985462fbfaa53c7eb46386b2178a1f5e5047a70797481905e3e95936b0ccc66b54eabd4196fe45bd1cfb3f39d981d408be2d9743ffee713b85ef9ca474ddf9beb1476477a693a67c97849f10a664ce10379ba938159e1911a37551f79d583d27f847efa1d19252e1ea59cb1997da5ed726384c8e3f54234f98014b1b12325c3ed643c69da71253a00a256c2755b493d854d7921923a9d2a8cf03b4a6c6eae03664667b3ab6dc071b2ff0c61121931354dc679a62173e8698e55d2083383bde17d9427af198c8871bb7939e889780f83626a9360230497af75aa21b200a0e31f4921edf461be1e88054068d7163d89d09f93564895d63119ba52b0b1c5a9141699db62de3de86444acef76ca01474d82979b88179fe3ca21479e0ceb20b819093585066cb2959eb64318169f51e447384764e80f10defe862a35794c16a9ae06ba1108339e4b1159c5113c6ddac27be09e136fa2bc24f4dd2dfc188b208aac3e2d777a22e49e8216f225408497d505738e761f570d47dd29c.887ad0f20af321b19ccdd2eb5999af295dbf210ca64da38414bbda70335a109436dbcdd8d658f291f5a39d42c8b7e472b4a1b1c6c70ff21b4f43a9ca367844213064873567fca1c3b5f52cc16a32ee0d"
}
```

## 14. Forma `A.mensajeError` · código 431

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.4. solicitudes — sin propiedad idSolicitud (431) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 92 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=si\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=431\|desc=Campo idSolicitud no cumple con los criterios` |

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
    "idPeticion": "CELEGATO1784134350"
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "codigoError": 431,
    "mensajeError": "Campo idSolicitud no cumple con los criterios"
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "fefd0aeda320e6f8ff3dc67412c14835.98366f17a116a50109abea938809ecf77027d2c19493d44abbcfb0a993b356e4f9ca8cf10ba0ae012da2fe1d0e566a7ab83e985548dd9f94710c5fd023bc0bc4db99343b802563b3516ef25d80d1a6960235b41033de7d847051c423805d876466aedd272b16eb2f2ddb8a7333525123d4986285c0173e7b2cfdf2b6fb51374cfd2be9a454a5f39cafe02f5e809844dd800480e636778bff8c39356fbb64d2a4c0991b51d282aa293987f72876709baa7238958a4cec6e49a6242fce840d3267677c41e07cc9346d52919fe522167ed9a451d3999fba9b176a2200775e69d877490a9e283b9d10025b4ec43dd1bb57fc929b148f41f3556dc1341c3ec58d49c85bf1ac937f9503276620dcc6a69d132c680a882e05ed1bc68301cdd0d27fd836cccc8882c81eda587ed3ee0dfebe0bee8502ea93df236160c419a8dddecc3ad49f2b926dfe8d45a4268d27f908ad3ac8ad995666f6bf088fe6ae3415c51e8c40cd781795eaf356b06ce15936378f5aa07328bf87dad6ac33d57a65dc401e867b03811d02960a9c970c3c1febcc939370365b7b17eb63b7865f071a5b51963145145afd2b402e138311ed24d207fe1ae9068c102c3fff2fdb03dcfbaabd09f0d8c3dd5fdb27ad5e1fbd52d3a467fdb3953a4e3265f5bab08319f8b642df4b568ee679f89c02fa7396f57101929355514ade4ef1e6a345cd0e1ee06294a45ad8a3.1b8d07ecf7d5611890d02fd1756d14ce6e0f54cf74ba3d00e945f09a9fcd83e10c8ead7849d8d706ab40434fea8481568fb31dafd8ef567f73ccfb5844942ac58fd273c3021e3c3ed0cade0a2c830b32fb05b4035a1a721e092b5eef1d2d7356"
}
```

## 15. Forma `A.mensajeError` · código 481

| Campo | Valor |
|-------|-------|
| Escenario | 2.4.1. metodo — no está en MAPA_METODO_SERVICIO (481) |
| Ruta | `General/2_reglaNegocio/4_metodo` |
| Escenarios con este patrón | 4 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=481\|desc=Método inválido` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784134409",
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
  "codigoError": 481,
  "mensajeError": "Método inválido"
}
```

## 16. Forma `A.mensajeError` · código 482

| Campo | Valor |
|-------|-------|
| Escenario | 2.4.2. metodo — negado explícitamente para el canal emisor (482) [CANAL_EMISOR_SIN_METODO] |
| Ruta | `General/2_reglaNegocio/4_metodo` |
| Escenarios con este patrón | 4 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=si\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=482\|desc=Método no disponible para el Canal Emisor` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1018",
  "validador": "0001",
  "peticion": {
    "idPeticion": "ARCHGATO1784134410",
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
    "codigoError": 482,
    "mensajeError": "Método no disponible para el Canal Emisor"
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "dcf4523a38ac84ed029ff3ec6b985d54.95bd2ec540798b904f2f76de747067f87496f6c132456fd6cf3f41d95c672328f50fc0d5d145685a8765fe8030e466ae8ecf86c3aa28dccc7a3eaeb8adfede82b951334f340acfaa7826673eebee0dedcb25a38ae8337e357af03a9877f53c61060df70442f6e29ee3c27acb2e34554b3fd270e86e24337a1f87a61bdb76c40d38789d2b913d1e5b4483bad921dda43572c6ebdde2d5ecf17d21e419e5bc45e498787a58a59b96696a5f1fca4a511bc024864f23e5da896187910bc12bdf4136ce43762f2f7b05994665f588b70443c519df9fd9540fa1d955a35dc32f5369493455a6482d9ff4dc22b911f50b0715a1b48eed940a483596b8079cd18e98049c4e264362b952c0635d95e3cd02cfbe145c9269a32d72433eb2772a8d903e42b46651f7c4cb8c97c78bedc60b809572aea79ff3b3055d6672acae418cad2001f754ed6052ca3d7ce001ef8e3caee217e1dad353fce796071204483a29f0ef7c95dbb4629b3fce6a235910a2216de78dcc243234256b5cb73e4eb8e49100fe97125da6a56a949040db83350187b9de9fe05b386249cf75a935697f8fa5f0250a8949fa9d69e4db940d9693008b18b80e13cad0430353befcfd10e02faade53c1a4eefb0338bbd03901606a93d3b59f948e6461099f748aa1d6da1709b34d85a27d1d457c6ae94328d0c59b87e4e663d0a53a34ab54f47b53d34cbcdd1ec7514993.0b09e0aa1c0009b0b706b75e986b33f5e15335cc31269588bead6cb19457dfd03ef495e296bad6782428da53af3191347de8466fa92e71e3a2ca0c3b18b5874f887052eaed91dd971295d39179c61501"
}
```

## 17. Forma `A.mensajeError` · código 500

| Campo | Valor |
|-------|-------|
| Escenario | 1.2.4. validador — tipo number (400) |
| Ruta | `General/1_validaciones_js/2_validador` |
| Escenarios con este patrón | 20 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=500\|desc=Error interno` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784134271",
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
  "codigoError": 500,
  "mensajeError": "Error interno"
}
```

## 18. Forma `A.mensajeError` · código 509

| Campo | Valor |
|-------|-------|
| Escenario | 1.4.9. idPeticion — longitud 7, mínimo 8 (400) |
| Ruta | `General/1_validaciones_js/4_idPeticion` |
| Escenarios con este patrón | 32 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano_en_respuesta |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=509\|desc=Error inesperado en el Canal Validador` |

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
    "mensajeError": "Error inesperado en el Canal Validador"
  }
}
```

## 19. Forma `A.mensajeError` · código 599

| Campo | Valor |
|-------|-------|
| Escenario | 0001.5.1022.1. validador PROXGATO auth fijo — demora validador (599) |
| Ruta | `Metodo/0001/5_fallosIntegracionValidador/1022_fijo` |
| Escenarios con este patrón | 8 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano_en_respuesta |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=599\|desc=Tiempo de espera agotado al llamar al Canal Validador` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "1022",
  "peticion": {
    "idPeticion": "CELEGATO1784134903",
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
    "codigoError": 599,
    "mensajeError": "Tiempo de espera agotado al llamar al Canal Validador"
  }
}
```

## 20. Forma `B` · código 0

| Campo | Valor |
|-------|-------|
| Escenario | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) |
| Ruta | `General/1_validaciones_js/2_validador` |
| Escenarios con este patrón | 640 |
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
    "idPeticion": "CELEGATO1784134288",
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
    "idPeticion": "CELEGATO1784134288",
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
  "respuesta": "1ee1cc9ab2e4f74678eb27786e7958cd.a1ae10a0428e180c41f118c81bdccdea49168a89abc501db80b00194dd91ff0522c5c76da66ad913deb2258f4181da4bac0b43ee6cd965156ff6e8f7953753a129c73cb7ad2f6951ca9ccd32afe7af15df09bd842b36cbe740f774a63c9c8174b2c337bb14fb09e2e15e4af60a6ed761b7cad4fdb32c757145b87d9f90d553ccf264963d2b72f9e7d7d6f7d861d86edbccde37b91ae728b8e87aa7fa302d893f879c42bbf85a4d37673d7750a441ed902f605b82930accf0921e5929f577254b0cb192786ad77cbcf30b906f5e35da814c3071e9e4407c67b862428d8eb1232264d805644021d21ec2a0666b30dd1d59ec82ccf69b8218283478ee98c9b637405b97a8a5c9a71123eddd28f07dc80e2277f94afab39b5d2cfa1a6ecf71ae9ecb7ef2b50a77db649b69cea0ea31900cfbf067cb4ed05da3f39b547e7e0decb83e7a6a46706608c1c177859598a00bf545a11afa0fc80d53cf4672bf5e63b561d1b6fed679f9547096fb1c22d67650896f7b1a2dffccaa597dec06096e4974c22776e60041dfad919772a69207cfc5c7772a32dcfb5d763a1cfcdc8dddfeeacb89940e5de434e8b4b765264b96072291303311f298eb862ac117c8e3f43cbebe2cc7457755507165c9d49a15e73cde0bb4cc8c7f7937b51c2eb370b17c88fc98d8443326507b82cd448405345c0669c3da078f748a59a713d234e1fbb11ffaad5a.2bd56373714bb339e6965d3f124f9c8927019cc4f43fbeebce83a1cbb860fa7a7ee8c3b6b9a66c9d60032bfac88332f44f854912c1e6404d55a7848c89413235e091a169abcba9792d5fedb6d5b313e1dc62f73a7ddf3ab722b052b124e941eebb579ead78b1e9a3f68d1bfb7d25c7bad8b46c09aabb58312dab1cf6abb8bb289f20107175dee131480a43d04bda8b99d1ffd5833a66d91af1279605c2e6e430c17bd4ca6d3512726e245876e0e0aa65848d7451a3f6f6dd6d07c56252ccda0133501170eb7f41b7f045f05054d3eafd37dc37e911a3afc53e4a04f1561ea8cc"
}
```

## 21. Forma `B` · código 413

| Campo | Valor |
|-------|-------|
| Escenario | 0001.1.1.1. cuenta — propiedad ausente (413) |
| Ruta | `Metodo/0001/1_validaciones_js/1_cuenta` |
| Escenarios con este patrón | 80 |
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
    "idPeticion": "CELEGATO1784134412",
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

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784134412",
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
  "respuesta": "0d95263364ed3cb311aebbb37cb2700a.a559762b9cd06b7c7f2a4a2b3a1a8027aee150d21c726f1c2d03be50f80f6b424d23101a09f191767afd16a1f66d3f61e9fb23e3fd1b1b696937f37d61c4ee79bd30e60395f15eccc8d05f5f457e04e81c6b3c6485a71e107c87d07ba50262310ee5664290e45b0bba507b2c254ea86405a92052c1947327edcfcd25ea89f547a5c470879d90c3beff4d82ef6ff722c6637ac606c375ab982744d0bcb08f5b95426bb8d1a346d790876f43237bd67347a7ace89f2c623565dc9fe3458db50bd01bfc0c96880b4be745bec79967d092d5aac2bd7141a52ee0da3b90e46847e9c8425fe172e573eda5a964d029376e53a8c17c350de14357214ce040e03ca0d8ffd09de4733e42a949642a5f7694d87c11d68addf3876b891386f225224b097d7dea1c7eeb428b80300f8395217dcda1e9b16d1f5901d30a672b0296922d4bacca78e2c8c264a5a8b181a531254c4f812a50db65b70580d75347b4ff27b2dc931452cab70aaa25784d010afbf48da7f9fa044631507c6b0b6fc2cf4f54af735e8e2b3aa2ded78d62d9264d69492ed8cbd2d8afa12e18e6a2e13786c19166569b24d4d47f69c3d76872ef7053dc9cc2cd31a9b3f7c1c5b7ce2c510b6d4c91b9090e408c88399343838f52c552cb75a6777e43a1c4d9701efe9c4ab4948056990ece55cdd21b3948fd2d524fd10051120b47fd9187c8a09f098af87dfdefb882df9a.2eb1d966b28178e66d5c57f8d3b6d28bf15af3c493f56a25dc47eafb0c1a3827ff618f4d9348d0ab7304e28bddc525705ee97369d491dc6c416167169439e28e2c688b3b010696b5f9c20fd7a3bd97133a37008339180d1cdadcd9b4b4b14010753d978fa190f3fcf6617e2208c2efab"
}
```

## 22. Forma `B` · código 510

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
    "idPeticion": "CELEGATO1784134448",
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
    "idPeticion": "CELEGATO1784134448",
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
  "respuesta": "114109f818f38d871690b9d8282e96dc.0db0ec9926c4664879cfa239c31e95e3f6b0cf2bc143ee45916e93f36bf18ee68aa67e71dc878764dc5c44e508966dd89db095be739021540a4720ed0625d9dc0941b3100a29f94a522947875462682e051cc57410abc3e80b810ee3af59b297006d418ef9ab961b60478201e9150fc993e445c68ffea7613e65106e5ad6bbab501d70be153cf537952ef600541384a2f86b67dc8e87f9adc14cc9669203a49ffd544a29b27c136ad3bf485b09dc58c5052b6e9f0fbee82fc2cb8aa6cfbcc57e0f2d299a48f7d15992e118e21dca07410a5ec8d70bf6289b63034870c8b02f3ac38cfd5ba5022875b0415efe9cef28c4bbee195b855c5fc5c79fc3e0129f920f346a668fd16373df7f0ec54240653309d5b287131f93e3f4ea120a9470bfdb2c91350f1e362f30c2c487631c760e78a6046cc3c0a5d82c1b70d246b8fdef4fbe166e51fabae9d8acb168e04c284d41ccc19005ae78c7d16a98cefb1a835b58cff26e64eb213de158b3e8738e1660e886b53f74b233e7e393573e30e295114fe4278f49d595ada395145e9e26c605bdd121915d214e581db67bb38e032c41e7533584b32ac490a42a452cd86de77804a0220de08a4e8e26ae7219362e99ee5c5d9d6fe29fe9ce287928412f48f2f76647138d13712315aae62fadb850fe52cafd966e881d8acc906c35f4a9aa9095fa8a22223acd061d9060687966e8c504e060.cf5cd8fb13737c92b15079367df6f7606fd795f21c54d36288e201f4496224d1fe8e2cf965a9dd32bc6413dd87554dbe6cdbc2920ac3918b07ffd560db02e64108866788f2f0b1aeab7a3d136693c523493735c7aea5721b2494c038613c135cda546123b8e3ab9a009de3b9a432410e"
}
```

## 23. Forma `B` · código 511

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
    "idPeticion": "CELEGATO1784134451",
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
    "idPeticion": "CELEGATO1784134451",
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
  "respuesta": "27857fa1861642f5c9e836f25a445bbe.a139c6154f930bec208015e5fd4b4ebae1312cbe61b1f96376ff4fb7b0deb12f319474e5922de3b3432a6b904070485ab816db383a63cc8ca63f51ad45a4d6a247d92ddf2ee69a4dd1ffcea440f162f3e4bcf2c0e6c1dbd4c3a0e1eb83bd35b7d2eeb2b384b46565629e5c5f3d6fe4e410e73f53ac95603c48859cdb44d3bd01366c8837f87fade22138a43f886dcda2195d7b45ded271a3eb1b495e22de5a7885598aee5aaf631e03e6b79ca728bd3cae6fb98772ebf944e47b0d65814dc688fdca4afae669fcac460bfea270c33d922bae90022c3cabb95491acddb1ae8b903b2400386ba67fa87c3376fa4461551d359334ebea8e204ec6add0b98857a867ad6a12557714e77bdc544b023bd02eed63088868bb4672c0763f6739510d8168c3580f3c6574f45d2094e35daba79e07297de9347d9a1aa49a66253b5a20107b55c9fce8e2a6cab7a420d6227905b9e8e6d35e64eeb6147a86fb5ace0168b60ed3e99f773574e0080e9216125a13e97944f7854d55cd1b6cc4c606700e20cf3087dca63c9824a13215dd4765a72eb71dbb3f916ed79f36a47623822377782301749cff3472325a843fb39a9fa743d885bfe59ea2d3dc3dc618b1dd3007917cf6e4436055e1a00478e1fad8d726606aeb698404d06a3377e5c9b195861640ddc9dd018d9bfb9eb6a0871cfd19eff99add468f0fd870ffef5f288430a99c537a56.fa4e41566895fe9e27eaf950e0ee412cf330bb0ea0a78fdaf6a3cf20fda0d904a415aa65a7a6e66f3b8c94b12c14f7023705b2ca8d1c55108337abe3f58f1e455e1c463058b9f5a21046f574b26075e36f8a74ef4839c1311a8c1530984300320cc4f5a145d0cf3c716e6c794741aa86"
}
```

## 24. Forma `B` · código 512

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
    "idPeticion": "CELEGATO1784134454",
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
    "idPeticion": "CELEGATO1784134454",
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
  "respuesta": "c0c16dd56144620b56651446752884b5.b87cd1bed55eff51ceff0698a05ced1aad4c54ca32958a3056a244d50a4bfe70a965d0b2c68496236d82504f13c6a5da6123c6727b12da2d42106fa5b871edc79c0b1137a5cf58de9bdd2c4ef9a1218362d1528b708f4e3f6b288259b52d99b67d22736c5d4f409fcc519ff1f409fd9ca4eae4e4ccf2de71d4c267920b4f8c2008cf3f164860c2e59b1215d49ba1f124d3e2c59867b68ad5fe1a6b028b67417143b5e97f9c97b5fb198205d50ac4072b68f7f2c7d0a0ed4ddebfc017fb59bfb9e063c46983dd4a9024335ed777c9683640a8d03ac869e8d435142ba9bacbde2022e9adcecc21da552ba3fbf62c78c7c4ca44308a8a4ca27136d1e643c8840ddc5d20f1b5d55d7234ea93fa0906439f079e678661a01f3fb8d41649e49b84889463d1eac32ba4739652f5e197ac294e29e50f3cfcfde6bedb552a9082b92082b1790a70d2d0fc2b76479ae33d0d505326cf60ce6e7e429696a0cc7bb02c53c3d3c35db79208bd9aa967102e8d86d1f412207f7853e3759cdd967f52b9ceaaee72d87689f948dbf2aafe9874be7326c347e6d362105d15036fc0f28a064fd4f36c44b0d8e6fe01c9722ddbe7272b17dc7a96efb4e10b87c49abb0e3046ea40eda5d4f58678bc849e34a936c8c3f721b8cd558fb3949f8439c5bd670e02de3c77a311f0d164055a5f05f667e4ba73045dda69e97ad124b4d110e62e1adb455e035d.ca1d85b0305a37dd759532b99caac53f5533287ecd17136780cf5b23a955514b02a68a4e3896d3c8534a3351ce264aa79f34a367819c15dc727aef7451086b676f1892e7606ec73a314ede61dca8011faf91c1af300891d1dcb7c078afb570e480022a10de1d014d22dd8e6784c844e9"
}
```

## 25. Forma `B` · código 513

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
    "idPeticion": "CELEGATO1784134456",
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
    "idPeticion": "CELEGATO1784134456",
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
  "respuesta": "51fadd2f307bc4f48b27f8009af5e7e0.80e017f293e7c5270952ef773956c666f69d68196063b39d8024b5d0604ace98c443dbb7c558e4a8163e2b9ed7d2103ea7f8074eaba26f65b090b1c870840397884b157618ddfdfdc322601bfa61690528df7ae93acc09b8bbd836b54305f1f52a6cdcc8dee07096f5c0838eb25b3e9a13d4dce6544468d23eb676f0d0f76d2963b31fc680a1f226ef1ddf1ea4be1f7aba7c5e1d01d852c2bbc5e9d766aa674f135b6dfd09fde1ae1e3bc1da9a5235189d27f7d57a3b869cf813e459aa5d66802549bd664edddc6388a890d3c0e74b742aad043c33b78d7daae0f89ad0b2943b8bf1ceb2c800430c5487e4ac8cb02168b33a026725755c716f9e79288db978e53ed68c60375263e710c025300fcd82a2c0574ad7fa74ae29d7a5c83409b644957881987696b86da7db5fe34db0a69eab26b4ce0f277e82e6f2d31ae4303e0650a65ef2bb7fd270191427bae20e4a5687a6cb1c7a18ed9258ea9e86a0549dfa7087c77009706fdc14ad11590b089909c2989a29fa252544cf196cf5b971a7e2439d5fb28f27603829a1d8f0578f2930d0b4ec9eaa7257ea8d31322b8cdc8f4269c5b599dccdd6c3aa0ac6c810f7159b21979a945983ec302f0461e757dfa0a659b8dd68850588650652f2f5b39b1ac8c42afe69d4205fa0be498439a52172c4d15cfd831482eea798d892feb36556b0d95d82fb426a5c482e7fbc16d46880982d.8e276039317e711a7247863df789946066796332d86af804f8a88af3e7a6b715100cd34fef5c93ac8d6834f80919ae472e5fae487079e2e10f69cd87bf73b744d40d44293d9c92a596313d7defab42674a583fc3feccaf7a8caf0c45eefe1864fcc5cd831b185aa45838010c304d1132"
}
```

## 26. Forma `B` · código 514

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
    "idPeticion": "CELEGATO1784134458",
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
    "idPeticion": "CELEGATO1784134458",
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
  "respuesta": "bedbab724d9a437fb55562722d8f04d7.3ebedb4e318cb7bf00fa58ed2f6beec10014e6416356a3b650751137baeab3b559e1eece8b05759fb9033663e7ab3109a35d8f393566afc54bc001cab484bb038b88af756f96e751b7fcafcd1b1e6cc733da599a63efff0c5b3be56062452645987b8bea2d57745f3b1e074d2137dbb063d805003063b6964e2ab4ce54ee5205c050812dfaa8213ab4d174c9dce0db1e39ddc7433c21ae8431ceceb827083d6288341e0e38fec7061aeb356af6e2dcff89d287e4ba21458811d9aa801be051ab3721b285f4b54950b5811ecc64c8f2ee130aea79aa01705b9e2c38bca915b68b85a215a41e5d87bd82f45fda6c0baa162791ded9eb11098cba97f1f41763b982217ed74e670b353b96145719ade57a25b6cb116dccf8666af09eb8b66d564182dd9c0645b9133d041e679c9388de970859b9e3ac0bc41b42ccaed04eed005ab6332c02e2df131f2aee984ccb02b4b7f2542300e36e4f4053434f2b033bf0bf7d3ccd777c9322bff4aed1d32017ad8cea6fd1de6762a320fb8f6c224d2b4c1b38b90e7721d0e191e33f5be7143cc95c5684117b9bef66ccccda6cd9208718808ca68632383fa0487eb9c11a08f996fda868929239a1d3ec74422a6dc36a388a3925642d6c3069bdb22a665474381061af9ea9c261141dae83ff680c49b1adfb38e55b5814f89b6a9e7ad5332d2f8d006233e0e0837271ad0a996bf418ec2c2617.34b6f41aac29ae5c5f4c26f1c0e01ed85269d4474069379bed749e4447d72336ee86aa3c0866355adbe80c1ec4205a6df7d450ff5f876c0cf1e48c44b240d801a5c484418658373e880325615cac8685749127ab007dc399ee0c4c3164db4a84904ec9e89206a40546e87fba41e5a355"
}
```

## 27. Forma `B` · código 515

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
    "idPeticion": "CELEGATO1784134461",
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
    "idPeticion": "CELEGATO1784134461",
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
  "respuesta": "1d9d4e11057ef1cd7619c6007a12fb77.1c14dd87c70ea285737eda4f65ec4c725bb4bc281fec4bbb245038cb6e5b21e83226479872bb00c62df73de88e18863cde23bf3b0443039489a114ef595de16c07f50f8ddefaa334286f0bd8b1477bfa224c6801b4fcb447a6fc1e72cffced4c0160801e1990f93d8f9681910cde5817bec1bcb1ddb5c2a50db58024a36d150432243194a5ebe056253fc4c5e4d98fe9c36e120f3a3c6c58b9ee8857de7caa082592636bc2013ff48d0e5aebee73031bd3abab52d682ad16baa33069415ec7c5e4b3d40b26ae28d2a664e2e4d0a0d8f363fb21174be8709bba8aa9de81f239b5aafe0ed366404b29ff6901b8549558804a0d104b9006fd33cacd7b6028788afe050de33e50f68e8bbaa5d959ffeaa09e6c6a7eb2c60f7bed6b42cf1326ba6d4603dfeeee3d0a902943ed77f6bfa4ef2c85f8d41f2af8e092ebdcbbbe4fbfc5098bede92ea9bf0bff49e2399d5ceda26b81f1bab49956d89ea3b547f6d5555aace201d50966181371b78c7103dbf2437ae27833b0009c0a9612447df0e72ec760004377823ce4b9a053d61691ebd554101099e849d90485e4b40c5679f26e2bef91c26bd32220aa248676b59da3e932bdbe65cb022200cd17c5fe4b388129ecc57775db432ce6ba4986bd9328282ce5f762469689ce8bafd39835b856e7e36e6ac2b2b2f917420f362acfc92a9121ccd898bd6cc207c6b60fe426650a17ad21f4.eb768c9577dfa246a040637f057773723e639ba9326494394cfe24c6af600956480a2355ddffba248920b5fdfb67ccf6f50c1139c334c082793548eb4ecb7315a6236af63a327295f66e99ee6df6117050339ed75f46e85d1c4bdcef22c5e54ef45f6baa9c83f99604b98c800938f6dc"
}
```
