# VCN — super tabla prod vs Dig — estado y retomo

**Leer esto primero** al retomar la revisión humana de diferencias Dig vs producción.

| Campo | Valor |
|-------|-------|
| **Última actualización** | 2026-07-15 |
| **Fase** | **Pausa** — usuario cambia de tema; retoma cuando indique |
| **Trabajo del usuario** | Justificar cada diferencia Dig↔prod en [`bloques-diferencias-prod-vs-dev.md`](./bloques-diferencias-prod-vs-dev.md) |
| **Siguiente servicio (acuerdo)** | Mismo esfuerzo en **P2P** (`p2p/bloques-diferencias-prod-vs-dev.md`) cuando exista el par Newman y el generador lo emita |
| **Juicio del usuario al pausar** | A groso modo, las diferencias visibles **son justificables**; no se cerró bloque a bloque aún |

---

## Qué es este documento (y qué no)

- **Sí:** memoria de sesión para la **revisión de evidencia** (Newman → MD bloques → razón/justificación humana).
- **No:** checklist de escenarios VCN A0–A11 (eso sigue en [`../tld-api-cuenta-nombre/`](../../tld-api-cuenta-nombre/)).
- **No:** inventar justificaciones por bloque sin que el usuario las escriba en `anotaciones.json` o en el chat.

Vocabulario: **Dig** = código refactor (`--codigo-fuente` CLI sigue usando `prod`\|`dev`). En los MD generados aún aparece «dev» = Dig.

---

## Flujo acordado (pausado aquí)

1. Newman dig + prod (par MATRIZ) ya existen en historial.
2. Regenerar MD: `node generar-bloques.js vcn` desde `super-tabla-prod-dev/`.
3. El usuario revisa **solo** `bloques-diferencias-prod-vs-dev.md` (prod ≠ Dig).
4. Por cada bloque: anotar veredicto/razón en [`anotaciones.json`](./anotaciones.json) → re-generar para inyectar notas.
5. Cuando VCN esté revisado → repetir patrón en P2P.

---

## Insumos Newman (defaults del generador)

| Lado | Archivo historial |
|------|-------------------|
| Prod | `Postman/generador/logs/historial/vcn/2026-07-14T09-09-28Z_prod_MATRIZ_completo_por-escenario.json` |
| Dig | `Postman/generador/logs/historial/vcn/2026-07-15T18-49-44Z_dev_MATRIZ_completo_por-escenario.json` |

| Vista MD | Conteo al regenerar 2026-07-15T19:26Z |
|----------|----------------------------------------|
| `bloques-diferencias.md` (todas las diffs) | **79** |
| `bloques-diferencias-prod-vs-dev.md` (solo prod≠Dig) | **46** |
| Escenarios únicos (unión) | **341** |

**Trampa conocida:** si los DEFAULTS apuntan a un dig viejo, el MD miente. Ejemplo: dig `2026-07-14T16-03-14Z` mostraba SWIFT feliz → 400; dig `18-49-44Z` ya no. Siempre regenerar tras nuevo Newman dig.

---

## Temas de producto **cerrados** respecto a esta revisión

| Tema | Evidencia | Doc |
|------|-----------|-----|
| SWIFT `validador` length ≤8 | Dig feliz `*.1.2` → negocio **0**; salieron de la vista prod≠Dig | [`hallazgo-validador-swift-dev.md`](./hallazgo-validador-swift-dev.md) |
| Matriz Dig ops 0001 (9 celdas ∅/Y/N) + 481/482 | Newman dig `2026-07-15T18:49Z` — celdas `negocioCoincide` OK | [`vcn-matriz-permisos-…`](../../tld-validador-api/vcn-matriz-permisos-emisor-validador-0001-2026-07-15.md) |
| Modelo códigos Dig (481 / 482 / 418 / 500) | Código en VCN/P2P/P2M/validador-api rama `feature/ARQ-225_Refactory` | Ver tabla abajo |

### Modelo Dig (recordatorio — no reabrir sin pedido)

