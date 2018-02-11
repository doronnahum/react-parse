import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';
import * as parseActions from '../parse/actions/collections';
import {
  getCollectionData,
  getCollectionStatus,
  getCollectionInfo,
} from '../parse/selectors/collections';
import consts from '../types';

import {
  isCreateFinish,
  isDeleteFinish,
  isParamsChanged,
  isDataChanged,
  isQueryStatusChanged,
  isUpdateFinish,
  isCollectionParamsChanged as isParamsChanged
} from './methods/statusChecker'

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
    if(!collectionName) return
    if ( localFirst || (localFirst && !data)) {
      this.getDataFromServer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isParamsChanged(nextProps)) {
      this.getDataFromServer(nextProps);
    }
    if (isGetFinish(this.props, nextProps)) {
      this.props.onGetFinish({
        queryStatus: nextProps.queryStatus,
        data: nextProps.data,
        info: nextProps.info,
      });
    } else if (isDeleteFinish(this.props, nextProps)) {
      this.getDataFromServer(nextProps);
      this.props.onDeleteDocumentFinish(nextProps.queryStatus);
    } else if (isUpdateFinish(nextProps)) {
      this.getDataFromServer(nextProps);
      this.props.onPutDocumentFinish(nextProps.queryStatus);
    }
  }

  componentWillUnmount() {
    if (this.props.leaveClean) {
      this.removerDataFromStore();
    }
  }

  onDeleteDocument(objectId) {
    const {queryStatus, actions, collectionName, targetName} = this.props
    if (!objectId) {
      console.warn('onDeleteDocument: missing objectId ');
      return;
    }
    if (queryStatus === consts.DELETE_START){
      return;
    }
    actions.deleteDocumentFromCollection(
      collectionName,
      targetName,
      objectId,
    );
  }

  onUpdateDocument(objectId, data) {
    const { actions, collectionName, targetName} = this.props
    if (!objectId) {
      console.warn('onUpdateDocument: missing objectId ');
      return;
    }
    if (!data || typeof data !== 'object') {
      console.warn('onUpdateDocument: missing data object ');
      return;
    }
    actions.updateDocumentFromCollection(
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
    if (localOnly || !props.collectionName) return;
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
    const deleteDocument = this.onDeleteDocument;
    const updateDocument = this.onUpdateDocument;
    const refreshData = this.onRefreshData;
    return this.props.render({
      data,
      queryStatus,
      info,
      refreshData,
      deleteDocument,
      updateDocument,
    });
  }
}

function mapStateToProps(state, props) {
  const keyForData = props.targetName || props.collectionName;
  return {
    data: getCollectionData(state, keyForData),
    queryStatus: getCollectionStatus(state, keyForData),
    info: getCollectionInfo(state, keyForData),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...parseActions }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FetchCollection);
FetchCollection.propTypes = {
  collectionName: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    updateDocumentFromCollection: PropTypes.func,
    deleteDocumentFromCollection: PropTypes.func,
    clearCollection: PropTypes.func,
    getCollection: PropTypes.func,
  }).isRequired,
  render: PropTypes.func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
  targetName: PropTypes.string,
  query: PropTypes.shape({}),
  data: PropTypes.array,
  include: PropTypes.string,
  queryStatus: PropTypes.string,
  keys: PropTypes.string,
  perPage: PropTypes.number,
  info: PropTypes.shape({
    count: PropTypes.number,
    timestamp: PropTypes.number,
    page: PropTypes.number,
    skip: PropTypes.number,
  }),
  page: PropTypes.number,
  enableCount: PropTypes.bool,
  onGetStart: PropTypes.func,
  onGetFinish: PropTypes.func,
  onDeleteDocumentFinish: PropTypes.func,
  onPutDocumentFinish: PropTypes.func,
  filterByMemberId: PropTypes.bool,
  leaveClean: PropTypes.bool,
  localFirst: PropTypes.bool, // get data from server only if data didn't found in store
  localOnly: PropTypes.bool, // get data only from local store
  memberFieldName: PropTypes.string,
};

FetchCollection.defaultProps = {
  query: null,
  include: null,
  queryStatus: null,
  info: null,
  data: null,
  keys: null,
  page: null,
  filterByMemberId: null,
  localFirst: false,
  localOnly: false,
  perPage: 25,
  memberFieldName: 'member',
  enableCount: false,
  leaveClean: true,
  targetName: null,
  onGetFinish: () => {},
  onGetStart: () => {},
  onDeleteDocumentStart: () => {},
  onDeleteDocumentFinish: () => {},
  onPutDocumentStart: () => {},
  onPutDocumentFinish: () => {},
};
