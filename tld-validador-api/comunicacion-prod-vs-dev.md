# Comunicación interna — prod vs dev (`tld-validador-api`)

## Resumen en una frase

**Prod** enruta por **URL en DynamoDB** y llama con **axios**. **Dev** enruta por **mapa método→servicio en código** + **nombre de Lambda en env** y llama con **`LambdaClient` + `InvokeCommand`**.

---

## Lambdas del stack

| Lambda | Nombre físico | Salida hacia otros servicios |
|--------|---------------|------------------------------|
| `ValidarEndPoint` | `tld-validador-validar` | **Sí** — único integrador |
| `IniciarLambda` | `tld-validador-iniciar` | **No** — solo seed Dynamo + EFS |

Ambos repos comparten la misma forma: API privada `POST /validar` + lambda de arranque sin evento API.

---

## Prod (`prod/tld-validador-api-main`)

### Patrón: HTTP (axios)

```9:21:c:\Users\Lenovo\GitHub\prod\tld-validador-api-main\lambdas\validar\lib\validador.js
  validar: async function (canal, request) {
    try {
      const resp= await axios.post(canal.url, request ,{
        timeout: readTimeout, 
      })
      return resp.data
    } catch (error) {
      return error?.response?.data
    }
  },
```

### Resolución del destino

1. `canal.getUrlServicioInterno(peticion.metodo)` consulta **`tld-validador-config-servicios`**.
2. Toma el primer item → campo **`url`** (típicamente URL de API Gateway del producto).
3. `app.js` pasa el **body exterior** (`{ idCanal, validador, peticion }` con `peticion` cifrada):

```80:92:c:\Users\Lenovo\GitHub\prod\tld-validador-api-main\lambdas\validar\app.js
    const servicio = await canal.getUrlServicioInterno(peticion.metodo);
    const peticionValidador=  body
    // ...
    const respuesta= await validador.validar(servicioInterno,peticionValidador)
```

### Infra relevante (`template.yaml`)

| Parámetro | Valor prod |
|-----------|------------|
| `ValidarEndPoint.Timeout` | **24 s** |
| `HTTP_READ_TIME_OUT` | **23000** ms (axios) |
| `HTTP_CONNECT_TIME_OUT` | **5000** ms (declarado; **no** se pasa a axios en código) |
| `LambdaInvokePolicy` | **No existe** |

### Dependencias

- `axios` en layer (`^0.27.2` en prod).
- Sin `@aws-sdk/client-lambda`.

### Qué servicios tocaba (datos, no código)

El código **no** nombra `tld-cuenta-nombre`, `tld-alias-cuenta`, etc. La fila en `tld-validador-config-servicios` para el método (`0001`, `0002`, …) define la URL. En operación, esas URLs apuntaban a los API Gateway de cada producto.

---

## Dev (`tld-validador-api`, rama `feature/ARQ-225_Refactory`)

### Patrón: Lambda Invoke

```39:44:c:\Users\Lenovo\GitHub\tld-validador-api\lambdas\validar\lib\validador.js
      const invokeOut = await lambdaClient.send(
        new InvokeCommand({
          FunctionName: functionName,
          InvocationType: "RequestResponse",
          Payload: JSON.stringify(request),
        }),
      );
```

### Resolución del destino — `lib/servicioInterno.js` (nuevo)

| Método(s) | Servicio lógico | Variable env | Lambda default |
|-----------|-----------------|--------------|----------------|
| `0001` | `CUENTA_NOMBRE` | `LAMBDA_CUENTA_NOMBRE` | `tld-cuenta-nombre` |
| `0002`–`0009`, `0022`, `0023` | `XPRESS` | `LAMBDA_XPRESS` | `tld-alias-cuenta` |
| `0011`, `0013` | `R2P` | `LAMBDA_R2P` | `tld-request-to-pay` |
| `0015`–`0019`, `0021`, `0024`, `0025` | `P2M` | `LAMBDA_P2M` | `tld-p2m` |

**Ya no** se lee `tld-validador-config-servicios` para enrutar (la tabla sigue en `template.yaml` pero el código de routing no la usa).

### `app.js` — mismo payload que prod

```169:169:c:\Users\Lenovo\GitHub\tld-validador-api\lambdas\validar\app.js
    const respuesta = await validador.validar(servicioInterno.datos, body);
```

Body exterior cifrado → la lambda producto (ej. `tld-cuenta-nombre`) descifra y luego invoca `tld-validador-proxy`.

### Normalización de respuesta invoke

`normalizarRespuestaInvokeAlias()` en `validador.js` acepta:

- Payload directo `{ codigoError, mensajeError, respuesta, … }`, o
- Sobre API Gateway `{ statusCode, body: "<json string>" }` (compatibilidad si el alias aún devuelve forma HTTP).

### Infra relevante (`template.yaml`)

| Parámetro | Valor dev |
|-----------|-----------|
| `ValidarEndPoint.Timeout` | **28 s** (2026-07-06; antes 24 s) |
| `HTTP_READ_TIME_OUT` | **Eliminado** de `validar` |
| `LambdaInvokePolicy` | **4 políticas** → cuenta-nombre, xpress, R2P, P2M |
| Parámetros SAM | `LambdaCuentaNombreName`, `LambdaXpressName`, `LambdaR2PName`, `LambdaP2MName` |

### Dependencias

- `axios` **sigue en** `lambdas/layer/nodejs/package.json` (`1.18.1`) pero **ningún `.js` lo importa**.
- `@aws-sdk/client-lambda` se usa en `validador.js` pero **no está declarado en el layer** → ver [hallazgos-pendientes.md](./hallazgos-pendientes.md).

---

## Tabla comparativa

| Aspecto | Prod | Dev |
|---------|------|-----|
| Transporte interno | `axios.post(url)` | `InvokeCommand` |
| Destino | `url` en Dynamo `config-servicios` | `functionName` en `LAMBDA_*` |
| Config en runtime | Tabla Dynamo (cambio sin deploy) | Env + mapa en código (deploy para nuevo método) |
| IAM invoke | No | `lambda:InvokeFunction` × 4 |
| Timeout lambda `validar` | 24 s | **28 s** |
| Timeout HTTP saliente | 23 s (`HTTP_READ_TIME_OUT`) | N/A (invoke; ver [timeouts-y-dependencias.md](./timeouts-y-dependencias.md)) |
| Entrada externa | API Gateway `POST /validar` | Igual (Postman, matriz, etc.) |
| Proxy validador bancario | **No** — lo hace el producto vía su propia integración | **No** — igual |

---

## Motivo del cambio (según doc de migración)

1. Integración **lambda-a-lambda** sin depender de VPCE/API Gateway entre servicios internos.
2. Ruteo **versionado en repo** (opción B) en lugar de URLs opacas en Dynamo.
3. API Gateway del validador-api se mantiene para **pruebas manuales**; el camino de producción interno pasa a ser invoke.

---

## Relación con el trabajo VCN / proxy (contexto reciente)

Los escenarios Newman `5_fallosIntegracionValidador` **no** pasan por `tld-validador-api`:

```
Cliente Newman → API cuenta-nombre → invoke tld-validador-proxy → Canal Validador
```

`tld-validador-api` entra cuando el flujo es:

```
Cliente canal → matriz (validador-validar) → invoke/HTTP tld-validador-validar → invoke producto → invoke proxy → banco
```

Detalle del sobre de respuesta hacia matriz: [respuesta-a-matriz.md](./respuesta-a-matriz.md).

Misma lambda destino (`tld-cuenta-nombre`), distinto **punto de entrada** (orquestador vs cliente directo al producto).
