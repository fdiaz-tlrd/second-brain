# VCN dev — datos de prueba Metodo/0001 (A11 éxito)

**Ambiente:** dev (VPN)  
**Colección generador:** `VCN Escenarios error` — **misma colección**, carpeta `Metodo/0001/3_respuestaExitosa/`  
**Environment Postman:** `Postman/generador/entornos/VCN Escenarios error - desarrollo.postman_environment.json`  
**Referencia QA (sandbox, no copiar cifras a ciegas):** `Postman/equipo-pruebas/Validacion Cuenta Nombre/estudio-coleccion-vcn.md`

---

## Canales fijos (escenarios éxito)

| Rol | Variable env | idCanal | Swift | Cifrado emisor | Validador 0001 en dev |
|-----|--------------|---------|-------|----------------|------------------------|
| **Emisor** | `CANAL_EMISOR` | **1008** | CELEGATO | aes-256-**cbc** | 25 ops, URL VPC `/validar` |
| **Validador propuesto A11** | *(nueva var)* `CANAL_VALIDADOR_EXITO` | **1009** | ASTRGATO | aes-256-cbc | dummy `.../validar` |

**Por qué 1009 y no 0001:** el env actual tiene `CANAL_VALIDADOR=0001` (MIDLPAPA, validador central dummy). Los escenarios **510–515** usaron validadores **1008–1016** con cuentas dummy `5000000510`…`515`. Para **éxito con cuentas reales de negocio** (1100…) hay que confirmar en dev qué validador devuelve `resultado=0`. **Propuesta:** **1009** (dummy `/validar`, plan GATO). Si falla Newman, probar **1012** o **1013** antes de tocar código.

**Emisor en body:** siempre `{{CANAL_EMISOR}}` → **1008** (igual que A9).

**Validador en body:** literal `"1009"` (o la var `{{CANAL_VALIDADOR_EXITO}}` cuando se agregue al environment).

---

## Cuentas — éxito (`resultado = 0`)

Valores tomados del **environment dev actual** (2026-07-05). Deben existir en **tld-validador-dummy** dev y responder `datos` completos.

| Variable env | Cuenta (string) | Escenario A11 | Assert clave |
|--------------|-----------------|---------------|--------------|
| `CuentaFeliz` / `CUENTA_VALIDA` | **1100001328** | Respuesta básica exitosa | `resultado=0`, `estadoCuenta="0"`, `titulares.length>=1` |
| `PACA` | **1100001161** | Producto PACA | `producto="PACA"` |
| `PACC` | **1200130811** | Producto PACC | `producto="PACC"` |
| `Cuentajuridica` | **1100029543** | Cuenta jurídica | `resultado=0` (titulares según dummy) |
| `Variostitulares` | **1100236049** | Varios titulares | `resultado=0`, **`titulares.length > 1`** |

### Límites de formato (cuenta válida)

Regla VCN: solo dígitos, longitud **1–34** (`LIM_MIN=1`, `LIM_MAX=34`).

| Variable env | Cuenta | Estado en env dev | Acción requerida |
|--------------|--------|-------------------|------------------|
| `Cuenta1` | **`1`** | **no existe** en env | Agregar al environment; ítem Dynamo al final de este doc |
| `Cuenta34` | **`1234567890123456789012345678901234`** | **no existe** en env | Agregar al environment; ítem Dynamo al final de este doc |

---

## Cuentas — máscaras (`resultado = 0`, enmascaramiento titulares)

| Variable env | Cuenta | Largo máscara QA | Nota |
|--------------|--------|------------------|------|
| `mascara0` | **1100108552** | 0 | |
| `mascara1` | **1200218707** | 1 | |
| `mascara2` | **1100207446** | 2 | |
| `mascara3` | **1100023371** | 3 | |
| `mascara4` | **1100015294** | 4 | |
| `mascara5` | **1100015294** | 5 | **Misma cuenta que mascara4** en env dev (copiado de QA CANALBANK). Confirmar si en dummy dev produce máscaras distintas. |
| `mascara6` | **1200135000** | 6 | |

