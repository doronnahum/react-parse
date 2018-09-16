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
    var _action$payload, targetName, schemaName, objectId, data, autoRefresh, filesIncluded, fileValueHandler, dispatchId, boomerang, target, _dispatchId, dataToSend, dataFileError, res, errType;

    return _regeneratorRuntime2.default.wrap(function putDoc$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, targetName = _action$payload.targetName, schemaName = _action$payload.schemaName, objectId = _action$payload.objectId, data = _action$payload.data, autoRefresh = _action$payload.autoRefresh, filesIncluded = _action$payload.filesIncluded, fileValueHandler = _action$payload.fileValueHandler, dispatchId = _action$payload.dispatchId, boomerang = _action$payload.boomerang;
            target = targetName || schemaName;
            _dispatchId = dispatchId || '';
            _context.next = 5;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null, loading: true, dispatchId: _dispatchId, boomerang: boomerang }));

          case 5:
            dataToSend = void 0, dataFileError = void 0, res = null;
            _context.prev = 6;

            if (!filesIncluded) {
              _context.next = 12;
              break;
            }

            return _context.delegateYield((0, _server.uploadFilesFromData)(data, fileValueHandler), 't1', 9);

          case 9:
            _context.t0 = _context.t1;
            _context.next = 13;
            break;

          case 12:
            _context.t0 = data;

          case 13:
            dataToSend = _context.t0;

            dataToSend = (0, _helpers.removeImutableKeys)(data);
            _context.next = 22;
            break;

          case 17:
            _context.prev = 17;
            _context.t2 = _context['catch'](6);

            res = _context.t2;
            res.error = true;
            dataFileError = true;

          case 22:
            if (dataFileError) {
              _context.next = 25;
              break;
            }

            return _context.delegateYield((0, _server.httpRequest)(_server.api.updateObject, schemaName, objectId, dataToSend), 't3', 24);

          case 24:
            res = _context.t3;

          case 25:
            if (!res.error) {
              _context.next = 33;
              break;
            }

            errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;

            console.error('putDoc err', schemaName, objectId, res.err);
            _context.next = 30;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res, loading: false, dispatchId: _dispatchId, boomerang: boomerang }));

          case 30:
            _server.Logger.onError('PUT', action, errType, res);
            _context.next = 39;
            break;

          case 33:
            _context.next = 35;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: FINISHED, error: null, loading: false, dispatchId: _dispatchId, boomerang: boomerang }));

          case 35:
            _server.Logger.onSuccess('PUT', action, FINISHED, res);

            if (!autoRefresh) {
              _context.next = 39;
              break;
            }

            _context.next = 39;
            return (0, _effects.put)((0, _actions.refreshCollection)({ targetName: target }));

          case 39:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this, [[6, 17]]);
  }
  /* eslint no-unused-vars: "off" */
});