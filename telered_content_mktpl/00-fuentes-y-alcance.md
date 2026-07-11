# Fuentes y alcance

## Repo

| Campo | Valor |
|-------|-------|
| Ruta local | `c:\Users\Lenovo\GitHub\telered_content_mktpl` |
| Propósito | Contenido marketplace Telered: docs técnicas OpenAPI, HTML comercial, imágenes, scripts BD |
| Rama de trabajo | **`feature/Refactory`** (creada desde `sandbox`, jul-2026) |
| Rama base | `sandbox` → `66e206f` (tracking `origin/sandbox`) |
| Otras ramas vistas | `main`, `feature/CCL-8379` |

## Estructura relevante

| Carpeta / archivo | Rol |
|-------------------|-----|
| `tech_doc/api_*.json` | Especificaciones OpenAPI 3.0 (Redoc/Swagger) — **fuente de verdad técnica**. Tras refactor solo quedan `api_4`, `api_6`, `api_7` |
| `tech_doc_archived/` | **Nuevo (feature/Refactory):** archivos OpenAPI archivados fuera de alcance (`api_1`, `api_2`, `api_3`, `api_5`) |
| `comr_doc/*_index.html` | Presentación comercial por API (`4_index.html` ↔ api 4, etc.) |
| `mkt.api.images/` | Diagramas SVG referenciados desde los JSON |
| `mkt.api.script/` | CSS/JS para render HTML (iframeResizer) |
| `BD_scripts/` | SQL ambientes marketplace |

## Archivos en estudio (esta sesión)

| Archivo | Título OpenAPI | Versión | Producto TLD |
|---------|----------------|---------|--------------|
| `api_4.json` | MARKETPLACE TELERED - API PARA VALIDACIÓN CUENTA NOMBRE | 1.0.0 | VCN → `tld-api-cuenta-nombre` |
| `api_6.json` | MARKETPLACE TELERED - API PARA ALIAS | 1.0.0 | P2P → `tld-api-alias` |
| `api_7.json` | MARKETPLACE TELERED - API PARA REQUEST TO PAY (R2P) | 1.13.0 | R2P → `tld-api-r2p` |

## Servidores documentados

| URL | Ambiente | APIs |
|-----|----------|------|
| `https://apigatesb.telered.com.pa` | SandBox | 4, 6, 7 |
| `https://apigateqa.telered.com.pa` | QA | 4, 6, 7 |
| `https://apigate.telered.com.pa` | Producción | solo api_7 |

## Fuera de alcance (por ahora)

- `api_1.json`, `api_2.json`, `api_3.json`, `api_5.json` → **movidos a `tech_doc_archived/`** (feature/Refactory)
- `api_fd.json` → **borrado** (era archivo de pruebas del usuario)
- `comr_doc/` (render HTML)

> **Nota:** ya NO aplica «solo lectura» en `tech_doc`. En `feature/Refactory` empezamos a
> modificar los JSON (arreglo `api_4.json`, archivado, borrado). Ver bitácora `07`.

## Nota técnica sobre los JSON

- Son OpenAPI con **mucho HTML embebido** en `tags[].description`.
- **Endpoint único:** el path real es **`POST /validador/validar`** para TODO. Las claves
  duplicadas con **espacios al final** (`/validador/validar `, `…  `) y `/0011` existen solo porque
  OpenAPI exige claves únicas; el espacio final no se renderiza. Detalle en `01-transversal-autopista.md`.

## Por qué `api_4.json` estaba mal (causa raíz — CONFIRMADO · **RESUELTO** feature/Refactory)

> **RESUELTO (2026-07-11):** se escaparon los control chars dentro de strings; `api_4.json` ya
> parsea con `JSON.parse` estricto. Contenido preservado (solo se escapó whitespace). Detalle y
> método de verificación en `06-hallazgo-api_4-json-invalido.md`.

**`api_4.json` era JSON inválido según la especificación**: una string (la `description` HTML de un
tag, zona de "Anexos / Validación…", **línea ~60**) contiene **caracteres de control crudos sin
escapar** dentro del literal. JSON prohíbe CR/LF/TAB literales dentro de strings — deben ir como
`\r`, `\n`, `\t`.

Conteo dentro de strings (working tree): **TAB(9)=41, LF(10)=30, CR(13)=30**.

### Cuándo se rompió (git)

| Estado | Commit | Autor / fecha | Nota |
|--------|--------|---------------|------|
| ✅ Válido | `08fedbd` y anteriores | — | `JSON.parse` OK |
| ❌ **Se rompió aquí** | `8574246` | orlando1484 · 2025-07-14 · "Se actualiza la documentación de Cuenta Nombre y Xpress" | Introduce LF crudo en string (línea 60) |
| ❌ Sigue roto | `d550f6e`, `55c014b` (HEAD) | "Update api_4.json" | No se corrigió |

`api_6.json` y `api_7.json` **sí parsean** — el defecto es exclusivo de `api_4.json`.

### Factor local que agrava (no es la causa)

`git config core.autocrlf = true` en este repo. Al hacer checkout, git convierte LF→CRLF **también
dentro de la string**, sumando CR crudos. Por eso el working tree tiene aún más caracteres de control
que el blob commiteado. La causa de fondo ya está en el commit; autocrlf solo añade CRs encima.

### Cómo se corrigió (feature/Refactory)

- Fuente del arreglo: **blob de git `HEAD`** (LF, sin los CR de autocrlf) → escapar control chars
  dentro de strings a `\n` / `\t`.
- **71** control chars escapados (41 TAB, 30 LF); 0 CR (confirma que los 30 CR del working tree eran
  de autocrlf, no del repo).
- Verificaciones antes de escribir: (1) `JSON.parse` OK; (2) 0 control chars crudos restantes;
  (3) **roundtrip** — des-escapar solo lo agregado devuelve el blob original → único cambio = escapar
  whitespace, sin tocar contenido.
- Resultado: `openapi, info, servers, security, tags(8), paths(3), components` — íntegro.

**Documento dedicado (exhaustivo):** [06-hallazgo-api_4-json-invalido.md](./06-hallazgo-api_4-json-invalido.md)
