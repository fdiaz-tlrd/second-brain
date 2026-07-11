# Generador de OpenAPI `.json` — factibilidad y diseño

**Pregunta del usuario:** ¿es factible un generador de estos JSON OpenAPI, similar al generador de
Postman que ya tenemos? **Respuesta corta: sí, muy factible.** La estructura es altamente regular y
repetitiva; casi todo es scaffolding constante + bloques por método.

**Regla crítica:** para APIs existentes/productivas, el generador debe preservar contrato. No puede
"normalizar" campos, envelopes, tipos, métodos, ejemplos contractuales ni códigos. La mejora buscada
es presentación y mantenimiento. Para APIs o métodos nuevos sí se puede aplicar el estándar correcto.

Basado en el estudio `08-estudio-profundo-tech_doc.md`.

---

## 1. Por qué es factible

Evidencia del estudio:
- El **envelope** (request y response) es constante; solo cambian `parametros` (entrada) y `datos`
  (salida) por método.
- La **operación** OpenAPI de cada método tiene forma fija: `tags, summary, description, operationId,
  requestBody→RequestXXXX, responses.200→ResponseXXXX, responses.400→Response400`.
- Bloques **compartidos** entre APIs: `/auth/token`, securityScheme bearer JWT, términos, requisitos.
  Para cifrado/descifrado, api_6 es el bloque canónico futuro; no se copia a APIs productivas sin
  decisión explícita de migración documental.
- El **truco del path** (`/validador/validar` + N espacios para unicidad) es mecánico: N = índice del
  método. Un generador lo produce sin intervención manual.

Lo repetitivo y propenso a error hecho a mano (los JSON son enormes: api_6 = 2428 líneas) es
exactamente lo que un generador elimina.

---

## 2. Analogía con el generador de Postman

| Generador Postman (ya existe) | Generador OpenAPI (propuesto) |
|-------------------------------|-------------------------------|
| Escenarios en carpetas/JSON pequeños | Métodos en definiciones pequeñas (spec por método) |
| `armar-coleccion.js` ensambla | `armar-openapi.js` ensambla |
| Bloques comunes reutilizados | Bloques comunes (auth, cifrado, envelope) reutilizados |
| Salida: colección Postman | Salida: `api_X.json` OpenAPI válido |

---

## 3. Diseño propuesto (borrador)

### 3.1 Entrada — definición compacta por API

> **Nota:** este bloque era el **borrador inicial**. La **implementación real** (jul-2026) difiere:
> usa `apis/<api>.json` (manifiesto) + `plantillas/<api>/tags/*.html` + `fragmentos/<api>/{paths,components}.json`.
> Ver la estructura y flujo reales en **§7 (Estado / arquitectura implementada)** y en el
> `README.md` del generador. Se conserva el borrador como referencia de la idea original.

```
generador-openapi/
  comun/
    info.json            # openapi, info, servers, security
    auth-token.json      # path /auth/token + schemas token
    envelope.json        # RequestCifrado / ResponseCifrado (o variante)
    cifrado-gcm.html     # BLOQUE CANÓNICO futuro (tomado de api_6)
    cifrado-cbc-obsoleto.html
    terminos.html, requisitos.html
  apis/
    vcn.api.js           # meta + lista de métodos + qué bloques usa
    p2p.api.js
    r2p.api.js
  metodos/
    0001.js  0002.js ...  # por método: código, nombre, desc, parametros[], datos[], ejemplos, errores
  armar-openapi.js       # ensambla -> tech_doc/api_X.json
```

### 3.2 Definición de un método (lo único que varía)

```js
module.exports = {
  codigo: "0002",
  nombre: "Verificar identificador",
  tag: "Xpress - Servicio P2P",      // o "CANAL" / "CANAL VALIDADOR"
  descripcion: "…HTML…",
  parametros: [
    { campo: "identificador", tipo: "string", desc: "…", req: true },
    { campo: "tipoIdentificador", tipo: "string", enum: ["CELULAR"], desc: "…" }
  ],
  datos: [
    { campo: "existe", tipo: "string", desc: "SI|NO|INVALIDO" },
    { campo: "identificador", tipo: "string" }
  ],
  ejemplos: { request: {...}, response: {...} },
  errores: ["0","400","407","409", …]     // referencia al catálogo
};
```

