import { put } from 'redux-saga/effects';
import { httpRequest } from '../../../server/apiSagaWrapper';
import types from '../../../types';
import api from '../../../server/api';
import { setCollectionStatus } from '../../actions/collections';

const START = types.UPDATE_DOCUMENT_FROM_COLLECTION_START;
const FAILED = types.UPDATE_DOCUMENT_FROM_COLLECTION_FAILED;
const FINISHED = types.UPDATE_DOCUMENT_FROM_COLLECTION_FINISHED;

export default function* updateDocumentFromCollection(action) {
  const { collectionName, objectId, data } = action;
  const targetName = action.targetName || action.collectionName;
  yield put(setCollectionStatus(targetName, START));
  const res = yield* httpRequest(
    api.updateObject,
    collectionName,
    objectId,
    data,
  );
  if (res.error) {
    yield put(setCollectionStatus(targetName, FAILED));
    console.error('deleteObject err', collectionName, objectId, res.err);
  } else {
    yield put(setCollectionStatus(targetName, FINISHED));
  }
  // the update is only action for one of the all collection,
  // back to success mode
  yield put(setCollectionStatus(targetName, types.SUCCESS));
}
