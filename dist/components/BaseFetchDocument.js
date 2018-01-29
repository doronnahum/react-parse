'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _lodashIsEqual = require('lodash/isEqual');

var _lodashIsEqual2 = _interopRequireDefault(_lodashIsEqual);

var _parseActionsDocuments = require('../parse/actions/documents');

var documentsActions = _interopRequireWildcard(_parseActionsDocuments);

var _parseActionsLocalDocuments = require('../parse/actions/localDocuments');

var localDocumentsActions = _interopRequireWildcard(_parseActionsLocalDocuments);

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

var _parseSelectorsDocuments = require('../parse/selectors/documents');

var LOADING = _types2['default'].LOADING;
var CREATE_DOCUMENT_START = _types2['default'].CREATE_DOCUMENT_START;
var CREATE_DOCUMENT_SUCCESS = _types2['default'].CREATE_DOCUMENT_SUCCESS;
var CREATE_DOCUMENT_ERROR = _types2['default'].CREATE_DOCUMENT_ERROR;
var DELETE_DOCUMENT_START = _types2['default'].DELETE_DOCUMENT_START;
var DELETE_DOCUMENT_FINISHED = _types2['default'].DELETE_DOCUMENT_FINISHED;
var DELETE_DOCUMENT_FAILED = _types2['default'].DELETE_DOCUMENT_FAILED;
var UPDATE_DOCUMENT_START = _types2['default'].UPDATE_DOCUMENT_START;
var UPDATE_DOCUMENT_FINISHED = _types2['default'].UPDATE_DOCUMENT_FINISHED;
var UPDATE_DOCUMENT_FAILED = _types2['default'].UPDATE_DOCUMENT_FAILED;

