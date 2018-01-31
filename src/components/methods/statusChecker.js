import isEqual from 'lodash/isEqual';
import types from '../../types'
const {
  GET_START,
  GET_FAILED,
  GET_FAILED_NETWORK,
  GET_FINISHED,
  CREATE_START,
  CREATE_FAILED,
  CREATE_FAILED_NETWORK,
  CREATE_FINISHED,
  DELETE_START,
  DELETE_FAILED,
  DELETE_FAILED,
  DELETE_FINISHED,
  UPDATE_START,
  UPDATE_FAILED,
  UPDATE_FAILED,
  UPDATE_FINISHED,
} = types.statues
export const isCreateDocumentFinish = function (props, nextProps) {
    const isCreateStart = props.queryStatus === CREATE_START
    const isCreateFinish = nextProps.queryStatus === CREATE_FIN ||
    nextProps.queryStatus === CREATE_DOCUMENT_FAILED
    return isCreateStart && isCreateFinish
  }
  export const isDeleteDocumentFinish = function (props, nextProps) {
    const isDeleteStart = props.queryStatus === DELETE_DOCUMENT_START
    const isDeleteFinished = nextProps.queryStatus === DELETE_DOCUMENT_FINISHED ||
    nextProps.queryStatus === DELETE_DOCUMENT_FAILED
    return isDeleteStart && isDeleteFinished
  }
  export const isUpdateDocumentFinish = function (props, nextProps) {
    const isUpdateStart = props.queryStatus === UPDATE_DOCUMENT_START
    const isUpdateFinished = nextProps.queryStatus === UPDATE_DOCUMENT_FINISHED ||
    nextProps.queryStatus === UPDATE_DOCUMENT_FAILED
    return isUpdateStart && isUpdateFinished
  }
  export const isGetFinish = function (props, nextProps, getDataFlag) {
    if (
        queryStatus === LOADING &&
        nextProps.queryStatus !== LOADING &&
        (getDataFlag || isDataChanged(props, nextProps))
      ) {
        return true;
      }
      return false;
  }
  export const isDataChanged = function (props, nextProps) {
    return props.data !== nextProps.data;
  }
  export const isDocumentParamsChanged = function (props, nextProps) {
    // collectionName was change, get data from server
    if (props.collectionName !== nextProps.collectionName) {
        return true;
      }
      if (props.objectId !== nextProps.objectId) {
        return true;
      }
      if (props.include !== nextProps.include) {
        return true;
      }
      if (!isEqual(props.initialValues, nextProps.initialValues)) {
        return false; // initialValues only on load fow noe
      }
      return false;
  }