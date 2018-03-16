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
var SET_DOCUMENT = _types2['default'].SET_DOCUMENT;
var CLEAN_DOCUMENT = _types2['default'].CLEAN_DOCUMENT;
var CLEAN_ALL_DOCUMENTS = _types2['default'].CLEAN_ALL_DOCUMENTS;
var UPDATE_DOC_FIELD = _types2['default'].UPDATE_DOC_FIELD;

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
    case SET_DOCUMENT:
      {
        var documents = state.documents.get(targetName);
        var nextState = state;
        if (!documents) {
          nextState = nextState.setIn(['documents', targetName], Map());
        }
        if ('status' in payload) {
          nextState = nextState.setIn(['documents', targetName, 'status'], status);
        }
        if ('data' in payload) {
          nextState = nextState.setIn(['documents', targetName, 'data'], Map(data));
        }
        if ('info' in payload) {
          nextState = nextState.setIn(['documents', targetName, 'info'], info);
        }
        if ('error' in payload) {
          nextState = nextState.setIn(['documents', targetName, 'error'], error);
        }
        return nextState;
      }
    case UPDATE_DOC_FIELD:
      {
        var documents = state.documents.get(targetName);
        var nextState = state;
        if (!documents) {
          nextState = nextState.setIn(['documents', targetName], Map());
        }
        nextState = nextState.setIn(['documents', targetName, 'data', action.key], action.value);
        return nextState;
      }
    case CLEAN_DOCUMENT:
      {
        var documents = state.documents['delete'](targetName);
        return state.set('documents', documents);
      }
    case CLEAN_ALL_DOCUMENTS:
      {
        return state.set('documents', Map());
      }
    default:
      return null;
  }
}

module.exports = exports['default'];