# Muestras request/response por patrón — VCN (dev)

Una muestra completa por **patrón estructural único** (el primer escenario que lo definió). Foto (matriz): [`foto-presentacion-vcn-dev.md`](foto-presentacion-vcn-dev.md).

| Campo | Valor |
|-------|-------|
| Servicio | VCN |
| Código fuente | dev |
| Fecha corrida | 2026-07-14T16:03:13.977Z |
| Nivel ejecución | MATRIZ |
| Patrones con muestra | 26 |
| Nota | foto presentacion contratos codigo fuente dev |

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
    "idPeticion": "CELEGATO1784044294",
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
    "idPeticion": "CELEGATO1784044267",
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
    "idPeticion": "CELEGATO1784044326"
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
| Escenario | 0001.3.1008.1.2. validador por SWIFT CELEGATO — cuenta feliz (exito) |
| Ruta | `Metodo/0001/3_respuestaExitosa/1008` |
| Escenarios con este patrón | 32 |
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
  "validador": "CELEGATO",
  "peticion": {
    "idPeticion": "CELEGATO1784044599",
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
    "codigoError": 400,
    "mensajeError": "Error en la petición original"
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "013f111b319f7404eb8986ffa87085ca.8165aeeea596dd4795b7dfb7a4175fe1a3c53ffda56e475b1ae9bdc09ccaceb363c0bf9cc4998edf7c0119680e5163c8eefdf864db9c8858c052d2630e5309cbc0e4f928edeb7ddf2b1f7e83c02b4e93b779b736a4a91b24a0e4756e3c836d77b5059207021cf121a52780c68d6c849e88c962aab20db9e9fed250488ea968a72fb4e977d3416f6ef153a94c114ad613387affc7ac684734dc184796bc38ee7b3303b4e3a4b4179587890c59224d504a7b73e5021935550d4524bbd5e6347615d7f9c5e33b99fa145b4c54e943e0607f94442cbef95a8439bd206025c855bcd3fe28b3cf47987a620a5a7630da83fc57d82167d3038fa8c58fdf51b4ebc1f3fc0fe54f26d6ecf05cfdda336f14aed5715f913f09ce4be003dce2226751441b1236e466942ee1eee9830aa62b0f965c28382f7dc287666fdc313ccda89c3296b08e0519f96994680016da7ef00be70030669a163722e38603bd09ba34163a0406f06c6a42074603daa380b18ab9b47c6effd1740ac1d673401bd63bd5bf91c87faacdbe15a409e29c7f97e87d0bdd3cda08c68bdc97e372678a70008e432a8bda20eaf1634a416d27ccaff0fff0c37405dc9370cdb1bd251f47c873b34c50109c05d080af4816dffd3f1a42cc40c4c5175d864f747623cfc2c5e664904846fd6bb45dadcb3fbb913f4a9ee27145c24af8249ddaf1de29e4300bb1cc931fcbb86f.29cc40359b85e8226d70785e1b833b6a1e2e60693271df1ca42ad1e0e336ef33530dea27f16b7599c8a0e4e2a1964dbbae039799f2a413b51b051d0addc4e7d3cd5faaa78c664a55d9fe47a954cf8799"
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
    "idPeticion": "CELEGATO1784044279",
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
    "idPeticion": "CELEGATO1784044425",
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
    "idPeticion": "NAMEGATO1784044418",
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
    "idPeticion": "CELEGATO1784044303",
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
    "idPeticion": "CELEGATO1784044330"
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
    "idPeticion": "CELEGATO1784044970",
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
| Escenario | 2.4.1. metodo — no está en CFG_METODOS_LIMITES_JSON (418) |
| Ruta | `General/2_reglaNegocio/4_metodo` |
| Escenarios con este patrón | 4 |
| HTTP | 200 |
| Cifrado (cable) | no |
| Formato lambda | plano |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=418\|desc=Metodo no soportado por el validador` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "validador": "0001",
  "peticion": {
    "idPeticion": "CELEGATO1784044436",
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
  "codigoError": 418,
  "mensajeError": "Metodo no soportado por el validador"
}
```

## 13. Forma `A.mensajeError` · código 418

| Campo | Valor |
|-------|-------|
| Escenario | 2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO] |
| Ruta | `General/2_reglaNegocio/4_metodo` |
| Escenarios con este patrón | 4 |
| HTTP | 200 |
| Cifrado (cable) | sí |
| Formato lambda | cifrado |
| Campo texto | mensajeError |
| Claves | `codigoError,mensajeError` |
| URL lambda | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Pattern key | `A.mensajeError\|http=200\|cifrado=si\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=418\|desc=Método no soportado` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1018",
  "validador": "0001",
  "peticion": {
    "idPeticion": "ARCHGATO1784044438",
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
    "mensajeError": "Método no soportado"
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "aa0c64b0c26bf229fac8ddd1db5c3ce8.1d417aa780fad9481746c76999a82a47462752012df10c1d5dc978380659c02408c4dac915808418c4f08de502af2b6e89371ece2fd80e692fc3671d61069b5d6472412b9003eebdb91752215e81688a3ffc1dfabcb74116dbd5c31530d92c2be9275f8f29e4f0ff9700463001810c54b03fedabe9b5a3dddfee005e075811c02fcb1549ca100e79ee66dd796019910a30715633a3bc3a1340fc7dca506df9046aa06b2ad5d00f0ce4d2cc9e92ab331737e71805eb7026cff75e7f94524022ffc159fcc05e64a388a0ede2b88674f71ed86520f482238b30169164477f07763b8d4b614c32471d1f1735e5a8844869abe7cd8b56f1333686651097e68908dcd4e155c335799e394a6f73b938b7d14596a6002c7bb73f031d46033e9a148388460ece5d77cb40e041bb8163e48c66d3aeb6c6ebd1480a169396485358082c2151fb2c214c6dbd3f399099f2de684246113ce81d5d7a6e8aedd56be13fe056defd3a9e4f22bc45bced648c86b245c22755bea02720e39151c0c8c8e4f70af19afb3323b436ec063539f061ee0aa93f7399bcec21436c08daa87b1bd8bd6c5256bb1e5220a524b4bb73d591d2ffdf15bda800261ca72c25c349ecc46de4e24b173ea135338aa56772bd22810533a2a28346cda21711ff0533bb41992c20adb0fc53fcafa129c7ce8dad9e7e221efad6abb18613ec7482a9595485147c6a34170060.090f409935cb0233af9660ed63d0b070e177fd2fea82b2052b0a4b9bffc759ab137b26e7ce16c842d719e84dca32a4639c9ca6dd2bf514744409df5edc8365f2"
}
```

## 14. Forma `A.mensajeError` · código 425

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
    "idPeticion": "CELEGATO1784044372"
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
  "respuesta": "6547ab82097d9c1e372e853c8d39645d.1b5ba21471826c43ebc12026cea15074937292b7b480bd754d4ee95e506b8995508d6fac9a1bb2cee43e12ea8ecdc5184afcf05a47b163ac2e8bfb1229bbedad6e4b38193090212ece78a74947b1cd40244027c89fbaf9a1bb94a32947b5d13d8a1dd6ee43889cf250c93b086971a6ee3e61cb69f5c4df6151b365e66634ee80a8391a6916fc434e4797ab7ded745cd4451c2bd6c81cb9b4c7dc63ea58ea7a444f71733b96912f8194f5c576a0966e6a755cf84736947ab9e7d3e0a007f694fb79727cfc5a7e44876084f2340d4551d3112fe27a6ee6b43cbdb7440ab6614a61a3125a3d6ab98d4d83bd28fc4bd2947e0f7f7bf942973793f62f9b2e8577c921beb78cc80f8f130ec8600751d28de455bb13d520b4028931aefd44954fc788f9efc995e4fc556e802804279b6bf6c2e6f7497941fdee12bab49fbb413fcf3981751a3ef6fd226506a0ccb4acef71700f6450d1f5abf8104848118dbcfd6e692814d04878fbf986d3d6aedcc6ccc824373790f5cfd94d64e6b1b9cb3da1613779c6bcd240e149b09c447566702921fd28fd75224bd0c21bba2ce479a93fd033e72a839816824b5f26501514a8be5c9214e8c4f84078d6c6c55974e38bff02d64272c6991b2d2c0256ea4ad6a97a80eb0fede8e61dfbaa7ff7b1f81b9bda9e08c00d717d827e7b4f47baaa5d7ee0503414a5049cb11aea602096194b2c7671cf38.bb16df8faf4c1066b832910f822b65a413f2ed93f0df205a4906db55a79537bf4c2a2e3965c0167df2d225ab628122336b1b0893ad45e77ceef76f5f135a7df1b4c1b80dc465d35e55f60fea9ed9e2cb"
}
```

