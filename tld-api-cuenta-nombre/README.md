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
| [02-checklist-errores-vcn-general.md](./02-checklist-errores-vcn-general.md) | **Checklist vivo** — A1–A3 cerradas (49/78 escenarios OK) |
| [03-estrategia-transversal-vs-parche.md](./03-estrategia-transversal-vs-parche.md) | Opinión: meta transversal = base; ejecución incremental |
| [04-decision-fase-a-dividida.md](./04-decision-fase-a-dividida.md) | **Decisión:** Fase A en A0–A5; A3 cerrada; **A4 en curso** |
| [referencia-produccion.md](./referencia-produccion.md) | Prod congelada — existe; **fuera de alcance ahora**; nunca modificar |
| [triage/00-estructura-vs-base.md](./triage/00-estructura-vs-base.md) | Triage #0 — inventario VCN dev vs base |
| [triage/02-idCanal.md](./triage/02-idCanal.md) | Triage #2 — **A1 cerrada** (Newman 14/14) |
| [triage/03-validador.md](./triage/03-validador.md) | Triage #3 — **A2 cerrada** (Newman 15/15) |
| [triage/04-peticion.md](./triage/04-peticion.md) | Triage #4 — **A3 cerrada** (Newman 13/13) |
| [triage/05-idPeticion-solicitudes.md](./triage/05-idPeticion-solicitudes.md) | Triage #5 — **A4** idPeticion + solicitudes (código listo; pendiente Newman) |
| [triage/01-json-entrada.md](./triage/01-json-entrada.md) | Triage #1 — validar que la entrada sea JSON |

## Referencias externas

- Producción (solo awareness; no en alcance ahora): [referencia-produccion.md](./referencia-produccion.md)
- Resultado pruebas Postman: [`../notas-sueltas/resultado_prueba.md`](../notas-sueltas/resultado_prueba.md)
- QA equipo: [`../Postman/equipo-pruebas/Validacion Cuenta Nombre/`](../Postman/equipo-pruebas/Validacion%20Cuenta%20Nombre/) — no modificar `estudio-coleccion-vcn.md`

## Estado

| Fecha | Hito |
|-------|------|
| 2026-07-04 | Carpeta creada |
| 2026-07-04 | Enfoque de corrección documentado |
| 2026-07-05 | Checklist Newman General VCN (`02-checklist-errores-vcn-general.md`, 63 fallos / 15 OK) |
| 2026-07-05 | Idea común VCN/P2P/P2M + repos autónomos + base solo estudio (enlace a `tld-api-base/`) |
| 2026-07-05 | Triage #0 estructura vs base; estrategia transversal vs parche |
| 2026-07-05 | Decisión Fase A dividida (A0–A5); próximo código A0+A1 idCanal |
| 2026-07-05 | Aclaración prod master: referencia futura, fuera de alcance ahora (no copiar ni parchear) |
| 2026-07-05 | **A0+A1** código + Newman **14/14** idCanal (run 07:12) |
| 2026-07-05 | Generador: `bootstrap-general-vcn.js` (UTF-8 escenarios unicode) |
| 2026-07-05 | **A2** validador — Newman **15/15** (run 07:38); commit `4e96a57` |
| 2026-07-05 | **A3** petición — Newman **13/13** (run 07:53); commit `4b599d5` |
| 2026-07-05 | **A4** idPeticion + solicitudes — triage `05-idPeticion-solicitudes.md` + código; pendiente deploy/Newman |
| 2026-07-05 | **TEMP** `template.yaml` `CFG_METODOS_LIMITES_JSON` → `{"0001":2}` para Newman 5.9; **revertir a 1 cuando VCN finalizado** (triage 05) |

## Convención de triage

Cada archivo en `triage/` sigue:

1. **Qué valida** (orden en el handler)
2. **P2M** — comportamiento y rutas de código
3. **P2P** — igual o divergencia respecto a P2M
4. **VCN hoy** — comportamiento actual
5. **Gap** — diferencias relevantes para contrato / pruebas
6. **Acción** — cambio propuesto en `tld-api-cuenta-nombre` (pendiente / hecho)
7. **Pruebas** — escenario Postman o manual que lo cubre
