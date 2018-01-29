'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = updateDocumentOnServerWorker;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [updateDocumentOnServerWorker].map(regeneratorRuntime.mark);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../../server/apiSagaWrapper');

var _types = require('../../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _actionsDocuments = require('../../actions/documents');

var _selectorsDocuments = require('../../selectors/documents');

var START = _types2['default'].UPDATE_DOCUMENT_START;
var FAILED = _types2['default'].UPDATE_DOCUMENT_FAILED;
var FINISHED = _types2['default'].UPDATE_DOCUMENT_FINISHED;

function updateDocumentOnServerWorker(action) {
  var className, objectId, keys, parseDataBeforeSave, objectToUpdate, imputableData, res;
  return regeneratorRuntime.wrap(function updateDocumentOnServerWorker$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        className = action.className;
        objectId = action.objectId;
        keys = action.keys;
        parseDataBeforeSave = action.parseDataBeforeSave;
        objectToUpdate = null;

        if (!objectId) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 8;
        return (0, _reduxSagaEffects.select)(function (state) {
          return (0, _selectorsDocuments.getImmutableDocumentData)(state, objectId);
        });

      case 8:
        imputableData = context$1$0.sent;

        if (imputableData) {
          context$1$0.next = 11;
          break;
        }

        return context$1$0.abrupt('return');

      case 11:
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

      case 14:
        if (parseDataBeforeSave) {
          objectToUpdate = parseDataBeforeSave(objectToUpdate);
        }
        context$1$0.next = 17;
        return (0, _reduxSagaEffects.put)((0, _actionsDocuments.setDocumentStatus)(objectId, START));

      case 17:
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].updateObject, className, objectId, objectToUpdate), 't0', 18);

      case 18:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 24;
          break;
        }

        context$1$0.next = 22;
        return (0, _reduxSagaEffects.put)((0, _actionsDocuments.setDocumentStatus)(objectId, FAILED));

      case 22:
        context$1$0.next = 26;
        break;

      case 24:
        context$1$0.next = 26;
        return (0, _reduxSagaEffects.put)((0, _actionsDocuments.setDocumentStatus)(objectId, FINISHED));

      case 26:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

// worker
module.exports = exports['default'];