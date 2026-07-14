#!/usr/bin/env node
/**
 * Extrae la “foto” de presentación al cliente desde un resultados-por-escenario-*.json.
 *
 * Patrones: primera presentacionPatternKey = patrón; misma clave se agrega; distinta = nuevo.
 * Foto: agrupa por (código + descripción); columnas dinámicas por contrato
 * (A.mensajeError, A.descripcionError, B, C, …) — no son intercambiables.
 *
 * Uso:
 *   node extraer-foto-presentacion.js logs/resultados-por-escenario-vcn.json
 */

"use strict";

const fs = require("fs");
const path = require("path");
const {
  clasificarPresentacionCliente,
  fotoRowKey,
  normalizarFormaCaptura,
  normTexto,
} = require("./clasificar-presentacion-cliente.js");

const ROOT = __dirname;
const OUT_DIR = path.join(ROOT, "..", "..", "codigosRespuesta");

/** Orden preferido de columnas; el resto de formas novas se añaden al final. */
const FORMA_ORDER = [
  "A.mensajeError",
  "A.descripcionError",
  "A.descripcion",
  "A.message",
  "A",
  "B",
  "C",
];

function loadResultados(filePath) {
  const abs = path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);
  const raw = fs.readFileSync(abs, "utf8");
  return { abs, data: JSON.parse(raw) };
}

function ensurePresentacion(esc) {
  let p;
  if (esc.presentacionForma && esc.presentacionPatternKey) {
    p = normalizarFormaCaptura({
      presentacionForma: esc.presentacionForma,
      presentacionCodigo: esc.presentacionCodigo,
      presentacionDescripcion: esc.presentacionDescripcion,
      presentacionCampoTexto: esc.presentacionCampoTexto || null,
      presentacionClaves: esc.presentacionClaves || "",
      presentacionCifrado:
        typeof esc.presentacionCifrado === "boolean"
          ? esc.presentacionCifrado
          : typeof esc.respuestaVinoCifrada === "boolean"
            ? esc.respuestaVinoCifrada
            : null,
      presentacionHttp:
        esc.presentacionHttp != null ? esc.presentacionHttp : esc.httpRealLambda,
      presentacionPatternKey: esc.presentacionPatternKey,
    });
  } else {
    p = clasificarPresentacionCliente({
      descifradoBody: esc.body || "",
      formatoRespuestaLambda: esc.formatoRespuestaLambda || null,
      respuestaVinoCifrada:
        typeof esc.respuestaVinoCifrada === "boolean" ? esc.respuestaVinoCifrada : null,
      httpRealLambda: esc.httpRealLambda,
    });
  }
  return p;
}

function mark(v) {
  return v ? "x" : "-";
}

