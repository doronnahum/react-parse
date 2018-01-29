'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

// Collection
var clearCollections = function clearCollections() {
  return {
    type: _types2['default'].CLEAR_COLLECTIONS
  };
};
exports.clearCollections = clearCollections;
var clearCollection = function clearCollection(targetName) {
  return {
    type: _types2['default'].CLEAR_COLLECTION,
    targetName: targetName
  };
};
exports.clearCollection = clearCollection;
/**
 * getCollection
 * @param {obj} {collectionName, targetName, query, perPage, page, include, keys, enableCount}
 */
var getCollection = function getCollection(res) {
  return _extends({
    type: _types2['default'].GET_COLLECTION
  }, res);
};
exports.getCollection = getCollection;
var setCollection = function setCollection(targetName, dataToSet) {
  return {
    type: _types2['default'].SET_COLLECTION,
    targetName: targetName,
    dataToSet: dataToSet
  };
};
exports.setCollection = setCollection;
var setCollectionStatus = function setCollectionStatus(targetName, status) {
  return setCollection(targetName, { status: status });
};
exports.setCollectionStatus = setCollectionStatus;
var deleteDocumentFromCollection = function deleteDocumentFromCollection(collectionName, targetName, objectId) {
  return {
    type: _types2['default'].DELETE_DOCUMENT_FROM_COLLECTION,
    collectionName: collectionName,
    targetName: targetName,
    objectId: objectId
  };
};
exports.deleteDocumentFromCollection = deleteDocumentFromCollection;
var updateDocumentFromCollection = function updateDocumentFromCollection(collectionName, targetName, objectId, data) {
  return {
    type: _types2['default'].UPDATE_DOCUMENT_FROM_COLLECTION,
    collectionName: collectionName,
    targetName: targetName,
    objectId: objectId,
    data: data
  };
};
exports.updateDocumentFromCollection = updateDocumentFromCollection;