var FetchDocument = (function (_React$PureComponent) {
  _inherits(FetchDocument, _React$PureComponent);

  function FetchDocument(props) {
    _classCallCheck(this, FetchDocument);

    _get(Object.getPrototypeOf(FetchDocument.prototype), 'constructor', this).call(this, props);
    this.getDataFromServerIsRun = false;
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.onDeleteDocument = this.onDeleteDocument.bind(this);
    this.onChangeValueByKey = this.onChangeValueByKey.bind(this);
    this.onRefreshData = this.onRefreshData.bind(this);
    this.getQueryStatus = this.getQueryStatus.bind(this);
    this.onSave = this.onSave.bind(this);
    this.removerDataFromStore = this.removerDataFromStore.bind(this);
  }

  _createClass(FetchDocument, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      console.warn(this.props.localFirst);
      this.initialState();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Params from parent was changed
      if (this.isParamsChanged(nextProps)) {
        console.warn('params changed, initialState');
        this.initialState(nextProps);
      }
      // GET DATA FINISH
      if (this.isGetFinish(nextProps)) {
        this.getDataFromServerIsRun = false;
        this.props.onGetFinish({
          queryStatus: nextProps.queryStatus,
          data: nextProps.data
        });
      }
      // CREATE DOCUMENT FINISH
      if (this.isCreateDocumentFinish(nextProps)) {
        this.props.onPostDocumentFinish({
          status: nextProps.queryStatus.status,
          objectId: nextProps.queryStatus.objectId,
          data: nextProps.queryStatus.data
        });
      }
      // DELETE DOCUMENT FINISH
      if (this.isDeleteDocumentFinish(nextProps)) {
        this.props.onDeleteDocumentFinish(nextProps.queryStatus);
      }
      // UPDATE DOCUMENT FINISH
      if (this.isUpdateDocumentFinish(nextProps)) {
        this.props.onPutDocumentFinish(nextProps.queryStatus);
      }
    }

    // Clean data on Mount
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.cleanDataOnComponentWillUnmount) {
        this.removerDataFromStore();
      }
    }
  }, {
    key: 'onDeleteDocument',
    value: function onDeleteDocument() {
      var _props = this.props;
      var objectId = _props.objectId;
      var collectionName = _props.collectionName;

      if (objectId) {
        if (this.props.queryStatus === DELETE_DOCUMENT_START) return;
        this.props.onDeleteDocumentStart(objectId);
        this.props.actions.deleteDocumentFromServer(collectionName, objectId);
      } else {
        this.removerDataFromStore();
      }
    }
  }, {
    key: 'onRefreshData',
    value: function onRefreshData() {
      this.getDataFromServer(null, false);
    }
  }, {
    key: 'onSave',
    value: function onSave() {
      var _props2 = this.props;
      var collectionName = _props2.collectionName;
      var objectId = _props2.objectId;
      var parseDataBeforeSave = _props2.parseDataBeforeSave;
      var addMemberPointerToDataOnPost = _props2.addMemberPointerToDataOnPost;
      var getDataWithPostFinishCallBack = _props2.getDataWithPostFinishCallBack;

      if (objectId) {
        this.props.onPutDocumentStart();
        this.props.actions.updateDocumentOnServer(collectionName, objectId, null, null, parseDataBeforeSave);
      } else {
        this.props.onPostDocumentStart();
        this.props.actions.postNewDocument(collectionName, this.props.uniqueId, parseDataBeforeSave, addMemberPointerToDataOnPost, getDataWithPostFinishCallBack);
      }
    }

    // shouldComponentUpdate (nextProps, nextState) {
    //   if(this.isDataChanged(nextProps) || this.isQueryStatusChanged(nextProps) || this.isParamsChanged(nextProps)) {
    //     return true
    //   }
    //   return false
    // }

  }, {
    key: 'onChangeValueByKey',
    value: function onChangeValueByKey(key, value) {
      var objectId = this.props.objectId;

      if (objectId) {
        this.props.actions.updateDocumentOnStore(objectId, key, value);
      } else {
        this.props.actions.updateNewDocument(this.props.uniqueId, key, value);
      }
    }
  }, {
    key: 'getDataFromServer',
    value: function getDataFromServer() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var localOnly = arguments.length <= 1 || arguments[1] === undefined ? this.props.localOnly : arguments[1];

      if (!props) {
        props = this.props;
      }
      if (localOnly) return;
      var _props3 = props;
      var collectionName = _props3.collectionName;
      var objectId = _props3.objectId;
      var include = _props3.include;

      if (!objectId || !collectionName) return;
      this.getDataFromServerIsRun = true;
      this.props.onGetStart();
      this.props.actions.getDocument(collectionName, objectId, include);
    }
  }, {
    key: 'getQueryStatus',
    value: function getQueryStatus() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var objectId = props.objectId;
      var queryStatus = props.queryStatus;

      if (objectId) return queryStatus;
      var status = queryStatus ? queryStatus.status : null;
      return status;
    }
  }, {
    key: 'removerDataFromStore',
    value: function removerDataFromStore() {
      if (this.props.objectId) {
        this.props.actions.removeDocument(this.props.objectId);
      } else {
        this.props.actions.removeNewDocument(this.props.uniqueId);
      }
    }
  }, {
    key: 'isCreateDocumentFinish',
    value: function isCreateDocumentFinish(nextProps) {
      return this.getQueryStatus() === CREATE_DOCUMENT_START && (this.getQueryStatus(nextProps) === CREATE_DOCUMENT_SUCCESS || this.getQueryStatus(nextProps) === CREATE_DOCUMENT_ERROR);
    }
  }, {
    key: 'isDeleteDocumentFinish',
    value: function isDeleteDocumentFinish(nextProps) {
      return this.props.queryStatus === DELETE_DOCUMENT_START && (nextProps.queryStatus === DELETE_DOCUMENT_FINISHED || nextProps.queryStatus === DELETE_DOCUMENT_FAILED);
    }
  }, {
    key: 'isUpdateDocumentFinish',
    value: function isUpdateDocumentFinish(nextProps) {
      return this.props.queryStatus === UPDATE_DOCUMENT_START && (nextProps.queryStatus === UPDATE_DOCUMENT_FINISHED || nextProps.queryStatus === UPDATE_DOCUMENT_FAILED);
    }
  }, {
    key: 'isDataChanged',
    value: function isDataChanged(nextProps) {
      return this.props.data !== nextProps.data;
    }
  }, {
    key: 'isQueryStatusChanged',
    value: function isQueryStatusChanged(nextProps) {
      return this.props.queryStatus !== nextProps.queryStatus;
    }
  }, {
    key: 'isParamsChanged',
    value: function isParamsChanged(nextProps) {
      // collectionName was change, get data from server
      if (this.props.collectionName !== nextProps.collectionName) {
        return true;
      }
      if (this.props.objectId !== nextProps.objectId) {
        return true;
      }
      if (this.props.include !== nextProps.include) {
        return true;
      }
      if (!(0, _lodashIsEqual2['default'])(this.props.initialValues, nextProps.initialValues)) {
        return false; // initialValues only on load fow noe
      }
      return false;
    }
  }, {
    key: 'isDataExistOrQueryIsLoading',
    value: function isDataExistOrQueryIsLoading() {
      var _props4 = this.props;
      var queryStatus = _props4.queryStatus;
      var data = _props4.data;

      if (data || queryStatus === LOADING) {
        return true;
      }
      return false;
    }
  }, {
    key: 'isGetFinish',
    value: function isGetFinish(nextProps) {
      if (this.props.queryStatus === LOADING && nextProps.queryStatus !== LOADING && (this.getDataFromServerIsRun || this.isDataChanged(nextProps))) {
        return true;
      }
      return false;
    }
  }, {
    key: 'createLocalDocument',
    value: function createLocalDocument() {
      this.props.onCreateLocalDocument(this.props.uniqueId);
      this.props.actions.createNewDocument(this.props.uniqueId, this.props.initialValues);
    }
  }, {
    key: 'initialState',
    value: function initialState() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var localFirst = props.localFirst;
      var collectionName = props.collectionName;
      var objectId = props.objectId;

      if (objectId && collectionName) {
        if (!localFirst || !this.isDataExistOrQueryIsLoading()) {
          this.getDataFromServer(props);
        }
      } else {
        this.createLocalDocument();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props;
      var data = _props5.data;
      var uniqueId = _props5.uniqueId;
      var objectId = _props5.objectId;

      var queryStatus = this.getQueryStatus();
      var deleteDocument = this.onDeleteDocument;
      var changeValueByKey = this.onChangeValueByKey;
      var refreshData = this.onRefreshData;
      var saveDocument = this.onSave;
      return this.props.render({
        data: data,
        queryStatus: queryStatus,
        refreshData: refreshData,
        deleteDocument: deleteDocument,
        changeValueByKey: changeValueByKey,
        saveDocument: saveDocument,
        objectId: objectId,
        uniqueId: uniqueId
      });
    }
  }]);

  return FetchDocument;
})(_react2['default'].PureComponent);

