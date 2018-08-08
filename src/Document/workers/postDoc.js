import regeneratorRuntime from 'regenerator-runtime';
import { put } from 'redux-saga/effects';
import types from '../../types';
import {Logger, api, httpRequest, uploadFilesFromData} from '../../server'
import { setOnStore } from '../actions';
import { dig, removeImutableKeys } from '../../helpers';

const START = types.POST_START;
const FAILED = types.POST_FAILED;
const FAILED_NETWORK = types.POST_FAILED_NETWORK;
const FINISHED = types.POST_FINISHED;

export default function* postDoc(action) {
  const { targetName, schemaName, data, filesIncluded, fileValueHandler, dispatchId } = action.payload;
  const _dispatchId =  dispatchId || '';
  yield put(setOnStore({ targetName, status: START, error: null, loading: true, dispatchId: _dispatchId }));
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
    console.error('deleteDoc err', targetName, res.error);
    yield put(setOnStore({ targetName, status: errType, error: res, loading: false, dispatchId: _dispatchId }));
    Logger.onError('POST', action, errType)
  } else {
    const info = {
      timestamp: Date.now(),
      schemaName,
      objectId: res.data.objectId,
      data,
      resData: dig(res, 'data.results[0]')
    };
    yield put(
      setOnStore({
        targetName,
        status: FINISHED,
        info,
        error: null,
        loading: false,
        dispatchId: _dispatchId
      })
    );
    Logger.onSuccess('POST', action, FINISHED)
  }
}
/* eslint no-unused-vars: "off" */
