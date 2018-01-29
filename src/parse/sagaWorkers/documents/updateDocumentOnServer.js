import { select, put } from 'redux-saga/effects';
import { httpRequest } from '../../../server/apiSagaWrapper';
import types from '../../../types';
import api from '../../../server/api';
import { setDocumentStatus } from '../../actions/documents';
import { getImmutableDocumentData } from '../../selectors/documents';

const START = types.UPDATE_DOCUMENT_START;
const FAILED = types.UPDATE_DOCUMENT_FAILED;
const FINISHED = types.UPDATE_DOCUMENT_FINISHED;

export default function* updateDocumentOnServerWorker(action) {
  const { className, objectId, keys, parseDataBeforeSave } = action;
  let objectToUpdate = null;
  if (objectId) {
    const imputableData = yield select(state =>
      getImmutableDocumentData(state, objectId),
    );
    if (!imputableData) return;
    // remove readonly keys
    objectToUpdate = imputableData.filter(
      (key, i) =>
        ['createdAt', 'updatedAt', 'objectId', 'ACL'].indexOf(i) === -1,
    );
    // if action contain keys then update only this keys
    if (keys && keys.length > 0) {
      objectToUpdate = objectToUpdate.filter(
        (key, i) => [...keys].indexOf(i) !== -1,
      );
    }
    // create new instance and convert to javascript
    objectToUpdate = Object.assign({}, objectToUpdate.toJS());
  }
  if (parseDataBeforeSave) {
    objectToUpdate = parseDataBeforeSave(objectToUpdate);
  }
  yield put(setDocumentStatus(objectId, START));
  const res = yield* httpRequest(
    api.updateObject,
    className,
    objectId,
    objectToUpdate,
  );
  if (res.error) {
    yield put(setDocumentStatus(objectId, FAILED));
  } else {
    yield put(setDocumentStatus(objectId, FINISHED));
  }
}
// worker
