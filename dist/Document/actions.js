'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

var FETCH_DOCUMENT = _types2['default'].FETCH_DOCUMENT;
var SET_DOCUMENT = _types2['default'].SET_DOCUMENT;
var PUT_DOCUMENT = _types2['default'].PUT_DOCUMENT;
var POST_DOCUMENT = _types2['default'].POST_DOCUMENT;
var DELETE_DOCUMENT = _types2['default'].DELETE_DOCUMENT;
var CLEAN_DOCUMENT = _types2['default'].CLEAN_DOCUMENT;
var CLEAN_ALL_DOCUMENTS = _types2['default'].CLEAN_ALL_DOCUMENTS;
var UPDATE_DOC_FIELD = _types2['default'].UPDATE_DOC_FIELD;

/**
 * fetchData
 * @param {*} payload {targetName, schemaName, objectId, include, keys}
 */
var fetchData = function fetchData(payload) {
  return {
    type: FETCH_DOCUMENT,
    payload: payload
  };
};
exports.fetchData = fetchData;
/**
 * setOnStore
 * @param {*} payload {targetName, status, data, info, error}
 * @param {*} data
 */
var setOnStore = function setOnStore(payload) {
  return {
    type: SET_DOCUMENT,
    payload: payload
  };
};
exports.setOnStore = setOnStore;
/**
 * updateField
 * @param {*} payload {targetName, key, value}
 */
var updateField = function updateField(payload) {
  return {
    type: UPDATE_DOC_FIELD,
    payload: payload
  };
};

exports.updateField = updateField;
/**
 * putDoc
 * @param {*} payload {targetName, schemaName, objectId, data}
 */
var putDoc = function putDoc(payload) {
  return {
    type: PUT_DOCUMENT,
    payload: payload
  };
};
exports.putDoc = putDoc;
/**
 * postDoc
 * @param {*} payload {targetName, schemaName, data}
 */
var postDoc = function postDoc(payload) {
  return {
    type: POST_DOCUMENT,
    payload: payload
  };
};
exports.postDoc = postDoc;
/**
 * deleteDoc
 * @param {*} payload {targetName, schemaName,objectId}
 */
var deleteDoc = function deleteDoc(payload) {
  return {
    type: DELETE_DOCUMENT,
    payload: payload
  };
};

exports.deleteDoc = deleteDoc;
/**
 * cleanData
 * @param {*} payload {targetName}
 */
var cleanData = function cleanData(payload) {
  return {
    type: CLEAN_DOCUMENT,
    payload: payload
  };
};
exports.cleanData = cleanData;
var clearDocuments = function clearDocuments() {
  return {
    type: CLEAN_ALL_DOCUMENTS
  };
};
exports.clearDocuments = clearDocuments;