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
import collectionActions from './Collection/collectionActions'
import documentActions from './Document/documentActions'
import cloudCodeActions from './CloudCode/cloudCodeActions'
// Logger
import {setLoggerHandlers} from './server/Logger'
const config = api;

const selectors = {
  selectCollections: collectionSelectors.getCollections,
  selectCollectionData: collectionSelectors.getData,
  selectCollectionLoading: collectionSelectors.getLoading,
  selectCollectionInfo: collectionSelectors.getInfo,
  selectCollectionStatus: collectionSelectors.getStatus,
  selectCollectionCount: collectionSelectors.getCount,
  selectCollectionError: collectionSelectors.getError,

  selectDocuments: documentSelectors.getDocuments,
  selectDocumentData: documentSelectors.getData,
  selectDocumentLoading: documentSelectors.getLoading,
  selectDocumentInfo: documentSelectors.getInfo,
  selectDocumentStatus: documentSelectors.getStatus,
  selectDocumentError: documentSelectors.getError,

  selectCloudCodes: cloudCodeSelectors.getCloudCodes,
  selectCloudCodeData: cloudCodeSelectors.getData,
  selectCloudCodeLoading: cloudCodeSelectors.getLoading,
  selectCloudCodeInfo: cloudCodeSelectors.getInfo,
  selectCloudCodeStatus: cloudCodeSelectors.getStatus,
  selectCloudCodeError: cloudCodeSelectors.getError,
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