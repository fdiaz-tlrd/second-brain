# VPN — checklist R2P mínimo (servilleta)

Volátil. Solo para la máquina con VPN. No es doc fija.

## Hacer

1. **Validador GATO → dummy R2P**  
   Confirmar (o poner) en Dynamo `tld-validador-canal-operacion` para un canal GATO (sugerido **1009 ASTRGATO**):
   - `0012` estado `Y` → `urlOperacion` = `https://tld-validador-dummy.dev.telered.internal/r2p`
   - `0014` estado `Y` → misma URL  
   (En el export de Lenovo, 1009 ya venía así; verificar en Dig real.)

ver `notas-sueltas\datosDev.md`

2. **Emisor GATO**  
   Sugerido **1008 CELEGATO**: ops `0011` y `0013` en `Y` (para el feliz y un 0013 después).

3. **Identificador deudor en alias**  
   En Dig, tabla alias (la que usa R2P): un celular `6xxxxxxx` **activo**, con `banco` = **ASTRGATO** (mismo banco del validador 1009).  
   Anotar aquí el valor real cuando lo tengas: `61009001`

4. **Probar a mano (MATRIZ)**  
   - Token del canal **1008**  
   - POST `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar`  
   - Body cifrado como siempre (envelope abajo en claro; cifrar `peticion` con llaves del emisor)  
   - HTTP debe ser **200**; mirar negocio en el payload (`codigoError` / `resultado`)

## Payload 0011 (claro, antes de cifrar `peticion`)

Reemplazar `IDENTIFICADOR` por el del paso 3. Cuentas de ejemplo; ajustar si Dig exige otras.

```json
{
  "idCanal": "1008",
  "validador": "1009",
  "peticion": {
    "idPeticion": "CELEGATO{{$timestamp}}",
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
          "notaAcreedor": "vpn-check"
        }
      }
    ]
  }
}
```

Notas rápidas:
- `bancoAcreedor` = swift/alias del **emisor** (CELEGATO).
- Campo nombre = **`nombreAcreedor`** (no nombreDeudor).
- Monto entre 10 y 500 (default Dig).
- No hace falta arreglar doc Marketplace.

Postman

https://tld-validador-dummy.dev.telered.internal/cifrar?tld=1&algoritmoCifrado=aes-256-cbc
Realziado por el Postman "CELEGATO{{$timestamp}}" -> "CELEGATO1784216303"
Request
```json
{
  "idCanal": "1008",
  "validador": "1009",
  "peticion": {
    "idPeticion": "CELEGATO1784216303",
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
          "notaAcreedor": "vpn-check"
        }
      }
    ]
  }
}
```
Response
```json
{
    "idCanal": "1008",
    "validador": "1009",
    "peticion": "5cfb9707e21be3ab2a1f9562a55352d0.99666662024cb6086cc115e3fa0e93bc69f223b628964195aed41a7cd7e055a1bb24e66b2b0817060ab9edf9eb19818e409f360c1a191206c24e43725ce0acadbd01ca52b2c7f3bc5419cb7813d013443773396d932815e9251b5ac5d3f69566749be94a47b822aaf0b6eb50b006a448043133269c730cb723a30c5b5f7c360e194243d9846301aa935aca52e1ff083ff4558c4379807062c692ecdc5968151e0e28b0fdb2fb8de46fd3850052aa2542709933ec23cedca1ce3ccff61abc8c9901d9131e416942817f585853a03dd737ed29d9535e05d56cf4b9034868df105b516944d3ce3a8ad904370c6f7c8d023f031d6aec5714427d3728b581eca738120efa5d60c176dc6a13ca57e8ebda8ac916460285e286ca643778bd68d56f6fcaec46e76289880c1f041d6067c1645527afbffa53999e94f121b63e45c624d07b1703c7b57c79d5e7a03ec88aa336bae2c48a0bb58fb2dcfab62fcd6bc3ab893ec47c220093da317387818b482e024f8fc3692d5441ddb5fcfc8f8a2b077d1789ecc04344cd338775bfe7afc3d67b8428faabafaf3c42e3d77cfa4f72d9307461f37ef894f8f3472b7dd87e64859d43f307287daa20aa3b8354cc6d712f3d8e3d34f318e1a630cce8afa1d99b948454976da1ef288ab5c294460da8cc775b43c6e5bc083ed0424bcaf608b330e72cf94916f18053dbb89008b96ae4e0879a5163.a68313675afc78298d70ab8d0600bb601d63d9ae93d34241a74075cec45bcc5e870280bab79c5598085201388931260c4b71aa9dd5bffab7bf74e40959077327322486327923d59050335bd8db15e46423eb44c386656368d91a86af44f4b1c302e65723541535ed177792a5a0be407a7683290f0d26a3f7394be16fb82c3e19b2b4f97fe2ebe17e737116ec1d385078cedf89006d40a1482a761bc89adafed48c3c667ffef27427e8029b2b7b897a6096d3b0657971530dcc2ce52aba03fecdc71a3ba527b61122141d8fe3786d59de9aeebafe9be318eb885eaae385616fe8f61859af2ed7f0692ae68af77f847bb78226d406def70e09c2a1844b0f2144bd1ea5b9df2f9b61a6da90ed86e656c0b7c407cb8627965f6edc0d611e889f56c8e7f064835fe0babfc9768a41628ac8f5"
}
```

