/**
 * dig
 * @param {*} obj pass the object that hold the data
 * @param {*} target pass string to target: 'props.user[0].name'
 * @return return the target or null
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
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
      var _key = parts[0];
      digged = digged[_key];
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