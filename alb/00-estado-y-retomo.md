# ALB — estudio (ambientes × regiones)

| Campo | Valor |
|-------|-------|
| **Estado** | Sandbox VA+OR dumpado. Principal=Virginia; Oregon=failover. **Unhealthy Oregon = OK (proveedor); no cambiar matcher.** |
| **Ambientes** | desarrollo (dev), sandbox, qa, produccion |
| **Regiones** | Virginia (`us-east-1`) **principal**; Oregon (`us-west-2`) **failover** |
| **Trafico** | Todo por Virginia; si falla Virginia → Oregon. |
| **Dumps** | https://github.com/fdiaz-tlrd/aws-infra-dumps |
| **Acuerdo** | No empujar cambio de matcher. Unhealthy = explicable (403 + matcher 200). **No** afirmar que Unhealthy “fuerza Virginia”; eso es incorrecto y deja mal al usuario. |
| **Comparacion sandbox** | [`comparacion-sandbox-virginia-oregon.md`](comparacion-sandbox-virginia-oregon.md) |
| **Explicacion** | [`explicacion-alb-para-programadores.md`](explicacion-alb-para-programadores.md) |

## Matriz

| Ambiente | Virginia | Oregon |
|----------|----------|--------|
| desarrollo | — | — |
| sandbox | [revisado](sandbox-virginia/00-estado-y-retomo.md) | [revisado](sandbox-oregon/00-estado-y-retomo.md) — [corregir](sandbox-oregon/corregir-oregon.md) |
| qa | — | — |
| produccion | — | — |

## Retomo

1. Matcher Oregon: **no cambiar** (leccion 2026-09-23).
2. Cert Oregon: pendiente solo si el usuario lo confirma.
3. Esperando dumps: `aws-infra-dumps\scripts\dump-por-ambiente.ps1 -Ambiente Sandbox|QA|Produccion` (baja todos los ALB de la cuenta activa; Virginia y Oregon).
4. Siguiente ambiente/region cuando lleguen los raw.