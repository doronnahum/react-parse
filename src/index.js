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
import collectionActions from './Collection/collectionActions'
import documentActions from './Document/documentActions'
import cloudCodeActions from './CloudCode/cloudCodeActions'
const config = api;

const selectors = {
  selectCollections: CollectionSelectors.getCollections,
  selectCollectionData: CollectionSelectors.getData,
  selectCollectionLoading: CollectionSelectors.getLoading,
  selectCollectionInfo: CollectionSelectors.getInfo,
  selectCollectionStatus: CollectionSelectors.getStatus,
  selectCollectionCount: CollectionSelectors.getCount,

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
let dispatch = null;
export const setReactParseDispatch = _dispatch => {
  dispatch = _dispatch;
};

export {
  dispatch,
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
  collectionActions,
  cloudCodeActions,
  documentActions
};