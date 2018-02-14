var regeneratorRuntime = require("regenerator-runtime");

import { put } from 'redux-saga/effects';
import isArray from 'lodash/isArray';
import { httpRequest } from '../server/apiSagaWrapper';
import types from '../types';
import Api from '../server/api';
import { dig } from '../helpers';
import { setCloudCodeRequestStatus as setStatus } from './actions';

const START = types.GET_START;
const FAILED = types.GET_FAILED;
const FAILED_NETWORK = types.GET_FAILED_NETWORK;
const FINISHED = types.GET_FINISHED;

export default function* getCloudCode(action) {
  const { functionName, params } = action;
  const targetName = action.targetName || functionName;
  yield put(setStatus(targetName, START));
  const res = yield httpRequest(Api.getCloudFunction, functionName, params); // Make the request
  if (res.error || dig(res, 'response.data.error')) {
    const errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
    yield put(setStatus(targetName, errType));
    console.error('getCloudFunction err: ', functionName, res.error);
  } else {
    const data = dig(res, action.digToDataString); // extricate data from server response
    yield put({
      type: types.SET_CLOUD_CODE_PARAMETERS,
      targetName,
      status: FINISHED,
      data: isArray(data) ? data : [data],
      info: {
        params,
        timestamp: Date.now(),
      },
    });
  }
}
// worker
