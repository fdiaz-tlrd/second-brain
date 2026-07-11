'use strict';

/*
 * Helper de estudio para APIs Telered Marketplace.
 *
 * Objetivo:
 * - Separar endpoints HTTP reales de "operaciones documentales" usadas para explicar
 *   mensajes descifrados dentro de un envelope cifrado.
 * - Detectar paths sospechosos (espacios finales, paths sintéticos como /0001).
 * - Listar schemas que representan contenido cifrado vs contenido claro.
 *
 * Uso desde second-brain:
 *   node telered_content_mktpl/helper-inventario-openapi-multiplexado.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..', 'telered_content_mktpl');
const SPEC = path.join(ROOT, 'tech_doc', 'api_4.json');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function refName(ref) {
  return typeof ref === 'string' ? ref.replace('#/components/schemas/', '') : null;
}

function classifyPath(pathKey) {
  if (pathKey === '/auth/token') return 'endpoint-real-auth';
  if (pathKey === '/validador/validar') return 'endpoint-real-multiplexado-cifrado';
  if (/^\/validador\/validar\s+$/.test(pathKey)) return 'operacion-documental-metodo-descifrado';
  if (/^\/\d{4}\s+$/.test(pathKey)) return 'operacion-documental-canal-validador-descifrado';
  if (/^\/\d{4}$/.test(pathKey)) return 'operacion-documental-canal-validador-envelope';
  return 'revisar';
}

function schemaRefs(operation) {
  const req = operation.requestBody?.content?.['application/json']?.schema?.$ref;
  const res = {};
  for (const [code, response] of Object.entries(operation.responses || {})) {
    res[code] = refName(response.content?.['application/json']?.schema?.$ref);
  }
  return {
    request: refName(req),
    responses: res,
  };
}

function schemaKind(name, schema) {
  const props = schema.properties || {};
  if (props.peticion?.type === 'string' || props.respuesta?.type === 'string') {
    return 'envelope-cifrado';
  }
  if (props.peticion?.type === 'object' || props.respuestas || props.idPeticion) {
    return 'payload-descifrado';
  }
  return 'otro';
}

const doc = readJson(SPEC);

console.log('# Inventario api_4 - endpoints vs metodos documentales\n');
for (const [pathKey, methods] of Object.entries(doc.paths || {})) {
  for (const [method, operation] of Object.entries(methods)) {
    const refs = schemaRefs(operation);
    console.log(`- ${method.toUpperCase()} ${JSON.stringify(pathKey)} [${classifyPath(pathKey)}]`);
    console.log(`  tag: ${(operation.tags || []).join(', ')}`);
    console.log(`  operationId: ${operation.operationId || ''}`);
    console.log(`  request: ${refs.request || '-'}`);
    console.log(`  responses: ${JSON.stringify(refs.responses)}`);
  }
}

console.log('\n# Schemas\n');
for (const [name, schema] of Object.entries(doc.components?.schemas || {})) {
  console.log(`- ${name}: ${schemaKind(name, schema)}`);
}
