const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../P2M Escenarios error/Metodo/0018/1_validaciones_js");

const baseIdent = {
  identificador: "{{IDENTIFICADOR_CELULAR}}",
  tipoIdentificador: "CELULAR",
};

const baseIdComercio = {
  ...baseIdent,
  identificadorComercio: "{{IDENTIFICADOR_COMERCIO_NO_REGISTRADO}}",
};

const baseMontos = {
  ...baseIdComercio,
  montoBase: 1000,
  impuesto: 0,
  propina: 0,
  monto: 1000,
};

function write(carpeta, seq, file, label, code, parametros) {
  const n = file.split("_")[0].split(".")[1];
  const doc = {
    nombre: `0018.1.${seq}.${n}. ${carpeta.replace(/^\d+_/, "").replace(/_/g, " ")} — ${label} (${code})`,
    expectedHttpStatus: 200,
    expectedCodigoError: code,
    expectedTipo: "parametro",
    algoritmoCifrado: "aes-256-cbc",
    body: {
      idCanal: "{{CANAL_EMISOR}}",
      validador: "{{CANAL_VALIDADOR}}",
      peticion: {
        idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
        metodo: "0018",
        solicitudes: [{ idSolicitud: "1", parametros }],
      },
    },
  };
  const dir = path.join(root, carpeta);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${file}.json`), JSON.stringify(doc, null, 2) + "\n");
}

const grupos = [
  {
    carpeta: "1_identificador",
    seq: "1",
    items: [
      ["1.1_identificador_propiedad_ausente", "propiedad ausente", 419, { tipoIdentificador: "CELULAR" }],
      ["1.2_identificador_null", "null", 419, { ...baseIdent, identificador: null }],
      ["1.3_identificador_string_vacio", "string vacío", 419, { ...baseIdent, identificador: "" }],
      ["1.4_identificador_tipo_number", "tipo number", 409, { ...baseIdent, identificador: 69852374 }],
      ["1.5_identificador_tipo_boolean", "tipo boolean", 409, { ...baseIdent, identificador: true }],
      ["1.6_identificador_tipo_object", "tipo object", 409, { ...baseIdent, identificador: {} }],
      ["1.7_identificador_no_inicia_6", "no inicia con 6", 409, { ...baseIdent, identificador: "71234567" }],
      ["1.8_identificador_longitud_7", "longitud 7", 409, { ...baseIdent, identificador: "6123456" }],
      ["1.9_identificador_longitud_9", "longitud 9", 409, { ...baseIdent, identificador: "612345678" }],
      ["1.10_identificador_con_letras", "con letras", 409, { ...baseIdent, identificador: "6123456a" }],
      ["1.11_identificador_solo_espacios", "solo espacios", 409, { ...baseIdent, identificador: "        " }],
      ["1.12_identificador_espacio_interno", "espacio interno", 409, { ...baseIdent, identificador: "61 23456" }],
    ],
  },
  {
    carpeta: "2_tipoIdentificador",
    seq: "2",
    items: [
      ["2.1_tipoIdentificador_propiedad_ausente", "propiedad ausente", 419, { identificador: "{{IDENTIFICADOR_CELULAR}}" }],
      ["2.2_tipoIdentificador_null", "null", 419, { ...baseIdent, tipoIdentificador: null }],
      ["2.3_tipoIdentificador_string_vacio", "string vacío", 419, { ...baseIdent, tipoIdentificador: "" }],
      ["2.4_tipoIdentificador_tipo_number", "tipo number", 410, { ...baseIdent, tipoIdentificador: 1 }],
      ["2.5_tipoIdentificador_tipo_boolean", "tipo boolean", 410, { ...baseIdent, tipoIdentificador: true }],
      ["2.6_tipoIdentificador_tipo_object", "tipo object", 410, { ...baseIdent, tipoIdentificador: {} }],
      ["2.7_tipoIdentificador_valor_incorrecto_comercio", "valor incorrecto COMERCIO", 410, { ...baseIdent, tipoIdentificador: "COMERCIO" }],
      ["2.8_tipoIdentificador_valor_minusculas", "valor minúsculas", 410, { ...baseIdent, tipoIdentificador: "celular" }],
      ["2.9_tipoIdentificador_solo_espacios", "solo espacios", 410, { ...baseIdent, tipoIdentificador: "   " }],
    ],
  },
  {
    carpeta: "3_identificadorComercio",
    seq: "3",
    items: [
      ["3.1_identificadorComercio_propiedad_ausente", "propiedad ausente", 479, { ...baseIdent }],
      ["3.2_identificadorComercio_null", "null", 479, { ...baseIdComercio, identificadorComercio: null }],
      ["3.3_identificadorComercio_string_vacio", "string vacío", 479, { ...baseIdComercio, identificadorComercio: "" }],
      ["3.4_identificadorComercio_tipo_number", "tipo number", 479, { ...baseIdComercio, identificadorComercio: 12345 }],
      ["3.5_identificadorComercio_tipo_boolean", "tipo boolean", 479, { ...baseIdComercio, identificadorComercio: true }],
      ["3.6_identificadorComercio_tipo_object", "tipo object", 479, { ...baseIdComercio, identificadorComercio: {} }],
      ["3.7_identificadorComercio_longitud_2", "longitud 2", 479, { ...baseIdComercio, identificadorComercio: "ab" }],
      ["3.8_identificadorComercio_longitud_65", "longitud 65", 479, { ...baseIdComercio, identificadorComercio: "A".repeat(65) }],
      ["3.9_identificadorComercio_caracteres_especiales", "caracteres especiales", 479, { ...baseIdComercio, identificadorComercio: "endfield@#" }],
      ["3.10_identificadorComercio_solo_espacios", "solo espacios", 479, { ...baseIdComercio, identificadorComercio: "   " }],
    ],
  },
  {
    carpeta: "4_montoBase",
    seq: "4",
    items: [
      ["4.1_montoBase_propiedad_ausente", "propiedad ausente", 456, { ...baseIdComercio }],
      ["4.2_montoBase_null", "null", 456, { ...baseIdComercio, montoBase: null }],
      ["4.3_montoBase_tipo_string", "tipo string", 456, { ...baseIdComercio, montoBase: "1000" }],
      ["4.4_montoBase_tipo_boolean", "tipo boolean", 456, { ...baseIdComercio, montoBase: true }],
      ["4.5_montoBase_decimales", "decimales", 456, { ...baseIdComercio, montoBase: 10.5 }],
      ["4.6_montoBase_cero", "cero", 456, { ...baseIdComercio, montoBase: 0 }],
      ["4.7_montoBase_negativo", "negativo", 456, { ...baseIdComercio, montoBase: -1 }],
      ["4.8_montoBase_supera_maximo", "supera máximo", 456, { ...baseIdComercio, montoBase: 50001 }],
    ],
  },
  {
    carpeta: "5_impuesto",
    seq: "5",
    items: [
      ["5.1_impuesto_propiedad_ausente", "propiedad ausente", 466, { ...baseIdComercio, montoBase: 1000 }],
      ["5.2_impuesto_null", "null", 466, { ...baseIdComercio, montoBase: 1000, impuesto: null }],
      ["5.3_impuesto_tipo_string", "tipo string", 466, { ...baseIdComercio, montoBase: 1000, impuesto: "0" }],
      ["5.4_impuesto_decimales", "decimales", 466, { ...baseIdComercio, montoBase: 1000, impuesto: 0.5 }],
      ["5.5_impuesto_distinto_cero", "distinto de cero", 466, { ...baseIdComercio, montoBase: 1000, impuesto: 1 }],
    ],
  },
  {
    carpeta: "6_propina",
    seq: "6",
    items: [
      ["6.1_propina_propiedad_ausente", "propiedad ausente", 467, { ...baseIdComercio, montoBase: 1000, impuesto: 0 }],
      ["6.2_propina_null", "null", 467, { ...baseIdComercio, montoBase: 1000, impuesto: 0, propina: null }],
      ["6.3_propina_tipo_string", "tipo string", 467, { ...baseIdComercio, montoBase: 1000, impuesto: 0, propina: "0" }],
      ["6.4_propina_decimales", "decimales", 467, { ...baseIdComercio, montoBase: 1000, impuesto: 0, propina: 0.5 }],
      ["6.5_propina_negativa", "negativa", 467, { ...baseIdComercio, montoBase: 1000, impuesto: 0, propina: -1 }],
      ["6.6_propina_supera_maximo", "supera máximo", 467, { ...baseIdComercio, montoBase: 1000, impuesto: 0, propina: 50001 }],
    ],
  },
  {
    carpeta: "7_monto",
    seq: "7",
    items: [
      ["7.1_monto_propiedad_ausente", "propiedad ausente", 465, { ...baseIdComercio, montoBase: 1000, impuesto: 0, propina: 0 }],
      ["7.2_monto_null", "null", 465, { ...baseMontos, monto: null }],
      ["7.3_monto_tipo_string", "tipo string", 465, { ...baseMontos, monto: "1000" }],
      ["7.4_monto_decimales", "decimales", 465, { ...baseMontos, monto: 10.5 }],
      ["7.5_monto_cero", "cero", 465, { ...baseMontos, monto: 0 }],
      ["7.6_monto_negativo", "negativo", 465, { ...baseMontos, monto: -1 }],
      ["7.7_monto_supera_maximo", "supera máximo", 465, { ...baseMontos, monto: 50001 }],
    ],
  },
  {
    carpeta: "8_descripcion",
    seq: "8",
    items: [
      ["8.1_descripcion_tipo_number", "tipo number", 437, { ...baseMontos, descripcion: 1 }],
      ["8.2_descripcion_longitud_81", "longitud 81", 437, { ...baseMontos, descripcion: "A".repeat(81) }],
      ["8.3_descripcion_caracteres_no_permitidos", "caracteres no permitidos", 437, { ...baseMontos, descripcion: "Pago#{}" }],
      ["8.4_descripcion_simbolo_arroba", "símbolo arroba", 437, { ...baseMontos, descripcion: "Pago@test" }],
    ],
  },
];

let total = 0;
for (const g of grupos) {
  for (const [file, label, code, parametros] of g.items) {
    write(g.carpeta, g.seq, file, label, code, parametros);
    total++;
  }
}

console.log("Wrote", total, "scenarios under", root);
