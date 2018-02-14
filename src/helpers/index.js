import consts from '../types';

const {
  LOADING,
  DELETE_DOCUMENT_START,
  UPDATE_DOCUMENT_START,
  CREATE_DOCUMENT_START,
  DELETE_DOCUMENT_FROM_COLLECTION_START,
  UPDATE_DOCUMENT_FROM_COLLECTION_START,
  ERROR,
  NETWORK_ERROR,
} = consts;
export const createUniqueId = function createUniqueId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x100)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}`;
};
export const isDocumentLoading = function isDocumentLoading(queryStatus) {
  if (!queryStatus) {return false;}
  if (queryStatus === LOADING) {return true;}
  if (queryStatus === UPDATE_DOCUMENT_START) {return true;}
  if (queryStatus === DELETE_DOCUMENT_START) {return true;}
  if (queryStatus === CREATE_DOCUMENT_START) {return true;}
  return false;
};
export const isCollectionLoading = function isCollectionLoading(queryStatus) {
  if (!queryStatus) {return false;}
  if (queryStatus === LOADING) {return true;}
  if (queryStatus === DELETE_DOCUMENT_FROM_COLLECTION_START) {return true;}
  if (queryStatus === UPDATE_DOCUMENT_FROM_COLLECTION_START) {return true;}
  return false;
};
export const isCollectionError = function isCollectionError(queryStatus) {
  if (!queryStatus) {return false;}
  if (queryStatus === ERROR) {return true;}
  if (queryStatus === NETWORK_ERROR) {return true;}
  return false;
};

/**
 * dig
 * @param {*} obj pass the object that hold the data
 * @param {*} target pass string to target: 'props.user[0].name'
 * @return return the target or null
 */
export const dig = function dig(obj, target) {
  const keys = target.split('.');
  let digged = obj;
  for (const key of keys) {
    const parts = key.split('[');
    const currentKey = parts[0];
    digged = digged[currentKey];
    if (typeof digged === 'undefined' || digged === null) {
      return digged;
    }
    if (parts[1]) {
      digged = digged[parts[1].replace(']', '')];
      if (typeof digged === 'undefined' || digged === null) {
        return undefined;
      }
    }
  }
  return digged;
};

export const GetPointerObject = (className, objectId) => ({
  __type: 'Pointer',
  className,
  objectId,
});
