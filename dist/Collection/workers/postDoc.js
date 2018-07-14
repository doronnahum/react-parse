(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'regenerator-runtime', 'redux-saga/effects', '../../types', '../../server', '../actions'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('regenerator-runtime'), require('redux-saga/effects'), require('../../types'), require('../../server'), require('../actions'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regeneratorRuntime, global.effects, global.types, global.server, global.actions);
    global.postDoc = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime, _effects, _types, _server, _actions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = postDoc;

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _types2 = _interopRequireDefault(_types);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _marked = _regeneratorRuntime2.default.mark(postDoc);

  var START = _types2.default.POST_START;
  var FAILED = _types2.default.POST_FAILED;
  var FAILED_NETWORK = _types2.default.POST_FAILED_NETWORK;
  var FINISHED = _types2.default.POST_FINISHED;

  function postDoc(action) {
    var _action$payload, schemaName, data, targetName, autoRefresh, filesIncluded, fileValueHandler, dispatchId, _dispatchId, target, dataToSend, res, errType;

    return _regeneratorRuntime2.default.wrap(function postDoc$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, schemaName = _action$payload.schemaName, data = _action$payload.data, targetName = _action$payload.targetName, autoRefresh = _action$payload.autoRefresh, filesIncluded = _action$payload.filesIncluded, fileValueHandler = _action$payload.fileValueHandler, dispatchId = _action$payload.dispatchId;
            _dispatchId = dispatchId || '';
            target = targetName || schemaName;
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
            return _context.delegateYield((0, _server.httpRequest)(_server.api.createObject, schemaName, dataToSend), 't2', 13);

          case 13:
            res = _context.t2;

            if (!res.error) {
              _context.next = 22;
              break;
            }

            errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;

            console.error('postDoc err', schemaName, res.err);
            _server.Logger.onError('POST', action, errType);
            _context.next = 20;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res, loading: false, dispatchId: _dispatchId }));

          case 20:
            _context.next = 28;
            break;

          case 22:
            _context.next = 24;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: FINISHED, error: null, loading: false, dispatchId: _dispatchId }));

          case 24:
            _server.Logger.onSuccess('POST', action, FINISHED);

            if (!autoRefresh) {
              _context.next = 28;
              break;
            }

            _context.next = 28;
            return (0, _effects.put)((0, _actions.refreshCollection)({ targetName: target }));

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  /* eslint no-unused-vars: "off" */
});