#!/usr/bin/env node
/**
 * Compara dos corridas `resultados-por-escenario-*.json` (p. ej. prod vs dev)
 * y lista SOLO las diferencias. Empareja escenarios por nombre y normaliza
 * campos volátiles (timestamp, tokens, fechas, x-amzn-*) antes de comparar.
 *
 * IMPORTANTE: esto produce diferencias CANDIDATAS. Es insumo para el informe,
 * NO es el informe. Qué diferencia es relevante y cómo se justifica es criterio
 * humano. Ver: ../../Postman/comparar-prod-vs-dev/04-informe-y-recopilacion.md
 *
 * Uso (desde Postman/generador):
 *   node comparar-runs.js <resultados-A.json> <resultados-B.json>
 *   node comparar-runs.js logs/historial/vcn/A_por-escenario.json logs/historial/vcn/B_por-escenario.json
 *   node comparar-runs.js A.json B.json --salida logs/comparacion-vcn.md
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const LOGS = path.join(ROOT, "logs");

/** Claves cuyo valor cambia entre corridas aunque el código sea idéntico. */
const VOLATILES = [
  "idpeticion",
  "idsolicitud",
  "token",
  "fecha",
  "fechahora",
  "timestamp",
  "requestid",
  "traceid",
  "x-amzn-requestid",
  "x-amzn-trace-id",
  "date",
];

function stripVolatile(value) {
  if (Array.isArray(value)) {
    return value.map(stripVolatile);
  }
  if (value && typeof value === "object") {
    const out = {};
    Object.keys(value)
      .sort()
      .forEach(function (k) {
        if (VOLATILES.indexOf(k.toLowerCase()) !== -1) {
          return;
        }
        out[k] = stripVolatile(value[k]);
      });
    return out;
  }
  return value;
}

function normalizeBody(bodyText) {
  if (!bodyText) {
    return "";
  }
  try {
    const parsed = JSON.parse(bodyText);
    return JSON.stringify(stripVolatile(parsed));
  } catch (e) {
    return String(bodyText)
      .replace(/\d{4}-\d{2}-\d{2}T[\d:.Z+-]+/g, "<FECHA>")
      .replace(/\d{10,}/g, "<NUM>")
      .trim();
  }
}

function load(file) {
  const full = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
  if (!fs.existsSync(full)) {
    throw new Error("No existe: " + full);
  }
  const data = JSON.parse(fs.readFileSync(full, "utf8"));
  if (!Array.isArray(data.escenarios)) {
    throw new Error("Formato inesperado (falta 'escenarios'): " + full);
  }
  return data;
}

function indexPorNombre(run) {
  const map = new Map();
  run.escenarios.forEach(function (e) {
    map.set(e.nombre, e);
  });
  return map;
}

function comparar(a, b) {
  const mapA = indexPorNombre(a);
  const mapB = indexPorNombre(b);
  const nombres = new Set();
  mapA.forEach(function (_, k) {
    nombres.add(k);
  });
  mapB.forEach(function (_, k) {
    nombres.add(k);
  });

  const diffs = [];
  let iguales = 0;
  const soloA = [];
  const soloB = [];

  Array.from(nombres)
    .sort()
    .forEach(function (nombre) {
      const ea = mapA.get(nombre);
      const eb = mapB.get(nombre);
      if (!ea) {
        soloB.push(nombre);
        return;
      }
      if (!eb) {
        soloA.push(nombre);
        return;
      }
      const campos = [];
      if (ea.httpDescifrar !== eb.httpDescifrar) {
        campos.push({ campo: "httpDescifrar", a: ea.httpDescifrar, b: eb.httpDescifrar });
      }
      if (ea.codigoError !== eb.codigoError) {
        campos.push({ campo: "codigoError", a: ea.codigoError, b: eb.codigoError });
      }
      if ((ea.resultado ?? null) !== (eb.resultado ?? null)) {
        campos.push({ campo: "resultado", a: ea.resultado, b: eb.resultado });
      }
      const bodyA = normalizeBody(ea.body);
      const bodyB = normalizeBody(eb.body);
      if (bodyA !== bodyB) {
        campos.push({ campo: "body (normalizado)", a: bodyA, b: bodyB });
      }
      if (campos.length > 0) {
        diffs.push({ nombre: nombre, campos: campos });
      } else {
        iguales++;
      }
    });

  return { diffs: diffs, iguales: iguales, soloA: soloA, soloB: soloB };
}

