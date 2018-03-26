import { createSelector } from 'reselect';
import { Map } from 'immutable';
import some from 'lodash/some'
const loading = { 'loading': true };

const getState = state => state.parse;
// -- Get specific collections
export const showLoader = createSelector( getState, state => {
  let status = false
  debugger
  if(state && state.collections){
    debugger
    let toCheck = state.collections.toJS()
    debugger
    status = some(toCheck, loading);
    debugger
    if(!status){
      debugger
      status = some(state.cloudCodes.toJS(), loading);
      debugger
    }
    if(!status){
      debugger
      status = some(state.documents.toJS(), loading);
      debugger
    }
    debugger
  }
  return status
});