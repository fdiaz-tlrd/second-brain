# Estrategia Newman R2P — paridad Dig (cuidado, sin ambición)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-16 |
| Estado | **Suite mínima lista** — 1 escenario `0011` feliz (`r2p`); paridad prod vs cambios **después** (deploys + VPN) |
| Meta | Paridad Dig: código prod vs cambios (mismo AWS) |
| Nivel | **Solo MATRIZ** (canal → API Rest Autopista) |
| Tooling | `second-brain/Postman/generador` — suite `r2p` |
| Colección | Fuente `R2P Escenarios error/`; salida `ensamblador/salida/R2P Escenarios error.postman_collection.json`; env `entornos/R2P Escenarios error - desarrollo.postman_environment.json` |
| Armar | `cd …/ensamblador` → `node armar-coleccion.js config-r2p.json` |
| Newman (VPN) | `node run-newman.js r2p --codigo-fuente prod\|dev` |

## Aclaraciones del usuario (2026-07-16) — obligatorias

| Tema | Decisión |
|------|----------|
| Gaps de `api_7.json` (Marketplace prod) | **Sí están mal / incompletos.** **No** los arreglamos ahora. Arreglar marketplace = **mejora nueva**, fuera de este hilo. |
| Ambición R2P | **Mínima.** No replicar `VCN Escenarios error`. |
| Nivel | **Solo MATRIZ** — path env VCN `END_POINT_TLD_MATRIZ` |
| Canales | Ver [`18-gates-canales-matriz-r2p.md`](./18-gates-canales-matriz-r2p.md) — par propuesto 1008→1009 |
| Qué validamos | Cambios Dig no alteran negocio observable vs R2P prod-source en Dig |
| Qué no validamos | api_7 marketplace, otros niveles, suite grande |

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

Cola **v1 implementada** (mínima):

| # | Escenario | Estado |
|---|-----------|--------|
| 1 | Un `0011` feliz controlado | **En suite** `Metodo/0011/3_respuestaExitosa/1009/1.1_r2p_feliz` |
| 2 | Un `0013` feliz | **No** en v1 |
| 3 | Error de validación estable | **No** en v1 |

Ampliar solo si el usuario lo pide tras paridad de #1.

La lista larga de [`16`](./16-escenarios-simples-newman-diseno.md) § anterior queda **archivada como ideas**, no como backlog activo.

---

## Cómo se ejecuta (máquina VPN)

Orden conceptual (igual VCN):

1. Deploy Dig R2P **prod-source** (+ deps del hop MATRIZ).
2. `node run-newman.js r2p --codigo-fuente prod --nota "…"`.
3. Deploy Dig R2P **cambios** (`6fece92` / feature).
4. `node run-newman.js r2p --codigo-fuente dev --nota "6fece92 …"`.
5. `node comparar-runs.js <prod>_por-escenario.json <dev>_por-escenario.json`.
6. Si hay diffs de negocio → revisar uno a uno.

`NIVEL_EJECUCION=MATRIZ` en el environment R2P.

---

## Qué falta antes de paridad

Gates canales/alias/smoke: [`18`](./18-gates-canales-matriz-r2p.md) — **cerrados**. Suite mínima **existe**. Falta el par de deploys + runs VPN.

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
