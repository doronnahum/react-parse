'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getCollection;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [getCollection].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../../server/apiSagaWrapper');

var _types = require('../../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actionsCollections = require('../../actions/collections');

var _helpers = require('../../../helpers');

var LOADING = _types2['default'].LOADING;
var SUCCESS_WITH_ZERO_RESULTS = _types2['default'].SUCCESS_WITH_ZERO_RESULTS;
var ERROR = _types2['default'].ERROR;
var NETWORK_ERROR = _types2['default'].NETWORK_ERROR;
var SUCCESS = _types2['default'].SUCCESS;

function getCollection(action) {
  var collectionName, perPage, page, enableCount, query, targetName, skip, res, errType, data, queryStatus;
  return regeneratorRuntime.wrap(function getCollection$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        collectionName = action.collectionName;
        perPage = action.perPage;
        page = action.page;
        enableCount = action.enableCount;
        query = action.query;
        targetName = action.targetName || action.collectionName;
        context$1$0.next = 8;
        return (0, _reduxSagaEffects.put)((0, _actionsCollections.setCollectionStatus)(targetName, LOADING));

      case 8:
        skip = perPage && page && page - 1 > 0 ? (page - 1) * perPage : null;
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].query, collectionName, query, perPage, skip, enableCount, action.keys, action.include, '-createdAt'), 't0', 10);

      case 10:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 18;
          break;
        }

        errType = res.message === 'Network Error' ? NETWORK_ERROR : ERROR;
        context$1$0.next = 15;
        return (0, _reduxSagaEffects.put)((0, _actionsCollections.setCollectionStatus)(targetName, errType));

      case 15:
        console.error('query err: ', collectionName, res.error);
        context$1$0.next = 22;
        break;

      case 18:
        data = (0, _helpers.dig)(res, 'data.results');
        queryStatus = data.length > 0 ? SUCCESS : SUCCESS_WITH_ZERO_RESULTS;
        context$1$0.next = 22;
        return (0, _reduxSagaEffects.put)((0, _actionsCollections.setCollection)(targetName, {
          status: queryStatus,
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