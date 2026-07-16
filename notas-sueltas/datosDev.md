# DynamoDB

## Editor PartiQL

### Tabla: tld-validador-canal

#### Query

```sql
SELECT * FROM "tld-validador-canal" WHERE contains("alias", 'GATO');
```

#### Resultado

Archivo: `notas-sueltas/tld-validador-canal.json`

### Tabla: tld-validador-canal-operacion

#### Query

```sql
SELECT *
FROM "tld-validador-canal-operacion"
WHERE "idCanal" IN ['1008', '1009', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019', '1020', '1021', '1022', '1023', '1024'];
```

#### Resultado

Archivo: `notas-sueltas/tld-validador-canal-operacion.json`

### Tabla: tld-alias-cuenta

#### Query

```sql
SELECT *
FROM "tld-alias-cuenta"
WHERE "banco" IN ['CELEGATO', 'ASTRGATO', 'MIRAGATO', 'TERAGATO', 'AMIYGATO', 'CORNGATO', 'ZONAGATO', 'BELLGATO', 'TEYVGATO', 'ARCHGATO', 'STELGATO', 'NAMEGATO', 'HOLLGATO', 'PROXGATO', 'OUTFGATO', 'ANOMGATO'];
```

#### Resultado

Archivo: `notas-sueltas\tld-alias-cuenta.json`
