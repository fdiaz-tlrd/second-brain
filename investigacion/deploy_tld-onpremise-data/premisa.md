# AWS Sandbox P2M - Premisa
Host:Port 172.28.56.40:1598
Service Name ACHTEST
User FDIAZ
Esquema donde se ejecuta el script de instalación: PA_ACH

################################################################
# ARQ-256 install_PA_ACH.sql
# Punto de entrada: premisa/ARQ-256_Bajar_a_premisa_P2M/
# Delega en: ../PA_ACH/install.sql
# Fecha/hora: 2026-07-10 10:36:10
# Usuario:    FDIAZ
################################################################
 PL/SQL procedure successfully completed.
################################################################
# INICIO install PA_ACH (AWS -> Premisa P2M)
# Fecha/hora: 2026-07-10 10:36:11
# Usuario:    FDIAZ
################################################################
 PL/SQL procedure successfully completed.
>>> PASO 1/7: Tablas infra/datos
 PL/SQL procedure successfully completed.
>> DECLARE
  n NUMBER;
BEGIN
  DBMS_OUTPUT.PUT_LINE('--- PA_ACH.TLRD_MENSAJE_RECIBIDO ---');
  DBMS_OUTPUT.PUT_LINE('  Consultando ALL_TABLES (owner=PA_ACH)...');
  SELECT COUNT(*) INTO n FROM all_tables WHERE owner = 'PA_ACH' AND table_name = 'TLRD_MENSAJE_RECIBIDO';
  DBMS_OUTPUT.PUT_LINE('  Resultado: ' || n || ' (0=crear, >=1=omitir)');

  IF n = 0 THEN
    DBMS_OUTPUT.PUT_LINE('  Creando tabla...');
    EXECUTE IMMEDIATE q'[
CREATE TABLE PA_ACH.TLRD_MENSAJE_RECIBIDO
(
  ID                NUMBER GENERATED ALWAYS AS IDENTITY NOT NULL,
  CODE              VARCHAR2(150),
  MESSAGE_RECEIVED  CLOB,
  FECHA_REGISTRO    DATE DEFAULT SYSDATE,
  ESTADO_PROCESO    VARCHAR2(50) DEFAULT 'P',
  FECHA_PROCESO     DATE,
  COMENTARIO        VARCHAR2(500)
)
LOB (MESSAGE_RECEIVED) STORE AS SECUREFILE (
  TABLESPACE PA_ACH ENABLE STORAGE IN ROW CHUNK 8192 RETENTION NOCACHE LOGGING)
TABLESPACE PA_ACH]';
    DBMS_OUTPUT.PUT_LINE('  Tabla creada.');

    DBMS_OUTPUT.PUT_LINE('  Creando indice IXD_TLRD_MENSAJE_RECIBIDO_1 (ID, CODE)...');
    EXECUTE IMMEDIATE '
CREATE INDEX PA_ACH.IXD_TLRD_MENSAJE_RECIBIDO_1 ON PA_ACH.TLRD_MENSAJE_RECIBIDO (ID, CODE) TABLESPACE PA_ACH';

    DBMS_OUTPUT.PUT_LINE('  Agregando PK (ID, CODE)...');
    EXECUTE IMMEDIATE q'[
ALTER TABLE PA_ACH.TLRD_MENSAJE_RECIBIDO ADD (
  CONSTRAINT PK_TLRD_MENSAJE_RECIBIDO PRIMARY KEY (ID, CODE)
  USING INDEX PA_ACH.IXD_TLRD_MENSAJE_RECIBIDO_1
)]';

    DBMS_OUTPUT.PUT_LINE('  Creando indices IXD_TLRD_MENSAJE_RECIBIDO_2..6...');
    EXECUTE IMMEDIATE '
CREATE INDEX PA_ACH.IXD_TLRD_MENSAJE_RECIBIDO_2 ON PA_ACH.TLRD_MENSAJE_RECIBIDO (CODE) TABLESPACE PA_ACH';
    EXECUTE IMMEDIATE '
CREATE INDEX PA_ACH.IXD_TLRD_MENSAJE_RECIBIDO_3 ON PA_ACH.TLRD_MENSAJE_RECIBIDO (FECHA_REGISTRO) TABLESPACE PA_ACH';
    EXECUTE IMMEDIATE '
CREATE INDEX PA_ACH.IXD_TLRD_MENSAJE_RECIBIDO_4 ON PA_ACH.TLRD_MENSAJE_RECIBIDO (FECHA_PROCESO) TABLESPACE PA_ACH';
    EXECUTE IMMEDIATE '
