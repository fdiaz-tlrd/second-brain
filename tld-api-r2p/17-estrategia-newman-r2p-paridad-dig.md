# Estrategia Newman R2P — paridad Dig (cuidado, sin ambición)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-16 |
| Estado | **Diseño / estudio** — sin colección R2P aún; sin Newman desde Lenovo |
| Meta | Asegurar que el Dig con **nuestros cambios** se comporta **igual** que Dig con **código fuente de producción** (mismo AWS dev) |
| Tooling | `second-brain/Postman/generador` (+ `comparar-prod-vs-dev`, opcional super-tabla) |

## Aclaraciones del usuario (2026-07-16) — obligatorias

| Tema | Decisión |
|------|----------|
| Gaps de `api_7.json` (Marketplace prod) | **Sí están mal / incompletos.** **No** los arreglamos ahora. Arreglar marketplace = **mejora nueva**, fuera de este hilo. |
| Ambición R2P | **Mínima.** No replicar el tamaño/complejidad de `Postman/generador/VCN Escenarios error`. |
| Qué validamos | Que los **cambios Dig ya hechos** (transporte proxy, getResultado, envelope, fallback) no cambian el **negocio observable** vs R2P prod desplegado en Dig. |
| Qué no validamos | Catálogo completo api_7, matriz exhaustiva de errores, “mejoras” Dig de VCN/P2P, arreglar doc marketplace. |

Estudio doc↔prod (contexto, no backlog de fixes): [`15-estudio-api7-marketplace-vs-prod.md`](./15-estudio-api7-marketplace-vs-prod.md).

---

## Cómo encaja con el tooling que ya existe

No inventar un mundo nuevo. Reutilizar el patrón **ya probado en VCN/P2P/P2M**:

| Pieza | Rol para R2P |
|-------|----------------|
| `Postman/generador/` | Casa de escenarios fuente + ensamblador + Newman |
| `run-newman.js --codigo-fuente prod\|dev` | Etiqueta qué código Dig estaba desplegado |
| `logs/resultados-por-escenario-*.json` | Captura por escenario (negocio + HTTP) |
| `comparar-runs.js` | Diff mecánico entre run prod-source y run cambios |
| `comparar-prod-vs-dev/` | Diseño: **mismo AWS dev**, distinto código en lambdas |
| `super-tabla-prod-dev/` | Solo si hace falta revisión humana de **diferencias**; VCN está en pausa — **no** abrir frente R2P ahí hasta tener par de runs |
| Lenovo | Genera/arma/docs; **no** ejecuta Newman |

Lecturas de ancla (docs propias del agente):

- [`../Postman/00-estado-y-retomo.md`](../Postman/00-estado-y-retomo.md)
- [`../Postman/generador/README.md`](../Postman/generador/README.md)
- [`../Postman/comparar-prod-vs-dev/README.md`](../Postman/comparar-prod-vs-dev/README.md)
- [`../hallazgos-desarrollo/04-newman-http-code-matriz-200.md`](../hallazgos-desarrollo/04-newman-http-code-matriz-200.md) (**HD-005**)
- [`../super-tabla-prod-dev/README.md`](../super-tabla-prod-dev/README.md)

---

## Lección HD-005 (no repetir el error VCN)

En MATRIZ, el HTTP de transporte es **siempre 200**. El error de negocio vive en el payload (`codigoError` / `resultado`).

| Mal (pasó en VCN) | Bien |
|-------------------|------|
| Comparar `expectedHttpStatus` 400/500 contra HTTP real bajo `NIVEL_EJECUCION=MATRIZ` | HTTP esperado transporte = **200** en MATRIZ; asertar **negocio** aparte |
| Confundir HTTP Code con código de respuesta | Dos capas distintas (doc HD-005) |

Cualquier Post-response R2P futuro debe nacer con esa regla (como ya tienen VCN/P2P/P2M), **no** redescubrir el bug.

---

## Definición de “prod” vs “dev” en este hilo R2P

Igual que comparar-prod-vs-dev: **ambiente = Dig AWS**, no producción pública.

| Etiqueta `--codigo-fuente` | Qué está desplegado en Dig (R2P + deps mínimas del hop) |
|----------------------------|--------------------------------------------------------|
| `prod` | Código **fuente de producción** de R2P (p. ej. snapshot / rama prod-a-dev / clon prod) en lambdas Dig |
| `dev` | Código **con nuestros cambios** (`feature/ARQ-225_Refactory` / commit `6fece92` + docs) |

