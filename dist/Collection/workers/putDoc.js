(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'redux-saga/effects', '../../server/apiSagaWrapper', '../../types', '../../server/api', '../actions'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('redux-saga/effects'), require('../../server/apiSagaWrapper'), require('../../types'), require('../../server/api'), require('../actions'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.effects, global.apiSagaWrapper, global.types, global.api, global.actions);
    global.putDoc = mod.exports;
  }
})(this, function (exports, _effects, _apiSagaWrapper, _types, _api, _actions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = putDoc;

  var _types2 = _interopRequireDefault(_types);

  var _api2 = _interopRequireDefault(_api);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _marked = regeneratorRuntime.mark(putDoc);

  var START = _types2.default.PUT_START;
  var FAILED = _types2.default.PUT_FAILED;
  var FAILED_NETWORK = _types2.default.PUT_FAILED_NETWORK;
  var FINISHED = _types2.default.PUT_FINISHED;

  function putDoc(action) {
    var _action$payload, targetName, schemaName, objectId, data, target, res, errType;

    return regeneratorRuntime.wrap(function putDoc$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, targetName = _action$payload.targetName, schemaName = _action$payload.schemaName, objectId = _action$payload.objectId, data = _action$payload.data;
            target = targetName || schemaName;
            _context.next = 4;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null }));

          case 4:
            return _context.delegateYield((0, _apiSagaWrapper.httpRequest)(_api2.default.updateObject, schemaName, objectId, data), 't0', 5);

          case 5:
            res = _context.t0;

            if (!res.error) {
              _context.next = 13;
              break;
            }

            errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
            _context.next = 10;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res }));

          case 10:
            console.error('putDoc err', schemaName, objectId, res.err);
            _context.next = 15;
            break;

          case 13:
            _context.next = 15;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: FINISHED, error: null }));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
});