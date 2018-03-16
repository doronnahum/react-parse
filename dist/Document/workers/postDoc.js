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

var _helpers = require('../../helpers');

var START = _types2['default'].POST_START;
var FAILED = _types2['default'].POST_FAILED;
var FAILED_NETWORK = _types2['default'].POST_FAILED_NETWORK;
var FINISHED = _types2['default'].POST_FINISHED;

function postDoc(action) {
  var _action$payload, targetName, schemaName, data, res, errType, info;

  return regeneratorRuntime.wrap(function postDoc$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _action$payload = action.payload;
        targetName = _action$payload.targetName;
        schemaName = _action$payload.schemaName;
        data = _action$payload.data;
        context$1$0.next = 6;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: targetName, status: START, error: null }));

      case 6:
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].createObject, schemaName, data), 't0', 7);

      case 7:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 15;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;

        console.error('deleteDoc err', targetName, res.error);
        context$1$0.next = 13;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: targetName, status: errType, error: res }));

      case 13:
        context$1$0.next = 18;
        break;

      case 15:
        info = {
          timestamp: Date.now(),
          schemaName: schemaName,
          objectId: res.data.objectId,
          data: data,
          resData: (0, _helpers.dig)(res, 'data.results[0]')
        };
        context$1$0.next = 18;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({
          targetName: targetName,
          status: FINISHED,
          info: info,
          error: null
        }));

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

// worker
module.exports = exports['default'];