## 15. Forma `A.mensajeError` · código 431

| Campo | Valor |
|-------|-------|
| Escenario | 1.5.4. solicitudes — sin propiedad idSolicitud (431) |
| Ruta | `General/1_validaciones_js/5_solicitudes` |
| Escenarios con este patrón | 88 |
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
    "idPeticion": "CELEGATO1784044377"
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
  "respuesta": "05a0e1e7df0c272c2b2d0af17e05c384.984380366fcec5f150e617f849b69ef1958dad345b6093ec369688c5bf3a701de641890177160bb98c49c1206e82f9f655e248c35c8f7852224fa93e07f3d8c92a88462dbb3fe3b42b77de382feafe5bd2693a736b81858620a8e4ebe116224a1ad849cf67ad33891b3a4c2c12a60c03fa7cefef1b27a550463425bc36b96dfc35ab76702fe4ad751314830d941367c79d5a23781df80528c7ac154a4a1389775ba6a8cd11a4531fa90ba5bfd83e6443033973e1a26dff4caa6ee93204807cb03a2c025d40f11349800d00d8732ba145c59b6896b1231e4db66cedef2666ab8a8021c239280153d9d9257320bae6ca35699a264280ae71e73bfe1aaeb4b4fb202b387a3a907c4e71f6b603cf28d94fcea05318e781af5d5c9f66a690872a6886918d27a8d2f5aea70b9d3b067c30b3f22cfda01b1a67db749fbb62920b5e306834144d9ff6eecd4d8183d05bc53969e3e8f9a0e296ac882cdc7245ec483606c565ee5bca4e9ccd2ffb3a4dd7fd2ffbd2458e8099fb14f5c6a0eaead6a800fb947706e2cde0b7b15ac9f2cd7f7a9bcaca5ed13a8c465fff75d0ea1d7422d8a19a1521dd7238c9b03f4fbf65d6cae751e042fe3ffde4051e90abca0b35570c78b573274ba81aaf4915bd0d4214a1ce4b569e5100850c28666a95bd6d8ed5d2e6c34615c705f9ffa571089aa1b353994d98826d59dca19a82c540e3a34e7d3c1ff6.0f551dd350732125a177667db3bd9ae0e645072e2a6b7b87062e1ca76103102d3ab12c593b750f39592f3d35b982f1edb30baf63e0c4d48786e69d841d97a90364e4d6314de8ccbfc0fbb1bcc3620daed77765b07ee6193693b164f0b0a5ec40"
}
```

## 16. Forma `A.mensajeError` · código 500

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
| Pattern key | `A.mensajeError\|http=200\|cifrado=no\|campo=mensajeError\|keys=codigoError,mensajeError\|codigo=500\|desc=ERROR: Excepción no controlada al momento de buscar la información del canal` |

### Request (`reqClaro`)

```json
{
  "idCanal": "1008",
  "peticion": {
    "idPeticion": "CELEGATO1784044298",
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
  "mensajeError": "ERROR: Excepción no controlada al momento de buscar la información del canal"
}
```

## 17. Forma `A.mensajeError` · código 509

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

## 18. Forma `A.mensajeError` · código 599

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
    "idPeticion": "CELEGATO1784044958",
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

## 19. Forma `B` · código 0

| Campo | Valor |
|-------|-------|
| Escenario | 1.2.15. validador — distinto a {{CANAL_VALIDADOR}} (CANAL_EMISOR) (400) |
| Ruta | `General/1_validaciones_js/2_validador` |
| Escenarios con este patrón | 604 |
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
    "idPeticion": "CELEGATO1784044315",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "ed1529f17601ba4d8ec1a64cfd20a776.3e82102f7219d70ce9aea1d7eb6817689e27b981e9aeea34191f48d41a8bbfd1e676b9613421864821d616d538fbf68c99acd8d41c1a9454901f25f2de5d31250bf39685010f5f58d75815b19555cc73c30735c6fdd838a73460562e42431da35921941ea576c038be378f37aef17e760700804f3b6d5a11c72598a95a5a26b06ac19a5faca94772a65bf20cb624d10f6bd348d5457417947b2b10726314cdebf597caca9f369f191a56615390dbb9037acb55426eec0c1a00b9b0ed654e6a15897345902ef36b6be1be29520be143fece1aa24cf90ae2e466e23b698328fe3268a80246d6b525aaba5be03f8871e05b099e91b1b2354c61ad35a753d492f6ef75abd396b088b2a646abc22b611182d053b26f874ebb9a9f54f411d1e801e21288e1e2ce43acab905f18adf54ca444ad921fcc05e0c0d8b705e445633bc07f2053db1d625eaf2885238cff49da63b50af665e022d0aa25f195d85dbdd3ab0acfb18a9dc11abf06edac4cb6c7c379938cc6edcfb24d91a813631f30ee64b8232cf1c8301beff57e403f013e85a2c8f97028a5a3cbf3a01531ab7b9f6785b44676f765b0b14c45705fe5f90063dc859811d2146e7540c5ec8e6a339cb9946f6063b7300d919ad9d44dd364dcc990a2c89c7401b3be26ab2cc1c0981edd7fbc374d91a6aac721b336c9e5494eaa2a883f5747b23174d90d86268a342df4d7a95dd3.cd4ba98727b76b810a8349f4ee4677f696072225f38e295156cb1309047366eb16ab71efdd87e6a9c77c00935c714b3799b309b1a242776a2ffa9a4c6adb3cebfea571888c6ad167e3b179364fbc33f1102829c81de3c24aab019f6467ad4bc6fdf8231d9223ee5eb5401f4f43cb10180e0a0a5736278182fb48333368545d7e691ce0ec6ab91a50f26305bfb03a45ff927bf03210bf62f009ade8d41e53d4970812ffa0661366725e25c716bf50c6ed8383bc74d5f222510566e57e28392255b49be15c694acc89231afcd3b4763310a338c09f660093520fb673e40512ad4c"
}
```

## 20. Forma `B` · código 413

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
    "idPeticion": "CELEGATO1784044440",
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

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "6657648ce5ae364f7b27eacf5ee98c03.ad9211d9db8782351ac2501f05921e6bec32e025246fe4fff5dca848b305163522a55c3de0033d145c5a92d5c9ce20b65116d656c752a738cd26a71286ff60d08085761cb64457710e80006386a8b2972203ec3adf54e9cebe42a7b9509d53c7a5918b3a8784685f6c97c0bd10a59b1739aa3b2a7483c050bb32e71abd325c0464ebea6b66a2905f13cf45b3348d6852f8d597bdbf6e7ac3652bfa22e8086894433a0f1674acff1b55371c709fed33fa6aa97a4bd7a28740ade4c945d7c90323afd76d32b0a2ade4b17de08536e4ee176a4369eda5ca7213f9d16805c28a6f157c9572b43db9281f57974de9a3fb1ff4369141b0a83e4459fbb5dd9e644261876c1635e68a2a74774618f9e6b50420b22579086081285f2b8af7db995619929bbb3e2fd2d3b58f74d5fc4293ce66065deeacc154bc097541d009139b5b48bdbc5be63c405eaa1fa2768f7267b5b96d239873c577382d0fb83b639930aa7f730debc5d8283718c2288dad348317c3fed3b5cba6e2342e8a806a23e81cc6935f137fbe03beca1ef6bb7e4dc981c1a0d0754520898bfe578ca2ed1ebffa644ec38e98271f7a7871f5b39fcfd9a1a2ab1773b08f9595aa3ac9c70451ceb59e3e6665adc497c35353e8e09b671fdd04fa17954c9193bb995967b66fa45e278c1de63fc50256fb9c85449c312e1a78054f193d0492b9f199135e96a45607a3eda2b043.42f0db4fd9983b086dee37949eb2c4d5fdc684d1147b8a9c688ebca513c5463c05ef9a92bf552cedd9026ebd49bf58182da336159f929104d8c98a0cea2ff1d1326464daa188452b2857e3eddbebc73d1318b716a333b0bfd6fd706ac48a405b6aecd3178c2bf44743dcf7495fb3bb91"
}
```

## 21. Forma `B` · código 510

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
    "idPeticion": "CELEGATO1784044478",
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
    "idPeticion": "CELEGATO1784044478",
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
  "respuesta": "11d92fb4d343e6a9324e30c818f55e93.b80cf27402812f1b0bff9282c18b1f94ddcf3dbc9e3ada4693792db99cf9546d4058933f26e3b99bbfbf7e4d3489bfda2121d425fbee9c5b9010773049271e10a6588c3017cc6b2232ad30adbad55ff9fcde10cab9f8f3f7b395ffb25f4463c9628a6ceb4dd92fcede0d579ef9adac950c4b3efb58247cd881c0427d1b622f5c6aceb54be2fee23a05e571f04e64c885d8c18673474fc9bf870f22ded3264b476ff4e68eec2acc92f0f579fffd67e8f7e6166c27dfda1d1f5fc446122b4d9a2ac807a2b480ffa8b27db32321af98c09864bb715c0eb993a63931d04fb0f5d11fbce5c563fb9cdf37fd881df60560dc0787578a0ae7f1882752f4aa3c59661e67e6b26311d718bac70072b5a2e10bed75e82690903fecada35e092c0610ced005b44b4ad867737a9ebe84fcf7182eafd08a96b208292d65b3bfc8118adf35c23aabd6b90e8fa9439ed66786247632864f955af7953d61d870cedbbf88132eae5c946ddfd397cd0ac696904b0b4e16bd82ba5e5507a6fee866e6e243a36612b44e3ef139f478050f86cb5d256e666bf5be2e4814c67e2738fad07b0261f71244c51c5ff67890b7c4cb8e308e2d42368213d13ed6eb60168980ac5397368707e7bf738feddf8dccdbaa5b6f8db2e4db2ca81c2004c626168c26a7cf7ce508a6c6171a3fceb65fd501a5f79c00065a70fee08df22516f97a417f70cc108929ec42b1.fe2ccfbef372efb66904754fc1f2156d2b0444a089b79331507f71f4e0c7b2d074ee3548cf084af1fe65c9c21e02db35b1d7786c2453e927992f0d7b2fe85f7aa42e17ef7e1db76a28f625bd84065e5c14c20236ae2bff92a58970f74870166028c30b95a4fad4c6eddfd1753ba36d7e"
}
```

