import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  deleteDocumentFromCollection as deleteDocument,
  updateDocumentFromCollection as updateDocument,
  clearCollection,
  getCollection,
} from './actions';
import {
  getData,
  getStatus,
  getInfo,
} from './selectors';
import consts from '../types';

import {
  isGetFinish,
  isDeleteFinish,
  isUpdateFinish,
  isCollectionParamsChanged as isParamsChanged
} from '../helpers/statusChecker';

import {defaultProps, propTypes} from './prop-types';

class FetchCollection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.onDeleteDocument = this.onDeleteDocument.bind(this);
    this.onUpdateDocument = this.onUpdateDocument.bind(this);
    this.onRefreshData = this.onRefreshData.bind(this);
  }

  componentWillMount() {
    const { localFirst, collectionName, data } = this.props;
    if(!collectionName) {
      return; 
    }
    
    if (localFirst || (localFirst && !data)) {
      this.getDataFromServer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isParamsChanged(nextProps)) {
      this.getDataFromServer(nextProps);
    }
    this.handleCallBacks(this.props, nextProps);
  }
  handleCallBacks(props, nextProps) {
    if (isGetFinish(props, nextProps)) {
      props.onGetFinish({
        queryStatus: nextProps.queryStatus,
        data: nextProps.data,
        info: nextProps.info,
      });
    } else if (isDeleteFinish(props, nextProps)) {
      this.getDataFromServer(nextProps);
      props.onDeleteDocumentFinish(nextProps.queryStatus);
    } else if (isUpdateFinish(nextProps)) {
      this.getDataFromServer(nextProps);
      props.onPutDocumentFinish(nextProps.queryStatus);
    }
  }

  componentWillUnmount() {
    if (this.props.leaveClean) {
      this.removerDataFromStore();
    }
  }

  onDeleteDocument(objectId) {
    const {queryStatus, actions, collectionName, targetName} = this.props;
    if (!objectId) {
      console.warn('onDeleteDocument: missing objectId ');
      return;
    }
    if (queryStatus === consts.DELETE_START) {
      return;
    }
    actions.deleteDocument(
      collectionName,
      targetName,
      objectId,
    );
  }

  onUpdateDocument(objectId, data) {
    const { actions, collectionName, targetName} = this.props;
    if (!objectId) {
      console.warn('onUpdateDocument: missing objectId ');
      return;
    }
    if (!data || typeof data !== 'object') {
      console.warn('onUpdateDocument: missing data object ');
      return;
    }
    actions.updateDocument(
      collectionName,
      targetName,
      objectId,
      data,
    );
  }

  onRefreshData() {
    this.getDataFromServer(this.props, false);
  }

  getDataFromServer(props = this.props, localOnly = this.props.localOnly) {
    if (localOnly || !props.collectionName) {
return;
}
    this.props.onGetStart();
    this.props.actions.getCollection({
      collectionName: props.collectionName,
      targetName: props.targetName,
      query: props.query,
      perPage: props.perPage,
      page: props.page,
      include: props.include,
      keys: props.keys,
      enableCount: props.enableCount,
    });
  }

  removerDataFromStore() {
    const keyForData = this.props.targetName || this.props.collectionName;
    this.props.actions.clearCollection(keyForData);
  }

  render() {
    const { data, queryStatus, info } = this.props;
    const refreshData = this.onRefreshData;
    return this.props.render({
      data,
      queryStatus,
      info,
      refreshData,
      deleteDocument: this.onDeleteDocument,
      updateDocument: this.onUpdateDocument,
    });
  }
}

function mapStateToProps(state, props) {
  const keyForData = props.targetName || props.collectionName;
  return {
    data: getData(state, keyForData),
    queryStatus: getStatus(state, keyForData),
    info: getInfo(state, keyForData),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ deleteDocument, updateDocument, clearCollection, getCollection  }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FetchCollection);
FetchCollection.propTypes = propTypes;

FetchCollection.defaultProps = defaultProps;
