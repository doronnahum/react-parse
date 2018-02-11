'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var defaultProps = {
  query: null,
  include: null,
  queryStatus: null,
  info: null,
  data: null,
  keys: null,
  page: null,
  filterByMemberId: null,
  localFirst: false,
  localOnly: false,
  perPage: 25,
  memberFieldName: 'member',
  enableCount: false,
  leaveClean: true,
  targetName: null,
  onGetFinish: function onGetFinish() {},
  onGetStart: function onGetStart() {},
  onDeleteDocumentFinish: function onDeleteDocumentFinish() {},
  onPutDocumentFinish: function onPutDocumentFinish() {}
};

exports.defaultProps = defaultProps;
var propTypes = {
  collectionName: _propTypes2['default'].string.isRequired,
  actions: _propTypes2['default'].shape({
    updateDocument: _propTypes2['default'].func,
    deleteDocument: _propTypes2['default'].func,
    clearCollection: _propTypes2['default'].func,
    getCollection: _propTypes2['default'].func
  }).isRequired,
  render: _propTypes2['default'].func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
  targetName: _propTypes2['default'].string,
  query: _propTypes2['default'].shape({}),
  data: _propTypes2['default'].array,
  include: _propTypes2['default'].string,
  queryStatus: _propTypes2['default'].string,
  keys: _propTypes2['default'].string,
  perPage: _propTypes2['default'].number,
  info: _propTypes2['default'].shape({
    count: _propTypes2['default'].number,
    timestamp: _propTypes2['default'].number,
    page: _propTypes2['default'].number,
    skip: _propTypes2['default'].number
  }),
  page: _propTypes2['default'].number,
  enableCount: _propTypes2['default'].bool,
  onGetStart: _propTypes2['default'].func,
  onGetFinish: _propTypes2['default'].func,
  onDeleteDocumentFinish: _propTypes2['default'].func,
  onPutDocumentFinish: _propTypes2['default'].func,
  filterByMemberId: _propTypes2['default'].bool,
  leaveClean: _propTypes2['default'].bool,
  localFirst: _propTypes2['default'].bool, // get data from server only if data didn't found in store
  localOnly: _propTypes2['default'].bool, // get data only from local store
  memberFieldName: _propTypes2['default'].string
};
exports.propTypes = propTypes;