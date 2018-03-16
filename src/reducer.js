import InitialState from './InitialState';
import cloudCodeHandler from './CloudCode/reducerHandler';
import collectionHandler from './Collection/reducerHandler';
import documentHandler from './Document/reducerHandler';

const initialState = new InitialState();

export default function parseReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) {
    return initialState.merge(state);
  }
  let nextState = null;
  nextState = cloudCodeHandler(state, action);
  if (nextState) return nextState;
  nextState = collectionHandler(state, action);
  if (nextState) return nextState;
  nextState = documentHandler(state, action);
  if (nextState) return nextState;
  return state;
}
