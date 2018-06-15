
<img align="right" width="75" height="75"
     title="Size Limit logo" src="./logo.svg">

React Parse
======================
<a href='https://twitter.com/intent/tweet?text=Happy%20to%20share,%20If%20you%20are%20using%20react%20and%20parse%20server%20please%20check%20react-parse&url=https://github.com/doronnahum/react-parse&hashtags=react,react-native,saga,redux,parse-server,immutable-js,reselect'>
<img align="left" width="auto" height="auto" src="https://img.shields.io/twitter/url/http/shields.io.svg">
</a> 
<br />
React Parse is a set of actions and saga watchers that make your life easy to Get, POST, PUT, DELETE data on the server, you can fetch the data with our selectors from your redux store.

React Parse include 3 data provider components, to make the life even easier and let you get a collection from the server in less than 1 minute with the ability to filter result, create a new document and more...


### Helpful only for react and react-native apps with parse server and redux as management

## Table of content

- [Installation](#installation)
- [Examples](#examples) 
	- [Collection](#collection)
	-  [FetchCollectionExample](#fetchcollectionexample)
- [Actions](#actions) 
	- [CollectionActions](#collectionactions)
	- [DocumentActions](#documentactions)
	- [CloudCodeActions](#cloudcodeactions)
- [Selectors](#selectors) 
	- [CollectionSelectors](#collectionselectors)
	- [DocumentSelectors](#documentselectors)
	- [CloudCodeSelectors](#cloudcodeselectors)
- [dataProviders](#dataproviders) 
	- [FetchProps - response from dataProviders](#fetchprops)
	- [FetchCollection](#fetchcollection)
	- [FetchDocument](#fetchdocument)
	- [FetchDocument](#fetchdocument)
-  [State](#state)
-  [Enum](#enum)
-  [Logger](#logger)
- [Global Loader](#loader)

## Installation
1- install
```
npm i react-parse --save
```
2- Add  to rootReducers 
```
import {parseReducer} from 'react-parse';
const rootReducers = combineReducers({
  ...., // Important - keep the key 'parse' and not something else
  parse: parseReducer
});
```
3- Add to rootSaga
```
import {parseWatcher} from 'react-parse'
function* rootSaga() {
  yield all([
	...,
    call(parseWatcher, 'parseWatcher'),
	]);
}
```
4 - Init react-parse at your root component
```
import {config as reactParseConfig, setReactParseDispatch} from 'react-parse'

const apiConfig = { baseURL: envConfig.SERVER_URL, appId: envConfig.PARSE_ID }

reactParseConfig.init(apiConfig);
setReactParseDispatch(store.dispatch);
```
5- on login, inject sessionToken
```
import {config as reactParseConfig } from 'react-parse'
reactParseConfig.setSessionToken('Tg4545gffgf55');
```
6- on logout - remove sessionToken 
```
import {config as reactParseConfig } from 'react-parse'
reactParseConfig.removeSessionToken();
```


## Examples
### Collection
Get prodcuts from server by using collections actions and s
```
import { selectors, actions} from 'react-parse';

const TARGET_NAME = 'ProdctList'
class ReactParseExample extends React.Component {
	  componentWillMount() {
	  // This Will Fetch The data from server
	   actions.collectionActions.fetchData({ targetName: TARGET_NAME , schemaName:  'Prodcts' })
	  }
    render() {
	const {prodcts, isLoading} = this.props
    return (
    <MyComponent
	    prodcts={prodcts}
	    showLoader={isLoading}
	    onNewProduct={(data)=>
		    actions.collectionActions.postDoc({
			    targetName: TARGET_NAME , schemaName:  'Prodcts', data)}
	    />
    )
}}

const mapStateToProps = (state) => {
  return {
    prodcts: selectors.selectCollectionData(state, TARGET_NAME ),
    isLoading: selectors.selectCollectionLoading(state, 'TARGET_NAME ),
  }
};
```
### FetchCollectionExample
Fetch data with data provider component
### fetch -  Fetch data with data provider example
```
import {FetchCollection} from  'react-parse'

class ReactParseExample extends React.Component { 
	render() {
		return (
			<FetchCollection 
				schemaName={schemaName}
				targetName={targetName}
				// pass your component
				component={MyTable} // MyTable will render with all props on FetchCollection  and with fetchPRops object
				// or use render props technique
				render={(props) => <MyTable ...props/>}
			/>
		)
	}
}
/* comment
	fecthProps ={data,error,status,info,isLoading,refresh,deleteDoc,put,post}
*/
```
## Actions
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
|logger|object|pass to your Logger relevant info |
---
### import all actions
```
import { actions } from  'react-parse';
```
### collectionActions:
```
import { collectionActions } from  'react-parse';
const TARGET_NAME = 'ProdctList
```

 - GET collection from server:
	**fetchData**({schemaName, targetName, query, limit, skip, include, keys, enableCount, logger})
	
 - POST  document
 **postDoc**({schemaName, targetName, data, autoRefresh, logger})
 
  - PUT document
 **putDoc**({schemaName, targetName, objectId, data, autoRefresh, logger})
 
   - DELETE document
 **deleteDoc**({schemaName, targetName, objectId, autoRefresh, logger})
 
 - Refresh your data
 **refreshCollection**({targetName})
 
  - Clean collection from your store:
 **cleanData**({targetName})
 
 - Clean all collections from your store:
 **cleanCollections**()
 ---
### documentActions:
```
import { documentActions } from  'react-parse';
```

 - GET Document from server:
	**fetchData**({schemaName, targetName, objectId, include, keys, logger})
	
 - POST  document
 **postDoc**({schemaName, targetName, data, logger})
 
  - PUT document
 **putDoc**({schemaName, targetName, objectId, data, logger})
 
   - DELETE document
 **deleteDoc**({schemaName, targetName, objectId, logger})
 
   - Update local data
 **updateField**({targetName, key, value, logger})

  - Clean document from your store:
 **cleanData**({targetName})
 
 - Clean all documents from your store:
 **cleanDocuments**()
 ---
### cloudCodeActions:
```
import { cloudCodeActions } from  'react-parse';
```

 - GET Document from server:
	**fetchData**({functionName, targetName, params, digTodata, logger})
	
  - Clean cloudCode from your store:
 **cleanData**({targetName})
 
 - Clean all codes code from your store:
 **cleanCloudsCode**()
---
## Selectors
```
import { selectors } from  'react-parse';
// or
import { cloudCodeSelectors, collectionSelectors, documentSelectors } from  'react-parse';
```

the easy way to find what you want inside the store.
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
### CollectionSelectors
 1. selectors .selectCollections(state)
 2. selectors .selectCollectionData(state, 'TARGET_NAME')
 3. selectors .selectCollectionLoading(state, 'TARGET_NAME')
 4. selectors .selectCollectionInfo(state, 'TARGET_NAME')
 5. selectors .selectCollectionStatus(state, 'TARGET_NAME')
 6. selectors .selectCollectionError(state, 'TARGET_NAME')
 7. selectors .selectCollectionCount(state, 'TARGET_NAME')
### DocumentSelectors
 1. selectors .selectDocuments(state)
 2. selectors .selectDocumentData(state, 'TARGET_NAME')
 3. selectors .selectDocumentLoading(state, 'TARGET_NAME')
 4. selectors .selectDocumentInfo(state, 'TARGET_NAME')
 5. selectors .selectDocumentStatus(state, 'TARGET_NAME')
 6. selectors .selectDocumentError(state, 'TARGET_NAME')
### CloudCodeSelectors
 1. selectors .selectCloudCodes(state)
 2. selectors .selectCloudCodeData(state, 'TARGET_NAME')
 3. selectors .selectCloudCodeLoading(state, 'TARGET_NAME')
 4. selectors .selectCloudCodeInfo(state, 'TARGET_NAME')
 5. selectors .selectCloudCodeStatus(state, 'TARGET_NAME')
 6. selectors .selectCloudCodeError(state, 'TARGET_NAME')


## dataProviders

Data provider components.
Seamlessly bring Parse data into your Component with the ability to POST, PUT, DELETE from your component without connecting your component to store or run any action. all is in your props

### FetchProps
Data provider component will render you component with all the props you pass to the dataComponent and with fetchProps object.
fetchProps include :
- data - response from the server
- error - error object from query
- status - one of the [enum](#enum)
- info - info about your query  {timestamp, query,skip,limit,objectid and more...}
- refresh - method, run to refresh data
	- fetchProps .refresh()
- cleanData - method, run to clean data from store
	- fetchProps .cleadData()
- put- method, run to update the document
	-  fetchProps .put({title: 'newTitle', body: 'newBody'})
- post- method, run to create document,
	- fetchProps .post({title: 'newDoc', body: 'ddd'...})
- updateField - method on FetchDocumnet to update filed in store
	- fetchProps .updateField('title', 'new Title)

#### FetchDocument:
With `FetchDocument` you can get specific document by collection name and objectId

```sh
import {FetchDocument} from 'react-parse'
....
<FetchDocument 
	schemaName='Post'
	targetName='LastPost'
	objectId={'blDxFXA9Wk'
	component={MyComponent} // or user render={(props)=> <MyComponent ...props/>}
	// optional:
	keys=''
	include=''
	onFetchEnd={(error, {data, queryStatus})=>{}}
	onPostEnd={(error, {data, queryStatus})=>{}}
	onPutEnd={(error, {data, queryStatus})=>{}}
	onDeleteEnd={(error, {data, queryStatus})=>{}}
	leaveClean={true} // remove data from store on componentWillUnmount
	localFirst={false} // fetch data from server only if we can found your data on local store
	localOnly={false} // never fetch data from server, only find in store
	autoRefresh={false} // Fetch data after each create/update/delete doc
	// Want to pass somting to your component, add here
	userName: 'Ploni' // example
/>
``` 
- if the objectId  is empty then use updateField and we save your inputs in the store, then you can use post method from your component and new doc will create for you in the server, the new doc id will be inside info
#### FetchCollection:
With `FetchCollection` you can get list of document by collection name 
```sh
import {FetchCollection} from 'react-parse'
....
<FetchCollection 
	schemaName='Post'
	targetName='LastPost'
	component={MyComponent} // or user render={(props)=> <MyComponent ...props/>}
	// optional:
	keys=''
	include=''
	onFetchEnd={(error, {data, queryStatus})=>{}}
	onPostEnd={(error, {data, queryStatus})=>{}}
	onPutEnd={(error, {data, queryStatus})=>{}}
	onDeleteEnd={(error, {data, queryStatus})=>{}}
	leaveClean={true} // remove data from store on componentWillUnmount
	localFirst={false} // fetch data from server only if we can found your data on local store
	localOnly={false} // never fetch data from server, only find in store
	autoRefresh={false} // Fetch data after each create/update/delete doc
	query={object} // 	http://docs.parseplatform.org/rest/guide/#queries
	order='' // default is '-createdAt', Specify a field to sort by
	skip={12} // skip first 12 documents
	limit={50} // limit query to 50 documents
	enableCount={true} return the amount of results in db
	
	// Want to pass somting to your component, add here
	userName: 'Ploni' // example
/>
```
#### FetchCloudCode:
With `FetchCloudCode` you can get list of document by collection name 
```sh
import {FetchCloudCode} from 'react-parse'
....
<FetchCloudCode 
	functionName='GetPosts'
	params={object} // cloud code params
	targetName='GetPostsCloud'
	component={MyComponent} // or user render={(props)=> <MyComponent ...props/>}
	// optional:
	onFetchEnd={(error, {data, queryStatus})=>{}}
	leaveClean={true} // remove data from store on componentWillUnmount
	localFirst={false} // fetch data from server only if we can found your data on local store
	localOnly={false} // never fetch data from server, only find in store
	
	// Want to pass somting to your component, add here
	userName: 'Ploni' // example
/>
```
### State
View to Your redux store:
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
### Enum:
```
import {constants} from  'react-parse'
```
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

## Logger
First set the callbacks with setLoggerHandlers 
in each query your call back will run with => (type, action, status)
- type - one of ['CLOUD_CODE', 'GET', 'POST', 'PUT', 'DELETE']
- action- action object , you can use action.logger to custom call back behavior
- status - one of react-parse status, you can find them in status enum

```
import {setLoggerHandlers} from 'react-parse'

setLoggerHandlers({
	onSuccess: (type, action, status)  => {
	 console.log('Send notification or something else:', type, action, status)
	},
		onError: (type, action, status)  => {
	 console.log('Send notification or something else:', type, action, status)
	}
})
```

## loader
need a global loader?
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
