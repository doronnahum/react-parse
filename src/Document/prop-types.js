import PropTypes from 'prop-types';

export const defaultProps = {
  order: '-createdAt',
  autoRefresh: false,
  onFetchEnd: () => {},
  onPostEnd: () => {},
  onPutEnd: () => {},
  onDeleteEnd: () => {}
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
   * render - pass function that get props and return component.
   * Exmple of use:
   *    <FetchDocument
          schemaName={mySchemaName}
          objectId={myObjectId} 
          render={this.renderMyComponent}
        />
   */
  render: PropTypes.func,
  /**
   * example:
   *     <FetchDocument
          schemaName={mySchemaName}
          objectId={myObjectId}
          component={MyComponent}
        />
    * all the props from FetchDocument will wrap inside props.fetch
   */
  component: PropTypes.any
  /*   
   * What you going to get Fetch:
   * First argument - error - the error from serve.
   * Second argument - {
   *  data : {...}, // The data from server response
      isLoading: bollean, // True when loading
      status : string, // look at the status list
      info: {...}, // extra helpful data of the request
      refresh, // function that refresh the data from server
      deleteDoc, // function
      put, // update your document
      post, // create new document
      ...this.props // all you other props that you want to pass
    }
  */
};
