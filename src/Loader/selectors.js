import { createSelector } from 'reselect';
import { Map } from 'immutable';
import some from 'lodash/some'
const loading = { 'loading': true };

const getState = state => state.parse;
// -- Get specific collections
export const showLoader = createSelector( getState, state => {
  let status = false
  if(state && state.collections){
    let toCheck = state.collections.toJS()
    status = some(toCheck, loading);
    if(!status){
      status = some(state.cloudCodes.toJS(), loading);
    }
    if(!status){
      status = some(state.documents.toJS(), loading);
    }
  }
  return status
});