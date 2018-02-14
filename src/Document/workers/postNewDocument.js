import { select, put } from 'redux-saga/effects';
import { httpRequest } from '../../server/apiSagaWrapper';
import types from '../../types';
import api from '../../server/api';
import { dig } from '../../helpers';
import { setNewDocumentStatus } from '../actions';
import { getImmutableNewDocumentData } from '../selectors';
const {
  CREATE_START,
  CREATE_FAILED,
  CREATE_FAILED_NETWORK,
  CREATE_FINISHED,
} = types;
const START = CREATE_START;
const FAILED = CREATE_FAILED;
const FAILED_NETWORK = CREATE_FAILED_NETWORK;
const FINISHED = CREATE_FINISHED;

export default function * postNewDocument(action) {
  const { className, uniqueId, parseDataBeforeSave, refreshDataAfterSave} = action;
  if (!uniqueId) {
    return
  }

  yield put(setNewDocumentStatus(uniqueId, START));
  let documentData;
  let objectToUpdate = null;
  const imputableData = yield select(state =>
    getImmutableNewDocumentData(state, uniqueId),
  );
  if (!imputableData) {return;}
  // remove readonly keys
  objectToUpdate = imputableData.filter(
    (key, i) =>
      ['createdAt', 'updatedAt', 'objectId', 'ACL'].indexOf(i) === -1,
  );
  // convert to javascript
  objectToUpdate = objectToUpdate.toJS();
  if (parseDataBeforeSave) {
    objectToUpdate = parseDataBeforeSave(objectToUpdate);
  }
  // Second - run http Request with httpRequest wrapper that handle error
  // const res = yield * httpRequest(api.query, 'DummyDataCategoriesConfig', query, null, null, null, null, include, order) // Make the request
  const res = yield* httpRequest(api.createObject, className, objectToUpdate); // Make the request
  // Check For error
  if (res.error) {
    // Set query status to error
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    yield put(setNewDocumentStatus(uniqueId, errType));
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
