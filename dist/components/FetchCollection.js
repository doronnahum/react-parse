'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

var _parseActionsCollections = require('../parse/actions/collections');

var parseActions = _interopRequireWildcard(_parseActionsCollections);

var _parseSelectorsCollections = require('../parse/selectors/collections');

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

var LOADING = _types2['default'].LOADING;
var DELETE_DOCUMENT_FROM_COLLECTION_START = _types2['default'].DELETE_DOCUMENT_FROM_COLLECTION_START;
var DELETE_DOCUMENT_FROM_COLLECTION_FINISHED = _types2['default'].DELETE_DOCUMENT_FROM_COLLECTION_FINISHED;
var DELETE_DOCUMENT_FROM_COLLECTION_FAILED = _types2['default'].DELETE_DOCUMENT_FROM_COLLECTION_FAILED;
var UPDATE_DOCUMENT_FROM_COLLECTION_START = _types2['default'].UPDATE_DOCUMENT_FROM_COLLECTION_START;
var UPDATE_DOCUMENT_FROM_COLLECTION_FINISHED = _types2['default'].UPDATE_DOCUMENT_FROM_COLLECTION_FINISHED;
var UPDATE_DOCUMENT_FROM_COLLECTION_FAILED = _types2['default'].UPDATE_DOCUMENT_FROM_COLLECTION_FAILED;

var FetchCollection = (function (_React$PureComponent) {
  _inherits(FetchCollection, _React$PureComponent);

  function FetchCollection(props) {
    _classCallCheck(this, FetchCollection);

    _get(Object.getPrototypeOf(FetchCollection.prototype), 'constructor', this).call(this, props);
    this.getDataFromServerIsRun = false;
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.onDeleteDocument = this.onDeleteDocument.bind(this);
    this.onUpdateDocument = this.onUpdateDocument.bind(this);
    this.onRefreshData = this.onRefreshData.bind(this);
  }

  _createClass(FetchCollection, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var localFirst = _props.localFirst;
      var collectionName = _props.collectionName;
      var memberFieldName = _props.memberFieldName;
      var filterByMemberId = _props.filterByMemberId;
      var include = _props.include;
      var perPage = _props.perPage;
      var enableCount = _props.enableCount;

      console.warn(memberFieldName, filterByMemberId, include, perPage, enableCount);
      if (collectionName && (!localFirst || !this.isDataExistOrQueryIsLoading())) {
        this.getDataFromServer();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Params from parent was changed
      if (this.isParamsChanged(nextProps)) {
        this.getDataFromServer(nextProps);
      }
      // GET DATA FINISH
      if (this.isGetFinish(nextProps)) {
        this.getDataFromServerIsRun = false;
        this.props.onGetFinish({
          queryStatus: nextProps.queryStatus,
          data: nextProps.data,
          info: nextProps.info
        });
      }
      // DELETE DOCUMENT FINISH
      if (this.isDeleteDocumentFinish(nextProps)) {
        this.getDataFromServer(nextProps);
        this.props.onDeleteDocumentFinish(nextProps.queryStatus);
      }
      // UPDATE DOCUMENT FINISH
      if (this.isUpdateDocumentFinish(nextProps)) {
        this.getDataFromServer(nextProps);
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
    value: function onDeleteDocument(objectId) {
      // DELETE document from collection
      if (!objectId) {
        console.warn('onDeleteDocument: missing objectId ');
        return;
      }
      if (this.props.queryStatus === _types2['default'].DELETE_DOCUMENT_FROM_COLLECTION_START) return;
      this.props.onDeleteDocumentStart(objectId);
      this.props.actions.deleteDocumentFromCollection(this.props.collectionName, this.props.targetName, objectId);
    }
  }, {
    key: 'onUpdateDocument',
    value: function onUpdateDocument(objectId, data) {
      if (!objectId) {
        console.warn('onUpdateDocument: missing objectId ');
        return;
      }
      if (!data || typeof data !== 'object') {
        console.warn('onUpdateDocument: missing data object ');
        return;
      }
      this.props.onPutDocumentStart(objectId);
      this.props.actions.updateDocumentFromCollection(this.props.collectionName, this.props.targetName, objectId, data);
    }
  }, {
    key: 'onRefreshData',
    value: function onRefreshData() {
      this.getDataFromServer(this.props, false);
    }
  }, {
    key: 'getDataFromServer',
    value: function getDataFromServer() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var localOnly = arguments.length <= 1 || arguments[1] === undefined ? this.props.localOnly : arguments[1];

      if (localOnly) return;
      if (!props.collectionName) return;
      this.getDataFromServerIsRun = true;
      this.props.onGetStart();
      this.props.actions.getCollection({
        collectionName: props.collectionName,
        targetName: props.targetName,
        query: props.query,
        perPage: props.perPage,
        page: props.page,
        include: props.include,
        keys: props.keys,
        enableCount: props.enableCount
      });
    }
  }, {
    key: 'isDeleteDocumentFinish',
    value: function isDeleteDocumentFinish(nextProps) {
      return this.props.queryStatus === DELETE_DOCUMENT_FROM_COLLECTION_START && (nextProps.queryStatus === DELETE_DOCUMENT_FROM_COLLECTION_FINISHED || nextProps.queryStatus === DELETE_DOCUMENT_FROM_COLLECTION_FAILED);
    }
  }, {
    key: 'isUpdateDocumentFinish',
    value: function isUpdateDocumentFinish(nextProps) {
      return this.props.queryStatus === UPDATE_DOCUMENT_FROM_COLLECTION_START && (nextProps.queryStatus === UPDATE_DOCUMENT_FROM_COLLECTION_FINISHED || nextProps.queryStatus === UPDATE_DOCUMENT_FROM_COLLECTION_FAILED);
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
      // filters was change, get data from server
      if (this.isQueryFilterChanged(nextProps)) {
        return true;
      }
      // page was change, get data from server
      if (this.props.page !== nextProps.page) {
        return true;
      }
      // collectionName was change, get data from server
      if (this.props.collectionName !== nextProps.collectionName) {
        return true;
      }
      // keys was change, get data from server
      if (this.props.keys !== nextProps.keys) {
        return true;
      }
      return false;
    }
  }, {
    key: 'isDataExistOrQueryIsLoading',
    value: function isDataExistOrQueryIsLoading() {
      var _props2 = this.props;
      var queryStatus = _props2.queryStatus;
      var data = _props2.data;

      if (data || queryStatus === LOADING) {
        return true;
      }
      return false;
    }
  }, {
    key: 'removerDataFromStore',
    value: function removerDataFromStore() {
      var keyForData = this.props.targetName || this.props.collectionName;
      this.props.actions.clearCollection(keyForData);
    }

    // shouldComponentUpdate (nextProps, nextState) {
    //   if(this.isDataChanged(nextProps) || this.isQueryStatusChanged(nextProps) || this.isParamsChanged(nextProps)) {
    //     return true
    //   }
    //   return false
    // }

  }, {
    key: 'isQueryFilterChanged',
    value: function isQueryFilterChanged(nextProps) {
      return !(0, _lodashIsEqual2['default'])(this.props.query, nextProps.query);
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
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var data = _props3.data;
      var queryStatus = _props3.queryStatus;
      var info = _props3.info;

      var deleteDocument = this.onDeleteDocument;
      var updateDocument = this.onUpdateDocument;
      var refreshData = this.onRefreshData;
      return this.props.render({
        data: data,
        queryStatus: queryStatus,
        info: info,
        refreshData: refreshData,
        deleteDocument: deleteDocument,
        updateDocument: updateDocument
      });
    }
  }]);

  return FetchCollection;
})(_react2['default'].PureComponent);

