/**
 * # redux > market > sagaWatcher.js
 *
 * This file contain all market Watcher
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [parseWatcher].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

// Import all the ActionTypes

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

// Import all workers from Workers Folder
// Collections

var _sagaWorkersCollectionsGetCollection = require('./sagaWorkers/collections/getCollection');

var _sagaWorkersCollectionsGetCollection2 = _interopRequireDefault(_sagaWorkersCollectionsGetCollection);

var _sagaWorkersCollectionsDeleteDocumentFromCollection = require('./sagaWorkers/collections/deleteDocumentFromCollection');

var _sagaWorkersCollectionsDeleteDocumentFromCollection2 = _interopRequireDefault(_sagaWorkersCollectionsDeleteDocumentFromCollection);

var _sagaWorkersCollectionsUpdateDocumentFromCollection = require('./sagaWorkers/collections/updateDocumentFromCollection');

var _sagaWorkersCollectionsUpdateDocumentFromCollection2 = _interopRequireDefault(_sagaWorkersCollectionsUpdateDocumentFromCollection);

// Documents

var _sagaWorkersDocumentsGetDocument = require('./sagaWorkers/documents/getDocument');

var _sagaWorkersDocumentsGetDocument2 = _interopRequireDefault(_sagaWorkersDocumentsGetDocument);

var _sagaWorkersDocumentsUpdateDocumentOnServer = require('./sagaWorkers/documents/updateDocumentOnServer');

var _sagaWorkersDocumentsUpdateDocumentOnServer2 = _interopRequireDefault(_sagaWorkersDocumentsUpdateDocumentOnServer);

var _sagaWorkersDocumentsDeleteDocumentFromServer = require('./sagaWorkers/documents/deleteDocumentFromServer');

var _sagaWorkersDocumentsDeleteDocumentFromServer2 = _interopRequireDefault(_sagaWorkersDocumentsDeleteDocumentFromServer);

// local Documents

var _sagaWorkersDocumentsPostNewDocument = require('./sagaWorkers/documents/postNewDocument');

var _sagaWorkersDocumentsPostNewDocument2 = _interopRequireDefault(_sagaWorkersDocumentsPostNewDocument);

// Cloud Codes

var _sagaWorkersCloudCodesGetCloudCode = require('./sagaWorkers/cloudCodes/getCloudCode');

var _sagaWorkersCloudCodesGetCloudCode2 = _interopRequireDefault(_sagaWorkersCloudCodesGetCloudCode);

// all market watchers
function parseWatcher() {
  return regeneratorRuntime.wrap(function parseWatcher$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].GET_COLLECTION, _sagaWorkersCollectionsGetCollection2['default']);

      case 2:
        context$1$0.next = 4;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].DELETE_DOCUMENT_FROM_COLLECTION, _sagaWorkersCollectionsDeleteDocumentFromCollection2['default']);

      case 4:
        context$1$0.next = 6;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].UPDATE_DOCUMENT_FROM_COLLECTION, _sagaWorkersCollectionsUpdateDocumentFromCollection2['default']);

      case 6:
        context$1$0.next = 8;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].GET_DOCUMENT, _sagaWorkersDocumentsGetDocument2['default']);

      case 8:
        context$1$0.next = 10;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].UPDATE_DOCUMENT_ON_SERVER, _sagaWorkersDocumentsUpdateDocumentOnServer2['default']);

      case 10:
        context$1$0.next = 12;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].DELETE_DOCUMENT_FROM_SERVER, _sagaWorkersDocumentsDeleteDocumentFromServer2['default']);

      case 12:
        context$1$0.next = 14;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].POST_NEW_DOCUMENT, _sagaWorkersDocumentsPostNewDocument2['default']);

      case 14:
        context$1$0.next = 16;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].GET_CLOUD_CODE, _sagaWorkersCloudCodesGetCloudCode2['default']);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

exports['default'] = parseWatcher;
module.exports = exports['default'];

// put,
// call,
// select,
// delay,
// take,
// takeLatest,
// throttle,

// Collections

// Documents

// Cloud code