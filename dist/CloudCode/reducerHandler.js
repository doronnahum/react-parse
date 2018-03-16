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
    // Cloud code
    case _types2['default'].SET_CLOUD_CODE:
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
        return nextState;
      }
    case _types2['default'].CLEAN_CLOUD_CODE:
      {
        var clouds = state.cloudCodes['delete'](targetName);
        return state.set('cloudCodes', clouds);
      }
    case _types2['default'].CLEAN_ALL_CLOUD_CODE:
      {
        return state.set('cloudCodes', Map());
      }
    default:
      return null;
  }
}

module.exports = exports['default'];