https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar
Request
```json
{
    "idCanal": "1008",
    "validador": "1009",
    "peticion": "5cfb9707e21be3ab2a1f9562a55352d0.99666662024cb6086cc115e3fa0e93bc69f223b628964195aed41a7cd7e055a1bb24e66b2b0817060ab9edf9eb19818e409f360c1a191206c24e43725ce0acadbd01ca52b2c7f3bc5419cb7813d013443773396d932815e9251b5ac5d3f69566749be94a47b822aaf0b6eb50b006a448043133269c730cb723a30c5b5f7c360e194243d9846301aa935aca52e1ff083ff4558c4379807062c692ecdc5968151e0e28b0fdb2fb8de46fd3850052aa2542709933ec23cedca1ce3ccff61abc8c9901d9131e416942817f585853a03dd737ed29d9535e05d56cf4b9034868df105b516944d3ce3a8ad904370c6f7c8d023f031d6aec5714427d3728b581eca738120efa5d60c176dc6a13ca57e8ebda8ac916460285e286ca643778bd68d56f6fcaec46e76289880c1f041d6067c1645527afbffa53999e94f121b63e45c624d07b1703c7b57c79d5e7a03ec88aa336bae2c48a0bb58fb2dcfab62fcd6bc3ab893ec47c220093da317387818b482e024f8fc3692d5441ddb5fcfc8f8a2b077d1789ecc04344cd338775bfe7afc3d67b8428faabafaf3c42e3d77cfa4f72d9307461f37ef894f8f3472b7dd87e64859d43f307287daa20aa3b8354cc6d712f3d8e3d34f318e1a630cce8afa1d99b948454976da1ef288ab5c294460da8cc775b43c6e5bc083ed0424bcaf608b330e72cf94916f18053dbb89008b96ae4e0879a5163.a68313675afc78298d70ab8d0600bb601d63d9ae93d34241a74075cec45bcc5e870280bab79c5598085201388931260c4b71aa9dd5bffab7bf74e40959077327322486327923d59050335bd8db15e46423eb44c386656368d91a86af44f4b1c302e65723541535ed177792a5a0be407a7683290f0d26a3f7394be16fb82c3e19b2b4f97fe2ebe17e737116ec1d385078cedf89006d40a1482a761bc89adafed48c3c667ffef27427e8029b2b7b897a6096d3b0657971530dcc2ce52aba03fecdc71a3ba527b61122141d8fe3786d59de9aeebafe9be318eb885eaae385616fe8f61859af2ed7f0692ae68af77f847bb78226d406def70e09c2a1844b0f2144bd1ea5b9df2f9b61a6da90ed86e656c0b7c407cb8627965f6edc0d611e889f56c8e7f064835fe0babfc9768a41628ac8f5"
}
```
Response
```json
{
    "respuesta": "4d475c2572395f93a30505c82fbb7ab8.0fb83a3641df88c850bd056efd654d935d3cd038c9268f490686948d3ecf0fd0eb495fe861f336295cbd9def97d6e4d0fd10674e1f2be0a4238f9db9f3278ac1f63a35b4099f395b1699217a7ad54cd49e4f787f6d87654a4ee4561f32872587cd21b645c4a4b5e123d3a6023007f1b51e1ffa74bca2e4cb147eb631a5d1557377d97dbab997d276df47ed76aac6377df1bb1c8c4fd8a15a475c72dcd75b57d56745be0f9acac35ce6781bc4f1995d8690754124c8cf858c33e8438e59c6805cf458a07749f6f87f0e0cfd1a8b64bdb3a3fd948665deaac1c3c23fcae0377de9177a41f41dae706c4c36b208e8afc5f498df4016fd6f46ab73f27ea82455c9b3a6ff2dd5c7a902ab14295a7643423978a9308246113e249b9493536a1bb8c7f94872b3f992e66d9bc87f9db965794d93a6259c58ba923d7cfe8dcff491bbf22230090a30869dff685dc0c6bb1fe71c30bb6780a8df5b32c002817b902daea7c674032e3182d27e5726dcba0b2b1df606c0d4bf3d50e4bb2e597e8ae74182c28ded6f62db70c04a477b0bc2229bc95e91ccee24660292630850d2e94bb55155b9a7ffd65f1bb8aa6b23634c6a7cf2f2fe2417fdbdefa1986f42f8f903062fdc61608cbd5f21a628a39c203b9f79a25c9811945d4c236c3a928a1369e632a12bcd6627cadf32540aa0ed94b66290b284b27199067a2bf0e1b9db22f00032f88c3b.6bb77f650e911c1a11dd327fd609bd1c2960b5d1a522440beb36a05f07f89f5981fdb8c3a4fad89b58983abcf56d5523b81a67018ec0a9214ecae0875603dda2234a8b4b0102f17963efedcce23afae060f9e7abd5177fdd34732f5db0b45937864e8b04c75f5faa50be5e13d778035775397ccf5307c1c9fa107763f00c86288312571ab6f10bcc59cf8df99951f8edd42deb146c79a09898d14c7cc4caa40fecd14532322ef042c7f89271b373641aa3b62d0e20ad13b58bb3c70486a1b509d6ffa3ddf548bb3523a4df4e34dfa3f5a20dcbd6d6214133cd0810fe03d1469938b84668ebb6cabf12f43c2af6844c7f0969b338de410eb91c1086c86cee83fde704f68fa259d53eb4fae0c42a605eee0af407f363a983b45b29dafe2126945fe342ed83cc05d2d415ed2daedcb470d11c82a6f9a604e65f78433b533428985846357e90581edc8a766023b83e2bd628"
}
```

