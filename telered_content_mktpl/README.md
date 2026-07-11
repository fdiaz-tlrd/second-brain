# telered_content_mktpl — memoria del agente

Documentación **para retomar contexto** del repo [`telered_content_mktpl`](../../telered_content_mktpl) sin re-leer los JSON OpenAPI completos cada sesión.

**Alcance actual del estudio:** solo `tech_doc/api_4.json` (VCN), `api_6.json` (P2P), `api_7.json` (R2P).

| Archivo | Contenido |
|---------|-----------|
| [00-fuentes-y-alcance.md](./00-fuentes-y-alcance.md) | Repo, archivos fuente, qué no entra aún |
| [01-transversal-autopista.md](./01-transversal-autopista.md) | Envelope, auth, cifrado, roles, timeouts |
| [02-vcn-api_4.md](./02-vcn-api_4.md) | Validación cuenta nombre — método `0001` |
| [03-p2p-api_6.md](./03-p2p-api_6.md) | Xpress alias — métodos `0002`–`0009`, `0022`–`0023`, `0010` |
| [04-r2p-api_7.md](./04-r2p-api_7.md) | Request to Pay — métodos `0011`–`0014` |
| [05-mapas-repo-producto.md](./05-mapas-repo-producto.md) | Relación doc marketplace ↔ repos TLD |
| [06-hallazgo-api_4-json-invalido.md](./06-hallazgo-api_4-json-invalido.md) | **Hallazgo:** `api_4.json` JSON inválido — causa, git, impacto, corrección |
| [07-bitacora-estudio.md](./07-bitacora-estudio.md) | Bitácora de sesión → base del **informe exhaustivo** al cerrar mejoras |

## Cómo usar (agente)

1. Leer este README.
2. Si la pregunta es transversal → `01-transversal-autopista.md`.
3. Si es por API → el archivo `02` / `03` / `04` correspondiente.
4. Si hay duda de implementación en código TLD → `05-mapas-repo-producto.md` + repo producto.

**Fuente de verdad:** los JSON en `telered_content_mktpl/tech_doc/`. Esta carpeta **no modifica** esa información; la reorganiza.

**Informe final:** al terminar la fase de mejoras, el usuario pedirá un informe exhaustivo. Mantener actualizada la [bitácora](./07-bitacora-estudio.md) y los hallazgos (ej. [api_4.json inválido](./06-hallazgo-api_4-json-invalido.md)).

## Historial

| Fecha | Nota |
|-------|------|
| 2026-07-11 | Estudio inicial api_4, api_6, api_7 — pausa Postman/Newman |
| 2026-07-11 | Confirmado: endpoint único `POST /validador/validar` (truco del espacio en paths OpenAPI). Causa raíz `api_4.json` inválido: control chars crudos en string HTML (línea ~60), roto desde commit `8574246`. Ver `06-hallazgo-api_4-json-invalido.md` |
| 2026-07-11 | Creados `06-hallazgo-api_4-json-invalido.md` y `07-bitacora-estudio.md` (base informe exhaustivo al cerrar mejoras) |
