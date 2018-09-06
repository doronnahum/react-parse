import PropTypes from 'prop-types';

export const defaultProps = {
  order: '-createdAt',
  autoRefresh: true,
  onFetchEnd: () => {},
  onPostEnd: () => {},
  onPutEnd: () => {},
  onDeleteEnd: () => {},
  fetchPropsKey: 'fetchProps'
};

export const propTypes = {
  schemaName: PropTypes.string.isRequired,
  /**
   * targetName
   * place to set server response - store.collections[targetName]
   * optional- if empty then target is schemaName
   */
  targetName: PropTypes.string,
  /**
   * query
   * object with parameters that pass on fetch
   * example {title:'59D454c'}
   */
  query: PropTypes.object,
  /**
   * limit
   * 	Limit the number of objects returned by the query
   */
  limit: PropTypes.number,
  /**
   * skip
   * Use with limit to paginate through results
   */
  skip: PropTypes.number,
  /**
   * enableCount
   * return the amount of results in data base
   */
  enableCount: PropTypes.bool,
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
   * order
   * default is '-createdAt'
   * 	Specify a field to sort by
   */
  order: PropTypes.string,
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
   * default true
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
  render: PropTypes.func,
  /**
   * dataHandler
   * pass function that manipulate data before set to store
   */
  dataHandler: PropTypes.func
};
