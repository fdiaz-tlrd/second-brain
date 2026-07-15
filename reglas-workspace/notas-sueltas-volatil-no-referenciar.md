# Carpeta volátil `notas-sueltas/` — no referenciar

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Regla | Docs fijos en `second-brain` **no** enlazan ni dependen de `notas-sueltas/` |

## Qué es

Servilleta del usuario entre Lenovo ↔ máquina VPN. Ejemplo legítimo: `ejecutar-newman.md` (solo comandos, sin narrativa).

## Qué hace el agente

- Si un doc fijo necesita un archivo que estaba en `notas-sueltas/`, **copiar** junto al doc que lo usa (carpeta del tema) y apuntar la referencia a la copia.
- **No** crear handoffs, reglas ni historial en `notas-sueltas/`.

## Copias creadas (2026-07-15)

| Origen volátil | Copia fija |
|----------------|------------|
| `resultado_prueba.md`, `vcn-datos-…`, cargar + json dummy | [`../tld-api-cuenta-nombre/datos-prueba-dev/`](../tld-api-cuenta-nombre/datos-prueba-dev/) |
| cargar + json dummy (generador) | [`../Postman/generador/datos-vcn-dummy/`](../Postman/generador/datos-vcn-dummy/) |
| `error.md`, `errorDespligue.md` | [`../prod_adactado_a_dev/evidencia-despliegue/`](../prod_adactado_a_dev/evidencia-despliegue/) |

Los originales pueden seguir en `notas-sueltas/` para uso personal; la documentación ya no los referencia.
