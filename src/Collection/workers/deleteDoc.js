import regeneratorRuntime from 'regenerator-runtime';
import { put } from 'redux-saga/effects';
import httpRequest from '../../server/httpWrapper';
import types from '../../types';
import api from '../../server/api';
import Logger from '../../server/Logger';
import { setOnStore, refreshCollection } from '../actions';

const START = types.DELETE_START;
const FAILED = types.DELETE_FAILED;
const FAILED_NETWORK = types.DELETE_FAILED_NETWORK;
const FINISHED = types.DELETE_FINISHED;

export default function* deleteDoc(action) {
  const { targetName, schemaName, objectId, autoRefresh, dispatchId } = action.payload;
  const _dispatchId =  dispatchId || '';
  const target = targetName || schemaName;
  yield put(setOnStore({ targetName: target, status: START, error: null, loading: true, dispatchId: _dispatchId }));
  const res = yield* httpRequest(api.deleteObject, schemaName, objectId);
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('deleteDoc err', schemaName, objectId, res.err);
    yield put(setOnStore({ targetName: target, status: errType, error: res, loading: false, dispatchId: _dispatchId }));
    Logger.onError('DELETE', action, errType);
  } else {
    yield put(
      setOnStore({ targetName: target, status: FINISHED, error: null, loading: false, dispatchId: _dispatchId })
    );
    Logger.onSuccess('DELETE', action, FINISHED);
    if(autoRefresh){
      yield put(
        refreshCollection({ targetName: target })
      );
    }
  }
}
/* eslint no-unused-vars: "off" */
