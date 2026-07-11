# Mapas — marketplace ↔ repos TLD

Referencia rápida para no confundir **documentación marketplace** con **código en GitHub**.

## API ↔ archivo ↔ repo

| Marketplace | `tech_doc` | Producto TLD | Rama habitual |
|-------------|------------|--------------|---------------|
| VCN — Validación cuenta nombre | `api_4.json` | `tld-api-cuenta-nombre` | `feature/ARQ-225_Refactory` |
| P2P — Alias / Xpress | `api_6.json` | `tld-api-alias` | `feature/ARQ-225_Refactory` |
| R2P — Request to Pay | `api_7.json` | `tld-api-r2p` | (producto autónomo) |
| P2M | `api_5.json` | `tld-api-p2m` | *no estudiado en esta sesión* |

## Método ↔ lambda (patrón habitual)

En repos TLD el routing suele ser por `metodo` en `peticion`:

| `metodo` | API | Handler típico |
|----------|-----|----------------|
| `0001` | VCN | `cuenta-nombre` |
| `0002`–`0009`, `0022`, `0023` | P2P | `alias` |
| `0011`–`0014` | R2P | `r2p` |

**Orquestador:** `tld-validador-api` (invoke a productos) — estudiado en `second-brain/tld-validador-api/`.

## Validaciones JS vs reglas negocio

| Capa | Dónde en doc | Códigos ejemplo |
|------|--------------|-----------------|
| Formato / estructura JSON | `1_validaciones_js` en Newman | 428, 429, 431, 413, … |
| Negocio (catálogo, intentos) | Fuera de validaciones JS | 420, 434, 441, … |

La documentación marketplace lista códigos en tablas HTML; el código TLD debe alinearse a esas tablas por método.

## Cifrado — qué espera cada API en doc

| API | Esquema documentado principal |
|-----|----------------------------|
| VCN | AES-256-**CBC**, `iv.secreto.cifrado` |
| P2P | AES-256-**GCM** (actual) + CBC obsoleto |
| R2P | Igual estructura P2P/P2M (tag general) |

Al comparar implementación vs doc, verificar qué esquema usa cada lambda en runtime.

## HTML comercial

| API | HTML |
|-----|------|
| 4 | `comr_doc/4_index.html` |
| 6 | `comr_doc/6_index.html` |
| 7 | `comr_doc/7_index.html` |

Convención S3: `{id}_index.html` (ver `comr_doc/CONSIDERAR.txt`). **No estudiado** en esta iteración.

## Otras memorias `second-brain`

| Tema | Carpeta |
|------|---------|
| Newman VCN/P2P (pausado) | `Postman/00-estado-y-retomo.md` |
| Validador invoke | `tld-validador-api/` |
| VCN checklist | `tld-api-cuenta-nombre/` |
