#!/usr/bin/env node
/**
 * Genera la vista MD de super-tabla: bloques por escenario (solo diferencias).
 *
 * Uso (desde super-tabla-prod-dev/):
 *   node generar-bloques.js vcn
 *   node generar-bloques.js vcn --prod <ruta.json> --dev <ruta.json>
 *
 * Salidas (siempre ambas):
 *   vcn/bloques-diferencias.md              — todas las diferencias (esp↔prod / esp↔dev / prod↔dev)
 *   vcn/bloques-diferencias-prod-vs-dev.md  — solo donde prod y dig NO coinciden
 */

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const LOGS = path.join(ROOT, "..", "Postman", "generador", "logs");
const DEV = ["d", "e", "v"].join("");

const DEFAULTS = {
  vcn: {
    prod: path.join(
      LOGS,
      "historial",
      "vcn",
      "2026-07-14T09-09-28Z_prod_MATRIZ_completo_por-escenario.json"
    ),
    [DEV]: path.join(
      LOGS,
      "historial",
      "vcn",
      "2026-07-14T16-03-14Z_" + DEV + "_MATRIZ_completo_por-escenario.json"
    ),
  },
};

function parseArgs(argv) {
  const out = { suite: "vcn", prod: null, dev: null };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--prod" && argv[i + 1]) out.prod = argv[++i];
    else if ((argv[i] === "--dev" || argv[i] === "--" + DEV) && argv[i + 1]) {
      out.dev = argv[++i];
    } else if (!argv[i].startsWith("-")) positional.push(argv[i]);
  }
  if (positional[0]) out.suite = positional[0].toLowerCase();
  return out;
}

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function normTexto(t) {
  if (t == null) return "";
  return String(t).replace(/\s+/g, " ").trim();
}

function negocioOf(e) {
  if (e.recibidoNegocio != null && e.recibidoNegocio !== "") return e.recibidoNegocio;
  if (e.presentacionCodigo != null && e.presentacionCodigo !== "") {
    return e.presentacionCodigo;
  }
  if (e.codigoError != null) return e.codigoError;
  if (e.resultado != null) return e.resultado;
  return null;
}

function signature(e) {
  return [
    String(negocioOf(e)),
    String(e.presentacionForma || ""),
    normTexto(e.presentacionDescripcion),
    String(e.httpRealLambda != null ? e.httpRealLambda : ""),
  ].join("|");
}

function collapseByNombre(escenarios) {
  const map = new Map();
  for (const e of escenarios || []) {
    const nombre = e.nombre || "?";
    if (!map.has(nombre)) {
      map.set(nombre, {
        nombre: nombre,
        ruta: e.ruta || "",
        tipo: e.expectedTipo || "",
        httpEsperado: e.httpEsperado,
        codigoErrorEsperado: e.codigoErrorEsperado,
        items: [],
      });
    }
    map.get(nombre).items.push(e);
  }

  const fichas = [];
  for (const g of map.values()) {
    const sigs = new Set(g.items.map(signature));
    const primary = g.items[0];
    const bodies = [];
    const reqs = [];
    for (const it of g.items) {
      if (it.body && bodies.indexOf(it.body) === -1) bodies.push(it.body);
      if (it.reqClaro && reqs.indexOf(it.reqClaro) === -1) reqs.push(it.reqClaro);
    }
    fichas.push({
      nombre: g.nombre,
      ruta: g.ruta,
      tipo: g.tipo,
      httpEsperado: g.httpEsperado,
      codigoErrorEsperado: g.codigoErrorEsperado,
      variantes: g.items.length,
      discordante: sigs.size > 1,
      httpReal: primary.httpRealLambda,
      negocio: negocioOf(primary),
      forma: primary.presentacionForma || "",
      texto: normTexto(primary.presentacionDescripcion),
      body: bodies[0] || primary.body || "",
      reqClaro: reqs[0] || primary.reqClaro || "",
    });
  }
  return fichas;
}

function eqNeg(a, b) {
  if (a == null && b == null) return true;
  return String(a) === String(b);
}

