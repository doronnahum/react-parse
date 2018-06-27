import regeneratorRuntime from 'regenerator-runtime';
import { put } from 'redux-saga/effects';
import httpRequest from '../../server/httpWrapper';
import types from '../../types';
import api from '../../server/api';
import Logger from '../../server/Logger';
import { setOnStore } from '../actions';
import { dig, addFiles } from '../../helpers';

const START = types.POST_START;
const FAILED = types.POST_FAILED;
const FAILED_NETWORK = types.POST_FAILED_NETWORK;
const FINISHED = types.POST_FINISHED;

export default function* postDoc(action) {
  const { targetName, schemaName, data } = action.payload;
  yield put(setOnStore({ targetName, status: START, error: null, loading: true }));
  const dataToSend = yield* addFiles(data);
  const res = yield* httpRequest(api.createObject, schemaName, dataToSend);
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('deleteDoc err', targetName, res.error);
    yield put(setOnStore({ targetName, status: errType, error: res, loading: false }));
    Logger.onError('POST', action, errType)
  } else {
    const info = {
      timestamp: Date.now(),
      schemaName,
      objectId: res.data.objectId,
      data,
      resData: dig(res, 'data.results[0]')
    };
    yield put(
      setOnStore({
        targetName,
        status: FINISHED,
        info,
        error: null,
        loading: false
      })
    );
    Logger.onSuccess('POST', action, FINISHED)
  }
}
/* eslint no-unused-vars: "off" */
