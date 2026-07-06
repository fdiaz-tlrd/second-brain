# Estudio: VCN REGRESIÓN (equipo de pruebas)

Fuente: `second-brain/Postman/equipo-pruebas/Collecciones y Variables Cuenta Nombre y Xpress/`

**Origen:** colección y environments entregados por el equipo de pruebas. No son de autoría propia.

**Prioridad:** VCN método `0001`. Xpress se menciona solo para delimitar alcance.

---

## Archivos

| Archivo | Rol |
|---------|-----|
| `VCN REGRESIÓN.postman_collection.json` | 38 carpetas × ~4 requests = **140** requests leaf |
| `QA VCN.postman_environment.json` | QA: `apigateqa.telered.com.pa`, dummy `*.qa.telered.internal` |
| `SANDBOX VCN.postman_environment.json` | Sandbox: `apigatesb.telered.com.pa`, dummy `*.sand.telered.internal` |
| `XPRESS Ejecucion Manual.postman_collection.json` | Xpress `0002` — **no es VCN** |
| `SANDBOX XPRESS (No tocar) Copy.postman_environment.json` | Env Xpress — el nombre indica no modificar |

### Relación con la carpeta hermana

`Validacion Cuenta Nombre/` es un paquete **anterior** de la misma línea (flujo Cifrar → Matriz → Descifrar). Sus environments `SBVCN-CANALBANK` y `SBVCN-BANCO NACIONAL` apuntan a validadores **reales** (`1531`, `1490`) con cuentas de ventana de cada banco. Eso es prueba del **validador externo**, no del stack dev GATO.

`VCN REGRESIÓN` concentra escenarios bajo prefijo **`TELERED VCN`** y usa por defecto `validadorC = 1000` (canal de prueba Telered en Matriz).

---

## Alcance: qué nos importa y qué no

### Fuera de alcance (no replicar en `Postman/generador`)

| Qué | Por qué |
|-----|---------|
| Toda la colección **XPRESS** | Método `0002` Verificar identificador; otro producto |
| Carpeta hermana con env **CANALBANK / BANCO NACIONAL** | Validadores reales `1531` / `1490`, cuentas y bancos del socio |
| **4 carpetas** de `VCN REGRESIÓN` que usan canales validador **reales** de ventana QA/Sandbox (ver tabla abajo) | El assert valida comportamiento del **validador externo** (GCM, token dinámico, sin máscara en su canal), no solo VCN + dummy GATO |

### Dentro de alcance (referencia para nuestro generador)

Las **34 carpetas** restantes usan `{{validadorC}}` (= `1000`) o errores sintéticos (`9000`, `idCanal` inexistente). Prueban:

- Orquestación **VCN** vía API Matriz
- Cifrado/descifrado con **dummy**
- Validación de petición, método `0001`, cuentas, máscara, códigos `510`–`515`, bitácora

---

## Las 4 carpetas que prueban el otro sistema (validador real)

No son el foco para `VCN Escenarios error` / dev GATO. Sirven como referencia de patrón, no para copiar IDs ni cuentas.

| Carpeta | Variable validador | QA | Sandbox | Qué ejercita del validador externo |
|---------|-------------------|-----|---------|-------------------------------------|
| TELERED VCN Resp Exitosa GCM | `{{ValidadorGCM}}` | `3000` | `2500` | Cifrado **aes-256-gcm** de punta a punta (`URLCGCM` / `URLDGCM`) |
| TELERED VCN Resp Exitosa CBC-GCM | `{{ValidadorGCM}}` | `3000` | `2500` | Cifrar CBC (`URLC`) + validador GCM |
| TELERED VCN Resp Sin enmascarar | `{{validadorNOMASKRA}}` | `1079` | `1577` | Canal con `validarEnmascaramiento ≠ Y` — titulares en claro |
| TELERED VCN Resp Exitosa Token Dinámico | `{{ValidadorTD}}` | `1147` | `1139` | Auth **dinámico** hacia URL del validador real |

**Analogía en nuestro dev:** la rama “sin enmascarar” la cubrimos con **1016** + dummy GATO; GCM con **1013**; token dinámico con **1011–1012, 1015–1016**. Pero los IDs y cuentas del equipo QA **no** son los nuestros.

---

