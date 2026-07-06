const fs = require("fs");
const path = require("path");
const { EXPECTED_BANCO, ESCENARIOS } = require("./datos-exito-0001");

const root = path.join(
  __dirname,
  "../VCN Escenarios error/Metodo/0001/3_respuestaExitosa"
);

const VALIDADORES = [
  ["1008", "CELEGATO"],
  ["1009", "ASTRGATO"],
  ["1011", "MIRAGATO"],
  ["1012", "TERAGATO"],
  ["1013", "AMIYGATO"],
  ["1014", "CORNGATO"],
  ["1015", "ZONAGATO"],
  ["1016", "BELLGATO"],
];

/** validarEnmascaramiento !== Y en tld-validador-canal-operacion (0001) */
const VALIDADORES_SIN_ENMASCARAMIENTO_0001 = new Set(["1016"]);

function buildDoc(validador, swift, def) {
  const enmascarado = !VALIDADORES_SIN_ENMASCARAMIENTO_0001.has(validador);
  const sufijoEnmascara = enmascarado ? "" : " — sin enmascaramiento";
  const doc = {
    nombre: `0001.3.${validador}.${def.bloque}.${def.seq}. validador ${swift} — ${def.label} (exito)${sufijoEnmascara}`,
    expectedHttpStatus: 200,
    expectedCodigoError: 0,
    expectedTipo: "exito",
    expectedCuenta: def.cuenta,
    expectedBanco: EXPECTED_BANCO,
    expectedEnmascarado: enmascarado,
    expectedValidador: validador,
    titularesClaro: def.titularesClaro,
    expectedTitularesExactos: def.expectedTitularesExactos,
    algoritmoCifrado: "aes-256-cbc",
    body: {
      idCanal: "{{CANAL_EMISOR}}",
      validador,
      peticion: {
        idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
        metodo: "0001",
        solicitudes: [
          {
            idSolicitud: "1",
            parametros: { cuenta: `{{${def.cuentaEnv}}}` },
          },
        ],
      },
    },
  };

  if (def.expectedProducto) {
    doc.expectedProducto = def.expectedProducto;
  }
  if (def.verificarUnicode) {
    doc.verificarUnicode = true;
  }
  if (def.expectedCuentaLongitud != null) {
    doc.expectedCuentaLongitud = def.expectedCuentaLongitud;
  }

  return doc;
}

function rimraf(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) rimraf(p);
    else fs.unlinkSync(p);
  }
  fs.rmdirSync(dir);
}

rimraf(root);
fs.mkdirSync(root, { recursive: true });

let total = 0;
for (const [validador, swift] of VALIDADORES) {
  const dir = path.join(root, validador);
  fs.mkdirSync(dir, { recursive: true });
  for (const def of ESCENARIOS) {
    fs.writeFileSync(
      path.join(dir, `${def.file}.json`),
      JSON.stringify(buildDoc(validador, swift, def), null, 2) + "\n"
    );
    total++;
  }
}

console.log(
  "Wrote",
  total,
  "scenarios (",
  VALIDADORES.length,
  "validadores x",
  ESCENARIOS.length,
  "cuentas) under",
  root
);