El generador expande esto a: path (con N espacios), operación, `RequestXXXX`, `ResponseXXXX`,
inyectando el envelope constante alrededor de `parametros`/`datos`.

### 3.3 Parametrización obligatoria de variantes (preservar contrato)

El generador debe soportar por-API:
- Envelope response: `{idPeticion,respuestas[]}` vs `{respuesta:{…}}` (api_7).
- Tipo de `resultado`: integer vs string.
- Split 200/400: schema único vs `Response200_XXXX`/`Response400_XXXX`.
- `x-tagGroups`: presente (api_6) o no.
- Naming: `RequestCifrado` vs `RequestValidador`.

**No normalizar APIs existentes.** Estas variantes son contrato publicado o forma ya usada por
clientes. El generador debe parametrizarlas y reproducirlas fielmente. La convención más limpia puede
usarse para **nuevas** APIs/métodos, no para reescribir contratos ya publicados.

### 3.4 Modo de operación recomendado

| Modo | Uso | Regla |
|------|-----|-------|
| `preserve-contract` | APIs existentes (`api_4`, `api_6`, `api_7`) | Salida equivalente en información; solo mejora presentación/formato/mantenibilidad |
| `new-standard` | APIs/métodos nuevos | Usar convención correcta desde el inicio (api_6 como referencia de estructura y cifrado/descifrado) |

---

## 4. Validaciones que el generador debe correr (aprendido del hallazgo api_4)

1. **`JSON.parse` estricto** sobre la salida (api_4 estaba roto por control chars crudos).
2. **Sin control chars crudos dentro de strings** (escapar `\n`,`\t` en HTML embebido).
3. Salida en **LF**; el `* text=auto` del repo normaliza el blob.
4. (Opcional) validar contra el **schema OpenAPI 3.0** con una librería.
5. Diff de "contenido" (parametros/datos/errores) para no cambiar el contrato sin querer.

---

## 5. Beneficios

- Elimina edición manual de archivos de miles de líneas.
- **Consistencia de mantenimiento** sin cambiar contrato existente.
- Un solo lugar para el **bloque de cifrado/descifrado GCM + CBC obsoleto** de api_6, reusable cuando
  se apruebe llevarlo a api_7/api_4 o para APIs nuevas.
- Facilita convertir el canal validador "feo" de api_4 en métodos estructurados.
- Escalable a P2M (`api_5`) y futuras APIs.

---

## 6. Riesgos / decisiones cerradas y abiertas

### Decisiones cerradas por el usuario

- **No cambiar contrato ni información productiva**. Esto evita líos con clientes que ya desarrollaron
  contra la documentación actual.
- El trabajo es mejorar **presentación** y **mantenimiento**, no rediseñar el contrato.
- `api_6.json` tiene la guía correcta de **cifrado y descifrado**: GCM actual + CBC obsoleto.
- Si el agente considera VCN como mejor PoC, avanzar con VCN.

### Decisiones cerradas (jul-2026, tras alinear con el usuario)

- **Salida = `tech_doc/api_4.json`** (el final). `armar-vcn.js` escribe directo ahí: «cada vez que se
  genere, la última versión está disponible en `tech_doc/`». `tech_doc/` queda como siempre: solo los JSON.
- **NO** hay carpeta intermedia dentro de `tech_doc/`. El intento `tech_doc/_generated/` fue invención
  sin precedente (ver bitácora `07`) y se retiró.
- **`tech_doc_baseline/` es temporal**: existe **solo** para comparar durante este refactor grande y
  **se eliminará al terminar**.
- **Vista previa ReDoc** → `generador-openapi/_generated/preview/` (apoyo visual, ignorado por git).
- El **HTML de descripciones se mantiene** como plantillas `.html` (una por tag), editables a mano.
- Alcance inicial: **PoC con VCN (api_4)**, el más simple (1 método), antes de P2P/R2P.

