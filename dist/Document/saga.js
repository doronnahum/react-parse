'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _workersGetDocument = require('./workers/getDocument');

var _workersGetDocument2 = _interopRequireDefault(_workersGetDocument);

var _workersUpdateDocumentOnServer = require('./workers/updateDocumentOnServer');

var _workersUpdateDocumentOnServer2 = _interopRequireDefault(_workersUpdateDocumentOnServer);

var _workersDeleteDocument = require('./workers/deleteDocument');

var _workersDeleteDocument2 = _interopRequireDefault(_workersDeleteDocument);

var _workersPostNewDocument = require('./workers/postNewDocument');

var _workersPostNewDocument2 = _interopRequireDefault(_workersPostNewDocument);

exports.getDocument = _workersGetDocument2['default'];
exports.updateDocumentOnServer = _workersUpdateDocumentOnServer2['default'];
exports.deleteDocument = _workersDeleteDocument2['default'];
exports.postNewDocument = _workersPostNewDocument2['default'];