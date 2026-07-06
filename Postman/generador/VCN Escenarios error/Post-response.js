// Post-response (Tests) de raíz — VCN Escenarios error
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
  pm.test(
    '[Lambda VCN] HTTP status = ' + httpEsperado + ' (real: ' + httpReal + ')',
    function () {
      pm.expect(httpReal).to.equal(httpEsperado);
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

  function enmascararTitular(titular) {
    return titular
      .split(' ')
      .filter(function (word) {
        return word.length > 0;
      })
      .map(function (word) {
        const len = word.length;
        if (len === 1) {
          return word;
        }
        const cantAsteriscos = Math.trunc(len / 2);
        if (cantAsteriscos === 0) {
          return word;
        }
        return (
          word.slice(0, len - cantAsteriscos) + '*'.repeat(cantAsteriscos)
        );
      })
      .join(' ');
  }

  function parseTitularesClaro() {
    const raw = pm.variables.get('expectedTitularesClaro');
    if (!raw) {
      return null;
    }
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return null;
      }
      return parsed;
    } catch (e) {
      return null;
    }
  }

  if (tipo === 'exito') {
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
    const productoEsperado = pm.variables.get('expectedProducto');
    const cuentaEsperada = pm.variables.get('expectedCuenta');
    const bancoEsperado = pm.variables.get('expectedBanco');
    const enmascarado =
      pm.variables.get('expectedEnmascarado') === 'true';
    const titularesClaro = parseTitularesClaro();
    const titularesExactos = pm.variables.get('expectedTitularesExactos');
    const cuentaLongitud = pm.variables.get('expectedCuentaLongitud');
    const verificarUnicode = pm.variables.get('verificarUnicode') === 'true';
    const datos = r0.datos;

    pm.test(
      '[exito] respuestas[0].idSolicitud = "' + idSolEsperado + '"',
      function () {
        pm.expect(r0.idSolicitud).to.equal(idSolEsperado);
      }
    );
    pm.test('[exito] respuestas[0].resultado = 0', function () {
      pm.expect(r0.resultado).to.equal(0);
    });
    pm.test('[exito] respuestas[0].datos es objeto', function () {
      pm.expect(datos).to.be.an('object').and.not.null;
    });
    pm.test(
      '[exito] datos incluye banco, cuenta, producto, estadoCuenta, titulares',
      function () {
        pm.expect(datos).to.include.keys(
          'banco',
          'cuenta',
          'producto',
          'estadoCuenta',
          'titulares'
        );
        pm.expect(datos.titulares).to.be.an('array').that.is.not.empty;
        pm.expect(datos.estadoCuenta).to.equal('0');
      }
    );

    if (cuentaEsperada) {
      pm.test(
        '[exito] datos.cuenta = cuenta pedida "' + cuentaEsperada + '"',
        function () {
          pm.expect(String(datos.cuenta)).to.equal(String(cuentaEsperada));
        }
      );
    }

    if (bancoEsperado) {
      pm.test(
        '[exito] datos.banco = "' + bancoEsperado + '"',
        function () {
          pm.expect(datos.banco).to.equal(bancoEsperado);
        }
      );
    }

    pm.test('[exito] datos.cuenta solo digitos', function () {
      pm.expect(String(datos.cuenta)).to.match(/^\d+$/);
    });

    if (cuentaLongitud) {
      pm.test(
        '[exito] datos.cuenta longitud = ' + cuentaLongitud,
        function () {
          pm.expect(String(datos.cuenta).length).to.equal(
            Number(cuentaLongitud)
          );
        }
      );
    }

    if (productoEsperado) {
      pm.test(
        '[exito] datos.producto = "' + productoEsperado + '"',
        function () {
          pm.expect(datos.producto).to.equal(productoEsperado);
        }
      );
    } else {
      pm.test('[exito] datos.producto es PACA o PACC', function () {
        pm.expect(datos.producto).to.be.oneOf(['PACA', 'PACC']);
      });
    }

    if (titularesExactos) {
      pm.test(
        '[exito] titulares.length = ' + titularesExactos,
        function () {
          pm.expect(datos.titulares.length).to.equal(
            Number(titularesExactos)
          );
        }
      );
    }

    pm.test('[exito] cada titular no vacio', function () {
      datos.titulares.forEach(function (titular, index) {
        pm.expect(
          titular,
          'titulares[' + index + '] vacio o no string'
        )
          .to.be.a('string')
          .and.not.empty;
        pm.expect(titular.trim(), 'titulares[' + index + '] solo espacios')
          .to.not.equal('');
      });
    });

    if (verificarUnicode) {
      pm.test(
        '[exito] titulares sin corrupcion Unicode (±, Ã, Â)',
        function () {
          datos.titulares.forEach(function (titular, index) {
            pm.expect(
              titular,
              'titulares[' + index + '] contiene ±'
            ).to.not.include('±');
            pm.expect(
              titular,
              'titulares[' + index + '] contiene Ã'
            ).to.not.include('Ã');
            pm.expect(
              titular,
              'titulares[' + index + '] contiene Â'
            ).to.not.include('Â');
          });
        }
      );
    }

    if (titularesClaro) {
      pm.test(
        '[exito] titulares.length coincide con seed Dynamo',
        function () {
          pm.expect(datos.titulares.length).to.equal(titularesClaro.length);
        }
      );

      if (enmascarado) {
        pm.test(
          '[exito] titulares enmascarados segun util.js (floor(len/2) por palabra)',
          function () {
            const esperados = titularesClaro.map(enmascararTitular);
            pm.expect(datos.titulares).to.deep.equal(esperados);
          }
        );

        pm.test(
          '[exito] titulares no vienen en claro (enmascaramiento aplicado)',
          function () {
            titularesClaro.forEach(function (claro, index) {
              pm.expect(
                datos.titulares[index],
                'titular[' + index + '] igual al seed en claro'
              ).to.not.equal(claro);
            });
          }
        );

        pm.test(
          '[exito] cada titular contiene asteriscos de enmascaramiento',
          function () {
            datos.titulares.forEach(function (titular, index) {
              const claro = titularesClaro[index];
              const tienePalabraEnmascarable = claro
                .split(' ')
                .some(function (word) {
                  return word.length > 1 && Math.trunc(word.length / 2) > 0;
                });
              if (tienePalabraEnmascarable) {
                pm.expect(
                  titular,
                  'titulares[' + index + '] sin asteriscos'
                ).to.include('*');
              }
            });
          }
        );
      } else {
        pm.test(
          '[exito] titulares en claro segun seed Dynamo',
          function () {
            pm.expect(datos.titulares).to.deep.equal(titularesClaro);
          }
        );

        pm.test(
          '[exito] titulares sin enmascaramiento (sin asteriscos)',
          function () {
            datos.titulares.forEach(function (titular, index) {
              pm.expect(
                titular,
                'titulares[' + index + '] contiene mascara'
              ).to.not.include('*');
            });
          }
        );
      }
    }

    return;
  }

  pm.test('expectedTipo invalido: "' + tipo + '"', function () {
    pm.expect.fail('Usar general, parametro, metodo o exito');
  });
})();
