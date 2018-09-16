(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'regenerator-runtime', 'redux-saga/effects', '../server/httpWrapper', '../types', '../server/api', '../helpers', './actions', '../server/Logger'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('regenerator-runtime'), require('redux-saga/effects'), require('../server/httpWrapper'), require('../types'), require('../server/api'), require('../helpers'), require('./actions'), require('../server/Logger'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regeneratorRuntime, global.effects, global.httpWrapper, global.types, global.api, global.helpers, global.actions, global.Logger);
    global.saga = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime, _effects, _httpWrapper, _types, _api, _helpers, _actions, _Logger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = fetchCloudCode;

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _httpWrapper2 = _interopRequireDefault(_httpWrapper);

  var _types2 = _interopRequireDefault(_types);

  var _api2 = _interopRequireDefault(_api);

  var _Logger2 = _interopRequireDefault(_Logger);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _marked = _regeneratorRuntime2.default.mark(fetchCloudCode);

  var START = _types2.default.FETCH_START;
  var FAILED = _types2.default.FETCH_FAILED;
  var FAILED_NETWORK = _types2.default.FETCH_FAILED_NETWORK;
  var FINISHED = _types2.default.FETCH_FINISHED;

  function fetchCloudCode(action) {
    var _action$payload, functionName, targetName, params, digToData, dataHandler, dispatchId, _digToData, target, _dispatchId, res, errType, _data, data;

    return _regeneratorRuntime2.default.wrap(function fetchCloudCode$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, functionName = _action$payload.functionName, targetName = _action$payload.targetName, params = _action$payload.params, digToData = _action$payload.digToData, dataHandler = _action$payload.dataHandler, dispatchId = _action$payload.dispatchId;
            _digToData = digToData || 'data.result';
            target = targetName || functionName;
            _dispatchId = dispatchId || '';
            _context.next = 6;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null, loading: true, dispatchId: _dispatchId }));

          case 6:
            _context.next = 8;
            return (0, _httpWrapper2.default)(_api2.default.getCloudFunction, functionName, params);

          case 8:
            res = _context.sent;

            if (!(res.error || (0, _helpers.dig)(res, 'response.data.error'))) {
              _context.next = 17;
              break;
            }

            errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
            _context.next = 13;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res, loading: false, dispatchId: _dispatchId }));

          case 13:
            console.error('getCloudFunction err: ', functionName, res.error);
            _Logger2.default.onError('CLOUD_CODE', action, errType, res);
            _context.next = 22;
            break;

          case 17:
            _data = (0, _helpers.dig)(res, _digToData);
            data = dataHandler ? dataHandler(_data) : _data;
            _context.next = 21;
            return (0, _effects.put)((0, _actions.setOnStore)({
              targetName: target,
              status: FINISHED,
              error: null,
              data: data,
              info: {
                params: params,
                timestamp: Date.now()
              },
              loading: false,
              dispatchId: _dispatchId
            }));

          case 21:
            _Logger2.default.onSuccess('CLOUD_CODE', action, FINISHED, res);

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  /* eslint no-unused-vars: "off" */
});