Assert máscara (QA): para cada palabra en titular, longitud enmascarada ≈ `floor(len/2)`. Escenario A11 puede empezar solo con `resultado=0` + titulares no vacíos; asserts de máscara en fase posterior.

---

## Cuentas — error negocio (ya en A9, no repetir en A11)

Bloque `Metodo/0001/2_respuestaCanalValidador/` — emisor **1008**, validador **1008–1016** (sin 1010), cuentas dummy:

| Código | Cuenta |
|--------|--------|
| 510 | 5000000510 |
| 511 | 5000000511 |
| 512 | 5000000512 |
| 513 | 5000000513 |
| 514 | 5000000514 |
| 515 | 5000000515 |

---

## Cuentas — error negocio legacy env (QA sandbox, **no** usadas en generador A9)

En environment dev siguen variables heredadas de QA; **514 vacío**:

| Variable | Valor env dev | Problema |
|----------|---------------|----------|
| `C511` | 1100000239 | OK para pruebas manuales 511 |
| `C512` | 1100000411 | OK |
| `C513` | 1100024932 | OK |
| `C514` | **"" (vacío)** | QA tampoco tenía valor — **no reproducible** hasta cargar cuenta en dummy |
| `C515` | 1100003126 | OK |

Para escenario **514** en dev usar cuenta dummy **`5000000514`** (A9), no `C514`.

---

## Variables a agregar al environment dev (A11)

| Key | Valor propuesto | Obligatorio |
|-----|-----------------|-------------|
| `CANAL_VALIDADOR_EXITO` | **1009** | sí |
| `Variostitulares` | **1100236049** | sí (falta en env) |
| `Cuenta1` | **`1`** | sí |
| `Cuenta34` | **`1234567890123456789012345678901234`** | sí |

No duplicar: `CuentaFeliz` = `CUENTA_VALIDA` = **1100001328** (ya en env).

---

## Escenarios JSON previstos (A11)

| Archivo carpeta | cuenta | expectedProducto |
|-----------------|--------|------------------|
| `3_respuestaExitosa/1_cuentaBasica/1.1_cuenta_feliz.json` | `{{CuentaFeliz}}` | — |
| `.../2_productoPaca/2.1_paca.json` | `{{PACA}}` | PACA |
| `.../3_productoPacc/3.1_pacc.json` | `{{PACC}}` | PACC |
| `.../4_juridica/4.1_juridica.json` | `{{Cuentajuridica}}` | — |
| `.../5_variosTitulares/5.1_varios.json` | `{{Variostitulares}}` | — |
| `.../6_mascaras/0..6/` | `{{mascara0}}`…`{{mascara6}}` | — |
| `.../7_limitesFormato/7.1_un_digito.json` | `{{Cuenta1}}` | — |
| `.../7_limitesFormato/7.2_34_digitos.json` | `{{Cuenta34}}` | — |

**Total previsto:** **13** escenarios éxito (7 máscaras cuentan como 7).

---

## Verificación manual antes del generador (checklist VPN)

1. Una petición con emisor **1008**, validador **1009**, cuenta **1100001328** → HTTP 200, `resultado=0`, `datos` completo.
2. Repetir PACA / PACC / jurídica / varios titulares.
3. Probar `Cuenta1` y `Cuenta34` candidatas; anotar valores finales en este archivo y en el environment.
4. Si **1009** falla, anotar aquí el validador que sí funciona.

---

## Newman baseline (referencia)

| Run | Tests | Nota |
|-----|-------|------|
| 2026-07-05T23:40Z completo | **1098/1098** | Incluye A10 `1_cuenta` 20 escenarios |
| Pre-A10 | 1008/1008 | Solo 10 escenarios 413 |

Tras A11: baseline sube ~13 escenarios × ~N asserts.

---

## DynamoDB `tld-validador-dummy` — registros para escenarios

