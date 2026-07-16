# Datos R2P de prueba — Dig (fijo)

| Campo | Valor |
|-------|-------|
| Actualizado | 2026-07-16 |
| Origen | Smoke VPN (servilleta `notas-sueltas`, migrado aquí) |
| Canales | [`canalesPruebas-dev.md`](./canalesPruebas-dev.md) |
| Evidencia smoke | [`../../tld-api-r2p/19-smoke-matriz-0011-evidencia.md`](../../tld-api-r2p/19-smoke-matriz-0011-evidencia.md) |

## Par mínimo confirmado

| Rol | idCanal | Alias | Notas |
|-----|---------|-------|--------|
| Emisor | **1008** | CELEGATO | ops `0011`/`0013` Y |
| Validador (banco) | **1009** | ASTRGATO | `0012`/`0014` → `https://tld-validador-dummy.dev.telered.internal/r2p` |

En Dig (2026-07-16) también **1008** tiene `0012`/`0014` apuntando al mismo dummy `/r2p` (útil si algún flujo usa 1008 como validador; el par feliz probado fue 1008→1009).

## Identificador deudor (alias)

Tabla `tld-alias-cuenta`:

| Campo | Valor |
|-------|--------|
| `identificador` | **`61009001`** |
| `tipoIdentificador` | `CELULAR` |
| `banco` | **`ASTRGATO`** |
| `estado` | **`A`** (activo) |
| `cuenta` | `123069852372001` |
| `producto` | `PACA` |
| `id` | `1c123682-a148-4c98-ab1a-2e7cd3ed3c9f` |
| creado/actualizado | `2026-07-16 10:28:35.981` |

Seed JSON mínimo: [`datos-r2p-alias-61009001.json`](./datos-r2p-alias-61009001.json).

## Payload 0011 (claro)

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

Cifrado de prueba vía dummy:  
`https://tld-validador-dummy.dev.telered.internal/cifrar?tld=1&algoritmoCifrado=aes-256-cbc`  
Descifrado respuesta:  
`…/descifrar?tld=0&algoritmoCifrado=aes-256-cbc`

## PartiQL (refresco Dynamo)

Ver [`partiql-dev.md`](./partiql-dev.md).
