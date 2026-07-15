# Estado actual — VCN (handoff sesión)

**Actualizar este archivo al cerrar cada bloque de trabajo.** La nueva instancia del agente lee esto primero.

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-07-15 |
| **Tema activo (pausado)** | Revisión humana **prod vs Dig** vía super-tabla — no A11 |
| **Punto de entrada** | [`../super-tabla-prod-dev/vcn/00-estado-y-retomo.md`](../super-tabla-prod-dev/vcn/00-estado-y-retomo.md) |
| **Documento de trabajo** | [`../super-tabla-prod-dev/vcn/bloques-diferencias-prod-vs-dev.md`](../super-tabla-prod-dev/vcn/bloques-diferencias-prod-vs-dev.md) (**46** bloques) |
| **Juicio al pausar** | Diferencias a groso modo **justificables**; justificación formal bloque a bloque **no** terminada |
| **Siguiente servicio acordado** | Igual patrón en **P2P** cuando el usuario lo indique |

## Qué quedó cerrado en Dig (runtime)

| Tema | Evidencia |
|------|-----------|
| SWIFT `validador` ≤8 | Newman dig `18-49-44Z`; salió de vista prod≠Dig |
| Matriz ops 0001 3×3 + 481/482 | Mismo Newman; Postman en `5_matrizOps0001` |
| Modelo 481/482/418/500 | Código en `feature/ARQ-225_Refactory` |

## Hilo anterior A0–A11 (no mezclar)

Baseline histórico checklist: General / método 0001 / etc. Ver [`02-checklist-errores-vcn-general.md`](./02-checklist-errores-vcn-general.md). **A11 éxito** no es el foco de esta pausa.

## Reglas agente

- Newman **solo VPN** — [`05-newman-vpn-reglas-agente.md`](./05-newman-vpn-reglas-agente.md)
- Documentar en `second-brain/` al cerrar o pausar — no preguntar
- **No** regenerar super-tabla con JSON dig obsoleto
- Pruebas = cobertura **exhaustiva** del modelo afirmado (regla conducta)

## Enlaces rápidos

| Tema | Archivo |
|------|---------|
| Super-tabla VCN retomo | [../super-tabla-prod-dev/vcn/00-estado-y-retomo.md](../super-tabla-prod-dev/vcn/00-estado-y-retomo.md) |
| Checklist histórico | [02-checklist-errores-vcn-general.md](./02-checklist-errores-vcn-general.md) |
| Newman folders | [Postman/generador/README.md](../Postman/generador/README.md) |
| Última corrida | [Postman/generador/logs/ultima-corrida-vcn.md](../Postman/generador/logs/ultima-corrida-vcn.md) |
| Canales dig | [Postman/canalesPruebas-dev/](../Postman/canalesPruebas-dev/) |
| Matriz Dig | [../tld-validador-api/vcn-matriz-permisos-emisor-validador-0001-2026-07-15.md](../tld-validador-api/vcn-matriz-permisos-emisor-validador-0001-2026-07-15.md) |
