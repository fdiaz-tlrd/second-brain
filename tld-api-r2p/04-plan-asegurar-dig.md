# Plan — asegurar R2P Dig correcto (cambios ya aplicados)

| Campo | Valor |
|-------|-------|
| Actualizado | 2026-07-15 |
| Meta | **Asegurar** que lo ya cambiado en Dig esté **correcto** |
| Anclas | Prod R2P = negocio · VCN Dig = Invoke/proxy |
| Cruce Fase 1 | [`10-cruce-vcn-dig-x-prod-r2p.md`](./10-cruce-vcn-dig-x-prod-r2p.md) |
| Gaps vivos | [`07-fase1-gaps-r2p-vs-espejo-vcn.md`](./07-fase1-gaps-r2p-vs-espejo-vcn.md) (G1–G7) |
| Fase 2 orden | [`11-fase2-orden-fixes.md`](./11-fase2-orden-fixes.md) |

## Principios

1. Estudio de campo con **doble ancla** (prod + VCN Dig).
2. Juicio antes de código; planes **vivos** e iterativos.
3. Correcto = negocio prod + contratos Dig + init limpio.
4. No mejoras nuevas de otros repos.

## Fases

### Fase 0 — Marco — **hecho**

### Fase 1 — Estudio — **afianzada**

| # | Entrega | Estado |
|---|---------|--------|
| 1.1–1.2 | Contratos VCN Dig Invoke + proxy | Hecho (`05`, `06`) |
| 1.3 | Mapa Dig R2P | Hecho (`07` inicial) |
| 1.4 | Prod flujo + tld-util | Hecho (`08`) |
| 1.5 | Opinión doble ancla | Hecho (`09`) |
| 1.6 | **Cruce** VCN Dig × Prod R2P × Dig R2P | Hecho (`10`) |
| 1.7 | Gaps actualizados G1–G7 | Hecho (`07`) |

### Fase 2 — Orden de fixes — **escrito / congelado para ejecutar**

Ver [`11-fase2-orden-fixes.md`](./11-fase2-orden-fixes.md) (iters 3.1–3.5).

### Fase 3 — Ejecución — **en curso**

| Iter | Estado |
|------|--------|
| 3.1 (G1+G6) | **Hecha** |
| 3.2 (G2) | **Hecha** — [`12`](./12-estudio-idTransaccionAutopista-fechaHora-flujo-prod.md) |
| 3.3 (G3) | **Hecha** |
| 3.4 (G4) | **Hecha** — [`13`](./13-auditoria-g4-lambdaResult.md); sin cambio código |
| 3.5 (G5+G7) | **Hecha** — [`14`](./14-cierre-3-5-g5-g7.md) |

### Fase 4 — cierre operativo

Deploy Dig + Newman (VPN) + push: **a demanda del usuario**. Checklist doc: ver [`11`](./11-fase2-orden-fixes.md).

Commits: cluster transporte 3.1–3.3 en `tld-api-r2p` `6fece92`.

Una iteración = un renglón de `11` + doc de aseguramiento + commit si el usuario lo pide.

### Fase 4 — Cierre — pendiente

## Próximo paso inmediato

Cuando el usuario diga: **Fase 3 / iter 3.1** (G1+G6 — quitar require muerto preservando `getResultado`).
