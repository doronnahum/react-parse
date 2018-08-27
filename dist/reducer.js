(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './InitialState', './CloudCode/reducerHandler', './Collection/reducerHandler', './Document/reducerHandler', './index'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./InitialState'), require('./CloudCode/reducerHandler'), require('./Collection/reducerHandler'), require('./Document/reducerHandler'), require('./index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.InitialState, global.reducerHandler, global.reducerHandler, global.reducerHandler, global.index);
    global.reducer = mod.exports;
  }
})(this, function (exports, _InitialState, _reducerHandler, _reducerHandler3, _reducerHandler5, _index) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setClearStateActionType = exports.cleanAllState = undefined;
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
  var CLEAN_ALL_PARSE_STATE = 'CLEAN_ALL_PARSE_STATE';

  var clearStateActionType = null;

  var cleanAllState = exports.cleanAllState = function cleanAllState(payload) {
    if (_index.dispatch) {
      (0, _index.dispatch)({ type: 'CLEAN_ALL_PARSE_STATE' });
    } else {
      console.warn('react-parse, missing dispatch, please use setReactParseDispatch');
    }
  };

  var setClearStateActionType = exports.setClearStateActionType = function setClearStateActionType(type) {
    clearStateActionType = type;
  };

  function parseReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (!(state instanceof _InitialState2.default)) {
      return initialState.merge(state);
    }
    if (clearStateActionType && action.type === clearStateActionType || action.type === CLEAN_ALL_PARSE_STATE) {
      return initialState;
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