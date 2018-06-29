(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'regenerator-runtime', '../api', 'redux-saga/effects'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('regenerator-runtime'), require('../api'), require('redux-saga/effects'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.regeneratorRuntime, global.api, global.effects);
    global.uploadFiles = mod.exports;
  }
})(this, function (exports, _regeneratorRuntime, _api, _effects) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setRNFetchBlob = undefined;
  exports.default = uploadFilesFromData;

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _api2 = _interopRequireDefault(_api);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _marked = _regeneratorRuntime2.default.mark(uploadFilesFromData);

  var RNFetchBlob = null;

  var setRNFetchBlob = exports.setRNFetchBlob = function setRNFetchBlob(res) {
    RNFetchBlob = res;
  };
  var browserFileUnloader = _regeneratorRuntime2.default.mark(function _callee(file) {
    return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.call)(_api2.default.uploadFile, file);

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
  var nativeFileUnloader = _regeneratorRuntime2.default.mark(function _callee2(file) {
    return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (RNFetchBlob) {
              _context2.next = 4;
              break;
            }

            throw 'react parse need instance of RNFetchBlob, please install rn-fetch-blo and use setRNFetchBlob from react-parse';

          case 4:
            _context2.next = 6;
            return (0, _effects.call)(_api2.default.uploadFileFromReactNativeStorage, RNFetchBlob, file);

          case 6:
            return _context2.abrupt('return', _context2.sent);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  });

  function uploadFilesFromData(data, fileValueHandler) {
    var isReactNative, k, fileRes;
    return _regeneratorRuntime2.default.wrap(function uploadFilesFromData$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (data) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return');

          case 2:
            isReactNative = typeof navigator != 'undefined' && navigator.product == 'ReactNative';
            _context3.t0 = _regeneratorRuntime2.default.keys(data);

          case 4:
            if ((_context3.t1 = _context3.t0()).done) {
              _context3.next = 26;
              break;
            }

            k = _context3.t1.value;

            if (!(data[k] instanceof File)) {
              _context3.next = 24;
              break;
            }

            fileRes = void 0;
            _context3.prev = 8;

            if (!isReactNative) {
              _context3.next = 15;
              break;
            }

            _context3.next = 12;
            return nativeFileUnloader(data[k]);

          case 12:
            fileRes = _context3.sent;
            _context3.next = 18;
            break;

          case 15:
            _context3.next = 17;
            return browserFileUnloader(data[k]);

          case 17:
            fileRes = _context3.sent;

          case 18:
            _context3.next = 23;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t2 = _context3['catch'](8);
            throw _context3.t2;

          case 23:
            data[k] = fileValueHandler ? fileValueHandler(fileRes) : {
              name: isReactNative ? fileRes.name : fileRes.data.name,
              url: isReactNative ? fileRes.url : fileRes.data.url,
              __type: 'File'
            };

          case 24:
            _context3.next = 4;
            break;

          case 26:
            return _context3.abrupt('return', data);

          case 27:
          case 'end':
            return _context3.stop();
        }
      }
    }, _marked, this, [[8, 20]]);
  }
});