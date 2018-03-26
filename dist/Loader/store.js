(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react-redux', './selectors'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react-redux'), require('./selectors'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reactRedux, global.selectors);
    global.store = mod.exports;
  }
})(this, function (exports, _reactRedux, _selectors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  function mapStateToProps(state, props) {
    return {
      showLoader: (0, _selectors.showLoader)(state)
    };
  }

  exports.default = function (comp) {
    return (0, _reactRedux.connect)(mapStateToProps, null)(comp);
  };
});