(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'reselect', '../helpers', 'immutable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('reselect'), require('../helpers'), require('immutable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reselect, global.helpers, global.immutable);
    global.selectors = mod.exports;
  }
})(this, function (exports, _reselect, _helpers, _immutable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getError = exports.getCount = exports.getInfo = exports.getLoading = exports.getBoomerang = exports.getDispatchId = exports.getStatus = exports.getData = exports.getCollection = exports.getCollections = undefined;


  var MAP = (0, _immutable.Map)();

  var getTargetName = function getTargetName(state, targetName) {
    return targetName;
  };

  var getCollections = exports.getCollections = function getCollections(state) {
    return state.parse.collections;
  };

  var getImmutableCollection = (0, _reselect.createSelector)([getCollections, getTargetName], function (collections, targetName) {
    return collections.get(targetName) || MAP;
  });

  var getCollection = exports.getCollection = (0, _reselect.createSelector)(getImmutableCollection, function (dataImmutable) {
    return dataImmutable.toJS();
  });
  var getData = exports.getData = (0, _reselect.createSelector)(getImmutableCollection, function (dataImmutable) {
    return dataImmutable.get('data') && dataImmutable.get('data').toJS();
  });

  var getStatus = exports.getStatus = (0, _reselect.createSelector)(getImmutableCollection, function (dataImmutable) {
    return dataImmutable.get('status');
  });
  var getDispatchId = exports.getDispatchId = (0, _reselect.createSelector)(getImmutableCollection, function (dataImmutable) {
    return dataImmutable.get('dispatchId');
  });
  var getBoomerang = exports.getBoomerang = (0, _reselect.createSelector)(getImmutableCollection, function (dataImmutable) {
    return dataImmutable.get('boomerang');
  });
  var getLoading = exports.getLoading = (0, _reselect.createSelector)(getImmutableCollection, function (dataImmutable) {
    return (0, _helpers.isLoading)(dataImmutable.get('status'));
  });

  var getInfo = exports.getInfo = (0, _reselect.createSelector)(getImmutableCollection, function (dataImmutable) {
    return dataImmutable.get('info');
  });
  var getCount = exports.getCount = (0, _reselect.createSelector)(getImmutableCollection, function (dataImmutable) {
    var info = dataImmutable.get('info') || {};
    return info.count;
  });

  var getError = exports.getError = (0, _reselect.createSelector)(getImmutableCollection, function (dataImmutable) {
    return dataImmutable.get('error');
  });
});