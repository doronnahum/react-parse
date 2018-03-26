(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'regenerator-runtime', 'redux-saga/effects', '../../server/httpWrapper', '../../types', '../../server/api', '../../server/Logger', '../actions', '../../helpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('regenerator-runtime'), require('redux-saga/effects'), require('../../server/httpWrapper'), require('../../types'), require('../../server/api'), require('../../server/Logger'), require('../actions'), require('../../helpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regeneratorRuntime, global.effects, global.httpWrapper, global.types, global.api, global.Logger, global.actions, global.helpers);
    global.putDoc = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime, _effects, _httpWrapper, _types, _api, _Logger, _actions, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = putDoc;

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

  var _marked = _regeneratorRuntime2.default.mark(putDoc);

  var START = _types2.default.POST_START;
  var FAILED = _types2.default.POST_FAILED;
  var FAILED_NETWORK = _types2.default.POST_FAILED_NETWORK;
  var FINISHED = _types2.default.POST_FINISHED;

  function putDoc(action) {
    var _action$payload, targetName, schemaName, data, objectId, target, dataToSend, res, errType, info;

    return _regeneratorRuntime2.default.wrap(function putDoc$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, targetName = _action$payload.targetName, schemaName = _action$payload.schemaName, data = _action$payload.data, objectId = _action$payload.objectId;
            target = targetName || objectId;
            _context.next = 4;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null, loading: true }));

          case 4:
            dataToSend = (0, _helpers.removeImutableKeys)(data);
            return _context.delegateYield((0, _httpWrapper2.default)(_api2.default.updateObject, schemaName, objectId, data), 't0', 6);

          case 6:
            res = _context.t0;

            if (!res.error) {
              _context.next = 15;
              break;
            }

            errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;

            console.error('putDoc err', targetName, res.error);
            _Logger2.default.onError(action, errType);
            _context.next = 13;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res, loading: false }));

          case 13:
            _context.next = 19;
            break;

          case 15:
            info = {
              timestamp: Date.now(),
              schemaName: schemaName,
              objectId: objectId,
              data: dataToSend,
              resData: (0, _helpers.dig)(res, 'data.results[0]')
            };
            _context.next = 18;
            return (0, _effects.put)((0, _actions.setOnStore)({
              targetName: target,
              status: FINISHED,
              info: info,
              error: null,
              loading: false
            }));

          case 18:
            _Logger2.default.onSuccses(action, FINISHED);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  /* eslint no-unused-vars: "off" */
});