'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [parseWatcher].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

// Collections

var _CollectionSaga = require('./Collection/saga');

// Documents

var _DocumentSaga = require('./Document/saga');

// Cloud Codes

var _CloudCodeSaga = require('./CloudCode/saga');

var _CloudCodeSaga2 = _interopRequireDefault(_CloudCodeSaga);

// all market watchers
function parseWatcher() {
  return regeneratorRuntime.wrap(function parseWatcher$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].GET_COLLECTION, _CollectionSaga.getCollection);

      case 2:
        context$1$0.next = 4;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].DELETE_DOCUMENT_FROM_COLLECTION, _CollectionSaga.deleteDocumentFromCollection);

      case 4:
        context$1$0.next = 6;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].UPDATE_DOCUMENT_FROM_COLLECTION, _CollectionSaga.updateDocumentFromCollection);

      case 6:
        context$1$0.next = 8;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].GET_DOCUMENT, _DocumentSaga.getDocument);

      case 8:
        context$1$0.next = 10;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].UPDATE_DOCUMENT_ON_SERVER, _DocumentSaga.updateDocumentOnServer);

      case 10:
        context$1$0.next = 12;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].DELETE_DOCUMENT, _DocumentSaga.deleteDocument);

      case 12:
        context$1$0.next = 14;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].POST_NEW_DOCUMENT, _DocumentSaga.postNewDocument);

      case 14:
        context$1$0.next = 16;
        return (0, _reduxSagaEffects.takeEvery)(_types2['default'].GET_CLOUD_CODE, _CloudCodeSaga2['default']);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

exports['default'] = parseWatcher;
module.exports = exports['default'];

// Collections

// Documents

// Cloud code