**Tabla:** `tld-validador-dummy`  
**Lambda:** `tld-validador-dummy/lambdas/validar/app.js` — método `0001`, `consultarCuenta(cuenta)` por PK.

### Esquema ítem

| Campo | Tipo | Uso |
|-------|------|-----|
| `cuenta` | string | **Partition key** |
| `banco` | string | SWIFT banco en `datos.banco` |
| `estadoCuenta` | string | `"0"` activa (éxito VCN); `"1"` en ítems error legacy notas |
| `resultado` | number | `0` = éxito con `datos`; `510`–`515` = negocio, `datos: null` |
| `tipoCuenta` | string | Mapea a `datos.producto` (`PACA`, `PACC`, …) |
| `titulares` | string[] | Nombres **en claro**; VCN enmascara según canal |

Regla en `validar/app.js`: si `resultado` ∈ `{510,511,512,513,514,515}` → respuesta cifrada con `datos: null`; si no → `datos` con `banco`, `cuenta`, `producto`, `estadoCuenta`, `titulares`.

### A9 — errores 510–515 (Postman `2_respuestaCanalValidador`)

Fuente: [`refactoria/notas.md`](../../refactoria/notas.md) líneas 80–144. **Cargar en dev** si aún no están.

```json
[
  {
    "cuenta": "5000000510",
    "banco": "TLRDPAPA",
    "estadoCuenta": "1",
    "resultado": 510,
    "tipoCuenta": "PACA",
    "titulares": ["Número de cuenta incorrecta"]
  },
  {
    "cuenta": "5000000511",
    "banco": "TLRDPAPA",
    "estadoCuenta": "1",
    "resultado": 511,
    "tipoCuenta": "PACA",
    "titulares": ["Número de cuenta cerrado"]
  },
  {
    "cuenta": "5000000512",
    "banco": "TLRDPAPA",
    "estadoCuenta": "1",
    "resultado": 512,
    "tipoCuenta": "PACA",
    "titulares": ["Número de cuenta bloqueado"]
  },
  {
    "cuenta": "5000000513",
    "banco": "TLRDPAPA",
    "estadoCuenta": "1",
    "resultado": 513,
    "tipoCuenta": "PACA",
    "titulares": ["Transacción no permitida"]
  },
  {
    "cuenta": "5000000514",
    "banco": "TLRDPAPA",
    "estadoCuenta": "1",
    "resultado": 514,
    "tipoCuenta": "PACA",
    "titulares": ["Falta información obligatoria de consulta"]
  },
  {
    "cuenta": "5000000515",
    "banco": "TLRDPAPA",
    "estadoCuenta": "1",
    "resultado": 515,
    "tipoCuenta": "PACA",
    "titulares": ["Razón regulatoria"]
  }
]
```

**Respuesta descifrada esperada (ejemplo 511):**

```json
{
  "respuesta": {
    "idPeticion": "TLRDPAPA00000000001783287263",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 511,
        "datos": null
      }
    ]
  }
}
```

### A11 — éxito (`resultado = 0`)

Titulares en claro para que VCN aplique máscara (`validarEnmascaramiento: Y` en canal emisor/validador). **`banco`** alineado a dev GATO.

