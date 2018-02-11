'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
var createUniqueId = function createUniqueId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x100).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};
exports.createUniqueId = createUniqueId;
var isDocumentLoading = function isDocumentLoading(queryStatus) {
  if (!queryStatus) return false;
  if (queryStatus === LOADING) return true;
  if (queryStatus === UPDATE_DOCUMENT_START) return true;
  if (queryStatus === DELETE_DOCUMENT_START) return true;
  if (queryStatus === CREATE_DOCUMENT_START) return true;
  return false;
};
exports.isDocumentLoading = isDocumentLoading;
var isCollectionLoading = function isCollectionLoading(queryStatus) {
  if (!queryStatus) return false;
  if (queryStatus === LOADING) return true;
  if (queryStatus === DELETE_DOCUMENT_FROM_COLLECTION_START) return true;
  if (queryStatus === UPDATE_DOCUMENT_FROM_COLLECTION_START) return true;
  return false;
};
exports.isCollectionLoading = isCollectionLoading;
var isCollectionError = function isCollectionError(queryStatus) {
  if (!queryStatus) return false;
  if (queryStatus === ERROR) return true;
  if (queryStatus === NETWORK_ERROR) return true;
  return false;
};

exports.isCollectionError = isCollectionError;
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