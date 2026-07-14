# Super tabla prod vs dev — estado y retomo

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-07-14 |
| **Estado** | Decisiones de producto **cerradas** (incl. bloques + Prism); pendiente generador MD v1 (VCN) |
| **Empezar por** | VCN MATRIZ (pares prod `2026-07-14T09-09-28Z` + dev `2026-07-14T16-03-14Z`) |

## Decisiones cerradas

| Tema | Decisión |
|------|----------|
| ¿Solo diferencias o todos? | **Solo diferencias** |
| ¿Fila por nombre o por variante cifrado? | **Por escenario (`nombre`)**; colapsar variantes |
| ¿MD o HTML primero? | **Markdown primero**, **HTML después** |
| Presentación | **Bloques/fichas por escenario** (comparar payloads), no mega-tabla. Ver `03-presentacion-bloques.md` |
| Prism | Vendor local `vendor/prism/` (1.29.0, JSON + tema claro) |
| Comentarios | Sidecar `anotaciones.json`; **reinyección** al regenerar |
| Propósito | QA escenario a escenario; stats solo valor agregado |
| HTTP (MATRIZ) | Visible en cada ficha; no abre ficha solo por 400→200; narrativo “ambos 200” |

## Cómo retomar

1. [`README.md`](README.md) → [`01-columnas.md`](01-columnas.md) → [`02-flujo-trabajo-y-anotaciones.md`](02-flujo-trabajo-y-anotaciones.md) → [`03-presentacion-bloques.md`](03-presentacion-bloques.md).
2. Insumos en `Postman/generador/logs/historial/vcn/`.
3. No Newman desde Lenovo.

## Pendiente de implementación

- [ ] Script generador MD: join prod/dev, colapso, filtro diferencias, **bloques por escenario**, inyección anotaciones.
- [ ] Carpeta `vcn/` con primera salida + `anotaciones.json`.
- [ ] Generador HTML (mismos bloques; Prism desde `vendor/prism/`).
- [ ] Luego P2P cuando haya par dev.
