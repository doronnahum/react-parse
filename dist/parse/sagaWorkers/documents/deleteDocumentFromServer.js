'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = deleteDocumentFromServer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [deleteDocumentFromServer].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../../server/apiSagaWrapper');

var _types = require('../../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actionsDocuments = require('../../actions/documents');

var START = _types2['default'].DELETE_DOCUMENT_START;
var FAILED = _types2['default'].DELETE_DOCUMENT_FAILED;
var FINISHED = _types2['default'].DELETE_DOCUMENT_FINISHED;

function deleteDocumentFromServer(action) {
  var className, objectId, res;
  return regeneratorRuntime.wrap(function deleteDocumentFromServer$(context$1$0) {
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
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 9;
        return (0, _reduxSagaEffects.put)((0, _actionsDocuments.setDocumentStatus)(objectId, FAILED));

      case 9:
        context$1$0.next = 15;
        break;

      case 11:
        context$1$0.next = 13;
        return (0, _reduxSagaEffects.put)(_actionsDocuments.removeDocument, objectId);

      case 13:
        context$1$0.next = 15;
        return (0, _reduxSagaEffects.put)((0, _actionsDocuments.setDocumentStatus)(objectId, FINISHED));

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

module.exports = exports['default'];