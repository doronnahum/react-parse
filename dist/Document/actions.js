(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.types);
    global.actions = mod.exports;
  }
})(this, function (exports, _types) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cleanDocuments = exports.clearDocuments = exports.cleanData = exports.deleteDoc = exports.postDoc = exports.putDoc = exports.updateFields = exports.updateField = exports.setOnStore = exports.fetchData = undefined;

  var _types2 = _interopRequireDefault(_types);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FETCH_DOCUMENT = _types2.default.FETCH_DOCUMENT,
      SET_DOCUMENT = _types2.default.SET_DOCUMENT,
      PUT_DOCUMENT = _types2.default.PUT_DOCUMENT,
      POST_DOCUMENT = _types2.default.POST_DOCUMENT,
      DELETE_DOCUMENT = _types2.default.DELETE_DOCUMENT,
      CLEAN_DOCUMENT = _types2.default.CLEAN_DOCUMENT,
      CLEAN_ALL_DOCUMENTS = _types2.default.CLEAN_ALL_DOCUMENTS,
      UPDATE_DOC_FIELD = _types2.default.UPDATE_DOC_FIELD,
      UPDATE_DOC_FIELDS = _types2.default.UPDATE_DOC_FIELDS;


  /**
   * fetchData
   * @param {object} payload {targetName, schemaName, objectId, include, keys}
   * @param {string} payload.targetName
   * @param {string} payload.schemaName
   * @param {string} payload.objectId
   * @param {string} payload.include
   * @param {string} payload.keys,
   * @param {function} payload.dataHandler,
   * @param {function} payload.dispatchId optional, you can pass some unique key to help you follow specific query status
   * @param {function} payload.boomerang optional, you can pass some data that help you manage your things with this async query
   * 
   */
  var fetchData = exports.fetchData = function fetchData(payload) {
    return {
      type: FETCH_DOCUMENT,
      payload: payload
    };
  };
  /**
   * setOnStore
   * @param {*} payload {targetName, status, data, info, error}
   * @param {*} data
   */
  var setOnStore = exports.setOnStore = function setOnStore(payload) {
    return {
      type: SET_DOCUMENT,
      payload: payload
    };
  };

  /**
   * updateField
   * @param {*} payload {targetName, key, value}
   */
  var updateField = exports.updateField = function updateField(payload) {
    return {
      type: UPDATE_DOC_FIELD,
      payload: payload
    };
  };

  /**
   * updateFields
   * @param {*} payload {targetName, key, value}
   */
  var updateFields = exports.updateFields = function updateFields(payload) {
    return {
      type: UPDATE_DOC_FIELDS,
      payload: payload
    };
  };

  /**
   * putDoc
   * @param {*} payload {targetName, schemaName, objectId, data, filesIncluded, fileValueHandler, dispatchId, boomerang}
   */
  var putDoc = exports.putDoc = function putDoc(payload) {
    return {
      type: PUT_DOCUMENT,
      payload: payload
    };
  };
  /**
   * postDoc
   * @param {*} payload {targetName, schemaName, data, filesIncluded, fileValueHandler, dispatchId, boomerang}
   */
  var postDoc = exports.postDoc = function postDoc(payload) {
    return {
      type: POST_DOCUMENT,
      payload: payload
    };
  };
  /**
   * deleteDoc
   * @param {*} payload {targetName, schemaName,objectId, dispatchId, boomerang}
   */
  var deleteDoc = exports.deleteDoc = function deleteDoc(payload) {
    return {
      type: DELETE_DOCUMENT,
      payload: payload
    };
  };

  /**
   * cleanData
   * @param {*} payload {targetName}
   */
  var cleanData = exports.cleanData = function cleanData(payload) {
    return {
      type: CLEAN_DOCUMENT,
      payload: payload
    };
  };
  var clearDocuments = exports.clearDocuments = function clearDocuments() {
    return {
      type: CLEAN_ALL_DOCUMENTS
    };
  };
  var cleanDocuments = exports.cleanDocuments = function cleanDocuments() {
    return {
      type: CLEAN_ALL_DOCUMENTS
    };
  };
});