'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = putDoc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [putDoc].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../server/apiSagaWrapper');

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actions = require('../actions');

var START = _types2['default'].PUT_START;
var FAILED = _types2['default'].PUT_FAILED;
var FAILED_NETWORK = _types2['default'].PUT_FAILED_NETWORK;
var FINISHED = _types2['default'].PUT_FINISHED;

function putDoc(action) {
  var _action$payload, targetName, schemaName, objectId, data, target, res, errType;

  return regeneratorRuntime.wrap(function putDoc$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _action$payload = action.payload;
        targetName = _action$payload.targetName;
        schemaName = _action$payload.schemaName;
        objectId = _action$payload.objectId;
        data = _action$payload.data;
        target = targetName || schemaName;
        context$1$0.next = 8;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null }));

      case 8:
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].updateObject, schemaName, objectId, data), 't0', 9);

      case 9:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 17;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
        context$1$0.next = 14;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res }));

      case 14:
        console.error('putDoc err', schemaName, objectId, res.err);
        context$1$0.next = 19;
        break;

      case 17:
        context$1$0.next = 19;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: target, status: FINISHED, error: null }));

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

module.exports = exports['default'];