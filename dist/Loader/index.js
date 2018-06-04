(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './prop-types', './store'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./prop-types'), require('./store'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.store);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _store) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _store2 = _interopRequireDefault(_store);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var ShowLoader = function (_React$Component) {
    _inherits(ShowLoader, _React$Component);

    function ShowLoader() {
      _classCallCheck(this, ShowLoader);

      return _possibleConstructorReturn(this, (ShowLoader.__proto__ || Object.getPrototypeOf(ShowLoader)).apply(this, arguments));
    }

    _createClass(ShowLoader, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            showLoader = _props.showLoader,
            component = _props.component;

        if (component) {
          return (0, _react.createElement)(component, { showLoader: showLoader });
        }
        return this.props.render(showLoader);
      }
    }]);

    return ShowLoader;
  }(_react2.default.Component);

  exports.default = (0, _store2.default)(ShowLoader);


  ShowLoader.propTypes = _propTypes.propTypes;

  ShowLoader.defaultProps = _propTypes.defaultProps;
});