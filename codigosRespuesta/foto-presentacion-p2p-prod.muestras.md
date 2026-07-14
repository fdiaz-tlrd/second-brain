# Muestras request/response por patrón — P2P (prod)

Una muestra completa por **patrón estructural único** (el primer escenario que lo definió). Foto (matriz): [`foto-presentacion-p2p-prod.md`](foto-presentacion-p2p-prod.md).

| Campo | Valor |
|-------|-------|
| Servicio | P2P |
| Código fuente | prod |
| Fecha corrida | 2026-07-14T14:15:16.356Z |
| Nivel ejecución | MATRIZ |
| Patrones con muestra | 34 |
| Nota | foto presentacion P2P prod + fix reqClaro captura |

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
    "idPeticion": "CELEGATO1784037707",
    "metodo": "0002",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "tipoIdentificador": "CELULAR"
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
    "idPeticion": "CELEGATO1784037685",
    "metodo": "0002",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "tipoIdentificador": "CELULAR"
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
    "metodo": "0002",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "tipoIdentificador": "CELULAR"
        }
      }
    ],
    "idPeticion": "CELEGATO1784037732"
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
| Escenario | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) |
| Ruta | `General/1_validaciones_js/2_validador` |
| Escenarios con este patrón | 28 |
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
  "peticion": {
    "idPeticion": "CELEGATO1784037725",
    "metodo": "0002",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "tipoIdentificador": "CELULAR"
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
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "e2e4ff63bc44717fa6a3ef6066c141b1.95b166911feebad3c10ca4f6905ef9b191730ed5b1c0f6512253e04a4b26b0ef50ac6f44e767c8ef693fbb0e9984f7f5520c4ca56295b272e208816f031f0d7eebcb50092add07fd03b161b7f16e3aabc2225df98b5b1a25c93e92aa882cdc880e4298f4f9ab3ff76040543320ee2a272a4a05fcd658951030059dad2bbcd0884843ba91a22508912fd36ada20a54a8f5635ade31716220bd50557bce36138f3899e07d12ab0a2d6f36b0c581984200b31543b55b2866b9bf29acf9061dd88a904e84719dfef1d5ff1d2e0a8907a8ab239acfdc7f17e50b9e9d522e8bedd388575b9531092b09b25d4f2a7cbcb8e07d8ee2f374be68872967e433c9917923ccae781da7a499b180338506dd3778252896f2ecdde0f2937b9bd4334c4e1927d0563f8c90f4c9e109bf6782d5165cc970593549b93b036de13ba27db51baa29cee3538f26c26d32962349431831506393e1e2eb69b3c72e193f4a6a8fec8269811b8d23cd0374f9a6e8e95ab31084814fd88ac31caf061837433d3f5dce0ef60743157a5578443044c3c21903c8fd4b24e16f956e86b572f42abdfa9f6d34b96aeb41a7f8986ecd1824b23e832541923195a37d25e14c80ded8be52bb0f54180a6be1abdf6f6d7c61d811f91932e5aa4372b5d0537ed1d916348ca8ebe76d1fcb25e5293e69e87a6e126d482d6fd3e4c9722e2a3d6513e4b9cb44208c1814727fa.7a44391b69b9be5b38094ef36fa13e069f10136c047370f074f007d866d23486049c972133fca262486e149abb741623373892a735b45de86dcaacb22a4c767a81309f1bda010a47d5e9f084d33e014e"
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
    "idPeticion": "CELEGATO1784037695",
    "metodo": "0002",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "tipoIdentificador": "CELULAR"
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

## 7. Forma `A.mensajeError` · código 404

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.4. solicitudes — sin propiedad idSolicitud (431) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 44 |
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
    "metodo": "0002",
    "solicitudes": [
      {
        "parametros": {
          "tipoIdentificador": "CELULAR"
        }
      }
    ],
    "idPeticion": "CELEGATO1784037776"
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
  "respuesta": "dcff7e3eff1a78aeee4ea2db9e35b43e.695f1e35d35872eba8e682a3d1eca60b8fa7981a31216f1e0bb2eed0d9ff9f8a25187d202346cc894ef0b533512328269cf19d1ef9c9d3fd6544d0dbf1b8fce4191f697a63eecb9a1ddb08159f949589765fbc389bcfb13eb0d6be1f1db17f57bbe1873f5da047d83a3c7815c9398e850d8e552a7813c56b4a5cdf319751c0d413f9bbbfc5627484eab07b3976d0f9f398919ea36cddd77a177aac7237c738f58d6fa5887f439ed6078dab02124193ea8a6c0bd6c187c456c2aae0990b5c138b382a5f70d8401e96e3301f7a08606254a8654e1c2b37e383d3b7c970b56d6b5087487f091e34a89a749d9850d0f2b756bd393f347f692b139a77781e67925f272dc4cabfed64741df7d2d67bd8baa9d0519bbc0e3be2600243a51703f338d7d0f56d6cdd968a8aa513a48a0f70a73c35a71f511b3c7a2e11b4c909a5e737f57bdfbd63e06761ffb0b0f11345bc0af96c0be57e52d8918623a6629a63bccb7b448986096627cac8f19b7bf48f5d57afbe8fcaa366ae3f667a1493d991effee097bc3f86ef0f1a4b23209a0c0fe54d9911ce58c9b654f24a077246e253824814a2d08050a0c28cbff879f2f028c1a259bc36bbf03f096f4d00e0c8cc17e27574862e2030c6db2b8193b1b6f3f0b6758c9e07d0f7074ae1e9acedbd21cb462332048aa429c36ca417072eab3a6a7db0ce11bf232bdc1bb728de3046ec0f8d06d68f.ae645ea018df39c8f5eb74218dbb7ec312da4b03e755ab48b098351cf5aafad1e6b2a08fb128d6cc87ade8987c3c58b6c23bce5777f074dd3f19731051242adafcd9caafed7d7ce14cc0adcb78a0c919c6ac54eeae84bebe27db5b25a7f32643"
}
```

## 8. Forma `A.mensajeError` · código 404

| Campo | Valor |
|-------|-------|
| Escenario | 1.2.4. validador — tipo number (400) |
| Ruta | `General/1_validaciones_js/2_validador` |
| Escenarios con este patrón | 40 |
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
    "idPeticion": "CELEGATO1784037712",
    "metodo": "0002",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "tipoIdentificador": "CELULAR"
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
    "metodo": "0002",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "tipoIdentificador": "CELULAR"
        }
      }
    ],
    "idPeticion": "CELEGATO1784037736"
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

## 10. Forma `A.mensajeError` · código 425

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.1. solicitudes — tipo string (425) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 12 |
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
    "metodo": "0002",
    "solicitudes": "no-soy-arreglo",
    "idPeticion": "CELEGATO1784037772"
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
  "respuesta": "4ddb63de8e3f7f4cf012c884565d40d2.6b630efb7b9e614b7e073b3da1dcba91b20b9652e643eec393620238792b2b820051e587bdf07b6269e8c5acf9dae01cebf0c8184939285bdcb331a668fe220e4d512dd4d0dfa707893528e7315d55ebbe5c5a83d2cbdace1db6292ef30e067ddfc8708258d20d5e7a7ca01839d7d38ae4037756857dc69d820c0437033b6d83984f85de88f13d49547d0dd68339651a31e66e6777ae3b19b9eb8070e52365bf06657a00bbc770d8f0b6078fe7d1ccddb6d9cca62ad3c5608c10c6ea6ef8809e3720d81fd608d8bcb84aed245cdf9c0df55415c90ef6ce55a876c2db8e7d92b633a8524e0da4ad0b1c9c97490332ca9b0850f49c7ed267bf80c7ab9787353c2cebdf1fc49844df7c0090b90c5978e7a304fd1c2a1622ab29006d7b98aa05af143c741f4814d509b2c076fa101bbfd421dee77f91014824ea3ca8ad5eb8562d268a97ed83c03df02b6df4634b91f2913611d24ea1049b9ec70edbee8f1c2d7de8fe39ae3cd70ba8be812c2fd3cfd29696f378c977514d408198adff0c3a1a86168c8c68789df6cfc93668d17cea89764661224e91c8590055fbe1ed0d9491775638e1dc5b95379dcdd02c5f0947f757f77ec390908aee2ed69491e9357c7cb43dab15966a93de8ca075db90e36b32ffb3fae233f9216489f92776dc98c34101f2dc359491b59cf6d526cabfaae039faf6b96dd0cec3533d272e82e31f131e6dc6.bfb89aa2795cbdee86588cff95ca4abf4d1b2b567d88a2ccf107ca21142475f0fee3b6a91fbd10aa3413069b4b03883e61a838d4748ab255f01097315e250a065248c8f41793daefde99c5916d6ce916"
}
```

