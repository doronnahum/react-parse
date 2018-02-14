import types from '../types';

// Collection
export const clearCollections = () => ({
  type: types.CLEAR_COLLECTIONS,
});
export const clearCollection = targetName => ({
  type: types.CLEAR_COLLECTION,
  targetName,
});
/**
 * getCollection
 * @param {obj} {collectionName, targetName, query, perPage, page, include, keys, enableCount}
 */
export const getCollection = payload => ({
  type: types.GET_COLLECTION,
  payload,
});
export const setCollection = (targetName, dataToSet) => ({
  type: types.SET_COLLECTION,
  targetName,
  dataToSet,
});
export const setCollectionStatus = (targetName, status) => setCollection(targetName, { status });
export const deleteDocumentFromCollection = (
  collectionName,
  targetName,
  objectId,
) => ({
  type: types.DELETE_DOCUMENT_FROM_COLLECTION,
  collectionName,
  targetName,
  objectId,
});
export const updateDocumentFromCollection = (
  collectionName,
  targetName,
  objectId,
  data,
) => ({
  type: types.UPDATE_DOCUMENT_FROM_COLLECTION,
  collectionName,
  targetName,
  objectId,
  data,
});
