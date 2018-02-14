'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

// Get data by clodCodeName
var getCloudCode = function getCloudCode(functionName, targetName, params) {
  var digToDataString = arguments.length <= 3 || arguments[3] === undefined ? 'data.result' : arguments[3];
  return {
    type: _types2['default'].GET_CLOUD_CODE,
    functionName: functionName,
    targetName: targetName,
    params: params,
    digToDataString: digToDataString
  };
};
exports.getCloudCode = getCloudCode;
var setCloudCode = function setCloudCode(targetName, data) {
  return {
    type: _types2['default'].SET_CLOUD_CODE,
    targetName: targetName,
    data: data
  };
};
exports.setCloudCode = setCloudCode;
var clearAllCloudCodes = function clearAllCloudCodes() {
  return {
    type: _types2['default'].CLEAR_ALL_CLOUD_CODES
  };
};
exports.clearAllCloudCodes = clearAllCloudCodes;
var setCloudCodeRequestStatus = function setCloudCodeRequestStatus(targetName, status) {
  return {
    type: _types2['default'].SET_CLOUD_CODE_REQUEST_STATUS,
    targetName: targetName,
    status: status
  };
};
exports.setCloudCodeRequestStatus = setCloudCodeRequestStatus;
var removeCloudCode = function removeCloudCode(targetName) {
  return {
    type: _types2['default'].REMOVE_CLOUD_CODE,
    targetName: targetName
  };
};
exports.removeCloudCode = removeCloudCode;