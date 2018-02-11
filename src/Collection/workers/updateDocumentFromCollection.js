import { put } from 'redux-saga/effects';
import { httpRequest } from '../../../server/apiSagaWrapper';
import types from '../../../types';
import api from '../../../server/api';
import { setStatus as setStatus  } from '../../actions/collections';

const START = types.UPDATE_START;
const FAILED = types.UPDATE_FAILED;
const FAILED_NETWORK = types.UPDATE_FAILED_NETWORK;
const FINISHED = types.UPDATE_FINISHED;

export default function* updateDocumentFromCollection(action) {
  const { collectionName, objectId, data } = action;
  const targetName = action.targetName || action.collectionName;
  yield put(setStatus(targetName, START));
  const res = yield* httpRequest(
    api.updateObject,
    collectionName,
    objectId,
    data,
  );
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    yield put(setStatus(targetName, errType));
    console.error('deleteObject err', collectionName, objectId, res.err);
  } else {
    yield put(setStatus(targetName, FINISHED));
  }
}
