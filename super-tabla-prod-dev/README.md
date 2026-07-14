# Super tabla prod vs dev — por servicio

Estudio para armar, desde la **recopilación Newman**, una **tabla escenario a escenario** (solo **diferencias**) que muestre **esperado vs captura prod vs captura dev**, con espacio para **hablar cada caso, anotar y regenerar** sin perder comentarios.

| Campo | Valor |
|-------|-------|
| **Estado** | Generador MD v1 listo — VCN 84 bloques / 331 únicos (`vcn/bloques-diferencias.md`) |
| **Unidad** | Un **documento por servicio**, **bloques por escenario** (no mega-tabla) |
| **Fila / bloque** | **Un escenario** (nombre Postman), no una variante de cifrado |
| **Filas mostradas** | **Solo diferencias** |
| **Formato** | **Markdown** generado; HTML (+ Prism) siguiente |
| **Insumo** | Pares `--codigo-fuente prod` y `dev`, mismo `NIVEL_EJECUCION` |

**Retomo:** [`00-estado-y-retomo.md`](00-estado-y-retomo.md) · **Columnas:** [`01-columnas.md`](01-columnas.md) · **Flujo:** [`02-flujo-trabajo-y-anotaciones.md`](02-flujo-trabajo-y-anotaciones.md) · **Presentación:** [`03-presentacion-bloques.md`](03-presentacion-bloques.md)

**Regenerar VCN:** `node generar-bloques.js vcn` (desde esta carpeta).

---

## Para qué (no es un dashboard de %)

El equipo de pruebas exige evidencia **contundente y concreta**. Las estadísticas ayudan poco como argumento principal.

Lo que importa es poder decir, escenario por escenario:

> Mira este escenario. El esperado es **Y**. En **prod** responde así. En **dev** responde así. Por eso el cambio trae **esto** (o corrige **esto** / no cambia **esto**).

La super tabla es el soporte de esa conversación: verdades de captura Newman + apuntes humanos inyectables.

---

## Decisiones cerradas (2026-07-14)

| Tema | Decisión |
|------|----------|
| Cobertura de filas | **Solo diferencias** |
| Granularidad | **Contra el escenario** (colapsar variantes de cifrado) |
| Formato | **MD primero → HTML después** |
| Vista | **Bloques por escenario** (fichas), no una mega-tabla; foco en comparar **payloads**. Prism en `vendor/prism/` |
| Comentarios | Sidecar de anotaciones; **sobreviven** a regenerar la tabla |
| Audiencia | QA / foro técnico escenario a escenario, no informe de % |

Detalle y reglas mecánicas: [`01-columnas.md`](01-columnas.md), [`02-flujo-trabajo-y-anotaciones.md`](02-flujo-trabajo-y-anotaciones.md).

---

## Relación con lo ya hecho

| Qué | Dónde | Rol |
|-----|-------|-----|
| Recopilación + scripts | [`../Postman/comparar-prod-vs-dev/`](../Postman/comparar-prod-vs-dev/) | Insumo; ya agrupa por `nombre` (únicos) |
| Revisiones VCN / P2P | docs 12 / 13 ahí | Veredictos HP / TEST-MAL / PROD-MAL a reutilizar en anotaciones |
| Logs Newman | [`../Postman/generador/logs/`](../Postman/generador/logs/) | Fuente de capturas |
| Foto presentación | [`../codigosRespuesta/`](../codigosRespuesta/) | Otra vista (por código); **no** sustituye esta tabla |

---

## Bloques de columna

| Información del escenario | Esperado | Captura de Prod | Captura de Dev | Observaciones documentada |
|---------------------------|----------|-----------------|----------------|---------------------------|

---

## Por servicio

1. **VCN** — primer corte (hay prod + dev MATRIZ jul-2026)
2. **P2P** — cuando exista par dev comparable
3. **P2M** — idem
