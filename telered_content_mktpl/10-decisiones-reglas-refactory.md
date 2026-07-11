# Decisiones y reglas — Refactory documentación técnica

Estas reglas vienen de aclaraciones explícitas del usuario (2026-07-11). Son obligatorias para
cualquier mejora en `telered_content_mktpl/tech_doc`.

## Regla principal: no cambiar contrato productivo

**No se puede cambiar la información contractual publicada.**

Los JSON técnicos ya están en producción o en uso por clientes en desarrollo, pruebas y certificación.
Si se cambia un campo, tipo, envelope, código de error, método, ejemplo contractual o comportamiento
documentado, se puede romper lo que un cliente ya implementó.

Por tanto:

- **Prohibido normalizar contratos existentes** solo porque otra API se ve más limpia.
- **Prohibido cambiar** `parametros`, `datos`, tipo de `resultado`, envelope, códigos, métodos,
  nombres publicados o semántica.
- **Permitido:** mejorar presentación, agrupación, orden, claridad visual, estructura de mantenimiento,
  generación automática y formato JSON válido, siempre que la información contractual se conserve.
- Para APIs o métodos **nuevos**, sí se puede llevar el diseño a un estándar correcto desde el inicio.

## Objetivo real del trabajo

1. Mejorar cómo se presenta la información técnica.
2. Mejorar cómo se mantiene y se crea esa información técnica.
3. Reducir edición manual de JSON enormes.
4. Evitar errores como `api_4.json` inválido por control chars crudos.
5. Preparar un generador de OpenAPI similar al generador de Postman.

## Cifrado y descifrado

Cuando el usuario dice **cifrado**, se refiere siempre a **cifrado y descifrado**.

Estado correcto hoy:

- Solo `api_6.json` tiene la guía correcta y más reciente:
  - `Guía para Cifrado Híbrido: RSA + AES-256-GCM`
  - `Guía para Cifrado Híbrido: RSA + AES-256-CBC (Obsoleto)`
- `api_7.json` **no** tiene todavía esa guía completa.
- `api_4.json` **no** la tiene todavía; hoy mantiene CBC/forma vieja.

Dirección futura:

- Eventualmente `api_7.json` y `api_4.json` deberán tener la misma guía que `api_6.json`.
- Esa adopción debe hacerse como mejora de documentación/presentación acordada, cuidando no romper
  información contractual vigente.

## VCN (`api_4.json`)

`api_4.json` es el más flojo en presentación. La parte de **Canal Validador** se ve mal porque está
como anexo HTML gigante.

Objetivo:

- Llevar la presentación del Canal Validador de VCN a una forma similar a cómo se presentan los
  métodos propios.
- Mantener la misma información, sin cambiar contrato.

## Generador OpenAPI

Decisión de dirección:

- Sí tiene sentido hacer una PoC de generador.
- Si el agente considera que VCN (`api_4.json`) es el mejor primer paso, avanzar con VCN.
- El generador para APIs existentes debe operar en modo **preservar contrato**.
- El generador para APIs nuevas puede aplicar el estándar correcto desde el inicio.

## Regla para el agente

Documentar siempre los estudios y decisiones en esta carpeta. Esta documentación es principalmente
para el agente; el usuario no la está leyendo como fuente principal.
