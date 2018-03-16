'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _require = require('immutable');

var Record = _require.Record;
var Map = _require.Map;

var InitialState = Record({
  collections: Map(),
  cloudCodes: Map(),
  documents: Map()
});

exports['default'] = InitialState;
module.exports = exports['default'];