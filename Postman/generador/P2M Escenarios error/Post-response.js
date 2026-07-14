// Post-response (Tests) de raíz — P2M Escenarios error
// Basado en Postman_documentacion/referenciaBase + Postman_documentacion/documentacion/scriptsRaizReferencia.md

(function () {
  function cvGet(key) {
    return pm.collectionVariables.get(key);
  }

  function isVarMissing(name) {
    const value = pm.variables.get(name);
    return value === undefined || value === null || String(value).trim() === '';
  }

  function parseFlowError(raw) {
    if (!raw) {
      return 'sin detalle';
    }
    try {
      const parsed = JSON.parse(raw);
      if (parsed._error) {
        return parsed._error + ': ' + (parsed._detalle || '');
      }
    } catch (e) {
      // usar texto tal cual
    }
    return raw;
  }

  function resolveMensajeCatalogo(codigo) {
    const raw = cvGet('CATALOGO_GENERAL');
    if (!raw) {
      return {
        ok: false,
        error: 'Falta CATALOGO_GENERAL (regenerar coleccion con ensamblador)',
      };
    }
    let catalogo;
    try {
      catalogo = JSON.parse(raw);
    } catch (e) {
      return { ok: false, error: 'CATALOGO_GENERAL no es JSON valido' };
    }
    const mensaje = catalogo[String(codigo)];
    if (!mensaje) {
      return {
        ok: false,
        error: 'Codigo ' + codigo + ' no esta en CATALOGO_GENERAL',
      };
    }
    return { ok: true, mensaje: mensaje };
  }

  // ---------------------------------------------------------------------------
  // CAPTURA determinista: emite UN assert cuyo nombre es "[CAPTURA] " + JSON con
  // TODO lo capturado de esta ejecución. run-newman.js lo parsea (fuente autoritativa).
  // Siempre pasa y está envuelto en try/catch: nunca rompe el resto de asserts.
  // Se emite ANTES de cualquier `return` (requiredVars / flujo fallido) para que el
  // esperado (codigoErrorEsperado) quede registrado aunque el flujo reviente: así un
  // crash 500 se clasifica como divergente (esp vs null) y no como "sin evaluar".
  // ---------------------------------------------------------------------------
  (function emitirCaptura() {
    function cap(v, max) {
      if (v == null) return '';
      const s = String(v);
      return s.length > max ? s.slice(0, max) + '\u2026[+' + (s.length - max) + ']' : s;
    }

    // Clasifica si la lambda devolvió el cuerpo cifrado o en claro.
    // Decisión expert: PRIMARIO = estructura del payload (lo que emitió la API).
    // SECUNDARIO = heurística "¿cambió tras /descifrar?" (si no cambió, ya venía en claro;
    // el dummy solo descifra si `respuesta`/`peticion` es string — si no, hace echo).
    //   cifrado            → {"respuesta":"<iv.ciphertext hex>"} (dummy sí descifra)
    //   plano               → {"codigoError":N,...} en raíz (matriz / validador en claro)
    //   plano_en_respuesta  → {"respuesta":{...}} objeto (cifrado NO; error anidado en claro)
    //   desconocido / sin_respuesta / no_json
    function clasificarFormatoRespuestaLambda(respRaw, descBody) {
      const out = {
        respuestaVinoCifrada: null,
        formatoRespuestaLambda: 'sin_respuesta',
        payloadCambioTrasDescifrar: null,
      };
      const raw = respRaw == null ? '' : String(respRaw).trim();
      const desc = descBody == null ? '' : String(descBody).trim();
      if (!raw) {
        return out;
      }
      out.payloadCambioTrasDescifrar = desc.length > 0 ? raw !== desc : null;

      let parsed = null;
      try {
        parsed = JSON.parse(raw);
      } catch (e) {
        out.formatoRespuestaLambda = 'no_json';
        out.respuestaVinoCifrada = false;
        return out;
      }
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        out.formatoRespuestaLambda = 'desconocido';
        out.respuestaVinoCifrada = out.payloadCambioTrasDescifrar === true;
        return out;
      }

      // Dummy /descifrar solo intenta descifrar si respuesta (o peticion) es STRING.
      if (typeof parsed.respuesta === 'string' && parsed.respuesta.trim().length > 0) {
        out.formatoRespuestaLambda = 'cifrado';
        out.respuestaVinoCifrada = true;
        return out;
      }
      if (parsed.respuesta != null && typeof parsed.respuesta === 'object') {
        out.formatoRespuestaLambda = 'plano_en_respuesta';
        out.respuestaVinoCifrada = false;
        return out;
      }
      if (
        parsed.codigoError != null ||
        parsed.descripcionError != null ||
        parsed.mensajeError != null
      ) {
        out.formatoRespuestaLambda = 'plano';
        out.respuestaVinoCifrada = false;
        return out;
      }

      out.formatoRespuestaLambda = 'desconocido';
      if (out.payloadCambioTrasDescifrar === true) {
        out.respuestaVinoCifrada = true;
      } else if (out.payloadCambioTrasDescifrar === false) {
        out.respuestaVinoCifrada = false;
      }
      return out;
    }

    let descifradoBody = '';
    let descifradoCode = null;
    try {
      descifradoBody = pm.response ? pm.response.text() : '';
      descifradoCode = pm.response ? pm.response.code : null;
    } catch (e) {
      // best-effort
    }
    const respLambdaRawFull = cvGet('PROCESAR_RESPONSE_BODY');
    const fmt = clasificarFormatoRespuestaLambda(respLambdaRawFull, descifradoBody);
    const captura = {
      nivel: String(pm.environment.get('NIVEL_EJECUCION') || 'P2M').trim().toUpperCase(),
      url: cvGet('PROCESAR_URL') || '',
      httpRealLambda: cvGet('PROCESAR_STATUS_CODE'),
      httpEsperado: pm.variables.get('expectedHttpStatus'),
      codigoErrorEsperado: pm.variables.get('expectedCodigoError'),
      tipo: pm.variables.get('expectedTipo'),
      tiempoMs: cvGet('PROCESAR_RESPONSE_TIME_MS'),
      idPeticion: cvGet('PAYLOAD_ID_PETICION'),
      metodo: cvGet('PAYLOAD_METODO'),
      idSolicitud: cvGet('PAYLOAD_ID_SOLICITUD_0'),
      flowFailed: cvGet('FLOW_FAILED'),
      flowError: cap(cvGet('FLOW_ERROR'), 2000),
      reqClaro: cap(cvGet('PROCESAR_REQUEST_BODY_CLARO'), 6000),
      reqCifrado: cap(cvGet('PROCESAR_REQUEST_BODY_CIFRADO'), 6000),
      respLambdaRaw: cap(respLambdaRawFull, 6000),
      respLambdaHeaders: cap(cvGet('PROCESAR_RESPONSE_HEADERS'), 3000),
      descifradoCode: descifradoCode,
      descifradoBody: cap(descifradoBody, 6000),
      // ¿La lambda devolvió cifrado o en claro?
      respuestaVinoCifrada: fmt.respuestaVinoCifrada,
      formatoRespuestaLambda: fmt.formatoRespuestaLambda,
      payloadCambioTrasDescifrar: fmt.payloadCambioTrasDescifrar,
    };
    let json = '';
    try {
      json = JSON.stringify(captura);
    } catch (e) {
      json = '{"_capturaError":"' + String(e && e.message) + '"}';
    }
    pm.test('[CAPTURA] ' + json, function () {
      pm.expect(true).to.be.true;
    });
  })();

  const requiredVars = [
    'expectedHttpStatus',
    'expectedCodigoError',
    'expectedTipo',
  ];
  const missingVars = requiredVars.filter(isVarMissing);
  const tipo = pm.variables.get('expectedTipo');

  if (missingVars.length > 0) {
    pm.test(
      'Request mal configurado: faltan ' + missingVars.join(', '),
      function () {
        pm.expect.fail(
          'Definir en Pre-request del request: ' + missingVars.join(', ')
        );
      }
    );
    return;
  }

  const httpEsperado = Number(pm.variables.get('expectedHttpStatus'));
  const codigoEsperado = Number(pm.variables.get('expectedCodigoError'));

  if (cvGet('FLOW_FAILED') === '1') {
    const detalle = parseFlowError(
      cvGet('FLOW_ERROR') || cvGet('PROCESAR_RESPONSE_BODY')
    );
    pm.test('[Flujo raiz] fallo antes de /descifrar — ' + detalle, function () {
      pm.expect.fail(detalle);
    });
    return;
  }

  const httpReal = Number(cvGet('PROCESAR_STATUS_CODE'));
  // HTTP Code (capa transporte). La matriz de produccion SIEMPRE responde HTTP 200:
  // en NIVEL_EJECUCION=MATRIZ el HTTP Code esperado se fija en 200. El expectedHttpStatus
  // del escenario aplica a las otras rutas (VALIDADOR / directo). Esto NO toca el
  // codigo de respuesta del payload, que se verifica aparte.
  const nivelEjecucion = String(pm.environment.get('NIVEL_EJECUCION') || 'VCN')
    .trim()
    .toUpperCase();
  const httpEsperadoTransporte = nivelEjecucion === 'MATRIZ' ? 200 : httpEsperado;
  pm.test(
    '[Lambda P2M] HTTP status = ' +
      httpEsperadoTransporte +
      ' (' +
      nivelEjecucion +
      ', real: ' +
      httpReal +
      ')',
    function () {
      pm.expect(httpReal).to.equal(httpEsperadoTransporte);
    }
  );

  pm.test(
    '[Dummy /descifrar] HTTP status 2xx (real: ' + pm.response.code + ')',
    function () {
      pm.expect(pm.response.code).to.be.at.least(200).and.below(300);
    }
  );

  let json = null;
  try {
    json = pm.response.json();
  } catch (e) {
    // queda null
  }

  pm.test('[Dummy /descifrar] respuesta JSON parseable', function () {
    pm.expect(json, 'pm.response.json() fallo').to.not.be.null;
  });

  if (!json) {
    return;
  }

  const inner = (json && json.respuesta) || json;

  if (tipo === 'general') {
    const resolved = resolveMensajeCatalogo(codigoEsperado);
    pm.test(
      '[General] catalogo resuelve mensaje para codigo ' + codigoEsperado,
      function () {
        if (!resolved.ok) {
          pm.expect.fail(resolved.error);
        }
      }
    );
    if (!resolved.ok) {
      return;
    }

    const mensajeEsperado = resolved.mensaje;

    pm.test('[General] codigoError = ' + codigoEsperado, function () {
      pm.expect(inner.codigoError).to.equal(codigoEsperado);
    });
    pm.test('[General] mensajeError = "' + mensajeEsperado + '"', function () {
      pm.expect(inner.mensajeError).to.equal(mensajeEsperado);
    });
    return;
  }

  if (tipo === 'parametro' || tipo === 'metodo') {
    const resolved = resolveMensajeCatalogo(codigoEsperado);
    pm.test(
      '[' +
        tipo +
        '] catalogo resuelve referencia CloudWatch para codigo ' +
        codigoEsperado,
      function () {
        if (!resolved.ok) {
          pm.expect.fail(resolved.error);
        }
      }
    );
    if (!resolved.ok) {
      return;
    }

    const mensajeCloudWatch = resolved.mensaje;

    pm.test('[Dummy /descifrar] estructura inner.respuestas[0] presente', function () {
      pm.expect(inner)
        .to.have.property('respuestas')
        .that.is.an('array')
        .with.lengthOf.at.least(1);
    });

    const r0 = inner.respuestas && inner.respuestas[0];
    if (!r0) {
      return;
    }

    const idSolEsperado = cvGet('PAYLOAD_ID_SOLICITUD_0');

    pm.test(
      '[' + tipo + '] respuestas[0].idSolicitud = "' + idSolEsperado + '"',
      function () {
        pm.expect(r0.idSolicitud).to.equal(idSolEsperado);
      }
    );
    pm.test(
      '[' + tipo + '] respuestas[0].resultado = ' + codigoEsperado,
      function () {
        pm.expect(r0.resultado).to.equal(codigoEsperado);
      }
    );
    pm.test('[' + tipo + '] respuestas[0].datos es null o ausente', function () {
      pm.expect(r0.datos == null).to.be.true;
    });
    pm.test(
      '[' +
        tipo +
        '] CloudWatch — referencia (no en response): "' +
        mensajeCloudWatch +
        '"',
      function () {
        pm.expect(
          mensajeCloudWatch,
          'Referencia informativa para buscar en CloudWatch'
        )
          .to.be.a('string')
          .and.not.empty;
      }
    );
    return;
  }

  pm.test('expectedTipo invalido: "' + tipo + '"', function () {
    pm.expect.fail('Usar general, parametro o metodo');
  });
})();
