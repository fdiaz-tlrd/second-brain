# 04 — Desplegar VCN (`prod-a-dev`) con `deploy.ps1`

Cómo desplegar **`tld-api-cuenta-nombre`** en rama **`prod-a-dev`** usando el script
`second-brain/despliegue/deploy.ps1` en la máquina con VPN (usuarios `pbmadesarrollo` o
`pbmaplataforma`).

## Script

| Item | Valor |
|------|-------|
| Ruta en este workspace | `second-brain/despliegue/deploy.ps1` |
| Origen | Copia de `refactoria/Deploy/deploy.ps1` |

## Qué hace el script con `tld-telered-lib` (Verdaccio)

En `modo` **`full`** o **`build`**, el script:

1. Levanta **Verdaccio** en `localhost:4873` (`Ensure-VerdaccioRunning`).
2. Recorre cada carpeta **`nodejs`** del repositorio.
3. Si la ruta contiene **`tld-api-cuenta-nombre`**, ejecuta:

   ```powershell
   npm install @telered/tld-telered-lib --registry=http://localhost:4873
   ```

4. Luego, en esa misma carpeta: `npm i --production`.

Para VCN prod-a-dev, la carpeta relevante es **`lambdas\layer\nodejs`**:

- Declara `"@telered/tld-telered-lib": "^1.0.0"` en `package.json`.
- El código la usa en `lambdas/cuenta-nombre/lib/validador.js`:
  `require('@telered/tld-telered-lib/tld-util-http')`.

El `package.json` en la **raíz** del repo (`tld-telered-lib` sin scope) **no** lo procesa el script;
solo entra en carpetas `nodejs`. Lo que importa en runtime es el layer.

**`modo deploy` solo** no ejecuta la fase npm/Verdaccio. Hace falta haber corrido antes `full` o
`build`, o usar `modo full` de una vez.

## Ruta del repo en el servidor (importante)

`deploy.ps1` **no** usa la carpeta `prod_adactado_a_dev\` del Lenovo.

En el servidor de despliegue resuelve:

```
{RutaRepo} = {RaizGit}\{repositorio}
```

| Usuario Windows | Raíz Git |
|-----------------|----------|
| `pbmadesarrollo` | `C:\Users\pbmadesarrollo\Documents\GitHub` |
| `pbmaplataforma` | `C:\Users\pbmaplataforma\Desktop\GitHub` |

Con `-repositorio tld-api-cuenta-nombre` el trabajo ocurre en:

`C:\Users\...\GitHub\tld-api-cuenta-nombre`

El script es **remote-first**: clona o resetea desde **`origin`** a la rama indicada. Para prod-a-dev:

- **`-repositorio`** `tld-api-cuenta-nombre`
- **`-ramaGit`** `prod-a-dev` (ya en `origin`)

La carpeta `prod_adactado_a_dev` en el Lenovo es organización local; en el servidor el clone va
directo bajo la raíz GitHub con el nombre del repo.

## Invocación

```powershell
cd C:\Users\pbmadesarrollo\Documents\GitHub\second-brain\despliegue
# (ajustar ruta si el script está en otro sitio en el servidor)

.\deploy.ps1 `
  -repositorio tld-api-cuenta-nombre `
  -ramaGit prod-a-dev `
  -ambiente dev `
  -modo full `
  -esReversa no `
  -hashCommit <hash_HEAD_de_prod-a-dev>
```

- **`-ambiente dev`** → despliega solo el perfil **`[dev]`** de `samconfig.toml` (VPCe, `UrlCaTelered`, etc.).
- **`-hashCommit`** debe coincidir con **HEAD** del repo tras el sync Git del script. Obtenerlo en el
  servidor después de `git fetch` / checkout a `prod-a-dev`, o desde el remoto antes de lanzar el deploy.

## Requisitos para que no falle

| Requisito | Motivo |
|-----------|--------|
| Verdaccio en `localhost:4873` con `@telered/tld-telered-lib` publicado | El script instala la lib solo desde ese registry |
| `modo full` o `build` (al menos una vez antes del deploy) | Instala dependencias del layer |
| Acceso SSH a `git@github.com:Telered-Autopista/tld-api-cuenta-nombre.git` | Clone/fetch del script usa SSH |
| Usuario Windows autorizado (`pbmadesarrollo` o `pbmaplataforma`) | Otros usuarios el script los rechaza |
| `hashCommit` = HEAD real tras sincronizar `origin/prod-a-dev` | Validación obligatoria del script |
| VPN / red dev | Llamadas AWS y recursos del ambiente dev |

## Relación con el doc del repo

Estado de la rama `prod-a-dev` (sin poda, config dev en prod, refactor excluido):
[`03-tld-api-cuenta-nombre.md`](./03-tld-api-cuenta-nombre.md).
