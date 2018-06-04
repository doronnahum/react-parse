import * as actions from './actions';
import {dispatch} from '../index'

export default class cloudCodeActions {
  /** functionName, targetName, params, digToData
   * Dispatch action to post cloud code function
   * @param {object} payload
   * @param {string} payload.functionName functionName in the parse cloude
   * @param {string} payload.targetName key to store response inside redux store
   * if targetName empty then we use functionName as targetName
   * @param {object} payload.params request params
   * @param {string} payload.digToData string that help us find your data, difault is data.result
   * 
   */
  static fetchData(payload) {
    dispatch(actions.fetchData(payload))
  }
  /**
   * Dispatch action to clean cloude code by targetName
   * @param {object} payload
   * @param {string} payload.targetName
   * 
   */
  static cleanData(payload) {
    dispatch(actions.cleanData(payload))
  }
  /**
   * Dispatch action to clean all clode code
   * 
   */
  static cleanCloudsCode() {
    dispatch(actions.cleanCloudCode())
  }
};