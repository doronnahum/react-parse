import { put } from 'redux-saga/effects';
import { httpRequest } from '../../../server/apiSagaWrapper';
import types from '../../../types';
import api from '../../../server/api';
import { removeDocument, setDocumentStatus } from '../../actions/documents';

const START = types.DELETE_START;
const FAILED = types.DELETE_FAILED;
const FAILED_NETWORK = types.DELETE_FAILED_NETWORK;
const FINISHED = types.DELETE_FINISHED;

export default function* deleteDocumentFromServer(action) {
  const { className, objectId } = action;
  yield put(setDocumentStatus(objectId, START));
  const res = yield* httpRequest(api.deleteObject, className, objectId);
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    yield put(setDocumentStatus(objectId, errType));
  } else {
    yield put(removeDocument, objectId);
    yield put(setDocumentStatus(objectId, FINISHED));
  }
}