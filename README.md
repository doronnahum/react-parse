# `react-parse`
data provider components for [react](https://reactjs.org) and [react-native](https://facebook.github.io/react-native/) apps with [parse-server](hhttps://github.com/parse-community/parse-server) that using [redux+saga](https://github.com/redux-saga/redux-saga).
read about [render props](https://reactjs.org/docs/render-props.html) pattern.

### Way i need this
this components help you to get data from server or create/update data on server without writing any code except your ui.
tell the component what you want and pass function that return component to render on the screen, you component get all waht you need:
  - query status- LOADING, SUCCESS, ERROR
  - data
  - refreshMethod - run this methos and the query to server run again and you get refresh data...
there are alot of option that help you build faster and smarter, check our [documentation](https://doronnahum.github.io/react-parse/):


#### Document Exapmle:
With `FetchDocument` you can get specific document by collection name and objectId
```sh
<FetchDocument collectionName='Post' objectId={'blDxFXA9Wk'} render={(res) => <MyComponent {...res}/>} />
```
Want to update the title of the document?
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
