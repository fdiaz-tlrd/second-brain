# Super tabla prod vs Dig — estado y retomo

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-07-15 |
| **Estado** | **Pausa.** Usuario dedica esfuerzo a justificar prod≠Dig en MD VCN; luego P2P equivalente. Generador OK; dig DEFAULTS = Newman `2026-07-15T18-49-44Z`. |
| **Empezar por (VCN)** | [`vcn/00-estado-y-retomo.md`](vcn/00-estado-y-retomo.md) → [`vcn/bloques-diferencias-prod-vs-dev.md`](vcn/bloques-diferencias-prod-vs-dev.md) (**46** bloques). |

## Decisiones cerradas

| Tema | Decisión |
|------|----------|
| ¿Solo diferencias o todos? | **Solo diferencias** |
| ¿Por nombre o por variante? | **Por escenario (`nombre`)** |
| ¿MD o HTML primero? | **MD listo**; HTML siguiente |
| Presentación | **Bloques** + Prism vendor para HTML futuro |
| Filtro MD | Vista completa + vista **solo prod≠Dig** (mismo regenerar) |
| HTTP (MATRIZ) | Visible; no abre bloque solo por 400→200 |
| Uso humano | Revisar código Dig vs prod **con evidencia** de estos MD; anotar razón en `anotaciones.json` |

## Cómo regenerar

```powershell
cd second-brain\super-tabla-prod-dev
node generar-bloques.js vcn
```

Escribe **dos** MD:

| Archivo | Contenido |
|---------|-----------|
| `vcn/bloques-diferencias.md` | Todas las diferencias (**79** al 2026-07-15) |
| `vcn/bloques-diferencias-prod-vs-dev.md` | Solo donde prod ≠ Dig — **46** al 2026-07-15 |

Opcional: `--prod <json>` `--dev <json>` (flag CLI `dev` = Dig).

## Cómo retomar

1. [`vcn/00-estado-y-retomo.md`](vcn/00-estado-y-retomo.md) (handoff de pausa + mapa de 46).
2. Índice en [`vcn/bloques-diferencias-prod-vs-dev.md`](vcn/bloques-diferencias-prod-vs-dev.md) → justificación bloque a bloque.
3. Completar `vcn/anotaciones.json` → volver a correr el generador.
4. Cuando el usuario lo diga: mismo patrón **P2P**.

## Pendiente

- [x] Generador MD bloques VCN (vista completa + filtrada prod≠Dig)
- [x] Hallazgo SWIFT Dig cerrado + regenerar post-Newman
- [ ] Justificación humana de los 46 bloques VCN (en curso / pausada)
- [ ] Generador HTML (mismos bloques + `vendor/prism/`)
- [ ] P2P: par Newman + `p2p/bloques-diferencias-prod-vs-dev.md` + mismas anotaciones
