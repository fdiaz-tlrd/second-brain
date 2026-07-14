#!/usr/bin/env node
/**
 * Audita (y opcionalmente corrige) escenarios *propiedad_ausente* que aún
 * incluyen la propiedad en el cuerpo enviado / en claro de metodo.
 *
 * Excepción: si `body.__mutacionPostCifrar.$eliminar` === campo, la presencia
 * del campo en el JSON es andamiaje para cifrar; en el wire se elimina.
 * Esos escenarios NO se marcan ni se tocan.
 *
 * Uso:
 *   node auditar-propiedad-ausente.js
 *   node auditar-propiedad-ausente.js --fix
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SUITES = ["P2P Escenarios error", "P2M Escenarios error", "VCN Escenarios error"];

function walk(dir, acc) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/propiedad_ausente\.json$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

/** Extrae el nombre del campo desde el basename del archivo. */
function fieldFromFilename(basename) {
  const m = basename.match(/^\d+(?:\.\d+)?_(.+)_propiedad_ausente\.json$/i);
  return m ? m[1] : null;
}

function hasOwn(obj, key) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
}

/** True si la ausencia en wire se logra vía mutación post-cifrado. */
function mutacionEliminaCampo(body, field) {
  const m = body && body.__mutacionPostCifrar;
  return m != null && m.$eliminar === field;
}

function locateField(body, field) {
  if (!body || typeof body !== "object") return null;
  if (hasOwn(body, field)) return { path: "body", obj: body };
  if (body.peticion && hasOwn(body.peticion, field)) {
    return { path: "peticion", obj: body.peticion };
  }
  const s0 =
    body.peticion &&
    Array.isArray(body.peticion.solicitudes) &&
    body.peticion.solicitudes[0]
      ? body.peticion.solicitudes[0]
      : null;
  if (s0 && hasOwn(s0, field)) return { path: "solicitud", obj: s0 };
  if (s0 && s0.parametros && hasOwn(s0.parametros, field)) {
    return { path: "parametros", obj: s0.parametros };
  }
  return null;
}

function auditAndFix(fix) {
  const files = [];
  for (const suite of SUITES) {
    walk(path.join(ROOT, suite), files);
  }

  const bad = [];
  const skippedMutation = [];
  let fixed = 0;

  for (const file of files) {
    const field = fieldFromFilename(path.basename(file));
    if (!field) {
      console.warn("NO_PARSE", file);
      continue;
    }
    const raw = fs.readFileSync(file, "utf8");
    const doc = JSON.parse(raw);
    if (mutacionEliminaCampo(doc.body, field)) {
      skippedMutation.push(path.relative(ROOT, file).replace(/\\/g, "/"));
      continue;
    }
    const loc = locateField(doc.body, field);
    if (!loc) continue;

    bad.push({
      file: path.relative(ROOT, file).replace(/\\/g, "/"),
      field,
      path: loc.path,
    });

    if (fix) {
      delete loc.obj[field];
      fs.writeFileSync(file, JSON.stringify(doc, null, 2) + "\n", "utf8");
      fixed++;
    }
  }

  return { totalAusente: files.length, bad, fixed, skippedMutation };
}

const doFix = process.argv.includes("--fix");
const result = auditAndFix(doFix);
console.log(
  JSON.stringify(
    {
      totalAusente: result.totalAusente,
      malArmados: result.bad.length,
      corregidos: result.fixed,
      skippedMutacionEliminar: result.skippedMutation.length,
      archivos: result.bad,
      skippedMutation: result.skippedMutation,
    },
    null,
    2
  )
);
