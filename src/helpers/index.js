import isEqual from 'lodash/isEqual';
import consts from '../types';

const {
  FETCH_START,
  FETCH_FAILED,
  FETCH_FAILED_NETWORK,
  FETCH_FINISHED,

  POST_START,
  POST_FAILED,
  POST_FAILED_NETWORK,
  POST_FINISHED,

  DELETE_START,
  DELETE_FAILED,
  DELETE_FAILED_NETWORK,
  DELETE_FINISHED,

  PUT_START,
  PUT_FAILED,
  PUT_FAILED_NETWORK,
  PUT_FINISHED
} = consts;
export const createUniqueId = function createUniqueId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x100)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}`;
};

/**
 * dig
 * @param {*} obj pass the object that hold the data
 * @param {*} target pass string to target: 'props.user[0].name'
 * @return return the target or null
 */
export const dig = function dig(obj, target) {
  const keys = target.split('.');
  let digged = obj;
  for (const key of keys) {
    const parts = key.split('[');
    const currentKey = parts[0];
    digged = digged[currentKey];
    if (typeof digged === 'undefined' || digged === null) {
      return digged;
    }
    if (parts[1]) {
      digged = digged[parts[1].replace(']', '')];
      if (typeof digged === 'undefined' || digged === null) {
        return undefined;
      }
    }
  }
  return digged;
};

export const GetPointerObject = (className, objectId) => ({
  __type: 'Pointer',
  className,
  objectId
});

const isParamsChanged = function(props, nextProps) {
  return !isEqual(props.params, nextProps.params);
};

export const isTargetChanged = function(props, nextProps) {
  let status = false;
  if (props.targetName !== nextProps.targetName) {
    status = true;
  } else if (props.functionName !== nextProps.functionName) {
    status = true;
  } else if (props.schemaName !== nextProps.schemaName) {
    status = true;
  } else if (props.objectId !== nextProps.objectId) {
    status = true;
  } else if (props.uniqueId !== nextProps.uniqueId) {
    status = true;
  }
  return status;
};

export const isCloudCodePropsChanged = function(props, nextProps) {
  let status = false;
  if (isParamsChanged(props, nextProps)) {
    status = true;
  } else if (isTargetChanged(props, nextProps)) {
    status = true;
  }
  return status;
};

export const isLoading = function(status) {
  const isLoadingStatus =
    status === FETCH_START ||
    status === POST_START ||
    status === DELETE_START ||
    status === PUT_START;
  return isLoadingStatus;
};
export const isCreateFinish = function(props, nextProps) {
  const now = props.fetchStatus;
  const next = nextProps.fetchStatus;
  const isStart = now === POST_START;
  const isFinished = next === POST_FINISHED;
  const isFailed = next === POST_FAILED;
  const isFailedNetwork = next === POST_FAILED_NETWORK;
  const isEnd = isFinished || isFailed || isFailedNetwork;
  return isStart && isEnd;
};

export const isDeleteStart = function(fetchStatus) {
  return fetchStatus === DELETE_START;
};

export const isDeleteFinish = function(props, nextProps) {
  const now = props.fetchStatus;
  const next = nextProps.fetchStatus;
  const isStart = now === DELETE_START;
  const isFinished = next === DELETE_FINISHED;
  const isFailed = next === DELETE_FAILED;
  const isFailedNetwork = next === DELETE_FAILED_NETWORK;
  const isEnd = isFinished || isFailed || isFailedNetwork;
  return isStart && isEnd;
};

export const isUpdateFinish = function(props, nextProps) {
  const now = props.fetchStatus;
  const next = nextProps.fetchStatus;
  const isStart = now === PUT_START;
  const isFinished = next === PUT_FINISHED;
  const isFailed = next === PUT_FAILED;
  const isFailedNetwork = next === PUT_FAILED_NETWORK;
  const isEnd = isFinished || isFailed || isFailedNetwork;
  return isStart && isEnd;
};

export const isFetchFinish = function(props, nextProps) {
  const now = props.fetchStatus;
  const next = nextProps.fetchStatus;
  const isStart = now === FETCH_START;
  const isFinished = next === FETCH_FINISHED;
  const isFailed = next === FETCH_FAILED;
  const isFailedNetwork = next === FETCH_FAILED_NETWORK;
  const isEnd = isFinished || isFailed || isFailedNetwork;
  return isStart && isEnd;
};

export const isDataChanged = function(props, nextProps) {
  return props.fetchData !== nextProps.fetchData;
};

export const isQueryStatusChanged = function(props, nextProps) {
  return props.fetchStatus !== nextProps.fetchStatus;
};

export const isDocumentParamsChanged = function(props, nextProps) {
  let status = false
  if (isTargetChanged(props, nextProps)) {
    status = true
  } else if(props.keys !== nextProps.keys) {
    status = true
  } else if(props.include !== nextProps.include) {
    status = true
  }
  return status
};

export const isCollectionParamsChanged = function(props, nextProps) {
  let status = false
  // filters was change, get data from server
  if (isTargetChanged(props, nextProps)) {
    status = true
  } else if (!isEqual(props.query, nextProps.query)) {
    status = true;
  } else if (props.schemaName !== nextProps.schemaName) {
    status = true;
  } else if (props.limit !== nextProps.limit) {
    status = true;
  } else if (props.skip !== nextProps.skip) {
    status = true;
  } else if (props.enableCount !== nextProps.enableCount) {
    status = true;
  } else if (props.keys !== nextProps.keys) {
    status = true;
  } else if (props.include !== nextProps.include) {
    status = true;
  } else if (props.order !== nextProps.order) {
    status = true;
  }

  return status;
};

export const removeLocalKeys = function(obj) {
  let data = Object.assign({}, obj)
  delete data['fetchData']; 
  delete data['fetchError']; 
  delete data['fetchStatus']; 
  delete data['fetchInfo']; 
  delete data['fetchActions']; 
  return data
};
export const removeImutableKeys = function(obj) {
  let data = Object.assign({}, obj)
  delete data['updatedAt']; 
  delete data['createdAt']; 
  delete data['objectId']; 
  return data
};

/* eslint no-restricted-syntax: "off" */
