(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.types);
    global.actions = mod.exports;
  }
})(this, function (exports, _types) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cleanCloudCode = exports.cleanData = exports.setOnStore = exports.fetchData = undefined;

  var _types2 = _interopRequireDefault(_types);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FETCH_CLOUD_CODE = _types2.default.FETCH_CLOUD_CODE,
      SET_CLOUD_CODE = _types2.default.SET_CLOUD_CODE,
      CLEAN_CLOUD_CODE = _types2.default.CLEAN_CLOUD_CODE,
      CLEAN_ALL_CLOUD_CODE = _types2.default.CLEAN_ALL_CLOUD_CODE;


  /**
   * fetchData
   * get data from parse server cloud code by function and find the data
   * on redux store by targetName
   * @param {object} payload {functionName, targetName, params, digToData, dataHandler, dispatchId}
   */
  var fetchData = exports.fetchData = function fetchData(payload) {
    return {
      type: FETCH_CLOUD_CODE,
      payload: payload
    };
  };

  /**
   * setOnStore
   * set and update data on store.parse.clodeCodes by targetName
   * @param {object} payload {targetName, status, data, info, error, dispatchId}
   */
  var setOnStore = exports.setOnStore = function setOnStore(payload) {
    return {
      type: SET_CLOUD_CODE,
      payload: payload
    };
  };

  /**
   * cleanData
   * clean data from store by target name
    * @param {object} payload
    * @param {string} payload.targetName
   */
  var cleanData = exports.cleanData = function cleanData(payload) {
    return {
      type: CLEAN_CLOUD_CODE,
      payload: payload
    };
  };

  /**
   * cleanCloudCode
   * clean all data inside cloudCode
   */
  var cleanCloudCode = exports.cleanCloudCode = function cleanCloudCode() {
    return {
      type: CLEAN_ALL_CLOUD_CODE
    };
  };
});