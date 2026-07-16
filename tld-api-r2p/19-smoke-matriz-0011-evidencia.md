# Evidencia — smoke MATRIZ `0011` R2P (Dig)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-16 |
| Nivel | MATRIZ |
| Resultado | **OK** — `resultado: 0` + `codigoR2P` |
| Datos fijos | [`../Postman/canalesPruebas-dev/datos-r2p-prueba-dev.md`](../Postman/canalesPruebas-dev/datos-r2p-prueba-dev.md) |

## Qué se probó

1. Cifrar petición clara (dummy cifrar, AES-256-CBC, canal 1008).
2. POST `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` con envelope `{ idCanal, validador, peticion }` cifrado.
3. Descifrar `respuesta` (dummy descifrar).

Par: **1008 → 1009**, identificador **`61009001`**.

## Negocio descifrado (éxito)

```json
{
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
```

(En la servilleta VPN el idPeticion del body claro previo al cifrar figuraba `CELEGATO1784216303`; la respuesta descifrada trajo `…6301`. Para Newman usar `CELEGATO` + timestamp fresco.)

## Lectura

- Gate alias **cerrado**: existe deudor activo ASTRGATO.
- Dummy `/r2p` + MATRIZ responden en el camino feliz.
- **Aún no** es paridad prod-source vs cambios.
- Suite Newman mínima: `Postman/generador` → `node run-newman.js r2p` (VPN).

## Siguiente

Paridad Dig (`--codigo-fuente prod` luego `dev` + `comparar-runs.js`) cuando el usuario lo pida tras deploys.
