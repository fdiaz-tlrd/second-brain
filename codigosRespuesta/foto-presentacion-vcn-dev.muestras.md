# Muestras request/response por patrón — VCN (dev)

Una muestra completa por **patrón estructural único** (el primer escenario que lo definió). Foto (matriz): [`foto-presentacion-vcn-dev.md`](foto-presentacion-vcn-dev.md).

| Campo | Valor |
|-------|-------|
| Servicio | VCN |
| Código fuente | dev |
| Fecha corrida | 2026-07-15T14:15:14.403Z |
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
    "idPeticion": "CELEGATO1784124219",
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
    "idPeticion": "CELEGATO1784124189",
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
    "idPeticion": "CELEGATO1784124252"
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
    "idPeticion": "CELEGATO1784124298"
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
  "respuesta": "54b5fd7d506d4b44f75955dabfa1e83a.688011e780adfea7232eaccb9e2244f9217a7ff35b3d19e8a521cc52a81ac858e5fd6197756d33a3db30b8f978ccad2513337c77ea9611a9e58479ac0e412d18ce3fe057d58b5d964961f565d6525ee4cbe7d7b6b7f86256c56c13b55f836faef2f880213b26abfa09493166f26fb57a2a2311c5b79a21b16397252672e3eee2484d4643fc549fad3a0dea99d9c8139da79848b13150b6044fa8f6c037670049b435b41dc03603191e48828e62b8a60d5c634bcff7182e3182b0cb63d98ac3305e351abb80d7e262203572a38c1650c59c5b14603e7fb578fd070243e8f09afb948d815575f1509ffc42e21fe409b908d703144e1db4c1136e5bc923f29d376cbd411a21aa61d384549ed1f78f9eeab299db10744d8a126773060caa5683c59967e3914bdfd3639869e6d72e94e818c7fd7909652a972f3da1cc2cb1d58241d5b219a376b614472002f04dbe3bfab35326f57c7f388525e7f53bd20ca28a0f6317d69d1dca3af0b37d6b0826be24555f1b0df584f922b017300c8526a1a5f671bad60a971e2ec72c9688ee6075ebae22cb15250f105e187f14f989bf1ca7667eabc027da3f004bcc81df51667e33efb5e8979bf6351a1720f936f3747a2cc932add9f4205e2f2830252778372c24f363be8b16fe001fb3c031fef7ee1930f2a3531864d510c61acc1cefd9b288c5495b613577b12ad1ffef8494148ada65fd7c.12f40d5fc94f7aec93f974184051e192a4652d211f56c38dfef2e151f5849820d0707dfe677835bb704959c05f71abb0977a42ab16dfc180f7aa5fe7f8e38cb62fd251c6817b2cb60b977b82d3cc0896"
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
    "idPeticion": "CELEGATO1784124205",
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
    "idPeticion": "CELEGATO1784124348",
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
    "idPeticion": "NAMEGATO1784124342",
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
    "idPeticion": "CELEGATO1784124228",
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
    "idPeticion": "CELEGATO1784124256"
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
    "idPeticion": "CELEGATO1784124890",
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
    "idPeticion": "CELEGATO1784124351",
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
    "idPeticion": "CELEGATO1784124300"
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
  "respuesta": "161af63709575152da207d5cad5d0d7c.5126af4b970044c384a07242da90d6d45ae6b6fd4d4ba991b58be623a2ec5013adfbad3a44330fdb61030a34833b6b7a96e6784cff9f025c0a4c7ce1f7f7df1042dd706511dce53be1f4ad23841e5ce2656fde3a57cf543d59d5b5a416f5ba0c087802db1ab399d758e9088a67d7afac18ec73d094fe8600e10c67ba1647a59595ab9cd63cdb36a6e96721c9278c944b4263aa573110cdb0b0fdb3b89a674f812a2022038ae6278e3d9660beef24fdc3fabc084399d41af3d5cd7ef4ec446bf00fb51466916f0de177c8de9b10244b40245781d3eed8729fd90e565e1bdd2a43dd47a28c8ee3f677c4ba0dfb46a3459fb0d2e58ba831a2b620308693ee98d2bc70c19e13397cf0383aeced014319dc200c2be549bd55df231eb04cd1a61e5eff6fa801c886871abd9c4f181c699583bbe4507d5325adc48fb64b6d02bcb837d36f7ecf670ce979b6df306e0341eba32d12c30edf85c394dd8bcfee5aa614b4dc434ab1defefd537c18ffc145a429ebf62c158e444ba431b66936ed1cfc76f19e0d10ba144bcd6fcd610671fe28adbcd98244a13a33bc09cd3c0c5fc3d998b95747a4b9703cde82761fb979776666c82e7d4ff06e39a810b7d2508a34a6b2ca159740614ebfe4476e0b3a9ff04024cbee8cb8ec079fe8145435fb2dcd09aeca8c465424f7bff7ac46a5486dbf06df3a834a4e4854506738b3aaa2bbb8a2d5f43f.8f46619751b161b21cf513bd9eee31851e34387065d5676705993e1789e6f921bdc7415ca6633832d20e144490a1c0f01d7e399d44a6b9205431153683d522cabb8cec7372d6628108f3f88f5bd78308"
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
    "idPeticion": "CELEGATO1784124304"
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
  "respuesta": "cfe6da59c2fe08ab1990df7ff8d741ad.3defba9e4ee19306a9abdf6ae48d9b33547bbef34ef8fb40f78204351f8a2639e14d4b3ec58f6492d09638d1e79b0400ce1a76837b9130cefca299ca92caa626b244a9d90c7637e44248b652d9fe2b4e12c51191f4b009d951e2a13003949d737095c20ef016de7e5bcf42df3c726f1c820fb8cc6d6f32430dadf3102adabc6a351bd5b535fb5225f5b2a3cdf136a555c8fe93458c0cf2049b2c2790901fec51c0383565902b83d461833ecb48fafbeba11aefdec8e8e5d6746094da836893a4cb2383b77dc6ef186b078805dabf4843cbf00c2ca79e3390f4ab02b6a7ee469de20e967daefb18965d4c5ce4445d9952368307549faf891597af20cf6267b707edbd0a5f99ec2f98b80d4bb5a7fb3dd876639c3ddd7cfc5874ddbf1df83e5263cde970e5d61b044b88430a1cdb48fb922eab604f2d9ddfbfe2758801b08660f39d708b0b6ca4ddcad1cf87ee9a954db09e5328fc97b69574ff4427fc21effe4e01883306df50c0441992786a0c5fa801aa8aba92004c8b4760597bfa8415b0a8d30f6a9b86c76e2dc8c87bd570bdd95e104b33ed1a339ebb6dea3bbae94168202c6ebec8a4473f669456fd517d4f40945c4a6819f95227c186e098b87a68ade71326d16bf74d19e30cfa2cf4205896f8cd6b725d101319914217ca078beec7ed73007d92aa8740e3e50e21e2e6aee16266d26d2228907ededc7b4f8c7021660c.46d4f5898d66835e70975f610e6c91d22f2c00a084e8245cae0c1df9356126d421247fe2589bf4f21783944bb64baf43a8024855ed234008d1fb2a2f8dc46cdcc99f98673084ab7e31cbd9ef1ce003b40c596f2db4b4c14109577840fa581121"
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
    "idPeticion": "CELEGATO1784124364",
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
    "idPeticion": "ARCHGATO1784124365",
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
  "respuesta": "ac54798f5923c1ef1dd173647d825bce.b8f344d8cb340a49f3837d03f738748a1de6ad48d906d747491c42c1505832fda55a1de70139b9e795e15651e27f0dd3f34294c1f491cf26791dc94a274c49523202523f51a06029b33c2749745acb448e0587bf4dbaab61fa3aa31743c44ecd74d55b7a4fc912f82477cafc22d6d5c7ead3caf6734c59877ccac2cc902db1e43fef41142a473091b1117c8327f7a05437698977324a67f5ed937cb85a7142d36b754b2ddbe498d45d1dce2e2c14eb71d90ce785e8857f65b98ed85df132f4ed847318f595d4ea105ddfce11ee35e2c63622d788818b6e87c8bc1633d8d1112b7719abdbe1ee08af85beed98d3fb4877f118550978167d45e16285f8735fe6cd41ca9b01161e0e976411589a82693abacad86265d4493f112c19f7b1ba566f2c541ad565fa066544a4ff17583cb23c69ef2903261aa59e3141d572c181e02e0d12359ca8404392252cff29dbdb04d6bacbb2be6d0e56fa7982e99b0a866e03b16bbf534b6aeb064075ad17ce4f19619a69f2aae492510a152c29165af56b0b1b399748e2b3ee0f6a5812e851764cc6b507507cb12c886072bc176027f6f7ed82d84123163024b5cadd976ac1c632cc81a53110ca5fcf5e4de56c35cfce31a23885f2f70e47904c456dcc37f3c8cc57893735a48c5b29d8899400481eb81e522117f4f006f75864eef318bf2638c89f97990379bbafc13de4d944d49de7d883de.eddf61aab2d676de4a1c8b915f0b9baf643aaa415234520769e39227dd5e5b0b217c71894e2f76fc6c5b7b4798c690668726bdaa92d7fdebd2d20d5875c75294773e364ed2e3b78c4f4e9ab178a3e8ec"
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
    "idPeticion": "CELEGATO1784124224",
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
    "idPeticion": "CELEGATO1784124878",
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
    "idPeticion": "CELEGATO1784124240",
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
    "idPeticion": "CELEGATO1784124240",
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
  "respuesta": "7aff39db2c1a4ad0b70d98c0c34a1cf7.bea400e701a2fe657b97d97752c34c1c1256d92008f217c191586f878952582eedbb442b35c232252db8009734bf6b2897180e14180e6cf27057faaa35ab0bd785e567b2d89af12c93cc8ca4a6b677a325cb75452a0fd079a523a8debdc41e3b407c46a83989efd978b59d03daedd13c2d93a61a5085fb45db088a95d496aa647b0028f2da51d97f4793f59e6c11100f2634daaf91bce7f545ba52e15434da2f6f96b22c85a94e7c909e0b58e057ed9e4cbaad18bd21f13e598f3aa5bdc2bd1399fd670b509ece5241ddfd6e0258a773c219d818f191db95cd32e91bf1a0bba98276e3b5ad7e53547a21d3bf3e92aebd49cbbc04eae112482ae980cd3f16c82854597922e4db01a6e646e4192e04bdc709dae1d1d3686ab1f2d057255a058250a91aae33de801fbba5b0e5a467a1d68e6a93881dea1c7df3b8a8e5c25ebc7b0b4d9abe1e6e96cd88fe11be47301bd9320d34f2dc610156fca93e8ed5f9b0979f5bcada618f38c96214591a2a06628932104ef318bdd7f6e1342c28d1e04539724bb392f5a22d8ee3f6963ad184972b3f46287746045a252056d757d4125c680bf3da1b72d6ae48db0dc19b174f1be559e2028b175c8af818478fde2e40ee8b4f60354cb1e30a44f92b65c2a781d7dc115fb1d94acd5a179ddf42f99f1384fbab9ded10cfed3ead3125381f0c1a255df9030907287de169d6d9968c494006546d.42e8a204167fba9cfbc0e9f1ed7fa2ea091c20f0aec7e3414180671a0fdb71f5dd7d488cc5dd685863c9ccf2fd3803d2b207d38084602bb2efef1100ff668a0107687295af888b79dcdedc681ea376406f39fc02de150defa13d2e317723b64e6e5776e70001c27c35952d254ae50a44da8c05185777184da58b116e25d0c25fe013439599e0026dbe83827809ee8adf86f9a5d305f3a24274d4fe640a71995847f41ed05d759548c3a68d57344f43a918d29341003925a7cb1166ebca7af4a214f5211bb12c89b81af9547af83af77dae1ab59055f460104018db583c47d11a"
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
    "idPeticion": "CELEGATO1784124367",
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
    "idPeticion": "CELEGATO1784124367",
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
  "respuesta": "c8225a7f459b79a1e0889501f36f30a7.945dac2658d0bb78d277fafd7c62360352c5bf8fc667673bc6890ef60e831f8fc393ceab5427a07e220b894b38bdbb32ae483e432ac6314d0fcdaee5c90e0670f58da26da39ef4a354d42f4f27343466bd8959fa26febb23116d62987dab97da36fa86ab834d85325cd88d68ed12fd10f8e9ba14881f09551b6e82b931f94e24d79d6204c16137eecd4a4b729233c170f9a114fbdaed76013e94c4d3ea63a9acc6e618a8b23636807fee972e0486af596eed86743759c6c3b2459267cd3cec6ef9e26f3fa8a63e2805a8e73b3f4cce1e707d119935d8b3f276f4e63433729a4e39de1a55b10cc69c56542282ec9bb2ccaebacb9ccff029bb330ed911ddaad4d04f854f74e78a23c570fb57649328b91bb8cdbddd131165f0b0d9e1f7493bca91a751f8f555c8655c1f4daca04be3d8a06a3349709a444c11f01ba4738ff369cfc6e9d3fc644eb21fece9f09a8ce8ec3fc989ff183ee4e3e8c1b8fb1fa1b5d1986808e0c958f3b25acae1e3be708c26049a9fafc06c1a18b9fdabcd757bafe405f30337da847f8a5be173a4b100c3c7117c5ee5f0579324453558421335237a7dcd46564ad4391a26119703b5b183d272afc9d637a3048ada5553088fbf337683d10074aa75748194d1119d62f429e3b198808581570a15a1340c4d85c72fe9acdad7dc9d3f860987ba8bc0d01136fab363397c1416e2086e74d8b0dbd789e019.3417196d06026739a1d3248c30ebb12f579d59d1ff5a2b14ac0cd978887f624a0552f3baabdd82838d9f38c44520c19024f6381299b875994c414a7cd29cef39e78c073a4b57a6ad8d77c63f3c6c47712db34b6f20376f49419793d1fd22273cdcd1d3a38e06c19c9c1847eab5b25f0d"
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
    "idPeticion": "CELEGATO1784124405",
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
    "idPeticion": "CELEGATO1784124405",
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
  "respuesta": "c1d4451348a7ed1c4b9e3baf361d4367.0e5481879bf0f92043fd829021b719ee6ae5c2b3970bad1318b8dfa23ed3bdc242986b2c3055594ce6eabb8902ba66eb1fa0156d1d5e9fdb32d272723c294cbae4a4b8484f0f8605cbcb891b8c05463fedeb3071afbe67451cdfb709b086826bb3af15cd0652da23cc38afc2fb53a6dbe89f672d322bc9d0b46ecce12cceb29fc7f34b4fbc0f18ca57517382fa2db032417896caf5feef1c80856534bc803d7d7a3be6301764af32ff0bff201d160c5f20d2bff2d49fa141a9667231b7db7ed6f9a03971a99ad47f95d27039c1a3caf8d87bfb357b3e3e6f3ce64687091379d4ec2c37663cac79e82046c239b13381b4ad1dc03db256ac88bba596c08f25c7f4e1ceb7d09e3acd83724df9731708957881bd490d8c2a5aa95d3541941cee51a8e05bd07f3f9eaf56b8c63b6980e1f0bfb63bea22636102b840b454e4f26d3ae570a865863f66a292fd1dc2809da081d5ea8119cec561af9067a1feb0d2ce8799c2c1755b1595045def977297a56bda284a66662228b0a969bfe3ac2e018c678869700dedbf72a3406e4140545eda35088f80e653b267022c6e0841bbe377b337fa09ff93399059732081916d1d3199cf1ba33019b5fa7b7ac809ad2b59250886c22407652dd53f1a0c76c72c37e6202234e3bba50ac5293f1d5a4b2f474eea18d808dd4822b560e4861aead7796d208a1afccd91470e214185c7ef92406396d2.023feddaedd1de16030bbbc80dbc8735e50f69e937c44f280d98f39570eaf3acb5611a2269bcbb2a769878b6d180c3689a7915ebf32b884796834b5f828b48abfe5b3abec106edd977a2d17725b602e02da8878cb23b9c7c090c4002658b4bffce716c3e5e115978c636198b1489122e"
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
    "idPeticion": "CELEGATO1784124408",
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
    "idPeticion": "CELEGATO1784124408",
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
  "respuesta": "fa0b7c079896f6f26bc8d8ec13ef697f.b678dc92e4ba17a53d216f0ad7e9c97584e4dbd33060b9a03fa22a495058e1f77f745e44759cb9d3ee465a4114318feec1f5d4d004deb928748adb1f75802774e06bea7e525b31c54f6e381bdc5c7f9396faafbd670edc8efe7beaf217368b2938cce05edc6733fd2e91fe3f6bb98f9be83918e940b80d63c9f4469528b13e0e3b3aed495e9ff61fc14f7113c1fec0edf48864b9337718ff06198e5f649736937ecb7327065db2875c9858e040a807916e4546f3a05b791df4ff2dc45d1458566a7612d48a79152223d4f3699a2d74e5a4392c0e8a43bb4380cee9684109dce535dc48a05d07ca488fadd7a31a5f24425e7d27baab34bc10b21ab5cc75a90c09083988eb67f0821fb5c32e5983f3ab9bf1b51637e5e0324c13e7d383b7c84fdd2ee0640fd4b46fd075c2a4d1120b0a7046bb912d96f80f9f013b2c236ddb56c7a6c6f6d33ccedd4309e676cae867b122c926f246b310c9bcff26f1a33a2c5825bd2df7460415309f3951f388ca989eb99404d07bec232af3f819a8dff4498c390e551628be42aece35762c82d1780acf93419c7836eb9b1fb6990ffb3715743ad216a3aefcf99d900ed45cebcc0b4bd2907628a2a0791e3954af58c6ca1d2aa02e42c67d0c577f318e261069dda2903adcbcbc5b3a3067fb953aa33daa25e949a64f8fa08b139e9f4a8e9df9b4b14b20f7748e8040aabc90a43caf0a6b89ea94.d7c4c79ce8b886ef3fb486b36ac58bf63332ce0ee802bda84424e0a4ca60b0ac56f9316dd05b61734af10493cd6ea3d18e0118f370fac88e2c0ac38c016a84bd1d19ef5f150ee4f232fbbb4e12e2859224b3a43be8de506c5a288a29161bdfb50cdfb0a0b594486a21c644d42f826425"
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
    "idPeticion": "CELEGATO1784124411",
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
    "idPeticion": "CELEGATO1784124411",
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
  "respuesta": "7ef86a47915d494177726c9d3ef7e9de.ded33317f440cf564ff486758410a5cc9a1ae6410497a0afb23e5b94c5ab1f556ff3a78a83d3eb23a11afcf6798f9d9d3e8cc17d3ba24b051f390923a20e0c284d69dd5f2eb604bd91494c63b5f4c1e50b0eb442a8056c1429a59239b0981bd85ae54671bab98015aab861040323ca13c8d9676e57f6c7cb12a21159532e5f91c3c615e0c28d84ddffa5d0e5e606a1d0c02c53cb1280aa15e8399330c20979f0c36eb0068eb97a2cc9b7792ed2799de4ebe740df69fec0612a20d8d4a32b0e9176c0d83400603f8edf0214ea1bdb8d65e6ebdb4a970e4ec18d3b719eb21822f8b03198524e29ee0beacecb7f492fa3d694e0dc8efb846b23392dd6f8d3f7e2c3cb324bd5f14c017d1cab151d95b0ffd788a0b4594ca042d5dd88e0c25fdcce1cd2b86af381206957ef6d89e6eb3ca4f128a0e1f79416f29c2f028e78295c7e2f556d3a7ce38a57d1fc39f01516d92be1b25a8cae1c8081f03a5a4712d934bcc14f49ce51ff1696e1192cfcc8821204971e7455c24ff7008b83cc1803b109877066d2dcf71dceadfc3abdd688c380b87bab619c8d42e09e782561518d97aec674f0c722bb4d8fa06475f827ab9adf43a7ef238e9f1cb717865e7107b8ad00fa9375b75ec7f604c7842af9252a166b92d0af62d0ae9cbb25919417ea437435dcf5fefed3209e9cabc8d20900388b07a40bcd356607827299b641156c7437d8b7f6.3668a33aedf4be859530a5d1917e0198b106dbeaa2d31dc3ea44244d5b4190f043469dad2645e2e6d9ef58ef2b639e57969916aa29808766408d4cda5a77c64d39363dfe3900c84c5dfc9b6720787f401e8671b1f9f50c04b3ecce724a6e61757c3ee0a326f2299d47cde9b61854df59"
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
    "idPeticion": "CELEGATO1784124413",
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
    "idPeticion": "CELEGATO1784124413",
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
  "respuesta": "1e1ca79d5b0f01cd8085e2bce7127a9f.cb7e68bcb9314f9d86ed678910484ebd30a488af1fbbf82760b8ed961a8c29215ce7eab2ec29c2909be00e7b5caea464128c13a1350b0adb8c556c1bbdc4bc9550d62f7e84cb42cacdab2a774209daf84f12a0735151f23d43e756fb9a7cb000df7ba8e6b33f9864b01b80c664da7757f64ad09b02accac2dcbcfdb9f45b81e0623d6cb300175e2dbebd560e0d662f9eadb65d5ae7dffc017d3c71d1b102ce6746ce945c81ac1b4a238ac50fd8a71af8a4032057dad93192b6c55641ed46c435130a437ec50983e362721c422a110bbccf0d22064ef33b71b846d1e07938396b9bf9fed596e644ee0ce105a56ee3e5d2c22161fa38fec525f5ba42116551687195d40beae00ee273ddaf161ec9d21a641e2af775c5c211daa341bca23f8c51e70f29e5cb90c1865a7a66b7d7b0415705ea4ead6697855d584efd4e4bf0b00481fa8ba59413b3f735a7693bcddfe5fd3da9392917d894654e1127e85cb6661366f5e6225973c39bd2e14bc0c47f4e4fb3f2b4ec88943032f031bd9f76c49c3157e1f6abbdd652890f3b658276e915e98769942d3263fcc946d9bd7f80ae258b2ea541c7b7bec759fefa5101654b7de38ad88beef123610fb2eebfc54f6006f3f9b534cd383f24f4020e994cce55e12015c2e191ee56a8bfb275a27925e65d88c86e30fccd3dccce3d89379d70cb1b424f073f9a1cabf61ed8768983b38ea14d0b.f8de22d203c2d9facaf6b6a9931b7ca8060ed45f0f986b26ce7a5eb9e6014288a57b72ef110a8796157858dc07181f2cf669f1dc90eb98755877c27b16d89aa446f4b588e5bf833dc1e0f57ae2a46205cf0bd677f95da5b4a476dc29568309c2248d78b3146c37f0a0865dbea6733226"
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
    "idPeticion": "CELEGATO1784124415",
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
    "idPeticion": "CELEGATO1784124415",
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
  "respuesta": "50c1674d4119b7320bcae773245dfe79.42e9b7c49cb580168263a173ec045b80a01d05d4c2d9170ec835e8a59a46a25e08e80af3d4d3f786a8c29d25b3a4917c7262867d9e755813d3ef2dcee0500eed4cc696b60d07c9b11f3b648850651d9f8c0f60e7455c75cf4a344fd5fc9857be688640259c5d3446b51b1e971ef1c3d09d2d8e94e1a4b990961deb45834dd650c33820cfbecba1d4755fc382067e2e12442a68af4233bc6b70e5f0e92f300f7e8ee6ff64e827746da824f2b5a7dd9a354ce98f536c1f9d5110df5d00c52e1666c7834cb9d12f068cf60b6416d3550ac28a0bc74ef674a026c49d41fb74e4e1ead60fbb7c39f823cf382a28d5d088a5d230ae4ce0f029e22c49441fb07ca5f845ca6c93027d662233a408194c5defe68e3e2684674b35c3cc152854b788fb8406b6ce0ec72fdd85c930160fc6483e6151228e7d580101dd88aeedf95572772d16c7a9606557e1eec61d7cb969645b7de009b8833ee1776b629fddd78f0ed0a2988b7d16de7a6afc53f05263e178ce2a190c8c5952b289a4389492c4fd930b9b26e952ad24f635431e85ab4ce677d9a2eeca6e810b3bec25583560394d52582d3e48d55bba2e219f86be1b0e5e8fafb179e2593f0ce119fa7510f78d3a28e2ad173d41b4c099b16c91d6d18311a6d333056af16a37e92c31ad5c93f60197b4a3b8139c6b947c03d860530a9f6d97806f7519b64104405502a660889d45f9932976.0d66d3807d214ce7f9d60d7049ea2672afa5e7c6e54e31a37d21a85df1dbd08d967b6dce85edc872347f1245c1d6374705b50adf0a000828bf08dabf645a51e0296256f6e977e0b6820eadb374b7fe2836749395b68e0d9c7e4b392078a06c589595f765ca17895650868444c458cca1"
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
    "idPeticion": "CELEGATO1784124417",
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
    "idPeticion": "CELEGATO1784124417",
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
  "respuesta": "e0e5bff2dc0fe4c5e6d9239f9e1f9695.93026144964c534d54ecc5876354b29c279e93f52e457a11be84f1480b14c026e4915393803ef7393f71cb5dab9b9b0a71d410fd23f81f02a1ae3408c4e725553189ec3e0c608c2d4a7217e929dee3a6e3e3e41d0405d76b43447a9716591757ce7a19ae58b84c68d2e092d2b0b25478a11b58a811f5ee6f86b50421510119c671a402c690fb96be36a06f4a0a88fc5b58f1563a5d012c524176aded91ff513d3aa722346bd4b193eef68fa0398081ebc4524afd3ea0844428f3fbcf097fd5bf19232475d9bb3e77608ecb23c5bdc30836ec38f141ec1aa45e48931debd50755f6e93b3332c0fad31fe07338586e087e9fbc7bdeed3bfb1c6010b28406802a5c1192c99fb9eb873897c39cc61ff00a637fb77fd03588c500b8a815d048c49bf058635361a15d447ea7e9c17c9c0922c96e7bea7fbf634b6cdb115bfb2fe47969f50bd13932da3507265f51aaade0f9b4786f37c32fe59be54b349f134630d49010a698fe97700dadcb87a98e0cfb34359510c56df2c165aab4de99b0be329efe81f79ae52631d60a20dc609b2ed2b1183bdfc5390189e97ee572d6355654c40a4657f151e53ac5e9156191d9e3dd16379b4ed37a262afaf5739a349e28397c584fdb2ce0bad47ed646c1dce3b30afbeadca1b9195085c7c77780a1c8e7635b931845bfe1f275f2c33378afc52ac6f68a03afebe565e3edb557ba19d60cb9696f.52798dc161eb4da868321963d37912c3b52a506cbd45d9546897bcb5400351f1d9caa0d940ee0b29a25ceacadfca4d40a94da739aae2633add2bd7db3075ba0ba301de41dc7d37b5caf64b2afafea587ad4e2aa80111040e3f6d90c705b5f1d9b754d872287b55859b2763b2c6f78c29"
}
```
