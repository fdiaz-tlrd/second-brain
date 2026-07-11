# Transversal — API Autopista / canal validador

Patrón común a VCN, P2P y R2P en los tres JSON estudiados.

## Actores

| Término | Rol |
|---------|-----|
| **API Autopista** | Telered — orquesta validación entre canales |
| **Canal (emisor)** | Cliente con credenciales; llama `validador/validar` |
| **Canal validador** | IF que expone endpoint POST; recibe petición cifrada + `Authorization` |
| **Servicio validador** | Capa Autopista que reenvía al canal validador |
| **Método** | Campo `metodo` dentro de `peticion` descifrada — selecciona operación |

## Autenticación (canal → Autopista)

| Paso | Detalle |
|------|---------|
| Endpoint | `POST /auth/token` |
| Estándar | OAuth 2.0 — `apiKey` + `secretKey` |
| Uso | Header `Authorization: Bearer <access_token>` (espacio obligatorio tras Bearer) |

OperationIds: `generar-token` (api_4), `obtenerToken` (api_6).

## Envelope HTTP — request al validador

```json
{
  "idCanal": "1000",
  "validador": "1001",
  "peticion": "<iv>.<secreto>.<cifrado>"
}
```

Variantes en doc:
- **VCN (api_4):** también `idTransaccionAutopista`, `fechaHora` en el envelope externo (canal emisor hacia Autopista).
- **P2P / R2P:** mismo concepto; en ejemplos `peticion` puede mostrarse como objeto en claro solo para documentar estructura interna.

### `peticion` descifrada (estructura común)

```json
{
  "idPeticion": "TRTPPAPA12",
  "metodo": "0001",
  "solicitudes": [
    {
      "idSolicitud": "1",
      "parametros": { }
    }
  ]
}
```

| Campo | Reglas transversales |
|-------|----------------------|
| `idPeticion` | 1–64 chars; debe iniciar con **SWIFT CODE** (8) + secuencial; no repetir en 24 h |
| `metodo` | Código de operación (`0001`, `0002`, …) |
| `idSolicitud` | Único en la petición; alfanumérico + guiones `-`; 1–64 chars |
| `parametros` | JSON — forma depende del `metodo` |

## Envelope — response

```json
{
  "respuesta": "<iv>.<secreto>.<cifrado>"
}
```

Descifrado → `idPeticion` + arreglo `respuestas[]`:

| Campo | Significado |
|-------|-------------|
| `idSolicitud` | Eco del request |
| `resultado` | Código numérico (0 = éxito en canal validador) |
| `datos` | Obligatorio si `resultado === 0`; forma según método |

Errores de **Autopista** (antes del canal) pueden venir como `codigoError` / `mensajeError` en algunos escenarios R2P.

## Cifrado híbrido

### VCN (api_4) — AES-256-CBC + RSA 4096

Formato `peticion` / `respuesta`: **`iv.secreto.cifrado`** (hex, separador punto).

1. AES-256-CBC con `iv` (16 bytes) y secreto (32 bytes) aleatorios por mensaje.
2. Secreto cifrado con RSA pública Telered (OAEP SHA-256).
3. Todo en hexadecimal en la cadena.

### P2P (api_6) — preferido GCM; CBC obsoleto

| Esquema | Formato cadena | Estado en doc |
|---------|----------------|---------------|
| **AES-256-GCM** | `RSA_cifrado(1024 hex)` + `AES_cifrado` concatenados **sin separador** | Actual |
| **AES-256-CBC** | `iv.secreto_RSA.cifrado` | Tag «Obsoleto» — similar a VCN |

RSA: 4096 bits, PKCS#1, OAEP SHA-256, clave privada **PKCS#1** (`BEGIN RSA PRIVATE KEY`).

### R2P (api_7)

Mismo modelo que mensajes P2P/P2M (tag «ESTRUCTURA GENERAL…»): cifrado híbrido; referencia diagrama `api_7_cifrado_descifrado.svg`.

## Canal validador — requisitos comunes

| Tema | Valor |
|------|-------|
| HTTP | POST + `Authorization` (token fijo o dinámico; caducidad doc ≤ 1 año) |
| TLS | ≥ 1.2 |
| Timeout **canal espera Autopista** | 25 s |
| Timeout **Telered espera canal validador** | 10 s |
| VPN o público | Certificado CA pública o firmado Telered |

Descifrado en canal validador (modelo CBC clásico):
1. Descifrar `secreto` con RSA privada del validador.
2. Descifrar `cifrado` con `iv` + secreto (AES).

## Códigos de error — dos capas

| Capa | Dónde se documenta | Ejemplos |
|------|-------------------|----------|
| **Autopista (Telered)** | Tags «Razones… Interno» en api_4; parcial en otros | 400, 401, 402, 404, 405, 406, 412, 413, 418, 500, 504, 509, 550, 599, 999 |
| **Canal validador / producto** | Tag «Razones… Canal», «Xpress», «R2P» | 0, 407–430, 432–442, 510–515 (VCN canal), etc. |

Evaluar siempre `resultado` en cada ítem de `respuestas[]`; HTTP 200 no implica éxito de negocio.

## Endpoint único — un solo path para todo (confirmado)

**En la práctica hay UN único endpoint:** **`POST /validador/validar`**.
No hay un path por servicio ni por método. **Todos** los servicios, métodos y operaciones
(VCN `0001`; P2P `0002`–`0009`, `0022`, `0023`, `0010`; R2P `0011`–`0014`) entran por ese mismo
endpoint, con el cuerpo **cifrado**. Lo que cambia la operación es el campo `metodo` dentro de
`peticion` una vez descifrada. No existe routing por URL.

### Por qué en OpenAPI se ven varios paths (truco del espacio)

OpenAPI **obliga a que cada clave de `paths` sea única**. Como todos los métodos usan el mismo
path real, no se pueden documentar por separado con la misma clave. La solución que usó el equipo
(hallazgo de un compañero) es **añadir espacios al final** del path:

```
/validador/validar        ← real
/validador/validar␠       ← "distinto" para OpenAPI (1 espacio)
/validador/validar␠␠      ← otro método (2 espacios)
```

- Con un espacio extra la clave **deja de ser igual** para el validador de OpenAPI → se permite otra entrada.
- Al **renderizar** (Redoc/Swagger/HTML comercial) el espacio final **no se muestra**, así que
  visualmente todas se ven como el mismo endpoint `POST /validador/validar`.
- Resultado: **mismo endpoint a la vista, claves diferentes en el JSON.** Cada entrada solo sirve
  para **documentar un método**; ninguna es una URL distinta en producción.

Otros paths tipo `/0011` en api_7 cumplen el mismo rol: agrupador de documentación, no URL real.