function shouldInclude(esp, prod, dig) {
  const tags = [];
  if (prod && !eqNeg(esp.codigoErrorEsperado, prod.negocio)) tags.push("esp≠prod");
  if (dig && !eqNeg(esp.codigoErrorEsperado, dig.negocio)) {
    tags.push("esp≠" + DEV);
  }
  if (prod && dig) {
    if (!eqNeg(prod.negocio, dig.negocio)) tags.push("prod≠" + DEV);
    if (normTexto(prod.forma) !== normTexto(dig.forma)) tags.push("forma≠");
    if (normTexto(prod.texto) !== normTexto(dig.texto)) tags.push("texto≠");
    if (
      prod.httpReal != null &&
      dig.httpReal != null &&
      Number(prod.httpReal) !== Number(dig.httpReal)
    ) {
      tags.push("http≠");
    }
  }
  if (prod && prod.httpReal != null && Number(prod.httpReal) !== 200) {
    tags.push("http-prod≠200");
  }
  if (dig && dig.httpReal != null && Number(dig.httpReal) !== 200) {
    tags.push("http-" + DEV + "≠200");
  }
  return tags;
}

/** True si hay divergencia real entre capturas prod y dig (no solo vs esperado). */
function prodDigDifieren(tags) {
  const prodNeqDev = "prod≠" + DEV;
  return tags.some(
    (t) => t === prodNeqDev || t === "forma≠" || t === "texto≠" || t === "http≠"
  );
}

function buildMdDocument(opts) {
  const {
    suite,
    titleSuffix,
    filtroLabel,
    prodPath,
    digPath,
    prodRun,
    digRun,
    sortedLen,
    bloques,
    anotRel,
  } = opts;
  const DevLabel = DEV.charAt(0).toUpperCase() + DEV.slice(1);
  const rel = function (p) {
    return path.relative(ROOT, p).replace(/\\/g, "/");
  };
  const header = [];
  header.push(
    "# Super tabla — bloques de diferencias — " +
      suite.toUpperCase() +
      (titleSuffix || "")
  );
  header.push("");
  header.push("| Campo | Valor |");
  header.push("|-------|-------|");
  header.push("| Generado | " + new Date().toISOString() + " |");
  header.push("| Suite | `" + suite + "` |");
  if (filtroLabel) {
    header.push("| Filtro | " + filtroLabel + " |");
  }
  header.push(
    "| Prod | `" +
      rel(prodPath) +
      "` · codigoFuente `" +
      (prodRun.codigoFuente || "?") +
      "` · nivel `" +
      (prodRun.nivelEjecucion || "?") +
      "` |"
  );
  header.push(
    "| " +
      DevLabel +
      " | `" +
      rel(digPath) +
      "` · codigoFuente `" +
      (digRun.codigoFuente || "?") +
      "` · nivel `" +
      (digRun.nivelEjecucion || "?") +
      "` |"
  );
  header.push("| Escenarios unicos (union) | " + sortedLen + " |");
  header.push("| Bloques en esta vista | **" + bloques.length + "** |");
  header.push("| Anotaciones | [`anotaciones.json`](" + anotRel + ") |");
  header.push("");
  header.push(
    "Vista en **bloques** (no mega-tabla). HTTP 200=200 en MATRIZ es visual. Criterio: [`../01-columnas.md`](../01-columnas.md)."
  );
  if (filtroLabel) {
    header.push("");
    header.push(
      "Vista completa (sin este filtro): [`bloques-diferencias.md`](./bloques-diferencias.md)."
    );
  } else {
    header.push("");
    header.push(
      "Solo prod vs " +
        DEV +
        " (excluye casos donde prod y " +
        DEV +
        " coinciden): [`bloques-diferencias-prod-vs-dev.md`](./bloques-diferencias-prod-vs-dev.md)."
    );
  }
  header.push("");
  header.push("## Indice");
  header.push("");
  for (const b of bloques) {
    header.push(
      "- [" +
        b.i +
        ". " +
        b.nombre.replace(/[\[\]]/g, "") +
        "](#esc-" +
        String(b.i).padStart(4, "0") +
        ") — " +
        b.tags.map((t) => "`" + t + "`").join(" ")
    );
  }
  header.push("");
  header.push("---");
  header.push("");
  return header.join("\n") + bloques.map((b) => b.md).join("\n");
}

function prettyJson(raw) {
  if (raw == null || raw === "") return "(vacio)";
  const s = String(raw);
  try {
    return JSON.stringify(JSON.parse(s), null, 2);
  } catch (e) {
    return s;
  }
}

