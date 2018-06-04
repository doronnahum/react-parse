// Common
import 'babel-polyfill';
import api from './server/api';
import httpRequest from './server/httpWrapper';
import types from './types';
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
import {CloudCodeSelectors, CollectionSelectors, DocumentSelectors} from './selectors';
// Actions
import {CloudCodeActions, CollectionActions, DocumentActions} from './actions';
const config = api;

const actions = {
  fetchCloudCode: CloudCodeActions.fetchData,
  cleanCloudCode: CloudCodeActions.cleanData,
  cleanCloudCodse: CloudCodeActions.cleanCloudCode,
  fetchCollection: CollectionActions.fetchData,
  cleanCollection: CollectionActions.cleanData,
  putDocInCollection: CollectionActions.putDoc,
  postDocInCollection: CollectionActions.postDoc,
  deleteDocInCollection: CollectionActions.deleteDoc,
  cleanCollections: CollectionActions.cleanCollections,
  fetchDocument: DocumentActions.fetchData,
  putDocument: DocumentActions.putDoc,
  postDocument: DocumentActions.postDoc,
  deleteDocument: DocumentActions.deleteDoc,
  cleanDocument: DocumentActions.cleanData,
  cleanDocuments: DocumentActions.clearDocuments,
}
const selectors = {
  selectCollections: CollectionSelectors.getCollections,
  selectCollectionData: CollectionSelectors.getData,
  selectCollectionLoading: CollectionSelectors.getLoading,
  selectCollectionInfo: CollectionSelectors.getInfo,
  selectCollectionStatus: CollectionSelectors.getStatus,

  selectDocuments: DocumentSelectors.getDocuments,
  selectDocumentData: DocumentSelectors.getData,
  selectDocumentLoading: DocumentSelectors.getLoading,
  selectDocumentInfo: DocumentSelectors.getInfo,
  selectDocumentStatus: DocumentSelectors.getStatus,

  selectCloudCodes: CloudCodeSelectors.getCloudCodes,
  selectCloudCodeData: CloudCodeSelectors.getData,
  selectCloudCodeLoading: CloudCodeSelectors.getLoading,
  selectCloudCodeInfo: CloudCodeSelectors.getInfo,
  selectCloudCodeStatus: CloudCodeSelectors.getStatus,
}
export {
  config,
  api,
  httpRequest,
  types,
  helpers,
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
  // Actions
  actions
};
