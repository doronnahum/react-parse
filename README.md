# `react-parse`
## Ready for production

# How to install
## Inside your root component:
```
import {config as reactParseConfig, setReactParseDispatch} from 'react-parse'
const apiConfig = { baseURL: envConfig.SERVER_URL, appId: envConfig.PARSE_ID }
reactParseConfig.init(apiConfig);
setReactParseDispatch(store.dispatch);
```
## After login - set token
```
reactParseConfig.setSessionToken('userSessionToken);
```
## After logout - clean token
```
reactParseConfig.removeSessionToken();
```
## Add to your rootReducer
```
import {parseReducer} from 'react-parse';
const rootReducers = combineReducers({
  ....,
  parse: parseReducer
});
```
## Add to your root saga
```
import {parseWatcher} from 'react-parse'
function* rootSaga() {
  yield all([
	...,
    call(parseWatcher, 'parseWatcher'),
	]);
}
```
## Collection example
```
import { selectors, collectionActions } from 'react-parse';
class ReactParseExample extends React.Component {
	  componentWillMount() {
	   collectionActions.fetchData({ targetName: 'ProdctsInHomeScreen', schemaName:  'Prodcts' })
  }
  .....
    render() {
		const {prodcts, prodctsLoading } = this.props
    return (<div....)
......
const mapStateToProps = (state) => {
  return {
    prodcts: selectors.selectCollectionData(state, 'ProdctsInHomeScreen'),
    prodctsLoading: selectors.selectCollectionLoading(state, 'ProdctsInHomeScreen'),
  }
};
```
## actions
```
import {  collectionActions, cloudCodeActions, documentActions} from 'react-parse'
Use like that:
documentActions.fetchData({....})
we didn't need a dispatch to play the action
All actions:
// ---------- collectionActions ---- //
class collectionActions {
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
   * 
   */
  static fetchData(payload) {
    dispatch(actions.fetchData(payload))
  }

  /**
   * Dispatch action to clean all redux.parse.collections
   */
  static cleanCollections() {
    dispatch(actions.cleanCollections())
  }

  /**
   * Dispatch action to delete document from collection
   * @param {object} payload
   * @param {string} payload.schemaName db schemaName
   * @param {string} payload.targetName key to store response inside redux store
   * @param {string} payload.objectId document id
   * @param {boolean} payload.autoRefresh set to to refresh collection data
   */
  static deleteDoc(payload) {
    dispatch(actions.deleteDoc(payload))
  }

  /**
   * Dispatch action to create a new document in collection
   * @param {object} payload
   * @param {string} payload.schemaName db schemaName
   * @param {string} payload.targetName key to store response inside redux store
   * @param {object} payload.data new doucment data
   * @param {boolean} payload.autoRefresh set to to refresh collection data
   */
  static postDoc(payload) {
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
   */
  static putDoc(payload) {
    dispatch(actions.putDoc(payload))
  }
  
  /**
   * Dispatch action to refresh collection data by targetName
   * this will keep the same parameters like the last fetchData
   * @param {object} payload
   * @param {string} payload.targetName
   * 
   */
  static refreshCollection(payload) {
    dispatch(actions.refreshCollection(payload))
  }

  /**
   * Dispatch action to clean collection by targetName
   * @param {object} payload
   * @param {string} payload.targetName
   * 
   */
  static cleanData(payload) {
    dispatch(actions.cleanData(payload))
  }
};
// ---- documentActions ---- //
class documentActions {
  /**
   * Dispatch action to get collection data from parse server
   * @param {object} payload
   * @param {string} payload.objectId document id
   * @param {string} payload.schemaName db schemaName
   * @param {string} payload.targetName key to store response inside redux store
   * if targetName empty then we use documentId as targetName
   * @param {string} payload.include pointer to include
   * @param {string} payload.keys keys to include
   * 
   */
  static fetchData(payload) {
    dispatch(actions.fetchData(payload))
  }

  /**
   * Dispatch action to update local data inside document
   * @param {object} payload
   * @param {string} payload.targetName key to find document inside redux store.parse.documents
   * @param {string} payload.key key to update
   * @param {string} payload.value value to set
   */
  static updateField(payload) {
    dispatch(actions.updateField(payload))
  }

  /**
   * Dispatch action to delete document from collection
   * @param {object} payload
   * @param {string} payload.schemaName db schemaName
   * @param {string} payload.targetName key to store response inside redux store
   * @param {string} payload.objectId document id
   */
  static deleteDoc(payload) {
    dispatch(actions.deleteDoc(payload))
  }

  /**
   * Dispatch action to create a new document in collection
   * @param {object} payload
   * @param {string} payload.schemaName db schemaName
   * @param {string} payload.targetName key to store response inside redux store
   * @param {object} payload.data new doucment data
   */
  static postDoc(payload) {
    dispatch(actions.postDoc(payload))
  }

  /**
   * Dispatch action to create a new document in collection
   * @param {object} payload
   * @param {string} payload.schemaName db schemaName
   * @param {string} payload.targetName key to store response inside redux store
   * @param {string} payload.objectId document id
   * @param {object} payload.data data to update in the doucment
   */
  static putDoc(payload) {
    dispatch(actions.putDoc(payload))
  }
  
  /**
   * Dispatch action to clean document by targetName
   * @param {object} payload
   * @param {string} payload.targetName
   * 
   */
  static cleanData(payload) {
    dispatch(actions.cleanData(payload))
  }
  /**
   * Dispatch action to clean all documents
   * 
   */
  static cleanDocuments() {
    dispatch(actions.cleanDocuments())
  }
};

// ---- cloudCodeActions ---- //
 cloudCodeActions {
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
```
## Selectors
```
selectors = {
  selectCollections,
  selectCollectionData,
  selectCollectionLoading,
  selectCollectionInfo,
  selectCollectionStatus,
  selectCollectionError,

  selectDocuments,
  selectDocumentData,
  selectDocumentLoading,
  selectDocumentInfo,
  selectDocumentStatus,
  selectDocumentError,

  selectCloudCodes,
  selectCloudCodeData,
  selectCloudCodeLoading,
  selectCloudCodeInfo,
  selectCloudCodeStatus,
   selectCloudCodeError
  }
  ```
