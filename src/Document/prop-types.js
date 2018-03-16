import PropTypes from 'prop-types';

export const defaultProps = {
  order: '-createdAt',
  autoRefresh: false,
  onFetchEnd: () => {},
  onPostEnd: () => {},
  onPutEnd: () => {},
  onDeleteEnd: () => {},
};

export const propTypes = {
  schemaName: PropTypes.string.isRequired,
  /**
   * targetName
   * place to set server response - store.documents[targetName]
   * if empty then target is objectId but if
   * objectId is empty then we create uniqueId for you
   */
  targetName: PropTypes.string,
  /**
   * objectId
   * optional - if empty then we didn't run fetch Data
   */
  objectId: PropTypes.string,
  /**
   * keys
   * example: 'title,body'
   * Restrict the fields returned by the query
   */
  keys: PropTypes.string,
  /**
   * include
   * example: 'post,categories'
   * Use on Pointer columns to return the full object
   */
  include: PropTypes.string,
  /**
   * onFetchEnd
   * call back after fetch end
   * onFetchEnd(error, {data, queryStatus})
   */
  onFetchEnd: PropTypes.func,
  /**
   * onPostEnd
   * call back after fetch end
   * onPostEnd(error, {data, queryStatus})
   */
  onPostEnd: PropTypes.func,
  /**
   * onPutEnd
   * call back after fetch end
   * onPutEnd(error, {data, queryStatus})
   */
  onPutEnd: PropTypes.func,
  /**
   * onDeleteEnd
   * call back after fetch end
   * onDeleteEnd(error, {data, queryStatus})
   */
  onDeleteEnd: PropTypes.func,
  /**
   * leaveClean
   * we remove data from store on componentWillUnmount
   * default is true
   */
  leaveClean: PropTypes.bool,
  /**
   * localFirst
   * fetch data from server only if we can found your data on local store
   */
  localFirst: PropTypes.bool,
  /**
   * localOnly
   * never fetch data from store
   */
  localOnly: PropTypes.bool,
  /**
   * autoRefresh
   * default false
   * Get data after each create/update/delete doc
   */
  autoRefresh: PropTypes.bool,
  /**
   * render props - pass function that get props and return component.
   * (error, props) => <MYCOMPONENT />
   * props = {
   *  data,
      isLoading,
      queryStatus,
      info,
      refreshData,
      deleteDocument,
      putDocument,
      postDocument
    }
   */
  render: PropTypes.func.isRequired,
};
