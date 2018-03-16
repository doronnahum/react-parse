(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'redux-saga/effects', '../../server/apiSagaWrapper', '../../types', '../../server/api', '../actions', '../../helpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('redux-saga/effects'), require('../../server/apiSagaWrapper'), require('../../types'), require('../../server/api'), require('../actions'), require('../../helpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.effects, global.apiSagaWrapper, global.types, global.api, global.actions, global.helpers);
    global.postDoc = mod.exports;
  }
})(this, function (exports, _effects, _apiSagaWrapper, _types, _api, _actions, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = postDoc;

  var _types2 = _interopRequireDefault(_types);

  var _api2 = _interopRequireDefault(_api);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _marked = regeneratorRuntime.mark(postDoc);

  var START = _types2.default.POST_START;
  var FAILED = _types2.default.POST_FAILED;
  var FAILED_NETWORK = _types2.default.POST_FAILED_NETWORK;
  var FINISHED = _types2.default.POST_FINISHED;

  function postDoc(action) {
    var _action$payload, targetName, schemaName, data, res, errType, info;

    return regeneratorRuntime.wrap(function postDoc$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, targetName = _action$payload.targetName, schemaName = _action$payload.schemaName, data = _action$payload.data;
            _context.next = 3;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: targetName, status: START, error: null }));

          case 3:
            return _context.delegateYield((0, _apiSagaWrapper.httpRequest)(_api2.default.createObject, schemaName, data), 't0', 4);

          case 4:
            res = _context.t0;

            if (!res.error) {
              _context.next = 12;
              break;
            }

            errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;

            console.error('deleteDoc err', targetName, res.error);
            _context.next = 10;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: targetName, status: errType, error: res }));

          case 10:
            _context.next = 15;
            break;

          case 12:
            info = {
              timestamp: Date.now(),
              schemaName: schemaName,
              objectId: res.data.objectId,
              data: data,
              resData: (0, _helpers.dig)(res, 'data.results[0]')
            };
            _context.next = 15;
            return (0, _effects.put)((0, _actions.setOnStore)({
              targetName: targetName,
              status: FINISHED,
              info: info,
              error: null
            }));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  // worker
});