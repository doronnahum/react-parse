import regeneratorRuntime from 'regenerator-runtime';
import { put, select } from 'redux-saga/effects';
import types from '../../types';
import { fetchData } from '../actions';
import { getInfo } from '../selectors';

const START = types.FETCH_START;
const FAILED = types.FETCH_FAILED;
const FAILED_NETWORK = types.FETCH_FAILED_NETWORK;
const FINISHED = types.FETCH_FINISHED;

export default function* refreshCollection(action) {
  const { targetName, dispatchId } = action.payload;
  const _dispatchId =  dispatchId || '';
  const info = yield select(state => getInfo(state, targetName))
  if(info && info.schemaName){
    yield put(fetchData(Object.assign({},info, {targetName, dispatchId: _dispatchId})));
  }
}
/* eslint no-unused-vars: "off" */
