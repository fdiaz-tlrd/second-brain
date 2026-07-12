# 01 — Poda de `tld-matriz` en `prod-a-dev`

Registro de la poda aplicada al clon de producción en `prod_adactado_a_dev/tld-matriz` (rama `prod-a-dev`).

## Objetivo

`prod-a-dev` = **producción en lo más puro**, pero **recortada** a los componentes que interesan,
para poder desplegar en dev sin cargar todo el universo productivo (main tarda >1h por la cantidad
de lambdas y recursos como tablas DynamoDB).

## Fuente de verdad de la poda

La rama de refactor de dev (`feature/ARQ-225_Refactory`) ya ejecutó y **documentó** esta misma poda en:
`tld-matriz/docs/architecture/poda-lambdas-abril-2026/` (`investigacion-eliminacion.md`,
`bitacora-ejecucion-eliminacion.md`, inventarios pre/post, logs de deploy dev `UPDATE_COMPLETE`).

**Decisión clave:** se siguió ese manual para **qué quitar**, pero **NO** se copiaron los archivos de
dev. Dev divergió de producción (runtime `nodejs24.x`, `python3.14`, Validador por invoke en vez de
HTTP, `AllowedOrigins`/CORS, `DeletionProtectionEnabled`, ARNs distintos en samconfig, borrado de
`package.json` en sobrevivientes). `prod-a-dev` conserva el **código de producción** intacto en los
sobrevivientes; solo se elimina lo podado.

## Qué se eliminó

### 9 carpetas de lambdas (`lambdas/`)
card-block-active, card-block-geo, compra, consulta-facturador, datos-facturadores,
generacion-retiro, pago-facturador, registro-tarjeta, saldo-tarjeta.

### `events/` completo (12 fixtures)

### `template.yaml` (cirugía)
- **9 funciones** `AWS::Serverless::Function`: ConsultaFacturador, RegistroTarjeta, GeneracionRetiro,
  SaldoTarjeta, PagoFacturador, Compra, DatosFacturadores, CardControlActBlo, CardControlBlockGeo.
- **3 tablas** `AWS::DynamoDB::Table`: PagoFacturadorTable, DatosEmisorTable, ValidarPinTable.
- **12 Parameters**: EclaveUrl, ImgUrl, SvUrl, MphUrl, ActivarGeneracionRetiro, ActivarSaldoTarjeta,
  ActivarPagoFacturador, ActivarCompra, TablaFacturador, TablaCobranza, TablaOperacionP, TablaOperacionR.
- **4 Conditions**: DeployGeneracionRetiro, DeploySaldoTarjeta, DeployPagoFacturador, DeployCompra.

### `samconfig.toml`
En todos los perfiles, `parameter_overrides` quedó reducido a claves alineadas con `Parameters`
vivos: `AWSRegion`, `EncryptArn`, `Env`, `LambdaSubnets`, `LambdaSecurityGroup`, `ValidadorUrl`,
`AuthPoolR2`. Se quitaron los huérfanos (`EclaveUrl`, `SvUrl`, `ImgUrl`, `MphUrl`, `Tabla*`),
los `Activar*` y `KmsKeyID` (nunca existió como `Parameters`). **Valores** productivos conservados.

### `.vscode/launch.json`
Quitada la config de depuración `tld-matriz:RegistroTarjeta`; conservada `GenerarApiKey`.

## Qué permanece (producción puro)

Lambdas: layer, tld-auth-* (autorizador, crear-canal, generar-api-key, grupos-api-key, init,
matriz-planes, refrescar-token, token), tld-cfg-functions, tld-cfg-timeouts, tld-matriz-control-plan,
tld-validador-validar. Tablas: MatrizTraceTable, CfgApiTimeoutTable, PoliticasAuthTable,
CanalAuthTable, PlanesTable, PlanesCanalesTable + Cognito. `LambdaInvokePolicy → tld-sv-cifrado`
en las 5 lambdas vivas. `EncryptArn`, `Globals`.

## Verificación

