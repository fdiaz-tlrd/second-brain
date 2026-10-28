# Sandbox Oregon — ALB

| Campo | Valor |
|-------|-------|
| **Estado** | Dump 2026-09-23 en `aws-infra-dumps`. Unhealthy = 403 + matcher solo `200` (Virginia acepta `200-403`). Mappings ALB Hosts: 14/14 OK. Cert listener `24db24a6` sigue el de la UI caducada. |
| **Ambiente** | sandbox |
| **Region** | `us-west-2` (Oregon) |
| **Cuenta** | `807262913923` |
| **ALB** | `alb-sandbox-oregon` |
| **ARN ALB** | `arn:aws:elasticloadbalancing:us-west-2:807262913923:loadbalancer/app/alb-sandbox-oregon/bc8e26a049c22e57` |
| **DNS** | `internal-alb-sandbox-oregon-650577187.us-west-2.elb.amazonaws.com` |
| **VPC** | `vpc-0114fe781e9c2d449` |
| **SG ALB** | `sg-01104037a6ec8d4e0` |
| **TG** | `vpc-endpoint-apis-oregon` — 3/3 **unhealthy** (403) |
| **Notas tuyas** | `second-brain/investigacion/ALB/sandbox.md` |
| **Dump canonico** | https://github.com/fdiaz-tlrd/aws-infra-dumps → `raw/sandbox/oregon/` |
| **Comparacion VA/OR** | [`../comparacion-sandbox-virginia-oregon.md`](../comparacion-sandbox-virginia-oregon.md) |
| **Hallazgos previos** | [`hallazgo-unhealthy-403.md`](hallazgo-unhealthy-403.md) · [`hallazgo-mappings-y-cert.md`](hallazgo-mappings-y-cert.md) |
| **Corregir** | [`corregir-oregon.md`](corregir-oregon.md) |

## Que quedo claro con el dump dual

1. **Unhealthy:** mismo 403 en health check `/`; la diferencia con Virginia es el **matcher** (`200` vs `200-403`).
2. **Mappings de Hosts del ALB:** todos OK en este dump (post correcciones del usuario).
3. **Cert** del listener HTTPS: sigue `24db24a6-…` (caducado en notas UI). Independiente del Unhealthy.

## Que esta mal en Oregon (sandbox)

1. Health check Unhealthy: pide `200`, recibe `403`.
2. Certificado HTTPS del ALB caducado.
3. Frente a Virginia: alla aceptan `200-403` (healthy) y hay mas Hosts en el ALB.

## Diseno de trafico (usuario, 2026-09-23)

- **Region principal:** Virginia. El trafico debe ir por Virginia.
- **Oregon:** respaldo si Virginia falla (failover).

Con eso: Oregon tiene que poder recibir trafico real. Unhealthy + cert caducado + Hosts de menos **si importan** en failover, no son “ruido de una region que nadie usa”.
