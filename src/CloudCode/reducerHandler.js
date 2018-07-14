import types from '../types';

const { Map } = require('immutable');
// This is not a reducer, return null if it is not a relevant action.

export default function reducerHandler(state, action) {
  const { payload } = action;
  const { targetName, status, data, info, error, loading } = payload || {};
  switch (action.type) {
    // Cloud code
    case types.SET_CLOUD_CODE: {
      let nextState = state;
      if (!nextState.cloudCodes.get(targetName)) {
        nextState = nextState.setIn(['cloudCodes', targetName], Map());
      }
      if ('status' in payload) {
        nextState = nextState.setIn(
          ['cloudCodes', targetName, 'status'],
          status
        );
      }
      if ('data' in payload) {
        nextState = nextState.setIn(['cloudCodes', targetName, 'data'], data);
      }
      if ('info' in payload) {
        nextState = nextState.setIn(['cloudCodes', targetName, 'info'], info);
      }
      if ('error' in payload) {
        nextState = nextState.setIn(['cloudCodes', targetName, 'error'], error);
      }
      if ('loading' in payload) {
        nextState = nextState.setIn(['cloudCodes', targetName, 'loading'], loading);
      }
      if ('dispatchId' in payload) {
        nextState = nextState.setIn(['cloudCodes', targetName, 'dispatchId'], dispatchId);
      }
      return nextState;
    }
    case types.CLEAN_CLOUD_CODE: {
      const clouds = state.cloudCodes.delete(targetName);
      return state.set('cloudCodes', clouds);
    }
    case types.CLEAN_ALL_CLOUD_CODE: {
      return state.set('cloudCodes', Map());
    }
    default:
      return null;
  }
}
