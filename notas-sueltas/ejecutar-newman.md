# Ejecutar Newman

Desde `Postman/generador` (máquina con VPN):

```powershell
node run-newman.js vcn --codigo-fuente prod --nota "captura formato cifrado/plano"
node run-newman.js p2p --codigo-fuente prod --nota "captura formato cifrado/plano"
node run-newman.js p2m --codigo-fuente prod --nota "captura formato cifrado/plano"
```

Después: commit + push de `Postman/generador/logs/` completo.

Detalle del registro cifrado/plano: [`../Postman/generador/registro-respuesta-cifrada-vs-clara-2026-07-14.md`](../Postman/generador/registro-respuesta-cifrada-vs-clara-2026-07-14.md).
