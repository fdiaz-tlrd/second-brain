#!/usr/bin/env node
/**
 * Fusiona canales-dev-dynamo-export.json → canalesPruebas-dev.json
 * Uso (desde esta carpeta): node actualizar-desde-dynamo-export.js
 */

const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const EXPORT_FILE = path.join(DIR, "canales-dev-dynamo-export.json");
const CANALES_FILE = path.join(DIR, "canalesPruebas-dev.json");

function unmarshall(x) {
  if (x == null || typeof x !== "object") return x;
  if ("S" in x) return x.S;
  if ("N" in x) return Number(x.N);
  if ("BOOL" in x) return x.BOOL;
  if ("NULL" in x) return null;
  if ("L" in x) return x.L.map(unmarshall);
  if ("M" in x) {
    const o = {};
    for (const [k, v] of Object.entries(x.M)) o[k] = unmarshall(v);
    return o;
  }
  const o = {};
  for (const [k, v] of Object.entries(x)) o[k] = unmarshall(v);
  return o;
}

function shortKmsKey(arnOrKey) {
  if (!arnOrKey) return "";
  const m = String(arnOrKey).match(/key\/(mrk-[a-f0-9]+)/i);
  return m ? m[1] : arnOrKey;
}

function aesLabel(algo) {
  if (!algo) return null;
  return algo.includes("gcm") ? "gcm" : "cbc";
}

function buildValidador(canalRow, opsRows) {
  const c = unmarshall(canalRow);
  const ops = opsRows
    .map((r) => unmarshall(r.item))
    .sort((a, b) => a.operacion.localeCompare(b.operacion));

  const op0001 = ops.find((o) => o.operacion === "0001");
  const v = {
    algoritmoCifrado: c.algoritmoCifrado || null,
    algoritmoAes: c.algoritmoCifrado || null,
    alias: c.alias || null,
    tipoAuth: c.tipoAuth || null,
    useCertificado: c.useCertificado === true,
    estadoValidador: c.estadoValidador || null,
    urlValidador: c.urlValidador || "",
    llaveCifrado: c.llaveCifrado || null,
    llaveDescifrado: shortKmsKey(c.llaveDescifrado),
  };

  if (c.nombre) v.nombre = c.nombre;
  if (c.canalNombre) v.canalNombre = c.canalNombre;
  if (c.codigoExp) v.codigoExp = c.codigoExp;
  if (c.urlAuth) v.urlAuth = c.urlAuth;
  if (c.jpathToken) v.jpathToken = c.jpathToken;
  if (c.jpathTiempo) v.jpathTiempo = c.jpathTiempo;
  if (c.apiKey) v.validadorApiKey = c.apiKey;

  if (ops.length > 0) {
    v.operaciones = ops.map((o) => ({
      operacion: o.operacion,
      estado: o.estado,
      urlOperacion: o.urlOperacion || "",
      validarEnmascaramiento: o.validarEnmascaramiento || null,
    }));
    if (op0001 && op0001.urlOperacion) {
      v.urlOperacion0001 = op0001.urlOperacion;
    }
  }

  return v;
}

function buildPlan(planRow) {
  if (!planRow) return null;
  const p = unmarshall(planRow.item);
  return {
    idPlan: p.idPlan,
    idPlanCanal: p.idPlanCanal,
    namePlan: p.namePlan || "Plan dev GATO",
    estatus: p.estatus,
    exitoso: p.exitoso != null ? Number(p.exitoso) : 0,
    fallido: p.fallido != null ? Number(p.fallido) : 0,
    bloqueado: p.bloqueado != null ? Number(p.bloqueado) : 0,
    fechaFin: p.fechaFin,
    fechaHora: p.fechaHora,
    ...(p.idTransaccionAutopista != null
      ? { idTransaccionAutopista: Number(p.idTransaccionAutopista) }
      : {}),
  };
}

function main() {
  const base = JSON.parse(fs.readFileSync(CANALES_FILE, "utf8"));
  const exp = JSON.parse(fs.readFileSync(EXPORT_FILE, "utf8"));

  const canalById = new Map();
  for (const row of exp["tld-validador-canal"]) {
    canalById.set(row.idCanal, row.item);
  }

  const opsByCanal = new Map();
  for (const row of exp["tld-validador-canal-operacion"]) {
    if (!opsByCanal.has(row.idCanal)) opsByCanal.set(row.idCanal, []);
    opsByCanal.get(row.idCanal).push(row);
  }

  const planByCanal = new Map();
  for (const row of exp["tld-matriz-planes-canales"]) {
    planByCanal.set(row.idCanal, row);
  }

  const sinRegistro = exp.sinRegistro || [];
  const fecha = exp.meta.generadoEn.slice(0, 10);

  base.actualizado = fecha;
  base.dynamoExport = {
    generadoEn: exp.meta.generadoEn,
    region: exp.meta.region,
    resumen: exp.resumen,
    sinRegistro,
  };

  const ordenIds = exp.meta.canalesConsultados.filter((id) => id !== "0001");
  const existing = new Map(base.canales.map((c) => [c.idCanal, c]));

  const merged = [];

  // 0001 — validador central VCN (no está en matriz GATO)
  if (canalById.has("0001")) {
    const prev = existing.get("0001") || {
      idCanal: "0001",
      swiftCode: "MIDLPAPA",
      escenarioPostman: { variable: "CANAL_VALIDADOR", rol: "validador central VCN" },
      matriz: null,
      credenciales: null,
      cognito: { grupos: null },
      plan: null,
    };
    prev.validador = buildValidador(canalById.get("0001"), opsByCanal.get("0001") || []);
    merged.push(prev);
  }

  for (const id of ordenIds) {
    const prev = existing.get(id);
    if (!prev) continue;

    const canalRow = canalById.get(id);
    if (canalRow) {
      prev.validador = buildValidador(canalRow, opsByCanal.get(id) || []);
    }

    if (planByCanal.has(id)) {
      prev.plan = buildPlan(planByCanal.get(id));
    } else if (!prev.sinPlan && !prev.malConfigurado) {
      prev.plan = null;
    }

    merged.push(prev);
  }

  base.canales = merged;
  fs.writeFileSync(CANALES_FILE, JSON.stringify(base, null, 2) + "\n");
  console.log("Actualizado", CANALES_FILE, "desde", EXPORT_FILE);
  console.log("Canales:", merged.length, "| sinRegistro:", sinRegistro.length);
}

main();
