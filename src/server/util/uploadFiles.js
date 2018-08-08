import regeneratorRuntime from 'regenerator-runtime';
import api from '../api';
import { call } from 'redux-saga/effects';
let RNFetchBlob = null;

export const setRNFetchBlob = function(res) {
  RNFetchBlob = res
}
const browserFileUnloader = function* (file) {
  return yield call(api.uploadFile, file);
}
const nativeFileUnloader = function* (file) {
  if(!RNFetchBlob){
    throw 'react parse need instance of RNFetchBlob, please install rn-fetch-blo and use setRNFetchBlob from react-parse'
  } else{
    return yield call(api.uploadFileFromReactNativeStorage,RNFetchBlob, file);
  }
}

export default function* uploadFilesFromData(data, fileValueHandler) {
  if(!data) return;
  const isReactNative = typeof navigator != 'undefined' && navigator.product == 'ReactNative'
  for (var k in data) {
    if (data[k] instanceof File) {
      let fileRes
      try {
        if(isReactNative){
          fileRes = yield nativeFileUnloader(data[k]);
        }else{
          fileRes = yield browserFileUnloader(data[k]);
          console.log('NEWWWWW3.33')
          debugger
        }
      } catch(e) {
        console.log('NEWWWWW3.344', e)
        debugger
        throw e
      }
      debugger
      data[k] = fileValueHandler
      ? fileValueHandler(fileRes)
      : {
        name: isReactNative ? fileRes.name : fileRes.data.name,
        url: isReactNative ? fileRes.url: fileRes.data.url,
        __type: 'File'
      }
    }
  }
  return data;
}