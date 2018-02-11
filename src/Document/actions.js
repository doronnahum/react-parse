import types from '../../types';

export const getDocument = (className, objectId, include) => ({
  type: types.GET_DOCUMENT,
  className,
  objectId,
  include,
});
export const setDocument = (objectId, data) => ({
  type: types.SET_DOCUMENT,
  objectId,
  data,
});
export const clearDocuments = () => ({
  type: types.CLEAR_DOCUMENTS,
});
export const setDocumentStatus = (objectId, status) => ({
  type: types.SET_SET_DOCUMENT_STATUS,
  objectId,
  status,
});
export const updateDocumentOnStore = (objectId, key, value) => ({
  type: types.UPDATE__DOCUMENT_ON_STORE,
  objectId,
  key,
  value,
});
export const removeDocument = objectId => ({
  type: types.REMOVE_DOCUMENT,
  objectId,
});
export const updateDocumentOnServer = (
  className,
  objectId,
  keys,
  disabledAutoGetAfterSave,
  parseDataBeforeSave,
) => ({
  type: types.UPDATE_DOCUMENT_ON_SERVER,
  className,
  objectId,
  keys,
  disabledAutoGetAfterSave, // set true if you want that getDocument will not run after the update - not recommended
  parseDataBeforeSave, // pass function that ger object and return object with parse data
});
export const deleteDocument = (className, objectId) => ({
  type: types.DELETE_DOCUMENT,
  className,
  objectId,
});

// New documents
export const createNewDocument = (uniqueId, defaultValues) => ({
  type: types.CREATE_NEW_DOCUMENT,
  uniqueId,
  defaultValues,
});
export const updateNewDocument = (uniqueId, key, value) => ({
  type: types.UPDATE_NEW_DOCUMENT,
  uniqueId,
  key,
  value,
});
export const clearNewDocument = uniqueId => ({
  type: types.CLEAR_NEW_DOCUMENT,
  uniqueId,
});
export const removeNewDocument = uniqueId => ({
  type: types.REMOVE_NEW_DOCUMENT,
  uniqueId,
});
export const postNewDocument = (
  className,
  uniqueId,
  parseDataBeforeSave,
  addMemberPointerToDataOnPost,
  getDataWithPostQueryStatusSuccessfully,
) => ({
  type: types.POST_NEW_DOCUMENT,
  className,
  uniqueId,
  parseDataBeforeSave,
  addMemberPointerToDataOnPost,
  getDataWithPostQueryStatusSuccessfully,
});
export const setNewDocumentStatus = (uniqueId, status) => ({
  type: types.SET_NEW_DOCUMENT_STATUS,
  uniqueId,
  status,
});