CREATE INDEX PA_ACH.IXD_TLRD_MENSAJE_RECIBIDO_5 ON PA_ACH.TLRD_MENSAJE_RECIBIDO (ESTADO_PROCESO) TABLESPACE PA_ACH';
    EXECUTE IMMEDIATE '
CREATE INDEX PA_ACH.IXD_TLRD_MENSAJE_RECIBIDO_6 ON PA_ACH.TLRD_MENSAJE_RECIBIDO (CODE, ESTADO_PROCESO) TABLESPACE PA_ACH';

    DBMS_OUTPUT.PUT_LINE('  RESULTADO: TLRD_MENSAJE_RECIBIDO CREADA');
  ELSE
    DBMS_OUTPUT.PUT_LINE('  RESULTADO: TLRD_MENSAJE_RECIBIDO ya existe, se omite');
  END IF;
END;
Error at line 2
ORA-01031: privilegios insuficientes
ORA-06512: en línea 11

Commit complete.

# AWS Sandbox P2P - Premisa
Host:Port 172.28.56.40:1598
Service Name ACHTEST
User FDIAZ
Esquema donde se ejecuta el script de instalación: PA_MAC
Script: \tld-onpremise-data\premisa\ARQ-256_Bajar_a_premisa_P2M\install.sql

Package created.
Package body created.
Columna SERVICIOSASOCIADOS ya existe, se omite
 PL/SQL procedure successfully completed.
 PL/SQL procedure successfully completed.
 PL/SQL procedure successfully completed.
 PL/SQL procedure successfully completed.
--- GRANT / SINONIMO PA_MAC -> AWSDATA ---
  Usuario conectado: FDIAZ
 PL/SQL procedure successfully completed.
>> DECLARE
  n_grant NUMBER;
  n_priv  NUMBER;
BEGIN
  DBMS_OUTPUT.PUT_LINE('');
  DBMS_OUTPUT.PUT_LINE('  [1/2] GRANT EXECUTE ON PA_MAC.PCK_PA_MAC_AWS TO AWSDATA');
  DBMS_OUTPUT.PUT_LINE('        Consultando ALL_TAB_PRIVS (grantee=AWSDATA, privilege=EXECUTE)...');

  SELECT COUNT(*) INTO n_grant
    FROM all_tab_privs
   WHERE grantee = 'AWSDATA'
     AND owner = 'PA_MAC'
     AND table_name = 'PCK_PA_MAC_AWS'
     AND privilege = 'EXECUTE';

  DBMS_OUTPUT.PUT_LINE('        Registros encontrados: ' || n_grant);

  IF n_grant > 0 THEN
    DBMS_OUTPUT.PUT_LINE('        RESULTADO: ya existe, se omite');
  ELSE
    SELECT COUNT(*) INTO n_priv FROM session_privs WHERE privilege = 'GRANT ANY OBJECT PRIVILEGE';
    DBMS_OUTPUT.PUT_LINE('        Privilegio GRANT ANY OBJECT PRIVILEGE: ' || CASE WHEN n_priv > 0 OR USER = 'PA_MAC' THEN 'SI' ELSE 'NO' END);

    IF USER = 'PA_MAC' OR n_priv > 0 THEN
      EXECUTE IMMEDIATE 'GRANT EXECUTE ON PA_MAC.PCK_PA_MAC_AWS TO AWSDATA';
      DBMS_OUTPUT.PUT_LINE('        RESULTADO: GRANT aplicado OK');
    ELSE
      DBMS_OUTPUT.PUT_LINE('        RESULTADO: AVISO — no se pudo otorgar');
      DBMS_OUTPUT.PUT_LINE('        Accion manual: GRANT EXECUTE ON PA_MAC.PCK_PA_MAC_AWS TO AWSDATA;');
    END IF;
  END IF;
END;
Error at line 10
ORA-06550: línea 12, columna 10:
PL/SQL: ORA-00904: "OWNER": identificador no válido
ORA-06550: línea 9, columna 3:
PL/SQL: SQL Statement ignored

  [2/2] PUBLIC SYNONYM PCK_PA_MAC_AWS
        Consultando ALL_SYNONYMS (owner=PUBLIC)...
        Registros encontrados: 1
        Apunta a: PA_MAC.PCK_PA_MAC_AWS
        RESULTADO: ya existe correcto, se omite
 PL/SQL procedure successfully completed.
--- FIN GRANT / SINONIMO PA_MAC ---
 PL/SQL procedure successfully completed.
