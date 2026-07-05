#!/usr/bin/env node
/**
 * Ejecuta colección Postman con Newman y escribe reporte compartible.
 *
 * Uso (desde Postman/generador):
 *   node run-newman.js p2m
 *   node run-newman.js p2p --folder "General/2_reglaNegocio/1_idCanal"
 *   node run-newman.js vcn
 *   node run-newman.js all
 */

const fs = require("fs");
const path = require("path");
const newman = require("newman");

const ROOT = __dirname;
const LOGS = path.join(ROOT, "logs");

const SUITES = {
  p2m: {
    collection: path.join(
      ROOT,
      "ensamblador/salida/P2M Escenarios error.postman_collection.json"
    ),
    environment: path.join(
      ROOT,
      "entornos/P2M Escenarios error - desarrollo.postman_environment.json"
    ),
  },
  p2p: {
    collection: path.join(
      ROOT,
      "ensamblador/salida/P2P Escenarios error.postman_collection.json"
    ),
    environment: path.join(
      ROOT,
      "entornos/P2P Escenarios error - desarrollo.postman_environment.json"
    ),
  },
  vcn: {
    collection: path.join(
      ROOT,
      "ensamblador/salida/VCN Escenarios error.postman_collection.json"
    ),
    environment: path.join(
      ROOT,
      "entornos/VCN Escenarios error - desarrollo.postman_environment.json"
    ),
  },
};

const MAX_BODY = 4000;

function parseArgs(argv) {
  const positional = [];
  let folder = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--folder" && argv[i + 1]) {
      folder = argv[++i];
    } else if (!argv[i].startsWith("-")) {
      positional.push(argv[i]);
    }
  }
  return { suite: positional[0], folder };
}

function truncate(text, max) {
  if (!text) {
    return "";
  }
  const s = String(text);
  if (s.length <= max) {
    return s;
  }
  return s.slice(0, max) + "\n… [truncado]";
}

function readStreamBody(stream) {
  if (!stream) {
    return "";
  }
  if (Buffer.isBuffer(stream)) {
    return stream.toString("utf8");
  }
  if (typeof stream === "string") {
    return stream;
  }
  if (stream.data && Array.isArray(stream.data)) {
    return Buffer.from(stream.data).toString("utf8");
  }
  try {
    return String(stream);
  } catch (e) {
    return "";
  }
}

function findExecutionByItemId(executions, itemId) {
  if (!executions || !itemId) {
    return null;
  }
  return executions.find(function (ex) {
    return ex.item && ex.item.id === itemId;
  });
}

function dedupeFailures(failures) {
  const byKey = new Map();
  failures.forEach(function (failure) {
    const source = failure.source || {};
    const err = failure.error || {};
    const key =
      (source.id || source.name || "unknown") + "|" + (err.test || err.name || "");
    const existing = byKey.get(key);
    const isAssert = err.test && err.test !== "Error";
    if (!existing || (isAssert && existing.error.test === "Error")) {
      byKey.set(key, failure);
    }
  });
  return Array.from(byKey.values());
}

