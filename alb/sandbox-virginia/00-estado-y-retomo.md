# Sandbox Virginia — ALB

| Campo | Valor |
|-------|-------|
| **Estado** | Dump 2026-09-23 revisado. TG VPCe **healthy** (matcher `200-403`). |
| **Ambiente** | sandbox |
| **Region** | `us-east-1` (Virginia) |
| **Cuenta** | `807262913923` |
| **ALB** | `alb-sandbox` (1 de 2 ALBs en region; el otro no matcheo `*sandbox*`) |
| **Dump** | `aws-infra-dumps` → `raw/sandbox/virginia/` |
| **Comparacion** | [`../comparacion-sandbox-virginia-oregon.md`](../comparacion-sandbox-virginia-oregon.md) |
| **Explicacion** | [`../explicacion-alb-para-programadores.md`](../explicacion-alb-para-programadores.md) |

## Target groups

| TG | Tipo | Health |
|----|------|--------|
| `vpc-endpoint-apis-virginia` | ip :443 | **healthy** (3/3) |
| `pac-internal-api-tg` | instance :3000 | healthy |
| `pac-internal-ui-tg` | instance :8080 | healthy |

Matcher VPCe: HTTPS `/`, **HttpCode `200-403`**.

## Mappings (Hosts ALB)

Casi todos OK. Sin custom domain en listado APIGW: `pac.sand.telered.internal`, `*.sand.telered.internal.pci` (ver comparacion).

## Retomo

Usar Virginia como referencia de matcher del TG VPCe al discutir Oregon Unhealthy.
