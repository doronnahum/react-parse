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
  exports.handleError = undefined;

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

  var api = null;
  var initConfig = null;
  var handleError = exports.handleError = void 0;

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
      api = create({
        baseURL: res.baseURL,
        headers: createHeaders(res)
      });
      if (res.handleError) {
        exports.handleError = handleError = res.handleError;
      }
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

      var data = {
        params: {}
      };
      if (_query) {
        data.params.where = _query;
      }
      if (limit) {
        data.params.limit = limit;
      }
      if (skip) {
        data.params.skip = skip;
      }
      if (Count) {
        data.params.count = Count ? 1 : 0;
      } // Count by default
      if (keys) {
        data.params.keys = keys;
      }
      if (include) {
        data.params.include = include;
      }
      if (order) {
        data.params.order = order;
      }
      return api.get('' + classPath + className, data);
    },
    getCloudFunction: function getCloudFunction(functionName, data) {
      return api.post('' + cloudCodePath + functionName, data);
    },
    getObjectById: function getObjectById(schemaName, objectId, keys, include) {
      var p = { params: {} };
      if (keys) p.keys = keys;
      if (include) p.include = include;
      return api.get('' + classPath + schemaName + '/' + objectId, p);
    },
    updateObject: function updateObject(schemaName, objectId, data) {
      if (schemaName === 'User') {
        return api.put('' + usersPath + objectId, data);
      }
      return api.put('' + classPath + schemaName + '/' + objectId, data);
    },
    createObject: function createObject(schemaName, data) {
      return api.post('' + classPath + schemaName, data);
    },
    deleteObject: function deleteObject(schemaName, objectId) {
      return api.delete('' + classPath + schemaName + '/' + objectId);
    },
    createInstallation: function createInstallation(data) {
      return api.post(installations, data);
    },
    getInstallation: function getInstallation(objectId) {
      return api.get(installations, objectId);
    },
    updateInstallation: function updateInstallation(installationObjectId, data) {
      return api.put(installations + installationObjectId, data);
    },
    login: function login(email, password) {
      var data = {
        params: {
          username: email.trim().toLowerCase(),
          password: password.trim().toLowerCase()
        }
      };
      return api.get('' + loginPath, data);
    },
    signUp: function signUp(form) {
      var prefixForm = {
        username: userForm.email.trim().toLowerCase(),
        email: userForm.email.trim().toLowerCase(),
        password: userForm.password.trim().toLowerCase()
      };
      var dataToSend = Object.assign(userForm, prefixForm);
      return api.post('' + usersPath, dataToSend);
    },
    logout: function logout() {
      return api.post('' + logoutPath);
    }
  };

  exports.default = Api;
});