'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = updateDocumentFromCollection;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [updateDocumentFromCollection].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../server/apiSagaWrapper');

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actions = require('../actions');

var START = _types2['default'].UPDATE_START;
var FAILED = _types2['default'].UPDATE_FAILED;
var FAILED_NETWORK = _types2['default'].UPDATE_FAILED_NETWORK;
var FINISHED = _types2['default'].UPDATE_FINISHED;

function updateDocumentFromCollection(action) {
  var collectionName, objectId, data, targetName, res, errType;
  return regeneratorRuntime.wrap(function updateDocumentFromCollection$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        collectionName = action.collectionName;
        objectId = action.objectId;
        data = action.data;
        targetName = action.targetName || action.collectionName;
        context$1$0.next = 6;
        return (0, _reduxSagaEffects.put)((0, _actions.setStatus)(targetName, START));

      case 6:
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].updateObject, collectionName, objectId, data), 't0', 7);

      case 7:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 15;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
        context$1$0.next = 12;
        return (0, _reduxSagaEffects.put)((0, _actions.setStatus)(targetName, errType));

      case 12:
        console.error('deleteObject err', collectionName, objectId, res.err);
        context$1$0.next = 17;
        break;

      case 15:
        context$1$0.next = 17;
        return (0, _reduxSagaEffects.put)((0, _actions.setStatus)(targetName, FINISHED));

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

module.exports = exports['default'];