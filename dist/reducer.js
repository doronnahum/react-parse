'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = parseReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

var _InitialState = require('./InitialState');

var _InitialState2 = _interopRequireDefault(_InitialState);

var initialState = new _InitialState2['default']();

var _require = require('immutable');

var Map = _require.Map;
var List = _require.List;
var getDataFromState = function getDataFromState(state, target) {
  if (!target) {
    return state.market;
  }
  return state.market[target];
};
exports.getDataFromState = getDataFromState;

function parseReducer(state, action) {
  if (state === undefined) state = initialState;

  if (!(state instanceof _InitialState2['default'])) return initialState.merge(state);
  switch (action.type) {
    // Collection
    case _types2['default'].CLEAR_COLLECTIONS:
      {
        return state.set('collections', Map());
      }
    case _types2['default'].SET_COLLECTION:
      {
        var targetName = action.targetName;
        var dataToSet = action.dataToSet;
        var _status = dataToSet.status;
        var data = dataToSet.data;
        var info = dataToSet.info;

        var collection = state.collections.get(targetName);
        var nextState = state;
        if (!collection) {
          nextState = nextState.setIn(['collections', targetName], Map());
        }
        if (_status) {
          nextState = nextState.setIn(['collections', targetName, 'status'], _status);
        }
        if (data) {
          nextState = nextState.setIn(['collections', targetName, 'data'], List(data));
        }
        if (info) {
          nextState = nextState.setIn(['collections', targetName, 'info'], info);
        }
        return nextState;
      }
    case _types2['default'].CLEAR_COLLECTION:
      {
        var targetName = action.targetName;

        var collectionState = state.collections.get(targetName);
        if (!collectionState) return state;
        return state.setIn(['collections', action.targetName], null);
      }
    // Document
    case _types2['default'].CLEAR_DOCUMENTS:
      {
        return state.set('documents', Map());
      }
    case _types2['default'].SET_SET_DOCUMENT_STATUS:
      {
        var objectId = action.objectId;
        var _status2 = action.status;

        var _document = state.documents.get(objectId);
        var nextState = state;
        if (!_document) {
          nextState = nextState.setIn(['documents', objectId], Map());
        }
        return nextState.setIn(['documents', action.objectId, 'status'], _status2);
      }
    case _types2['default'].SET_DOCUMENT:
      {
        var objectId = action.objectId;
        var data = action.data;

        return state.setIn(['documents', objectId, 'data'], Map(data));
      }
    case _types2['default'].SET_DOCUMENTS_PARAMETERS:
      {
        var objectId = action.objectId;
        var data = action.data;
        var _status3 = action.status;
        var info = action.info;

        return state.setIn(['documents', objectId, 'status'], _status3).setIn(['documents', objectId, 'data'], Map(data)).setIn(['documents', objectId, 'info'], info);
      }
    case _types2['default'].REMOVE_DOCUMENT:
      {
        var objectId = action.objectId;

        return state.setIn(['documents', objectId], null);
      }
    case _types2['default'].UPDATE__DOCUMENT_ON_STORE:
      {
        var objectId = action.objectId;
        var key = action.key;
        var value = action.value;

        var nextState = state.setIn(['documents', objectId, 'data', key], value);
        return nextState;
      }
    // New Document
    case _types2['default'].CREATE_NEW_DOCUMENT:
      {
        var uniqueId = action.uniqueId;
        var defaultValues = action.defaultValues;

        return state.setIn(['newDocuments', uniqueId], Map({
          data: Map(defaultValues),
          status: null,
          objectId: null
        }));
      }
    case _types2['default'].CLEAR_NEW_DOCUMENT:
      {
        return state.setIn(['newDocuments', action.uniqueId], null);
      }
    case _types2['default'].REMOVE_NEW_DOCUMENT:
      {
        return state.setIn(['newDocuments', action.uniqueId], null);
      }
    case _types2['default'].UPDATE_NEW_DOCUMENT:
      {
        var uniqueId = action.uniqueId;
        var key = action.key;
        var value = action.value;

        return state.setIn(['newDocuments', uniqueId, 'data', key], value);
      }
    case _types2['default'].SET_NEW_DOCUMENT_STATUS:
      {
        var uniqueId = action.uniqueId;
        var _status4 = action.status;
        var objectId = action.objectId;
        var data = action.data;

        return state.setIn(['newDocuments', uniqueId], Map({
          data: Map(data),
          status: _status4,
          objectId: objectId
        }));
      }
    // Cloud code
    case _types2['default'].CLEAR_ALL_CLOUD_CODES:
      {
        return state.set('cloudCodes', Map());
      }

    case _types2['default'].SET_CLOUD_CODE_REQUEST_STATUS:
      {
        var targetName = action.targetName;
        var _status5 = action.status;

        var cloudCode = state.cloudCodes.get(targetName);
        var nextState = state;
        if (!cloudCode) {
          nextState = nextState.setIn(['cloudCodes', targetName], Map());
        }
        nextState = nextState.setIn(['cloudCodes', targetName, 'status'], _status5);
        return nextState;
      }
    case _types2['default'].SET_CLOUD_CODE_PARAMETERS:
      {
        var targetName = action.targetName;
        var _status6 = action.status;
        var data = action.data;
        var info = action.info;

        var nextState = state.setIn(['cloudCodes', targetName, 'status'], _status6).setIn(['cloudCodes', targetName, 'data'], List(data)).setIn(['cloudCodes', targetName, 'info'], info);
        return nextState;
      }
    case _types2['default'].REMOVE_CLOUD_CODE:
      {
        return state.setIn(['cloudCodes', action.targetName], null);
      }
    default:
      return state;
  }
}