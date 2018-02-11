'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getCloudCode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var marked0$0 = [getCloudCode].map(regeneratorRuntime.mark);

var _reduxSagaEffects = require('redux-saga/effects');

var _lodashIsArray = require('lodash/isArray');

var _lodashIsArray2 = _interopRequireDefault(_lodashIsArray);

var _serverApiSagaWrapper = require('../../server/apiSagaWrapper');

var _types = require('../../types');

var _types2 = _interopRequireDefault(_types);

var _serverApi = require('../../server/api');

var _serverApi2 = _interopRequireDefault(_serverApi);

var _helpers = require('../../helpers');

var _actionsCloudCodes = require('../actions/cloudCodes');

var START = _types2['default'].GET_START;
var FAILED = _types2['default'].GET_FAILED;
var FAILED_NETWORK = _types2['default'].GET_FAILED_NETWORK;
var FINISHED = _types2['default'].GET_FINISHED;

function getCloudCode(action) {
  var functionName, params, targetName, res, errType, data;
  return regeneratorRuntime.wrap(function getCloudCode$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        functionName = action.functionName;
        params = action.params;
        targetName = action.targetName || functionName;
        context$1$0.next = 5;
        return (0, _reduxSagaEffects.put)((0, _actionsCloudCodes.setCloudCodeRequestStatus)(targetName, START));

      case 5:
        context$1$0.next = 7;
        return (0, _serverApiSagaWrapper.httpRequest)(_serverApi2['default'].getCloudFunction, functionName, params);

      case 7:
        res = context$1$0.sent;

        if (!(res.error || (0, _helpers.dig)(res, 'response.data.error'))) {
          context$1$0.next = 15;
          break;
        }

        errType = res.message === 'Network Error' ? FAILED_NETWORK : FAILED;
        context$1$0.next = 12;
        return (0, _reduxSagaEffects.put)((0, _actionsCloudCodes.setCloudCodeRequestStatus)(targetName, errType));

      case 12:
        console.error('getCloudFunction err: ', functionName, res.error);
        context$1$0.next = 18;
        break;

      case 15:
        data = (0, _helpers.dig)(res, action.digToDataString);
        context$1$0.next = 18;
        return (0, _reduxSagaEffects.put)({
          type: _types2['default'].SET_CLOUD_CODE_PARAMETERS,
          targetName: targetName,
          status: FINISHED,
          data: (0, _lodashIsArray2['default'])(data) ? data : [data],
          info: {
            params: params,
            timestamp: Date.now()
          }
        });

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

// worker
module.exports = exports['default'];
// Make the request
// extricate data from server response