## 22. Forma `B` · código 511

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
    "idPeticion": "CELEGATO1784044481",
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
    "idPeticion": "CELEGATO1784044481",
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
  "respuesta": "1905dd4fa02a7e047772b0062db93f53.c83d8273671bc38d38d7e317a8c9d30310b8b9e6b6eae8d01c41d7a7e1fb3762c7adb7ffd0ceb4aa4682e8cd5a8e9355dd16670427162f6020b7d88e71b936f90323b2c770d6b95a9ac515f48bacb0c9827dcae43212bbba59b1a4ec0746cb2041ad2584f49c9be4e9e4aede013a4655a7c974aafb5652dcaae6fe61c19756cb22201397db90b5273ddef0e0919675f3f8a8e615924f8339a052d79d87084f7b20b8da1c96389140d8561df2f834153ad82bf29f10680b2d39a5535d97a12c7061a6dc0e8271b872f4978e422ab5faf065371d8c7541da30d2757142a0f6f27625d8ed6c684412b2f82fd75b75811852b0498bdaa17984bffcee8f7f995691c66f651044b0ec6fbf3248dddb2291651d777f9bf6649b6937acafc14d2ff097191b18b69b91a16cd044f6b957e7f16a75978e76e4f9354aa52a70719db1795d556dd12f6e5b9f4654fd9ab7991c213c66ab1955daf8e095157cfb854063fb61d8fa398a00c0e8d5a79262e90eaec4a035a8f92b6aef902c591384881002eadd230e44e369946624b277151bc42a8f208cf10beb250b43cbb7234aa1ee5387f679de1006e37064c63290b4c6473caf33e8df6d39b4db33f44338ed5f6d20560563bbe7c888a079f13a4070898ace1735c07f3b28c6d3e44bd72be19f9b36b651028b44c98297f528a7b47d631af722fb94758e2bccdfff670cabd64bae6e5c3507.183e1dbe050c961b723c701489de4058f9166d3aa576f462047e919c90f10e628381b3e977ad09d0085395f82561d2faa39d01807209cd1f064298af9919bf43aff043826fc88cb4578af4321094ced9e418ebf034e957d8217579d2f9034fda2703a1d68bfe53f2f981f1e4967bfc57"
}
```

## 23. Forma `B` · código 512

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
    "idPeticion": "CELEGATO1784044483",
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
    "idPeticion": "CELEGATO1784044483",
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
  "respuesta": "46e99805a201bdd48fccf27a720cb340.082bb173e65dfc17e0ad383be35e7a1998d2503a532a009451fad05620682af4a4a55481b7b5bc107fce1749df744344614393189c63e890b7aa7f3ba94131edff918e75a7edd81626b5e930be8fac3f4601587663150c41e3479996ebec3db7d00da4e4c207f29d1cccdba391bf48283d1098fadacde8a4f36e2b087cad3e3fc54e27a586c2634a97cd1d21964059caa5e030dc6686748d0629c997aa458c9c47d2ebafb874862628c8e2e67db64472c04baf6bdde4d3245070928670484fab9d6dac0abe0d89eea7ba2a23de640d18dc1b0502c4892a5515f949073356f1d96e8296d5329d9d3c8560aff30fb35a7f503ccf24cc53a24dcde78c88bb07d11d8b1f14dc04ffc4a3cc091830402799c42c110c8356bc66d8dc3ecc2405b9838a41a16aee28c0c2108cbfc2146a6ec3a9f7c15f79fe0021a6b92b993486c2a0f9f1c44be6a9880dc633987553a4a41e00928fad7473f14b92db3d7d19ecbc8f36f483c18ec47d6bdae7822e636eb2296d6d87ee7ece8275a155328bb38cc9a0bd6ff6c1b0a83877e5cd9d583affd5e598096bf0648a45f2792d9fdd2672c67072a2eed43050638575eed26024a96a8670642256e05647c661920e819bcb4ef4aa39163ed7df0a4fba21f7160cb6a472051d5ecbbc64d92a10657a5d1723e742d9417bf0e8f531304a9c263f60dd0e4d9911d31323e06744131d02a66d431c974f.494ed65d581dcc2c1785c4f0e2aef0c13b4db0c690eb7e1f25c3ea066ab0f9ac8bf6642d6ca5dc9fa57106340989920a2a1de6cc08e927cb0723777fe98f7a2a86f3577df6f27abc2a57e583e2befb7a26bed8e6b75efb4c713179e9545de87656e010784878be7bff067465ede2fb79"
}
```

