# Super tabla prod vs dev — estado y retomo

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-07-14 |
| **Estado** | Generador MD v1: dos vistas (todas / solo prod≠dig). SWIFT fix en código; pend. deploy+Newman. [`vcn/hallazgo-validador-swift-dev.md`](vcn/hallazgo-validador-swift-dev.md). |
| **Empezar por** | Revisar [`vcn/bloques-diferencias-prod-vs-dev.md`](vcn/bloques-diferencias-prod-vs-dev.md) (52 bloques). |

## Decisiones cerradas

| Tema | Decisión |
|------|----------|
| ¿Solo diferencias o todos? | **Solo diferencias** |
| ¿Por nombre o por variante? | **Por escenario (`nombre`)** |
| ¿MD o HTML primero? | **MD listo**; HTML siguiente |
| Presentación | **Bloques** + Prism vendor para HTML futuro |
| Filtro MD | Vista completa + vista **solo prod≠dig** (mismo regenerar) |
| HTTP (MATRIZ) | Visible; no abre bloque solo por 400→200 |

## Cómo regenerar

```powershell
cd second-brain\super-tabla-prod-dev
node generar-bloques.js vcn
```

Escribe **dos** MD:

| Archivo | Contenido |
|---------|-----------|
| `vcn/bloques-diferencias.md` | Todas las diferencias (84 hoy) |
| `vcn/bloques-diferencias-prod-vs-dev.md` | Solo donde prod ≠ dig (negocio/forma/texto/http) — **52** hoy |

Opcional: `--prod <json>` `--dev <json>`.

## Cómo retomar

1. Índice en [`vcn/bloques-diferencias-prod-vs-dev.md`](vcn/bloques-diferencias-prod-vs-dev.md) (o la vista completa) → ir bloque a bloque.
2. Completar `vcn/anotaciones.json` → volver a correr el generador (reinyecta notas en **ambas** vistas).
3. HTML (Prism) pendiente.

## Pendiente

- [x] Generador MD bloques VCN (vista completa + filtrada prod≠dig)
- [ ] Generador HTML (mismos bloques + `vendor/prism/`)
- [ ] P2P cuando haya par dev
