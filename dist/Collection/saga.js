'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _workersDeleteDocumentFromCollection = require('./workers/deleteDocumentFromCollection');

var _workersDeleteDocumentFromCollection2 = _interopRequireDefault(_workersDeleteDocumentFromCollection);

var _workersUpdateDocumentFromCollection = require('./workers/updateDocumentFromCollection');

var _workersUpdateDocumentFromCollection2 = _interopRequireDefault(_workersUpdateDocumentFromCollection);

var _workersGetCollection = require('./workers/getCollection');

var _workersGetCollection2 = _interopRequireDefault(_workersGetCollection);

exports.deleteDocumentFromCollection = _workersDeleteDocumentFromCollection2['default'];
exports.getCollection = _workersGetCollection2['default'];
exports.updateDocumentFromCollection = _workersUpdateDocumentFromCollection2['default'];