## 11. Forma `A.mensajeError` · código 509

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
    "idPeticion": "CELEGATO1784037823",
    "metodo": "0099",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "tipoIdentificador": "CELULAR"
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

## 12. Forma `A.mensajeError` · código 999

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.19. solicitudes — elemento null en arreglo (431) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 4 |
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
    "metodo": "0002",
    "solicitudes": [
      null
    ],
    "idPeticion": "CELEGATO1784037799"
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

## 13. Forma `B` · código 0

| Campo | Valor |
|-------|-------|
| Escenario | 0002.1.2.4. identificador — tipo number (409) |
| Ruta | `Metodo/0002/1_validaciones_js/2_identificador` |
| Escenarios con este patrón | 36 |
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
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784037846",
    "metodo": "0002",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": 69852374,
          "tipoIdentificador": "CELULAR"
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
    "idPeticion": "CELEGATO1784037846",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "e16ce25bd909ea30687756ec5e798997.9259680fa0156056bba2429040e2b644d3b459fbfe505061c8367ae5db847586af44a8310f8c3e78ced79091e42bd01b044cd019da73e9a5f0d8328e8134f63ad25dc67bd31cda4055109755edb7eca0c7019aadb3877320cae2a5604210cdf8e204429a15d5da9656f59a48ae4e494a24cac2b28046eaa81775278dc3bf51df07aeab5e3aee7a9cdb131c31bb8331597ddbd29aed15c75ce68dab1de90033e02338e4a433bc3de77627a2164e3b056d2c394f0aedda0896a891c8e014b8ae9dd2395ed149d88a2bdcc17a8730e41c74f98a69480a934a1d3ad777dfbd38fb70bbe52d0f934b47053b4a78b5a5145a3aa2dace841d3fae1ad4cc16382e791c89106a79164b69fc4cf30e0db93662ba94ed14fc7cfae9ccb0a57e4f93009dd87f6323ef4ce85b07768240a907aabb721259bfaa0818172072ff808ee05831ac350fbd72fa0cc262150c2011790901a0df7c5dd20b4dd434aa039afec18c56076312a7607a4a50675c14b7e86779b53e0a3d9900c3a3eb13c8119093c176337e155deaa994a883bd91bbf51cfdd6260eec0445749697227e074c875013939082da87d3a8c623e3eb2b5046ddd24590e27ccd9006c3c55391b32bf003d38e461b0d699bfee7e7c856153a0f2394a6c256e05b64b5e00e71737bc2754859ef6b3d7332290ea6ac4969ea67e73853e3905329222e0346ff1d1a8a1c662dd7a5312e15.f308369ff6b483591ee61037e881a2f291e8f105ac2c3442e5cd1b216f99301315576eaa3a33dda22791d4f75fc372f2322b6868f5c361264f7a89b9adc9263663047ddfa2cd3da036066d39d41f97f6a2866d87549d0b8b066951b9e774860a19cbf827798a90d6495826e6e914197fc58e1f0d37af12de76ce83c3de11ae7e61e8362bd49f30989c86bab60e2a8278"
}
```

## 14. Forma `B` · código 407

| Campo | Valor |
|-------|-------|
| Escenario | 0007.1.1.1. identificador — propiedad ausente (419) |
| Ruta | `Metodo/0007/1_validaciones_js/1_identificador` |
| Escenarios con este patrón | 52 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=407\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038191",
    "metodo": "0007",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": "CELULAR",
          "banco": "CELEGATO",
          "tipoBaja": "INDIVIDUAL"
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
    "idPeticion": "CELEGATO1784038191",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "46b373ffa17345c290b66349ff50ade6.51b232927a7054b3dabbeb01b26ad5538da3e5cd776a87424b3b41aedf560d6e56e373b7f462cace447d8938b7f4a76858d57d0c55246546385e2f4d770208334d7695060c1083708808a291079e01abc76033a9b5b043c31edbe09f0d5cae0715a3b39153c741c3335a796d9d1851d22380f81750d64a5d8d1cb5e3cb5776a3721e4e769ccfce180612e82f1526c2df6f984d1587e6f025bdb61e61e1f7ca247b1c6db23022c046272d8b75109a7fb0b325581e1710e8335a93b9445934ee07d12d1fc8ab90e68a88beb384efb3598a5d56648d8b8987a8f249cdc719aebe51e7e65059ff3921c95c281de657cbf169754c416d703e33744bcea2fe457f34b0924cb54460d63c860581e7aaec334446b1eb5917287d7a54bf5e63287e9a5337cbdb7ee4962435faec75f41abd1b23de208b1b0d569fe877753e52af1c38ff76af9fcb89935b400cda34836d806c5556896b83efc5e3b04b8fdbeda757eb2d28c39a670e5a281d72c2a3eb74bda45de1ca848b476a238e2157cfab6d988719517cec4dedfb560eaf32058fe8a2b5a217094de290f2b39a4116d0fa5574d6039c66b62a9445822688e4108c2ae3c18d638bffa3437e53e44afe2ceb20d47e5bcec8b7c9f87f2bf547fbe2bb0c6b461eb4d260ec160dcf2526246de7484a7c4d1cabd9f3039f949291a317cb20c2c030699e0a807cf9caa72c1021409be4b73764.f954fecccc85523aa5149a6e48beea497259a89af81bf56640b81f7a0779433e6bedd0e50d4a82b69532ec137dfa3943d7034e827bf6964663464faf85e8c38817e008d701c3c8c208b8ce0c619428024bd708a216229f7be91a1b65732dcb834e1f1d1402c539d9b5f8bdf7415788e5"
}
```

## 15. Forma `B` · código 408

