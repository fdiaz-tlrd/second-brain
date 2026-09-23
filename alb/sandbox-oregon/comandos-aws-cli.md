# Dump AWS CLI — ALB sandbox Oregon

Script: [`dump-alb-sandbox-oregon.ps1`](dump-alb-sandbox-oregon.ps1)

En la máquina con AWS CLI / credenciales:

```powershell
cd <ruta-donde-copiaste-el-ps1>
.\dump-alb-sandbox-oregon.ps1
# o:
.\dump-alb-sandbox-oregon.ps1 -OutDir C:\temp\alb-sandbox-oregon-raw
```

Si PowerShell bloquea la ejecución:

```powershell
powershell -ExecutionPolicy Bypass -File .\dump-alb-sandbox-oregon.ps1
```

Después copiá el contenido de la carpeta de salida a `second-brain/alb/sandbox-oregon/raw/`.

Mínimo útil: `01`, `03`, `05`, `06`, `08`. Ideal: todos.
