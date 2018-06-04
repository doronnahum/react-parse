import types from '../types';

const {
  FETCH_CLOUD_CODE,
  SET_CLOUD_CODE,
  CLEAN_CLOUD_CODE,
  CLEAN_ALL_CLOUD_CODE
} = types;

/**
 * fetchData
 * get data from parse server cloud code by function and find the data
 * on redux store by targetName
 * @param {object} payload {functionName, targetName, params, digToData}
 */
export const fetchData = payload => ({
  type: FETCH_CLOUD_CODE,
  payload
});

/**
 * setOnStore
 * set and update data on store.parse.clodeCodes by targetName
 * @param {object} payload {targetName, status, data, info, error}
 */
export const setOnStore = payload => ({
  type: SET_CLOUD_CODE,
  payload
});

/**
 * cleanData
 * clean data from store by target name
  * @param {object} payload
  * @param {string} payload.targetName
 */
export const cleanData = payload => ({
  type: CLEAN_CLOUD_CODE,
  payload
});

/**
 * cleanCloudCode
 * clean all data inside cloudCode
 */
export const cleanCloudCode = () => ({
  type: CLEAN_ALL_CLOUD_CODE
});