function buildResumenMarkdown(suite, folder, summary, jsonPath, mdPath) {
  const run = summary.run || {};
  const stats = run.stats || {};
  const failures = dedupeFailures(run.failures || []);
  const executions = run.executions || [];
  const lines = [];

  lines.push("# Resumen de fallos — " + suite.toUpperCase());
  lines.push("");
  lines.push("| Campo | Valor |");
  lines.push("|-------|-------|");
  lines.push("| Fecha | " + new Date().toISOString() + " |");
  if (folder) {
    lines.push("| Carpeta | `" + folder + "` |");
  }
  lines.push(
    "| Requests | " +
      (stats.requests ? stats.requests.total : "?") +
      " (failed: " +
      (stats.requests ? stats.requests.failed : "?") +
      ") |"
  );
  lines.push(
    "| Tests | " +
      (stats.assertions ? stats.assertions.total : "?") +
      " (failed: " +
      (stats.assertions ? stats.assertions.failed : "?") +
      ") |"
  );
  lines.push("| JSON completo | `" + path.relative(ROOT, jsonPath) + "` |");
  lines.push("");

  if (failures.length === 0) {
    lines.push("Sin fallos.");
    lines.push("");
    return lines.join("\n");
  }

  failures.forEach(function (failure, index) {
    const err = failure.error || {};
    const source = failure.source || {};
    const parent = failure.parent || {};
    const requestName = source.name || "(sin nombre)";
    const folderName = parent.name ? parent.name + " / " : "";

    lines.push("## " + (index + 1) + ". " + folderName + requestName);
    lines.push("");
    lines.push("- **Test:** " + (err.test || err.name || "—"));
    lines.push("- **Mensaje:** " + (err.message || "—").replace(/\r?\n/g, " "));

    const exec = findExecutionByItemId(executions, source.id);
    if (exec && exec.response) {
      const code = exec.response.code != null ? exec.response.code : "—";
      lines.push("- **HTTP descifrar:** " + code);
      const body = readStreamBody(exec.response.stream);
      if (body) {
        lines.push("");
        lines.push("```json");
        lines.push(truncate(body, MAX_BODY));
        lines.push("```");
      }
    }

    lines.push("");
  });

  return lines.join("\n");
}

function runSuite(suiteKey, folder) {
  const cfg = SUITES[suiteKey];
  if (!cfg) {
    return Promise.reject(new Error("Suite desconocida: " + suiteKey));
  }
  if (!fs.existsSync(cfg.collection)) {
    return Promise.reject(
      new Error(
        "Falta coleccion: " +
          cfg.collection +
          " — ejecutar ensamblador primero"
      )
    );
  }
  if (!fs.existsSync(cfg.environment)) {
    return Promise.reject(new Error("Falta entorno: " + cfg.environment));
  }

  const jsonPath = path.join(LOGS, "ultimo-run-" + suiteKey + ".json");
  const mdPath = path.join(LOGS, "resumen-fallos-" + suiteKey + ".md");

  const options = {
    collection: cfg.collection,
    environment: cfg.environment,
    reporters: ["cli", "json"],
    reporter: {
      json: { export: jsonPath },
    },
    timeout: 120000,
    timeoutRequest: 120000,
    timeoutScript: 60000,
  };
  if (folder) {
    options.folder = folder.includes("/")
      ? folder.split("/").map(function (s) {
          return s.trim();
        })
      : folder;
  }

  return new Promise(function (resolve, reject) {
    newman.run(options, function (err, summary) {
      if (err) {
        reject(err);
        return;
      }
      const md = buildResumenMarkdown(
        suiteKey,
        folder,
        summary,
        jsonPath,
        mdPath
      );
      fs.writeFileSync(mdPath, md, "utf8");
      console.log("\nResumen: " + path.relative(ROOT, mdPath));
      console.log("JSON:    " + path.relative(ROOT, jsonPath));
      resolve(summary);
    });
  });
}

function main() {
  const { suite, folder } = parseArgs(process.argv.slice(2));
  if (!suite || !SUITES[suite] && suite !== "all") {
    console.error(
      "Uso: node run-newman.js <p2m|p2p|vcn|all> [--folder \"General/2_reglaNegocio/1_idCanal\"]"
    );
    process.exit(1);
  }

  if (!fs.existsSync(LOGS)) {
    fs.mkdirSync(LOGS, { recursive: true });
  }

  const suites = suite === "all" ? Object.keys(SUITES) : [suite];

  (async function () {
    let exitCode = 0;
    for (const key of suites) {
      console.log("\n=== " + key.toUpperCase() + " ===");
      try {
        const summary = await runSuite(key, folder);
        const failed =
          summary.run &&
          summary.run.stats &&
          summary.run.stats.assertions &&
          summary.run.stats.assertions.failed;
        if (failed > 0) {
          exitCode = 1;
        }
      } catch (e) {
        console.error(e.message || e);
        exitCode = 1;
      }
    }
    process.exit(exitCode);
  })();
}

main();
