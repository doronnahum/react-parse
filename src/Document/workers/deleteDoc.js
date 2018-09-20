import regeneratorRuntime from 'regenerator-runtime';
import { put } from 'redux-saga/effects';
import httpRequest from '../../server/httpWrapper';
import types from '../../types';
import api from '../../server/api';
import Logger from '../../server/Logger';
import { setOnStore } from '../actions'; 
const START = types.DELETE_START;
const FAILED = types.DELETE_FAILED;
const FAILED_NETWORK = types.DELETE_FAILED_NETWORK;
const FINISHED = types.DELETE_FINISHED;

export default function* deleteDoc(action) {
  const { targetName, schemaName, objectId, dispatchId, boomerang } = action.payload;
  const target = targetName || objectId;
  const _dispatchId =  dispatchId || '';
  yield put(setOnStore({ targetName: target, status: START, error: null, loading: true, dispatchId: _dispatchId, boomerang }));
  const res = yield* httpRequest(api.deleteObject, schemaName, objectId);
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('deleteDoc err', objectId, res.error);
    yield put(setOnStore({ targetName: target, status: errType, error: res, loading: false, dispatchId: _dispatchId, boomerang }));
    Logger.onError('DELETE' ,action, errType, res)
  } else {
    const info = {
      timestamp: Date.now(),
      schemaName,
      deleteDocId: objectId
    };
    yield put(
      setOnStore({
        targetName: target,
        status: FINISHED,
        info,
        error: null,
        loading: false,
        dispatchId: _dispatchId,
        boomerang
      })
    );
    Logger.onSuccess('DELETE', action, FINISHED, res)
  }
}
/* eslint no-unused-vars: "off" */
