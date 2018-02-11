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
} = types
export const isCreateFinish = function (props, nextProps) {
  const now = props.queryStatus;
  const next = nextProps.queryStatus;
  const isStart = (now === CREATE_START)
  const isFinished = (next === CREATE_FINISHED)
  const isFailed = (next === CREATE_FAILED)
  const isFailedNetwork = (next === CREATE_FAILED_NETWORK)
  const isEnd = (isFinished || isFailed || isFailedNetwork)
  return isStart && isEnd
}

export const isDeleteFinish = function (props, nextProps) {
    const now = props.queryStatus;
    const next = nextProps.queryStatus;
    const isStart = (now === DELETE_START)
    const isFinished = (next === DELETE_FINISHED)
    const isFailed = (next === DELETE_FAILED)
    const isFailedNetwork = (next === DELETE_FAILED_NETWORK)
    const isEnd = (isFinished || isFailed || isFailedNetwork)
    return isStart && isEnd
}

export const isUpdateFinish = function (props, nextProps) {
    const now = props.queryStatus;
    const next = nextProps.queryStatus;
    const isStart = (now === UPDATE_START)
    const isFinished = (next === UPDATE_FINISHED)
    const isFailed = (next === UPDATE_FAILED)
    const isFailedNetwork = (next === UPDATE_FAILED_NETWORK)
    const isEnd = (isFinished || isFailed || isFailedNetwork)
    return isStart && isEnd
}

export const isGetFinish = function (props, nextProps) {
    const now = props.queryStatus;
    const next = nextProps.queryStatus;
    const isStart = (now === GET_START)
    const isFinished = (next === GET_FINISHED)
    const isFailed = (next === GET_FAILED)
    const isFailedNetwork = (next === GET_FAILED_NETWORK)
    const isEnd = (isFinished || isFailed || isFailedNetwork)
    return isStart && isEnd
}

export const isDataChanged = function (props, nextProps) {
    return props.data !== nextProps.data;
}
export const isQueryStatusChanged = function (props, nextProps) {
    return props.queryStatus !== nextProps.queryStatus;
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
export const isCollectionParamsChanged = function(nextProps) {
  // filters was change, get data from server
  if (this.isQueryFilterChanged(nextProps)) {
    return true;
  }
  // page was change, get data from server
  if (this.props.page !== nextProps.page) {
    return true;
  }
  // collectionName was change, get data from server
  if (this.props.collectionName !== nextProps.collectionName) {
    return true;
  }
  // keys was change, get data from server
  if (this.props.keys !== nextProps.keys) {
    return true;
  }
  return false;
}