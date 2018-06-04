(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'reselect', 'immutable', 'lodash/some'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('reselect'), require('immutable'), require('lodash/some'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reselect, global.immutable, global.some);
    global.selectors = mod.exports;
  }
})(this, function (exports, _reselect, _immutable, _some) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.showLoader = undefined;

  var _some2 = _interopRequireDefault(_some);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var loading = { 'loading': true };

  var getState = function getState(state) {
    return state.parse;
  };
  // -- Get specific collections
  var showLoader = exports.showLoader = (0, _reselect.createSelector)(getState, function (state) {
    var status = false;
    if (state && state.collections) {
      var toCheck = state.collections.toJS();
      status = (0, _some2.default)(toCheck, loading);
      if (!status) {
        status = (0, _some2.default)(state.cloudCodes.toJS(), loading);
      }
      if (!status) {
        status = (0, _some2.default)(state.documents.toJS(), loading);
      }
    }
    return status;
  });
});