# Referencia producción — `prod/tld-api-cuenta-nombre-master`

Documento del agente (2026-07-05). Aclaración de alcance.

## Qué es

Snapshot **congelado** de cómo funciona **VCN en producción hoy** (código en [`../../prod/tld-api-cuenta-nombre-master`](../../prod/tld-api-cuenta-nombre-master)).

## Qué NO es

- **No** es plantilla para copiar ni parchear línea a línea.
- **No** sustituye P2M/P2P + `tld-api-base` para **estructura/código** del refactor.
- **No** entra en cada triage **salvo** contraste de **reglas de negocio** (como triage #8 validador).

## Principio (acordado 2026-07-05)

**El refactor VCN mejora código; no cambia reglas de negocio con clientes productivos.**  
Prod define el **contrato de comportamiento** ante clientes; Postman VCN debe converger a eso, no a P2M por defecto.

## Reglas

| Sí | No |
|----|-----|
| Saber que **existe** y contrastar **reglas de negocio** (solo lectura) | Abrirlo para copiar estructura sin criterio |
| **NUNCA modificar** el árbol `prod/` | Usarlo para imponer parches o “hacer como P2M” |
| Contrato productivo vs dev refactor vs Postman | Tratar P2M como contrato VCN |

Si se modifica, deja de ser referencia fiel de producción.

## Cuándo usarlo (futuro)

Cuando el usuario lo indique: entender comportamiento actual en prod, comparar antes/después de un release, auditoría, etc.

## Referencias activas **ahora** (corrección VCN)

| Referencia | Uso |
|------------|-----|
| `tld-api-cuenta-nombre` (dev) | Repo que se corrige |
| `tld-api-p2m`, `tld-api-alias` | Especificación transversal viva |
| `tld-api-base` | Modelo de estudio (copiar/adaptar) |
| Postman General + Newman | Contrato debe vs está |
