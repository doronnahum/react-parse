'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var defaultProps = {
  order: '-createdAt',
  autoRefresh: false,
  onFetchEnd: function onFetchEnd() {},
  onPostEnd: function onPostEnd() {},
  onPutEnd: function onPutEnd() {},
  onDeleteEnd: function onDeleteEnd() {}
};

exports.defaultProps = defaultProps;
var propTypes = {
  schemaName: _propTypes2['default'].string.isRequired,
  /**
   * targetName
   * place to set server response - store.documents[targetName]
   * if empty then target is objectId but if
   * objectId is empty then we create uniqueId for you
   */
  targetName: _propTypes2['default'].string,
  /**
   * objectId
   * optional - if empty then we didn't run fetch Data
   */
  objectId: _propTypes2['default'].string,
  /**
   * keys
   * example: 'title,body'
   * Restrict the fields returned by the query
   */
  keys: _propTypes2['default'].string,
  /**
   * include
   * example: 'post,categories'
   * Use on Pointer columns to return the full object
   */
  include: _propTypes2['default'].string,
  /**
   * onFetchEnd
   * call back after fetch end
   * onFetchEnd(error, {data, queryStatus})
   */
  onFetchEnd: _propTypes2['default'].func,
  /**
   * onPostEnd
   * call back after fetch end
   * onPostEnd(error, {data, queryStatus})
   */
  onPostEnd: _propTypes2['default'].func,
  /**
   * onPutEnd
   * call back after fetch end
   * onPutEnd(error, {data, queryStatus})
   */
  onPutEnd: _propTypes2['default'].func,
  /**
   * onDeleteEnd
   * call back after fetch end
   * onDeleteEnd(error, {data, queryStatus})
   */
  onDeleteEnd: _propTypes2['default'].func,
  /**
   * leaveClean
   * we remove data from store on componentWillUnmount
   * default is true
   */
  leaveClean: _propTypes2['default'].bool,
  /**
   * localFirst
   * fetch data from server only if we can found your data on local store
   */
  localFirst: _propTypes2['default'].bool,
  /**
   * localOnly
   * never fetch data from store
   */
  localOnly: _propTypes2['default'].bool,
  /**
   * autoRefresh
   * default false
   * Get data after each create/update/delete doc
   */
  autoRefresh: _propTypes2['default'].bool,
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
  render: _propTypes2['default'].func.isRequired
};
exports.propTypes = propTypes;