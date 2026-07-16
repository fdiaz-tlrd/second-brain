# Opinión — doble ancla (prod R2P + espejo Dig VCN)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |

## Opinión

**De acuerdo con el usuario.**

1. **Prod real** fija las **reglas de negocio** de R2P. Mejorar Dig no autoriza cambiar semántica `0011`/`0013`, Dynamo R2P, validaciones ni códigos de ese dominio.
2. **VCN Dig** es la **base de ingeniería** para terminar bien lo ya metido (Invoke desde validador-api, consumo de proxy, dual consume, layer limpio). No sustituye a prod como fuente de negocio.
3. **`tld-util` / `tld-telered-lib` en prod** es **transporte** (HTTP con CA hacia el Canal Validador), no el corazón del negocio R2P. Dig mueve ese transporte al proxy; el error es dejar el `require` HTTP colgando, no “haber quitado la lib del layer”.
4. Estudiar solo VCN Dig **sesga**. Estudiar solo prod **no enseña** el contrato Dig Invoke/proxy. Hace falta **las dos anclas**.

## Criterio de “asegurado” (actualizado)

Un cambio Dig en R2P está asegurado si:

- respeta negocio prod (comportamiento `0011`/`0013` y reglas asociadas), **y**
- cumple contratos Dig del caller (Invoke) y del proxy (espejo VCN), **y**
- no rompe init (sin deps muertas de transporte prod).
