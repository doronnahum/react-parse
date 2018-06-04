(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './CloudCode/selectors', './Collection/selectors', './Document/selectors'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./CloudCode/selectors'), require('./Collection/selectors'), require('./Document/selectors'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.selectors, global.selectors, global.selectors);
    global.selectors = mod.exports;
  }
})(this, function (exports, _selectors, _selectors2, _selectors3) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DocumentSelectors = exports.CollectionSelectors = exports.CloudCodeSelectors = undefined;

  var CloudCodeSelectors = _interopRequireWildcard(_selectors);

  var CollectionSelectors = _interopRequireWildcard(_selectors2);

  var DocumentSelectors = _interopRequireWildcard(_selectors3);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  exports.CloudCodeSelectors = CloudCodeSelectors;
  exports.CollectionSelectors = CollectionSelectors;
  exports.DocumentSelectors = DocumentSelectors;
});