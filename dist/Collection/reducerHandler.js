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

  var Map = _require.Map,
      List = _require.List;
  var SET_COLLECTION = _types2.default.SET_COLLECTION,
      CLEAN_COLLECTION = _types2.default.CLEAN_COLLECTION,
      CLEAN_ALL_COLLECTIONS = _types2.default.CLEAN_ALL_COLLECTIONS;

  // This is not a reducer, return null if it is not a relevant action.

  function reducerHandler(state, action) {
    var payload = action.payload;

    var _ref = payload || {},
        targetName = _ref.targetName,
        status = _ref.status,
        data = _ref.data,
        info = _ref.info,
        error = _ref.error,
        loading = _ref.loading,
        dispatchId = _ref.dispatchId,
        boomerang = _ref.boomerang;

    switch (action.type) {
      case SET_COLLECTION:
        {
          var collection = state.collections.get(targetName);
          var nextState = state;
          if (!collection) {
            nextState = nextState.setIn(['collections', targetName], Map());
          }
          if ('status' in payload) {
            nextState = nextState.setIn(['collections', targetName, 'status'], status);
          }
          if ('data' in payload) {
            nextState = nextState.setIn(['collections', targetName, 'data'], List(data));
          }
          if ('info' in payload) {
            nextState = nextState.setIn(['collections', targetName, 'info'], info);
          }
          if ('error' in payload) {
            nextState = nextState.setIn(['collections', targetName, 'error'], error);
          }
          if ('loading' in payload) {
            nextState = nextState.setIn(['collections', targetName, 'loading'], loading);
          }
          if ('dispatchId' in payload) {
            nextState = nextState.setIn(['collections', targetName, 'dispatchId'], dispatchId);
          }
          if (boomerang) {
            nextState = nextState.setIn(['documents', targetName, 'boomerang'], boomerang);
          }
          return nextState;
        }
      case CLEAN_COLLECTION:
        {
          var collections = state.collections.delete(targetName);
          return state.set('collections', collections);
        }
      case CLEAN_ALL_COLLECTIONS:
        {
          return state.set('collections', Map());
        }
      default:
        return null;
    }
  }
});