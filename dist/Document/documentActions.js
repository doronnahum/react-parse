(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['./actions', '../index'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('./actions'), require('../index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.actions, global.index);
    global.documentActions = mod.exports;
  }
})(this, function (_actions, _index) {
  'use strict';

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

  var documentActions = {
    fetchData: function fetchData(payload) {
      (0, _index.dispatch)(actions.fetchData(payload));
    },
    updateField: function updateField(payload) {
      (0, _index.dispatch)(actions.updateField(payload));
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
    cleanData: function cleanData(payload) {
      (0, _index.dispatch)(actions.cleanData(payload));
    },
    cleanDocuments: function cleanDocuments() {
      (0, _index.dispatch)(actions.cleanDocuments());
    }
  };
});