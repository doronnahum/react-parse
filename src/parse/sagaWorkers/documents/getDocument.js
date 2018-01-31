import { put } from 'redux-saga/effects';
import { httpRequest } from '../../../server/apiSagaWrapper';
import types from '../../../types';
import api from '../../../server/api';
import { setDocumentStatus } from '../../actions/documents';
const {
  GET_START,
  GET_FAILED,
  GET_FAILED_NETWORK,
  GET_FINISHED,
} = types.statues
const START = GET_START;
const FAILED = GET_FAILED;
const FAILED_NETWORK = GET_FAILED_NETWORK;
const FINISHED = GET_FINISHED;

export default function* getDocument(action) {
  const { className, objectId, include } = action;
  yield put(setDocumentStatus(objectId, START));
  const res = yield* httpRequest(
    api.query,
    className,
    { objectId },
    null,
    null,
    null,
    null,
    include,
    null,
  );
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('get document err', objectId, res.error);
    yield put(setDocumentStatus(objectId, errType));
  } else {
    const data = res.data.results ? res.data.results : []; // extricate data from server response
    yield put({
      type: types.SET_DOCUMENTS_PARAMETERS,
      objectId,
      data: data[0],
      status: FINISHED,
      info: {
        timestamp: Date.now(),
      },
    });
  }
}
// worker