| Caso | Código |
|------|--------|
| Método no en mapa | **481** |
| Emisor op `estado === "N"` | **482** |
| Validador sin op `estado === "Y"` (VCN) | **418** |
| En mapa pero falta CFG / `LAMBDA_*` | **500** |
| Emisor **∅** (sin fila) | **No** deniega con 482 |

Misma fila Dynamo: `N` como emisor → 482; como validador → 418.

Canales de prueba: **1018** ARCHGATO (`N`), **1024** ANOMGATO (∅), emisores/validadores `Y` existentes. Seeds: `Postman/canalesPruebas-dev/`.

---

## Los 46 bloques restantes — mapa para retomar

Agrupación por el **índice** de `bloques-diferencias-prod-vs-dev.md` (estado al regenerar). El usuario aún no cerró justificación formal bloque a bloque; al pausar dijo que a groso modo **se ven justificables**.

| # índice | Grupo | Naturaleza típica prod≠Dig (observada) |
|----------|-------|----------------------------------------|
| 1–3 | `0001` cuenta ausente/null/array → esperado 413 | Dig: **413** forma B; prod a menudo **999** / `A.mensajeError` — Dig alinea validación de parámetro |
| 4–7 | Proxy PROXGATO / OUTFGATO 599–509 | Dummy / auth / demora — difieren env y mensaje; no son el modelo ops Dig |
| 8–10 | `1.2.4–6` validador tipo no-string | Texto/código distinto (ver anotaciones históricas + `getCanal-excepcion-validador-no-string`) |
| 11–16 | `idPeticion` (espacios, símbolos, long, SWIFT) | Misma familia de rechazo; **texto** de mensaje ≠ entre lados |
| 17–42 | `solicitudes` / `idSolicitud` (425/431) | Dig más estricto / mensajes distintos vs prod; incluye regex idSolicitud portada |
| 43–46 | `2.1.*` / `2.2.3` plan / getCanal mal config | Escenarios de canal de prueba; forma/texto ≠ |

**Fuera de esta vista (ya no prod≠Dig por negocio):** los 8 caminos felices `*.1.2` validador SWIFT.

Suite Newman dig completa aún reporta **88** fails de test en otras carpetas (`ultima-corrida-vcn.md`) — **otro tema**; no confundir con estos 46 bloques de comparación prod↔Dig.

---

## Anotaciones

Archivo: [`anotaciones.json`](./anotaciones.json).

- Entradas SWIFT: marcadas **cerradas / conforme** tras Newman `18-49-44Z` (ya no están en la vista filtrada; se conservan por histórico).
- Entradas `1.2.4–6`: siguen como DIFF pendientes de veredicto humano en la revisión actual.
- Al retomar: ir bloque a bloque del índice → completar `veredicto` / `notas` → `node generar-bloques.js vcn`.

---

## Pendiente al retomar (solo este hilo)

1. Continuar justificación humana de los **46** bloques VCN.
2. Cuando el usuario lo pida: generador + Newman P2P → `p2p/bloques-diferencias-prod-vs-dev.md` (aún **no** generado como carpeta equivalente completa).
3. P2P/P2M Newman Dig `4.1`/`4.2`/`4.3` — **no** confirmar cerrado en esta máquina; ver logs cuando el usuario pushee.

**No** regenerar con dig viejo. **No** correr Newman desde Lenovo.

---

## Enlaces

| Qué | Dónde |
|-----|-------|
| Vista de trabajo | [`bloques-diferencias-prod-vs-dev.md`](./bloques-diferencias-prod-vs-dev.md) |
| Vista completa diffs | [`bloques-diferencias.md`](./bloques-diferencias.md) |
| Carpeta super-tabla | [`../00-estado-y-retomo.md`](../00-estado-y-retomo.md) |
| Última corrida VCN | [`../../Postman/generador/logs/ultima-corrida-vcn.md`](../../Postman/generador/logs/ultima-corrida-vcn.md) |
| Checkpoint Postman | [`../../Postman/00-estado-y-retomo.md`](../../Postman/00-estado-y-retomo.md) |
| Matriz Dig 0001 | [`../../tld-validador-api/vcn-matriz-permisos-emisor-validador-0001-2026-07-15.md`](../../tld-validador-api/vcn-matriz-permisos-emisor-validador-0001-2026-07-15.md) |
