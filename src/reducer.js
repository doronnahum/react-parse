import InitialState from './InitialState';
import cloudCodeHandler from './CloudCode/reducerHandler';
import collectionHandler from './Collection/reducerHandler';
import documentHandler from './Document/reducerHandler';
import {dispatch} from './index';

const initialState = new InitialState();
const CLEAN_ALL_PARSE_STATE = 'CLEAN_ALL_PARSE_STATE';

let clearStateActionType = null

export const cleanAllState = (payload) => {
  if(dispatch){
    dispatch({type: 'CLEAN_ALL_PARSE_STATE'})
  }else{
    console.warn('react-parse, missing dispatch, please use setReactParseDispatch')
  }
}

export const setClearStateActionType = function(type){
  clearStateActionType = type
};

export default function parseReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) {
    return initialState.merge(state);
  }
  if(
    (clearStateActionType && action.type === clearStateActionType) ||
    (action.type === CLEAN_ALL_PARSE_STATE)
  ){
    return initialState
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
