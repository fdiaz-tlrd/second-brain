# Estudio — `tld-api-r2p` (R2P)

| Campo | Valor |
|-------|-------|
| Repo Dig | `tld-api-r2p` |
| Referencia prod | `produccion_real/tld-api-r2p` (solo lectura) |
| Retomo | [`00-estado-y-retomo.md`](./00-estado-y-retomo.md) |

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [`00-estado-y-retomo.md`](./00-estado-y-retomo.md) | Handoff |
| [`01-dig-vs-prod-invocacion-y-diferencias.md`](./01-dig-vs-prod-invocacion-y-diferencias.md) | Dual consume + resto de diffs Dig vs prod |
| [`02-import-tld-telered-lib-layer.md`](./02-import-tld-telered-lib-layer.md) | Cold start / layer sin `tld-telered-lib` |
| [`03-meta-pulido-cambios-existentes.md`](./03-meta-pulido-cambios-existentes.md) | Meta: asegurar lo ya hecho; base VCN |
| [`04-plan-asegurar-dig.md`](./04-plan-asegurar-dig.md) | Plan/orden fases |
| [`05-contrato-invoke-validador-api-producto.md`](./05-contrato-invoke-validador-api-producto.md) | Contrato Invoke (espejo VCN) |
| [`06-contrato-producto-validador-proxy.md`](./06-contrato-producto-validador-proxy.md) | Contrato producto→proxy (espejo VCN) |
| [`07-fase1-gaps-r2p-vs-espejo-vcn.md`](./07-fase1-gaps-r2p-vs-espejo-vcn.md) | Gaps vivos G1–G7 |
| [`08-prod-real-flujo-r2p-y-tld-util.md`](./08-prod-real-flujo-r2p-y-tld-util.md) | Prod: validador-api → R2P → banco + tld-util |
| [`09-opinion-doble-ancla-prod-y-vcn.md`](./09-opinion-doble-ancla-prod-y-vcn.md) | Opinión doble ancla |
| [`10-cruce-vcn-dig-x-prod-r2p.md`](./10-cruce-vcn-dig-x-prod-r2p.md) | **Cruce** Fase 1 |
| [`11-fase2-orden-fixes.md`](./11-fase2-orden-fixes.md) | Fase 2/3 orden de ejecución |
| [`12-estudio-idTransaccionAutopista-fechaHora-flujo-prod.md`](./12-estudio-idTransaccionAutopista-fechaHora-flujo-prod.md) | Pass-through envelope autopista |
| [`13-auditoria-g4-lambdaResult.md`](./13-auditoria-g4-lambdaResult.md) | Auditoría forma salida Dig |
| [`14-cierre-3-5-g5-g7.md`](./14-cierre-3-5-g5-g7.md) | Cierre candado G5 + G7 |
| [`15-estudio-api7-marketplace-vs-prod.md`](./15-estudio-api7-marketplace-vs-prod.md) | api_7 vs prod (**no** arreglar marketplace aquí) |
| [`16-escenarios-simples-newman-diseno.md`](./16-escenarios-simples-newman-diseno.md) | Alcance mínimo Newman R2P |
| [`17-estrategia-newman-r2p-paridad-dig.md`](./17-estrategia-newman-r2p-paridad-dig.md) | Estrategia paridad Dig + tooling Postman |
| [`18-gates-canales-matriz-r2p.md`](./18-gates-canales-matriz-r2p.md) | Gates MATRIZ / canales (alias cerrado) |
| [`19-smoke-matriz-0011-evidencia.md`](./19-smoke-matriz-0011-evidencia.md) | Smoke Dig `0011` OK |
