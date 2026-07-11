# api_4 (VCN) — estructura propuesta (árboles)

> Borrador para editar. Derivado de `12-api_4-para-dummies.md`.
> Solo árboles. Aquí planteamos **cómo debería estar estructurado el archivo**.
>
> **Estado (jul-2026):** el **Árbol 1** (navegación / `tagGroups`) está **implementado** en el generador VCN (`apis/vcn.json` + plantillas). Los árboles 2 y 3 siguen siendo referencia conceptual.

---

## Árbol 1 — Estructura del documento (secciones / navegación)

```
api_4 (VCN) — Validación Cuenta Nombre
│
├── 0. Portada
│   ├── Título
│   ├── Qué resuelve (1 frase: ¿la cuenta existe y de quién es?)
│   └── Servers (SandBox, QA)
│
├── 1. Conceptos base
│   ├── Personajes  (Canal · Telered · Canal Validador)
│   ├── Términos    (diccionario)
│   └── Requisitos  (qué tener listo antes de empezar)
│
├── 2. Seguridad (transversal)
│   ├── Autenticación   (Canal → Telered: POST /auth/token, OAuth2, bearer JWT)
│   └── Cifrado y Descifrado
│       ├── Guía vigente:  RSA + AES-256-GCM
│       └── Guía obsoleta: RSA + AES-256-CBC
│
├── 3. LADO A — lo que TELERED expone   (el Canal llama)
│   ├── Timeout Canal → Telered: máx 25 s   (el Canal no debe esperar más)
│   ├── Endpoint real:  POST /validador/validar
│   │   ├── Request:  envelope cifrado   (peticion = string)
│   │   └── Response: envelope cifrado   (respuesta = string)
│   └── Método lógico 0001               (contenido descifrado)
│       ├── Request:  peticion → { idPeticion, metodo, solicitudes[ cuenta ] }
│       └── Response: { idPeticion, respuestas[ resultado, datos ] }
│
├── 4. LADO B — lo que el CANAL VALIDADOR expone   (Telered llama)
│   ├── Especificación
│   │   ├── URL propia   (la define la Institución Financiera)
│   │   ├── Autenticación del CV
│   │   │   ├── Token fijo o suscrito
│   │   │   └── Token dinámico (recomendado) = misma especificación OAuth2 que §2 Autenticación
│   │   ├── Seguridad de transporte   (VPN/Público, TLS≥1.2, WAF, certificados)
│   │   ├── Timeout Telered → CV: máx 10 s   (el CV debe responder antes)
│   │   └── Pasos de descifrado
│   ├── Método lógico 0001 — mensaje cifrado    (envelope: peticion/respuesta = string)
│   └── Método lógico 0001 — contenido descifrado
│       ├── Request:  { idPeticion, metodo, solicitudes[ cuenta ] }
│       └── Response: { idPeticion, respuestas[ resultado, datos ] }
│
└── 5. Referencias
    ├── Razones de respuesta   (códigos de resultado: 0 = ok, otros = error)
    │   ├── Interno de la autopista (Telered)
    │   └── Canal Validador
    └── Enmascarado            (regla de asteriscos sobre titulares)
```

---

## Árbol 2 — Anatomía de un mensaje (cerrado → abierto)

```
MENSAJE QUE VIAJA (cifrado)
│
├── idCanal
├── validador
├── peticion  ──────────►  <cadena cifrada>   (caja con candado 🔒)
├── idTransaccionAutopista        (solo Lado B)
└── fechaHora                     (solo Lado B)
        │
        │  se abre con la llave
        ▼
CONTENIDO DESCIFRADO (lo que hay dentro de "peticion")
│
├── idPeticion
├── metodo            = "0001"
└── solicitudes[]
    ├── idSolicitud
    └── parametros
        └── cuenta
```

```
RESPUESTA QUE VIAJA (cifrada)
│
└── respuesta  ──────────►  <cadena cifrada>   (caja con candado 🔒)
        │
        │  se abre con la llave
        ▼
CONTENIDO DESCIFRADO (lo que hay dentro de "respuesta")
│
├── idPeticion
└── respuestas[]
    ├── idSolicitud
    ├── resultado          (0 = ok / otro = error)
    └── datos
        ├── banco
        ├── cuenta
        ├── producto
        ├── estadoCuenta
        └── titulares[]     (enmascarados: "JU** PER**")
```

---

## Árbol 3 — Las dos caras del mismo método 0001

```
                        MÉTODO 0001
                             │
        ┌────────────────────┴────────────────────┐
        │                                          │
   LADO A (pedir)                            LADO B (responder)
   Canal → Telered                           Telered → Canal Validador
        │                                          │
   ┌────┴─────┐                              ┌─────┴─────┐
 cifrado   descifrado                      cifrado    descifrado
 (envelope) (campos)                       (envelope)  (campos)
```
