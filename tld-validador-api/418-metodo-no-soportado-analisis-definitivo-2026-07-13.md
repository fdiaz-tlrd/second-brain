# El código 418 "Método no soportado" — análisis definitivo (2026-07-13)

> **Propósito:** cerrar de una vez la pregunta "¿por qué el 418 es especial y de dónde sale?" para no
> volver a dudarlo en otra sesión. Todo lo de aquí está verificado contra código real de producción
> (`produccion_real/`), el catálogo del marketplace y las fichas HP ya existentes.

## Respuesta corta

El **418 = "Método no soportado"** es un código **del contrato del marketplace** (`api_4.json`), **no** un
invento del refactor. Significa: *el método enviado no está habilitado*. Qué está "habilitado" se decide
en **dos tablas de configuración**. Producción ha sido **inconsistente** con este código (a veces lo usa
para tapar una mala configuración, a veces no lo usa cuando debería) — eso está documentado como
PROD-MAL en HP-017 / HP-018 / HP-019 / HP-026.

**Decisión firme:** en `tld-validador-api` dev el 418 para método fuera de catálogo **se queda** (implementa
HP-018). No se toca el código.

## De dónde sale el 418: las dos tablas de configuración

| Tabla | Qué define | Capa que la usa |
|-------|-----------|-----------------|
| `tld-validador-config-servicios` (a.k.a. `CFG_METODOS_LIMITES_JSON`) | Catálogo **global** de métodos que la plataforma conoce (+ límites por método) | `tld-validador-api` (`getUrlServicioInterno` en prod / `resolverServicioInterno` en dev) |
| `tld-validador-canal-operacion` | Métodos permitidos **por canal** (emisor y validador) | Las lambdas de **producto** (`canal.metodoDisponible`) |

Por eso el 418 es "especial": es el código que responde la pregunta **"¿este método está en la
configuración?"** — global o por canal. No hay nada arbitrario; hay una tabla detrás.

## Evidencia en código real de producción

El **producto** emite 418 cuando el método no está en las operaciones del canal:

```87:89:produccion_real/tld-api-r2p/lambdas/r2p/app.js
    if (!canal.metodoDisponible(canalValidador, peticion.metodo)) {
      util.Print("ERROR: Metodo no soportado por el validador")
      return util.lambdaResult(400, 418, { codigoError: 418, mensajeError: "Metodo no soportado por el validador" }, bitacora,subscriptionValue,fechaInicio)
    }
```

Y el 418 está en el catálogo de todos los productos (`.../lib/catalogoRespuestas.js`) y en `api_4.json`
("Método no soportado — si envía un método distinto al esperado (0001)").

## Las inconsistencias de producción con el 418 (ya documentadas)

| Ficha | Situación | Capa | Prod hace | Correcto | Veredicto |
|-------|-----------|------|-----------|----------|-----------|
| [HP-017](../hallazgos-produccion/16-validador-mal-configurado-responde-418.md) | Canal validador existe pero **sin operaciones** en BD (config rota) | producto (`metodoDisponible`) | **418** | **500** (error de plataforma, no rechazo de negocio) | PROD-MAL |
| [HP-018](../hallazgos-produccion/17-metodo-fuera-cfg-enmascara-509.md) | Método **no está en el catálogo global** | validador-api | **509** | **418** | PROD-MAL |
| [HP-019](../hallazgos-produccion/18-metodo-no-asociado-emisor-enmascara-509.md) | Método **no asociado al canal emisor** | producto | **509** | **418** | PROD-MAL |
| [HP-026](../hallazgos-produccion/26-p2p-metodo-no-asociado-emisor-responde-419.md) | P2P: método no asociado emisor | producto (alias) | 419 | **418** | PROD-MAL |

**Lectura:** producción a veces devuelve **418 donde debería ser 500** (HP-017, tapa una config rota) y a
veces **509/419 donde debería ser 418** (HP-018/019/026, tapa que el método no está permitido). El 418 no
está "roto" en sí; lo que está mal es **cuándo** producción lo emite o deja de emitirlo.

## Qué hace el dev (y por qué es correcto)

`tld-validador-api` dev, migrado a invoke:

- `lib/servicioInterno.js` → `resolverServicioInterno(metodo)`: si el método **no está en el catálogo**
  (`MAPA_METODO_SERVICIO`, equivalente en código a `tld-validador-config-servicios`) → `{ statusCode: 418 }`.
- `app.js`: `statusCode 418` → **HTTP 400 + codigoError 418**; cualquier otro fallo de resolución → HTTP 200 + cE 509.

Esto **implementa HP-018**: método fuera de catálogo ahora sí responde 418 en vez del 509 genérico de prod.
El 418 **del producto** (por canal, `metodoDisponible`) se sigue **reenviando** tal cual por el invoke
(verificado por lectura de `lib/validador.js` dev: normaliza el payload y devuelve el body de negocio).

Dos fuentes legítimas de 418, en capas distintas, ambas correctas:

1. **validador-api** → método fuera del catálogo global (HP-018).
2. **producto** (`metodoDisponible`) → método no permitido para ese canal (se reenvía).

## Nota de honestidad (corrección de una confusión previa)

En la sesión del 2026-07-13 el agente, en el chat, llegó a decir que el 418 del validador-api estaba "en la
capa equivocada" y propuso volver a 509 "por paridad con prod". **Eso era incorrecto** y contradecía esta
misma documentación (HP-018): el 509 de prod es el bug, y el 418 del dev es el fix. Se detuvo **antes** de
cambiar código. No hubo cambios. Queda escrito aquí para que no se repita el error.

## Estado del código (no requiere cambios)

| Aspecto | Estado |
|---------|--------|
| 418 método fuera de catálogo (HP-018) | Implementado en dev. Correcto. **No tocar.** |
| Reenvío del 418 del producto (por canal) | Funciona vía invoke (`lib/validador.js`). |
| HTTP del 418 en validador-api | HTTP 400 + cE 418 → matriz lo pasa → cliente recibe 418. Válido. |

## Referencias

- [correccion-validar-hallazgos-2026-07-13.md](./correccion-validar-hallazgos-2026-07-13.md) — §HP-018.
- [http-code-cadena-cumplimiento-2026-07-13.md](./http-code-cadena-cumplimiento-2026-07-13.md) — contrato HTTP de la cadena.
- Catálogo: `produccion_real/telered_content_mktpl/tech_doc/api_4.json` (tabla de códigos).