function escPipe(s) {
  return String(s == null ? "" : s).replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function ordenarFormas(formasSet) {
  const list = Array.from(formasSet);
  list.sort(function (a, b) {
    const ia = FORMA_ORDER.indexOf(a);
    const ib = FORMA_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
  return list;
}

function buildFotoMd(suite, meta, filas, patrones, formaCols) {
  const lines = [];
  lines.push("# Foto de presentación al cliente — " + String(suite).toUpperCase());
  lines.push("");
  lines.push(
    "Solo observación de corrida Newman. **No** incluye catálogo / “Nueva descripción”."
  );
  lines.push("");
  lines.push("| Campo | Valor |");
  lines.push("|-------|-------|");
  lines.push("| Servicio | " + String(suite).toUpperCase() + " |");
  lines.push("| Fecha corrida | " + (meta.fecha || "—") + " |");
  lines.push("| Código fuente | " + (meta.codigoFuente || "—") + " |");
  lines.push("| Nivel ejecución | " + (meta.nivelEjecucion || "—") + " |");
  lines.push("| Escenarios analizados | " + (meta.totalEscenarios || 0) + " |");
  lines.push("| Filas foto (código+descripción) | " + filas.length + " |");
  lines.push("| Contratos (columnas) | " + formaCols.join(", ") + " |");
  lines.push("| Patrones estructurales únicos | " + patrones.length + " |");
  if (meta.nota) {
    lines.push("| Nota | " + escPipe(meta.nota) + " |");
  }
  lines.push("");
  lines.push("## Contratos (referencia)");
  lines.push("");
  lines.push(
    "`A.mensajeError` ≠ `A.descripcionError` (claves distintas). Detalle: [`formas-presentacion-cliente.md`](formas-presentacion-cliente.md)."
  );
  lines.push("");
  lines.push("## Foto por código");
  lines.push("");
  lines.push(
    "Un renglón = código + descripción observada. Columnas = contratos vistos en la corrida (`x`/`-`)."
  );
  lines.push("");

  const head =
    "| Código | Descripción | " +
    formaCols.join(" | ") +
    " | Escenarios | HTTP vistos | Cifrado |";
  const sep =
    "|--------|-------------|" +
    formaCols.map(function () {
      return "---";
    }).join("|") +
    "|------------|-------------|---------|";
  lines.push(head);
  lines.push(sep);

  filas.forEach(function (r) {
    const desc = r.descripcion === "" ? "*(sin texto; solo resultado)*" : r.descripcion;
    const cifrado =
      r.cifradoSi && r.cifradoNo ? "sí y no" : r.cifradoSi ? "sí" : r.cifradoNo ? "no" : "—";
    const marks = formaCols.map(function (f) {
      return mark(r.formas[f]);
    });
    lines.push(
      "| " +
        (r.codigo !== "" ? r.codigo : "—") +
        " | " +
        escPipe(desc) +
        " | " +
        marks.join(" | ") +
        " | " +
        r.count +
        " | " +
        (r.https.length ? r.https.join(", ") : "—") +
        " | " +
        cifrado +
        " |"
    );
  });
  lines.push("");
  lines.push("## Patrones estructurales únicos");
  lines.push("");
  lines.push(
    "Primera `presentacionPatternKey` = patrón; misma clave se agrega; distinta = nuevo."
  );
  lines.push("");
  lines.push("| # | Forma | Código | Campo texto | Claves | HTTP | Cifrado | Escenarios | Ejemplo |");
  lines.push("|---|-------|--------|-------------|--------|------|---------|------------|---------|");
  patrones.forEach(function (p, i) {
    lines.push(
      "| " +
        (i + 1) +
        " | " +
        p.forma +
        " | " +
        (p.codigo !== "" && p.codigo != null ? p.codigo : "—") +
        " | " +
        (p.campoTexto || "—") +
        " | `" +
        escPipe(p.claves || "") +
        "` | " +
        (p.http != null ? p.http : "—") +
        " | " +
        (p.cifrado === true ? "sí" : p.cifrado === false ? "no" : "—") +
        " | " +
        p.count +
        " | " +
        escPipe(p.ejemplo) +
        " |"
    );
  });
  lines.push("");
  return lines.join("\n");
}

function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error(
      "Uso: node extraer-foto-presentacion.js logs/resultados-por-escenario-vcn.json"
    );
    process.exit(1);
  }
  const { abs, data } = loadResultados(arg);
  const escenarios = Array.isArray(data.escenarios) ? data.escenarios : [];
  const suite = String(
    data.suite || path.basename(abs).replace(/^resultados-por-escenario-|\.json$/g, "")
  ).toLowerCase();

  const filasMap = new Map();
  const patronesMap = new Map();
  const formasGlobales = new Set();

  escenarios.forEach(function (esc) {
    const p = ensurePresentacion(esc);
    const forma = p.presentacionForma || "C";
    formasGlobales.add(forma);

    const rowKey = fotoRowKey(p);
    if (!filasMap.has(rowKey)) {
      filasMap.set(rowKey, {
        codigo: p.presentacionCodigo != null ? String(p.presentacionCodigo) : "",
        descripcion: normTexto(p.presentacionDescripcion || ""),
        formas: {},
        count: 0,
        https: new Set(),
        cifradoSi: false,
        cifradoNo: false,
      });
    }
    const row = filasMap.get(rowKey);
    row.count++;
    row.formas[forma] = true;
    if (p.presentacionHttp != null) row.https.add(String(p.presentacionHttp));
    if (p.presentacionCifrado === true) row.cifradoSi = true;
    if (p.presentacionCifrado === false) row.cifradoNo = true;

    const pk = p.presentacionPatternKey || "?|" + rowKey;
    if (!patronesMap.has(pk)) {
      patronesMap.set(pk, {
        key: pk,
        forma: forma,
        codigo: p.presentacionCodigo != null ? String(p.presentacionCodigo) : "",
        campoTexto: p.presentacionCampoTexto || null,
        claves: p.presentacionClaves || "",
        http: p.presentacionHttp,
        cifrado: p.presentacionCifrado,
        count: 0,
        ejemplo: esc.nombre || "(sin nombre)",
      });
    }
    patronesMap.get(pk).count++;
  });

  const formaCols = ordenarFormas(formasGlobales);

  const filas = Array.from(filasMap.values())
    .map(function (r) {
      return Object.assign({}, r, {
        https: Array.from(r.https).sort(function (a, b) {
          return Number(a) - Number(b);
        }),
      });
    })
    .sort(function (a, b) {
      const ca = a.codigo === "" ? 999999 : Number(a.codigo);
      const cb = b.codigo === "" ? 999999 : Number(b.codigo);
      if (ca !== cb) return (Number.isNaN(ca) ? 0 : ca) - (Number.isNaN(cb) ? 0 : cb);
      return a.descripcion.localeCompare(b.descripcion, "es");
    });

  const patrones = Array.from(patronesMap.values()).sort(function (a, b) {
    if (a.forma !== b.forma) return a.forma.localeCompare(b.forma);
    const ca = Number(a.codigo);
    const cb = Number(b.codigo);
    if (!Number.isNaN(ca) && !Number.isNaN(cb) && ca !== cb) return ca - cb;
    return b.count - a.count;
  });

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }
  const outMd = path.join(OUT_DIR, "foto-presentacion-" + suite + ".md");
  const outJson = path.join(OUT_DIR, "foto-presentacion-" + suite + ".patrones.json");
  const md = buildFotoMd(
    suite,
    {
      fecha: data.fecha,
      codigoFuente: data.codigoFuente,
      nivelEjecucion: data.nivelEjecucion,
      nota: data.nota,
      totalEscenarios: escenarios.length,
    },
    filas,
    patrones,
    formaCols
  );
  fs.writeFileSync(outMd, md, "utf8");
  fs.writeFileSync(
    outJson,
    JSON.stringify(
      {
        suite: suite,
        fuente: abs,
        fecha: data.fecha,
        formaCols: formaCols,
        filas: filas.length,
        patrones: patrones,
      },
      null,
      2
    ),
    "utf8"
  );
  console.log("Foto:", outMd);
  console.log("Contratos:", formaCols.join(", "));
  console.log(
    "Filas:",
    filas.length,
    "| Patrones:",
    patrones.length,
    "| Escenarios:",
    escenarios.length
  );
}

main();
