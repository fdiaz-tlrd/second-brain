# prod_adactado_a_dev — memoria del agente

Documentación **de lo que vayamos haciendo** en este tema. Se actualiza a medida que avanzamos.

**Retomar tras pausa:** empezar por [`00-estado-y-retomo.md`](./00-estado-y-retomo.md).

## DEFINICIÓN (regla fija — no reinterpretar)

**`prod_adactado_a_dev` es la versión de PRODUCCIÓN que despliega y corre en el ambiente de DESARROLLO. Eso es todo.**

- El nombre = «producción **adaptado a** dev».
- **NO** es "para pruebas". El propósito de este folder **no** es testear ni comparar; no mezclar con
  `Postman/comparar-prod-vs-dev` ni con ningún otro objetivo. Si en el futuro se usa para un set de
  pruebas, eso vive **en otra carpeta**, no cambia la definición de esta.

### Qué se garantiza y qué no

- **Lógica de negocio = producción, intacta.** Verificable con `git diff` contra `origin/main` (o `master` en VCN).
  El código de las lambdas que quedan **no se toca**, salvo desviaciones documentadas abajo.
- **NO es copia byte-por-byte de producción**, y no debe serlo. Las únicas desviaciones permitidas son
  para que **despliegue/corra en dev** sin romper (SAM, recursos del ambiente):
  - Valores de **entorno/config**: KMS, VPC/VPCe, subnets, security groups, EFS/access point,
    stack/bucket/ARNs del ambiente dev.
  - **Poda** de componentes que no interesan (para no arrastrar todo el universo productivo).
  - Correcciones mínimas que **bloquean el deploy** (ej. un error de sintaxis que hace fallar `sam`).
  - **Infra por ambiente** cuando el template de prod no puede reusar recursos compartidos de dev
    (caso validador KMS/EFS — ver 02).
- **Prohibido:** cambios de **lógica/comportamiento**, refactors (ej. `axios`→Lambda Invoke), mejoras,
  "modernizar" producción. Eso jamás entra a `prod-a-dev`.

### Desviaciones documentadas (excepciones a «prod puro»)

| Repo | Excepción | Doc |
|------|-----------|-----|
| `tld-matriz` | Autorizador `tld-auth-autorizador` stubbeado (always-Allow) | [05](./05-tld-matriz-autorizador-stub.md) |
| `tld-validador-api` | Template: selección KMS/EFS compartidos en `DeployEnvironment=dev` | [02](./02-tld-validador-api.md) |
| `tld-matriz` | Fix `AuthorizerResultTtlInSeconds` (bloqueaba `sam validate`) | [01](./01-poda-tld-matriz.md) |

### Rama

Cada repo clonado usa la rama **`prod-a-dev`** (nombre corto, genérico, reutilizable entre repos).

## Hecho hasta ahora

| Fecha | Acción |
|-------|--------|
| 2026-07-11 | Creada carpeta `prod_adactado_a_dev` y esta documentación. |
| 2026-07-11 | `tld-matriz`: clon + rama `prod-a-dev` + poda + fix `AuthorizerResultTtlInSeconds`. Commit `cff92e5`. Ver [01](./01-poda-tld-matriz.md). |
| 2026-07-11 | `tld-validador-api`: clon + rama; VPCe `[dev]` (`b55a6e4`). Ver [02](./02-tld-validador-api.md). |
| 2026-07-11 | `tld-validador-api`: fix KMS/EFS compartidos dev (`820f6f6`) — corrige `InvalidCiphertextException` / `mrk-fab... NO EXISTE`. |
| 2026-07-11 | `tld-api-cuenta-nombre`: clon + rama `prod-a-dev` = `master` sin cambios. Pusheado. Ver [03](./03-tld-api-cuenta-nombre.md). |
| 2026-07-11 | Copiados `deploy.ps1` / `deployNewVersion.ps1` a `second-brain/despliegue/`; doc VCN. Ver [04](./04-despliegue-vcn-deploy.ps1.md). |
| 2026-07-11 | Fix sintaxis `deploy.ps1` (ParserError PS 5.1) + BUILD-MARKER `v2026-07-11-B`. |
| 2026-07-11 | `tld-matriz`: stub autorizador always-Allow (`e22171a`) — crash urllib3 v2 / no validar tokens. Ver [05](./05-tld-matriz-autorizador-stub.md). |
| 2026-07-12 | Creado [`00-estado-y-retomo.md`](./00-estado-y-retomo.md) — handoff al cambiar de tema. |
| 2026-07-12 | Los 3 repos: marca **`PROD-ADAPTADO-A-DEV`** en `Description:` raíz + parámetro de ambiente del `template.yaml` (identificar pila en CloudFormation). Commits `d763b6b`, `d3e3959`, `497ecc4`. Ver [00](./00-estado-y-retomo.md#marca-de-identificación-en-cloudformation-prod-adaptado-a-dev). |

## Estado de repos (`origin/prod-a-dev`)

| Repo | HEAD | Pusheado |
|------|------|----------|
| `tld-matriz` | `d763b6b` | Sí |
| `tld-validador-api` | `d3e3959` | Sí |
| `tld-api-cuenta-nombre` | `497ecc4` | Sí |

Los tres templates llevan el marcador **`PROD-ADAPTADO-A-DEV`** en el `Description:` raíz y en el del
parámetro de ambiente (ver [`00-estado-y-retomo.md`](./00-estado-y-retomo.md)).

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [00-estado-y-retomo.md](./00-estado-y-retomo.md) | **Entrada al retomar** — estado, pendientes, mapa, errores vistos |
| [01-poda-tld-matriz.md](./01-poda-tld-matriz.md) | Poda: qué se quitó/quedó, verificación, `AuthorizerResultTtlInSeconds` |
| [02-tld-validador-api.md](./02-tld-validador-api.md) | VPCe + KMS/EFS dev; refactor invoke excluido |
| [03-tld-api-cuenta-nombre.md](./03-tld-api-cuenta-nombre.md) | VCN sin cambios; refactor proxy excluido |
| [04-despliegue-vcn-deploy.ps1.md](./04-despliegue-vcn-deploy.ps1.md) | Desplegar VCN con `deploy.ps1`, Verdaccio, fixes script |
| [05-tld-matriz-autorizador-stub.md](./05-tld-matriz-autorizador-stub.md) | Stub autorizador; urllib3 crash; revertir |

## Pendiente

- Redesplegar en dev y confirmar: validador descifra, matriz autorizador no crashea, VCN con `deploy.ps1`.
- Tras redesplegar, en CloudFormation verificar **`PROD-ADAPTADO-A-DEV`** en Stack info de cada pila.
- HEADs actuales: matriz `d763b6b`, validador `d3e3959`, VCN `497ecc4`.
- Ver [`00-estado-y-retomo.md`](./00-estado-y-retomo.md) para detalle.
