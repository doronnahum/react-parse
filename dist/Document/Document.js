'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('./actions');

var _propTypes = require('./prop-types');

var _selectors = require('./selectors');

var _helpers = require('../helpers');

var FetchDocument = (function (_React$Component) {
  _inherits(FetchDocument, _React$Component);

  function FetchDocument(props) {
    _classCallCheck(this, FetchDocument);

    _get(Object.getPrototypeOf(FetchDocument.prototype), 'constructor', this).call(this, props);
    this.fetchData = this.fetchData.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.updateField = this.updateField.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onPostDoc = this.onPostDoc.bind(this);
    this.onPutDoc = this.onPutDoc.bind(this);
    this.cleanData = this.cleanData.bind(this);
  }

  _createClass(FetchDocument, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var localFirst = _props.localFirst;
      var data = _props.data;
      var objectId = _props.objectId;

      if (objectId && (!localFirst || localFirst && !data)) {
        this.fetchData();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ((0, _helpers.isDocumentParamsChanged)(this.props, nextProps)) {
        if ((0, _helpers.isDocTargetChanged)(this.props, nextProps)) {
          this.cleanData();
        }
        this.fetchData(nextProps);
      }
      this.handleCallBacks(this.props, nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.leaveClean) {
        this.cleanData();
      }
    }
  }, {
    key: 'onDelete',
    value: function onDelete() {
      var _props2 = this.props;
      var objectId = _props2.objectId;
      var schemaName = _props2.schemaName;
      var targetName = _props2.targetName;

      this.props.actions.deleteDocument(targetName, schemaName, objectId);
    }
  }, {
    key: 'onRefresh',
    value: function onRefresh() {
      this.fetchData(null, false);
    }
  }, {
    key: 'onPutDoc',
    value: function onPutDoc() {
      var _props3 = this.props;
      var actions = _props3.actions;
      var targetName = _props3.targetName;
      var schemaName = _props3.schemaName;
      var data = _props3.data;
      var objectId = _props3.objectId;
      var parseDataBeforeSubmit = _props3.parseDataBeforeSubmit;

      var target = targetName || objectId;
      var dataToSend = parseDataBeforeSubmit ? parseDataBeforeSubmit(data) : data;
      actions.putDoc({
        targetName: target,
        schemaName: schemaName,
        data: dataToSend,
        objectId: objectId
      });
    }
  }, {
    key: 'onPostDoc',
    value: function onPostDoc() {
      var _props4 = this.props;
      var actions = _props4.actions;
      var targetName = _props4.targetName;
      var schemaName = _props4.schemaName;
      var data = _props4.data;
      var uniqueId = _props4.uniqueId;
      var parseDataBeforeSubmit = _props4.parseDataBeforeSubmit;

      var target = targetName || uniqueId;
      var dataToSend = parseDataBeforeSubmit ? parseDataBeforeSubmit(data) : data;
      actions.postDoc({ targetName: target, schemaName: schemaName, data: dataToSend });
    }
  }, {
    key: 'fetchData',
    value: function fetchData() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var localOnly = arguments.length <= 1 || arguments[1] === undefined ? this.props.localOnly : arguments[1];
      var targetName = props.targetName;
      var schemaName = props.schemaName;
      var objectId = props.objectId;
      var include = props.include;
      var keys = props.keys;

      if (localOnly || !objectId || !schemaName) {
        return;
      }
      this.props.actions.fetchData({
        targetName: targetName,
        schemaName: schemaName,
        objectId: objectId,
        include: include,
        keys: keys
      });
    }
  }, {
    key: 'updateField',
    value: function updateField(key, value) {
      var _props5 = this.props;
      var objectId = _props5.objectId;
      var uniqueId = _props5.uniqueId;

      if (objectId) {
        this.props.actions.updateDocumentOnStore(objectId, key, value);
      } else {
        this.props.actions.updateNewDocument(uniqueId, key, value);
      }
    }
  }, {
    key: 'handleCallBacks',
    value: function handleCallBacks(props, nextProps) {
      var queryStatus = nextProps.queryStatus;
      var data = nextProps.data;
      var info = nextProps.info;
      var error = nextProps.error;
      var autoRefresh = nextProps.autoRefresh;

      if ((0, _helpers.isFetchFinish)(props, nextProps)) {
        props.onFetchEnd(error, { queryStatus: queryStatus, data: data, info: info });
      } else if ((0, _helpers.isDeleteFinish)(props, nextProps)) {
        if (autoRefresh) this.fetchData(nextProps);
        props.onDeleteEnd(error, { queryStatus: queryStatus, data: data, info: info });
      } else if ((0, _helpers.isUpdateFinish)(props, nextProps)) {
        if (autoRefresh) this.fetchData(nextProps);
        props.onPutEnd(error, { queryStatus: queryStatus, data: data, info: info });
      } else if ((0, _helpers.isCreateFinish)(props, nextProps)) {
        if (autoRefresh) this.fetchData(nextProps);
        props.onPostEnd(error, { queryStatus: queryStatus, data: data, info: info });
      }
    }
  }, {
    key: 'cleanData',
    value: function cleanData() {
      var _props6 = this.props;
      var targetName = _props6.targetName;
      var objectId = _props6.objectId;
      var uniqueId = _props6.uniqueId;

      var target = targetName || objectId || uniqueId;
      this.props.actions.cleanData(target);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props7 = this.props;
      var data = _props7.data;
      var queryStatus = _props7.queryStatus;
      var info = _props7.info;
      var error = _props7.error;
      var objectId = _props7.objectId;

      return this.props.render(error, {
        data: data,
        isLoading: _helpers.isLoading,
        queryStatus: queryStatus,
        info: info,
        refreshData: this.onRefreshData,
        deleteDoc: objectId && this.onDeleteDoc,
        cleanData: objectId || this.cleanStore,
        putDoc: objectId && this.onPutDoc,
        postDoc: objectId || this.onPostDoc
      });
    }
  }]);

  return FetchDocument;
})(_react2['default'].Component);

function mapStateToProps(state, props) {
  var targetName = props.targetName;
  var objectId = props.objectId;
  var uniqueId = props.uniqueId;

  var target = targetName || objectId || uniqueId;
  return {
    data: (0, _selectors.getData)(state, target),
    queryStatus: (0, _selectors.getStatus)(state, target),
    info: (0, _selectors.getInfo)(state, target),
    error: (0, _selectors.getError)(state, target)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)({
      fetchData: _actions.fetchData,
      deleteDoc: _actions.deleteDoc,
      putDoc: _actions.putDoc,
      postDoc: _actions.postDoc,
      cleanData: _actions.cleanData,
      updateField: _actions.updateField
    }, dispatch)
  };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchDocument);

FetchDocument.propTypes = _propTypes.propTypes;
FetchDocument.defaultProps = _propTypes.defaultProps;
module.exports = exports['default'];