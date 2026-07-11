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

**Pendiente para informe final:**
- [ ] Fase mejoras de presentación (sin cambiar información)
- [ ] Listado de archivos tocados en `telered_content_mktpl`
- [ ] Antes/después si aplica
- [ ] Corrección `api_4.json` si entra en mejoras
- [ ] Consolidar en informe único para el usuario

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
