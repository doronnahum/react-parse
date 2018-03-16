(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'redux', 'react-redux', './actions', './selectors', '../helpers', './prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('redux'), require('react-redux'), require('./actions'), require('./selectors'), require('../helpers'), require('./prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.redux, global.reactRedux, global.actions, global.selectors, global.helpers, global.propTypes);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _redux, _reactRedux, _actions, _selectors, _helpers, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var FetchCloudCode = function (_React$PureComponent) {
    _inherits(FetchCloudCode, _React$PureComponent);

    function FetchCloudCode(props) {
      _classCallCheck(this, FetchCloudCode);

      var _this = _possibleConstructorReturn(this, (FetchCloudCode.__proto__ || Object.getPrototypeOf(FetchCloudCode)).call(this, props));

      _this.fetchData = _this.fetchData.bind(_this);
      _this.onRefresh = _this.onRefresh.bind(_this);
      return _this;
    }

    _createClass(FetchCloudCode, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _props = this.props,
            localFirst = _props.localFirst,
            functionName = _props.functionName,
            data = _props.data,
            queryStatus = _props.queryStatus;

        if (!functionName) return;
        if (!localFirst || localFirst && !data && !(0, _helpers.isLoading)(queryStatus)) {
          this.fetchData();
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var queryStatus = nextProps.queryStatus,
            data = nextProps.data,
            error = nextProps.error;

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
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
        var localOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.localOnly;
        var functionName = props.functionName,
            collectionTarget = props.collectionTarget,
            params = props.params,
            digToData = props.digToData;

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
        var _props2 = this.props,
            data = _props2.data,
            queryStatus = _props2.queryStatus,
            info = _props2.info,
            error = _props2.error;

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
  }(_react2.default.PureComponent);

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
  exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchCloudCode);


  FetchCloudCode.propTypes = _propTypes.propTypes;

  FetchCloudCode.defaultProps = _propTypes.defaultProps;
});