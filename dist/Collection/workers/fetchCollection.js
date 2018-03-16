'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = fetchCollection;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [fetchCollection].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../server/apiSagaWrapper');

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actions = require('../actions');

var _helpers = require('../../helpers');

var START = _types2['default'].FETCH_START;
var FAILED = _types2['default'].FETCH_FAILED;
var FAILED_NETWORK = _types2['default'].FETCH_FAILED_NETWORK;
var FINISHED = _types2['default'].FETCH_FINISHED;

function fetchCollection(action) {
  var _action$payload, targetName, schemaName, query, skip, page, enableCount, keys, include, order, limit, target, res, errType, data, info;

  return regeneratorRuntime.wrap(function fetchCollection$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _action$payload = action.payload;
        targetName = _action$payload.targetName;
        schemaName = _action$payload.schemaName;
        query = _action$payload.query;
        skip = _action$payload.skip;
        page = _action$payload.page;
        enableCount = _action$payload.enableCount;
        keys = _action$payload.keys;
        include = _action$payload.include;
        order = _action$payload.order;
        limit = _action$payload.limit;
        target = targetName || schemaName;
        context$1$0.next = 14;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null }));

      case 14:
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].query, schemaName, query, limit, skip, enableCount, keys, include, order), 't0', 15);

      case 15:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 23;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
        context$1$0.next = 20;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res }));

      case 20:
        console.error('fetchCollection err: ', schemaName, res.error);
        context$1$0.next = 27;
        break;

      case 23:
        data = (0, _helpers.dig)(res, 'data.results');
        info = {
          schemaName: schemaName,
          query: query,
          skip: skip,
          page: page,
          enableCount: enableCount,
          keys: keys,
          include: include,
          order: order,
          limit: limit,
          count: res.data.count,
          timestamp: Date.now()
        };
        context$1$0.next = 27;
        return (0, _reduxSagaEffects.put)((0, _actions.setOnStore)({
          targetName: target,
          status: FINISHED,
          error: null,
          data: data,
          info: info
        }));

      case 27:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

// worker
module.exports = exports['default'];