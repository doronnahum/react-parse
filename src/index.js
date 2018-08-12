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
// Actions Wrapped with dispatch
import * as _collectionActions from './Collection/collectionActions'
import * as _documentActions from './Document/documentActions'
import * as _cloudCodeActions from './CloudCode/cloudCodeActions'
// Pure actions
import * as pureCollectionActions from './Collection/actions'
import * as pureDocumentActions from './Document/actions'
import * as pureCloudCodeActions from './CloudCode/actions'
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
  selectCollectionBoomerang: collectionSelectors.getBoomerang,

  selectDocuments: documentSelectors.getDocuments,
  selectDocument: documentSelectors.getDocument,
  selectDocumentData: documentSelectors.getData,
  selectDocumentLoading: documentSelectors.getLoading,
  selectDocumentInfo: documentSelectors.getInfo,
  selectDocumentStatus: documentSelectors.getStatus,
  selectDocumentError: documentSelectors.getError,
  selectDocumentDispatchId: documentSelectors.getDispatchId,
  selectDocumentBoomerang: documentSelectors.getBoomerang,

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
  pure_fetchData: pureCollectionActions.fetchData, 
  cleanCollections: _collectionActions.cleanCollections,
  pure_cleanCollections: pureCollectionActions.cleanCollections,
  cleanData: _collectionActions.cleanData,
  pure_cleanData: pureCollectionActions.cleanData,
  deleteDoc: _collectionActions.deleteDoc,
  pure_deleteDoc: pureCollectionActions.deleteDoc,
  putDoc: _collectionActions.putDoc,
  pure_putDoc: pureCollectionActions.putDoc,
  refreshCollection: _collectionActions.refreshCollection,
  pure_refreshCollection: pureCollectionActions.refreshCollection,
  postDoc: _collectionActions.postDoc,
  pure_postDoc: pureCollectionActions.postDoc,
}
const documentActions ={
  fetchData: _documentActions.fetchData,
  pure_fetchData: pureDocumentActions.fetchData,
  cleanDocuments: _documentActions.cleanDocuments,
  pure_cleanDocuments: pureDocumentActions.cleanDocuments,
  cleanData: _documentActions.cleanData,
  pure_cleanData: pureDocumentActions.cleanData,
  deleteDoc: _documentActions.deleteDoc,
  pure_deleteDoc: pureDocumentActions.deleteDoc,
  putDoc: _documentActions.putDoc,
  pure_putDoc: pureDocumentActions.putDoc,
  postDoc: _documentActions.postDoc,
  pure_postDoc: pureDocumentActions.postDoc,
  updateField: _documentActions.updateField,
  pure_updateField: pureDocumentActions.updateField,
}
const cloudCodeActions ={
  fetchData: _cloudCodeActions.fetchData,
  pure_fetchData: pureCloudCodeActions.fetchData,
  cleanCloudsCode: _cloudCodeActions.cleanCloudsCode,
  pure_cleanCloudsCode: pureCloudCodeActions.cleanCloudsCode,
  cleanData: _cloudCodeActions.cleanData,
  pure_cleanData: pureCloudCodeActions.cleanData,
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