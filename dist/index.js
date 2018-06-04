(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './server/api', './server/httpWrapper', './types', './helpers', './Collection', './Document', './CloudCode', './Loader', './reducer', './saga', './selectors', './actions', 'babel-polyfill'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./server/api'), require('./server/httpWrapper'), require('./types'), require('./helpers'), require('./Collection'), require('./Document'), require('./CloudCode'), require('./Loader'), require('./reducer'), require('./saga'), require('./selectors'), require('./actions'), require('babel-polyfill'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.api, global.httpWrapper, global.types, global.helpers, global.Collection, global.Document, global.CloudCode, global.Loader, global.reducer, global.saga, global.selectors, global.actions, global.babelPolyfill);
    global.index = mod.exports;
  }
})(this, function (exports, _api, _httpWrapper, _types, _helpers, _Collection, _Document, _CloudCode, _Loader, _reducer, _saga, _selectors, _actions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.actions = exports.selectors = exports.parseReducer = exports.parseWatcher = exports.ShowLoader = exports.FetchCloudCode = exports.FetchDocument = exports.FetchCollection = exports.helpers = exports.types = exports.httpRequest = exports.api = exports.config = undefined;

  var _api2 = _interopRequireDefault(_api);

  var _httpWrapper2 = _interopRequireDefault(_httpWrapper);

  var _types2 = _interopRequireDefault(_types);

  var helpers = _interopRequireWildcard(_helpers);

  var _Collection2 = _interopRequireDefault(_Collection);

  var _Document2 = _interopRequireDefault(_Document);

  var _CloudCode2 = _interopRequireDefault(_CloudCode);

  var _Loader2 = _interopRequireDefault(_Loader);

  var _reducer2 = _interopRequireDefault(_reducer);

  var _saga2 = _interopRequireDefault(_saga);

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

  // Selectors

  // Parse

  // Components
  var config = _api2.default;
  // Actions
  // Common


  var actions = {
    fetchCloudCode: _actions.CloudCodeActions.fetchData,
    cleanCloudCode: _actions.CloudCodeActions.cleanData,
    cleanCloudCodse: _actions.CloudCodeActions.cleanCloudCode,
    fetchCollection: _actions.CollectionActions.fetchData,
    cleanCollection: _actions.CollectionActions.cleanData,
    putDocInCollection: _actions.CollectionActions.putDoc,
    postDocInCollection: _actions.CollectionActions.postDoc,
    deleteDocInCollection: _actions.CollectionActions.deleteDoc,
    cleanCollections: _actions.CollectionActions.cleanCollections,
    fetchDocument: _actions.DocumentActions.fetchData,
    putDocument: _actions.DocumentActions.putDoc,
    postDocument: _actions.DocumentActions.postDoc,
    deleteDocument: _actions.DocumentActions.deleteDoc,
    cleanDocument: _actions.DocumentActions.cleanData,
    cleanDocuments: _actions.DocumentActions.clearDocuments
  };
  var selectors = {
    selectCollections: _selectors.CollectionSelectors.getCollections,
    selectCollectionData: _selectors.CollectionSelectors.getData,
    selectCollectionLoading: _selectors.CollectionSelectors.getLoading,
    selectCollectionInfo: _selectors.CollectionSelectors.getInfo,
    selectCollectionStatus: _selectors.CollectionSelectors.getStatus,

    selectDocuments: _selectors.DocumentSelectors.getDocuments,
    selectDocumentData: _selectors.DocumentSelectors.getData,
    selectDocumentLoading: _selectors.DocumentSelectors.getLoading,
    selectDocumentInfo: _selectors.DocumentSelectors.getInfo,
    selectDocumentStatus: _selectors.DocumentSelectors.getStatus,

    selectCloudCodes: _selectors.CloudCodeSelectors.getCloudCodes,
    selectCloudCodeData: _selectors.CloudCodeSelectors.getData,
    selectCloudCodeLoading: _selectors.CloudCodeSelectors.getLoading,
    selectCloudCodeInfo: _selectors.CloudCodeSelectors.getInfo,
    selectCloudCodeStatus: _selectors.CloudCodeSelectors.getStatus
  };
  exports.config = config;
  exports.api = _api2.default;
  exports.httpRequest = _httpWrapper2.default;
  exports.types = _types2.default;
  exports.helpers = helpers;
  exports.FetchCollection = _Collection2.default;
  exports.FetchDocument = _Document2.default;
  exports.FetchCloudCode = _CloudCode2.default;
  exports.ShowLoader = _Loader2.default;
  exports.parseWatcher = _saga2.default;
  exports.parseReducer = _reducer2.default;
  exports.selectors = selectors;
  exports.actions = actions;
});