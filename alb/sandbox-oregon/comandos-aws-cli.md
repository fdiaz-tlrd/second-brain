# Scripts AWS CLI — sandbox Oregon

## ALB + target health

[`dump-alb-sandbox-oregon.ps1`](dump-alb-sandbox-oregon.ps1) → salida en `alb-sandbox-oregon-raw/`

```powershell
.\dump-alb-sandbox-oregon.ps1
# o:
powershell -ExecutionPolicy Bypass -File .\dump-alb-sandbox-oregon.ps1
```

## Dominios personalizados API Gateway (+ cruce con Hosts del ALB)

[`revisar-dominios-personalizados.ps1`](revisar-dominios-personalizados.ps1) → salida en `dominios-personalizados-raw/`

```powershell
# Solo dominios + mappings (REST y HTTP/v2) en us-west-2:
.\revisar-dominios-personalizados.ps1

# Con cruce contra reglas HTTPS del ALB (dump previo):
.\revisar-dominios-personalizados.ps1 `
  -AlbRulesJson .\alb-sandbox-oregon-raw\04-rules-listener-0.json

# Otra región:
.\revisar-dominios-personalizados.ps1 -Region us-east-1
```

Traé la carpeta a `second-brain/alb/sandbox-oregon/dominios-personalizados-raw/`.

Útil: `05-resumen-dominios.csv` y, si cruzaste, `07-cruce-alb-vs-dominios.csv` (columnas `SinMapping` / nota).
