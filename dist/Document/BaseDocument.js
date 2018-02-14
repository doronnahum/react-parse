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

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _propTypes = require('./prop-types');

var _selectors = require('./selectors');

var _helpersStatusChecker = require('../helpers/statusChecker');

var FetchDocument = (function (_React$PureComponent) {
  _inherits(FetchDocument, _React$PureComponent);

  function FetchDocument(props) {
    _classCallCheck(this, FetchDocument);

    _get(Object.getPrototypeOf(FetchDocument.prototype), 'constructor', this).call(this, props);
    this.getData = this.getData.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.updateField = this.updateField.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSave = this.onSave.bind(this);
    this.cleanStore = this.cleanStore.bind(this);
  }

  _createClass(FetchDocument, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.initialState();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ((0, _helpersStatusChecker.isParamsChanged)(this.props, nextProps)) {
        this.initialState(nextProps);
      }
      this.handleCallBacks(this.props, nextProps);
    }
  }, {
    key: 'handleCallBacks',
    value: function handleCallBacks(props, nextProps) {
      if ((0, _helpersStatusChecker.isGetFinish)(props, nextProps)) {
        props.onGetFinish({
          queryStatus: nextProps.queryStatus,
          data: nextProps.data
        });
      } else if ((0, _helpersStatusChecker.isCreateFinish)(props, nextProps)) {
        props.onCreateFinish({
          status: nextProps.queryStatus.status,
          objectId: nextProps.queryStatus.objectId,
          data: nextProps.queryStatus.data
        });
      } else if ((0, _helpersStatusChecker.isDeleteFinish)(props, nextProps)) {
        props.onDeleteFinish(nextProps.queryStatus);
      } else if ((0, _helpersStatusChecker.isUpdateFinish)(props, nextProps)) {
        props.onUpdateFinish(nextProps.queryStatus);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.leaveClean) {
        this.cleanStore();
      }
    }
  }, {
    key: 'onDelete',
    value: function onDelete() {
      var _props2 = this.props;
      var objectId = _props2.objectId;
      var uniqueId = _props2.uniqueId;
      var collectionName = _props2.collectionName;

      if (!objectId) {
        return;
      }
      if (objectId) {
        if ((0, _helpersStatusChecker.isDeleteStart)(this.props)) {
          return;
        }
        this.props.actions.deleteDocument(collectionName, objectId);
      } else {
        this.props.actions.removeNewDocument(uniqueId);
      }
    }
  }, {
    key: 'onRefresh',
    value: function onRefresh() {
      this.getData(null, false);
    }
  }, {
    key: 'onSave',
    value: function onSave() {
      if (this.props.objectId) {
        this.updateDocument(this.props);
      } else {
        this.createDocument(this.props);
      }
    }
  }, {
    key: 'createDocument',
    value: function createDocument(props) {
      props.actions.postNewDocument(props.collectionName, props.uniqueId, props.parseDataBeforeSave);
    }
  }, {
    key: 'updateDocument',
    value: function updateDocument(props) {
      props.actions.updateDocumentOnServer(props.collectionName, props.objectId, null, null, props.parseDataBeforeSave);
    }
  }, {
    key: 'updateField',
    value: function updateField(key, value) {
      var _props3 = this.props;
      var objectId = _props3.objectId;
      var uniqueId = _props3.uniqueId;

      if (objectId) {
        this.props.actions.updateDocumentOnStore(objectId, key, value);
      } else {
        this.props.actions.updateNewDocument(uniqueId, key, value);
      }
    }
  }, {
    key: 'getData',
    value: function getData(props) {
      var localOnly = arguments.length <= 1 || arguments[1] === undefined ? this.props.localOnly : arguments[1];

      var _props = props || this.props;
      var collectionName = _props.collectionName;
      var objectId = _props.objectId;
      var include = _props.include;

      if (localOnly || !objectId || !collectionName) {
        return;
      }
      this.props.onGetStart();
      this.props.actions.getDocument(collectionName, objectId, include);
    }
  }, {
    key: 'cleanStore',
    value: function cleanStore() {
      if (this.props.objectId) {
        this.props.actions.removeDocument(this.props.objectId);
      } else {
        this.props.actions.removeNewDocument(this.props.uniqueId);
      }
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
      var data = props.data;

      if (objectId && collectionName) {
        if (!localFirst || localFirst && !data) {
          this.getData(props);
        }
      } else {
        this.createLocalDocument();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var data = _props4.data;
      var uniqueId = _props4.uniqueId;
      var objectId = _props4.objectId;
      var queryStatus = _props4.queryStatus;

      var deleteDocument = this.onDelete;
      var updateField = this.updateField;
      var refreshData = this.onRefresh;
      var saveDocument = this.onSave;
      return this.props.render({
        data: data,
        queryStatus: queryStatus,
        refreshData: refreshData,
        deleteDocument: deleteDocument,
        updateField: updateField,
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
      data: (0, _selectors.getData)(state, objectId),
      queryStatus: (0, _selectors.getStatus)(state, objectId)
    };
  }
  return {
    data: (0, _selectors.getNewDocumentData)(state, uniqueId),
    queryStatus: (0, _selectors.getNewDocumentStatus)(state, uniqueId)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(_extends({}, actions), dispatch)
  };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchDocument);

FetchDocument.propTypes = _propTypes.propTypes;
FetchDocument.defaultProps = _propTypes.defaultProps;
module.exports = exports['default'];