| Campo | Valor |
|-------|-------|
| Escenario | 0006.1.1.1. identificador — propiedad ausente (419) |
| Ruta | `Metodo/0006/1_validaciones_js/1_identificador` |
| Escenarios con este patrón | 84 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=408\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038055",
    "metodo": "0006",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": "CELULAR",
          "respuestas": [
            {
              "id": "pregunta01",
              "texto": "respuesta01"
            },
            {
              "id": "pregunta02",
              "texto": "respuesta02"
            }
          ],
          "banco": "CELEGATO",
          "cuenta": "1234567890",
          "producto": "PACA"
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
    "idPeticion": "CELEGATO1784038055",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "921e8914ab00974306eab817131e17e3.1573483ea1ebdb6fa64190085cc6adc7c9d21fd22cbec0635f5f9274d2c1cd3d0ec44c89dad7b802512c3f1c978c47551f390012c55c20f0b528201ebc5a15d31c51351de3861eab53f5faeb0e89fe79230c309d20597e9cf5badd379dd3bb01b40c5ad21c85c1dfbd2364556755188a02090c19f4858d95fd6926af503daadb5518a5c902332164f0d64b52a652e39fdcc65abda6be3e9f46f10d5459d7e60062cf51b82c6399e106a9c8ada56890345770fca52c06c8a0fef983d535d16a85116c230f9017384fd474780e6cc103bf7ca60eb05e081ada66c72b98c55ba254d1fcce7764a695fa8fb52586dcbb87134b21677683808617fbf10e1daff87a0f068247ba835473210100cbf99dc0f48c4cc163c2888a2bfcda13edf6d3a653d8e98652d752bfa207964ed0c3f35d14bfd15e4147d0de52829e505af5c1fb4cfb05a59e75e470340fee1e5090b99d4cc6060210794e9167b708c3d6d26daeb81dd18269017f1cfffee2c8b2a79daaa45ae15753a036f68b2bbfa93b71be35cbc521167982d8da1fd52a9ff66a0c4a3140ae78bb073c3b865e142bb1339d80d567c442eb038baa68e38016744e58ba29187e18016d549dfc599274bb6e54a6e5429e2f8c0170de6ef8c8142023127b6c571c9870a68d3efc9813926dfe974ef3494364467011cc0560dbac054358b9771fb12de04a0dc7eeb049d7d93f58fb3942.bbadbd3a953b2c847f9bd1916803a57cdcf99182cb9d4745c99a0792817de941ba148cf062dbb6e223d76acc5c714ce8d2dced829891d4fdf5529ea3dfa633a5bdb3af97f3dbcaf55e0c2c9118b2caabf1007c3d2636ce5e51c44d9170fb2006e23ea42943c65e48143bbc9c6cf5fc30"
}
```

## 16. Forma `B` · código 409

| Campo | Valor |
|-------|-------|
| Escenario | 0003.1.1.4. identificador — tipo number (409) |
| Ruta | `Metodo/0003/1_validaciones_js/1_identificador` |
| Escenarios con este patrón | 288 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=409\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784037865",
    "metodo": "0003",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": 69852374,
          "tipoIdentificador": "CELULAR"
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
    "idPeticion": "CELEGATO1784037865",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "3f691a9c352a3b108e8338c61a786043.79de4d33f067a2e7ccebec6a4e3ddd73c07d9627def129f51d6634a4017325a31023515dc2296d749793c33dcdff4014226cf681cea5d01f43130cf00eb9f755e0637863707942e4544d3c0eb78492f244a4f383ea6cd1185f51ce1664988c0eee252849dc29cbff364ff6df9d78ea47b357c89021887c0316bdce178a6e5f5d90252e26270fa958e408e366d9988303dcc2f321e401e85a8fd7dea9229c3bfe1748b7ef583fc5ff6504ecaa259e2c3a803769c38f4124cbfd53c17ce90d8146515959caa18954df8ec440a4ffbb0b955e4444b96e2f802508dbf76081b9cc1307d43e312a035942e3317d82bc2ffad0fda9e3f14d80f7bef17433fd1cd9ea361f71c9b70bad64d58cc476321959b1690359b6c7e7066557713be6e345cf03b27657be5c7db9b0a0452718e7cc143d30d1e9918d064e4fa1745449afabd732cad1c5c0cf061e055403883bbf296c7cfd6145c445dbc746fb0bc9cb2f25d8b3de5c9a0e9256fc07554617e6a097e919803e9d068420e530cd440bb253717c6a55f0d33534884e9ed2f01699b21af4e95ec47b4251801237d30fc4c776eb4d72c7d7701f3cd62adda3c5015fe94d56c894f985a96b284ea128d3a7e6b9b7b80deb8e2c08149a9a29863cf29a7be89797da7a53a4626093e40b268ff53c3dc37d9700f5f62a5b2097d0e45f70a5f8dbf77507d64b7b006edc3c4fb49e6930d855da.d40ef35fe3f0ac91fba437a18a425a425ac01f87b57a39cd2513bcf0f701e0013013e7ea425512fb34f5672d2c738cdf3e640f35d0923c3d91ee79825486fac1f9f98a0dbe3b922f30c02f27ec8d919d434e692f63787dced0f587f4a86b67aa6377b99bc98c46111f1a706bdefaddb2"
}
```

## 17. Forma `B` · código 410

| Campo | Valor |
|-------|-------|
| Escenario | 0002.1.1.4. tipoIdentificador — tipo number (410) |
| Ruta | `Metodo/0002/1_validaciones_js/1_tipoIdentificador` |
| Escenarios con este patrón | 168 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=410\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784037831",
    "metodo": "0002",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": 1
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
    "idPeticion": "CELEGATO1784037831",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "ecb6420f3a1fc40f7c045d08f8c51b8f.d438630b9fae393dfccce9c16fa0a49aa412ad0603ee3107248dc954e64c095b217a5ad6b5dbcd4d07b1a7b6a09c1d18825b7eb341981ec4d1b3580454b081c3af018528cc33613181e43abfda609df5ddf2ac7874d73aee74058ba4c77cea498310610df21edd079b023c232948d31bbbd1d3927ca0ba01a3076d992c64d6911a9c27f83724c40be6e5f55dc759963da5b51fc2d8fab3348f611206b4924270ab01b730b76ab13ea4415985cda612e21f5e90b1521418998f5e6824071e80e46024117674bca68fe1591ab081bed3b237ee9a9004cb8819d9dd71daf0222dc235789cd72b66ac8348ed6a9715e3cf4416fd466ead37a00370dbaccd51e848e792682a302569d2f52b5316b419512c9bb0c0e341c0841d26f1847faaf8f6a435104f93b34b64d5623f730545bcc46e9424b3a5e4fff38b20f3d88f32ed59fa941a2ea5462982a0c4c43be58f7c59eb91b2453c2a5fe199d4602ab0ff6d956839ae0d13687b7936d395e7f170c54a5a2d277f2837374f766215d4b44745f84628414a9e70b8346cb391d4be0dcc4604d37948e3bedb17eb1e15d1ec7d71f6f5c0d7954de9aeb56383ff304fdcad752deb6201b1c090be56a70fa41d2471d6f1636966a2119e113049dc888ad43ac861f76d551966e76a852448211874e6fa5b62088c7352b7e1c4efb05230c5fc84cd2c2ceb4cbaf1e5fe310245d03cf508f337.9a23f6cfa5d8666fa613828b8915b9b1679e98306037c83916a70a453c15fed2b3c22c581749cd14788dcc31d1f028ed271efc4a25888db4f759485308a3e622a7abe39d0a3814cbc34ba99b44d2059e59e1229b446d9ea38c33e25d0d0ccc3ced8228df00b7f5d90f1837ff8cff0152"
}
```

## 18. Forma `B` · código 412

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.5.14. banco — SWIFT no coincide con emisor (412) |
| Ruta | `Metodo/0004/1_validaciones_js/5_banco` |
| Escenarios con este patrón | 24 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=412\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038000",
    "metodo": "0004",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": "CELULAR",
          "idPregunta": "pregunta01",
          "respuesta": "respuesta01",
          "banco": "INVAPAPA",
          "cuenta": "1234567890",
          "producto": "PACA"
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
    "idPeticion": "CELEGATO1784038000",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "5797b791c339e69ea97f7f6808dfeb84.b398713f5f2db2449378398a0c41fa24ffd9cdd7dd584cbb76dcfef59a7223b446c2d0880a04ed818abc3c9136feedcc4188f3fdb3491147316665f90c200513933c7847559c74c16d81ec4158de29b19eec133b673a862e477a68de3bacee31b424d19ffa317f1efd01d932cbd5f6f0c644527e95251a225581b2e53d4116039edfa5f3005d67d0b6ae7652fa7a0752c6824b3d7b0d5cb0e9cb49cbc26475b96cf8352aa8d0e1e2081189fbd6dc3aa56c885ac632ab2dd5f46706485d602ee3734d00ad39cce312bcfc08873b3603c52c4c87425baffe41a70e411f97b7c2e52919fb1a2138601ed5c8a35b47a6c5d9e7d4619f3101ecd2e4752e4a8ea2d3b1cb9cd51e86eb55ad5e7f070873503d45a2f02ef2637c0da8fe685cdb346c7ba223b99bf3acf8dfb8b2a8fe6f41f0ef633bbb5197998b40cf9413ce80c278ef019a6fd06a914998baa8a64ff37477ebcaeb901d6b28dbc0720f31dde1a4e3b37383182f049ffa2121a3453baf0f305a56a7d3ac3c804e4ef7cd218c57323410db2a487e7866f736793587a00674ea603e050785581391e52243a7b601aaef1a307966e4f86bc001d869af5948f2c18fae15ae3bf084ea76c54d4a1ad22ed7c495d698f1785792668df6ad14fa89af549a78768bc9413cf13ff3ab0651f9f5e22de657f0c6e60d9dbea8320758d3658079849bf6aed1897ce0c88c4e4c56f6da4b.20e6e9123ec4dbd47bad1fce52aa913a1add95152c052c8102c4ff8152943c596f49bd59a3b85b58571f0c62e6e6cd3efeac87f65170f7f5d0298be00940beb0e3db129aec15fe2489bc1ac01f1b2a75f963262fd8a9319b2804185692b0198f47c33e656592481467cd89781a6d0e6a"
}
```

