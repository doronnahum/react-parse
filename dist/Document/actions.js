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
var deleteDocument = function deleteDocument(className, objectId) {
  return {
    type: _types2['default'].DELETE_DOCUMENT,
    className: className,
    objectId: objectId
  };
};

exports.deleteDocument = deleteDocument;
// New documents
var createNewDocument = function createNewDocument(uniqueId, defaultValues) {
  return {
    type: _types2['default'].CREATE_NEW_DOCUMENT,
    uniqueId: uniqueId,
    defaultValues: defaultValues
  };
};
exports.createNewDocument = createNewDocument;
var updateNewDocument = function updateNewDocument(uniqueId, key, value) {
  return {
    type: _types2['default'].UPDATE_NEW_DOCUMENT,
    uniqueId: uniqueId,
    key: key,
    value: value
  };
};
exports.updateNewDocument = updateNewDocument;
var clearNewDocument = function clearNewDocument(uniqueId) {
  return {
    type: _types2['default'].CLEAR_NEW_DOCUMENT,
    uniqueId: uniqueId
  };
};
exports.clearNewDocument = clearNewDocument;
var removeNewDocument = function removeNewDocument(uniqueId) {
  return {
    type: _types2['default'].REMOVE_NEW_DOCUMENT,
    uniqueId: uniqueId
  };
};
exports.removeNewDocument = removeNewDocument;
var postNewDocument = function postNewDocument(className, uniqueId, parseDataBeforeSave, addMemberPointerToDataOnPost, getDataWithPostQueryStatusSuccessfully) {
  return {
    type: _types2['default'].POST_NEW_DOCUMENT,
    className: className,
    uniqueId: uniqueId,
    parseDataBeforeSave: parseDataBeforeSave,
    addMemberPointerToDataOnPost: addMemberPointerToDataOnPost,
    getDataWithPostQueryStatusSuccessfully: getDataWithPostQueryStatusSuccessfully
  };
};
exports.postNewDocument = postNewDocument;
var setNewDocumentStatus = function setNewDocumentStatus(uniqueId, status) {
  return {
    type: _types2['default'].SET_NEW_DOCUMENT_STATUS,
    uniqueId: uniqueId,
    status: status
  };
};
exports.setNewDocumentStatus = setNewDocumentStatus;