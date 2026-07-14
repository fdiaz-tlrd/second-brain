# Super tabla prod vs dev — estado y retomo

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-07-14 |
| **Estado** | Generador MD v1 listo. **SWIFT dig:** fix tope `validador` ≤8 en código; pendiente deploy + Newman. Ver [`vcn/hallazgo-validador-swift-dev.md`](vcn/hallazgo-validador-swift-dev.md). |
| **Empezar por** | Deploy VCN dig → Newman dig → regenerar bloques; o HTML Prism. |

## Decisiones cerradas

| Tema | Decisión |
|------|----------|
| ¿Solo diferencias o todos? | **Solo diferencias** |
| ¿Por nombre o por variante? | **Por escenario (`nombre`)** |
| ¿MD o HTML primero? | **MD listo**; HTML siguiente |
| Presentación | **Bloques** + Prism vendor para HTML futuro |
| HTTP (MATRIZ) | Visible; no abre bloque solo por 400→200 |

## Cómo regenerar

```powershell
cd second-brain\super-tabla-prod-dev
node generar-bloques.js vcn
```

Opcional: `--prod <json>` `--dev <json>`.

## Cómo retomar

1. Índice en `vcn/bloques-diferencias.md` → ir bloque a bloque.
2. Completar `vcn/anotaciones.json` → volver a correr el generador (reinyecta notas).
3. HTML (Prism) pendiente.

## Pendiente

- [x] Generador MD bloques VCN
- [ ] Generador HTML (mismos bloques + `vendor/prism/`)
- [ ] P2P cuando haya par dev
