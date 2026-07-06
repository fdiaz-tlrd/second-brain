const fs = require("fs");
const path = require("path");
const { EXPECTED_BANCO, ESCENARIOS } = require("./datos-exito-0001");

const root = path.join(
  __dirname,
  "../VCN Escenarios error/Metodo/0001/4_escenariosQA"
);

const CUENTA_FELIZ = ESCENARIOS.find((e) => e.file === "1.1_cuenta_feliz");

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

const VALIDADORES_SIN_ENMASCARAMIENTO_0001 = new Set(["1016"]);
const VALIDADORES_TOKEN_DINAMICO = [
  ["1011", "MIRAGATO"],
  ["1012", "TERAGATO"],
  ["1015", "ZONAGATO"],
  ["1016", "BELLGATO"],
];

const ID_SOLICITUD_MAX64 =
  "TLRDPAPA34920492304344343442424324244242443434434343443434434344";

function rimraf(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) rimraf(p);
    else fs.unlinkSync(p);
  }
  fs.rmdirSync(dir);
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, doc) {
  fs.writeFileSync(filePath, JSON.stringify(doc, null, 2) + "\n");
}

function buildExitoBase(validador, swift, label, extra) {
  const enmascarado = !VALIDADORES_SIN_ENMASCARAMIENTO_0001.has(validador);
  const sufijoEnmascara = enmascarado ? "" : " — sin enmascaramiento";
  return {
    nombre: `0001.4.${validador}. ${label} — validador ${swift} (exito)${sufijoEnmascara}`,
    expectedHttpStatus: 200,
    expectedCodigoError: 0,
    expectedTipo: "exito",
    expectedCuenta: CUENTA_FELIZ.cuenta,
    expectedBanco: EXPECTED_BANCO,
    expectedEnmascarado: enmascarado,
    expectedValidador: validador,
    expectedProducto: CUENTA_FELIZ.expectedProducto,
    titularesClaro: CUENTA_FELIZ.titularesClaro,
    expectedTitularesExactos: CUENTA_FELIZ.expectedTitularesExactos,
    algoritmoCifrado: "aes-256-cbc",
  };
}

function bodyBase(validador, idCanalVar, opts) {
  const body = {
    idCanal: idCanalVar,
    validador,
    peticion: {
      idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
      metodo: "0001",
      solicitudes: [
        {
          idSolicitud: opts.idSolicitud || "1",
          parametros: { cuenta: "{{CuentaFeliz}}" },
        },
      ],
    },
  };
  if (opts.__generarIds) {
    body.__generarIds = opts.__generarIds;
  }
  return body;
}

rimraf(root);
mkdirp(root);

let total = 0;

const limites = [
  {
    carpeta: "idPeticion_max64",
    file: "1.1_max64",
    label: "idPeticion MAX64 (QA)",
    bodyOpts: {
      __generarIds: { idPeticion: "max64" },
    },
  },
  {
    carpeta: "idPeticion_min1",
    file: "1.1_min1",
    label: "idPeticion MIN1 (QA)",
    bodyOpts: {
      __generarIds: { idPeticion: "min1" },
    },
  },
  {
    carpeta: "idSolicitud_max64",
    file: "1.1_max64",
    label: "idSolicitud MAX64 (QA)",
    bodyOpts: {
      idSolicitud: ID_SOLICITUD_MAX64,
    },
  },
  {
    carpeta: "idSolicitud_min1",
    file: "1.1_min1",
    label: "idSolicitud MIN1 (QA)",
    bodyOpts: {
      idSolicitud: "1",
    },
  },
];

for (const limite of limites) {
  for (const [validador, swift] of VALIDADORES) {
    const dir = path.join(root, limite.carpeta, validador);
    mkdirp(dir);
    const doc = buildExitoBase(validador, swift, limite.label);
    doc.body = bodyBase(validador, "{{CANAL_EMISOR}}", limite.bodyOpts);
    writeJson(path.join(dir, `${limite.file}.json`), doc);
    total++;
  }
}

const gcmDir = path.join(root, "gcm");
mkdirp(gcmDir);
writeJson(path.join(gcmDir, "1.1_gcm_punta_a_punta.json"), {
  ...buildExitoBase("1013", "AMIYGATO", "GCM punta a punta (QA)"),
  algoritmoCifrado: "aes-256-gcm",
  body: bodyBase("1013", "{{CANAL_EMISOR_GCM}}", {}),
});
total++;

const cbcGcmDir = path.join(root, "cbc_gcm");
mkdirp(cbcGcmDir);
writeJson(path.join(cbcGcmDir, "1.1_cbc_cifrar_gcm_validador.json"), {
  ...buildExitoBase("1013", "AMIYGATO", "CBC cifrar + validador GCM (QA)"),
  algoritmoCifrado: "aes-256-cbc",
  body: bodyBase("1013", "{{CANAL_EMISOR}}", {}),
});
total++;

for (const [validador, swift] of VALIDADORES_TOKEN_DINAMICO) {
  const dir = path.join(root, "token_dinamico", validador);
  mkdirp(dir);
  const doc = buildExitoBase(validador, swift, "token dinámico (QA)");
  doc.body = bodyBase(validador, "{{CANAL_EMISOR}}", {});
  writeJson(path.join(dir, "1.1_token_dinamico.json"), doc);
  total++;
}

console.log("Wrote", total, "QA additional scenarios under", root);
