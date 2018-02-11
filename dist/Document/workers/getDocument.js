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

var _types$statues = _types2['default'].statues;
var GET_START = _types$statues.GET_START;
var GET_FAILED = _types$statues.GET_FAILED;
var GET_FAILED_NETWORK = _types$statues.GET_FAILED_NETWORK;
var GET_FINISHED = _types$statues.GET_FINISHED;

var START = GET_START;
var FAILED = GET_FAILED;
var FAILED_NETWORK = GET_FAILED_NETWORK;
var FINISHED = GET_FINISHED;

function getDocument(action) {
  var className, objectId, include, res, errType, data;
  return regeneratorRuntime.wrap(function getDocument$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        className = action.className;
        objectId = action.objectId;
        include = action.include;
        context$1$0.next = 5;
        return (0, _reduxSagaEffects.put)((0, _actionsDocuments.setDocumentStatus)(objectId, START));

      case 5:
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].query, className, { objectId: objectId }, null, null, null, null, include, null), 't0', 6);

      case 6:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 14;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;

        console.error('get document err', objectId, res.error);
        context$1$0.next = 12;
        return (0, _reduxSagaEffects.put)((0, _actionsDocuments.setDocumentStatus)(objectId, errType));

      case 12:
        context$1$0.next = 17;
        break;

      case 14:
        data = res.data.results ? res.data.results : [];
        context$1$0.next = 17;
        return (0, _reduxSagaEffects.put)({
          type: _types2['default'].SET_DOCUMENTS_PARAMETERS,
          objectId: objectId,
          data: data[0],
          status: FINISHED,
          info: {
            timestamp: Date.now()
          }
        });

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

// worker
module.exports = exports['default'];
// extricate data from server response