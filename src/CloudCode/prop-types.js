import PropTypes from 'prop-types';

export const propTypes = {
  functionName: PropTypes.string.isRequired,
  collectionTarget: PropTypes.string,
  render: PropTypes.func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
  params: PropTypes.object,
  onGetStart: PropTypes.func,
  onGetFinish: PropTypes.func,
  leaveClean: PropTypes.bool,
  localFirst: PropTypes.bool, // get data from server only if data didn't found in store
  localOnly: PropTypes.bool, // get data only from local store
  digToDataString: PropTypes.string,
};
  
export const defaultProps = {
  digToDataString: 'data.result',
  leaveClean: true,
  onGetFinish: () => {},
  onGetStart: () => {},
};
