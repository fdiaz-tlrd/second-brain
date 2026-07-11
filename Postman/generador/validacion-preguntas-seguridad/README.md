# Preguntas de seguridad P2P — registro de iteraciones

**Retomo global:** [`../../00-estado-y-retomo.md`](../../00-estado-y-retomo.md)

Documentación viva: catálogo método `0005`, validación de `idPregunta` (0004) y `respuestas[].id` (0006).

| # | Fecha | Documento |
|---|-------|-----------|
| 01 | 2026-07-11 | [ITERACION-01-idPregunta-y-respuestas-id.md](./ITERACION-01-idPregunta-y-respuestas-id.md) |

## Referencias

- [catalogo-metodo-0005.md](./catalogo-metodo-0005.md) — listado fijo de preguntas (`01`–`15`)
- Código: `tld-api-alias/lambdas/alias/lib/validaciones.js` → `validarIdPreguntasUsuario`, `validarRespuestas`
- Escenarios error: `P2P Escenarios error/Metodo/0004/.../3_idPregunta`, `.../0006/.../3_respuestas`

## Escenarios de éxito (pendiente)

| Caso | Valor | Método |
|------|-------|--------|
| id válido catálogo | `01`, `15` | 0004 / 0006 |
| Borde futuro | `16` cuando exista en catálogo | 0006 |
| `texto` con caracteres especiales permitidos | respuesta libre del usuario | 0006 |
