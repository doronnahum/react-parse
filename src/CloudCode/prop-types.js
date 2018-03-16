import PropTypes from 'prop-types';

export const propTypes = {
  /**
   * Cloud Function name
   * look at: http://docs.parseplatform.org/rest/guide/#cloud-code
   */
  functionName: PropTypes.string.isRequired,
  /**
   * targetName
   * place to set server response - store.cloudCodes[targetName]
   * optional- if empty then target is functionName
   */
  targetName: PropTypes.string,
  /**
   * params
   * object with parameters that pass on fetch
   * example {objectId:'59D454c'}
   */
  params: PropTypes.object,
  /**
   * onFetchEnd
   * call back after fetch end
   * onFetchEnd(error, {data, queryStatus})
   */
  onFetchEnd: PropTypes.func,
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
  localOnly: PropTypes.bool, // get data only from local store
  /**
   * digToData
   * the location of the data on server response
   * default is 'data.result'
   */
  digToData: PropTypes.string,
  /**
   * render props - pass function that get props and return component.
   * (error, props) => <MYCOMPONENT />
   * props = {
   *  data,
      queryStatus,
      isLoading,
      info,
      refreshData
    }
   */
  render: PropTypes.func.isRequired,
};

export const defaultProps = {
  digToData: 'data.result',
  leaveClean: true,
  onFetchEnd: () => {},
};
