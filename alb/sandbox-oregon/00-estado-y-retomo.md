# Sandbox Oregon — ALB

| Campo | Valor |
|-------|-------|
| **Estado** | Dump recibido. Causa Unhealthy identificada: **403 en health check**. |
| **Ambiente** | sandbox |
| **Región** | `us-west-2` (Oregon) |
| **Cuenta** | `807262913923` |
| **ALB** | `alb-sandbox-oregon` (internal, active) |
| **ARN ALB** | `arn:aws:elasticloadbalancing:us-west-2:807262913923:loadbalancer/app/alb-sandbox-oregon/bc8e26a049c22e57` |
| **DNS** | `internal-alb-sandbox-oregon-650577187.us-west-2.elb.amazonaws.com` |
| **VPC** | `vpc-0114fe781e9c2d449` |
| **SG ALB** | `sg-01104037a6ec8d4e0` (`alb-sandbox-oregon-sg`) |
| **Target group** | `vpc-endpoint-apis-oregon` — 3 destinos **unhealthy** |
| **Notas tuyas** | `second-brain/investigacion/ALB/sandbox.md` |
| **Script** | [`dump-alb-sandbox-oregon.ps1`](dump-alb-sandbox-oregon.ps1) |
| **Salidas** | [`alb-sandbox-oregon-raw/`](alb-sandbox-oregon-raw/) |
| **Hallazgo** | [`hallazgo-unhealthy-403.md`](hallazgo-unhealthy-403.md) |
| **Explicación** | [`../explicacion-alb-para-programadores.md`](../explicacion-alb-para-programadores.md) |

## Qué estudiamos aquí

Por qué los 3 destinos del TG `vpc-endpoint-apis-oregon` aparecen Unhealthy.

**Respuesta (dump):** `Target.ResponseCodeMismatch` — health check HTTPS a `/` espera **200** y recibe **403**. No es timeout de red.

## Retomo

1. ~~Ejecutar dump~~ — hecho (`alb-sandbox-oregon-raw/`).
2. ~~Leer health / TG / listeners~~ — ver hallazgo 403.
3. Siguiente solo si lo pedís: confirmar IPs = ENIs del VPCe; comparar matcher con Virginia / otros ambientes.
