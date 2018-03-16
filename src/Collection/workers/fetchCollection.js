import regeneratorRuntime from "regenerator-runtime";
import { put } from 'redux-saga/effects';
import { httpRequest } from '../../server/apiSagaWrapper';
import types from '../../types';
import api from '../../server/api';
import { setOnStore } from '../actions';
import { dig } from '../../helpers';

const START = types.FETCH_START;
const FAILED = types.FETCH_FAILED;
const FAILED_NETWORK = types.FETCH_FAILED_NETWORK;
const FINISHED = types.FETCH_FINISHED;

export default function* fetchCollection(action) {
  const {
    targetName,
    schemaName,
    query,
    skip,
    page,
    enableCount,
    keys,
    include,
    order,
    limit,
  } = action.payload;
  const target = targetName || schemaName;
  yield put(setOnStore({ targetName: target, status: START, error: null }));
  const res = yield* httpRequest(
    api.query,
    schemaName,
    query,
    limit,
    skip,
    enableCount,
    keys,
    include,
    order,
  );
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    yield put(setOnStore({ targetName: target, status: errType, error: res }));
    console.error('fetchCollection err: ', schemaName, res.error);
  } else {
    const data = dig(res, 'data.results');
    const info = {
      schemaName,
      query,
      skip,
      page,
      enableCount,
      keys,
      include,
      order,
      limit,
      count: res.data.count,
      timestamp: Date.now(),
    };
    yield put(
      setOnStore({
        targetName: target,
        status: FINISHED,
        error: null,
        data,
        info,
      }),
    );
  }
}
// worker
