# Estado actual — VCN (handoff sesión)

**Actualizar este archivo al cerrar cada bloque de trabajo.** La nueva instancia del agente lee esto primero.

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-07-05 |
| **Baseline Newman verificado** | VCN completo **1008/1008** (416 req) — log `aee0972`, 2026-07-05T23:19Z |
| **Bloque cerrado** | A9 — `2_respuestaCanalValidador` 510–515 × 8 validadores (48 esc.) |
| **Bloque en curso** | A10 — endurecer `1_cuenta` 413 (10 → **20** escenarios) |
| **Siguiente bloque** | A11 — `3_respuestaExitosa` (resultado 0) |

## Qué acaba de hacerse (A10)

1. Generador `generar-escenarios-0001-cuenta-413.js` — **20** JSON en `Metodo/0001/1_validaciones_js/1_cuenta/`
2. `Post-response.js`: tipo **`exito`** para escenarios de éxito (A11)
3. Carpeta `Metodo/0001/3_respuestaExitosa/` + README (plan A11)
4. Triage [`10-cuenta-413`](./triage/10-cuenta-413-validaciones-js.md), [`11-respuesta-exitosa`](./triage/11-respuesta-exitosa-metodo-0001.md)
5. Colección regenerada (`armar-coleccion.js config-vcn.json`)

## Pendiente inmediato (usuario VPN)

```powershell
cd Postman/generador
node run-newman.js vcn --folder "Metodo/0001/1_validaciones_js/1_cuenta"
node run-newman.js vcn
git add logs/ Postman/generador/
git commit -m "Newman VCN — 1_cuenta 20/20 + regresión completa"
git push
```

Tras push: actualizar baseline en [`02-checklist-errores-vcn-general.md`](./02-checklist-errores-vcn-general.md) y fila superior de este archivo.

## Después de A10 (A11)

1. Implementar `generar-escenarios-0001-respuesta-exitosa.js`
2. JSON bajo `3_respuestaExitosa/` (básico → PACA/PACC → jurídica → máscaras → límites)
3. Newman por subcarpeta → completo → commit logs → actualizar checklist/triage/ESTADO-ACTUAL

## Reglas agente

- Newman **solo VPN** — [`05-newman-vpn-reglas-agente.md`](./05-newman-vpn-reglas-agente.md)
- **Siempre** actualizar doc (checklist, triage, ESTADO-ACTUAL, README) — no preguntar
- **No** renombrar `VCN Escenarios error`

## Enlaces rápidos

| Tema | Archivo |
|------|---------|
| Checklist | [02-checklist-errores-vcn-general.md](./02-checklist-errores-vcn-general.md) |
| Newman folders | [Postman/generador/README.md](../Postman/generador/README.md) |
| Logs | [Postman/generador/logs/registro-vcn.md](../Postman/generador/logs/registro-vcn.md) |
| Canales dev | [Postman/canalesPruebas-dev/](../Postman/canalesPruebas-dev/) |
