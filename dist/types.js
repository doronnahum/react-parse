(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.types = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    // FETCH
    FETCH_START: 'FETCH_START',
    FETCH_FAILED: 'FETCH_FAILED',
    FETCH_FAILED_NETWORK: 'FETCH_FAILED_NETWORK',
    FETCH_FINISHED: 'FETCH_FINISHED',
    // POST
    POST_START: 'POST_START',
    POST_FAILED: 'POST_FAILED',
    POST_FAILED_NETWORK: 'POST_FAILED_NETWORK',
    POST_FINISHED: 'POST_FINISHED',
    // DELETE
    DELETE_START: 'DELETE_START',
    DELETE_FAILED: 'DELETE_FAILED',
    DELETE_FAILED_NETWORK: 'DELETE_FAILED_NETWORK',
    DELETE_FINISHED: 'DELETE_FINISHED',
    // PUT
    PUT_START: 'PUT_START',
    PUT_FAILED: 'PUT_FAILED',
    PUT_FAILED_NETWORK: 'PUT_FAILED_NETWORK',
    PUT_FINISHED: 'PUT_FINISHED',
    // Cloud Code
    FETCH_CLOUD_CODE: 'FETCH_CLOUD_CODE',
    SET_CLOUD_CODE: 'SET_CLOUD_CODE',
    CLEAN_CLOUD_CODE: 'CLEAN_CLOUD_CODE',
    CLEAN_ALL_CLOUD_CODE: 'CLEAN_ALL_CLOUD_CODE',
    // Collection
    FETCH_COLLECTION: 'FETCH_COLLECTION',
    REFRESH_COLLECTION: 'REFRESH_COLLECTION',
    SET_COLLECTION: 'SET_COLLECTION',
    CLEAN_COLLECTION: 'CLEAN_COLLECTION',
    CLEAN_ALL_COLLECTIONS: 'CLEAN_ALL_COLLECTIONS',
    DELETE_COLLECTION_DOC: 'DELETE_COLLECTION_DOC',
    PUT_COLLECTION_DOC: 'PUT_COLLECTION_DOC',
    POST_COLLECTION_DOC: 'POST_COLLECTION_DOC',
    // Document
    FETCH_DOCUMENT: 'FETCH_DOCUMENT',
    SET_DOCUMENT: 'SET_DOCUMENT',
    PUT_DOCUMENT: 'PUT_DOCUMENT',
    DELETE_DOCUMENT: 'DELETE_DOCUMENT',
    POST_DOCUMENT: 'POST_DOCUMENT',
    CLEAN_DOCUMENT: 'CLEAN_DOCUMENT',
    CLEAN_ALL_DOCUMENTS: 'CLEAN_ALL_DOCUMENTS',
    UPDATE_DOC_FIELD: 'UPDATE_DOC_FIELD',
    UPDATE_DOC_FIELDS: 'UPDATE_DOC_FIELDS'
  };
});