**Criterio de éxito del hilo:** en el **mismo set pequeño de escenarios**, la captura de negocio (`codigoError` / `resultado` / forma útil) con `prod` ≈ con `dev`.  
Si difieren: o el cambio Dig alteró negocio (malo para “asegurar”), o hay config/deploy desigual (investigar antes de “arreglar” producto).

No es “asserts verdes alineados solo a Dig mejorado”. Es **paridad observable** entre dos deploys.

---

## Qué ejercitan los cambios Dig (para no sobre-probar)

Cambios ya hechos (transporte Dig):

1. Sin `validador.js` HTTP / sin cold-start `tld-telered-lib` → `getResultadoValidador`
2. Proxy Invoke + pass-through `idTransaccionAutopista` / `fechaHora` si vienen
3. Fallback message vacío → `"Error en validador-proxy"`
4. Forma salida ya auditada (G4)

Escenarios **mínimos** deben poder **llegar al hop producto→banco (proxy)** o al menos **cargar R2P** y devolver negocio coherente.  
**No** hace falta una batería de 400 códigos de `api_7` para demostrar eso.

Cola **máxima** inicial (diseño; aún no implementada) — recortar si hace falta:

| # | Escenario | Para qué (paridad) |
|---|-----------|---------------------|
| 1 | Un `0011` feliz controlado | Cold start OK + camino proxy + negocio 0 / codigoR2P |
| 2 | Un `0013` feliz (si #1 deja estado usable) o seed mínimo | Remap/Dynamo sigue igual |
| 3 | (Opcional) un error de validación estable (p. ej. sin nombreAcreedor → 437) | Mismo código de negocio en ambos deploys |

**Fuera de v1:** envelope autopista como caso aparte, 438/441/442, límites 425, matriz ops, etc. — solo si el par #1–#2 ya es idéntico y el usuario pide ampliar.

La lista larga de [`16`](./16-escenarios-simples-newman-diseno.md) § anterior queda **archivada como ideas**, no como backlog activo.

---

## Cómo se ejecutaría (máquina VPN; cuando exista suite)

Orden conceptual (igual VCN):

1. Deploy Dig R2P **prod-source** (+ validador-api/proxy/matriz según el nivel elegido).
2. `node run-newman.js r2p --codigo-fuente prod --nota "…"` *(nombre suite TBD)*.
3. Deploy Dig R2P **cambios**.
4. `node run-newman.js r2p --codigo-fuente dev --nota "6fece92 …"`.
5. `node comparar-runs.js <prod>_por-escenario.json <dev>_por-escenario.json`.
6. Si hay diffs de negocio → revisar **uno a uno** (super-tabla solo si el volumen lo justifica).

`NIVEL_EJECUCION`: preferir el mismo que usemos para paridad estable (en VCN fue MATRIZ). Decidir en el momento del primer ensamble R2P; documentar en la iteración. **No** asumir VALIDADOR directo sin necesidad.

---

## Qué falta antes de tocar generador (gate)

Sin estos, **no** crear carpeta tipo `R2P Escenarios error` ni config:

1. Confirmación de **canales Dig** (idCanal / validador / llaves / ops 0012–0014) disponibles para un 0011 controlado.
2. Decisión: ¿entrada MATRIZ Dig o validador-api Dig?
3. Deploy path concreto para “R2P prod-source en Dig” (mismo patrón `prod_adactado_a_dev` u otro que el usuario indique).
4. OK explícito del usuario para **implementar** el mínimo (ensamble + 1–2 JSON), no solo estudiar.

Hasta entonces: solo docs (este archivo + retomo).

---

## Qué queda explícitamente fuera

- Arreglar / PR a `telered_content_mktpl` / `api_7.json`
- Suite ambiciosa tipo VCN (cientos de escenarios)
- Portar mejoras Dig 481/482/418 a R2P
- Newman desde Lenovo
- Abrir super-tabla R2P en paralelo a la pausa VCN sin par de runs

---

## Enlaces

- Retomo R2P: [`00-estado-y-retomo.md`](./00-estado-y-retomo.md)
- Diseño corto: [`16-escenarios-simples-newman-diseno.md`](./16-escenarios-simples-newman-diseno.md)
- Asegurar Dig (código): [`14-cierre-3-5-g5-g7.md`](./14-cierre-3-5-g5-g7.md)
