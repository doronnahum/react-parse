(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'regenerator-runtime', 'redux-saga/effects', '../../server/httpWrapper', '../../types', '../../server/api', '../../server/Logger', '../actions'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('regenerator-runtime'), require('redux-saga/effects'), require('../../server/httpWrapper'), require('../../types'), require('../../server/api'), require('../../server/Logger'), require('../actions'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regeneratorRuntime, global.effects, global.httpWrapper, global.types, global.api, global.Logger, global.actions);
    global.deleteDoc = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime, _effects, _httpWrapper, _types, _api, _Logger, _actions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = deleteDoc;

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

  var _marked = _regeneratorRuntime2.default.mark(deleteDoc);

  var START = _types2.default.DELETE_START;
  var FAILED = _types2.default.DELETE_FAILED;
  var FAILED_NETWORK = _types2.default.DELETE_FAILED_NETWORK;
  var FINISHED = _types2.default.DELETE_FINISHED;

  function deleteDoc(action) {
    var _action$payload, targetName, schemaName, objectId, autoRefresh, dispatchId, boomerang, _dispatchId, target, res, errType;

    return _regeneratorRuntime2.default.wrap(function deleteDoc$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, targetName = _action$payload.targetName, schemaName = _action$payload.schemaName, objectId = _action$payload.objectId, autoRefresh = _action$payload.autoRefresh, dispatchId = _action$payload.dispatchId, boomerang = _action$payload.boomerang;
            _dispatchId = dispatchId || '';
            target = targetName || schemaName;
            _context.next = 5;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null, loading: true, dispatchId: _dispatchId, boomerang: boomerang }));

          case 5:
            return _context.delegateYield((0, _httpWrapper2.default)(_api2.default.deleteObject, schemaName, objectId), 't0', 6);

          case 6:
            res = _context.t0;

            if (!res.error) {
              _context.next = 15;
              break;
            }

            errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;

            console.error('deleteDoc err', schemaName, objectId, res.err);
            _context.next = 12;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res, loading: false, dispatchId: _dispatchId, boomerang: boomerang }));

          case 12:
            _Logger2.default.onError('DELETE', action, errType, res);
            _context.next = 21;
            break;

          case 15:
            _context.next = 17;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: FINISHED, error: null, loading: false, dispatchId: _dispatchId, boomerang: boomerang, info: { deleteDocId: objectId } }));

          case 17:
            _Logger2.default.onSuccess('DELETE', action, FINISHED, res);

            if (!autoRefresh) {
              _context.next = 21;
              break;
            }

            _context.next = 21;
            return (0, _effects.put)((0, _actions.refreshCollection)({ targetName: target }));

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  /* eslint no-unused-vars: "off" */
});