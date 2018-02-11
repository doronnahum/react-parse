'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = deleteDocument;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [deleteDocument].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../../server/apiSagaWrapper');

var _types = require('../../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actionsDocuments = require('../../actions/documents');

var START = _types2['default'].DELETE_START;
var FAILED = _types2['default'].DELETE_FAILED;
var FAILED_NETWORK = _types2['default'].DELETE_FAILED_NETWORK;
var FINISHED = _types2['default'].DELETE_FINISHED;

function deleteDocument(action) {
  var className, objectId, res, errType;
  return regeneratorRuntime.wrap(function deleteDocument$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        className = action.className;
        objectId = action.objectId;
        context$1$0.next = 4;
        return (0, _reduxSagaEffects.put)((0, _actionsDocuments.setDocumentStatus)(objectId, START));

      case 4:
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].deleteObject, className, objectId), 't0', 5);

      case 5:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 12;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
        context$1$0.next = 10;
        return (0, _reduxSagaEffects.put)((0, _actionsDocuments.setDocumentStatus)(objectId, errType));

      case 10:
        context$1$0.next = 16;
        break;

      case 12:
        context$1$0.next = 14;
        return (0, _reduxSagaEffects.put)(_actionsDocuments.removeDocument, objectId);

      case 14:
        context$1$0.next = 16;
        return (0, _reduxSagaEffects.put)((0, _actionsDocuments.setDocumentStatus)(objectId, FINISHED));

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

module.exports = exports['default'];