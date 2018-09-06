(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes);
    global.propTypes = mod.exports;
  }
})(this, function (exports, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.propTypes = exports.defaultProps = undefined;

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var defaultProps = exports.defaultProps = {
    order: '-createdAt',
    autoRefresh: true,
    onFetchEnd: function onFetchEnd() {},
    onPostEnd: function onPostEnd() {},
    onPutEnd: function onPutEnd() {},
    onDeleteEnd: function onDeleteEnd() {},
    fetchPropsKey: 'fetchProps'
  };

  var propTypes = exports.propTypes = {
    schemaName: _propTypes2.default.string.isRequired,
    /**
     * targetName
     * place to set server response - store.collections[targetName]
     * optional- if empty then target is schemaName
     */
    targetName: _propTypes2.default.string,
    /**
     * query
     * object with parameters that pass on fetch
     * example {title:'59D454c'}
     */
    query: _propTypes2.default.object,
    /**
     * limit
     * 	Limit the number of objects returned by the query
     */
    limit: _propTypes2.default.number,
    /**
     * skip
     * Use with limit to paginate through results
     */
    skip: _propTypes2.default.number,
    /**
     * enableCount
     * return the amount of results in data base
     */
    enableCount: _propTypes2.default.bool,
    /**
     * keys
     * example: 'title,body'
     * Restrict the fields returned by the query
     */
    keys: _propTypes2.default.string,
    /**
     * include
     * example: 'post,categories'
     * Use on Pointer columns to return the full object
     */
    include: _propTypes2.default.string,
    /**
     * order
     * default is '-createdAt'
     * 	Specify a field to sort by
     */
    order: _propTypes2.default.string,
    /**
     * onFetchEnd
     * call back after fetch end
     * onFetchEnd(error, {data, queryStatus})
     */
    onFetchEnd: _propTypes2.default.func,
    /**
     * onPostEnd
     * call back after fetch end
     * onPostEnd(error, {data, queryStatus})
     */
    onPostEnd: _propTypes2.default.func,
    /**
     * onPutEnd
     * call back after fetch end
     * onPutEnd(error, {data, queryStatus})
     */
    onPutEnd: _propTypes2.default.func,
    /**
     * onDeleteEnd
     * call back after fetch end
     * onDeleteEnd(error, {data, queryStatus})
     */
    onDeleteEnd: _propTypes2.default.func,
    /**
     * leaveClean
     * we remove data from store on componentWillUnmount
     * default is true
     */
    leaveClean: _propTypes2.default.bool,
    /**
     * localFirst
     * fetch data from server only if we can found your data on local store
     */
    localFirst: _propTypes2.default.bool,
    /**
     * localOnly
     * never fetch data from store
     */
    localOnly: _propTypes2.default.bool,
    /**
     * autoRefresh
     * default true
     * Get data after each create/update/delete doc
     */
    autoRefresh: _propTypes2.default.bool,
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
    render: _propTypes2.default.func,
    /**
     * dataHandler
     * pass function that manipulate data before set to store
     */
    dataHandler: _propTypes2.default.func
  };
});