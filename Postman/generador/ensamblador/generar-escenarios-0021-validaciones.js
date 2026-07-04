const fs = require("fs");
const path = require("path");

const root0021 = path.join(__dirname, "../P2M Escenarios error/Metodo/0021/1_validaciones_js");
const root0015 = path.join(__dirname, "../P2M Escenarios error/Metodo/0015/1_validaciones_js");
const root0016 = path.join(__dirname, "../P2M Escenarios error/Metodo/0016/1_validaciones_js");

const baseIdent = {
  identificador: "{{IDENTIFICADOR_COMERCIO_NO_REGISTRADO}}",
  tipoIdentificador: "COMERCIO",
  banco: "{{SWIFT_CANAL_EMISOR}}",
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeScenario(destDir, file, doc) {
  fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(path.join(destDir, `${file}.json`), JSON.stringify(doc, null, 2) + "\n");
}

function renameNombre(nombre, dstSeq, metodoFrom) {
  const m = nombre.match(new RegExp(`^${metodoFrom}\\.1\\.\\d+\\.(\\d+\\.\\s.+)$`));
  if (!m) {
    throw new Error(`No se pudo renombrar: ${nombre}`);
  }
  return `0021.1.${dstSeq}.${m[1]}`;
}

function cloneFolder(srcDir, dstFolder, dstSeq, metodoFrom, options = {}) {
  const { skip = new Set(), slimField = null } = options;
  const destDir = path.join(root0021, dstFolder);
  let count = 0;

  for (const file of fs.readdirSync(srcDir).filter((f) => f.endsWith(".json")).sort()) {
    const base = file.replace(/\.json$/, "");
    if (skip.has(base)) continue;

    const src = readJson(path.join(srcDir, file));
    const parametros = src.body.peticion.solicitudes[0].parametros;

    const doc = {
      nombre: renameNombre(src.nombre, dstSeq, metodoFrom),
      expectedHttpStatus: src.expectedHttpStatus,
      expectedCodigoError: src.expectedCodigoError,
      expectedTipo: src.expectedTipo,
      algoritmoCifrado: src.algoritmoCifrado,
      body: {
        ...src.body,
        peticion: {
          ...src.body.peticion,
          metodo: "0021",
          solicitudes: [
            {
              ...src.body.peticion.solicitudes[0],
              parametros: slimField
                ? { ...baseIdent, [slimField]: parametros[slimField] }
                : parametros,
            },
          ],
        },
      },
    };

    writeScenario(destDir, base, doc);
    count++;
  }

  return count;
}

function writeEstado() {
  const destDir = path.join(root0021, "10_estado");
  const items = [
    ["10.1_estado_tipo_number", "tipo number", 443, { estado: 1 }],
    ["10.2_estado_tipo_boolean", "tipo boolean", 443, { estado: true }],
    ["10.3_estado_valor_invalido", "valor inválido", 443, { estado: "X" }],
    ["10.4_estado_valor_a", "valor A", 443, { estado: "A" }],
    ["10.5_estado_valor_minusculas", "valor minúsculas", 443, { estado: "s" }],
  ];

  for (const [file, label, code, extra] of items) {
    const n = file.split("_")[0].split(".")[1];
    writeScenario(destDir, file, {
      nombre: `0021.1.10.${n}. estado — ${label} (${code})`,
      expectedHttpStatus: 200,
      expectedCodigoError: code,
      expectedTipo: "parametro",
      algoritmoCifrado: "aes-256-cbc",
      body: {
        idCanal: "{{CANAL_EMISOR}}",
        validador: "{{CANAL_VALIDADOR}}",
        peticion: {
          idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
          metodo: "0021",
          solicitudes: [{ idSolicitud: "1", parametros: { ...baseIdent, ...extra } }],
        },
      },
    });
  }

  return items.length;
}

function skipOptional(seq, field) {
  return new Set([
    `${seq}.1_${field}_propiedad_ausente`,
    `${seq}.2_${field}_null`,
    `${seq}.3_${field}_string_vacio`,
    `${seq}.4_${field}_solo_espacios`,
  ]);
}

let total = 0;

total += cloneFolder(path.join(root0015, "1_identificador"), "1_identificador", "1", "0015");
total += cloneFolder(path.join(root0015, "2_tipoIdentificador"), "2_tipoIdentificador", "2", "0015");
total += cloneFolder(path.join(root0016, "3_banco"), "3_banco", "3", "0016");
total += cloneFolder(path.join(root0016, "4_cuenta"), "4_cuenta", "4", "0016", {
  skip: skipOptional("4", "cuenta"),
  slimField: "cuenta",
});
total += cloneFolder(path.join(root0016, "5_producto"), "5_producto", "5", "0016", {
  skip: skipOptional("5", "producto"),
  slimField: "producto",
});
total += cloneFolder(path.join(root0016, "6_nombreComercio"), "6_nombreComercio", "6", "0016", {
  skip: skipOptional("6", "nombreComercio"),
  slimField: "nombreComercio",
});
total += cloneFolder(path.join(root0016, "7_correo"), "7_correo", "7", "0016", {
  skip: skipOptional("7", "correo"),
  slimField: "correo",
});
total += cloneFolder(path.join(root0016, "8_mcc"), "8_mcc", "8", "0016", {
  skip: skipOptional("8", "mcc"),
  slimField: "mcc",
});
total += cloneFolder(path.join(root0016, "9_logo"), "9_logo", "9", "0016", {
  skip: skipOptional("9", "logo"),
  slimField: "logo",
});
total += writeEstado();

console.log("Wrote", total, "scenarios under", root0021);
