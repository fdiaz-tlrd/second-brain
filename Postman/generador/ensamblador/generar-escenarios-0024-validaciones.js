const fs = require("fs");
const path = require("path");

const root0024 = path.join(__dirname, "../P2M Escenarios error/Metodo/0024/1_validaciones_js");
const root0015 = path.join(__dirname, "../P2M Escenarios error/Metodo/0015/1_validaciones_js");
const root0016 = path.join(__dirname, "../P2M Escenarios error/Metodo/0016/1_validaciones_js");

const baseIdent = {
  identificador: "{{IDENTIFICADOR_COMERCIO_NO_REGISTRADO}}",
  tipoIdentificador: "COMERCIO",
  banco: "{{SWIFT_CANAL_EMISOR}}",
};

const baseQr11 = {
  ...baseIdent,
  moneda: "840",
  qrTipo: 11,
  canalPago: "BM",
  tipo: "TEXT",
};

const baseQr12 = {
  ...baseQr11,
  qrTipo: 12,
  fechaVencimiento: "20991231",
  cantidadLecturas: 1,
  ciudadComercio: "San Jose",
  montoBase: 1000,
  impuesto: 0,
  propina: 0,
  monto: 1000,
};

const baseMontos12 = { ...baseQr12 };

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeScenario(destDir, file, doc) {
  fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(path.join(destDir, `${file}.json`), JSON.stringify(doc, null, 2) + "\n");
}

function write(carpeta, seq, file, label, code, parametros) {
  const n = file.split("_")[0].split(".")[1];
  writeScenario(path.join(root0024, carpeta), file, {
    nombre: `0024.1.${seq}.${n}. ${carpeta.replace(/^\d+_/, "").replace(/_/g, " ")} — ${label} (${code})`,
    expectedHttpStatus: 200,
    expectedCodigoError: code,
    expectedTipo: "parametro",
    algoritmoCifrado: "aes-256-cbc",
    body: {
      idCanal: "{{CANAL_EMISOR}}",
      validador: "{{CANAL_VALIDADOR}}",
      peticion: {
        idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
        metodo: "0024",
        solicitudes: [{ idSolicitud: "1", parametros }],
      },
    },
  });
}

function renameNombre(nombre, dstSeq, metodoFrom) {
  const m = nombre.match(new RegExp(`^${metodoFrom}\\.1\\.\\d+\\.(\\d+\\.\\s.+)$`));
  if (!m) throw new Error(`No se pudo renombrar: ${nombre}`);
  return `0024.1.${dstSeq}.${m[1]}`;
}

function cloneFolder(srcDir, dstFolder, dstSeq, metodoFrom) {
  const destDir = path.join(root0024, dstFolder);
  let count = 0;
  for (const file of fs.readdirSync(srcDir).filter((f) => f.endsWith(".json")).sort()) {
    const base = file.replace(/\.json$/, "");
    const src = readJson(path.join(srcDir, file));
    const parametros = src.body.peticion.solicitudes[0].parametros;
    writeScenario(destDir, base, {
      nombre: renameNombre(src.nombre, dstSeq, metodoFrom),
      expectedHttpStatus: src.expectedHttpStatus,
      expectedCodigoError: src.expectedCodigoError,
      expectedTipo: src.expectedTipo,
      algoritmoCifrado: src.algoritmoCifrado,
      body: {
        ...src.body,
        peticion: {
          ...src.body.peticion,
          metodo: "0024",
          solicitudes: [{ ...src.body.peticion.solicitudes[0], parametros }],
        },
      },
    });
    count++;
  }
  return count;
}

function omit(obj, key) {
  const out = { ...obj };
  delete out[key];
  return out;
}

let total = 0;

total += cloneFolder(path.join(root0015, "1_identificador"), "1_identificador", "1", "0015");
total += cloneFolder(path.join(root0015, "2_tipoIdentificador"), "2_tipoIdentificador", "2", "0015");
total += cloneFolder(path.join(root0016, "3_banco"), "3_banco", "3", "0016");

