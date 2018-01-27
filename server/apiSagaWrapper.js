import { call, put } from 'redux-saga/effects';
import { dig } from '../helpers';
import types from '../types';
import { debug } from 'util';

export function* httpRequest(...params) {
  try {
    const res = yield call(...params);
    return res;
  } catch (error) {
    error.error = true;
    if (dig(error, 'response.data.code') === 209) {
      // invalid session token
      yield put({ type: types.INVALID_SESSION_TOKEN });
    }
    return error;
  }
}
