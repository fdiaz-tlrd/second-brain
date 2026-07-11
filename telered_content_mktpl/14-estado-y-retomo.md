# 14 — Estado y retomo (`telered_content_mktpl` / VCN api_4)

> **Propósito:** punto único para **retomar este tema** sin reconstruirlo del chat.
> Cambiamos a otro tema (largo); al volver, leer **este archivo primero**, luego la
> [bitácora](./07-bitacora-estudio.md) y el [generador](./09-generador-openapi.md).
>
> **Última actualización:** 2026-07-11 (tras reestructurar navegación api_4 según Árbol 1 de `13`).

---

## 1. Dónde quedó todo (resumen 1 párrafo)

Estamos mejorando **solo `api_4.json` (VCN)** del repo `telered_content_mktpl`, en modo
**preserve-contract** (no se tocan paths/schemas/campos contractuales; solo presentación,
tags, grupos y contenido HTML). Se construyó un **generador** (`generador-openapi/`, análogo al
de Postman) que desarma el JSON en plantillas + fragmentos y lo rearma. La última acción fue
**rearmar la navegación** de la doc según el **Árbol 1** de `13-api_4-estructura-propuesta.md`:
grupos `Conceptos base / Seguridad / LADO A / LADO B / Referencias`, con dos tags nuevos
(**Personajes**, **Enmascarado**) y los timeouts colocados **una sola vez por lado**
(25 s en LADO A, 10 s en LADO B). Todo commiteado y pusheado en ambos repos.

---

## 2. Ramas y último commit

| Repo | Rama | Último commit del tema |
|------|------|------------------------|
| `telered_content_mktpl` (marketplace) | `feature/Refactory` | `bdf040b` — feat(vcn): reestructurar navegacion segun arbol 13 |
| `second-brain` | `main` | `851fc90` — docs(marketplace): arbol 13 implementado |

Historial de commits del tema (marketplace, más reciente arriba):
- `bdf040b` reestructurar navegación (tagGroups, Personajes, Enmascarado, timeouts por lado)
- `d527eee` Canal Validador espejo de Telered (envelope + descifrado)
- `36fc2b4` distinguir endpoints reales de métodos lógicos cifrados
- `1576757` cifrado api_4 = api_6 (GCM vigente + CBC obsoleto)

---

## 3. Modelo mental (para no perder el hilo)

VCN documenta un **protocolo cifrado y multiplexado** sobre **un único endpoint HTTP real**
(`POST /validador/validar`). Los múltiples `paths` en OpenAPI son un **truco de claves únicas**
(espacios finales en el path); **no son URLs reales**. Cuatro capas (ver
`11-modelo-documental-protocolo-cifrado.md`):

1. **Endpoint HTTP real** — `POST /validador/validar` (+ `POST /auth/token`).
2. **Envelope cifrado** — `peticion` / `respuesta` como **string** (lo que viaja por el cable).
3. **Payload descifrado** — JSON interno navegable.
4. **Método lógico** — el valor del campo `metodo` (`"0001"` para VCN) dentro del payload.

Los paths sintéticos van marcados con `x-telered-operationKind: logical-method`.

**Dos lados del mismo método 0001:**
- **LADO A** = el Canal consume Telered (`POST /validador/validar`). Timeout **Canal→Telered 25 s**.
- **LADO B** = el Canal Validador (banco/IF) responde a Telered. URL la define la IF.
  Timeout **Telered→CV 10 s**.

---

## 4. Estructura de navegación implementada (Árbol 1)

`tagGroups` en `apis/vcn.json`:

| Grupo | Tags |
|-------|------|
| **Conceptos base** | Personajes · Términos · Requisitos |
| **Seguridad** | Autenticación de los servicios · Guía GCM (vigente) · Guía CBC (Obsoleto) |
| **LADO A — Canal consume Telered** | Validación cuenta nombre |
| **LADO B — Canal Validador (Telered llama)** | Especificación para CANAL VALIDADOR · CANAL VALIDADOR |
| **Referencias** | Razones Telered · Razones Canal Validador · Enmascarado |

---

## 5. Mapa de archivos del tema