## Arquitectura del flujo (VCN REGRESIÓN)

Cada carpeta `TELERED VCN …` ejecuta **3 o 4** requests en cadena:

```
1. Cifrar     → POST {{URLC}} o {{URLCGCM}}
2. API Matriz → POST {{URLM}}  (Bearer {{QAtokenAUT}})
3. Descifrar  → POST {{URLD}} o {{URLDGCM}}
4. Bitácora   → GET  {{URLBIT}}{{idPeticion}}   (opcional; casi siempre en éxito/error negocio)
```

### Paso 1 — Cifrar (dummy)

- QA: `https://tld-validador-dummy.qa.telered.internal/cifrar?tld=1`
- Sandbox: `https://tld-validador-dummy.sand.telered.internal/cifrar?tld=1`
- Body típico:
  ```json
  {
    "idCanal": "1000",
    "validador": "{{validadorC}}",
    "peticion": {
      "idPeticion": "{{idPeticion}}",
      "metodo": "0001",
      "solicitudes": [{
        "idSolicitud": "{{idSolicitud}}",
        "parametros": { "cuenta": "{{CuentaFeliz}}" }
      }]
    }
  }
  ```
- Respuesta: `{ idCanal, validador, peticion }` (strings) → se guardan en env.

### Paso 2 — API Matriz

- QA: `https://apigateqa.telered.com.pa/validador/validar`
- Sandbox: `https://apigatesb.telered.com.pa/validador/validar`
- Auth: OAuth en pre-request (`TOKENURL`, `APIKEY`, `SECRETKEY` → `QAtokenAUT`).
- Body: `{ "idCanal", "validador", "peticion" }` con `peticion` cifrada del paso 1.
- Aquí entra **VCN** (lambda) en el camino Matriz → validador configurado.

### Paso 3 — Descifrar (dummy)

- `{{URLD}}` o `{{URLDGCM}}` según escenario.
- Body: `{ "respuesta": "{{respuesta}}" }`.
- Aquí corren la mayoría de los **tests de negocio** (`resultado`, `datos`, máscara).

### Paso 4 — Bitácora

- QA: `…/qa/consultar-bitacora?idPeticion=`
- Sandbox: `…/sandbox/consultar-bitacora?idPeticion=`
- Valida `datosBitacora` (tipos, `resumen[]`, `resultadoMascara`, `logsEjecucion`).

### Diferencia con nuestro generador (`Postman/generador`)

| Aspecto | Equipo QA (`VCN REGRESIÓN`) | Nuestro `VCN Escenarios error` |
|---------|----------------------------|--------------------------------|
| Entrada | Cifrar dummy → Matriz pública | Request directo a **VCN** (`END_POINT_TLD_VCN`) + flujo raíz |
| Salida analizada | Descifrar dummy | Descifrar dummy (`DOMAIN_TLD_VALIDADOR_DUMMY`) |
| Validador default | `1000` | GATO `1008, 1009, 1011–1016` |
| Cuentas | Variables QA/Sandbox (ej. `666…`, `55555555`) | Seed `tld-validador-dummy-cuentas-vcn-dev.json` |
| Bitácora | Paso explícito en muchos escenarios | No en generador actual |
| OAuth Matriz | Sí | Token Matriz en env dev |

La **intención de negocio** (éxito, máscara, 510–515) es la misma; el **encadenamiento HTTP** no.

---

## Environments: variables clave

### Comparación QA vs Sandbox (VCN)

| Variable | QA VCN | SANDBOX VCN | Notas |
|----------|--------|-------------|-------|
| `validadorC` / `validador` | `1000` | `1000` | Canal validador Telered de prueba |
| `ValidadorGCM` | `3000` | `2500` | Validador real GCM — **fuera de alcance** |
| `validadorNOMASKRA` | `1079` | `1577` | Validador real sin máscara — **fuera de alcance** |
| `ValidadorTD` | `1147` | `1139` | Validador real token dinámico — **fuera de alcance** |
| `banco` | `TLRDPAPA` | `TLRDPAPA` | Emisor en idPeticion |
| `CuentaFeliz` | `4000000001234` | `55555555` | Distinto a nuestro `1100001328` |
| `PACA` / `PACC` | `66666600022` / `111777111` | `55555555` / `7777777799` | |
| `C511`–`C515` | cuentas QA sintéticas | cuentas Sandbox distintas | Mismo código esperado si el validador responde |
| `C514` | `1155555555` | `343534353435` | En Sandbox a veces marcado no reproducible si falta data |
| `mascara0`–`mascara6` | `666…` / `668…` | `44111144`, `99009887`, … | Cuentas para probar longitudes de máscara |
| `URLM` | apigate**qa** | apigate**sb** | |
| `URLBIT` | endpoint **qa** | endpoint **sandbox** | |

