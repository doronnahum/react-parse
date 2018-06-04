(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './CloudCode/actions', './Collection/actions', './Document/actions'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./CloudCode/actions'), require('./Collection/actions'), require('./Document/actions'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.actions, global.actions, global.actions);
    global.actions = mod.exports;
  }
})(this, function (exports, _actions, _actions2, _actions3) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DocumentActions = exports.CollectionActions = exports.CloudCodeActions = undefined;

  var CloudCodeActions = _interopRequireWildcard(_actions);

  var CollectionActions = _interopRequireWildcard(_actions2);

  var DocumentActions = _interopRequireWildcard(_actions3);

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

  exports.CloudCodeActions = CloudCodeActions;
  exports.CollectionActions = CollectionActions;
  exports.DocumentActions = DocumentActions;
});