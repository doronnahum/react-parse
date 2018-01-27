import { put } from 'redux-saga/effects';
import { httpRequest } from '../../../server/apiSagaWrapper';
import types from '../../../types';
import api from '../../../server/api';
import { setDocumentStatus } from '../../actions/documents';

export default function* getDocument(action) {
  const { className, objectId, include } = action;
  yield put(setDocumentStatus(objectId, types.LOADING));
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
    const errType =
      res.message === 'Network Error' ? types.NETWORK_ERROR : types.ERROR;
    console.error('get document err', objectId, res.error);
    yield put(setDocumentStatus(objectId, errType));
  } else {
    const data = res.data.results ? res.data.results : []; // extricate data from server response
    const queryStatus =
      data.length > 0 ? types.SUCCESS : types.SUCCESS_WITH_ZERO_RESULTS;
    yield put({
      type: types.SET_DOCUMENTS_PARAMETERS,
      objectId,
      data: data[0],
      status: queryStatus,
      info: {
        timestamp: Date.now(),
      },
    });
  }
}
// worker