## 19. Forma `B` · código 413

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.6.1. cuenta — propiedad ausente (413) |
| Ruta | `Metodo/0004/1_validaciones_js/6_cuenta` |
| Escenarios con este patrón | 132 |
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
    "idPeticion": "CELEGATO1784038001",
    "metodo": "0004",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": "CELULAR",
          "idPregunta": "pregunta01",
          "respuesta": "respuesta01",
          "banco": "CELEGATO",
          "producto": "PACA"
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
    "idPeticion": "CELEGATO1784038001",
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
  "respuesta": "7b6ebf6d1198820ca6615ff0206036ce.61b9072744352afa4428b9349a9d105595411f81039399cc2a5fe32d2910f684b4783dca66b9ac34d92047ce2fbc6782566ac522f7b8bc9f82b2f208a7e0fb21e6c323f21afb2a9326aa6952a47843cd1c097f5c4c1d42e43ca673fb8ed48f3c72b4d39606e6910bbebf835d60dbe109888f01f5830db746a300e598081bede0b4e582decdb0b490481499c95f2d10c1874d16871bf5ff46320cb0851124d693a5f5e150df8cb413a704106bccf7c9b33ebdb3ccfc567a67965638d7b2aff5e662ab7a3d1a671dde5002762538fafb44a3257034d07723574db4558ce19cfb1d86ccc7b04ccee1b6460adb45c69cd0a73d41656f8e5ef19b9f79baa079357fc2dda4eb20270f73d3e9f04a13cd719397f898c2e2c35ebbcaa8282017a7f52fddd8dda264ab5e1504375fcecf7c68beaeaaa80e1c040e534366efcc0a9382f3d415cbeb698bca3ed7c9ae6e5e73a57e97064b3b43c24cfc05cb9fb481eab1689d2d351946bcb5ecd47fd7e5768626f258fcb63716a69c5cc23c757d41b8da6c15a65648f6e5354de57767a1908c5dbbe466b74bd40fb58605fb9fc872aa7b36f63f2cfb5def4aade49fc41ecac76cb798c9cc867ce2a51045a21f3223cc93f5c9a202d17a1235d08269108411361ebd6ba6edc592ea01dd492429a6dacaf3d17799ec2f0405024c781867a2934b24565543e0639b24e5ac609d95cc6e603f2c61.7a12ed4e281ae6841eae826f591967fc7d69a72be0c9dfa8257b31c826823ac689e9a7773bf48fee97a908b5cf2951a20f7badeb53b68b8e60dda4e774939509984b742ac7bf5a52d4a0d66223e36dfe37ae2b50a1f6747c7318919ace3fd303912aa22efb998e2f3ffb2ea26fb7a485"
}
```

## 20. Forma `B` · código 414

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.5.1. banco — propiedad ausente (414) |
| Ruta | `Metodo/0004/1_validaciones_js/5_banco` |
| Escenarios con este patrón | 312 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=414\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784037979",
    "metodo": "0004",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": "CELULAR",
          "idPregunta": "pregunta01",
          "respuesta": "respuesta01",
          "cuenta": "1234567890",
          "producto": "PACA"
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
    "idPeticion": "CELEGATO1784037979",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "49fcdd0298fe0811d47047405eb12a4f.2aada02f430646f2cedd0245e72accec9bad773a6181292b32209f72bedc6afc59da19390591a1c7b1ebdd7897281418efaf6b660293882e4e429849448d29a1f05abc3d48f6eb6c60599e00868dbd3642ce1b039db132500fff61aa1c46de6cfbf0cbbc61a524369525bd512cc8035d6f38fe8c217cd13d84269643f85f9b313deee9c0ce633b55c4b248826c385c9abf8fcedb6da2ca27c4a635f415a27c57bffabf7c0123b8eed8e873df4a79bb098d91732caee3ae4d6076aee0320f70350e5346903bc73e663fcb265fcabde50a819b6d77d6b475ec9a4d0b5ff3fee41ec191158fb13b805ec934f42a99c1d19fa078604e1a9f7adc26d76c5eb8d0075d832759fba0d157ea2e1a2c1dde6723ad5cb8d884491274b0751a0792dc5fc62a34d813263d693e2ea9e07220ac0b82d6217f866c4085f2f7de393cd0708ed7cd36597bb0101ed830b67c231a8f79e76fbc8e123aa0899bbfe87d255e85f40956ee7b88071ec7b5f98387d6560922ab8e38dd29627965014e9e1a9fd00d85119e5c42b8a5474fb56f45fe3c7ba853fb3aa2dfcc626a5819b01dfa9b95e6374b8e425616114ec2ace6f7e7827b77716470f81c75c7d124d0dd283f0856aeaed2e603ff4edc3c98ca43ed0931532de4c7163d1d53f81baa18cb763609508198df6379c59e239b3fa3334c196ba5a05f7f8c92347c91272c4d16903111b15ebae3eb.df73346d2cc802f32c80af1b980fa99f15ff3b76d9b137833421d673181ac0274a0c3d306840035a7af64ba78502c9f91968741b088c72d9efc1eda3f75dbf0a6e246b6f5cd3812e3b49701597f9c8b9c848563bba7dac5efb3711e770d7243bcc39bb1e6951523c6b9e853d895cb61e"
}
```

## 21. Forma `B` · código 419

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.10. solicitudes — guion bajo (431) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 216 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=419\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "metodo": "0002",
    "solicitudes": [
      {
        "idSolicitud": "id_001",
        "parametros": {
          "tipoIdentificador": "CELULAR"
        }
      }
    ],
    "idPeticion": "CELEGATO1784037784"
  }
}
```

### Response cliente (`body` post-descifrar)

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1784037784",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "e59baf2f5576ac56f47fc2f31a757f7e.80b8ea1ffcecdac4f1b085fe3df613cca33956f901f2e0a50936aaa38f4a886341ccb721664c42db9b6b5de901ce94dd2ca280dd3fef47760249413d79421007f538a9259d7f5740f631782ee80b202031cdc4e13956e085df32d48814db41d28b04d997a9883519d8a32835e6a6377bec0f495ab4785e7eaf62e56d93a0f064202871a3473d088ebb20b46425c60c6366cfe10d4d18efac1757a76a709b2a442875cfd427059614c6d42381f48334de9acdf98d4029d2f33de657205a76f5cf4accc5699ed20d95b9e3ba0806e431188c9a9a3a75294e9d467d8b8343c4b9049f0aed3fb3d83f10640a992f40d30a4a845d8a7c0c36b13f5ecc623dda4a073bafb8c0a0c5b18878a109c0324943abd11eed69e384c484e7d22f930dbf29d3a52018caf35b0b2e5af63a4be76b27492f4fb50d5ee1a1412097582834e0778940245d92025a9d14bddde7446898e788aa94b3dff3e90f3245627547777f6e8ec998f46afe99a482c7cc5c7d4c688b10fc8e7469e225a575a67e0738dcaa19bc2944fcfa9689334f51c1b8024a419e06aa53456ca787d32a27986e88eaff2adbd2fa094652d5c8d86c8f39eac9b93b7d88475076084369eb7f1c1f5220a7a8938a15a0b7f6c1614f983029eaf993867b6d64febdb1b367e4369ca104939a9ecd41de252311eb887d6760b800acdfe89db07928cb1634d84c5209815d76968948c8.c98b170d3483b1de99b306ece32c90cff3825c70c15193b5d2936f4cbe8c4e56156e2ef36f40846b0a23b072df0f8815a6029509f555f98a579f7b97f2eac3159852a1aa5b98661768ee03e565141af6710001ec163829a3f502cf0dade4e847bc75d403d0b0763992ef429502f9b37f"
}
```

