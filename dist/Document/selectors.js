'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _reselect = require('reselect');

var _immutable = require('immutable');

var MAP = (0, _immutable.Map)();

// --- Documents ---/
var getObjectId = function getObjectId(state, objectId) {
  return objectId;
};
var getUniqueId = function getUniqueId(state, objectId) {
  return objectId;
};

// -- Get all documents by objectId
var getDocuments = function getDocuments(state) {
  return state.parse.documents;
};
exports.getDocuments = getDocuments;
// -- Get specific document by objectId
var getImmutableDocument = (0, _reselect.createSelector)([getDocuments, getObjectId], function (documentsByObjectId, objectId) {
  return documentsByObjectId.get(objectId) || MAP;
});
var getImmutableDocumentData = (0, _reselect.createSelector)(getImmutableDocument, function (immutableDocument) {
  return immutableDocument.get('data');
});
exports.getImmutableDocumentData = getImmutableDocumentData;
var getData = (0, _reselect.createSelector)(getImmutableDocument, function (immutableDocument) {
  return immutableDocument.get('data') && immutableDocument.get('data').toJS();
});
exports.getData = getData;
var getStatus = (0, _reselect.createSelector)(getImmutableDocument, function (immutableDocument) {
  return immutableDocument.get('status');
});
exports.getStatus = getStatus;
// -- New documents
var getNewDocuments = function getNewDocuments(state) {
  return state.parse.newDocuments;
};
exports.getNewDocuments = getNewDocuments;
var getImmutableNewDocument = (0, _reselect.createSelector)([getNewDocuments, getUniqueId], function (newDocuments, uniqueId) {
  return newDocuments.get(uniqueId) || MAP;
});
var getNewDocumentData = (0, _reselect.createSelector)(getImmutableNewDocument, function (immutableDocument) {
  return immutableDocument.get('data') && immutableDocument.get('data').toJS();
});
exports.getNewDocumentData = getNewDocumentData;
var getImmutableNewDocumentData = (0, _reselect.createSelector)(getImmutableNewDocument, function (immutableDocument) {
  return immutableDocument.get('data') && immutableDocument.get('data');
});
exports.getImmutableNewDocumentData = getImmutableNewDocumentData;
var getNewDocumentStatus = (0, _reselect.createSelector)(getImmutableNewDocument, function (immutableDocument) {
  return immutableDocument.get('status');
});
exports.getNewDocumentStatus = getNewDocumentStatus;