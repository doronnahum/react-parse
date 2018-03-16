(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './server/api', './server/apiSagaWrapper', './types', './helpers', './Collection', './Document', './CloudCode', './reducer', './saga', './selectors', 'babel-polyfill'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./server/api'), require('./server/apiSagaWrapper'), require('./types'), require('./helpers'), require('./Collection'), require('./Document'), require('./CloudCode'), require('./reducer'), require('./saga'), require('./selectors'), require('babel-polyfill'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.api, global.apiSagaWrapper, global.types, global.helpers, global.Collection, global.Document, global.CloudCode, global.reducer, global.saga, global.selectors, global.babelPolyfill);
    global.index = mod.exports;
  }
})(this, function (exports, _api, _apiSagaWrapper, _types, _helpers, _Collection, _Document, _CloudCode, _reducer, _saga, _selectors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectors = exports.parseReducer = exports.parseWatcher = exports.FetchCloudCode = exports.FetchDocument = exports.FetchCollection = exports.helpers = exports.types = exports.httpRequest = exports.api = undefined;

  var _api2 = _interopRequireDefault(_api);

  var _apiSagaWrapper2 = _interopRequireDefault(_apiSagaWrapper);

  var _types2 = _interopRequireDefault(_types);

  var helpers = _interopRequireWildcard(_helpers);

  var _Collection2 = _interopRequireDefault(_Collection);

  var _Document2 = _interopRequireDefault(_Document);

  var _CloudCode2 = _interopRequireDefault(_CloudCode);

  var _reducer2 = _interopRequireDefault(_reducer);

  var _saga2 = _interopRequireDefault(_saga);

  var _selectors2 = _interopRequireDefault(_selectors);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.api = _api2.default;
  exports.httpRequest = _apiSagaWrapper2.default;
  exports.types = _types2.default;
  exports.helpers = helpers;
  exports.FetchCollection = _Collection2.default;
  exports.FetchDocument = _Document2.default;
  exports.FetchCloudCode = _CloudCode2.default;
  exports.parseWatcher = _saga2.default;
  exports.parseReducer = _reducer2.default;
  exports.selectors = _selectors2.default;
});