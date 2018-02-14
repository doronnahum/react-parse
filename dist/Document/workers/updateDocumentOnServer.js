'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = updateDocumentOnServerWorker;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [updateDocumentOnServerWorker].map(regeneratorRuntime.mark);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../server/apiSagaWrapper');

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actions = require('../actions');

var _selectors = require('../selectors');

var UPDATE_START = _types2['default'].UPDATE_START;
var UPDATE_FAILED = _types2['default'].UPDATE_FAILED;
var UPDATE_FAILED_NETWORK = _types2['default'].UPDATE_FAILED_NETWORK;
var UPDATE_FINISHED = _types2['default'].UPDATE_FINISHED;

var START = UPDATE_START;
var FAILED = UPDATE_FAILED;
var FAILED_NETWORK = UPDATE_FAILED_NETWORK;
var FINISHED = UPDATE_FINISHED;

function updateDocumentOnServerWorker(action) {
  var className, objectId, keys, parseDataBeforeSave, objectToUpdate, imputableData, res, errType;
  return regeneratorRuntime.wrap(function updateDocumentOnServerWorker$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        className = action.className;
        objectId = action.objectId;
        keys = action.keys;
        parseDataBeforeSave = action.parseDataBeforeSave;

        if (objectId) {
          context$1$0.next = 6;
          break;
        }

        return context$1$0.abrupt('return');

      case 6:
        context$1$0.next = 8;
        return (0, _reduxSagaEffects.put)((0, _actions.setDocumentStatus)(objectId, START));

      case 8:
        objectToUpdate = null;
        context$1$0.next = 11;
        return (0, _reduxSagaEffects.select)(function (state) {
          return (0, _selectors.getImmutableDocumentData)(state, objectId);
        });

      case 11:
        imputableData = context$1$0.sent;

        if (imputableData) {
          context$1$0.next = 14;
          break;
        }

        return context$1$0.abrupt('return');

      case 14:
        // remove readonly keys
        objectToUpdate = imputableData.filter(function (key, i) {
          return ['createdAt', 'updatedAt', 'objectId', 'ACL'].indexOf(i) === -1;
        });
        // if action contain keys then update only this keys
        if (keys && keys.length > 0) {
          objectToUpdate = objectToUpdate.filter(function (key, i) {
            return [].concat(_toConsumableArray(keys)).indexOf(i) !== -1;
          });
        }
        // create new instance and convert to javascript
        objectToUpdate = Object.assign({}, objectToUpdate.toJS());
        if (parseDataBeforeSave) {
          objectToUpdate = parseDataBeforeSave(objectToUpdate);
        }
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].updateObject, className, objectId, objectToUpdate), 't0', 19);

      case 19:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 26;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
        context$1$0.next = 24;
        return (0, _reduxSagaEffects.put)((0, _actions.setDocumentStatus)(objectId, errType));

      case 24:
        context$1$0.next = 28;
        break;

      case 26:
        context$1$0.next = 28;
        return (0, _reduxSagaEffects.put)((0, _actions.setDocumentStatus)(objectId, FINISHED));

      case 28:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

// worker
module.exports = exports['default'];