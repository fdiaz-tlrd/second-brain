# PartiQL — refrescar datos Dig (canales / alias)

| Campo | Valor |
|-------|-------|
| Actualizado | 2026-07-16 |
| Uso | Consola DynamoDB → Editor PartiQL (VPN). Resultados grandes: **no** versionar dumps enteros; fusionar con scripts de esta carpeta o anotar solo lo útil (p. ej. R2P). |
| Agente | Si necesita datos de Dynamo Dig, **pedir al usuario** pegando la consulta PartiQL de este archivo (o una acotada). No asumir dumps en `notas-sueltas`. |

## `tld-validador-canal`

```sql
SELECT * FROM "tld-validador-canal" WHERE contains("alias", 'GATO');
```

## `tld-validador-canal-operacion`

```sql
SELECT *
FROM "tld-validador-canal-operacion"
WHERE "idCanal" IN ['1008', '1009', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019', '1020', '1021', '1022', '1023', '1024'];
```

## `tld-alias-cuenta` (bancos GATO)

```sql
SELECT *
FROM "tld-alias-cuenta"
WHERE "banco" IN ['CELEGATO', 'ASTRGATO', 'MIRAGATO', 'TERAGATO', 'AMIYGATO', 'CORNGATO', 'ZONAGATO', 'BELLGATO', 'TEYVGATO', 'ARCHGATO', 'STELGATO', 'NAMEGATO', 'HOLLGATO', 'PROXGATO', 'OUTFGATO', 'ANOMGATO'];
```

Tras export: actualizar [`canalesPruebas-dev.json`](./canalesPruebas-dev.json) con [`actualizar-desde-dynamo-export.js`](./actualizar-desde-dynamo-export.js) cuando aplique; datos R2P resumidos en [`datos-r2p-prueba-dev.md`](./datos-r2p-prueba-dev.md).
