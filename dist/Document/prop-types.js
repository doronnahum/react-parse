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
    autoRefresh: false,
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
     * place to set server response - store.documents[targetName]
     * if empty then target is objectId but if
     * objectId is empty then we create uniqueId for you
     */
    targetName: _propTypes2.default.string,
    /**
     * objectId
     * optional - if empty then we didn't run fetch Data
     */
    objectId: _propTypes2.default.string,
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
     * default false
     * Get data after each create/update/delete doc
     */
    autoRefresh: _propTypes2.default.bool,
    /**
     * render - pass function that get props and return component.
     * Exmple of use:
     *    <FetchDocument
            schemaName={mySchemaName}
            objectId={myObjectId} 
            render={this.renderMyComponent}
          />
     */
    render: _propTypes2.default.func,
    /**
     * example:
     *     <FetchDocument
            schemaName={mySchemaName}
            objectId={myObjectId}
            component={MyComponent}
          />
      * all the props from FetchDocument will wrap inside props.fetch
     */
    component: _propTypes2.default.any,
    /**
     * dataHandler
     * pass function that manipulate data before set to store
     */
    dataHandler: _propTypes2.default.func
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
});