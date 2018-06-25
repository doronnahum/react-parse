import types from '../types';

const {
  FETCH_DOCUMENT,
  SET_DOCUMENT,
  PUT_DOCUMENT,
  POST_DOCUMENT,
  DELETE_DOCUMENT,
  CLEAN_DOCUMENT,
  CLEAN_ALL_DOCUMENTS,
  UPDATE_DOC_FIELD
} = types;

/**
 * fetchData
 * @param {object} payload {targetName, schemaName, objectId, include, keys}
 * @param {string} payload.targetName
 * @param {string} payload.schemaName
 * @param {string} payload.objectId
 * @param {string} payload.include
 * @param {string} payload.keys,
 * @param {function} payload.dataHandler,
 * 
 */
export const fetchData = payload => ({
  type: FETCH_DOCUMENT,
  payload
});
/**
 * setOnStore
 * @param {*} payload {targetName, status, data, info, error}
 * @param {*} data
 */
export const setOnStore = payload => ({
  type: SET_DOCUMENT,
  payload
});
/**
 * updateField
 * @param {*} payload {targetName, key, value}
 */
export const updateField = payload => ({
  type: UPDATE_DOC_FIELD,
  payload
});

/**
 * putDoc
 * @param {*} payload {targetName, schemaName, objectId, data}
 */
export const putDoc = payload => ({
  type: PUT_DOCUMENT,
  payload
});
/**
 * postDoc
 * @param {*} payload {targetName, schemaName, data}
 */
export const postDoc = payload => ({
  type: POST_DOCUMENT,
  payload
});
/**
 * deleteDoc
 * @param {*} payload {targetName, schemaName,objectId}
 */
export const deleteDoc = payload => ({
  type: DELETE_DOCUMENT,
  payload
});

/**
 * cleanData
 * @param {*} payload {targetName}
 */
export const cleanData = payload => ({
  type: CLEAN_DOCUMENT,
  payload
});
export const clearDocuments = () => ({
  type: CLEAN_ALL_DOCUMENTS
});
export const cleanDocuments = () => ({
  type: CLEAN_ALL_DOCUMENTS
});
