var regeneratorRuntime = require("regenerator-runtime");

import { put } from 'redux-saga/effects';
import { httpRequest } from '../../server/apiSagaWrapper';
import types from '../../types';
import api from '../../server/api';
import { setCollectionStatus as setStatus } from '../actions';

const START = types.DELETE_START;
const FAILED = types.DELETE_FAILED;
const FAILED_NETWORK = types.DELETE_FAILED_NETWORK;
const FINISHED = types.DELETE_FINISHED;

export default function* deleteDocumentFromCollection(action) {
  const { collectionName, objectId } = action;
  const targetName = action.targetName || action.collectionName;
  yield put(setStatus(targetName, START));
  const res = yield* httpRequest(api.deleteObject, collectionName, objectId);
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    yield put(setStatus(targetName, errType));
    console.error('deleteObject err', collectionName, objectId, res.err);
  } else {
    yield put(setStatus(targetName, FINISHED));
  }
}
