import { put } from 'redux-saga/effects';
import isArray from 'lodash/isArray';
import { httpRequest } from '../../../server/apiSagaWrapper';
import types from '../../../types';
import Api from '../../../server/api';
import { dig } from '../../../helpers';
import { setCloudCodeRequestStatus as setStatus } from '../../actions/cloudCodes';

const { LOADING, SUCCESS_WITH_ZERO_RESULTS, ERROR, SUCCESS } = types;

export default function* getCloudCode(action) {
  const { functionName, params } = action;
  const targetName = action.targetName || functionName;
  yield put(setStatus(targetName, LOADING));
  const res = yield httpRequest(Api.getCloudFunction, functionName, params); // Make the request
  if (res.error || dig(res, 'response.data.error')) {
    yield put(setStatus(targetName, ERROR));
    console.error('getCloudFunction err: ', functionName, res.error);
  } else {
    const data = dig(res, action.digToDataString); // extricate data from server response
    const queryStatus = data.length > 0 ? SUCCESS : SUCCESS_WITH_ZERO_RESULTS;
    yield put({
      type: types.SET_CLOUD_CODE_PARAMETERS,
      targetName,
      status: queryStatus,
      data: isArray(data) ? data : [data],
      info: {
        params,
        timestamp: Date.now(),
      },
    });
  }
}
// worker
