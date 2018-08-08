import regeneratorRuntime from 'regenerator-runtime';
import { put } from 'redux-saga/effects';
import types from '../../types';
import {Logger, api, httpRequest, uploadFilesFromData} from '../../server'
import { setOnStore } from '../actions';
import { dig, removeImutableKeys } from '../../helpers';

const START = types.PUT_START;
const FAILED = types.PUT_FAILED;
const FAILED_NETWORK = types.PUT_FAILED_NETWORK;
const FINISHED = types.PUT_FINISHED;

export default function* putDoc(action) {
  const { targetName, schemaName, data, objectId, filesIncluded, fileValueHandler, dispatchId } = action.payload;
  const target = targetName || objectId;
  const _dispatchId =  dispatchId || '';
  yield put(setOnStore({ targetName: target, status: START, error: null, loading: true, dispatchId: _dispatchId }));
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
    console.error('putDoc err', targetName, res.error);
    yield put(setOnStore({ targetName: target, status: errType, error: res, loading: false, dispatchId: _dispatchId }));
    Logger.onError('PUT', action, errType)
  } else {
    const info = {
      timestamp: Date.now(),
      schemaName,
      objectId,
      data: dataToSend,
      resData: dig(res, 'data.results[0]')
    };
    yield put(
      setOnStore({
        targetName: target,
        status: FINISHED,
        info,
        error: null,
        loading: false,
        dispatchId: _dispatchId
      })
    );
    Logger.onSuccess('PUT', action, FINISHED)
  }
}
/* eslint no-unused-vars: "off" */
