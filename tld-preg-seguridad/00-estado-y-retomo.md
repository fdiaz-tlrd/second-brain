# tld-preg-seguridad — incidente prod 2026-09-08

## Qué reportó el usuario

- En **producción**, cuando **Alias** llama a `tld-preg-seguridad`, el cliente ve **500**.
- Desde la **madrugada**, la última escritura en CloudWatch de la lambda de pregunta-seguridad (y hasta entonces funcionaba).
- Ejecutó **Lambda** y **API Gateway** desde la consola AWS: **sí** escribió en CloudWatch.
- 2026-09-08 21:57: insiste en que el problema es el **API Gateway de prod**, porque el Test de la consola (lo describe como test a la URL HTTPS) **funciona**.
- 2026-09-08 22:09: confirmó en consola que `tld-preg-seguridad.prod.telered.internal` **tiene** mapping al API `tld-preg-seguridad` stage `tlrd-highway`. Esa hipótesis (mapping ausente) **queda cerrada**.

## Diagnóstico (evidencia de código + síntoma)

**La lambda y la integración API Gateway están vivas.** El Test de consola no pasa por el mismo camino que Alias.

Alias (código de prod, `produccion_real/tld-api-alias`) llama por HTTP a:

`https://tld-preg-seguridad.prod.telered.internal` + path (`/preguntas-sistema`, `/preguntas-usuario`, `/validar`, `/asignar`).

Variable de entorno: `API_PREGUNTAS` (parámetro SAM `ApiPreguntas`).

Si esa llamada **no** obtiene HTTP 200 **o** axios lanza (DNS, timeout, TLS, JSON inválido), Alias **siempre** responde al banco con código **500** (`"Error al consumir api preg-seguridad"` / `"Error al consumir api de preguntas de seguridad"`). Un `statusCode` interno **600** (excepción axios) también se traduce a 500 al cliente.

Pregunta-seguridad, si se ejecuta, **siempre loguea** (`PRINT_LOGS=on`, primer log: `"Iniciando el manejador de Lambda"`) y además responde **HTTP 200** aunque el `codigo` de negocio sea 500. Si no hay log en esa lambda cuando Alias llama, **la request no llegó a la función**.

El Test de consola de API Gateway / Lambda **no usa** custom domain, VPCE ni la resource policy `aws:SourceVpce`. Por eso puede escribir en CloudWatch y Alias seguir en 500.

**Aclaración Test consola vs HTTPS de Alias:** el botón Test de un método en la web de API Gateway **no llama** `https://tld-preg-seguridad.prod.telered.internal`. AWS invoca la integración (Lambda) por IAM, por detrás del API. Ese Test OK **confirma** método + Lambda. **No** confirma custom domain, mapping, VPCE ni resource policy — que es lo que Alias usa. El fallo puede estar en esa **entrada privada** del mismo API Gateway sin que el Test se entere.

## Camino que sí usa Alias (prod)

| Pieza | Valor en repo |
|---|---|
| Host | `tld-preg-seguridad.prod.telered.internal` (custom domain **fuera** del stack SAM) |
| Stage SAM | `tlrd-highway` (no se llama `prod`) |
| API | privada; Deny si `aws:SourceVpce` ≠ VPCE del stack |
| VPCE Virginia | `vpce-05fd27576a4f363ff` |
| VPCE Oregon | `vpce-060f0db9e16d13ea3` |
| Alias timeout de función | 24 s |

**Mapping custom domain (2026-09-08 22:09): existe** API `tld-preg-seguridad` + stage `tlrd-highway`. Ya no explicar el incidente como “se perdió el mapping”.

Lo que el mapping **no** cubre (y el Test de consola **tampoco**):

- **Path** del mapping: tiene que ser `(none)` / vacío. Si el path es `tlrd-highway` u otro, Alias pega `/preguntas-sistema` y APIGW no enruta al método → 403/404, sin log de lambda.
- **Resource policy** del API privado: Deny si `aws:SourceVpce` ≠ VPCE del stack (`vpce-05fd27576a4f363ff` Virginia / `vpce-060f0db9e16d13ea3` Oregon). El Test de consola **no aplica** esa policy. Un Deny es 403 a Alias y **cero** logs en la lambda.
- DNS/Route53 del host interno, SG del VPCE, región (Virginia vs Oregon): el request ni llega a APIGW (axios 600 en Alias).

Discriminador: CloudWatch `/aws/lambda/tld-alias-cuenta` en el 500 — `URL + path` y si el catch es 600 (red) o HTTP 403/404 (sí llegó a APIGW).

**Sonda (2026-09-08 22:11):** comando corto GET Alias. Pegar stdout+stderr.

**403 desde EC2 (2026-09-08 22:16):** curl al custom domain → **403 Forbidden**. Llega a API Gateway y es rechazado antes de Lambda. Alias traduce eso a 500. Ese EC2 es **Linux** (SSH desde la consola web de AWS, instancia en prod). La sonda que corresponde es [`sonda-403-ec2.sh`](sonda-403-ec2.sh).

**Corrección (2026-09-08 22:25):** no adaptar el `.ps1` a la máquina de despliegue Windows. Esa máquina no es el camino de Alias. No inventar un flujo Windows; ampliar lo que el usuario dijo (EC2 prod + SSH).

**Sonda AWS CLI máquina de despliegue (2026-09-08 22:47):** pedido explícito. Solo `get`/`describe`. Archivo: [`sonda-aws-cli-despliegue.ps1`](sonda-aws-cli-despliegue.ps1). Aporta policy, mapping path y VPCE; no reproduce el curl 403 (eso fue el EC2 Linux).

## Dónde está la prueba (consola)

1. CloudWatch **`/aws/lambda/tld-alias-cuenta`** (Virginia **y** Oregon) en el minuto del 500. Prod loguea `URL + path` y, si axios falla, `Error en la función requestGet` / `requestPost` (código interno 600).
2. API Gateway → Custom domain names → `tld-preg-seguridad.prod.telered.internal` → mapping al API `tld-preg-seguridad` stage **`tlrd-highway`**.
3. Env de `tld-alias-cuenta`: `API_PREGUNTAS` = esa URL (sin path de stage extra).
4. Misma región: Alias que atiende el tráfico vs log group de pregunta-seguridad.

Método Alias → lambda destino:

| Método Alias | Path | Lambda |
|---|---|---|
| 0005 | GET `/preguntas-sistema` | `tld-preg-seguridad-preguntas-sistema` |
| 0003 | GET `/preguntas-usuario` | `tld-preg-seguridad-preguntas-usuario` |
| 0004 | POST `/validar` | `tld-preg-seguridad-validar` |
| 0006 | POST `/asignar` | `tld-preg-seguridad-asignar` |

## Qué no es (con esta evidencia)

- Un crash de la lambda de pregunta-seguridad: habría log.
- Un fallo que el Test de consola pueda desmentir: ese test no recorre custom domain/VPCE.

`main` del repo tiene merge QA→main el **2026-09-04** (PR #51). No está confirmado si se desplegó a prod; un replace del RestApi dejaría el mapping del dominio apuntando al API id anterior.

## Código de referencia

- Llamada: `produccion_real/tld-api-alias/lambdas/alias/lib/preguntas.js`
- Traducción a 500: `produccion_real/tld-api-alias/lambdas/alias/app.js` (`preguntasSistema` / `preguntasUsuario` / …)
- API privada + stage: `tld-preg-seguridad/template.yaml`, `samconfig.toml` perfil `prod`
