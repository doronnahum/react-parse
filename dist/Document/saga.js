'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _workersFetchDoc = require('./workers/fetchDoc');

var _workersFetchDoc2 = _interopRequireDefault(_workersFetchDoc);

var _workersPutDoc = require('./workers/putDoc');

var _workersPutDoc2 = _interopRequireDefault(_workersPutDoc);

var _workersDeleteDoc = require('./workers/deleteDoc');

var _workersDeleteDoc2 = _interopRequireDefault(_workersDeleteDoc);

var _workersPostDoc = require('./workers/postDoc');

var _workersPostDoc2 = _interopRequireDefault(_workersPostDoc);

exports.fetchDoc = _workersFetchDoc2['default'];
exports.putDoc = _workersPutDoc2['default'];
exports.deleteDoc = _workersDeleteDoc2['default'];
exports.postDoc = _workersPostDoc2['default'];