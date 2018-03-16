'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _workersFetchCollection = require('./workers/fetchCollection');

var _workersFetchCollection2 = _interopRequireDefault(_workersFetchCollection);

var _workersDeleteDoc = require('./workers/deleteDoc');

var _workersDeleteDoc2 = _interopRequireDefault(_workersDeleteDoc);

var _workersPutDoc = require('./workers/putDoc');

var _workersPutDoc2 = _interopRequireDefault(_workersPutDoc);

var _workersPostDoc = require('./workers/postDoc');

var _workersPostDoc2 = _interopRequireDefault(_workersPostDoc);

exports.fetchCollection = _workersFetchCollection2['default'];
exports.deleteDoc = _workersDeleteDoc2['default'];
exports.putDoc = _workersPutDoc2['default'];
exports.postDoc = _workersPostDoc2['default'];