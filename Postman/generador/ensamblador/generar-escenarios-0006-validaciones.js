const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../P2P Escenarios error/Metodo/0006/1_validaciones_js");
const root0003 = path.join(__dirname, "../P2P Escenarios error/Metodo/0003/1_validaciones_js");

const MAX_RESPUESTAS = 2;

const respuestasValidas = [
  { id: "pregunta01", texto: "respuesta01" },
  { id: "pregunta02", texto: "respuesta02" },
];

const base0006 = {
  identificador: "{{IDENTIFICADOR_CELULAR}}",
  tipoIdentificador: "CELULAR",
  respuestas: respuestasValidas,
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
  return { ...base0006, ...override };
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
        nombre: `0006.1.${seq}.${n}. ${carpeta.replace(/^\d+_/, "").replace(/_/g, " ")} — ${label} (${code})`,
        expectedHttpStatus: 200,
        expectedCodigoError: code,
        expectedTipo: "parametro",
        algoritmoCifrado: "aes-256-cbc",
        body: {
          idCanal: "{{CANAL_EMISOR}}",
          validador: "{{CANAL_VALIDADOR}}",
          peticion: {
            idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
            metodo: "0006",
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
    const parametros = field in srcParams ? mergeParams({ [field]: srcParams[field] }) : omit(base0006, field);
    writeScenario(dstFolder, dstSeq, baseName, renameLabel(src.nombre), src.expectedCodigoError, parametros);
    count++;
  }
  return count;
}

let total = 0;

total += cloneFolderFrom0003("1_identificador", "1_identificador", "1");
total += cloneFolderFrom0003("2_tipoIdentificador", "2_tipoIdentificador", "2");

const respuestasItems = [
  ["3.1_respuestas_propiedad_ausente", "propiedad ausente", 455, omit(base0006, "respuestas")],
  ["3.2_respuestas_null", "null", 455, mergeParams({ respuestas: null })],
  ["3.3_respuestas_tipo_string", "tipo string", 455, mergeParams({ respuestas: "no-es-arreglo" })],
  ["3.4_respuestas_tipo_number", "tipo number", 455, mergeParams({ respuestas: 1 })],
  ["3.5_respuestas_arreglo_vacio", "arreglo vacío", 455, mergeParams({ respuestas: [] })],
  [
    "3.6_respuestas_un_solo_elemento",
    `un solo elemento (esperados ${MAX_RESPUESTAS})`,
    455,
    mergeParams({ respuestas: [{ id: "pregunta01", texto: "respuesta01" }] }),
  ],
  [
    "3.7_respuestas_tres_elementos",
    `tres elementos (esperados ${MAX_RESPUESTAS})`,
    455,
    mergeParams({
      respuestas: [
        { id: "pregunta01", texto: "respuesta01" },
        { id: "pregunta02", texto: "respuesta02" },
        { id: "pregunta03", texto: "respuesta03" },
      ],
    }),
  ],
  ["3.8_respuestas_elemento_no_objeto", "elemento no objeto", 455, mergeParams({ respuestas: ["x", "y"] })],
  [
    "3.9_respuestas_item_sin_texto",
    "item sin propiedad texto",
    455,
    mergeParams({ respuestas: [{ id: "pregunta01" }, { id: "pregunta02", texto: "respuesta02" }] }),
  ],
  [
    "3.10_respuestas_item_sin_id",
    "item sin propiedad id",
    455,
    mergeParams({ respuestas: [{ texto: "respuesta01" }, { id: "pregunta02", texto: "respuesta02" }] }),
  ],
  [
    "3.11_respuestas_id_tipo_number",
    "id tipo number",
    455,
    mergeParams({
      respuestas: [
        { id: 1, texto: "respuesta01" },
        { id: "pregunta02", texto: "respuesta02" },
      ],
    }),
  ],
  [
    "3.12_respuestas_texto_tipo_number",
    "texto tipo number",
    455,
    mergeParams({
      respuestas: [
        { id: "pregunta01", texto: 1 },
        { id: "pregunta02", texto: "respuesta02" },
      ],
    }),
  ],
  [
    "3.13_respuestas_id_vacio",
    "id vacío",
    455,
    mergeParams({
      respuestas: [
        { id: "", texto: "respuesta01" },
        { id: "pregunta02", texto: "respuesta02" },
      ],
    }),
  ],
  [
    "3.14_respuestas_texto_vacio",
    "texto vacío",
    455,
    mergeParams({
      respuestas: [
        { id: "pregunta01", texto: "" },
        { id: "pregunta02", texto: "respuesta02" },
      ],
    }),
  ],
  [
    "3.15_respuestas_id_duplicado",
    "id duplicado case-insensitive",
    455,
    mergeParams({
      respuestas: [
        { id: "pregunta01", texto: "respuesta01" },
        { id: "PREGUNTA01", texto: "respuesta02" },
      ],
    }),
  ],
  [
    "3.16_respuestas_propiedad_extra",
    "propiedad extra en item",
    455,
    mergeParams({
      respuestas: [
        { id: "pregunta01", texto: "respuesta01", extra: "x" },
        { id: "pregunta02", texto: "respuesta02" },
      ],
    }),
  ],
];

for (const [file, label, code, parametros] of respuestasItems) {
  writeScenario("3_respuestas", "3", file, label, code, parametros);
  total++;
}

total += cloneFieldFromP2M(
  path.join(__dirname, "../P2M Escenarios error/Metodo/0016/1_validaciones_js/3_banco"),
  "4_banco",
  "4",
  "banco"
);

const cuentaExtra = [
  ["4.1_cuenta_propiedad_ausente", "propiedad ausente", 413, omit(base0006, "cuenta")],
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
  ["5.1_producto_propiedad_ausente", "propiedad ausente", 421, omit(base0006, "producto")],
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
