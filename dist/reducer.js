(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './InitialState', './CloudCode/reducerHandler', './Collection/reducerHandler', './Document/reducerHandler'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./InitialState'), require('./CloudCode/reducerHandler'), require('./Collection/reducerHandler'), require('./Document/reducerHandler'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.InitialState, global.reducerHandler, global.reducerHandler, global.reducerHandler);
    global.reducer = mod.exports;
  }
})(this, function (exports, _InitialState, _reducerHandler, _reducerHandler3, _reducerHandler5) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = parseReducer;

  var _InitialState2 = _interopRequireDefault(_InitialState);

  var _reducerHandler2 = _interopRequireDefault(_reducerHandler);

  var _reducerHandler4 = _interopRequireDefault(_reducerHandler3);

  var _reducerHandler6 = _interopRequireDefault(_reducerHandler5);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var initialState = new _InitialState2.default();

  function parseReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (!(state instanceof _InitialState2.default)) {
      return initialState.merge(state);
    }
    var nextState = null;
    nextState = (0, _reducerHandler2.default)(state, action);
    if (nextState) return nextState;
    nextState = (0, _reducerHandler4.default)(state, action);
    if (nextState) return nextState;
    nextState = (0, _reducerHandler6.default)(state, action);
    if (nextState) return nextState;
    return state;
  }
});