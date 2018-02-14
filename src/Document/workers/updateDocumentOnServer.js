var regeneratorRuntime = require("regenerator-runtime");

import { select, put } from 'redux-saga/effects';
import { httpRequest } from '../../server/apiSagaWrapper';
import types from '../../types';
import api from '../../server/api';
import { setDocumentStatus } from '../actions';
import { getImmutableDocumentData } from '../selectors';
const {
  UPDATE_START,
  UPDATE_FAILED,
  UPDATE_FAILED_NETWORK,
  UPDATE_FINISHED,
} = types;
const START = UPDATE_START;
const FAILED = UPDATE_FAILED;
const FAILED_NETWORK = UPDATE_FAILED_NETWORK;
const FINISHED = UPDATE_FINISHED;

export default function*updateDocumentOnServerWorker(action) {
  const { className, objectId, keys, parseDataBeforeSave } = action;
  if (!objectId) {
    return
  }

  yield put(setDocumentStatus(objectId, START));
  let objectToUpdate = null;
  const imputableData = yield select(state =>
    getImmutableDocumentData(state, objectId),
  );
  if (!imputableData) {return;}
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
  if (parseDataBeforeSave) {
    objectToUpdate = parseDataBeforeSave(objectToUpdate);
  }
  const res = yield* httpRequest(
    api.updateObject,
    className,
    objectId,
    objectToUpdate,
  );
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    yield put(setDocumentStatus(objectId, errType));
  } else {
    yield put(setDocumentStatus(objectId, FINISHED));
  }
}
// worker
