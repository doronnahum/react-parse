import * as actions from './actions';
import {dispatch} from '../index'


  /**
   * Dispatch action to get collection data from parse server
   * @param {object} payload
   * @param {string} payload.schemaName db schemaName
   * @param {string} payload.targetName key to store response inside redux store
   * if targetName empty then we use schemaName as targetName
   * @param {object} payload.query http://docs.parseplatform.org/rest/guide/#queries
   * @param {number} payload.perPage number of documents to include in each query
   * @param {string} payload.page number of pages to skip
   * @param {string} payload.include pointer to include
   * @param {string} payload.keys keys to include
   * @param {boolean} payload.enableCount set true to get count objects in the collection
   * @param {object} payload.logger pass to your Logger relevant info 
   * @param {function} payload.dataHandler pass function that manipulate data before set to store
   * @param {function} payload.dispatchId optional, you can pass some unique key to help you follow specific query status
   * @param {function} payload.boomerang optional, you can pass some data that help you manage your things with this async query
   */
  export const fetchData = (payload) => {
    dispatch(actions.fetchData(payload))
  }

  /**
   * Dispatch action to clean all redux.parse.collections
   */
  export const cleanCollections = ()=> {
    dispatch(actions.cleanCollections())
  }

  /**
   * Dispatch action to delete document from collection
   * @param {object} payload
   * @param {string} payload.schemaName db schemaName
   * @param {string} payload.targetName key to store response inside redux store
   * @param {string} payload.objectId document id
   * @param {boolean} payload.autoRefresh set to to refresh collection data
   * @param {object} payload.logger pass to your Logger relevant info 
   */
  export const deleteDoc = (payload)=> {
    dispatch(actions.deleteDoc(payload))
  }

  /**
   * Dispatch action to create a new document in collection
   * @param {object} payload
   * @param {string} payload.schemaName db schemaName
   * @param {string} payload.targetName key to store response inside redux store
   * @param {object} payload.data new doucment data
   * @param {boolean} payload.autoRefresh set to to refresh collection data
   * @param {object} payload.logger pass to your Logger relevant info
   * @param {boolean} payload.filesIncluded set true if your data include file to upload
   * @param {function} payload.fileValueHandler pass function that will get the new file URL if you didn't want to save it as File object
   * @param {function} payload.dispatchId optional, you can pass some unique key to help you follow specific query status
   */
  export const postDoc = (payload)=> {
    dispatch(actions.postDoc(payload))
  }

  /**
   * Dispatch action to create a new document in collection
   * @param {object} payload
   * @param {string} payload.schemaName db schemaName
   * @param {string} payload.targetName key to store response inside redux store
   * @param {string} payload.objectId document id
   * @param {object} payload.data data to update in the doucment
   * @param {boolean} payload.autoRefresh set to to refresh collection data
   * @param {object} payload.logger pass to your Logger relevant info
   * @param {boolean} payload.filesIncluded set true if your data include file to upload
   * @param {function} payload.fileValueHandler pass function that will get the new file URL if you didn't want to save it as File object
   * @param {function} payload.dispatchId optional, you can pass some unique key to help you follow specific query status
 * @param {function} payload.boomerang optional, you can pass some data that help you manage your things with this async query
   */
  export const putDoc = (payload)=> {
    dispatch(actions.putDoc(payload))
  }
  
  /**
   * Dispatch action to refresh collection data by targetName
   * this will keep the same parameters like the last fetchData
   * @param {object} payload
   * @param {string} payload.targetName
   */
  export const refreshCollection = (payload)=> {
    dispatch(actions.refreshCollection(payload))
  }

  /**
   * Dispatch action to clean collection by targetName
   * @param {object} payload
   * @param {string} payload.targetName
   * 
   */
  export const cleanData = (payload)=> {
    dispatch(actions.cleanData(payload))
  }