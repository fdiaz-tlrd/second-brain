# Metodo/0001/3_respuestaExitosa

Escenarios **resultado = 0** con `datos` completos. Misma colección `VCN Escenarios error` (no renombrar el árbol raíz).

## Convención

| Campo | Valor |
|-------|--------|
| `expectedHttpStatus` | **200** |
| `expectedCodigoError` | **0** |
| `expectedTipo` | **`exito`** |
| Emisor | `{{CANAL_EMISOR}}` (1008) |
| Validador | `{{CANAL_VALIDADOR}}` o literal según escenario |

## Subcarpetas planificadas (A11 — pendiente implementación JSON)

| Carpeta | Referencia QA | Variables env |
|---------|---------------|---------------|
| `1_cuentaBasica/` | Resp Exitosa | `{{CuentaFeliz}}` / `{{CUENTA_VALIDA}}` |
| `2_productoPaca/` | Resp Exitosa Cta PACA | `{{PACA}}` |
| `3_productoPacc/` | Resp Exitosa Cta PACC | `{{PACC}}` |
| `4_juridica/` | Resp Cuenta Juridicas | `{{Cuentajuridica}}` |
| `5_variosTitulares/` | Resp Varios titulares | `{{Variostitulares}}` |
| `6_mascaras/0` … `6` | Largo máscara 0–6 | `{{mascara0}}` … `{{mascara6}}` |
| `7_limitesFormato/` | Cuenta 1 dígito, 34 dígitos | `{{Cuenta1}}`, `{{Cuenta34}}` |

Generador previsto: `ensamblador/generar-escenarios-0001-respuesta-exitosa.js`.

Triage: [`../../../../../../tld-api-cuenta-nombre/triage/11-respuesta-exitosa-metodo-0001.md`](../../../../../../tld-api-cuenta-nombre/triage/11-respuesta-exitosa-metodo-0001.md).
