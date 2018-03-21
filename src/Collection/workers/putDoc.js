import regeneratorRuntime from 'regenerator-runtime';
import { put } from 'redux-saga/effects';
import httpRequest from '../../server/httpWrapper';
import types from '../../types';
import api from '../../server/api';
import Logger from '../../server/Logger';
import { setOnStore } from '../actions';

const START = types.PUT_START;
const FAILED = types.PUT_FAILED;
const FAILED_NETWORK = types.PUT_FAILED_NETWORK;
const FINISHED = types.PUT_FINISHED;

export default function* putDoc(action) {
  const { targetName, schemaName, objectId, data } = action.payload;
  const target = targetName || schemaName;
  yield put(setOnStore({ targetName: target, status: START, error: null }));
  const res = yield* httpRequest(api.updateObject, schemaName, objectId, data);
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('putDoc err', schemaName, objectId, res.err);
    Logger.onError(action, errType)
    yield put(setOnStore({ targetName: target, status: errType, error: res }));
  } else {
    yield put(
      setOnStore({ targetName: target, status: FINISHED, error: null })
    );
    Logger.onSuccses(action, FINISHED)
  }
}
/* eslint no-unused-vars: "off" */
