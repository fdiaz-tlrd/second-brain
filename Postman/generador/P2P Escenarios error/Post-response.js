// Post-response (Tests) de raíz — P2P Escenarios error
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
    '[Lambda P2P] HTTP status = ' +
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
