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
  exports.GetContentTypeByFileType = exports.GetFileType = exports.removeImutableKeys = exports.removeLocalKeys = exports.isCollectionParamsChanged = exports.isDocumentParamsChanged = exports.isQueryStatusChanged = exports.isDataChanged = exports.isFetchFinish = exports.isUpdateFinish = exports.isDeleteFinish = exports.isDeleteStart = exports.isCreateFinish = exports.isLoading = exports.isCloudCodePropsChanged = exports.isTargetChanged = exports.GetPointerObject = exports.dig = exports.createUniqueId = undefined;

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

  var isTargetChanged = exports.isTargetChanged = function isTargetChanged(props, nextProps) {
    var status = false;
    if (props.targetName !== nextProps.targetName) {
      status = true;
    } else if (props.functionName !== nextProps.functionName) {
      status = true;
    } else if (props.schemaName !== nextProps.schemaName) {
      status = true;
    } else if (props.objectId !== nextProps.objectId) {
      status = true;
    } else if (props.uniqueId !== nextProps.uniqueId) {
      status = true;
    }
    return status;
  };

  var isCloudCodePropsChanged = exports.isCloudCodePropsChanged = function isCloudCodePropsChanged(props, nextProps) {
    var status = false;
    if (isParamsChanged(props, nextProps)) {
      status = true;
    } else if (isTargetChanged(props, nextProps)) {
      status = true;
    }
    return status;
  };

  var isLoading = exports.isLoading = function isLoading(status) {
    var isLoadingStatus = status === FETCH_START || status === POST_START || status === DELETE_START || status === PUT_START;
    return isLoadingStatus;
  };
  var isCreateFinish = exports.isCreateFinish = function isCreateFinish(props, nextProps) {
    var now = props.fetchStatus;
    var next = nextProps.fetchStatus;
    var isStart = now === POST_START;
    var isFinished = next === POST_FINISHED;
    var isFailed = next === POST_FAILED;
    var isFailedNetwork = next === POST_FAILED_NETWORK;
    var isEnd = isFinished || isFailed || isFailedNetwork;
    return isStart && isEnd;
  };

  var isDeleteStart = exports.isDeleteStart = function isDeleteStart(fetchStatus) {
    return fetchStatus === DELETE_START;
  };

  var isDeleteFinish = exports.isDeleteFinish = function isDeleteFinish(props, nextProps) {
    var now = props.fetchStatus;
    var next = nextProps.fetchStatus;
    var isStart = now === DELETE_START;
    var isFinished = next === DELETE_FINISHED;
    var isFailed = next === DELETE_FAILED;
    var isFailedNetwork = next === DELETE_FAILED_NETWORK;
    var isEnd = isFinished || isFailed || isFailedNetwork;
    return isStart && isEnd;
  };

  var isUpdateFinish = exports.isUpdateFinish = function isUpdateFinish(props, nextProps) {
    var now = props.fetchStatus;
    var next = nextProps.fetchStatus;
    var isStart = now === PUT_START;
    var isFinished = next === PUT_FINISHED;
    var isFailed = next === PUT_FAILED;
    var isFailedNetwork = next === PUT_FAILED_NETWORK;
    var isEnd = isFinished || isFailed || isFailedNetwork;
    return isStart && isEnd;
  };

  var isFetchFinish = exports.isFetchFinish = function isFetchFinish(props, nextProps) {
    var now = props.fetchStatus;
    var next = nextProps.fetchStatus;
    var isStart = now === FETCH_START;
    var isFinished = next === FETCH_FINISHED;
    var isFailed = next === FETCH_FAILED;
    var isFailedNetwork = next === FETCH_FAILED_NETWORK;
    var isEnd = isFinished || isFailed || isFailedNetwork;
    return isStart && isEnd;
  };

  var isDataChanged = exports.isDataChanged = function isDataChanged(props, nextProps) {
    return props.fetchData !== nextProps.fetchData;
  };

  var isQueryStatusChanged = exports.isQueryStatusChanged = function isQueryStatusChanged(props, nextProps) {
    return props.fetchStatus !== nextProps.fetchStatus;
  };

  var isDocumentParamsChanged = exports.isDocumentParamsChanged = function isDocumentParamsChanged(props, nextProps) {
    var status = false;
    if (isTargetChanged(props, nextProps)) {
      status = true;
    } else if (props.keys !== nextProps.keys) {
      status = true;
    } else if (props.include !== nextProps.include) {
      status = true;
    }
    return status;
  };

  var isCollectionParamsChanged = exports.isCollectionParamsChanged = function isCollectionParamsChanged(props, nextProps) {
    var status = false;
    // filters was change, get data from server
    if (isTargetChanged(props, nextProps)) {
      status = true;
    } else if (!(0, _isEqual2.default)(props.query, nextProps.query)) {
      status = true;
    } else if (props.schemaName !== nextProps.schemaName) {
      status = true;
    } else if (props.limit !== nextProps.limit) {
      status = true;
    } else if (props.skip !== nextProps.skip) {
      status = true;
    } else if (props.enableCount !== nextProps.enableCount) {
      status = true;
    } else if (props.keys !== nextProps.keys) {
      status = true;
    } else if (props.include !== nextProps.include) {
      status = true;
    } else if (props.order !== nextProps.order) {
      status = true;
    }

    return status;
  };

  var removeLocalKeys = exports.removeLocalKeys = function removeLocalKeys(obj) {
    var data = Object.assign({}, obj);
    delete data['fetchData'];
    delete data['fetchError'];
    delete data['fetchStatus'];
    delete data['fetchInfo'];
    delete data['fetchActions'];
    return data;
  };
  var removeImutableKeys = exports.removeImutableKeys = function removeImutableKeys(obj) {
    var data = Object.assign({}, obj);
    delete data['updatedAt'];
    delete data['createdAt'];
    delete data['objectId'];
    return data;
  };

  var GetFileType = exports.GetFileType = function GetFileType(fileName) {
    var parts = fileName.split('.');
    var len = parts.length;
    if (len > 0) return parts[len - 1];

    return null;
  };

  var GetContentTypeByFileType = exports.GetContentTypeByFileType = function GetContentTypeByFileType(fileType) {
    switch (fileType) {
      case 'png':
      case 'x-png':
        return 'image/png';
      case 'jpe':
      case 'jpg':
      case 'jpeg':
      case 'jfif':
        return 'image/jpeg';
      case 'gif':
        return 'image/gif';
      case 'bm':
      case 'bmp':
        return 'image/bmp';
      case 'tiff':
        return 'image/tiff';
      case 'g3':
        return 'image/g3fax';
      case 'pdf':
        return 'application/pdf';
      case 'm1v':
      case 'm2v':
      case 'mpg':
        return 'video/mpeg';
      default:
        return 'text/plain';
    }
  };

  /* eslint no-restricted-syntax: "off" */
});