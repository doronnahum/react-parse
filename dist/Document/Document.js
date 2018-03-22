(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-redux', 'redux', './actions', './prop-types', './selectors', '../helpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-redux'), require('redux'), require('./actions'), require('./prop-types'), require('./selectors'), require('../helpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactRedux, global.redux, global.actions, global.propTypes, global.selectors, global.helpers);
    global.Document = mod.exports;
  }
})(this, function (exports, _react, _reactRedux, _redux, _actions, _propTypes, _selectors, _helpers) {
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
            data = _props.data,
            objectId = _props.objectId;

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
        var _props2 = this.props,
            objectId = _props2.objectId,
            schemaName = _props2.schemaName,
            targetName = _props2.targetName;

        this.props.actions.deleteDocument(targetName, schemaName, objectId);
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
            actions = _props3.actions,
            targetName = _props3.targetName,
            schemaName = _props3.schemaName,
            data = _props3.data,
            objectId = _props3.objectId,
            parseDataBeforeSubmit = _props3.parseDataBeforeSubmit;

        var dataToUpdate = dataFromCall || data;
        var target = targetName || objectId;
        var dataToSend = parseDataBeforeSubmit ? parseDataBeforeSubmit(dataToUpdate) : dataToUpdate;
        actions.putDoc({
          targetName: target,
          schemaName: schemaName,
          data: dataToSend,
          objectId: objectId
        });
      }
    }, {
      key: 'onPost',
      value: function onPost() {
        var _props4 = this.props,
            actions = _props4.actions,
            targetName = _props4.targetName,
            schemaName = _props4.schemaName,
            data = _props4.data,
            uniqueId = _props4.uniqueId,
            parseDataBeforeSubmit = _props4.parseDataBeforeSubmit;

        var target = targetName || uniqueId;
        var dataToSend = parseDataBeforeSubmit ? parseDataBeforeSubmit(data) : data;
        actions.postDoc({ targetName: target, schemaName: schemaName, data: dataToSend });
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
        var _props5 = this.props,
            targetName = _props5.targetName,
            objectId = _props5.objectId,
            uniqueId = _props5.uniqueId;

        var target = targetName || objectId || uniqueId;
        this.props.actions.updateField({ targetName: target, key: key, value: value });
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
        var _props6 = this.props,
            targetName = _props6.targetName,
            objectId = _props6.objectId,
            uniqueId = _props6.uniqueId;

        var target = targetName || objectId || uniqueId;
        this.props.actions.cleanData(target);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props7 = this.props,
            data = _props7.data,
            queryStatus = _props7.queryStatus,
            info = _props7.info,
            error = _props7.error,
            objectId = _props7.objectId;

        return this.props.render(error, {
          data: data,
          isLoading: (0, _helpers.isLoading)(queryStatus),
          status: queryStatus,
          info: info,
          refresh: this.onRefresh,
          delete: objectId && this.onDelete,
          cleanData: objectId || this.cleanData,
          put: objectId && this.onPut,
          post: objectId || this.onPost,
          updateField: this.updateField
        });
      }
    }]);

    return FetchDocument;
  }(_react2.default.Component);

  function mapStateToProps(state, props) {
    var targetName = props.targetName,
        objectId = props.objectId,
        uniqueId = props.uniqueId;

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

  exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchDocument);

  FetchDocument.propTypes = _propTypes.propTypes;
  FetchDocument.defaultProps = _propTypes.defaultProps;
});