(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './actions', '../index'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./actions'), require('../index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.actions, global.index);
    global.cloudCodeActions = mod.exports;
  }
})(this, function (exports, _actions, _index) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cleanCloudsCode = exports.cleanData = exports.fetchData = undefined;

  var actions = _interopRequireWildcard(_actions);

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

  /** functionName, targetName, params, digToData
   * Dispatch action to post cloud code function
   * @param {object} payload
   * @param {string} payload.functionName functionName in the parse clouds
   * @param {string} payload.targetName key to store response inside redux store
   * if targetName empty then we use functionName as targetName
   * @param {object} payload.params request params
   * @param {string} payload.digToData string that help us find your data, default is data.result
   * @param {object} payload.logger pass to your Logger relevant info 
   * @param {function} payload.dataHandler pass function that manipulate data before set to store
   * @param {function} payload.dispatchId optional, you can pass some unique key to help you follow specific query status
   * 
   */
  var fetchData = exports.fetchData = function fetchData(payload) {
    (0, _index.dispatch)(actions.fetchData(payload));
  };
  /**
   * Dispatch action to clean cloud code by targetName
   * @param {object} payload
   * @param {string} payload.targetName
   * @param {object} payload.logger pass to your Logger relevant info 
   * 
   */
  var cleanData = exports.cleanData = function cleanData(payload) {
    (0, _index.dispatch)(actions.cleanData(payload));
  };
  /**
   * Dispatch action to clean all cloud code
   * 
   */
  var cleanCloudsCode = exports.cleanCloudsCode = function cleanCloudsCode() {
    (0, _index.dispatch)(actions.cleanCloudCode());
  };
});