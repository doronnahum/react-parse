'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

var FETCH_COLLECTION = _types2['default'].FETCH_COLLECTION;
var SET_COLLECTION = _types2['default'].SET_COLLECTION;
var CLEAN_COLLECTION = _types2['default'].CLEAN_COLLECTION;
var CLEAN_ALL_COLLECTIONS = _types2['default'].CLEAN_ALL_COLLECTIONS;
var DELETE_COLLECTION_DOC = _types2['default'].DELETE_COLLECTION_DOC;
var PUT_COLLECTION_DOC = _types2['default'].PUT_COLLECTION_DOC;
var POST_COLLECTION_DOC = _types2['default'].POST_COLLECTION_DOC;

/**
 * fetchData
 * @param {obj} {schemaName, targetName, query, perPage, page, include, keys, enableCount}
 */
var fetchData = function fetchData(payload) {
  return {
    type: FETCH_COLLECTION,
    payload: payload
  };
};

exports.fetchData = fetchData;
/**
 * setOnStore
 * @param {*} payload {targetName, status, data, info, error}
 */
var setOnStore = function setOnStore(payload) {
  return {
    type: SET_COLLECTION,
    payload: payload
  };
};

exports.setOnStore = setOnStore;
/**
 * deleteDocument
 * @param {*} payload {schemaName, targetName, objectId}
 */
var deleteDoc = function deleteDoc(payload) {
  return {
    type: DELETE_COLLECTION_DOC,
    payload: payload
  };
};

exports.deleteDoc = deleteDoc;
/**
 * putDoc
 * @param {*} payload {schemaName, targetName, objectId, data}
 */
var putDoc = function putDoc(payload) {
  return {
    type: PUT_COLLECTION_DOC,
    payload: payload
  };
};

exports.putDoc = putDoc;
/**
 * potDoc
 * @param {*} payload {schemaName, targetName, data}
 */
var postDoc = function postDoc(payload) {
  return {
    type: POST_COLLECTION_DOC,
    payload: payload
  };
};

exports.postDoc = postDoc;
/**
 * cleanCollection
 * @param {*} payload {targetName}
 */
var cleanData = function cleanData(payload) {
  return {
    type: CLEAN_ALL_COLLECTIONS,
    payload: payload
  };
};

exports.cleanData = cleanData;
var cleanCollections = function cleanCollections() {
  return {
    type: CLEAN_COLLECTION
  };
};
exports.cleanCollections = cleanCollections;