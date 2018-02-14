'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var propTypes = {
  // params
  collectionName: _propTypes2['default'].string.isRequired, // parse server class name
  objectId: _propTypes2['default'].string, // parse serve objectId
  uniqueId: _propTypes2['default'].string, // when objectId is empty, this uniqueId generate for you if you not pass one
  include: _propTypes2['default'].string, // Use on Pointer columns to return the full object
  // configuration
  localFirst: _propTypes2['default'].bool, // get data from server only if data didn't found in the store.
  localOnly: _propTypes2['default'].bool, // Work with data from store, disabled the get data from server method.s
  parseDataBeforeSave: _propTypes2['default'].func,
  initialValues: _propTypes2['default'].shape({}), // Start Local document with initial values
  leaveClean: _propTypes2['default'].bool, // default true, data removed from store componentWillUnmount
  // render view
  render: _propTypes2['default'].func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
  // Callbacks
  onGetStart: _propTypes2['default'].func,
  onGetFinish: _propTypes2['default'].func,
  onCreateLocalDocument: _propTypes2['default'].func,
  onCreateFinish: _propTypes2['default'].func,
  onDeleteFinish: _propTypes2['default'].func,
  onUpdateFinish: _propTypes2['default'].func
};

exports.propTypes = propTypes;
var defaultProps = {
  objectId: null,
  localOnly: false,
  localFirst: false,
  data: null,
  initialValues: null,
  uniqueId: null,
  include: null,
  leaveClean: true,
  onGetStart: function onGetStart() {},
  onGetFinish: function onGetFinish() {},
  onCreateLocalDocument: function onCreateLocalDocument() {},
  onCreateFinish: function onCreateFinish() {},
  onDeleteFinish: function onDeleteFinish() {},
  onUpdateFinish: function onUpdateFinish() {}
};
exports.defaultProps = defaultProps;