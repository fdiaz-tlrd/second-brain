# Iteración 01 — Primera recopilación prod-a-dev vía MATRIZ (VCN completo)

**Fecha del run:** 2026-07-12T17:20:06Z (UTC)  
**Commit logs:** `second-brain` `96656b5` — mensaje del usuario: `node run-newman.js vcn --codigo-fuente prod --nota "prod-a-dev rama prod-a-dev"`

---

## ¿Fue coherente con lo acordado?

**Sí.** El run ejecuta exactamente la estrategia de `comparar-prod-vs-dev`:

| Acuerdo | Cumplido |
|---------|----------|
| Código desplegado = **producción** en AWS dev (`prod_adactado_a_dev`, rama `prod-a-dev`) | `--codigo-fuente prod` + nota explícita |
| Mismo ambiente Postman **desarrollo** (URLs dev) | Environment `VCN Escenarios error - desarrollo` |
| Ruta de integración **vía matriz** (no VCN directo) | `NIVEL_EJECUCION=MATRIZ` en environment |
| Recopilar **respuesta por escenario** (no solo fallos) | `*_por-escenario.json` / `.md` generados |
| Etiquetar run para investigación posterior | `codigoFuente`, `nivelEjecucion`, historial `..._prod_MATRIZ_completo_*` |

La recopilación **funcionó como herramienta**: metadata correcta, 1263 ejecuciones HTTP sin fallo de red, informe utilizable.  
Que **501 tests fallen** era **esperable** (asserts alineados a dev); lo relevante es **qué respondió** el código prod en cada escenario.

---

## Artefactos del run

| Archivo | Rol |
|---------|-----|
| `generador/logs/historial/vcn/2026-07-12T17-20-06Z_prod_MATRIZ_completo_por-escenario.json` | **Fuente principal** para análisis / `comparar-runs.js` |
| `..._por-escenario.md` | Vista humana por escenario |
| `..._completo.json` / `.md` | Newman completo + resumen fallos |
| `generador/logs/registro-vcn.md` | Fila con Código **prod**, Nivel **MATRIZ** |
| `generador/logs/resumen-fallos-vcn.md` | Cabecera con `nivelEjecucion: MATRIZ` |
| `generador/Windows PowerShell.txt` | Consola Newman (confirma flujo MATRIZ en logs) |

---

## Resumen numérico

| Métrica | Valor |
|---------|-------|
| Requests Newman | 1263 (failed **0**) |
| Tests | 1844 (failed **501**) |
| Ejecuciones en por-escenario | 1263 |
| Escenarios únicos (ruta + nombre) | **316** |
| HTTP descifrar | **100 %** → 200 |
| `codigoError` en cuerpo descifrado | **550** → 1243 ejecuciones (98,4 %) |
| | **400** → 20 ejecuciones (1,6 %) |
| Escenarios únicos con **550** | **311 / 316** (98,4 %) |
| Escenarios únicos con **400** “bien formado” | **5** |

### Por bloque de ruta (ejecuciones)

| Bloque | Total | 550 | 400 |
|--------|-------|-----|-----|
| `Metodo/0001` | 896 | 896 | 0 |
| `General/1_validaciones_js` | 304 | 284 | 20 |
| `General/2_reglaNegocio` | 60 | 60 | 0 |
| `General/0_jsonEntrada` | 3 | 3 | 0 |

**Conclusión numérica:** todo el método **0001** (incluidos **112 grupos `3_respuestaExitosa` / éxito**) devuelve `codigoError: 550` en el cuerpo descifrado. No hay ningún escenario de éxito que devuelva `resultado` de negocio.

---

## Los 5 escenarios que sí devuelven 400 (validación temprana)

Solo estos escenarios únicos obtienen el `400` esperado de formato (el resto del universo → 550):

1. `General/1_validaciones_js/1_idCanal` — 1.1.1 idCanal ausente  
2. `General/1_validaciones_js/1_idCanal` — 1.1.9 idCanal longitud 5  
3. `General/1_validaciones_js/2_validador` — 1.2.1 validador ausente  
4. `General/1_validaciones_js/2_validador` — 1.2.2 validador null  
5. `General/1_validaciones_js/2_validador` — 1.2.3 validador vacío  

Patrón: errores de **formato canal/validador** que la cadena rechaza antes de entrar al flujo de negocio completo. Cualquier otro caso (null en idCanal, tipos incorrectos, **todo Metodo/0001**) → **550** `Error inesperado`.

---

## Qué muestra la consola Newman (flujo MATRIZ)

En `Windows PowerShell.txt` se ve el flujo acordado:

1. `NIVEL_EJECUCION=MATRIZ` y `END_POINT_TLD desde END_POINT_TLD_MATRIZ`
2. `POST .../cifrar` (dummy) → OK  
3. `POST .../dev/auth/token` (matriz) → OK  
4. `POST .../dev/validador/validar` (matriz) → **200 OK**  
5. `POST .../descifrar` (dummy) → **200 OK**  
6. Asserts de negocio fallan: p. ej. en éxito falta `[Dummy /descifrar] estructura inner.respuestas[0] presente`

**Interpretación:** la **infra responde** (matriz autorizador stub, token, validar HTTP 200). El **payload de negocio** tras descifrar no es el que esperan los escenarios (dev): domina `{"codigoError":550,"descripcionError":"Error inesperado"}` o estructura incompleta.

---

## Hallazgo principal (para investigación)

> **Prod-a-dev vía MATRIZ no reproduce el comportamiento de negocio esperado:** casi todo el universo VCN devuelve **550 Error inesperado**, incluidos escenarios de **éxito** (`3_respuestaExitosa`).

Esto **no invalida** la recopilación — es **el dato** que se quería capturar para comparar con una futura corrida `--codigo-fuente dev` o con `NIVEL_EJECUCION=VCN`.

Hipótesis a investigar (sin afirmar causa raíz aún):

1. **Cadena matriz → validador → VCN** en prod-a-dev: `tld-matriz-validador-validar` (HTTP a validador prod) + VCN prod sin invoke.  
2. **Formato de respuesta** distinto entre lo que devuelve prod y lo que los scripts Postman (diseñados para dev) parsean tras descifrar.  
3. **550** como comodín de excepción no manejada en algún eslabón (matriz o VCN), no como error de validación de negocio.

**Siguiente paso sugerido:** un escenario feliz aislado (`--folder "Metodo/0001/3_respuestaExitosa/1008"`) + logs CloudWatch de `tld-matriz-validador-validar`, `tld-validador-validar` y `tld-cuenta-nombre` en la misma `idPeticion` (p. ej. `CELEGATO1783876634` del log).

---

## Comparación pendiente

| Run | Estado |
|-----|--------|
| **prod** + **MATRIZ** + prod-a-dev | ✅ Este commit (`96656b5`) |
| **dev** + **MATRIZ** (refactor) | Pendiente |
| **prod** + **VCN** (directo) | Pendiente — aislar si el 550 es solo por MATRIZ |
| `comparar-runs.js` prod vs dev | Pendiente segundo JSON por-escenario |

---

## Reproducir análisis

```powershell
cd Postman\comparar-prod-vs-dev\recopilacion
node analizar-por-escenario.js ..\..\generador\logs\historial\vcn\2026-07-12T17-20-06Z_prod_MATRIZ_completo_por-escenario.json
```

Resumen JSON archivado: [`resumen-2026-07-12-prod-MATRIZ.json`](./resumen-2026-07-12-prod-MATRIZ.json) (generado por el script).
