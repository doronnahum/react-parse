import regeneratorRuntime from 'regenerator-runtime';
import { takeEvery } from 'redux-saga/effects';
import types from './types';
import * as Collection from './Collection/saga';
import * as Document from './Document/saga';
import CloudCode from './CloudCode/saga';

const {
  FETCH_CLOUD_CODE,
  FETCH_COLLECTION,
  REFRSH_COLLECTION,
  DELETE_COLLECTION_DOC,
  PUT_COLLECTION_DOC,
  POST_COLLECTION_DOC,
  FETCH_DOCUMENT,
  PUT_DOCUMENT,
  DELETE_DOCUMENT,
  POST_DOCUMENT
} = types;
// Collections

// all market watchers
export default function* parseWatcher() {
  // Collections
  yield takeEvery(FETCH_COLLECTION, Collection.fetchCollection);
  yield takeEvery(REFRSH_COLLECTION, Collection.refreshCollection);
  yield takeEvery(DELETE_COLLECTION_DOC, Collection.deleteDoc);
  yield takeEvery(PUT_COLLECTION_DOC, Collection.putDoc);
  yield takeEvery(POST_COLLECTION_DOC, Collection.postDoc);
  // Documents
  yield takeEvery(FETCH_DOCUMENT, Document.fetchDoc);
  yield takeEvery(PUT_DOCUMENT, Document.putDoc);
  yield takeEvery(DELETE_DOCUMENT, Document.deleteDoc);
  yield takeEvery(POST_DOCUMENT, Document.postDoc);
  // Cloud code
  yield takeEvery(FETCH_CLOUD_CODE, CloudCode);
}
/* eslint no-unused-vars: "off" */
