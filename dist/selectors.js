'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _CloudCodeSelectors = require('./CloudCode/selectors');

var CloudCodeSelectors = _interopRequireWildcard(_CloudCodeSelectors);

var _CollectionSelectors = require('./Collection/selectors');

var CollectionSelectors = _interopRequireWildcard(_CollectionSelectors);

var _DocumentSelectors = require('./Document/selectors');

var DocumentSelectors = _interopRequireWildcard(_DocumentSelectors);

exports.CloudCodeSelectors = CloudCodeSelectors;
exports.CollectionSelectors = CollectionSelectors;
exports.DocumentSelectors = DocumentSelectors;