import regeneratorRuntime from 'regenerator-runtime';
import { put } from 'redux-saga/effects';
import httpRequest from '../../server/httpWrapper';
import types from '../../types';
import api from '../../server/api';
import { setOnStore } from '../actions';
import Logger from '../../server/Logger';

const START = types.FETCH_START;
const FAILED = types.FETCH_FAILED;
const FAILED_NETWORK = types.FETCH_FAILED_NETWORK;
const FINISHED = types.FETCH_FINISHED;

export default function* fetchDoc(action) {
  const { targetName, schemaName, objectId, include, keys, dataHandler, dispatchId } = action.payload;
  const target = targetName || objectId;
  yield put(setOnStore({ targetName: target, status: START, error: null, loading: true, dispatchId }));
  const res = yield* httpRequest(
    api.getObjectById,
    schemaName,
    objectId,
    keys,
    include
  );
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('get document err', objectId, res.error);
    yield put(setOnStore({ targetName: target, status: errType, error: res, loading: false, dispatchId }));
    Logger.onError('GET', action, errType);
  } else {
    const info = {
      timestamp: Date.now(),
      keys,
      include,
      schemaName
    };
    const _data = res.data;
    const data = dataHandler ? dataHandler(_data) : _data;
    yield put(
      setOnStore({
        targetName: target,
        status: FINISHED,
        data,
        info,
        error: null,
        loading: false,
        dispatchId
      })
    );
    Logger.onSuccess('GET', action, FINISHED);
  }
}
/* eslint no-unused-vars: "off" */
