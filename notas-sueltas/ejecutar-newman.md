# Ejecutar Newman

Máquina con VPN. Ya desplegado `prod_adactado_a_dev` (VCN/validador/matriz en dev).

Desde `Postman/generador`:

```powershell
node run-newman.js vcn --codigo-fuente prod --nota "foto presentacion contratos post deploy prod-a-dev"
```

Después: commit + push de `Postman/generador/logs/` completo. Luego (Lenovo o VPN):

```powershell
node extraer-foto-presentacion.js logs/resultados-por-escenario-vcn.json
```

Detalle: [`../Postman/generador/registro-presentacion-cliente-2026-07-14.md`](../Postman/generador/registro-presentacion-cliente-2026-07-14.md).
