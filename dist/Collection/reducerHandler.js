'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = reducerHandler;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

var _require = require('immutable');

var Map = _require.Map;
var List = _require.List;
var SET_COLLECTION = _types2['default'].SET_COLLECTION;
var CLEAN_COLLECTION = _types2['default'].CLEAN_COLLECTION;
var CLEAN_ALL_COLLECTIONS = _types2['default'].CLEAN_ALL_COLLECTIONS;

// This is not a reducer, return null if it is not a relevant action.

function reducerHandler(state, action) {
  var payload = action.payload;

  var _ref = payload || {};

  var targetName = _ref.targetName;
  var status = _ref.status;
  var data = _ref.data;
  var info = _ref.info;
  var error = _ref.error;

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
        return nextState;
      }
    case CLEAN_COLLECTION:
      {
        var collections = state.collections['delete'](targetName);
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

module.exports = exports['default'];