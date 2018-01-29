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

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodashIsEqual = require('lodash/isEqual');

var _lodashIsEqual2 = _interopRequireDefault(_lodashIsEqual);

var _parseActionsCloudCodes = require('../parse/actions/cloudCodes');

var parseActions = _interopRequireWildcard(_parseActionsCloudCodes);

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

var _parseSelectorsCloudCodes = require('../parse/selectors/cloudCodes');

var LOADING = _types2['default'].LOADING;

var FetchCloudCode = (function (_React$PureComponent) {
  _inherits(FetchCloudCode, _React$PureComponent);

  function FetchCloudCode(props) {
    _classCallCheck(this, FetchCloudCode);

    _get(Object.getPrototypeOf(FetchCloudCode.prototype), 'constructor', this).call(this, props);
    this.getDataFromServerIsRun = false;
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.onRefreshData = this.onRefreshData.bind(this);
  }

  _createClass(FetchCloudCode, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var localFirst = _props.localFirst;
      var functionName = _props.functionName;

      if (functionName && (!localFirst || !this.isDataExistOrQueryIsLoading())) {
        this.getDataFromServer();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Params from parent was changed
      if (this.isPropsFromParentChanged(nextProps)) {
        this.getDataFromServer(nextProps);
      }
      // GET DATA FINISH
      if (this.isGetFinish(nextProps)) {
        this.getDataFromServerIsRun = false;
        this.props.onGetFinish({
          queryStatus: nextProps.queryStatus,
          data: nextProps.data
        });
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
      if (!props.functionName) return;
      this.getDataFromServerIsRun = true;
      this.props.onGetStart();
      this.props.actions.getCloudCode(props.functionName, props.collectionTarget, props.params, props.filterByMemberId, props.memberFieldName, props.digToDataString);
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
      var _props3 = this.props;
      var data = _props3.data;
      var queryStatus = _props3.queryStatus;
      var info = _props3.info;

      var refreshData = this.onRefreshData;
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
    data: (0, _parseSelectorsCloudCodes.getDataFromCloudCode)(state, keyForData),
    queryStatus: (0, _parseSelectorsCloudCodes.getStatusFromCloudCode)(state, keyForData),
    info: (0, _parseSelectorsCloudCodes.getInfoFromCloudCode)(state, keyForData)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(_extends({}, parseActions), dispatch)
  };
}
exports['default'] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchCloudCode);

FetchCloudCode.propTypes = {
  functionName: _propTypes2['default'].string.isRequired,
  collectionTarget: _propTypes2['default'].string,
  render: _propTypes2['default'].func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
  params: _propTypes2['default'].object,
  onGetStart: _propTypes2['default'].func,
  onGetFinish: _propTypes2['default'].func,
  cleanDataOnComponentWillUnmount: _propTypes2['default'].bool,
  localFirst: _propTypes2['default'].bool, // get data from server only if data didn't found in store
  localOnly: _propTypes2['default'].bool, // get data only from local store
  digToDataString: _propTypes2['default'].string
};

FetchCloudCode.defaultProps = {
  digToDataString: 'data.result',
  cleanDataOnComponentWillUnmount: true,
  onGetFinish: function onGetFinish() {},
  onGetStart: function onGetStart() {}
};
module.exports = exports['default'];