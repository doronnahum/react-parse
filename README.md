# `react-parse`
## Ready for production

# How to install
## 1- Inside your root component:
```
import {config as reactParseConfig, setReactParseDispatch} from 'react-parse'
const apiConfig = { baseURL: envConfig.SERVER_URL, appId: envConfig.PARSE_ID }
reactParseConfig.init(apiConfig);
setReactParseDispatch(store.dispatch);
```
### After login - set token
```
reactParseConfig.setSessionToken('userSessionToken);
```
### After logout - clean token
```
reactParseConfig.removeSessionToken();
```
## 2- Add to your rootReducer
```
import {parseReducer} from 'react-parse';
const rootReducers = combineReducers({
  ....,
  parse: parseReducer
});
```
## 3- Add to your root saga
```
import {parseWatcher} from 'react-parse'
function* rootSaga() {
  yield all([
	...,
    call(parseWatcher, 'parseWatcher'),
	]);
}
```
## Collection example - lets get some products
```
import { selectors, collectionActions } from 'react-parse';

class ReactParseExample extends React.Component {
	  componentWillMount() {
	   collectionActions.fetchData({ targetName: 'ProdctList', schemaName:  'Prodcts' })
  }
  .....
    render() {
		const {prodcts, prodctsLoading } = this.props
    return (<div....)
......
const mapStateToProps = (state) => {
  return {
    prodcts: selectors.selectCollectionData(state, 'ProdctList'),
    prodctsLoading: selectors.selectCollectionLoading(state, 'ProdctList'),
  }
};
```

## Actions - all what you need to do is to run action from your component 
```
import {  collectionActions, cloudCodeActions, documentActions} from 'react-parse'

Use like that:
	documentActions.fetchData({....})
** we didn't need a dispatch to play the action
```
### action payload options
|key|type  |info |
|--|--|--|
| schemaName | string | db schemaName |
| targetName | string | target to save the response from server  |
|  query| object |  http://docs.parseplatform.org/rest/guide/#queries|
| limit |  number|  number of documents to include in each query|
| skip | number | number of documents to skip |
| include | string  | pointer to include, example: 'Product,User' |
| keys | string | keys to include, , example: 'firstName,LastName' |
| enableCount | boolean	  | set true to count objects in the collection |
| autoRefresh | boolean | set to to refresh collection data on one of the document change from one of the document actions from  the collectionActions|
|documentId |  string| db document id |
| data| object| |
| functionName| string | cloud code function name |
| params | object | cloud code params |
| digToData| string |  string that help us find your data, default is 'data.result' |
---
### collectionActions:

 - GET collection from server:
	**fetchData**({schemaName, targetName, query, limit, skip, include, keys, enableCount})
	
 - POST  document
 **postDoc**({schemaName, targetName, data, autoRefresh})
 
  - PUT document
 **putDoc**({schemaName, targetName, objectId, data, autoRefresh})
 
   - DELETE document
 **deleteDoc**({schemaName, targetName, objectId, autoRefresh})
 
 - Refresh your data
 **refreshCollection**({targetName})
 
  - Clean collection from your store:
 **cleanData**({targetName})
 
 - Clean all collections from your store:
 **cleanCollections**()
 ---
### documentActions:

 - GET Document from server:
	**fetchData**({schemaName, targetName, objectId, include, keys})
	
 - POST  document
 **postDoc**({schemaName, targetName, data})
 
  - PUT document
 **putDoc**({schemaName, targetName, objectId, data})
 
   - DELETE document
 **deleteDoc**({schemaName, targetName, objectId})
 
   - Update local data
 **updateField**({targetName, key, value})

  - Clean document from your store:
 **cleanData**({targetName})
 
 - Clean all documents from your store:
 **cleanDocuments**()
 ---
### cloudCodeActions:

 - GET Document from server:
	**fetchData**({functionName, targetName, params, digTodata})
	
  - Clean cloudCode from your store:
 **cleanData**({targetName})
 
 - Clean all codes code from your store:
 **cleanCloudsCode**()
---
### View to Your redux store:
we use [immutable-js](https://facebook.github.io/immutable-js/) and [reselect](https://github.com/reduxjs/reselect)
```
parse:{
	collections: {
		myProducts: {
			status: 'FETCH_FINISHED',
			error: null,
			loading: false,
			data: [....],
			info: {
				schemaName : '',
				query: {...},
				skip: 0,
				enableCount: false,
				keys,
				include,
				order,
				limit,
				count,
				timestamp
			}
		}
	},
  documnets: {...},
  clodeCodes: {...}
	
}
```

## Selectors - the easy way to find what you want inside the store.
example:
```
import { selectors } from  'react-parse';

const  mapStateToProps  = (state) => {
return {
	products:  selectors.selectCollectionData(state, 'TARGET_NAME'),
	showLoader:  selectors.selectCollectionLoading(state, 'TARGET_NAME'),
	isError: selectors.selectCollectionError(state, 'TARGET_NAME')	
}

};
```
### selector list:
- Collection:
 1. selectCollections(state)
 2. selectCollectionData(state, 'TARGET_NAME')
 3. selectCollectionLoading(state, 'TARGET_NAME')
 4. selectCollectionInfo(state, 'TARGET_NAME')
 5. selectCollectionStatus(state, 'TARGET_NAME')
 6. selectCollectionError(state, 'TARGET_NAME')
 7. selectCollectionCount(state, 'TARGET_NAME')
- Documnet:
 8. selectDocuments(state)
 9. selectDocumentData(state, 'TARGET_NAME')
 10. selectDocumentLoading(state, 'TARGET_NAME')
 11. selectDocumentInfo(state, 'TARGET_NAME')
 12. selectDocumentStatus(state, 'TARGET_NAME')
 13. selectDocumentError(state, 'TARGET_NAME')
- Clode code:
 14. selectCloudCodes(state)
 15. selectCloudCodeData(state, 'TARGET_NAME')
 16. selectCloudCodeLoading(state, 'TARGET_NAME')
 17. selectCloudCodeInfo(state, 'TARGET_NAME')
 18. selectCloudCodeStatus(state, 'TARGET_NAME')
 19. selectCloudCodeError(state, 'TARGET_NAME')

### status enum:
```
// FETCH

'FETCH_START','FETCH_FAILED','FETCH_FAILED_NETWORK','FETCH_FINISHED'

// POST

'POST_START','POST_FAILED','POST_FAILED_NETWORK','POST_FINISHED'

// DELETE

'DELETE_START','DELETE_FAILED','DELETE_FAILED_NETWORK','DELETE_FINISHED'

// PUT

'PUT_START','PUT_FAILED','PUT_FAILED_NETWORK','PUT_FINISHED'
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

## Component provider

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
