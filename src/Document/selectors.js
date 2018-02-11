import { createSelector } from 'reselect';
import { Map } from 'immutable';

const MAP = Map();

// --- Documents ---/
const getObjectId = (state, objectId) => objectId;
const getUniqueId = (state, objectId) => objectId;

// -- Get all documents by objectId
export const getDocuments = state => state.parse.documents;
// -- Get specific document by objectId
const getImmutableDocument = createSelector(
  [getDocuments, getObjectId],
  (documentsByObjectId, objectId) => documentsByObjectId.get(objectId) || MAP,
);
export const getImmutableDocumentData = createSelector(
  getImmutableDocument,
  immutableDocument => immutableDocument.get('data'),
);
export const getData = createSelector(
  getImmutableDocument,
  immutableDocument =>
    immutableDocument.get('data') && immutableDocument.get('data').toJS(),
);
export const getStatus = createSelector(
  getImmutableDocument,
  immutableDocument => immutableDocument.get('status'),
);
// -- New documents
export const getNewDocuments = state => state.parse.newDocuments;
const getImmutableNewDocument = createSelector(
  [getNewDocuments, getUniqueId],
  (newDocuments, uniqueId) => newDocuments.get(uniqueId) || MAP,
);
export const getNewDocumentData = createSelector(
  getImmutableNewDocument,
  immutableDocument =>
    immutableDocument.get('data') && immutableDocument.get('data').toJS(),
);
export const getImmutableNewDocumentData = createSelector(
  getImmutableNewDocument,
  immutableDocument =>
    immutableDocument.get('data') && immutableDocument.get('data'),
);
export const getNewDocumentStatus = createSelector(
  getImmutableNewDocument,
  immutableDocument => immutableDocument.get('status'),
);