const grupos = [
  {
    carpeta: "4_moneda",
    seq: "4",
    items: [
      ["4.1_moneda_propiedad_ausente", "propiedad ausente", 474, { ...baseIdent, qrTipo: 11, canalPago: "BM", tipo: "TEXT" }],
      ["4.2_moneda_null", "null", 474, { ...baseQr11, moneda: null }],
      ["4.3_moneda_string_vacio", "string vacío", 474, { ...baseQr11, moneda: "" }],
      ["4.4_moneda_tipo_number", "tipo number", 474, { ...baseQr11, moneda: 840 }],
      ["4.5_moneda_tipo_boolean", "tipo boolean", 474, { ...baseQr11, moneda: true }],
      ["4.6_moneda_valor_incorrecto", "valor incorrecto", 474, { ...baseQr11, moneda: "978" }],
      ["4.7_moneda_solo_espacios", "solo espacios", 474, { ...baseQr11, moneda: "   " }],
    ],
  },
  {
    carpeta: "5_qrTipo",
    seq: "5",
    items: [
      ["5.1_qrTipo_propiedad_ausente", "propiedad ausente", 464, { ...baseIdent, moneda: "840", canalPago: "BM", tipo: "TEXT" }],
      ["5.2_qrTipo_null", "null", 464, { ...baseQr11, qrTipo: null }],
      ["5.3_qrTipo_tipo_string", "tipo string", 464, { ...baseQr11, qrTipo: "11" }],
      ["5.4_qrTipo_tipo_boolean", "tipo boolean", 464, { ...baseQr11, qrTipo: true }],
      ["5.5_qrTipo_valor_invalido", "valor inválido", 464, { ...baseQr11, qrTipo: 10 }],
      ["5.6_qrTipo_valor_cero", "valor cero", 464, { ...baseQr11, qrTipo: 0 }],
    ],
  },
  {
    carpeta: "6_canalPago",
    seq: "6",
    items: [
      ["6.1_canalPago_propiedad_ausente", "propiedad ausente", 472, { ...baseIdent, moneda: "840", qrTipo: 11, tipo: "TEXT" }],
      ["6.2_canalPago_null", "null", 472, { ...baseQr11, canalPago: null }],
      ["6.3_canalPago_string_vacio", "string vacío", 472, { ...baseQr11, canalPago: "" }],
      ["6.4_canalPago_tipo_number", "tipo number", 472, { ...baseQr11, canalPago: 1 }],
      ["6.5_canalPago_tipo_boolean", "tipo boolean", 472, { ...baseQr11, canalPago: true }],
      ["6.6_canalPago_valor_invalido", "valor inválido", 472, { ...baseQr11, canalPago: "XX" }],
      ["6.7_canalPago_valor_minusculas", "valor minúsculas", 472, { ...baseQr11, canalPago: "bm" }],
    ],
  },
  {
    carpeta: "7_tipo",
    seq: "7",
    items: [
      ["7.1_tipo_propiedad_ausente", "propiedad ausente", 468, { ...baseIdent, moneda: "840", qrTipo: 11, canalPago: "BM" }],
      ["7.2_tipo_null", "null", 468, { ...baseQr11, tipo: null }],
      ["7.3_tipo_string_vacio", "string vacío", 468, { ...baseQr11, tipo: "" }],
      ["7.4_tipo_tipo_number", "tipo number", 468, { ...baseQr11, tipo: 1 }],
      ["7.5_tipo_tipo_boolean", "tipo boolean", 468, { ...baseQr11, tipo: true }],
      ["7.6_tipo_valor_invalido", "valor inválido", 468, { ...baseQr11, tipo: "JSON" }],
      ["7.7_tipo_valor_minusculas", "valor minúsculas", 468, { ...baseQr11, tipo: "text" }],
    ],
  },
  {
    carpeta: "8_fechaVencimiento",
    seq: "8",
    items: [
      ["8.1_fechaVencimiento_propiedad_ausente", "propiedad ausente (dinámico)", 462, omit(baseQr12, "fechaVencimiento")],
      ["8.2_fechaVencimiento_null", "null (dinámico)", 462, { ...baseQr12, fechaVencimiento: null }],
      ["8.3_fechaVencimiento_string_vacio", "string vacío (dinámico)", 462, { ...baseQr12, fechaVencimiento: "" }],
      ["8.4_fechaVencimiento_tipo_number", "tipo number (dinámico)", 462, { ...baseQr12, fechaVencimiento: 20991231 }],
      ["8.5_fechaVencimiento_formato_guiones", "formato con guiones (dinámico)", 462, { ...baseQr12, fechaVencimiento: "2099-12-31" }],
      ["8.6_fechaVencimiento_longitud_7", "longitud 7 (dinámico)", 462, { ...baseQr12, fechaVencimiento: "2099123" }],
      ["8.7_fechaVencimiento_fecha_invalida", "fecha calendario inválida (dinámico)", 462, { ...baseQr12, fechaVencimiento: "20250230" }],
      ["8.8_fechaVencimiento_fecha_pasada", "fecha anterior al mínimo (dinámico)", 462, { ...baseQr12, fechaVencimiento: "20000101" }],
      ["8.9_fechaVencimiento_tipo_number_estatico", "tipo number (estático)", 462, { ...baseQr11, fechaVencimiento: 20991231 }],
    ],
  },
  {
    carpeta: "9_cantidadLecturas",
    seq: "9",
    items: [
      ["9.1_cantidadLecturas_propiedad_ausente", "propiedad ausente (dinámico)", 463, omit(baseQr12, "cantidadLecturas")],
      ["9.2_cantidadLecturas_null", "null (dinámico)", 463, { ...baseQr12, cantidadLecturas: null }],
      ["9.3_cantidadLecturas_tipo_string", "tipo string (dinámico)", 463, { ...baseQr12, cantidadLecturas: "1" }],
      ["9.4_cantidadLecturas_tipo_boolean", "tipo boolean (dinámico)", 463, { ...baseQr12, cantidadLecturas: true }],
      ["9.5_cantidadLecturas_cero", "cero (dinámico)", 463, { ...baseQr12, cantidadLecturas: 0 }],
      ["9.6_cantidadLecturas_decimales", "decimales (dinámico)", 463, { ...baseQr12, cantidadLecturas: 1.5 }],
      ["9.7_cantidadLecturas_tipo_string_estatico", "tipo string (estático)", 463, { ...baseQr11, cantidadLecturas: "1" }],
    ],
  },
  {
    carpeta: "10_ciudadComercio",
    seq: "10",
    items: [
      ["10.1_ciudadComercio_propiedad_ausente", "propiedad ausente (dinámico)", 432, omit(baseQr12, "ciudadComercio")],
      ["10.2_ciudadComercio_null", "null (dinámico)", 432, { ...baseQr12, ciudadComercio: null }],
      ["10.3_ciudadComercio_string_vacio", "string vacío (dinámico)", 432, { ...baseQr12, ciudadComercio: "" }],
      ["10.4_ciudadComercio_tipo_number", "tipo number (dinámico)", 432, { ...baseQr12, ciudadComercio: 1 }],
      ["10.5_ciudadComercio_longitud_81", "longitud 81 (dinámico)", 432, { ...baseQr12, ciudadComercio: "A".repeat(81) }],
      ["10.6_ciudadComercio_simbolo_arroba", "símbolo arroba (dinámico)", 432, { ...baseQr12, ciudadComercio: "San@Jose" }],
      ["10.7_ciudadComercio_simbolo_arroba_estatico", "símbolo arroba (estático)", 432, { ...baseQr11, ciudadComercio: "San@Jose" }],
    ],
  },
  {
    carpeta: "11_montoBase",
    seq: "11",
    items: [
      ["11.1_montoBase_propiedad_ausente", "propiedad ausente (dinámico)", 456, omit(baseQr12, "montoBase")],
      ["11.2_montoBase_null", "null (dinámico)", 456, { ...baseQr12, montoBase: null }],
      ["11.3_montoBase_tipo_string", "tipo string (dinámico)", 456, { ...baseQr12, montoBase: "1000" }],
      ["11.4_montoBase_tipo_boolean", "tipo boolean (dinámico)", 456, { ...baseQr12, montoBase: true }],
      ["11.5_montoBase_decimales", "decimales (dinámico)", 456, { ...baseQr12, montoBase: 10.5 }],
      ["11.6_montoBase_cero", "cero (dinámico)", 456, { ...baseQr12, montoBase: 0 }],
      ["11.7_montoBase_negativo", "negativo (dinámico)", 456, { ...baseQr12, montoBase: -1 }],
      ["11.8_montoBase_supera_maximo", "supera máximo (dinámico)", 456, { ...baseQr12, montoBase: 50001 }],
    ],
  },
  {
    carpeta: "12_impuesto",
    seq: "12",
    items: [
      ["12.1_impuesto_propiedad_ausente", "propiedad ausente (dinámico)", 466, omit(baseQr12, "impuesto")],
      ["12.2_impuesto_null", "null (dinámico)", 466, { ...baseQr12, impuesto: null }],
      ["12.3_impuesto_tipo_string", "tipo string (dinámico)", 466, { ...baseQr12, impuesto: "0" }],
      ["12.4_impuesto_decimales", "decimales (dinámico)", 466, { ...baseQr12, impuesto: 0.5 }],
      ["12.5_impuesto_distinto_cero", "distinto de cero (dinámico)", 466, { ...baseQr12, impuesto: 1 }],
    ],
  },
  {
    carpeta: "13_propina",
    seq: "13",
    items: [
      ["13.1_propina_propiedad_ausente", "propiedad ausente (dinámico)", 467, omit(baseQr12, "propina")],
      ["13.2_propina_null", "null (dinámico)", 467, { ...baseQr12, propina: null }],
      ["13.3_propina_tipo_string", "tipo string (dinámico)", 467, { ...baseQr12, propina: "0" }],
      ["13.4_propina_decimales", "decimales (dinámico)", 467, { ...baseQr12, propina: 0.5 }],
      ["13.5_propina_negativa", "negativa (dinámico)", 467, { ...baseQr12, propina: -1 }],
      ["13.6_propina_supera_maximo", "supera máximo (dinámico)", 467, { ...baseQr12, propina: 50001 }],
    ],
  },
  {
    carpeta: "14_monto",
    seq: "14",
    items: [
      ["14.1_monto_propiedad_ausente", "propiedad ausente (dinámico)", 465, omit(baseQr12, "monto")],
      ["14.2_monto_null", "null (dinámico)", 465, { ...baseMontos12, monto: null }],
      ["14.3_monto_tipo_string", "tipo string (dinámico)", 465, { ...baseMontos12, monto: "1000" }],
      ["14.4_monto_decimales", "decimales (dinámico)", 465, { ...baseMontos12, monto: 10.5 }],
      ["14.5_monto_cero", "cero (dinámico)", 465, { ...baseMontos12, monto: 0 }],
      ["14.6_monto_negativo", "negativo (dinámico)", 465, { ...baseMontos12, monto: -1 }],
      ["14.7_monto_supera_maximo", "supera máximo (dinámico)", 465, { ...baseMontos12, monto: 50001 }],
    ],
  },
  {
    carpeta: "15_descripcion",
    seq: "15",
    items: [
      ["15.1_descripcion_tipo_number", "tipo number", 437, { ...baseQr11, descripcion: 1 }],
      ["15.2_descripcion_longitud_81", "longitud 81", 437, { ...baseQr11, descripcion: "A".repeat(81) }],
      ["15.3_descripcion_caracteres_no_permitidos", "caracteres no permitidos", 437, { ...baseQr12, descripcion: "Pago#{}" }],
      ["15.4_descripcion_simbolo_arroba", "símbolo arroba", 437, { ...baseQr12, descripcion: "Pago@test" }],
    ],
  },
];

for (const g of grupos) {
  for (const [file, label, code, parametros] of g.items) {
    write(g.carpeta, g.seq, file, label, code, parametros);
    total++;
  }
}

console.log("Wrote", total, "scenarios under", root0024);
