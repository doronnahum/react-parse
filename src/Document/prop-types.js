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
  parseDataBeforeSave: PropTypes.func,
  initialValues: PropTypes.shape({}), // Start Local document with initial values
  leaveClean: PropTypes.bool, // default true, data removed from store componentWillUnmount
  // render view 
  render: PropTypes.func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
  // Callbacks
  onGetStart: PropTypes.func,
  onGetFinish: PropTypes.func,
  onCreateLocalDocument: PropTypes.func,
  onCreateFinish: PropTypes.func,
  onDeleteFinish: PropTypes.func,
  onUpdateFinish: PropTypes.func,
};
  
export const defaultProps =  {
  objectId: null,
  localOnly: false,
  localFirst: false,
  data: null,
  initialValues: null,
  uniqueId: null,
  include: null,
  leaveClean: true,
  onGetStart: () => {},
  onGetFinish: () => {},
  onCreateLocalDocument: () => {},
  onCreateFinish: () => {},
  onDeleteFinish: () => {},
  onUpdateFinish: () => {},
};
