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

## Estado de repos (`origin/prod-a-dev`)

| Repo | HEAD | Pusheado |
|------|------|----------|
| `tld-matriz` | `e22171a` | Sí |
| `tld-validador-api` | `820f6f6` | Sí |
| `tld-api-cuenta-nombre` | `f67a00a` (= `master`) | Sí |

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

- Redesplegar en dev y confirmar: validador descifra (`820f6f6`), matriz autorizador no crashea (`e22171a`), VCN con `deploy.ps1`.
- Ver [`00-estado-y-retomo.md`](./00-estado-y-retomo.md) para detalle.
