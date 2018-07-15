(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'regenerator-runtime', 'redux-saga/effects', '../../types', '../actions', '../selectors'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('regenerator-runtime'), require('redux-saga/effects'), require('../../types'), require('../actions'), require('../selectors'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regeneratorRuntime, global.effects, global.types, global.actions, global.selectors);
    global.refreshCollection = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime, _effects, _types, _actions, _selectors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = refreshCollection;

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _types2 = _interopRequireDefault(_types);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _marked = _regeneratorRuntime2.default.mark(refreshCollection);

  var START = _types2.default.FETCH_START;
  var FAILED = _types2.default.FETCH_FAILED;
  var FAILED_NETWORK = _types2.default.FETCH_FAILED_NETWORK;
  var FINISHED = _types2.default.FETCH_FINISHED;

  function refreshCollection(action) {
    var _action$payload, targetName, dispatchId, _dispatchId, info;

    return _regeneratorRuntime2.default.wrap(function refreshCollection$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, targetName = _action$payload.targetName, dispatchId = _action$payload.dispatchId;
            _dispatchId = dispatchId || '';
            _context.next = 4;
            return (0, _effects.select)(function (state) {
              return (0, _selectors.getInfo)(state, targetName);
            });

          case 4:
            info = _context.sent;

            if (!(info && info.schemaName)) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return (0, _effects.put)((0, _actions.fetchData)(Object.assign({}, info, { targetName: targetName, dispatchId: _dispatchId })));

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  /* eslint no-unused-vars: "off" */
});