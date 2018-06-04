(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './workers/fetchCollection', './workers/refreshCollection', './workers/deleteDoc', './workers/putDoc', './workers/postDoc'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./workers/fetchCollection'), require('./workers/refreshCollection'), require('./workers/deleteDoc'), require('./workers/putDoc'), require('./workers/postDoc'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fetchCollection, global.refreshCollection, global.deleteDoc, global.putDoc, global.postDoc);
    global.saga = mod.exports;
  }
})(this, function (exports, _fetchCollection, _refreshCollection, _deleteDoc, _putDoc, _postDoc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.refreshCollection = exports.postDoc = exports.putDoc = exports.deleteDoc = exports.fetchCollection = undefined;

  var _fetchCollection2 = _interopRequireDefault(_fetchCollection);

  var _refreshCollection2 = _interopRequireDefault(_refreshCollection);

  var _deleteDoc2 = _interopRequireDefault(_deleteDoc);

  var _putDoc2 = _interopRequireDefault(_putDoc);

  var _postDoc2 = _interopRequireDefault(_postDoc);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.fetchCollection = _fetchCollection2.default;
  exports.deleteDoc = _deleteDoc2.default;
  exports.putDoc = _putDoc2.default;
  exports.postDoc = _postDoc2.default;
  exports.refreshCollection = _refreshCollection2.default;
});