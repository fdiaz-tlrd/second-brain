#!/usr/bin/env node
/**
 * Verifica el comportamiento de `validarParametroSolicitudes` del repo dev
 * `tld-validador-api/lambdas/validar/lib/validador.js` tras aplicar HP-012/013/014.
 *
 * - HP-012: idSolicitud inválido/ausente/duplicado → 431 (antes 404, que colisiona con "Validador no existe").
 * - HP-013: charset (alfanumérico + guion, ≥1 alfanumérico) → 431 (antes pasaba y reventaba en 509).
 * - HP-014: elemento null/no-objeto en solicitudes[] → 431 sin crash (antes crasheaba → 999).
 *
 * Carga el MÓDULO REAL (no una copia) inyectando el node_modules del layer, así prueba
 * el código que se despliega, no una reimplementación.
 *
 * Uso: node verificar-validarParametroSolicitudes.js
 */

const path = require("path");
const Module = require("module");

const layerNodeModules = path.resolve(
  __dirname,
  "../../tld-validador-api/lambdas/layer/nodejs/node_modules",
);
process.env.NODE_PATH = layerNodeModules + path.delimiter + (process.env.NODE_PATH || "");
process.env.AWS_REGION = process.env.AWS_REGION || "us-east-1";
// Env vars exigidas al cargar el módulo (variablesEntorno.js fail-fast). No las usa
// `validarParametroSolicitudes`; solo permiten importar el módulo real fuera de Lambda.
process.env.PRINT_LOGS = process.env.PRINT_LOGS || "off";
process.env.DB_VALIDADOR_CANAL = process.env.DB_VALIDADOR_CANAL || "dummy-canal";
process.env.DB_CANAL_LLAVE = process.env.DB_CANAL_LLAVE || "dummy-llave";
Module._initPaths();

const validadorPath = path.resolve(
  __dirname,
  "../../tld-validador-api/lambdas/validar/lib/validador.js",
);
const { validarParametroSolicitudes } = require(validadorPath);

const s = (id) => ({ idSolicitud: id });

const casos = [
  // válidos → 0 (sin tope de cantidad en validador-api; eso lo decide cada producto)
  { nombre: "válido simple", sol: [s("sol-001")], esperado: 0 },
  { nombre: "válido alfanumérico", sol: [s("ABC123")], esperado: 0 },
  { nombre: "válido con guiones internos", sol: [s("a-b-c-1")], esperado: 0 },
  { nombre: "válido 64 chars", sol: [s("a".repeat(64))], esperado: 0 },
  { nombre: "válidos distintos (sin duplicado)", sol: [s("AB"), s("CD")], esperado: 0 },
  { nombre: "array vacío (cantidad → producto)", sol: [], esperado: 0 },
  { nombre: "más de 3 ítems (cantidad → producto)", sol: [s("a"), s("b"), s("c"), s("d")], esperado: 0 },

  // HP-012 → 431
  { nombre: "HP-012 idSolicitud ausente", sol: [{}], esperado: 431 },
  { nombre: "HP-012 idSolicitud vacío", sol: [s("")], esperado: 431 },
  { nombre: "HP-012 solo espacios", sol: [s("   ")], esperado: 431 },
  { nombre: "HP-012 no-string (number)", sol: [s(123)], esperado: 431 },
  { nombre: "HP-012 > 64 chars", sol: [s("a".repeat(65))], esperado: 431 },
  { nombre: "HP-012 duplicado case-insensitive", sol: [s("AB"), s("ab")], esperado: 431 },

  // HP-013 charset → 431
  { nombre: "HP-013 guion bajo", sol: [s("id_001")], esperado: 431 },
  { nombre: "HP-013 espacio interno", sol: [s("id 001")], esperado: 431 },
  { nombre: "HP-013 arroba", sol: [s("id@001")], esperado: 431 },
  { nombre: "HP-013 punto", sol: [s("id.001")], esperado: 431 },
  { nombre: "HP-013 slash", sol: [s("id/001")], esperado: 431 },
  { nombre: "HP-013 solo un guion", sol: [s("-")], esperado: 431 },
  { nombre: "HP-013 solo guiones", sol: [s("---")], esperado: 431 },

  // HP-014 null / no-objeto → 431 sin crash
  { nombre: "HP-014 elemento null", sol: [null], esperado: 431 },
  { nombre: "HP-014 elemento string", sol: ["foo"], esperado: 431 },
  { nombre: "HP-014 elemento number", sol: [42], esperado: 431 },

  // forma de solicitudes (no es tope de cantidad)
  { nombre: "400 no-array", sol: null, esperado: 400 },
];

let ok = 0;
let fail = 0;

for (const c of casos) {
  let real;
  try {
    real = validarParametroSolicitudes(c.sol).statusCode;
  } catch (e) {
    real = "CRASH: " + e.message;
  }
  if (real === c.esperado) {
    console.log("OK   " + c.nombre + "  → " + real);
    ok++;
  } else {
    console.log("FAIL " + c.nombre + "  esperado " + c.esperado + ", recibido " + real);
    fail++;
  }
}

console.log("\n" + ok + " ok, " + fail + " fail");
process.exit(fail > 0 ? 1 : 0);
