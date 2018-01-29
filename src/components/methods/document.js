import isEqual from 'lodash/isEqual';

export const isCreateDocumentFinish = function (props, nextProps) {
    const isCreateStart = props.queryStatus === CREATE_DOCUMENT_START
    const isCreateFinish = nextProps.queryStatus === CREATE_DOCUMENT_SUCCESS ||
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
  export const isParamsChanged = function (props, nextProps) {
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
  