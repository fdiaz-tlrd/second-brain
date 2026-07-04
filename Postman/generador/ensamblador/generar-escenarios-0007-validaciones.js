const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../P2P Escenarios error/Metodo/0007/1_validaciones_js");
const root0003 = path.join(__dirname, "../P2P Escenarios error/Metodo/0003/1_validaciones_js");

const base0007 = {
  identificador: "{{IDENTIFICADOR_CELULAR}}",
  tipoIdentificador: "CELULAR",
  banco: "{{SWIFT_CANAL_EMISOR}}",
  tipoBaja: "INDIVIDUAL",
};

function omit(obj, key) {
  const out = { ...obj };
  delete out[key];
  return out;
}

function mergeParams(override) {
  return { ...base0007, ...override };
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function renameLabel(nombre) {
  const m = nombre.match(/ — (.+) \(\d+\)$/);
  return m ? m[1] : nombre;
}

function writeScenario(carpeta, seq, file, label, code, parametros) {
  const n = file.split("_")[0].replace(/^\d+\./, "");
  const destDir = path.join(root, carpeta);
  fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(
    path.join(destDir, `${file}.json`),
    JSON.stringify(
      {
        nombre: `0007.1.${seq}.${n}. ${carpeta.replace(/^\d+_/, "").replace(/_/g, " ")} — ${label} (${code})`,
        expectedHttpStatus: 200,
        expectedCodigoError: code,
        expectedTipo: "parametro",
        algoritmoCifrado: "aes-256-cbc",
        body: {
          idCanal: "{{CANAL_EMISOR}}",
          validador: "{{CANAL_VALIDADOR}}",
          peticion: {
            idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
            metodo: "0007",
            solicitudes: [{ idSolicitud: "1", parametros }],
          },
        },
      },
      null,
      2
    ) + "\n"
  );
}

function cloneFolderFrom0003(srcFolder, dstFolder, dstSeq) {
  let count = 0;
  const srcDir = path.join(root0003, srcFolder);
  for (const file of fs.readdirSync(srcDir).filter((f) => f.endsWith(".json")).sort()) {
    const src = readJson(path.join(srcDir, file));
    const baseName = file.replace(/\.json$/, "");
    const srcParams = src.body.peticion.solicitudes[0].parametros;
    writeScenario(dstFolder, dstSeq, baseName, renameLabel(src.nombre), src.expectedCodigoError, mergeParams(srcParams));
    count++;
  }
  return count;
}

function cloneFieldFromP2M(srcDir, dstFolder, dstSeq, field) {
  let count = 0;
  for (const file of fs.readdirSync(srcDir).filter((f) => f.endsWith(".json")).sort()) {
    const src = readJson(path.join(srcDir, file));
    const baseName = file.replace(/\.json$/, "").replace(/^\d+\./, `${dstSeq}.`);
    const srcParams = src.body.peticion.solicitudes[0].parametros;
    const parametros = field in srcParams ? mergeParams({ [field]: srcParams[field] }) : omit(base0007, field);
    writeScenario(dstFolder, dstSeq, baseName, renameLabel(src.nombre), src.expectedCodigoError, parametros);
    count++;
  }
  return count;
}

let total = 0;

total += cloneFolderFrom0003("1_identificador", "1_identificador", "1");
total += cloneFolderFrom0003("2_tipoIdentificador", "2_tipoIdentificador", "2");

total += cloneFieldFromP2M(
  path.join(__dirname, "../P2M Escenarios error/Metodo/0016/1_validaciones_js/3_banco"),
  "3_banco",
  "3",
  "banco"
);

const tipoBajaItems = [
  ["4.1_tipoBaja_propiedad_ausente", "propiedad ausente", 426, omit(base0007, "tipoBaja")],
  ["4.2_tipoBaja_null", "null", 426, mergeParams({ tipoBaja: null })],
  ["4.3_tipoBaja_string_vacio", "string vacío", 426, mergeParams({ tipoBaja: "" })],
  ["4.4_tipoBaja_solo_espacios", "solo espacios", 426, mergeParams({ tipoBaja: "   " })],
  ["4.5_tipoBaja_tipo_number", "tipo number", 426, mergeParams({ tipoBaja: 1 })],
  ["4.6_tipoBaja_tipo_boolean", "tipo boolean", 426, mergeParams({ tipoBaja: true })],
  ["4.7_tipoBaja_tipo_object", "tipo object", 426, mergeParams({ tipoBaja: {} })],
  ["4.8_tipoBaja_valor_completa", "valor COMPLETA", 426, mergeParams({ tipoBaja: "COMPLETA" })],
  ["4.9_tipoBaja_valor_invalido", "valor no soportado", 426, mergeParams({ tipoBaja: "OTRO" })],
];

for (const [file, label, code, parametros] of tipoBajaItems) {
  writeScenario("4_tipoBaja", "4", file, label, code, parametros);
  total++;
}

console.log("Wrote", total, "scenarios under", root);
