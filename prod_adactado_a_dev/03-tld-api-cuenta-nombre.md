# 03 — `tld-api-cuenta-nombre` (VCN) en `prod-a-dev`

Clon de producción en `prod_adactado_a_dev/tld-api-cuenta-nombre`, rama `prod-a-dev` (desde `master`).

> Nota: este repo usa **`master`** como rama principal (no `main`).

## Estado

- **Clonado** y rama **`prod-a-dev`** creada desde `master`.
- **Sin poda:** mismas 3 carpetas de lambdas que prod y que la referencia dev (`cargar-llave-canal`, `cuenta-nombre`, `layer`).
- **Sin cambios de código ni de `template.yaml`.** Lógica = producción.
- **Sin cambios en `samconfig.toml`:** `master` de producción ya trae la config de despliegue para dev en el perfil `[dev]`.
- **Único cambio propio (`497ecc4`):** marca `PROD-ADAPTADO-A-DEV` en `Description:` raíz y del parámetro
  `DeployEnvironment` del `template.yaml` (metadata para identificar la pila en CloudFormation). No toca
  lógica ni recursos.
- **Pusheado** a `origin/prod-a-dev` (= `master` salvo esa marca de metadata).

## Revisión contra la referencia dev (`feature/ARQ-225_Refactory`)

La referencia dev **no es solo config** — es refactor de arquitectura que **no entra** a `prod-a-dev`:

| Aspecto | Prod (`master`) | Dev (refactor) |
|---------|-----------------|----------------|
| Validador | HTTP / axios + tokens Dynamo (`tld-validador-canal-auth-token`) | Lambda Invoke vía `tld-validador-proxy` |
| `template.yaml` | Params `CertificadoSeguro`, `UrlCaTelered`, rutas CA/CRL en EFS | Params `ProxValLambdaName`, `CanalValidador` |
| Políticas lambda | `DynamoDBCrudPolicy` en `canal-auth-token` | `LambdaInvokePolicy` en proxy |
| Env vars | `URL_CA_TELERED`, `NODE_TLS_REJECT_UNAUTHORIZED`, `HTTP_READ_TIME_OUT` | `PROX_VAL_LAMBDA_NAME`, `CFG_CANAL_VALIDADOR`, `CFG_METODOS_LIMITES_JSON`, etc. |
| Runtime | `nodejs24.x` | `nodejs20.x` |

Todo lo de la columna derecha queda **fuera** de `prod-a-dev`.

## Config de despliegue en dev (ya en producción)

El perfil `[dev]` de `samconfig.toml` en `master` ya incluye lo necesario para desplegar en dev:

| Parámetro | Valor en `[dev]` | Origen |
|-----------|------------------|--------|
| `VPCe` | `vpce-03ecbc47b37cc7965` | Commit histórico en prod (alineado con dev vigente) |
| `UrlCaTelered` | `https://tld-validador-dummy.dev.telered.internal` | Commit `9a03f1c` (`add_dominio_canal_validador`) |
| Subnets / SG | Valores dev estándar | Ya en prod |

`KmsKeyId`, `AccessPointId`, `EFSResourceId` no van en el perfil `[dev]` porque el template de prod ya tiene **defaults** para dev (`mrk-fab483954956476787608d9e5eee2c97`, `fsap-069f5ed286aca3a98`, `fs-0e4079df1cdb063b3`) — comparten el EFS/KMS del validador desplegado en la misma cuenta.

La referencia dev **no** pasa `UrlCaTelered` porque eliminó ese parámetro del template (refactor). Prod **sí** lo necesita → el `samconfig` de prod es el correcto para prod-a-dev.

## Verificación

- `sam validate` (default y `--config-env dev`): **template válido**.
- `git diff master..prod-a-dev`: vacío (rama = producción sin desviaciones).

## Despliegue

En la máquina con VPN, usar **`second-brain/despliegue/deploy.ps1`** (no `sam deploy` manual si el
flujo acordado es el script). Detalle completo: [`04-despliegue-vcn-deploy.ps1.md`](./04-despliegue-vcn-deploy.ps1.md).

Resumen:

```powershell
.\deploy.ps1 `
  -repositorio tld-api-cuenta-nombre `
  -ramaGit prod-a-dev `
  -ambiente dev `
  -modo full `
  -esReversa no `
  -hashCommit <hash_HEAD_de_prod-a-dev>
```

El script instala `@telered/tld-telered-lib` desde Verdaccio (`localhost:4873`) en `lambdas\layer\nodejs`.
