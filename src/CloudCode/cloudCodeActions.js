import * as actions from './actions';
import {dispatch} from '../index'

  /** functionName, targetName, params, digToData
   * Dispatch action to post cloud code function
   * @param {object} payload
   * @param {string} payload.functionName functionName in the parse clouds
   * @param {string} payload.targetName key to store response inside redux store
   * if targetName empty then we use functionName as targetName
   * @param {object} payload.params request params
   * @param {string} payload.digToData string that help us find your data, default is data.result
   * @param {object} payload.logger pass to your Logger relevant info 
   * 
   */
  export const fetchData = (payload) => {
    dispatch(actions.fetchData(payload))
  }
  /**
   * Dispatch action to clean cloud code by targetName
   * @param {object} payload
   * @param {string} payload.targetName
   * @param {object} payload.logger pass to your Logger relevant info 
   * 
   */
  export const  cleanData = (payload) =>  {
    dispatch(actions.cleanData(payload))
  }
  /**
   * Dispatch action to clean all cloud code
   * 
   */
  export const cleanCloudsCode = () => {
    dispatch(actions.cleanCloudCode())
  }
