'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getDocument;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [getDocument].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../../server/apiSagaWrapper');

var _types = require('../../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actionsDocuments = require('../../actions/documents');

function getDocument(action) {
  var className, objectId, include, res, errType, data, queryStatus;
  return regeneratorRuntime.wrap(function getDocument$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        className = action.className;
        objectId = action.objectId;
        include = action.include;
        context$1$0.next = 5;
        return (0, _reduxSagaEffects.put)((0, _actionsDocuments.setDocumentStatus)(objectId, _types2['default'].LOADING));

      case 5:
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].query, className, { objectId: objectId }, null, null, null, null, include, null), 't0', 6);

      case 6:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 14;
          break;
        }

        errType = res.message === 'Network Error' ? _types2['default'].NETWORK_ERROR : _types2['default'].ERROR;

        console.error('get document err', objectId, res.error);
        context$1$0.next = 12;
        return (0, _reduxSagaEffects.put)((0, _actionsDocuments.setDocumentStatus)(objectId, errType));

      case 12:
        context$1$0.next = 18;
        break;

      case 14:
        data = res.data.results ? res.data.results : [];
        queryStatus = data.length > 0 ? _types2['default'].SUCCESS : _types2['default'].SUCCESS_WITH_ZERO_RESULTS;
        context$1$0.next = 18;
        return (0, _reduxSagaEffects.put)({
          type: _types2['default'].SET_DOCUMENTS_PARAMETERS,
          objectId: objectId,
          data: data[0],
          status: queryStatus,
          info: {
            timestamp: Date.now()
          }
        });

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

// worker
module.exports = exports['default'];
// extricate data from server response