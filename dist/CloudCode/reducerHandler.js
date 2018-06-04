(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../types', 'immutable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../types'), require('immutable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.types, global.immutable);
    global.reducerHandler = mod.exports;
  }
})(this, function (exports, _types, _require) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = reducerHandler;

  var _types2 = _interopRequireDefault(_types);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Map = _require.Map;

  // This is not a reducer, return null if it is not a relevant action.

  function reducerHandler(state, action) {
    var payload = action.payload;

    var _ref = payload || {},
        targetName = _ref.targetName,
        status = _ref.status,
        data = _ref.data,
        info = _ref.info,
        error = _ref.error,
        loading = _ref.loading;

    switch (action.type) {
      // Cloud code
      case _types2.default.SET_CLOUD_CODE:
        {
          var nextState = state;
          if (!nextState.cloudCodes.get(targetName)) {
            nextState = nextState.setIn(['cloudCodes', targetName], Map());
          }
          if ('status' in payload) {
            nextState = nextState.setIn(['cloudCodes', targetName, 'status'], status);
          }
          if ('data' in payload) {
            nextState = nextState.setIn(['cloudCodes', targetName, 'data'], data);
          }
          if ('info' in payload) {
            nextState = nextState.setIn(['cloudCodes', targetName, 'info'], info);
          }
          if ('error' in payload) {
            nextState = nextState.setIn(['cloudCodes', targetName, 'error'], error);
          }
          if ('loading' in payload) {
            nextState = nextState.setIn(['cloudCodes', targetName, 'loading'], loading);
          }
          return nextState;
        }
      case _types2.default.CLEAN_CLOUD_CODE:
        {
          var clouds = state.cloudCodes.delete(targetName);
          return state.set('cloudCodes', clouds);
        }
      case _types2.default.CLEAN_ALL_CLOUD_CODE:
        {
          return state.set('cloudCodes', Map());
        }
      default:
        return null;
    }
  }
});