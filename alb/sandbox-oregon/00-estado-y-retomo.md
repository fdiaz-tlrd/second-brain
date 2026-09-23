# Sandbox Oregon — ALB

| Campo | Valor |
|-------|-------|
| **Estado** | Pedido de dumps AWS CLI. Sin salida aún. |
| **Ambiente** | sandbox |
| **Región** | `us-west-2` (Oregon) |
| **Cuenta** | `807262913923` |
| **ALB** | `alb-sandbox-oregon` |
| **ARN ALB** | `arn:aws:elasticloadbalancing:us-west-2:807262913923:loadbalancer/app/alb-sandbox-oregon/bc8e26a049c22e57` |
| **DNS** | `internal-alb-sandbox-oregon-650577187.us-west-2.elb.amazonaws.com` |
| **Target group (UI)** | `vpc-endpoint-apis-oregon` — 3 destinos **Unhealthy** |
| **Notas tuyas** | `second-brain/investigacion/ALB/sandbox.md` |
| **Comandos** | [`dump-alb-sandbox-oregon.ps1`](dump-alb-sandbox-oregon.ps1) ([nota](comandos-aws-cli.md)) |
| **Salidas** | `raw/` |

## Qué estudiamos aquí

Por qué los 3 destinos del TG `vpc-endpoint-apis-oregon` aparecen Unhealthy detrás de este ALB interno.

## Retomo

1. Ejecutar [`dump-alb-sandbox-oregon.ps1`](dump-alb-sandbox-oregon.ps1) en la máquina con AWS CLI.
2. Traer los JSON a `second-brain/alb/sandbox-oregon/raw/`.
3. Con eso: health check, SG, listeners, IPs/puertos de los targets.
