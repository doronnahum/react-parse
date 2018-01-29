'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

var getDocument = function getDocument(className, objectId, include) {
  return {
    type: _types2['default'].GET_DOCUMENT,
    className: className,
    objectId: objectId,
    include: include
  };
};
exports.getDocument = getDocument;
var setDocument = function setDocument(objectId, data) {
  return {
    type: _types2['default'].SET_DOCUMENT,
    objectId: objectId,
    data: data
  };
};
exports.setDocument = setDocument;
var clearDocuments = function clearDocuments() {
  return {
    type: _types2['default'].CLEAR_DOCUMENTS
  };
};
exports.clearDocuments = clearDocuments;
var setDocumentStatus = function setDocumentStatus(objectId, status) {
  return {
    type: _types2['default'].SET_SET_DOCUMENT_STATUS,
    objectId: objectId,
    status: status
  };
};
exports.setDocumentStatus = setDocumentStatus;
var updateDocumentOnStore = function updateDocumentOnStore(objectId, key, value) {
  return {
    type: _types2['default'].UPDATE__DOCUMENT_ON_STORE,
    objectId: objectId,
    key: key,
    value: value
  };
};
exports.updateDocumentOnStore = updateDocumentOnStore;
var removeDocument = function removeDocument(objectId) {
  return {
    type: _types2['default'].REMOVE_DOCUMENT,
    objectId: objectId
  };
};
exports.removeDocument = removeDocument;
var updateDocumentOnServer = function updateDocumentOnServer(className, objectId, keys, disabledAutoGetAfterSave, parseDataBeforeSave) {
  return {
    type: _types2['default'].UPDATE_DOCUMENT_ON_SERVER,
    className: className,
    objectId: objectId,
    keys: keys,
    disabledAutoGetAfterSave: disabledAutoGetAfterSave, // set true if you want that getDocument will not run after the update - not recommended
    parseDataBeforeSave: parseDataBeforeSave };
};
exports.updateDocumentOnServer = updateDocumentOnServer;
// pass function that ger object and return object with parse data
var deleteDocumentFromServer = function deleteDocumentFromServer(className, objectId) {
  return {
    type: _types2['default'].DELETE_DOCUMENT_FROM_SERVER,
    className: className,
    objectId: objectId
  };
};
exports.deleteDocumentFromServer = deleteDocumentFromServer;