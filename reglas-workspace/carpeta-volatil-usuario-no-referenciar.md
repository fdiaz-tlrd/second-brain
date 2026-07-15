# Carpeta volátil del usuario — no referenciar

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Regla | Docs fijos en `second-brain` **no** enlazan ni dependen de la carpeta volátil del usuario (servilleta Lenovo ↔ VPN) |

## Qué es

Servilleta del usuario entre máquinas. Ejemplo legítimo: solo comandos sueltos, sin narrativa.

## Qué hace el agente

- Si un doc fijo necesita un archivo que estaba en esa carpeta, **copiar** junto al doc que lo usa y apuntar a la copia.
- **No** crear handoffs, reglas ni historial ahí.

## Copias fijas (2026-07-15)

| Contenido | Destino |
|-----------|---------|
| Datos prueba VCN / dummy / resultado histórico | [`../tld-api-cuenta-nombre/datos-prueba-dev/`](../tld-api-cuenta-nombre/datos-prueba-dev/) |
| Seed dummy generador | [`../Postman/generador/datos-vcn-dummy/`](../Postman/generador/datos-vcn-dummy/) |
| Logs despliegue | [`../prod_adactado_a_dev/evidencia-despliegue/`](../prod_adactado_a_dev/evidencia-despliegue/) |
| Fallos integración 2026-07-06 + CloudWatch proxy | [`../Postman/generador/VCN Escenarios error/Metodo/0001/5_fallosIntegracionValidador/`](../Postman/generador/VCN%20Escenarios%20error/Metodo/0001/5_fallosIntegracionValidador/) |

Error corregido: al limpiar la carpeta volátil se borraron `vcn-fallos-…` y `cloudwatch` **sin** copia previa. Restaurados 2026-07-15 en la carpeta del run.
