'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getCollection;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [getCollection].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../server/apiSagaWrapper');

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actions = require('../actions');

var _helpers = require('../../helpers');

var START = _types2['default'].GET_START;
var FAILED = _types2['default'].GET_FAILED;
var FAILED_NETWORK = _types2['default'].GET_FAILED_NETWORK;
var FINISHED = _types2['default'].GET_FINISHED;

function getCollection(action) {
  var _action$payload, collectionName, perPage, page, enableCount, query, targetName, skip, res, errType, data;

  return regeneratorRuntime.wrap(function getCollection$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _action$payload = action.payload;
        collectionName = _action$payload.collectionName;
        perPage = _action$payload.perPage;
        page = _action$payload.page;
        enableCount = _action$payload.enableCount;
        query = _action$payload.query;
        targetName = action.payload.targetName || collectionName;
        context$1$0.next = 9;
        return (0, _reduxSagaEffects.put)((0, _actions.setCollectionStatus)(targetName, START));

      case 9:
        skip = perPage && page && page - 1 > 0 ? (page - 1) * perPage : null;
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].query, collectionName, query, perPage, skip, enableCount, action.keys, action.include, '-createdAt'), 't0', 11);

      case 11:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 19;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
        context$1$0.next = 16;
        return (0, _reduxSagaEffects.put)((0, _actions.setCollectionStatus)(targetName, errType));

      case 16:
        console.error('query err: ', collectionName, res.error);
        context$1$0.next = 22;
        break;

      case 19:
        data = (0, _helpers.dig)(res, 'data.results');
        context$1$0.next = 22;
        return (0, _reduxSagaEffects.put)((0, _actions.setCollection)(targetName, {
          status: FINISHED,
          data: data,
          info: {
            collectionName: collectionName,
            page: page,
            perPage: perPage,
            skip: skip,
            count: res.data.count,
            timestamp: Date.now(),
            query: query
          }
        }));

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

// worker
module.exports = exports['default'];