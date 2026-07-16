#!/usr/bin/env node
/**
 * Arma un .postman_collection.json desde la fuente (P2M Escenarios error/)
 *
 * Estructura de escenarios:
 *   General/<grupo>/<campo>/<N.N>_<campo>_<condicion>.json → ID P.S.E (ej. 1.4.15)
 *   Metodo/<metodo>/<grupo>/<campo>/<N.N>_<campo>_<condicion>.json → ID M.P.S.E (ej. 0015.1.1.1)
 *
 * Uso (desde esta carpeta):
 *   node armar-coleccion.js
 *   node armar-coleccion.js config-p2p.json
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const BASE = __dirname;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readJsAsExec(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const text = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
  const lines = text.split("\n");
  while (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }
  return lines;
}

function makeScriptEvent(listen, execLines) {
  return {
    listen,
    script: {
      type: "text/javascript",
      exec: execLines,
    },
  };
}

function isScenarioJsonFile(name) {
  return name.endsWith(".json");
}

function parseScenarioSortKey(filename) {
  const match = filename.match(/^(\d+)\.(\d+)_/);
  if (match) {
    return [parseInt(match[1], 10), parseInt(match[2], 10)];
  }
  return [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
}

function compareScenarioFiles(a, b) {
  const ka = parseScenarioSortKey(a);
  const kb = parseScenarioSortKey(b);
  if (ka[0] !== kb[0]) {
    return ka[0] - kb[0];
  }
  return ka[1] - kb[1];
}

function buildDescifrarUrl(algoritmoCifrado, tld) {
  const host = "{{DOMAIN_TLD_VALIDADOR_DUMMY}}";
  return {
    raw:
      host +
      "/descifrar?tld=" +
      tld +
      "&algoritmoCifrado=" +
      algoritmoCifrado,
    host: [host],
    path: ["descifrar"],
    query: [
      { key: "tld", value: tld },
      { key: "algoritmoCifrado", value: algoritmoCifrado },
    ],
  };
}

function buildExpectedPreRequestExec(escenario) {
  const lines = [
    "pm.variables.set('expectedHttpStatus', " +
      escenario.expectedHttpStatus +
      ");",
    "pm.variables.set('expectedCodigoError', " +
      escenario.expectedCodigoError +
      ");",
    "pm.variables.set('expectedTipo', '" + escenario.expectedTipo + "');",
  ];
  if (escenario.expectedProducto) {
    lines.push(
      "pm.variables.set('expectedProducto', '" +
        escenario.expectedProducto +
        "');"
    );
  } else {
    lines.push("pm.variables.unset('expectedProducto');");
  }

  const exitoVars = [
    ["expectedCuenta", escenario.expectedCuenta],
    ["expectedBanco", escenario.expectedBanco],
    ["expectedValidador", escenario.expectedValidador],
    ["expectedCuentaLongitud", escenario.expectedCuentaLongitud],
    // R2P (0011/0013)
    ["expectedIdentificador", escenario.expectedIdentificador],
    ["expectedMonto", escenario.expectedMonto],
    ["expectedBancoAcreedor", escenario.expectedBancoAcreedor],
    ["expectedCuentaDeudor", escenario.expectedCuentaDeudor],
    ["expectedCuentaAcreedor", escenario.expectedCuentaAcreedor],
    ["expectedNombreAcreedor", escenario.expectedNombreAcreedor],
  ];
  for (const [key, value] of exitoVars) {
    if (value != null && value !== "") {
      lines.push(
        "pm.variables.set('" + key + "', '" + String(value) + "');"
      );
    } else {
      lines.push("pm.variables.unset('" + key + "');");
    }
  }

  if (escenario.expectedEnmascarado === true) {
    lines.push("pm.variables.set('expectedEnmascarado', 'true');");
  } else if (escenario.expectedEnmascarado === false) {
    lines.push("pm.variables.set('expectedEnmascarado', 'false');");
  } else {
    lines.push("pm.variables.unset('expectedEnmascarado');");
  }

  if (escenario.verificarUnicode === true) {
    lines.push("pm.variables.set('verificarUnicode', 'true');");
  } else {
    lines.push("pm.variables.unset('verificarUnicode');");
  }

  if (escenario.titularesClaro && escenario.titularesClaro.length > 0) {
    lines.push(
      "pm.variables.set('expectedTitularesClaro', " +
        JSON.stringify(JSON.stringify(escenario.titularesClaro)) +
        ");"
    );
  } else {
    lines.push("pm.variables.unset('expectedTitularesClaro');");
  }

  if (escenario.expectedTitularesExactos != null) {
    lines.push(
      "pm.variables.set('expectedTitularesExactos', '" +
        escenario.expectedTitularesExactos +
        "');"
    );
  } else {
    lines.push("pm.variables.unset('expectedTitularesExactos');");
  }

  return lines;
}

function buildRequestItemFromJson(jsonPath) {
  const escenario = readJson(jsonPath);
  const scenarioDir = path.dirname(jsonPath);
  const baseName = path.basename(jsonPath, ".json");
  const algoritmo = escenario.algoritmoCifrado || "aes-256-cbc";
  const tld = escenario.tld != null ? String(escenario.tld) : "0";
  const method = escenario.method || "POST";

  const item = {
    name: escenario.nombre,
    request: {
      method,
      header: escenario.header || [],
      url: buildDescifrarUrl(algoritmo, tld),
    },
    response: [],
  };

  if (escenario.body) {
    item.request.body = {
      mode: "raw",
      raw: JSON.stringify(escenario.body, null, 4),
      options: {
        raw: {
          language: "json",
        },
      },
    };
  }

  const events = [];
  const preOverride = readJsAsExec(
    path.join(scenarioDir, baseName + ".Pre-request.js")
  );
  if (preOverride) {
    events.push(makeScriptEvent("prerequest", preOverride));
  } else {
    events.push(makeScriptEvent("prerequest", buildExpectedPreRequestExec(escenario)));
  }

  const postExec = readJsAsExec(
    path.join(scenarioDir, baseName + ".Post-response.js")
  );
  if (postExec) {
    events.push(makeScriptEvent("test", postExec));
  }

  if (events.length > 0) {
    item.event = events;
  }

  return item;
}

function buildFieldFolder(fieldDir, fieldName) {
  const entries = fs.readdirSync(fieldDir, { withFileTypes: true });
  const jsonFiles = entries
    .filter((entry) => entry.isFile() && isScenarioJsonFile(entry.name))
    .map((entry) => entry.name)
    .sort(compareScenarioFiles);

  const items = [];
  for (const fileName of jsonFiles) {
    items.push(buildRequestItemFromJson(path.join(fieldDir, fileName)));
  }

  if (items.length === 0) {
    return null;
  }

  return {
    name: fieldName,
    item: items,
  };
}

function buildNode(dirPath, name) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const hasScenarioJson = entries.some(
    (entry) => entry.isFile() && isScenarioJsonFile(entry.name)
  );

  if (hasScenarioJson) {
    return buildFieldFolder(dirPath, name);
  }

  const items = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const child = buildNode(path.join(dirPath, entry.name), entry.name);
    if (child) {
      items.push(child);
    }
  }

  if (items.length === 0) {
    return null;
  }

  items.sort((a, b) => a.name.localeCompare(b.name));
  return {
    name,
    item: items,
  };
}

function buildTypeFolder(typeDir, typeName) {
  return buildNode(typeDir, typeName);
}

function buildItems(raizPath) {
  const entries = fs.readdirSync(raizPath, { withFileTypes: true });
  const items = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const typeFolder = buildTypeFolder(path.join(raizPath, entry.name), entry.name);
    if (typeFolder) {
      items.push(typeFolder);
    }
  }

  items.sort((a, b) => a.name.localeCompare(b.name));
  return items;
}

function buildCollectionEvents(raizPath) {
  const events = [];
  const preExec = readJsAsExec(path.join(raizPath, "Pre-request.js"));
  if (preExec) {
    events.push(makeScriptEvent("prerequest", preExec));
  }
  const postExec = readJsAsExec(path.join(raizPath, "Post-response.js"));
  if (postExec) {
    events.push(makeScriptEvent("test", postExec));
  }
  return events;
}

function buildCollectionVariables() {
  const variablesPath = path.join(BASE, "variables-coleccion.json");
  const catalogPath = path.join(BASE, "catalogoGeneral.json");
  const variables = [];

  if (fs.existsSync(variablesPath)) {
    const fromFile = readJson(variablesPath);
    if (Array.isArray(fromFile)) {
      for (const entry of fromFile) {
        if (entry.key !== "CATALOGO_GENERAL") {
          variables.push(entry);
        }
      }
    }
  }

  if (!fs.existsSync(catalogPath)) {
    console.warn("Advertencia: no existe catalogoGeneral.json");
    return variables.length > 0 ? variables : null;
  }

  const catalogo = readJson(catalogPath);
  variables.push({
    key: "CATALOGO_GENERAL",
    value: JSON.stringify(catalogo),
  });

  return variables;
}

function main() {
  const configFile = process.argv[2] || "config.json";
  const config = readJson(path.join(BASE, configFile));
  const raizPath = path.resolve(BASE, config.entrada.fuente);
  const outPath = path.resolve(BASE, config.salida.archivo);

  if (!fs.existsSync(raizPath)) {
    console.error("No existe la carpeta de entrada:", raizPath);
    process.exit(1);
  }

  const collection = {
    info: {
      _postman_id: crypto.randomUUID(),
      name: config.coleccion.name,
      description: config.coleccion.description,
      schema:
        "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: buildItems(raizPath),
  };

  const events = buildCollectionEvents(raizPath);
  if (events.length > 0) {
    collection.event = events;
  }

  const variables = buildCollectionVariables();
  if (variables && variables.length > 0) {
    collection.variable = variables;
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(collection, null, 2) + "\n", "utf8");

  console.log("Coleccion generada:", outPath);
  console.log("Requests/carpetas en item:", countItems(collection.item));
  if (variables) {
    const catalogo = variables.find((v) => v.key === "CATALOGO_GENERAL");
    if (catalogo) {
      const n = Object.keys(JSON.parse(catalogo.value)).length;
      console.log("CATALOGO_GENERAL: " + n + " codigos");
    }
  }
}

function countItems(items) {
  let n = 0;
  for (const it of items) {
    if (it.request) {
      n += 1;
    } else if (it.item) {
      n += countItems(it.item);
    }
  }
  return n;
}

main();
