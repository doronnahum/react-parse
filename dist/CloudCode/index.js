(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', '../helpers', './prop-types', './store'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('../helpers'), require('./prop-types'), require('./store'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.helpers, global.propTypes, global.store);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _helpers, _propTypes, _store) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _store2 = _interopRequireDefault(_store);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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

  var FetchCloudCode = function (_React$Component) {
    _inherits(FetchCloudCode, _React$Component);

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
            fetchData = _props.fetchData,
            fetchStatus = _props.fetchStatus;

        if (!functionName) return;
        if (!localFirst || localFirst && !fetchData && !(0, _helpers.isLoading)(fetchStatus)) {
          this.fetchData();
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var fetchStatus = nextProps.fetchStatus,
            fetchData = nextProps.fetchData,
            fetchError = nextProps.fetchError;

        if ((0, _helpers.isCloudCodePropsChanged)(this.props, nextProps)) {
          if ((0, _helpers.isTargetChanged)(this.props, nextProps)) {
            this.cleanData();
          }
          this.fetchData(nextProps);
        } else if ((0, _helpers.isFetchFinish)(this.props, nextProps)) {
          this.props.onFetchEnd({ error: fetchError, status: fetchStatus, data: fetchData });
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
        var dispatchId = arguments[2];
        var functionName = props.functionName,
            targetName = props.targetName,
            params = props.params,
            digToData = props.digToData,
            dataHandler = props.dataHandler;

        if (localOnly || !props.functionName) return;
        props.fetchActions.fetchData({
          functionName: functionName,
          targetName: targetName,
          params: params,
          digToData: digToData,
          dataHandler: dataHandler,
          dispatchId: dispatchId
        });
      }
    }, {
      key: 'cleanData',
      value: function cleanData() {
        var targetName = this.props.targetName || this.props.functionName;
        this.props.fetchActions.cleanData({ targetName: targetName });
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            fetchData = _props2.fetchData,
            fetchStatus = _props2.fetchStatus,
            fetchInfo = _props2.fetchInfo,
            fetchDispatchId = _props2.fetchDispatchId,
            fetchError = _props2.fetchError,
            component = _props2.component,
            fetchPropsKey = _props2.fetchPropsKey;

        var props = (0, _helpers.removeLocalKeys)(this.props);
        var propsToPass = Object.assign(props, _defineProperty({}, fetchPropsKey, {
          data: fetchData,
          error: fetchError,
          status: fetchStatus,
          info: fetchInfo,
          dispatchId: fetchDispatchId,
          isLoading: (0, _helpers.isLoading)(fetchStatus),
          refresh: this.onRefresh
        }));
        if (component) {
          return (0, _react.createElement)(component, propsToPass);
        }
        return this.props.render(propsToPass);
      }
    }]);

    return FetchCloudCode;
  }(_react2.default.Component);

  exports.default = (0, _store2.default)(FetchCloudCode);


  FetchCloudCode.propTypes = _propTypes.propTypes;

  FetchCloudCode.defaultProps = _propTypes.defaultProps;
});