'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = postNewDocument;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [postNewDocument].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../../server/apiSagaWrapper');

var _types = require('../../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _helpers = require('../../../helpers');

var _actionsLocalDocuments = require('../../actions/localDocuments');

var _selectorsDocuments = require('../../selectors/documents');

var START = _types2['default'].CREATE_DOCUMENT_START;
var FAILED = _types2['default'].CREATE_DOCUMENT_FAILED;
var FINISHED = _types2['default'].CREATE_DOCUMENT_SUCCESS;

function postNewDocument(action) {
  var className, uniqueId, parseDataBeforeSave, getDataWithPostQueryStatusSuccessfully, documentData, objectToUpdate, imputableData, res;
  return regeneratorRuntime.wrap(function postNewDocument$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        className = action.className;
        uniqueId = action.uniqueId;
        parseDataBeforeSave = action.parseDataBeforeSave;
        getDataWithPostQueryStatusSuccessfully = action.getDataWithPostQueryStatusSuccessfully;
        documentData = undefined;
        objectToUpdate = null;

        if (!uniqueId) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 9;
        return (0, _reduxSagaEffects.select)(function (state) {
          return (0, _selectorsDocuments.getImmutableNewDocumentData)(state, uniqueId);
        });

      case 9:
        imputableData = context$1$0.sent;

        if (imputableData) {
          context$1$0.next = 12;
          break;
        }

        return context$1$0.abrupt('return');

      case 12:
        // remove readonly keys
        objectToUpdate = imputableData.filter(function (key, i) {
          return ['createdAt', 'updatedAt', 'objectId', 'ACL'].indexOf(i) === -1;
        });
        // convert to javascript
        objectToUpdate = objectToUpdate.toJS();

      case 14:
        if (parseDataBeforeSave) {
          objectToUpdate = parseDataBeforeSave(objectToUpdate);
        }

        context$1$0.next = 17;
        return (0, _reduxSagaEffects.put)((0, _actionsLocalDocuments.setNewDocumentStatus)(uniqueId, START));

      case 17:
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].createObject, className, objectToUpdate), 't0', 18);

      case 18:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 24;
          break;
        }

        context$1$0.next = 22;
        return (0, _reduxSagaEffects.put)((0, _actionsLocalDocuments.setNewDocumentStatus)(uniqueId, FAILED));

      case 22:
        context$1$0.next = 29;
        break;

      case 24:
        if (!getDataWithPostQueryStatusSuccessfully) {
          context$1$0.next = 27;
          break;
        }

        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].query, className, {
          objectId: res.data.objectId
        }), 't1', 26);

      case 26:
        documentData = context$1$0.t1;

      case 27:
        context$1$0.next = 29;
        return (0, _reduxSagaEffects.put)({
          type: _types2['default'].SET_NEW_DOCUMENT_STATUS,
          uniqueId: uniqueId,
          objectId: res.data.objectId,
          status: FINISHED,
          data: documentData ? (0, _helpers.dig)(documentData, 'data.results[0]') : objectToUpdate
        });

      case 29:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

// worker
module.exports = exports['default'];

// Second - run http Request with httpRequest wrapper that handle error
// const res = yield * httpRequest(api.query, 'DummyDataCategoriesConfig', query, null, null, null, null, include, order) // Make the request
// Make the request
// Check For error

// Set query status to error

// Set query status - oneOf['SUCCESS','SUCCESS_WITH_ZERO_RESULTS]