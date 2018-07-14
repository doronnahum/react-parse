import regeneratorRuntime from 'regenerator-runtime';
import { put } from 'redux-saga/effects';
import types from '../../types';
import {Logger, api, httpRequest, uploadFilesFromData} from '../../server'
import { setOnStore, refreshCollection } from '../actions';

const START = types.POST_START;
const FAILED = types.POST_FAILED;
const FAILED_NETWORK = types.POST_FAILED_NETWORK;
const FINISHED = types.POST_FINISHED;

export default function* postDoc(action) {
  const { schemaName, data, targetName, autoRefresh, filesIncluded, fileValueHandler, dispatchId } = action.payload;
  const target = targetName || schemaName;
  yield put(setOnStore({ targetName: target, status: START, error: null, loading: true, dispatchId }));
  const dataToSend = filesIncluded ? yield* uploadFilesFromData(data, fileValueHandler) : data;
  const res = yield* httpRequest(api.createObject, schemaName, dataToSend);

  if (res.error) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    console.error('postDoc err', schemaName, res.err);
    Logger.onError('POST', action, errType)
    yield put(setOnStore({ targetName: target, status: errType, error: res, loading: false, dispatchId }));
  } else {
    yield put(
      setOnStore({ targetName: target, status: FINISHED, error: null, loading: false, dispatchId })
    );
    Logger.onSuccess('POST', action, FINISHED);
    if(autoRefresh){
      yield put(
        refreshCollection({ targetName: target })
      );
    }
  }
}
/* eslint no-unused-vars: "off" */
