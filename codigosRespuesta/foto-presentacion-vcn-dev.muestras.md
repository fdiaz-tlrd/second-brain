# Muestras request/response por patrón — VCN (dev)

Una muestra completa por **patrón estructural único** (el primer escenario que lo definió). Foto (matriz): [`foto-presentacion-vcn-dev.md`](foto-presentacion-vcn-dev.md).

| Campo | Valor |
|-------|-------|
| Servicio | VCN |
| Código fuente | dev |
| Fecha corrida | 2026-07-15T18:49:44.022Z |
| Nivel ejecución | MATRIZ |
| Patrones con muestra | 27 |
| Nota | matriz 3x3 exhaustiva 5_matrizOps0001 + Dig 481/482 |

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
    "idPeticion": "CELEGATO1784140687",
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
    "idPeticion": "CELEGATO1784140662",
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
    "idPeticion": "CELEGATO1784140718"
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
    "idPeticion": "CELEGATO1784140765"
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
  "respuesta": "069669c4b23820e3fa95f953384c2b6e.8377bb293587d26551c8b131bafdbe81d23382a37c28cd7e8ea87ea19a12a6e3aea76f6c3c86bd914b0661032ff0b3a1a9e88687c4e98e979cf724c2cba509b942c5f3f10caf0ce5548c2771ebac7f773129d932129b395792432471ca5e5e4164ef6e8967c368c3284c255f925767bf9971aea636e227cbaa16a594f69bf1f10a7f93d610932295d99ea0995fbc28b16cfc9325ab8e6adb523d10156e84111e241edd58ca3326bdcec46ab740116ca3fe0b5231a32bdc7c4c21b4658edcd213cd26f1647a524ed60cd7b98db935b517907829f06dc121e871379e28a8c0f5d3b3f4c59d73d786e319722cfd88abe48ff6c6769c26d8a3ac1f3c9afb8e601249d932b4136d3f35ad2e71608d5c4c2fc7f64713f5a4e9bda38cbd4621c0d04fb5f43c39002aa276ee408f68efdde86d2e44ac825c005e16b6daef319f55ae3c78ebd59e0bfd42f0528efcf2dd6197a789feb7f9ccb70c1daea165fac44cc1b6a74c39b621a989bdc3cc30c1312420648c1c4e5fbc6eab86c1591b869d07bd0d7bd1bc6eff1ea39b8aa3e0ccd3eb9c3e305e7f1f358843052c38b1ed9432affc18af226dea4ad0d34d461ce162b4d824e651685a9b97a6fb2db3033d1d26607db2ec875a882353f85e5232f65972d56ae9e689253c9d674782663535189728efc735565ae7ba1710f9f54f4f32049bdc5e452a3abb6ab379ffaed839880ce0a305.5c08125d7dcaff17e5ce7df0a8c5b1d99a8bdbb4621d9cfbcf2ae0ed99b855915baddfd305da83f1ebc4f3b61e39ea9909fe38254e4bd90aed55ff709febcd9a8605208d549722b54999e15b3bd8258d"
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
    "idPeticion": "CELEGATO1784140673",
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
    "idPeticion": "CELEGATO1784140814",
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
    "idPeticion": "NAMEGATO1784140808",
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
    "idPeticion": "CELEGATO1784140695",
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
    "idPeticion": "CELEGATO1784140723"
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
    "idPeticion": "CELEGATO1784141359",
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
| Escenario | 2.5.1 matriz (∅,∅) emisor sin ops + validador sin ops (418) |
| Ruta | `General/2_reglaNegocio/5_matrizOps0001` |
| Escenarios con este patrón | 16 |
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
  "idCanal": "1024",
  "validador": "1024",
  "peticion": {
    "idPeticion": "ANOMGATO1784140830",
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
    "idPeticion": "CELEGATO1784140767"
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
  "respuesta": "b95aa8ec0686548ada4e192b8512e716.8f06811f16b573451fe88f521a664d1ddd1a79d2d9c4b17dab57edfa9890943afed61106c3ac0d60d01edc7e101f8aff3aa1756087d86f76c0ad93bf8a59b48d03361789ab235a85fcf0b34ed08b54752c01599b977dccc4f5182f2a2ae3b4840fb0710fbf7c7f3a5e5c13351666b4792582dd4b3ac3822fcfbfeaeaa7720a98ec4657faa4f9292a81086afef9ac613932d4adaaeef9f2b378ef765f8444bfd59a5f2f6e6c49a685a6412213acc121c0d50b7d9edffd8eb6fada96d1123cbc7c0477b15eb75dca89a1dd5f2f8047818be9052d6c1eacd4cfd6e6697a5b5b568d04ce9ed148af635939299dd888b55e31e59a75ae6c6c739367544b233957240bb07503a2560b12d37a6a3f6d0acbfe28348bb7367ce00efbf66ae67a5ea9462697fc97ddca059a0a1d422f9e91c4a122bdeb10c0b06188eb7cd58fee55e5e327ddcc70b61a8d1e19a119da7745163f84540fb612a108464f237ec3f128422fb0e88064c691fcd3f517fc474b6b448f9317fa2f083dc4aea962a680301d2a1b66c61da91bb634fe005105d80981274550f4c74b08681bcbd3e25ae347369c1b699390bc103395f2029fe0f3f501b2d487f785955bcd23386788ae987c8e56300a652e2b154508239825968024e516d3ca1edc453e4611d1dc6902d064aa953bc967a7a6d7d929a6f5424eefd8b31b0463cce890bdcdaf9afe282d5d788621c12e.3414253308795504418bf7d4c47ef91d2e5c7fe52eb35388fd6e3052208f94487c12d886e233e7b1ff801f3cb993accb44dab9acb424d1736b719ea999ec2911dde19f78110f9f64f25051f77c9471cb"
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
    "idPeticion": "CELEGATO1784140771"
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
  "respuesta": "5345ddd935b355bc298aefbfd4d808fd.d7d8f233a2a3eca0ea5af109105af6befd27dc1b2ab487838cb881e876e62c4693b1a9428352da161b598f7b9dc5ebb2cf92ae0791a644f622a044841ae58ab73cf24c69a0aff49af9700e316adf1bb3d09d049259ef73589dd9a0b579e347a1038052876af0186cfbda8c740aac3de0fdd18d5729d342d79eaa950a2dbc3ca127af5c47bd394fede1170383341fd9a997360ef4f47722ca5f6a5b3fb5695e919e079715b9c1a66df41112e96471e21f49131ac5b3587f085afcccd3248b32b41f3082cac6b464e0045e817c3b02a87a6a3ee15882c9952bf65ff3ac28494f81f6cd87c0f910ab675e02d5a085f0295aa06ecf4b9ad7acf452abfa3af0140806657904ede9a1536237a8d5e0116fe853da54fbf1ad764ceb6a4a34cbd096d1ac6fba2a5eae97178ea0b20ebb54a37ae906ee519132e15271b12a5c236b3aab355161d6acf3e48f456c161745ed1ecfe7e2f48e73b5c8457c909f774af7e18c61ecf8d693c90ae11a5c90ee4d09352aca14fff14ad93024c2f33b600b3bfba16dd097ea7d378abf09bffe0499d3fd6d9a39ab1122619db94dc1eb86106333e0fbe0c821af4d9f26a5f8bcfb1cd0ef5cd56ae548d6fa606426450054435579a3e664157ec51c11800fb814c93619590f61ea4f3ef1347f1f8865c60ea02f52b3032ba2bd03300e46ff321b6c7d7a9a181d8b461e1601d1147f5d5dcd4ea719f8ea.14e620491493346da278384215975c9d78d2d9dd6b8549c6f4bc663d518511b0f8c311d2c5142d1ffc44980db6556cbc910c80ab3904257119173a8539ae2bf9812dd33c5692558039cd3e07de6efeb757d8403315752d7219ecb175d17dcbca"
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
    "idPeticion": "CELEGATO1784140826",
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
| Escenarios con este patrón | 12 |
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
    "idPeticion": "ARCHGATO1784140828",
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
  "respuesta": "aa4f654d7a65838cb6be36ee993c3b3c.c8a627a5359437778780c56835f14f511c59c3dc2dbe64424f68d300009d71c0c22fbe8b1a9fc5fde28b79dd5fbfa07a18ef8604b19a44f5fe2a638bbf8c0073c259b13af6239ac4a700b5789d707d3e48e7531ca886f9721780e4ed0df7f12ddc68f6457d600bead561ff521e09c0e0dda5724d865fb3f31286e0f838fbb20f2cdc25243204eb33cad81ae24e7de264940bf1b7b25d3c822c7dfb7cae5cc46657bfb695a4f4e83d0e3b19b53cbf620e76a871abbfa2e77543b1e78be1a31d1583db473d8e3e4f517983a686b8e27f9d953844ae6550f129e10950f2e1d84da4dc690208e69069d232f19f08949555215ddc44e9b4d19b7a93764e2591bdfcc7d5b275d8cde7c78c823807de27468969973bee0153b2471c4aafa57ae0749c1ffa56d83d49e3863448239d96ab96252271cffd90d85193cedbc3138f53a614ccd5360cff5208e0c04e485b36698350062de00cc0b3c4d62aff137d3f4b1c149c841b63eab72db0d9d09c6c7a55cbb4d4e2818bceca9c53f6b89fd2db0098ae625575420f4120abfd676393fbce7eb8fd8b20f94f2959a77e7cfb564f954d66bfe98a2cd2861321c581577fdc447ebf83744310344ef5776224b51b4c7d41ae501b64a2b42c3e4934a7bbfb35659e2fa526e85ed300eac425d5835417bec5bd67b2d98dc97cd8de47308c8b0e8f13d1cbf58c3265c068cc73071d54e4955c9a06.d1b630ee971745c999781903f344abb2caf1b86f578c6ea2b403a221c863d5dca2611734ab8cd6cdbe761365ecc09388a94f0b480c076048e6117366a6b1a0e690474e7c9036e8fe9a4c75311662536a"
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
    "idPeticion": "CELEGATO1784140691",
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
    "idPeticion": "CELEGATO1784141347",
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
| Escenarios con este patrón | 644 |
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
    "idPeticion": "CELEGATO1784140708",
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
    "idPeticion": "CELEGATO1784140708",
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
  "respuesta": "28eee2d83b3356fc2d70003635460179.9b29a2e5764e01dee7c47f0066652bf5f9eed8baacbe8759898b467cf8a30145a269e2fb0be5371bdc1d608d1dd07710db1c9441237516449bfe5a008d948a870006a6e9e01aacd87f2f040e078857ea02155a0f967b4798ca4391cf9cb19b9b83f30e6ca9b1fb9d8b3701d95bd63e2553da7509e2fa51f59e79899dee0de72aeb15c68e6f261d2dad0082848e1c84bc8db6d18cdc9b3163083437ea0ac06c96d071186916191d9d1a75048955dac621974acbe3e76c6abf4a21ddc16a3f3bd33d2c558b45d9d01b0914821fd42ab00a4df8b119323acb29251fe4afa8d753ff5c0bc8268d68cb81bc49d9f890240abf725b5408a3c6f398e172bf5beaf656ba66f8115b872aa052d8a131fd109df34d16ce74e5471afa44a64ce28add357fbb92e283b29bb312ce5b57feac5a6001a8d2517b52bc902c7f932c6e05b24f52a0778520511de26f4aeac5ee313d006cf3a18e1d64d7863fa6c88b57f703d6a1fb4475ccac487d7f147f0da2def43ac020a64b09801552081861e2b07f092e922f0a7b0831e4518d8b039b938f9880745d389b56347529f841b062cc3c3c72de68ba530dcc84e7953bfbd2af26e8c315b65fcf81470b15f5eabf4cf9fcf24b8cc4e0f5720dce8c84fc479a19f9be78bf9971eef749f30eee6f556cc67ebe16940e8c429f078ca64a20470b6766641c63355dfe6a56deef3737ab32827ecd51e2d4.2b368165136a4dc69c57f75ed280d416f1b6e0f248c6157ad4586a7b3d15a6138ef9057e895371d7096e5d793029c8b3a41c03e30889269d3967a3df68986237d5af9f6ebcfc6225f5c0c913f9491bb3f9851c60364ddf5f8ec593181215d9322a25d66fd21e80419158f7336a4096a0ddf424257142cd86eb75311689e73a43984a0776530bb2ef92e137e68e6c66c55da4242554775a3d1f60b8274011d314ca11fb30504681774d0ec740cfef9f0176c19d4df7831064581fdae5b68c98a19a647ad31fcea622c179974fe9351e733ae3d10a38b9fbb71db39c48bd55b2ce"
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
    "idPeticion": "CELEGATO1784140847",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "3f42e78e1d158baa1f5d9328a9f33f1a.83c0f7af3fe27d9f18a636b2e3f3d0db0e0800b72d3a945259b3fed755264437ba3dfc1733c12cacf793a3bf33d87517fd8f6d8aa2715ddf6089ca8a5d167b817bb967e3364d45f3143db4c17a69c6a9ec2251168ed9cd8c0baea910252857852b4528faec0568ca970283dcdff80f252a618cfe7a462b9ed63f1d0de2aff0f1291413035efda5ced19f77d6086c11e5ba76b291307305708e50b588876e0d845dbd0c376905a2d56dad82acac07ccce7d67eaf1d44194a3259aa925b0981395f1ff127f1f03de1dc78cd828dcef60898a6454fed1e30b5367696b9a8f298de5bb7d53689e9c2fcea86641e0ff60670da312115bfcc5158787dc02c38cac76c70b7534b178b609b703e2350d7d9d6d8e1ae498ee6ea6f21ba00e9d9eb3830441fddb87eb19e4d78b980e5cb20bc84695de5addc9c9dad0ddfd2cd826652e89a2841fe8e50bc69371bed39a56a967002c4eae261f9aa06984dcfa4902e09952fcf33c027f3cd7f50749bfa7d2dc906dd13f4a416a043c078269c3b2be396412f6bb1dd610eea5da695c9b8723f39968f4c3e8f14d6ed912241d69c7db1486d8a93c7694ac50aaa3606943379f42605990008c413e067ab4defd4ffaf06e5758fa045a598b6d03b0c61e1ad03fde5ccf4c6c5c80f6db10b390db6fe1a9e2a220e8e4f2fa920ce726e9813bb6b6b0bc13b9be733cceef722e508cda31491111a995.e88ded6ca502832a961bf45d8653fccde8fc61e3d974fe517754887560eefa7fb07e041dbe4ce55d7b0498b9a898488757f574eb30994a2aeb2c292ea30ae3ab8244778bb5f77e04507043c79069f3c18073f7ff4975c00695dd995e78611ece94c92f953cf6e0583a9e7b2ad1246ff7"
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
    "idPeticion": "CELEGATO1784140886",
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
    "idPeticion": "CELEGATO1784140886",
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
  "respuesta": "4e47be7e287d44018f8f84f42bf0a958.08144620ddc3679a63929ee5726ba45135156ff1dd3b364079eeb535d892525de4b2f82335584e3b775aa864f94033b6233f2120686dcc1e4661498ef19d0732efe156a16201c9b4fb735fe8bf05cd7c0f0879db07893b7d8a0664074b6eecff586e5ca579b9cae877ae29adfd329fbc040abd54102133e0568a0bf8654f9b482493b43f7290467b759ecc15d6dfa691782927514911542ea243818c5da22273020bdc4a2f88ba188a61bdda2b1c0097ff013b898939b3d24ccd326ed5763e6bfd8ed402a648e728d622e53c69181f37c3959a02dcb69d4aed9475d43f18d4e32510c78524610413f801dbbd1de0043946315e005f8dedf45efbcf4ab07da7019b2a4f72f683942c9ba6cfdc3c57a4f00853e624b1a94e102c05f4fcdc10fe7bd4b98d7143262f5721a7a0c914f50f173b2e326146d4dfaf7a7e6068610d74fe5d0ae53642897ca272e6f7de45bd3c7756d4963f5adcfdbefcb8f6cb97995133062bb1126d5d87dea847d7d42e9c28e24eab44c874951280c8fc1803000382fe1b866ef7c74fb65447201bf0b3648fb2f2b1e4d8cd980c6f908ba629472f7a039b291db19fbdb53b805bece15167bd8f820d4e2a426590126af62cdef49b7095b09e1ee467b1b285189491c28707d1835b7eb441962c7a342af10cd5a1e9039b862a596fc5d6f4051b166178e92d73e56b6e8b6436fdbeb66be2f0324fde184f.80da0b0f44dbb050b29b74a2ecc5e968e73495ed1e4849bd2a98033cbd96ce3ecdf7d90262347eb78fb80c63608d269232e2fdba1a504822d34b31b898439f486d57baa284bb8b5c2ee2576c566a05568253b40d1f492b3a2f008c8bf5507249a146bfc97fd73d09eb477b4a80233d40"
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
    "idPeticion": "CELEGATO1784140888",
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
    "idPeticion": "CELEGATO1784140888",
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
  "respuesta": "b8439c372dfd2bb0120cc18519545918.974ee1f36c9f27a31e0f9509a58eac952f6bd2a4cf301f490abf69d019265caea2b0fe979101f67e444acf9a25be6c2dbba3dcb9a4a6bfe0cdb1037fea7c1777acdfc22a9dad760aa8cc5c7450c18d4297ffcdb014b849ba940e863e85adc7fc74b7ceb13dbb39218444bccbd39fdcf268db59df328e43c53a0d4a8824dd440f2b813cd2e429755f47de0275496e35a96a25bc7a18fbe6d59f211489432e6ba9fecb4423029d1cbf163cc79d901f2a733f2c32f4396240feb179438f7caf856ffa6cd211522be064fe52260d7ec886d474b9686f2ec78f25c48b9e26183f068b43a644176df2c5d0ec2901f018855c1b9499eff79e532880eff24930f37d41fd79fa85e1c0f696c2363439735efac9072fd245737eb75573065d5fc5808360168504b776cc60f6bf6832366270c8e7a710a4c52d079f3d5c18a605713ad2a6578fa1c1c42c6dfb05e20180522bdcd048ce724de1805f2f2578eaedf65a000ae7d3fdd547a720211e472270283d7955537e4a53c3b49e9aa67dd5e4a7a7367a94946c6a8f7be158c3bcabfaa1e52da73c4c02ae4e6fb7d18b78f669052553db205581d7d21bd32ce81da5272dce52c65a70e4b1cedb43cddd53d842fbf01feab182438408668d8e45619487077132c332e40761472eeef6232c4f17c6a555f26190c38a4f4995c4d8d7777992d9d9abd4f3bb244f9e29655c3824992efeed07d9.3046bcfb1381fce87e54c579501aeeb0a204d4d7c5ac8eb426739cf7a9cf2632735262ef1a040535cb938d3de97f89840288db53c3e768352be71bc92a0fa4ccdb96c13b973628df020a8c3453528251b7623b95ab170d0c25529cd6badc5cd71ee5c61558685258c223040dc2184d7b"
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
    "idPeticion": "CELEGATO1784140891",
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
    "idPeticion": "CELEGATO1784140891",
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
  "respuesta": "e1d54cac9b52ef3ed0ff274209f9bf18.b3e673b319e81e8875ab74703c3559e4cbc46a7a73ee482f4d5ac8942e902a12f84d385b2c97867d300416fa6d807bab1c6c2174d94e020bff588af6e072e3404cf217f482912930af3dff9fa930a3151428751292edf4ef5308ad881bb3f53ed3868b95c25335c6355c4921d4152a85b63034891fae5817cb65f2dc1787885808831e1d09346e7b17c2137106b180d993730b35d3f31c0b794ecd5a804643d51dc8c9dd36dd83753a3de368e6164ac582628aecc9872bc50f42d0d673f9eca57e52a7899b5d208b6b6d59831f0be3ecc95cd1869c22fc829abb41f262c98800e2df0726e279b2db06e9be6d16fb9a578be7866e55e6073687314451b62c14286b30708b1d07797640ff955a0fe912afd58822fc146d5e41dadda6848698c959001f0991f227f51b8a741084295180711cc78e8b93ef4f026a53a2be633dc43f7656ace33c50c65958a2d06558db435396aadd6f708e0b99129b28251c85a538aef54a05a7bd044d80a043d6e8c3c318dae0deb4d20e605c1f27726eba0eea324add7796d9256a3c61bdcb6a5a89b5ee8500a01f9d745a185518ff4ee93b42aba6c8542fe8a7bb069f1330666853caf498bbdf64a18e250faf5d728a6bf8d2a7a5757d47e304bd77efaee3726178b7406640ad6793493547f54b22e8a85cb41c45365e45976c2d0843b1048d8d9e6151fed25fd966d32d34c21ad51c14e2a769.ddb9dd607717013ce98f208afa1c55b0bb6f91982d4a64f7949027aa981fce81e63bd71ff61ec0ea4d620122c245f9c09bc9f464754adfa4ef95d7fb1969137118d4fb5fb4faac964dbb293b6d22c78d243d72c6951fe21e311d7b2c0beceb1e464217f3b3795397685ff0f61bf68d5e"
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
    "idPeticion": "CELEGATO1784140893",
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
    "idPeticion": "CELEGATO1784140893",
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
  "respuesta": "091ff0af4c1dabb29d62e9522e475889.143efeca0fd8f315dd51689b803382ceec1f6311462cf33fa5849d484fa8612ac8c8f9227caf7cdd70917c9d2f5b0febf842e34704545628166c31666e0b8a222cd21e5bda0b28466af62cd8e9005f1fe0d33d6cce7a67b2a26235a12f1ae73bd94aaaee79d189c74df787145e73d6ce75f54e673e890776982102969c1bc3874ac4f0e48a5a8127762635a0cdcc22e3cbed3e91924f924ab61ee9ab82dc75c19cb888b91788a36031fcda5d089f5f72e4de366d8acbf13f7ae563681305c9d240b0938737173b25a739c94b57a8918d8681477e6c730bb4117505e066afe430d981004671e8f648931414828ce70df5989336246018993b2ea793dc3d67e869ba17c8b24a21b6a6ca5d1ed7127a2d9c8e89af364435698c9473cbcaa3617438ee9b1d11af987687b835f2cfdc882ef6e7a153fed4d40af2509933161a3b030c95d28cf6e496d37966d81cc6af505a63778f309edc042173df7d25dc7aac298fafac1cafcdfa27755c2ebadb848ab48581af9f1384be53fc54bd4e4e955eaa8152065d69eb8e72bbde3e58ce04774ea426f2d099f154465d740842fcbae5918b2f25221100ab462b7c0fb8896aa1215d0eeb3986fd06d6c8a491eff0e93713eb972848dd3633c809c3a1955a246a5fb57a8fec0bee1c6a41a4bddabf451be2d0714c71fd7620c65a9279f4427d85c537e90cdbd0de173590f0cc99491b722578.1db64f015161458b9760324d6c7526082dc96bfb96ad951fac02b787e01a65465d673cf6290823855068680a3246d3fb7ae8d0124d309774f1ccd703546e7a9067119d9a634ce5cfc0c4edc7e790363ab876c6c29ceb425969f6436546f6fee394267314e51618729748829ae959da32"
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
    "idPeticion": "CELEGATO1784140896",
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
    "idPeticion": "CELEGATO1784140896",
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
  "respuesta": "ebb7b1825e65601aaa888d34213ed906.df34ac2e955e9e6f4ae7a02baadbae09d298ea34a3aa87640ca99ebdcd1ce37661ae932bdfa67b45ab3dc9db79d7a074ccb6b80e5daf58852d65469d452d8969f222578d02500bd16058e7aca4ca9237f4ae62eabbb6e87104a7b48ca7237a358099ed5a9fc06caf01c059fbf9438f9dc72c2325cab3ba1f8fddd9023629408afe47954dac3ec771b3dbd3bb89459691b2309086730c7c7ddf38880c6e6c9bea13af1a11fae9e95e7f48c510addc343e3550a9c076717b66ccfa498c16d5e8a3e1308baf8a53de257002fc41afb7f847e933763274eec614b51c1e5ff0960086c8077cdb9acbd70ef14ad5375653b2a064a7d2f6c88c7c0ee077dee43782f9bcf8f29e569ebbae489f49be221c6de1c8d6b43bf97fbbd02938cf48a10d2f5914ade29639c2fc63488a2955aa72fe987450a6a16c0a8abebbb6e31ee268d619adf50f5af525470602b548424519f9a48063a65bb50c46d48f0192a0a19b3eb2ea0bb46cf1e52e67af66c21f8cad3aebd9ef10736c8edde704b7d0ba30b2d90f44131b61f9baf8fbca8f65e2453163803cecf6c8863775813534262e9bacd1a995fc49d3595b54e359a5f0565303f77f90b13f304ab370aed763bdab7f3e80685de847ee3bc43a2b4b313bf9ce47e210d9e12561f4e1ccd243422c82e8849d78217af778d325ef86f4bc819b832d43d83c639a218b3d8b18729521976732145e2b.b874fe08f85085bec6d47e5de6ed78d870a87657961a888a463687adbcd375ee691c7bec32f86ea5a26c8b95c740fc905efe966620ea4acfa635ba1bef2a7211a88afe7df2fb220e9dc424cb4f2dee2bea7cc7860bc156f7504fb629f9fc6c3cd3413a99975a892f657f249f3e2e33c4"
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
    "idPeticion": "CELEGATO1784140899",
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
    "idPeticion": "CELEGATO1784140899",
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
  "respuesta": "e4022520841a669594db4c32de8d319e.51c7f4991228c07de05a8d31d6654f8caefd79c92c1a1220304869ec9629a8e65ba44d24fde040f2babfccb89f2dbe19062b8791983d3ee332e6d707dc81fd2af8ef41c363f58138687bc46b4d6b2814515f69d7a81c9ee753bff632af373edaf2afd35852b43538bec1358b64bf0c0841355ac6a0359544c08749e29be61b8cf2800976c10c2689562379bc06aa2ad74c820688fb74d591ce4ca1c8e793ac88c204651d544ac5f1f36409f23492cc713101ffbafc4442dc72bf30fae4170d4a760d0b2ea98da0c438667afa89f9c393b1de5f5721bf014269972df154ba9597efcfe11abfe41a0bb9ac14943df42a2295e0e8e7f6c747db562d049b91dc43882eca4d717b189ac52264e9c399533fb4359a8ab0fbb68958d5347a050f71e781b941fa52886b630a57da651da269f1a9384c59f037b70e1c748deeecf7e98b8c24305c9b687e6cee94205a52d98698f01a18a0cd1fe10d8d9fe77614ab0fc208d3fe4983cea3fb70cfc582e0602ec9ce3e6862066a8c278b932792fe089ccd17da272ed30e25e18017e4ae53544b2f21a1c652709d31af955655675118fe4f2cf3032b63117ece215e2b2d0a80f1ccca8d400888f3c6c2f0c46dd12e2620dcfdae5038bff20d403b9fd3ab4839ffed1ba80373b06654b6739eca86199debbce7e17edd7683f46209e9004ade6bf0efd6f81bbf600e20cdce7d2061cf2c3f2e78.940226f68d2c22fc3682689a28e08ee9b57eb50e4bbe99b6341b63f41abfdb134f27903e7721ee15270ad5268190ac76936dda525469a4cf0a7e0a788beb606e2aae40ea825699bf2a7217aa66d4290b6922e6bb3d92d227e5d42e8d2570e0133d8f75b4aebd737a578cf8559913f402"
}
```
