'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var propTypes = {
  functionName: _propTypes2['default'].string.isRequired,
  collectionTarget: _propTypes2['default'].string,
  render: _propTypes2['default'].func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
  params: _propTypes2['default'].object,
  onGetStart: _propTypes2['default'].func,
  onGetFinish: _propTypes2['default'].func,
  leaveClean: _propTypes2['default'].bool,
  localFirst: _propTypes2['default'].bool, // get data from server only if data didn't found in store
  localOnly: _propTypes2['default'].bool, // get data only from local store
  digToDataString: _propTypes2['default'].string
};

exports.propTypes = propTypes;
var defaultProps = {
  digToDataString: 'data.result',
  leaveClean: true,
  onGetFinish: function onGetFinish() {},
  onGetStart: function onGetStart() {}
};
exports.defaultProps = defaultProps;