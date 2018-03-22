(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-redux', 'redux', './actions', './selectors', '../helpers', './prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-redux'), require('redux'), require('./actions'), require('./selectors'), require('../helpers'), require('./prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactRedux, global.redux, global.actions, global.selectors, global.helpers, global.propTypes);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _reactRedux, _redux, _actions, _selectors, _helpers, _propTypes) {
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
            data = _props.data;

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
      key: 'onDelete',
      value: function onDelete(objectId) {
        var _props2 = this.props,
            actions = _props2.actions,
            schemaName = _props2.schemaName,
            targetName = _props2.targetName;

        if (!objectId) {
          console.warn('onDelete: missing objectId ');
          return;
        }
        actions.deleteDoc({ schemaName: schemaName, targetName: targetName, objectId: objectId });
      }
    }, {
      key: 'onPut',
      value: function onPut(objectId, data) {
        var _props3 = this.props,
            actions = _props3.actions,
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
        actions.putDoc({ schemaName: schemaName, targetName: targetName, objectId: objectId, data: data });
      }
    }, {
      key: 'onPost',
      value: function onPost(data) {
        var _props4 = this.props,
            actions = _props4.actions,
            schemaName = _props4.schemaName,
            targetName = _props4.targetName;

        if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
          console.warn('onPost: missing data object ');
          return;
        }
        actions.postDoc({ schemaName: schemaName, targetName: targetName, data: data });
      }
    }, {
      key: 'onRefresh',
      value: function onRefresh() {
        debugger;
        this.fetchData(this.props, false);
      }
    }, {
      key: 'fetchData',
      value: function fetchData() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
        var localOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.localOnly;
        var targetName = props.targetName,
            schemaName = props.schemaName,
            query = props.query,
            limit = props.limit,
            skip = props.skip,
            enableCount = props.enableCount,
            keys = props.keys,
            include = props.include,
            order = props.order;

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
        var queryStatus = nextProps.queryStatus,
            data = nextProps.data,
            info = nextProps.info,
            error = nextProps.error,
            autoRefresh = nextProps.autoRefresh;

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
        var _props5 = this.props,
            data = _props5.data,
            queryStatus = _props5.queryStatus,
            info = _props5.info,
            error = _props5.error;

        return this.props.render(error, {
          data: data,
          isLoading: (0, _helpers.isLoading)(queryStatus),
          status: queryStatus,
          info: info,
          refresh: this.onRefresh,
          delete: this.onDelete,
          put: this.onPut,
          post: this.onPost
        });
      }
    }]);

    return FetchCollection;
  }(_react2.default.PureComponent);

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

  exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchCollection);

  FetchCollection.propTypes = _propTypes.propTypes;

  FetchCollection.defaultProps = _propTypes.defaultProps;
});