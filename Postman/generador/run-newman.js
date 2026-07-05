#!/usr/bin/env node
/**
 * Ejecuta colección Postman con Newman y escribe reporte compartible.
 *
 * Uso (desde Postman/generador):
 *   node run-newman.js p2m
 *   node run-newman.js p2p --folder "General/2_reglaNegocio/1_idCanal"
 *   node run-newman.js vcn
 *   node run-newman.js all
 *
 * SSL: por defecto no verifica certificados (como Postman con SSL off en dev).
 *   --strict-ssl  exige certificado válido
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
  let insecure = true;
  let nota = "";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--folder" && argv[i + 1]) {
      folder = argv[++i];
    } else if (argv[i] === "--nota" && argv[i + 1]) {
      nota = argv[++i];
    } else if (argv[i] === "--insecure") {
      insecure = true;
    } else if (argv[i] === "--strict-ssl") {
      insecure = false;
    } else if (!argv[i].startsWith("-")) {
      positional.push(argv[i]);
    }
  }
  return { suite: positional[0], folder, insecure, nota };
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

function buildResumenMarkdown(suite, folder, summary, jsonPath, mdPath, nota) {
  const run = summary.run || {};
  const stats = run.stats || {};
  const failures = dedupeFailures(run.failures || []);
  const executions = run.executions || [];
  const lines = [];
  const fechaIso = new Date().toISOString();

  lines.push("# Resumen de fallos — " + suite.toUpperCase());
  lines.push("");
  lines.push("| Campo | Valor |");
  lines.push("|-------|-------|");
  lines.push("| Fecha | " + fechaIso + " |");
  if (folder) {
    lines.push("| Carpeta | `" + folder + "` |");
  } else {
    lines.push("| Carpeta | `(completo)` |");
  }
  if (nota) {
    lines.push("| Nota | " + nota.replace(/\|/g, "\\|") + " |");
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
      (stats.assertions ? stats.assertions.total : stats.tests ? stats.tests.total : "?") +
      " (failed: " +
      (stats.assertions ? stats.assertions.failed : stats.tests ? stats.tests.failed : "?") +
      ") |"
  );
  if (stats.assertions && stats.assertions.total === 0 && stats.requests && stats.requests.total > 0) {
    lines.push("");
    lines.push(
      "**Atención:** 0 assertions — si usaste `--folder` con ruta, verifica que la subcolección incluya scripts de raíz (`event` de colección). Sin ellos no se ejecuta el flujo cifrar→procesar→descifrar ni las pruebas."
    );
  }
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

const HISTORIAL_MAX = 8;

function isoTimestampForFilename(d) {
  return d.toISOString().replace(/:/g, "-").replace(/\.\d{3}Z$/, "Z");
}

function folderSlug(folder) {
  if (!folder) {
    return "completo";
  }
  return folder
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function pruneHistorial(histDir, maxRuns) {
  const entries = fs
    .readdirSync(histDir)
    .filter(function (name) {
      return name.endsWith(".json");
    })
    .map(function (name) {
      const full = path.join(histDir, name);
      return { name: name, mtime: fs.statSync(full).mtimeMs };
    })
    .sort(function (a, b) {
      return b.mtime - a.mtime;
    });

  entries.slice(maxRuns).forEach(function (entry) {
    const base = entry.name.replace(/\.json$/, "");
    const jsonFile = path.join(histDir, base + ".json");
    const mdFile = path.join(histDir, base + ".md");
    if (fs.existsSync(jsonFile)) {
      fs.unlinkSync(jsonFile);
    }
    if (fs.existsSync(mdFile)) {
      fs.unlinkSync(mdFile);
    }
  });
}

function updateRegistro(suiteKey, entry) {
  const regPath = path.join(LOGS, "registro-" + suiteKey + ".md");
  const header = [
    "# Registro de ejecuciones Newman — " + suiteKey.toUpperCase(),
    "",
    "Orden: **más reciente arriba**. Commitear `logs/` tras cada run en la **máquina con VPN**.",
    "",
    "| Fecha (UTC) | Carpeta | Requests | Tests | Resultado | Historial | Nota |",
    "|-------------|---------|----------|-------|-----------|-----------|------|",
  ];

  let existingRows = [];
  if (fs.existsSync(regPath)) {
    const text = fs.readFileSync(regPath, "utf8");
    existingRows = text
      .split("\n")
      .filter(function (line) {
        return line.startsWith("| 20");
      });
  }

  const row =
    "| " +
    entry.fecha +
    " | `" +
    entry.folder +
    "` | " +
    entry.requests +
    " | " +
    entry.tests +
    " | **" +
    entry.resultado +
    "** | [`" +
    path.basename(entry.json) +
    "`](./" +
    entry.json.replace(/\\/g, "/") +
    ") | " +
    (entry.nota || "—") +
    " |";

  const rows = [row].concat(existingRows).slice(0, HISTORIAL_MAX);
  fs.writeFileSync(regPath, header.concat(rows).concat(["", ""]).join("\n"), "utf8");
}

function archiveRun(suiteKey, folder, jsonPath, mdPath, summary, nota) {
  const histDir = path.join(LOGS, "historial", suiteKey);
  fs.mkdirSync(histDir, { recursive: true });
  const ts = isoTimestampForFilename(new Date());
  const slug = folderSlug(folder);
  const base = ts + "_" + slug;
  const histJson = path.join(histDir, base + ".json");
  const histMd = path.join(histDir, base + ".md");
  fs.copyFileSync(jsonPath, histJson);
  fs.copyFileSync(mdPath, histMd);

  const stats = summary.run && summary.run.stats ? summary.run.stats : {};
  const reqTotal = stats.requests ? stats.requests.total : "?";
  const reqFailed = stats.requests ? stats.requests.failed : 0;
  const testTotal = stats.assertions
    ? stats.assertions.total
    : stats.tests
      ? stats.tests.total
      : "?";
  const testFailed = stats.assertions
    ? stats.assertions.failed
    : stats.tests
      ? stats.tests.failed
      : 0;

  updateRegistro(suiteKey, {
    fecha: new Date().toISOString(),
    folder: folder || "(completo)",
    requests: reqTotal + " (fail " + reqFailed + ")",
    tests: testTotal + " (fail " + testFailed + ")",
    resultado: testFailed === 0 && reqFailed === 0 ? "OK" : "FALLÓ",
    json: path.relative(LOGS, histJson),
    md: path.relative(LOGS, histMd),
    nota: nota,
  });

  pruneHistorial(histDir, HISTORIAL_MAX);
}

function walkFolderPath(rawItems, segments, collectionPath, folderPath) {
  let items = rawItems;
  /** @type {object|null} */
  let node = null;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const matches = items.filter(function (entry) {
      return entry.name === seg && Array.isArray(entry.item);
    });
    if (matches.length === 0) {
      throw new Error(
        'Carpeta "' +
          seg +
          '" no encontrada en ruta `' +
          folderPath +
          "` (colección " +
          path.basename(collectionPath) +
          ")"
      );
    }
    if (matches.length > 1) {
      throw new Error(
        'Nombre de carpeta ambiguo "' +
          seg +
          '" en `' +
          folderPath +
          "`. Usa ruta completa desde la raíz."
      );
    }
    node = matches[0];
    items = node.item;
  }
  return node;
}

