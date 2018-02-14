import types from '../types';

// Get data by clodCodeName
export const getCloudCode = (
  functionName,
  targetName,
  params,
  digToDataString = 'data.result',
) => ({
  type: types.GET_CLOUD_CODE,
  functionName,
  targetName,
  params,
  digToDataString,
});
export const setCloudCode = (targetName, data) => ({
  type: types.SET_CLOUD_CODE,
  targetName,
  data,
});
export const clearAllCloudCodes = () => ({
  type: types.CLEAR_ALL_CLOUD_CODES,
});
export const setCloudCodeRequestStatus = (targetName, status) => ({
  type: types.SET_CLOUD_CODE_REQUEST_STATUS,
  targetName,
  status,
});
export const removeCloudCode = targetName => ({
  type: types.REMOVE_CLOUD_CODE,
  targetName,
});
