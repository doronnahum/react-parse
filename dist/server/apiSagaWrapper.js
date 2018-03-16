(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'redux-saga/effects', '../helpers', '../types', "regenerator-runtime"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('redux-saga/effects'), require('../helpers'), require('../types'), require("regenerator-runtime"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.effects, global.helpers, global.types, global.regeneratorRuntime);
    global.apiSagaWrapper = mod.exports;
  }
})(this, function (exports, _effects, _helpers, _types, regeneratorRuntime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.httpRequest = undefined;

  var _types2 = _interopRequireDefault(_types);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var http = regeneratorRuntime.mark(function http() {
    var res,
        _args = arguments;
    return regeneratorRuntime.wrap(function http$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _effects.call.apply(undefined, _args);

          case 3:
            res = _context.sent;
            return _context.abrupt('return', res);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            _context.t0.error = true;

            if (!((0, _helpers.dig)(_context.t0, 'response.data.code') === 209)) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return (0, _effects.put)({ type: _types2.default.INVALID_SESSION_TOKEN });

          case 13:
            return _context.abrupt('return', _context.t0);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, http, this, [[0, 7]]);
  });
  var httpRequest = exports.httpRequest = http;
});