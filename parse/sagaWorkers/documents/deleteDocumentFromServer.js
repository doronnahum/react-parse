import { put } from 'redux-saga/effects';
import { httpRequest } from '../../../server/apiSagaWrapper';
import types from '../../../types';
import api from '../../../server/api';
import { removeDocument, setDocumentStatus } from '../../actions/documents';

const START = types.DELETE_DOCUMENT_START;
const FAILED = types.DELETE_DOCUMENT_FAILED;
const FINISHED = types.DELETE_DOCUMENT_FINISHED;

export default function* deleteDocumentFromServer(action) {
  const { className, objectId } = action;
  yield put(setDocumentStatus(objectId, START));
  const res = yield* httpRequest(api.deleteObject, className, objectId);
  if (res.error) {
    yield put(setDocumentStatus(objectId, FAILED));
  } else {
    yield put(removeDocument, objectId);
    yield put(setDocumentStatus(objectId, FINISHED));
  }
}