(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'redux-saga/effects', './ErrorHandle', 'regenerator-runtime'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('redux-saga/effects'), require('./ErrorHandle'), require('regenerator-runtime'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.effects, global.ErrorHandle, global.regeneratorRuntime);
    global.httpWrapper = mod.exports;
  }
})(this, function (exports, _effects, _ErrorHandle, regeneratorRuntime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = httpRequest;

  var _ErrorHandle2 = _interopRequireDefault(_ErrorHandle);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _marked = regeneratorRuntime.mark(httpRequest),
      _marked2 = regeneratorRuntime.mark(makeRequest);

  function httpRequest() {
    var res,
        _args = arguments;
    return regeneratorRuntime.wrap(function httpRequest$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return makeRequest.apply(undefined, _args);

          case 3:
            res = _context.sent;
            return _context.abrupt('return', res);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            _context.t0.error = true;
            _context.next = 12;
            return (0, _ErrorHandle2.default)(_context.t0);

          case 12:
            return _context.abrupt('return', _context.t0);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this, [[0, 7]]);
  }

  function makeRequest() {
    var _args2 = arguments;
    return regeneratorRuntime.wrap(function makeRequest$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _effects.call.apply(undefined, _args2);

          case 2:
            return _context2.abrupt('return', _context2.sent);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked2, this);
  };

  /* eslint no-unused-vars: "off" */
});