## 22. Forma `B` · código 421

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.7.1. producto — propiedad ausente (421) |
| Ruta | `Metodo/0004/1_validaciones_js/7_producto` |
| Escenarios con este patrón | 108 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=421\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038018",
    "metodo": "0004",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": "CELULAR",
          "idPregunta": "pregunta01",
          "respuesta": "respuesta01",
          "banco": "CELEGATO",
          "cuenta": "1234567890"
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
    "idPeticion": "CELEGATO1784038018",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "b1a0d6453be5b73c80f064b3d7992e07.b89d83b0d14f40a1f533803ea72aa0316ef2e332463a53b5ab0ddb8cbbe05aadff290eec3f14beb94b6b1c8a225f4a79e2e1ed0ca7c31150db299539144a7e20c687be1bd83ffaebd85c9e8e15cc322a50520b8f45bc37e3a741e6a0304054c008c20f07dad1fbacd33fcc25602860ec760bdc6fb73ea47e0efb50ca64d140494d75d46df599b1ac5c8da12cfefd266351403a30c248cc531bec3a32ddd17091bab8abf9f7c617bfe68fd62d4fe32f4c8fcd6d101a707d1e548e9ef732491207dde59082b333923edce0a88e81a70e97703b7ff54b0991422c6135b8c0a2b1e3a8645d3c60b02b3261af964b64595d84de03207f959b6934fa7d6de89a4d5a1463d4fd96140c070829b5213e85f1ebe9395fa5458ee6a18f6dd7abca6b40dfe117cfc7e801db91da7c777473e845169bf7a9b7b556f432059459ac917d7a0ddf007a5e43a5306a20f116fe6bc25ba7d907dea8c96acf0b3aed91c5ffbca0852e8b7a7204737307f040cea8a09261d4458625d18104ceecd5b1df4d95e033e5cd911a424461ebbd312f8e34ec5343bf094867cd22d795acf32df6f2d8cc0e840f18aaf4ce54a8f8a9e1f2407f9160555e745defbe35ab5d024c6f25822f09b8364d020938bd158822651ba1d9e373d276e41be5705487893ba92d474e0e6b7edbbe6e7d0ef9e2d40a570804cce66a542f118291a61094d3bf89c6fc0b882c160a.d6682b10b1107afbe3084b2ecb5cd8223203b652de6242df5b3c29eed7c8945dfee73d82df9b0d631d2301c5620dc194a8f72beca30265698e626470d47a93604fe2d388401aad4075e0bbf53978f2604c46e8b48ead2294ca16ad095f76a80f93062aa60291aa2da05b00325fda393d"
}
```

## 23. Forma `B` · código 426

| Campo | Valor |
|-------|-------|
| Escenario | 0007.1.4.1. tipoBaja — propiedad ausente (426) |
| Ruta | `Metodo/0007/1_validaciones_js/4_tipoBaja` |
| Escenarios con este patrón | 36 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=426\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038243",
    "metodo": "0007",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": "CELULAR",
          "banco": "CELEGATO"
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
    "idPeticion": "CELEGATO1784038243",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "a574e3864f47665139ccf523e6176dd0.4bdfa3454428b4972f5348f9c8804f2d666aac9820d76d3a034d82424ed3869adba795ece26993dd4d21a1c627867ee218b8db164338fe48dc4f0e49ce8cf6b3383a2e0d21d887f1c919547278dda23c8ccff1c7d84c3ece01c3102ee0be3d468d5edffcda00604340b984f4f0cc7714b264ddfb65118c9d628dd057ef1faa73270b9883e671755bd9a2a0c8896383914c4066fd91688b416701d249f4292f0cee3e5bc2917a86763105efbf0d6c43ed853e5112262e15e61e76dad3da4cc738891ab148a83b93b2829b35cc3ea539342bb2ae21018cb6773a73330a285b4a00b7991a55cf02023ca4954616b46842a9d7ca0bddecf729cc99eeccc22aa0a79d90973f31deb58ed9d3619967e1b7ead7a9c3a7fd5b2d5a7a262dc572481daefee657ce285d8805f354fcb1a5b8ba76149d3a9f71ec1132cfb384d148cffa0476066f52e77b8cf92692a0671978fb76b47a28bcac6cefc87a5fb3206bff0ce40a16b94b09a255e50eefd2bc948504d49741d3075bc87f1399aabe9b3ef3cf12b74686dcf5880754f3282c1f40be2d44336c56573f1b6e317e9573951135a3a0ff4ec7e833a133f60ecbf07c2802b84cf21f48220f28ad3cadf82a54735113ac7fdf9de58ec82b31b72eec09bf6b492b53d48ee82d73628a54c82a330415588404d7f41609cc2ecdbaaccf2f51f8947bf4ff914ca99942794a7afe64df33a45fab.0ad1e12e6a4d8e447027fe3c11a4da8e0ab0563bcfe0dd7dafb424492b16fb4aac2320a4ee4512a22fed603efba38f9c0a966abdc7dd7385638bea40d401c4b81624a1b29a82503e08c8c675f0ea6177ed30014a7ef95af53ffeb68de7fa994ca174f1e1708f46f8ad6f0ae612cd84b2"
}
```

## 24. Forma `B` · código 427

| Campo | Valor |
|-------|-------|
| Escenario | 0006.1.3.3. respuestas — tipo string (455) |
| Ruta | `Metodo/0006/1_validaciones_js/3_respuestas` |
| Escenarios con este patrón | 76 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=427\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038091",
    "metodo": "0006",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": "CELULAR",
          "respuestas": "no-es-arreglo",
          "banco": "CELEGATO",
          "cuenta": "1234567890",
          "producto": "PACA"
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
    "idPeticion": "CELEGATO1784038091",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "1d38d4a77ac7b9b329ca5c1c13440bb6.271ea09f8229d80597491b4a1e779896f0e8502ba698f7de27ebb5ccbece4ba037c46a83124c4257fa501e59aacfb34ffef01917d9c867692645631af0b6be1d1eabdb1b5c37bab846d5cacedeea0aa64c0e6dffdf41d5384586ba8e382d931905f8dfb27edd8fa6d831a69a4853bbad7f7ae940435794414d193a37848395e4728be163b1cf5fcd7e9862fe173ed957fd2142697b052fd94a4931621869c0792d8acd30b363e4834c772830ebe0912004e1172f77b6b19e7b448508291f6ac72da7ef4142ad6dabeba4066529e672ebd692deed9da2a9a95bda3e866c27351dd263b0b30e59ab9066c7098addafcc8f378a5c793b3f6afb23e49c2c194c5651fbb8500976aea203e4c099e809e6ffac94d4fc29b92586a285cecbdcfe2b34b7c8895b863b1ff20cf0abebc15f01451954669034abd57f840918633bdd809eb6750e0182a50db7dac3fe13018a47fb92421daa11bdbcdf71d7cec48221b25bd5a3e6677fe69b94d53160433f0cf1814416385a2d1b7456c00c913eaca94ac278952b1efde6c8f152a1d9a4665216b1e387f75610c27157b70f7c5691bf24f7b07ff30d63bb8a6e685fca5777ecb7f7e9d47de3cec3fa42e3cfb826c6c996d9616cf83e300d553d4353d7995f4ac80a18e737fb53f71c38e8bd740780ba2297a809ee5705477be4f18f8d10705274d692b14180b3be615dda314a73c8df60bf9d.42bba3e1a59233952e6311672765b6436f811b1c34eca88e2a6069dbea3b39430c543768906342ec59eb931f2b9184a53b22cb36f01859a8dc3bf5ed63e05278c799207c57da99fc483f19ed4ed969e05a2950a2fafea6d7d99cf2bb2da2e3097cb29dbe8c91f2d6bcd9d960628f2961"
}
```

## 25. Forma `B` · código 428

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.3.1. idPregunta — propiedad ausente (428) |
| Ruta | `Metodo/0004/1_validaciones_js/3_idPregunta` |
| Escenarios con este patrón | 36 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=428\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784037929",
    "metodo": "0004",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": "CELULAR",
          "respuesta": "respuesta01",
          "banco": "CELEGATO",
          "cuenta": "1234567890",
          "producto": "PACA"
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
    "idPeticion": "CELEGATO1784037929",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "7cc26daf7d42cb42e2a63d7434f417d0.a1d4c63c528f262211139d7a9172bc6fcb3a62c2f5f4a5a0e5d6ecb4a23d4cae31fb24e047c4e3905546f9d8d07f5d2b71ea756c6541b8f5577af988cde177eecc3f47df1c85fe085be3a7f69f290e812445cebf066c0fd1a117c02b2be6448daebd4a700fffe67a95e131f6ca100f49cb24331b5e47402045cd31b72d5be2335a5e51f836a74c35069924b103f0a6327d5bd34225ce2deb11f97339e66b48f6fc4888b0aba48be8f2a9ca2159e8cd3773424e90672533aadb847f9722571ea01b7293157e83632c52d95cc2e6c154cff2de8fd2f09bd4cbaf777d1fa4bfca73973a45865816c3c4770737e94394f25d8bc20248e30527d68185d9b533d439d00617762f155bfec4a6205614afd1fa9ce0a7a5e2b81f8a458bdcfe25128dcafb8fdfe070bb778561b9b1eec0ae2f566c561af7e51c15694d2323cc92c754deb06024f8978ed4357ea264c6d5e590f0f68b78cd65406cf7d98a0cd48f28083783ab91b628b35e9437aa4328955294b9ab09b281a075dac7f2e175be120dc712e9c27d9bfc233a7e9870c578485c86b40b513d098371262d3c1b035fde3272b858d2b2839b937e74890d6fe28acc763581d45d1bf6085a0dbc5cf88af68cbf06248cb4b030e261af20a1257867a01796a49d13c4075c756222f94c5eb4eda9f463bdfb0969c3128dab13b3b7fc92bc0a7c39d3d84df325ef822b2d13186802c30a.72c7b6127ac75ac6f28c1311a4639d21bdfc21575c4b8c6e568dc6d82390f6974569fa3ac57c974ef50dba681e8c79c2257436430fb3a9d6d4ae0a9cb89d52c699c6b0aedab7bd6cd9a2a67c847667b2103d022e25269651e5fddde0de856adb893fc96e5981a7645636fcd091de666d"
}
```

