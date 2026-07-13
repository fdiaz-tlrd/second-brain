# VCN Escenarios error > General > 1_validaciones_js > 1_idCanal > 1.1.1. idCanal — propiedad ausente (undefined) (400)
## Postman

'[VCN raiz] NIVEL_EJECUCION=MATRIZ END_POINT_TLD desde END_POINT_TLD_MATRIZ ALGORITMO_AES=aes-256-cbc idPeticion=CELEGATO1783905289 metodo=0001 idSolicitud=1'
POST https://tld-validador-dummy.dev.telered.internal/cifrar?tld=1&algoritmoCifrado=aes-256-cbc: {
  "Network": {
    "addresses": {
      "local": {
        "address": "10.2.10.17",
        "family": "IPv4",
        "port": 61687
      },
      "remote": {
        "address": "10.250.250.75",
        "family": "IPv4",
        "port": 443
      }
    },
    "tls": {
      "reused": false,
      "authorized": true,
      "authorizationError": null,
      "cipher": {
        "name": "TLS_AES_128_GCM_SHA256",
        "standardName": "TLS_AES_128_GCM_SHA256",
        "version": "TLSv1/SSLv3"
      },
      "protocol": "TLSv1.3",
      "ephemeralKeyInfo": {},
      "peerCertificate": {
        "subject": {
          "country": "PA",
          "stateOrProvince": "PANAMA",
          "locality": "PANAMA",
          "organization": "Telered",
          "organizationalUnit": "Sistemas",
          "commonName": "Auto_AWS_Dev",
          "alternativeNames": "DNS:tld-api-interna.dev.telered.internal, DNS:tld-api-interna-eclave.dev.telered.internal, DNS:tld-api-puente.dev.telered.internal, DNS:tld-img.dev.telered.internal, DNS:tld-otp.dev.telered.internal, DNS:tld-sv.dev.telered.internal, DNS:tld-api-mph.dev.telered.internal, DNS:tld-api-validador.dev.telered.internal, DNS:tld-api-alias.dev.telered.internal, DNS:tld-api-cuenta-nombre.dev.telered.internal, DNS:tld-preg-seguridad.dev.telered.internal, DNS:tld-notificacion.dev.telered.internal, DNS:pac.dev.telered.internal, DNS:tld-validador-dummy.dev.telered.internal, DNS:tld-api-r2p.dev.telered.internal, DNS:tld-api-p2m.dev.telered.internal, DNS:tld-achx.dev.telered.internal, DNS:tld-api-qrpayment.dev.telered.internal"
        },
        "issuer": {
          "country": "EN",
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "Check Point Harmony SASE"
        },
        "validFrom": "Nov 25 20:40:33 2025 GMT",
        "validTo": "Nov 25 20:40:33 2026 GMT",
        "fingerprint": "28:65:D0:02:6E:A0:85:A6:B0:C6:DF:CF:30:28:D5:2E:2E:6B:69:40",
        "serialNumber": "c5282b995227695edfd67639491bf7bf"
      }
    }
  },
  "Request Headers": {
    "content-type": "application/json",
    "user-agent": "PostmanRuntime/7.54.0",
    "accept": "*/*",
    "postman-token": "2bfc61a8-84e1-4520-80ee-dc482da5fd1f",
    "host": "tld-validador-dummy.dev.telered.internal",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "content-length": "156"
  },
  "Request Body": "{\"validador\":\"0001\",\"peticion\":{\"idPeticion\":\"CELEGATO1783905289\",\"metodo\":\"0001\",\"solicitudes\":[{\"idSolicitud\":\"1\",\"parametros\":{\"cuenta\":\"1100001328\"}}]}}",
  "Response Headers": {
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Mon, 13 Jul 2026 01:14:39 GMT",
    "server": "Server",
    "x-amz-apigw-id": "Aa5PwFIKIAMFmTg=",
    "x-amzn-requestid": "395e5626-1f2c-4cff-8cb8-6ae6c9db64cb",
    "x-amzn-trace-id": "Root=1-6a543bfd-7fe0382679d8dc8a55429221;Parent=5b6b05899009e77d;Sampled=0;Lineage=1:e7baf0a4:0",
    "transfer-encoding": "chunked"
  },
  "Response Body": "{\"validador\":\"0001\",\"peticion\":\"9b2786cb0cec5afa290dd1246ae621b0.a739675f8f99bb5d3eb4c27d0a736c0dc6888861d8e9462a3213b18899ec9a6a6ca4083a13a3199f5ce86188a2d7bac2c7ff01ad26797f1849d2acd56802200ba73a4a00a5f097c67a19ebd541b3018b7573798625e656ffca3f5827714635e54388f8f3345716a9813e9e51d588fe88e800195013745b6f0d027d8cfcca0ffafa6c2969a46aae76a27f14ba28943117225fae74a01aba2d4d85513cc23ecf14b0466a40f808a69e87c7c0eadca133b87788d94f487742d6e55a5490ac9b0148e810281e768aeee155ca6902f35f1a24e4c883b019581a2eabfd57ee26a450b92b1e0a0323372a3137ce85026fae8402a2b748d6aa5c6f2e46bfd98b41bbe8ddb7895aba1b52be0ad501ee65677a06b8164c62a3355e1770b4d664024a383f4f0275d9649fd93f849ee554b09f0e2c02ab542109e588f2fc8c7f2e8f7d03a5e2689432cbe670c656d3fa87b598213adcac70629bcb0b8be419db0d68da357b27485eb13c025c9fabaf296da92b78154d7982e89e7cf3c7a39562264b2f77f0f73bbbad7bb83172c29d10bc76f7106219b70c2a55b762ea5f5ef26a4e024e6ae2e3484ae375dad6ffa32702feb4b17c6ce9f04a6099f19d880ee43c93afe4ccea33e2d577d09dfe8068a37341ccce74cb5a0f3029ae97a5d6b6e0fe0073caf21686f54639c67a8f76682c19bff4100b088c94856239c9b7d85ccb1aaf90dc29bb.cd921af023ee12ff41edb1ee77e122068de659e915d4b016ab244a7fd21e5dc9cfecce25866b26f04128abe8de411819c16d2b42280ca52cb6daf158a81d5f77dac2fbb807524d5831cfb4e68c80f5c47adc20abad62fd03dbada2be68461778e7ea43823dbaa15bd5aaa58399a7f89a1c0c57e8d40fd5262e6f2c3403bfde9f\"}"
}
POST https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/auth/token: {
  "Network": {
    "addresses": {
      "local": {
        "address": "192.168.50.120",
        "family": "IPv4",
        "port": 58193
      },
      "remote": {
        "address": "98.82.244.26",
        "family": "IPv4",
        "port": 443
      }
    },
    "tls": {
      "reused": false,
      "authorized": true,
      "authorizationError": null,
      "cipher": {
        "name": "TLS_AES_128_GCM_SHA256",
        "standardName": "TLS_AES_128_GCM_SHA256",
        "version": "TLSv1/SSLv3"
      },
      "protocol": "TLSv1.3",
      "ephemeralKeyInfo": {},
      "peerCertificate": {
        "subject": {
          "country": null,
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "*.execute-api.us-east-1.amazonaws.com",
          "alternativeNames": "DNS:*.execute-api.us-east-1.amazonaws.com"
        },
        "issuer": {
          "country": "EN",
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "Check Point Harmony SASE"
        },
        "validFrom": "Jul  7 00:00:00 2026 GMT",
        "validTo": "Jan 20 23:59:59 2027 GMT",
        "fingerprint": "27:9F:EF:D5:1D:CD:C3:BE:59:8C:5F:71:53:44:77:BE:A5:E7:38:1D",
        "serialNumber": "ef469730b8f126c4b188cbdc5e20145f"
      }
    }
  },
  "Request Headers": {
    "content-type": "application/json",
    "user-agent": "PostmanRuntime/7.54.0",
    "accept": "*/*",
    "postman-token": "9586f62f-6f6e-4cd1-89a1-0aca1705196e",
    "host": "srmi7w9bwi.execute-api.us-east-1.amazonaws.com",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "content-length": "106"
  },
  "Request Body": "{\"apiKey\":\"c4481f99364a45d1843c475a728894a5\",\"secretKey\":\"6bc9d69a676d9f869ab438c5369ec16388b8b7da6f3ddf\"}",
  "Response Headers": {
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Mon, 13 Jul 2026 01:14:42 GMT",
    "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
    "x-amz-apigw-id": "Aa5QCGBJIAMEfMg=",
    "x-amzn-requestid": "20b62f67-6dbb-4bb4-831e-f7016d315044",
    "x-amzn-trace-id": "Root=1-6a543bff-7002a53607ab301a72709241",
    "transfer-encoding": "chunked"
  },
  "Response Body": "{\"accessToken\":\"eyJraWQiOiJWTjNkOHlqVGNIcmFOOUw3Wi9pTTlOeHBtZmxIdndlRjNTMlR0N0dnaDBZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYmNhODMyMC0xYjMwLTRhMTMtODBmYi0xNDk0ZTFkM2VjM2IiLCJjb2duaXRvOmdyb3VwcyI6WyJ0bGQtbWF0cml6LXBsYW5lcyIsInRsZC1tYXRyaXotY29uc3VsdGEtZmFjdHVyYWRvciIsInRsZC1tYXRyaXotZnVsbCIsInRsZC1tYXRyaXotZ3J1cG9zLWFwaS1rZXkiXSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS91cy1lYXN0LTFfZDBJY1A0RVYyIiwiY2xpZW50X2lkIjoiN2NnNGc4dm9yaXJsaGVsZWJjcmlxbmo5NWEiLCJvcmlnaW5fanRpIjoiYzRhOTFjOTgtMzUyZi00MjEzLTk5NGEtNTk2Nzg4OGVkMGIzIiwiZXZlbnRfaWQiOiJmOWJmMmEwNy01N2MwLTRiOTAtOGI3Ni0yNGVjNzU5ZTc3MzYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzgzOTA1MjgyLCJleHAiOjE3ODM5MDg4ODIsImlhdCI6MTc4MzkwNTI4MiwianRpIjoiN2IyNTc4YjUtNjI3Yy00ZjFiLWIzNTAtNjg5ODRlNmNkN2Y1IiwidXNlcm5hbWUiOiJjNDQ4MWY5OTM2NGE0NWQxODQzYzQ3NWE3Mjg4OTRhNSJ9.KC6AWQe4fhmoQC6_R8Tg2QwnnsTuPtbqXWE_2VwEbrO9Vsald4tXxYPN98ZOEsutVP186EQUtVRhxWg8jioLFjKDtaElImkAQxSHagzIK9razM4aHuRbbc9lOW3tm_euwUo3O-CxZAw4VcczkNo9CyvdInGIlEYptJwugTw5CBZwQ9jrMgmbMMAwd4--yQlvkevOnpIHSXYtHlvsRTAWyPeiSfzvjbdUVVzpN_wHvWI1osqvx4ICc2Xms1Yk6Tn55WGC3hNeTOg4TnAxxEOU7kg3T4AHgQZkBTGMNSi6YA5CDBQzxf8xQ-AeTMQ8RnR-QKABTAu2ReQLHZ_rBO6eRA\",\"expiresIn\":3600,\"refreshToken\":\"eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.W2OASYcUwT0ANZmGv6WDd1rq2xYyAZIzzNz65R7vp2SV1EqTTBeMPynK7Xjz-tndXhC_CCuPSm-xE1xDZb_KMSR_Mo1q71QDyswlydw0SXKGgOy7M_C4kolC35Jd-a4wCe6_eKTw1tDJM55YmHYdORPzWAk2VJ8y14MZopOLvvMjRmNZKatOFevsKgUkcReeVUliqRE34RYSxrLSqM45G1718Ht0O1LfvIQcW3yQ1_FmJqVhVHmoi47EbgEr7M1B44xzcDm7-A-Vb_CW302qnpdWA8NwIr_y768Xmpj0yVNHPoPyTkoHJBnJcUHY6eMfXdLYdoJCWXynVQ9F-kIkqw.8BcC4883_wSFPwz6.3De7Yr5L4vepInWiJgx5B0Sw5twpkcM8hZpozR1-mBr0i-c9aaS_C90geJaRZvy-2V8hkvE1bxN7bRYCIFf1wjzHiPojnNkN44nLyrpsHdm9xbae9th--O54EK-VFpx9k31tFDAVt3105ctkrrZ3BHbGNpqaFMsgxm3tWDdkKO4L5NBXtjW5Q_xD0d2UUqebMrl66aVe0ux1ItZ_tf1Xf3xrprcu2oOqfpA7HPitBU_3x6KeqAFnAoFMm6NPmXeytgMkja6xsHzaN_f0hu5box-2uZ1LigMvaZVTMejfAO8BJ9TRTmx1IzoRowt621nI_biBAlloxRe5kWi_THtreu5pahHP3KzAMy6Lt-YsFW7tRrDzH8Cs-oJi9tN3pKM37z0wiRL5Rgj3Ah4FtCtTpnAJfrwUJTZqhQXkQEubxNYPQUW5NyrAJcPAsIbfK4dvqvRBI5DyWh-Vd5WRrepncgxkYxVDvC2pRsXrwRJ76CfJV9mun5mOOA2P1c4YFOouW1tAB2yZBdp8xEJejNVRMJpNKd0kp8uli3diX-MyXnyunM3-IKTso-5vpD4l_v9LP2w7PJO2Rg_0RILGHOMOu37Du43kul8A1ITEFaGQ_5Ijyjqka0Q3BbGsoVOwzmUqwqPEDkctYHOWf1szq8Iu2VvQZaxCoIa-MQz-tMzPLZmypI-dJrScYiRJ-7A4mN0fP6Xh_-NGuIOMZIBjucKf9vGwufD8ZO1M__WEyE0Kae2_igBu7wf6XyHyhQ47MgqJCMV75CT_gzye4O1Qj1ix28GOoHw1IrPYEQ1QQj1DrIn6NwVO5aSUbGsKm1bFSgZqB6dw5H99V4FHj3Te6cI4QmntgsbVRzH0RCp2GJzCRd29YXUzNsaS7vrPYUTyi3Q97g6C2bbhdsIcqdnunS1qbvIKjh6a2oAbkvw_ga4AtcCepHF4PnND1cH3R3sb7QBt_w_WJJJzIOkSp4fbL1Tnzb61PuaU-0mb22V26n2NDuQvboX84eWyiqC0_4XN97A7Gqe9q27stksVYOTQvXRQrUbeI-s0XzMXflAZuQzXO6ZsPm_Pbuzuf25fzr5lNXavYu5Tqg1lKmRxcMu05kApTEo30oheIhDUziRYth4yxcHEFGNKmKNmBQp7hdiMxsHJskO2CuIXT9D4rBIV3RYFKHghG1loOBu7DaOg6nljnVzc22n7wE3rI90f2G__8NAKrtDG_kL2GRNriMax4dSYhoP28uNV8GPyS1ApsUPMAKveJxH1xug9IVjoOiiI94cfRjILXt69YKUV0Zyk5E4j388e_B3j_AzZM5sFy7JJ-fvjFw.PZpQgaXpf5Q6z-gBE-ltYw\"}"
}
POST https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar: {
  "Network": {
    "addresses": {
      "local": {
        "address": "192.168.50.120",
        "family": "IPv4",
        "port": 58193
      },
      "remote": {
        "address": "98.82.244.26",
        "family": "IPv4",
        "port": 443
      }
    },
    "tls": {
      "reused": false,
      "authorized": true,
      "authorizationError": null,
      "cipher": {
        "name": "TLS_AES_128_GCM_SHA256",
        "standardName": "TLS_AES_128_GCM_SHA256",
        "version": "TLSv1/SSLv3"
      },
      "protocol": "TLSv1.3",
      "ephemeralKeyInfo": {},
      "peerCertificate": {
        "subject": {
          "country": null,
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "*.execute-api.us-east-1.amazonaws.com",
          "alternativeNames": "DNS:*.execute-api.us-east-1.amazonaws.com"
        },
        "issuer": {
          "country": "EN",
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "Check Point Harmony SASE"
        },
        "validFrom": "Jul  7 00:00:00 2026 GMT",
        "validTo": "Jan 20 23:59:59 2027 GMT",
        "fingerprint": "27:9F:EF:D5:1D:CD:C3:BE:59:8C:5F:71:53:44:77:BE:A5:E7:38:1D",
        "serialNumber": "ef469730b8f126c4b188cbdc5e20145f"
      }
    }
  },
  "Request Headers": {
    "content-type": "application/json",
    "authorization": "Bearer eyJraWQiOiJWTjNkOHlqVGNIcmFOOUw3Wi9pTTlOeHBtZmxIdndlRjNTMlR0N0dnaDBZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYmNhODMyMC0xYjMwLTRhMTMtODBmYi0xNDk0ZTFkM2VjM2IiLCJjb2duaXRvOmdyb3VwcyI6WyJ0bGQtbWF0cml6LXBsYW5lcyIsInRsZC1tYXRyaXotY29uc3VsdGEtZmFjdHVyYWRvciIsInRsZC1tYXRyaXotZnVsbCIsInRsZC1tYXRyaXotZ3J1cG9zLWFwaS1rZXkiXSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS91cy1lYXN0LTFfZDBJY1A0RVYyIiwiY2xpZW50X2lkIjoiN2NnNGc4dm9yaXJsaGVsZWJjcmlxbmo5NWEiLCJvcmlnaW5fanRpIjoiYzRhOTFjOTgtMzUyZi00MjEzLTk5NGEtNTk2Nzg4OGVkMGIzIiwiZXZlbnRfaWQiOiJmOWJmMmEwNy01N2MwLTRiOTAtOGI3Ni0yNGVjNzU5ZTc3MzYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzgzOTA1MjgyLCJleHAiOjE3ODM5MDg4ODIsImlhdCI6MTc4MzkwNTI4MiwianRpIjoiN2IyNTc4YjUtNjI3Yy00ZjFiLWIzNTAtNjg5ODRlNmNkN2Y1IiwidXNlcm5hbWUiOiJjNDQ4MWY5OTM2NGE0NWQxODQzYzQ3NWE3Mjg4OTRhNSJ9.KC6AWQe4fhmoQC6_R8Tg2QwnnsTuPtbqXWE_2VwEbrO9Vsald4tXxYPN98ZOEsutVP186EQUtVRhxWg8jioLFjKDtaElImkAQxSHagzIK9razM4aHuRbbc9lOW3tm_euwUo3O-CxZAw4VcczkNo9CyvdInGIlEYptJwugTw5CBZwQ9jrMgmbMMAwd4--yQlvkevOnpIHSXYtHlvsRTAWyPeiSfzvjbdUVVzpN_wHvWI1osqvx4ICc2Xms1Yk6Tn55WGC3hNeTOg4TnAxxEOU7kg3T4AHgQZkBTGMNSi6YA5CDBQzxf8xQ-AeTMQ8RnR-QKABTAu2ReQLHZ_rBO6eRA",
    "user-agent": "PostmanRuntime/7.54.0",
    "accept": "*/*",
    "postman-token": "b8aae56c-514e-4a31-8e7e-03c57abba30a",
    "host": "srmi7w9bwi.execute-api.us-east-1.amazonaws.com",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "content-length": "1348"
  },
  "Request Body": "{\"validador\":\"0001\",\"peticion\":\"9b2786cb0cec5afa290dd1246ae621b0.a739675f8f99bb5d3eb4c27d0a736c0dc6888861d8e9462a3213b18899ec9a6a6ca4083a13a3199f5ce86188a2d7bac2c7ff01ad26797f1849d2acd56802200ba73a4a00a5f097c67a19ebd541b3018b7573798625e656ffca3f5827714635e54388f8f3345716a9813e9e51d588fe88e800195013745b6f0d027d8cfcca0ffafa6c2969a46aae76a27f14ba28943117225fae74a01aba2d4d85513cc23ecf14b0466a40f808a69e87c7c0eadca133b87788d94f487742d6e55a5490ac9b0148e810281e768aeee155ca6902f35f1a24e4c883b019581a2eabfd57ee26a450b92b1e0a0323372a3137ce85026fae8402a2b748d6aa5c6f2e46bfd98b41bbe8ddb7895aba1b52be0ad501ee65677a06b8164c62a3355e1770b4d664024a383f4f0275d9649fd93f849ee554b09f0e2c02ab542109e588f2fc8c7f2e8f7d03a5e2689432cbe670c656d3fa87b598213adcac70629bcb0b8be419db0d68da357b27485eb13c025c9fabaf296da92b78154d7982e89e7cf3c7a39562264b2f77f0f73bbbad7bb83172c29d10bc76f7106219b70c2a55b762ea5f5ef26a4e024e6ae2e3484ae375dad6ffa32702feb4b17c6ce9f04a6099f19d880ee43c93afe4ccea33e2d577d09dfe8068a37341ccce74cb5a0f3029ae97a5d6b6e0fe0073caf21686f54639c67a8f76682c19bff4100b088c94856239c9b7d85ccb1aaf90dc29bb.cd921af023ee12ff41edb1ee77e122068de659e915d4b016ab244a7fd21e5dc9cfecce25866b26f04128abe8de411819c16d2b42280ca52cb6daf158a81d5f77dac2fbb807524d5831cfb4e68c80f5c47adc20abad62fd03dbada2be68461778e7ea43823dbaa15bd5aaa58399a7f89a1c0c57e8d40fd5262e6f2c3403bfde9f\"}",
  "Response Headers": {
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Mon, 13 Jul 2026 01:14:45 GMT",
    "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
    "x-amz-apigw-id": "Aa5QfGVxoAMEWMQ=",
    "x-amzn-requestid": "d71f5d30-414d-4459-92db-a733cca5824a",
    "x-amzn-trace-id": "Root=1-6a543c02-24832ea14afb47bf1b1a6b05",
    "transfer-encoding": "chunked"
  },
  "Response Body": "{\"codigoError\":400,\"descripcionError\":\"Error de formato en campo canal\"}"
}
POST https://tld-validador-dummy.dev.telered.internal/descifrar?tld=0&algoritmoCifrado=aes-256-cbc: {
  "Network": {
    "addresses": {
      "local": {
        "address": "10.2.10.17",
        "family": "IPv4",
        "port": 61687
      },
      "remote": {
        "address": "10.250.250.75",
        "family": "IPv4",
        "port": 443
      }
    },
    "tls": {
      "reused": false,
      "authorized": true,
      "authorizationError": null,
      "cipher": {
        "name": "TLS_AES_128_GCM_SHA256",
        "standardName": "TLS_AES_128_GCM_SHA256",
        "version": "TLSv1/SSLv3"
      },
      "protocol": "TLSv1.3",
      "ephemeralKeyInfo": {},
      "peerCertificate": {
        "subject": {
          "country": "PA",
          "stateOrProvince": "PANAMA",
          "locality": "PANAMA",
          "organization": "Telered",
          "organizationalUnit": "Sistemas",
          "commonName": "Auto_AWS_Dev",
          "alternativeNames": "DNS:tld-api-interna.dev.telered.internal, DNS:tld-api-interna-eclave.dev.telered.internal, DNS:tld-api-puente.dev.telered.internal, DNS:tld-img.dev.telered.internal, DNS:tld-otp.dev.telered.internal, DNS:tld-sv.dev.telered.internal, DNS:tld-api-mph.dev.telered.internal, DNS:tld-api-validador.dev.telered.internal, DNS:tld-api-alias.dev.telered.internal, DNS:tld-api-cuenta-nombre.dev.telered.internal, DNS:tld-preg-seguridad.dev.telered.internal, DNS:tld-notificacion.dev.telered.internal, DNS:pac.dev.telered.internal, DNS:tld-validador-dummy.dev.telered.internal, DNS:tld-api-r2p.dev.telered.internal, DNS:tld-api-p2m.dev.telered.internal, DNS:tld-achx.dev.telered.internal, DNS:tld-api-qrpayment.dev.telered.internal"
        },
        "issuer": {
          "country": "EN",
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "Check Point Harmony SASE"
        },
        "validFrom": "Nov 25 20:40:33 2025 GMT",
        "validTo": "Nov 25 20:40:33 2026 GMT",
        "fingerprint": "28:65:D0:02:6E:A0:85:A6:B0:C6:DF:CF:30:28:D5:2E:2E:6B:69:40",
        "serialNumber": "c5282b995227695edfd67639491bf7bf"
      }
    }
  },
  "Request Headers": {
    "content-type": "application/json",
    "user-agent": "PostmanRuntime/7.54.0",
    "accept": "*/*",
    "postman-token": "29d29801-6fd5-430f-9df3-86dd52c23ca9",
    "host": "tld-validador-dummy.dev.telered.internal",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "content-length": "72"
  },
  "Request Body": "{\"codigoError\":400,\"descripcionError\":\"Error de formato en campo canal\"}",
  "Response Headers": {
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Mon, 13 Jul 2026 01:14:46 GMT",
    "server": "Server",
    "x-amz-apigw-id": "Aa5Q9E7soAMFngg=",
    "x-amzn-requestid": "0f95af48-1e10-49d2-9c87-00d969c5fdfb",
    "x-amzn-trace-id": "Root=1-6a543c05-4654e9bf37c260365ad681f9;Parent=52d2367e9dfd3ae6;Sampled=0;Lineage=1:6778dd49:0",
    "transfer-encoding": "chunked"
  },
  "Response Body": "{\"codigoError\":400,\"descripcionError\":\"Error de formato en campo canal\"}"
}

