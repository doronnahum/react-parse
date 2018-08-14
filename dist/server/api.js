(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../helpers', 'axios'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../helpers'), require('axios'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.helpers, global.axios);
    global.api = mod.exports;
  }
})(this, function (exports, _helpers, _axios) {
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
  var filesPath = "/files/";
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
  var headers = null;
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
    headers = obj;
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
    getSessionToken: function getSessionToken(token) {
      if (!initConfig) {
        return '';
      }
      return initConfig.sessionToken;
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
      if (keys) p.params.keys = keys;
      if (include) p.params.include = include;
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
    },
    uploadFile: function uploadFile(file) {
      var fileName = file.name;
      var fileType = (0, _helpers.GetFileType)(fileName);
      if (!fileType) return;
      var contentType = (0, _helpers.GetContentTypeByFileType)(fileType);
      var _filesApi = create({
        baseURL: initConfig.baseURL,
        headers: Object.assign({}, createHeaders(initConfig), { 'Content-Type': contentType })
      });
      fileName = fileName.replace(/[^a-zA-Z0-9.-]+/g, '');
      if (fileName[0] === '.') fileName = 'filename' + fileName;
      return _filesApi.post('' + filesPath + fileName, file);
    },
    uploadFileFromReactNativeStorage: function uploadFileFromReactNativeStorage(RNFetchBlob, file) {
      if (!file || !file.uri) {
        console.warn('missing file parmeters');
        return { text: function text() {
            return 'error missing file parmeters';
          } };
      }
      return RNFetchBlob.fetch('POST', '' + initConfig.baseURL + endpoints.filesPath + file.fileName, Object.assign({}, headers, { 'Content-Type': 'application/octet-stream' }), RNFetchBlob.wrap(file.uri)).then(function (res) {
        // console.log(res.text())
        return res.json();
      }).catch(function (err) {
        console.log('error in getting image', err);
      });
    }
  };

  exports.default = Api;
});