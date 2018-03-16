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

var _actions = require('./actions');

var _selectors = require('./selectors');

var _helpers = require('../helpers');

var _propTypes = require('./prop-types');

var FetchCloudCode = (function (_React$PureComponent) {
  _inherits(FetchCloudCode, _React$PureComponent);

  function FetchCloudCode(props) {
    _classCallCheck(this, FetchCloudCode);

    _get(Object.getPrototypeOf(FetchCloudCode.prototype), 'constructor', this).call(this, props);
    this.fetchData = this.fetchData.bind(this);
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
      if (!localFirst || localFirst && !data && !(0, _helpers.isLoading)(queryStatus)) {
        this.fetchData();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var queryStatus = nextProps.queryStatus;
      var data = nextProps.data;
      var error = nextProps.error;

      if ((0, _helpers.isCloudCodePropsChanged)(this.props, nextProps)) {
        if ((0, _helpers.isTargetChanged)(this.props, nextProps)) {
          this.cleanData();
        }
        this.fetchData(nextProps);
      } else if ((0, _helpers.isFetchFinish)(this.props, nextProps)) {
        this.props.onFetchEnd(error, { data: data, queryStatus: queryStatus });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.leaveClean) {
        this.cleanData();
      }
    }
  }, {
    key: 'onRefresh',
    value: function onRefresh() {
      this.fetchData(this.props, false);
    }
  }, {
    key: 'fetchData',
    value: function fetchData() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var localOnly = arguments.length <= 1 || arguments[1] === undefined ? this.props.localOnly : arguments[1];
      var functionName = props.functionName;
      var collectionTarget = props.collectionTarget;
      var params = props.params;
      var digToData = props.digToData;

      if (localOnly || !props.functionName) return;
      props.actions.fetchData({
        functionName: functionName,
        collectionTarget: collectionTarget,
        params: params,
        digToData: digToData
      });
    }
  }, {
    key: 'cleanData',
    value: function cleanData() {
      var targetName = this.props.targetName || this.props.functionName;
      this.props.actions.cleanData({ targetName: targetName });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var data = _props2.data;
      var queryStatus = _props2.queryStatus;
      var info = _props2.info;
      var error = _props2.error;

      return this.props.render(error, {
        data: data,
        queryStatus: queryStatus,
        isLoading: (0, _helpers.isLoading)(queryStatus),
        info: info,
        refreshData: this.onRefresh
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
    info: (0, _selectors.getInfo)(state, keyForData),
    error: (0, _selectors.getError)(state, keyForData)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)({ fetchData: _actions.fetchData, cleanData: _actions.cleanData }, dispatch)
  };
}
exports['default'] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchCloudCode);

FetchCloudCode.propTypes = _propTypes.propTypes;

FetchCloudCode.defaultProps = _propTypes.defaultProps;
module.exports = exports['default'];