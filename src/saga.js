import {takeEvery} from 'redux-saga/effects';
import types from '../types';
// Collections
import {
  getCollection,
  deleteDocumentFromCollection,
  updateDocumentFromCollection
} from './Collection/saga';
// Documents
import {
  getDocument,
  updateDocumentOnServer,
  deleteDocument,
  postNewDocument
} from './Document/saga';
// Cloud Codes
import getCloudCode from './CloudCode/saga';

// all market watchers
function* parseWatcher() {
  // Collections
  yield takeEvery(types.GET_COLLECTION, getCollection);
  yield takeEvery(
    types.DELETE_DOCUMENT_FROM_COLLECTION,
    deleteDocumentFromCollection,
  );
  yield takeEvery(
    types.UPDATE_DOCUMENT_FROM_COLLECTION,
    updateDocumentFromCollection,
  );
  // Documents
  yield takeEvery(types.GET_DOCUMENT, getDocument);
  yield takeEvery(types.UPDATE_DOCUMENT_ON_SERVER, updateDocumentOnServer);
  yield takeEvery(types.DELETE_DOCUMENT, deleteDocument);
  yield takeEvery(types.POST_NEW_DOCUMENT, postNewDocument);
  // Cloud code
  yield takeEvery(types.GET_CLOUD_CODE, getCloudCode);
}

export default parseWatcher;
