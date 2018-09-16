(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'regenerator-runtime', 'redux-saga/effects', '../../server/httpWrapper', '../../types', '../../server/api', '../actions', '../../server/Logger'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('regenerator-runtime'), require('redux-saga/effects'), require('../../server/httpWrapper'), require('../../types'), require('../../server/api'), require('../actions'), require('../../server/Logger'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regeneratorRuntime, global.effects, global.httpWrapper, global.types, global.api, global.actions, global.Logger);
    global.fetchDoc = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime, _effects, _httpWrapper, _types, _api, _actions, _Logger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = fetchDoc;

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

  var _marked = _regeneratorRuntime2.default.mark(fetchDoc);

  var START = _types2.default.FETCH_START;
  var FAILED = _types2.default.FETCH_FAILED;
  var FAILED_NETWORK = _types2.default.FETCH_FAILED_NETWORK;
  var FINISHED = _types2.default.FETCH_FINISHED;

  function fetchDoc(action) {
    var _action$payload, targetName, schemaName, objectId, include, keys, dataHandler, dispatchId, boomerang, target, _dispatchId, res, errType, info, _data, data;

    return _regeneratorRuntime2.default.wrap(function fetchDoc$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, targetName = _action$payload.targetName, schemaName = _action$payload.schemaName, objectId = _action$payload.objectId, include = _action$payload.include, keys = _action$payload.keys, dataHandler = _action$payload.dataHandler, dispatchId = _action$payload.dispatchId, boomerang = _action$payload.boomerang;
            target = targetName || objectId;
            _dispatchId = dispatchId || '';
            _context.next = 5;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null, loading: true, dispatchId: _dispatchId, boomerang: boomerang }));

          case 5:
            return _context.delegateYield((0, _httpWrapper2.default)(_api2.default.getObjectById, schemaName, objectId, keys, include), 't0', 6);

          case 6:
            res = _context.t0;

            if (!res.error) {
              _context.next = 15;
              break;
            }

            errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;

            console.error('get document err', objectId, res.error);
            _context.next = 12;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res, loading: false, dispatchId: _dispatchId, boomerang: boomerang }));

          case 12:
            _Logger2.default.onError('GET', action, errType, res);
            _context.next = 21;
            break;

          case 15:
            info = {
              timestamp: Date.now(),
              keys: keys,
              include: include,
              schemaName: schemaName
            };
            _data = res.data;
            data = dataHandler ? dataHandler(_data) : _data;
            _context.next = 20;
            return (0, _effects.put)((0, _actions.setOnStore)({
              targetName: target,
              status: FINISHED,
              data: data,
              info: info,
              error: null,
              loading: false,
              dispatchId: _dispatchId,
              boomerang: boomerang
            }));

          case 20:
            _Logger2.default.onSuccess('GET', action, FINISHED, res);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  /* eslint no-unused-vars: "off" */
});