const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../P2P Escenarios error/Metodo/0004/1_validaciones_js");
const root0003 = path.join(__dirname, "../P2P Escenarios error/Metodo/0003/1_validaciones_js");

const base0004 = {
  identificador: "{{IDENTIFICADOR_CELULAR}}",
  tipoIdentificador: "CELULAR",
  idPregunta: "pregunta01",
  respuesta: "respuesta01",
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
  return { ...base0004, ...override };
}

function writeScenario(carpeta, seq, file, label, code, parametros) {
  const n = file.split("_")[0].replace(/^\d+\./, "");
  const destDir = path.join(root, carpeta);
  fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(
    path.join(destDir, `${file}.json`),
    JSON.stringify(
      {
        nombre: `0004.1.${seq}.${n}. ${carpeta.replace(/^\d+_/, "").replace(/_/g, " ")} — ${label} (${code})`,
        expectedHttpStatus: 200,
        expectedCodigoError: code,
        expectedTipo: "parametro",
        algoritmoCifrado: "aes-256-cbc",
        body: {
          idCanal: "{{CANAL_EMISOR}}",
          validador: "{{CANAL_VALIDADOR}}",
          peticion: {
            idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
            metodo: "0004",
            solicitudes: [{ idSolicitud: "1", parametros }],
          },
        },
      },
      null,
      2
    ) + "\n"
  );
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function renameLabel(nombre, dstSeq) {
  const m = nombre.match(/ — (.+) \(\d+\)$/);
  return m ? m[1] : nombre;
}

/**
 * Clona carpeta 0003 → 0004. Añade campos base del método, pero si `field`
 * está ausente en el origen (caso propiedad_ausente), NO lo reinyecta desde base.
 */
function cloneFolderFrom0003(srcFolder, dstFolder, dstSeq, field) {
  const srcDir = path.join(root0003, srcFolder);
  let count = 0;
  for (const file of fs.readdirSync(srcDir).filter((f) => f.endsWith(".json")).sort()) {
    const src = readJson(path.join(srcDir, file));
    const baseName = file.replace(/\.json$/, "");
    const srcParams = src.body.peticion.solicitudes[0].parametros;
    const label = renameLabel(src.nombre, dstSeq);
    const parametros = { ...base0004, ...srcParams };
    if (!(field in srcParams)) delete parametros[field];
    writeScenario(dstFolder, dstSeq, baseName, label, src.expectedCodigoError, parametros);
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
    let parametros;
    if (!(field in srcParams)) {
      parametros = omit(base0004, field);
    } else {
      parametros = mergeParams({ [field]: srcParams[field] });
    }
    const label = renameLabel(src.nombre, dstSeq);
    writeScenario(dstFolder, dstSeq, baseName, label, src.expectedCodigoError, parametros);
    count++;
  }
  return count;
}

let total = 0;

total += cloneFolderFrom0003("1_identificador", "1_identificador", "1", "identificador");
total += cloneFolderFrom0003("2_tipoIdentificador", "2_tipoIdentificador", "2", "tipoIdentificador");

const idPreguntaItems = [
  ["3.1_idPregunta_propiedad_ausente", "propiedad ausente", 428, omit(base0004, "idPregunta")],
  ["3.2_idPregunta_null", "null", 428, mergeParams({ idPregunta: null })],
  ["3.3_idPregunta_string_vacio", "string vacío", 428, mergeParams({ idPregunta: "" })],
  ["3.4_idPregunta_tipo_number", "tipo number", 428, mergeParams({ idPregunta: 1 })],
  ["3.5_idPregunta_tipo_boolean", "tipo boolean", 428, mergeParams({ idPregunta: true })],
  ["3.6_idPregunta_tipo_object", "tipo object", 428, mergeParams({ idPregunta: {} })],
  ["3.7_idPregunta_simbolo_arroba", "símbolo arroba", 428, mergeParams({ idPregunta: "preg@unta" })],
  ["3.8_idPregunta_espacio_interno", "espacio interno", 428, mergeParams({ idPregunta: "preg unta" })],
  ["3.9_idPregunta_solo_espacios", "solo espacios", 428, mergeParams({ idPregunta: "   " })],
];

for (const [file, label, code, parametros] of idPreguntaItems) {
  writeScenario("3_idPregunta", "3", file, label, code, parametros);
  total++;
}

const respuestaItems = [
  ["4.1_respuesta_propiedad_ausente", "propiedad ausente", 429, omit(base0004, "respuesta")],
  ["4.2_respuesta_null", "null", 429, mergeParams({ respuesta: null })],
  ["4.3_respuesta_string_vacio", "string vacío", 429, mergeParams({ respuesta: "" })],
  ["4.4_respuesta_tipo_number", "tipo number", 429, mergeParams({ respuesta: 1 })],
  ["4.5_respuesta_tipo_boolean", "tipo boolean", 429, mergeParams({ respuesta: true })],
  ["4.6_respuesta_tipo_object", "tipo object", 429, mergeParams({ respuesta: {} })],
  ["4.7_respuesta_simbolo_arroba", "símbolo arroba", 429, mergeParams({ respuesta: "resp@uesta" })],
  ["4.8_respuesta_espacio_interno", "espacio interno", 429, mergeParams({ respuesta: "resp uesta" })],
  ["4.9_respuesta_solo_espacios", "solo espacios", 429, mergeParams({ respuesta: "   " })],
];

for (const [file, label, code, parametros] of respuestaItems) {
  writeScenario("4_respuesta", "4", file, label, code, parametros);
  total++;
}

total += cloneFieldFromP2M(
  path.join(__dirname, "../P2M Escenarios error/Metodo/0016/1_validaciones_js/3_banco"),
  "5_banco",
  "5",
  "banco"
);

const cuentaExtra = [
  ["4.1_cuenta_propiedad_ausente", "propiedad ausente", 413, omit(base0004, "cuenta")],
  ["4.2_cuenta_null", "null", 413, mergeParams({ cuenta: null })],
  ["4.3_cuenta_string_vacio", "string vacío", 413, mergeParams({ cuenta: "" })],
];

for (const [file, label, code, parametros] of cuentaExtra) {
  writeScenario("6_cuenta", "6", file, label, code, parametros);
  total++;
}

total += cloneFieldFromP2M(
  path.join(__dirname, "../P2M Escenarios error/Metodo/0021/1_validaciones_js/4_cuenta"),
  "6_cuenta",
  "6",
  "cuenta"
);

const productoExtra = [
  ["5.1_producto_propiedad_ausente", "propiedad ausente", 421, omit(base0004, "producto")],
  ["5.2_producto_null", "null", 421, mergeParams({ producto: null })],
  ["5.3_producto_string_vacio", "string vacío", 421, mergeParams({ producto: "" })],
];

for (const [file, label, code, parametros] of productoExtra) {
  writeScenario("7_producto", "7", file, label, code, parametros);
  total++;
}

total += cloneFieldFromP2M(
  path.join(__dirname, "../P2M Escenarios error/Metodo/0021/1_validaciones_js/5_producto"),
  "7_producto",
  "7",
  "producto"
);

console.log("Wrote", total, "scenarios under", root);
