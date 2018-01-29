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
// --- Collections ---/
// -- Get all collections
var getCollections = function getCollections(state) {
  return state.parse.collections;
};

exports.getCollections = getCollections;
var getImmutableCollection = (0, _reselect.createSelector)([getCollections, getTargetName], function (collections, targetName) {
  return collections.get(targetName) || MAP;
});
// -- Get specific collections
var getCollectionData = (0, _reselect.createSelector)(getImmutableCollection, function (dataImmutable) {
  return dataImmutable.get('data') && dataImmutable.get('data').toJS();
});
exports.getCollectionData = getCollectionData;
var getCollectionStatus = (0, _reselect.createSelector)(getImmutableCollection, function (dataImmutable) {
  return dataImmutable.get('status');
});
exports.getCollectionStatus = getCollectionStatus;
var getCollectionInfo = (0, _reselect.createSelector)(getImmutableCollection, function (dataImmutable) {
  return dataImmutable.get('info');
});
exports.getCollectionInfo = getCollectionInfo;