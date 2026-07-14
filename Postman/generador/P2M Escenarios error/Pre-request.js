// Pre-request de raíz — P2M Escenarios error
// Basado en Postman_documentacion/referenciaBase + Postman_documentacion/documentacion/scriptsRaizReferencia.md

(function () {
  const TIMEOUT_MS = 60000;

  function cvSet(key, value) {
    pm.collectionVariables.set(key, value);
  }

  function cvGet(key) {
    return pm.collectionVariables.get(key);
  }

  function resetRuntime() {
    [
      'PROCESAR_STATUS_CODE',
      'PROCESAR_RESPONSE_BODY',
      'PROCESAR_RESPONSE_TIME_MS',
      'PROCESAR_URL',
      'PROCESAR_REQUEST_BODY_CLARO',
      'PROCESAR_REQUEST_BODY_CIFRADO',
      'PROCESAR_RESPONSE_HEADERS',
      'PAYLOAD_ID_PETICION',
      'PAYLOAD_METODO',
      'PAYLOAD_ID_SOLICITUD_0',
      'FLOW_FAILED',
      'FLOW_ERROR',
      'END_POINT_TLD'
    ].forEach(function (key) {
      cvSet(key, '');
    });
  }

  // Serializa headers de una respuesta pm.sendRequest a JSON plano (para captura).
  function headersToJson(res) {
    try {
      if (res && res.headers && typeof res.headers.toObject === 'function') {
        return JSON.stringify(res.headers.toObject());
      }
    } catch (e) {
      // ignora, captura best-effort
    }
    return '';
  }

  function guardarTiemposProcesar(resProcesar) {
    const tiempo =
      resProcesar && resProcesar.responseTime != null
        ? Number(resProcesar.responseTime)
        : -1;
    cvSet('PROCESAR_RESPONSE_TIME_MS', String(tiempo));
  }

  function resolveEndPointTld() {
    const nivel = String(pm.environment.get('NIVEL_EJECUCION') || '')
      .trim()
      .toUpperCase();
    let sourceKey = 'END_POINT_TLD_P2M';

    if (nivel === 'MATRIZ') {
      sourceKey = 'END_POINT_TLD_MATRIZ';
    } else if (nivel === 'VALIDADOR') {
      sourceKey = 'END_POINT_TLD_VALIDADOR';
    } else if (nivel === 'P2M') {
      sourceKey = 'END_POINT_TLD_P2M';
    }

    const url = pm.environment.get(sourceKey) || '';
    cvSet('END_POINT_TLD', url);
    return { nivel: nivel, sourceKey: sourceKey, url: url };
  }

  function failFlow(error, detalle) {
    const body = JSON.stringify({ _error: error, _detalle: detalle });
    cvSet('FLOW_FAILED', '1');
    cvSet('FLOW_ERROR', body);
    cvSet('PROCESAR_STATUS_CODE', '-1');
    cvSet('PROCESAR_RESPONSE_BODY', body);
  }

  function is2xx(code) {
    return code >= 200 && code < 300;
  }

  function sendRequestAsync(options) {
    return new Promise(function (resolve, reject) {
      pm.sendRequest(
        Object.assign({}, options, { timeout: TIMEOUT_MS }),
        function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        }
      );
    });
  }

  async function obtenerTokenMatriz() {
    const authUrl = pm.environment.get('MATRIZ_AUTH_TOKEN_URL') || '';
    const apiKey = pm.environment.get('MATRIZ_API_KEY') || '';
    const secretKey = pm.environment.get('MATRIZ_SECRET_KEY') || '';

    const resToken = await sendRequestAsync({
      url: authUrl,
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: {
        mode: 'raw',
        raw: JSON.stringify({ apiKey: apiKey, secretKey: secretKey })
      }
    });

    if (!is2xx(resToken.code)) {
      throw new Error(
        'fallo /auth/token HTTP ' + resToken.code + ': ' + resToken.text()
      );
    }

    let tokenPayload;
    try {
      tokenPayload = resToken.json();
    } catch (parseError) {
      throw new Error('respuesta /auth/token no es JSON valido');
    }

    const accessToken = tokenPayload && tokenPayload.accessToken;
    if (!accessToken || String(accessToken).trim() === '') {
      throw new Error('respuesta /auth/token sin accessToken');
    }

    return String(accessToken);
  }

  function aplicarMutacionPostCifrar(obj, mutacion) {
    if (!mutacion || typeof mutacion !== 'object') {
      return;
    }
    if (mutacion.$eliminar) {
      const keys = Array.isArray(mutacion.$eliminar)
        ? mutacion.$eliminar
        : [mutacion.$eliminar];
      keys.forEach(function (key) {
        delete obj[key];
      });
    }
    Object.keys(mutacion).forEach(function (key) {
      if (key === '$eliminar') {
        return;
      }
      obj[key] = mutacion[key];
    });
  }

  resetRuntime();

  const rawBody =
    pm.request.body && pm.request.body.raw ? pm.request.body.raw : null;
  if (!rawBody) {
    return;
  }

  const param = pm.request.url.query.get('algoritmoCifrado');
  const algoritmoAes = pm.variables.replaceIn(param || '');
  pm.environment.set('ALGORITMO_AES', algoritmoAes);

  const envRequired = [
    { key: 'DOMAIN_TLD_VALIDADOR_DUMMY', value: pm.environment.get('DOMAIN_TLD_VALIDADOR_DUMMY') }
  ];
  const envMissing = envRequired
    .filter(function (item) {
      return !item.value || String(item.value).trim() === '';
    })
    .map(function (item) {
      return item.key;
    });

  if (!algoritmoAes) {
    envMissing.push('query algoritmoCifrado');
  }

  const endPoint = resolveEndPointTld();
  if (!endPoint.url || String(endPoint.url).trim() === '') {
    envMissing.push(endPoint.sourceKey);
  }

  if (endPoint.nivel === 'MATRIZ') {
    [
      'MATRIZ_AUTH_TOKEN_URL',
      'MATRIZ_API_KEY',
      'MATRIZ_SECRET_KEY'
    ].forEach(function (key) {
      const value = pm.environment.get(key);
      if (!value || String(value).trim() === '') {
        envMissing.push(key);
      }
    });
  }

  if (envMissing.length > 0) {
    failFlow(
      'configuracion incompleta',
      'Faltan variables de entorno: ' + envMissing.join(', ')
    );
    return;
  }

  const resolvedBody = pm.variables.replaceIn(rawBody);
  let payload = null;

  try {
    payload = JSON.parse(resolvedBody);
  } catch (parseError) {
    failFlow('body JSON invalido', parseError.message);
    return;
  }

  const bodyRawInvalido =
    payload && typeof payload.__envioBodyRawInvalido === 'string'
      ? payload.__envioBodyRawInvalido
      : null;
  if (bodyRawInvalido !== null) {
    const procesarUrlDirecto = endPoint.url;
    (async function runEnvioBodyRawInvalido() {
      try {
        const headersProcesar = { 'Content-Type': 'application/json' };
        if (endPoint.nivel === 'MATRIZ') {
          const accessToken = await obtenerTokenMatriz();
          headersProcesar.Authorization = 'Bearer ' + accessToken;
        }
        cvSet('PROCESAR_URL', String(procesarUrlDirecto));
        cvSet('PROCESAR_REQUEST_BODY_CLARO', String(bodyRawInvalido));
        cvSet('PROCESAR_REQUEST_BODY_CIFRADO', String(bodyRawInvalido));
        const resProcesar = await sendRequestAsync({
          url: procesarUrlDirecto,
          method: 'POST',
          header: headersProcesar,
          body: { mode: 'raw', raw: bodyRawInvalido }
        });
        cvSet('FLOW_FAILED', '0');
        cvSet('FLOW_ERROR', '');
        cvSet('PROCESAR_STATUS_CODE', String(resProcesar.code));
        cvSet('PROCESAR_RESPONSE_BODY', resProcesar.text());
        cvSet('PROCESAR_RESPONSE_HEADERS', headersToJson(resProcesar));
        guardarTiemposProcesar(resProcesar);
        pm.request.body.update(resProcesar.text());
        pm.request.headers.upsert({ key: 'Content-Type', value: 'application/json' });
      } catch (networkError) {
        failFlow(
          'error de red enviando body JSON invalido',
          networkError && networkError.message
            ? networkError.message
            : String(networkError)
        );
      }
    })();
    return;
  }

  const mutacionPostCifrar = payload.__mutacionPostCifrar || null;
  if (mutacionPostCifrar) {
    delete payload.__mutacionPostCifrar;
  }

  const bodyParaCifrar = JSON.stringify(payload);

  const idPeticion =
    payload && payload.peticion && payload.peticion.idPeticion
      ? payload.peticion.idPeticion
      : '';
  const metodo =
    payload && payload.peticion && payload.peticion.metodo
      ? payload.peticion.metodo
      : '';
  const idSolicitud =
    payload &&
    payload.peticion &&
    payload.peticion.solicitudes &&
    payload.peticion.solicitudes[0]
      ? payload.peticion.solicitudes[0].idSolicitud
      : '';

  cvSet('PAYLOAD_ID_PETICION', idPeticion);
  cvSet('PAYLOAD_METODO', metodo);
  cvSet('PAYLOAD_ID_SOLICITUD_0', idSolicitud);

  console.info(
    '[P2M raiz] NIVEL_EJECUCION=' +
      (endPoint.nivel || '(default P2M)') +
      ' END_POINT_TLD desde ' +
      endPoint.sourceKey +
      ' ALGORITMO_AES=' +
      algoritmoAes +
      ' idPeticion=' +
      idPeticion +
      ' metodo=' +
      metodo +
      ' idSolicitud=' +
      idSolicitud
  );

  const cifrarUrl = pm.variables.replaceIn(
    '{{DOMAIN_TLD_VALIDADOR_DUMMY}}/cifrar?tld=1&algoritmoCifrado={{ALGORITMO_AES}}'
  );
  const procesarUrl = endPoint.url;

  (async function runFlow() {
    try {
      const resCifrar = await sendRequestAsync({
        url: cifrarUrl,
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: { mode: 'raw', raw: bodyParaCifrar }
      });

      if (!is2xx(resCifrar.code)) {
        failFlow(
          'fallo /cifrar',
          'HTTP ' + resCifrar.code + ': ' + resCifrar.text()
        );
        return;
      }

      let bodyProcesar = resCifrar.text();
      if (mutacionPostCifrar) {
        const cifrado = JSON.parse(bodyProcesar);
        aplicarMutacionPostCifrar(cifrado, mutacionPostCifrar);
        bodyProcesar = JSON.stringify(cifrado);
      }

      const headersProcesar = { 'Content-Type': 'application/json' };
      if (endPoint.nivel === 'MATRIZ') {
        const accessToken = await obtenerTokenMatriz();
        headersProcesar.Authorization = 'Bearer ' + accessToken;
      }

      cvSet('PROCESAR_URL', String(procesarUrl));
      cvSet('PROCESAR_REQUEST_BODY_CLARO', String(bodyParaCifrar));
      cvSet('PROCESAR_REQUEST_BODY_CIFRADO', String(bodyProcesar));

      const resProcesar = await sendRequestAsync({
        url: procesarUrl,
        method: 'POST',
        header: headersProcesar,
        body: { mode: 'raw', raw: bodyProcesar }
      });

      // HTTP 4xx/5xx del lambda pueden ser el escenario esperado (p. ej. idCanal → 400).
      // Solo falla el flujo ante error de red o respuesta ausente; /cifrar sigue exigiendo 2xx.
      cvSet('FLOW_FAILED', '0');
      cvSet('FLOW_ERROR', '');
      cvSet('PROCESAR_STATUS_CODE', String(resProcesar.code));
      cvSet('PROCESAR_RESPONSE_BODY', resProcesar.text());
      cvSet('PROCESAR_RESPONSE_HEADERS', headersToJson(resProcesar));
      guardarTiemposProcesar(resProcesar);
      pm.request.body.update(resProcesar.text());
      pm.request.headers.upsert({ key: 'Content-Type', value: 'application/json' });
    } catch (networkError) {
      failFlow(
        'error de red en flujo raiz',
        networkError && networkError.message
          ? networkError.message
          : String(networkError)
      );
    }
  })();
})();
