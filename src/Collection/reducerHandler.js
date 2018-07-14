import types from '../types';

const { Map, List } = require('immutable');

const { SET_COLLECTION, CLEAN_COLLECTION, CLEAN_ALL_COLLECTIONS } = types;
// This is not a reducer, return null if it is not a relevant action.

export default function reducerHandler(state, action) {
  const { payload } = action;
  const { targetName, status, data, info, error, loading, dispatchId } = payload || {};
  switch (action.type) {
    case SET_COLLECTION: {
      const collection = state.collections.get(targetName);
      let nextState = state;
      if (!collection) {
        nextState = nextState.setIn(['collections', targetName], Map());
      }
      if ('status' in payload) {
        nextState = nextState.setIn(
          ['collections', targetName, 'status'],
          status
        );
      }
      if ('data' in payload) {
        nextState = nextState.setIn(
          ['collections', targetName, 'data'],
          List(data)
        );
      }
      if ('info' in payload) {
        nextState = nextState.setIn(['collections', targetName, 'info'], info);
      }
      if ('error' in payload) {
        nextState = nextState.setIn(
          ['collections', targetName, 'error'],
          error
        );
      }
      if ('loading' in payload) {
        nextState = nextState.setIn(['collections', targetName, 'loading'], loading);
      }
      if ('dispatchId' in payload) {
        nextState = nextState.setIn(['collections', targetName, 'dispatchId'], dispatchId);
      }
      return nextState;
    }
    case CLEAN_COLLECTION: {
      const collections = state.collections.delete(targetName);
      return state.set('collections', collections);
    }
    case CLEAN_ALL_COLLECTIONS: {
      return state.set('collections', Map());
    }
    default:
      return null;
  }
}
