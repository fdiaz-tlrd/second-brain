# Referencia producción — `prod/tld-api-cuenta-nombre-master`

Documento del agente (2026-07-05). Aclaración de alcance.

## Qué es

Snapshot **congelado** de cómo funciona **VCN en producción hoy** (código en [`../../prod/tld-api-cuenta-nombre-master`](../../prod/tld-api-cuenta-nombre-master)).

## Qué NO es

- **No** es plantilla para copiar ni parchear.
- **No** es referencia de corrección (esa es P2M/P2P + `tld-api-base` + contrato Postman General).
- **No** entra en el trabajo **ahora** (Fase A, triage, código en `tld-api-cuenta-nombre`).

## Reglas

| Sí | No |
|----|-----|
| Saber que **existe** y dónde está | Abrirlo, diff ni citarlo en triage **salvo que el usuario lo pida** |
| **NUNCA modificar** el árbol `prod/` | Usarlo para “hacer como prod” o justificar parches |
| Usarlo **en el futuro** para contrastar prod vs dev vs contrato | Tratarlo como objetivo de deploy |

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
