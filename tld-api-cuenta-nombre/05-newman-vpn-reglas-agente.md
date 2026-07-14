# Newman y VPN — reglas para el agente

**Leer esto antes de interpretar pruebas o tocar `logs/`.**

---

## Dos máquinas

| Máquina | Newman | Git logs |
|---------|--------|----------|
| **Lenovo** (agente) | **NO** | Lee tras `git pull` del usuario |
| **Otra (VPN)** | **SÍ** | **Commit + push** de `Postman/generador/logs/` |

El usuario corre Newman en la máquina con VPN, hace **commit y push** de `logs/`, vuelve a Lenovo y dice «ya corrí Newman / ya subí los logs».

**Si el usuario dice que ejecutó Newman:** creerle. Leer primero `ultima-corrida-<suite>.md`, luego `registro-<suite>.md`. **No** decir «no se ha ejecutado» si hay ficha/fila nueva tras su push. **No** marcar como pendiente un run `prod`/`dev` que ya aparece ahí.

---

## Prohibido para el agente (Lenovo)

- Ejecutar `node run-newman.js`
- `git restore Postman/generador/logs/` o excluir logs de commits
- Borrar o «limpiar» logs del usuario para ocultar un run fallido **local** en Lenovo
- Tratar `ENOTFOUND` de un run hecho **en Lenovo** como fallo de escenario

---

## Qué leer tras push del usuario

1. [`Postman/generador/logs/ultima-corrida-vcn.md`](../Postman/generador/logs/ultima-corrida-vcn.md) — **última** corrida (código fuente, foto)
2. [`Postman/generador/logs/registro-vcn.md`](../Postman/generador/logs/registro-vcn.md) — hasta **8** ejecuciones (reconstruido desde `historial/` tras cada run)
3. [`Postman/generador/logs/resumen-fallos-vcn.md`](../Postman/generador/logs/resumen-fallos-vcn.md) — último run
4. [`Postman/generador/logs/historial/vcn/`](../Postman/generador/logs/historial/vcn/) — copias archivadas

Misma lógica para `p2m` y `p2p`. `--codigo-fuente prod|dev` es obligatorio en Newman; la foto debe generarse o el run aborta.

---

## Qué hace el agente en Lenovo

1. Código, escenarios, `armar-coleccion.js`, docs
2. Tras push de logs: actualizar checklist con datos del **registro**
3. Anotar «Newman pendiente» **solo** si el usuario **aún no** subió logs de ese cambio

---

## Usuario (máquina VPN)

```powershell
cd Postman/generador
node run-newman.js vcn --nota "post-deploy c47a264"
git add logs/
git commit -m "Newman VCN — ..."
git push
```

Opcional `--nota` para deploy, commit de código, carpeta probada, etc.

Detalle: [`Postman/generador/logs/README.md`](../Postman/generador/logs/README.md)

---

## Handoff Postman + Newman

Estado pausado, mapa de docs y pendientes: [`../Postman/00-estado-y-retomo.md`](../Postman/00-estado-y-retomo.md)

---

## Historial

| Fecha | Nota |
|-------|------|
| 2026-07-05 | Documento creado — no correr Newman en Lenovo |
| 2026-07-05 | Registro + historial (8 runs); prohibido `git restore logs/` |
| 2026-07-11 | Enlace a checkpoint `Postman/00-estado-y-retomo.md` |
