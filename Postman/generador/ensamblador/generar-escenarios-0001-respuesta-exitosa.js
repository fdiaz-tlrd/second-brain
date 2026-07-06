const fs = require("fs");
const path = require("path");

const root = path.join(
  __dirname,
  "../VCN Escenarios error/Metodo/0001/3_respuestaExitosa"
);

const VALIDADOR = "{{CANAL_VALIDADOR_EXITO}}";

const ESCENARIOS = [
  {
    subdir: "1_cuentaBasica",
    file: "1.1_cuenta_feliz",
    bloque: "1",
    seq: "1",
    label: "cuenta feliz",
    cuenta: "{{CuentaFeliz}}",
  },
  {
    subdir: "2_productoPaca",
    file: "2.1_paca",
    bloque: "2",
    seq: "1",
    label: "producto PACA",
    cuenta: "{{PACA}}",
    expectedProducto: "PACA",
  },
  {
    subdir: "3_productoPacc",
    file: "3.1_pacc",
    bloque: "3",
    seq: "1",
    label: "producto PACC",
    cuenta: "{{PACC}}",
    expectedProducto: "PACC",
  },
  {
    subdir: "4_juridica",
    file: "4.1_juridica",
    bloque: "4",
    seq: "1",
    label: "cuenta jurídica",
    cuenta: "{{Cuentajuridica}}",
  },
  {
    subdir: "5_variosTitulares",
    file: "5.1_varios",
    bloque: "5",
    seq: "1",
    label: "varios titulares",
    cuenta: "{{Variostitulares}}",
  },
  {
    subdir: "6_mascaras/0",
    file: "6.0_mascara0",
    bloque: "6",
    seq: "0",
    label: "máscara largo 0",
    cuenta: "{{mascara0}}",
  },
  {
    subdir: "6_mascaras/1",
    file: "6.1_mascara1",
    bloque: "6",
    seq: "1",
    label: "máscara largo 1",
    cuenta: "{{mascara1}}",
  },
  {
    subdir: "6_mascaras/2",
    file: "6.2_mascara2",
    bloque: "6",
    seq: "2",
    label: "máscara largo 2",
    cuenta: "{{mascara2}}",
  },
  {
    subdir: "6_mascaras/3",
    file: "6.3_mascara3",
    bloque: "6",
    seq: "3",
    label: "máscara largo 3",
    cuenta: "{{mascara3}}",
  },
  {
    subdir: "6_mascaras/4",
    file: "6.4_mascara4",
    bloque: "6",
    seq: "4",
    label: "máscara largo 4",
    cuenta: "{{mascara4}}",
  },
  {
    subdir: "6_mascaras/5",
    file: "6.5_mascara5",
    bloque: "6",
    seq: "5",
    label: "máscara largo 5",
    cuenta: "{{mascara5}}",
  },
  {
    subdir: "6_mascaras/6",
    file: "6.6_mascara6",
    bloque: "6",
    seq: "6",
    label: "máscara largo 6",
    cuenta: "{{mascara6}}",
  },
  {
    subdir: "7_limitesFormato",
    file: "7.1_un_digito",
    bloque: "7",
    seq: "1",
    label: "cuenta 1 dígito",
    cuenta: "{{Cuenta1}}",
  },
  {
    subdir: "7_limitesFormato",
    file: "7.2_34_digitos",
    bloque: "7",
    seq: "2",
    label: "cuenta 34 dígitos",
    cuenta: "{{Cuenta34}}",
  },
];

function buildDoc(def) {
  const doc = {
    nombre: `0001.3.${def.bloque}.${def.seq}. ${def.label} (exito)`,
    expectedHttpStatus: 200,
    expectedCodigoError: 0,
    expectedTipo: "exito",
    algoritmoCifrado: "aes-256-cbc",
    body: {
      idCanal: "{{CANAL_EMISOR}}",
      validador: VALIDADOR,
      peticion: {
        idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
        metodo: "0001",
        solicitudes: [
          {
            idSolicitud: "1",
            parametros: { cuenta: def.cuenta },
          },
        ],
      },
    },
  };
  if (def.expectedProducto) {
    doc.expectedProducto = def.expectedProducto;
  }
  return doc;
}

let total = 0;
for (const def of ESCENARIOS) {
  const dir = path.join(root, def.subdir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, `${def.file}.json`),
    JSON.stringify(buildDoc(def), null, 2) + "\n"
  );
  total++;
}

console.log("Wrote", total, "scenarios under", root);
