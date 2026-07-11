# Bitácora de estudio — `telered_content_mktpl`

Registro vivo de **todo lo hecho** en este hilo para poder armar el **informe exhaustivo** cuando
termine la fase de mejoras. El agente debe **añadir una entrada** cada vez que haya hallazgo,
decisión o cambio documentado.

**Pedido del usuario (jul-2026):** al cerrar las mejoras, entregar informe exhaustivo de todo lo realizado.

---

## Objetivo del trabajo

| Fase | Estado | Descripción |
|------|--------|-------------|
| **1. Estudio** | En curso | Leer `tech_doc/api_4.json`, `api_6.json`, `api_7.json`; documentar en `second-brain/telered_content_mktpl/` |
| **2. Mejoras** | Pendiente | Mejorar presentación **sin cambiar información** (JSON/HTML marketplace) |
| **3. Informe final** | Pendiente | Documento exhaustivo de hallazgos, decisiones y cambios |

---

## Alcance acordado

- Repo: `telered_content_mktpl`
- Archivos técnicos: solo `api_4.json` (VCN), `api_6.json` (P2P), `api_7.json` (R2P)
- `second-brain/telered_content_mktpl/` = memoria **para el agente**, no doc orientada al usuario final
- No modificar JSON fuente en fase de estudio (solo lectura)

---

## Entradas de bitácora

### 2026-07-11 — Inicio estudio + memoria agente

**Qué se hizo:**
- Creada carpeta `second-brain/telered_content_mktpl/`
- Estudiados los tres JSON OpenAPI; extraída estructura transversal y por API
- Creados: `README.md`, `00`–`05`, enlace en `second-brain/README.md`

**Hallazgos documentados:**
- Patrón transversal: auth OAuth, envelope cifrado, `metodo` en `peticion`
- VCN método `0001`; P2P `0002`–`0009`, `0022`–`0023`, `0010`; R2P `0011`–`0014`
- Mapas marketplace ↔ repos TLD (`05-mapas-repo-producto.md`)

**Archivos second-brain creados/actualizados:**
- `README.md`, `00-fuentes-y-alcance.md`, `01-transversal-autopista.md`
- `02-vcn-api_4.md`, `03-p2p-api_6.md`, `04-r2p-api_7.md`, `05-mapas-repo-producto.md`
- `second-brain/README.md` (entrada marketplace)

---

### 2026-07-11 — Endpoint único + truco espacio en paths OpenAPI

**Aclaración del usuario (confirmada):**
- En producción hay **un solo endpoint**: `POST /validador/validar`, todo cifrado
- Los múltiples `paths` en OpenAPI son obligación de claves únicas; solución del equipo: **espacios al final** del path (`/validador/validar `, `…  `) — al renderizar no se ven

**Documentado en:** `01-transversal-autopista.md` § «Endpoint único»

---

### 2026-07-11 — Hallazgo `api_4.json` JSON inválido

**Investigación:**
- `JSON.parse` falla en working tree (posición 21624, línea 60)
- Script Node sobre historial git: válido hasta `08fedbd`; roto desde `8574246` (orlando1484, 2025-07-14)
- `api_6.json` y `api_7.json` parsean OK
- `core.autocrlf=true` agrava en checkout Windows (CR extra dentro de strings)

**Documentado en:**
- `00-fuentes-y-alcance.md` § «Por qué api_4.json está mal»
- `06-hallazgo-api_4-json-invalido.md` (documento dedicado exhaustivo)
- `02-vcn-api_4.md` § «Integridad del archivo»
- `README.md` historial

---

### 2026-07-11 — Pedido documentar todo + informe futuro

**Qué se hizo:**
- Creado `06-hallazgo-api_4-json-invalido.md` (hallazgo dedicado)
- Creado `07-bitacora-estudio.md` (este archivo) para informe final
- Actualizado índice `README.md`

### 2026-07-11 — Rama de trabajo `feature/Refactory`

**Qué se hizo:**
- Repo `telered_content_mktpl`: checkout `origin/sandbox` → rama local `sandbox` (`66e206f`)
- Creada y activada **`feature/Refactory`** desde `sandbox`
- Antes estábamos en `feature/CCL-8379` (`fde7e7b`)

**Nota:** `feature/Refactory` publicada en remoto con `git push -u origin feature/Refactory` (mismo día).

---

### 2026-07-11 — Primer cambio en `telered_content_mktpl` (fase mejoras)

Rama: `feature/Refactory`.

**1. Archivado de OpenAPI fuera de alcance**
- `git mv` a nueva carpeta **`tech_doc_archived/`**: `api_1.json`, `api_2.json`, `api_3.json`, `api_5.json`.
- En `tech_doc/` quedan solo `api_4.json`, `api_6.json`, `api_7.json`.

**2. Borrado**
- `git rm tech_doc/api_fd.json` — era archivo de pruebas del usuario.

