# samconfig.toml — red por ambiente y región

**Vista con colores:** [`tabla-red-ambientes.html`](tabla-red-ambientes.html) (abrir en el navegador). Regenerar: `node second-brain/samconfig.toml/generar-html-tabla-red.js`. El generador se queda: [`generar-html-tabla-red.js`](generar-html-tabla-red.js).

| Campo | Valor |
|-------|-------|
| **Estado** | Tabla para revisión humana. Extraída 2026-09-16 de los `samconfig.toml` de trabajo en `c:\Users\Lenovo\GitHub\` (no `produccion_real/`). HTML con colores en `tabla-red-ambientes.html`. |
| **Alcance** | 10 repos. Perfiles `dev` / `sandbox` / `qa` / `prod` (+ `*-oregon` donde existen). |
| **Columnas** | VPCe, SecurityGroup, Subnet1, Subnet2, Subnet3 |

**Ejes del pedido:** ambiente = `dev`, `sandbox`, `qa`, `prod`. Región Virginia = `us-east-1`. **QA no es región AWS:** es ambiente. La otra región en los archivos es **Oregon** (`us-west-2`, perfiles `*-oregon`). La tabla cubre Virginia y Oregon.

**`tld-matriz`:** no declara `VPCe` ni `Subnet1/2/3`. Usa `LambdaSecurityGroup` y `LambdaSubnets` (lista). En la tabla, SG y subnets de matriz son esos valores; VPCe = `—`. Los IDs de subnet se muestran alineados al `Subnet1/2/3` del resto (mismo conjunto; el orden en el archivo a veces cambia).

Valor en **negrita** = no coincide con la mayoría de ese ambiente × región.

---

## Hallazgos al armar la tabla

**Prod VPCe de `tld-api-qrpayment` y `tld-achx` — corregido 2026-09-16.** Antes copiaban el VPCe de QA (`vpce-02604f22955f34464` Virginia / `vpce-082221447d21774c0` Oregon). Ahora `[prod]` y `[prod-oregon]` usan el mismo VPCe que el resto de APIs: `vpce-05fd27576a4f363ff` / `vpce-060f0db9e16d13ea3`. El cambio está en los `samconfig.toml`; no aplica en AWS hasta un `sam deploy --config-env prod` / `prod-oregon`.

**`[default]` ≠ `[dev]` en VPCe** (mismo `stack_name`, cuenta/bucket de dev). `sam deploy` sin `--config-env` usa `[default]`, que en estos repos aún trae el VPCe de QA Virginia (`vpce-02604f22955f34464`): `tld-validador-proxy`, `tld-validador-api`, `tld-api-cuenta-nombre`, `tld-api-r2p`, `tld-api-p2m`. En `tld-matriz` el `[default]` no trae subnets ni SG. Los otros cinco repos sí tienen `[default]` = `[dev]`.

**Prod no tiene un único SecurityGroup** (ni un único Subnet3 en Oregon). Hay dos familias; no se afirma aquí cuál es la correcta:

| Familia | Repos | SG Virginia | SG Oregon | Subnet3 Oregon |
|---------|-------|-------------|-----------|----------------|
| A | proxy, validador-api, cuenta-nombre, r2p, p2m | `sg-013e8ae11b9da29c0` | `sg-0020c5cbea750ad63` | `subnet-024199d69953e1a25` |
| B | alias, preg-seguridad, qrpayment, achx, matriz | `sg-0943ddd3307f78bc6` | `sg-07cb533f2a71d11db` | `subnet-03beb33a17aa75827` |

Subnet1 y Subnet2 de prod coinciden en las dos familias.

Solo `tld-matriz` y `tld-api-p2m` tienen perfil `[dev-oregon]`. El resto no despliega dev en Oregon por samconfig.

---

## Referencia (mayoría) — para contrastar celdas

| Ambiente | Región | VPCe | SecurityGroup | Subnet1 | Subnet2 | Subnet3 |
|----------|--------|------|---------------|---------|---------|---------|
| dev | Virginia | `vpce-03ecbc47b37cc7965` | `sg-008d5796e8e35f872` | `subnet-0093c5b90caef5c43` | `subnet-068ee4dcf3668fbe1` | `subnet-05f5130a337b5a6f8` |
| sandbox | Virginia | `vpce-00ef36bfb2706e3b7` | `sg-0e9af23b6645d84df` | `subnet-0baba120b23a710cc` | `subnet-073da6f0db6885407` | `subnet-052421100e0a15e95` |
| qa | Virginia | `vpce-02604f22955f34464` | `sg-07a171ec1126de080` | `subnet-06d734e9c33be88a5` | `subnet-0207fb5c7b4fc3f1e` | `subnet-0e506123b33944eac` |
| prod | Virginia | `vpce-05fd27576a4f363ff` | *(dos familias, ver arriba)* | `subnet-00f7c0df721dcfdc4` | `subnet-06e450fb4c4ea4e65` | `subnet-02a075226b5436af3` |
| sandbox | Oregon | `vpce-0425c5ae5cadfb413` | `sg-0632570ee4ab8c55f` | `subnet-0bd757a9bcc0dcda5` | `subnet-0d69bfc85a349018d` | `subnet-0349e2932ba6bec22` |
| qa | Oregon | `vpce-082221447d21774c0` | `sg-0928b9ac57d332bf8` | `subnet-088f415fbe3be68f2` | `subnet-008e404bfb8a213e8` | `subnet-0eda642ed9fe1a924` |
| prod | Oregon | `vpce-060f0db9e16d13ea3` | *(dos familias)* | `subnet-0c03d3e13e5de8610` | `subnet-07dd5ba31d52b7864` | *(dos familias)* |
| dev | Oregon | `vpce-07a043ba9738c3233` (solo p2m) | `sg-00b56af00ddf8aba2` | `subnet-0514570097cbb1f0e` | `subnet-0045feb045270550a` | `subnet-0be080ec056dd9f99` |

---

## Virginia (`us-east-1`)

Perfiles `[dev]`, `[sandbox]`, `[qa]`, `[prod]`.

### dev

| Repo | VPCe | SecurityGroup | Subnet1 | Subnet2 | Subnet3 |
|------|------|---------------|---------|---------|---------|
| tld-matriz | — | `sg-008d5796e8e35f872` | `subnet-0093c5b90caef5c43` | `subnet-068ee4dcf3668fbe1` | `subnet-05f5130a337b5a6f8` |
| tld-validador-api | `vpce-03ecbc47b37cc7965` | `sg-008d5796e8e35f872` | `subnet-0093c5b90caef5c43` | `subnet-068ee4dcf3668fbe1` | `subnet-05f5130a337b5a6f8` |
| tld-api-cuenta-nombre | `vpce-03ecbc47b37cc7965` | `sg-008d5796e8e35f872` | `subnet-0093c5b90caef5c43` | `subnet-068ee4dcf3668fbe1` | `subnet-05f5130a337b5a6f8` |
| tld-api-alias | `vpce-03ecbc47b37cc7965` | `sg-008d5796e8e35f872` | `subnet-0093c5b90caef5c43` | `subnet-068ee4dcf3668fbe1` | `subnet-05f5130a337b5a6f8` |
| tld-api-r2p | `vpce-03ecbc47b37cc7965` | `sg-008d5796e8e35f872` | `subnet-0093c5b90caef5c43` | `subnet-068ee4dcf3668fbe1` | `subnet-05f5130a337b5a6f8` |
| tld-api-p2m | `vpce-03ecbc47b37cc7965` | `sg-008d5796e8e35f872` | `subnet-0093c5b90caef5c43` | `subnet-068ee4dcf3668fbe1` | `subnet-05f5130a337b5a6f8` |
| tld-preg-seguridad | `vpce-03ecbc47b37cc7965` | `sg-008d5796e8e35f872` | `subnet-0093c5b90caef5c43` | `subnet-068ee4dcf3668fbe1` | `subnet-05f5130a337b5a6f8` |
| tld-api-qrpayment | `vpce-03ecbc47b37cc7965` | `sg-008d5796e8e35f872` | `subnet-0093c5b90caef5c43` | `subnet-068ee4dcf3668fbe1` | `subnet-05f5130a337b5a6f8` |
| tld-validador-proxy | `vpce-03ecbc47b37cc7965` | `sg-008d5796e8e35f872` | `subnet-0093c5b90caef5c43` | `subnet-068ee4dcf3668fbe1` | `subnet-05f5130a337b5a6f8` |
| tld-achx | `vpce-03ecbc47b37cc7965` | `sg-008d5796e8e35f872` | `subnet-0093c5b90caef5c43` | `subnet-068ee4dcf3668fbe1` | `subnet-05f5130a337b5a6f8` |

Matriz: `LambdaSubnets` en archivo va en orden Subnet3, Subnet2, Subnet1. Mismos IDs.

### sandbox

| Repo | VPCe | SecurityGroup | Subnet1 | Subnet2 | Subnet3 |
|------|------|---------------|---------|---------|---------|
| tld-matriz | — | `sg-0e9af23b6645d84df` | `subnet-0baba120b23a710cc` | `subnet-073da6f0db6885407` | `subnet-052421100e0a15e95` |
| tld-validador-api | `vpce-00ef36bfb2706e3b7` | `sg-0e9af23b6645d84df` | `subnet-0baba120b23a710cc` | `subnet-073da6f0db6885407` | `subnet-052421100e0a15e95` |
| tld-api-cuenta-nombre | `vpce-00ef36bfb2706e3b7` | `sg-0e9af23b6645d84df` | `subnet-0baba120b23a710cc` | `subnet-073da6f0db6885407` | `subnet-052421100e0a15e95` |
| tld-api-alias | `vpce-00ef36bfb2706e3b7` | `sg-0e9af23b6645d84df` | `subnet-0baba120b23a710cc` | `subnet-073da6f0db6885407` | `subnet-052421100e0a15e95` |
| tld-api-r2p | `vpce-00ef36bfb2706e3b7` | `sg-0e9af23b6645d84df` | `subnet-0baba120b23a710cc` | `subnet-073da6f0db6885407` | `subnet-052421100e0a15e95` |
| tld-api-p2m | `vpce-00ef36bfb2706e3b7` | `sg-0e9af23b6645d84df` | `subnet-0baba120b23a710cc` | `subnet-073da6f0db6885407` | `subnet-052421100e0a15e95` |
| tld-preg-seguridad | `vpce-00ef36bfb2706e3b7` | `sg-0e9af23b6645d84df` | `subnet-0baba120b23a710cc` | `subnet-073da6f0db6885407` | `subnet-052421100e0a15e95` |
| tld-api-qrpayment | `vpce-00ef36bfb2706e3b7` | `sg-0e9af23b6645d84df` | `subnet-0baba120b23a710cc` | `subnet-073da6f0db6885407` | `subnet-052421100e0a15e95` |
| tld-validador-proxy | `vpce-00ef36bfb2706e3b7` | `sg-0e9af23b6645d84df` | `subnet-0baba120b23a710cc` | `subnet-073da6f0db6885407` | `subnet-052421100e0a15e95` |
| tld-achx | `vpce-00ef36bfb2706e3b7` | `sg-0e9af23b6645d84df` | `subnet-0baba120b23a710cc` | `subnet-073da6f0db6885407` | `subnet-052421100e0a15e95` |

### qa

| Repo | VPCe | SecurityGroup | Subnet1 | Subnet2 | Subnet3 |
|------|------|---------------|---------|---------|---------|
| tld-matriz | — | `sg-07a171ec1126de080` | `subnet-06d734e9c33be88a5` | `subnet-0207fb5c7b4fc3f1e` | `subnet-0e506123b33944eac` |
| tld-validador-api | `vpce-02604f22955f34464` | `sg-07a171ec1126de080` | `subnet-06d734e9c33be88a5` | `subnet-0207fb5c7b4fc3f1e` | `subnet-0e506123b33944eac` |
| tld-api-cuenta-nombre | `vpce-02604f22955f34464` | `sg-07a171ec1126de080` | `subnet-06d734e9c33be88a5` | `subnet-0207fb5c7b4fc3f1e` | `subnet-0e506123b33944eac` |
| tld-api-alias | `vpce-02604f22955f34464` | `sg-07a171ec1126de080` | `subnet-06d734e9c33be88a5` | `subnet-0207fb5c7b4fc3f1e` | `subnet-0e506123b33944eac` |
| tld-api-r2p | `vpce-02604f22955f34464` | `sg-07a171ec1126de080` | `subnet-06d734e9c33be88a5` | `subnet-0207fb5c7b4fc3f1e` | `subnet-0e506123b33944eac` |
| tld-api-p2m | `vpce-02604f22955f34464` | `sg-07a171ec1126de080` | `subnet-06d734e9c33be88a5` | `subnet-0207fb5c7b4fc3f1e` | `subnet-0e506123b33944eac` |
| tld-preg-seguridad | `vpce-02604f22955f34464` | `sg-07a171ec1126de080` | `subnet-06d734e9c33be88a5` | `subnet-0207fb5c7b4fc3f1e` | `subnet-0e506123b33944eac` |
| tld-api-qrpayment | `vpce-02604f22955f34464` | `sg-07a171ec1126de080` | `subnet-06d734e9c33be88a5` | `subnet-0207fb5c7b4fc3f1e` | `subnet-0e506123b33944eac` |
| tld-validador-proxy | `vpce-02604f22955f34464` | `sg-07a171ec1126de080` | `subnet-06d734e9c33be88a5` | `subnet-0207fb5c7b4fc3f1e` | `subnet-0e506123b33944eac` |
| tld-achx | `vpce-02604f22955f34464` | `sg-07a171ec1126de080` | `subnet-06d734e9c33be88a5` | `subnet-0207fb5c7b4fc3f1e` | `subnet-0e506123b33944eac` |

### prod

| Repo | VPCe | SecurityGroup | Subnet1 | Subnet2 | Subnet3 |
|------|------|---------------|---------|---------|---------|
| tld-matriz | — | `sg-0943ddd3307f78bc6` (B) | `subnet-00f7c0df721dcfdc4` | `subnet-06e450fb4c4ea4e65` | `subnet-02a075226b5436af3` |
| tld-validador-api | `vpce-05fd27576a4f363ff` | `sg-013e8ae11b9da29c0` (A) | `subnet-00f7c0df721dcfdc4` | `subnet-06e450fb4c4ea4e65` | `subnet-02a075226b5436af3` |
| tld-api-cuenta-nombre | `vpce-05fd27576a4f363ff` | `sg-013e8ae11b9da29c0` (A) | `subnet-00f7c0df721dcfdc4` | `subnet-06e450fb4c4ea4e65` | `subnet-02a075226b5436af3` |
| tld-api-alias | `vpce-05fd27576a4f363ff` | `sg-0943ddd3307f78bc6` (B) | `subnet-00f7c0df721dcfdc4` | `subnet-06e450fb4c4ea4e65` | `subnet-02a075226b5436af3` |
| tld-api-r2p | `vpce-05fd27576a4f363ff` | `sg-013e8ae11b9da29c0` (A) | `subnet-00f7c0df721dcfdc4` | `subnet-06e450fb4c4ea4e65` | `subnet-02a075226b5436af3` |
| tld-api-p2m | `vpce-05fd27576a4f363ff` | `sg-013e8ae11b9da29c0` (A) | `subnet-00f7c0df721dcfdc4` | `subnet-06e450fb4c4ea4e65` | `subnet-02a075226b5436af3` |
| tld-preg-seguridad | `vpce-05fd27576a4f363ff` | `sg-0943ddd3307f78bc6` (B) | `subnet-00f7c0df721dcfdc4` | `subnet-06e450fb4c4ea4e65` | `subnet-02a075226b5436af3` |
| tld-api-qrpayment | `vpce-05fd27576a4f363ff` | `sg-0943ddd3307f78bc6` (B) | `subnet-00f7c0df721dcfdc4` | `subnet-06e450fb4c4ea4e65` | `subnet-02a075226b5436af3` |
| tld-validador-proxy | `vpce-05fd27576a4f363ff` | `sg-013e8ae11b9da29c0` (A) | `subnet-00f7c0df721dcfdc4` | `subnet-06e450fb4c4ea4e65` | `subnet-02a075226b5436af3` |
| tld-achx | `vpce-05fd27576a4f363ff` | `sg-0943ddd3307f78bc6` (B) | `subnet-00f7c0df721dcfdc4` | `subnet-06e450fb4c4ea4e65` | `subnet-02a075226b5436af3` |

Matriz: `LambdaSubnets` en archivo va en orden Subnet3, Subnet1, Subnet2. Mismos IDs.

---

## Oregon (`us-west-2`)

Perfiles `[sandbox-oregon]`, `[qa-oregon]`, `[prod-oregon]`. `[dev-oregon]` solo en matriz y p2m.

### sandbox-oregon

| Repo | VPCe | SecurityGroup | Subnet1 | Subnet2 | Subnet3 |
|------|------|---------------|---------|---------|---------|
| tld-matriz | — | `sg-0632570ee4ab8c55f` | `subnet-0bd757a9bcc0dcda5` | `subnet-0d69bfc85a349018d` | `subnet-0349e2932ba6bec22` |
| tld-validador-api | `vpce-0425c5ae5cadfb413` | `sg-0632570ee4ab8c55f` | `subnet-0bd757a9bcc0dcda5` | `subnet-0d69bfc85a349018d` | `subnet-0349e2932ba6bec22` |
| tld-api-cuenta-nombre | `vpce-0425c5ae5cadfb413` | `sg-0632570ee4ab8c55f` | `subnet-0bd757a9bcc0dcda5` | `subnet-0d69bfc85a349018d` | `subnet-0349e2932ba6bec22` |
| tld-api-alias | `vpce-0425c5ae5cadfb413` | `sg-0632570ee4ab8c55f` | `subnet-0bd757a9bcc0dcda5` | `subnet-0d69bfc85a349018d` | `subnet-0349e2932ba6bec22` |
| tld-api-r2p | `vpce-0425c5ae5cadfb413` | `sg-0632570ee4ab8c55f` | `subnet-0bd757a9bcc0dcda5` | `subnet-0d69bfc85a349018d` | `subnet-0349e2932ba6bec22` |
| tld-api-p2m | `vpce-0425c5ae5cadfb413` | `sg-0632570ee4ab8c55f` | `subnet-0bd757a9bcc0dcda5` | `subnet-0d69bfc85a349018d` | `subnet-0349e2932ba6bec22` |
| tld-preg-seguridad | `vpce-0425c5ae5cadfb413` | `sg-0632570ee4ab8c55f` | `subnet-0bd757a9bcc0dcda5` | `subnet-0d69bfc85a349018d` | `subnet-0349e2932ba6bec22` |
| tld-api-qrpayment | `vpce-0425c5ae5cadfb413` | `sg-0632570ee4ab8c55f` | `subnet-0bd757a9bcc0dcda5` | `subnet-0d69bfc85a349018d` | `subnet-0349e2932ba6bec22` |
| tld-validador-proxy | `vpce-0425c5ae5cadfb413` | `sg-0632570ee4ab8c55f` | `subnet-0bd757a9bcc0dcda5` | `subnet-0d69bfc85a349018d` | `subnet-0349e2932ba6bec22` |
| tld-achx | `vpce-0425c5ae5cadfb413` | `sg-0632570ee4ab8c55f` | `subnet-0bd757a9bcc0dcda5` | `subnet-0d69bfc85a349018d` | `subnet-0349e2932ba6bec22` |

### qa-oregon

| Repo | VPCe | SecurityGroup | Subnet1 | Subnet2 | Subnet3 |
|------|------|---------------|---------|---------|---------|
| tld-matriz | — | `sg-0928b9ac57d332bf8` | `subnet-088f415fbe3be68f2` | `subnet-008e404bfb8a213e8` | `subnet-0eda642ed9fe1a924` |
| tld-validador-api | `vpce-082221447d21774c0` | `sg-0928b9ac57d332bf8` | `subnet-088f415fbe3be68f2` | `subnet-008e404bfb8a213e8` | `subnet-0eda642ed9fe1a924` |
| tld-api-cuenta-nombre | `vpce-082221447d21774c0` | `sg-0928b9ac57d332bf8` | `subnet-088f415fbe3be68f2` | `subnet-008e404bfb8a213e8` | `subnet-0eda642ed9fe1a924` |
| tld-api-alias | `vpce-082221447d21774c0` | `sg-0928b9ac57d332bf8` | `subnet-088f415fbe3be68f2` | `subnet-008e404bfb8a213e8` | `subnet-0eda642ed9fe1a924` |
| tld-api-r2p | `vpce-082221447d21774c0` | `sg-0928b9ac57d332bf8` | `subnet-088f415fbe3be68f2` | `subnet-008e404bfb8a213e8` | `subnet-0eda642ed9fe1a924` |
| tld-api-p2m | `vpce-082221447d21774c0` | `sg-0928b9ac57d332bf8` | `subnet-088f415fbe3be68f2` | `subnet-008e404bfb8a213e8` | `subnet-0eda642ed9fe1a924` |
| tld-preg-seguridad | `vpce-082221447d21774c0` | `sg-0928b9ac57d332bf8` | `subnet-088f415fbe3be68f2` | `subnet-008e404bfb8a213e8` | `subnet-0eda642ed9fe1a924` |
| tld-api-qrpayment | `vpce-082221447d21774c0` | `sg-0928b9ac57d332bf8` | `subnet-088f415fbe3be68f2` | `subnet-008e404bfb8a213e8` | `subnet-0eda642ed9fe1a924` |
| tld-validador-proxy | `vpce-082221447d21774c0` | `sg-0928b9ac57d332bf8` | `subnet-088f415fbe3be68f2` | `subnet-008e404bfb8a213e8` | `subnet-0eda642ed9fe1a924` |
| tld-achx | `vpce-082221447d21774c0` | `sg-0928b9ac57d332bf8` | `subnet-088f415fbe3be68f2` | `subnet-008e404bfb8a213e8` | `subnet-0eda642ed9fe1a924` |

Matriz: `LambdaSubnets` en archivo va en orden Subnet2, Subnet3, Subnet1. Mismos IDs.

### prod-oregon

| Repo | VPCe | SecurityGroup | Subnet1 | Subnet2 | Subnet3 |
|------|------|---------------|---------|---------|---------|
| tld-matriz | — | `sg-07cb533f2a71d11db` (B) | `subnet-0c03d3e13e5de8610` | `subnet-07dd5ba31d52b7864` | `subnet-03beb33a17aa75827` (B) |
| tld-validador-api | `vpce-060f0db9e16d13ea3` | `sg-0020c5cbea750ad63` (A) | `subnet-0c03d3e13e5de8610` | `subnet-07dd5ba31d52b7864` | `subnet-024199d69953e1a25` (A) |
| tld-api-cuenta-nombre | `vpce-060f0db9e16d13ea3` | `sg-0020c5cbea750ad63` (A) | `subnet-0c03d3e13e5de8610` | `subnet-07dd5ba31d52b7864` | `subnet-024199d69953e1a25` (A) |
| tld-api-alias | `vpce-060f0db9e16d13ea3` | `sg-07cb533f2a71d11db` (B) | `subnet-0c03d3e13e5de8610` | `subnet-07dd5ba31d52b7864` | `subnet-03beb33a17aa75827` (B) |
| tld-api-r2p | `vpce-060f0db9e16d13ea3` | `sg-0020c5cbea750ad63` (A) | `subnet-0c03d3e13e5de8610` | `subnet-07dd5ba31d52b7864` | `subnet-024199d69953e1a25` (A) |
| tld-api-p2m | `vpce-060f0db9e16d13ea3` | `sg-0020c5cbea750ad63` (A) | `subnet-0c03d3e13e5de8610` | `subnet-07dd5ba31d52b7864` | `subnet-024199d69953e1a25` (A) |
| tld-preg-seguridad | `vpce-060f0db9e16d13ea3` | `sg-07cb533f2a71d11db` (B) | `subnet-0c03d3e13e5de8610` | `subnet-07dd5ba31d52b7864` | `subnet-03beb33a17aa75827` (B) |
| tld-api-qrpayment | `vpce-060f0db9e16d13ea3` | `sg-07cb533f2a71d11db` (B) | `subnet-0c03d3e13e5de8610` | `subnet-07dd5ba31d52b7864` | `subnet-03beb33a17aa75827` (B) |
| tld-validador-proxy | `vpce-060f0db9e16d13ea3` | `sg-0020c5cbea750ad63` (A) | `subnet-0c03d3e13e5de8610` | `subnet-07dd5ba31d52b7864` | `subnet-024199d69953e1a25` (A) |
| tld-achx | `vpce-060f0db9e16d13ea3` | `sg-07cb533f2a71d11db` (B) | `subnet-0c03d3e13e5de8610` | `subnet-07dd5ba31d52b7864` | `subnet-03beb33a17aa75827` (B) |

### dev-oregon (solo 2 repos)

| Repo | VPCe | SecurityGroup | Subnet1 | Subnet2 | Subnet3 |
|------|------|---------------|---------|---------|---------|
| tld-matriz | — | `sg-00b56af00ddf8aba2` | `subnet-0514570097cbb1f0e` | `subnet-0045feb045270550a` | `subnet-0be080ec056dd9f99` |
| tld-api-p2m | `vpce-07a043ba9738c3233` | `sg-00b56af00ddf8aba2` | `subnet-0514570097cbb1f0e` | `subnet-0045feb045270550a` | `subnet-0be080ec056dd9f99` |

Matriz: `LambdaSubnets` en archivo va en orden Subnet3, Subnet1, Subnet2. Mismos IDs. El resto de repos **no** tiene `[dev-oregon]`.

---

## Fuentes

| Repo | Archivo |
|------|---------|
| tld-matriz | [`tld-matriz/samconfig.toml`](../../tld-matriz/samconfig.toml) |
| tld-validador-api | [`tld-validador-api/samconfig.toml`](../../tld-validador-api/samconfig.toml) |
| tld-api-cuenta-nombre | [`tld-api-cuenta-nombre/samconfig.toml`](../../tld-api-cuenta-nombre/samconfig.toml) |
| tld-api-alias | [`tld-api-alias/samconfig.toml`](../../tld-api-alias/samconfig.toml) |
| tld-api-r2p | [`tld-api-r2p/samconfig.toml`](../../tld-api-r2p/samconfig.toml) |
| tld-api-p2m | [`tld-api-p2m/samconfig.toml`](../../tld-api-p2m/samconfig.toml) |
| tld-preg-seguridad | [`tld-preg-seguridad/samconfig.toml`](../../tld-preg-seguridad/samconfig.toml) |
| tld-api-qrpayment | [`tld-api-qrpayment/samconfig.toml`](../../tld-api-qrpayment/samconfig.toml) |
| tld-validador-proxy | [`tld-validador-proxy/samconfig.toml`](../../tld-validador-proxy/samconfig.toml) |
| tld-achx | [`tld-achx/samconfig.toml`](../../tld-achx/samconfig.toml) |
