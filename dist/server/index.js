(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './api', './httpWrapper', './Logger', './util/uploadFiles'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./api'), require('./httpWrapper'), require('./Logger'), require('./util/uploadFiles'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.api, global.httpWrapper, global.Logger, global.uploadFiles);
    global.index = mod.exports;
  }
})(this, function (exports, _api, _httpWrapper, _Logger, _uploadFiles) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.uploadFilesFromData = exports.httpRequest = exports.Logger = exports.api = undefined;

  var _api2 = _interopRequireDefault(_api);

  var _httpWrapper2 = _interopRequireDefault(_httpWrapper);

  var _Logger2 = _interopRequireDefault(_Logger);

  var _uploadFiles2 = _interopRequireDefault(_uploadFiles);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.api = _api2.default;
  exports.Logger = _Logger2.default;
  exports.httpRequest = _httpWrapper2.default;
  exports.uploadFilesFromData = _uploadFiles2.default;
});