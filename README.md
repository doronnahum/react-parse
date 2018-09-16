


<img align="right" width="75" height="75"
     title="Size Limit logo" src="./logo.svg">

React Parse
======================
<a href='https://twitter.com/intent/tweet?text=Happy%20to%20share,%20If%20you%20are%20using%20react%20and%20parse%20server%20please%20check%20react-parse&url=https://github.com/doronnahum/react-parse&hashtags=react,react-native,saga,redux,parse-server,immutable-js,reselect'>
<img align="left" width="auto" height="auto" src="https://img.shields.io/twitter/url/http/shields.io.svg">
</a> 
React Parse is a set of actions and saga watchers that make your life easy to Get, POST, PUT, DELETE data on the server, you can fetch the data with our selectors from your redux store.

React Parse include 3 data provider components, to make the life even easier and let you get a collection from the server in less than 1 minute with the ability to filter result, create a new document and more...


### Helpful only for react and react-native apps with parse server and redux as management

### Demo
[![Edit zxn5nrjlz3](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zxn5nrjlz3?module=%2Fsrc%2FMain.js)
## Table of content

- [Installation](#installation)
- [Examples](#examples) 
	- [CollectionActionsExample](#collectionactionsexample)
	-  [FetchCollectionExample](#fetchcollectionexample)
- [Actions](#actions)  
	- [How to use](#how-to-use)
	- [Payload options](#payload)
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
	- [FetchCloudCode](#fetchcloudcode)
-  [State](#state)
-  [Enum](#enum)
-  [Logger](#logger)
- [Global Loader](#loader)
- [Clean State](#cleanstate)

## Installation

# How to install

Install with NPM: 

```bash
npm i react-parse --save
```

## 1 - Inside your root component:

Set react-parse inside your root component:

```bash
import { config as reactParseConfig, setReactParseDispatch } from 'react-parse'

const apiConfig = { baseURL: envConfig.SERVER_URL, appId: envConfig.PARSE_ID }

reactParseConfig.init(apiConfig);
setReactParseDispatch(store.dispatch);
```

### After the user logs in - set the user's token:

```bash
reactParseConfig.setSessionToken('userSessionToken')
```

### After the user logs out - clear the token:
```bash
reactParseConfig.removeSessionToken()
```

## 2 - With Redux - add `parseReducer` to your your rootReducer

```bash
import { parseReducer } from 'react-parse';
const rootReducers = combineReducers({
  ....,
  parse: parseReducer,
});
```

## 3 - With Redux-Saga, add `parseWatcher` to your root saga
```bash
import { parseWatcher } from 'react-parse'
function* rootSaga() {
  yield all([
	...,
    call(parseWatcher, 'parseWatcher'),
	]);
}
```

### Now let see how you can fetch your products without writing any new action, reducer, saga worker..

## Examples

### FetchCollectionExample
Fetch collection data with data provider component

```jsx
import {FetchCollection} from  'react-parse'
const TARGET_NAME = 'activeProducts'

class ReactParseExample extends React.Component { 
	render() {
		return (
			<FetchCollection 
				schemaName={'Product'}
				targetName={TARGET_NAME}
				query={{isActive: true}}
				userName='Dan'
				render={(props) => <MyTable {...props}/>}
			/>
		)
	}
}
/*
MyTable will get props from FetchCollection, MyTable props will be:
const {schemaName, targetName, userName, fetchProps} = this.props
const {data,error,status,info,isLoading,refresh,deleteDoc,put,post} = fetchProps
*/
```
### We can do the same thing with react-parse actions
### CollectionActionsExample

Get Products from server by using collections actions and selectors

```jsx
import { selectors, actions} from 'react-parse';

const TARGET_NAME = 'ProductList'
class ReactParseExample extends React.Component {
	  componentWillMount() {
		  actions.collectionActions.fetchData({ targetName: TARGET_NAME , schemaName:  'Product' });
	  }
    render() {
		const { products, isLoading} = this.props;
	    return (<div....);
}	}

const mapStateToProps = (state) => {
  return {
    products: selectors.selectCollectionData(state, TARGET_NAME ),
    isLoading: selectors.selectCollectionLoading(state, TARGET_NAME ),
  };
}
```
## Actions
### How to use

import actions from react-parse
```jsx
import {  collectionActions, cloudCodeActions, documentActions } from 'react-parse';
```
inside your component you can call an action like that:
```jsx
documentActions.fetchData({....})
```
all the action are wrapped with dispatch then you didn't need to bind a dispatch to call an action.

If you want to use:
 - Call the action with dispatch
 - Use bindActionCreators 
 - Put an action from saga

You need to use action without our dispatch wrapper.
for this, you need the call action with prefix **pure\_**

**For example-**
```jsx
// my-saga-file.js
import { put, select } from  'redux-saga/effects';
import { documentActions } from 'react-parse';

export  default  function*  fetchMember() {
	yield  put(documentActions.pure_fetchData({...}));
}
```
### payload


action payload options

| key | type | info |
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
|filesIncluded|boolean|set true if your data include files to upload|
|fileValueHandler|function|pass function that will get the new file URL if you didn't want to save it as File object|
|dispatchId|string| optional, you can pass some unique key to help you follow specific query status |
boomerang|any| You can transfer anything and it will come back to you with data providers callbacks. this is just data that can help you manage your stuff
onSuccess| function| onSuccess will be called on query end successfully with this parameter ({type, action, status, res}) <br/> *res is the network response
onError| function| onError will be called on query end successfully with this parameter ({type, action, status, res}) <br/> *res is the network response

---
### import all actions
```jsx
import { actions } from  'react-parse';
// use like that: actions.collectionActions.fetchData(...)
```

### collectionActions:
```jsx
import { collectionActions } from  'react-parse';
// use like that: collectionActions.fetchData(...)
```

 - GET collection from server:
	**fetchData**({schemaName, targetName, query, limit, skip, include, keys, enableCount, logger, dispatchId, boomerang})
	
 - POST  document
 **postDoc**({schemaName, targetName, data, autoRefresh, logger, filesIncluded, fileValueHandler, dispatchId, boomerang})
 
 - PUT document
 **putDoc**({schemaName, targetName, objectId, data, autoRefresh, logger, filesIncluded, fileValueHandler, dispatchId, boomerang})
 
 - DELETE document
 **deleteDoc**({schemaName, targetName, objectId, autoRefresh, logger, dispatchId, boomerang})
 
 - Refresh your data
 **refreshCollection**({targetName, dispatchId})
 
 - Clean collection from your store:
 **cleanData**({targetName})
 
 - Clean all collections from your store:
 **cleanCollections**()
 ---

### DocumentActions:
```bash
import { documentActions } from  'react-parse';
```

 - GET Document from server:
	**fetchData**({schemaName, targetName, objectId, include, keys, logger, dispatchId, boomerang})
	
 - POST  document
 **postDoc**({schemaName, targetName, data, logger, filesIncluded, fileValueHandler, dispatchId, boomerang})
 
 - PUT document
 **putDoc**({schemaName, targetName, objectId, data, logger, filesIncluded, fileValueHandler, dispatchId, boomerang})
 
 - DELETE document
 **deleteDoc**({schemaName, targetName, objectId, logger, dispatchId, boomerang})
 
 - Update local data
 **updateField**({targetName, key, value, logger})
 
  - Update local data
 **updateFields**({targetName,  data, logger})

 - Clean document from your store:
 **cleanData**({targetName})
 
 - Clean all documents from your store:
 **cleanDocuments**()
 ---

### CloudCodeActions:
```bash
import { cloudCodeActions } from  'react-parse';
```

 - GET Document from server:
	**fetchData**({functionName, targetName, params, digToData, logger, dispatchId, boomerang})
	
 - Clean cloudCode from your store:
 **cleanData**({targetName})
 
 - Clean all codes code from your store:
 **cleanCloudsCode**()
---
### Selectors

```bash
import {selectors} from 'react-parse'
```

### CollectionSelectors
 1. selectors.selectCollections(state) // return you all the collection from state.parse.collections
 2. selectors.selectCollectionData(state, 'TARGET_NAME') // return you the data by targetName
 3. selectors.selectCollectionLoading(state, 'TARGET_NAME') // return true if query is loading
 4. selectors.selectCollectionInfo(state, 'TARGET_NAME') // return query info by targetName
 5. selectors.selectCollectionStatus(state, 'TARGET_NAME') // return query status by targetName
 6. selectors.selectCollectionError(state, 'TARGET_NAME') // return query error by targetName
 7. selectors.selectCollectionCount(state, 'TARGET_NAME') // return the quantity of results by targetName
 8. selectors.selectCollectionDispatchId(state, 'TARGET_NAME') // return the dispatchId of the current/last query
 9. selectors.selectCollectionBoomerang(state, 'TARGET_NAME') // return your  last Boomerang data
### DocumentSelectors
 1. selectors.selectDocuments(state)
 2. selectors.selectDocumentData(state, 'TARGET_NAME')
 3. selectors.selectDocumentLoading(state, 'TARGET_NAME')
 4. selectors.selectDocumentInfo(state, 'TARGET_NAME')
 5. selectors.selectDocumentStatus(state, 'TARGET_NAME')
 6. selectors.selectDocumentError(state, 'TARGET_NAME')
 7. selectors.selectDocumentDispatchId(state, 'TARGET_NAME')
 8. selectors.selectDocumentBoomerang(state, 'TARGET_NAME')
### CloudCodeSelectors
 1. selectors.selectCloudCodes(state)
 2. selectors.selectCloudCodeData(state, 'TARGET_NAME')
 3. selectors.selectCloudCodeLoading(state, 'TARGET_NAME')
 4. selectors.selectCloudCodeInfo(state, 'TARGET_NAME')
 5. selectors.selectCloudCodeStatus(state, 'TARGET_NAME')
 6. selectors.selectCloudCodeError(state, 'TARGET_NAME')
 7. selectors.selectCloudCodeDispatchId(state, 'TARGET_NAME')


## dataProviders

Data provider components.
Seamlessly bring Parse data into your Component with the ability to POST, PUT, DELETE from your component without connecting your component to store or run any action. all is in your props

### FetchProps
Data provider component will render you component with all the props you pass to the dataComponent and with fetchProps object.

> fetchProps is the default key but you can set your key, just pass fetchPropsKey inside dataProviders
> <   [FetchCollection](https://stackedit.io/app#fetchcollection) fetchPropsKey='res'

fetchProps include :
- data - response from the server
- error - error object from query
- status - one of the [enum](#enum)
- info - info about your query  {timestamp, query,skip,limit,objectId, ...}
- isLoading- boolean value
- refresh - method, run to refresh data
	- fetchProps.refresh()
- cleanData - method, run to clean data from store
	- fetchProps.cleanData()
- put- method, run to update the document
	-	 from FetchCollection => fetchProps.put('DOC_OBJECT_ID',{title: 'newTitle', body: 'newBody'},filesIncluded, fileValueHandler, dispatchId)
	-  from FetchDocument => fetchProps.put({title: 'newTitle', body: 'newBody'},filesIncluded, fileValueHandler, dispatchId, boomerang)
- post- method, run to create document,
	-	 from FetchCollection => fetchProps.post('DOC_OBJECT_ID',{title: 'newTitle', body: 'newBody'},filesIncluded, fileValueHandler, dispatchId, boomerang)
	-  from FetchDocument => fetchProps.post({title: 'newTitle', body: 'newBody'},filesIncluded, fileValueHandler, dispatchId, boomerang)
- deleteDoc- method, run to delete document,
	-	 from FetchCollection => fetchProps.deleteDoc('DOC_OBJECT_ID', dispatchId, boomerang)
	-  from FetchDocument => fetchProps.deleteDoc(, dispatchId)
- updateField - method on FetchDocument to update filed in store
	- fetchProps.updateField('title', 'new Title)

#### FetchDocument:
With `FetchDocument` you can get specific document by collection name and objectId

```jsx
import {FetchDocument} from 'react-parse'
....
<FetchDocument 
	schemaName='Post'
	targetName='LastPost'
	objectId='blDxFXA9Wk'
	component={MyComponent} // or user render={(props)=> <MyComponent ...props/>}
	// optional:
	keys='title,body,owner'
	include='Owner'
	onFetchEnd={({error, status, data, info })=>{}}
	onPostEnd={({error, status, data, info, boomerang })=>{}}
	onPutEnd={({error, status, data, info, boomerang })=>{}}
	onDeleteEnd={({error, status, data, info, boomerang })=>{}}
	leaveClean={true} // remove data from store on componentWillUnmount
	localFirst={false} // fetch data from server only if we can found your data on local store
	localOnly={false} // never fetch data from server, only find in store
	autoRefresh={false} // Fetch data after each create/update/delete doc
	dataHandler={data => data} // Function to manipulate the data before set to store. 
	initialValue={{title: 'default title'}}
	// Want to pass something to your component, add here
	userName='Dan' // MyComponent will get this.props.userName
/>
``` 
- if the objectId  is empty then use updateField and we save your inputs in the store, then you can use post method from your component and new doc will create for you in the server, the new doc id will be inside info
#### FetchCollection:
With `FetchCollection` you can get list of document by collection name 
```jsx
import {FetchCollection} from 'react-parse'
....
<FetchCollection 
	schemaName='Post'
	targetName='LastPost'
	component={MyComponent} // or user render={(props)=> <MyComponent ...props/>}
	// optional:
	keys=''
	include=''
	onFetchEnd={({error, status, data, info })=>{}}
	onPostEnd={({error, status, data, info, boomerang })=>{}}
	onPutEnd={({error, status, data, info, boomerang })=>{}}
	onDeleteEnd={({error, status, data, info, boomerang })=>{}}
	leaveClean={true} // remove data from store on componentWillUnmount
	localFirst={false} // fetch data from server only if we can found your data on local store
	localOnly={false} // never fetch data from server, only find in store
	autoRefresh={false} // Fetch data after each create/update/delete doc
	query={object} // 	http://docs.parseplatform.org/rest/guide/#queries
	order='' // default is '-createdAt', Specify a field to sort by
	skip={12} // skip first 12 documents
	limit={50} // limit query to 50 documents
	enableCount={true} // return the amount of results in db
	dataHandler={data => data} // Function to manipulate the data before set to store. 
	// Want to pass something to your component, add here
	userName='Dan' // example
/>
```
#### FetchCloudCode:
With `FetchCloudCode` you can get list of document by collection name 
```jsx
import {FetchCloudCode} from 'react-parse'
....
<FetchCloudCode 
	functionName='GetPosts'
	params={object} // cloud code params
	targetName='GetPostsCloud'
	component={MyComponent} // or user render={(props)=> <MyComponent ...props/>}
	// optional:
	onFetchEnd={({error, status, data, info, boomerang })=>{}}
	leaveClean={true} // remove data from store on componentWillUnmount
	localFirst={false} // fetch data from server only if we can found your data on local store
	localOnly={false} // never fetch data from server, only find in store
	dataHandler={data => data} // Function to manipulate the data before set to store. 
	// Want to pass something to your component, add here
	userName='Dan' // example
/>
```
### State
View to Your redux store:
we use [immutable-js](https://facebook.github.io/immutable-js/) and [reselect](https://github.com/reduxjs/reselect)
```jsx
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
  documents: {...},
  cloudCodes: {...}
	
}
```
### Enum:
```bash
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
```bash
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

## CleanState

Need to clean the state ?

 - Option 1
 Add lister to your logout action type:
	 ```
	 import {setClearStateActionType} from 'react-parse
	 setClearStateActionType('USER_LOGOUT')
	 ```
 - Option 2
 Call react-parse cleanAllState action
	 ```
	 import {cleanAllState} from 'react-parse
	 cleanAllState()
	 ```
- Option 3
dispatch action with this type 'CLEAN_ALL_PARSE_STATE'

 # Contribute
You can help improving this project sending PRs and helping with issues.  

