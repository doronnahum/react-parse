(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/isEqual', '../types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/isEqual'), require('../types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.isEqual, global.types);
    global.index = mod.exports;
  }
})(this, function (exports, _isEqual, _types) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isCollectionParamsChanged = exports.isDocumentParamsChanged = exports.isQueryStatusChanged = exports.isDataChanged = exports.isFetchFinish = exports.isUpdateFinish = exports.isDeleteFinish = exports.isDeleteStart = exports.isCreateFinish = exports.isLoading = exports.isCloudCodePropsChanged = exports.isFunctionChanged = exports.isTargetChanged = exports.isDocTargetChanged = exports.GetPointerObject = exports.dig = exports.createUniqueId = undefined;

  var _isEqual2 = _interopRequireDefault(_isEqual);

  var _types2 = _interopRequireDefault(_types);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FETCH_START = _types2.default.FETCH_START,
      FETCH_FAILED = _types2.default.FETCH_FAILED,
      FETCH_FAILED_NETWORK = _types2.default.FETCH_FAILED_NETWORK,
      FETCH_FINISHED = _types2.default.FETCH_FINISHED,
      POST_START = _types2.default.POST_START,
      POST_FAILED = _types2.default.POST_FAILED,
      POST_FAILED_NETWORK = _types2.default.POST_FAILED_NETWORK,
      POST_FINISHED = _types2.default.POST_FINISHED,
      DELETE_START = _types2.default.DELETE_START,
      DELETE_FAILED = _types2.default.DELETE_FAILED,
      DELETE_FAILED_NETWORK = _types2.default.DELETE_FAILED_NETWORK,
      DELETE_FINISHED = _types2.default.DELETE_FINISHED,
      PUT_START = _types2.default.PUT_START,
      PUT_FAILED = _types2.default.PUT_FAILED,
      PUT_FAILED_NETWORK = _types2.default.PUT_FAILED_NETWORK,
      PUT_FINISHED = _types2.default.PUT_FINISHED;
  var createUniqueId = exports.createUniqueId = function createUniqueId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x100).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
  };

  /**
   * dig
   * @param {*} obj pass the object that hold the data
   * @param {*} target pass string to target: 'props.user[0].name'
   * @return return the target or null
   */
  var dig = exports.dig = function dig(obj, target) {
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
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return digged;
  };

  var GetPointerObject = exports.GetPointerObject = function GetPointerObject(className, objectId) {
    return {
      __type: 'Pointer',
      className: className,
      objectId: objectId
    };
  };

  var isParamsChanged = function isParamsChanged(props, nextProps) {
    return !(0, _isEqual2.default)(props.params, nextProps.params);
  };
  var isDocTargetChanged = exports.isDocTargetChanged = function isDocTargetChanged(props, nextProps) {
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
  var isTargetChanged = exports.isTargetChanged = function isTargetChanged(props, nextProps) {
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
  var isFunctionChanged = exports.isFunctionChanged = function isFunctionChanged(props, nextProps) {
    return props.functionName !== nextProps.functionName;
  };
  var isCloudCodePropsChanged = exports.isCloudCodePropsChanged = function isCloudCodePropsChanged(props, nextProps) {
    var status = false;
    if (isParamsChanged(props, nextProps)) {
      status = true;
    } else if (isFunctionChanged(props, nextProps)) {
      status = true;
    }
    return status;
  };

  var isLoading = exports.isLoading = function isLoading(status) {
    var isLoadingStatus = status === FETCH_START || status === POST_START || status === DELETE_START || status === PUT_START;
    return isLoadingStatus;
  };
  var isCreateFinish = exports.isCreateFinish = function isCreateFinish(props, nextProps) {
    var now = props.queryStatus;
    var next = nextProps.queryStatus;
    var isStart = now === POST_START;
    var isFinished = next === POST_FINISHED;
    var isFailed = next === POST_FAILED;
    var isFailedNetwork = next === POST_FAILED_NETWORK;
    var isEnd = isFinished || isFailed || isFailedNetwork;
    return isStart && isEnd;
  };

  var isDeleteStart = exports.isDeleteStart = function isDeleteStart(queryStatus) {
    return queryStatus === DELETE_START;
  };

  var isDeleteFinish = exports.isDeleteFinish = function isDeleteFinish(props, nextProps) {
    var now = props.queryStatus;
    var next = nextProps.queryStatus;
    var isStart = now === DELETE_START;
    var isFinished = next === DELETE_FINISHED;
    var isFailed = next === DELETE_FAILED;
    var isFailedNetwork = next === DELETE_FAILED_NETWORK;
    var isEnd = isFinished || isFailed || isFailedNetwork;
    return isStart && isEnd;
  };

  var isUpdateFinish = exports.isUpdateFinish = function isUpdateFinish(props, nextProps) {
    var now = props.queryStatus;
    var next = nextProps.queryStatus;
    var isStart = now === PUT_START;
    var isFinished = next === PUT_FINISHED;
    var isFailed = next === PUT_FAILED;
    var isFailedNetwork = next === PUT_FAILED_NETWORK;
    var isEnd = isFinished || isFailed || isFailedNetwork;
    return isStart && isEnd;
  };

  var isFetchFinish = exports.isFetchFinish = function isFetchFinish(props, nextProps) {
    var now = props.queryStatus;
    var next = nextProps.queryStatus;
    var isStart = now === FETCH_START;
    var isFinished = next === FETCH_FINISHED;
    var isFailed = next === FETCH_FAILED;
    var isFailedNetwork = next === FETCH_FAILED_NETWORK;
    var isEnd = isFinished || isFailed || isFailedNetwork;
    return isStart && isEnd;
  };

  var isDataChanged = exports.isDataChanged = function isDataChanged(props, nextProps) {
    return props.data !== nextProps.data;
  };

  var isQueryStatusChanged = exports.isQueryStatusChanged = function isQueryStatusChanged(props, nextProps) {
    return props.queryStatus !== nextProps.queryStatus;
  };

  var isDocumentParamsChanged = exports.isDocumentParamsChanged = function isDocumentParamsChanged(props, nextProps) {
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
    if (!(0, _isEqual2.default)(props.initialValues, nextProps.initialValues)) {
      return false; // initialValues only on load fow noe
    }
    return false;
  };

  var isCollectionParamsChanged = exports.isCollectionParamsChanged = function isCollectionParamsChanged(props, nextProps) {
    // filters was change, get data from server
    if (!(0, _isEqual2.default)(props.query, nextProps.query)) {
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

  /* eslint no-restricted-syntax: "off" */
});