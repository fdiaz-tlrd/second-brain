# Ejecutar Newman

Desde `Postman/generador` (máquina con VPN):

```powershell
node run-newman.js p2p --codigo-fuente prod --nota "MATRIZ P2P re-run tras fix [CAPTURA]"
node run-newman.js p2m --codigo-fuente prod --nota "MATRIZ P2M re-run tras fix [CAPTURA]"
```

Después: commit + push de `Postman/generador/logs/` completo.
