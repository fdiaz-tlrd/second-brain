# Camino de ramas — trabajo → develop → sandbox → qa

Revisión **solo lectura** 2026-09-16. Repo: `Telered-Autopista/tld-onpremise-data`. No se modificó el clon.

Fuente: refs `origin/*` ya presentes en el clon + `gh pr list/view` (API GitHub). `git fetch` desde Lenovo falló por certificado SSL; los PRs #46–#48 y la lista vacía de PRs abiertos coinciden con esos refs.

## Puntas

| Ref | Commit | Fecha | Qué es |
|-----|--------|-------|--------|
| `HEAD` local `feature/ARQ-256_Bajar_a_premisa_P2M` | `4a2138f` | 2026-07-10 | Checkout Lenovo; **atrás 2 commits** vs origin |
| `origin/feature/ARQ-256_Bajar_a_premisa_P2M` | `79631e3` | 2026-07-17 | Punta de trabajo en GitHub |
| `origin/develop` | `f09663b` | 2026-07-20 | Merge PR **#46** (feature → develop) |
| `origin/sandbox` | `ce662e9` | 2026-07-20 | Merge PR **#47** (develop → sandbox) |
| `origin/qa` | `160faf3` | 2026-07-20 | Merge PR **#48** (sandbox → qa) |
| `origin/main` | `afd53f7` | 2026-07-03 | Merge PR **#35** (qa → main). **No** incluye #46–#48 |

Árbol de archivos (`^{tree}`):

| Ref | Tree |
|-----|------|
| origin feature / develop / sandbox / qa | `fb36095af10e1a9bdacfb0ef931cce0425875355` (idéntico) |

`79631e3`, `139be98` y `4a2138f` son ancestros de `origin/qa`.

## El cambio en QA es el último PR de la rama de trabajo

Último PR **desde** `feature/ARQ-256_Bajar_a_premisa_P2M` → `develop`:

| | |
|--|--|
| PR | [#46](https://github.com/Telered-Autopista/tld-onpremise-data/pull/46) |
| Título | `[CCL-8559] Ajusta carga P2M para conversión de fechas TIMESTAMP desde JSON` |
| Autor | Felix Diaz (`fdiaz-tlrd`) |
| Merge | 2026-07-20 13:46:49 UTC → `f09663b` |
| Commit | `79631e3` |
| Archivo | `premisa/PA_ACH/DATA/TLRD_RTP_SQL/P2M_TLD-P2M-CUENTA/insert.sql` (+86 / −35) |
| Motivo | Quitar función local `TO_TS`; usar `TO_TIMESTAMP` en el cursor. Corrige **PLS-00231** al cargar `TLRD_ALIAS_P2M`. |

Promoción del **mismo** delta (mismo archivo, mismos +86/−35):

| PR | De | A | Merge | Merge commit | Autor PR |
|----|----|---|-------|--------------|----------|
| [#46](https://github.com/Telered-Autopista/tld-onpremise-data/pull/46) | `feature/ARQ-256_Bajar_a_premisa_P2M` | `develop` | 2026-07-20 13:46:49Z | `f09663b` | Felix Diaz |
| [#47](https://github.com/Telered-Autopista/tld-onpremise-data/pull/47) | `develop` | `sandbox` | 2026-07-20 13:47:26Z | `ce662e9` | Johany |
| [#48](https://github.com/Telered-Autopista/tld-onpremise-data/pull/48) | `sandbox` | `qa` | 2026-07-20 13:47:56Z | `160faf3` | Johany |

PRs abiertos: **ninguno**.

**Cómo leer “el cambio en QA”:** el último merge a `qa` (#48) solo trajo ese `insert.sql`. El **árbol completo** de QA es toda la feature hasta `79631e3` (PRs #34, #37, #40, #43 y #46), no un archivo suelto ajeno a esa rama.

## Grafo (first-parent de promoción)

```
origin/qa      160faf3  Merge #48 sandbox → qa
                 │
origin/sandbox ce662e9  Merge #47 develop → sandbox
                 │
origin/develop f09663b  Merge #46 feature → develop
                 │
origin/feature 79631e3  TIMESTAMP JSON → TLRD_ALIAS_P2M
```

Commits de contenido en origin feature **después** del checkout local `4a2138f`:

1. `139be98` *Update template.yaml* — PR [#43](https://github.com/Telered-Autopista/tld-onpremise-data/pull/43) (quitar condición `CreateSecret` del secreto ACH Directo). Ya en develop/sandbox/qa vía #43 → #44 → #45 (2026-07-17).
2. `79631e3` — PR #46, lo de arriba.

## Oleadas previas de la misma feature (ya en QA)

Cada fila es un pase completo feature → develop → sandbox → qa.

| Fecha (merge a qa) | Feature → develop | develop → sandbox | sandbox → qa | Tema |
|--------------------|-------------------|-------------------|--------------|------|
| 2026-07-20 | [#46](https://github.com/Telered-Autopista/tld-onpremise-data/pull/46) | [#47](https://github.com/Telered-Autopista/tld-onpremise-data/pull/47) | [#48](https://github.com/Telered-Autopista/tld-onpremise-data/pull/48) | TIMESTAMP P2M cuenta (**último**) |
| 2026-07-17 | [#43](https://github.com/Telered-Autopista/tld-onpremise-data/pull/43) | [#44](https://github.com/Telered-Autopista/tld-onpremise-data/pull/44) | [#45](https://github.com/Telered-Autopista/tld-onpremise-data/pull/45) | Quitar `CreateSecret` ACH |
| 2026-07-10 | [#40](https://github.com/Telered-Autopista/tld-onpremise-data/pull/40) | [#41](https://github.com/Telered-Autopista/tld-onpremise-data/pull/41) | [#42](https://github.com/Telered-Autopista/tld-onpremise-data/pull/42) | ARNs stream P2M en samconfig QA |
| 2026-07-10 | [#37](https://github.com/Telered-Autopista/tld-onpremise-data/pull/37) | [#38](https://github.com/Telered-Autopista/tld-onpremise-data/pull/38) | [#39](https://github.com/Telered-Autopista/tld-onpremise-data/pull/39) | Correcciones premisa/GRANT |
| 2026-06-15 | [#34](https://github.com/Telered-Autopista/tld-onpremise-data/pull/34) | [#36](https://github.com/Telered-Autopista/tld-onpremise-data/pull/36) | (qa más tarde por oleadas de julio) | Primer merge ARQ-256 a develop |

Los PRs de promoción (#36–#48 de Johany, salvo los de feature que son Felix) no añaden archivos propios: copian el merge de la rama origen.

## Lo que esto no afirma

- No se miró CloudFormation ni si QA AWS está desplegado con `160faf3`. [`ESTADO-ACTUAL.md`](./ESTADO-ACTUAL.md) (2026-07-10) decía **AWS QA sin desplegar**; eso es operación, no git.
- `main` / producción git **no** está en este árbol.
- El clon local **no** está en la punta de la feature.
