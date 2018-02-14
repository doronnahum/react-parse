'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = postNewDocument;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [postNewDocument].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _serverApiSagaWrapper = require('../../server/apiSagaWrapper');

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _helpers = require('../../helpers');

var _actions = require('../actions');

var _selectors = require('../selectors');

var regeneratorRuntime = require("regenerator-runtime");

var CREATE_START = _types2['default'].CREATE_START;
var CREATE_FAILED = _types2['default'].CREATE_FAILED;
var CREATE_FAILED_NETWORK = _types2['default'].CREATE_FAILED_NETWORK;
var CREATE_FINISHED = _types2['default'].CREATE_FINISHED;

var START = CREATE_START;
var FAILED = CREATE_FAILED;
var FAILED_NETWORK = CREATE_FAILED_NETWORK;
var FINISHED = CREATE_FINISHED;

function postNewDocument(action) {
  var className, uniqueId, parseDataBeforeSave, refreshDataAfterSave, documentData, objectToUpdate, imputableData, res, errType;
  return regeneratorRuntime.wrap(function postNewDocument$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        className = action.className;
        uniqueId = action.uniqueId;
        parseDataBeforeSave = action.parseDataBeforeSave;
        refreshDataAfterSave = action.refreshDataAfterSave;

        if (uniqueId) {
          context$1$0.next = 6;
          break;
        }

        return context$1$0.abrupt('return');

      case 6:
        context$1$0.next = 8;
        return (0, _reduxSagaEffects.put)((0, _actions.setNewDocumentStatus)(uniqueId, START));

      case 8:
        documentData = undefined;
        objectToUpdate = null;
        context$1$0.next = 12;
        return (0, _reduxSagaEffects.select)(function (state) {
          return (0, _selectors.getImmutableNewDocumentData)(state, uniqueId);
        });

      case 12:
        imputableData = context$1$0.sent;

        if (imputableData) {
          context$1$0.next = 15;
          break;
        }

        return context$1$0.abrupt('return');

      case 15:
        // remove readonly keys
        objectToUpdate = imputableData.filter(function (key, i) {
          return ['createdAt', 'updatedAt', 'objectId', 'ACL'].indexOf(i) === -1;
        });
        // convert to javascript
        objectToUpdate = objectToUpdate.toJS();
        if (parseDataBeforeSave) {
          objectToUpdate = parseDataBeforeSave(objectToUpdate);
        }
        // Second - run http Request with httpRequest wrapper that handle error
        // const res = yield * httpRequest(api.query, 'DummyDataCategoriesConfig', query, null, null, null, null, include, order) // Make the request
        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].createObject, className, objectToUpdate), 't0', 19);

      case 19:
        res = context$1$0.t0;

        if (!res.error) {
          context$1$0.next = 26;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
        context$1$0.next = 24;
        return (0, _reduxSagaEffects.put)((0, _actions.setNewDocumentStatus)(uniqueId, errType));

      case 24:
        context$1$0.next = 31;
        break;

      case 26:
        if (!refreshDataAfterSave) {
          context$1$0.next = 29;
          break;
        }

        return context$1$0.delegateYield((0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].query, className, {
          objectId: res.data.objectId
        }), 't1', 28);

      case 28:
        documentData = context$1$0.t1;

      case 29:
        context$1$0.next = 31;
        return (0, _reduxSagaEffects.put)({
          type: _types2['default'].SET_NEW_DOCUMENT_STATUS,
          uniqueId: uniqueId,
          objectId: res.data.objectId,
          status: FINISHED,
          data: documentData ? (0, _helpers.dig)(documentData, 'data.results[0]') : objectToUpdate
        });

      case 31:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

// worker
module.exports = exports['default'];
// Make the request
// Check For error

// Set query status to error

// Set query status - oneOf['SUCCESS','SUCCESS_WITH_ZERO_RESULTS]