function truncar(v, max) {
  const s = v == null ? "—" : String(v);
  if (s.length <= max) {
    return s;
  }
  return s.slice(0, max) + "…";
}

function celda(v) {
  return truncar(v, 400).replace(/\r?\n/g, " ").replace(/\|/g, "\\|");
}

function buildMd(a, b, res) {
  const etiqA = a.codigoFuente || "A";
  const etiqB = b.codigoFuente || "B";
  const lines = [];
  lines.push("# Comparación de corridas — " + String(a.suite || "").toUpperCase());
  lines.push("");
  lines.push("> Diferencias **candidatas**. Insumo para el informe, no el informe. Campos volátiles (timestamp, tokens, fechas, x-amzn-*) normalizados.");
  lines.push("");
  lines.push("| Campo | " + etiqA + " (A) | " + etiqB + " (B) |");
  lines.push("|-------|--------|--------|");
  lines.push("| Fecha | " + (a.fecha || "—") + " | " + (b.fecha || "—") + " |");
  lines.push("| Carpeta | `" + (a.folder || "—") + "` | `" + (b.folder || "—") + "` |");
  lines.push("| Nota | " + celda(a.nota) + " | " + celda(b.nota) + " |");
  lines.push("| Escenarios | " + (a.total != null ? a.total : a.escenarios.length) + " | " + (b.total != null ? b.total : b.escenarios.length) + " |");
  lines.push("");
  lines.push("## Resumen");
  lines.push("");
  lines.push("- Iguales: **" + res.iguales + "**");
  lines.push("- Con diferencias: **" + res.diffs.length + "**");
  lines.push("- Solo en A (" + etiqA + "): **" + res.soloA.length + "**");
  lines.push("- Solo en B (" + etiqB + "): **" + res.soloB.length + "**");
  lines.push("");

  if (res.diffs.length > 0) {
    lines.push("## Diferencias por escenario");
    lines.push("");
    res.diffs.forEach(function (d, i) {
      lines.push("### " + (i + 1) + ". " + d.nombre);
      lines.push("");
      lines.push("| Campo | " + etiqA + " (A) | " + etiqB + " (B) |");
      lines.push("|-------|--------|--------|");
      d.campos.forEach(function (c) {
        lines.push("| " + c.campo + " | `" + celda(c.a) + "` | `" + celda(c.b) + "` |");
      });
      lines.push("");
    });
  }

  if (res.soloA.length > 0) {
    lines.push("## Solo en A (" + etiqA + ")");
    lines.push("");
    res.soloA.forEach(function (n) {
      lines.push("- " + n);
    });
    lines.push("");
  }
  if (res.soloB.length > 0) {
    lines.push("## Solo en B (" + etiqB + ")");
    lines.push("");
    res.soloB.forEach(function (n) {
      lines.push("- " + n);
    });
    lines.push("");
  }

  return lines.join("\n");
}

function parseArgs(argv) {
  const positional = [];
  let salida = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--salida" && argv[i + 1]) {
      salida = argv[++i];
    } else if (!argv[i].startsWith("-")) {
      positional.push(argv[i]);
    }
  }
  return { positional: positional, salida: salida };
}

function main() {
  const { positional, salida } = parseArgs(process.argv.slice(2));
  if (positional.length < 2) {
    console.error(
      "Uso: node comparar-runs.js <resultados-A.json> <resultados-B.json> [--salida logs/comparacion.md]"
    );
    process.exit(1);
  }

  const a = load(positional[0]);
  const b = load(positional[1]);
  const res = comparar(a, b);
  const md = buildMd(a, b, res);

  const suite = a.suite || "runs";
  const etiqA = (a.codigoFuente || "A").replace(/[^a-zA-Z0-9._-]+/g, "-");
  const etiqB = (b.codigoFuente || "B").replace(/[^a-zA-Z0-9._-]+/g, "-");
  const outPath = salida
    ? path.isAbsolute(salida)
      ? salida
      : path.join(process.cwd(), salida)
    : path.join(LOGS, "comparacion-" + suite + "-" + etiqA + "-vs-" + etiqB + ".md");

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, md, "utf8");

  console.log("Comparación: " + a.codigoFuente + " (A) vs " + b.codigoFuente + " (B)");
  console.log(
    "Iguales: " +
      res.iguales +
      " | Con diferencias: " +
      res.diffs.length +
      " | Solo A: " +
      res.soloA.length +
      " | Solo B: " +
      res.soloB.length
  );
  console.log("Salida: " + outPath);
}

main();
