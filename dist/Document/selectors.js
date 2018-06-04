(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'reselect', 'immutable', '../helpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('reselect'), require('immutable'), require('../helpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reselect, global.immutable, global.helpers);
    global.selectors = mod.exports;
  }
})(this, function (exports, _reselect, _immutable, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getError = exports.getInfo = exports.getLoading = exports.getStatus = exports.getData = exports.getDocuments = undefined;

  var MAP = (0, _immutable.Map)();

  var getTargetName = function getTargetName(state, targetName) {
    return targetName;
  };

  var getDocuments = exports.getDocuments = function getDocuments(state) {
    return state.parse.documents;
  };

  var getImmutableDoc = (0, _reselect.createSelector)([getDocuments, getTargetName], function (documents, targetName) {
    return documents.get(targetName) || MAP;
  });

  var getData = exports.getData = (0, _reselect.createSelector)(getImmutableDoc, function (dataImmutable) {
    return dataImmutable.get('data') && dataImmutable.get('data').toJS();
  });

  var getStatus = exports.getStatus = (0, _reselect.createSelector)(getImmutableDoc, function (dataImmutable) {
    return dataImmutable.get('status');
  });
  var getLoading = exports.getLoading = (0, _reselect.createSelector)(getImmutableDoc, function (dataImmutable) {
    return (0, _helpers.isLoading)(dataImmutable.get('status'));
  });

  var getInfo = exports.getInfo = (0, _reselect.createSelector)(getImmutableDoc, function (dataImmutable) {
    return dataImmutable.get('info');
  });

  var getError = exports.getError = (0, _reselect.createSelector)(getImmutableDoc, function (dataImmutable) {
    return dataImmutable.get('error');
  });
});