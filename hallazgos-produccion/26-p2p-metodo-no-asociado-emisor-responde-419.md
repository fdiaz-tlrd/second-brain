# HP-026 — P2P: método no asociado al canal emisor → 419 en vez de 418

| Campo | Valor |
|-------|--------|
| **ID** | HP-026 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (Newman prod MATRIZ) — **se corrige en dev** |
| **Severidad** | media-alta |
| **Componente** | `tld-api-alias` / flujo regla de negocio método |
| **Ámbito** | P2P |
| **Veredicto** | **PROD-MAL** |

---

## Resumen

Escenario **2.4.2** (`CANAL_EMISOR_SIN_METODO`): el canal emisor no tiene el método en configuración.
Esperado **418** («Método no soportado» / no asociado). Producción devuelve **`resultado: 419`** en la
respuesta de método — código incorrecto, mismo patrón de enmascaramiento que HP-018/019 en VCN pero con
**419** en lugar de 509.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `2026-07-13T09-47-19Z` — `c1de7ef` |
| Escenario | `2.4.2. metodo — no asociado al canal emisor (418) [CANAL_EMISOR_SIN_METODO]` |
| Body | `respuestas[0].resultado: 419` |

---

## Mejora en dev

Rechazo explícito **418** cuando el método no está permitido para el canal emisor (alineado a HP-019).
