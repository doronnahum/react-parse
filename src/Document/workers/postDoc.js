import regeneratorRuntime from "regenerator-runtime";
import { put } from 'redux-saga/effects';
import { httpRequest } from '../../server/apiSagaWrapper';
import types from '../../types';
import api from '../../server/api';
import { setOnStore } from '../actions';
import { dig } from '../../helpers';

const START = types.POST_START;
const FAILED = types.POST_FAILED;
const FAILED_NETWORK = types.POST_FAILED_NETWORK;
const FINISHED = types.POST_FINISHED;

export default function* postDoc(action) {
  const { targetName, schemaName, data } = action.payload;
  yield put(setOnStore({ targetName, status: START, error: null }));
  const res = yield* httpRequest(api.createObject, schemaName, data);
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('deleteDoc err', targetName, res.error);
    yield put(setOnStore({ targetName, status: errType, error: res }));
  } else {
    const info = {
      timestamp: Date.now(),
      schemaName,
      objectId: res.data.objectId,
      data,
      resData: dig(res, 'data.results[0]'),
    };
    yield put(
      setOnStore({
        targetName,
        status: FINISHED,
        info,
        error: null,
      }),
    );
  }
}
// worker
