# VPN — checklist R2P mínimo (servilleta)

Volátil. Solo para la máquina con VPN. No es doc fija.

## Hacer

1. **Validador GATO → dummy R2P**  
   Confirmar (o poner) en Dynamo `tld-validador-canal-operacion` para un canal GATO (sugerido **1009 ASTRGATO**):
   - `0012` estado `Y` → `urlOperacion` = `https://tld-validador-dummy.dev.telered.internal/r2p`
   - `0014` estado `Y` → misma URL  
   (En el export de Lenovo, 1009 ya venía así; verificar en Dig real.)

2. **Emisor GATO**  
   Sugerido **1008 CELEGATO**: ops `0011` y `0013` en `Y` (para el feliz y un 0013 después).

3. **Identificador deudor en alias**  
   En Dig, tabla alias (la que usa R2P): un celular `6xxxxxxx` **activo**, con `banco` = **ASTRGATO** (mismo banco del validador 1009).  
   Anotar aquí el valor real cuando lo tengas: `_______________`

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
    "idPeticion": "CELEGATO{{timestamp}}",
    "metodo": "0011",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "IDENTIFICADOR",
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
