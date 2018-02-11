import {takeEvery} from 'redux-saga/effects';
import types from '../types';
// Collections
import getCollection from './Collection/saga/getCollection';
import deleteDocumentFromCollection from './Collection/saga/deleteDocumentFromCollection';
import updateDocumentFromCollection from './Collection/saga/updateDocumentFromCollection';
// Documents
import getDocument from './sagaWorkers/documents/getDocument';
import updateDocumentOnServer from './sagaWorkers/documents/updateDocumentOnServer';
import deleteDocument from './sagaWorkers/documents/deleteDocument';
// local Documents
import postNewDocument from './sagaWorkers/documents/postNewDocument';
// Cloud Codes
import getCloudCode from './sagaWorkers/cloudCodes/getCloudCode';

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