## 24. Forma `B` · código 513

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
    "idPeticion": "CELEGATO1784044486",
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
    "idPeticion": "CELEGATO1784044486",
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
  "respuesta": "39cd33b386332b56ef90ac46d80b87a0.426b0dbefd1d30cf4e7224c67f83b50876028ea33bf48a4583a7ef1cce05d3451100ba6b25f6c5e013e3ae50404f45c23e204c9bbf8c451cccbbe527f04b2cd21b50a79c84b4c1477afaf11043e56c51a207553bce5cfc9540d3cb6cfce86f46f9fcbb91081024e3af35df98f67582d3c35b02592841c793b40663e57aa246f10891e38525e9d0ef8ac081774a3707f6732f3dba60313713da42f48eda3a5fd51a2472f0e286fdf9293ad5a03ca5c924fec818cabd617247ba30386d59a9a99447b4e2a2ee5008dda416767ba83ecad56f5ad27d967b19d2fe3c19e71c94101bf4704ce32db45d00021ae4d1b25325eae2b1714974657fec730fe398f1266cc82c088b1165472998512c3b1edeb4582cbe98f6ceb80e309b9c4566d379e28704780efb7eb5d874010628d898fa028a485da5149e6de0f8a1f6b5e0edeafa9af4a9535ecb698b5ac690635d7ef52ea9ac649f7a0643a11415623565d00f295ada954260eac28e0a7cb0de96bbf4bb7def211371c66aeaca787a9ac10e9472817c336b66d63964adda9a4356d85da54b708fd112aa50b017b78200f750a8ccb4d73511ca0b621f1c2e912106928f1acdac32c71449b350fb57462bb259a50f6996b59dad991aeb3f5a51a6290df2f57114f1de93b66bb57e3dd39bc8072ad152a223f10895955450b3d978b31c2f79c5e2553accd05e7460ef4f96965005303a50.a6601a1f6453d0ed4b235930be2a98122f820c1a5167025860429e74389aca9e441550f7eab858179bf0aba952b52aa20addbe4894104495b5d738fb8fc0c3bcc6ff8cb1ca9402f6b4b4cacfcc8e0e6ec370e16dd3f4df58679b1a6a122142449a864a1be475c20d9ec18bce3eb1a938"
}
```

## 25. Forma `B` · código 514

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
    "idPeticion": "CELEGATO1784044488",
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
    "idPeticion": "CELEGATO1784044488",
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
  "respuesta": "a9dafe6b5de1584912749995eb915e14.00c1c507f47753a546142ff46b52bc13b432de005a123882bef2f33addd6ad658bc622a71fd0d1f556353e73e0071a7d5583b6c443f5b4c77314003f368f2fe799c5d96b9403bd0571e0cab2b814d1310ed08a9c58905a13d0a1fbfd7d84d468ce083d7cf591e9d691ffcab8a33b0655b5449b3c7e0ee775389faeffa25ae26bbb85bf21ea4a81919d1d227003da64621118468713b8fa16cd370977a7d7cda04b5df59e622ac69db9a6dbf3939ce43a2c25fdc4d235e3c0d2c28d5202fa91f291f5a01bb28c4cedf335605a3521dd0d7a7010bc213d828396658edd399e53434544eb1e943f5b877f8222ea9d25b588df5864da3513d135a5e6efc1ba7ac709cddd5e802601ab9eaf68a0fc30f297d2ac0215a837a82826c439cac62270244ebb0a0f5cd5f9f2181ab8fb6462798ef4806df2bdc1e2db990920415f54475ad41523a161e0985bf32dba3886d02695a1393a81abdd668e6420415e1733a723f4bc412d1f78758b71a1071c917a3d8bcdc683220e1a2d4fbb299acb5abd19aaa760340447f798925b7c0ed0e879e7bc4d207d12d68cd868dc9eb971a652bb5a1a2652f9d5a6bf1785be191e2be5a951ef1151df092b3735806afa92827ba7ce8b9c4026095ef167fbb899da488af836aade5cfb6d775f6ee80f07b94da87e04742852ce722eae9bd74460f02a58b4e65092cf45d7f4d015a6d4ee18c3d7afd03b.0a9ed1d2d0df48072bdeccfd45eb5af7fbc76b144af7fdbcd3bcf4e14476f0adc656b5cf1a2d31b6f449f31aef354107c8f101541776276a7784e768d3a0c9d14402e9c2c4616ac1d2a311ba08788bc1eda022b35c688151a776f53a6c31de72e355c531471fb4c5a7440cb3adee15e3"
}
```

