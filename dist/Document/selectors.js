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

var getDocuments = function getDocuments(state, targetName) {
  return state.parse.documents;
};

exports.getDocuments = getDocuments;
var getImmutableDoc = (0, _reselect.createSelector)([getDocuments, getTargetName], function (documents, targetName) {
  return documents.get(targetName) || MAP;
});

var getData = (0, _reselect.createSelector)(getImmutableDoc, function (dataImmutable) {
  return dataImmutable.get('data') && dataImmutable.get('data').toJS();
});

exports.getData = getData;
var getStatus = (0, _reselect.createSelector)(getImmutableDoc, function (dataImmutable) {
  return dataImmutable.get('status');
});

exports.getStatus = getStatus;
var getInfo = (0, _reselect.createSelector)(getImmutableDoc, function (dataImmutable) {
  return dataImmutable.get('info');
});

exports.getInfo = getInfo;
var getError = (0, _reselect.createSelector)(getImmutableDoc, function (dataImmutable) {
  return dataImmutable.get('error');
});
exports.getError = getError;