### Generación `idPeticion` / `idSolicitud`

Pre-request del paso **Cifrar** en `VCN REGRESIÓN.postman_collection.json` y en `Validacion Cuenta Nombre/VCN.postman_collection.json` (mismos scripts):

- `seqCounter` en env, incrementa cada run.
- **Código real:** `idPeticion = "TLRDPAPA" + pad5(seq) + YYYYMMDDHHMMSS` — literal **`TLRDPAPA` hardcodeado** en el script; **no** usa `pm.environment.get("banco")`.
- `idSolicitud = "IDSOL" + pad5(seq) + timestamp` (formato estándar).
- Excepciones de generación: **IdPetición MAX64** (42 ceros + timestamp → 64 chars), **IdPetición MIN1** (1 letra A–Z aleatoria).

**Corrección documental:** el env tiene variable `banco` (QA/Sandbox = `TLRDPAPA`; CANALBANK = `KNALPAPA`; BANCO NACIONAL = `NAPAPAPA`), pero esa variable **no alimenta** la construcción de `idPeticion` en los pre-request de Cifrar. Solo se usa en asserts de **`datos.banco`** (ver sección siguiente).

---

## `idPeticion` y prefijo SWIFT / banco — qué validan realmente

**Pregunta frecuente:** ¿el equipo de pruebas valida que `idPeticion` empiece con el SWIFT del banco / canal emisor?

**Respuesta corta:** en VCN método `0001` **no** validan `idPeticion.startsWith(env.banco)` de forma dinámica. En el flujo estándar exigen prefijo **`TLRDPAPA` fijo** (regex). En validadores reales algunos escenarios **relajan** esa regla. El test *«idPeticion comienza con el banco correspondiente al canal»* (`substring(0, 8) === banco`) está en **`XPRESS Ejecucion Manual`** (método `0002`), **no** en las colecciones VCN.

**Fuentes revisadas (2026-07-06):**

| Archivo | Rol |
|---------|-----|
| `VCN REGRESIÓN.postman_collection.json` | 38 carpetas VCN QA/Sandbox |
| `Validacion Cuenta Nombre/VCN.postman_collection.json` | Legacy; mismos patrones de script |
| `XPRESS Ejecucion Manual.postman_collection.json` | Otro producto; sí valida prefijo vs `banco` |

### Dónde corren los asserts

Casi siempre en el paso **Descifrar**, sobre `responseJson.respuesta.idPeticion` (eco del servicio en la respuesta descifrada), no como validación separada “interna” del lambda antes de cifrar.

### Matriz por tipo de escenario

| Grupo | Carpetas (ej.) | Assert sobre `idPeticion` en respuesta |
|-------|----------------|----------------------------------------|
| **Estándar** `validadorC` | Resp Exitosa, PACA/PACC, 1/34 dígitos, varios titulares, máscaras 0–6, GCM, CBC-GCM, errores 510–515 que llegan a descifrar | `/^TLRDPAPA\d{5}\d+$/` — prefijo **literal TLRDPAPA**, no lee `banco` del env |
| **Validador real sin máscara** | Resp Sin enmascarar (`validadorNOMASKRA`) | `/^[A-Za-z]+[0-9]+$/` — letras + números; **no exige** TLRDPAPA |
| **Validador real token dinámico** | Resp Exitosa Token Dinámico (`ValidadorTD`) | `/^[A-Za-z0-9]+$/` — alfanumérico; **sin prefijo SWIFT** |
| **IdPetición MAX64** | Resp IdPetición MAX64 | `/^[A-Za-z0-9]{64}$/` — solo longitud 64 |
| **IdPetición MIN1** | Resp IdPetición MIN1 | `/^[A-Za-z0-9]{1}$/` — 1 carácter; **sin prefijo** |
| **IdSolicitud MAX64 / MIN1** | Resp IdSolicitud … | Validan **`idSolicitud`** (64 o 1 char); no aplican regex TLRDPAPA a `idPeticion` en esas carpetas |
| **Errores de petición** | idPeticion vacío, >64, método incorrecto, etc. | Sin assert de formato útil en descifrar |