## 26. Forma `B` · código 429

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.4.1. respuesta — propiedad ausente (429) |
| Ruta | `Metodo/0004/1_validaciones_js/4_respuesta` |
| Escenarios con este patrón | 28 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=429\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784037964",
    "metodo": "0004",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": "CELULAR",
          "idPregunta": "pregunta01",
          "banco": "CELEGATO",
          "cuenta": "1234567890",
          "producto": "PACA"
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
    "idPeticion": "CELEGATO1784037964",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "cf9aa2d1a8339d2e392bd738cf18189a.cc5511fd364909546b14a0c31cded53f67def13c1eb74e52dff1140a1db70d7cd27366364797eeb1d7a456666ca8b836c1cbcba9c06e62a0298f5518222c590eeb968c272f1654b33e9d12787c4a70d5a365af8a5066a9e9cc6997192c5f2b7dde7f823240e3d2c6408e67fd23d3f49f1e5a6633c3906cb54c1aa464658604ed052546a8c80b70065a64cf64b2678bb9371c19eccad0858f144b9801dd5b0bf16cb47923332f705722363a1dc189f5a9dc89bc7a5793dee71abb2078e06674eee86202b173a17e8502fa26dc2818e42e60c013a9acac50c6880c1f6e32cc9cb1956668db32f8594c46a064b0edf72ccbd4dbc80c8c217bcba2ff66934d9e0870537c0f71315b9ec1fbafe6c254d73bc4ee85648404d1cc2e02fca81e66af5cbf7a5e25ed558222d1e4239dc5140a68b776777f49575aa41dd59ecaabc08bebf904a70438a7ded70fc5a624dd0b9a6a77c34a6517bd5b078f79583309b5d3b09d5f1005b862d0a05f94d51b62ae0def36e65d35019d27bc7b22bc09a9afe88713a41f52ddad952454466cfdf40f80863eee204879361557c16467f15dcf6990acc328d512ecc43498580eb25c26dbe834103b984d9f9f87a350e15326253b9dbc2a33694b8147bfe547c0f7fe361b25942072ec5782391741d4b69b70c361236e79accbcabedb0f92713c935b2e8de8940916bf18dfb94bd43ce93428c19c5cec.797ba05f6a84182ba83ea5c42bd7faeaad551afe136009ac67d753114c7e79768184582bca8eade25b1246dab454eae2966e506f619f4db694a9d58c343cd3a4eabf79ee0c3b08da67828e05c1aea58a745c5bea131f4bfa513621c467a1c8bd119279ac54a3f64de4a06b6914a529d8"
}
```

## 27. Forma `B` · código 430

| Campo | Valor |
|-------|-------|
| Escenario | 0004.1.1.1. identificador — propiedad ausente (419) |
| Ruta | `Metodo/0004/1_validaciones_js/1_identificador` |
| Escenarios con este patrón | 68 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=430\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784037893",
    "metodo": "0004",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": "CELULAR",
          "idPregunta": "pregunta01",
          "respuesta": "respuesta01",
          "banco": "CELEGATO",
          "cuenta": "1234567890",
          "producto": "PACA"
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
    "idPeticion": "CELEGATO1784037893",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "ce5d4c57b48c2a8e6d853b02c2c03922.ab23bd06a28d2d64c2ef1f737a0c7c364a01b5aef867afd99c8e36ad28bf8c5d102cd5358e1cb356be93cee56eec34d47ab102c9d2c41636c61fd1587e8dec1bb80eb7b8a33939be81682cb4db0ea607ab22e601e307867d7df7918abbf4d10e1e66923031ee4deb7e7969a63d2da4424f9f1ac8388253bbef6e9dd7a402e9cbe54789ba762b5b6a2e75bf7e271a3c9dfc3ff8ff481bd8bd09b8a702d9890010baf433a83f5021bc2fec4840280952d43dec5e15d805b15909d0de21a6d6aa71cdd7cd3915e4ef34a2575f920221144d644b78235bec70596fe1e306c1fa1892017044c469e8667d58ee5715b678ef6a898e7d8b73094e47cb58d40e40ce256a29ad4c84bcb53a1e23d90121423d0100a33a160f77f2b6f724e8fd14f9f0aa3aa1464c3fd5dbb1165cc836fa5ffd40d130e929ed2ebf0ab73e960807c695e1985b7537c31923c1dd825eaf20d624bc295f223e02034ed9ed906c7af551711269c5ffc3b56c2caf61bde28620a61501b85c74c462acb9f568787d67baa02065d7bedaced37493ccfdace48ef2ae1045e7ed6eb31267adbdff18876ee8e6af4ba471466a1939fe238355a48e3726fb411cf49f19612220e18c569e01434a3b70117fa8dd0cd57123913e089b6cc110455047fd2ec6d6753bf4274bd7fdc9b4cb85b252cb840755792f8c6426f2db64d3e6ffde933e72233c57e304d6d6ed1d03b1.be3234e73a13910d6a2ed72ae2656116c353b64ce426ae40a1d41d26e4dfb7c3feb2a1a58ab54ee7d8da6c3f368cf01bee57b8547f23d0dd7e6fef5b3fc83a06b10e737cef338e50f6e9044688bb4a2643ed4c5ce59eea72f3a8a2c41e1f9e3649c0bde909822d9644ad82858a1ac4cd1c04d13c820b786d86c55a88c1828833"
}
```

## 28. Forma `B` · código 436