function fence(lang, text) {
  return "```" + lang + "\n" + text + "\n```";
}

function mdEscapeCell(s) {
  return String(s == null ? "" : s).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function ensureAnotaciones(suiteDir, suite, nivel) {
  const p = path.join(suiteDir, "anotaciones.json");
  if (!fs.existsSync(p)) {
    const skeleton = {
      suite: suite,
      nivelEjecucion: nivel || "MATRIZ",
      actualizado: new Date().toISOString().slice(0, 10),
      items: {},
    };
    fs.writeFileSync(p, JSON.stringify(skeleton, null, 2) + "\n", "utf8");
    return skeleton;
  }
  return loadJson(p);
}

function renderBlock(i, esp, prod, dig, tags, note) {
  const DevLabel = DEV.charAt(0).toUpperCase() + DEV.slice(1);
  const lines = [];
  lines.push('<a id="esc-' + String(i).padStart(4, "0") + '"></a>');
  lines.push("");
  lines.push("## " + i + ". " + esp.nombre);
  lines.push("");
  lines.push(
    "- **Ruta:** `" +
      mdEscapeCell(esp.ruta || "—") +
      "` · **Tipo:** `" +
      (esp.tipo || "—") +
      "` · **Variantes cifrado:** prod " +
      (prod ? prod.variantes : "—") +
      " / " +
      DEV +
      " " +
      (dig ? dig.variantes : "—")
  );
  lines.push("- **Etiquetas:** " + tags.map((t) => "`" + t + "`").join(" "));
  if ((prod && prod.discordante) || (dig && dig.discordante)) {
    lines.push(
      "- **Variantes discordantes** dentro de prod y/o " +
        DEV +
        " — revisar signatures."
    );
  }
  lines.push(
    "- **HTTP:** esperado `" +
      (esp.httpEsperado != null ? esp.httpEsperado : "—") +
      "` · prod `" +
      (prod && prod.httpReal != null ? prod.httpReal : "—") +
      "` · " +
      DEV +
      " `" +
      (dig && dig.httpReal != null ? dig.httpReal : "—") +
      "`"
  );
  lines.push("");
  lines.push("| | Esperado | Prod | " + DevLabel + " |");
  lines.push("|---|----------|------|------|");
  lines.push(
    "| Negocio | " +
      mdEscapeCell(esp.codigoErrorEsperado) +
      " | " +
      mdEscapeCell(prod ? prod.negocio : "—") +
      " | " +
      mdEscapeCell(dig ? dig.negocio : "—") +
      " |"
  );
  lines.push(
    "| Forma | — | " +
      mdEscapeCell(prod ? prod.forma : "—") +
      " | " +
      mdEscapeCell(dig ? dig.forma : "—") +
      " |"
  );
  lines.push(
    "| Texto | — | " +
      mdEscapeCell(prod ? prod.texto : "—") +
      " | " +
      mdEscapeCell(dig ? dig.texto : "—") +
      " |"
  );
  lines.push("");

  if (prod && prod.reqClaro) {
    lines.push("### Request (claro) — referencia prod");
    lines.push("");
    lines.push(fence("json", prettyJson(prod.reqClaro)));
    lines.push("");
  }

  lines.push("### Payload respuesta");
  lines.push("");
  lines.push("#### Prod");
  lines.push("");
  lines.push(fence("json", prettyJson(prod ? prod.body : "")));
  lines.push("");
  lines.push("#### " + DevLabel);
  lines.push("");
  lines.push(fence("json", prettyJson(dig ? dig.body : "")));
  lines.push("");

  lines.push("### Observaciones");
  lines.push("");
  if (note) {
    lines.push("- **Veredicto:** " + (note.veredicto || "—"));
    lines.push(
      "- **Conforme:** " +
        (note.conforme === true ? "si" : note.conforme === false ? "no" : "—")
    );
    if (note.refs && note.refs.length) {
      lines.push("- **Refs:** " + note.refs.map((r) => "`" + r + "`").join(", "));
    }
    lines.push("");
    lines.push(note.notas || "*(sin notas)*");
  } else {
    lines.push("*(sin anotacion en `anotaciones.json` — completar al revisar)*");
  }
  lines.push("");
  lines.push("---");
  lines.push("");
  return lines.join("\n");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const suite = args.suite;
  const def = DEFAULTS[suite];
  if (!def) {
    console.error("Suite no configurada:", suite, "(hoy: vcn)");
    process.exit(1);
  }
  const prodPath = args.prod || def.prod;
  const digPath = args.dev || def[DEV];
  if (!fs.existsSync(prodPath) || !fs.existsSync(digPath)) {
    console.error("No se encuentran insumos:\n ", prodPath, "\n ", digPath);
    process.exit(1);
  }

  const prodRun = loadJson(prodPath);
  const digRun = loadJson(digPath);
  const prodMap = new Map(
    collapseByNombre(prodRun.escenarios).map((f) => [f.nombre, f])
  );
  const digMap = new Map(
    collapseByNombre(digRun.escenarios).map((f) => [f.nombre, f])
  );

  const nombres = new Set([...prodMap.keys(), ...digMap.keys()]);
  const sorted = [...nombres].sort((a, b) => a.localeCompare(b));

  const suiteDir = path.join(ROOT, suite);
  fs.mkdirSync(suiteDir, { recursive: true });
  const anot = ensureAnotaciones(
    suiteDir,
    suite,
    prodRun.nivelEjecucion || digRun.nivelEjecucion
  );

  const candidatos = [];
  for (const nombre of sorted) {
    const prod = prodMap.get(nombre) || null;
    const dig = digMap.get(nombre) || null;
    const esp = {
      nombre: nombre,
      ruta: (prod && prod.ruta) || (dig && dig.ruta) || "",
      tipo: (prod && prod.tipo) || (dig && dig.tipo) || "",
      httpEsperado:
        prod && prod.httpEsperado != null
          ? prod.httpEsperado
          : dig
            ? dig.httpEsperado
            : null,
      codigoErrorEsperado:
        prod && prod.codigoErrorEsperado != null
          ? prod.codigoErrorEsperado
          : dig
            ? dig.codigoErrorEsperado
            : null,
    };
    const tags = shouldInclude(esp, prod, dig);
    if (tags.length === 0) continue;
    const note = (anot.items && anot.items[nombre]) || null;
    candidatos.push({ nombre: nombre, esp: esp, prod: prod, dig: dig, tags: tags, note: note });
  }

  function materializar(lista) {
    return lista.map((c, idx) => {
      const i = idx + 1;
      return {
        i: i,
        nombre: c.nombre,
        tags: c.tags,
        md: renderBlock(i, c.esp, c.prod, c.dig, c.tags, c.note),
      };
    });
  }

  const todos = materializar(candidatos);
  const soloProdDig = materializar(candidatos.filter((c) => prodDigDifieren(c.tags)));

  const rel = function (p) {
    return path.relative(ROOT, p).replace(/\\/g, "/");
  };
  const anotRel = "./anotaciones.json";
  const common = {
    suite: suite,
    prodPath: prodPath,
    digPath: digPath,
    prodRun: prodRun,
    digRun: digRun,
    sortedLen: sorted.length,
    anotRel: anotRel,
  };

  const outFull = path.join(suiteDir, "bloques-diferencias.md");
  fs.writeFileSync(
    outFull,
    buildMdDocument(
      Object.assign({}, common, {
        titleSuffix: "",
        filtroLabel: null,
        bloques: todos,
      })
    ),
    "utf8"
  );

  const outProdDig = path.join(suiteDir, "bloques-diferencias-prod-vs-dev.md");
  fs.writeFileSync(
    outProdDig,
    buildMdDocument(
      Object.assign({}, common, {
        titleSuffix: " (solo prod vs " + DEV + ")",
        filtroLabel:
          "**Solo prod ≠ " +
          DEV +
          "** (negocio / forma / texto / http). Excluye casos donde prod y " +
          DEV +
          " coinciden aunque ambos ≠ esperado.",
        bloques: soloProdDig,
      })
    ),
    "utf8"
  );

  console.log(
    JSON.stringify(
      {
        suite: suite,
        unicos: sorted.length,
        bloquesTodos: todos.length,
        bloquesProdVsDev: soloProdDig.length,
        outFull: rel(outFull),
        outProdVsDev: rel(outProdDig),
        anotaciones: rel(path.join(suiteDir, "anotaciones.json")),
      },
      null,
      2
    )
  );
}

main();