**Conteos en `VCN REGRESIÓN` (grep sobre el JSON):** ~30 tests con nombre «Validar campo idPeticion»; ~26 usan patrón `TLRDPAPA\d{5}`; ~6 usan variantes alfanuméricas (sin máscara, TD, MAX64, MIN1).

### GCM / CBC-GCM (validador real `ValidadorGCM`)

Aunque el validador es externo (`3000` QA / `2500` Sandbox), el paso Descifrar **sigue** usando `/^TLRDPAPA\d{5}\d+$/` en `idPeticion`. El pre-request de Cifrar también genera `TLRDPAPA…`.

### Campo `datos.banco` (distinto de prefijo en `idPeticion`)

En ~17 escenarios de éxito (flujo estándar con bloque completo de asserts):

```javascript
pm.expect(response.respuesta.respuestas[0].datos.banco).to.equal(pm.environment.get("banco"));
```

Eso valida el **banco de la cuenta devuelta**, no que `idPeticion` empiece con ese SWIFT. En QA/Sandbox `banco` = `TLRDPAPA` → coherente con el regex de `idPeticion`. En envs **CANALBANK** (`KNALPAPA`) / **BANCO NACIONAL** (`NAPAPAPA`) hay **tensión**: el env define otro banco pero los scripts de colección **siguen generando y assertando TLRDPAPA** en `idPeticion` si se ejecutan tal cual.

### Otros checks puntuales sobre `idPeticion`

| Check | Alcance en VCN REGRESIÓN |
|-------|--------------------------|
| `idPeticion` ≠ `idSolicitud` | Varios escenarios estándar |
| `idPeticion` respuesta = `env.idPeticion` (eco request) | **Solo 2** tests en toda la colección |
| `idSolicitud` formato `IDSOL…` | Escenarios estándar: `/^IDSOL\d{5}\d+$/` |

### XPRESS (método `0002`) — no confundir con VCN

En `XPRESS Ejecucion Manual.postman_collection.json` sí existe:

```javascript
pm.test("Validar que el idPeticion comienza con el banco correspondiente al canal", function () {
    const idPeticion = responseJson.respuesta.idPeticion;
    const banco = pm.environment.get("banco");
    pm.expect(idPeticion.substring(0, 8)).to.equal(banco);
    // fallback hardcodeado a "TLRDPAPA" en algunas ramas
});
```

Eso **no aplica** a `VCN REGRESIÓN` ni a `Validacion Cuenta Nombre/VCN`.

### Implicación para cuenta-nombre / ambigüedad SWIFT

Si el servicio interpreta los **primeros 8 caracteres** de `idPeticion` como SWIFT del emisor:

1. Las pruebas QA **no cubren** esa regla de forma general ni dinámica por canal.
2. La cubren **indirectamente** solo cuando todo el flujo usa `TLRDPAPA` de punta a punta.
3. Escenarios MIN1, token dinámico y parte de validadores reales **contradicen** la idea de prefijo SWIFT de 8 chars.
4. La variable env `banco` y el prefijo de `idPeticion` están **desacoplados** en scripts (documentación previa que decía `idPeticion = banco + …` era **incorrecta** respecto al código exportado).

### Nuestro generador (`Postman/generador`)

- Usamos `{{SWIFT_CANAL_EMISOR}}{{$timestamp}}` en muchos escenarios (no siempre `TLRDPAPA` literal en el JSON fuente).
- `Post-response.js` tipo `exito` **no** asserta hoy formato ni prefijo de `idPeticion` en la respuesta.
- `expectedBanco` valida `datos.banco` del validador dummy, no el prefijo de `idPeticion`.

### Modelo de negocio: emisor vs canal validador (aclaración operativa)

Ejemplo real dev GATO:

```json
{
  "idCanal": "1008",
  "validador": "1012",
  "peticion": {
    "idPeticion": "CELEGATO00000000001783308103",
    "metodo": "0001",
    "solicitudes": [{ "idSolicitud": "1", "parametros": { "cuenta": "36528000849" } }]
  }
}
```

| Rol | Canal | SWIFT (`alias`) | Qué hace |
|-----|-------|-----------------|----------|
| **Emisor** | `1008` | `CELEGATO` | Arma y cifra el request; **genera `idPeticion`** (prefijo = SWIFT del emisor) |
| **Validador** | `1012` | `TERAGATO` | Responde titulares de la cuenta consultada |

- `idPeticion` pertenece al **emisor** (`1008` / `CELEGATO`), no al validador.
- `datos.banco` en la respuesta de éxito viene del **validador** (`1012` / SWIFT del banco dueño de la cuenta), no del emisor.
- En nuestros escenarios A11: `idCanal` = `{{CANAL_EMISOR}}` (1008) y `validador` varía (`1008`…`1016`); `SWIFT_CANAL_EMISOR` en env = `CELEGATO` para 1008.

**Error común en asserts QA:** comparar `datos.banco` con `env.banco` del emisor (`TLRDPAPA`) cuando el validador es otro canal — en GATO `datos.banco` debe alinearse con el **validador** de la cuenta en Dynamo, no con el prefijo de `idPeticion`.

### Lambda `cuenta-nombre`: prod (`tld-api-cuenta-nombre-master`) vs dev (`tld-api-cuenta-nombre`)

Revisión 2026-07-06 — sin cambios de código, solo lectura.

| Aspecto | **Prod** `prod/.../lambdas/cuenta-nombre` | **Dev** `tld-api-cuenta-nombre/lambdas/cuenta-nombre` |
|---------|-------------------------------------------|------------------------------------------------------|
| Módulo `lib/validaciones.js` | **No existe** | **Sí** — validación explícita de parámetros |
| `idPeticion` tras descifrar | Solo se asigna a `bitacora.idPeticion` y se reenvía en respuestas de error 413 | `validarParametroIdPeticion(idPeticion, canalEmisor.alias)` |
| Reglas `idPeticion` (dev) | — | string; longitud **8–64**; alfanumérico; **primeros 8 chars = `alias` del canal emisor**; si no → **445** (`MSG_CATALOGO[445]`) |
| Ejemplo `CELEGATO…` + `idCanal` 1008 | **No se valida prefijo** (pasa si cuenta OK) | **Pasa** (`CELEGATO` = alias de 1008 en `canalesPruebas-dev`) |
| Validación método 0001 post-descifrado | Solo `validaFormatCta` (cuenta numérica, longitud min/max) | + solicitudes, método, plan, cifrado, catálogo de errores homologado |
| `metodoDisponible` | Contra **canalValidador** | Emisor y validador por separado (método asociado al emisor) |
| `datos.banco` | No lo calcula VCN; **reenvía** respuesta del validador (tras máscara) | Igual — origen = validador downstream |

**Conclusión:** producción **no** valida prefijo SWIFT en `idPeticion`; dev **sí** (código 445). Los tests QA que exigen `TLRDPAPA` en `idPeticion` reflejan su convención de ventana, no el comportamiento actual de prod. Nuestro generador con `SWIFT_CANAL_EMISOR` + matriz de validadores está **alineado con dev**, no con prod master.

---

## Mecanismo `no_reproducible`

A nivel de **carpeta** (pre-request):

1. Lista `requiredVars` por escenario (ej. `['CuentaFeliz']`, `['C511']`, `['mascara0']`).
2. Si falta valor en env → `no_reproducible = "true"` y mensaje `❌ No reproducible. Faltan: …`.
3. En tests: si `no_reproducible === "true"` → `pm.expect.fail(mensaje)`.

Permite correr la colección entera sin fallos crípticos cuando el env no tiene cuentas de ventana cargadas.

**En dev GATO** evitamos esto con seed Dynamo fijo y env `VCN Escenarios error - desarrollo`.

---

## Inventario de escenarios (38 carpetas)

Leyenda: **VCN** = nos importa para generador; **VAL** = validador real (ignorar para réplica).

### Éxito y formato (VCN)

