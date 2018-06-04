(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './workers/fetchDoc', './workers/putDoc', './workers/deleteDoc', './workers/postDoc'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./workers/fetchDoc'), require('./workers/putDoc'), require('./workers/deleteDoc'), require('./workers/postDoc'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fetchDoc, global.putDoc, global.deleteDoc, global.postDoc);
    global.saga = mod.exports;
  }
})(this, function (exports, _fetchDoc, _putDoc, _deleteDoc, _postDoc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.postDoc = exports.deleteDoc = exports.putDoc = exports.fetchDoc = undefined;

  var _fetchDoc2 = _interopRequireDefault(_fetchDoc);

  var _putDoc2 = _interopRequireDefault(_putDoc);

  var _deleteDoc2 = _interopRequireDefault(_deleteDoc);

  var _postDoc2 = _interopRequireDefault(_postDoc);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.fetchDoc = _fetchDoc2.default;
  exports.putDoc = _putDoc2.default;
  exports.deleteDoc = _deleteDoc2.default;
  exports.postDoc = _postDoc2.default;
});