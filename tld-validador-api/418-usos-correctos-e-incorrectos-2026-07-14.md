# 418 / 481 / 482 / 500 — usos Dig (2026-07-14)

| Campo | Valor |
|-------|-------|
| Catálogo | ver `nueva-tabla-codigo-respuesta.md` |

## Resumen

| Caso | Código |
|------|--------|
| `metodo` no está en `MAPA_METODO_SERVICIO` | **481** Método inválido |
| En mapa, ausente de `CFG_METODOS_LIMITES_JSON` del producto | **500** Error interno |
| Falta `LAMBDA_*` en validador-api | **500** Error interno |
| Validador: sin operación `estado=Y` para el método | **418** Método no soportado por el validador |
| Emisor: fila del método con `estado` exacto **`N`** | **482** Método no disponible para el Canal Emisor |

**482:** denegación **explícita**. Canal de prueba **1018** = ops `0001–0025` con `N` (`canalesPruebas-dev`).

**Emisor sin renglón del método:** Dig **no** responde 482 (`metodoNegadoParaEmisor` no deniega). Eso es comportamiento distinto del 1018 y **debe probarse** con canal+escenario — hoy **no** hay cobertura Postman dedicada (principio: hacer pruebas = ejecutarlas; ver `pendiente-post-418-datos-y-postman-2026-07-15.md`).

**Postman:** escenarios `4.1` → 481, `4.2` → 482 (VCN/P2P/P2M); `catalogoGeneral.json` con textos 418/481/482. Código Dig del modelo: **cerrado**. **1018** ops `N` en Dynamo: **confirmado** 2026-07-15.
