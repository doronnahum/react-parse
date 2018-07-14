// Common
import 'babel-polyfill';
import api from './server/api';
import httpRequest from './server/httpWrapper';
import constants from './types';
import * as helpers from './helpers';
// Components
import FetchCollection from './Collection';
import FetchDocument from './Document';
import FetchCloudCode from './CloudCode';
import ShowLoader from './Loader';
// Parse
import parseReducer from './reducer';
import parseWatcher from './saga';
// Selectors
import {cloudCodeSelectors, collectionSelectors, documentSelectors} from './selectors';
// Actions
import * as _collectionActions from './Collection/collectionActions'
import * as _documentActions from './Document/documentActions'
import * as _cloudCodeActions from './CloudCode/cloudCodeActions'
// Logger
import {setLoggerHandlers} from './server/Logger'
const config = api;

const selectors = {
  selectCollections: collectionSelectors.getCollections,
  selectCollection: collectionSelectors.getCollection,
  selectCollectionData: collectionSelectors.getData,
  selectCollectionLoading: collectionSelectors.getLoading,
  selectCollectionInfo: collectionSelectors.getInfo,
  selectCollectionStatus: collectionSelectors.getStatus,
  selectCollectionCount: collectionSelectors.getCount,
  selectCollectionError: collectionSelectors.getError,
  selectCollectionDispatchId: collectionSelectors.getDispatchId,

  selectDocuments: documentSelectors.getDocuments,
  selectDocument: documentSelectors.getDocument,
  selectDocumentData: documentSelectors.getData,
  selectDocumentLoading: documentSelectors.getLoading,
  selectDocumentInfo: documentSelectors.getInfo,
  selectDocumentStatus: documentSelectors.getStatus,
  selectDocumentError: documentSelectors.getError,
  selectDocumentDispatchId: documentSelectors.getDispatchId,

  selectCloudCodes: cloudCodeSelectors.getCloudCodes,
  selectCloudCode: cloudCodeSelectors.getCloudCode,
  selectCloudCodeData: cloudCodeSelectors.getData,
  selectCloudCodeLoading: cloudCodeSelectors.getLoading,
  selectCloudCodeInfo: cloudCodeSelectors.getInfo,
  selectCloudCodeStatus: cloudCodeSelectors.getStatus,
  selectCloudCodeError: cloudCodeSelectors.getError,
  selectCloudCodeDispatchId: cloudCodeSelectors.getDispatchId,
}

const collectionActions ={
  fetchData: _collectionActions.fetchData,
  cleanCollections: _collectionActions.cleanCollections,
  cleanData: _collectionActions.cleanData,
  deleteDoc: _collectionActions.deleteDoc,
  putDoc: _collectionActions.putDoc,
  refreshCollection: _collectionActions.refreshCollection,
  postDoc: _collectionActions.postDoc,
}
const documentActions ={
  fetchData: _documentActions.fetchData,
  cleanDocuments: _documentActions.cleanDocuments,
  cleanData: _documentActions.cleanData,
  deleteDoc: _documentActions.deleteDoc,
  putDoc: _documentActions.putDoc,
  postDoc: _documentActions.postDoc,
  updateField: _documentActions.updateField,
}
const cloudCodeActions ={
  fetchData: _cloudCodeActions.fetchData,
  cleanCloudsCode: _cloudCodeActions.cleanCloudsCode,
  cleanData: _cloudCodeActions.cleanData,
}
let dispatch = null;
export const setReactParseDispatch = _dispatch => {
  dispatch = _dispatch;
};
const actions = {
  collectionActions,
  cloudCodeActions,
  documentActions
}

export {
  dispatch,
  config,
  api,
  httpRequest,
  constants,
  helpers,
  // Logger
  setLoggerHandlers,
  // Components
  FetchCollection,
  FetchDocument,
  FetchCloudCode,
  ShowLoader,
  // Parse
  parseWatcher,
  parseReducer,
  // Selectors
  selectors,
  cloudCodeSelectors,
  collectionSelectors,
  documentSelectors,
  // Actions
  actions,
  collectionActions,
  cloudCodeActions,
  documentActions
};