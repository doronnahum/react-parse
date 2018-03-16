'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = parseReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _InitialState = require('./InitialState');

var _InitialState2 = _interopRequireDefault(_InitialState);

var _CloudCodeReducerHandler = require('./CloudCode/reducerHandler');

var _CloudCodeReducerHandler2 = _interopRequireDefault(_CloudCodeReducerHandler);

var _CollectionReducerHandler = require('./Collection/reducerHandler');

var _CollectionReducerHandler2 = _interopRequireDefault(_CollectionReducerHandler);

var _DocumentReducerHandler = require('./Document/reducerHandler');

var _DocumentReducerHandler2 = _interopRequireDefault(_DocumentReducerHandler);

var initialState = new _InitialState2['default']();

function parseReducer(state, action) {
  if (state === undefined) state = initialState;

  if (!(state instanceof _InitialState2['default'])) {
    return initialState.merge(state);
  }
  var nextState = null;
  nextState = (0, _CloudCodeReducerHandler2['default'])(state, action);
  if (nextState) return nextState;
  nextState = (0, _CollectionReducerHandler2['default'])(state, action);
  if (nextState) return nextState;
  nextState = (0, _DocumentReducerHandler2['default'])(state, action);
  if (nextState) return nextState;
  return state;
}

module.exports = exports['default'];