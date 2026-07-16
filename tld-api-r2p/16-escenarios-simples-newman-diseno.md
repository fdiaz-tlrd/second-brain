# Diseño — escenarios Newman R2P sencillos (sin ejecutar aquí)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Estado | **Diseño** — no colección Postman aún; Lenovo **no** corre Newman |
| Estudio | [`15-estudio-api7-marketplace-vs-prod.md`](./15-estudio-api7-marketplace-vs-prod.md) |
| Verdad | Prod R2P; doc `api_7` solo orientativa |

## Reglas al armar (cuando el usuario lo pida)

1. Un endpoint de entrada (matriz/`/validador/validar` Dig), **no** cuatro paths `/0011`… como URLs.
2. Payloads con **`nombreAcreedor`**, `idSolicitud` sin guiones, monto en rango env.
3. Aserciones de código según **prod**, no solo tablas HTML de `api_7`.
4. Incluir al menos un caso de pass-through `idTransaccionAutopista` / `fechaHora` si el foco es Dig/proxy.
5. Newman solo en máquina VPN; commitear logs según reglas Postman del workspace.

## Cola priorizada (v1 sencilla)

1. `R2P_0011_ok`
2. `R2P_0011_sin_nombreAcreedor` → 437
3. `R2P_0013_ok` (precondición: codigoR2P de #1 o seed)
4. `R2P_0013_codigo_inexistente` → 442
5. `R2P_envelope_autopista` (opcional Dig)
6. Resto de la lista en el estudio § D

## Pendiente explícito

- Datos de canales Dig (ids, llaves, alias, ops 0012/0014 en Dynamo).
- Si la corrida entra por matriz Dig o directo validador-api Dig.
- Generador/colección: aún no creado — esperar OK del usuario para implementar.
