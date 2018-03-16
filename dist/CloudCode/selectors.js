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
var getCloudCodes = function getCloudCodes(state, targetName) {
  return state.parse.cloudCodes;
};
exports.getCloudCodes = getCloudCodes;
// -- Get specific collections
var getImmutableCloudCodes = (0, _reselect.createSelector)([getCloudCodes, getTargetName], function (cloudCodes, targetName) {
  return cloudCodes.get(targetName) || MAP;
});
var getData = (0, _reselect.createSelector)(getImmutableCloudCodes, function (dataImmutable) {
  return dataImmutable.get('data') && dataImmutable.get('data');
});
exports.getData = getData;
var getStatus = (0, _reselect.createSelector)(getImmutableCloudCodes, function (dataImmutable) {
  return dataImmutable.get('status');
});
exports.getStatus = getStatus;
var getInfo = (0, _reselect.createSelector)(getImmutableCloudCodes, function (dataImmutable) {
  return dataImmutable.get('info');
});
exports.getInfo = getInfo;
var getError = (0, _reselect.createSelector)(getImmutableCloudCodes, function (dataImmutable) {
  return dataImmutable.get('error');
});
exports.getError = getError;