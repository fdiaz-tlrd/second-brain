# prod_adactado_a_dev — estado y retomo

**Punto de entrada del agente** cuando el usuario retome este hilo tras una pausa o cambio de tema.

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-07-12 |
| **Estado** | **PAUSADO** — 3 repos listos en `origin/prod-a-dev`; pendiente confirmar en dev (VPN) tras últimos fixes |
| **Rama de trabajo** | `prod-a-dev` (en cada repo clonado) |
| **Carpeta local** | `c:\Users\Lenovo\GitHub\prod_adactado_a_dev\` |
| **Repo docs** | `second-brain` rama `main` → `prod_adactado_a_dev/` |

---

## Definición (no reinterpretar)

Ver [`README.md`](./README.md) — regla fija:

**`prod_adactado_a_dev` = versión de PRODUCCIÓN que despliega y corre en DESARROLLO.**

- Lógica de negocio intacta (verificable con `git diff` contra `main`/`master`).
- Solo desviaciones para **desplegar/correr en dev** (config, poda, fixes que bloquean deploy).
- **Prohibido:** refactors (axios→invoke, proxy validador, etc.).
- **NO confundir** con `Postman/comparar-prod-vs-dev` ni con la rama `feature/ARQ-225_Refactory`.

---

## Cómo retomar (orden)

1. Leer este archivo.
2. Leer [`README.md`](./README.md) (definición + tabla de documentos).
3. Abrir el doc del repo que toque (01–05).
4. Si hay error de despliegue/runtime: revisar `second-brain/notas-sueltas/error.md` y
   `errorDespligue.md` (el usuario los commitea desde la máquina VPN).
5. **Lenovo:** no desplegar ni correr Newman; solo revisar código/docs. Deploy lo hace el usuario en
   servidor con VPN (`pbmadesarrollo` / `pbmaplataforma`).

---

## Repos en `prod_adactado_a_dev` (estado al pausar)

| Repo | Rama base | `origin/prod-a-dev` HEAD | Commits propios de `prod-a-dev` | Cambios vs prod |
|------|-----------|--------------------------|----------------------------------|-----------------|
| `tld-matriz` | `main` | `d763b6b` | poda + stub autorizador + marca CFN | Poda + fix `AuthorizerResultTtlInSeconds` + **stub autorizador** + Description `PROD-ADAPTADO-A-DEV` |
| `tld-validador-api` | `main` | `d3e3959` | VPCe + KMS/EFS dev + marca CFN | VPCe `[dev]` + **reuso KMS/EFS dev** + Description `PROD-ADAPTADO-A-DEV` |
| `tld-api-cuenta-nombre` | `master` | `497ecc4` | `497ecc4` (marca CFN) | Solo Description `PROD-ADAPTADO-A-DEV` (metadata); resto = `master` |

Todos **sincronizados** con remoto (`0 0` ahead/behind al 2026-07-12).

---

## Marca de identificación en CloudFormation (`PROD-ADAPTADO-A-DEV`)

Para reconocer en la consola de CloudFormation que una pila desplegada es esta versión, los tres
`template.yaml` llevan el marcador **`PROD-ADAPTADO-A-DEV`** en dos lugares:

1. **`Description:` de nivel raíz del template** → se ve en **Stack info / Overview** y como columna en
   la lista de pilas (lo visible de un vistazo en una pila desplegada).
2. **`Description:` del parámetro de ambiente** (`DeployEnvironment` en validador/VCN; `Env` en matriz) →
   solo visible abriendo la pestaña **Template** o en el formulario de create/update. **NO** aparece en la
   pestaña **Parameters** de la pila desplegada (esa solo muestra Key + Value).

`tld-matriz` no tenía `Description:` raíz: se **agregó**.

**Importante:** es metadata; **requiere redesplegar** para que la marca aparezca en la pila.

## Desviaciones explícitas (NO son prod puro)

| Repo | Qué | Por qué | Doc |
|------|-----|---------|-----|
| `tld-matriz` | `tld-auth-autorizador` → stub always-Allow | Crash urllib3 v2 vs python3.8; no interesa validar tokens Cognito en esta versión | [`05-tld-matriz-autorizador-stub.md`](./05-tld-matriz-autorizador-stub.md) |
| `tld-validador-api` | Template: `UseSharedLlavesEfs` + params `AccessPointId`/`EFSResourceId` | Prod crea KMS/EFS propios en us-east-1; dev necesita reusar `mrk-fab...` y EFS compartido | [`02-tld-validador-api.md`](./02-tld-validador-api.md) |
| `tld-matriz` | Fix indentación `AuthorizerResultTtlInSeconds` | Bloqueaba `sam validate` (defecto heredado de prod) | [`01-poda-tld-matriz.md`](./01-poda-tld-matriz.md) |

Todo lo demás en los 3 repos = **código de producción** (con poda en matriz).

---

## Orden de despliegue sugerido (dev)

1. **`tld-validador-api`** — provee KMS/EFS compartidos y API validador que usan VCN y matriz.
2. **`tld-api-cuenta-nombre`** — con [`deploy.ps1`](../despliegue/deploy.ps1) (Verdaccio + `tld-telered-lib`).
3. **`tld-matriz`** — API matriz + autorizador stubbeado.

VCN en prod usa HTTP al validador (no invoke); el validador prod-a-dev debe estar desplegado y descifrando.

---

## Pendiente al retomar

| Item | Quién | Notas |
|------|-------|-------|
| Redesplegar `tld-validador-api` | Usuario (VPN) | HEAD `d3e3959` (incluye KMS/EFS dev `820f6f6` + marca CFN). Confirmar descifrado con `mrk-fab...` |
| Redesplegar `tld-matriz` | Usuario (VPN) | HEAD `d763b6b` (incluye stub autorizador `e22171a` + marca CFN). Confirmar que no crashea al import |
| Desplegar VCN `prod-a-dev` | Usuario (VPN) | [`04-despliegue-vcn-deploy.ps1.md`](./04-despliegue-vcn-deploy.ps1.md); `hashCommit 497ecc4bfb677857d5d29ab6960c1cf3b8d4d050` |
| Verificar marca en CloudFormation | Usuario (VPN) | Tras redesplegar, en **Stack info** debe verse `PROD-ADAPTADO-A-DEV` en el Description de la pila |
| Si persiste `InvalidCiphertextException` tras redeploy validador | Investigar | Posible parseo `IV.ciphertext` en `lib/llave.js` o datos de prueba — ver 02 |
| Corregir `AuthorizerResultTtlInSeconds` en `tld-matriz` **main** (repo real) | Opcional / usuario | Mencionado en 01; no ejecutado en repo productivo |

---

## Mapa de documentación

| Archivo | Contenido |
|---------|-----------|
| [`README.md`](./README.md) | Definición fija, cronología, índice |
| [`01-poda-tld-matriz.md`](./01-poda-tld-matriz.md) | Poda: qué se quitó/quedó, BOM, `AuthorizerResultTtlInSeconds` |
| [`02-tld-validador-api.md`](./02-tld-validador-api.md) | VPCe + KMS/EFS compartidos; refactor invoke excluido; error `mrk-fab...` |
| [`03-tld-api-cuenta-nombre.md`](./03-tld-api-cuenta-nombre.md) | VCN sin cambios; refactor proxy excluido |
| [`04-despliegue-vcn-deploy.ps1.md`](./04-despliegue-vcn-deploy.ps1.md) | `deploy.ps1`, Verdaccio, rutas servidor, fixes sintaxis PS |
| [`05-tld-matriz-autorizador-stub.md`](./05-tld-matriz-autorizador-stub.md) | Stub always-Allow; urllib3 crash; cómo revertir |

**Scripts de despliegue (copia de referencia):** `second-brain/despliegue/deploy.ps1` y `deployNewVersion.ps1`.

---

## Errores ya vistos (referencia rápida)

| Síntoma | Repo | Causa documentada | Fix aplicado |
|---------|------|-------------------|--------------|
| `urllib3 v2 only supports OpenSSL 1.1.1+` | `tld-matriz` / `tld-auth-autorizador` | `boto3` sin pin en python3.8 | Stub sin deps (05) |
| `LLave mrk-fab... NO EXISTE` / `InvalidCiphertextException` | `tld-validador-api` | Template prod creaba KMS/EFS propios | `820f6f6` reuso KMS/EFS dev (02) |
| `ParserError` al ejecutar `deploy.ps1` | despliegue | Unicode em-dash y `;` en strings PS 5.1 | Fix en `second-brain/despliegue/deploy.ps1` + BUILD-MARKER `v2026-07-11-B` (04) |
| `sam validate` «AuthorizerResultTtlInSeconds should be a map» | `tld-matriz` | Indentación prod | Corregido en prod-a-dev (01) |

Logs del usuario: `second-brain/notas-sueltas/error.md`, `errorDespligue.md`.

---

## Qué NO está en prod_adactado_a_dev (aún)

- Otros repos TLD (P2P, P2M, R2P, etc.) — no clonados.
- `tld-matriz` repo **real** (`main`) — no modificado (solo clon en `prod_adactado_a_dev`).
- `prod/tld-api-cuenta-nombre-master` — fuera de alcance (snapshot prod real).
