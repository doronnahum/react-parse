(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'axios'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('axios'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.axios);
    global.api = mod.exports;
  }
})(this, function (exports, _axios) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _axios2 = _interopRequireDefault(_axios);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var create = _axios2.default.create;
  // const LOGIN = 'login'
  // const LOGOUT = 'logout'

  // entities paths
  // const schemaPath = "/schemas/"
  /**
   * # Api.js
   *
   * This class interfaces with parse-server using the rest api
   * see [https://parseplatform.github.io/docs/rest/guide/]
   *
   */

  /**
   * ## Imports
   *
   * Config for defaults and lodash for a couple of features
   */
  // import _ from 'lodash'
  // import {objectToQueryString} from './tools/charm-helpers.js'
  // import {create} from 'apisauce'
  var classPath = '/classes/';
  var installations = '/installations/';
  // const batchPath = "/batch"
  // const filesPath = "/files/"
  var usersPath = '/users/';
  // const rolesPath = "/roles/"
  // const pagesPath = "/pages/"
  // const pageElementPath = "/pageelement/"
  var loginPath = '/login';
  var logoutPath = '/logout';
  var cloudCodePath = '/functions/';
  // const jobsPath = "/jobs/";

  var _api = null;
  var initConfig = null;
  var createHeaders = function createHeaders(res) {
    var obj = {};
    if (res.appId) {
      obj['X-Parse-Application-Id'] = res.appId;
    }
    if (res.sessionToken) {
      obj['X-Parse-Session-Token'] = res.sessionToken;
    }
    if (res.masterKey) {
      obj['X-Parse-Master-Key'] = res.masterKey;
    }
    return obj;
  };
  var Api = {
    init: function init(res) {
      if (!res || !res.baseURL) {
        console.warn('Api.init(config) - missing config.baseURL');
        return;
      }
      initConfig = res;
      _api = create({
        baseURL: res.baseURL,
        headers: createHeaders(res)
      });
    },
    setSessionToken: function setSessionToken(token) {
      var config = Object.assign(initConfig, { sessionToken: token });
      Api.init(config);
    },
    removeSessionToken: function removeSessionToken() {
      delete initConfig.sessionToken;
      Api.init(initConfig);
    },
    getAppId: function getAppId() {
      console.log(initConfig);

      if (!initConfig) {
        return '';
      }
      return initConfig.appId;
    },
    query: function query(className, _query, limit, skip) {
      var Count = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var keys = arguments[5];
      var include = arguments[6];
      var order = arguments[7];

      var _p = {
        params: {}
      };
      if (_query) {
        _p.params.where = _query;
      }
      if (limit) {
        _p.params.limit = limit;
      }
      if (skip) {
        _p.params.skip = skip;
      }
      if (Count) {
        _p.params.count = Count ? 1 : 0;
      } // Count by default
      if (keys) {
        _p.params.keys = keys;
      }
      if (include) {
        _p.params.include = include;
      }
      if (order) {
        _p.params.order = order;
      }
      return _api.get('' + classPath + className, _p);
    },
    getCloudFunction: function getCloudFunction(functionName, data) {
      return _api.post('' + cloudCodePath + functionName, data);
    },
    getObjectById: function getObjectById(schemaName, objectId, keys, include) {
      var p = { params: {} };
      if (keys) p.keys = keys;
      if (include) p.include = include;
      return _api.get('' + classPath + schemaName + '/' + objectId, p);
    },
    updateObject: function updateObject(schemaName, objectId, data) {
      if (schemaName === 'User') {
        return _api.put('' + usersPath + objectId, data);
      }
      return _api.put('' + classPath + schemaName + '/' + objectId, data);
    },
    createObject: function createObject(schemaName, data) {
      return _api.post('' + classPath + schemaName, data);
    },
    deleteObject: function deleteObject(schemaName, objectId) {
      return _api.delete('' + classPath + schemaName + '/' + objectId);
    },
    createInstallation: function createInstallation(data) {
      return _api.post(installations, data);
    },
    getInstallation: function getInstallation(objectId) {
      return _api.get(installations, objectId);
    },
    updateInstallation: function updateInstallation(installationObjectId, data) {
      return _api.put(installations + installationObjectId, data);
    },
    login: function login(email, password) {
      var _data = {
        params: {
          username: email.trim().toLowerCase(),
          password: password.trim().toLowerCase()
        }
      };
      return _api.get('' + loginPath, _data);
    },
    signUp: function signUp(userForm) {
      userForm.username = userForm.email.trim().toLowerCase();
      userForm.email = userForm.email.trim().toLowerCase();
      userForm.password = userForm.password.trim().toLowerCase();
      return _api.post('' + usersPath, userForm);
    },
    logout: function logout() {
      return _api.post('' + logoutPath);
    }
  };

  exports.default = Api;
});