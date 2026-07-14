const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../P2P Escenarios error/Metodo/0008/1_validaciones_js");
const root0003 = path.join(__dirname, "../P2P Escenarios error/Metodo/0003/1_validaciones_js");

const base0008 = {
  id: "00000000-0000-4000-8000-000000000001",
  identificador: "{{IDENTIFICADOR_CELULAR}}",
  tipoIdentificador: "CELULAR",
  banco: "{{SWIFT_CANAL_EMISOR}}",
  cuenta: "1234567890",
  producto: "PACA",
};

function omit(obj, key) {
  const out = { ...obj };
  delete out[key];
  return out;
}

function mergeParams(override) {
  return { ...base0008, ...override };
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
        nombre: `0008.1.${seq}.${n}. ${carpeta.replace(/^\d+_/, "").replace(/_/g, " ")} — ${label} (${code})`,
        expectedHttpStatus: 200,
        expectedCodigoError: code,
        expectedTipo: "parametro",
        algoritmoCifrado: "aes-256-cbc",
        body: {
          idCanal: "{{CANAL_EMISOR}}",
          validador: "{{CANAL_VALIDADOR}}",
          peticion: {
            idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
            metodo: "0008",
            solicitudes: [{ idSolicitud: "1", parametros }],
          },
        },
      },
      null,
      2
    ) + "\n"
  );
}

/**
 * Clona carpeta 0003 → 0008. Añade campos base del método, pero si `field`
 * está ausente en el origen (caso propiedad_ausente), NO lo reinyecta desde base.
 */
function cloneFolderFrom0003(srcFolder, dstFolder, dstSeq, field) {
  let count = 0;
  const srcDir = path.join(root0003, srcFolder);
  for (const file of fs.readdirSync(srcDir).filter((f) => f.endsWith(".json")).sort()) {
    const src = readJson(path.join(srcDir, file));
    const baseName = file.replace(/\.json$/, "");
    const srcParams = src.body.peticion.solicitudes[0].parametros;
    const parametros = { ...base0008, ...srcParams };
    if (!(field in srcParams)) delete parametros[field];
    writeScenario(dstFolder, dstSeq, baseName, renameLabel(src.nombre), src.expectedCodigoError, parametros);
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
    const parametros = field in srcParams ? mergeParams({ [field]: srcParams[field] }) : omit(base0008, field);
    writeScenario(dstFolder, dstSeq, baseName, renameLabel(src.nombre), src.expectedCodigoError, parametros);
    count++;
  }
  return count;
}

let total = 0;

const idItems = [
  ["1.1_id_propiedad_ausente", "propiedad ausente", 444, omit(base0008, "id")],
  ["1.2_id_null", "null", 444, mergeParams({ id: null })],
  ["1.3_id_string_vacio", "string vacío", 444, mergeParams({ id: "" })],
  ["1.4_id_solo_espacios", "solo espacios", 444, mergeParams({ id: "   " })],
  ["1.5_id_tipo_number", "tipo number", 444, mergeParams({ id: 1 })],
  ["1.6_id_tipo_boolean", "tipo boolean", 444, mergeParams({ id: true })],
  ["1.7_id_tipo_object", "tipo object", 444, mergeParams({ id: {} })],
  ["1.8_id_longitud_incorrecta", "longitud incorrecta", 444, mergeParams({ id: "00000000-0000-4000-8000" })],
  ["1.9_id_formato_invalido", "formato no UUID", 444, mergeParams({ id: "no-es-un-uuid-valido-en-absoluto" })],
  ["1.10_id_sin_guiones", "sin guiones", 444, mergeParams({ id: "00000000000040008000000000000001" })],
];

for (const [file, label, code, parametros] of idItems) {
  writeScenario("1_id", "1", file, label, code, parametros);
  total++;
}

total += cloneFolderFrom0003("1_identificador", "2_identificador", "2", "identificador");
total += cloneFolderFrom0003("2_tipoIdentificador", "3_tipoIdentificador", "3", "tipoIdentificador");

total += cloneFieldFromP2M(
  path.join(__dirname, "../P2M Escenarios error/Metodo/0016/1_validaciones_js/3_banco"),
  "4_banco",
  "4",
  "banco"
);

const cuentaExtra = [
  ["4.1_cuenta_propiedad_ausente", "propiedad ausente", 413, omit(base0008, "cuenta")],
  ["4.2_cuenta_null", "null", 413, mergeParams({ cuenta: null })],
  ["4.3_cuenta_string_vacio", "string vacío", 413, mergeParams({ cuenta: "" })],
];

for (const [file, label, code, parametros] of cuentaExtra) {
  writeScenario("5_cuenta", "5", file, label, code, parametros);
  total++;
}

total += cloneFieldFromP2M(
  path.join(__dirname, "../P2M Escenarios error/Metodo/0021/1_validaciones_js/4_cuenta"),
  "5_cuenta",
  "5",
  "cuenta"
);

const productoExtra = [
  ["5.1_producto_propiedad_ausente", "propiedad ausente", 421, omit(base0008, "producto")],
  ["5.2_producto_null", "null", 421, mergeParams({ producto: null })],
  ["5.3_producto_string_vacio", "string vacío", 421, mergeParams({ producto: "" })],
];

for (const [file, label, code, parametros] of productoExtra) {
  writeScenario("6_producto", "6", file, label, code, parametros);
  total++;
}

total += cloneFieldFromP2M(
  path.join(__dirname, "../P2M Escenarios error/Metodo/0021/1_validaciones_js/5_producto"),
  "6_producto",
  "6",
  "producto"
);

console.log("Wrote", total, "scenarios under", root);