function mapStateToProps(state, props) {
  var keyForData = props.targetName || props.collectionName;
  return {
    data: (0, _parseSelectorsCollections.getCollectionData)(state, keyForData),
    queryStatus: (0, _parseSelectorsCollections.getCollectionStatus)(state, keyForData),
    info: (0, _parseSelectorsCollections.getCollectionInfo)(state, keyForData)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(_extends({}, parseActions), dispatch)
  };
}
exports['default'] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchCollection);

FetchCollection.propTypes = {
  collectionName: _propTypes2['default'].string.isRequired,
  actions: _propTypes2['default'].shape({
    updateDocumentFromCollection: _propTypes2['default'].func,
    deleteDocumentFromCollection: _propTypes2['default'].func,
    clearCollection: _propTypes2['default'].func,
    getCollection: _propTypes2['default'].func
  }).isRequired,
  render: _propTypes2['default'].func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
  targetName: _propTypes2['default'].string,
  query: _propTypes2['default'].shape({}),
  data: _propTypes2['default'].array,
  include: _propTypes2['default'].string,
  queryStatus: _propTypes2['default'].string,
  keys: _propTypes2['default'].string,
  perPage: _propTypes2['default'].number,
  info: _propTypes2['default'].shape({
    count: _propTypes2['default'].number,
    timestamp: _propTypes2['default'].number,
    page: _propTypes2['default'].number,
    skip: _propTypes2['default'].number
  }),
  page: _propTypes2['default'].number,
  enableCount: _propTypes2['default'].bool,
  onGetStart: _propTypes2['default'].func,
  onGetFinish: _propTypes2['default'].func,
  onDeleteDocumentStart: _propTypes2['default'].func,
  onDeleteDocumentFinish: _propTypes2['default'].func,
  onPutDocumentStart: _propTypes2['default'].func,
  onPutDocumentFinish: _propTypes2['default'].func,
  filterByMemberId: _propTypes2['default'].bool,
  cleanDataOnComponentWillUnmount: _propTypes2['default'].bool,
  localFirst: _propTypes2['default'].bool, // get data from server only if data didn't found in store
  localOnly: _propTypes2['default'].bool, // get data only from local store
  memberFieldName: _propTypes2['default'].string
};

FetchCollection.defaultProps = {
  query: null,
  include: null,
  queryStatus: null,
  info: null,
  data: null,
  keys: null,
  page: null,
  filterByMemberId: null,
  localFirst: false,
  localOnly: false,
  perPage: 25,
  memberFieldName: 'member',
  enableCount: false,
  cleanDataOnComponentWillUnmount: true,
  targetName: null,
  onGetFinish: function onGetFinish() {},
  onGetStart: function onGetStart() {},
  onDeleteDocumentStart: function onDeleteDocumentStart() {},
  onDeleteDocumentFinish: function onDeleteDocumentFinish() {},
  onPutDocumentStart: function onPutDocumentStart() {},
  onPutDocumentFinish: function onPutDocumentFinish() {}
};
module.exports = exports['default'];