import regeneratorRuntime from 'regenerator-runtime';
import { put } from 'redux-saga/effects';
import httpRequest from '../../server/httpWrapper';
import types from '../../types';
import api from '../../server/api';
import Logger from '../../server/Logger';
import { setOnStore } from '../actions';
import { dig, removeImutableKeys } from '../../helpers';

const START = types.POST_START;
const FAILED = types.POST_FAILED;
const FAILED_NETWORK = types.POST_FAILED_NETWORK;
const FINISHED = types.POST_FINISHED;

export default function* putDoc(action) {
  const { targetName, schemaName, data, objectId } = action.payload;
  const target = targetName || objectId;
  yield put(setOnStore({ targetName: target, status: START, error: null, loading: true }));
  const dataToSend = removeImutableKeys(data)
  const res = yield* httpRequest(api.updateObject, schemaName, objectId, data);
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('putDoc err', targetName, res.error);
    yield put(setOnStore({ targetName: target, status: errType, error: res, loading: false }));
    Logger.onError('PUT', action, errType)
  } else {
    const info = {
      timestamp: Date.now(),
      schemaName,
      objectId,
      data: dataToSend,
      resData: dig(res, 'data.results[0]')
    };
    yield put(
      setOnStore({
        targetName: target,
        status: FINISHED,
        info,
        error: null,
        loading: false
      })
    );
    Logger.onSuccses('PUT', action, FINISHED)
  }
}
/* eslint no-unused-vars: "off" */
