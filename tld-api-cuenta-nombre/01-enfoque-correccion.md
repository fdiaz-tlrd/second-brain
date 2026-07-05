# Enfoque de corrección VCN

Documento de referencia acordado en chat (2026-07-04). Actualizar cuando cambie la estrategia.

## Contexto

P2M, P2P y VCN debían compartir la **misma estructura transversal** (validaciones de entrada, canales, petición cifrada, idPeticion, solicitudes, respuestas de error). P2M y P2P recibieron refactor y mantenimiento; **VCN quedó atrás** en ese esqueleto.

Las pruebas Postman General sobre VCN fallaron; **Metodo/0001 (validación de `cuenta` → 413) pasó**. Conclusión: la rama de negocio VCN funciona; lo desalineado es el **camino transversal** en `lambdas/cuenta-nombre/app.js` y módulos relacionados.

**Alcance de corrección:** solo `tld-api-cuenta-nombre`. No tocar generador Postman VCN.

## Referencia: P2M y P2P

Usar P2M/P2P como **especificación viva** del contrato que las pruebas General ejercitan.

Patrón común (post-refactor):

| Pieza | Rol |
|-------|-----|
| `parsearYValidarEntrada` | Primer paso: parsear `event` → cuerpo JSON |
| `resolverCanalEmisor` | `validaciones.validarParametroIdCanal` → `getCanal` → plan (opcional) |
| `resolverCanalValidador` | `validaciones.validarParametroValidador` → `getCanal` → estado |
| `resolverPeticion` | Validar campo cifrado, abrir paquete, validaciones globales de petición |
| `responderErrorSinCifrado` | HTTP + `{ codigoError, mensajeError }` sin cifrar |
| `responderValidacionConCifrado` | Error con respuesta cifrada al canal emisor |
| `lib/validaciones.js` | Reglas JS de parámetros (idCanal, validador, idPeticion, solicitudes, …) |
| `lib/catalogoRespuestas.js` | Textos de catálogo (`MSG_CATALOGO`, `mensajeErrorCanal`) |

P2M y P2P son **equivalentes** en el tramo transversal (mismo flujo en `app.js`); divergen solo en `lib/metodos.js`.

## Metodología acordada

1. **No** estudiar P2P↔P2M en abstracto durante semanas.
2. **Sí** recorrer las validaciones **en el mismo orden** que P2M/P2P, una por una.
3. Por cada paso: documentar triage en `triage/NN-….md` (P2M, P2P, VCN, gap, acción).
4. Usar [`02-checklist-errores-vcn-general.md`](./02-checklist-errores-vcn-general.md) como checklist de escenarios (debe vs está); [`../notas-sueltas/resultado_prueba.md`](../notas-sueltas/resultado_prueba.md) queda como histórico.
5. Corregir VCN en orden: **orden de validaciones** → **capa `validaciones.js`** → **forma de respuesta** → intacto: **0001 + validador-proxy + cuenta**.

## Qué portar a VCN

- Orden correcto de validaciones (ej.: no llamar `validatePlan` antes de comprobar campos obligatorios).
- Módulo o equivalente de `validaciones.js` para parámetros transversales.
- Helpers `responderErrorSinCifrado` / `responderValidacionConCifrado` alineados a P2M.
- Mensajes vía catálogo (`MSG_CATALOGO[400]` = *"Error en la petición original"*, etc.).

## Qué no copiar a ciegas

- `lib/metodos.js` de P2M/P2P (dominio distinto).
- Flujo **validador-proxy** y método **0001** — ya funciona; adaptar alrededor, no reemplazar.
- Suposición de que P2P y P2M difieren en transversal; si divergen, documentar antes de elegir referencia.

## Síntomas del resultado de pruebas (resumen)

| Bloque Postman | Síntoma típico en VCN |
|----------------|------------------------|
| 1.1 idCanal | Plan antes de campos; sin `validarParametroIdCanal`; 401 en lugar de 400 |
| 1.2 validador | Sin validación JS; 404/500 en lugar de 400 |
| 1.3 petición | 405 con mensaje de catálogo vs 400 genérico |
| 1.4 idPeticion | HTTP 200 + 509 validador vs HTTP 400 + código en claro |
| 1.5 solicitudes | Igual que idPeticion |
| 2.x regla negocio | Mezcla de códigos y HTTP |
| Metodo/0001 cuenta | OK |

## Próximo triage

Ver [triage/01-json-entrada.md](./triage/01-json-entrada.md). Siguiente previsto: **idCanal** (`validarParametroIdCanal` + orden vs plan).
