const fs = require("fs");
const path = require("path");

const root = path.join(
  __dirname,
  "../VCN Escenarios error/Metodo/0001/1_validaciones_js"
);

function escenario(carpeta, seq, file, label, code, expectedTipo, parametros) {
  const n = file.split("_")[0].replace(/^\d+\./, "");
  return {
    dir: path.join(root, carpeta),
    file: `${file}.json`,
    doc: {
      nombre: `0001.1.${seq}.${n}. ${carpeta.replace(/^\d+_/, "").replace(/_/g, " ")} — ${label} (${code})`,
      expectedHttpStatus: 200,
      expectedCodigoError: code,
      expectedTipo,
      algoritmoCifrado: "aes-256-cbc",
      body: {
        idCanal: "{{CANAL_EMISOR}}",
        validador: "{{CANAL_VALIDADOR}}",
        peticion: {
          idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
          metodo: "0001",
          solicitudes: [{ idSolicitud: "1", parametros }],
        },
      },
    },
  };
}

const grupos = [
  {
    carpeta: "1_cuenta",
    seq: "1",
    expectedTipo: "parametro",
    items: [
      ["1.1_cuenta_propiedad_ausente", "propiedad ausente", 413, {}],
      ["1.2_cuenta_null", "null", 413, { cuenta: null }],
      ["1.3_cuenta_string_vacio", "string vacío", 413, { cuenta: "" }],
      ["1.4_cuenta_tipo_number", "tipo number", 413, { cuenta: 1100001328 }],
      ["1.5_cuenta_tipo_boolean", "tipo boolean", 413, { cuenta: true }],
      ["1.6_cuenta_tipo_object", "tipo object", 413, { cuenta: {} }],
      ["1.7_cuenta_con_letras", "con letras", 413, { cuenta: "110000132a" }],
      ["1.8_cuenta_solo_espacios", "solo espacios", 413, { cuenta: "   " }],
      ["1.9_cuenta_espacio_interno", "espacio interno", 413, { cuenta: "1100 001328" }],
      ["1.10_cuenta_longitud_35", "longitud 35", 413, { cuenta: "12345678901234567890123456789012345" }],
    ],
  },
];

let total = 0;
for (const g of grupos) {
  fs.mkdirSync(path.join(root, g.carpeta), { recursive: true });
  for (const [file, label, code, parametros] of g.items) {
    const e = escenario(g.carpeta, g.seq, file, label, code, g.expectedTipo, parametros);
    fs.writeFileSync(path.join(e.dir, e.file), JSON.stringify(e.doc, null, 2) + "\n");
    total++;
  }
}

console.log("Wrote", total, "scenarios under", root);