function mapStateToProps(state, props) {
  var objectId = props.objectId;
  var uniqueId = props.uniqueId;

  if (objectId) {
    return {
      data: (0, _parseSelectorsDocuments.getDocumentData)(state, objectId),
      queryStatus: (0, _parseSelectorsDocuments.getDocumentStatus)(state, objectId)
    };
  }
  return {
    data: (0, _parseSelectorsDocuments.getNewDocumentData)(state, uniqueId),
    queryStatus: (0, _parseSelectorsDocuments.getNewDocumentStatus)(state, uniqueId)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(_extends({}, documentsActions, localDocumentsActions), dispatch)
  };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchDocument);

FetchDocument.propTypes = {
  collectionName: _propTypes2['default'].string.isRequired,
  objectId: _propTypes2['default'].string,
  queryStatus: _propTypes2['default'].string,
  uniqueId: _propTypes2['default'].string,
  render: _propTypes2['default'].func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
  include: _propTypes2['default'].string,
  initialValues: _propTypes2['default'].shape({}),
  data: _propTypes2['default'].shape({}),
  onCreateLocalDocument: _propTypes2['default'].func,
  onGetStart: _propTypes2['default'].func,
  onGetFinish: _propTypes2['default'].func,
  onPostDocumentStart: _propTypes2['default'].func,
  onPostDocumentFinish: _propTypes2['default'].func,
  onDeleteDocumentStart: _propTypes2['default'].func,
  onDeleteDocumentFinish: _propTypes2['default'].func,
  onPutDocumentStart: _propTypes2['default'].func,
  onPutDocumentFinish: _propTypes2['default'].func,
  addMemberPointerToDataOnPost: _propTypes2['default'].bool,
  cleanDataOnComponentWillUnmount: _propTypes2['default'].bool,
  getDataWithPostFinishCallBack: _propTypes2['default'].bool, // this trigger a GET method after POST and the data pass with onPostDocumentFinish
  localFirst: _propTypes2['default'].bool, // get data from server only if data didn't found in store.
  localOnly: _propTypes2['default'].bool, // get data only from local store
  parseDataBeforeSave: _propTypes2['default'].func,
  actions: _propTypes2['default'].shape({
    updateNewDocument: _propTypes2['default'].func,
    updateDocumentOnStore: _propTypes2['default'].func,
    postLocalDocumentByUniqueIdToServer: _propTypes2['default'].func,
    updateDocumentOnServer: _propTypes2['default'].func,
    removeNewDocument: _propTypes2['default'].func,
    removeDocument: _propTypes2['default'].func,
    createNewDocument: _propTypes2['default'].func,
    getDocument: _propTypes2['default'].func,
    deleteDocumentFromServer: _propTypes2['default'].func
  }).isRequired
};

FetchDocument.defaultProps = {
  objectId: null,
  localOnly: false,
  localFirst: false,
  addMemberPointerToDataOnPost: false,
  data: null,
  initialValues: null,
  uniqueId: null,
  queryStatus: null,
  include: null,
  cleanDataOnComponentWillUnmount: true,
  getDataWithPostFinishCallBack: false,
  onCreateLocalDocument: function onCreateLocalDocument() {},
  onGetFinish: function onGetFinish() {},
  onGetStart: function onGetStart() {},
  onDeleteDocumentStart: function onDeleteDocumentStart() {},
  onDeleteDocumentFinish: function onDeleteDocumentFinish() {},
  onPutDocumentStart: function onPutDocumentStart() {},
  onPutDocumentFinish: function onPutDocumentFinish() {},
  onPostDocumentStart: function onPostDocumentStart() {},
  onPostDocumentFinish: function onPostDocumentFinish() {},
  parseDataBeforeSave: function parseDataBeforeSave(data) {
    return data;
  }
};
module.exports = exports['default'];