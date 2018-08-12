import regeneratorRuntime from 'regenerator-runtime';
import { put } from 'redux-saga/effects';
import types from '../../types';
import {Logger, api, httpRequest, uploadFilesFromData} from '../../server'
import { setOnStore, refreshCollection } from '../actions';
import { removeImutableKeys } from '../../helpers';

const START = types.PUT_START;
const FAILED = types.PUT_FAILED;
const FAILED_NETWORK = types.PUT_FAILED_NETWORK;
const FINISHED = types.PUT_FINISHED;

export default function* putDoc(action) {
  const { targetName, schemaName, objectId, data, autoRefresh, filesIncluded, fileValueHandler, dispatchId, boomerang } = action.payload;
  const target = targetName || schemaName;
  const _dispatchId =  dispatchId || '';
  yield put(setOnStore({ targetName: target, status: START, error: null, loading: true, dispatchId: _dispatchId, boomerang }));
  let dataToSend, dataFileError, res = null;
  try {
    dataToSend = filesIncluded ? yield* uploadFilesFromData(data, fileValueHandler) : data;
    dataToSend = removeImutableKeys(data)
  } catch (error) {
    res = error;
    res.error = true
    dataFileError = true
  }
  if(!dataFileError){
    res = yield* httpRequest(api.updateObject, schemaName, objectId, dataToSend);
  }
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('putDoc err', schemaName, objectId, res.err);
    yield put(setOnStore({ targetName: target, status: errType, error: res, loading: false, dispatchId: _dispatchId, boomerang }));
    Logger.onError('PUT', action, errType)
  } else {
    yield put(
      setOnStore({ targetName: target, status: FINISHED, error: null, loading: false, dispatchId: _dispatchId, boomerang })
    );
    Logger.onSuccess('PUT', action, FINISHED);
    if(autoRefresh){
      yield put(
        refreshCollection({ targetName: target })
      );
    }
  }
}
/* eslint no-unused-vars: "off" */
