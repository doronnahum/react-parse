import { put } from 'redux-saga/effects';
import { httpRequest } from '../../../server/apiSagaWrapper';
import types from '../../../types';
import api from '../../../server/api';
import { setCollectionStatus } from '../../actions/collections';

const START = types.DELETE_DOCUMENT_FROM_COLLECTION_START;
const FAILED = types.DELETE_DOCUMENT_FROM_COLLECTION_START;
const FINISHED = types.DELETE_DOCUMENT_FROM_COLLECTION_START;

export default function* deleteDocumentFromCollection(action) {
  const { collectionName, objectId } = action;
  const targetName = action.targetName || action.collectionName;
  yield put(setCollectionStatus(targetName, START));
  const res = yield* httpRequest(api.deleteObject, collectionName, objectId);
  if (res.error) {
    yield put(setCollectionStatus(targetName, FAILED));
    console.error('deleteObject err', collectionName, objectId, res.err);
  } else {
    yield put(setCollectionStatus(targetName, FINISHED));
  }
  // the delete is only action for one of the all collection,
  // back to success mode
  yield put(setCollectionStatus(targetName, types.SUCCESS));
}
