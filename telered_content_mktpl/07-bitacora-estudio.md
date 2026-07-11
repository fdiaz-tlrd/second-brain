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
