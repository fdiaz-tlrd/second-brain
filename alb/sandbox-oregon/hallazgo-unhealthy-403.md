# Hallazgo — Unhealthy por 403 en health check (no por timeout)

| Campo | Valor |
|-------|-------|
| **Fecha dump** | 2026-09-23 (carpeta traída por el usuario) |
| **Fuente** | [`alb-sandbox-oregon-raw/`](alb-sandbox-oregon-raw/) |
| **TG** | `vpc-endpoint-apis-oregon` |
| **Estado targets** | 3/3 `unhealthy` |

## Qué dice AWS (literal)

`08-target-health.json` — los tres IPs:

| Id (IP) | AZ | Puerto | Reason | Description |
|---------|----|--------|--------|-------------|
| `10.250.43.218` | us-west-2b | 443 | `Target.ResponseCodeMismatch` | Health checks failed with these codes: **[403]** |
| `10.250.44.222` | us-west-2c | 443 | idem | idem |
| `10.250.42.170` | us-west-2a | 443 | idem | idem |

**No** es `Target.Timeout`, `Target.FailedHealthChecks` por red, ni target no registrado. El ALB **llegó** al destino por HTTPS y recibió **HTTP 403**.

## Health check configurado

De `06-target-group-vpc-endpoint-apis-oregon.json`:

| Parámetro | Valor |
|-----------|-------|
| Protocol / port | HTTPS / traffic-port (443) |
| Path | `/` |
| Matcher | **solo `200`** |
| Interval / timeout | 30 s / 5 s |
| Thresholds | healthy 5 / unhealthy 2 |
| Target type | `ip` |

El check pide `HTTPS https://<IP-del-target>:443/` y exige status **200**. Recibe **403** → Unhealthy.

## Qué implica (y qué no)

1. **Conectividad ALB → IPs: OK** (hay respuesta HTTP). El SG del ALB (`sg-01104037a6ec8d4e0`, `alb-sandbox-oregon-sg`) permite 80/443; egress abierto. Un fallo de SG/NACL típico sería timeout, no 403.
2. **El 403 es del servicio detrás de esas IPs** (patrón de **VPC endpoint / API Gateway privado** respondiendo Forbidden a una petición sin el `Host` de custom domain / sin ruta válida). El health check del ALB **no** envía los `host-header` de las reglas del listener (`tld-*.sand.telered.internal`); pega a la IP con path `/`.
3. **Unhealthy en consola ≠ “el ALB no enruta”.** Con todos los targets unhealthy, el ALB por defecto **sigue enviando tráfico** a esos targets (fail-open del target group). El tráfico real con Host correcto **puede** funcionar igual; el health check solo mide mal el “vivo” del VPCe.

## Listener / enrutamiento (contexto)

- HTTPS:443 — reglas por `host-header` → **todas** forward al mismo TG `vpc-endpoint-apis-oregon`; default = fixed 503.
- HTTP:80 — redirect 301 a HTTPS.
- Hosts sand (muestra): `tld-api-alias`, `tld-api-cuenta-nombre`, `tld-preg-seguridad`, `tld-api-p2m`, `tld-achx`, `tld-validador-dummy`, etc. (lista completa en `04-rules-listener-0.json`).

## Relación con otros hallazgos

En `tld-preg-seguridad`, Oregon sin custom-domain mapping también responde **403** en API Gateway (sin invocar lambda). Aquí el 403 del **health check** es otro síntoma de “APIGW/VPCe rechaza la petición”, no prueba por sí solo que falte un mapping concreto de una API.

## Pendiente (no inventado; falta evidencia)

- Confirmar en consola/CLI que las 3 IPs son ENIs del VPCe execute-api de sandbox Oregon.
- Decidir si el matcher del TG debería aceptar `403` (práctica habitual en health checks a APIGW privado) u otra ruta/código — **eso es cambio de infra; no se asume aquí.**
