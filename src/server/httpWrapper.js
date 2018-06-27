// const regeneratorRuntime = require('regenerator-runtime');
import {call} from 'redux-saga/effects'
import ErrorHandle from './ErrorHandle'

export default function* httpRequest (...params) {
  try {
    const res = yield makeRequest(...params);
    return res
  } catch (error) {
    error.error = true;
    yield ErrorHandle(error);
    return error
  }
}

function* makeRequest(...params) {
  return yield call(...params);
};


/* eslint no-unused-vars: "off" */
