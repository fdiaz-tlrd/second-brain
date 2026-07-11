# Hallazgo — `api_4.json` es JSON inválido

**Estado:** CONFIRMADO (estudio, jul-2026)  
**Archivo afectado:** `telered_content_mktpl/tech_doc/api_4.json`  
**API:** VCN — Validación cuenta nombre  
**No afecta:** `api_6.json`, `api_7.json` (ambos parsean con `JSON.parse` estricto)

---

## Resumen ejecutivo

`api_4.json` **no cumple la especificación JSON**. Una `description` HTML embebida en un tag OpenAPI
(línea ~60, zona «Anexos / Validación cuenta nombre») contiene **saltos de línea y tabulaciones
literales** dentro del literal de string, sin escapar como `\n`, `\r` o `\t`.

- `JSON.parse()` en Node falla con: `Bad control character in string literal in JSON at position 21624 (line 60 column 3650)`.
- Los renderers del marketplace (Redoc/Swagger) usan parsers tolerantes → **la doc se ve bien en pantalla** pese al JSON inválido.
- Herramientas estrictas (linters, `JSON.parse`, algunos pipelines CI) **fallan**.

---

## Síntoma

```text
JSON.parse ERROR: Bad control character in string literal in JSON at position 21624 (line 60 column 3650)

Contexto alrededor del primer fallo (working tree):
"; (ya descifrado)</span></li>   </ol>   <p><span>&nbsp;</span></p>        \r\n\t  \r\n\t  <div align='left'>..."
```

El fragmento muestra `\r\n` y `\t` **como bytes reales** dentro de la string, no como secuencias `\` + `r` + `n`.

---

## Causa raíz

| Aspecto | Detalle |
|---------|---------|
| **Qué** | Caracteres de control (ASCII < 0x20) dentro de un string JSON sin escape |
| **Dónde** | `tags[].description` — tag de validación cuenta nombre / anexos, **línea ~60** |
| **Por qué** | Al editar el HTML de la descripción se pegó o guardó contenido con saltos de línea y tabs reales en lugar de una sola línea o escapes JSON |
| **Regla JSON violada** | RFC 8259: dentro de strings solo se permiten `\"`, `\\`, `\/`, `\b`, `\f`, `\n`, `\r`, `\t` y `\uXXXX` — no bytes de control crudos |

### Conteo de caracteres de control dentro de strings (working tree)

| Código | Char | Cantidad |
|--------|------|----------|
| 9 | TAB | 41 |
| 10 | LF | 30 |
| 13 | CR | 30 |

**Total:** 101 caracteres de control ilegales dentro de strings.

---

## Historial git — cuándo se introdujo

Verificación hecha leyendo blobs con `git show` desde Node (no redirigir con PowerShell `>` — corrompe a UTF-16 y da falsos errores de BOM).

| Commit | Fecha / autor | Mensaje | `JSON.parse` |
|--------|---------------|---------|--------------|
| `daa801d` … `08fedbd` | — | versiones anteriores | ✅ OK |
| **`8574246`** | 2025-07-14 · orlando1484 | Se actualiza la documentación de Cuenta Nombre y Xpress | ❌ **Se rompe aquí** |
| `d550f6e` | — | Update api_4.json | ❌ Sigue roto |
| `55c014b` | — | Update api_4.json (HEAD al estudiar) | ❌ Sigue roto |

**Conclusión:** el defecto se introdujo en **`8574246`** y no se corrigió en commits posteriores.

---

## Factor agravante local (no es la causa original)

| Config | Valor en repo |
|--------|---------------|
| `core.autocrlf` | `true` |
| `tech_doc/api_4.json` | `text: auto`, `eol: unspecified` |

Al hacer checkout en Windows, git convierte LF→CRLF **también dentro de la string HTML**, añadiendo CR crudos encima de los LF ya presentes en el blob. El working tree puede tener **más** control chars que el objeto git commiteado, pero el blob en `8574246` ya era inválido por LF crudo.

---

## Impacto

| Área | Efecto |
|------|--------|
| Marketplace / Redoc | Suele funcionar (parser laxo) |
| `JSON.parse`, jq estricto, validadores OpenAPI | Fallan |
| Extracción automática de schemas/códigos | Requiere grep o parser tolerante |
| Comparación diff estructurado | Dificulta pipelines que parsean el archivo |
| Mejoras de presentación futuras | Cualquier herramienta que serialice JSON estricto romperá o habrá que corregir primero |

---

## Cómo trabajar el archivo mientras dure el estudio

1. **No modificar** `api_4.json` salvo pedido explícito del usuario (fase de mejoras).
2. Para leer contenido: **grep/ripgrep** sobre el archivo, o parser tolerante.
3. Para validar: `node -e "JSON.parse(fs.readFileSync('api_4.json','utf8'))"` — debe fallar hasta que se corrija.
4. Para historial: `git show <commit>:tech_doc/api_4.json` leído como buffer UTF-8 en Node, **no** redirección shell en PowerShell.

---

## Corrección recomendada (cuando toque la fase de mejoras)

1. Localizar la `description` del tag afectado (línea ~60).
2. Reemplazar saltos de línea y tabs literales por `\n` y `\t` escapados, **o** minificar el HTML a una sola línea sin control chars.
3. Validar con `JSON.parse` estricto.
4. Revisar `core.autocrlf` / `.gitattributes` para `tech_doc/*.json` (`eol=lf` o `text eol=lf`) y evitar que git reintroduzca CR dentro de strings.
5. Re-renderizar en marketplace y comparar visualmente que no cambió la información.

**Importante:** la corrección es de **formato JSON**, no de contenido técnico — alineado con el objetivo de mejorar presentación sin cambiar información.

---

## Referencias cruzadas

| Documento | Sección |
|-----------|---------|
| [00-fuentes-y-alcance.md](./00-fuentes-y-alcance.md) | Resumen + tabla commits |
| [02-vcn-api_4.md](./02-vcn-api_4.md) | Contenido funcional VCN (método 0001) |
| [07-bitacora-estudio.md](./07-bitacora-estudio.md) | Registro de sesión para informe final |
