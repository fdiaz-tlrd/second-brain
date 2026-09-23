# Sandbox Oregon — ALB

| Campo | Valor |
|-------|-------|
| **Estado** | Tres hilos: (1) Unhealthy = 403 health check; (2) mappings faltantes corregidos por el usuario; (3) cert del listener HTTPS **caducado**. |
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
| **Script** | [`dump-alb-sandbox-oregon.ps1`](dump-alb-sandbox-oregon.ps1) · [`revisar-dominios-personalizados.ps1`](revisar-dominios-personalizados.ps1) |
| **Salidas** | [`alb-sandbox-oregon-raw/`](alb-sandbox-oregon-raw/) · `dominios-personalizados-raw/` (cuando lo corras) |
| **Hallazgos** | [`hallazgo-unhealthy-403.md`](hallazgo-unhealthy-403.md) · [`hallazgo-mappings-y-cert.md`](hallazgo-mappings-y-cert.md) |
| **Explicación** | [`../explicacion-alb-para-programadores.md`](../explicacion-alb-para-programadores.md) |

## Qué estudiamos aquí

1. **Unhealthy del TG** — health check HTTPS `/` espera 200, recibe 403 ([detalle](hallazgo-unhealthy-403.md)).
2. **Mappings** — al menos 4 dominios sand tenían regla ALB sin mapping APIGW; el usuario los mapeó ([detalle](hallazgo-mappings-y-cert.md)).
3. **TLS del ALB** — listener HTTPS usa cert `24db24a6-…` marcado Caducada (venc. 2025-11-22) ([detalle](hallazgo-mappings-y-cert.md)).

## Retomo

1. ~~Dump~~ · ~~Unhealthy 403~~ · ~~Mappings (4 corregidos en notas)~~ · cert caducado **sigue** en el listener según dump + UI.
2. Pendiente solo si lo pedís: auditar mappings del resto de Hosts (`revisar-dominios-personalizados.ps1`); renovar/asignar cert válido al listener; matcher del TG.
