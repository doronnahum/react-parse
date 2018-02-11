import PropTypes from 'prop-types';

export const defaultProps = {
    query: null,
    include: null,
    queryStatus: null,
    info: null,
    data: null,
    keys: null,
    page: null,
    filterByMemberId: null,
    localFirst: false,
    localOnly: false,
    perPage: 25,
    memberFieldName: 'member',
    enableCount: false,
    leaveClean: true,
    targetName: null,
    onGetFinish: () => {},
    onGetStart: () => {},
    onDeleteDocumentFinish: () => {},
    onPutDocumentFinish: () => {},
  };

 export const propTypes = {
    collectionName: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      updateDocument: PropTypes.func,
      deleteDocument: PropTypes.func,
      clearCollection: PropTypes.func,
      getCollection: PropTypes.func,
    }).isRequired,
    render: PropTypes.func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
    targetName: PropTypes.string,
    query: PropTypes.shape({}),
    data: PropTypes.array,
    include: PropTypes.string,
    queryStatus: PropTypes.string,
    keys: PropTypes.string,
    perPage: PropTypes.number,
    info: PropTypes.shape({
      count: PropTypes.number,
      timestamp: PropTypes.number,
      page: PropTypes.number,
      skip: PropTypes.number,
    }),
    page: PropTypes.number,
    enableCount: PropTypes.bool,
    onGetStart: PropTypes.func,
    onGetFinish: PropTypes.func,
    onDeleteDocumentFinish: PropTypes.func,
    onPutDocumentFinish: PropTypes.func,
    filterByMemberId: PropTypes.bool,
    leaveClean: PropTypes.bool,
    localFirst: PropTypes.bool, // get data from server only if data didn't found in store
    localOnly: PropTypes.bool, // get data only from local store
    memberFieldName: PropTypes.string,
  };