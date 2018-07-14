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
    global.postDoc = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime, _effects, _types, _server, _actions, _helpers) {
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
    var _action$payload, targetName, schemaName, data, filesIncluded, fileValueHandler, dispatchId, _dispatchId, dataToSend, res, errType, info;

    return _regeneratorRuntime2.default.wrap(function postDoc$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, targetName = _action$payload.targetName, schemaName = _action$payload.schemaName, data = _action$payload.data, filesIncluded = _action$payload.filesIncluded, fileValueHandler = _action$payload.fileValueHandler, dispatchId = _action$payload.dispatchId;
            _dispatchId = dispatchId || '';
            _context.next = 4;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: targetName, status: START, error: null, loading: true, dispatchId: _dispatchId }));

          case 4:
            if (!filesIncluded) {
              _context.next = 9;
              break;
            }

            return _context.delegateYield((0, _server.uploadFilesFromData)(data, fileValueHandler), 't1', 6);

          case 6:
            _context.t0 = _context.t1;
            _context.next = 10;
            break;

          case 9:
            _context.t0 = data;

          case 10:
            dataToSend = _context.t0;
            return _context.delegateYield((0, _server.httpRequest)(_server.api.createObject, schemaName, dataToSend), 't2', 12);

          case 12:
            res = _context.t2;

            if (!res.error) {
              _context.next = 21;
              break;
            }

            errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;

            console.error('deleteDoc err', targetName, res.error);
            _context.next = 18;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: targetName, status: errType, error: res, loading: false, dispatchId: _dispatchId }));

          case 18:
            _server.Logger.onError('POST', action, errType);
            _context.next = 25;
            break;

          case 21:
            info = {
              timestamp: Date.now(),
              schemaName: schemaName,
              objectId: res.data.objectId,
              data: data,
              resData: (0, _helpers.dig)(res, 'data.results[0]')
            };
            _context.next = 24;
            return (0, _effects.put)((0, _actions.setOnStore)({
              targetName: targetName,
              status: FINISHED,
              info: info,
              error: null,
              loading: false,
              dispatchId: _dispatchId
            }));

          case 24:
            _server.Logger.onSuccess('POST', action, FINISHED);

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  /* eslint no-unused-vars: "off" */
});