**3. Arreglo `api_4.json` (JSON válido)**
- Escapados **71** control chars dentro de strings (41 TAB, 30 LF; 0 CR).
- Fuente = blob git HEAD para evitar CR de autocrlf.
- 3 verificaciones OK (parse estricto, sin control chars crudos, roundtrip idéntico al original).
- Detalle completo: `06-hallazgo-api_4-json-invalido.md` § «Corrección aplicada».

**Archivos second-brain actualizados:**
- `00-fuentes-y-alcance.md` (estructura, fuera de alcance, causa raíz → resuelto)
- `06-hallazgo-api_4-json-invalido.md` (estado RESUELTO + método)
- `07-bitacora-estudio.md` (esta entrada)

**Estado git repo marketplace:** cambios staged (`api_4` modificado, `api_fd` borrado, 4 renombrados),
**sin commit aún** (a la espera de instrucción del usuario).

**Incidencia detectada y resuelta en esta sesión:**
- El `git add tech_doc/api_4.json` inicial **no se ejecutó**: iba en una línea PowerShell junto a un
  `node -e` mal escapado, y PowerShell aborta la línea completa al fallar el parseo. El fix estaba en
  disco (válido) pero el index seguía con el original roto. Se detectó al inspeccionar `git show :ruta`
  y luego se estageó bien. Blob del index ahora parsea OK.
- Se verificó que autocrlf **no** rompe el fix (LF y CRLF parsean, 0 control chars): **no** se cambia
  `.gitattributes`. Ver `06-…` § «Sobre .gitattributes».

**Regla de conducta nueva del usuario:** actuar como experto — si hay fix claro, hacerlo; si cambia
alcance/es destructivo, preguntar; prohibido «lo vi pero no lo hice porque no me lo pediste»; pero no
sobre-marcar riesgos falsos. Documentado en `.cursor/rules/agente-conducta.mdc` § «Actuar como experto».

**Recordatorio para informe final:** este es el primer set de cambios reales sobre el repo.

---

### 2026-07-11 — Estudio profundo de los 3 OpenAPI + factibilidad generador

**Qué se hizo:**
- Reconocimiento estructural de api_4/6/7 (tags, paths, schemas, servers, tagGroups).
- Anatomía de la plantilla de método (envelope constante; solo varían `parametros` y `datos`).
- Mapeo de la doble cara del contrato: métodos que exponemos vs Canal Validador (api_7 lo hace
  explícito con tags `CANAL` / `CANAL VALIDADOR`; api_4/api_6 dejan el canal validador como anexo HTML).
- Evaluación de generador OpenAPI → **factible**; diseño borrador.

**Hallazgos / decisiones:**
- **Cifrado/descifrado api_6 ≠ api_7 hoy**: api_7 incompleto (solo llaves RSA) vs api_6 GCM completo
  + CBC obsoleto. api_4 aún en CBC. → api_6 queda como referencia futura; no cambiar ahora sin
  preservar contrato.
- Inconsistencias entre APIs: envelope response (`respuesta` wrapper en api_7), tipo `resultado`
  (int vs string), split 200/400, naming schemas, `x-tagGroups` solo en api_6.
- api_4 canal validador = anexo HTML ~69 KB (13 tablas) → objetivo: llevar a método estructurado.

**Archivos second-brain creados/actualizados:**
- `08-estudio-profundo-tech_doc.md` (nuevo)
- `09-generador-openapi.md` (nuevo)
- `01-transversal-autopista.md` (discrepancia cifrado)
- `README.md` (índice)

**Decisiones abiertas en ese momento:** normalizar vs respetar diferencias; alcance PoC; unificación
GCM. **Resueltas en la siguiente entrada:** no cambiar contrato productivo; PoC VCN; api_6 es
referencia futura de cifrado/descifrado.

---

### 2026-07-11 — Aclaración crítica: preservar contrato productivo

**Aclaraciones del usuario:**
- Cuando diga **cifrado**, leer **cifrado y descifrado**.
- El usuario se corrigió: api_6 y api_7 **no** son iguales hoy. Solo `api_6.json` tiene lo correcto:
  `Guía para Cifrado Híbrido: RSA + AES-256-GCM` y `Guía para Cifrado Híbrido: RSA + AES-256-CBC
  (Obsoleto)`. Ese es el estándar futuro para los demás.
- La información de cada API ya es productiva o está siendo usada por clientes en desarrollo,
  pruebas y certificación. **No cambiar contrato ni información.**
- El objetivo es mejorar presentación y mantenimiento de la información técnica, no rediseñar lo
  publicado.
- Para APIs/métodos nuevos sí se puede aplicar el estándar correcto desde el inicio.
- PoC generador: si como experto VCN es el mejor primer paso, avanzar con VCN.

**Correcciones a nuestra documentación:**
- `08-estudio-profundo-tech_doc.md`: sustituir lenguaje de “normalizar” por **preservar variantes por API**.
- `09-generador-openapi.md`: modo obligatorio `preserve-contract` para APIs existentes; `new-standard`
  solo para APIs/métodos nuevos.