- **git diff** en `prod-a-dev`: solo 3 archivos **modificados** (`template.yaml`, `samconfig.toml`,
  `.vscode/launch.json`) + borrados. **Código de sobrevivientes intacto** (0 ediciones).
- **Sin `!Ref` huérfanos** a recursos/parámetros eliminados (grep vacío).
- **Recursos restantes** coinciden con la columna «se queda» del manual.
- **Encoding:** al reescribir con PowerShell se coló un **BOM UTF-8** en los 3 archivos; se **corrigió**
  a UTF-8 sin BOM (el BOM rompía `sam validate`: «Empty key at line 1 col 0»).

## Hallazgo: error preexistente de producción en `sam validate`

⚠️ `sam validate` falla con:
`Resource with id [TldMatriz] is invalid. Property 'Auth.Authorizers.AuthorizerResultTtlInSeconds' should be a map.`

**No lo causó la poda.** Se validó el `template.yaml` **original de `origin/main`** (sin cambios) y da
el **mismo error**. Causa: en `TldMatriz.Auth.Authorizers`, la clave `AuthorizerResultTtlInSeconds`
está al mismo nivel que `TldAuthorizer` (debería ir **dentro** de `TldAuthorizer`). Es un defecto de
indentación **heredado de producción**.

**Implicación:** con la versión actual de SAM CLI, un `sam deploy` de producción puro podría fallar por
esto. Producción quizá despliega por pipeline con una versión de SAM tolerante.

**Decisión del usuario (2026-07-11):** **corregir**. Argumento: producción se ha desplegado «por mera
suerte» con ese defecto. Se corrigió en `prod-a-dev`: `AuthorizerResultTtlInSeconds` movido **dentro**
de `TldAuthorizer` (12 espacios, hermano de `FunctionArn`). Tras el fix, `sam validate` →
**«valid SAM Template»**. El usuario además **consideraría** corregirlo en el repo `tld-matriz` mismo
(pendiente de confirmación explícita; no ejecutado aún).

## Corrección: URL del Validador en dev (`ValidadorUrl`)

**Problema (identificado por el usuario, 2026-07-12):** el perfil `dev` apuntaba a la URL del **API Gateway**
del validador, no a la URL interna de dev:

- ❌ Incorrecto: `https://txjhoqn5k3.execute-api.us-east-1.amazonaws.com/dev`
- ✅ Correcto (base): `https://tld-api-validador.dev.telered.internal`

La lambda `tld-matriz-validador-validar` (`lambdas/tld-validador-validar/index.js` L51) construye
`VALIDADOR_URL + "/validar"`, así que la **base** va **sin** `/validar` → URL final
`https://tld-api-validador.dev.telered.internal/validar`. Coincide con el patrón de sandbox/qa/highway
(`https://tld-api-validador.<amb>.telered.internal`), que ya estaban correctos.

**Archivos corregidos** (solo perfil/valor `dev`, sin tocar lógica):
- `template.yaml` → `Parameters.ValidadorUrl.Default` y el ejemplo del `Description`.
- `samconfig.toml` → `parameter_overrides` del perfil `dev` (`ValidadorUrl=...`).

Los demás perfiles (sandbox, qa, tlrd-highway, us-west-2) **no se tocaron**: ya usaban su URL interna correcta.

## Estado

Poda **completa** y `template.yaml` **validado con SAM**. Commits en `origin/prod-a-dev`:

| Commit | Descripción |
|--------|-------------|
| `cff92e5` | Poda + fix `AuthorizerResultTtlInSeconds` |
| `e22171a` | Stub autorizador (ver [05](./05-tld-matriz-autorizador-stub.md)) |
| `d763b6b` | Marca `PROD-ADAPTADO-A-DEV` en `Description:` raíz + parámetro `Env` (ver [00](./00-estado-y-retomo.md)) |
| `3f072d6` | Fix `ValidadorUrl` dev → `tld-api-validador.dev.telered.internal` |

HEAD actual: `3f072d6`. Pusheado a `origin/prod-a-dev`.