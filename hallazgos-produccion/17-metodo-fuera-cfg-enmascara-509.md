# HP-018 — Método fuera de `CFG_METODOS_LIMITES_JSON` → 509 (debe ser 418)

| Campo | Valor |
|-------|--------|
| **ID** | HP-018 |
| **Fecha** | 2026-07-13 |
| **Estado** | **corregido-en-dev** (ya por refactor invoke: `resolverServicioInterno` devuelve 418 y `app.js` lo mapea; verificado por lectura de código 2026-07-13) — pendiente deploy + re-run |
| **Severidad** | media-alta |
| **Componente** | `tld-validador-api` / `validar` |
| **Ámbito** | transversal — observado en VCN |
| **Veredicto** | **PROD-MAL** (el esperado del test, 418, es el correcto) |

---

## Resumen

Cuando la petición descifrada trae un **método que no existe** en la configuración de plataforma
(`CFG_METODOS_LIMITES_JSON` / `tld-validador-config-servicios`), producción **no lo rechaza** con
**418** "Método no soportado". Sigue el flujo, `getUrlServicioInterno` no resuelve URL y el fallo
termina en **509** "Error inesperado al llamar servicio interno". El cliente no sabe que el método
es inválido.

---

## Regla operativa — métodos por canal (acordada jul-2026)

**Esta regla es obligatoria en nuestra versión; las mejoras en dev la hacen cumplir.**

Al **configurar un canal** (emisor o validador, incluido un Canal Validador que nos consume a
nosotros), hay que **registrar en `tld-validador-canal-operacion` únicamente los métodos que ese
canal tiene permitidos**. No se asumen defaults ni “todos los métodos”.

| Qué | Dónde | Para qué |
|-----|--------|----------|
| Métodos **permitidos por canal** | `tld-validador-canal-operacion` | Granularidad: qué puede usar cada emisor y cada validador |
| Métodos **conocidos por la plataforma** | `CFG_METODOS_LIMITES_JSON` / `tld-validador-config-servicios` | Catálogo global + límites (p. ej. solicitudes por método) |

Sin filas de operación en un canal → error de **configuración** (500, cf. HP-017), no un 418 de
negocio. Método que no está en el catálogo global → **418**. Método válido en catálogo pero no
asociado al canal emisor → **418** (escenario 2.4.2, pendiente de revisión).

**Consecuencia operativa:** dar de alta o modificar un canal **sin** cargar sus métodos permitidos
deja el canal mal configurado; nuestras validaciones lo detectan en lugar de enmascararlo con 509.

---

## Comportamiento en producción (observado) — escenario 2.4.1

- **Recibido:** `codigoError 509` "Error inesperado al llamar servicio interno".
- **Condición:** `metodo` = `{{METODO_FUERA_CFG}}` (no existe en `CFG_METODOS_LIMITES_JSON`).
- **Ruta:** Matriz → Validador (`validar`) — tras descifrar, sin validar método contra CFG.

---

## Comportamiento esperado

- **418** "Método no soportado" (escenario 2.4.1; `nueva-tabla-codigo-respuesta.md` §2.4.1–2.4.2).
- Diferencia concreta: esperado **418** vs recibido **509**.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` (2.4.1 → 509) |
| Código prod | `prod_adactado_a_dev/tld-validador-api/lambdas/validar/app.js` líneas 80–95 (sin chequeo previo de método; `!respuesta` → 509) |
| Escenario | `VCN Escenarios error/General/2_reglaNegocio/4_metodo/4.1_metodo_fuera_cfg.json` |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 2.4 |

---

## Causa raíz

`validar` no valida `peticion.metodo` contra `CFG_METODOS_LIMITES_JSON` (ni contra
`tld-validador-config-servicios`) antes de resolver el servicio interno. Método desconocido →
`servicioInterno` vacío o llamada fallida → **509** genérico.

---

## Impacto

- **Diagnóstico erróneo:** el integrador investiga un fallo interno (509) en vez de corregir el
  método enviado.
- **Operación:** sin la regla de métodos por canal, canales mal dados de alta pasan hasta fallar en
  runtime.

---

## Mejora propuesta (en dev — ajuste de prod, NO ajuste de prueba)

1. Tras descifrar, si `metodo` no está en `CFG_METODOS_LIMITES_JSON` / config de servicios → **418**
   antes de llamar downstream. Test **2.4.1** mantiene **418**.

2. **Regla operativa enforced:** al provisionar un canal, **obligatorio** cargar en
   `tld-validador-canal-operacion` solo los métodos permitidos para ese canal (emisor y validador).
   Validaciones en dev rechazan o alertan configuración incompleta (cf. HP-017).

---

## Referencias

- Relacionados: [HP-017](16-validador-mal-configurado-responde-418.md) (validador sin operaciones → 418 vs 500; misma regla operativa por canal)