- `01-transversal-autopista.md`: api_6 como referencia futura de cifrado/descifrado; api_7/api_4 lo
  tendrán eventualmente.
- `10-decisiones-reglas-refactory.md`: nuevo documento con reglas obligatorias.

**Riesgo principal:** cambiar `resultado`, envelope, campos, ejemplos contractuales o métodos
publicados puede meter al usuario en un problema serio con clientes que ya implementaron contra esa
documentación. El agente debe tratar esto como restricción dura.

---

### 2026-07-11 — Rediseño presentación Canal Validador (VCN, v1)

**Qué se hizo:**
- Plantilla `especificacion-para-canal-validador.html` reestructurada: secciones con `h2`/`h3`/`h4`,
  listas unificadas, tabla de tiempos de espera, anexos legibles.
- **Tablas contractuales del método 0001, ejemplos JSON y sección ENMASCARADO:** copiadas sin cambio
  desde el baseline (información preservada).
- `armar-vcn.js` → actualiza `tech_doc/api_4.json` + `tech_doc_html/api_4.html`.
- `comparar-vcn.js --solo-esquema` → **ESQUEMA OK** (paths/schemas sin cambio).
- Comparación completa difiere solo en `tagDescriptions` del Canal Validador (esperado: presentación).
- Añadido flag `--solo-esquema` al comparador para validar cambios de presentación HTML.
- Script auxiliar: `redisenar-canal-validador.js` (extrae bloques contractuales del baseline).

**Pendiente (futuro, no en esta v1):** llevar tablas del método 0001 a estructura más plana (estilo
api_7 paths); requiere decisión de alcance.

---

**Decisión:** empaquetar ReDoc en el repo (mejor que CDN para `tech_doc_html/` — funciona sin internet,
versión fija, no depende de red/firewall).

**Qué se hizo:**
- `generador-openapi/vendor/redoc.standalone.js` (ReDoc **2.1.5**, ~908 KB) + `vendor/README.md`.
- `preview-redoc.js`: ruta relativa configurable (`redocScriptSrc`).
- `tech_doc_html/*.html` → `../generador-openapi/vendor/redoc.standalone.js`.
- Preview de trabajo → `../../vendor/redoc.standalone.js`.
- Regenerados los tres HTML.

---

### 2026-07-11 — `tech_doc_html/` (versión HTML local de cada API)

**Necesidad del usuario:** ver en cualquier momento cómo se ve un `api_#.json` en HTML, sin el
proceso lento de antes (editar `api_fd.json` → subir a S3 → invalidar CloudFront → entrar al sitio
del marketplace → buscar la doc). Quiere tener **siempre** la versión HTML del JSON en local.

**Qué se hizo:**
- Nueva carpeta **`tech_doc_html/`** con `api_4.html`, `api_6.html`, `api_7.html` (versionadas).
- `lib/render-html.js` + `scripts/html-tech-doc.js`: renderizan `tech_doc/api_*.json` → HTML ReDoc
  (spec embebido). Sirve para los **tres** APIs, no solo VCN.
- `armar-vcn.js` refresca `tech_doc_html/api_4.html` al regenerar, para que HTML y JSON no se desfasen.
- **ReDoc offline:** empaquetado en `generador-openapi/vendor/redoc.standalone.js` (v2.1.5); los HTML
  ya no dependen de CDN.

**Notas:**
- Es una pieza más de la herramienta nueva `generador-openapi/` (sin precedente en el repo).

---

### 2026-07-11 — Estudio histórico completo del repo + retiro de `tech_doc/_generated/`

**Motivo:** el usuario no veía necesidad de la carpeta `_generated` y pidió estudiar **todo** el
historial para hacer lo correcto (no inventar). Se revisaron los **79 commits** de la rama, incluyendo
los 20 anteriores a los ya vistos, hasta el commit inicial.

**Evidencia (historia real de `tech_doc/`):**

| Commit | Fecha | Qué |
|--------|-------|-----|
| `5199b0a` | 2023-04-19 | Initial commit |
| `daa801d` | 2023-04-19 | **Versión inicial doc comercial y técnica** — nacen `api_1..5.json` a mano |
| `2a08268` | 2023-04-26 | Cambios doc comercial y técnica |
| `a27f4dd` | 2023-05-04 | Alta `api_6.json` (Alias) a mano |
| `6f8cba1` | 2024-05-23 | `api_6.json` +1512 líneas (edición directa) |
| `1736bdd` | 2024-05-29 | `api_4.json` reescrito (+398/−203) a mano |
| `0d43aa9`,`31591ed`,`46c7785`,`6b95997`,`00c7c12` | 2024 | Fixes puntuales `api_4`/`api_6` a mano |
| `8e83db3` | 2025-05-16 | Alta `api_7.json` a mano |
| `591c883` | 2026-03-25 | ARQ-196: `api_6` + alta `api_fd.json` |
| `8574246` | 2025-07-14 | Se rompe `api_4.json` (control chars) |