### Generador (`telered_content_mktpl/generador-openapi/`)
| Archivo | Rol |
|---------|-----|
| `apis/vcn.json` | Manifiesto: info/portada, tags, `tagGroups`, refs a fragmentos y métodos |
| `lib/build-vcn.js` | Ensamblador (soporta `x-tagGroups`) |
| `fragmentos/vcn/paths.json` | `/auth/token`, `/validador/validar` (real cifrado), `/validador/validar ` (método lógico 0001) |
| `fragmentos/vcn/paths-canal-validador.json` | `cv-0001` (`/0001` envelope) + `cv-0001-descifrado` (`/0001 ` campos) |
| `fragmentos/vcn/components*.json` | Schemas; notas GCM vigente; `idPeticion` con detalle SWIFT/24h |
| `plantillas/vcn/tags/personajes.html` | **Nuevo** — 3 actores |
| `plantillas/vcn/tags/enmascarado.html` | **Nuevo** — regla de asteriscos (extraída de Especificación) |
| `plantillas/vcn/tags/validacion-cuenta-nombre.html` | LADO A intro + **timeout 25 s** |
| `plantillas/vcn/tags/especificacion-para-canal-validador.html` | LADO B: auth CV, transporte, **timeout 10 s**, descifrado, anexos |
| `plantillas/vcn/tags/canal-validador.html` | LADO B intro (operaciones) |
| `plantillas/vcn/tags/guia-cifrado-hibrido-{gcm,cbc-obsoleto}.html` | Copiadas verbatim de api_6 |
| `plantillas/vcn/operations/canal-validador-0001-description.html` | Descripción corta del envelope |
| `scripts/armar-vcn.js` · `comparar-vcn.js` · `bootstrap-vcn.js` | CLI generar / comparar / bootstrap |

### Salida (marketplace)
- `tech_doc/api_4.json` — **final** (se sube al marketplace).
- `tech_doc_html/api_4.html` — render ReDoc offline (abrir en navegador para revisar).
- `tech_doc_baseline/api_4.json` — «antes», solo para comparar; **se borra al terminar**.

### second-brain (`second-brain/telered_content_mktpl/`)
`00`–`06` estudio/hallazgos · `07` bitácora · `08` estudio profundo · `09` generador ·
`10` reglas refactory · `11` modelo documental · `12` para dummies · `13` estructura propuesta ·
**`14` este archivo** · `helper-inventario-openapi-multiplexado.js` clasificador.

---

## 6. Decisiones clave (no re-litigar sin motivo)

- **preserve-contract:** no cambiar `parametros` / `datos` / paths / schemas contractuales.
- **Cifrado:** api_4 sigue a api_6 → **GCM vigente + CBC (Obsoleto)** coexisten. CBC usa
  `iv.secreto.cifrado` (mismo formato de cable que ya usaba api_4 → sin cambio de contrato).
- **Notación en árboles conceptuales:** usar `<cadena cifrada>` (neutral), no `iv.secreto.cifrado`.
- **Canal Validador = espejo de Telered (opción A):** dos operaciones, envelope (string) +
  descifrado (objetos anidados) para que ReDoc pinte campos navegables.
- **Timeouts:** una sola fuente por lado (25 s en A, 10 s en B). **No** hacer resumen manual en
  §Seguridad (riesgo DRY); solo si el generador lo deriva automáticamente.
- **Enmascarado:** extraído a su propio tag (Referencias), ya no enterrado en Especificación.

---

## 7. Verificación esperada al regenerar

```
node generador-openapi/scripts/armar-vcn.js
node generador-openapi/scripts/comparar-vcn.js --solo-esquema
```
- `armar-vcn.js` → 12 tags, 5 paths, `JSON.parse OK`, HTML refrescado.
- `--solo-esquema` → **solo** diferencias `contract.info.description` y `contract.tagNames`
  (esperadas por portada nueva + tags Personajes/Enmascarado + reorden). Paths/schemas intactos.
- Inventario: `node second-brain/telered_content_mktpl/helper-inventario-openapi-multiplexado.js telered_content_mktpl/tech_doc/api_4.json`
  → 1 auth + 1 endpoint cifrado + 3 métodos lógicos documentales.

---

## 8. Pendiente / posibles próximos pasos (cuando se retome)

- [ ] Revisar visualmente `tech_doc_html/api_4.html` con la nueva navegación (validación de usuario).
- [ ] Evaluar si el generador debe **derivar** un resumen de timeouts automáticamente (única vía
      aceptada para tenerlo en §Seguridad sin duplicar a mano).
- [ ] Árboles 2 y 3 de `13` siguen siendo **conceptuales**; decidir si se materializan en la doc.
- [ ] Al cerrar todas las mejoras: **informe exhaustivo** (pedido del usuario) y **borrar**
      `tech_doc_baseline/` (temporal).
- [ ] Aplicar el mismo patrón (si el usuario lo pide) a api_6 / api_7 — hoy fuera de alcance.

---

## 9. Restricciones vigentes (máquina Lenovo)

- **No** ejecutar Newman ni llamadas a red dev desde aquí (sin VPN). No aplica a este tema
  (es doc OpenAPI), pero se mantiene la regla general.
- Trabajo acotado a **VCN / api_4** salvo que el usuario amplíe.
- No modificar `prod/tld-api-cuenta-nombre-master` (fuera de alcance).
