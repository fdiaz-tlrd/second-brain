# tld-api-cuenta-nombre (VCN)

Espacio de trabajo en `second-brain` para **estudiar y corregir** el repositorio [`tld-api-cuenta-nombre`](../../tld-api-cuenta-nombre). **Trabajo activo:** VCN.

| API | Repositorio |
|-----|-------------|
| **VCN** | `tld-api-cuenta-nombre` |
| P2P | `tld-api-alias` |
| P2M | `tld-api-p2m` |

## Propósito de esta carpeta

- **Memoria viva** del hilo VCN: el agente documenta aquí todo lo analizado o acordado para recuperar contexto **sin re-leer** repos ni transcripts.
- **No** se mueven archivos de otras rutas (`notas-sueltas/`, `Postman/`, etc.); solo referencias.
- **No** incluye cambios al generador Postman VCN.

VCN comparte **idea transversal** con P2M y P2P; P2M/P2P están más pulidos. De ellos salió `tld-api-base` (**solo estudio, nunca productivo**) — ver [`../tld-api-base/README.md`](../tld-api-base/README.md). **Repos autónomos:** VCN no depende de otros repos; se copia/adapta el patrón adentro de `tld-api-cuenta-nombre`. Los repos de producto y base **NUNCA se ven entre sí**.

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [01-enfoque-correccion.md](./01-enfoque-correccion.md) | Estrategia: P2M/P2P como referencia, qué portar a VCN, qué no copiar |
| [02-checklist-errores-vcn-general.md](./02-checklist-errores-vcn-general.md) | **Checklist vivo** — 63 escenarios General que fallan (debe vs está); marcar al resolver |
| [triage/01-json-entrada.md](./triage/01-json-entrada.md) | Triage #1 — validar que la entrada sea JSON |

## Referencias externas (solo lectura)

- Resultado pruebas Postman: [`../notas-sueltas/resultado_prueba.md`](../notas-sueltas/resultado_prueba.md)
- QA equipo: [`../Postman/equipo-pruebas/Validacion Cuenta Nombre/`](../Postman/equipo-pruebas/Validacion%20Cuenta%20Nombre/) — no modificar `estudio-coleccion-vcn.md`

## Estado

| Fecha | Hito |
|-------|------|
| 2026-07-04 | Carpeta creada |
| 2026-07-04 | Enfoque de corrección documentado |
| 2026-07-05 | Checklist Newman General VCN (`02-checklist-errores-vcn-general.md`, 63 fallos / 15 OK) |
| 2026-07-05 | Idea común VCN/P2P/P2M + repos autónomos + base solo estudio (enlace a `tld-api-base/`) |

## Convención de triage

Cada archivo en `triage/` sigue:

1. **Qué valida** (orden en el handler)
2. **P2M** — comportamiento y rutas de código
3. **P2P** — igual o divergencia respecto a P2M
4. **VCN hoy** — comportamiento actual
5. **Gap** — diferencias relevantes para contrato / pruebas
6. **Acción** — cambio propuesto en `tld-api-cuenta-nombre` (pendiente / hecho)
7. **Pruebas** — escenario Postman o manual que lo cubre