**Conclusión (convención real, confirmada):**

1. **Desde el commit inicial (2023) el repo SIEMPRE mantuvo los `api_*.json` a mano**, editados
   directamente en `tech_doc/`, en ramas `Feature/CCL-*`, `AGILEQA-*`, `ARQ-*`, `DES-*`, mergeadas por PR.
2. **NUNCA existió generador, `_generated`, `_baseline` ni plantillas.** Búsqueda en TODO el historial
   (`git log --all -- *_generated* *generador* *generated*`) devuelve **solo** los 3 commits de esta
   sesión (`15a7b9d`, `011b76d`, `f4bfce6`). Es decir: **fueron invención de esta sesión, sin precedente.**
3. Por tanto `tech_doc/_generated/` **no tiene ninguna necesidad** en este repo y contradice la
   convención (la carpeta se publica y debe tener solo los JSON finales).

**Acción tomada (hacer lo correcto):**
- **Eliminada `tech_doc/_generated/`** (README, api_4 generado, preview) del repo.
- Salida del generador **repunteada fuera de `tech_doc/`** → `generador-openapi/_generated/`
  (regenerable, **ignorada por git** vía `.gitignore` nuevo).
- `tech_doc/` queda con **solo** `api_4/6/7.json`, como en toda la historia del repo.
- Verificado: `armar-vcn.js` genera en la nueva ruta y `comparar-vcn.js` → **CONTRATO OK**.

**Pendiente de decisión del usuario (NO ejecutado):** si el **generador** (`generador-openapi/`) se
mantiene o se descarta. También carece de precedente en el repo; su valor sería solo evitar editar a
mano el HTML gigante embebido. Es una decisión de alcance → no se toca sin visto bueno.

---

### 2026-07-11 — Revisión historial `tech_doc/` en GitHub (últimos 20 que la tocaron)

Revisión pedida por el usuario sobre `origin/feature/Refactory`. Commits que modificaron `tech_doc/`,
del más reciente al más antiguo:

| Commit | Fecha | Autor | Qué tocó |
|--------|-------|-------|----------|
| `f4bfce6` | 07-11 | Félix | Borra `_baseline/`; ajusta `_generated/README` |
| `011b76d` | 07-11 | Félix | Crea `_generated/preview/index.html` (ReDoc) |
| `15a7b9d` | 07-11 | Félix | Crea `_baseline/` y `_generated/` (PoC generador) |
| `25fc2f7` | 07-11 | Félix | Arregla `api_4.json`; borra `api_1/2/3/5` y `api_fd` |
| `fde7e7b`,`1fc8130`,`b2e78ae`,`bd33e73`,`16ef2d2`,`b6423b4` | 06-03 | Félix | Serie de updates a `api_6.json` |
| `062c736`,`591c883` | 03-25 | Félix | ARQ-196: `api_6` + **alta `api_fd.json`** |
| `55c014b`,`d550f6e` | 12-22/01-07 | orlando1484 | Updates `api_4.json` (seguía roto) |
| `8574246` | 2025-07-14 | orlando1484 | **Aquí se rompió `api_4.json`** (+ `api_6`) |
| `149edb9` | 06-06 | Félix | `api_7.json` AGILEQA-5483 |
| `8e83db3` | 2025-05-16 | Félix | **Alta `api_7.json`** |
| `08fedbd` | 2024-11-21 | Félix | **Último `api_4` válido** antes del quiebre |
| `28ffe83` | 2024-10-31 | Félix | `api_6.json` |

**Observaciones:**
- `api_6.json` es el archivo más editado (la mayoría de los 20 commits).
- Confirmada la cronología del quiebre de `api_4`: válido hasta `08fedbd` → roto en `8574246` →
  siguió roto (`d550f6e`, `55c014b`) → arreglado en `25fc2f7` (esta sesión).
- `api_fd.json`: nace en `591c883`, se borra en `25fc2f7`.
- **Ruido `tech_doc/_generated/`:** ya **RESUELTO** (ver entrada «Estudio histórico completo»). Se
  retiró de `tech_doc/` y la salida del generador vive en `generador-openapi/_generated/` (ignorada).

---

### 2026-07-11 — `tech_doc_baseline/` (línea base antes del refactory)

**Arquitectura de carpetas de doc técnica (decisión del usuario):**

| Carpeta | Rol |
|---------|-----|
| `tech_doc_baseline/` | Base «antes del refactory» (`api_4/6/7`). **NO se modifica** — referencia de comparación |
| `tech_doc/` | Archivos **finales** (refactorizados) |
| `tech_doc_html/` | Versión HTML de cada uno (futuro) |

