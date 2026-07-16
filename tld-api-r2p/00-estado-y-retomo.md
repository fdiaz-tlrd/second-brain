# R2P (`tld-api-r2p`) — estado y retomo

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-07-16 |
| **Código Dig** | `6fece92` pusheado (`feature/ARQ-225_Refactory`) — Fase 3 asegurar Dig **cerrada** |
| **Newman / Postman** | **Estudio de estrategia hecho** — [`17`](./17-estrategia-newman-r2p-paridad-dig.md); **sin** colección aún |
| **api_7 Marketplace** | Gaps conocidos ([`15`](./15-estudio-api7-marketplace-vs-prod.md)); **no** arreglar ahora |

## Meta Newman (reencuadre)

Validar **paridad** en Dig: deploy con **código prod** ≈ deploy con **nuestros cambios**.  
Set **mínimo**; tooling = `Postman/generador` + `--codigo-fuente` + comparar-runs.  
**No** suite tipo `VCN Escenarios error`. Recordar HD-005 (HTTP 200 en MATRIZ).

## Cómo retomar

1. [`17-estrategia-newman-r2p-paridad-dig.md`](./17-estrategia-newman-r2p-paridad-dig.md)
2. Gates (canales Dig, nivel MATRIZ/VALIDADOR, path deploy prod-source) antes de implementar
3. Implementar colección solo con OK explícito del usuario
