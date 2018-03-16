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
  exports.cleanCollections = exports.cleanData = exports.postDoc = exports.putDoc = exports.deleteDoc = exports.setOnStore = exports.fetchData = undefined;

  var _types2 = _interopRequireDefault(_types);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FETCH_COLLECTION = _types2.default.FETCH_COLLECTION,
      SET_COLLECTION = _types2.default.SET_COLLECTION,
      CLEAN_COLLECTION = _types2.default.CLEAN_COLLECTION,
      CLEAN_ALL_COLLECTIONS = _types2.default.CLEAN_ALL_COLLECTIONS,
      DELETE_COLLECTION_DOC = _types2.default.DELETE_COLLECTION_DOC,
      PUT_COLLECTION_DOC = _types2.default.PUT_COLLECTION_DOC,
      POST_COLLECTION_DOC = _types2.default.POST_COLLECTION_DOC;


  /**
   * fetchData
   * @param {obj} {schemaName, targetName, query, perPage, page, include, keys, enableCount}
   */
  var fetchData = exports.fetchData = function fetchData(payload) {
    return {
      type: FETCH_COLLECTION,
      payload: payload
    };
  };

  /**
   * setOnStore
   * @param {*} payload {targetName, status, data, info, error}
   */
  var setOnStore = exports.setOnStore = function setOnStore(payload) {
    return {
      type: SET_COLLECTION,
      payload: payload
    };
  };

  /**
   * deleteDocument
   * @param {*} payload {schemaName, targetName, objectId}
   */
  var deleteDoc = exports.deleteDoc = function deleteDoc(payload) {
    return {
      type: DELETE_COLLECTION_DOC,
      payload: payload
    };
  };

  /**
   * putDoc
   * @param {*} payload {schemaName, targetName, objectId, data}
   */
  var putDoc = exports.putDoc = function putDoc(payload) {
    return {
      type: PUT_COLLECTION_DOC,
      payload: payload
    };
  };

  /**
   * potDoc
   * @param {*} payload {schemaName, targetName, data}
   */
  var postDoc = exports.postDoc = function postDoc(payload) {
    return {
      type: POST_COLLECTION_DOC,
      payload: payload
    };
  };

  /**
   * cleanCollection
   * @param {*} payload {targetName}
   */
  var cleanData = exports.cleanData = function cleanData(payload) {
    return {
      type: CLEAN_ALL_COLLECTIONS,
      payload: payload
    };
  };

  var cleanCollections = exports.cleanCollections = function cleanCollections() {
    return {
      type: CLEAN_COLLECTION
    };
  };
});