```json
[
  {
    "cuenta": "1100001328",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACA",
    "titulares": ["LOPEZ PHILLIPS MALAGON"]
  },
  {
    "cuenta": "1100001161",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACA",
    "titulares": ["TITULAR CUENTA PACA"]
  },
  {
    "cuenta": "1200130811",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACC",
    "titulares": ["TITULAR CUENTA PACC"]
  },
  {
    "cuenta": "1100029543",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACA",
    "titulares": ["EMPRESA DEMO JURIDICA SA"]
  },
  {
    "cuenta": "1100236049",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACA",
    "titulares": ["ANA MARIA RODRIGUEZ", "CARLOS ALBERTO RODRIGUEZ"]
  },
  {
    "cuenta": "1100108552",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACA",
    "titulares": ["MASCARA CERO TITULAR"]
  },
  {
    "cuenta": "1200218707",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACA",
    "titulares": ["PEDRO ANTONIO MARTINEZ"]
  },
  {
    "cuenta": "1100207446",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACA",
    "titulares": ["SOFIA ISABEL CASTILLO"]
  },
  {
    "cuenta": "1100023371",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACA",
    "titulares": ["RICARDO ENRIQUE VARGAS"]
  },
  {
    "cuenta": "1100015294",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACA",
    "titulares": ["MARIA FERNANDA LOPEZ GARCIA"]
  },
  {
    "cuenta": "1200135000",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACA",
    "titulares": ["ALEJANDRO JOSE MORALES DEL RIO"]
  },
  {
    "cuenta": "1",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACA",
    "titulares": ["CUENTA UN DIGITO"]
  },
  {
    "cuenta": "1234567890123456789012345678901234",
    "banco": "TLRDPAPA",
    "estadoCuenta": "0",
    "resultado": 0,
    "tipoCuenta": "PACA",
    "titulares": ["CUENTA TREINTA Y CUATRO DIGITOS"]
  }
]
```

**Nota `mascara4` / `mascara5`:** misma cuenta **`1100015294`** en environment dev; un solo ítem Dynamo sirve para ambos escenarios Postman.

**Respuesta descifrada esperada (éxito básico):**

```json
{
  "respuesta": {
    "idPeticion": "CELEGATO1739287263",
    "respuestas": [
      {
        "idSolicitud": "1",
        "resultado": 0,
        "datos": {
          "banco": "TLRDPAPA",
          "cuenta": "1100001328",
          "producto": "PACA",
          "estadoCuenta": "0",
          "titulares": ["LO** PHIL**** MALA****"]
        }
      }
    ]
  }
}
```

(Los titulares enmascarados dependen de la regla VCN; el ítem Dynamo lleva nombres en claro.)

### Legacy env QA (opcional — pruebas manuales 511–515 con cuentas 1100…)

Solo si se quieren probar con variables `C511`…`C515` del environment (distintas de `500000051x`). **`C514` vacío en env** — usar `5000000514` para 514.

```json
[
  {
    "cuenta": "1100000239",
    "banco": "TLRDPAPA",
    "estadoCuenta": "1",
    "resultado": 511,
    "tipoCuenta": "PACA",
    "titulares": ["Cuenta cerrada legacy"]
  },
  {
    "cuenta": "1100000411",
    "banco": "TLRDPAPA",
    "estadoCuenta": "1",
    "resultado": 512,
    "tipoCuenta": "PACA",
    "titulares": ["Cuenta bloqueada legacy"]
  },
  {
    "cuenta": "1100024932",
    "banco": "TLRDPAPA",
    "estadoCuenta": "1",
    "resultado": 513,
    "tipoCuenta": "PACA",
    "titulares": ["Transacción no permitida legacy"]
  },
  {
    "cuenta": "1100003126",
    "banco": "TLRDPAPA",
    "estadoCuenta": "1",
    "resultado": 515,
    "tipoCuenta": "PACA",
    "titulares": ["Razón regulatoria legacy"]
  }
]
```

### Carga en dev (AWS CLI)

Región **us-east-1**. Repetir por ítem (ejemplo):

```powershell
aws dynamodb put-item --region us-east-1 --table-name tld-validador-dummy --item '{
  "cuenta": {"S": "1100001328"},
  "banco": {"S": "TLRDPAPA"},
  "estadoCuenta": {"S": "0"},
  "resultado": {"N": "0"},
  "tipoCuenta": {"S": "PACA"},
  "titulares": {"L": [{"S": "LOPEZ PHILLIPS MALAGON"}]}
}'
```

Tras cargar A11: actualizar environment con `Variostitulares=1100236049`, `Cuenta1=1`, `Cuenta34=1234567890123456789012345678901234`.
