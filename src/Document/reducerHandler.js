import types from '../types';

const { Map } = require('immutable');

const {
  SET_DOCUMENT,
  CLEAN_DOCUMENT,
  CLEAN_ALL_DOCUMENTS,
  UPDATE_DOC_FIELD
} = types;
// This is not a reducer, return null if it is not a relevant action.

export default function reducerHandler(state, action) {
  const { payload } = action;
  const { targetName, status, data, info, error, key, value, loading, dispatchId, boomerang } = payload || {};
  switch (action.type) {
    case SET_DOCUMENT: {
      const documents = state.documents.get(targetName);
      let nextState = state;
      if (!documents) {
        nextState = nextState.setIn(['documents', targetName], Map());
      }
      if ('status' in payload) {
        nextState = nextState.setIn(
          ['documents', targetName, 'status'],
          status
        );
      }
      if ('data' in payload) {
        nextState = nextState.setIn(
          ['documents', targetName, 'data'],
          Map(data)
        );
      }
      if ('info' in payload) {
        nextState = nextState.setIn(['documents', targetName, 'info'], info);
      }
      if ('error' in payload) {
        nextState = nextState.setIn(['documents', targetName, 'error'], error);
      }
      if ('loading' in payload) {
        nextState = nextState.setIn(['documents', targetName, 'loading'], loading);
      }
      if ('dispatchId' in payload) {
        nextState = nextState.setIn(['documents', targetName, 'dispatchId'], dispatchId);
      }
      if (boomerang) {
        nextState = nextState.setIn(['documents', targetName, 'boomerang'], boomerang);
      }
      return nextState;
    }
    case UPDATE_DOC_FIELD: {
      const documents = state.documents.get(targetName);
      let nextState = state;
      if (!documents) {
        nextState = nextState.setIn(['documents', targetName], Map());
      }
      nextState = nextState.setIn(
        ['documents', targetName, 'data', key],
        value
      );
      return nextState;
    }
    case CLEAN_DOCUMENT: {
      const documents = state.documents.delete(targetName);
      return state.set('documents', documents);
    }
    case CLEAN_ALL_DOCUMENTS: {
      return state.set('documents', Map());
    }
    default:
      return null;
  }
}