**Qué se hizo:**
- Creada `tech_doc_baseline/` y **copiados** (no movidos) `api_4/6/7.json` desde `tech_doc/`.
- `tech_doc/` conserva los productivos → no rompe render/publicación.
- Hashes verificados idénticos y JSON válido en los tres.
- `README.md` en la carpeta documentando «NO SE MODIFICAN».

**api_4 en baseline:** se usa a propósito la versión **JSON válida** (la arreglada escapando control
chars), porque al parsear/comparar no da problemas. El «antes» inválido queda registrado en el
historial git y en `06-hallazgo-api_4-json-invalido.md`.

**Baseline único (resuelto):** el usuario decidió dejar **un solo** baseline: `tech_doc_baseline/`.
Se **retiró** `tech_doc/_baseline/` y se repuntó todo el generador (`comparar-vcn.js`,
`bootstrap-vcn.js`, `lib/bootstrap-vcn.js`, `apis/vcn.json`, READMEs) a `tech_doc_baseline/api_4.json`.
`comparar-vcn.js` verificado → **CONTRATO OK** con el nuevo baseline.

**Commit:** pendiente (usuario no lo pidió en este paso).

---

### 2026-07-11 — Carpeta unificada `archived/` (APIs 1, 2, 3, 5)

**Qué se hizo:**
- Creada `archived/tech_doc/`, `archived/comr_doc/`, `archived/mkt.api.images/`.
- `git mv` desde `tech_doc_archived/` → `archived/tech_doc/` (api_1/2/3/5.json).
- `git mv` comercial: `comr_doc/1,2,3,5_index.html` → `archived/comr_doc/`.
- `git mv` imágenes/logos/diagramas de APIs 1/2/3/5 → `archived/mkt.api.images/`.
- Carpeta `tech_doc_archived/` eliminada (sustituida por `archived/tech_doc/`).

**Motivo:** archivos sin mantenimiento futuro; orden en repo, no cambio de publicación.

**Rutas relativas / S3:** no cambian. El destino en AWS S3 donde se suben estos objetos es el mismo;
`archived/` es solo organización en git. Los HTML siguen referenciando `../mkt.api.images/` porque la
estructura relativa al publicar no se altera.

**Commit:** `feature/Refactory` — ver historial del repo marketplace.

---

**Decisiones del usuario:**
- Generador en `telered_content_mktpl/generador-openapi/` (versionado en el mismo repo).
- Baseline en `tech_doc_baseline/` (antes `tech_doc/_baseline/`, ya retirado); salida en `generador-openapi/_generated/` (fuera de `tech_doc/`, ignorada por git).
- Plantillas HTML mantenibles (no seguir editando HTML embebido en el JSON a mano).

**Qué se hizo en repo marketplace:**
- `generador-openapi/` con lib, scripts, `apis/vcn.json`, `plantillas/vcn/tags/*.html`, `fragmentos/vcn/`.
- `tech_doc_baseline/api_4.json` — base de referencia (no se modifica).
- `scripts/bootstrap-vcn.js` → extrae baseline a plantillas/fragmentos.
- `scripts/armar-vcn.js` → genera `generador-openapi/_generated/api_4.json`.
- `scripts/comparar-vcn.js` → vista contractual baseline vs generado → **CONTRATO OK**.

**Siguiente:** rediseñar presentación Canal Validador en plantillas (sin cambiar información); luego
regenerar, comparar, y solo entonces considerar reemplazo del productivo.

**2026-07-11 (tarde):** salida del generador incluye vista previa ReDoc en
`generador-openapi/_generated/preview/index.html` (`lib/preview-redoc.js`).

**Archivos second-brain:** `09-generador-openapi.md` (estado PoC), esta bitácora.

---

**Pendiente para informe final:**
- [ ] Fase mejoras de presentación (sin cambiar información)
- [ ] Listado de archivos tocados en `telered_content_mktpl`
- [ ] Antes/después si aplica
- [ ] Corrección `api_4.json` si entra en mejoras
- [ ] Consolidar en informe único para el usuario

---

### 2026-07-11 — Canal Validador 0001 como operación OpenAPI (v2)

**Qué se hizo:**
- Tag nuevo **`CANAL VALIDADOR`** + operación **`POST /0001`** (método 0001 Validación cuenta nombre), estilo `api_7`.
- Schemas nuevos: `RequestCV0001`, `ResponseCV0001`, `PeticionDescifradaCV0001`, `RespuestaDescifradaCV0001` (envelope cifrado IF + referencia descifrada).
- Tablas contractuales del método 0001 movidas del tag «Especificación para CANAL VALIDADOR» a `plantillas/vcn/operations/canal-validador-0001-description.html` (description de la operación).
- Tag «Especificación…» conserva intro, anexos, enmascaramiento y nota; apunta a `POST /0001`.
- `build-vcn.js`: merge `pathsExtraFile` / `componentsExtraFile` + resolución `x-descriptionTemplate`.
- `comparar-vcn.js --solo-esquema`: compara solo paths/schemas/tags **presentes en baseline** (paths/schemas nuevos no rompen el check).

