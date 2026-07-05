# Newman y VPN — reglas para el agente

**Leer esto antes de ejecutar `run-newman.js` o interpretar fallos de red.**

Documento de memoria viva: evita que cada sesión nueva repita el mismo error (correr Newman sin VPN y tratar `ENOTFOUND` como fallo del escenario o del código).

---

## Regla principal

**El agente NO ejecuta Newman contra dev/dummy salvo que el usuario diga explícitamente que la VPN está conectada y pida correr Newman.**

Sin esa confirmación:

- **No** correr `node run-newman.js …`
- **No** usar el resultado de un run sin VPN para concluir si un escenario pasa o falla
- **No** escribir “falló por red, hace falta VPN” como si fuera un descubrimiento — **ya se sabe**

---

## Por qué

Newman llama a hosts internos Telered, por ejemplo:

| Host / destino | Uso |
|----------------|-----|
| `tld-validador-dummy.dev.telered.internal` | `/cifrar`, `/descifrar` |
| API Gateway dev VCN/P2M/P2P | `END_POINT_TLD_*` del environment |

Desde la máquina del agente **sin VPN corporativa** esos nombres **no resuelven**. El error típico:

```
getaddrinfo ENOTFOUND tld-validador-dummy.dev.telered.internal
```

Eso **no** valida el escenario, **no** valida el código, **no** es un bug del generador Postman.

---

## Qué hace el agente (sin VPN)

1. Código en `tld-api-cuenta-nombre` (o repo que toque)
2. Escenarios en `Postman/generador/* Escenarios error/`
3. Regenerar colección: `node armar-coleccion.js` (desde `ensamblador/`)
4. Actualizar checklist / triage en `second-brain/tld-api-cuenta-nombre/`
5. Dejar anotado: **Newman pendiente — usuario con VPN**

---

## Qué hace el usuario (con VPN)

Desde `second-brain/Postman/generador`:

```powershell
node run-newman.js vcn --folder "General/0_jsonEntrada"
node run-newman.js vcn
```

Logs: `Postman/generador/logs/resumen-fallos-vcn.md`, `ultimo-run-vcn.json`.

El usuario comparte el log; el agente interpreta **solo** runs hechos con VPN.

---

## Cómo interpretar un run

| Síntoma | Significado correcto | Significado incorrecto |
|---------|----------------------|----------------------|
| `ENOTFOUND`, `ETIMEDOUT`, red | VPN ausente o red corporativa caída | “El escenario falla” |
| `ENOTFOUND` tras cambio de escenario | **Ignorar** hasta run con VPN | “Hay que arreglar el escenario” |
| HTTP 400/500 con body esperado | Resultado de prueba válido | — |
| Assertion Postman fallida con VPN OK | Revisar código o contrato del escenario | — |

---

## Deploy + Newman

Orden habitual acordado en el hilo VCN:

1. Agente: código + escenarios + colección regenerada + docs
2. Usuario: deploy dev (SAM/CI según flujo del repo)
3. Usuario: Newman con VPN
4. Agente: lee logs y cierra checklist

**No** mezclar “pendiente deploy” con “falló Newman” cuando el run ni siquiera llegó al API.

---

## Referencias

- Comandos Newman: [`Postman/generador/README.md`](../Postman/generador/README.md)
- Checklist VCN: [`02-checklist-errores-vcn-general.md`](./02-checklist-errores-vcn-general.md)
- Environments: `Postman/generador/entornos/* - desarrollo.postman_environment.json`

---

## Historial

| Fecha | Nota |
|-------|------|
| 2026-07-05 | Documento creado tras repetición de runs sin VPN y mensajes “hace falta VPN” tratados como hallazgo nuevo |
