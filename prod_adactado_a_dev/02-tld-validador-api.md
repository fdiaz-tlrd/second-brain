# 02 — `tld-validador-api` en `prod-a-dev`

Clon de producción en `prod_adactado_a_dev/tld-validador-api`, rama `prod-a-dev` (desde `main`).

## Estado

- **Clonado** y rama **`prod-a-dev`** creada desde `main`.
- **Código de negocio = producción, intacto.** No se tocó la lógica de las lambdas ni la arquitectura
  (sigue con `axios` + URL en DynamoDB; NO se trajo el refactor a Lambda Invoke).
- **Cambios de config aplicados para que CORRA en dev:**
  1. VPCe del perfil `[dev]` (endpoint privado del dev vigente).
  2. Reuso de la **KMS y el EFS compartidos de dev** para descifrado (ver abajo).

## CORRECCIÓN — error previo (jul-2026)

La versión anterior de este doc afirmaba que **"el único cambio era el VPCe"** y que `KmsKeyId` /
`AccessPointId` / `EFSResourceId` **no hacían falta**. **Eso era falso y rompía el propósito de
`prod-a-dev` (que la versión de prod despliegue Y CORRA en dev).**

Evidencia (log `second-brain/notas-sueltas/error.md`): `tld-validador-validar` intentaba descifrar con la
KMS `arn:...key/mrk-fab483954956476787608d9e5eee2c97` y la lambda reportaba
`LLave mrk-fab... NO EXISTE` → `InvalidCiphertextException`. Es decir: **desplegaba pero no descifraba.**

### Causa raíz

- Los canales/llaves del **dev real** están cifrados con la KMS compartida `mrk-fab483954956476787608d9e5eee2c97`
  y los `.pem` viven en el **EFS compartido** `fs-0e4079df1cdb063b3` / access point `fsap-069f5ed286aca3a98`.
- El **template de producción**, en `us-east-1`, **crea su propia KMS y su propio EFS vacío** y los monta
  (`!Ref KmsKey` vía `!If CreateGlobalResources`, `!GetAtt AccessPointResource.Arn`). No tiene forma, solo
  con `samconfig`, de reusar la KMS/EFS compartidos: `KmsKeyId` se ignora en us-east-1 y `AccessPointId`/
  `EFSResourceId` **ni estaban declarados** como parámetros.
- Resultado: prod-a-dev creaba una KMS nueva + EFS vacío (sin los `.pem`), y no podía descifrar los canales
  de dev. La referencia dev sí corre porque su template **reusa** la KMS/EFS compartidos por ambiente.

## Fix aplicado (opción aprobada por el usuario)

Se portó **solo el mecanismo de selección de KMS/EFS** del template dev — **infra/config por ambiente, NO
lógica de negocio**. No se trajo nada del refactor de invoke.

En `prod_adactado_a_dev/tld-validador-api/template.yaml`:

- **Parámetros nuevos:** `AccessPointId` (default `fsap-069f5ed286aca3a98`) y
  `EFSResourceId` (default `fs-0e4079df1cdb063b3`).
- **Condición nueva:** `UseSharedLlavesEfs: !Equals [!Ref DeployEnvironment, dev]`.
- **En `ValidarEndPoint` e `IniciarLambda`** (KMSDecryptPolicy, KMSEncryptPolicy, EFSWriteAccessPolicy y
  `FileSystemConfigs.Arn`): `!If [UseSharedLlavesEfs, <compartido de dev>, <recurso propio del stack>]`.
  Fuera de dev (sandbox/qa/prod/DR) **el comportamiento de prod queda idéntico** al original.

En `samconfig.toml`, perfiles dev (`[default]` y `[dev]`):

```
KmsKeyId="mrk-fab483954956476787608d9e5eee2c97"
AccessPointId="fsap-069f5ed286aca3a98"
EFSResourceId="fs-0e4079df1cdb063b3"
```

### VPCe del perfil `[dev]`

| Perfil | VPCe prod (`main`) | VPCe dev vigente |
|--------|--------------------|------------------|
| `[dev]` | `vpce-02604f22955f34464` | **`vpce-03ecbc47b37cc7965`** |

- API Gateway prod es **PRIVATE**; con el VPCe viejo el deploy en el dev actual falla. Se alinea. No toca lógica.

## Lo que NO se trajo (sigue siendo refactor, fuera de prod-a-dev)

- **Migración `axios` → Lambda Invoke** (`LambdaClient`/`InvokeCommand`, `lib/servicioInterno.js`,
  `LambdaInvokePolicy` ×4 y params `LambdaCuentaNombreName`/`LambdaXpressName`/`LambdaR2PName`/`LambdaP2MName`).
  El código de negocio de prod queda intacto.

## Nota sobre el descifrado

El fix hace que la lambda **use la KMS `mrk-fab...` y el EFS compartido correctos**. Si tras redesplegar
persiste `InvalidCiphertextException`, el siguiente sospechoso es el **parseo del sobre `IV.ciphertext`** en
`lib/llave.js` / la forma en que se cifró el `peticion` de la prueba — eso ya sería tema de datos de prueba,
no de despliegue.

## Pendiente

- Redesplegar en dev (lo hace el usuario en la máquina con VPN) y confirmar que descifra.

## Commits (`prod-a-dev`)

| Commit | Descripción |
|--------|-------------|
| `b55a6e4` | VPCe perfil `[dev]` → `vpce-03ecbc47b37cc7965` |
| `820f6f6` | Reuso KMS/EFS compartidos dev (`UseSharedLlavesEfs` + samconfig) |

Pusheados a `origin/prod-a-dev`.
