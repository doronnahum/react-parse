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

  var collectionActions = {
    fetchData: function fetchData(payload) {
      (0, _index.dispatch)(actions.fetchData(payload));
    },
    cleanCollections: function cleanCollections() {
      (0, _index.dispatch)(actions.cleanCollections());
    },
    deleteDoc: function deleteDoc(payload) {
      (0, _index.dispatch)(actions.deleteDoc(payload));
    },
    postDoc: function postDoc(payload) {
      (0, _index.dispatch)(actions.postDoc(payload));
    },
    putDoc: function putDoc(payload) {
      (0, _index.dispatch)(actions.putDoc(payload));
    },
    refreshCollection: function refreshCollection(payload) {
      (0, _index.dispatch)(actions.refreshCollection(payload));
    },
    cleanData: function cleanData(payload) {
      (0, _index.dispatch)(actions.cleanData(payload));
    }
  };
  exports.default = collectionActions;
});