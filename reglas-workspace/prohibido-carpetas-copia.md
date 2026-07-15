# Prohibido tocar carpetas «copia» (y `produccion_real`)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Disparo | Agente tocó / escaneó repos cuyo nombre lleva `copia` sin pedido; usuario ordenó borrado |
| Ubicación | `second-brain/reglas-workspace/` (fijo). **No** va en la carpeta volátil del usuario |

## Regla — `*copia*`

Carpetas bajo `c:\Users\Lenovo\GitHub\` cuyo **nombre** incluye `copia` son **instantáneas** de otro momento.

**Prohibido** (salvo pedido explícito con el nombre exacto):

- abrir, editar, `git status` / commit / push
- “arreglar” o documentar dentro
- borrar (salvo orden explícita)

Repos canónicos (cuando el usuario los nombra): `tld-api-p2m`, `tld-validador-proxy`, `tld-api-cuenta-nombre`, etc. — **sin** la palabra `copia`.

## Borrado 2026-07-15 (orden del usuario)

Eliminadas:

- `tld-api-p2m - copia`
- `tld-api-p2m - copia (2)`
- `tld-validador-proxy - copia`

**No** tocadas: `tld-api-p2m`, `tld-api-p2m-antes-cambio`, `tld-validador-proxy`.

## Regla — `produccion_real/`

**Solo lectura.** Instantánea del código de producción; no modificar, commit ni “arreglar”.

Verificado **2026-07-15**: los 8 repos bajo `produccion_real/` estaban **limpios**. El incidente de las `copia` **no** dejó suciedad ahí.

Solo se usa cuando el usuario pide clonar/leer para estudiar; la escritura va a `second-brain/produccion_real/`, no al clon.
