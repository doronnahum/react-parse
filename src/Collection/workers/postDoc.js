import regeneratorRuntime from "regenerator-runtime";
import { put } from 'redux-saga/effects';
import { httpRequest } from '../../server/apiSagaWrapper';
import types from '../../types';
import api from '../../server/api';
import { setOnStore } from '../actions';

const START = types.POST_START;
const FAILED = types.POST_FAILED;
const FAILED_NETWORK = types.POST_FAILED_NETWORK;
const FINISHED = types.POST_FINISHED;

export default function* postDoc(action) {
  const { schemaName, data, targetName } = action.payload;
  const target = targetName || schemaName;
  yield put(setOnStore({ targetName: target, status: START, error: null }));
  const res = yield* httpRequest(api.createObject, schemaName, data);
  debugger
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    yield put(setOnStore({ targetName: target, status: errType, error: res }));
    console.error('postDoc err', schemaName, res.err);
  } else {
    yield put(
      setOnStore({ targetName: target, status: FINISHED, error: null }),
    );
  }
}
