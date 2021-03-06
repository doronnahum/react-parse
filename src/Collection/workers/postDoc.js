import regeneratorRuntime from 'regenerator-runtime';
import { put } from 'redux-saga/effects';
import types from '../../types';
import {Logger, api, httpRequest, uploadFilesFromData} from '../../server'
import { setOnStore, refreshCollection } from '../actions';
import { removeImutableKeys } from '../../helpers';

const START = types.POST_START;
const FAILED = types.POST_FAILED;
const FAILED_NETWORK = types.POST_FAILED_NETWORK;
const FINISHED = types.POST_FINISHED;

export default function* postDoc(action) {
  const { schemaName, data, targetName, autoRefresh, filesIncluded, fileValueHandler, dispatchId, boomerang } = action.payload;
  const _dispatchId =  dispatchId || '';
  const target = targetName || schemaName;
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
    res = yield* httpRequest(api.createObject, schemaName, dataToSend);
  }
  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('postDoc err', schemaName, res.err);
    Logger.onError('POST', action, errType, res)
    yield put(setOnStore({ targetName: target, status: errType, error: res, loading: false, dispatchId: _dispatchId, boomerang }));
  } else {
    yield put(
      setOnStore({ targetName: target, status: FINISHED, error: null, loading: false, dispatchId: _dispatchId, boomerang })
    );
    Logger.onSuccess('POST', action, FINISHED, res);
    if(autoRefresh){
      yield put(
        refreshCollection({ targetName: target })
      );
    }
  }
}
/* eslint no-unused-vars: "off" */