| Campo | Valor |
|-------|-------|
| Escenario | 0022.1.2.1. nombreAcreedor — propiedad ausente (436) |
| Ruta | `Metodo/0022/1_validaciones_js/2_nombreAcreedor` |
| Escenarios con este patrón | 32 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=436\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038407",
    "metodo": "0022",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "bancoAcreedor": "CELEGATO",
          "moneda": "840",
          "qrTipo": 11,
          "canalPago": "BM",
          "tipo": "TEXT"
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
    "idPeticion": "CELEGATO1784038407",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "4898d33abb237366d3b647057aff511e.df1e88300fd6588f6c43f14834a9cb9db7c86a512d130e7e2c6d1ee9a113c0f4defd463c77348d4a204fdf91dcbc8355dd04953dd3ec555a3e8d661ebea1a6ce586fd2894fe58e6f506081d0eaf4f2d267c250a1950a360336e9beb01307e26a623db6035642959cbd65840c7623d4da7b474c6d4725ef33d29b0ebddece6f5441d418e5cedb84561e9fdba951fb27e9ce70cd52ac2979842b3805b2687a843ffac236fa1e1d6e5283a058e32fc74bb2609422fee5eff92a63df34c25b0c109a9b2383fec086a588e95bd177f0f48fb4110a4566b57d2839238bf03138eee193aa833130668200939771dc36dfb162db4c713d0e42ccdc651f66b0e802a02b62626a2c4e9d0117a8690d61369c718a377b86eb0610ffb7fe15ecb3c188000fdf039a8c0fe32816c4f9349ed6304262d5ad274f2503036046a83e003617e3963a6d8bff93093b1245b4e065318a6d674f95a51bb3384e304947d5c60cf270ea39056f4d94171160b28e5698b0fabee4e0d555ffec16cd26493fc31679d4787bb80719d6a77f4ecdc6aef15f92380b72a55ecdde81f8eac03eed14ecbfef117d64ccb7b0256faf1f302fcecb85471d20081a8dbcb856e49cfbf42a6af021bc74e3b6bb1ee9270ee717f36dee71289af6c178602dcfae25d503f24b99ea5c641b412c39e193052e30c9ef98da6f1a71c7cec3077e4dc0dd8901df492eb2c277a23f.a487c90664353b1d5fc9310f99ad9579fabaf9e45c9bc859cb954073444d50828b18bafe4d36c6d9aa9482b46758d0599ef670e2a550395aebf8fa0e266c3548c9975105bd73413ea4c3078c29206175b1f7b602349d11f0255067eb04a5530f6573a87b08772f2b65f5b7297cf410bb"
}
```

## 29. Forma `B` · código 464

| Campo | Valor |
|-------|-------|
| Escenario | 0022.1.5.1. qrTipo — propiedad ausente (464) |
| Ruta | `Metodo/0022/1_validaciones_js/5_qrTipo` |
| Escenarios con este patrón | 24 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=464\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038452",
    "metodo": "0022",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "nombreAcreedor": "Juan Perez",
          "bancoAcreedor": "CELEGATO",
          "moneda": "840",
          "canalPago": "BM",
          "tipo": "TEXT"
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
    "idPeticion": "CELEGATO1784038452",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "7129dcfc42681fe0d1c6192bf5dde705.3b7d6d0f3f3075fb641f72e77bf40bdabeeccbccb69a0ea6325890086b1912bf26376a254a0414831b2ed90a74a4f8df86fdafcc2b5750dd4efeb8f6fcb942aba2349855b4c2b03c89e57f563287bc941b5c07f64f913948db32eee7d2705f14c1a4e02f5c85ba17f873f6ed09b138f28e86757f80e5e5043614c3296f11118400aa701b2a88c4140b440c748227031b619738ed22ad369105f06d1caf94e4392866f920205b2286d1ddab92ceac0d5239bba7bec198b525126513fc756415a046221bf2ca7aff2cb1d279f6f0c89be9cce13a642df1aa241aea241c3a24f5da6ebd66a0a2a474add0af974215dfc037e567fc9a348a43ed9323d31714d55a39cfd6f90180b318fa1b0f5b2a6544171c2af9d3a31b52b4b54d1500bdb60f0dcd0a9ac22041f93c01e4f30793101439b44ea9eab45b0ee6f2be0cd2cb26e66624f73b7439ea6a2bb7127a8153e1847f46cf4a91cd0e91ee5c0f7b2db84fa1079321c34895bc5f077078bb66d22d978c5d6e31143658a3a46ca6b34c3170c86535c584da951858f5f0df0d5604b8d21a18b1df2da839f56d1ac36e1098dea4fd0d210937d1c6075bc872366559bdfd427eb63ad98dff48b56155e0605391a7c11e67edb715b4aa711c95a2259335cf244cdebe1c580ea8881aa16d170e90420efb21f6e69aa86aefe44708fcaeb2a4237b74b9e6420801520fe940bbbae5559936.fe3cc3d7c96d8eb8663f1f3adcf0fdade6a0cd25d0308a66961d1f7165012a75e6678548d7638b165ab89d9891e07d0e9c18dfec6689c4d3e7b69946412a6c8138d585a9e2e7fc8a3bce13ff76d24bad508209fcd755ca402cdd23320d875eecfbb44fa6817ed7fe471a2b6eac177ccf"
}
```

## 30. Forma `B` · código 468

| Campo | Valor |
|-------|-------|
| Escenario | 0022.1.7.1. tipo — propiedad ausente (468) |
| Ruta | `Metodo/0022/1_validaciones_js/7_tipo` |
| Escenarios con este patrón | 28 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=468\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038472",
    "metodo": "0022",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "nombreAcreedor": "Juan Perez",
          "bancoAcreedor": "CELEGATO",
          "moneda": "840",
          "qrTipo": 11,
          "canalPago": "BM"
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
    "idPeticion": "CELEGATO1784038472",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "d50bc16f32614dbf2628c3c6a056aa43.7ce71cd2ef6690a49ca5f116a2e4694d6ae6d98aab9e9ca0768992c6479bac2ad403f1e35ef1a18149e4648a8b99822db78fb679e6d637d3adf886c0e6b8f883e63de827d51ad1e197bfc3038b6d3e0f7f84fb2437e327c63de4d36faa5e56e17ed033e077048bea5d3f1f05e3cd4fd79fd7238e1239c6d0238374d12d2d9524853dd3244bac17cd346295e02ad282e9941fbccc3ee15ea342d8bb3bd9c118abdf3f9f8e8158f9ef9517d19c274744e435e9cba2f09058c7265f9e69f2ebee95188ce7875666648ee3d389328dfff1d1374a909a05907ab51a93d3f7b059756bbd56376e8fea8376b68dbaa66e4f52276bd2fd513595e98f4edca3708ae00362aba026a07263da67aecc8c241c9bf0e7c04505b34a0340c9de3a706485520c76bc20044ffe8f73ce09b2ebd1bac140e86198457e181e1a0a70ae7dcfdfe3956621426933a8aec658f945395f80b6bc7b23b456b9b4136356435128c85c2e0c76d807f95e6ce9e9c9fad6ba4cd614214b471587bad1e07da9b2efe4df29314337184e8acf7fa072b067cc1958ae151598d627cef1cfbe5e7be4631b843aac01288677e2e8f71c033d95954fc96003e1957f87875361f285ec029a8d12b86da4b2e495d047d20922ead95f0022316a7640da0705daca7d10d37f9ecf1f39f7f3f1a9757dc70a76f7277c127ce20abba963cd37111dcd784f0845700a131aa37629.d3df2b66dbbdec9511b1498e2f32553e01886b225d25cbbb76be816e2656f4c834cba4298fe8c15c083cb67dd37288b14d3b5cfb2c627162946aaea2ce25785994092018801297d54f057a495c0b885be59290b5f28b2158db116feb527800a823338ced7fa8fa60e1d4434699c5e1f3"
}
```

## 31. Forma `B` · código 472

| Campo | Valor |
|-------|-------|
| Escenario | 0022.1.6.1. canalPago — propiedad ausente (472) |
| Ruta | `Metodo/0022/1_validaciones_js/6_canalPago` |
| Escenarios con este patrón | 28 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=472\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038461",
    "metodo": "0022",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "nombreAcreedor": "Juan Perez",
          "bancoAcreedor": "CELEGATO",
          "moneda": "840",
          "qrTipo": 11,
          "tipo": "TEXT"
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
    "idPeticion": "CELEGATO1784038461",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "2ca52d838782eb7f337bf1df69582400.8ad516b3209d07e759d6140ad7c54915f601fba19ced672eab7d3dd7789c650e5540be37071d8a3f6f40a9575af65069a4cc366a4ab15783936d63e76c058c9e3ff9c9086393a7c40faf089a71dea79885cc21d2050c340877946347825915503bf2b5aa952eb3cb7ea562a5cc8acfbabb6864277a99056c891e45dab94fac98be9647588ed6b4cb11d732422294bf26c1da19ae77f861f39ce9d4714ee7ea05529f8bc73285f4242e910e572886a5d703f354ce6f05fab9b39e54acc67e31d497a101ba0eca9ee90256dbff857d29656d204e14b6c0d247d4b83e7d0c136493e4c10feb0207af002613122b02ef9cd051d04fe2c1afaf4b285ddec85885c5646ff0d59caa2570a12c8c7cac37c84df39c04511b31029a4e28fbf490f59513bc9065ab41081e3d59cb77b42f94b15f73d5635688b0702cb38c939305ec7d6fb511e82f2acda183e3dbd6ba805f7941c744a8d66b979db4a0e9b54e61d498bb98305eaaa0ca54c1dce439fb15a0d1944d32f8473beacb0a10a3c3d5b06d7b8b7a808e23755f9581139ba55996d06476867d65993c721b45f62ad6b3b9e339613408e6ef6bcf6eb09fadb06f5fcb28035377ede412f5f5443df7fe6dc66d4a4f5d8eece32840457a346345d7ff85522087d2183195d38838528c808423dcac856ce9c0365c83bf1b5f67cb741f35ed77bdd056871c8e84a5c29b7fc9a774f2e362.2fed081f5c572b0f77bab91c4486ecedb4cb1dd66ec6ee50ec65955dbadd3d6191d868782c822c716af137c72e27b254b6fb9cc41515701edb45d3d83795ef188474064d03e65bbfb3da27fc4ea4275c2de467f18e7305b89c33552d29c5fc7d3c375ec88c15f4f1c15b705f84a3dde0"
}
```

