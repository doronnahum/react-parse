import types from '../types';

const {
  FETCH_COLLECTION,
  SET_COLLECTION,
  CLEAN_COLLECTION,
  CLEAN_ALL_COLLECTIONS,
  DELETE_COLLECTION_DOC,
  PUT_COLLECTION_DOC,
  POST_COLLECTION_DOC
} = types;

/**
 * fetchData
 * @param {obj} {schemaName, targetName, query, perPage, page, include, keys, enableCount}
 */
export const fetchData = payload => ({
  type: FETCH_COLLECTION,
  payload
});

/**
 * setOnStore
 * @param {*} payload {targetName, status, data, info, error}
 */
export const setOnStore = payload => ({
  type: SET_COLLECTION,
  payload
});

/**
 * deleteDocument
 * @param {*} payload {schemaName, targetName, objectId}
 */
export const deleteDoc = payload => ({
  type: DELETE_COLLECTION_DOC,
  payload
});

/**
 * putDoc
 * @param {*} payload {schemaName, targetName, objectId, data}
 */
export const putDoc = payload => ({
  type: PUT_COLLECTION_DOC,
  payload
});

/**
 * potDoc
 * @param {*} payload {schemaName, targetName, data}
 */
export const postDoc = payload => ({
  type: POST_COLLECTION_DOC,
  payload
});

/**
 * cleanCollection
 * @param {*} payload {targetName}
 */
export const cleanData = payload => ({
  type: CLEAN_ALL_COLLECTIONS,
  payload
});

export const cleanCollections = () => ({
  type: CLEAN_COLLECTION
});
