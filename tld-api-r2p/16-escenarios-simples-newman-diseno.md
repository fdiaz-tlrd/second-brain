# Diseño Newman R2P — alcance mínimo (vivo)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-16 |
| Estado | **Solo diseño** — ver estrategia completa [`17`](./17-estrategia-newman-r2p-paridad-dig.md) |
| Tooling | `second-brain/Postman/generador` (mismo stack VCN/P2P/P2M) |
| Ambición | **Baja** — no clonar `VCN Escenarios error` |

## Meta única

Mismo AWS Dig: **código R2P prod** vs **código con cambios Dig** → misma respuesta de negocio en un set **mínimo** de escenarios.

## No hacer ahora

- Arreglar `api_7.json` / Marketplace (doc mala ≠ backlog de este hilo).
- Suite grande de errores R2P.
- Newman en Lenovo.
- Implementar colección sin gate de canales/deploy (lista en [`17`](./17-estrategia-newman-r2p-paridad-dig.md)).

## Recordatorio HD-005

Bajo MATRIZ: HTTP transporte **200**; asertar `codigoError`/`resultado` en payload.

## Cola activa (máx. 3; no implementada)

1. `0011` feliz controlado  
2. `0013` feliz o seed mínimo  
3. (Opcional) un error estable de validación (p. ej. 437)

Ideas descartadas del borrador anterior (425, 442, 441, 438, envelope aparte, etc.): solo si el usuario amplía tras paridad #1–#2.

## Próximo paso de implementación

Cuando el usuario diga: ensamblar suite R2P mínima en `Postman/generador` siguiendo patrones existentes — **después** de gates en [`17`](./17-estrategia-newman-r2p-paridad-dig.md).
