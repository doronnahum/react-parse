import { put } from 'redux-saga/effects';
import { httpRequest } from '../../server/apiSagaWrapper';
import types from '../../types';
import api from '../../server/api';
import { setOnStore } from '../actions';

const START = types.FETCH_START;
const FAILED = types.FETCH_FAILED;
const FAILED_NETWORK = types.FETCH_FAILED_NETWORK;
const FINISHED = types.FETCH_FINISHED;

export default function* fetchDoc(action) {
  const { targetName, schemaName, objectId, include, keys } = action.payload;
  const target = targetName || objectId;
  yield put(setOnStore({ targetName: target, status: START, error: null }));
  debugger
  const res = yield* httpRequest(
    api.getObjectById,
    schemaName,
    objectId,
    keys,
    include,
  );
  debugger
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('get document err', objectId, res.error);
    yield put(setOnStore({ targetName: target, status: errType, error: res }));
  } else {
    const info = {
      timestamp: Date.now(),
      keys,
      include,
      schemaName,
    };
    const { data } = res;
    yield put(
      setOnStore({
        targetName: target,
        status: FINISHED,
        data,
        info,
        error: null,
      }),
    );
  }
}
// worker
