'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = deleteDocumentFromCollection;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [deleteDocumentFromCollection].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../../server/apiSagaWrapper');

var _types = require('../../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actionsCollections = require('../../actions/collections');

var START = _types2['default'].DELETE_DOCUMENT_FROM_COLLECTION_START;
var FAILED = _types2['default'].DELETE_DOCUMENT_FROM_COLLECTION_START;
var FINISHED = _types2['default'].DELETE_DOCUMENT_FROM_COLLECTION_START;

function deleteDocumentFromCollection(action) {
  var collectionName, objectId, targetName, res;
  return regeneratorRuntime.wrap(function deleteDocumentFromCollection$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        collectionName = action.collectionName;
        objectId = action.objectId;
        targetName = action.targetName || action.collectionName;
        context$1$0.next = 5;
        return (0, _reduxSagaEffects.put)((0, _actionsCollections.setCollectionStatus)(targetName, START));

      case 5:
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].deleteObject, collectionName, objectId), 't0', 6);

      case 6:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 13;
          break;
        }

        context$1$0.next = 10;
        return (0, _reduxSagaEffects.put)((0, _actionsCollections.setCollectionStatus)(targetName, FAILED));

      case 10:
        console.error('deleteObject err', collectionName, objectId, res.err);
        context$1$0.next = 15;
        break;

      case 13:
        context$1$0.next = 15;
        return (0, _reduxSagaEffects.put)((0, _actionsCollections.setCollectionStatus)(targetName, FINISHED));

      case 15:
        context$1$0.next = 17;
        return (0, _reduxSagaEffects.put)((0, _actionsCollections.setCollectionStatus)(targetName, _types2['default'].SUCCESS));

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

module.exports = exports['default'];

// the delete is only action for one of the all collection,
// back to success mode