'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = postDoc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [postDoc].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../server/apiSagaWrapper');

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actions = require('../actions');

var START = _types2['default'].POST_START;
var FAILED = _types2['default'].POST_FAILED;
var FAILED_NETWORK = _types2['default'].POST_FAILED_NETWORK;
var FINISHED = _types2['default'].POST_FINISHED;

function postDoc(action) {
  var _action$payload, schemaName, data, targetName, target, res, errType;

  return regeneratorRuntime.wrap(function postDoc$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _action$payload = action.payload;
        schemaName = _action$payload.schemaName;
        data = _action$payload.data;
        targetName = _action$payload.targetName;
        target = targetName || schemaName;
        context$1$0.next = 7;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null }));

      case 7:
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].createObject, schemaName, data), 't0', 8);

      case 8:
        res = context$1$0.t0;

        debugger;

        if (!res.error) {
          context$1$0.next = 17;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
        context$1$0.next = 14;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res }));

      case 14:
        console.error('postDoc err', schemaName, res.err);
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