## Notification
```
import {reactParseConfig, setReactParseDispatch} from 'react-parse'

const logOnSuccses = function(action, status){
	console.log(action, status)
}
const logOnError = function(action, status){
	console.log(action, status)
}
  reactParseConfig.init({
    baseURL: parseConfig.PARSE.url,
    appId: parseConfig.PARSE.appId,
    onSuccses: logOnSuccses,
    onError: logOnError
  })
```

## Global Loader
```
import {ShowLoader} from 'react-parse'
class MyComponent extends React.Component {

  .....
    render() {
    	return (
		<ShowLoader render={(isLoading) => {
		isLoading ? <YourLoader /> : null
		}}/>
		)

```
------------

## You can work with component provider
------------
Data provider components for [react](https://reactjs.org) and [react-native](https://facebook.github.io/react-native/) apps with [parse-server](hhttps://github.com/parse-community/parse-server) that using [redux+saga](https://github.com/redux-saga/redux-saga).
read about [render props](https://reactjs.org/docs/render-props.html) pattern.

### Way i need this?
this components help you to get data from the server or create/update data on server without writing any code except your ui.

documentation tell the component what you want and pass function that return component to render on the screen, you component get all what you need:
  - query status- LOADING, SUCCESS, ERROR
  - data
  - refreshMethod - run this method and the query to server run again and you get refresh data...
  
there are a lot of options that can help you to build faster and smarter apps, check our [documentation](https://doronnahum.github.io/react-parse/):



#### Document Exapmle:
With `FetchDocument` you can get specific document by collection name and objectId
```sh
<FetchDocument collectionName='Post' objectId={'blDxFXA9Wk'} render={(res) => <MyComponent {...res}/>} />
```
Want to update the title of the post document?
Easy,
use `changeValueByKey`  and then run `saveDocument`
```sh
class MyComponent extends React.Component {
  render() {
    return <div>
          <input
            value={this.props.data.title}
            onChange={e => {
              changeValueByKey('title', e.target.value);
            }} />
        <button onClick={this.props.saveDocument}>SAVE</button>
      </div>
  }}
```
Need to Create a new document, just use the `FetchDocument ` without `objectId` and run `saveDocument`.
`
`
#### Collection Exapmle:
With `FetchCollection` you can get list of document by collection name and params
```sh
<FetchCollection collectionName='Post' query={{tags: 'news'}} render={(res) => <MyListComponent {...res}/>} />
```
#### CloudCode Exapmle:
With `FetchCloudCode` you can get data from any cloud code founction
```sh
<FetchCloudCode functionName='Post' query={{tags: 'news'}} render={(res) => <MyListComponent {...res}/>} />
```

### Document in the process...
