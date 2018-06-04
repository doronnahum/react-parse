(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', '../helpers', './Document'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('../helpers'), require('./Document'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.helpers, global.Document);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _helpers, _Document) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Document2 = _interopRequireDefault(_Document);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

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

  var FetchDocumentWithUniqueId = function (_React$PureComponent) {
    _inherits(FetchDocumentWithUniqueId, _React$PureComponent);

    function FetchDocumentWithUniqueId(props) {
      _classCallCheck(this, FetchDocumentWithUniqueId);

      var _this = _possibleConstructorReturn(this, (FetchDocumentWithUniqueId.__proto__ || Object.getPrototypeOf(FetchDocumentWithUniqueId)).call(this, props));

      _this.uniqueId = _this.props.uniqueId || (0, _helpers.createUniqueId)();
      return _this;
    }

    _createClass(FetchDocumentWithUniqueId, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(_Document2.default, _extends({}, this.props, { uniqueId: 'LOCAL: ' + this.uniqueId }));
      }
    }]);

    return FetchDocumentWithUniqueId;
  }(_react2.default.PureComponent);

  exports.default = FetchDocumentWithUniqueId;


  FetchDocumentWithUniqueId.propTypes = {
    uniqueId: _propTypes2.default.string
  };
});