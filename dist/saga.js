(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'regenerator-runtime', 'redux-saga/effects', './types', './Collection/saga', './Document/saga', './CloudCode/saga'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('regenerator-runtime'), require('redux-saga/effects'), require('./types'), require('./Collection/saga'), require('./Document/saga'), require('./CloudCode/saga'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regeneratorRuntime, global.effects, global.types, global.saga, global.saga, global.saga);
    global.saga = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime, _effects, _types, _saga, _saga2, _saga3) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = parseWatcher;

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _types2 = _interopRequireDefault(_types);

  var Collection = _interopRequireWildcard(_saga);

  var Document = _interopRequireWildcard(_saga2);

  var _saga4 = _interopRequireDefault(_saga3);

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

  var _marked = _regeneratorRuntime2.default.mark(parseWatcher);

  var FETCH_CLOUD_CODE = _types2.default.FETCH_CLOUD_CODE,
      FETCH_COLLECTION = _types2.default.FETCH_COLLECTION,
      REFRESH_COLLECTION = _types2.default.REFRESH_COLLECTION,
      DELETE_COLLECTION_DOC = _types2.default.DELETE_COLLECTION_DOC,
      PUT_COLLECTION_DOC = _types2.default.PUT_COLLECTION_DOC,
      POST_COLLECTION_DOC = _types2.default.POST_COLLECTION_DOC,
      FETCH_DOCUMENT = _types2.default.FETCH_DOCUMENT,
      PUT_DOCUMENT = _types2.default.PUT_DOCUMENT,
      DELETE_DOCUMENT = _types2.default.DELETE_DOCUMENT,
      POST_DOCUMENT = _types2.default.POST_DOCUMENT;

  // Collections

  // all market watchers
  function parseWatcher() {
    return _regeneratorRuntime2.default.wrap(function parseWatcher$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.takeEvery)(FETCH_COLLECTION, Collection.fetchCollection);

          case 2:
            _context.next = 4;
            return (0, _effects.takeEvery)(REFRESH_COLLECTION, Collection.refreshCollection);

          case 4:
            _context.next = 6;
            return (0, _effects.takeEvery)(DELETE_COLLECTION_DOC, Collection.deleteDoc);

          case 6:
            _context.next = 8;
            return (0, _effects.takeEvery)(PUT_COLLECTION_DOC, Collection.putDoc);

          case 8:
            _context.next = 10;
            return (0, _effects.takeEvery)(POST_COLLECTION_DOC, Collection.postDoc);

          case 10:
            _context.next = 12;
            return (0, _effects.takeEvery)(FETCH_DOCUMENT, Document.fetchDoc);

          case 12:
            _context.next = 14;
            return (0, _effects.takeEvery)(PUT_DOCUMENT, Document.putDoc);

          case 14:
            _context.next = 16;
            return (0, _effects.takeEvery)(DELETE_DOCUMENT, Document.deleteDoc);

          case 16:
            _context.next = 18;
            return (0, _effects.takeEvery)(POST_DOCUMENT, Document.postDoc);

          case 18:
            _context.next = 20;
            return (0, _effects.takeEvery)(FETCH_CLOUD_CODE, _saga4.default);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }
  /* eslint no-unused-vars: "off" */
});