## CloudWatch
Administración de registros
/aws/lambda/tld-matriz-validador-validar
2026/07/13/[$LATEST]1d8e24a32dd24134b58f0882e260b93a

|   timestamp   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              message                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1783905283583 | INIT_START Runtime Version: nodejs:20.v101 Runtime Version ARN: arn:aws:lambda:us-east-1::runtime:18671876e7cc385452255180c58ca50cf8763398a4248ae92ed14410d196b942                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1783905284052 | 2026-07-13T01:14:44.052Z undefined ERROR (node:2) Warning: NodeVersionSupportWarning: The AWS SDK for JavaScript (v3) versions published after the first week of January 2027 will require node >=22. You are running node v20.20.2.  To continue receiving updates to AWS services, bug fixes, and security updates please upgrade to node >=22.  More information can be found at: https://a.co/c895JFp (Use `node --trace-warnings ...` to show where the warning was created)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1783905284062 | START RequestId: e612b513-b212-443f-b0f1-816882178050 Version: $LATEST                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1783905284064 | 2026-07-13T01:14:44.064Z e612b513-b212-443f-b0f1-816882178050 INFO [ 'validar REQUEST::::::::::::::::' ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1783905284098 | 2026-07-13T01:14:44.098Z e612b513-b212-443f-b0f1-816882178050 INFO [   {     validador: '0001',     peticion: '9b2786cb0cec5afa290dd1246ae621b0.a739675f8f99bb5d3eb4c27d0a736c0dc6888861d8e9462a3213b18899ec9a6a6ca4083a13a3199f5ce86188a2d7bac2c7ff01ad26797f1849d2acd56802200ba73a4a00a5f097c67a19ebd541b3018b7573798625e656ffca3f5827714635e54388f8f3345716a9813e9e51d588fe88e800195013745b6f0d027d8cfcca0ffafa6c2969a46aae76a27f14ba28943117225fae74a01aba2d4d85513cc23ecf14b0466a40f808a69e87c7c0eadca133b87788d94f487742d6e55a5490ac9b0148e810281e768aeee155ca6902f35f1a24e4c883b019581a2eabfd57ee26a450b92b1e0a0323372a3137ce85026fae8402a2b748d6aa5c6f2e46bfd98b41bbe8ddb7895aba1b52be0ad501ee65677a06b8164c62a3355e1770b4d664024a383f4f0275d9649fd93f849ee554b09f0e2c02ab542109e588f2fc8c7f2e8f7d03a5e2689432cbe670c656d3fa87b598213adcac70629bcb0b8be419db0d68da357b27485eb13c025c9fabaf296da92b78154d7982e89e7cf3c7a39562264b2f77f0f73bbbad7bb83172c29d10bc76f7106219b70c2a55b762ea5f5ef26a4e024e6ae2e3484ae375dad6ffa32702feb4b17c6ce9f04a6099f19d880ee43c93afe4ccea33e2d577d09dfe8068a37341ccce74cb5a0f3029ae97a5d6b6e0fe0073caf21686f54639c67a8f76682c19bff4100b088c94856239c9b7d85ccb1aaf90dc29bb.cd921af023ee12ff41edb1ee77e122068de659e915d4b016ab244a7fd21e5dc9cfecce25866b26f04128abe8de411819c16d2b42280ca52cb6daf158a81d5f77dac2fbb807524d5831cfb4e68c80f5c47adc20abad62fd03dbada2be68461778e7ea43823dbaa15bd5aaa58399a7f89a1c0c57e8d40fd5262e6f2c3403bfde9f'   } ]                                                                                                                                                                                                                                                                                                                                          |
| 1783905284099 | 2026-07-13T01:14:44.099Z e612b513-b212-443f-b0f1-816882178050 INFO [   {     validador: '0001',     peticion: '9b2786cb0cec5afa290dd1246ae621b0.a739675f8f99bb5d3eb4c27d0a736c0dc6888861d8e9462a3213b18899ec9a6a6ca4083a13a3199f5ce86188a2d7bac2c7ff01ad26797f1849d2acd56802200ba73a4a00a5f097c67a19ebd541b3018b7573798625e656ffca3f5827714635e54388f8f3345716a9813e9e51d588fe88e800195013745b6f0d027d8cfcca0ffafa6c2969a46aae76a27f14ba28943117225fae74a01aba2d4d85513cc23ecf14b0466a40f808a69e87c7c0eadca133b87788d94f487742d6e55a5490ac9b0148e810281e768aeee155ca6902f35f1a24e4c883b019581a2eabfd57ee26a450b92b1e0a0323372a3137ce85026fae8402a2b748d6aa5c6f2e46bfd98b41bbe8ddb7895aba1b52be0ad501ee65677a06b8164c62a3355e1770b4d664024a383f4f0275d9649fd93f849ee554b09f0e2c02ab542109e588f2fc8c7f2e8f7d03a5e2689432cbe670c656d3fa87b598213adcac70629bcb0b8be419db0d68da357b27485eb13c025c9fabaf296da92b78154d7982e89e7cf3c7a39562264b2f77f0f73bbbad7bb83172c29d10bc76f7106219b70c2a55b762ea5f5ef26a4e024e6ae2e3484ae375dad6ffa32702feb4b17c6ce9f04a6099f19d880ee43c93afe4ccea33e2d577d09dfe8068a37341ccce74cb5a0f3029ae97a5d6b6e0fe0073caf21686f54639c67a8f76682c19bff4100b088c94856239c9b7d85ccb1aaf90dc29bb.cd921af023ee12ff41edb1ee77e122068de659e915d4b016ab244a7fd21e5dc9cfecce25866b26f04128abe8de411819c16d2b42280ca52cb6daf158a81d5f77dac2fbb807524d5831cfb4e68c80f5c47adc20abad62fd03dbada2be68461778e7ea43823dbaa15bd5aaa58399a7f89a1c0c57e8d40fd5262e6f2c3403bfde9f'   } ]                                                                                                                                                                                                                                                                                                                                          |
| 1783905284158 | 2026-07-13T01:14:44.158Z e612b513-b212-443f-b0f1-816882178050 INFO [   'guardarTrace',   {     idTransaccionAutopista: '384791783905284',     fechaHora: '2026-07-12 20:14:44.101',     canal: undefined,     tipo: 'validador-validar',     direccion: 'request',     data: {       validador: '0001',       peticion: '9b2786cb0cec5afa290dd1246ae621b0.a739675f8f99bb5d3eb4c27d0a736c0dc6888861d8e9462a3213b18899ec9a6a6ca4083a13a3199f5ce86188a2d7bac2c7ff01ad26797f1849d2acd56802200ba73a4a00a5f097c67a19ebd541b3018b7573798625e656ffca3f5827714635e54388f8f3345716a9813e9e51d588fe88e800195013745b6f0d027d8cfcca0ffafa6c2969a46aae76a27f14ba28943117225fae74a01aba2d4d85513cc23ecf14b0466a40f808a69e87c7c0eadca133b87788d94f487742d6e55a5490ac9b0148e810281e768aeee155ca6902f35f1a24e4c883b019581a2eabfd57ee26a450b92b1e0a0323372a3137ce85026fae8402a2b748d6aa5c6f2e46bfd98b41bbe8ddb7895aba1b52be0ad501ee65677a06b8164c62a3355e1770b4d664024a383f4f0275d9649fd93f849ee554b09f0e2c02ab542109e588f2fc8c7f2e8f7d03a5e2689432cbe670c656d3fa87b598213adcac70629bcb0b8be419db0d68da357b27485eb13c025c9fabaf296da92b78154d7982e89e7cf3c7a39562264b2f77f0f73bbbad7bb83172c29d10bc76f7106219b70c2a55b762ea5f5ef26a4e024e6ae2e3484ae375dad6ffa32702feb4b17c6ce9f04a6099f19d880ee43c93afe4ccea33e2d577d09dfe8068a37341ccce74cb5a0f3029ae97a5d6b6e0fe0073caf21686f54639c67a8f76682c19bff4100b088c94856239c9b7d85ccb1aaf90dc29bb.cd921af023ee12ff41edb1ee77e122068de659e915d4b016ab244a7fd21e5dc9cfecce25866b26f04128abe8de411819c16d2b42280ca52cb6daf158a81d5f77dac2fbb807524d5831cfb4e68c80f5c47adc20abad62fd03dbada2be68461778e7ea43823dbaa15bd5aaa58399a7f89a1c0c57e8d40fd5262e6f2c3403bfde9f',       idTransaccionAutopista: 384791783905284,       fechaHora: '2026-07-12 08:14:44'     },     expiracion: '1783905284365'   } ]  |
| 1783905284840 | 2026-07-13T01:14:44.840Z e612b513-b212-443f-b0f1-816882178050 ERROR (node:2) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1783905285459 | 2026-07-13T01:14:45.459Z e612b513-b212-443f-b0f1-816882178050 INFO [   'respuesta de guardar trace....',   {     '$metadata': {       httpStatusCode: 200,       requestId: 'KCJE8O1AT5NBEIJ7KKRB3GOP4NVV4KQNSO5AEMVJF66Q9ASUAAJG',       extendedRequestId: undefined,       cfId: undefined,       attempts: 1,       totalRetryDelay: 0     }   } ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1783905285460 | 2026-07-13T01:14:45.460Z e612b513-b212-443f-b0f1-816882178050 INFO [ 'Result Valid: canal' ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1783905285519 | END RequestId: e612b513-b212-443f-b0f1-816882178050                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1783905285519 | REPORT RequestId: e612b513-b212-443f-b0f1-816882178050 Duration: 1456.85 ms Billed Duration: 1933 ms Memory Size: 128 MB Max Memory Used: 94 MB Init Duration: 475.25 ms  XRAY TraceId: 1-6a543c02-24832ea14afb47bf1b1a6b05 Sampled: true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |


# VCN Escenarios error > General > 1_validaciones_js > 1_idCanal > 1.1.2. idCanal — null (400)

## Postman

'[VCN raiz] NIVEL_EJECUCION=MATRIZ END_POINT_TLD desde END_POINT_TLD_MATRIZ ALGORITMO_AES=aes-256-cbc idPeticion=CELEGATO1783905690 metodo=0001 idSolicitud=1'
POST https://tld-validador-dummy.dev.telered.internal/cifrar?tld=1&algoritmoCifrado=aes-256-cbc: {
  "Network": {
    "addresses": {
      "local": {
        "address": "10.2.10.17",
        "family": "IPv4",
        "port": 65037
      },
      "remote": {
        "address": "10.250.250.75",
        "family": "IPv4",
        "port": 443
      }
    },
    "tls": {
      "reused": false,
      "authorized": true,
      "authorizationError": null,
      "cipher": {
        "name": "TLS_AES_128_GCM_SHA256",
        "standardName": "TLS_AES_128_GCM_SHA256",
        "version": "TLSv1/SSLv3"
      },
      "protocol": "TLSv1.3",
      "ephemeralKeyInfo": {},
      "peerCertificate": {
        "subject": {
          "country": "PA",
          "stateOrProvince": "PANAMA",
          "locality": "PANAMA",
          "organization": "Telered",
          "organizationalUnit": "Sistemas",
          "commonName": "Auto_AWS_Dev",
          "alternativeNames": "DNS:tld-api-interna.dev.telered.internal, DNS:tld-api-interna-eclave.dev.telered.internal, DNS:tld-api-puente.dev.telered.internal, DNS:tld-img.dev.telered.internal, DNS:tld-otp.dev.telered.internal, DNS:tld-sv.dev.telered.internal, DNS:tld-api-mph.dev.telered.internal, DNS:tld-api-validador.dev.telered.internal, DNS:tld-api-alias.dev.telered.internal, DNS:tld-api-cuenta-nombre.dev.telered.internal, DNS:tld-preg-seguridad.dev.telered.internal, DNS:tld-notificacion.dev.telered.internal, DNS:pac.dev.telered.internal, DNS:tld-validador-dummy.dev.telered.internal, DNS:tld-api-r2p.dev.telered.internal, DNS:tld-api-p2m.dev.telered.internal, DNS:tld-achx.dev.telered.internal, DNS:tld-api-qrpayment.dev.telered.internal"
        },
        "issuer": {
          "country": "EN",
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "Check Point Harmony SASE"
        },
        "validFrom": "Nov 25 20:40:33 2025 GMT",
        "validTo": "Nov 25 20:40:33 2026 GMT",
        "fingerprint": "28:65:D0:02:6E:A0:85:A6:B0:C6:DF:CF:30:28:D5:2E:2E:6B:69:40",
        "serialNumber": "c5282b995227695edfd67639491bf7bf"
      }
    }
  },
  "Request Headers": {
    "content-type": "application/json",
    "user-agent": "PostmanRuntime/7.54.0",
    "accept": "*/*",
    "postman-token": "a4e9d05d-41ba-4ebe-953a-a95d630dd554",
    "host": "tld-validador-dummy.dev.telered.internal",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "content-length": "171"
  },
  "Request Body": "{\"validador\":\"0001\",\"peticion\":{\"idPeticion\":\"CELEGATO1783905690\",\"metodo\":\"0001\",\"solicitudes\":[{\"idSolicitud\":\"1\",\"parametros\":{\"cuenta\":\"1100001328\"}}]},\"idCanal\":null}",
  "Response Headers": {
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Mon, 13 Jul 2026 01:21:19 GMT",
    "server": "Server",
    "x-amz-apigw-id": "Aa6OVGzlIAMFngg=",
    "x-amzn-requestid": "e687b67a-4514-41bd-b74f-6eae551a0842",
    "x-amzn-trace-id": "Root=1-6a543d8e-1e8fc7b654d17fe41e472ba8;Parent=500d314120169011;Sampled=0;Lineage=1:e7baf0a4:0",
    "transfer-encoding": "chunked"
  },
  "Response Body": "{\"validador\":\"0001\",\"peticion\":\"5f65a6aa0ba7a11e2435cc69dcb5dfb4.355c91fbafbb151dd2f5620bb8b2c3949e0bd30a4ef76e41e8548fa137cf6483c7e14b9ac8eadc67b8749db8650068d6c070c0f542daca6cf762422c701199e9c4802e1cb7c23693efff400e61d64e4369d0b6b4985e9091c368fe17ffd6aec07dd3ec24bfacea069ff03c6d7d4c27435a4c21a31fa7cd1b4f643523040fda9bbe77cb031d3c4b82994286d9cafc4c1c4db1426718c05a0e37a9eb286319fb19e1b9f97539511d78440ecf3c9a0098c0c7fea7c144c9616980bc762e1b5960c013a5f588a8109f672390c07aa1820a985806190f2fd5d19bcc0c8bd5d6bbce0b058e3948028de874a67646314665a809ce77a39148516b86f929b99ed4d3fb3df84774bf10059a68d235c58eda48040f3e6e43ada77e60c0722981aa7217f9eab5b387e25d35aa9b48f352700e835771ccf4ce360237359c7a5aefc4f428713e60e608f2bad279e290eec600167afd9dac218461bcb724433594e14bee4a250d4e08f59b5f6c12345ac79ec95ce9a80410b8b1d3ef38425c91bcd7d620e34097d93312ed5b5fa2678d14f4a96b27100fc66861ec86adc3f521596c8448daa9ff481e9ef1ee1a26fccf3cb03ccd7a512a31bde717bce9686f36fbdba90da6b75066117672073ab690f88cda4055004d4aff7742931b6cb550f87ac17591b33286b5b058d2df03a48b1374226b8cc16fad8dbe5e61de0e43c25cfde192de3fcb0f.0fb39fcb5ac3a9c0432d9213b1d11d99cef7e8a397ffbc4c2d521ac9fe1db2c3ed46dd8a2e1b768b6e98a541397a23597ad65827a13b08be459ff2665b2e535e5b83dbef551571ff8bcad8accbb53cdbc6f7df56c06da74d623e49676fe6c0c32c5d38835bf71615567bd9cd6f0275bed179510d21e546348576ff9f9a063483\",\"idCanal\":null}"
}
POST https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/auth/token: {
  "Network": {
    "addresses": {
      "local": {
        "address": "192.168.50.120",
        "family": "IPv4",
        "port": 65038
      },
      "remote": {
        "address": "174.129.43.94",
        "family": "IPv4",
        "port": 443
      }
    },
    "tls": {
      "reused": false,
      "authorized": true,
      "authorizationError": null,
      "cipher": {
        "name": "TLS_AES_128_GCM_SHA256",
        "standardName": "TLS_AES_128_GCM_SHA256",
        "version": "TLSv1/SSLv3"
      },
      "protocol": "TLSv1.3",
      "ephemeralKeyInfo": {},
      "peerCertificate": {
        "subject": {
          "country": null,
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "*.execute-api.us-east-1.amazonaws.com",
          "alternativeNames": "DNS:*.execute-api.us-east-1.amazonaws.com"
        },
        "issuer": {
          "country": "EN",
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "Check Point Harmony SASE"
        },
        "validFrom": "Jul  7 00:00:00 2026 GMT",
        "validTo": "Jan 20 23:59:59 2027 GMT",
        "fingerprint": "27:9F:EF:D5:1D:CD:C3:BE:59:8C:5F:71:53:44:77:BE:A5:E7:38:1D",
        "serialNumber": "ef469730b8f126c4b188cbdc5e20145f"
      }
    }
  },
  "Request Headers": {
    "content-type": "application/json",
    "user-agent": "PostmanRuntime/7.54.0",
    "accept": "*/*",
    "postman-token": "33aa5547-5b91-4e6f-9688-dd6cc1a8c79b",
    "host": "srmi7w9bwi.execute-api.us-east-1.amazonaws.com",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "content-length": "106"
  },
  "Request Body": "{\"apiKey\":\"c4481f99364a45d1843c475a728894a5\",\"secretKey\":\"6bc9d69a676d9f869ab438c5369ec16388b8b7da6f3ddf\"}",
  "Response Headers": {
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Mon, 13 Jul 2026 01:21:22 GMT",
    "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
    "x-amz-apigw-id": "Aa6OmFaHIAMEs4w=",
    "x-amzn-requestid": "2774b654-cec2-40c8-a915-041f83c3940f",
    "x-amzn-trace-id": "Root=1-6a543d90-3b5abea777b3f6af6b364028",
    "transfer-encoding": "chunked"
  },
  "Response Body": "{\"accessToken\":\"eyJraWQiOiJWTjNkOHlqVGNIcmFOOUw3Wi9pTTlOeHBtZmxIdndlRjNTMlR0N0dnaDBZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYmNhODMyMC0xYjMwLTRhMTMtODBmYi0xNDk0ZTFkM2VjM2IiLCJjb2duaXRvOmdyb3VwcyI6WyJ0bGQtbWF0cml6LXBsYW5lcyIsInRsZC1tYXRyaXotY29uc3VsdGEtZmFjdHVyYWRvciIsInRsZC1tYXRyaXotZnVsbCIsInRsZC1tYXRyaXotZ3J1cG9zLWFwaS1rZXkiXSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS91cy1lYXN0LTFfZDBJY1A0RVYyIiwiY2xpZW50X2lkIjoiN2NnNGc4dm9yaXJsaGVsZWJjcmlxbmo5NWEiLCJvcmlnaW5fanRpIjoiM2QwZTgyODctMGRiOS00NjQ4LWIxOTgtZDhjNTBmYzY2OTQyIiwiZXZlbnRfaWQiOiI3Y2Q4MDJlNi0xN2ExLTQ1ODMtODBmNy05NzkwMWIxZTE0YTciLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzgzOTA1NjgyLCJleHAiOjE3ODM5MDkyODIsImlhdCI6MTc4MzkwNTY4MiwianRpIjoiZTkyNzQ4MTYtZTE2OC00NTg3LWFiMWEtZGRmYTA0NTBlMmUyIiwidXNlcm5hbWUiOiJjNDQ4MWY5OTM2NGE0NWQxODQzYzQ3NWE3Mjg4OTRhNSJ9.Jwt92kgGDgwFq4rRwLICVtrlGuPjde_sf-vp2PaQbrdX_pzM4pBlsT0BIB55UZTroxaSsw6nvk6nbmtjatFvVAyi2q_EhTz_cPA97db3tW3NCcrRaqR5-BJ3oKPesPfnyJc3offyPBfnbK5nt3rp0LQDxT-uLSjKtsg-aG9Da54l8nj_dSbZewnDRjmWpD17JD4pBKlksQmLN6IyQ337-nnj42RRPweOeMOSOQLm6hZJbSVZ_Fha6SDAzOU3BJQsssONGvdYW1DR0laf4t_68HPty88HRv_o6ebDbhhOLzWbW3KqO5ojcMe9z8oM1g1GauHWbP_qCRAI3WM7-kY6iw\",\"expiresIn\":3600,\"refreshToken\":\"eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.QxJEh3qHkHfo9uA5sWRQiXWjxMUR_FA0qQlHY8h5B9472yriIeK8I91ZCGc7wQCMgfHPismR8Le5SH8kPMRBbqqsKP5zlv4jvf2mHY0f9GrDH6C7wg8ym8NPF1UF3Yxdywy7OUF556TR8Ji_CN7kpf3wM95_I_skuLlUNhSlDtmNPH136UPUorq81QHO5LNq75vqqzCGTBD9KoWruZ6HrWy4zzJ0HOLAWu9JOlDUvQZdw1xREc8Fk8i0VAmQwCUnAQNXc4_xuXxmicxpBU7mhatmrRu4kXEMSPp2Yiimz9QUBK51rG31NkmhxtaAw4cRh7PVjQdvF1KVaiK-m0Aylg.w8F_Tj9eQ7O-i5gJ.zfvzt3wGUDXEQcbtHCG5LDMA8Rp_cVD1FF6z8X_9RlYZP0p7QdEXQYiXnrqRA0PkcxnfsChHKtKsRoYVMY-oRXJpBC8Pb4y06DgEwGRJ2gM1QCZ5LG6aH3LnZe94FVWrcPYqK83eoq2ukcOhHzHlZqj8gQc2dluAVsO_kBSg00sIsMFHKt71YVIyv4mzGo5LCI2L-WUqZV24uOaEcZ99GHFAzXxA8Y2k7hUPIlwme6lDf3LmVmb6J3CR3hhqMqil6yf1_7TicZ_On99QUqMjEApCPNi_DYR8a1DSL4dWxu9rFnFTupNly2u4pfzvO_yGJSWJuT4oTnoFny7NNa8gY7nIgWU-pw2O8ACkze99sQsvHRk5X0xyY9s8_56qn2QG-Yn1gT3H6rg8tWYEae675rRE-ipV1A644GR7kH3k8qXE6hYwz-Dykrq9BTRdC-T0gYJz6vG3OVTE111_E_V_5gCVV0sloMCPzTd1RxWwGPeyDKj1-C9V799Xxf53dd5g5BG3UF7YLtwJFKtEqNPJTWft0tf4u-AjL1lw_MrulU-sWved2jy_lREA_0OupgnCVBRzYmMb_99_6wpPVBDq0VMYiS4VhBcWdUZwstVwUY65e6w4XW7be5Bedt5vXwvvdN-vb0344_3sgBELQrLs7PXb6TAHGfJauDwCS8RiI_cWEdhiQ5zId_7k2O4HcBwltB2RGuCYRCBu1-xzqb9BOLvp0LE77nHaVUXQnMomt-YBTxGhxAxPC7s9D-p9PEm9kytQJUD7_qQZ7af2UV7ylyUFGPS2Vij3Mwcg-HwDgG2sCM7QvuZTR-UWcqV-_suk61ohkKIARs8vQgmd7EEiCelQNLiXSFwdMP5cec9YyKccqL-SjkexJrvNmUk1zVJP1_Y1FmwaGfMu4PP7bpMws9U8j1YuALCXBdpubVA-IAH2peOq-U2M0UQg16o6-WKw1SUZrURc1DYFT7qM23Mqt7k_pJD74I_RuKtMLMbYs2Jcf5cZha1CapDuvt96LMntrLmmrDyW3g1eDUaxY8YrwkDZOpW1TLO080TK7MJqUx6EjkZOkNkAFFFNJK79oTjaEUVVZ6FvsDEp02at6eCxjmB5Y05OPVSPMwfNQsqgCovGLDFmkI12R8L_-TLSP3QdWL38MnRD2lDCc5taT5hxww5cp6BepLrXQBCcrtkrPd-7p319yw0mCmz6d9JvlL9S-6LuWnN8Qy6lTjbU7dcOgq4o3RmZSDuNRfEeKHhyh-KXr8e9aIBSHkdInGJuvJ0nfFAlpVzrMgyT_iPCR7QpZ2blFAqa1KwPNlplXyFm4hry3Q.wKYAmVFZ-AMuozhdEdhCEA\"}"
}
POST https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar: {
  "Network": {
    "addresses": {
      "local": {
        "address": "192.168.50.120",
        "family": "IPv4",
        "port": 65038
      },
      "remote": {
        "address": "174.129.43.94",
        "family": "IPv4",
        "port": 443
      }
    },
    "tls": {
      "reused": false,
      "authorized": true,
      "authorizationError": null,
      "cipher": {
        "name": "TLS_AES_128_GCM_SHA256",
        "standardName": "TLS_AES_128_GCM_SHA256",
        "version": "TLSv1/SSLv3"
      },
      "protocol": "TLSv1.3",
      "ephemeralKeyInfo": {},
      "peerCertificate": {
        "subject": {
          "country": null,
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "*.execute-api.us-east-1.amazonaws.com",
          "alternativeNames": "DNS:*.execute-api.us-east-1.amazonaws.com"
        },
        "issuer": {
          "country": "EN",
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "Check Point Harmony SASE"
        },
        "validFrom": "Jul  7 00:00:00 2026 GMT",
        "validTo": "Jan 20 23:59:59 2027 GMT",
        "fingerprint": "27:9F:EF:D5:1D:CD:C3:BE:59:8C:5F:71:53:44:77:BE:A5:E7:38:1D",
        "serialNumber": "ef469730b8f126c4b188cbdc5e20145f"
      }
    }
  },
  "Request Headers": {
    "content-type": "application/json",
    "authorization": "Bearer eyJraWQiOiJWTjNkOHlqVGNIcmFOOUw3Wi9pTTlOeHBtZmxIdndlRjNTMlR0N0dnaDBZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYmNhODMyMC0xYjMwLTRhMTMtODBmYi0xNDk0ZTFkM2VjM2IiLCJjb2duaXRvOmdyb3VwcyI6WyJ0bGQtbWF0cml6LXBsYW5lcyIsInRsZC1tYXRyaXotY29uc3VsdGEtZmFjdHVyYWRvciIsInRsZC1tYXRyaXotZnVsbCIsInRsZC1tYXRyaXotZ3J1cG9zLWFwaS1rZXkiXSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS91cy1lYXN0LTFfZDBJY1A0RVYyIiwiY2xpZW50X2lkIjoiN2NnNGc4dm9yaXJsaGVsZWJjcmlxbmo5NWEiLCJvcmlnaW5fanRpIjoiM2QwZTgyODctMGRiOS00NjQ4LWIxOTgtZDhjNTBmYzY2OTQyIiwiZXZlbnRfaWQiOiI3Y2Q4MDJlNi0xN2ExLTQ1ODMtODBmNy05NzkwMWIxZTE0YTciLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzgzOTA1NjgyLCJleHAiOjE3ODM5MDkyODIsImlhdCI6MTc4MzkwNTY4MiwianRpIjoiZTkyNzQ4MTYtZTE2OC00NTg3LWFiMWEtZGRmYTA0NTBlMmUyIiwidXNlcm5hbWUiOiJjNDQ4MWY5OTM2NGE0NWQxODQzYzQ3NWE3Mjg4OTRhNSJ9.Jwt92kgGDgwFq4rRwLICVtrlGuPjde_sf-vp2PaQbrdX_pzM4pBlsT0BIB55UZTroxaSsw6nvk6nbmtjatFvVAyi2q_EhTz_cPA97db3tW3NCcrRaqR5-BJ3oKPesPfnyJc3offyPBfnbK5nt3rp0LQDxT-uLSjKtsg-aG9Da54l8nj_dSbZewnDRjmWpD17JD4pBKlksQmLN6IyQ337-nnj42RRPweOeMOSOQLm6hZJbSVZ_Fha6SDAzOU3BJQsssONGvdYW1DR0laf4t_68HPty88HRv_o6ebDbhhOLzWbW3KqO5ojcMe9z8oM1g1GauHWbP_qCRAI3WM7-kY6iw",
    "user-agent": "PostmanRuntime/7.54.0",
    "accept": "*/*",
    "postman-token": "74e93d52-acdd-4318-98c6-7b05f2045645",
    "host": "srmi7w9bwi.execute-api.us-east-1.amazonaws.com",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "content-length": "1363"
  },
  "Request Body": "{\"validador\":\"0001\",\"peticion\":\"5f65a6aa0ba7a11e2435cc69dcb5dfb4.355c91fbafbb151dd2f5620bb8b2c3949e0bd30a4ef76e41e8548fa137cf6483c7e14b9ac8eadc67b8749db8650068d6c070c0f542daca6cf762422c701199e9c4802e1cb7c23693efff400e61d64e4369d0b6b4985e9091c368fe17ffd6aec07dd3ec24bfacea069ff03c6d7d4c27435a4c21a31fa7cd1b4f643523040fda9bbe77cb031d3c4b82994286d9cafc4c1c4db1426718c05a0e37a9eb286319fb19e1b9f97539511d78440ecf3c9a0098c0c7fea7c144c9616980bc762e1b5960c013a5f588a8109f672390c07aa1820a985806190f2fd5d19bcc0c8bd5d6bbce0b058e3948028de874a67646314665a809ce77a39148516b86f929b99ed4d3fb3df84774bf10059a68d235c58eda48040f3e6e43ada77e60c0722981aa7217f9eab5b387e25d35aa9b48f352700e835771ccf4ce360237359c7a5aefc4f428713e60e608f2bad279e290eec600167afd9dac218461bcb724433594e14bee4a250d4e08f59b5f6c12345ac79ec95ce9a80410b8b1d3ef38425c91bcd7d620e34097d93312ed5b5fa2678d14f4a96b27100fc66861ec86adc3f521596c8448daa9ff481e9ef1ee1a26fccf3cb03ccd7a512a31bde717bce9686f36fbdba90da6b75066117672073ab690f88cda4055004d4aff7742931b6cb550f87ac17591b33286b5b058d2df03a48b1374226b8cc16fad8dbe5e61de0e43c25cfde192de3fcb0f.0fb39fcb5ac3a9c0432d9213b1d11d99cef7e8a397ffbc4c2d521ac9fe1db2c3ed46dd8a2e1b768b6e98a541397a23597ad65827a13b08be459ff2665b2e535e5b83dbef551571ff8bcad8accbb53cdbc6f7df56c06da74d623e49676fe6c0c32c5d38835bf71615567bd9cd6f0275bed179510d21e546348576ff9f9a063483\",\"idCanal\":null}",
  "Response Headers": {
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Mon, 13 Jul 2026 01:21:25 GMT",
    "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
    "x-amz-apigw-id": "Aa6PBH4roAMEUqQ=",
    "x-amzn-requestid": "07bd5572-cf1f-40ee-96f1-6c2140ae9bfa",
    "x-amzn-trace-id": "Root=1-6a543d92-1336f56e2d252e747f8a55f2",
    "transfer-encoding": "chunked"
  },
  "Response Body": "{\"codigoError\":550,\"descripcionError\":\"Error inesperado\"}"
}
POST https://tld-validador-dummy.dev.telered.internal/descifrar?tld=0&algoritmoCifrado=aes-256-cbc: {
  "Network": {
    "addresses": {
      "local": {
        "address": "10.2.10.17",
        "family": "IPv4",
        "port": 65037
      },
      "remote": {
        "address": "10.250.250.75",
        "family": "IPv4",
        "port": 443
      }
    },
    "tls": {
      "reused": false,
      "authorized": true,
      "authorizationError": null,
      "cipher": {
        "name": "TLS_AES_128_GCM_SHA256",
        "standardName": "TLS_AES_128_GCM_SHA256",
        "version": "TLSv1/SSLv3"
      },
      "protocol": "TLSv1.3",
      "ephemeralKeyInfo": {},
      "peerCertificate": {
        "subject": {
          "country": "PA",
          "stateOrProvince": "PANAMA",
          "locality": "PANAMA",
          "organization": "Telered",
          "organizationalUnit": "Sistemas",
          "commonName": "Auto_AWS_Dev",
          "alternativeNames": "DNS:tld-api-interna.dev.telered.internal, DNS:tld-api-interna-eclave.dev.telered.internal, DNS:tld-api-puente.dev.telered.internal, DNS:tld-img.dev.telered.internal, DNS:tld-otp.dev.telered.internal, DNS:tld-sv.dev.telered.internal, DNS:tld-api-mph.dev.telered.internal, DNS:tld-api-validador.dev.telered.internal, DNS:tld-api-alias.dev.telered.internal, DNS:tld-api-cuenta-nombre.dev.telered.internal, DNS:tld-preg-seguridad.dev.telered.internal, DNS:tld-notificacion.dev.telered.internal, DNS:pac.dev.telered.internal, DNS:tld-validador-dummy.dev.telered.internal, DNS:tld-api-r2p.dev.telered.internal, DNS:tld-api-p2m.dev.telered.internal, DNS:tld-achx.dev.telered.internal, DNS:tld-api-qrpayment.dev.telered.internal"
        },
        "issuer": {
          "country": "EN",
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "Check Point Harmony SASE"
        },
        "validFrom": "Nov 25 20:40:33 2025 GMT",
        "validTo": "Nov 25 20:40:33 2026 GMT",
        "fingerprint": "28:65:D0:02:6E:A0:85:A6:B0:C6:DF:CF:30:28:D5:2E:2E:6B:69:40",
        "serialNumber": "c5282b995227695edfd67639491bf7bf"
      }
    }
  },
  "Request Headers": {
    "content-type": "application/json",
    "user-agent": "PostmanRuntime/7.54.0",
    "accept": "*/*",
    "postman-token": "a8fc36bc-e89a-4cd1-833c-cc717c56cf37",
    "host": "tld-validador-dummy.dev.telered.internal",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "content-length": "57"
  },
  "Request Body": "{\"codigoError\":550,\"descripcionError\":\"Error inesperado\"}",
  "Response Headers": {
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Mon, 13 Jul 2026 01:21:26 GMT",
    "server": "Server",
    "x-amz-apigw-id": "Aa6PcFoqIAMF_XQ=",
    "x-amzn-requestid": "775d3112-c68f-4c49-9817-aeb3a7a76a5f",
    "x-amzn-trace-id": "Root=1-6a543d95-7d76eb89662bd9884e340a16;Parent=7e2ff25f4eaa43a9;Sampled=0;Lineage=1:6778dd49:0",
    "transfer-encoding": "chunked"
  },
  "Response Body": "{\"codigoError\":550,\"descripcionError\":\"Error inesperado\"}"
}

