import { put } from 'redux-saga/effects';
import { httpRequest } from '../../../server/apiSagaWrapper';
import types from '../../../types';
import api from '../../../server/api';
import { setCollectionStatus, setCollection } from '../../actions/collections';
import { dig } from '../../../helpers';

const {
  LOADING,
  SUCCESS_WITH_ZERO_RESULTS,
  ERROR,
  NETWORK_ERROR,
  SUCCESS,
} = types;

export default function* getCollection(action) {
  const { collectionName, perPage, page, enableCount, query } = action;
  const targetName = action.targetName || action.collectionName;
  yield put(setCollectionStatus(targetName, LOADING));
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
    const errType = res.message === 'Network Error' ? NETWORK_ERROR : ERROR;
    yield put(setCollectionStatus(targetName, errType));
    console.error('query err: ', collectionName, res.error);
  } else {
    const data = dig(res, 'data.results');
    const queryStatus = data.length > 0 ? SUCCESS : SUCCESS_WITH_ZERO_RESULTS;
    yield put(
      setCollection(targetName, {
        status: queryStatus,
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
