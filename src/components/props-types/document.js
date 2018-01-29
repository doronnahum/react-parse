import PropTypes from 'prop-types';

export const propTypes =  {
    // params
    collectionName: PropTypes.string.isRequired, // parse server class name
    objectId: PropTypes.string, // parse serve objectId
    uniqueId: PropTypes.string, // when objectId is empty, this uniqueId generate for you if you not pass one
    include: PropTypes.string, // Use on Pointer columns to return the full object
    // configuration
    localFirst: PropTypes.bool, // get data from server only if data didn't found in the store.
    localOnly: PropTypes.bool, // Work with data from store, disabled the get data from server method.s
    getDataWithPostFinishCallBack: PropTypes.bool, // this trigger a GET method after POST and the data pass with onPostDocumentFinish
    parseDataBeforeSave: PropTypes.func,
    actions: PropTypes.shape({}).isRequired,
    initialValues: PropTypes.shape({}),
    cleanDataOnComponentWillUnmount: PropTypes.bool,
    // render view 
    render: PropTypes.func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
    // Callbacks
    onGetStart: PropTypes.func,
    onGetFinish: PropTypes.func,
    onCreateLocalDocument: PropTypes.func,
    onPostDocumentStart: PropTypes.func,
    onPostDocumentFinish: PropTypes.func,
    onDeleteDocumentStart: PropTypes.func,
    onDeleteDocumentFinish: PropTypes.func,
    onPutDocumentStart: PropTypes.func,
    onPutDocumentFinish: PropTypes.func,
  };
  
export const defaultProps =  {
    objectId: null,
    localOnly: false,
    localFirst: false,
    data: null,
    initialValues: null,
    uniqueId: null,
    queryStatus: null,
    include: null,
    cleanDataOnComponentWillUnmount: true,
    getDataWithPostFinishCallBack: false,
    onCreateLocalDocument: () => {},
    onGetFinish: () => {},
    onGetStart: () => {},
    onDeleteDocumentStart: () => {},
    onDeleteDocumentFinish: () => {},
    onPutDocumentStart: () => {},
    onPutDocumentFinish: () => {},
    onPostDocumentStart: () => {},
    onPostDocumentFinish: () => {},
    parseDataBeforeSave: data => data,
  }