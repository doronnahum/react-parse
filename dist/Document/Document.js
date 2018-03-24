(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './prop-types', './store', '../helpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./prop-types'), require('./store'), require('../helpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.store, global.helpers);
    global.Document = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _store, _helpers) {
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

  var FetchDocument = function (_React$Component) {
    _inherits(FetchDocument, _React$Component);

    function FetchDocument(props) {
      _classCallCheck(this, FetchDocument);

      var _this = _possibleConstructorReturn(this, (FetchDocument.__proto__ || Object.getPrototypeOf(FetchDocument)).call(this, props));

      _this.fetchData = _this.fetchData.bind(_this);
      _this.onDelete = _this.onDelete.bind(_this);
      _this.updateField = _this.updateField.bind(_this);
      _this.onRefresh = _this.onRefresh.bind(_this);
      _this.onPost = _this.onPost.bind(_this);
      _this.onPut = _this.onPut.bind(_this);
      _this.cleanData = _this.cleanData.bind(_this);
      return _this;
    }

    _createClass(FetchDocument, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _props = this.props,
            localFirst = _props.localFirst,
            fetchData = _props.fetchData,
            objectId = _props.objectId;

        if (objectId && (!localFirst || localFirst && !fetchData)) {
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
        this.isUnmounted;
        if (this.props.leaveClean) {
          this.cleanData();
        }
      }
    }, {
      key: 'onDelete',
      value: function onDelete() {
        var _props2 = this.props,
            objectId = _props2.objectId,
            schemaName = _props2.schemaName,
            targetName = _props2.targetName;

        this.props.fetchActions.deleteDocument(targetName, schemaName, objectId);
      }
    }, {
      key: 'onRefresh',
      value: function onRefresh() {
        this.fetchData(this.props, false);
      }
    }, {
      key: 'onPut',
      value: function onPut(dataFromCall) {
        var _props3 = this.props,
            fetchActions = _props3.fetchActions,
            targetName = _props3.targetName,
            schemaName = _props3.schemaName,
            fetchData = _props3.fetchData,
            objectId = _props3.objectId,
            parseDataBeforeSubmit = _props3.parseDataBeforeSubmit;

        var dataToUpdate = dataFromCall || fetchData;
        var target = targetName || objectId;
        var dataToSend = parseDataBeforeSubmit ? parseDataBeforeSubmit(dataToUpdate) : dataToUpdate;
        fetchActions.putDoc({
          targetName: target,
          schemaName: schemaName,
          data: dataToSend,
          objectId: objectId
        });
      }
    }, {
      key: 'onPost',
      value: function onPost(dataFromCall) {
        var _props4 = this.props,
            fetchActions = _props4.fetchActions,
            targetName = _props4.targetName,
            schemaName = _props4.schemaName,
            fetchData = _props4.fetchData,
            objectId = _props4.objectId,
            uniqueId = _props4.uniqueId,
            parseDataBeforeSubmit = _props4.parseDataBeforeSubmit;

        var target = targetName || objectId || uniqueId;
        var dataToCrate = dataFromCall || fetchData;
        var dataToSend = parseDataBeforeSubmit ? parseDataBeforeSubmit(dataToCrate) : dataToCrate;
        fetchActions.postDoc({ targetName: target, schemaName: schemaName, data: dataToSend });
      }
    }, {
      key: 'fetchData',
      value: function fetchData() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
        var localOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.localOnly;
        var targetName = props.targetName,
            schemaName = props.schemaName,
            objectId = props.objectId,
            include = props.include,
            keys = props.keys;

        if (localOnly || !objectId || !schemaName) {
          return;
        }
        this.props.fetchActions.fetchData({
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
        var _props5 = this.props,
            targetName = _props5.targetName,
            objectId = _props5.objectId,
            uniqueId = _props5.uniqueId;

        var target = targetName || objectId || uniqueId;
        this.props.fetchActions.updateField({ targetName: target, key: key, value: value });
      }
    }, {
      key: 'handleCallBacks',
      value: function handleCallBacks(props, nextProps) {
        var fetchStatus = nextProps.fetchStatus,
            fetchData = nextProps.fetchData,
            fetchInfo = nextProps.fetchInfo,
            fetchError = nextProps.fetchError,
            autoRefresh = nextProps.autoRefresh;

        if ((0, _helpers.isFetchFinish)(props, nextProps)) {
          props.onFetchEnd(fetchError, { fetchStatus: fetchStatus, fetchData: fetchData, fetchInfo: fetchInfo });
        } else if ((0, _helpers.isDeleteFinish)(props, nextProps)) {
          if (autoRefresh) this.fetchData(nextProps);
          props.onDeleteEnd(fetchError, { fetchStatus: fetchStatus, fetchData: fetchData, fetchInfo: fetchInfo });
        } else if ((0, _helpers.isUpdateFinish)(props, nextProps)) {
          if (autoRefresh) this.fetchData(nextProps);
          props.onPutEnd(fetchError, { fetchStatus: fetchStatus, fetchData: fetchData, fetchInfo: fetchInfo });
        } else if ((0, _helpers.isCreateFinish)(props, nextProps)) {
          if (autoRefresh) this.fetchData(nextProps);
          props.onPostEnd(fetchError, { fetchStatus: fetchStatus, fetchData: fetchData, fetchInfo: fetchInfo });
        }
      }
    }, {
      key: 'cleanData',
      value: function cleanData() {
        var _props6 = this.props,
            targetName = _props6.targetName,
            objectId = _props6.objectId,
            uniqueId = _props6.uniqueId;

        var target = targetName || objectId || uniqueId;
        this.props.fetchActions.cleanData(target);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props7 = this.props,
            fetchData = _props7.fetchData,
            fetchStatus = _props7.fetchStatus,
            fetchInfo = _props7.fetchInfo,
            fetchError = _props7.fetchError,
            component = _props7.component,
            objectId = _props7.objectId;

        var props = (0, _helpers.removeLocalKeys)(this.props);
        var propsToPass = Object.assign(props, {
          fetchProps: {
            data: fetchData,
            fetchError: fetchError,
            status: fetchStatus,
            info: fetchInfo,
            isLoading: (0, _helpers.isLoading)(fetchStatus),
            refresh: this.onRefresh,
            deleteDoc: this.onDelete,
            put: objectId && this.onPut,
            post: this.onPost,
            cleanData: this.cleanData
          }
        });
        if (component) {
          return (0, _react.createElement)(component, propsToPass);
        }
        return this.props.render(propsToPass);
      }
    }]);

    return FetchDocument;
  }(_react2.default.Component);

  FetchDocument.propTypes = _propTypes.propTypes;
  FetchDocument.defaultProps = _propTypes.defaultProps;
  exports.default = (0, _store2.default)(FetchDocument);
});