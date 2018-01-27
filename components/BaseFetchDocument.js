import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash/isEqual';
import * as documentsActions from '../parse/actions/documents';
import * as localDocumentsActions from '../parse/actions/localDocuments';
import consts from '../types';
import {
  getDocumentStatus,
  getDocumentData,
  getNewDocumentData,
  getNewDocumentStatus,
} from '../parse/selectors/documents';

const {
  LOADING,
  CREATE_DOCUMENT_START,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_ERROR,
  DELETE_DOCUMENT_START,
  DELETE_DOCUMENT_FINISHED,
  DELETE_DOCUMENT_FAILED,
  UPDATE_DOCUMENT_START,
  UPDATE_DOCUMENT_FINISHED,
  UPDATE_DOCUMENT_FAILED,
} = consts;

class FetchDocument extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getDataFromServerIsRun = false;
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.onDeleteDocument = this.onDeleteDocument.bind(this);
    this.onChangeValueByKey = this.onChangeValueByKey.bind(this);
    this.onRefreshData = this.onRefreshData.bind(this);
    this.getQueryStatus = this.getQueryStatus.bind(this);
    this.onSave = this.onSave.bind(this);
    this.removerDataFromStore = this.removerDataFromStore.bind(this);
  }

  componentWillMount() {
    console.warn(this.props.localFirst);
    this.initialState();
  }
  componentWillReceiveProps(nextProps) {
    // Params from parent was changed
    if (this.isParamsChanged(nextProps)) {
      console.warn('params changed, initialState');
      this.initialState(nextProps);
    }
    // GET DATA FINISH
    if (this.isGetFinish(nextProps)) {
      this.getDataFromServerIsRun = false;
      this.props.onGetFinish({
        queryStatus: nextProps.queryStatus,
        data: nextProps.data,
      });
    }
    // CREATE DOCUMENT FINISH
    if (this.isCreateDocumentFinish(nextProps)) {
      this.props.onPostDocumentFinish({
        status: nextProps.queryStatus.status,
        objectId: nextProps.queryStatus.objectId,
        data: nextProps.queryStatus.data,
      });
    }
    // DELETE DOCUMENT FINISH
    if (this.isDeleteDocumentFinish(nextProps)) {
      this.props.onDeleteDocumentFinish(nextProps.queryStatus);
    }
    // UPDATE DOCUMENT FINISH
    if (this.isUpdateDocumentFinish(nextProps)) {
      this.props.onPutDocumentFinish(nextProps.queryStatus);
    }
  }
  // Clean data on Mount
  componentWillUnmount() {
    if (this.props.cleanDataOnComponentWillUnmount) {
      this.removerDataFromStore();
    }
  }
  onDeleteDocument() {
    const { objectId, collectionName } = this.props;
    if (objectId) {
      if (this.props.queryStatus === DELETE_DOCUMENT_START) return;
      this.props.onDeleteDocumentStart(objectId);
      this.props.actions.deleteDocumentFromServer(collectionName, objectId);
    } else {
      this.removerDataFromStore();
    }
  }
  onRefreshData() {
    this.getDataFromServer(null, false);
  }
  onSave() {
    const {
      collectionName,
      objectId,
      parseDataBeforeSave,
      addMemberPointerToDataOnPost,
      getDataWithPostFinishCallBack,
    } = this.props;
    if (objectId) {
      this.props.onPutDocumentStart();
      this.props.actions.updateDocumentOnServer(
        collectionName,
        objectId,
        null,
        null,
        parseDataBeforeSave,
      );
    } else {
      this.props.onPostDocumentStart();
      this.props.actions.postNewDocument(
        collectionName,
        this.props.uniqueId,
        parseDataBeforeSave,
        addMemberPointerToDataOnPost,
        getDataWithPostFinishCallBack,
      );
    }
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   if(this.isDataChanged(nextProps) || this.isQueryStatusChanged(nextProps) || this.isParamsChanged(nextProps)) {
  //     return true
  //   }
  //   return false
  // }

  onChangeValueByKey(key, value) {
    const { objectId } = this.props;
    if (objectId) {
      this.props.actions.updateDocumentOnStore(objectId, key, value);
    } else {
      this.props.actions.updateNewDocument(this.props.uniqueId, key, value);
    }
  }
  getDataFromServer(props = this.props, localOnly = this.props.localOnly) {
    if (!props) {
      props = this.props;
    }
    if (localOnly) return;
    const { collectionName, objectId, include } = props;
    if (!objectId || !collectionName) return;
    this.getDataFromServerIsRun = true;
    this.props.onGetStart();
    this.props.actions.getDocument(collectionName, objectId, include);
  }
  getQueryStatus(props = this.props) {
    const { objectId, queryStatus } = props;
    if (objectId) return queryStatus;
    const status = queryStatus ? queryStatus.status : null;
    return status;
  }
  removerDataFromStore() {
    if (this.props.objectId) {
      this.props.actions.removeDocument(this.props.objectId);
    } else {
      this.props.actions.removeNewDocument(this.props.uniqueId);
    }
  }
  isCreateDocumentFinish(nextProps) {
    return (
      this.getQueryStatus() === CREATE_DOCUMENT_START &&
      (this.getQueryStatus(nextProps) === CREATE_DOCUMENT_SUCCESS ||
        this.getQueryStatus(nextProps) === CREATE_DOCUMENT_ERROR)
    );
  }
  isDeleteDocumentFinish(nextProps) {
    return (
      this.props.queryStatus === DELETE_DOCUMENT_START &&
      (nextProps.queryStatus === DELETE_DOCUMENT_FINISHED ||
        nextProps.queryStatus === DELETE_DOCUMENT_FAILED)
    );
  }
  isUpdateDocumentFinish(nextProps) {
    return (
      this.props.queryStatus === UPDATE_DOCUMENT_START &&
      (nextProps.queryStatus === UPDATE_DOCUMENT_FINISHED ||
        nextProps.queryStatus === UPDATE_DOCUMENT_FAILED)
    );
  }
  isDataChanged(nextProps) {
    return this.props.data !== nextProps.data;
  }
  isQueryStatusChanged(nextProps) {
    return this.props.queryStatus !== nextProps.queryStatus;
  }
  isParamsChanged(nextProps) {
    // collectionName was change, get data from server
    if (this.props.collectionName !== nextProps.collectionName) {
      return true;
    }
    if (this.props.objectId !== nextProps.objectId) {
      return true;
    }
    if (this.props.include !== nextProps.include) {
      return true;
    }
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      return false; // initialValues only on load fow noe
    }
    return false;
  }
  isDataExistOrQueryIsLoading() {
    const { queryStatus, data } = this.props;
    if (data || queryStatus === LOADING) {
      return true;
    }
    return false;
  }
  isGetFinish(nextProps) {
    if (
      this.props.queryStatus === LOADING &&
      nextProps.queryStatus !== LOADING &&
      (this.getDataFromServerIsRun || this.isDataChanged(nextProps))
    ) {
      return true;
    }
    return false;
  }
  createLocalDocument() {
    this.props.onCreateLocalDocument(this.props.uniqueId);
    this.props.actions.createNewDocument(
      this.props.uniqueId,
      this.props.initialValues,
    );
  }
  initialState(props = this.props) {
    const { localFirst, collectionName, objectId } = props;
    if (objectId && collectionName) {
      if (!localFirst || !this.isDataExistOrQueryIsLoading()) {
        this.getDataFromServer(props);
      }
    } else {
      this.createLocalDocument();
    }
  }
  render() {
    const { data, uniqueId, objectId } = this.props;
    const queryStatus = this.getQueryStatus();
    const deleteDocument = this.onDeleteDocument;
    const changeValueByKey = this.onChangeValueByKey;
    const refreshData = this.onRefreshData;
    const saveDocument = this.onSave;
    return this.props.render({
      data,
      queryStatus,
      refreshData,
      deleteDocument,
      changeValueByKey,
      saveDocument,
      objectId,
      uniqueId,
    });
  }
}

