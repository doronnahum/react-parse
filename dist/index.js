(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './server/api', './server/httpWrapper', './types', './helpers', './Collection', './Document', './CloudCode', './Loader', './reducer', './saga', './selectors', './Collection/collectionActions', './Document/documentActions', './CloudCode/cloudCodeActions', './Collection/actions', './Document/actions', './CloudCode/actions', './server/Logger', 'babel-polyfill'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./server/api'), require('./server/httpWrapper'), require('./types'), require('./helpers'), require('./Collection'), require('./Document'), require('./CloudCode'), require('./Loader'), require('./reducer'), require('./saga'), require('./selectors'), require('./Collection/collectionActions'), require('./Document/documentActions'), require('./CloudCode/cloudCodeActions'), require('./Collection/actions'), require('./Document/actions'), require('./CloudCode/actions'), require('./server/Logger'), require('babel-polyfill'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.api, global.httpWrapper, global.types, global.helpers, global.Collection, global.Document, global.CloudCode, global.Loader, global.reducer, global.saga, global.selectors, global.collectionActions, global.documentActions, global.cloudCodeActions, global.actions, global.actions, global.actions, global.Logger, global.babelPolyfill);
    global.index = mod.exports;
  }
})(this, function (exports, _api, _httpWrapper, _types, _helpers, _Collection, _Document, _CloudCode, _Loader, _reducer, _saga, _selectors, _collectionActions2, _documentActions2, _cloudCodeActions2, _actions, _actions2, _actions3, _Logger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.documentActions = exports.cloudCodeActions = exports.collectionActions = exports.actions = exports.documentSelectors = exports.collectionSelectors = exports.cloudCodeSelectors = exports.selectors = exports.parseReducer = exports.parseWatcher = exports.ShowLoader = exports.FetchCloudCode = exports.FetchDocument = exports.FetchCollection = exports.setLoggerHandlers = exports.cleanAllState = exports.setClearStateActionType = exports.helpers = exports.constants = exports.httpRequest = exports.api = exports.config = exports.dispatch = exports.setReactParseDispatch = undefined;

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

  var _collectionActions = _interopRequireWildcard(_collectionActions2);

  var _documentActions = _interopRequireWildcard(_documentActions2);

  var _cloudCodeActions = _interopRequireWildcard(_cloudCodeActions2);

  var pureCollectionActions = _interopRequireWildcard(_actions);

  var pureDocumentActions = _interopRequireWildcard(_actions2);

  var pureCloudCodeActions = _interopRequireWildcard(_actions3);

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

  // Pure actions

  // Selectors

  // Parse

  // Components
  var config = _api2.default;
  // Logger

  // Actions Wrapped with dispatch
  // Common


  var selectors = {
    selectCollections: _selectors.collectionSelectors.getCollections,
    selectCollection: _selectors.collectionSelectors.getCollection,
    selectCollectionData: _selectors.collectionSelectors.getData,
    selectCollectionLoading: _selectors.collectionSelectors.getLoading,
    selectCollectionInfo: _selectors.collectionSelectors.getInfo,
    selectCollectionStatus: _selectors.collectionSelectors.getStatus,
    selectCollectionCount: _selectors.collectionSelectors.getCount,
    selectCollectionError: _selectors.collectionSelectors.getError,
    selectCollectionDispatchId: _selectors.collectionSelectors.getDispatchId,
    selectCollectionBoomerang: _selectors.collectionSelectors.getBoomerang,

    selectDocuments: _selectors.documentSelectors.getDocuments,
    selectDocument: _selectors.documentSelectors.getDocument,
    selectDocumentData: _selectors.documentSelectors.getData,
    selectDocumentLoading: _selectors.documentSelectors.getLoading,
    selectDocumentInfo: _selectors.documentSelectors.getInfo,
    selectDocumentStatus: _selectors.documentSelectors.getStatus,
    selectDocumentError: _selectors.documentSelectors.getError,
    selectDocumentDispatchId: _selectors.documentSelectors.getDispatchId,
    selectDocumentBoomerang: _selectors.documentSelectors.getBoomerang,

    selectCloudCodes: _selectors.cloudCodeSelectors.getCloudCodes,
    selectCloudCode: _selectors.cloudCodeSelectors.getCloudCode,
    selectCloudCodeData: _selectors.cloudCodeSelectors.getData,
    selectCloudCodeLoading: _selectors.cloudCodeSelectors.getLoading,
    selectCloudCodeInfo: _selectors.cloudCodeSelectors.getInfo,
    selectCloudCodeStatus: _selectors.cloudCodeSelectors.getStatus,
    selectCloudCodeError: _selectors.cloudCodeSelectors.getError,
    selectCloudCodeDispatchId: _selectors.cloudCodeSelectors.getDispatchId
  };

  var collectionActions = {
    fetchData: _collectionActions.fetchData,
    pure_fetchData: pureCollectionActions.fetchData,
    cleanCollections: _collectionActions.cleanCollections,
    pure_cleanCollections: pureCollectionActions.cleanCollections,
    cleanData: _collectionActions.cleanData,
    pure_cleanData: pureCollectionActions.cleanData,
    deleteDoc: _collectionActions.deleteDoc,
    pure_deleteDoc: pureCollectionActions.deleteDoc,
    putDoc: _collectionActions.putDoc,
    pure_putDoc: pureCollectionActions.putDoc,
    refreshCollection: _collectionActions.refreshCollection,
    pure_refreshCollection: pureCollectionActions.refreshCollection,
    postDoc: _collectionActions.postDoc,
    pure_postDoc: pureCollectionActions.postDoc
  };
  var documentActions = {
    fetchData: _documentActions.fetchData,
    pure_fetchData: pureDocumentActions.fetchData,
    cleanDocuments: _documentActions.cleanDocuments,
    pure_cleanDocuments: pureDocumentActions.cleanDocuments,
    cleanData: _documentActions.cleanData,
    pure_cleanData: pureDocumentActions.cleanData,
    deleteDoc: _documentActions.deleteDoc,
    pure_deleteDoc: pureDocumentActions.deleteDoc,
    putDoc: _documentActions.putDoc,
    pure_putDoc: pureDocumentActions.putDoc,
    postDoc: _documentActions.postDoc,
    pure_postDoc: pureDocumentActions.postDoc,
    updateField: _documentActions.updateField,
    pure_updateField: pureDocumentActions.updateField
  };
  var cloudCodeActions = {
    fetchData: _cloudCodeActions.fetchData,
    pure_fetchData: pureCloudCodeActions.fetchData,
    cleanCloudsCode: _cloudCodeActions.cleanCloudsCode,
    pure_cleanCloudsCode: pureCloudCodeActions.cleanCloudsCode,
    cleanData: _cloudCodeActions.cleanData,
    pure_cleanData: pureCloudCodeActions.cleanData
  };
  var dispatch = null;
  var setReactParseDispatch = exports.setReactParseDispatch = function setReactParseDispatch(_dispatch) {
    exports.dispatch = dispatch = _dispatch;
  };
  var actions = {
    collectionActions: collectionActions,
    cloudCodeActions: cloudCodeActions,
    documentActions: documentActions
  };

  exports.dispatch = dispatch;
  exports.config = config;
  exports.api = _api2.default;
  exports.httpRequest = _httpWrapper2.default;
  exports.constants = _types2.default;
  exports.helpers = helpers;
  exports.setClearStateActionType = _reducer.setClearStateActionType;
  exports.cleanAllState = _reducer.cleanAllState;
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
  exports.collectionActions = collectionActions;
  exports.cloudCodeActions = cloudCodeActions;
  exports.documentActions = documentActions;
});