### Decisiones abiertas

- Extender el generador a P2P (`api_6`) y R2P (`api_7`).
- Si al final se conserva el generador (el usuario lo revisará al cerrar la fase).

---

## 7. Estado / arquitectura implementada (fuente de verdad)

**PoC VCN (2026-07-11)** en `telered_content_mktpl/generador-openapi/`. Esta es la estructura **real**.

### 7.1 Estructura real (versionada)

```
generador-openapi/
  apis/vcn.json                 # manifiesto: openapi, info, servers, security, tags→plantilla,
                                #   metodos, y rutas de salida (output=tech_doc/api_4.json)
  plantillas/vcn/tags/*.html    # 8 HTML, uno por tag (lo mantenible; se edita a mano)
  fragmentos/vcn/paths.json     # paths OpenAPI (el truco /validador/validar + espacios)
  fragmentos/vcn/components.json# schemas (Request0001, Response0001, envelope, etc.)
  lib/
    bootstrap-vcn.js   # extrae un JSON base → plantillas + fragmentos + manifiesto
    build-vcn.js       # ensambla manifiesto+plantillas+fragmentos → OpenAPI y lo escribe
    compare-contract.js# compara contrato (paths/schemas/campos) baseline vs final
    json-safe.js       # parse/stringify seguro (LF, sin control chars crudos)
    slug.js            # nombre de tag → nombre de archivo
    preview-redoc.js   # HTML ReDoc de vista previa
  scripts/
    bootstrap-vcn.js   # CLI bootstrap (fuente por defecto: tech_doc_baseline/api_4.json)
    armar-vcn.js       # CLI generar → escribe tech_doc/api_4.json + preview
    comparar-vcn.js    # CLI comparar tech_doc_baseline vs tech_doc/api_4.json
  _generated/          # SOLO vista previa ReDoc (ignorado por git, regenerable)
```

### 7.2 Flujo (3 comandos)

1. `node generador-openapi/scripts/bootstrap-vcn.js` — (una vez) descompone un JSON en plantillas+fragmentos.
2. `node generador-openapi/scripts/armar-vcn.js` — ensambla y **escribe `tech_doc/api_4.json`** (el final) + preview ReDoc.
3. `node generador-openapi/scripts/comparar-vcn.js` — verifica **CONTRATO OK** (`tech_doc_baseline` vs `tech_doc/api_4.json`).

### 7.3 Roles de carpetas

| Carpeta | Rol | Git |
|---------|-----|-----|
| `tech_doc/api_4.json` | **Final** (salida del generador; la última versión siempre aquí) | Versionado |
| `tech_doc_baseline/api_4.json` | «Antes» del refactor, **solo para comparar**, **se borra al terminar** | Versionado (temporal) |
| `generador-openapi/` (código) | La herramienta nueva | Versionado |
| `generador-openapi/_generated/` | Solo preview ReDoc | **Ignorado** |

### 7.4 Progreso

| Paso | Estado |
|------|--------|
| Estructura generador en repo | ✅ |
| Baseline único `tech_doc_baseline/` (temporal) | ✅ |
| Bootstrap → 8 plantillas HTML + fragmentos (3 paths, 7 schemas) | ✅ |
| `armar-vcn.js` escribe salida final en `tech_doc/api_4.json` | ✅ configurado |
| Contenido generado == `tech_doc/api_4.json` actual (diff estructural profundo = **0**) | ✅ verificado |
| `comparar-vcn.js` → **CONTRATO OK** (baseline vs `tech_doc/api_4.json`) | ✅ |
| Vista previa ReDoc en `generador-openapi/_generated/preview/` (ignorado) | ✅ |
| Rediseñar presentación Canal Validador en plantillas | Pendiente |
| Regenerar `tech_doc/api_4.json` con el rediseño (revisar `git diff`) | Pendiente |

Comandos y detalle operativo: `telered_content_mktpl/generador-openapi/README.md`.
