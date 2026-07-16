# Muestras request/response por patrón — R2P (dev)

Una muestra completa por **patrón estructural único** (el primer escenario que lo definió). Foto (matriz): [`foto-presentacion-r2p-dev.md`](foto-presentacion-r2p-dev.md).

| Campo | Valor |
|-------|-------|
| Servicio | R2P |
| Código fuente | dev |
| Fecha corrida | 2026-07-16T17:10:14.314Z |
| Nivel ejecución | MATRIZ |
| Patrones con muestra | 1 |

Por muestra: **Request** = `reqClaro` (legible). **Response cliente** = `body` post-`/descifrar`. Si hubo cifrado en cable, también `respLambdaRaw` (truncado si es largo).

## 1. Forma `B` · código 0

| Campo | Valor |
|-------|-------|
| Escenario | 0011.3.1009.1.1. validador ASTRGATO — R2P feliz (exito) |
| Ruta | `Metodo/0011/3_respuestaExitosa/1009` |
| Escenarios con este patrón | 4 |
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
  "validador": "1009",
  "peticion": {
    "idPeticion": "CELEGATO1784221787",
    "metodo": "0011",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "61009001",
          "monto": "100.00",
          "bancoAcreedor": "CELEGATO",
          "cuentaDeudor": "1234567890",
          "cuentaAcreedor": "0987654321",
          "nombreAcreedor": "Prueba Acreedor",
          "notaAcreedor": "newman-r2p-min"
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
    "idPeticion": "CELEGATO1784221787",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "identificador": "61009001",
          "monto": "100.00",
          "bancoAcreedor": "CELEGATO",
          "cuentaDeudor": "1234567890",
          "cuentaAcreedor": "0987654321",
          "nombreAcreedor": "Prueba Acreedor",
          "notaAcreedor": "newman-r2p-min",
          "codigoR2P": "R2Pc2ab7348badc4015b7c2bb48785af"
        }
      }
    ]
  }
}
```

### Response lambda en cable (`respLambdaRaw`, cifrado)

```json
{
  "respuesta": "c8789fdbb5277217885eb544d061e1ad.9bfc54489b7cd803f01ccc4cf1be3d7a0501eb30c0b7b4bd1e973028bafb5e0f62723b6548e94f9b471650790bcc9f69fa3019a4967cb2c1fb1925c60e1d89c62f656a3a5adee5971bc604b672d6a880a14ce2c88f907b8b1fe39cebd29a4f8df7bca1d7f0aed5aeaa2cf3b7ae0eb875ed02e6e99787d1431704a80d16401c931c7fe6f31ce928123626fdd1910b8b9332649e8cda24ca0f56035163d1087c6409ae9066c7eee59a3b2c4cee272efd20f4c18f4048f4b790a75b26fde06d7d51da885b9cab77ea3053435d667bbdded0486b8ecc6bed4115818fd9ea9fe2cee6d8003faf7646ce0d85fec2f54c68dabbcaaed02bcf819f91f95ebc92364330db23a9ec455507318c12f6529436fa78d31f43a34a566bc92d98bfac4740d463fa7687836a06f18e2c22cbe14bb212533891a0f1979cf2bf859a025958c2bfb1b4f71fb62c912b18d478a9f89af4afd0a5ae9a482fb4c6d2de88dc82a9b3fb674ce6a4f2bd0e247c7f0899b732fa3036a5e0984af9700e8a03a62eaab364101f25f11fa64d97c1715f472b44a3ad61a867aa0e99921521f3a3cb00e60982e082d7db642c36a31e30a9bb5f4fc551079f8c667e8036c784b5a926e2c81e96d38656845bebf1db7faef8619aeceba9c489672203316fa371969c1f1eb6a5601c2278b50c284d8577d2d892538848196fc6237c13608c11fa29cab08baa50f21bc0cb.51acd8136f18e115222e2dfa0e6ebafabe8edf53d9e1fd528de2eeac32650cbf0a37acc5dc7c1df25a94a5c02d97a1d30b4d76192ad3ab42439469f0cfc7b91eaee6e370ad96a69c4b94d24b3fd6f7302af0468dbeb2de9e7f5e0842d8f18a38f100ab0384045ee8d7b7e4b7bed0cbdb5061628b0f8363a08dc8e8331545f6a55ffa03593acc003b38f4eee8f2ee1081fa2c0995f79f3ac8b1d2f00d7e17a6a2711054dfcdacec28e06f7032c1d887aef369f2ac932cf3754345cb791c9c7a4a7349116ecd6d508f31135a2a0996eb063dd6461445c187e0849dd437fba99847bf1240281dc80a1a680d03e355b78028f605a71d6d7025f85bbbcfa6f98144f0b03b58abc5fc3308a68ccc5a1fd2efa14a9c6cacce7f8ebc445733b6740015d64615131b5ce2aba45795939881fc71725b9e41d0e7938db75590e007f9169a1ce1f934ee3cf549f53dd80c9225867f508a60860da1b3ffc876d5e75bd26329a5"
}
```
