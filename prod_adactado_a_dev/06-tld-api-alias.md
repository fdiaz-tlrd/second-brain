# 06 — `tld-api-alias` (P2P) en `prod-a-dev`

Clon de producción en `prod_adactado_a_dev/tld-api-alias`, rama `prod-a-dev` (desde `main`).

**Producto TLD:** P2P = `tld-api-alias` (repo autónomo; no confundir con `tld-api-p2m`).

## Estado

| Campo | Valor |
|-------|-------|
| **Clonado** | 2026-07-13 |
| **Rama base** | `main` (`f4c342f` — merge NodeJS24) |
| **Rama trabajo** | `prod-a-dev` |
| **HEAD `origin/prod-a-dev`** | `4bc331d` |
| **Pusheado** | Sí |

- **Sin poda:** lambdas `alias`, `inactividad` + `layer` (igual que prod).
- **Sin cambios de código ni `samconfig.toml`.** Lógica = producción.
- **Único cambio propio (`4bc331d`):** marca `PROD-ADAPTADO-A-DEV` en `Description:` raíz y del parámetro
  `DeployEnvironment` del `template.yaml` (metadata CloudFormation). No toca lógica ni recursos.

## Verificación de despliegue (2026-07-13)

| Check | Resultado |
|-------|-----------|
| `sam validate --region us-east-1` | OK |
| `sam validate --config-env dev --region us-east-1` | OK |
| `git diff main..prod-a-dev` | Solo metadata `template.yaml` |
| Stub autorizador (como matriz) | **No aplica** — P2P no lleva autorizador Cognito propio |
| Fix KMS/EFS en template (como validador) | **No aplica** — `EFSResourceID` ya tiene default dev (`fs-0e4079df1cdb063b3`, mismo EFS compartido que VCN/validador) |
| Verdaccio / `tld-telered-lib` | **No aplica** — el layer solo usa `@aws-sdk/*`, `axios`, `moment` |

**Conclusión:** apto para desplegar en dev con el mismo flujo que prod (`sam deploy --config-env dev`), sin las desviaciones de matriz ni validador. Menos fricción que VCN/matriz en el setup de `prod-a-dev`.

### Parámetros KMS/EFS en perfil `[dev]`

El `samconfig.toml` de `main` **no** incluye `AccessPointResourceARN` ni `KMSTeleredARN` en `[dev]` (igual que la rama `origin/dev`). El template exige esos parámetros sin default (salvo `EFSResourceID`).

En **update** de la pila `tld-alias-api` existente en dev, CloudFormation reutiliza valores previos. En **create** o cambio que los exija, hay que pasarlos (mismos recursos compartidos que VCN prod-a-dev):

| Parámetro | Valor dev (cuenta 729330417555) |
|-----------|----------------------------------|
| `AccessPointResourceARN` | `arn:aws:elasticfilesystem:us-east-1:729330417555:access-point/fsap-069f5ed286aca3a98` |
| `KMSTeleredARN` | `arn:aws:kms:us-east-1:729330417555:key/mrk-fab483954956476787608d9e5eee2c97` |

`KMSTeleredAliasARN` está declarado en el template pero **no se referencia** en recursos; los overrides de sandbox/qa usan `KMSTeleredAliasID` (nombre distinto, no declarado en template) — defecto heredado de prod, ver `REVISION_ESTATICA_360.md` en el repo.

## Arquitectura prod (relevante para Newman / comparar códigos)

| Aspecto | Prod (`main` / `prod-a-dev`) |
|---------|------------------------------|
| Validador / cifrado hacia VCN | HTTP `axios` → `END_POINT_API_VALIDADOR` (= `ApiCuentaNombre`, VCN en dev) |
| Plan / suscripción | Lambda Invoke → `tld-matriz-control-plan` |
| Tablas Dynamo | `tld-alias-cuenta` (propia) + lectura/escritura tablas `tld-validador-*` |
| Runtime | `nodejs24.x` |
| Endpoint API | `POST /procesar` |

No usa `tld-validador-proxy` ni invoke al validador — patrón distinto al dev refactor (`feature/ARQ-225_Refactory`).

## Revisión contra dev refactor (`feature/ARQ-225_Refactory`)

`git diff origin/feature/ARQ-225_Refactory...origin/main` → **1 línea** en `template.yaml`. A diferencia de VCN, el refactor ARQ-225 **casi no tocó** alias; `prod-a-dev` ≈ prod ≈ dev refactor en código.

Lo que **sí** puede divergir en dev normal vs prod-a-dev son los **datos** (Dynamo, planes, canales) y la **versión desplegada** en AWS, no el repo en sí.

## Defectos conocidos en prod (no corregidos en `prod-a-dev`)

Documentados en `tld-api-alias/REVISION_ESTATICA_360.md` (análisis estático previo en el repo). Los más relevantes para contexto:

| ID | Hallazgo | Impacto en deploy dev |
|----|----------|------------------------|
| P1.1 | `Condition1` en lugar de `Condition` en lambdas (`ProcessAliasEndPoint`, `InactivarAlias`) | `sam validate` **no** lo rechaza; condición de región no se aplica como en prod |
| P1.4–P1.6 | Bugs lógicos en `app.js` / `notificar.js` / `validaciones.js` | Comportamiento en runtime prod; fuera del alcance `prod-a-dev` |
| P2.11 | `KMSTeleredAliasID` en samconfig vs `KMSTeleredAliasARN` en template | Puede afectar deploy en perfiles sandbox/qa; perfil `[dev]` no lo usa |

**Regla `prod-a-dev`:** no parchear lógica prod salvo bloqueo de deploy. Estos ítems se documentan para la revisión **P2P en producción** (Newman / `codigoError`), no se arreglan en esta rama.

## Commits (`prod-a-dev`)

| Commit | Descripción |
|--------|-------------|
| `4bc331d` | Marca `PROD-ADAPTADO-A-DEV` en `Description:` raíz + parámetro `DeployEnvironment` |

Hash completo: `4bc331d32a7f0075e204bd9d5a9d2ca4d0dad8af`.

## Despliegue sugerido (dev)

**Orden:** después de `tld-validador-api` y `tld-api-cuenta-nombre` prod-a-dev (P2P llama a VCN y a `tld-matriz-control-plan`).

```powershell
cd C:\Users\...\GitHub\tld-api-alias
git fetch origin
git checkout prod-a-dev
git reset --hard origin/prod-a-dev
sam build
sam deploy --config-env dev
```

No requiere `deploy.ps1` / Verdaccio (a diferencia de VCN). Si el stack pide KMS/EFS, añadir a `parameter_overrides` o responder en el prompt con los valores de la tabla arriba.

Tras deploy, verificar en CloudFormation Stack info la descripción con **`PROD-ADAPTADO-A-DEV`**.

## Siguiente paso (hilo usuario, 2026-07-13)

Antes de revisar VCN en la versión dev normal: **revisar P2P en producción** — comparación escenario a escenario de `codigoError` (payload JSON), mismo método que VCN en [`Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md). Colección: suite **P2P** en Newman `prod` / `MATRIZ`.
