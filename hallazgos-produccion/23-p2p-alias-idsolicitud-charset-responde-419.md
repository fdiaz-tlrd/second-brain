# HP-023 — P2P alias: `idSolicitud` charset inválido → 419 en vez de 431

| Campo | Valor |
|-------|--------|
| **ID** | HP-023 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (Newman prod MATRIZ) — **se corrige en dev** |
| **Severidad** | media-alta |
| **Componente** | `tld-api-alias` / `lambdas/alias` (`validarParametroSolicitudes`) |
| **Ámbito** | P2P |
| **Veredicto** | **PROD-MAL** |

---

## Resumen

En escenarios `General/1_validaciones_js/5_solicitudes` (1.5.10–1.5.18), `idSolicitud` con caracteres
fuera del charset documentado (guion bajo, espacios, `@`, etc.) debería devolver **431**. Producción
(alias) responde **`resultado: 419`** («Los campos identificador y tipoIdentificador son requeridos» o
equivalente de catálogo) — código y mensaje incorrectos para un fallo de formato de `idSolicitud`.

Relacionado con HP-013 (validador, charset → 509 en VCN) pero la manifestación en P2P llega al **producto**
y devuelve **419** en lugar de 431.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `2026-07-13T09-47-19Z` prod MATRIZ — commit `c1de7ef` |
| Escenarios | 1.5.10–1.5.18 (11 únicos) |
| Body | `{"respuesta":{...,"respuestas":[{"idSolicitud":"id_001","resultado":419,...}]}}` |
| Doc revisión | [`13-revision-codigos-respuesta-p2p.md`](../Postman/comparar-prod-vs-dev/13-revision-codigos-respuesta-p2p.md) Bloque B.1 |

---

## Mejora en dev

Validación de charset `idSolicitud` alineada a HP-013 / regex documentada; respuesta **431** dedicada.
