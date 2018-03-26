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

  var defaultProps = exports.defaultProps = {};

  var propTypes = exports.propTypes = {
    render: _propTypes2.default.func.isRequired,
    /**
     * render:
     *     <Loader
            component={MyComponent}
          />
      * all the props from FetchDocument will wrap inside props.fetch
     */
    component: _propTypes2.default.element
    /*   
     * What you going to get Fetch:
     * showLoader : boolean
    */
  };
});