| Carpeta | Cuenta / condición | Validador | Requests | Código / foco |
|---------|-------------------|-----------|----------|----------------|
| Resp Exitosa | `{{CuentaFeliz}}` | `validadorC` | 4 | `0`, máscara, bitácora |
| Resp Exitosa Cta PACA | `{{PACA}}` | `validadorC` | 4 | `0`, `producto=PACA` |
| Resp Exitosa Cta PACC | `{{PACC}}` | `validadorC` | 4 | `0`, `producto=PACC` |
| Resp Cuenta 1 dígito | `{{Cuenta1}}` | `validadorC` | 4 | `0` |
| Resp Cuenta 34 dígitos | `{{Cuenta34}}` | `validadorC` | 4 | `0` |
| Resp Varios titulares | `{{Variostitulares}}` | `validadorC` | 4 | `0`, `titulares.length > 1` |
| Resp IdPetición MAX64 | id largo | `validadorC` | 4 | `0` |
| Resp IdPetición MIN1 | id mínimo | `validadorC` | 4 | `0` |
| Resp IdSolicitud MAX64 | | `validadorC` | 4 | `0` |
| Resp IdSolicitud MIN1 | | `validadorC` | 4 | `0` |
| Largo de máscara 0–6 | `{{mascara0}}`…`{{mascara6}}` | `validadorC` | 4×7 | `0`, fórmula máscara |

### Validador real (VAL — no replicar)

| Carpeta | Validador |
|---------|-----------|
| Resp Exitosa GCM | `ValidadorGCM` |
| Resp Exitosa CBC-GCM | `ValidadorGCM` (mix CBC/GCM) |
| Resp Sin enmascarar | `validadorNOMASKRA` |
| Resp Exitosa Token Dinámico | `ValidadorTD` |

### Errores de negocio validador (VCN — código en `respuestas[0].resultado`)

| Carpeta | Cuenta | Código |
|---------|--------|--------|
| Cuenta no existe | hardcoded / no en catálogo | **510** |
| Cuenta cerrada | `{{C511}}` | **511** |
| Cuenta bloqueada | `{{C512}}` | **512** |
| Cuenta con transacciones no permitidas | `{{C513}}` | **513** |
| Cuenta con información faltante | `{{C514}}` | **514** |
| Cuenta con razón regulatoria | `{{C515}}` | **515** |
| Cuenta vacia | `""` | **413** (en descifrar / bitácora) |
| Cuenta con letras | letras en cuenta | **510** |
| Resp Cuenta más de 34 dígitos | >34 dígitos | error validación |
| Sin campo cuenta | omite `cuenta` | **999** |

### Errores de petición / Matriz (VCN — a menudo solo Cifrar + Matriz)

| Carpeta | Condición | Error Matriz (referencia) |
|---------|-----------|---------------------------|
| idPeticion vacío | `idPeticion=""` | falla antes de descifrar útil |
| método incorrecto | `metodo="9999"` | |
| idPeticion Más de 64 | >64 chars | |
| idSolicitud vacío | | |
| idSolicitud Más de 64 | | |
| idCanal no existente | canal inválido | `401` Canal emisor no existe |
| Validador no existente | `validador="9000"` | `404` Validador no existe |

**Nota:** la colección legacy tenía **Cuenta jurídica**; `VCN REGRESIÓN` **no** incluye carpeta equivalente. Nuestro generador sí (`4.1_juridica`).

---

## Tests automatizados relevantes (paso Descifrar)

### Éxito (`resultado = 0`)

- HTTP 200, JSON parseable.
- `datos`: `banco`, `cuenta`, `producto`, `estadoCuenta`, `titulares`.
- `estadoCuenta === "0"`.
- `producto` ∈ `{ PACA, PACC }`.
- **Enmascaramiento** (cuando aplica): por palabra, `visibleLen = len - floor(len/2)`, resto `*`; palabra de 1 carácter sin máscara.
- Comparación parcial con `expectedStaticData` (valores **dependen del validador/cuenta de ventana** — en GATO usamos seed Dynamo, no copiar literals del QA).
- Tiempo respuesta Matriz `< 29000` ms.

### Sin enmascarar (solo carpeta VAL + patrón útil)

- Titulares **iguales** al nombre completo (sin `*`).
- Referencia para asserts `expectedEnmascarado: false` (nuestro **1016**).

### Errores 511–515

