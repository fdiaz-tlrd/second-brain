const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../P2P Escenarios error/Metodo/0022/1_validaciones_js");
const srcBanco = path.join(__dirname, "../P2M Escenarios error/Metodo/0016/1_validaciones_js/3_banco");

const baseQr = {
  identificador: "{{IDENTIFICADOR_CELULAR}}",
  nombreAcreedor: "Juan Perez",
  bancoAcreedor: "{{SWIFT_CANAL_EMISOR}}",
  moneda: "840",
  qrTipo: 11,
  canalPago: "BM",
  tipo: "TEXT",
};

function omit(obj, key) {
  const out = { ...obj };
  delete out[key];
  return out;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeScenario(carpeta, seq, file, label, code, parametros) {
  const n = file.split("_")[0].replace(/^\d+\./, "");
  const destDir = path.join(root, carpeta);
  fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(
    path.join(destDir, `${file}.json`),
    JSON.stringify(
      {
        nombre: `0022.1.${seq}.${n}. ${carpeta.replace(/^\d+_/, "").replace(/_/g, " ")} — ${label} (${code})`,
        expectedHttpStatus: 200,
        expectedCodigoError: code,
        expectedTipo: "parametro",
        algoritmoCifrado: "aes-256-cbc",
        body: {
          idCanal: "{{CANAL_EMISOR}}",
          validador: "{{CANAL_VALIDADOR}}",
          peticion: {
            idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
            metodo: "0022",
            solicitudes: [{ idSolicitud: "1", parametros }],
          },
        },
      },
      null,
      2
    ) + "\n"
  );
}

function mapBancoCode(code) {
  return code === 414 ? 435 : code;
}

let total = 0;

const gruposIdent = [
  {
    carpeta: "1_identificador",
    seq: "1",
    items: [
      ["1.1_identificador_propiedad_ausente", "propiedad ausente", 419, omit(baseQr, "identificador")],
      ["1.2_identificador_null", "null", 419, { ...baseQr, identificador: null }],
      ["1.3_identificador_string_vacio", "string vacío", 419, { ...baseQr, identificador: "" }],
      ["1.4_identificador_tipo_number", "tipo number", 409, { ...baseQr, identificador: 69852374 }],
      ["1.5_identificador_tipo_boolean", "tipo boolean", 409, { ...baseQr, identificador: true }],
      ["1.6_identificador_tipo_object", "tipo object", 409, { ...baseQr, identificador: {} }],
      ["1.7_identificador_no_inicia_6", "no inicia con 6", 409, { ...baseQr, identificador: "71234567" }],
      ["1.8_identificador_longitud_7", "longitud 7", 409, { ...baseQr, identificador: "6123456" }],
      ["1.9_identificador_longitud_9", "longitud 9", 409, { ...baseQr, identificador: "612345678" }],
      ["1.10_identificador_con_letras", "con letras", 409, { ...baseQr, identificador: "6123456a" }],
      ["1.11_identificador_solo_espacios", "solo espacios", 409, { ...baseQr, identificador: "        " }],
      ["1.12_identificador_espacio_interno", "espacio interno", 409, { ...baseQr, identificador: "61 23456" }],
    ],
  },
  {
    carpeta: "2_nombreAcreedor",
    seq: "2",
    items: [
      ["2.1_nombreAcreedor_propiedad_ausente", "propiedad ausente", 436, omit(baseQr, "nombreAcreedor")],
      ["2.2_nombreAcreedor_null", "null", 436, { ...baseQr, nombreAcreedor: null }],
      ["2.3_nombreAcreedor_string_vacio", "string vacío", 436, { ...baseQr, nombreAcreedor: "" }],
      ["2.4_nombreAcreedor_tipo_number", "tipo number", 436, { ...baseQr, nombreAcreedor: 1 }],
      ["2.5_nombreAcreedor_tipo_boolean", "tipo boolean", 436, { ...baseQr, nombreAcreedor: true }],
      ["2.6_nombreAcreedor_longitud_81", "longitud 81", 436, { ...baseQr, nombreAcreedor: "A".repeat(81) }],
      ["2.7_nombreAcreedor_caracteres_no_permitidos", "caracteres no permitidos", 436, { ...baseQr, nombreAcreedor: "Juan#{}" }],
      ["2.8_nombreAcreedor_simbolo_arroba", "símbolo arroba", 436, { ...baseQr, nombreAcreedor: "Juan@test" }],
    ],
  },
  {
    carpeta: "4_moneda",
    seq: "4",
    items: [
      ["4.1_moneda_propiedad_ausente", "propiedad ausente", 474, omit(baseQr, "moneda")],
      ["4.2_moneda_null", "null", 474, { ...baseQr, moneda: null }],
      ["4.3_moneda_string_vacio", "string vacío", 474, { ...baseQr, moneda: "" }],
      ["4.4_moneda_tipo_number", "tipo number", 474, { ...baseQr, moneda: 840 }],
      ["4.5_moneda_tipo_boolean", "tipo boolean", 474, { ...baseQr, moneda: true }],
      ["4.6_moneda_valor_incorrecto", "valor incorrecto", 474, { ...baseQr, moneda: "978" }],
      ["4.7_moneda_solo_espacios", "solo espacios", 474, { ...baseQr, moneda: "   " }],
    ],
  },
  {
    carpeta: "5_qrTipo",
    seq: "5",
    items: [
      ["5.1_qrTipo_propiedad_ausente", "propiedad ausente", 464, omit(baseQr, "qrTipo")],
      ["5.2_qrTipo_null", "null", 464, { ...baseQr, qrTipo: null }],
      ["5.3_qrTipo_tipo_string", "tipo string", 464, { ...baseQr, qrTipo: "11" }],
      ["5.4_qrTipo_tipo_boolean", "tipo boolean", 464, { ...baseQr, qrTipo: true }],
      ["5.5_qrTipo_valor_invalido", "valor inválido", 464, { ...baseQr, qrTipo: 10 }],
      ["5.6_qrTipo_valor_cero", "valor cero", 464, { ...baseQr, qrTipo: 0 }],
    ],
  },
  {
    carpeta: "6_canalPago",
    seq: "6",
    items: [
      ["6.1_canalPago_propiedad_ausente", "propiedad ausente", 472, omit(baseQr, "canalPago")],
      ["6.2_canalPago_null", "null", 472, { ...baseQr, canalPago: null }],
      ["6.3_canalPago_string_vacio", "string vacío", 472, { ...baseQr, canalPago: "" }],
      ["6.4_canalPago_tipo_number", "tipo number", 472, { ...baseQr, canalPago: 1 }],
      ["6.5_canalPago_tipo_boolean", "tipo boolean", 472, { ...baseQr, canalPago: true }],
      ["6.6_canalPago_valor_invalido", "valor inválido", 472, { ...baseQr, canalPago: "XX" }],
      ["6.7_canalPago_valor_minusculas", "valor minúsculas", 472, { ...baseQr, canalPago: "bm" }],
    ],
  },
  {
    carpeta: "7_tipo",
    seq: "7",
    items: [
      ["7.1_tipo_propiedad_ausente", "propiedad ausente", 468, omit(baseQr, "tipo")],
      ["7.2_tipo_null", "null", 468, { ...baseQr, tipo: null }],
      ["7.3_tipo_string_vacio", "string vacío", 468, { ...baseQr, tipo: "" }],
      ["7.4_tipo_tipo_number", "tipo number", 468, { ...baseQr, tipo: 1 }],
      ["7.5_tipo_tipo_boolean", "tipo boolean", 468, { ...baseQr, tipo: true }],
      ["7.6_tipo_valor_invalido", "valor inválido", 468, { ...baseQr, tipo: "JSON" }],
      ["7.7_tipo_valor_minusculas", "valor minúsculas", 468, { ...baseQr, tipo: "text" }],
    ],
  },
  {
    carpeta: "8_descripcion",
    seq: "8",
    items: [
      ["8.1_descripcion_tipo_number", "tipo number", 437, { ...baseQr, descripcion: 1 }],
      ["8.2_descripcion_longitud_81", "longitud 81", 437, { ...baseQr, descripcion: "A".repeat(81) }],
      ["8.3_descripcion_caracteres_no_permitidos", "caracteres no permitidos", 437, { ...baseQr, descripcion: "Pago#{}" }],
      ["8.4_descripcion_simbolo_arroba", "símbolo arroba", 437, { ...baseQr, descripcion: "Pago@test" }],
    ],
  },
];

for (const g of gruposIdent) {
  for (const [file, label, code, parametros] of g.items) {
    writeScenario(g.carpeta, g.seq, file, label, code, parametros);
    total++;
  }
}

function renameLabel(nombre) {
  const m = nombre.match(/ — (.+) \(\d+\)$/);
  return m ? m[1] : nombre;
}

for (const file of fs.readdirSync(srcBanco).filter((f) => f.endsWith(".json")).sort()) {
  const src = readJson(path.join(srcBanco, file));
  const baseName = file.replace(/\.json$/, "").replace(/^3\./, "1.");
  const srcParams = src.body.peticion.solicitudes[0].parametros;
  const parametros = { ...omit(baseQr, "bancoAcreedor") };
  if ("banco" in srcParams) {
    parametros.bancoAcreedor = srcParams.banco;
  }
  writeScenario(
    "3_bancoAcreedor",
    "3",
    baseName,
    renameLabel(src.nombre),
    mapBancoCode(src.expectedCodigoError),
    parametros
  );
  total++;
}

console.log("Wrote", total, "scenarios under", root);
