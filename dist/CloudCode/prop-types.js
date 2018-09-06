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
  exports.defaultProps = exports.propTypes = undefined;

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var propTypes = exports.propTypes = {
    /**
     * Cloud Function name
     * look at: http://docs.parseplatform.org/rest/guide/#cloud-code
     */
    functionName: _propTypes2.default.string.isRequired,
    /**
     * targetName
     * place to set server response - store.cloudCodes[targetName]
     * optional- if empty then target is functionName
     */
    targetName: _propTypes2.default.string,
    /**
     * params
     * object with parameters that pass on fetch
     * example {objectId:'59D454c'}
     */
    params: _propTypes2.default.object,
    /**
     * onFetchEnd
     * call back after fetch end
     * onFetchEnd(error, {data, queryStatus})
     */
    onFetchEnd: _propTypes2.default.func,
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
    localOnly: _propTypes2.default.bool, // get data only from local store
    /**
     * digToData
     * the location of the data on server response
     * default is 'data.result'
     */
    digToData: _propTypes2.default.string,
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
    render: _propTypes2.default.func,
    /**
     * dataHandler
     * pass function that manipulate data before set to store
     */
    dataHandler: _propTypes2.default.func
  };

  var defaultProps = exports.defaultProps = {
    digToData: 'data.result',
    leaveClean: true,
    onFetchEnd: function onFetchEnd() {},
    fetchPropsKey: 'fetchProps'
  };
});