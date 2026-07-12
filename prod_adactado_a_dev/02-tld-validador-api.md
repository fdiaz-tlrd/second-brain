# 02 — `tld-validador-api` en `prod-a-dev`

Clon de producción en `prod_adactado_a_dev/tld-validador-api`, rama `prod-a-dev` (desde `main`).

## Estado

- **Clonado** y rama **`prod-a-dev`** creada desde `main`.
- **Código de negocio = producción, intacto.** No se tocó lógica ni arquitectura.
- **Único cambio aplicado:** un valor de config de despliegue en `samconfig.toml` (VPCe del perfil `[dev]`).

## Qué es prod y qué es refactor (para no mezclar)

La referencia dev (`feature/ARQ-225_Refactory`) **no es un simple ajuste de config**, es un **refactor de
arquitectura** que NO entra a `prod-a-dev`:

- **Prod (`main`):** integra a los productos con **`axios` + URL en DynamoDB** (`tld-validador-config-servicios`).
- **Dev (refactor):** migra a **Lambda Invoke** (`LambdaClient`/`InvokeCommand`), `lib/servicioInterno.js`,
  políticas `LambdaInvokePolicy` ×4 y parámetros SAM `LambdaCuentaNombreName`, `LambdaXpressName`,
  `LambdaR2PName`, `LambdaP2MName`.

## El ajuste de config para dev (lo que sí aplica a prod puro)

Comparando `samconfig.toml` prod vs. la referencia dev, el **único** delta que es config de entorno
(no ligado al refactor) es el **VPCe del perfil `[dev]`**:

| Perfil | VPCe prod (`main`) | VPCe dev vigente |
|--------|--------------------|------------------|
| `[dev]` | `vpce-02604f22955f34464` | **`vpce-03ecbc47b37cc7965`** |

- Cambio introducido en la referencia por el commit `6f1571d`.
- El API Gateway de prod es **PRIVATE** (`EndpointConfiguration: PRIVATE`, `VPCEndpointIds: [!Ref VPCe]`).
  Con el VPCe viejo, el deploy en el dev actual falla (endpoint inexistente/erróneo). Por eso se alinea.
- **No toca lógica**: es solo el id del VPC endpoint del ambiente.

**Aplicado:** `[dev].parameter_overrides` → `VPCe="vpce-03ecbc47b37cc7965"`. `sam validate --config-env dev` OK.

## Lo que NO se aplicó (y por qué)

- **`KmsKeyId` / `AccessPointId` / `EFSResourceId`** (params que la referencia dev agrega): el template de
  prod, en la región principal `us-east-1`, **crea sus propios recursos** — `KmsKey` + `KeyAlias`,
  `EFSResource` + `MountTarget1..3` + `AccessPointResource` (todos bajo `Condition: CreateGlobalResources`).
  El param `KmsKeyId` de prod solo se usa en la **región DR** (`!If [CreateGlobalResources, !Ref KmsKey, !Ref KmsKeyId]`),
  no en dev us-east-1. Los params `AccessPointId`/`EFSResourceId` **ni siquiera están declarados** en el
  template de prod → pasarlos en `parameter_overrides` haría fallar el deploy ("parameters do not exist").
- **`Lambda*Name`**: son del refactor invoke. Prod no los declara ni los usa.

## Verificación

- `sam validate` (default y `--config-env dev`): **template válido**.
- `samconfig.toml` reescrito sin BOM (primeros bytes = `ver...`).

## Commit

- `b55a6e4` — ajuste VPCe `[dev]`. Pusheado a `origin/prod-a-dev`.
