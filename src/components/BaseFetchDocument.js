import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentsActions from '../parse/actions/documents';
import * as localDocumentsActions from '../parse/actions/localDocuments';
import consts from '../types';
import {props, defaultprops} from './props-types/document'
import {
  getDocumentStatus,
  getDocumentData,
  getNewDocumentData,
  getNewDocumentStatus,
} from '../parse/selectors/documents';
import {
  isCreateDocumentFinish,
  isDeleteDocumentFinish,
  isDocumentParamsChanged,
  isUpdateDocumentFinish} from './methods/statusChecker'
const {
  LOADING,
  CREATE_DOCUMENT_START,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_FAILED,
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
    this.updateField = this.updateField.bind(this);
    this.onRefreshData = this.onRefreshData.bind(this);
    this.onSave = this.onSave.bind(this);
    this.cleanStore = this.cleanStore.bind(this);
  }

  componentWillMount() {
    this.initialState();
  }
  componentWillReceiveProps(nextProps) {
    // Params from parent was changed
    if (isParamsChanged(this.props, nextProps)) {
      this.initialState(nextProps);
    }
    // GET DATA FINISH
    if (isGetFinish(this.props, nextProps , this.getDataFromServerIsRun)) {
      this.getDataFromServerIsRun = false;
      this.props.onGetFinish({
        queryStatus: nextProps.queryStatus,
        data: nextProps.data,
      });
    }
    // CREATE DOCUMENT FINISH
    if (isCreateDocumentFinish(this.props, nextProps)) {
      this.props.onPostDocumentFinish({
        status: nextProps.queryStatus.status,
        objectId: nextProps.queryStatus.objectId,
        data: nextProps.queryStatus.data,
      });
    }
    // DELETE DOCUMENT FINISH
    if (isDeleteDocumentFinish(this.props, nextProps)) {
      this.props.onDeleteDocumentFinish(nextProps.queryStatus);
    }
    // UPDATE DOCUMENT FINISH
    if (isUpdateDocumentFinish(this.props, nextProps)) {
      this.props.onPutDocumentFinish(nextProps.queryStatus);
    }
  }
  // Clean data on Mount
  componentWillUnmount() {
    if (this.props.cleanDataOnComponentWillUnmount) {
      this.cleanStore();
    }
  }
  onDeleteDocument() {
    const { objectId, collectionName, queryStatus } = this.props;
    if (objectId) {
      if (queryStatus === DELETE_DOCUMENT_START) return;
      this.props.onDeleteDocumentStart(objectId);
      this.props.actions.deleteDocumentFromServer(collectionName, objectId);
    } else {
      this.cleanStore();
    }
  }
  onRefreshData() {
    this.getDataFromServer(null, false);
  }
  onSave() {
    if (this.props.objectId) {
      this.updateDocument(this.props)
    } else {
      this.createDocument(this.props)
    }
  }
  createDocument(props){
    props.onPostDocumentStart();
    props.actions.postNewDocument(
      props.collectionName,
      props.uniqueId,
      props.parseDataBeforeSave,
      props.getDataWithPostFinishCallBack,
    );
  }
  updateDocument(props){
    props.onPutDocumentStart();
    props.actions.updateDocumentOnServer(
      props.collectionName,
      props.objectId,
      null,
      null,
      props.parseDataBeforeSave,
    );
  }
  updateField(key, value) {
    const { objectId } = this.props;
    if (objectId) {
      this.props.actions.updateDocumentOnStore(objectId, key, value);
    } else {
      this.props.actions.updateNewDocument(this.props.uniqueId, key, value);
    }
  }
  getDataFromServer(props, localOnly = this.props.localOnly) {
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

  cleanStore() {
    if (this.props.objectId) {
      this.props.actions.removeDocument(this.props.objectId);
    } else {
      this.props.actions.removeNewDocument(this.props.uniqueId);
    }
  }

  isDataExistOrQueryIsLoading() {
    const { queryStatus, data } = this.props;
    if (data || queryStatus === LOADING) {
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
    const { data, uniqueId, objectId, queryStatus } = this.props;
    const deleteDocument = this.onDeleteDocument;
    const updateField = this.updateField;
    const refreshData = this.onRefreshData;
    const saveDocument = this.onSave;
    return this.props.render({
      data,
      queryStatus,
      refreshData,
      deleteDocument,
      updateField,
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
FetchDocument.propTypes = propTypes
FetchDocument.defaultProps = defaultProps
