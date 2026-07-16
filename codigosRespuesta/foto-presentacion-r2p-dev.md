# Foto de presentación al cliente — R2P (dev)

Solo observación de corrida Newman. **No** incluye catálogo / “Nueva descripción”. Archivo por **código fuente** (`prod`/`dev`): no se sobrescriben entre sí.

| Campo | Valor |
|-------|-------|
| Servicio | R2P |
| Código fuente | dev |
| Fecha corrida | 2026-07-16T17:10:14.314Z |
| Nivel ejecución | MATRIZ |
| Escenarios analizados | 4 |
| Filas foto (código+descripción) | 1 |
| Contratos (columnas) | B |
| Patrones estructurales únicos | 1 |

## Contratos (referencia)

`A.mensajeError` ≠ `A.descripcionError` (claves distintas). Detalle: [`formas-presentacion-cliente.md`](formas-presentacion-cliente.md).

## Foto por código

Un renglón = código + descripción observada. Columnas = contratos vistos en la corrida (`x`/`-`).

| Código | Descripción | B | Escenarios | HTTP vistos | Cifrado |
|--------|-------------|---|------------|-------------|---------|
| 0 | *(sin texto; solo resultado)* | x | 4 | 200 | sí |

## Patrones estructurales únicos

Primera `presentacionPatternKey` = patrón; misma clave se agrega; distinta = nuevo. Muestras request/response: [`foto-presentacion-r2p-dev.muestras.md`](foto-presentacion-r2p-dev.muestras.md).

| # | Forma | Código | Campo texto | Claves | HTTP | Cifrado | Escenarios | Ejemplo |
|---|-------|--------|-------------|--------|------|---------|------------|---------|
| 1 | B | 0 | — | `idPeticion,respuestas` | 200 | sí | 4 | 0011.3.1009.1.1. validador ASTRGATO — R2P feliz (exito) |
