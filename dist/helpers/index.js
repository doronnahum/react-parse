'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashIsEqual = require('lodash/isEqual');

var _lodashIsEqual2 = _interopRequireDefault(_lodashIsEqual);

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

var LOADING = _types2['default'].LOADING;
var DELETE_DOCUMENT_START = _types2['default'].DELETE_DOCUMENT_START;
var UPDATE_DOCUMENT_START = _types2['default'].UPDATE_DOCUMENT_START;
var CREATE_DOCUMENT_START = _types2['default'].CREATE_DOCUMENT_START;
var DELETE_DOCUMENT_FROM_COLLECTION_START = _types2['default'].DELETE_DOCUMENT_FROM_COLLECTION_START;
var UPDATE_DOCUMENT_FROM_COLLECTION_START = _types2['default'].UPDATE_DOCUMENT_FROM_COLLECTION_START;
var ERROR = _types2['default'].ERROR;
var NETWORK_ERROR = _types2['default'].NETWORK_ERROR;
var FETCH_START = _types2['default'].FETCH_START;
var FETCH_FAILED = _types2['default'].FETCH_FAILED;
var FETCH_FAILED_NETWORK = _types2['default'].FETCH_FAILED_NETWORK;
var FETCH_FINISHED = _types2['default'].FETCH_FINISHED;
var POST_START = _types2['default'].POST_START;
var POST_FAILED = _types2['default'].POST_FAILED;
var POST_FAILED_NETWORK = _types2['default'].POST_FAILED_NETWORK;
var POST_FINISHED = _types2['default'].POST_FINISHED;
var DELETE_START = _types2['default'].DELETE_START;
var DELETE_FAILED = _types2['default'].DELETE_FAILED;
var DELETE_FAILED_NETWORK = _types2['default'].DELETE_FAILED_NETWORK;
var DELETE_FINISHED = _types2['default'].DELETE_FINISHED;
var PUT_START = _types2['default'].PUT_START;
var PUT_FAILED = _types2['default'].PUT_FAILED;
var PUT_FAILED_NETWORK = _types2['default'].PUT_FAILED_NETWORK;
var PUT_FINISHED = _types2['default'].PUT_FINISHED;
var createUniqueId = function createUniqueId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x100).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

exports.createUniqueId = createUniqueId;
/**
 * dig
 * @param {*} obj pass the object that hold the data
 * @param {*} target pass string to target: 'props.user[0].name'
 * @return return the target or null
 */
var dig = function dig(obj, target) {
  var keys = target.split('.');
  var digged = obj;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var parts = key.split('[');
      var currentKey = parts[0];
      digged = digged[currentKey];
      if (typeof digged === 'undefined' || digged === null) {
        return digged;
      }
      if (parts[1]) {
        digged = digged[parts[1].replace(']', '')];
        if (typeof digged === 'undefined' || digged === null) {
          return undefined;
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return digged;
};

exports.dig = dig;
var GetPointerObject = function GetPointerObject(className, objectId) {
  return {
    __type: 'Pointer',
    className: className,
    objectId: objectId
  };
};

exports.GetPointerObject = GetPointerObject;
var isParamsChanged = function isParamsChanged(props, nextProps) {
  return !(0, _lodashIsEqual2['default'])(props.params, nextProps.params);
};
var isDocTargetChanged = function isTargetChanged(props, nextProps) {
  var status = true;
  if (props.targetName !== nextProps.targetName) {
    status = false;
  } else if (props.objectId !== nextProps.objectId) {
    status = false;
  } else if (props.uniqueId !== nextProps.uniqueId) {
    status = false;
  }
  return status;
};
exports.isDocTargetChanged = isDocTargetChanged;
var isTargetChanged = function isTargetChanged(props, nextProps) {
  var status = true;
  if (props.targetName !== nextProps.targetName) {
    status = false;
  } else if (props.functionName !== nextProps.functionName) {
    status = false;
  } else if (props.schemaName !== nextProps.schemaName) {
    status = false;
  }
  return status;
};
exports.isTargetChanged = isTargetChanged;
var isFunctionChanged = function isFunctionChanged(props, nextProps) {
  return props.functionName !== nextProps.functionName;
};
exports.isFunctionChanged = isFunctionChanged;
var isCloudCodePropsChanged = function isChanged(props, nextProps) {
  var status = false;
  if (isParamsChanged(props, nextProps)) {
    status = true;
  } else if (isFunctionChanged(props, nextProps)) {
    status = true;
  }
  return status;
};

exports.isCloudCodePropsChanged = isCloudCodePropsChanged;
var isLoading = function isLoading(status) {
  var isLoadingStatus = status === FETCH_START || status === POST_START || status === DELETE_START || status === PUT_START;
  return isLoadingStatus;
};
exports.isLoading = isLoading;
var isCreateFinish = function isCreateFinish(props, nextProps) {
  var now = props.queryStatus;
  var next = nextProps.queryStatus;
  var isStart = now === POST_START;
  var isFinished = next === POST_FINISHED;
  var isFailed = next === POST_FAILED;
  var isFailedNetwork = next === POST_FAILED_NETWORK;
  var isEnd = isFinished || isFailed || isFailedNetwork;
  return isStart && isEnd;
};

exports.isCreateFinish = isCreateFinish;
var isDeleteStart = function isDeleteStart(queryStatus) {
  return queryStatus === DELETE_START;
};
exports.isDeleteStart = isDeleteStart;
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
  var isStart = now === PUT_START;
  var isFinished = next === PUT_FINISHED;
  var isFailed = next === PUT_FAILED;
  var isFailedNetwork = next === PUT_FAILED_NETWORK;
  var isEnd = isFinished || isFailed || isFailedNetwork;
  return isStart && isEnd;
};

exports.isUpdateFinish = isUpdateFinish;
var isFetchFinish = function isFetchFinish(props, nextProps) {
  var now = props.queryStatus;
  var next = nextProps.queryStatus;
  var isStart = now === FETCH_START;
  var isFinished = next === FETCH_FINISHED;
  var isFailed = next === FETCH_FAILED;
  var isFailedNetwork = next === FETCH_FAILED_NETWORK;
  var isEnd = isFinished || isFailed || isFailedNetwork;
  return isStart && isEnd;
};

exports.isFetchFinish = isFetchFinish;
var isDataChanged = function isDataChanged(props, nextProps) {
  return props.data !== nextProps.data;
};
exports.isDataChanged = isDataChanged;
var isQueryStatusChanged = function isQueryStatusChanged(props, nextProps) {
  return props.queryStatus !== nextProps.queryStatus;
};
exports.isQueryStatusChanged = isQueryStatusChanged;
var isDocumentParamsChanged = function isDocumentParamsChanged(props, nextProps) {
  // schemaName was change, get data from server
  if (props.schemaName !== nextProps.schemaName) {
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
var isCollectionParamsChanged = function isCollectionParamsChanged(props, nextProps) {
  // filters was change, get data from server
  if (!(0, _lodashIsEqual2['default'])(props.query, nextProps.query)) {
    return true;
  }
  // page was change, get data from server
  if (props.page !== nextProps.page) {
    return true;
  }
  // schemaName was change, get data from server
  if (props.schemaName !== nextProps.schemaName) {
    return true;
  }
  // keys was change, get data from server
  if (props.keys !== nextProps.keys) {
    return true;
  }
  return false;
};
exports.isCollectionParamsChanged = isCollectionParamsChanged;