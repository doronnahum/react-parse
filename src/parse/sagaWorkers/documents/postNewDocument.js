import { select, put } from 'redux-saga/effects';
import { httpRequest } from '../../../server/apiSagaWrapper';
import types from '../../../types';
import api from '../../../server/api';
import { dig } from '../../../helpers';
import { setNewDocumentStatus } from '../../actions/localDocuments';
import { getImmutableNewDocumentData } from '../../selectors/documents';

const START = types.CREATE_DOCUMENT_START;
const FAILED = types.CREATE_DOCUMENT_FAILED;
const FINISHED = types.CREATE_DOCUMENT_SUCCESS;

export default function* postNewDocument(action) {
  const {
    className,
    uniqueId,
    parseDataBeforeSave,
    refreshDataAfterSave,
  } = action;
  let documentData;
  let objectToUpdate = null;
  if (uniqueId) {
    const imputableData = yield select(state =>
      getImmutableNewDocumentData(state, uniqueId),
    );
    if (!imputableData) return;
    // remove readonly keys
    objectToUpdate = imputableData.filter(
      (key, i) =>
        ['createdAt', 'updatedAt', 'objectId', 'ACL'].indexOf(i) === -1,
    );
    // convert to javascript
    objectToUpdate = objectToUpdate.toJS();
  }
  if (parseDataBeforeSave) {
    objectToUpdate = parseDataBeforeSave(objectToUpdate);
  }

  yield put(setNewDocumentStatus(uniqueId, START));
  // Second - run http Request with httpRequest wrapper that handle error
  // const res = yield * httpRequest(api.query, 'DummyDataCategoriesConfig', query, null, null, null, null, include, order) // Make the request
  const res = yield* httpRequest(api.createObject, className, objectToUpdate); // Make the request
  // Check For error
  if (res.error) {
    // Set query status to error
    yield put(setNewDocumentStatus(uniqueId, FAILED));
  } else {
    if (refreshDataAfterSave) {
      documentData = yield* httpRequest(api.query, className, {
        objectId: res.data.objectId,
      });
    }
    // Set query status - oneOf['SUCCESS','SUCCESS_WITH_ZERO_RESULTS]
    yield put({
      type: types.SET_NEW_DOCUMENT_STATUS,
      uniqueId,
      objectId: res.data.objectId,
      status: FINISHED,
      data: documentData ? dig(documentData, 'data.results[0]') : objectToUpdate,
    });
  }
}
// worker
