# Scripts AWS CLI — sandbox Oregon / Virginia

**Repo RDP:** https://github.com/fdiaz-tlrd/aws-infra-dumps

```powershell
cd aws-infra-dumps\scripts
.\dump-alb.ps1                          # us-east-1 + us-west-2
.\revisar-dominios-personalizados.ps1   # idem
cd ..
git add raw/sandbox
git commit -m "dump sandbox virginia+oregon"
git push
```

Salidas: `raw/sandbox/virginia/` y `raw/sandbox/oregon/` (`alb/`, `dominios/`).
