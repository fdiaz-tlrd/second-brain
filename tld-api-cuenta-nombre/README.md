# tld-api-cuenta-nombre (VCN)

Espacio de trabajo en `second-brain` para **estudiar y corregir** el repositorio [`tld-api-cuenta-nombre`](../../tld-api-cuenta-nombre). **Trabajo activo:** VCN.

**Handoff sesión:** [`ESTADO-ACTUAL.md`](./ESTADO-ACTUAL.md) — leer primero.  
**Tema pausado (2026-07-15):** revisión prod≠Dig → [`../super-tabla-prod-dev/vcn/00-estado-y-retomo.md`](../super-tabla-prod-dev/vcn/00-estado-y-retomo.md).

**Agente:** antes de Newman → [`05-newman-vpn-reglas-agente.md`](./05-newman-vpn-reglas-agente.md). **No correr `run-newman.js` sin VPN confirmada por el usuario.**

| API | Repositorio |
|-----|-------------|
| **VCN** | `tld-api-cuenta-nombre` |
| P2P | `tld-api-alias` |
| P2M | `tld-api-p2m` |

## Propósito de esta carpeta

- **Memoria viva** del hilo VCN: el agente documenta aquí todo lo analizado o acordado para recuperar contexto **sin re-leer** repos ni transcripts.
- **No** se mueven archivos de otras rutas salvo copias fijas en carpetas del tema; solo referencias.
- Tras cada bloque de escenarios Newman: **actualizar checklist, triage y README** en esta carpeta (no preguntar).

VCN comparte **idea transversal** con P2M y P2P; P2M/P2P están más pulidos. De ellos salió `tld-api-base` (**solo estudio, nunca productivo**) — ver [`../tld-api-base/README.md`](../tld-api-base/README.md). **Repos autónomos:** VCN no depende de otros repos; se copia/adapta el patrón adentro de `tld-api-cuenta-nombre`. Los repos de producto y base **NUNCA se ven entre sí**.

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [01-enfoque-correccion.md](./01-enfoque-correccion.md) | Estrategia: P2M/P2P como referencia, qué portar a VCN, qué no copiar |
| [02-checklist-errores-vcn-general.md](./02-checklist-errores-vcn-general.md) | **Checklist vivo** — General **80/80**; VCN completo **1098/1098** |
| [03-estrategia-transversal-vs-parche.md](./03-estrategia-transversal-vs-parche.md) | Opinión: meta transversal = base; ejecución incremental |
| [04-decision-fase-a-dividida.md](./04-decision-fase-a-dividida.md) | **Decisión:** Fase A + `2_validador` **cerradas**; A9 respuesta canal validador **510–515 cerrada** |
| [**05-newman-vpn-reglas-agente.md**](./05-newman-vpn-reglas-agente.md) | **OBLIGATORIO agente:** Newman solo con VPN; no interpretar `ENOTFOUND` |
| [referencia-produccion.md](./referencia-produccion.md) | Prod congelada — existe; **fuera de alcance ahora**; nunca modificar |
| [triage/00-estructura-vs-base.md](./triage/00-estructura-vs-base.md) | Triage #0 — inventario VCN dev vs base |
| [triage/02-idCanal.md](./triage/02-idCanal.md) | Triage #2 — **A1 cerrada** (Newman 14/14) |
| [triage/03-validador.md](./triage/03-validador.md) | Triage #3 — **A2 cerrada** (Newman **14/14**; `1.2.15` eliminado en VCN) |
| [triage/04-peticion.md](./triage/04-peticion.md) | Triage #4 — **A3 cerrada** (Newman 13/13) |
| [triage/05-idPeticion-solicitudes.md](./triage/05-idPeticion-solicitudes.md) | Triage #5 — **A4 cerrada** (Newman 66/66 `1_validaciones_js`) |
| [triage/06-plan-env.md](./triage/06-plan-env.md) | Triage #6 — **A5 cerrada** (Newman 4/4 `1_idCanal`, run 09:28) |
| [triage/07-getCanal-contrato-http.md](./triage/07-getCanal-contrato-http.md) | Triage #7 — **A7 cerrada** (fix 2.1.3 HTTP 500) |
| [triage/08-2_validador-reglaNegocio.md](./triage/08-2_validador-reglaNegocio.md) | Triage #8 — **A8 cerrada** (Newman 3/3; P6 → 500 dev) |
| [triage/09-respuesta-canal-validador-510-515.md](./triage/09-respuesta-canal-validador-510-515.md) | Triage #9 — **A9 cerrada** (48 escenarios 510–515 × 8 validadores; VCN **1008/1008**) |
| [triage/10-cuenta-413-validaciones-js.md](./triage/10-cuenta-413-validaciones-js.md) | Triage #10 — **A10 cerrada** (20 escenarios 413; VCN **1098/1098**) |
| [triage/11-respuesta-exitosa-metodo-0001.md](./triage/11-respuesta-exitosa-metodo-0001.md) | Triage #11 — **A11 planificado** (`3_respuestaExitosa`, tipo `exito`) |
| [**ESTADO-ACTUAL.md**](./ESTADO-ACTUAL.md) | **Handoff** — qué sigue si se corta la sesión |
| [triage/01-json-entrada.md](./triage/01-json-entrada.md) | Triage #1 — validar que la entrada sea JSON |

