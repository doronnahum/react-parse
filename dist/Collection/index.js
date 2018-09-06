(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './store', '../helpers', './prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./store'), require('../helpers'), require('./prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.store, global.helpers, global.propTypes);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _store, _helpers, _propTypes) {
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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  var FetchCollection = function (_React$PureComponent) {
    _inherits(FetchCollection, _React$PureComponent);

    function FetchCollection(props) {
      _classCallCheck(this, FetchCollection);

      var _this = _possibleConstructorReturn(this, (FetchCollection.__proto__ || Object.getPrototypeOf(FetchCollection)).call(this, props));

      _this.fetchData = _this.fetchData.bind(_this);
      _this.onDelete = _this.onDelete.bind(_this);
      _this.onPut = _this.onPut.bind(_this);
      _this.onPost = _this.onPost.bind(_this);
      _this.onRefresh = _this.onRefresh.bind(_this);
      return _this;
    }

    _createClass(FetchCollection, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _props = this.props,
            schemaName = _props.schemaName,
            localFirst = _props.localFirst,
            fetchData = _props.fetchData,
            isLoading = _props.isLoading;

        if (schemaName && (!localFirst || localFirst && !fetchData && !isLoading)) {
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
      key: 'onDelete',
      value: function onDelete(objectId, dispatchId, boomerang) {
        var _props2 = this.props,
            fetchActions = _props2.fetchActions,
            schemaName = _props2.schemaName,
            targetName = _props2.targetName;

        if (!objectId) {
          console.warn('onDelete: missing objectId ');
          return;
        }
        fetchActions.deleteDoc({ schemaName: schemaName, targetName: targetName, objectId: objectId, dispatchId: dispatchId, boomerang: boomerang });
      }
    }, {
      key: 'onPut',
      value: function onPut(objectId, data, filesIncluded, fileValueHandler, dispatchId, boomerang) {
        var _props3 = this.props,
            fetchActions = _props3.fetchActions,
            schemaName = _props3.schemaName,
            targetName = _props3.targetName;

        if (!objectId) {
          console.warn('onUpdateDoc: missing objectId ');
          return;
        }
        if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
          console.warn('onUpdateDoc: missing data object ');
          return;
        }
        fetchActions.putDoc({ schemaName: schemaName, targetName: targetName, objectId: objectId, data: data, filesIncluded: filesIncluded, fileValueHandler: fileValueHandler, dispatchId: dispatchId, boomerang: boomerang });
      }
    }, {
      key: 'onPost',
      value: function onPost(data, filesIncluded, fileValueHandler, dispatchId, boomerang) {
        var _props4 = this.props,
            fetchActions = _props4.fetchActions,
            schemaName = _props4.schemaName,
            targetName = _props4.targetName;

        if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
          console.warn('onPost: missing data object ');
          return;
        }
        fetchActions.postDoc({ schemaName: schemaName, targetName: targetName, data: data, filesIncluded: filesIncluded, fileValueHandler: fileValueHandler, dispatchId: dispatchId, boomerang: boomerang });
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
        var boomerang = arguments[3];
        var targetName = props.targetName,
            schemaName = props.schemaName,
            query = props.query,
            limit = props.limit,
            skip = props.skip,
            enableCount = props.enableCount,
            keys = props.keys,
            include = props.include,
            order = props.order,
            dataHandler = props.dataHandler;

        if (localOnly || !props.schemaName) {
          return;
        }
        props.fetchActions.fetchData({
          targetName: targetName,
          schemaName: schemaName,
          query: query,
          limit: limit,
          skip: skip,
          enableCount: enableCount,
          keys: keys,
          include: include,
          order: order,
          dataHandler: dataHandler,
          dispatchId: dispatchId,
          boomerang: boomerang
        });
      }
    }, {
      key: 'handleCallBacks',
      value: function handleCallBacks(props, nextProps) {
        var fetchStatus = nextProps.fetchStatus,
            fetchData = nextProps.fetchData,
            fetchInfo = nextProps.fetchInfo,
            fetchError = nextProps.fetchError,
            autoRefresh = nextProps.autoRefresh,
            fetchBoomerang = nextProps.fetchBoomerang,
            fetchDispatchId = nextProps.fetchDispatchId,
            fetchCount = nextProps.fetchCount;

        var callBackData = { error: fetchError, status: fetchStatus, data: fetchData, info: fetchInfo, boomerang: fetchBoomerang, dispatchId: fetchDispatchId, count: fetchCount };
        if ((0, _helpers.isFetchFinish)(props, nextProps)) {
          props.onFetchEnd(callBackData);
        } else if ((0, _helpers.isDeleteFinish)(props, nextProps)) {
          if (autoRefresh) this.fetchData(nextProps);
          props.onDeleteEnd(callBackData);
        } else if ((0, _helpers.isUpdateFinish)(props, nextProps)) {
          if (autoRefresh) this.fetchData(nextProps);
          props.onPutEnd(callBackData);
        } else if ((0, _helpers.isCreateFinish)(props, nextProps)) {
          if (autoRefresh) this.fetchData(nextProps);
          props.onPostEnd(callBackData);
        }
      }
    }, {
      key: 'cleanData',
      value: function cleanData() {
        var targetName = this.props.targetName || this.props.schemaName;
        this.props.fetchActions.cleanData({ targetName: targetName });
      }
    }, {
      key: 'render',
      value: function render() {
        var _props5 = this.props,
            fetchData = _props5.fetchData,
            fetchStatus = _props5.fetchStatus,
            fetchInfo = _props5.fetchInfo,
            fetchError = _props5.fetchError,
            fetchCount = _props5.fetchCount,
            fetchDispatchId = _props5.fetchDispatchId,
            component = _props5.component,
            fetchPropsKey = _props5.fetchPropsKey;

        var props = (0, _helpers.removeLocalKeys)(this.props);
        var propsToPass = Object.assign(props, _defineProperty({}, fetchPropsKey, {
          data: fetchData,
          error: fetchError,
          status: fetchStatus,
          info: fetchInfo,
          count: fetchCount,
          dispatchId: fetchDispatchId,
          isLoading: (0, _helpers.isLoading)(fetchStatus),
          refresh: this.onRefresh,
          deleteDoc: this.onDelete,
          put: this.onPut,
          post: this.onPost
        }));
        if (component) {
          return (0, _react.createElement)(component, propsToPass);
        }
        return this.props.render(propsToPass);
      }
    }]);

    return FetchCollection;
  }(_react2.default.PureComponent);

  exports.default = (0, _store2.default)(FetchCollection);

  FetchCollection.propTypes = _propTypes.propTypes;

  FetchCollection.defaultProps = _propTypes.defaultProps;
});