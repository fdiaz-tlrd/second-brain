# prod_adactado_a_dev — memoria del agente

Documentación **de lo que vayamos haciendo** en este tema. Se actualiza a medida que avanzamos.

## DEFINICIÓN (regla fija — no reinterpretar)

**`prod_adactado_a_dev` es la versión de PRODUCCIÓN que despliega y corre en el ambiente de DESARROLLO. Eso es todo.**

- El nombre = «producción **adaptado a** dev».
- **NO** es "para pruebas". El propósito de este folder **no** es testear ni comparar; no mezclar con
  `Postman/comparar-prod-vs-dev` ni con ningún otro objetivo. Si en el futuro se usa para un set de
  pruebas, eso vive **en otra carpeta**, no cambia la definición de esta.

### Qué se garantiza y qué no

- **Lógica de negocio = producción, intacta.** Verificable con `git diff` contra `origin/main`.
  El código de las lambdas que quedan **no se toca**.
- **NO es copia byte-por-byte de producción**, y no debe serlo. Las únicas desviaciones permitidas son
  para que **despliegue/corra en dev** sin romper (SAM, recursos del ambiente):
  - Valores de **entorno/config**: KMS, VPC/VPCe, subnets, security groups, EFS/access point,
    stack/bucket/ARNs del ambiente dev.
  - **Poda** de componentes que no interesan (para no arrastrar todo el universo productivo).
  - Correcciones mínimas que **bloquean el deploy** (ej. un error de sintaxis que hace fallar `sam`).
- **Prohibido:** cambios de **lógica/comportamiento**, refactors (ej. `axios`→Lambda Invoke), mejoras,
  "modernizar" producción. Eso jamás entra a `prod-a-dev`.

### Rama

Cada repo clonado usa la rama **`prod-a-dev`** (nombre corto, genérico, reutilizable entre repos).

## Hecho hasta ahora

| Fecha | Acción |
|-------|--------|
| 2026-07-11 | Creada carpeta vacía `c:\Users\Lenovo\GitHub\prod_adactado_a_dev` (raíz de GitHub). |
| 2026-07-11 | Creada esta carpeta de documentación `second-brain/prod_adactado_a_dev/`. |
| 2026-07-11 | Clonado `https://github.com/Telered-Autopista/tld-matriz` en `prod_adactado_a_dev/tld-matriz`. |
| 2026-07-11 | Creada rama **`prod-a-dev`** desde `main` (nombre corto, genérico, sin referencia a `tld-matriz`). |
| 2026-07-11 | Poda de `tld-matriz` en `prod-a-dev` (9 lambdas + events + template/samconfig/launch). Ver [`01-poda-tld-matriz.md`](./01-poda-tld-matriz.md). |
| 2026-07-11 | Clonado `tld-validador-api` + rama `prod-a-dev`; revisión (dev = refactor invoke, no solo config). Ver [`02-tld-validador-api.md`](./02-tld-validador-api.md). |
| 2026-07-11 | `tld-validador-api`: único ajuste de config aplicado — VPCe del perfil `[dev]` → `vpce-03ecbc47b37cc7965` (el resto del refactor invoke/EFS/KMS **no** entra). `sam validate` OK. |
| 2026-07-11 | Clonado `tld-api-cuenta-nombre` (VCN) + rama `prod-a-dev` desde `master`; sin poda ni cambios (prod ya trae config dev en `[dev]`). Pusheado. Ver [`03-tld-api-cuenta-nombre.md`](./03-tld-api-cuenta-nombre.md). |
| 2026-07-11 | Documentado despliegue VCN prod-a-dev con `second-brain/despliegue/deploy.ps1` (Verdaccio + `tld-telered-lib`). Ver [`04-despliegue-vcn-deploy.ps1.md`](./04-despliegue-vcn-deploy.ps1.md). |

## Rama de trabajo

- **`prod-a-dev`** — nombre corto y genérico, pensado para **reutilizarse en otros repos**. No hace referencia a `tld-matriz`.

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [01-poda-tld-matriz.md](./01-poda-tld-matriz.md) | Poda aplicada: qué se quitó/quedó, verificación, hallazgo `sam validate` preexistente |
| [02-tld-validador-api.md](./02-tld-validador-api.md) | Clon + rama + ajuste VPCe `[dev]`; refactor invoke excluido |
| [03-tld-api-cuenta-nombre.md](./03-tld-api-cuenta-nombre.md) | VCN: clon + rama; sin poda ni cambios (config dev ya en prod); refactor proxy excluido |
| [04-despliegue-vcn-deploy.ps1.md](./04-despliegue-vcn-deploy.ps1.md) | Desplegar VCN prod-a-dev con `deploy.ps1`, Verdaccio y `tld-telered-lib` |

## Pendiente

- (nada abierto por ahora)

### Resuelto

- [x] `tld-matriz`: error de indentación `AuthorizerResultTtlInSeconds` corregido en `prod-a-dev`; poda commiteada y subida al remoto.
- [x] `tld-validador-api`: commit `b55a6e4`, pusheado a `origin/prod-a-dev`.
- [x] `tld-api-cuenta-nombre`: rama `prod-a-dev` pusheada (idéntica a `master`; config dev ya en prod).
