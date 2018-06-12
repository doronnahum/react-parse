(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './server/api', './server/httpWrapper', './types', './helpers', './Collection', './Document', './CloudCode', './Loader', './reducer', './saga', './selectors', './Collection/collectionActions', './Document/documentActions', './CloudCode/cloudCodeActions', './server/Logger', 'babel-polyfill'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./server/api'), require('./server/httpWrapper'), require('./types'), require('./helpers'), require('./Collection'), require('./Document'), require('./CloudCode'), require('./Loader'), require('./reducer'), require('./saga'), require('./selectors'), require('./Collection/collectionActions'), require('./Document/documentActions'), require('./CloudCode/cloudCodeActions'), require('./server/Logger'), require('babel-polyfill'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.api, global.httpWrapper, global.types, global.helpers, global.Collection, global.Document, global.CloudCode, global.Loader, global.reducer, global.saga, global.selectors, global.collectionActions, global.documentActions, global.cloudCodeActions, global.Logger, global.babelPolyfill);
    global.index = mod.exports;
  }
})(this, function (exports, _api, _httpWrapper, _types, _helpers, _Collection, _Document, _CloudCode, _Loader, _reducer, _saga, _selectors, _collectionActions, _documentActions, _cloudCodeActions, _Logger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.documentActions = exports.cloudCodeActions = exports.collectionActions = exports.actions = exports.documentSelectors = exports.collectionSelectors = exports.cloudCodeSelectors = exports.selectors = exports.parseReducer = exports.parseWatcher = exports.ShowLoader = exports.FetchCloudCode = exports.FetchDocument = exports.FetchCollection = exports.setLoggerHandlers = exports.helpers = exports.constants = exports.httpRequest = exports.api = exports.config = exports.dispatch = exports.setReactParseDispatch = undefined;

  var _api2 = _interopRequireDefault(_api);

  var _httpWrapper2 = _interopRequireDefault(_httpWrapper);

  var constants = _interopRequireWildcard(_types);

  var helpers = _interopRequireWildcard(_helpers);

  var _Collection2 = _interopRequireDefault(_Collection);

  var _Document2 = _interopRequireDefault(_Document);

  var _CloudCode2 = _interopRequireDefault(_CloudCode);

  var _Loader2 = _interopRequireDefault(_Loader);

  var _reducer2 = _interopRequireDefault(_reducer);

  var _saga2 = _interopRequireDefault(_saga);

  var _collectionActions2 = _interopRequireDefault(_collectionActions);

  var _documentActions2 = _interopRequireDefault(_documentActions);

  var _cloudCodeActions2 = _interopRequireDefault(_cloudCodeActions);

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

  // Actions
  // Common
  var config = _api2.default;
  // Logger

  // Selectors

  // Parse

  // Components


  var selectors = {
    selectCollections: _selectors.collectionSelectors.getCollections,
    selectCollectionData: _selectors.collectionSelectors.getData,
    selectCollectionLoading: _selectors.collectionSelectors.getLoading,
    selectCollectionInfo: _selectors.collectionSelectors.getInfo,
    selectCollectionStatus: _selectors.collectionSelectors.getStatus,
    selectCollectionCount: _selectors.collectionSelectors.getCount,
    selectCollectionError: _selectors.collectionSelectors.getError,

    selectDocuments: _selectors.documentSelectors.getDocuments,
    selectDocumentData: _selectors.documentSelectors.getData,
    selectDocumentLoading: _selectors.documentSelectors.getLoading,
    selectDocumentInfo: _selectors.documentSelectors.getInfo,
    selectDocumentStatus: _selectors.documentSelectors.getStatus,
    selectDocumentError: _selectors.documentSelectors.getError,

    selectCloudCodes: _selectors.cloudCodeSelectors.getCloudCodes,
    selectCloudCodeData: _selectors.cloudCodeSelectors.getData,
    selectCloudCodeLoading: _selectors.cloudCodeSelectors.getLoading,
    selectCloudCodeInfo: _selectors.cloudCodeSelectors.getInfo,
    selectCloudCodeStatus: _selectors.cloudCodeSelectors.getStatus,
    selectCloudCodeError: _selectors.cloudCodeSelectors.getError
  };
  var dispatch = null;
  var setReactParseDispatch = exports.setReactParseDispatch = function setReactParseDispatch(_dispatch) {
    exports.dispatch = dispatch = _dispatch;
  };
  var actions = {
    collectionActions: _collectionActions2.default,
    cloudCodeActions: _cloudCodeActions2.default,
    documentActions: _documentActions2.default
  };

  exports.dispatch = dispatch;
  exports.config = config;
  exports.api = _api2.default;
  exports.httpRequest = _httpWrapper2.default;
  exports.constants = constants;
  exports.helpers = helpers;
  exports.setLoggerHandlers = _Logger.setLoggerHandlers;
  exports.FetchCollection = _Collection2.default;
  exports.FetchDocument = _Document2.default;
  exports.FetchCloudCode = _CloudCode2.default;
  exports.ShowLoader = _Loader2.default;
  exports.parseWatcher = _saga2.default;
  exports.parseReducer = _reducer2.default;
  exports.selectors = selectors;
  exports.cloudCodeSelectors = _selectors.cloudCodeSelectors;
  exports.collectionSelectors = _selectors.collectionSelectors;
  exports.documentSelectors = _selectors.documentSelectors;
  exports.actions = actions;
  exports.collectionActions = _collectionActions2.default;
  exports.cloudCodeActions = _cloudCodeActions2.default;
  exports.documentActions = _documentActions2.default;
});