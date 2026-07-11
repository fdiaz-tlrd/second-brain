# api_4 (VCN) para Dummies — la idea en dibujos

> Esto **no** explica el archivo `api_4.json`. Explica **qué te quiere decir** ese archivo.
> Sencillo, directo y con dibujos.

---

## 1. En una frase

> **Alguien quiere saber si un número de cuenta bancaria existe y de quién es.
> Este documento explica cómo se hace esa pregunta y cómo llega la respuesta.**

VCN = **V**alidación **C**uenta **N**ombre.

---

## 2. Los 3 personajes

```
   ┌──────────────┐        ┌──────────────┐        ┌────────────────────┐
   │    CANAL      │        │   TELERED    │        │  CANAL VALIDADOR   │
   │ (quien        │        │ (la autopista│        │ (el banco dueño    │
   │  pregunta)    │        │  del medio)  │        │  de la cuenta)     │
   └──────────────┘        └──────────────┘        └────────────────────┘
     un banco/app            el mensajero             el banco que sabe
     que necesita            que lleva y trae         la respuesta real
     validar una cuenta
```

- **CANAL** = el que hace la pregunta.
- **TELERED** = el que transporta la pregunta y la respuesta. No inventa nada, solo lleva.
- **CANAL VALIDADOR** = el banco que tiene la cuenta y responde.

---

## 3. La pregunta y la respuesta

```
  CANAL:            "¿La cuenta 7641233993 existe? ¿De quién es?"
                                    │
                                    ▼
  CANAL VALIDADOR:  "Sí. Banco TLRDPAPA, cuenta de ahorro,
                     está activa, titular:  JU** PER**"
```

Fíjate: el nombre del titular vuelve **tapado con asteriscos** (`JU** PER**`).
Eso es a propósito: se valida sin revelar el nombre completo.

---

## 4. Todo entra por UNA sola puerta

No hay una puerta por cada pregunta. Hay **una sola puerta**, y adentro
un papelito dice **qué método** se está pidiendo.

```
                        ┌─────────────────────────────┐
   muchas preguntas ───►│  POST /validador/validar    │
                        │   (LA única puerta)          │
                        └─────────────────────────────┘
                                    │
                          adentro dice:  metodo = "0001"
                                    │
                                    ▼
                         "Ah, quieres validar cuenta-nombre"
```

- La puerta siempre es la misma.
- El campo **`metodo`** (ej. `0001`) decide qué se está preguntando.
- `0001` = "valida esta cuenta y dime de quién es".

> Por eso en el archivo verás rutas como `/0001`. **No son puertas de verdad.**
> Son solo una forma de dibujar cada método por separado.

---

## 5. Todo viaja CERRADO CON LLAVE

El mensaje no viaja "abierto". Viaja como una **caja con candado**.

```
   CANAL                                            CANAL VALIDADOR
     │                                                    │
     │   pone la pregunta dentro de una caja              │
     │   y le echa candado  🔒                            │
     │                                                    │
     │ ─────  caja cerrada (texto raro: a4f9b2...)  ─────►│
     │                                                    │
     │                              solo él tiene la      │
     │                              llave para abrirla     │
     │                                                    ▼
     │                                       abre, lee, responde
     │                                       (otra caja cerrada)
     ◄──────────  caja cerrada de vuelta  ────────────────
```

- Lo que va y viene se ve como **texto ininteligible** (cifrado).
- Solo el que debe leerlo tiene la **llave** para abrirlo.
- Hay una guía moderna (**GCM**, la vigente) y una vieja (**CBC**, marcada *obsoleto*).
  Las dos existen; la nueva es la que se debe usar.

Y antes de todo, hay que **identificarse** con un token (como un carnet):
sin carnet válido, la puerta no abre.

---

## 6. Las dos caras del mismo negocio

El archivo describe **dos lados**, y es fácil confundirlos:

```
  LADO A: lo que TELERED te deja llamar
  ─────────────────────────────────────
   CANAL  ───────────►  TELERED
   "yo llamo a Telered para validar"


  LADO B: lo que TÚ (si eres banco) debes ofrecer
  ───────────────────────────────────────────────
   TELERED  ───────────►  CANAL VALIDADOR (tú)
   "Telered me llama a mí, yo debo saber responder"
```

- Si eres **Canal**: te interesa el LADO A (cómo pedir).
- Si eres **Canal Validador** (un banco): te interesa el LADO B (cómo responder).
- Es el **mismo** método `0001`, visto desde los dos extremos.

---

## 7. Qué más hay dentro del documento (en una línea cada uno)

```
  🪪  Autenticación   →  cómo sacar el "carnet" (token) para poder entrar
  📖  Términos        →  diccionario: qué significa cada palabra
  ✅  Requisitos      →  qué necesitas tener listo antes de empezar
  🔒  Cifrado         →  cómo cerrar/abrir la caja con candado (GCM / CBC viejo)
  🔢  Razones         →  la lista de "códigos de resultado" (0 = bien, otros = error)
  🏦  Canal Validador →  instrucciones para el banco que responde
  🎭  Enmascarado     →  regla para tapar los nombres con asteriscos
```

*(los iconos son solo para ubicarte rápido)*

---

## 8. Un viaje completo, paso a paso

```
  1. CANAL saca su carnet (token).                     🪪
  2. CANAL mete la pregunta en una caja y la cierra.   🔒
        { cuenta: "7641233993" }
  3. CANAL toca la ÚNICA puerta:  POST /validador/validar
  4. TELERED lleva la caja al CANAL VALIDADOR.
  5. CANAL VALIDADOR abre la caja con su llave.
  6. Busca la cuenta y arma la respuesta:
        { banco, cuenta, producto, estadoCuenta, titulares: ["JU** PER**"] }
  7. La cierra con candado y la devuelve.              🔒
  8. TELERED la lleva de vuelta al CANAL.
  9. CANAL la abre y lee el resultado.                 ✅
```

---

## 9. Lo que el archivo quiere transmitir (resumen brutal)

> **"Hay UNA puerta. Todo pasa cerrado con llave. Adentro, un `metodo`
> dice qué se pregunta. Con `0001` preguntas si una cuenta existe y de quién es,
> y te responden con el titular tapado. Telered solo transporta;
> el banco validador es quien realmente responde."**

Eso es todo. El resto del archivo son los detalles de: cómo sacar el carnet,
cómo cerrar la caja, qué códigos de error existen y cómo debe comportarse el banco
que responde.
