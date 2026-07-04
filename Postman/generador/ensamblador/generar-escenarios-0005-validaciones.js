const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../P2P Escenarios error/Metodo/0005/1_validaciones_js");
const srcBanco = path.join(__dirname, "../P2M Escenarios error/Metodo/0016/1_validaciones_js/3_banco");

const base0005 = {
  banco: "{{SWIFT_CANAL_EMISOR}}",
};

function omit(obj, key) {
  const out = { ...obj };
  delete out[key];
  return out;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function renameLabel(nombre) {
  const m = nombre.match(/ — (.+) \(\d+\)$/);
  return m ? m[1] : nombre;
}

function writeScenario(file, label, code, parametros) {
  const n = file.split("_")[0].replace(/^\d+\./, "");
  const destDir = path.join(root, "1_banco");
  fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(
    path.join(destDir, `${file}.json`),
    JSON.stringify(
      {
        nombre: `0005.1.1.${n}. banco — ${label} (${code})`,
        expectedHttpStatus: 200,
        expectedCodigoError: code,
        expectedTipo: "parametro",
        algoritmoCifrado: "aes-256-cbc",
        body: {
          idCanal: "{{CANAL_EMISOR}}",
          validador: "{{CANAL_VALIDADOR}}",
          peticion: {
            idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
            metodo: "0005",
            solicitudes: [{ idSolicitud: "1", parametros }],
          },
        },
      },
      null,
      2
    ) + "\n"
  );
}

let total = 0;
for (const file of fs.readdirSync(srcBanco).filter((f) => f.endsWith(".json")).sort()) {
  const src = readJson(path.join(srcBanco, file));
  const baseName = file.replace(/\.json$/, "").replace(/^3\./, "1.");
  const srcParams = src.body.peticion.solicitudes[0].parametros;
  const parametros = "banco" in srcParams ? { banco: srcParams.banco } : omit(base0005, "banco");
  writeScenario(baseName, renameLabel(src.nombre), src.expectedCodigoError, parametros);
  total++;
}

console.log("Wrote", total, "scenarios under", root);
