(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'regenerator-runtime', 'redux-saga/effects', '../../server/apiSagaWrapper', '../../types', '../../server/api', '../actions', '../../helpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('regenerator-runtime'), require('redux-saga/effects'), require('../../server/apiSagaWrapper'), require('../../types'), require('../../server/api'), require('../actions'), require('../../helpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regeneratorRuntime, global.effects, global.apiSagaWrapper, global.types, global.api, global.actions, global.helpers);
    global.fetchCollection = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime, _effects, _apiSagaWrapper, _types, _api, _actions, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = fetchCollection;

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _types2 = _interopRequireDefault(_types);

  var _api2 = _interopRequireDefault(_api);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _marked = _regeneratorRuntime2.default.mark(fetchCollection);

  var START = _types2.default.FETCH_START;
  var FAILED = _types2.default.FETCH_FAILED;
  var FAILED_NETWORK = _types2.default.FETCH_FAILED_NETWORK;
  var FINISHED = _types2.default.FETCH_FINISHED;

  function fetchCollection(action) {
    var _action$payload, targetName, schemaName, query, skip, page, enableCount, keys, include, order, limit, target, res, errType, data, info;

    return _regeneratorRuntime2.default.wrap(function fetchCollection$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, targetName = _action$payload.targetName, schemaName = _action$payload.schemaName, query = _action$payload.query, skip = _action$payload.skip, page = _action$payload.page, enableCount = _action$payload.enableCount, keys = _action$payload.keys, include = _action$payload.include, order = _action$payload.order, limit = _action$payload.limit;
            target = targetName || schemaName;
            _context.next = 4;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null }));

          case 4:
            return _context.delegateYield((0, _apiSagaWrapper.httpRequest)(_api2.default.query, schemaName, query, limit, skip, enableCount, keys, include, order), 't0', 5);

          case 5:
            res = _context.t0;

            if (!res.error) {
              _context.next = 13;
              break;
            }

            errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
            _context.next = 10;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res }));

          case 10:
            console.error('fetchCollection err: ', schemaName, res.error);
            _context.next = 17;
            break;

          case 13:
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
            _context.next = 17;
            return (0, _effects.put)((0, _actions.setOnStore)({
              targetName: target,
              status: FINISHED,
              error: null,
              data: data,
              info: info
            }));

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  // worker
});