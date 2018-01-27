import types from '../../types';

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