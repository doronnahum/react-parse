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

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _lodashIsEqual = require('lodash/isEqual');

var _lodashIsEqual2 = _interopRequireDefault(_lodashIsEqual);

var _actions = require('./actions');

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

var _selectors = require('./selectors');

var _helpersStatusChecker = require('../helpers/statusChecker');

var _propTypes = require('./prop-types');

var LOADING = _types2['default'].LOADING;

var FetchCloudCode = (function (_React$PureComponent) {
  _inherits(FetchCloudCode, _React$PureComponent);

  function FetchCloudCode(props) {
    _classCallCheck(this, FetchCloudCode);

    _get(Object.getPrototypeOf(FetchCloudCode.prototype), 'constructor', this).call(this, props);
    this.getData = this.getData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  _createClass(FetchCloudCode, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var localFirst = _props.localFirst;
      var functionName = _props.functionName;
      var data = _props.data;
      var queryStatus = _props.queryStatus;

      if (!functionName) return;
      if (!localFirst || localFirst && !data && queryStatus !== LOADING) {
        this.getData();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.isPropsFromParentChanged(nextProps)) {
        this.getData(nextProps);
      }

      if ((0, _helpersStatusChecker.isGetFinish)(nextProps)) {
        this.props.onGetFinish({
          queryStatus: nextProps.queryStatus,
          data: nextProps.data
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.leaveClean) {
        this.removerDataFromStore();
      }
    }
  }, {
    key: 'onRefresh',
    value: function onRefresh() {
      this.getData(this.props, false);
    }
  }, {
    key: 'getData',
    value: function getData() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var localOnly = arguments.length <= 1 || arguments[1] === undefined ? this.props.localOnly : arguments[1];

      if (localOnly) return;
      if (!props.functionName) return;;
      this.props.onGetStart();
      this.props.actions.getCloudCode(props.functionName, props.collectionTarget, props.params, props.filterByMemberId, props.memberFieldName, props.digToDataString);
    }
  }, {
    key: 'isPropsFromParentChanged',
    value: function isPropsFromParentChanged(nextProps) {
      // filters was change, get data from server
      if (this.isParamsChanged(nextProps)) {
        return true;
      }
      // functionName was change, get data from server
      if (this.props.functionName !== nextProps.functionName) {
        return true;
      }
      return false;
    }
  }, {
    key: 'removerDataFromStore',
    value: function removerDataFromStore() {
      var keyForData = this.props.collectionTarget || this.props.functionName;
      this.props.actions.removeCloudCode(keyForData);
    }
  }, {
    key: 'isParamsChanged',
    value: function isParamsChanged(nextProps) {
      return !(0, _lodashIsEqual2['default'])(this.props.params, nextProps.params);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var data = _props2.data;
      var queryStatus = _props2.queryStatus;
      var info = _props2.info;

      var refreshData = this.onRefresh;
      return this.props.render({
        data: data,
        queryStatus: queryStatus,
        info: info,
        refreshData: refreshData
      });
    }
  }]);

  return FetchCloudCode;
})(_react2['default'].PureComponent);

function mapStateToProps(state, props) {
  var keyForData = props.collectionTarget || props.functionName;
  return {
    data: (0, _selectors.getData)(state, keyForData),
    queryStatus: (0, _selectors.getStatus)(state, keyForData),
    info: (0, _selectors.getInfo)(state, keyForData)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)({ getCloudCode: _actions.getCloudCode, removeCloudCode: _actions.removeCloudCode }, dispatch)
  };
}
exports['default'] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchCloudCode);

FetchCloudCode.propTypes = _propTypes.propTypes;

FetchCloudCode.defaultProps = _propTypes.defaultProps;
module.exports = exports['default'];