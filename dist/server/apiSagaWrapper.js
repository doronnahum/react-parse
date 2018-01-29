'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.httpRequest = httpRequest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [httpRequest].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _helpers = require('../helpers');

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

function httpRequest() {
  var res,
      args$1$0 = arguments;
  return regeneratorRuntime.wrap(function httpRequest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _reduxSagaEffects.call.apply(undefined, args$1$0);

      case 3:
        res = context$1$0.sent;
        return context$1$0.abrupt('return', res);

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](0);

        context$1$0.t0.error = true;

        if (!((0, _helpers.dig)(context$1$0.t0, 'response.data.code') === 209)) {
          context$1$0.next = 13;
          break;
        }

        context$1$0.next = 13;
        return (0, _reduxSagaEffects.put)({ type: _types2['default'].INVALID_SESSION_TOKEN });

      case 13:
        return context$1$0.abrupt('return', context$1$0.t0);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this, [[0, 7]]);
}

// invalid session token