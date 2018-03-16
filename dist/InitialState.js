(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'immutable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('immutable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.immutable);
    global.InitialState = mod.exports;
  }
})(this, function (exports, _require) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Record = _require.Record,
      Map = _require.Map;


  var InitialState = Record({
    collections: Map(),
    cloudCodes: Map(),
    documents: Map()
  });

  exports.default = InitialState;
});