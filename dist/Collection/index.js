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

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

var _helpersStatusChecker = require('../helpers/statusChecker');

var _propTypes = require('./prop-types');

var FetchCollection = (function (_React$PureComponent) {
  _inherits(FetchCollection, _React$PureComponent);

  function FetchCollection(props) {
    _classCallCheck(this, FetchCollection);

    _get(Object.getPrototypeOf(FetchCollection.prototype), 'constructor', this).call(this, props);
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.onDeleteDocument = this.onDeleteDocument.bind(this);
    this.onUpdateDocument = this.onUpdateDocument.bind(this);
    this.onRefreshData = this.onRefreshData.bind(this);
  }

  _createClass(FetchCollection, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var localFirst = _props.localFirst;
      var collectionName = _props.collectionName;
      var data = _props.data;

      if (!collectionName) {
        return;
      }

      if (localFirst || localFirst && !data) {
        this.getDataFromServer();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ((0, _helpersStatusChecker.isCollectionParamsChanged)(nextProps)) {
        this.getDataFromServer(nextProps);
      }
      this.handleCallBacks(this.props, nextProps);
    }
  }, {
    key: 'handleCallBacks',
    value: function handleCallBacks(props, nextProps) {
      if ((0, _helpersStatusChecker.isGetFinish)(props, nextProps)) {
        props.onGetFinish({
          queryStatus: nextProps.queryStatus,
          data: nextProps.data,
          info: nextProps.info
        });
      } else if ((0, _helpersStatusChecker.isDeleteFinish)(props, nextProps)) {
        this.getDataFromServer(nextProps);
        props.onDeleteDocumentFinish(nextProps.queryStatus);
      } else if ((0, _helpersStatusChecker.isUpdateFinish)(nextProps)) {
        this.getDataFromServer(nextProps);
        props.onPutDocumentFinish(nextProps.queryStatus);
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
    key: 'onDeleteDocument',
    value: function onDeleteDocument(objectId) {
      var _props2 = this.props;
      var queryStatus = _props2.queryStatus;
      var actions = _props2.actions;
      var collectionName = _props2.collectionName;
      var targetName = _props2.targetName;

      if (!objectId) {
        console.warn('onDeleteDocument: missing objectId ');
        return;
      }
      if (queryStatus === _types2['default'].DELETE_START) {
        return;
      }
      actions.deleteDocument(collectionName, targetName, objectId);
    }
  }, {
    key: 'onUpdateDocument',
    value: function onUpdateDocument(objectId, data) {
      var _props3 = this.props;
      var actions = _props3.actions;
      var collectionName = _props3.collectionName;
      var targetName = _props3.targetName;

      if (!objectId) {
        console.warn('onUpdateDocument: missing objectId ');
        return;
      }
      if (!data || typeof data !== 'object') {
        console.warn('onUpdateDocument: missing data object ');
        return;
      }
      actions.updateDocument(collectionName, targetName, objectId, data);
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

      if (localOnly || !props.collectionName) {
        return;
      }
      this.props.onGetStart();
      this.props.actions.getCollection({
        collectionName: props.collectionName,
        targetName: props.targetName,
        query: props.query,
        perPage: props.perPage,
        page: props.page,
        include: props.include,
        keys: props.keys,
        enableCount: props.enableCount
      });
    }
  }, {
    key: 'removerDataFromStore',
    value: function removerDataFromStore() {
      var keyForData = this.props.targetName || this.props.collectionName;
      this.props.actions.clearCollection(keyForData);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var data = _props4.data;
      var queryStatus = _props4.queryStatus;
      var info = _props4.info;

      var refreshData = this.onRefreshData;
      return this.props.render({
        data: data,
        queryStatus: queryStatus,
        info: info,
        refreshData: refreshData,
        deleteDocument: this.onDeleteDocument,
        updateDocument: this.onUpdateDocument
      });
    }
  }]);

  return FetchCollection;
})(_react2['default'].PureComponent);

function mapStateToProps(state, props) {
  var keyForData = props.targetName || props.collectionName;
  return {
    data: (0, _selectors.getData)(state, keyForData),
    queryStatus: (0, _selectors.getStatus)(state, keyForData),
    info: (0, _selectors.getInfo)(state, keyForData)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)({ deleteDocument: _actions.deleteDocumentFromCollection, updateDocument: _actions.updateDocumentFromCollection, clearCollection: _actions.clearCollection, getCollection: _actions.getCollection }, dispatch)
  };
}
exports['default'] = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchCollection);

FetchCollection.propTypes = _propTypes.propTypes;

FetchCollection.defaultProps = _propTypes.defaultProps;
module.exports = exports['default'];