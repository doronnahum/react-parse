'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

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