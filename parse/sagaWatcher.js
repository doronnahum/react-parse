/**
 * # redux > market > sagaWatcher.js
 *
 * This file contain all market Watcher
 */

import {
  // put,
  // call,
  // select,
  // delay,
  // take,
  // takeLatest,
  // throttle,
  takeEvery,
} from 'redux-saga/effects';

// Import all the ActionTypes
import types from '../types';

// Import all workers from Workers Folder
// Collections
import getCollection from './sagaWorkers/collections/getCollection';
import deleteDocumentFromCollection from './sagaWorkers/collections/deleteDocumentFromCollection';
import updateDocumentFromCollection from './sagaWorkers/collections/updateDocumentFromCollection';
// Documents
import getDocument from './sagaWorkers/documents/getDocument';
import updateDocumentOnServer from './sagaWorkers/documents/updateDocumentOnServer';
import deleteDocumentFromServer from './sagaWorkers/documents/deleteDocumentFromServer';
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
  yield takeEvery(types.DELETE_DOCUMENT_FROM_SERVER, deleteDocumentFromServer);
  yield takeEvery(types.POST_NEW_DOCUMENT, postNewDocument);
  // Cloud code
  yield takeEvery(types.GET_CLOUD_CODE, getCloudCode);
}

export default parseWatcher;