**Verificación:**
- `armar-vcn.js` → 9 tags, 4 paths.
- `comparar-vcn.js --solo-esquema` → **ESQUEMA OK** (paths/schemas Telered sin cambio).
- `tech_doc_html/api_4.html` regenerado — método 0001 visible bajo tag CANAL VALIDADOR en ReDoc.

**Archivos repo marketplace:**
- `generador-openapi/apis/vcn.json`, `lib/build-vcn.js`, `scripts/redisenar-canal-validador.js`, `scripts/comparar-vcn.js`
- `generador-openapi/fragmentos/vcn/paths-canal-validador.json`, `components-canal-validador.json`
- `generador-openapi/plantillas/vcn/tags/canal-validador.html`, `operations/canal-validador-0001-description.html`
- `generador-openapi/plantillas/vcn/tags/especificacion-para-canal-validador.html` (recortado)
- `tech_doc/api_4.json`, `tech_doc_html/api_4.html`

---

### 2026-07-11 — Fix presentación Requisitos + análisis cifrado api_4 vs api_6

**Qué se hizo (presentación, seguro):**
- `requisitos.html`: la lista del rol **Canal validador** abría con `<ui>` (tag inválido) y cerraba con `</ul>` → renderizaba inconsistente vs la lista **Canal**. Corregido a `<p>Canal validador</p><ul>…`. Información intacta, `--solo-esquema` OK. Commit `fb613b0`.

**Evaluación de los otros 3 tags candidatos a reflow:** `terminos`, `razones-de-respuestas-interno`, `razones-de-respuestas-canal-validador` son HTML de una sola línea pero **estructuralmente válidos**; reflowear solo mejora el fuente, el render en ReDoc es idéntico. **No se tocan** (evitar churn «por si acaso»).

**HALLAZGO CRÍTICO — cifrado api_4 (VCN) vs api_6 (P2P):** no es un cambio seguro.

| Aspecto | api_4 VCN (actual) | api_6 P2P (guía «correcta») |
|---|---|---|
| Modo AES | **AES-256-CBC** (sin integridad) | **AES-256-GCM** (con Auth Tag) |
| Auth Tag | No existe | Sí (16 bytes) |
| Formato en cable | `iv.secreto.cifrado` (**3 partes separadas por punto**) | bloque RSA (1024 hex fijos = IV+secreto+authTag) **+** AES, **sin separadores** |
| RSA | 4096, OAEP, SHA-256, PKCS#1 | igual (4096, OAEP, SHA-256, PKCS#1) + notas PKCS#1 vs PKCS#8, OpenSSL 3.x |

**Por qué NO se puede portar GCM a api_4 sin decisión de dominio:**
1. **Cambia información/contrato** (regla dura: prohibido sin confirmación).
2. **Rompería la consistencia interna de api_4**: todo el resto de VCN (schemas `RequestCifrado`, `Request0001`, `RequestCV0001`, tablas Canal Validador, y **todos los ejemplos de ciphertext**) están construidos sobre el formato **CBC punto-separado `iv.secreto.cifrado`**. Meter la guía GCM (sin separadores, con authTag) contradiría los ejemplos y las tablas del propio documento.
3. **Puede no reflejar la realidad productiva de VCN**: no sé si VCN en producción usa CBC (punto-separado) o debe migrar a GCM como P2P. `prod/tld-api-cuenta-nombre-master` está fuera de alcance (no abrir).

**Defectos menores detectados en la guía de cifrado api_4 (tocan ejemplo/contenido → confirmar antes):**
- Bug JS en el ejemplo: `decryptTextRSA: function(encryptedText) => {` mezcla `function` con arrow `=>` (sintaxis inválida).
- Error conceptual en el texto: «cifrado asimétrico mediante AES-256-cbc» (AES es **simétrico**).

**Decisión pendiente del usuario:** ¿VCN se queda en CBC (solo corregir defectos/typos) o migra a GCM como P2P (cambio de contrato, requiere alinear schemas/ejemplos/tablas)? → **RESUELTA** en la entrada siguiente.

---

### 2026-07-11 — Cifrado api_4 alineado a api_6 (dos guías coexisten)

**Decisión del usuario:** el cifrado de api_4 **debe documentarse igual que api_6**. La teoría: alguien debía migrar api_4 al esquema de api_6 y **nunca lo hizo**. **Los dos cifrados coexisten** (como en api_6): **GCM vigente** + **CBC (Obsoleto)**. Opción elegida: **C (fiel a api_6, con `x-tagGroups`)**.

**Clave que desbloqueó el cambio sin tocar contrato:** api_6 conserva **ambas** guías, y su **CBC (Obsoleto)** describe **exactamente** el formato que api_4 ya usa (`iv.secreto.cifrado`, 3 partes con punto, solo el secreto por RSA). Por eso **no hace falta tocar** schemas/ejemplos/tablas de api_4: el formato punto-separado sigue siendo válido (es el obsoleto que coexiste). El contrato de paths/schemas queda **intacto**.