https://tld-validador-dummy.dev.telered.internal/descifrar?tld=0&algoritmoCifrado=aes-256-cbc
Request
```json
{
    "respuesta": "4d475c2572395f93a30505c82fbb7ab8.0fb83a3641df88c850bd056efd654d935d3cd038c9268f490686948d3ecf0fd0eb495fe861f336295cbd9def97d6e4d0fd10674e1f2be0a4238f9db9f3278ac1f63a35b4099f395b1699217a7ad54cd49e4f787f6d87654a4ee4561f32872587cd21b645c4a4b5e123d3a6023007f1b51e1ffa74bca2e4cb147eb631a5d1557377d97dbab997d276df47ed76aac6377df1bb1c8c4fd8a15a475c72dcd75b57d56745be0f9acac35ce6781bc4f1995d8690754124c8cf858c33e8438e59c6805cf458a07749f6f87f0e0cfd1a8b64bdb3a3fd948665deaac1c3c23fcae0377de9177a41f41dae706c4c36b208e8afc5f498df4016fd6f46ab73f27ea82455c9b3a6ff2dd5c7a902ab14295a7643423978a9308246113e249b9493536a1bb8c7f94872b3f992e66d9bc87f9db965794d93a6259c58ba923d7cfe8dcff491bbf22230090a30869dff685dc0c6bb1fe71c30bb6780a8df5b32c002817b902daea7c674032e3182d27e5726dcba0b2b1df606c0d4bf3d50e4bb2e597e8ae74182c28ded6f62db70c04a477b0bc2229bc95e91ccee24660292630850d2e94bb55155b9a7ffd65f1bb8aa6b23634c6a7cf2f2fe2417fdbdefa1986f42f8f903062fdc61608cbd5f21a628a39c203b9f79a25c9811945d4c236c3a928a1369e632a12bcd6627cadf32540aa0ed94b66290b284b27199067a2bf0e1b9db22f00032f88c3b.6bb77f650e911c1a11dd327fd609bd1c2960b5d1a522440beb36a05f07f89f5981fdb8c3a4fad89b58983abcf56d5523b81a67018ec0a9214ecae0875603dda2234a8b4b0102f17963efedcce23afae060f9e7abd5177fdd34732f5db0b45937864e8b04c75f5faa50be5e13d778035775397ccf5307c1c9fa107763f00c86288312571ab6f10bcc59cf8df99951f8edd42deb146c79a09898d14c7cc4caa40fecd14532322ef042c7f89271b373641aa3b62d0e20ad13b58bb3c70486a1b509d6ffa3ddf548bb3523a4df4e34dfa3f5a20dcbd6d6214133cd0810fe03d1469938b84668ebb6cabf12f43c2af6844c7f0969b338de410eb91c1086c86cee83fde704f68fa259d53eb4fae0c42a605eee0af407f363a983b45b29dafe2126945fe342ed83cc05d2d415ed2daedcb470d11c82a6f9a604e65f78433b533428985846357e90581edc8a766023b83e2bd628"
}
```

Response
```json
{
    "respuesta": {
        "idPeticion": "CELEGATO1784216301",
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
                    "notaAcreedor": "vpn-check",
                    "codigoR2P": "R2P500d85e361eb4d9ca3f54ba2bb370"
                }
            }
        ]
    }
}
```

