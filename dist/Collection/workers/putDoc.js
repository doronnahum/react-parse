(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'regenerator-runtime', 'redux-saga/effects', '../../types', '../../server', '../actions', '../../helpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('regenerator-runtime'), require('redux-saga/effects'), require('../../types'), require('../../server'), require('../actions'), require('../../helpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regeneratorRuntime, global.effects, global.types, global.server, global.actions, global.helpers);
    global.putDoc = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime, _effects, _types, _server, _actions, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = putDoc;

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _types2 = _interopRequireDefault(_types);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _marked = _regeneratorRuntime2.default.mark(putDoc);

  var START = _types2.default.PUT_START;
  var FAILED = _types2.default.PUT_FAILED;
  var FAILED_NETWORK = _types2.default.PUT_FAILED_NETWORK;
  var FINISHED = _types2.default.PUT_FINISHED;

  function putDoc(action) {
    var _action$payload, targetName, schemaName, objectId, data, autoRefresh, filesIncluded, fileValueHandler, dispatchId, target, _dispatchId, dataToSend, res, errType;

    return _regeneratorRuntime2.default.wrap(function putDoc$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, targetName = _action$payload.targetName, schemaName = _action$payload.schemaName, objectId = _action$payload.objectId, data = _action$payload.data, autoRefresh = _action$payload.autoRefresh, filesIncluded = _action$payload.filesIncluded, fileValueHandler = _action$payload.fileValueHandler, dispatchId = _action$payload.dispatchId;
            target = targetName || schemaName;
            _dispatchId = dispatchId || '';
            _context.next = 5;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null, loading: true, dispatchId: _dispatchId }));

          case 5:
            if (!filesIncluded) {
              _context.next = 10;
              break;
            }

            return _context.delegateYield((0, _server.uploadFilesFromData)(data, fileValueHandler), 't1', 7);

          case 7:
            _context.t0 = _context.t1;
            _context.next = 11;
            break;

          case 10:
            _context.t0 = data;

          case 11:
            dataToSend = _context.t0;

            dataToSend = (0, _helpers.removeImutableKeys)(data);
            return _context.delegateYield((0, _server.httpRequest)(_server.api.updateObject, schemaName, objectId, dataToSend), 't2', 14);

          case 14:
            res = _context.t2;

            if (!res.error) {
              _context.next = 23;
              break;
            }

            errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;

            console.error('putDoc err', schemaName, objectId, res.err);
            _context.next = 20;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res, loading: false, dispatchId: _dispatchId }));

          case 20:
            _server.Logger.onError('PUT', action, errType);
            _context.next = 29;
            break;

          case 23:
            _context.next = 25;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: FINISHED, error: null, loading: false, dispatchId: _dispatchId }));

          case 25:
            _server.Logger.onSuccess('PUT', action, FINISHED);

            if (!autoRefresh) {
              _context.next = 29;
              break;
            }

            _context.next = 29;
            return (0, _effects.put)((0, _actions.refreshCollection)({ targetName: target }));

          case 29:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  /* eslint no-unused-vars: "off" */
});