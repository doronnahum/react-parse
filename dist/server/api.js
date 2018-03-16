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
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var create = _axios2['default'].create;
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
  // query
  /**
   * ### query
   * query data from server by ClassName
   * the data is already in JSON format
   *
   * @param className ClassName
   * @param query object with parse query parameters, look http://docs.parseplatform.org/rest/guide/#queries
   * @param limit number: Limit the number of objects returned by the query
   * @param skip number: Use with limit to paginate through results
   * @param Count boolean , set false to disable counter
   * @param keys string: Restrict the fields returned by the query
   * @param include string:
   * @param order string: Specify a field to sort by
   * {username: "barton", email: "barton@foo.com"}
   */
  query: function query(className, _query, limit, skip, Count, keys, include, order) {
    if (Count === undefined) Count = true;

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
  /**
   * ### getCloudFunction
   * call function on parse cloudCode
   *
   * @param functionName string - the function name in backEnd
   * @param data object data to post to server
   */
  getCloudFunction: function getCloudFunction(functionName, data) {
    return _api.post('' + cloudCodePath + functionName, data);
  },
  getObjectById: function getObjectById(schemaName, objectId, keys, include) {
    var p = { params: {} };
    if (keys) p.keys = keys;
    if (include) p.include = include;
    return _api.get('' + classPath + schemaName + '/' + objectId, p);
  },
  /**
   * ### updateObject
   * To change the data on an object that already exists
   * keys you don’t specify will remain unchanged
   *
   * @param className ClassName
   * @param objectId parse objectID
   * @param data object: key:value to update
   * data: {vote: 40, color: "red"}
   */
  updateObject: function updateObject(schemaName, objectId, data) {
    if (schemaName === 'User') {
      return _api.put('' + usersPath + objectId, data);
    }
    return _api.put('' + classPath + schemaName + '/' + objectId, data);
  },
  /**
   * ### createObject
   * To create new document
   *
   * @param className ClassName
   * @param objectId parse objectID
   * @param data object: key:value to create
   * data: {vote: 40, color: "red"}
   */
  createObject: function createObject(schemaName, data) {
    return _api.post('' + classPath + schemaName, data);
  },
  /**
   * ### deleteObject
   * To delete Object from data base
   *
   * @param className ClassName
   * @param objectId parse objectID
   */
  deleteObject: function deleteObject(schemaName, objectId) {
    return _api['delete']('' + classPath + schemaName + '/' + objectId);
  },

  /**
   * ### createInstallation
   * To create new installation object
   *
   * @param data object: key:value to create
   *
   */
  createInstallation: function createInstallation(data) {
    return _api.post(installations, data);
  },

  /**
   * ### getInstallation
   * To get installation object
   *
   * @param data installation objectId
   *
   */
  getInstallation: function getInstallation(objectId) {
    return _api.get(installations, objectId);
  },

  /**
   * ### updateInstallation
   * To update installation object
   *
   * @param data object: key:value to update
   *
   */
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

exports['default'] = Api;
module.exports = exports['default'];