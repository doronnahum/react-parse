(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'regenerator-runtime', 'redux-saga/effects', '../../server/httpWrapper', '../../types', '../../server/api', '../actions', '../../helpers', '../../server/Logger'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('regenerator-runtime'), require('redux-saga/effects'), require('../../server/httpWrapper'), require('../../types'), require('../../server/api'), require('../actions'), require('../../helpers'), require('../../server/Logger'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regeneratorRuntime, global.effects, global.httpWrapper, global.types, global.api, global.actions, global.helpers, global.Logger);
    global.fetchCollection = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime, _effects, _httpWrapper, _types, _api, _actions, _helpers, _Logger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = fetchCollection;

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _httpWrapper2 = _interopRequireDefault(_httpWrapper);

  var _types2 = _interopRequireDefault(_types);

  var _api2 = _interopRequireDefault(_api);

  var _Logger2 = _interopRequireDefault(_Logger);

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
    var _action$payload, targetName, schemaName, query, skip, page, enableCount, keys, include, order, limit, dataHandler, dispatchId, boomerang, target, _dispatchId, res, errType, _data, data, info;

    return _regeneratorRuntime2.default.wrap(function fetchCollection$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _action$payload = action.payload, targetName = _action$payload.targetName, schemaName = _action$payload.schemaName, query = _action$payload.query, skip = _action$payload.skip, page = _action$payload.page, enableCount = _action$payload.enableCount, keys = _action$payload.keys, include = _action$payload.include, order = _action$payload.order, limit = _action$payload.limit, dataHandler = _action$payload.dataHandler, dispatchId = _action$payload.dispatchId, boomerang = _action$payload.boomerang;
            target = targetName || schemaName;
            _dispatchId = dispatchId || '';
            _context.next = 5;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: START, error: null, loading: true, dispatchId: _dispatchId, boomerang: boomerang }));

          case 5:
            return _context.delegateYield((0, _httpWrapper2.default)(_api2.default.query, schemaName, query, limit, skip, enableCount, keys, include, order), 't0', 6);

          case 6:
            res = _context.t0;

            if (!res.error) {
              _context.next = 15;
              break;
            }

            errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;

            console.error('fetchCollection err: ', schemaName, res.error);
            _context.next = 12;
            return (0, _effects.put)((0, _actions.setOnStore)({ targetName: target, status: errType, error: res, loading: false, dispatchId: _dispatchId, boomerang: boomerang }));

          case 12:
            _Logger2.default.onError('GET', action, errType, res);
            _context.next = 21;
            break;

          case 15:
            _data = (0, _helpers.dig)(res, 'data.results');
            data = dataHandler ? dataHandler(_data) : _data;
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
            _context.next = 20;
            return (0, _effects.put)((0, _actions.setOnStore)({
              targetName: target,
              status: FINISHED,
              error: null,
              data: data,
              info: info,
              loading: false,
              dispatchId: _dispatchId,
              boomerang: boomerang
            }));

          case 20:
            _Logger2.default.onSuccess('GET', action, FINISHED, res);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  /* eslint no-unused-vars: "off" */
});