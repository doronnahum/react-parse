'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = fetchDoc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [fetchDoc].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../server/apiSagaWrapper');

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actions = require('../actions');

var START = _types2['default'].FETCH_START;
var FAILED = _types2['default'].FETCH_FAILED;
var FAILED_NETWORK = _types2['default'].FETCH_FAILED_NETWORK;
var FINISHED = _types2['default'].FETCH_FINISHED;

function fetchDoc(action) {
  var _action$payload, targetName, schemaName, objectId, include, keys, target, res, errType, info, data;

  return regeneratorRuntime.wrap(function fetchDoc$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _action$payload = action.payload;
        targetName = _action$payload.targetName;
        schemaName = _action$payload.schemaName;
        objectId = _action$payload.objectId;
        include = _action$payload.include;
        keys = _action$payload.keys;
        target = targetName || objectId;
        context$1$0.next = 9;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null }));

      case 9:
        debugger;
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].getObjectById, schemaName, objectId, keys, include), 't0', 11);

      case 11:
        res = context$1$0.t0;

        debugger;

        if (!res.error) {
          context$1$0.next = 20;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;

        console.error('get document err', objectId, res.error);
        context$1$0.next = 18;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res }));

      case 18:
        context$1$0.next = 24;
        break;

      case 20:
        info = {
          timestamp: Date.now(),
          keys: keys,
          include: include,
          schemaName: schemaName
        };
        data = res.data;
        context$1$0.next = 24;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({
          targetName: target,
          status: FINISHED,
          data: data,
          info: info,
          error: null
        }));

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

// worker
module.exports = exports['default'];