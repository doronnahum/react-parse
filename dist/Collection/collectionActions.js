(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './actions', '../index'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./actions'), require('../index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.actions, global.index);
    global.collectionActions = mod.exports;
  }
})(this, function (exports, _actions, _index) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var actions = _interopRequireWildcard(_actions);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
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

  var collectionActions = function () {
    function collectionActions() {
      _classCallCheck(this, collectionActions);
    }

    _createClass(collectionActions, null, [{
      key: 'fetchData',
      value: function fetchData(payload) {
        (0, _index.dispatch)(actions.fetchData(payload));
      }
    }, {
      key: 'cleanCollections',
      value: function cleanCollections() {
        (0, _index.dispatch)(actions.cleanCollections());
      }
    }, {
      key: 'deleteDoc',
      value: function deleteDoc(payload) {
        (0, _index.dispatch)(actions.deleteDoc(payload));
      }
    }, {
      key: 'postDoc',
      value: function postDoc(payload) {
        (0, _index.dispatch)(actions.postDoc(payload));
      }
    }, {
      key: 'putDoc',
      value: function putDoc(payload) {
        (0, _index.dispatch)(actions.putDoc(payload));
      }
    }, {
      key: 'refreshCollection',
      value: function refreshCollection(payload) {
        (0, _index.dispatch)(actions.refreshCollection(payload));
      }
    }, {
      key: 'cleanData',
      value: function cleanData(payload) {
        (0, _index.dispatch)(actions.cleanData(payload));
      }
    }]);

    return collectionActions;
  }();

  exports.default = collectionActions;
  ;
});