function mapStateToProps(state, props) {
  const { objectId, uniqueId } = props;
  if (objectId) {
    return {
      data: getDocumentData(state, objectId),
      queryStatus: getDocumentStatus(state, objectId),
    };
  }
  return {
    data: getNewDocumentData(state, uniqueId),
    queryStatus: getNewDocumentStatus(state, uniqueId),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...documentsActions, ...localDocumentsActions },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchDocument);
FetchDocument.propTypes = {
  collectionName: PropTypes.string.isRequired,
  objectId: PropTypes.string,
  queryStatus: PropTypes.string,
  uniqueId: PropTypes.string,
  render: PropTypes.func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
  include: PropTypes.string,
  initialValues: PropTypes.shape({}),
  data: PropTypes.shape({}),
  onCreateLocalDocument: PropTypes.func,
  onGetStart: PropTypes.func,
  onGetFinish: PropTypes.func,
  onPostDocumentStart: PropTypes.func,
  onPostDocumentFinish: PropTypes.func,
  onDeleteDocumentStart: PropTypes.func,
  onDeleteDocumentFinish: PropTypes.func,
  onPutDocumentStart: PropTypes.func,
  onPutDocumentFinish: PropTypes.func,
  addMemberPointerToDataOnPost: PropTypes.bool,
  cleanDataOnComponentWillUnmount: PropTypes.bool,
  getDataWithPostFinishCallBack: PropTypes.bool, // this trigger a GET method after POST and the data pass with onPostDocumentFinish
  localFirst: PropTypes.bool, // get data from server only if data didn't found in store
  localOnly: PropTypes.bool, // get data only from local store
  parseDataBeforeSave: PropTypes.func,
  actions: PropTypes.shape({
    updateNewDocument: PropTypes.func,
    updateDocumentOnStore: PropTypes.func,
    postLocalDocumentByUniqueIdToServer: PropTypes.func,
    updateDocumentOnServer: PropTypes.func,
    removeNewDocument: PropTypes.func,
    removeDocument: PropTypes.func,
    createNewDocument: PropTypes.func,
    getDocument: PropTypes.func,
    deleteDocumentFromServer: PropTypes.func,
  }).isRequired,
};

FetchDocument.defaultProps = {
  objectId: null,
  localOnly: false,
  localFirst: false,
  addMemberPointerToDataOnPost: false,
  data: null,
  initialValues: null,
  uniqueId: null,
  queryStatus: null,
  include: null,
  cleanDataOnComponentWillUnmount: true,
  getDataWithPostFinishCallBack: false,
  onCreateLocalDocument: () => {},
  onGetFinish: () => {},
  onGetStart: () => {},
  onDeleteDocumentStart: () => {},
  onDeleteDocumentFinish: () => {},
  onPutDocumentStart: () => {},
  onPutDocumentFinish: () => {},
  onPostDocumentStart: () => {},
  onPostDocumentFinish: () => {},
  parseDataBeforeSave: data => data,
};
