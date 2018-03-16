'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = parseWatcher;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [parseWatcher].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

var _CollectionSaga = require('./Collection/saga');

var Collection = _interopRequireWildcard(_CollectionSaga);

var _DocumentSaga = require('./Document/saga');

var Document = _interopRequireWildcard(_DocumentSaga);

var _CloudCodeSaga = require('./CloudCode/saga');

var _CloudCodeSaga2 = _interopRequireDefault(_CloudCodeSaga);

var FETCH_CLOUD_CODE = _types2['default'].FETCH_CLOUD_CODE;
var FETCH_COLLECTION = _types2['default'].FETCH_COLLECTION;
var DELETE_COLLECTION_DOC = _types2['default'].DELETE_COLLECTION_DOC;
var PUT_COLLECTION_DOC = _types2['default'].PUT_COLLECTION_DOC;
var POST_COLLECTION_DOC = _types2['default'].POST_COLLECTION_DOC;
var FETCH_DOCUMENT = _types2['default'].FETCH_DOCUMENT;
var PUT_DOCUMENT = _types2['default'].PUT_DOCUMENT;
var DELETE_DOCUMENT = _types2['default'].DELETE_DOCUMENT;
var POST_DOCUMENT = _types2['default'].POST_DOCUMENT;

// Collections

// all market watchers

function parseWatcher() {
  return regeneratorRuntime.wrap(function parseWatcher$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return (0, _reduxSagaEffects.takeEvery)(FETCH_COLLECTION, Collection.fetchCollection);

      case 2:
        context$1$0.next = 4;
        return (0, _reduxSagaEffects.takeEvery)(DELETE_COLLECTION_DOC, Collection.deleteDoc);

      case 4:
        context$1$0.next = 6;
        return (0, _reduxSagaEffects.takeEvery)(PUT_COLLECTION_DOC, Collection.putDoc);

      case 6:
        context$1$0.next = 8;
        return (0, _reduxSagaEffects.takeEvery)(POST_COLLECTION_DOC, Collection.postDoc);

      case 8:
        context$1$0.next = 10;
        return (0, _reduxSagaEffects.takeEvery)(FETCH_DOCUMENT, Document.fetchDoc);

      case 10:
        context$1$0.next = 12;
        return (0, _reduxSagaEffects.takeEvery)(PUT_DOCUMENT, Document.putDoc);

      case 12:
        context$1$0.next = 14;
        return (0, _reduxSagaEffects.takeEvery)(DELETE_DOCUMENT, Document.deleteDoc);

      case 14:
        context$1$0.next = 16;
        return (0, _reduxSagaEffects.takeEvery)(POST_DOCUMENT, Document.postDoc);

      case 16:
        context$1$0.next = 18;
        return (0, _reduxSagaEffects.takeEvery)(FETCH_CLOUD_CODE, _CloudCodeSaga2['default']);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

module.exports = exports['default'];

// Collections

// Documents

// Cloud code