**Qué se hizo:**
- Extraídas **verbatim** las dos guías de `tech_doc/api_6.json` → `generador-openapi/plantillas/vcn/tags/guia-cifrado-hibrido-gcm.html` (29.6 k) y `…-cbc-obsoleto.html` (27.3 k). Módulo **aislado y reutilizable**: cada `api_#` tendrá su propia copia (las APIs nunca se referencian entre sí).
- Eliminada la guía CBC vieja de api_4 (`cifrado-y-descifrado-de-datos.html`). La CBC nueva (versión limpia de api_6) **corrige** de paso los dos defectos detectados: bug de arrow function y el "asimétrico".
- Generador: soporte de **`x-tagGroups`** (`build-vcn.js` emite `doc['x-tagGroups']` desde `cfg.tagGroups`).
- `apis/vcn.json`: el tag único de cifrado se reemplaza por los dos tags de guía; añadido `tagGroups` con el grupo **"Cifrado y Descifrado de datos"** (mantiene válidas las referencias de schema "sección 'Cifrado y Descifrado'").

**Verificación:** `armar-vcn.js` → 10 tags, `JSON.parse OK`, HTML refrescado. `comparar-vcn.js --solo-esquema` → única diferencia **`contract.tagNames`** (esperado y aprobado); paths/schemas/campos **intactos**.

**Archivos second-brain actualizados:** `09-generador-openapi.md` (§1, §6 nueva decisión, §7.4 progreso), este `07`.

---

### 2026-07-11 — Modelo documental: endpoint cifrado + métodos lógicos

**Corrección de criterio tras reclamo del usuario:** el problema no es solo "cómo se ve" el Canal Validador. El problema real es que estas APIs documentan un protocolo multiplexado y cifrado en una herramienta (OpenAPI/ReDoc) que espera endpoints HTTP reales. Los "métodos" (`0001`, etc.) no son URLs: son valores dentro del payload descifrado.

**Modelo definido y documentado:** separar cuatro capas:
- endpoint HTTP real;
- envelope cifrado (`peticion` / `respuesta`);
- payload descifrado;
- método lógico seleccionado por `metodo`.

**Qué se hizo en second-brain:**
- Creado `11-modelo-documental-protocolo-cifrado.md` como fuente de verdad del modelo.
- Creado `helper-inventario-openapi-multiplexado.js` para inventariar paths y schemas de `api_4` y clasificar endpoint real vs operación documental.
- Actualizado `README.md` para indexar el nuevo modelo.

**Evidencia del helper (api_4 actual):**
```text
POST "/auth/token"           endpoint-real-auth
POST "/validador/validar"    endpoint-real-multiplexado-cifrado
POST "/validador/validar "   operacion-documental-metodo-descifrado
POST "/0001"                 operacion-documental-canal-validador
```

**Qué se hizo en `telered_content_mktpl`:**
- `paths.json`: el path sintético `/validador/validar ` ahora se describe como **Método lógico 0001**, no como endpoint real; se añadieron extensiones `x-telered-operationKind`, `x-telered-realTransport`, `x-telered-realEndpoint`.
- `paths-canal-validador.json`: `/0001` queda marcado como **Método lógico 0001** del Canal Validador; la URL real es `defined-by-integrating-institution`.
- `canal-validador.html` y `canal-validador-0001-description.html`: texto visible aclarando que la IF define la URL real y que el método vive dentro de `peticion` descifrada.
- `components.json` y `components-canal-validador.json`: los campos cifrados ya no presentan `iv.secreto.cifrado` como formato único; aclaran que **GCM es vigente** y que los ejemplos `iv.secreto.cifrado` corresponden a **CBC obsoleto**.

**Verificación:**
- `armar-vcn.js` → `JSON.parse OK`, HTML refrescado.
- `helper-inventario-openapi-multiplexado.js` → clasificación esperada.
- `comparar-vcn.js --solo-esquema` → única diferencia `contract.tagNames` (ya conocida por las dos guías de cifrado); paths/schemas de contrato intactos.
- `ReadLints` sin errores.

---

### 2026-07-11 — Canal Validador: espejo de Telered (envelope + descifrado)

**Reclamo del usuario (visual, correcto):** el render de `cv-0001` se veía peor que el de Telered `0001`. Causa técnica verificada: no es gusto, es el **tipo del schema**. Telered `0001` usa `Request0001` con `peticion` como **object anidado** → ReDoc pinta campos navegables/tipados. Mi `cv-0001` usaba `RequestCV0001` con `peticion` como **`string`** + una **tabla HTML gigante** (el estilo "feo" heredado del anexo). Además, los schemas descifrados `PeticionDescifradaCV0001`/`RespuestaDescifradaCV0001` ya existían pero estaban **huérfanos** (ninguna operación los referenciaba), así que ni se mostraban.