## 26. Forma `B` · código 515

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
    "idPeticion": "CELEGATO1784044491",
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
    "idPeticion": "CELEGATO1784044491",
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
  "respuesta": "678413f68dd545939b768e83b5c0076d.4bc2412d7e2cf07cf29a8f28a871906b75e4abfc5efdfc7847a0f3db084fc66376cf2e455cfbed775cec8f401c9d95ecd4bff913ec91b92a1f3a9a787eff40c3eb73b9c3c9b512dd452cae6d57a3b1164cf16425f1057542aac584075451f6be84a14c5915936c4dcc7c5561f77e6bcff07cedd992a0593ae5241b95171119a0266cfef48bb78ca565bb29198d8d729b63c7f1a7b56cc6d74b6e6471a9428bdbf617ed92427a91c68a4e37c7da8acd009b7b289a99136de5ee2576f53e276b96c963a90a612c99d2f8de600e37495cce855bc8dd68206c3d4b3f938a4fb436f875928b66a77c6418b8f77312978f7c505f981a58f622a2a51a4fe3032d2ab15085628ea72e604ad8c461d5105447eaf7e406754a0cacf4ec5eb066ae920fece89455725e747919aa72a23a7c0a66cf5bd0ea8400f99040e226ba758f585dbdc2b949a18480b5458fc64c36a2d3359dad4c53502e9a3fbe25bfb62115ce6f64b6f58c2048d8e7447a3b1f13b120cd58d14b2c0a55621882167d44a180bff4240244485d7028c11dad96a073e3788946d101d7e608644db0d26dd291ea0857a47b5227947fa367d348c4ae3e98ab7dc810a5a20d4f60838327fc51d442de75e5cc4ebacde92104791548a6f4f716750e7e0cf4d35e9ced0e2deca03a5e3ecb5da2a7ddcbc141643fb370f5ca7d3d813fb7440fe2c6f7007a641809ec5bcac971cf.e7ae9ff5bd55f37751bca16423aef2323995641a355c0f1b9bfeb1ea603422e256cfefac7e9affc16d6957a1a7b9147b55feae381cbb60e8b97d4d7e99b45efcdb846f92c3f09b19cc62a7eadae39212d3c63b378c58da1d824767719d56abe3dc00efbb57baa0b6b3fdd07a29362382"
}
```
