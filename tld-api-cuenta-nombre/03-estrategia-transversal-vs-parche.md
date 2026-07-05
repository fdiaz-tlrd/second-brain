# Estrategia: ¿VCN como base o solo parches?

Documento del agente (2026-07-05). Opinión técnica para instancias futuras y para el usuario.

## Pregunta

¿La meta es **llevar VCN al patrón de `tld-api-base`** (transversal refactorizado) o **solo parchear** líneas hasta que pasen las pruebas General?

## Respuesta corta

**Meta = transversal alineado a base; ejecución = incremental, no big-bang ni parche eterno.**

No es uno u otro en extremo:

| Enfoque | Veredicto |
|---------|-----------|
| Solo parches línea a línea en el monolito | **Insuficiente** — repite la misma clase de bugs (orden, respuestas, códigos HTTP) |
| Reescritura completa de `app.js` en un solo PR | **Riesgoso** — Metodo/0001 y validador-proxy **ya funcionan** en dev |
| **Migración transversal por fases**, dominio 0001 intacto | **Recomendado** — coincide con [01-enfoque-correccion.md](./01-enfoque-correccion.md) y Newman checklist |

## Por qué no basta con parchear

1. **El contrato que falla es el transversal**, no el 0001. Parchear escenario 1.1.1 (idCanal ausente) sin `validaciones.js` ni reordenar fases deja el siguiente escenario roto por la misma causa estructural.
2. El contrato que falla es el **transversal** frente a P2M/P2P/base y Postman General — no se corrige repitiendo el monolito actual línea a línea.
3. El monolito mezcla dos responsabilidades. Cada parche aumenta deuda; copiar/adaptar módulos de base **reduce** superficie de error.

## Por qué no big-bang

1. Newman ya demostró: rama **0001 + proxy + cuenta** OK en dev.
2. VCN tiene piezas que base **no tiene** (proxy, máscara, getResultadoValidador). Sustituir todo el `app.js` de golpe eleva riesgo de regresión de negocio.
3. El usuario acordó: una validación a la vez, triage, marcar checklist.

## Plan recomendado (híbrido)

### Fase A — Transversal mínimo viable (objetivo = comportamiento base, no archivo idéntico)

**Decisión (2026-07-05):** Fase A **dividida** en subfases A0–A5 — ver [04-decision-fase-a-dividida.md](./04-decision-fase-a-dividida.md). **No** implementar A entera de un solo golpe.

Resumen del orden:

| Subfase | Bloque Postman | Primera entrega de código |
|---------|----------------|---------------------------|
| A0 | JSON entrada | Mensaje catálogo (fusionable con A1) |
| **A1** | **1.1 idCanal** | **Sí — empezar aquí** |
| A2 | 1.2 validador | Tras A1 verificado |
| A3 | 1.3 petición | Tras A2 |
| A4 | 1.4–1.5 idPeticion/solicitudes | Tras A3 |
| A5 | plan.js + env | Refactor al cierre de A |

Contenido por subfase: `validaciones.js`, reorden, responders, `CFG_METODOS_LIMITES_JSON` — repartidos según tabla anterior (no todo en A1).

### Fase B — Estructura

5. Partir `app.js` en las mismas funciones que base (`parsearYValidarEntrada`, `resolverCanalEmisor`, …) — puede ser el mismo archivo, funciones extraídas.
6. `CFG_METODOS_LIMITES_JSON`: solo `"0001"`.

### Fase C — Dominio (cuando transversal estable)

7. Extraer **solo 0001** a `lib/metodos.js`: cuenta 413, proxy, máscara, bitácora validador.
8. `app.js` queda orquestador como base; **0001** no se reescribe, se **mueve**.

### Referencia producción

- Existe `prod/tld-api-cuenta-nombre-master` (cómo funciona prod **hoy**). Ver [referencia-produccion.md](./referencia-produccion.md).
- **Fuera de alcance ahora** — no copiar, no parchear “como prod”, no abrir salvo que el usuario lo pida.
- Referencia de corrección: P2M/P2P, base, Newman General.

## Criterio de “terminado”

VCN está alineado cuando:

- Postman **General** pasa (checklist completo).
- Transversal **se comporta** como base/P2M (mismas fases, mismos códigos/mensajes en escenarios transversales).
- **0001** sigue pasando Metodo/0001.
- No hace falta que el diff de `app.js` sea byte-a-byte con base: VCN tiene `metodos.js` con un solo método y módulos proxy propios.

## Qué no hacer

- Tratar `tld-api-base` como dependencia runtime.
- Modificar `prod/tld-api-cuenta-nombre-master` (referencia congelada; ver [referencia-produccion.md](./referencia-produccion.md)).
- Parchear solo HTTP/código sin tocar orden de validación.
- Copiar `lib/metodos.js` de P2M (múltiples métodos; dominio distinto).
