'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashIsEqual = require('lodash/isEqual');

var _lodashIsEqual2 = _interopRequireDefault(_lodashIsEqual);

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

var GET_START = _types2['default'].GET_START;
var GET_FAILED = _types2['default'].GET_FAILED;
var GET_FAILED_NETWORK = _types2['default'].GET_FAILED_NETWORK;
var GET_FINISHED = _types2['default'].GET_FINISHED;
var CREATE_START = _types2['default'].CREATE_START;
var CREATE_FAILED = _types2['default'].CREATE_FAILED;
var CREATE_FAILED_NETWORK = _types2['default'].CREATE_FAILED_NETWORK;
var CREATE_FINISHED = _types2['default'].CREATE_FINISHED;
var DELETE_START = _types2['default'].DELETE_START;
var DELETE_FAILED = _types2['default'].DELETE_FAILED;
var DELETE_FAILED_NETWORK = _types2['default'].DELETE_FAILED_NETWORK;
var DELETE_FINISHED = _types2['default'].DELETE_FINISHED;
var UPDATE_START = _types2['default'].UPDATE_START;
var UPDATE_FAILED = _types2['default'].UPDATE_FAILED;
var UPDATE_FAILED_NETWORK = _types2['default'].UPDATE_FAILED_NETWORK;
var UPDATE_FINISHED = _types2['default'].UPDATE_FINISHED;
var isCreateFinish = function isCreateFinish(props, nextProps) {
  var now = props.queryStatus;
  var next = nextProps.queryStatus;
  var isStart = now === CREATE_START;
  var isFinished = next === CREATE_FINISHED;
  var isFailed = next === CREATE_FAILED;
  var isFailedNetwork = next === CREATE_FAILED_NETWORK;
  var isEnd = isFinished || isFailed || isFailedNetwork;
  return isStart && isEnd;
};

exports.isCreateFinish = isCreateFinish;
var isDeleteFinish = function isDeleteFinish(props, nextProps) {
  var now = props.queryStatus;
  var next = nextProps.queryStatus;
  var isStart = now === DELETE_START;
  var isFinished = next === DELETE_FINISHED;
  var isFailed = next === DELETE_FAILED;
  var isFailedNetwork = next === DELETE_FAILED_NETWORK;
  var isEnd = isFinished || isFailed || isFailedNetwork;
  return isStart && isEnd;
};

exports.isDeleteFinish = isDeleteFinish;
var isUpdateFinish = function isUpdateFinish(props, nextProps) {
  var now = props.queryStatus;
  var next = nextProps.queryStatus;
  var isStart = now === UPDATE_START;
  var isFinished = next === UPDATE_FINISHED;
  var isFailed = next === UPDATE_FAILED;
  var isFailedNetwork = next === UPDATE_FAILED_NETWORK;
  var isEnd = isFinished || isFailed || isFailedNetwork;
  return isStart && isEnd;
};

exports.isUpdateFinish = isUpdateFinish;
var isGetFinish = function isGetFinish(props, nextProps) {
  var now = props.queryStatus;
  var next = nextProps.queryStatus;
  var isStart = now === GET_START;
  var isFinished = next === GET_FINISHED;
  var isFailed = next === GET_FAILED;
  var isFailedNetwork = next === GET_FAILED_NETWORK;
  var isEnd = isFinished || isFailed || isFailedNetwork;
  return isStart && isEnd;
};

exports.isGetFinish = isGetFinish;
var isDataChanged = function isDataChanged(props, nextProps) {
  return props.data !== nextProps.data;
};
exports.isDataChanged = isDataChanged;
var isQueryStatusChanged = function isQueryStatusChanged(props, nextProps) {
  return props.queryStatus !== nextProps.queryStatus;
};
exports.isQueryStatusChanged = isQueryStatusChanged;
var isDocumentParamsChanged = function isDocumentParamsChanged(props, nextProps) {
  // collectionName was change, get data from server
  if (props.collectionName !== nextProps.collectionName) {
    return true;
  }
  if (props.objectId !== nextProps.objectId) {
    return true;
  }
  if (props.include !== nextProps.include) {
    return true;
  }
  if (!(0, _lodashIsEqual2['default'])(props.initialValues, nextProps.initialValues)) {
    return false; // initialValues only on load fow noe
  }
  return false;
};
exports.isDocumentParamsChanged = isDocumentParamsChanged;
var isCollectionParamsChanged = function isCollectionParamsChanged(nextProps) {
  // filters was change, get data from server
  if (this.isQueryFilterChanged(nextProps)) {
    return true;
  }
  // page was change, get data from server
  if (this.props.page !== nextProps.page) {
    return true;
  }
  // collectionName was change, get data from server
  if (this.props.collectionName !== nextProps.collectionName) {
    return true;
  }
  // keys was change, get data from server
  if (this.props.keys !== nextProps.keys) {
    return true;
  }
  return false;
};
exports.isCollectionParamsChanged = isCollectionParamsChanged;