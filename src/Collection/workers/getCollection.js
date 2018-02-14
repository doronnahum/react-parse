import { put } from 'redux-saga/effects';
import { httpRequest } from '../../server/apiSagaWrapper';
import types from '../../types';
import api from '../../server/api';
import { setCollectionStatus  as setStatus , setCollection } from '../actions';
import { dig } from '../../helpers';

const START = types.GET_START;
const FAILED = types.GET_FAILED;
const FAILED_NETWORK = types.GET_FAILED_NETWORK;
const FINISHED = types.GET_FINISHED;

export default function* getCollection(action) {
  const { collectionName, perPage, page, enableCount, query } = action.payload;
  const targetName = action.payload.targetName || collectionName;
  yield put(setStatus(targetName, START));
  const skip = perPage && page && page - 1 > 0 ? (page - 1) * perPage : null;
  const res = yield* httpRequest(
    api.query,
    collectionName,
    query,
    perPage,
    skip,
    enableCount,
    action.keys,
    action.include,
    '-createdAt',
  );
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    yield put(setStatus(targetName, errType));
    console.error('query err: ', collectionName, res.error);
  } else {
    const data = dig(res, 'data.results');
    yield put(
      setCollection(targetName, {
        status: FINISHED,
        data,
        info: {
          collectionName,
          page,
          perPage,
          skip,
          count: res.data.count,
          timestamp: Date.now(),
          query,
        },
      }),
    );
  }
}
// worker
