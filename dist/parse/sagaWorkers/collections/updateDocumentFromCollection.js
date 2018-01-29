'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = updateDocumentFromCollection;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [updateDocumentFromCollection].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../../server/apiSagaWrapper');

var _types = require('../../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actionsCollections = require('../../actions/collections');

var START = _types2['default'].UPDATE_DOCUMENT_FROM_COLLECTION_START;
var FAILED = _types2['default'].UPDATE_DOCUMENT_FROM_COLLECTION_FAILED;
var FINISHED = _types2['default'].UPDATE_DOCUMENT_FROM_COLLECTION_FINISHED;

function updateDocumentFromCollection(action) {
  var collectionName, objectId, data, targetName, res;
  return regeneratorRuntime.wrap(function updateDocumentFromCollection$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        collectionName = action.collectionName;
        objectId = action.objectId;
        data = action.data;
        targetName = action.targetName || action.collectionName;
        context$1$0.next = 6;
        return (0, _reduxSagaEffects.put)((0, _actionsCollections.setCollectionStatus)(targetName, START));

      case 6:
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].updateObject, collectionName, objectId, data), 't0', 7);

      case 7:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 11;
        return (0, _reduxSagaEffects.put)((0, _actionsCollections.setCollectionStatus)(targetName, FAILED));

      case 11:
        console.error('deleteObject err', collectionName, objectId, res.err);
        context$1$0.next = 16;
        break;

      case 14:
        context$1$0.next = 16;
        return (0, _reduxSagaEffects.put)((0, _actionsCollections.setCollectionStatus)(targetName, FINISHED));

      case 16:
        context$1$0.next = 18;
        return (0, _reduxSagaEffects.put)((0, _actionsCollections.setCollectionStatus)(targetName, _types2['default'].SUCCESS));

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

module.exports = exports['default'];

// the update is only action for one of the all collection,
// back to success mode