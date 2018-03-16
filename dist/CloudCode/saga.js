'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = fetchCloudCode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [fetchCloudCode].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../server/apiSagaWrapper');

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _helpers = require('../helpers');

var _actions = require('./actions');

var START = _types2['default'].FETCH_START;
var FAILED = _types2['default'].FETCH_FAILED;
var FAILED_NETWORK = _types2['default'].FETCH_FAILED_NETWORK;
var FINISHED = _types2['default'].FETCH_FINISHED;

function fetchCloudCode(action) {
  var _action$payload, functionName, targetName, params, digToData, target, res, errType, data;

  return regeneratorRuntime.wrap(function fetchCloudCode$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _action$payload = action.payload;
        functionName = _action$payload.functionName;
        targetName = _action$payload.targetName;
        params = _action$payload.params;
        digToData = _action$payload.digToData;
        target = targetName || functionName;
        context$1$0.next = 8;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null }));

      case 8:
        context$1$0.next = 10;
        return (0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].getCloudFunction, functionName, params);

      case 10:
        res = context$1$0.sent;

        if (!(res.error || (0, _helpers.dig)(res, 'response.data.error'))) {
          context$1$0.next = 18;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
        context$1$0.next = 15;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res }));

      case 15:
        console.error('getCloudFunction err: ', functionName, res.error);
        context$1$0.next = 21;
        break;

      case 18:
        data = (0, _helpers.dig)(res, digToData);
        context$1$0.next = 21;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({
          targetName: target,
          status: FINISHED,
          error: null,
          data: data,
          info: {
            params: params,
            timestamp: Date.now()
          }
        }));

      case 21:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

module.exports = exports['default'];