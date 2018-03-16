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

var _selectors = require('./selectors');

var _helpers = require('../helpers');

var _propTypes = require('./prop-types');

var FetchCollection = (function (_React$PureComponent) {
  _inherits(FetchCollection, _React$PureComponent);

  function FetchCollection(props) {
    _classCallCheck(this, FetchCollection);

    _get(Object.getPrototypeOf(FetchCollection.prototype), 'constructor', this).call(this, props);
    this.fetchData = this.fetchData.bind(this);
    this.onDeleteDoc = this.onDeleteDoc.bind(this);
    this.onPutDoc = this.onPutDoc.bind(this);
    this.onPostDoc = this.onPostDoc.bind(this);
    this.onRefreshData = this.onRefreshData.bind(this);
  }

  _createClass(FetchCollection, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var schemaName = _props.schemaName;
      var localFirst = _props.localFirst;
      var data = _props.data;

      if (schemaName && (!localFirst || localFirst && !data)) {
        this.fetchData();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ((0, _helpers.isCollectionParamsChanged)(this.props, nextProps)) {
        if ((0, _helpers.isTargetChanged)(this.props, nextProps)) {
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
    key: 'onDeleteDoc',
    value: function onDeleteDoc(objectId) {
      var _props2 = this.props;
      var actions = _props2.actions;
      var schemaName = _props2.schemaName;
      var targetName = _props2.targetName;

      if (!objectId) {
        console.warn('onDeleteDoc: missing objectId ');
        return;
      }
      actions.deleteDoc({ schemaName: schemaName, targetName: targetName, objectId: objectId });
    }
  }, {
    key: 'onPutDoc',
    value: function onPutDoc(objectId, data) {
      var _props3 = this.props;
      var actions = _props3.actions;
      var schemaName = _props3.schemaName;
      var targetName = _props3.targetName;

      if (!objectId) {
        console.warn('onUpdateDoc: missing objectId ');
        return;
      }
      if (!data || typeof data !== 'object') {
        console.warn('onUpdateDoc: missing data object ');
        return;
      }
      actions.putDoc({ schemaName: schemaName, targetName: targetName, objectId: objectId, data: data });
    }
  }, {
    key: 'onPostDoc',
    value: function onPostDoc(data) {
      var _props4 = this.props;
      var actions = _props4.actions;
      var schemaName = _props4.schemaName;
      var targetName = _props4.targetName;

      if (!data || typeof data !== 'object') {
        console.warn('onPostDoc: missing data object ');
        return;
      }
      debugger;
      actions.postDoc({ schemaName: schemaName, targetName: targetName, data: data });
    }
  }, {
    key: 'onRefreshData',
    value: function onRefreshData() {
      this.fetchData(this.props, false);
    }
  }, {
    key: 'fetchData',
    value: function fetchData() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var localOnly = arguments.length <= 1 || arguments[1] === undefined ? this.props.localOnly : arguments[1];
      var targetName = props.targetName;
      var schemaName = props.schemaName;
      var query = props.query;
      var limit = props.limit;
      var skip = props.skip;
      var enableCount = props.enableCount;
      var keys = props.keys;
      var include = props.include;
      var order = props.order;

      if (localOnly || !props.schemaName) {
        return;
      }
      props.actions.fetchData({
        targetName: targetName,
        schemaName: schemaName,
        query: query,
        limit: limit,
        skip: skip,
        enableCount: enableCount,
        keys: keys,
        include: include,
        order: order
      });
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
      var targetName = this.props.targetName || this.props.schemaName;
      this.props.actions.cleanData({ targetName: targetName });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props;
      var data = _props5.data;
      var queryStatus = _props5.queryStatus;
      var info = _props5.info;
      var error = _props5.error;

      return this.props.render(error, {
        data: data,
        isLoading: _helpers.isLoading,
        queryStatus: queryStatus,
        info: info,
        refreshData: this.onRefreshData,
        deleteDoc: this.onDeleteDoc,
        putDoc: this.onPutDoc,
        postDoc: this.onPostDoc
      });
    }
  }]);

  return FetchCollection;
})(_react2['default'].PureComponent);

function mapStateToProps(state, props) {
  var keyForData = props.targetName || props.schemaName;
  return {
    data: (0, _selectors.getData)(state, keyForData),
    queryStatus: (0, _selectors.getStatus)(state, keyForData),
    info: (0, _selectors.getInfo)(state, keyForData),
    error: (0, _selectors.getError)(state, keyForData)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)({
      fetchData: _actions.fetchData,
      deleteDoc: _actions.deleteDoc,
      putDoc: _actions.putDoc,
      postDoc: _actions.postDoc,
      cleanData: _actions.cleanData
    }, dispatch)
  };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchCollection);

FetchCollection.propTypes = _propTypes.propTypes;

FetchCollection.defaultProps = _propTypes.defaultProps;
module.exports = exports['default'];