- `respuestas[0].resultado` equals `511`…`515`.
- `datos` null o ausente.
- Bitácora: `resumen[].resultado` alineado.

### Bitácora (paso 4)

- `datosBitacora`: tipos (`resultadoValidador`, `resultado`, `resultadoMascara` number).
- `resumen[]`: `idSolicitud` string, `resultado` number.
- `logsEjecucion` array con links.

---

## Fórmula de enmascaramiento (igual que `util.js` y nuestro `Post-response.js`)

```
Por cada palabra en cada titular:
  si len === 1 → sin cambio
  si no:
    asteriscos = floor(len / 2)
    visible = palabra[0 .. len - asteriscos - 1]
    resultado = visible + '*'.repeat(asteriscos)
```

Ejemplo QA (respuesta ejemplo en colección): `"MON*** ZU** ES** CAS***"`.

En dev GATO validamos contra **titularesClaro** del seed (`datos-exito-0001.js`), no contra strings fijos del equipo.

---

## Mapa hacia nuestro generador (dev)

| Bloque QA (`TELERED VCN …`) | Nuestro `Metodo/0001` | Estado |
|-----------------------------|------------------------|--------|
| Resp Exitosa | `3_respuestaExitosa` cuenta feliz | Cubierto ×8 validadores |
| PACA / PACC | `2.1_paca`, `3.1_pacc` | Cubierto |
| Varios titulares | `5.1_varios` | Cubierto |
| Cuenta 1 / 34 dígitos | `7.1`, `7.2` | Cubierto |
| Máscara 0–6 | `6.0`–`6.6` + Unicode | Cubierto con seed Ñ |
| Sin enmascarar | `1016` `expectedEnmascarado: false` | Cubierto (GATO, no QA 1079/1577) |
| GCM / CBC-GCM / Token dinámico | `4_escenariosQA` (`gcm`, `cbc_gcm`, `token_dinamico`) | Cubierto en dev GATO |
| C511–C515, 510, 413, 999 | `2_respuestaCanalValidador` A9 | Cubierto con dummy `500000051x` + legacy |
| idPeticion / idSolicitud límites | `4_escenariosQA` | Cubierto ×8 validadores + GCM/CBC/TD |
| idPeticion / idSolicitud / método (error) | `1_metodo` / General | Cubierto en generador error |
| idCanal / validador inexistente | General + A9 | Cubierto |
| Bitácora | — | **No** en generador Newman actual |
| Cuenta jurídica | `4.1_juridica` | Solo en nuestro generador |

---

## XPRESS (solo delimitación)

- Colección `XPRESS Ejecucion Manual`: método **`0002`** Verificar identificador (`[VI] TC-VI-HP-001`, etc.).
- Mismo esqueleto Cifrar → Matriz → Descifrar en algunos casos, pero **no es cuenta-nombre VCN**.
- Env `SANDBOX XPRESS (No tocar) Copy` — no usar para VCN dev.

---

## Resumen operativo

1. **Usar `VCN REGRESIÓN` + `QA VCN` / `SANDBOX VCN`** como catálogo de intenciones y asserts, no como fuente de cuentas ni IDs de validador para dev.
2. **Ignorar las 4 carpetas VAL** y todo lo que esté en envs de bancos reales (carpeta hermana).
3. **Alinear** máscara, códigos `510`–`515`, PACA/PACC y rama sin máscara con nuestro seed Dynamo y GATO `1008–1016`.
4. **No intentar** reproducir bitácora ni ventanas QA (`1000`, `3000`, `1079`, …) en el generador hasta que exista endpoint y data equivalentes en dev.

---

## Changelog documental

| Fecha | Nota |
|-------|------|
| 2026-07-06 | Modelo emisor/validador (`idPeticion` = emisor, `datos.banco` = validador) + comparativa lambda prod vs dev |
| 2026-07-06 | Sección **`idPeticion` y prefijo SWIFT/banco** — análisis grep sobre colecciones exportadas; corrige generación (TLRDPAPA hardcodeado vs env `banco`) |
| 2026-07-06 | Mapa generador: `4_escenariosQA`, assert tiempo `MAX_TIEMPO_PROCESAR_MS` |
| 2026-07-06 | Estudio inicial sobre export Postman 2026-07-04 |