## Referencias externas

- Producción (solo awareness; no en alcance ahora): [referencia-produccion.md](./referencia-produccion.md)
- Resultado pruebas Postman: [`datos-prueba-dev/resultado_prueba.md`](./datos-prueba-dev/resultado_prueba.md)
- **Datos prueba dev A11:** [`datos-prueba-dev/vcn-datos-prueba-dev-metodo-0001-exito.md`](./datos-prueba-dev/vcn-datos-prueba-dev-metodo-0001-exito.md)
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
| 2026-07-05 | **A2 regresión** — escenario **1.2.15** eliminado VCN; **14/14** + General **80/80** |
| 2026-07-05 | **A3** petición — Newman **13/13** (run 07:53); commit `4b599d5` |
| 2026-07-05 | **A4** idPeticion + solicitudes — Newman **66/66** `1_validaciones_js` (run 08:17); commit `aa87fd2` |
| 2026-07-05 | **TEMP** `template.yaml` `CFG_METODOS_LIMITES_JSON` → `{"0001":2}` para Newman 5.9; **revertir a 1 cuando VCN finalizado** (triage 05) |
| 2026-07-05 | **A5 + A7** cerradas — Newman `1_idCanal` **4/4** (run 09:28); commit código `f162fe5` |
| 2026-07-05 | **Baseline General 78/78** — Newman `4_metodo` 12/12 + regresión `1_validaciones_js` 396/396 |
| 2026-07-05 | **A8** `2_reglaNegocio/2_validador` — debate cerrado; A8a deploy; Newman **3/3** + VCN **570/570** (19:51Z) |
| 2026-07-05 | **A9** `Metodo/0001/2_respuestaCanalValidador` — 48 escenarios códigos **510–515** × validadores **1008–1016**; Newman Metodo **522/522**, VCN completo **1008/1008** (23:19Z); commits `b4c400c`, `8df6084`, log `aee0972` |
| 2026-07-05 | **A10** `1_cuenta` 413 — **20/20**; Newman **1098/1098** (23:40Z); datos A11 en [`datos-prueba-dev/vcn-datos-prueba-dev-metodo-0001-exito.md`](./datos-prueba-dev/vcn-datos-prueba-dev-metodo-0001-exito.md) |
| 2026-07-05 | **A11** plan — `3_respuestaExitosa` en misma colección; `expectedTipo: exito` en Post-response |
| 2026-07-05 | **Principio rector:** mejorar código VCN, **no** cambiar reglas de negocio productivas — ver triage `08`, [referencia-produccion.md](./referencia-produccion.md) |

## Convención de triage

Cada archivo en `triage/` sigue:

1. **Qué valida** (orden en el handler)
2. **P2M** — comportamiento y rutas de código
3. **P2P** — igual o divergencia respecto a P2M
4. **VCN hoy** — comportamiento actual
5. **Gap** — diferencias relevantes para contrato / pruebas
6. **Acción** — cambio propuesto en `tld-api-cuenta-nombre` (pendiente / hecho)
7. **Pruebas** — escenario Postman o manual que lo cubre