# CloudWatch
Administración de registros
/aws/lambda/tld-matriz-validador-validar
2026/07/13/[$LATEST]e155fe45cb57451595e6f19ce0057770

|   timestamp   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      message                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1783905683541 | INIT_START Runtime Version: nodejs:20.v101 Runtime Version ARN: arn:aws:lambda:us-east-1::runtime:18671876e7cc385452255180c58ca50cf8763398a4248ae92ed14410d196b942                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1783905684008 | 2026-07-13T01:21:24.008Z undefined ERROR (node:2) Warning: NodeVersionSupportWarning: The AWS SDK for JavaScript (v3) versions published after the first week of January 2027 will require node >=22. You are running node v20.20.2.  To continue receiving updates to AWS services, bug fixes, and security updates please upgrade to node >=22.  More information can be found at: https://a.co/c895JFp (Use `node --trace-warnings ...` to show where the warning was created)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 1783905684016 | START RequestId: db2952d2-3748-493b-9c4b-2973a24bf594 Version: $LATEST                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1783905684018 | 2026-07-13T01:21:24.018Z db2952d2-3748-493b-9c4b-2973a24bf594 INFO [ 'validar REQUEST::::::::::::::::' ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1783905684036 | 2026-07-13T01:21:24.036Z db2952d2-3748-493b-9c4b-2973a24bf594 INFO [   {     validador: '0001',     peticion: '5f65a6aa0ba7a11e2435cc69dcb5dfb4.355c91fbafbb151dd2f5620bb8b2c3949e0bd30a4ef76e41e8548fa137cf6483c7e14b9ac8eadc67b8749db8650068d6c070c0f542daca6cf762422c701199e9c4802e1cb7c23693efff400e61d64e4369d0b6b4985e9091c368fe17ffd6aec07dd3ec24bfacea069ff03c6d7d4c27435a4c21a31fa7cd1b4f643523040fda9bbe77cb031d3c4b82994286d9cafc4c1c4db1426718c05a0e37a9eb286319fb19e1b9f97539511d78440ecf3c9a0098c0c7fea7c144c9616980bc762e1b5960c013a5f588a8109f672390c07aa1820a985806190f2fd5d19bcc0c8bd5d6bbce0b058e3948028de874a67646314665a809ce77a39148516b86f929b99ed4d3fb3df84774bf10059a68d235c58eda48040f3e6e43ada77e60c0722981aa7217f9eab5b387e25d35aa9b48f352700e835771ccf4ce360237359c7a5aefc4f428713e60e608f2bad279e290eec600167afd9dac218461bcb724433594e14bee4a250d4e08f59b5f6c12345ac79ec95ce9a80410b8b1d3ef38425c91bcd7d620e34097d93312ed5b5fa2678d14f4a96b27100fc66861ec86adc3f521596c8448daa9ff481e9ef1ee1a26fccf3cb03ccd7a512a31bde717bce9686f36fbdba90da6b75066117672073ab690f88cda4055004d4aff7742931b6cb550f87ac17591b33286b5b058d2df03a48b1374226b8cc16fad8dbe5e61de0e43c25cfde192de3fcb0f.0fb39fcb5ac3a9c0432d9213b1d11d99cef7e8a397ffbc4c2d521ac9fe1db2c3ed46dd8a2e1b768b6e98a541397a23597ad65827a13b08be459ff2665b2e535e5b83dbef551571ff8bcad8accbb53cdbc6f7df56c06da74d623e49676fe6c0c32c5d38835bf71615567bd9cd6f0275bed179510d21e546348576ff9f9a063483',     idCanal: null   } ]                                                                                                                                                                                                                                                                                                                                       |
| 1783905684056 | 2026-07-13T01:21:24.056Z db2952d2-3748-493b-9c4b-2973a24bf594 INFO [   {     validador: '0001',     peticion: '5f65a6aa0ba7a11e2435cc69dcb5dfb4.355c91fbafbb151dd2f5620bb8b2c3949e0bd30a4ef76e41e8548fa137cf6483c7e14b9ac8eadc67b8749db8650068d6c070c0f542daca6cf762422c701199e9c4802e1cb7c23693efff400e61d64e4369d0b6b4985e9091c368fe17ffd6aec07dd3ec24bfacea069ff03c6d7d4c27435a4c21a31fa7cd1b4f643523040fda9bbe77cb031d3c4b82994286d9cafc4c1c4db1426718c05a0e37a9eb286319fb19e1b9f97539511d78440ecf3c9a0098c0c7fea7c144c9616980bc762e1b5960c013a5f588a8109f672390c07aa1820a985806190f2fd5d19bcc0c8bd5d6bbce0b058e3948028de874a67646314665a809ce77a39148516b86f929b99ed4d3fb3df84774bf10059a68d235c58eda48040f3e6e43ada77e60c0722981aa7217f9eab5b387e25d35aa9b48f352700e835771ccf4ce360237359c7a5aefc4f428713e60e608f2bad279e290eec600167afd9dac218461bcb724433594e14bee4a250d4e08f59b5f6c12345ac79ec95ce9a80410b8b1d3ef38425c91bcd7d620e34097d93312ed5b5fa2678d14f4a96b27100fc66861ec86adc3f521596c8448daa9ff481e9ef1ee1a26fccf3cb03ccd7a512a31bde717bce9686f36fbdba90da6b75066117672073ab690f88cda4055004d4aff7742931b6cb550f87ac17591b33286b5b058d2df03a48b1374226b8cc16fad8dbe5e61de0e43c25cfde192de3fcb0f.0fb39fcb5ac3a9c0432d9213b1d11d99cef7e8a397ffbc4c2d521ac9fe1db2c3ed46dd8a2e1b768b6e98a541397a23597ad65827a13b08be459ff2665b2e535e5b83dbef551571ff8bcad8accbb53cdbc6f7df56c06da74d623e49676fe6c0c32c5d38835bf71615567bd9cd6f0275bed179510d21e546348576ff9f9a063483',     idCanal: null   } ]                                                                                                                                                                                                                                                                                                                                       |
| 1783905684115 | 2026-07-13T01:21:24.115Z db2952d2-3748-493b-9c4b-2973a24bf594 INFO [   'guardarTrace',   {     idTransaccionAutopista: '472201783905684',     fechaHora: '2026-07-12 20:21:24.058',     canal: null,     tipo: 'validador-validar',     direccion: 'request',     data: {       validador: '0001',       peticion: '5f65a6aa0ba7a11e2435cc69dcb5dfb4.355c91fbafbb151dd2f5620bb8b2c3949e0bd30a4ef76e41e8548fa137cf6483c7e14b9ac8eadc67b8749db8650068d6c070c0f542daca6cf762422c701199e9c4802e1cb7c23693efff400e61d64e4369d0b6b4985e9091c368fe17ffd6aec07dd3ec24bfacea069ff03c6d7d4c27435a4c21a31fa7cd1b4f643523040fda9bbe77cb031d3c4b82994286d9cafc4c1c4db1426718c05a0e37a9eb286319fb19e1b9f97539511d78440ecf3c9a0098c0c7fea7c144c9616980bc762e1b5960c013a5f588a8109f672390c07aa1820a985806190f2fd5d19bcc0c8bd5d6bbce0b058e3948028de874a67646314665a809ce77a39148516b86f929b99ed4d3fb3df84774bf10059a68d235c58eda48040f3e6e43ada77e60c0722981aa7217f9eab5b387e25d35aa9b48f352700e835771ccf4ce360237359c7a5aefc4f428713e60e608f2bad279e290eec600167afd9dac218461bcb724433594e14bee4a250d4e08f59b5f6c12345ac79ec95ce9a80410b8b1d3ef38425c91bcd7d620e34097d93312ed5b5fa2678d14f4a96b27100fc66861ec86adc3f521596c8448daa9ff481e9ef1ee1a26fccf3cb03ccd7a512a31bde717bce9686f36fbdba90da6b75066117672073ab690f88cda4055004d4aff7742931b6cb550f87ac17591b33286b5b058d2df03a48b1374226b8cc16fad8dbe5e61de0e43c25cfde192de3fcb0f.0fb39fcb5ac3a9c0432d9213b1d11d99cef7e8a397ffbc4c2d521ac9fe1db2c3ed46dd8a2e1b768b6e98a541397a23597ad65827a13b08be459ff2665b2e535e5b83dbef551571ff8bcad8accbb53cdbc6f7df56c06da74d623e49676fe6c0c32c5d38835bf71615567bd9cd6f0275bed179510d21e546348576ff9f9a063483',       idCanal: null,       idTransaccionAutopista: 472201783905684,       fechaHora: '2026-07-12 08:21:24'     },     expiracion: '1783905684365'   } ]  |
| 1783905684815 | 2026-07-13T01:21:24.815Z db2952d2-3748-493b-9c4b-2973a24bf594 ERROR (node:2) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1783905685435 | 2026-07-13T01:21:25.435Z db2952d2-3748-493b-9c4b-2973a24bf594 INFO [   'ERROR: guardarTrace. {"$fault":"client","$metadata":{"httpStatusCode":400,"requestId":"4AUMQR42F3P4U4ES8OEL3K84BJVV4KQNSO5AEMVJF66Q9ASUAAJG","attempts":1,"totalRetryDelay":0},"name":"ValidationException","__type":"com.amazon.coral.validate#ValidationException","message":"One or more parameter values were invalid: Type mismatch for Index Key canal Expected: S Actual: NULL IndexName: matriz-trace-canal"}' ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 1783905685435 | 2026-07-13T01:21:25.435Z db2952d2-3748-493b-9c4b-2973a24bf594 INFO [   ReferenceError: error is not defined       at exports.handler (/var/task/index.js:33:7)       at process.processTicksAndRejections (node:internal/process/task_queues:95:5) ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1783905685436 | 2026-07-13T01:21:25.436Z db2952d2-3748-493b-9c4b-2973a24bf594 INFO [ '{}' ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1783905685456 | END RequestId: db2952d2-3748-493b-9c4b-2973a24bf594                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1783905685456 | REPORT RequestId: db2952d2-3748-493b-9c4b-2973a24bf594 Duration: 1439.04 ms Billed Duration: 1912 ms Memory Size: 128 MB Max Memory Used: 93 MB Init Duration: 472.11 ms  XRAY TraceId: 1-6a543d92-1336f56e2d252e747f8a55f2 Sampled: true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |


# VCN Escenarios error > General > 1_validaciones_js > 1_idCanal > 1.1.3. idCanal — string vacío "" (400)

## Postman

'[VCN raiz] NIVEL_EJECUCION=MATRIZ END_POINT_TLD desde END_POINT_TLD_MATRIZ ALGORITMO_AES=aes-256-cbc idPeticion=CELEGATO1783905947 metodo=0001 idSolicitud=1'
POST https://tld-validador-dummy.dev.telered.internal/cifrar?tld=1&algoritmoCifrado=aes-256-cbc: {
  "Network": {
    "addresses": {
      "local": {
        "address": "10.2.10.17",
        "family": "IPv4",
        "port": 64195
      },
      "remote": {
        "address": "10.250.252.28",
        "family": "IPv4",
        "port": 443
      }
    },
    "tls": {
      "reused": false,
      "authorized": true,
      "authorizationError": null,
      "cipher": {
        "name": "TLS_AES_128_GCM_SHA256",
        "standardName": "TLS_AES_128_GCM_SHA256",
        "version": "TLSv1/SSLv3"
      },
      "protocol": "TLSv1.3",
      "ephemeralKeyInfo": {},
      "peerCertificate": {
        "subject": {
          "country": "PA",
          "stateOrProvince": "PANAMA",
          "locality": "PANAMA",
          "organization": "Telered",
          "organizationalUnit": "Sistemas",
          "commonName": "Auto_AWS_Dev",
          "alternativeNames": "DNS:tld-api-interna.dev.telered.internal, DNS:tld-api-interna-eclave.dev.telered.internal, DNS:tld-api-puente.dev.telered.internal, DNS:tld-img.dev.telered.internal, DNS:tld-otp.dev.telered.internal, DNS:tld-sv.dev.telered.internal, DNS:tld-api-mph.dev.telered.internal, DNS:tld-api-validador.dev.telered.internal, DNS:tld-api-alias.dev.telered.internal, DNS:tld-api-cuenta-nombre.dev.telered.internal, DNS:tld-preg-seguridad.dev.telered.internal, DNS:tld-notificacion.dev.telered.internal, DNS:pac.dev.telered.internal, DNS:tld-validador-dummy.dev.telered.internal, DNS:tld-api-r2p.dev.telered.internal, DNS:tld-api-p2m.dev.telered.internal, DNS:tld-achx.dev.telered.internal, DNS:tld-api-qrpayment.dev.telered.internal"
        },
        "issuer": {
          "country": "EN",
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "Check Point Harmony SASE"
        },
        "validFrom": "Nov 25 20:40:33 2025 GMT",
        "validTo": "Nov 25 20:40:33 2026 GMT",
        "fingerprint": "28:65:D0:02:6E:A0:85:A6:B0:C6:DF:CF:30:28:D5:2E:2E:6B:69:40",
        "serialNumber": "c5282b995227695edfd67639491bf7bf"
      }
    }
  },
  "Request Headers": {
    "content-type": "application/json",
    "user-agent": "PostmanRuntime/7.54.0",
    "accept": "*/*",
    "postman-token": "95962a00-c056-4d25-9451-1374ef6bd21d",
    "host": "tld-validador-dummy.dev.telered.internal",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "content-length": "169"
  },
  "Request Body": "{\"validador\":\"0001\",\"peticion\":{\"idPeticion\":\"CELEGATO1783905947\",\"metodo\":\"0001\",\"solicitudes\":[{\"idSolicitud\":\"1\",\"parametros\":{\"cuenta\":\"1100001328\"}}]},\"idCanal\":\"\"}",
  "Response Headers": {
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Mon, 13 Jul 2026 01:25:35 GMT",
    "server": "Server",
    "x-amz-apigw-id": "Aa62cG0FIAMFepg=",
    "x-amzn-requestid": "9f1b5099-ef8a-4951-874a-d2941752315b",
    "x-amzn-trace-id": "Root=1-6a543e8f-71e999ab4e48bcb0180b8e82;Parent=17819a7020a2203f;Sampled=0;Lineage=1:e7baf0a4:0",
    "transfer-encoding": "chunked"
  },
  "Response Body": "{\"validador\":\"0001\",\"peticion\":\"10b148e9f4aba4fdd379609c9e5b8f9d.540fd0878875a29c18fab67492b62956c4b838790fcb2bcdc1f5fa87c9331a16bf9aea9baf6588505a5d62b4845b8b3eadb3bc1cb3e7d323c2a6f7a1abfde11355bcab4c88906bfb68513e71b2fbfe1b3075ec73a5dee4746f0fcc3276da0a4d8bf33ceb6a68c4ecd0be376920ff930bc143234c52f4ea61171c2efb1bc51e2eb2162093962a5fc90a0634b2acde8f9c660e0e7b59be48140dbcf35108d36efa04b0079652a59baf82c9837700c3d0cb4c2921fd7136917850301fa346202d2e1d451e94bcaf5c67d2843d16f3cd313d3f45671262ecc2c4c7d12728a4eb73f32bbe5e719c6af010923078c43be5c86fefec7cef3d99573ed503e54f815c44e2d1e3f2f6f785767d810bebea47d070adf066bfcc984ae141e1eee425389f0bb39c42f78e0948168b703c11d0cae7c4c3da007de67e22003a5c8cf29676011ceb09b86f3a30365ed09e4028dd6e3b940067c32ac909461f660aea0f09e36a6015469711b4807661b6ed4a4b90e2ccd6d66b3e0792f5c511739c5869072fb0a2b82cba50db1da6a7ed6c64f70c359773137d6744323975965f5afcfa218abbbd68d71c24f43bc446045ecfd45b50652d754cbefba14816f2fdeedfc5cc314d4753fea521a73bce1d788afb4e4f1d088c7809b844cb734feca762e20abb09610dfb6e00e74e8d9aeb42414238d48d76b521da98fa5082cd24a61e08c716bf3c364c.c556272f49ea45558735790e5ea1393d65e21808eb2bb2c13db5bb43f8b3b02ced8153a7a2497c78e451b1d4f512b872576733ebc3c7c6a30f3daacb008db30aa5b0da7e10ba62e838ffa7a4f0972868194a4f0a4334f95b753e6b0c656a615645e833a9d399cd9db728d59b92eb08634eff3b8e1dac27ed496849a121d5a3e2\",\"idCanal\":\"\"}"
}
POST https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/auth/token: {
  "Network": {
    "addresses": {
      "local": {
        "address": "192.168.50.120",
        "family": "IPv4",
        "port": 64196
      },
      "remote": {
        "address": "174.129.43.94",
        "family": "IPv4",
        "port": 443
      }
    },
    "tls": {
      "reused": false,
      "authorized": true,
      "authorizationError": null,
      "cipher": {
        "name": "TLS_AES_128_GCM_SHA256",
        "standardName": "TLS_AES_128_GCM_SHA256",
        "version": "TLSv1/SSLv3"
      },
      "protocol": "TLSv1.3",
      "ephemeralKeyInfo": {},
      "peerCertificate": {
        "subject": {
          "country": null,
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "*.execute-api.us-east-1.amazonaws.com",
          "alternativeNames": "DNS:*.execute-api.us-east-1.amazonaws.com"
        },
        "issuer": {
          "country": "EN",
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "Check Point Harmony SASE"
        },
        "validFrom": "Jul  7 00:00:00 2026 GMT",
        "validTo": "Jan 20 23:59:59 2027 GMT",
        "fingerprint": "27:9F:EF:D5:1D:CD:C3:BE:59:8C:5F:71:53:44:77:BE:A5:E7:38:1D",
        "serialNumber": "ef469730b8f126c4b188cbdc5e20145f"
      }
    }
  },
  "Request Headers": {
    "content-type": "application/json",
    "user-agent": "PostmanRuntime/7.54.0",
    "accept": "*/*",
    "postman-token": "86150920-35f4-42aa-8a5f-6dc85fd384d6",
    "host": "srmi7w9bwi.execute-api.us-east-1.amazonaws.com",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "content-length": "106"
  },
  "Request Body": "{\"apiKey\":\"c4481f99364a45d1843c475a728894a5\",\"secretKey\":\"6bc9d69a676d9f869ab438c5369ec16388b8b7da6f3ddf\"}",
  "Response Headers": {
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Mon, 13 Jul 2026 01:25:36 GMT",
    "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
    "x-amz-apigw-id": "Aa62iFRoIAMEKJg=",
    "x-amzn-requestid": "50ecb3a8-cca0-41cb-b54c-0498f6b34775",
    "x-amzn-trace-id": "Root=1-6a543e8f-7652932a2d18de237cf87f23",
    "transfer-encoding": "chunked"
  },
  "Response Body": "{\"accessToken\":\"eyJraWQiOiJWTjNkOHlqVGNIcmFOOUw3Wi9pTTlOeHBtZmxIdndlRjNTMlR0N0dnaDBZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYmNhODMyMC0xYjMwLTRhMTMtODBmYi0xNDk0ZTFkM2VjM2IiLCJjb2duaXRvOmdyb3VwcyI6WyJ0bGQtbWF0cml6LXBsYW5lcyIsInRsZC1tYXRyaXotY29uc3VsdGEtZmFjdHVyYWRvciIsInRsZC1tYXRyaXotZnVsbCIsInRsZC1tYXRyaXotZ3J1cG9zLWFwaS1rZXkiXSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS91cy1lYXN0LTFfZDBJY1A0RVYyIiwiY2xpZW50X2lkIjoiN2NnNGc4dm9yaXJsaGVsZWJjcmlxbmo5NWEiLCJvcmlnaW5fanRpIjoiNmVmOWEzNWQtNzU1MS00N2NhLTkxNDMtYWQ5YzVjYjUzOWEyIiwiZXZlbnRfaWQiOiJiYWUyNTY0My1lNGFiLTQ4MTYtYTg1Ny1hNGViZmE1ODljOTQiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzgzOTA1OTM2LCJleHAiOjE3ODM5MDk1MzYsImlhdCI6MTc4MzkwNTkzNiwianRpIjoiMTRkOWQyNDctMjFjOS00ZmFhLTgzYTQtOWNmNDZjZWQzYzQ2IiwidXNlcm5hbWUiOiJjNDQ4MWY5OTM2NGE0NWQxODQzYzQ3NWE3Mjg4OTRhNSJ9.qnqtiGx-n4Y2U3dHNuMleUmx-JTbCo9unTIZH8-JHEj2iAiec_ZR_0BkvX_SX2-zO1w4DWdYG8t9ahbS595e268WCvQIr3GQMuZcO5fYfkzx9-YU9NowkgpMKCU8K2uNwt3iA2oiLO5M2dnDcLrzFKo7Yvz_xAxALnR8QhG53APUOVwb6Cle0TGaa9Z8q1ZT43Ya6g8zKP9bZZnrnV8XUW87pajY_-ieQr7_gVI54ifn-36Cj7rlKLZrb8QQjYhV0xjVnlxDMawMnldeIX6eGpHYmiDotCdWWexsRHn8ADZM4hmVp_4pwi7fXiZHW_Mf077ITnaI3V31WBm8Wh171g\",\"expiresIn\":3600,\"refreshToken\":\"eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.ymH2HmQx045PYs9aB2GrtS7XZsvuytnsvyfpywHY-aiDjAjZ121DiWg1EZfeopNGhAqjOp4q5tQMjXP_O48WjruyAV8ykn38C-H3bbUqP5fWD2IJFukoqU4vAe-pm7pI6iKCutL6CHZ1yFk39rwHhcXTQQJDzjaz6PKWQneJbKElwzhnnKW6NfcZoAfxQC9Otah8GQQgXZtdtYv3OH0a1yBjoTtiQcvVK9lq-FEDfBfqCa9j8A-UqsTEEn8NZSnuly8NJjLOl7CHFOK4_V4ZUnxAG3cPc-3h6w8nY_pZOPD-Vy-3AJSOlO_S3lWLO9XgULHQP5b7Shi65qzuWp9iTw.Na930aa9XCTVPjEO.QG4o4C8ovZQTyu-NmNXvcYRxY0AG8otHCM691KuhsfwUV8-QbgYz2bndHLMXCXrWfmF3BGOeQ2SI1gIV19MdfpTcDB-bGnbyQmPWM51k4bQlpot9ONtWLICaWEVhGGsFjmT-3JBjXJWS0sIr12hm-hz4sON5NmMdQ5dM4ENJBRFsy6rrhfJwJa2G20_X4fusJP2Pats4f-oYg7NaMMDZjBAcvUbdceLByvgPPWSotY7jaHyiKbjUU4JeOPmWm_hZlJtw99IcVc0NldYRutjk5eNYdnImSarUtNLhKjEJ4z5fjuhMCGGB4h1txBuBV5B0zxxr1agyCb5zIQvASLltBMyyG-K0TVVl3hC07C5zRd0onjyQNIYV5JlTy8fL3lcy00h2PPlQksYeP7_K1NeM8Y66-Ck3v9VoRr4Y-c2Em9VGV2VBWKe9QLw079yxefc_z1WyxEAnomYIIUjMqqoVAmVtaf9vFn5RBFnzfy7_VYebMVeSPTfTpliFmY9Z4mw7Tv9KqQxRIS9WjXvREIA-b1kc7oZYBcMTam1mD3NWZ5aFjIjUgw_a1DIwlf6V5MzBcQRC9sgySqWM0s56evar1aaKbELwvDnbAbl-URMePHYBs93AzowKpZI2PSYxZIqjr-3XbkrwkSR_DaOWub_dioea63fjl6Sv8B_yTyD2YsMaOpuPj6dOhlxbab8CJdPXIkbAWCTI5kpCR8qDXKxOIp2LXC8ot62HF3w5G2t_bE2dfdA4BqGQ3mr7JWhmkBkMznQZJTsizvBOplh2CmgxfRFEroIvPEvHWU7TB_6zT8F6kcdOuJH49GM9TU6BcLMylLDq66DoPh0bCw3eYI0nTOIbCw3kqRsezLivR2CQ5nes1b0eOGnHoM3iQMfk_FBMg0KXkN_gtheWfSLD_ukG1Lewy0rXzmXx7AJwA-BorqZ4wmWMI_xgs5-VJj33KbJFTrMpvPUj8pNB1NtwgEe-u_da1aZXIj7GpjAIBb5X2ADlbGyVQT8H4ql4okkZ1ErEyy0XeVixxJDzprUj267WOf7ZHezSvVI4UYu8PSYalpKXzHqawvBiAAzSDvEOi5vRfw39dLtXN-Qf_bkIsBdseLJ5px5cyFB8HsFSbeZYOsXPo0sA26A56nLspoQbU7qIBrup55k_-1EtJVmrmhBvOCzCjYx06duwfDQQ_ZRd45Th8hOfwPnGQq8hGeTz99CYftr6hVCfxp0J_ybC8CbLa0fSHhbqItR7_i7_ZpUVsmDIZ4ozeqJJ-Z6Bh77sjfQGMcmTHwSeeAvXrYolkb_uIPtRKCOYae2JrZzfRNoRvP4gzQ.rHOLBd2bwTJBYAB7rR0wHg\"}"
}
POST https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar: {
  "Network": {
    "addresses": {
      "local": {
        "address": "192.168.50.120",
        "family": "IPv4",
        "port": 64196
      },
      "remote": {
        "address": "174.129.43.94",
        "family": "IPv4",
        "port": 443
      }
    },
    "tls": {
      "reused": false,
      "authorized": true,
      "authorizationError": null,
      "cipher": {
        "name": "TLS_AES_128_GCM_SHA256",
        "standardName": "TLS_AES_128_GCM_SHA256",
        "version": "TLSv1/SSLv3"
      },
      "protocol": "TLSv1.3",
      "ephemeralKeyInfo": {},
      "peerCertificate": {
        "subject": {
          "country": null,
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "*.execute-api.us-east-1.amazonaws.com",
          "alternativeNames": "DNS:*.execute-api.us-east-1.amazonaws.com"
        },
        "issuer": {
          "country": "EN",
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "Check Point Harmony SASE"
        },
        "validFrom": "Jul  7 00:00:00 2026 GMT",
        "validTo": "Jan 20 23:59:59 2027 GMT",
        "fingerprint": "27:9F:EF:D5:1D:CD:C3:BE:59:8C:5F:71:53:44:77:BE:A5:E7:38:1D",
        "serialNumber": "ef469730b8f126c4b188cbdc5e20145f"
      }
    }
  },
  "Request Headers": {
    "content-type": "application/json",
    "authorization": "Bearer eyJraWQiOiJWTjNkOHlqVGNIcmFOOUw3Wi9pTTlOeHBtZmxIdndlRjNTMlR0N0dnaDBZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYmNhODMyMC0xYjMwLTRhMTMtODBmYi0xNDk0ZTFkM2VjM2IiLCJjb2duaXRvOmdyb3VwcyI6WyJ0bGQtbWF0cml6LXBsYW5lcyIsInRsZC1tYXRyaXotY29uc3VsdGEtZmFjdHVyYWRvciIsInRsZC1tYXRyaXotZnVsbCIsInRsZC1tYXRyaXotZ3J1cG9zLWFwaS1rZXkiXSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS91cy1lYXN0LTFfZDBJY1A0RVYyIiwiY2xpZW50X2lkIjoiN2NnNGc4dm9yaXJsaGVsZWJjcmlxbmo5NWEiLCJvcmlnaW5fanRpIjoiNmVmOWEzNWQtNzU1MS00N2NhLTkxNDMtYWQ5YzVjYjUzOWEyIiwiZXZlbnRfaWQiOiJiYWUyNTY0My1lNGFiLTQ4MTYtYTg1Ny1hNGViZmE1ODljOTQiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzgzOTA1OTM2LCJleHAiOjE3ODM5MDk1MzYsImlhdCI6MTc4MzkwNTkzNiwianRpIjoiMTRkOWQyNDctMjFjOS00ZmFhLTgzYTQtOWNmNDZjZWQzYzQ2IiwidXNlcm5hbWUiOiJjNDQ4MWY5OTM2NGE0NWQxODQzYzQ3NWE3Mjg4OTRhNSJ9.qnqtiGx-n4Y2U3dHNuMleUmx-JTbCo9unTIZH8-JHEj2iAiec_ZR_0BkvX_SX2-zO1w4DWdYG8t9ahbS595e268WCvQIr3GQMuZcO5fYfkzx9-YU9NowkgpMKCU8K2uNwt3iA2oiLO5M2dnDcLrzFKo7Yvz_xAxALnR8QhG53APUOVwb6Cle0TGaa9Z8q1ZT43Ya6g8zKP9bZZnrnV8XUW87pajY_-ieQr7_gVI54ifn-36Cj7rlKLZrb8QQjYhV0xjVnlxDMawMnldeIX6eGpHYmiDotCdWWexsRHn8ADZM4hmVp_4pwi7fXiZHW_Mf077ITnaI3V31WBm8Wh171g",
    "user-agent": "PostmanRuntime/7.54.0",
    "accept": "*/*",
    "postman-token": "4819feff-c26f-4ae6-a342-c67ffd72b6a7",
    "host": "srmi7w9bwi.execute-api.us-east-1.amazonaws.com",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "content-length": "1361"
  },
  "Request Body": "{\"validador\":\"0001\",\"peticion\":\"10b148e9f4aba4fdd379609c9e5b8f9d.540fd0878875a29c18fab67492b62956c4b838790fcb2bcdc1f5fa87c9331a16bf9aea9baf6588505a5d62b4845b8b3eadb3bc1cb3e7d323c2a6f7a1abfde11355bcab4c88906bfb68513e71b2fbfe1b3075ec73a5dee4746f0fcc3276da0a4d8bf33ceb6a68c4ecd0be376920ff930bc143234c52f4ea61171c2efb1bc51e2eb2162093962a5fc90a0634b2acde8f9c660e0e7b59be48140dbcf35108d36efa04b0079652a59baf82c9837700c3d0cb4c2921fd7136917850301fa346202d2e1d451e94bcaf5c67d2843d16f3cd313d3f45671262ecc2c4c7d12728a4eb73f32bbe5e719c6af010923078c43be5c86fefec7cef3d99573ed503e54f815c44e2d1e3f2f6f785767d810bebea47d070adf066bfcc984ae141e1eee425389f0bb39c42f78e0948168b703c11d0cae7c4c3da007de67e22003a5c8cf29676011ceb09b86f3a30365ed09e4028dd6e3b940067c32ac909461f660aea0f09e36a6015469711b4807661b6ed4a4b90e2ccd6d66b3e0792f5c511739c5869072fb0a2b82cba50db1da6a7ed6c64f70c359773137d6744323975965f5afcfa218abbbd68d71c24f43bc446045ecfd45b50652d754cbefba14816f2fdeedfc5cc314d4753fea521a73bce1d788afb4e4f1d088c7809b844cb734feca762e20abb09610dfb6e00e74e8d9aeb42414238d48d76b521da98fa5082cd24a61e08c716bf3c364c.c556272f49ea45558735790e5ea1393d65e21808eb2bb2c13db5bb43f8b3b02ced8153a7a2497c78e451b1d4f512b872576733ebc3c7c6a30f3daacb008db30aa5b0da7e10ba62e838ffa7a4f0972868194a4f0a4334f95b753e6b0c656a615645e833a9d399cd9db728d59b92eb08634eff3b8e1dac27ed496849a121d5a3e2\",\"idCanal\":\"\"}",
  "Response Headers": {
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Mon, 13 Jul 2026 01:25:37 GMT",
    "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
    "x-amz-apigw-id": "Aa62rHrRoAMEZrg=",
    "x-amzn-requestid": "31722b98-b18b-4d22-987a-050115d829dd",
    "x-amzn-trace-id": "Root=1-6a543e90-67fd98892b34b24b79771c3d",
    "transfer-encoding": "chunked"
  },
  "Response Body": "{\"codigoError\":550,\"descripcionError\":\"Error inesperado\"}"
}
POST https://tld-validador-dummy.dev.telered.internal/descifrar?tld=0&algoritmoCifrado=aes-256-cbc: {
  "Network": {
    "addresses": {
      "local": {
        "address": "10.2.10.17",
        "family": "IPv4",
        "port": 64195
      },
      "remote": {
        "address": "10.250.252.28",
        "family": "IPv4",
        "port": 443
      }
    },
    "tls": {
      "reused": false,
      "authorized": true,
      "authorizationError": null,
      "cipher": {
        "name": "TLS_AES_128_GCM_SHA256",
        "standardName": "TLS_AES_128_GCM_SHA256",
        "version": "TLSv1/SSLv3"
      },
      "protocol": "TLSv1.3",
      "ephemeralKeyInfo": {},
      "peerCertificate": {
        "subject": {
          "country": "PA",
          "stateOrProvince": "PANAMA",
          "locality": "PANAMA",
          "organization": "Telered",
          "organizationalUnit": "Sistemas",
          "commonName": "Auto_AWS_Dev",
          "alternativeNames": "DNS:tld-api-interna.dev.telered.internal, DNS:tld-api-interna-eclave.dev.telered.internal, DNS:tld-api-puente.dev.telered.internal, DNS:tld-img.dev.telered.internal, DNS:tld-otp.dev.telered.internal, DNS:tld-sv.dev.telered.internal, DNS:tld-api-mph.dev.telered.internal, DNS:tld-api-validador.dev.telered.internal, DNS:tld-api-alias.dev.telered.internal, DNS:tld-api-cuenta-nombre.dev.telered.internal, DNS:tld-preg-seguridad.dev.telered.internal, DNS:tld-notificacion.dev.telered.internal, DNS:pac.dev.telered.internal, DNS:tld-validador-dummy.dev.telered.internal, DNS:tld-api-r2p.dev.telered.internal, DNS:tld-api-p2m.dev.telered.internal, DNS:tld-achx.dev.telered.internal, DNS:tld-api-qrpayment.dev.telered.internal"
        },
        "issuer": {
          "country": "EN",
          "stateOrProvince": null,
          "locality": null,
          "organization": null,
          "organizationalUnit": null,
          "commonName": "Check Point Harmony SASE"
        },
        "validFrom": "Nov 25 20:40:33 2025 GMT",
        "validTo": "Nov 25 20:40:33 2026 GMT",
        "fingerprint": "28:65:D0:02:6E:A0:85:A6:B0:C6:DF:CF:30:28:D5:2E:2E:6B:69:40",
        "serialNumber": "c5282b995227695edfd67639491bf7bf"
      }
    }
  },
  "Request Headers": {
    "content-type": "application/json",
    "user-agent": "PostmanRuntime/7.54.0",
    "accept": "*/*",
    "postman-token": "4afd950a-9ed0-47d8-8a42-08010066c939",
    "host": "tld-validador-dummy.dev.telered.internal",
    "accept-encoding": "gzip, deflate, br",
    "connection": "keep-alive",
    "content-length": "57"
  },
  "Request Body": "{\"codigoError\":550,\"descripcionError\":\"Error inesperado\"}",
  "Response Headers": {
    "connection": "keep-alive",
    "content-type": "application/json",
    "date": "Mon, 13 Jul 2026 01:25:37 GMT",
    "server": "Server",
    "x-amz-apigw-id": "Aa621FPXIAMFYPg=",
    "x-amzn-requestid": "d6906cca-fd56-4fa7-a1fb-9354de00b8d0",
    "x-amzn-trace-id": "Root=1-6a543e91-0333a6f21e07ae617533131d;Parent=379a48f7dff91653;Sampled=0;Lineage=1:6778dd49:0",
    "transfer-encoding": "chunked"
  },
  "Response Body": "{\"codigoError\":550,\"descripcionError\":\"Error inesperado\"}"
}


## CloudWatch
Administración de registros
/aws/lambda/tld-matriz-validador-validar
2026/07/13/[$LATEST]e155fe45cb57451595e6f19ce0057770

|   timestamp   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      message                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1783905936758 | START RequestId: 5390ad31-58a5-43ae-9d63-83a825b32406 Version: $LATEST                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 1783905936855 | 2026-07-13T01:25:36.855Z 5390ad31-58a5-43ae-9d63-83a825b32406 INFO [ 'validar REQUEST::::::::::::::::' ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1783905936856 | 2026-07-13T01:25:36.856Z 5390ad31-58a5-43ae-9d63-83a825b32406 INFO [   {     validador: '0001',     peticion: '10b148e9f4aba4fdd379609c9e5b8f9d.540fd0878875a29c18fab67492b62956c4b838790fcb2bcdc1f5fa87c9331a16bf9aea9baf6588505a5d62b4845b8b3eadb3bc1cb3e7d323c2a6f7a1abfde11355bcab4c88906bfb68513e71b2fbfe1b3075ec73a5dee4746f0fcc3276da0a4d8bf33ceb6a68c4ecd0be376920ff930bc143234c52f4ea61171c2efb1bc51e2eb2162093962a5fc90a0634b2acde8f9c660e0e7b59be48140dbcf35108d36efa04b0079652a59baf82c9837700c3d0cb4c2921fd7136917850301fa346202d2e1d451e94bcaf5c67d2843d16f3cd313d3f45671262ecc2c4c7d12728a4eb73f32bbe5e719c6af010923078c43be5c86fefec7cef3d99573ed503e54f815c44e2d1e3f2f6f785767d810bebea47d070adf066bfcc984ae141e1eee425389f0bb39c42f78e0948168b703c11d0cae7c4c3da007de67e22003a5c8cf29676011ceb09b86f3a30365ed09e4028dd6e3b940067c32ac909461f660aea0f09e36a6015469711b4807661b6ed4a4b90e2ccd6d66b3e0792f5c511739c5869072fb0a2b82cba50db1da6a7ed6c64f70c359773137d6744323975965f5afcfa218abbbd68d71c24f43bc446045ecfd45b50652d754cbefba14816f2fdeedfc5cc314d4753fea521a73bce1d788afb4e4f1d088c7809b844cb734feca762e20abb09610dfb6e00e74e8d9aeb42414238d48d76b521da98fa5082cd24a61e08c716bf3c364c.c556272f49ea45558735790e5ea1393d65e21808eb2bb2c13db5bb43f8b3b02ced8153a7a2497c78e451b1d4f512b872576733ebc3c7c6a30f3daacb008db30aa5b0da7e10ba62e838ffa7a4f0972868194a4f0a4334f95b753e6b0c656a615645e833a9d399cd9db728d59b92eb08634eff3b8e1dac27ed496849a121d5a3e2',     idCanal: ''   } ]                                                                                                                                                                                                                                                                                                                                         |
| 1783905936856 | 2026-07-13T01:25:36.856Z 5390ad31-58a5-43ae-9d63-83a825b32406 INFO [   {     validador: '0001',     peticion: '10b148e9f4aba4fdd379609c9e5b8f9d.540fd0878875a29c18fab67492b62956c4b838790fcb2bcdc1f5fa87c9331a16bf9aea9baf6588505a5d62b4845b8b3eadb3bc1cb3e7d323c2a6f7a1abfde11355bcab4c88906bfb68513e71b2fbfe1b3075ec73a5dee4746f0fcc3276da0a4d8bf33ceb6a68c4ecd0be376920ff930bc143234c52f4ea61171c2efb1bc51e2eb2162093962a5fc90a0634b2acde8f9c660e0e7b59be48140dbcf35108d36efa04b0079652a59baf82c9837700c3d0cb4c2921fd7136917850301fa346202d2e1d451e94bcaf5c67d2843d16f3cd313d3f45671262ecc2c4c7d12728a4eb73f32bbe5e719c6af010923078c43be5c86fefec7cef3d99573ed503e54f815c44e2d1e3f2f6f785767d810bebea47d070adf066bfcc984ae141e1eee425389f0bb39c42f78e0948168b703c11d0cae7c4c3da007de67e22003a5c8cf29676011ceb09b86f3a30365ed09e4028dd6e3b940067c32ac909461f660aea0f09e36a6015469711b4807661b6ed4a4b90e2ccd6d66b3e0792f5c511739c5869072fb0a2b82cba50db1da6a7ed6c64f70c359773137d6744323975965f5afcfa218abbbd68d71c24f43bc446045ecfd45b50652d754cbefba14816f2fdeedfc5cc314d4753fea521a73bce1d788afb4e4f1d088c7809b844cb734feca762e20abb09610dfb6e00e74e8d9aeb42414238d48d76b521da98fa5082cd24a61e08c716bf3c364c.c556272f49ea45558735790e5ea1393d65e21808eb2bb2c13db5bb43f8b3b02ced8153a7a2497c78e451b1d4f512b872576733ebc3c7c6a30f3daacb008db30aa5b0da7e10ba62e838ffa7a4f0972868194a4f0a4334f95b753e6b0c656a615645e833a9d399cd9db728d59b92eb08634eff3b8e1dac27ed496849a121d5a3e2',     idCanal: ''   } ]                                                                                                                                                                                                                                                                                                                                         |
| 1783905936857 | 2026-07-13T01:25:36.857Z 5390ad31-58a5-43ae-9d63-83a825b32406 INFO [   'guardarTrace',   {     idTransaccionAutopista: '811841783905936',     fechaHora: '2026-07-12 20:25:36.856',     canal: '',     tipo: 'validador-validar',     direccion: 'request',     data: {       validador: '0001',       peticion: '10b148e9f4aba4fdd379609c9e5b8f9d.540fd0878875a29c18fab67492b62956c4b838790fcb2bcdc1f5fa87c9331a16bf9aea9baf6588505a5d62b4845b8b3eadb3bc1cb3e7d323c2a6f7a1abfde11355bcab4c88906bfb68513e71b2fbfe1b3075ec73a5dee4746f0fcc3276da0a4d8bf33ceb6a68c4ecd0be376920ff930bc143234c52f4ea61171c2efb1bc51e2eb2162093962a5fc90a0634b2acde8f9c660e0e7b59be48140dbcf35108d36efa04b0079652a59baf82c9837700c3d0cb4c2921fd7136917850301fa346202d2e1d451e94bcaf5c67d2843d16f3cd313d3f45671262ecc2c4c7d12728a4eb73f32bbe5e719c6af010923078c43be5c86fefec7cef3d99573ed503e54f815c44e2d1e3f2f6f785767d810bebea47d070adf066bfcc984ae141e1eee425389f0bb39c42f78e0948168b703c11d0cae7c4c3da007de67e22003a5c8cf29676011ceb09b86f3a30365ed09e4028dd6e3b940067c32ac909461f660aea0f09e36a6015469711b4807661b6ed4a4b90e2ccd6d66b3e0792f5c511739c5869072fb0a2b82cba50db1da6a7ed6c64f70c359773137d6744323975965f5afcfa218abbbd68d71c24f43bc446045ecfd45b50652d754cbefba14816f2fdeedfc5cc314d4753fea521a73bce1d788afb4e4f1d088c7809b844cb734feca762e20abb09610dfb6e00e74e8d9aeb42414238d48d76b521da98fa5082cd24a61e08c716bf3c364c.c556272f49ea45558735790e5ea1393d65e21808eb2bb2c13db5bb43f8b3b02ced8153a7a2497c78e451b1d4f512b872576733ebc3c7c6a30f3daacb008db30aa5b0da7e10ba62e838ffa7a4f0972868194a4f0a4334f95b753e6b0c656a615645e833a9d399cd9db728d59b92eb08634eff3b8e1dac27ed496849a121d5a3e2',       idCanal: '',       idTransaccionAutopista: 811841783905936,       fechaHora: '2026-07-12 08:25:36'     },     expiracion: '1783905936365'   } ]      |
| 1783905937515 | 2026-07-13T01:25:37.515Z 5390ad31-58a5-43ae-9d63-83a825b32406 INFO [   'ERROR: guardarTrace. {"$fault":"client","$metadata":{"httpStatusCode":400,"requestId":"MCONIBJRN3G7B3CTKRTTCTHQCNVV4KQNSO5AEMVJF66Q9ASUAAJG","attempts":1,"totalRetryDelay":0},"name":"ValidationException","__type":"com.amazon.coral.validate#ValidationException","message":"One or more parameter values are not valid. A value specified for a secondary index key is not supported. The AttributeValue for a key attribute cannot contain an empty string value. IndexName: matriz-trace-canal, IndexKey: canal"}' ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1783905937515 | 2026-07-13T01:25:37.515Z 5390ad31-58a5-43ae-9d63-83a825b32406 INFO [   ReferenceError: error is not defined       at exports.handler (/var/task/index.js:33:7)       at process.processTicksAndRejections (node:internal/process/task_queues:95:5) ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 1783905937515 | 2026-07-13T01:25:37.515Z 5390ad31-58a5-43ae-9d63-83a825b32406 INFO [ '{}' ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 1783905937555 | END RequestId: 5390ad31-58a5-43ae-9d63-83a825b32406                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 1783905937555 | REPORT RequestId: 5390ad31-58a5-43ae-9d63-83a825b32406 Duration: 796.65 ms Billed Duration: 797 ms Memory Size: 128 MB Max Memory Used: 93 MB  XRAY TraceId: 1-6a543e90-67fd98892b34b24b79771c3d Sampled: true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |


