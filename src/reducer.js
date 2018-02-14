import types from './types';
import InitialState from './InitialState';

const initialState = new InitialState();
const { Map, List } = require('immutable');

export default function parseReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) {return initialState.merge(state);}
  switch (action.type) {
  // Collection
  case types.CLEAR_COLLECTIONS: {
    return state.set('collections', Map());
  }
  case types.SET_COLLECTION: {
    const { targetName, dataToSet } = action;
    const { status, data, info } = dataToSet;
    const collection = state.collections.get(targetName);
    let nextState = state;
    if (!collection) {
      nextState = nextState.setIn(['collections', targetName], Map());
    }
    if (status) {
      nextState = nextState.setIn(
        ['collections', targetName, 'status'],
        status,
      );
    }
    if (data) {
      nextState = nextState.setIn(
        ['collections', targetName, 'data'],
        List(data),
      );
    }
    if (info) {
      nextState = nextState.setIn(['collections', targetName, 'info'], info);
    }
    return nextState;
  }
  case types.CLEAR_COLLECTION: {
    const { targetName } = action;
    const collectionState = state.collections.get(targetName);
    if (!collectionState) {return state;}
    return state.setIn(['collections', action.targetName], null);
  }
  // Document
  case types.CLEAR_DOCUMENTS: {
    return state.set('documents', Map());
  }
  case types.SET_SET_DOCUMENT_STATUS: {
    const { objectId, status } = action;
    const document = state.documents.get(objectId);
    let nextState = state;
    if (!document) {
      nextState = nextState.setIn(['documents', objectId], Map());
    }
    return nextState.setIn(['documents', action.objectId, 'status'], status);
  }
  case types.SET_DOCUMENT: {
    const { objectId, data } = action;
    return state.setIn(['documents', objectId, 'data'], Map(data));
  }
  case types.SET_DOCUMENTS_PARAMETERS: {
    const { objectId, data, status, info } = action;
    return state
      .setIn(['documents', objectId, 'status'], status)
      .setIn(['documents', objectId, 'data'], Map(data))
      .setIn(['documents', objectId, 'info'], info);
  }
  case types.REMOVE_DOCUMENT: {
    const { objectId } = action;
    return state.setIn(['documents', objectId], null);
  }
  case types.UPDATE__DOCUMENT_ON_STORE: {
    const { objectId, key, value } = action;
    const nextState = state.setIn(
      ['documents', objectId, 'data', key],
      value,
    );
    return nextState;
  }
  // New Document
  case types.CREATE_NEW_DOCUMENT: {
    const { uniqueId, defaultValues } = action;
    return state.setIn(
      ['newDocuments', uniqueId],
      Map({
        data: Map(defaultValues),
        status: null,
        objectId: null,
      }),
    );
  }
  case types.CLEAR_NEW_DOCUMENT: {
    return state.setIn(['newDocuments', action.uniqueId], null);
  }
  case types.REMOVE_NEW_DOCUMENT: {
    return state.setIn(['newDocuments', action.uniqueId], null);
  }
  case types.UPDATE_NEW_DOCUMENT: {
    const { uniqueId, key, value } = action;
    return state.setIn(['newDocuments', uniqueId, 'data', key], value);
  }
  case types.SET_NEW_DOCUMENT_STATUS: {
    const { uniqueId, status, objectId, data } = action;
    return state.setIn(
      ['newDocuments', uniqueId],
      Map({
        data: Map(data),
        status,
        objectId,
      }),
    );
  }
  // Cloud code
  case types.CLEAR_ALL_CLOUD_CODES: {
    return state.set('cloudCodes', Map());
  }

  case types.SET_CLOUD_CODE_REQUEST_STATUS: {
    const { targetName, status } = action;
    const cloudCode = state.cloudCodes.get(targetName);
    let nextState = state;
    if (!cloudCode) {
      nextState = nextState.setIn(['cloudCodes', targetName], Map());
    }
    nextState = nextState.setIn(['cloudCodes', targetName, 'status'], status);
    return nextState;
  }
  case types.SET_CLOUD_CODE_PARAMETERS: {
    const { targetName, status, data, info } = action;
    const nextState = state
      .setIn(['cloudCodes', targetName, 'status'], status)
      .setIn(['cloudCodes', targetName, 'data'], List(data))
      .setIn(['cloudCodes', targetName, 'info'], info);
    return nextState;
  }
  case types.REMOVE_CLOUD_CODE: {
    return state.setIn(['cloudCodes', action.targetName], null);
  }
  default:
    return state;
  }
}
