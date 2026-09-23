# Scripts AWS CLI — sandbox Oregon

**Repo de trabajo en el RDP (scripts + dumps):** https://github.com/fdiaz-tlrd/aws-infra-dumps

```powershell
git clone https://github.com/fdiaz-tlrd/aws-infra-dumps.git
cd aws-infra-dumps\scripts\sandbox-oregon
.\dump-alb-sandbox-oregon.ps1
.\revisar-dominios-personalizados.ps1
cd ..\..
git add raw
git commit -m "dump sandbox oregon"
git push
```

Salidas en ese repo: `raw/sandbox-oregon/alb/` y `raw/sandbox-oregon/dominios/`.

Los `.ps1` de esta carpeta en `second-brain` son copia de estudio; el flujo RDP usa **`aws-infra-dumps`**.