function countRequestsInItems(items) {
  let total = 0;
  items.forEach(function (entry) {
    if (Array.isArray(entry.item)) {
      total += countRequestsInItems(entry.item);
    } else if (entry.request) {
      total += 1;
    }
  });
  return total;
}

/**
 * Colecciones ensambladas no traen ids estables; Newman regenera UUID al cargar.
 * Para rutas anidadas, extraemos la subcolección JSON en lugar de pasar folder id.
 */
function buildCollectionForFolderPath(collectionPath, folderPath) {
  const raw = JSON.parse(fs.readFileSync(collectionPath, "utf8"));
  const segments = folderPath
    .split("/")
    .map(function (s) {
      return s.trim();
    })
    .filter(Boolean);
  const folderNode = walkFolderPath(raw.item, segments, collectionPath, folderPath);
  const baseName =
    raw.info && raw.info.name ? raw.info.name : path.basename(collectionPath, ".json");
  const sub = {
    info: Object.assign({}, raw.info, {
      name: baseName + " — " + folderPath,
    }),
    item: [folderNode],
  };
  if (Array.isArray(raw.event) && raw.event.length > 0) {
    sub.event = raw.event;
  }
  if (Array.isArray(raw.variable) && raw.variable.length > 0) {
    sub.variable = raw.variable;
  }
  return sub;
}

function resolveFolderTarget(collectionPath, folderPath) {
  if (!folderPath || !folderPath.includes("/")) {
    return null;
  }
  const segments = folderPath
    .split("/")
    .map(function (s) {
      return s.trim();
    })
    .filter(Boolean);
  const raw = JSON.parse(fs.readFileSync(collectionPath, "utf8"));
  const folderNode = walkFolderPath(raw.item, segments, collectionPath, folderPath);
  return {
    name: folderNode.name,
    path: folderPath,
    requestCount: countRequestsInItems(folderNode.item),
  };
}

function runSuite(suiteKey, folder, insecure, nota) {
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

  const folderTarget =
    folder && folder.includes("/")
      ? resolveFolderTarget(cfg.collection, folder)
      : null;
  if (folderTarget) {
    console.log(
      "Carpeta: `" +
        folderTarget.path +
        "` (" +
        folderTarget.name +
        ", " +
        folderTarget.requestCount +
        " requests)"
    );
  }

  // timeout = tope global del run (Newman), no por request. VCN completo ~400+ HTTP ~5–15 min.
  const options = {
    collection:
      folder && folder.includes("/")
        ? buildCollectionForFolderPath(cfg.collection, folder)
        : cfg.collection,
    environment: cfg.environment,
    reporters: ["cli", "json"],
    reporter: {
      json: { export: jsonPath },
    },
    timeout: 1800000,
    timeoutRequest: 120000,
    timeoutScript: 60000,
    insecure: insecure,
  };
  if (folder && !folder.includes("/")) {
    options.folder = folder;
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
        mdPath,
        nota
      );
      fs.writeFileSync(mdPath, md, "utf8");
      archiveRun(suiteKey, folder, jsonPath, mdPath, summary, nota);
      const regPath = path.join(LOGS, "registro-" + suiteKey + ".md");
      console.log("\nResumen: " + path.relative(ROOT, mdPath));
      console.log("JSON:    " + path.relative(ROOT, jsonPath));
      console.log("Registro:" + path.relative(ROOT, regPath));
      resolve(summary);
    });
  });
}

function main() {
  const { suite, folder, insecure, nota } = parseArgs(process.argv.slice(2));
  if (!suite || !SUITES[suite] && suite !== "all") {
    console.error(
      'Uso: node run-newman.js <p2m|p2p|vcn|all> [--folder "General/2_reglaNegocio/1_idCanal"] [--nota "post-deploy c47a264"] [--strict-ssl]'
    );
    process.exit(1);
  }

  if (insecure) {
    console.log("SSL: verificación desactivada (entorno dev). Usa --strict-ssl para exigir certificado.");
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
        const summary = await runSuite(key, folder, insecure, nota);
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
