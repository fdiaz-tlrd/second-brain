# ALB — estudio (ambientes × regiones)

| Campo | Valor |
|-------|-------|
| **Estado** | Alcance amplio. **Sandbox Oregon:** dump recibido; Unhealthy = 403 en health check ([hallazgo](sandbox-oregon/hallazgo-unhealthy-403.md)). |
| **Ambientes** | desarrollo (dev), sandbox, qa, producción |
| **Regiones** | Virginia (`us-east-1`), Oregon (`us-west-2`) |
| **Notas tuyas** | `second-brain/investigacion/ALB/` (solo lectura para el agente) |

## Matriz

| Ambiente | Virginia | Oregon |
|----------|----------|--------|
| desarrollo | — | — |
| sandbox | — | [dump + hallazgo 403](sandbox-oregon/00-estado-y-retomo.md) |
| qa | — | — |
| producción | — | — |

Una carpeta por celda cuando entre en juego: `dev-virginia/`, `sandbox-oregon/`, etc.

## Retomo

1. Sandbox Oregon: causa Unhealthy documentada (403 vs matcher 200).
2. Texto didáctico: [`explicacion-alb-para-programadores.md`](explicacion-alb-para-programadores.md).
3. Seguir con otras celdas / confirmación VPCe / revisión de mappings cuando lo indiques.
