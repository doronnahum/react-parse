import regeneratorRuntime from 'regenerator-runtime';
import { put } from 'redux-saga/effects';
import httpRequest from '../../server/httpWrapper';
import types from '../../types';
import api from '../../server/api';
import Logger from '../../server/Logger';
import { setOnStore, refreshCollection } from '../actions';
import { removeImutableKeys, addFiles } from '../../helpers';

const START = types.PUT_START;
const FAILED = types.PUT_FAILED;
const FAILED_NETWORK = types.PUT_FAILED_NETWORK;
const FINISHED = types.PUT_FINISHED;

export default function* putDoc(action) {
  const { targetName, schemaName, objectId, data, autoRefresh } = action.payload;
  const target = targetName || schemaName;
  yield put(setOnStore({ targetName: target, status: START, error: null, loading: true }));
  let dataToSend = yield* addFiles(data);
  dataToSend = removeImutableKeys(data)
  const res = yield* httpRequest(api.updateObject, schemaName, objectId, dataToSend);
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('putDoc err', schemaName, objectId, res.err);
    yield put(setOnStore({ targetName: target, status: errType, error: res, loading: false }));
    Logger.onError('PUT', action, errType)
  } else {
    yield put(
      setOnStore({ targetName: target, status: FINISHED, error: null, loading: false })
    );
    Logger.onSuccess('PUT', action, FINISHED);
    if(autoRefresh){
      yield put(
        refreshCollection({ targetName: target })
      );
    }
  }
}
/* eslint no-unused-vars: "off" */