**Decisión del usuario:** opción **A** — espejo fiel del patrón Telered (dos operaciones).

**Qué se hizo (`telered_content_mktpl`):**
- `paths-canal-validador.json`: ahora **dos** operaciones en el tag CANAL VALIDADOR:
  - `cv-0001` (`/0001`) — «mensaje cifrado (envelope)»: `RequestCV0001`/`ResponseCV0001` (`peticion`/`respuesta` string = lo que llega en el cable).
  - `cv-0001-descifrado` (`/0001 `, truco del espacio) — «contenido descifrado»: `PeticionDescifradaCV0001`/`RespuestaDescifradaCV0001` → ReDoc pinta los campos igual que Telered `0001`.
  - Ambas marcadas `x-telered-operationKind: logical-method`.
- `canal-validador-0001-description.html`: **eliminada la tabla HTML gigante**; queda sección corta (alcance logical-method + punteros a «contenido descifrado», grupo Cifrado y a Especificación).
- `components-canal-validador.json`: antes de borrar la tabla, se **preservó el detalle único** de `idPeticion` (formato SWIFT CODE + secuencial, ejemplos, «no repetir en 24h») enriqueciendo `PeticionDescifradaCV0001.idPeticion`.
- `especificacion-para-canal-validador.html`: la referencia «POST /0001» se reemplazó por punteros a las dos operaciones + aclaración de que la ruta HTTP real la define la IF y el método se elige por `metodo`.

**Qué se hizo (`second-brain`):** `helper-inventario-openapi-multiplexado.js` distingue ahora envelope vs descifrado del Canal Validador.

**Verificación:**
- `armar-vcn.js` → **5 paths**, `JSON.parse OK`, HTML refrescado.
- Inventario: `/0001` = envelope, `/0001 ` = descifrado (schemas anidados ya conectados).
- `comparar-vcn.js --solo-esquema` → única diferencia `contract.tagNames` (conocida); paths/schemas de baseline intactos (los nuevos son aditivos).
- `ReadLints` sin errores.

---

### 2026-07-11 — Reestructuración navegación api_4 según árbol 13

**Pedido del usuario:** implementar el Árbol 1 de `13-api_4-estructura-propuesta.md` (desarmar y rearmar IA sin romper contrato).

**Qué se hizo (`telered_content_mktpl`):**
- `apis/vcn.json`: nueva portada (`info.description`), tags reordenados, tags nuevos **Personajes** y **Enmascarado**, `tagGroups` alineados al árbol:
  - Conceptos base → Personajes, Términos, Requisitos
  - Seguridad → Autenticación, GCM vigente, CBC obsoleto
  - LADO A — Canal consume Telered → Validación cuenta nombre
  - LADO B — Canal Validador → Especificación + CANAL VALIDADOR
  - Referencias → Razones (Telered + CV) + Enmascarado
- Plantillas HTML:
  - `personajes.html` (nuevo): tabla de los 3 actores
  - `enmascarado.html` (nuevo): regla de asteriscos extraída de Especificación
  - `validacion-cuenta-nombre.html`: intro LADO A + **timeout 25 s** (única fuente en ese lado)
  - `especificacion-para-canal-validador.html`: auth CV (fijo/dinámico), transporte, **timeout 10 s**, descifrado; enmascarado removido
  - `canal-validador.html`: intro LADO B acotada

**Verificación:**
- `armar-vcn.js` → 12 tags, 5 paths, `JSON.parse OK`, HTML refrescado
- Inventario: clasificación sin cambios (5 ops documentales/reales como antes)
- `comparar-vcn.js --solo-esquema` → diferencias esperadas: `contract.info.description`, `contract.tagNames` (tags nuevos Personajes/Enmascarado + reorden); paths/schemas de contrato intactos

---

## Plantilla para próximas entradas

```markdown
### YYYY-MM-DD — Título breve

**Qué se hizo:**
- ...

**Hallazgos / decisiones:**
- ...

**Archivos second-brain actualizados:**
- ...

**Archivos repo marketplace (si aplica):**
- ...
```

---

## Índice rápido de hallazgos (para informe)

| # | Hallazgo | Doc principal |
|---|----------|---------------|
| 1 | Endpoint único `POST /validador/validar` | `01-transversal-autopista.md` |
| 2 | Paths OpenAPI con espacios finales (truco claves únicas) | `01-transversal-autopista.md` |
| 3 | `api_4.json` JSON inválido (control chars línea ~60, commit `8574246`) | `06-hallazgo-api_4-json-invalido.md` |
| 4 | `core.autocrlf` agrava api_4 en Windows | `06-hallazgo-api_4-json-invalido.md` |
| 5 | Contenido funcional VCN/P2P/R2P extraído | `02`, `03`, `04` |
| 6 | Mapa marketplace ↔ TLD | `05-mapas-repo-producto.md` |
