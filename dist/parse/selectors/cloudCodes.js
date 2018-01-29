'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _reselect = require('reselect');

var _immutable = require('immutable');

var MAP = (0, _immutable.Map)();

var getTargetName = function getTargetName(state, targetName) {
  return targetName;
};

// --- Cloud codes ---/
var getCloudCodes = function getCloudCodes(state) {
  return state.parse.cloudCodes;
};
exports.getCloudCodes = getCloudCodes;
// -- Get specific collections
var getImmutableCloudCodes = (0, _reselect.createSelector)([getCloudCodes, getTargetName], function (cloudCodes, targetName) {
  return cloudCodes.get(targetName) || MAP;
});
var getDataFromCloudCode = (0, _reselect.createSelector)(getImmutableCloudCodes, function (dataImmutable) {
  return dataImmutable.get('data') && dataImmutable.get('data').toJS();
});
exports.getDataFromCloudCode = getDataFromCloudCode;
var getStatusFromCloudCode = (0, _reselect.createSelector)(getImmutableCloudCodes, function (dataImmutable) {
  return dataImmutable.get('status');
});
exports.getStatusFromCloudCode = getStatusFromCloudCode;
var getInfoFromCloudCode = (0, _reselect.createSelector)(getImmutableCloudCodes, function (dataImmutable) {
  return dataImmutable.get('info');
});
exports.getInfoFromCloudCode = getInfoFromCloudCode;