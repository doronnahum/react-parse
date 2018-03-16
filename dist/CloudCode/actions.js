'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

var FETCH_CLOUD_CODE = _types2['default'].FETCH_CLOUD_CODE;
var SET_CLOUD_CODE = _types2['default'].SET_CLOUD_CODE;
var CLEAN_CLOUD_CODE = _types2['default'].CLEAN_CLOUD_CODE;
var CLEAN_ALL_CLOUD_CODE = _types2['default'].CLEAN_ALL_CLOUD_CODE;

/**
 * fetchData
 * get data from parse server cloud code by function and find the data
 * on redux store by targetName
 * @param {object} payload {functionName, targetName, params, digToData}
 */
var fetchData = function fetchData(payload) {
  return {
    type: FETCH_CLOUD_CODE,
    payload: payload
  };
};

exports.fetchData = fetchData;
/**
 * setOnStore
 * set and update data on store.parse.clodeCodes by targetName
 * @param {object} payload {targetName, status, data, info, error}
 */
var setOnStore = function setOnStore(payload) {
  return {
    type: SET_CLOUD_CODE,
    payload: payload
  };
};

exports.setOnStore = setOnStore;
/**
 * cleanData
 * clean data from store by target name
 * @param {*} payload {targetName}
 */
var cleanData = function cleanData(payload) {
  return {
    type: CLEAN_CLOUD_CODE,
    payload: payload
  };
};

exports.cleanData = cleanData;
/**
 * cleanCloudCode
 * clean all data inside cloudCode
 */
var cleanCloudCode = function cleanCloudCode() {
  return {
    type: CLEAN_ALL_CLOUD_CODE
  };
};
exports.cleanCloudCode = cleanCloudCode;