## 32. Forma `B` · código 473

| Campo | Valor |
|-------|-------|
| Escenario | 0023.1.2.1. qrCode — propiedad ausente (473) |
| Ruta | `Metodo/0023/1_validaciones_js/2_qrCode` |
| Escenarios con este patrón | 12 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=473\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038506",
    "metodo": "0023",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374"
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
    "idPeticion": "CELEGATO1784038506",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "ba1368b9289b7f3b2f70b17ca73e5dec.c98b0c358733b38c55c06dfa5282499bd5c86269a608eea3427a22a91b1d29fba3005ac471c92dc6248fca40a3ffb003902bbf9b3424a1eb586c3fcbb6ba5e8bdb819e511e866dd85b2a1f0d1e2f065fb350da904ee62a2c5f200cf352f5da731b67e633d21a4b826a817f68d5d3461cc44daf62810686c4658a40b5d14f21560d8efcffac54c7dd5b267cd490400a254028e9f371893c0f4daf22708223e9cb3eb8503ce610c61175177deb05221954cd36e21946dcbe5bc157994b1ebb3102a1346f0c60f65373c0e63bf6c7f6ea27528403bcf29a9d98170e9431476dace24e5c8469ffbbabd32249634468a6fe7a560379dd3a64d7356d6bf9a7e1fd9195cb0df5a6509d0ba718e50a36410ce02c3e382579846c38d36014d002aee3713954b933bd2ab33a406cb4cb79c7a0deafea92bf8e4163619552a24d1bb4600db027319f6f7eba5da7b7ed99c8d864e41f8809f5810082b8deedc4e3c0e4a250f37e6833485b5d2f566076187997703b4f6944675fda1d22b30df36404de5a1ec56db419c8ad9b88c423d24b7e424122ef14fd4dcd38ade339140b16aaac4c41e7685ab07c58065efa79ddf1696c34c79b20251fc8803e04b7a5935cc985ed5efc54e753f95b485062014c93bb82b572fba7bc8926f222f9d95d814724b5817f7b17e6fdce0c3b5062652318707eedd6d39aa001c6754006ef45fa373c2f033881.23d982b9a96d36104a38bc962f814162951ea5a9059288e33f216c1ac502240ad78f0ae15d35c708e2504409daa98ec7fb6f61e75b6bc6ba90a86dd41ed5c2ec7839a2d2524491e8a193412380f43a4b3ef76ebcc335517bf36f5e5964c9bab99a84dccb4b91b595db0095ba6630c2af"
}
```

## 33. Forma `B` · código 474

| Campo | Valor |
|-------|-------|
| Escenario | 0022.1.4.1. moneda — propiedad ausente (474) |
| Ruta | `Metodo/0022/1_validaciones_js/4_moneda` |
| Escenarios con este patrón | 28 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | — |
| Claves | `idPeticion,respuestas` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `B\|http=200\|cifrado=si\|keys=idPeticion,respuestas\|codigo=474\|desc=` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038441",
    "metodo": "0022",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "nombreAcreedor": "Juan Perez",
          "bancoAcreedor": "CELEGATO",
          "qrTipo": 11,
          "canalPago": "BM",
          "tipo": "TEXT"
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
    "idPeticion": "CELEGATO1784038441",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "d2e8722cb59ca574de12d45c5e592f8a.a1724c639930e688b22944147cba3fd726717adbd365c8b1ced05647b687e36467376239a5ff2771baf71bec88bae30d02047728debc91a3cb051896880fccff35edb359b8a00944e8acafde83730e115b8df646d23a3df0353e419dcc76848f2730268f8224eee625a60d50eb67adae23a81991ff8c32b8f47fc8d56b380f73a041279e27762870e7d5421bffdd13ff42e9229aa69568354db746a8c01c44fc78e5c731806bfdb60da20599668b01c637bd94f98cc47f0238463e757f9b1fe9758a215454d1d0ee42758434e2535655586cc8d20621495fb4c969394c647f18b302363f9b5d0599c121b160a7e8af82b1d9f34020adb16f1df0294210c73e5127c9b98516aa37e922d9206fb3a14c70af72090931a5fec41effff3fe22d63c8c4512c118b47b5b534e4cee40c3e4b47a66a219b5e0c0d127e66fa535e891afc344120d02f73817dec45dfb08f7c484c65789deec7c00d2a6df0aa86d4a9c10d31fff6f65f37ec47e6007dddb688740fea4c891e6b54e0ca70525a65a4ab1611ebd559c3ba7d1b17776b94c3b84271f8237afaad337f05497994c82bf43034e916de1061568382909244b90cd12153f5e38f5e529280257c5c6f6eec011ac091da6056cb3829a9051984c35ea326aac094bf4e423220a6cd7d3127fd3b366157c755078e4656d867aa678f227058a22a06c041953c2d15a1807edc34779063c2.b35381a9553145dbd172c7d161f3c76536b1d47470ee54888813d1b422ae5e639fed779fba50a614b56e6f31bc5a377d956b9bcc5f09d1f4859eba56c4ed8896a32076da7c42c45e39a7096297083ece9e4867c9c48cdce3e9eede9e10229c309e1bd331c6d1191204b092369e9e31a7"
}
```

## 34. Forma `C` · código —

| Campo | Valor |
|-------|-------|
| Escenario | 0006.1.3.1. respuestas — propiedad ausente (455) |
| Ruta | `Metodo/0006/1_validaciones_js/3_respuestas` |
| Escenarios con este patrón | 16 |
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
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784038089",
    "metodo": "0006",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "69852374",
          "tipoIdentificador": "CELULAR",
          "banco": "CELEGATO",
          "cuenta": "1234567890",
          "producto": "PACA"
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
