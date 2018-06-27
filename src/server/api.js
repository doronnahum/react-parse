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
import {GetFileType, GetContentTypeByFileType} from '../helpers'
// import {create} from 'apisauce'
import axios from 'axios';

const { create } = axios;
// const LOGIN = 'login'
// const LOGOUT = 'logout'

// entities paths
// const schemaPath = "/schemas/"
const classPath = '/classes/';
const installations = '/installations/';
// const batchPath = "/batch"
const filesPath = "/files/"
const usersPath = '/users/';
// const rolesPath = "/roles/"
// const pagesPath = "/pages/"
// const pageElementPath = "/pageelement/"
const loginPath = '/login';
const logoutPath = '/logout';
const cloudCodePath = '/functions/';
// const jobsPath = "/jobs/";

let api = null;
let initConfig = null;
let headers = null;
export let handleError

const createHeaders = function(res) {
  const obj = {};
  if (res.appId) {
    obj['X-Parse-Application-Id'] = res.appId;
  }
  if (res.sessionToken) {
    obj['X-Parse-Session-Token'] = res.sessionToken;
  }
  if (res.masterKey) {
    obj['X-Parse-Master-Key'] = res.masterKey;
  }
  headers = obj
  return obj;
};
const Api = {
  init(res) {
    if (!res || !res.baseURL) {
      console.warn('Api.init(config) - missing config.baseURL');
      return;
    }
    initConfig = res;
    api = create({
      baseURL: res.baseURL,
      headers: createHeaders(res)
    });
    if(res.handleError){
      handleError = res.handleError
    }

  },
  setSessionToken(token) {
    const config = Object.assign(initConfig, { sessionToken: token });
    Api.init(config);
  },
  removeSessionToken() {
    delete initConfig.sessionToken;
    Api.init(initConfig);
  },
  getAppId() {
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
  query(className, query, limit, skip, Count = true, keys, include, order) {
    const data = {
      params: {}
    };
    if (query) {
      data.params.where = query;
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
    return api.get(`${classPath}${className}`, data);
  },
  /**
   * ### getCloudFunction
   * call function on parse cloudCode
   *
   * @param functionName string - the function name in backEnd
   * @param data object data to post to server
   */
  getCloudFunction(functionName, data) {
    return api.post(`${cloudCodePath}${functionName}`, data);
  },
  getObjectById(schemaName, objectId, keys, include) {
    const p = { params: {} };
    if (keys) p.keys = keys;
    if (include) p.include = include;
    return api.get(`${classPath}${schemaName}/${objectId}`, p);
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
  updateObject(schemaName, objectId, data) {
    if (schemaName === 'User') {
      return api.put(`${usersPath}${objectId}`, data);
    }
    return api.put(`${classPath}${schemaName}/${objectId}`, data);
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
  createObject(schemaName, data) {
    return api.post(`${classPath}${schemaName}`, data);
  },
  /**
   * ### deleteObject
   * To delete Object from data base
   *
   * @param className ClassName
   * @param objectId parse objectID
   */
  deleteObject(schemaName, objectId) {
    return api.delete(`${classPath}${schemaName}/${objectId}`);
  },

  /**
   * ### createInstallation
   * To create new installation object
   *
   * @param data object: key:value to create
   *
   */
  createInstallation(data) {
    return api.post(installations, data);
  },

  /**
   * ### getInstallation
   * To get installation object
   *
   * @param data installation objectId
   *
   */
  getInstallation(objectId) {
    return api.get(installations, objectId);
  },

  /**
   * ### updateInstallation
   * To update installation object
   *
   * @param data object: key:value to update
   *
   */
  updateInstallation(installationObjectId, data) {
    return api.put(installations + installationObjectId, data);
  },

  login(email, password) {
    const data = {
      params: {
        username: email.trim().toLowerCase(),
        password: password.trim().toLowerCase()
      }
    };
    return api.get(`${loginPath}`, data);
  },

  signUp(form) {
    const prefixForm = {
      username: userForm.email.trim().toLowerCase(),
      email: userForm.email.trim().toLowerCase(),
      password: userForm.password.trim().toLowerCase(),
    };
    let dataToSend = Object.assign(userForm, prefixForm )
    return api.post(`${usersPath}`, dataToSend);
  },
  logout() {
    return api.post(`${logoutPath}`);
  },
  addFile(file) {
    let fileName = file.name;
    let fileType = GetFileType(fileName);
    if (!fileType) return;
    let contetType = GetContentTypeByFileType(fileType);
    const _filesApi = create({
      baseURL: initConfig.baseURL,
      headers: Object.assign(
        {},
        createHeaders(initConfig),
        {'Content-Type': contetType}
      )
    });
    return _filesApi.post(`${filesPath}${fileName}`, file);
  }
};

export default Api;
