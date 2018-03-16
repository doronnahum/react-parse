import { put } from 'redux-saga/effects';
import { httpRequest } from '../../server/apiSagaWrapper';
import types from '../../types';
import api from '../../server/api';
import { setOnStore } from '../actions';

const START = types.DELETE_START;
const FAILED = types.DELETE_FAILED;
const FAILED_NETWORK = types.DELETE_FAILED_NETWORK;
const FINISHED = types.DELETE_FINISHED;

export default function* deleteDoc(action) {
  const { targetName, schemaName, objectId } = action.payload;
  const target = targetName || objectId;
  yield put(setOnStore({ targetName: target, status: START, error: null }));
  const res = yield* httpRequest(api.deleteObject, schemaName, objectId);
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('deleteDoc err', objectId, res.error);
    yield put(setOnStore({ targetName: target, status: errType, error: res }));
  } else {
    const info = {
      timestamp: Date.now(),
      schemaName,
    };
    yield put(
      setOnStore({
        targetName: target,
        status: FINISHED,
        info,
        error: null,
      }),
    );
  }
}
// worker
